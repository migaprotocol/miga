import { useState } from 'react';
import { FileText, Filter, Search } from 'lucide-react';
import { mips, mipCategories, mipStatuses, MIP } from '../data/mips';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-500/20 text-gray-400',
  discussion: 'bg-blue-500/20 text-blue-400',
  voting: 'bg-yellow-500/20 text-yellow-400',
  passed: 'bg-green-500/20 text-green-400',
  rejected: 'bg-red-500/20 text-red-400',
  implemented: 'bg-emerald-500/20 text-emerald-400',
};

const categoryColors: Record<string, string> = {
  governance: 'bg-indigo-500/20 text-indigo-400',
  treasury: 'bg-amber-500/20 text-amber-400',
  security: 'bg-red-500/20 text-red-400',
  culture: 'bg-purple-500/20 text-purple-400',
  infrastructure: 'bg-green-500/20 text-green-400',
  process: 'bg-cyan-500/20 text-cyan-400',
};

const borderColors: Record<string, string> = {
  governance: 'border-l-indigo-500',
  treasury: 'border-l-amber-500',
  security: 'border-l-red-500',
  culture: 'border-l-purple-500',
  infrastructure: 'border-l-green-500',
  process: 'border-l-cyan-500',
};

export function MIPs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMips = mips.filter((mip: MIP) => {
    const matchesSearch = searchQuery === '' ||
      mip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `MIP-${mip.id}`.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || mip.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || mip.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: mips.length,
    implemented: mips.filter(m => m.status === 'implemented').length,
    passed: mips.filter(m => m.status === 'passed').length,
    voting: mips.filter(m => m.status === 'voting').length,
    discussion: mips.filter(m => m.status === 'discussion').length,
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">MIGA Improvement Proposals</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            All governance proposals for the MIGA protocol. Track discussions, votes, and implementations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-white">{stats.total}</p>
            <p className="text-gray-500 text-sm">Total MIPs</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{stats.implemented}</p>
            <p className="text-gray-500 text-sm">Implemented</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{stats.passed}</p>
            <p className="text-gray-500 text-sm">Passed</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{stats.voting}</p>
            <p className="text-gray-500 text-sm">Voting</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{stats.discussion}</p>
            <p className="text-gray-500 text-sm">Discussion</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search MIPs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" size={18} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
              >
                <option value="all">All Categories</option>
                {Object.entries(mipCategories).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
            >
              <option value="all">All Statuses</option>
              {Object.entries(mipStatuses).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* MIPs List */}
        <div className="space-y-4">
          {filteredMips.length > 0 ? (
            filteredMips.map((mip) => (
              <div key={mip.id} className={`card p-6 border-l-4 ${borderColors[mip.category]} hover:bg-slate-800/50 transition cursor-pointer`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-amber-400 font-mono font-bold">MIP-{mip.id}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${statusColors[mip.status]}`}>
                        {mipStatuses[mip.status].label}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${categoryColors[mip.category]}`}>
                        {mipCategories[mip.category].label}
                      </span>
                      {mip.dao && (
                        <span className="text-gray-500 text-xs bg-slate-700/50 px-2 py-0.5 rounded">{mip.dao}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{mip.title}</h3>
                    {mip.titlePersian && (
                      <p className="text-gray-500 text-sm mb-2">{mip.titlePersian}</p>
                    )}
                    <p className="text-gray-400 text-sm mb-3">{mip.summary}</p>
                    {mip.motivation && (
                      <p className="text-gray-500 text-xs italic">{mip.motivation}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span>Author: {mip.author}</span>
                      <span>Created: {mip.created}</span>
                    </div>
                  </div>
                  {(mip.status === 'voting' || mip.status === 'discussion') && (
                    <button className="btn-primary text-sm flex-shrink-0">
                      {mip.status === 'voting' ? 'Vote Now' : 'Join Discussion'}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="card p-12 text-center">
              <FileText className="mx-auto text-gray-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">No MIPs Found</h3>
              <p className="text-gray-400">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Submit CTA */}
        <section className="mt-16 card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Submit a Proposal</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Have an idea for improving MIGA? Start by discussing in Discord, then submit a formal MIP for community vote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://discord.gg/miga" className="btn-primary">
              Start Discussion
            </a>
            <a href="/governance" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
              Learn MIP Process
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
