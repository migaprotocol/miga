import { Users, Globe, Shield, BookOpen, Briefcase, Heart } from 'lucide-react';

interface BoardMember {
  name: string;
  role: string;
  bio: string;
  location: string;
}

const boardMembers: BoardMember[] = [
  {
    name: "Founding Council",
    role: "Stewardship Committee",
    bio: "The initial stewards who established the MIGA framework. Committed to transitioning governance to community control as the protocol matures.",
    location: "Global"
  }
];

const advisoryCouncil = [
  {
    area: "Legal & Compliance",
    icon: Shield,
    description: "International nonprofit law, sanctions compliance, and diaspora legal frameworks."
  },
  {
    area: "Technology",
    icon: BookOpen,
    description: "Blockchain architecture, privacy-preserving systems, and secure communications."
  },
  {
    area: "Cultural Heritage",
    icon: Heart,
    description: "Persian history, language preservation, and cultural programming."
  },
  {
    area: "Finance & Treasury",
    icon: Briefcase,
    description: "Nonprofit finance, treasury management, and sustainable funding models."
  },
  {
    area: "Diaspora Relations",
    icon: Globe,
    description: "Community building across 85+ countries where Persians have settled."
  },
  {
    area: "Security",
    icon: Shield,
    description: "Operational security for high-threat environments and privacy protection."
  }
];

export function Board() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Leadership</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stewards of the MIGA Civic Operating System, committed to transparent governance and community empowerment.
          </p>
        </div>

        {/* Governance Philosophy */}
        <section className="mb-16">
          <div className="card p-8 bg-gradient-to-br from-amber-500/5 to-indigo-500/5">
            <h2 className="text-2xl font-bold mb-4">Governance Philosophy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">Progressive Decentralization</h3>
                <p className="text-gray-400">
                  MIGA follows a path of progressive decentralization. Initial stewards maintain operational
                  continuity while systematically transferring authority to community-governed DAOs. The goal
                  is full community control through the vePARS governance system.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-2">The Cyrus Principle</h3>
                <p className="text-gray-400">
                  Following the example of Cyrus the Great, who established the first declaration of human
                  rights, MIGA governance prioritizes pluralism, individual dignity, and the protection of
                  minority voices within the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founding Council */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Founding Council</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardMembers.map((member, index) => (
              <div key={index} className="card p-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-indigo-500/20 flex items-center justify-center mb-4">
                  <Users className="text-amber-400" size={28} />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-amber-400 text-sm mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm mb-3">{member.bio}</p>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <Globe size={12} /> {member.location}
                </p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6 text-center italic">
            Individual board member profiles will be published as operational security permits.
            Many contributors work in sensitive environments.
          </p>
        </section>

        {/* Advisory Council */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Advisory Expertise</h2>
          <p className="text-gray-400 mb-8">
            MIGA draws on expertise across critical domains to ensure the protocol serves its mission effectively.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisoryCouncil.map((advisor, index) => (
              <div key={index} className="card p-6">
                <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center mb-4">
                  <advisor.icon className="text-amber-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{advisor.area}</h3>
                <p className="text-gray-400 text-sm">{advisor.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Ten DAOs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">The Ten DAOs</h2>
          <p className="text-gray-400 mb-8">
            Governance is distributed across ten specialized DAOs, each with Persian heritage names
            reflecting their domain. vePARS holders direct funding and policy for each pillar.
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
                <p className="text-white font-medium text-sm mt-1">{dao.name}</p>
                <p className="text-gray-500 text-xs mt-1">{dao.persian}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join Leadership */}
        <section className="card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Contribute to Governance</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            MIGA governance is open to all token holders. Acquire MIGA and PARS tokens, lock them for
            vePARS, and participate in shaping the future of the Persian diaspora's civic infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/governance" className="btn-primary">
              View Governance
            </a>
            <a href="https://migaprotocol.xyz" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
              Get Tokens
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
