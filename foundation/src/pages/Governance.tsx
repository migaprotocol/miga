import { Vote, FileText, Users, Shield, Clock, ExternalLink, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mips, mipStatuses } from '../data/mips';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-500/20 text-gray-400',
  discussion: 'bg-blue-500/20 text-blue-400',
  voting: 'bg-yellow-500/20 text-yellow-400',
  passed: 'bg-green-500/20 text-green-400',
  rejected: 'bg-red-500/20 text-red-400',
  implemented: 'bg-emerald-500/20 text-emerald-400',
};

const categoryColors: Record<string, string> = {
  governance: 'border-indigo-500/50',
  treasury: 'border-amber-500/50',
  security: 'border-red-500/50',
  culture: 'border-purple-500/50',
  infrastructure: 'border-green-500/50',
  process: 'border-cyan-500/50',
};

export function Governance() {
  const activeMips = mips.filter(m => m.status === 'voting' || m.status === 'discussion');
  const recentMips = mips.filter(m => m.status === 'passed' || m.status === 'implemented').slice(0, 5);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Governance</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            MIGA is governed by its community through the vePARS system. Propose, discuss, and vote on all protocol decisions.
          </p>
        </div>

        {/* vePARS Explainer */}
        <section className="mb-16">
          <div className="card p-8 bg-gradient-to-br from-amber-500/5 to-indigo-500/5">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-amber-400" size={28} />
              <h2 className="text-2xl font-bold">vePARS Governance</h2>
            </div>
            <div className="text-center mb-8">
              <code className="text-lg text-amber-400 bg-slate-800 px-4 py-2 rounded">
                vePARS = min(PARS, MIGA) × √(lock_duration / max_duration)
              </code>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                  <Users className="text-amber-400" size={24} />
                </div>
                <h3 className="font-semibold text-amber-400 mb-2">Balance</h3>
                <p className="text-gray-400 text-sm">Need both MIGA and PARS tokens. Whales without MIGA cannot dominate.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                  <Clock className="text-amber-400" size={24} />
                </div>
                <h3 className="font-semibold text-amber-400 mb-2">Commitment</h3>
                <p className="text-gray-400 text-sm">Longer lock durations earn more governance power. Max lock: 4 years.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-3">
                  <Shield className="text-amber-400" size={24} />
                </div>
                <h3 className="font-semibold text-amber-400 mb-2">Diminishing Returns</h3>
                <p className="text-gray-400 text-sm">Square root function prevents governance capture by large holders.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Features */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                <Vote className="text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">10 DAOs</h3>
              <p className="text-gray-400 text-sm">
                Vote on funding and policy for each of the ten specialized pillars.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                <FileText className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">MIP Proposals</h3>
              <p className="text-gray-400 text-sm">
                Any vePARS holder can submit MIGA Improvement Proposals.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Users className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Delegation</h3>
              <p className="text-gray-400 text-sm">
                Delegate your vePARS power to trusted community representatives.
              </p>
            </div>

            <div className="card p-6">
              <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                <Shield className="text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Timelock</h3>
              <p className="text-gray-400 text-sm">
                48-hour timelock on all passed proposals before execution.
              </p>
            </div>
          </div>
        </section>

        {/* Active Proposals */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Active Proposals</h2>
            <Link to="/mips" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1">
              View All MIPs <ExternalLink size={14} />
            </Link>
          </div>
          {activeMips.length > 0 ? (
            <div className="space-y-4">
              {activeMips.map((mip) => (
                <div key={mip.id} className={`card p-6 border-l-4 ${categoryColors[mip.category]}`}>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-amber-400 font-mono text-sm">MIP-{mip.id}</span>
                        <span className={`px-2 py-0.5 rounded text-xs ${statusColors[mip.status]}`}>
                          {mipStatuses[mip.status].label}
                        </span>
                        {mip.dao && (
                          <span className="text-gray-500 text-xs">{mip.dao}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-1">{mip.title}</h3>
                      {mip.titlePersian && (
                        <p className="text-gray-500 text-sm mb-2">{mip.titlePersian}</p>
                      )}
                      <p className="text-gray-400 text-sm">{mip.summary}</p>
                    </div>
                    <button className="btn-primary text-sm">
                      {mip.status === 'voting' ? 'Vote Now' : 'Join Discussion'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p className="text-gray-400">No active proposals at this time.</p>
            </div>
          )}
        </section>

        {/* Recent Passed */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recently Passed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentMips.map((mip) => (
              <div key={mip.id} className="card p-4 hover:border-amber-500/30 transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-400 font-mono text-xs">MIP-{mip.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs ${statusColors[mip.status]}`}>
                    {mipStatuses[mip.status].label}
                  </span>
                </div>
                <h3 className="font-medium text-sm mb-1">{mip.title}</h3>
                <p className="text-gray-500 text-xs line-clamp-2">{mip.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">How It Works</h2>
          <div className="card p-8">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-400 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Discussion</h4>
                <p className="text-gray-400 text-sm">Ideas discussed in Discord and forums before formal proposal.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-400 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-white mb-2">MIP Submission</h4>
                <p className="text-gray-400 text-sm">Formal proposal submitted with required vePARS threshold.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-400 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Voting</h4>
                <p className="text-gray-400 text-sm">5-day voting period. Quorum: 10% of total vePARS.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-400 font-bold">4</span>
                </div>
                <h4 className="font-semibold text-white mb-2">Execution</h4>
                <p className="text-gray-400 text-sm">48-hour timelock, then automatic on-chain execution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Participate in Governance</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Lock your MIGA and PARS tokens to receive vePARS and participate in shaping the future of the Persian diaspora's civic infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://migaprotocol.xyz" className="btn-primary">
              Get Tokens
            </a>
            <a href="https://discord.gg/miga" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
              Join Discord
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
