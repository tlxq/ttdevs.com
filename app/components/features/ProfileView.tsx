"use client";

import { useState } from "react";
import { Profile } from "../../lib/data/profiles";
import { useSmoothScroll } from "../../lib/hooks/useSmoothScroll";
import BaseLayout from "../layouts/BaseLayout";
import { ProfileHero } from "./ProfileHero";
import { AboutSection } from "./AboutSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";
import { InterestsSection } from "./InterestsSection";
import { ContactSection } from "./ContactSection";
import ContactModal from "./ContactModal";
import type { SelectedPerson } from "../../lib/types";

interface ProfileViewProps {
  profile: Profile;
  backHref?: string;
}

export function ProfileView({ profile, backHref }: ProfileViewProps) {
  const { scrollToSection, lenis } = useSmoothScroll();
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);

  function openModal(recipientKey: "tom" | "therese", name: string) {
    setSelectedPerson({ recipientKey, name });
    lenis?.stop();
  }

  function closeModal() {
    setSelectedPerson(null);
    lenis?.start();
  }

  const hasProjects = profile.projects.length > 0;
  // Only link to sections that this profile actually renders.
  const sections = [
    { id: "about", label: "About" },
    ...(hasProjects ? [{ id: "projects", label: "Projects" }] : []),
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <BaseLayout backHref={backHref} scrollToSection={scrollToSection} sections={sections}>
      <ProfileHero profile={profile} scrollToSection={scrollToSection} />
      <AboutSection profile={profile} />
      {hasProjects && <ProjectsSection profile={profile} />}
      <SkillsSection profile={profile} />
      {profile.interests && <InterestsSection profile={profile} />}
      <ContactSection onContactClick={openModal} />

      {selectedPerson && (
        <ContactModal person={selectedPerson} onClose={closeModal} />
      )}
    </BaseLayout>
  );
}
