import { BookOpen, Users, Globe, Shield, Heart, Briefcase, GraduationCap, Building, Scale, FileText } from 'lucide-react';

const programs = [
  {
    id: 'khaz',
    symbol: 'KHAZ',
    persian: 'خزانه',
    name: 'Treasury',
    domain: 'Financial Infrastructure',
    icon: Briefcase,
    color: 'amber',
    description: 'Central treasury management for the MIGA ecosystem. Manages diversified reserves, coordinates cross-DAO funding, and ensures long-term financial sustainability.',
    initiatives: [
      'Multi-chain treasury infrastructure',
      'Reserve diversification strategy',
      'Cross-DAO funding coordination',
      'Financial reporting and transparency'
    ],
    strategy: 'Diversified reserves (25% allocation target)'
  },
  {
    id: 'amn',
    symbol: 'AMN',
    persian: 'امنیّت',
    name: 'Security',
    domain: 'Safety & Protection',
    icon: Shield,
    color: 'red',
    description: 'Operational security for community members, smart contract audits, and protection systems for high-threat environments.',
    initiatives: [
      'Smart contract security audits',
      'Privacy-preserving voting systems',
      'Secure communication infrastructure',
      'Threat monitoring and response'
    ],
    strategy: 'Stablecoin-only holdings, regular audits'
  },
  {
    id: 'sal',
    symbol: 'SAL',
    persian: 'سلامت',
    name: 'Health',
    domain: 'Healthcare Access',
    icon: Heart,
    color: 'pink',
    description: 'Healthcare coordination for diaspora communities, mental health support, and medical resource sharing networks.',
    initiatives: [
      'Diaspora health networks',
      'Mental health support programs',
      'Medical professional directory',
      'Health education resources'
    ],
    strategy: 'Stablecoin + yield-bearing positions'
  },
  {
    id: 'farh',
    symbol: 'FARH',
    persian: 'فرهنگ',
    name: 'Culture',
    domain: 'Heritage & Arts',
    icon: BookOpen,
    color: 'purple',
    description: 'Preserving and promoting Persian cultural heritage through arts, language, and educational programming.',
    initiatives: [
      'Persian language preservation',
      'Cultural heritage documentation',
      'Artist grants and residencies',
      'Nowruz and cultural event funding'
    ],
    strategy: 'Creator grants, cultural investment'
  },
  {
    id: 'dan',
    symbol: 'DAN',
    persian: 'دانش',
    name: 'Research',
    domain: 'Knowledge & Education',
    icon: GraduationCap,
    color: 'blue',
    description: 'Funding research on diaspora issues, governance models, and technology development for community benefit.',
    initiatives: [
      'Diaspora research grants',
      'Academic partnerships',
      'Policy research and analysis',
      'Technology R&D funding'
    ],
    strategy: 'Research grants, academic partnerships'
  },
  {
    id: 'saz',
    symbol: 'SAZ',
    persian: 'سازندگی',
    name: 'Infrastructure',
    domain: 'Technical Systems',
    icon: Building,
    color: 'green',
    description: 'Building and maintaining the technical infrastructure that powers the MIGA ecosystem across 7 blockchains.',
    initiatives: [
      'Multi-chain infrastructure',
      'Bridge maintenance and security',
      'Developer tooling and SDKs',
      'Infrastructure scaling'
    ],
    strategy: 'Procurement, technical investment'
  },
  {
    id: 'dad',
    symbol: 'DAD',
    persian: 'داد',
    name: 'Governance',
    domain: 'Coordination',
    icon: Scale,
    color: 'indigo',
    description: 'Governance tooling, proposal systems, and coordination mechanisms for the MIGA Improvement Proposals (MIPs).',
    initiatives: [
      'MIP proposal system',
      'Voting infrastructure',
      'Governance documentation',
      'Cross-DAO coordination'
    ],
    strategy: 'Minimal holdings, focus on tooling'
  },
  {
    id: 'pay',
    symbol: 'PAY',
    persian: 'پیام',
    name: 'Consular',
    domain: 'Community Relations',
    icon: Users,
    color: 'cyan',
    description: 'Coordination between diaspora chapters across 85+ countries, facilitating communication and resource sharing.',
    initiatives: [
      'Chapter coordination',
      'Cross-border communication',
      'Community event support',
      'Diaspora networking'
    ],
    strategy: 'Coordination, chapter support'
  },
  {
    id: 'waqf',
    symbol: 'WAQF',
    persian: 'وقف',
    name: 'Endowment',
    domain: 'Long-term Wealth',
    icon: Globe,
    color: 'yellow',
    description: 'Multi-generational endowment following the Persian waqf tradition. Long-horizon investments for perpetual community benefit.',
    initiatives: [
      'Endowment fund management',
      'Long-term investment strategy',
      'Perpetual grant programs',
      'Legacy planning'
    ],
    strategy: 'Long-horizon venture, preservation'
  },
  {
    id: 'miz',
    symbol: 'MIZ',
    persian: 'میزان',
    name: 'Integrity',
    domain: 'Accountability',
    icon: FileText,
    color: 'orange',
    description: 'Impact auditing, accountability mechanisms, and ensuring all DAOs operate with transparency and integrity.',
    initiatives: [
      'Impact measurement',
      'Financial audits',
      'Accountability reporting',
      'Whistleblower protection'
    ],
    strategy: 'Impact audits, verification'
  }
];

const colorClasses: Record<string, string> = {
  amber: 'bg-amber-500/20 text-amber-400',
  red: 'bg-red-500/20 text-red-400',
  pink: 'bg-pink-500/20 text-pink-400',
  purple: 'bg-purple-500/20 text-purple-400',
  blue: 'bg-blue-500/20 text-blue-400',
  green: 'bg-green-500/20 text-green-400',
  indigo: 'bg-indigo-500/20 text-indigo-400',
  cyan: 'bg-cyan-500/20 text-cyan-400',
  yellow: 'bg-yellow-500/20 text-yellow-400',
  orange: 'bg-orange-500/20 text-orange-400',
};

export function Programs() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            The Ten <span className="gradient-text">Pillars</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Specialized DAOs with Persian heritage names, each governing a critical domain of the civic operating system.
          </p>
        </div>

        {/* Governance Formula */}
        <section className="mb-16">
          <div className="card p-8 bg-gradient-to-br from-amber-500/5 to-indigo-500/5">
            <h2 className="text-2xl font-bold mb-4 text-center">Governance Power Formula</h2>
            <div className="text-center mb-6">
              <code className="text-lg text-amber-400 bg-slate-800 px-4 py-2 rounded">
                vePARS = min(PARS, MIGA) × √(lock_duration / max_duration)
              </code>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold text-amber-400">Balance</h3>
                <p className="text-gray-400 text-sm">Need both tokens—whales cannot dominate</p>
              </div>
              <div>
                <h3 className="font-semibold text-amber-400">Commitment</h3>
                <p className="text-gray-400 text-sm">Longer locks earn more governance power</p>
              </div>
              <div>
                <h3 className="font-semibold text-amber-400">Diminishing Returns</h3>
                <p className="text-gray-400 text-sm">Square root prevents capture by large holders</p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <div className="space-y-8">
          {programs.map((program) => (
            <div key={program.id} className="card p-8" id={program.id}>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3">
                  <div className={`w-16 h-16 rounded-lg ${colorClasses[program.color]} flex items-center justify-center mb-4`}>
                    <program.icon size={32} />
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-amber-400">{program.symbol}</span>
                    <span className="text-gray-500">|</span>
                    <span className="text-xl text-gray-300">{program.name}</span>
                  </div>
                  <p className="text-gray-500 text-lg mb-2">{program.persian}</p>
                  <p className="text-sm text-gray-400 mb-4">{program.domain}</p>
                  <div className="text-xs text-gray-500 bg-slate-800/50 px-3 py-2 rounded">
                    <span className="text-gray-400">Strategy:</span> {program.strategy}
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-gray-300 mb-6">{program.description}</p>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Initiatives</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {program.initiatives.map((initiative, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-amber-400 mt-1">•</span>
                        {initiative}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Get Involved */}
        <section className="mt-16 card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Participate in Governance</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Each DAO is governed by vePARS holders. Acquire tokens, lock them, and help direct
            resources to the pillars that matter most to you and the Persian diaspora.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/governance" className="btn-primary">
              View MIPs
            </a>
            <a href="https://migaprotocol.xyz" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
              Get MIGA Tokens
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
