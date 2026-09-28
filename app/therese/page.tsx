import type { Metadata } from "next";
import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";

const TITLE = "Therese | Systems Engineer";
const DESCRIPTION =
  "Therese is a systems engineer focused on secure, scalable and efficient backend foundations. See her skills and how to get in touch.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Setting openGraph here replaces the root one, so the shared image is listed again.
  openGraph: { type: "profile", siteName: "TTdevs", title: TITLE, description: DESCRIPTION, url: "/therese", images: ["/opengraph-image"] },
};

export default function TheresePage() {
  return <ProfileView profile={PROFILES.therese} backHref="/" />;
}
