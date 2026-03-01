import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Exponent',
  description: 'Exponent Terms of Service',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: February 28, 2025</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using Exponent, you agree to be bound by these Terms of
                Service. If you do not agree to these terms, you may not access or use
                the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                To use our platform, you must:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into a binding contract</li>
                <li>Not be prohibited from using the platform under applicable laws</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground mb-4">
                When you create an account, you agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Platform Services</h2>
              <p className="text-muted-foreground mb-4">
                Exponent provides a platform for tokenized financing. We:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Facilitate connections between project creators and investors</li>
                <li>Provide tools for project fundraising and management</li>
                <li>Do not provide investment, legal, or tax advice</li>
                <li>Do not guarantee returns on any investment</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Use the platform for illegal purposes</li>
                <li>Submit false or misleading information</li>
                <li>Interfere with platform security or operations</li>
                <li>Attempt to access areas or features you are not authorized to access</li>
                <li>Use the platform to transmit malware or harmful code</li>
                <li>Engage in market manipulation or fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Investment Risks</h2>
              <p className="text-muted-foreground mb-4">
                By using our platform, you acknowledge that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All investments carry risk of loss</li>
                <li>Past performance does not guarantee future results</li>
                <li>Token values can be highly volatile</li>
                <li>You should only invest what you can afford to lose</li>
                <li>You are responsible for conducting your own due diligence</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content, features, and functionality of the platform are owned by
                Exponent and are protected by copyright, trademark, and other
                intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Copy, modify, or create derivative works</li>
                <li>Use our trademarks without written permission</li>
                <li>Reverse engineer any part of the platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by law, Exponent shall not be liable
                for any indirect, incidental, special, consequential, or punitive
                damages arising from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to suspend or terminate your account at any time
                for violation of these terms or for any other reason at our sole
                discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p className="text-muted-foreground mb-4">
                These Terms shall be governed by and construed in accordance with
                applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We may modify these Terms at any time. We will notify users of
                significant changes. Continued use of the platform after changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, please contact us at
                legal@exponent.xyz
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
