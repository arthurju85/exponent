import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - Exponent',
  description: 'Exponent Disclaimer',
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Disclaimer</h1>
          <p className="text-muted-foreground mb-8">Last Updated: February 28, 2025</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Investment Risk Warning</h2>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                <p className="text-yellow-600 dark:text-yellow-400 font-medium">
                  ⚠️ IMPORTANT: All investments carry significant risk. You could lose all of your invested capital.
                </p>
              </div>
              <p className="text-muted-foreground mb-4">
                By using the Exponent platform, you acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Cryptocurrency and token investments are highly speculative</li>
                <li>Prices can be extremely volatile and may fluctuate significantly</li>
                <li>Past performance of any project does not guarantee future results</li>
                <li>You should never invest more than you can afford to lose completely</li>
                <li>You are solely responsible for your investment decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Platform Role Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                Exponent is a technology platform that facilitates connections between project creators and investors. We explicitly state that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>We do not provide investment, financial, legal, or tax advice</li>
                <li>We do not endorse, guarantee, or verify any projects listed on the platform</li>
                <li>We are not responsible for the performance or outcome of any project</li>
                <li>We do not custody user funds; all transactions occur on-chain</li>
                <li>Project creators are solely responsible for delivering on their promises</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                As a user of the Exponent platform, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Conducting your own thorough due diligence before investing</li>
                <li>Understanding the risks associated with blockchain technology</li>
                <li>Securing your own wallet and private keys</li>
                <li>Complying with all applicable laws and regulations in your jurisdiction</li>
                <li>Verifying the legitimacy of projects independently</li>
                <li>Seeking professional advice regarding investments, taxes, and legal matters</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Technology Risks</h2>
              <p className="text-muted-foreground mb-4">
                You acknowledge the following technology-related risks:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Smart contract vulnerabilities or bugs that could result in loss of funds</li>
                <li>Blockchain network congestion or failures</li>
                <li>Oracle failures or inaccurate data feeds</li>
                <li>Regulatory changes that may affect token trading or ownership</li>
                <li>Loss of access to wallets or private keys</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. No Liability</h2>
              <p className="text-muted-foreground mb-4">
                To the maximum extent permitted by applicable law, Exponent and its affiliates, officers, employees, agents, and licensors shall not be liable for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Any direct, indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>Any losses arising from smart contract failures or blockchain issues</li>
                <li>Losses due to unauthorized access to your account or wallet</li>
                <li>Any failure to perform due to circumstances beyond our reasonable control</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                Our platform may integrate with or link to third-party services. We are not responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>The availability, accuracy, or content of third-party services</li>
                <li>Any damages or losses caused by third-party services</li>
                <li>Changes in terms or discontinuation of third-party services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Regulatory Compliance</h2>
              <p className="text-muted-foreground mb-4">
                Users are responsible for ensuring their use of the platform complies with all applicable laws and regulations in their jurisdiction. This includes but is not limited to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Securities laws and regulations</li>
                <li>Anti-money laundering (AML) and know-your-customer (KYC) requirements</li>
                <li>Tax reporting and payment obligations</li>
                <li>Export controls and sanctions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Disclaimer</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify this Disclaimer at any time. Changes will be effective immediately upon posting. Your continued use of the platform after any changes constitutes acceptance of the updated Disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Disclaimer, please contact us at legal@exponent.xyz
              </p>
            </section>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                By using the Exponent platform, you acknowledge that you have read, understood, and agree to this Disclaimer. If you do not agree, please do not use our services.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
