import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Hamptons Coastal.',
}

export default function PrivacyPage() {
  return (
    <div className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <span className="text-gold text-xs tracking-[0.3em] uppercase">Legal</span>
        <h1 className="font-serif text-3xl md:text-4xl text-cream mt-4 mb-4">
          Privacy Policy
        </h1>
        <p className="text-cream/30 text-sm mb-12">Last updated: February 20, 2026</p>

        <div className="space-y-8 text-cream/70 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Overview</h2>
            <p>
              Hamptons Coastal LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the Hamptons Coastal 
              mobile application and website (hamptonscoastal.com). This Privacy Policy explains how we collect, 
              use, and protect your information when you use our services.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Information We Collect</h2>
            <p className="mb-4"><strong className="text-cream">Account Information:</strong> If you create an account, we may collect your name, email address, and authentication credentials. You may also sign in through third-party providers (Apple, Google), in which case we receive the information you authorize those providers to share.</p>
            <p className="mb-4"><strong className="text-cream">Usage Data:</strong> We collect information about how you interact with our app and website, including pages viewed, articles read, features used, and general usage patterns.</p>
            <p className="mb-4"><strong className="text-cream">Device Information:</strong> We may collect device type, operating system, app version, and general location (country or region) for analytics and to improve our services.</p>
            <p><strong className="text-cream">Payment Information:</strong> Subscription and in-app purchase payments are processed by Apple through the App Store. We do not collect or store your payment card details.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3 text-cream/60">
              <li>Provide and maintain our services</li>
              <li>Process your subscriptions and in-app purchases</li>
              <li>Personalize your experience and content recommendations</li>
              <li>Send service-related communications</li>
              <li>Analyze usage patterns to improve our platform</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Data Sharing</h2>
            <p>
              We do not sell your personal information to third parties. We may share data with 
              service providers who help us operate our platform (analytics, hosting, payment processing) 
              under strict confidentiality agreements. We may also disclose information if required by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. However, 
              no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Third-Party Services</h2>
            <p>
              Our app and website may use third-party services including RevenueCat (subscription management), 
              Supabase (data storage), and analytics tools. These services have their own privacy policies 
              governing their use of your data.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time by 
              contacting us at info@hamptonscoastal.com. You can also delete your account through the app settings.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for users under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the updated policy on our website and updating the &ldquo;Last updated&rdquo; date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-cream mb-3">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, contact us at:{' '}
              <a href="mailto:info@hamptonscoastal.com" className="text-gold hover:text-gold-light transition-colors">
                info@hamptonscoastal.com
              </a>
            </p>
            <p className="mt-3">
              Hamptons Coastal LLC
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
