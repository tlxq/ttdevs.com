import { ProfileView } from "../components/features/ProfileView";
import { PROFILES } from "../lib/data/profiles";

export const metadata = {
  title: "Portfolio | TTdevs",
  description: "Minimalist full-stack development studio.",
};

export default function PortfolioPage() {
  return <ProfileView profile={PROFILES.joint} backHref="/" />;
}
