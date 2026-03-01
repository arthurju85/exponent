import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';
import { Twitter, Mail, Globe, Target, Heart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us - Exponent',
  description: 'Learn about Exponent and our mission to make productivity a currency',
};

// Arthur's info
const arthurInfo = {
  name: 'Arthur',
  role: 'Founder',
  xHandle: '@arthur_exponent',
  xUrl: 'https://x.com/arthur_exponent',
  avatar: '/arthur-avatar.jpg',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Exponent
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building the infrastructure for the future of work — where individual productivity becomes tradeable value.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground">
                  To empower super-individuals worldwide by creating a fair, transparent financing mechanism that values productivity over pedigree. We believe everyone deserves access to capital based on their proven abilities and potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground">
                  A world where the value of human productivity is recognized, tokenized, and traded globally — creating a new economic layer that rewards contribution and enables unprecedented individual growth.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Core Values</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  Every transaction, every metric, every decision is open and verifiable on-chain.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">Fairness</h3>
                <p className="text-sm text-muted-foreground">
                  Equal opportunity for all, regardless of background, location, or connections.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Constantly pushing boundaries to create better financial tools for individuals.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Team</h2>
            <div className="max-w-sm mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-muted-foreground">
                      {arthurInfo.name[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{arthurInfo.name}</h3>
                  <p className="text-muted-foreground mb-4">{arthurInfo.role}</p>
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={arthurInfo.xUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Twitter className="h-4 w-4" />
                        {arthurInfo.xHandle}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partners */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-center mb-8">Partners</h2>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              <div className="text-center">
                <div className="w-24 h-12 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              Have questions or want to collaborate? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="mailto:contact@exponent.xyz" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@exponent.xyz
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://x.com/exponent_xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Twitter className="h-4 w-4" />
                  @exponent_xyz
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
