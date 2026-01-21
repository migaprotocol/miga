import { ArrowRight, Users, Globe, Shield, Heart, BookOpen, Building, Vote, Mail, Sparkles } from 'lucide-react';

export function Home() {
  return (
    <div className="sacred-geometry-bg">
      {/* Hero Section - Epic 3D Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-transparent" />

        {/* Light rays container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="light-rays opacity-30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* 3D Floating Coin */}
          <div className="perspective-1000 mb-8">
            <div className="coin-container animate-coin-float animate-coin-glow inline-block">
              <img
                src="/miga-coin.svg"
                alt="MIGA Seal of Solomon"
                className="w-32 h-32 md:w-40 md:h-40"
              />
            </div>
          </div>

          {/* Epic 3D Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6">
            <span className="gradient-text text-3d-massive animate-epic-glow">MIGA</span>
          </h1>

          <p className="text-gold text-xl md:text-2xl font-medium mb-4">
            Make Iran Great Again Foundation
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            A 501(c)(3) nonprofit rebuilding hope through technology, education, and humanitarian aid
          </p>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8 italic">
            "I am Cyrus, king of the world... I gathered all their peoples and restored them to their homelands."
            <span className="block mt-2 text-gold text-sm">— The Cyrus Cylinder, 539 BCE</span>
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#donate" className="btn-primary text-lg px-8 py-4">
              <Heart size={20} /> Donate Now
            </a>
            <a href="#signup" className="btn-outline text-lg px-8 py-4">
              <Mail size={20} /> Join the Movement
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="card p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gold">88M</p>
              <p className="text-gray-400 text-sm">People Affected</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gold">8M+</p>
              <p className="text-gray-400 text-sm">Global Diaspora</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gold">52%</p>
              <p className="text-gray-400 text-sm">Women & Girls</p>
            </div>
            <div className="card p-4 text-center">
              <p className="text-2xl md:text-3xl font-bold text-gold">70%</p>
              <p className="text-gray-400 text-sm">Under 35</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured CTA Panel - Donate */}
      <section id="donate" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cta-panel-featured text-center">
            <div className="relative z-10">
              <span className="tier-badge tier-gold mb-4">Tax Deductible</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fund the <span className="gradient-text">Future of Iran</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                100% of donations go directly to humanitarian programs: education, healthcare,
                women's rights, and privacy technology for activists.
              </p>

              {/* Donation Tiers */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="card p-6 hover:border-gold transition">
                  <p className="text-3xl font-bold text-gold mb-2">$25</p>
                  <p className="text-gray-400 text-sm">Supporter</p>
                  <p className="text-gray-500 text-xs mt-2">1 month education access</p>
                </div>
                <div className="card p-6 border-gold hover:border-gold-light transition">
                  <span className="tier-badge tier-gold text-xs mb-2">Most Popular</span>
                  <p className="text-3xl font-bold text-gold mb-2">$100</p>
                  <p className="text-gray-400 text-sm">Advocate</p>
                  <p className="text-gray-500 text-xs mt-2">Fund a VPN server for 1 month</p>
                </div>
                <div className="card p-6 hover:border-gold transition">
                  <p className="text-3xl font-bold text-gold mb-2">$500</p>
                  <p className="text-gray-400 text-sm">Champion</p>
                  <p className="text-gray-500 text-xs mt-2">Full scholarship for 1 student</p>
                </div>
              </div>

              <a href="https://donate.miga.us.org" className="btn-primary text-lg px-8 py-4">
                <Heart size={20} /> Make a Donation
              </a>
              <p className="text-gray-500 text-sm mt-4">
                MIGA Foundation is a registered 501(c)(3) nonprofit. EIN: XX-XXXXXXX
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Fund */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Building <span className="gradient-text">Infrastructure for Freedom</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our programs combine technology and humanitarian aid to create lasting change
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                <Shield className="text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy Technology</h3>
              <p className="text-gray-400 text-sm">
                VPNs, encrypted communications, and secure tools for activists and journalists.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                <BookOpen className="text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Education Access</h3>
              <p className="text-gray-400 text-sm">
                Scholarships, online learning platforms, and educational resources.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                <Users className="text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Women's Rights</h3>
              <p className="text-gray-400 text-sm">
                Legal aid, safe houses, and advocacy programs for women and girls.
              </p>
            </div>

            <div className="feature-card">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                <Building className="text-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Economic Infrastructure</h3>
              <p className="text-gray-400 text-sm">
                Microfinance, business incubators, and economic development programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Panel */}
      <section id="signup" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="cta-panel">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Join <span className="gradient-text">8 Million Strong</span>
                </h2>
                <p className="text-gray-300 mb-4">
                  Get updates on our programs, volunteer opportunities, and ways to make an impact.
                </p>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <Sparkles size={16} className="text-gold" /> Monthly impact reports
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={16} className="text-gold" /> Volunteer opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles size={16} className="text-gold" /> Event invitations
                  </li>
                </ul>
              </div>
              <div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="signup-input"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="signup-input"
                  />
                  <button type="submit" className="btn-primary w-full">
                    <Mail size={18} /> Subscribe
                  </button>
                </form>
                <p className="text-gray-500 text-xs mt-3">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Ten Pillars */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            The <span className="gradient-text">Ten Pillars</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Specialized programs with Persian heritage names, each addressing a critical need
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { symbol: 'KHAZ', name: 'Treasury', persian: 'خزانه' },
              { symbol: 'AMN', name: 'Security', persian: 'امنیّت' },
              { symbol: 'SAL', name: 'Health', persian: 'سلامت' },
              { symbol: 'FARH', name: 'Culture', persian: 'فرهنگ' },
              { symbol: 'DAN', name: 'Research', persian: 'دانش' },
              { symbol: 'SAZ', name: 'Infrastructure', persian: 'سازندگی' },
              { symbol: 'DAD', name: 'Governance', persian: 'داد' },
              { symbol: 'PAY', name: 'Consular', persian: 'پیام' },
              { symbol: 'WAQF', name: 'Endowment', persian: 'وقف' },
              { symbol: 'MIZ', name: 'Integrity', persian: 'میزان' },
            ].map((dao) => (
              <div key={dao.symbol} className="card p-4 text-center hover:border-gold/50 transition">
                <p className="text-gold font-bold">{dao.symbol}</p>
                <p className="text-white font-medium mt-1">{dao.name}</p>
                <p className="text-gray-500 text-sm mt-1">{dao.persian}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Protocol Link */}
            <div className="cta-panel">
              <Globe className="text-gold w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">MIGA Protocol</h3>
              <p className="text-gray-400 mb-4">
                The decentralized civic operating system. Participate in governance with $MIGA tokens.
              </p>
              <a href="https://migaprotocol.xyz" className="btn-primary">
                Visit Protocol <ArrowRight size={18} />
              </a>
            </div>

            {/* Pars Ecosystem */}
            <div className="cta-panel">
              <Vote className="text-gold w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Pars Ecosystem</h3>
              <p className="text-gray-400 mb-4">
                Vote, trade, fund, and connect through our decentralized network of tools.
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="https://pars.vote" className="btn-outline text-sm">pars.vote</a>
                <a href="https://pars.fund" className="btn-outline text-sm">pars.fund</a>
                <a href="https://pars.markets" className="btn-outline text-sm">pars.markets</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-gold/5 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            The Empire Fell. The People Scattered.
          </h2>
          <p className="text-2xl text-gold font-semibold mb-6">
            The Foundation Endures.
          </p>
          <p className="text-gray-300 text-lg mb-8 italic">
            One day, we go home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#donate" className="btn-primary text-lg px-8 py-4">
              <Heart size={20} /> Support the Cause
            </a>
            <a href="https://migaprotocol.xyz" className="btn-outline text-lg px-8 py-4">
              Join MIGA Protocol <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
