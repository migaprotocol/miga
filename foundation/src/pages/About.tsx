import { Globe, Users, Shield, BookOpen, Heart, Scale } from 'lucide-react';

export function About() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            About <span className="gradient-text">MIGA</span>
          </h1>
          <p className="text-xl text-gray-400">
            Make Iran Great Again — An Experimental Civic Operating System
          </p>
        </div>

        {/* Quote */}
        <div className="card p-8 bg-gradient-to-br from-amber-500/5 to-indigo-500/5 mb-16">
          <blockquote className="text-xl text-gray-300 italic text-center">
            "I am Cyrus, king of the world, great king, mighty king, king of Babylon... I gathered all their peoples and restored them to their homelands."
          </blockquote>
          <p className="text-amber-400 text-center mt-4 text-sm">— The Cyrus Cylinder, 539 BCE</p>
        </div>

        {/* Story */}
        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-3">
            <BookOpen className="text-amber-400" size={28} />
            The Story
          </h2>
          <p className="text-gray-300 mb-6">
            Twenty-five hundred years ago, Cyrus the Great founded an empire unlike any the world had seen.
            Rather than subjugate conquered peoples, he freed them. He restored their temples, returned their
            sacred objects, and allowed them to worship as they pleased. The Cyrus Cylinder, now housed in
            the British Museum, is considered the first declaration of human rights.
          </p>
          <p className="text-gray-300 mb-6">
            This tradition of pluralism and human dignity defined Persian civilization for millennia.
            From the Constitutional Revolution of 1905—the first democratic movement in Asia—to the
            vibrant intellectual culture that flourished in the 20th century, Iran has repeatedly
            demonstrated a capacity for self-governance and reform.
          </p>
          <p className="text-gray-300 mb-6">
            In 1953, when a democratically elected government moved to control Iran's natural resources,
            foreign powers intervened. The seeds of diaspora were planted. After 1979, millions scattered
            across the globe—to Los Angeles, London, Toronto, Berlin, Sydney, and beyond. Today, more than
            eight million Persians live outside Iran, spread across eighty-five countries.
          </p>
          <p className="text-gray-300 mb-6 italic">
            The empire fell. The people scattered. But the culture endures.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-3">
            <Scale className="text-amber-400" size={28} />
            The Vision
          </h2>
          <p className="text-gray-300 mb-6">
            MIGA is an experimental Civic Operating System for the Persian diaspora. We are building
            coordination infrastructure that can scale from NGO to nation—programmable commons that
            enable collective action across borders, languages, and generations.
          </p>
          <p className="text-gray-300 mb-6">
            This is not another crypto project. This is an attempt to build in code what tyrants cannot burn.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-3">
            <Heart className="text-amber-400" size={28} />
            Core Principles
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">The Cyrus Principle</h3>
              <p className="text-gray-400 text-sm">
                Pluralism and human dignity above all. Every voice matters. Minority rights protected.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Progressive Decentralization</h3>
              <p className="text-gray-400 text-sm">
                Start with trusted stewards, systematically transfer control to the community.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">Public Outcomes, Private Participation</h3>
              <p className="text-gray-400 text-sm">
                Treasury and decisions transparent. Voter identity protected for those in danger.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-2">No Extraction</h3>
              <p className="text-gray-400 text-sm">
                No VCs. No presales. No team allocation. Founders buy on the curve like everyone else.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-3">
            <Globe className="text-amber-400" size={28} />
            Multi-Chain Architecture
          </h2>
          <p className="text-gray-300 mb-6">
            MIGA operates across seven blockchains, meeting the diaspora wherever they are:
          </p>
          <div className="card p-6 mb-8">
            <ul className="space-y-3 text-gray-300">
              <li className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="font-medium">Solana</span>
                <span className="text-gray-500 text-sm">Native token, bonding curve</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="font-medium">Ethereum</span>
                <span className="text-gray-500 text-sm">DeFi integrations, DAO contracts</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="font-medium">Base</span>
                <span className="text-gray-500 text-sm">Low-cost transactions</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="font-medium">Arbitrum</span>
                <span className="text-gray-500 text-sm">L2 scaling</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="font-medium">Polygon</span>
                <span className="text-gray-500 text-sm">Mass adoption</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-3">
                <span className="font-medium">Lux</span>
                <span className="text-gray-500 text-sm">Privacy features</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Bitcoin</span>
                <span className="text-gray-500 text-sm">Store of value (Runes)</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-3">
            <Users className="text-amber-400" size={28} />
            Ten DAOs, One Mission
          </h2>
          <p className="text-gray-300 mb-6">
            MIGA separates political governance (PARS token) from capital allocation (10 specialized DAOs).
            Each pillar addresses a critical civic function, governed by vePARS holders who direct funding
            and policy.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {[
              { symbol: 'KHAZ', name: 'Treasury', persian: 'خزانه' },
              { symbol: 'AMN', name: 'Security', persian: 'امنیّت' },
              { symbol: 'SAL', name: 'Health', persian: 'سلامت' },
              { symbol: 'FARH', name: 'Culture', persian: 'فرهنگ' },
              { symbol: 'DAN', name: 'Research', persian: 'دانش' },
              { symbol: 'SAZ', name: 'Infra', persian: 'سازندگی' },
              { symbol: 'DAD', name: 'Gov', persian: 'داد' },
              { symbol: 'PAY', name: 'Consular', persian: 'پیام' },
              { symbol: 'WAQF', name: 'Endow', persian: 'وقف' },
              { symbol: 'MIZ', name: 'Integrity', persian: 'میزان' },
            ].map((dao) => (
              <div key={dao.symbol} className="card p-3 text-center">
                <p className="text-amber-400 font-bold text-sm">{dao.symbol}</p>
                <p className="text-white text-xs mt-1">{dao.name}</p>
                <p className="text-gray-500 text-xs">{dao.persian}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6 flex items-center gap-3">
            <Shield className="text-amber-400" size={28} />
            Tokenomics
          </h2>
          <div className="card p-6 mb-8">
            <ul className="space-y-4 text-gray-300">
              <li className="flex justify-between items-center border-b border-slate-700 pb-4">
                <span>Total Supply (Multi-chain)</span>
                <span className="font-semibold text-white">7,000,000,000 MIGA</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-4">
                <span>Live on Solana</span>
                <span className="font-semibold text-green-400">1B (First Chain)</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-4">
                <span>Meteora LP (Initial Liquidity)</span>
                <span className="font-semibold text-amber-400">10% (100M)</span>
              </li>
              <li className="flex justify-between items-center border-b border-slate-700 pb-4">
                <span>Bonding Curve (Fair Launch)</span>
                <span className="font-semibold text-indigo-400">40% (400M)</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Treasury (Community Governed)</span>
                <span className="font-semibold text-purple-400">50% (500M)</span>
              </li>
            </ul>
            <p className="text-gray-500 text-sm mt-4 text-center italic">
              No VCs. No presales. No team allocation.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold mb-4">One Day, We Go Home</h2>
          <p className="text-gray-400 mb-6">
            Until then, we build. Join the movement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://migaprotocol.xyz" className="btn-primary">
              Get $MIGA
            </a>
            <a href="/community" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
              Find Your Chapter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
