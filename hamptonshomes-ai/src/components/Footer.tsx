import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white/30">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <p className="font-serif text-white text-4xl mb-2">Barry McGovern</p>
            <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-8">
              Hedgerow Exclusive Properties
            </p>
            <p className="text-[13px] leading-relaxed max-w-sm">
              Luxury real estate in the Hamptons. High-end properties and 
              off-market opportunities from Southampton to Montauk.
            </p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 mb-6">Areas</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[13px]">
              {["Southampton", "Bridgehampton", "Sag Harbor", "East Hampton", "Amagansett", "Montauk", "Sagaponack", "Shelter Island"].map((area) => (
                <p key={area}>{area}</p>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 mb-6">Connect</p>
            <div className="space-y-3 text-[13px]">
              <p><a href="tel:+16463390154" className="hover:text-gold transition-colors duration-500">646-339-0154</a></p>
              <p><a href="mailto:barry@hedgerowexclusive.com" className="hover:text-gold transition-colors duration-500">Email</a></p>
              <div className="flex gap-5 pt-2">
                <a href="https://x.com/hedgequity" target="_blank" rel="noopener" className="hover:text-gold transition-colors duration-500 text-[10px] tracking-[0.2em] uppercase">X</a>
                <a href="https://www.instagram.com/barrymcgovern_/" target="_blank" rel="noopener" className="hover:text-gold transition-colors duration-500 text-[10px] tracking-[0.2em] uppercase">IG</a>
                <a href="https://www.linkedin.com/in/barry-mcgovern-9346133b/" target="_blank" rel="noopener" className="hover:text-gold transition-colors duration-500 text-[10px] tracking-[0.2em] uppercase">LI</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] tracking-[0.1em] text-white/15">
            &copy; {new Date().getFullYear()} Barry McGovern &middot; 2495 Montauk Highway, Bridgehampton, NY
          </p>
          <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase text-white/15">
            {[
              { href: "/about", label: "About" },
              { href: "/sales", label: "Portfolio" },
              { href: "/market", label: "Market" },
              { href: "/press", label: "Press" },
              { href: "/blog", label: "Insights" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white/40 transition-colors">{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
