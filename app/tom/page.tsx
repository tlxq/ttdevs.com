import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";

export const metadata = {
  title: "Tom | Junior Fullstack Developer",
};

export default function TomPage() {
  return <ProfileView profile={PROFILES.tom} backHref="/" />;
}
