import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Hamptons Coastal.',
}

export default function TermsPage() {
  return (
    <div className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <span className="text-gold text-xs tracking-[0.3em] uppercase">Legal</span>
        <h1 className="font-serif text-3xl md:text-4xl text-cream mt-4 mb-4">
          Terms of Use
        </h1>
        <p className="text-cream/30 text-sm mb-12">Last updated: February 20, 2026</p>

        <div className="space-y-8 text-cream/70 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Agreement to Terms</h2>
            <p>
              By accessing or using the Hamptons Coastal mobile application and website 
              (hamptonscoastal.com), operated by Hamptons Coastal LLC, you agree to be bound 
              by these Terms of Use. If you do not agree, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Description of Service</h2>
            <p>
              Hamptons Coastal provides luxury real estate news, market intelligence, and analytical 
              tools covering the Hamptons, Palm Beach, Miami, and Aspen markets. Our services include 
              editorial content, market reports, AI-powered property analysis, interactive parcel maps, 
              and featured real estate listings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Accounts</h2>
            <p>
              Some features require an account. You are responsible for maintaining the confidentiality 
              of your credentials and for all activity under your account. You must provide accurate 
              information when creating an account and promptly update it if it changes.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Subscriptions and Payments</h2>
            <p className="mb-4">
              Premium features are available through paid subscriptions and one-time in-app purchases, 
              processed through the Apple App Store. By subscribing, you agree to the pricing and 
              payment terms presented at the time of purchase.
            </p>
            <p className="mb-4">
              Subscriptions automatically renew unless cancelled at least 24 hours before the end of 
              the current billing period. You can manage and cancel subscriptions through your Apple ID 
              account settings.
            </p>
            <p>
              Refunds are handled in accordance with Apple&apos;s refund policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Content and Intellectual Property</h2>
            <p className="mb-4">
              All content on Hamptons Coastal, including articles, data, graphics, logos, and software, 
              is owned by Hamptons Coastal LLC or its licensors and is protected by copyright and other 
              intellectual property laws.
            </p>
            <p>
              You may read and share articles for personal, non-commercial purposes. You may not 
              reproduce, distribute, modify, or create derivative works from our content without 
              written permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Featured Listings</h2>
            <p>
              Real estate listings displayed on Hamptons Coastal are submitted by verified agents 
              and brokerages. Hamptons Coastal does not act as a real estate broker and makes no 
              representations or warranties regarding the accuracy, completeness, or availability 
              of any listing. All listing information should be independently verified.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">AI-Powered Features</h2>
            <p>
              Property valuations, comparable sales analysis, and other AI-powered features are 
              provided for informational purposes only. They are derived from public data and 
              algorithmic analysis and should not be relied upon as professional appraisals. 
              Consult a licensed real estate professional for accurate valuations.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Disclaimer of Warranties</h2>
            <p>
              Our services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without 
              warranties of any kind, either express or implied. We do not warrant that our services 
              will be uninterrupted, error-free, or free of harmful components.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Hamptons Coastal LLC shall not be liable for 
              any indirect, incidental, special, consequential, or punitive damages arising from 
              your use of our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of our services 
              after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of New York, without regard to 
              conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:info@hamptonscoastal.com" className="text-gold hover:text-gold-light transition-colors">
                info@hamptonscoastal.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
