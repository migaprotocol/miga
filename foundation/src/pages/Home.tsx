import { ArrowRight, Users, Globe, Shield } from 'lucide-react';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-indigo-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <p className="text-amber-400 font-medium mb-4 text-lg">Make Iran Great Again</p>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">MIGA</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              An Experimental Operating System for Rebuilding a Nation & Building Community
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto italic">
              "I am Cyrus, king of the world... I gathered all their peoples and restored them to their homelands."
              <span className="block mt-2 text-amber-400 text-sm">— The Cyrus Cylinder, 539 BCE</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://migaprotocol.xyz" className="btn-primary inline-flex items-center justify-center gap-2">
                Get $MIGA <ArrowRight size={18} />
              </a>
              <a href="/about" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition text-center">
                Learn Our Story
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Legacy Section */}
      <section className="py-16 border-y border-slate-700/50 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            From <span className="text-amber-400">Empire</span> to <span className="text-amber-400">Exile</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <p className="text-3xl font-bold text-amber-400">2,500+</p>
              <p className="text-gray-400 mt-2">Years of Civilization</p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl font-bold text-amber-400">8M+</p>
              <p className="text-gray-400 mt-2">Diaspora Worldwide</p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl font-bold text-amber-400">85+</p>
              <p className="text-gray-400 mt-2">Countries Represented</p>
            </div>
            <div className="card p-6 text-center">
              <p className="text-3xl font-bold text-amber-400">10</p>
              <p className="text-gray-400 mt-2">Specialized DAOs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            The <span className="gradient-text">Long Arc</span> of History
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            From the first declaration of human rights to the digital age
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">550-330 BCE</p>
              <h3 className="text-lg font-bold mt-2">Achaemenid Empire</h3>
              <p className="text-gray-400 text-sm mt-2">
                Cyrus the Great establishes first human rights, pluralistic governance across many peoples.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">1905-1911</p>
              <h3 className="text-lg font-bold mt-2">Constitutional Revolution</h3>
              <p className="text-gray-400 text-sm mt-2">
                First democratic movement in Asia. Power must be constrained by structure.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">1953</p>
              <h3 className="text-lg font-bold mt-2">Operation Ajax</h3>
              <p className="text-gray-400 text-sm mt-2">
                CIA/MI6 coup overthrows Mosaddegh. Seeds of diaspora planted.
              </p>
            </div>
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">2026+</p>
              <h3 className="text-lg font-bold mt-2">MIGA Protocol</h3>
              <p className="text-gray-400 text-sm mt-2">
                Building in code what tyrants cannot burn. The state-in-exile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            A <span className="gradient-text">Civic Operating System</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Not another DAO. A programmable commons that scales from NGO to nation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                <Globe className="text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">7 Blockchains</h3>
              <p className="text-gray-400">
                Native on Solana, bridged to Ethereum, Base, Arbitrum, Polygon, Lux, and Bitcoin via Wormhole.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                <Users className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10 Specialized DAOs</h3>
              <p className="text-gray-400">
                Treasury, Security, Health, Culture, Research, Infrastructure, and more. Each with Persian heritage names.
              </p>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Shield className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy by Design</h3>
              <p className="text-gray-400">
                Public outcomes, private participation. Protected voting for high-threat environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Ten DAOs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            The <span className="gradient-text">Ten Pillars</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Specialized DAOs with Persian heritage names, each governing a critical domain
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
              <div key={dao.symbol} className="card p-4 text-center hover:border-amber-500/50 transition">
                <p className="text-amber-400 font-bold">{dao.symbol}</p>
                <p className="text-white font-medium mt-1">{dao.name}</p>
                <p className="text-gray-500 text-sm mt-1">{dao.persian}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-16 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Tokenomics</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold gradient-text">1B</p>
              <p className="text-gray-400 mt-2">Total Supply</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold gradient-text">10%</p>
              <p className="text-gray-400 mt-2">Meteora LP</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold gradient-text">40%</p>
              <p className="text-gray-400 mt-2">Bonding Curve</p>
            </div>
            <div className="text-center">
              <p className="text-3xl lg:text-4xl font-bold gradient-text">50%</p>
              <p className="text-gray-400 mt-2">DAO Treasury</p>
            </div>
          </div>
          <p className="text-center text-gray-500 mt-8 text-sm">
            No VCs. No presales. No team allocation. The team participates like everyone else.
          </p>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            From NGO to <span className="gradient-text">Nation-Scale</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">Phase 1</p>
              <h3 className="text-lg font-bold mt-2">Foundation</h3>
              <p className="text-gray-500 text-sm">2026-2027</p>
              <ul className="text-gray-400 text-sm mt-3 space-y-1">
                <li>• Legal entity</li>
                <li>• Core contracts</li>
                <li>• 3 priority DAOs</li>
                <li>• 1,000+ holders</li>
              </ul>
            </div>
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">Phase 2</p>
              <h3 className="text-lg font-bold mt-2">Civic OS</h3>
              <p className="text-gray-500 text-sm">2027-2028</p>
              <ul className="text-gray-400 text-sm mt-3 space-y-1">
                <li>• All 10 DAOs live</li>
                <li>• Privacy layer</li>
                <li>• 7-chain bridge</li>
                <li>• 10K+ holders</li>
              </ul>
            </div>
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">Phase 3</p>
              <h3 className="text-lg font-bold mt-2">Scale</h3>
              <p className="text-gray-500 text-sm">2028-2030</p>
              <ul className="text-gray-400 text-sm mt-3 space-y-1">
                <li>• 40+ countries</li>
                <li>• 100K+ members</li>
                <li>• $100M+ TVL</li>
                <li>• Self-sustaining</li>
              </ul>
            </div>
            <div className="card p-6">
              <p className="text-amber-400 font-semibold">Phase 4</p>
              <h3 className="text-lg font-bold mt-2">Nation-Ready</h3>
              <p className="text-gray-500 text-sm">2030+</p>
              <ul className="text-gray-400 text-sm mt-3 space-y-1">
                <li>• Full civic services</li>
                <li>• Decentralized ops</li>
                <li>• Multi-gen endowment</li>
                <li>• Ready for return</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-500/10 to-indigo-500/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            The Empire Fell. The People Scattered.
          </h2>
          <p className="text-2xl text-amber-400 font-semibold mb-6">
            The Code Endures.
          </p>
          <p className="text-gray-300 text-lg mb-8 italic">
            One day, we go home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://migaprotocol.xyz" className="btn-primary">
              Join MIGA
            </a>
            <a href="/community" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
              Find Your Chapter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
