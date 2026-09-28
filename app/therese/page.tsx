import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";

export const metadata = {
  title: "Therese | Systems Engineer",
  description:
    "Therese is a systems engineer focused on secure, scalable and efficient backend foundations. See her skills and how to get in touch.",
};

export default function TheresePage() {
  return <ProfileView profile={PROFILES.therese} backHref="/" />;
}
