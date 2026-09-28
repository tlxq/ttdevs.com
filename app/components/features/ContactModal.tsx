"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useActionState, useEffect } from "react";
import type { SelectedPerson } from "../../lib/types";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { submitContact } from "../../lib/actions/contactAction";

interface ContactModalProps {
  person: SelectedPerson;
  onClose: () => void;
}

const INITIAL_STATE = { success: false, error: null };

export default function ContactModal({ person, onClose }: ContactModalProps) {
  const [state, formAction, isPending] = useActionState(submitContact, INITIAL_STATE);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  return (
    <Modal onClose={onClose}>
      <Button
        variant="ghost"
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="absolute right-6 top-6 z-10 p-2 text-zinc-500 hover:text-zinc-100"
      >
        <XMarkIcon className="h-6 w-6" />
      </Button>

      {state.success ? (
        <div className="py-20 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Message sent.</h3>
          <p className="text-zinc-500">{person.name} will respond shortly.</p>
        </div>
      ) : (
        <div className="p-4 md:p-8">
          <header className="mb-12">
            <span className="text-[10px] font-mono tracking-widest text-zinc-600 uppercase mb-2 block">
              Contact // {person.name}
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Start a conversation</h2>
            <p className="text-zinc-500 max-w-sm">
              Briefly describe your project and we&apos;ll get back to you with a tailored approach.
            </p>
          </header>

          {state.error && (
            <div className="mb-8 rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-500">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-6" noValidate>
            <input type="hidden" name="recipientKey" value={person.recipientKey} />
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Name" name="name" required maxLength={100} placeholder="Jane Doe" className="bg-zinc-950/50" />
              <Input label="Email" name="email" type="email" required maxLength={254} placeholder="jane@studio.com" className="bg-zinc-950/50" />
            </div>
            
            <Input
              as="textarea"
              label="Message"
              name="message"
              required
              maxLength={5000}
              rows={4}
              placeholder="Tell us about your project..."
              className="bg-zinc-950/50"
            />

            <Button
              type="submit"
              disabled={isPending}
              className="w-full"
              size="lg"
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
