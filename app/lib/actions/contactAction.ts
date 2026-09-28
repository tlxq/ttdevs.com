"use server";

import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";
import { getEnv } from "@/app/lib/config";
import type { RecipientKey } from "@/app/lib/types";

export type ContactState = {
  success: boolean;
  error: string | null;
  message?: string;
};

// Keep in sync with the maxLength attributes in ContactModal.tsx.
const MAX_LENGTH = { name: 100, email: 254, message: 5000 } as const;

const RECIPIENT_KEYS: readonly RecipientKey[] = ["tom", "therese"];

function isRecipientKey(value: unknown): value is RecipientKey {
  return typeof value === "string" && (RECIPIENT_KEYS as readonly string[]).includes(value);
}

/** Returns the trimmed string value of a form field, or "" if it is missing or not a string. */
function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/** Redis client for rate limiting, or null when Upstash isn't configured. */
function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
  return Redis.fromEnv();
}

export async function submitContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "unknown";

  // 1. Rate limiting via Upstash Redis. This intentionally fails open: if Redis is
  // down or not configured, the message is still sent rather than blocking real visitors.
  try {
    const redis = getRedis();
    if (redis) {
      const rateLimitKey = `rate_limit:contact:${ip}`;
      const currentHits = await redis.incr(rateLimitKey);
      if (currentHits === 1) {
        await redis.expire(rateLimitKey, 60); // 1 minute window
      }
      if (currentHits > 5) {
        return { success: false, error: "Too many requests. Please try again shortly." };
      }
    }
  } catch (error) {
    console.error("Redis rate limit error:", error);
  }

  // 2. Honeypot check
  if (formData.get("company")) {
    return { success: true, error: null, message: "Spam blocked silently" };
  }

  // 3. Extract and validate
  const recipientKey = formData.get("recipientKey");
  if (!isRecipientKey(recipientKey)) {
    return { success: false, error: "Unknown recipient." };
  }

  // CR/LF are stripped from the name because it goes into the email subject.
  const name = getString(formData, "name").replace(/[\r\n]+/g, " ");
  const email = getString(formData, "email");
  const message = getString(formData, "message");

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in your name, email and message." };
  }

  if (name.length > MAX_LENGTH.name) {
    return { success: false, error: `Name can be at most ${MAX_LENGTH.name} characters.` };
  }
  if (email.length > MAX_LENGTH.email) {
    return { success: false, error: `Email can be at most ${MAX_LENGTH.email} characters.` };
  }
  if (message.length > MAX_LENGTH.message) {
    return { success: false, error: `Message can be at most ${MAX_LENGTH.message} characters.` };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email format" };
  }

  // 4. Send email
  const apiKey = getEnv("RESEND_API_KEY");
  const toEmail = recipientKey === "tom" ? getEnv("CONTACT_TO_TOM_EMAIL") : getEnv("CONTACT_TO_THERESE_EMAIL");
  const fromEmail = getEnv("RESEND_FROM_EMAIL");

  if (!apiKey || !toEmail || !fromEmail) {
    return { success: false, error: "Server misconfigured: missing email targets." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Message from: ${name} (${email})\n\n${message}`,
    });

    if (error) throw new Error(error.message);

    return { success: true, error: null, message: "Email sent successfully!" };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Failed to send email:", errorMessage);
    return { success: false, error: "Failed to send email." };
  }
}
