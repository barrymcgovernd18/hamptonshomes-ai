import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Get help with Hamptons Coastal. Contact our team for support.',
}

export default function SupportPage() {
  return (
    <div className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <span className="text-gold text-xs tracking-[0.3em] uppercase">Support</span>
        <h1 className="font-serif text-3xl md:text-4xl text-cream mt-4 mb-8">
          How can we help?
        </h1>

        <div className="space-y-6 text-cream/70 text-lg leading-relaxed mb-16">
          <p>
            If you have questions about the Hamptons Coastal app or website, need help with 
            your account, or want to report an issue, we&apos;re here to help.
          </p>
          
          <div className="bg-dark-700/50 border border-white/5 p-8">
            <h3 className="font-serif text-xl text-cream mb-3">Contact Us</h3>
            <p className="text-cream/50 mb-4">
              Email us and we&apos;ll get back to you as quickly as possible.
            </p>
            <a 
              href="mailto:info@hamptonscoastal.com" 
              className="inline-block bg-gold text-dark-900 px-6 py-3 text-sm tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors"
            >
              info@hamptonscoastal.com
            </a>
          </div>
        </div>

        <h2 className="font-serif text-2xl text-cream mb-8">Frequently Asked Questions</h2>

        <div className="space-y-8">
          {[
            {
              q: 'What is Hamptons Coastal?',
              a: 'Hamptons Coastal is a luxury real estate intelligence platform covering the Hamptons, Palm Beach, Miami, and Aspen. We provide editorial news coverage, market reports, AI-powered property valuations, and interactive parcel maps.',
            },
            {
              q: 'Is the app free to download?',
              a: 'Yes. The app is free to download and includes basic features like browsing listings and reading headlines. Premium features including full article access, market reports, AI comps, and parcel maps require a subscription.',
            },
            {
              q: 'What subscription plans are available?',
              a: 'We offer Premium Reader ($19.99/month) for full content access, and agent tiers (Basic, Pro, and Elite) with additional features like featured listings and article credits. All paid plans include a free trial.',
            },
            {
              q: 'How do I cancel my subscription?',
              a: 'Subscriptions are managed through your Apple ID. Go to Settings > your name > Subscriptions on your iPhone to manage or cancel your Hamptons Coastal subscription.',
            },
            {
              q: 'How do I submit a listing?',
              a: 'Featured listings are available to Pro and Elite agent subscribers. Once subscribed, you can submit listings directly through the app. Contact us for more details.',
            },
            {
              q: 'I found an error in an article. How do I report it?',
              a: 'We take accuracy seriously. Email us at info@hamptonscoastal.com with the article title and the correction, and our editorial team will review it promptly.',
            },
            {
              q: 'Where does your data come from?',
              a: 'Our editorial content is researched using public records, brokerage reports, and verified industry sources. Market data and property intelligence features use a combination of public records and proprietary analysis.',
            },
          ].map((faq, i) => (
            <div key={i} className="border-b border-white/5 pb-6">
              <h3 className="font-serif text-lg text-cream mb-3">{faq.q}</h3>
              <p className="text-cream/50 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
