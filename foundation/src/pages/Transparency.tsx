import { FileText, ExternalLink, Shield, Eye, Lock, CheckCircle } from 'lucide-react';

const treasuryAllocations = [
  { category: 'Meteora DLMM LP', percentage: 10, description: 'Initial liquidity provision' },
  { category: 'Bonding Curve', percentage: 40, description: 'One-sided bonding curve for fair launch' },
  { category: 'DAO Treasury', percentage: 50, description: 'Community-governed allocation' },
];

const daoAllocations = [
  { dao: 'KHAZ (Treasury)', target: '25%', strategy: 'Diversified reserves' },
  { dao: 'AMN (Security)', target: '10%', strategy: 'Stablecoin-only, audits' },
  { dao: 'SAL (Health)', target: '10%', strategy: 'Stablecoin + yield' },
  { dao: 'FARH (Culture)', target: '10%', strategy: 'Creator grants' },
  { dao: 'DAN (Research)', target: '10%', strategy: 'Research grants' },
  { dao: 'SAZ (Infrastructure)', target: '15%', strategy: 'Technical procurement' },
  { dao: 'DAD (Governance)', target: '5%', strategy: 'Minimal, tooling' },
  { dao: 'PAY (Consular)', target: '5%', strategy: 'Coordination' },
  { dao: 'WAQF (Endowment)', target: '5%', strategy: 'Long-horizon venture' },
  { dao: 'MIZ (Integrity)', target: '5%', strategy: 'Impact audits' },
];

const transparencyCommitments = [
  {
    title: 'On-Chain Treasury',
    description: 'All DAO treasuries are managed through transparent ERC-4626 vaults on public blockchains.',
    icon: Eye,
  },
  {
    title: 'Governance Records',
    description: 'All MIP proposals, votes, and outcomes are permanently recorded on-chain.',
    icon: FileText,
  },
  {
    title: 'Security Audits',
    description: 'Smart contracts undergo regular third-party security audits before deployment.',
    icon: Shield,
  },
  {
    title: 'Privacy Where Needed',
    description: 'Public outcomes, private participation. Voter privacy protected in high-threat environments.',
    icon: Lock,
  },
];

export function Transparency() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Transparency</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building in public. Every token, every vote, every decision—verifiable on-chain.
          </p>
        </div>

        {/* Core Principles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Our Commitments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transparencyCommitments.map((commitment, index) => (
              <div key={index} className="card p-6">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                  <commitment.icon className="text-amber-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{commitment.title}</h3>
                <p className="text-gray-400 text-sm">{commitment.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tokenomics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Token Distribution</h2>
          <div className="card p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Initial Allocation</h3>
                <div className="space-y-4">
                  {treasuryAllocations.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">{item.category}</span>
                        <span className="text-amber-400 font-semibold">{item.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-indigo-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-amber-400">Key Facts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-300">Total Supply: 7B MIGA (multi-chain) — 1B live on Solana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-300">No VC allocation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-300">No presale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-300">No team allocation—team buys on curve like everyone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-gray-300">Native on Solana, bridged to 6 EVM chains</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DAO Treasury Targets */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">DAO Treasury Allocation Targets</h2>
          <p className="text-gray-400 mb-6">
            The 50% DAO Treasury allocation is distributed across the ten pillars based on
            governance votes. These are initial target allocations, subject to community adjustment.
          </p>
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">DAO Pillar</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Target</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Investment Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {daoAllocations.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 text-gray-300">{item.dao}</td>
                    <td className="px-6 py-4 text-amber-400 font-medium">{item.target}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{item.strategy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verification */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Verify Yourself</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">Smart Contracts</h3>
              <p className="text-gray-400 text-sm mb-4">
                All contracts are verified and open source. Review the code yourself.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-amber-400">Solana:</span> SPL Token (Anchor)
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-amber-400">EVM:</span> ERC-20, ERC-4626 Vaults
                </li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-3">Governance</h3>
              <p className="text-gray-400 text-sm mb-4">
                All proposals and votes are recorded on-chain through the MIP system.
              </p>
              <a href="/governance" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm">
                View Active MIPs <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* Reporting */}
        <section className="card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Transparency Reports</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Quarterly transparency reports will be published detailing treasury movements,
              governance decisions, and ecosystem metrics. The MIZ (Integrity) DAO oversees all reporting.
            </p>
            <p className="text-gray-500 text-sm italic">
              First report scheduled after protocol launch.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
