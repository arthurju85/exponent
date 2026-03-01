import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { DLPSection } from "@/components/landing/dlp-section"
import { RoleCardsSection } from "@/components/landing/role-cards-section"
import { StatsSection } from "@/components/landing/stats-section"
import { ProjectsSection } from "@/components/landing/projects-section"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DLPSection />
      <RoleCardsSection />
      <StatsSection />
      <ProjectsSection />
      <Footer />
    </main>
  )
}
