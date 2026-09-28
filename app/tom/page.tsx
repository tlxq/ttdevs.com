import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";

export const metadata = {
  title: "Tom | Junior Fullstack Developer",
  description:
    "Tom is a junior fullstack developer working with TypeScript, React, Next.js and Node.js. See his projects, skills and how to get in touch.",
};

export default function TomPage() {
  return <ProfileView profile={PROFILES.tom} backHref="/" />;
}
