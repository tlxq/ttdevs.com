import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";

export const metadata = {
  title: "Therese | Systems Engineer",
};

export default function TheresePage() {
  return <ProfileView profile={PROFILES.therese} backHref="/" />;
}
