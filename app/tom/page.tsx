import type { Metadata } from "next";
import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";

const TITLE = "Tom | Junior Fullstack Developer";
const DESCRIPTION =
  "Tom is a junior fullstack developer working with TypeScript, React, Next.js and Node.js. See his projects, skills and how to get in touch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Setting openGraph here replaces the root one, so the shared image is listed again.
  openGraph: { type: "profile", siteName: "TTdevs", title: TITLE, description: DESCRIPTION, url: "/tom", images: ["/opengraph-image"] },
};

export default function TomPage() {
  return <ProfileView profile={PROFILES.tom} backHref="/" />;
}
