import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, Shield, Users, Globe, Coins, Lock, Zap } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Index() {
  const { connected } = useWallet();

  return (
    <div className="min-h-screen bg-[#0a0a12]">
      <Header />

      <main className="pt-16">
        {/* Hero Section - Elegant Persian Style */}
        <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
          {/* Persian geometric pattern background */}
          <div className="absolute inset-0 persian-pattern opacity-20" />
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0a0a12]/90 to-[#0a0a12]" />
          {/* Gold accent gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#1a1a2e]/30" />
          
          {/* Decorative corner elements */}
          <div className="absolute top-20 left-10 w-32 h-32 persian-corner opacity-30" />
          <div className="absolute top-20 right-10 w-32 h-32 persian-corner opacity-30 rotate-90" />
          <div className="absolute bottom-20 left-10 w-32 h-32 persian-corner opacity-30 -rotate-90" />
          <div className="absolute bottom-20 right-10 w-32 h-32 persian-corner opacity-30 rotate-180" />

          {/* Subtle gold particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[#D4AF37]/40 rounded-full gold-particle"
                style={{
                  left: `${10 + Math.random() * 80}%`,
                  bottom: '-10px',
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${8 + Math.random() * 6}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            {/* 3D Coin floating above */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-[#C9A227]/20 blur-3xl animate-light-pulse" />
                </div>
                <div className="perspective-1000 relative z-10">
                  <div className="coin-container animate-coin-float">
                    <img
                      src="/miga-coin.svg"
                      alt="MIGA Coin"
                      className="w-32 h-32 md:w-40 md:h-40 animate-coin-glow"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* MASSIVE 3D Title */}
            <div className="perspective-dramatic mb-6">
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tight leading-none">
                <span className="text-[#C9A227] text-3d-massive animate-epic-glow">MIGA</span>
              </h1>
            </div>

            {/* Subtitle with 3D effect */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-3d mb-4 tracking-wide">
              PROTOCOL
            </h2>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-white/80 mb-4 max-w-3xl mx-auto font-light tracking-wide">
              The Token Powering a Diaspora-Led Civic Operating System
            </p>

            {/* Farsi quote */}
            <p className="text-lg text-[#C9A227]/80 italic mb-8" dir="rtl">
              بنی آدم اعضای یکدیگرند که در آفرینش ز یک گوهرند
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {connected ? (
                <a href="#buy" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                  Get $MIGA <ArrowRight size={20} />
                </a>
              ) : (
                <WalletMultiButton />
              )}
              <a href="https://miga.us.org" className="btn-outline text-lg px-8 py-4">
                Explore the DAO
              </a>
            </div>

            {/* Badge */}
            <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A227]/30 bg-black/50 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
              <span className="text-[#C9A227] text-sm font-medium">Fair Launch on Solana</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-6 h-10 rounded-full border-2 border-[#C9A227]/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-[#C9A227]/60 rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-y border-[#D4AF37]/10 relative">
          <div className="absolute inset-0 persian-border-pattern opacity-5" />
          <div className="relative max-w-7xl mx-auto px-6">
            {/* Multi-chain badge */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#1a1a2e]/80 border border-[#D4AF37]/20">
                <span className="text-[#D4AF37] text-sm font-medium">Multi-Chain</span>
                <span className="w-px h-4 bg-[#D4AF37]/30" />
                <span className="text-white/60 text-sm">7B Total Supply across 7 Chains</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="stat-card">
                <div className="stat-value">7B</div>
                <div className="stat-label">Total Supply</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">1B</div>
                <div className="stat-label">Live on Solana</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">50%</div>
                <div className="stat-label">DAO Treasury</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">40%</div>
                <div className="stat-label">Fair Sale</div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section relative overflow-hidden">
          {/* Persian geometric background */}
          <div className="absolute inset-0 persian-arabesque opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a12] via-[#0a0a12]/95 to-[#0a0a12]/90" />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                  A Token for <span className="text-gold">8 Million</span> Iranians Worldwide
                </h2>
                <p className="text-white/60 text-lg mb-6 leading-relaxed">
                  MIGA isn't just another token. It's the economic engine for a decentralized
                  nation-in-exile — funding humanitarian programs, cultural preservation,
                  and civic infrastructure for the Persian diaspora.
                </p>
                <p className="text-white/60 mb-8 leading-relaxed">
                  No VCs. No presales. No team allocation. 50% goes directly to the
                  community-governed DAO treasury.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-sm text-[#D4AF37]">1B Live on Solana</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-sm text-[#D4AF37]">7B across 7 Chains</span>
                  <span className="px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-sm text-[#D4AF37]">10 Specialized DAOs</span>
                </div>
              </div>
              <div className="relative">
                {/* Persian geometric art card */}
                <div className="aspect-[4/3] rounded-2xl border border-[#D4AF37]/20 overflow-hidden bg-[#0f0f1a]">
                  <div className="absolute inset-0 persian-star-pattern opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent" />
                  {/* Central decorative element */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 persian-medallion opacity-60" />
                  </div>
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Tokenomics Section */}
        <section id="tokenomics" className="section bg-[#0f0f1a]/50 relative">
          <div className="absolute inset-0 persian-border-pattern opacity-5" />
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                <span className="text-gold">Multi-Chain</span> Tokenomics
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                7 billion tokens across 7 chains — 1 billion launching first on Solana
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="feature-card text-center">
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6">
                  <Coins className="text-gold" size={28} />
                </div>
                <div className="text-3xl font-medium text-gold mb-2">10%</div>
                <h3 className="text-lg font-medium mb-2">Liquidity</h3>
                <p className="text-white/50 text-sm">
                  700M tokens (100M per chain) paired for deep initial liquidity via Meteora & DEXs
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6">
                  <Zap className="text-gold" size={28} />
                </div>
                <div className="text-3xl font-medium text-gold mb-2">40%</div>
                <h3 className="text-lg font-medium mb-2">Fair Sale</h3>
                <p className="text-white/50 text-sm">
                  2.8B tokens sold via bonding curves for fair price discovery on each chain
                </p>
              </div>

              <div className="feature-card text-center">
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="text-gold" size={28} />
                </div>
                <div className="text-3xl font-medium text-gold mb-2">50%</div>
                <h3 className="text-lg font-medium mb-2">DAO Treasury</h3>
                <p className="text-white/50 text-sm">
                  3.5B tokens governed by the community for humanitarian programs
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-[#1a1a2e]/80 border border-[#D4AF37]/20">
                <span className="text-white/60">Total Supply:</span>
                <span className="text-2xl font-medium text-gold font-mono">7,000,000,000 MIGA</span>
              </div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <span className="text-[#D4AF37] text-sm font-medium">Solana Launch:</span>
                <span className="text-white font-mono">1B MIGA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Humanitarian Crisis Section */}
        <section className="section relative overflow-hidden">
          <div className="absolute inset-0 persian-geometric-bg opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-[#0a0a12]/95 to-[#0a0a12]" />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
                A <span className="text-gold">Humanitarian</span> Imperative
              </h2>
              <p className="text-white/60 max-w-3xl mx-auto text-lg">
                Millions of Iranians face unprecedented challenges. MIGA Protocol creates
                decentralized infrastructure to address critical needs through community-governed initiatives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="feature-card text-center">
                <div className="text-4xl font-medium text-gold mb-2">88M</div>
                <p className="text-white/50 text-sm">People affected by sanctions</p>
              </div>
              <div className="feature-card text-center">
                <div className="text-4xl font-medium text-gold mb-2">8M+</div>
                <p className="text-white/50 text-sm">Diaspora worldwide</p>
              </div>
              <div className="feature-card text-center">
                <div className="text-4xl font-medium text-gold mb-2">52%</div>
                <p className="text-white/50 text-sm">Women fighting for rights</p>
              </div>
              <div className="feature-card text-center">
                <div className="text-4xl font-medium text-gold mb-2">70%</div>
                <p className="text-white/50 text-sm">Youth seeking opportunity</p>
              </div>
            </div>
          </div>
        </section>

        {/* PIPs - MIGA Improvement Proposals */}
        <section className="section bg-[#0f0f1a]/50 relative">
          <div className="absolute inset-0 persian-border-pattern opacity-5" />
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                <span className="text-gold">PIPs</span> — MIGA Improvement Proposals
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                Modeled after the UN but decentralized. Each PIP funds a critical initiative
                governed by specialized DAOs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="feature-card border-l-2 border-l-[#D4AF37]">
                <Shield className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Women's Rights</h3>
                <p className="text-white/50 text-sm">
                  Supporting women's education, legal aid, and economic empowerment across the diaspora.
                </p>
              </div>

              <div className="feature-card border-l-2 border-l-[#D4AF37]">
                <Lock className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Privacy Technology</h3>
                <p className="text-white/50 text-sm">
                  ZK-proofs and FHE encryption for secure communication. Built on Lux Network infrastructure.
                </p>
              </div>

              <div className="feature-card border-l-2 border-l-[#D4AF37]">
                <Globe className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Secure Communications</h3>
                <p className="text-white/50 text-sm">
                  Censorship-resistant messaging and media distribution for activists and journalists.
                </p>
              </div>

              <div className="feature-card border-l-2 border-l-[#D4AF37]">
                <Users className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Education Access</h3>
                <p className="text-white/50 text-sm">
                  Scholarships, online learning, and skill development programs for Persian youth.
                </p>
              </div>

              <div className="feature-card border-l-2 border-l-[#D4AF37]">
                <Coins className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Economic Infrastructure</h3>
                <p className="text-white/50 text-sm">
                  Building pars.network blockchain and pars.markets for borderless trade.
                </p>
              </div>

              <div className="feature-card border-l-2 border-l-[#D4AF37]">
                <Zap className="text-gold mb-4" size={24} />
                <h3 className="text-lg font-medium mb-2">Persian Endowment</h3>
                <p className="text-white/50 text-sm">
                  A perpetual fund for eternal renewal — supporting Iran's future generations forever.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section className="section">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                The <span className="text-gold">Pars</span> Ecosystem
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">
                A complete decentralized infrastructure powered by MIGA and built on Lux Network
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="https://pars.network" className="feature-card hover:border-[#C9A227]/50 group">
                <div className="text-gold text-xl font-mono mb-2">pars.network</div>
                <p className="text-white/50 text-sm">Privacy-first L1 blockchain with ZK rollups</p>
              </a>

              <a href="https://pars.vote" className="feature-card hover:border-[#C9A227]/50 group">
                <div className="text-gold text-xl font-mono mb-2">pars.vote</div>
                <p className="text-white/50 text-sm">Shielded governance voting with FHE</p>
              </a>

              <a href="https://pars.markets" className="feature-card hover:border-[#C9A227]/50 group">
                <div className="text-gold text-xl font-mono mb-2">pars.markets</div>
                <p className="text-white/50 text-sm">Private prediction markets and trading</p>
              </a>

              <a href="https://pars.fund" className="feature-card hover:border-[#C9A227]/50 group">
                <div className="text-gold text-xl font-mono mb-2">pars.fund</div>
                <p className="text-white/50 text-sm">Perpetual endowment treasury</p>
              </a>
            </div>
          </div>
        </section>

        {/* How to Buy Section */}
        <section id="buy" className="section bg-[#0f0f1a]/50 relative">
          <div className="absolute inset-0 persian-border-pattern opacity-5" />
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                How to <span className="text-gold">Buy</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                { step: '01', title: 'Connect Wallet', desc: 'Use Phantom, Solflare, or any Solana wallet' },
                { step: '02', title: 'Get SOL', desc: 'Ensure you have SOL for purchase and transaction fees' },
                { step: '03', title: 'Swap on Meteora', desc: 'Buy MIGA through Meteora DLMM pool or bonding curve' },
              ].map((item) => (
                <div key={item.step} className="card p-6 flex items-start gap-5">
                  <span className="text-gold font-mono text-sm">{item.step}</span>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://app.meteora.ag/pools/MIGA_POOL"
                className="btn-primary inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trade on Meteora <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section relative overflow-hidden">
          {/* Persian stained glass inspired pattern */}
          <div className="absolute inset-0 persian-stained-glass opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-[#0a0a12]/95 to-[#0a0a12]/90" />

          {/* Sacred geometry overlay */}
          <div className="absolute inset-0 persian-hex-pattern opacity-20" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            {/* Decorative element */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 relative">
                <img src="/favicon.svg" alt="" className="w-full h-full animate-coin-glow" />
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">
              Join the <span className="gradient-text">Movement</span>
            </h2>

            {/* Farsi quote */}
            <p className="text-lg text-white/40 italic mb-2" dir="rtl">
              چو عضوی به درد آورد روزگار، دگر عضوها را نماند قرار
            </p>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Participate in governance, fund humanitarian programs, and help build
              a decentralized future for the Persian diaspora.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://miga.us.org" className="btn-primary inline-flex items-center gap-2">
                Visit the DAO <ArrowRight size={18} />
              </a>
              <a href="https://discord.gg/miga" className="btn-outline">
                Join Discord
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
