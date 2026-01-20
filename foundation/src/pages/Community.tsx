import { MessageCircle, Twitter, Github, Send, MapPin, Users, Globe, Heart, Calendar, Book } from 'lucide-react';

const chapters = [
  {
    region: 'North America',
    cities: [
      { name: 'Los Angeles', members: '500+', active: true },
      { name: 'New York', members: '200+', active: true },
      { name: 'Toronto', members: '150+', active: true },
      { name: 'Vancouver', members: '100+', active: true },
      { name: 'San Francisco', members: '80+', active: true },
      { name: 'Washington DC', members: '50+', active: false },
    ],
  },
  {
    region: 'Europe',
    cities: [
      { name: 'London', members: '200+', active: true },
      { name: 'Berlin', members: '100+', active: true },
      { name: 'Paris', members: '80+', active: true },
      { name: 'Stockholm', members: '50+', active: false },
      { name: 'Vienna', members: '40+', active: false },
    ],
  },
  {
    region: 'Middle East',
    cities: [
      { name: 'Dubai', members: '150+', active: true },
      { name: 'Istanbul', members: '100+', active: true },
    ],
  },
  {
    region: 'Asia-Pacific',
    cities: [
      { name: 'Sydney', members: '80+', active: true },
      { name: 'Melbourne', members: '50+', active: false },
      { name: 'Singapore', members: '30+', active: false },
    ],
  },
];

const upcomingEvents = [
  {
    name: 'Nowruz Global Celebration',
    date: 'March 2026',
    type: 'Festival',
    description: 'Persian New Year celebrations across 20+ cities worldwide.',
  },
  {
    name: 'MIGA Governance Summit',
    date: 'Q2 2026',
    type: 'Conference',
    description: 'Virtual summit for vePARS holders to discuss protocol direction.',
  },
  {
    name: 'Persian Tech Meetup',
    date: 'Monthly',
    type: 'Meetup',
    description: 'Regular meetups for Persian tech professionals in major cities.',
  },
];

const contributorTypes = [
  {
    title: 'Developers',
    icon: Github,
    description: 'Build bridges, smart contracts, frontends, and SDKs.',
    color: 'gray',
  },
  {
    title: 'Researchers',
    icon: Book,
    description: 'Study diaspora governance, history, and policy.',
    color: 'blue',
  },
  {
    title: 'Community Builders',
    icon: Users,
    description: 'Organize events, grow chapters, welcome newcomers.',
    color: 'purple',
  },
  {
    title: 'Cultural Advocates',
    icon: Heart,
    description: 'Preserve language, document heritage, fund artists.',
    color: 'pink',
  },
];

export function Community() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Join the <span className="gradient-text">Community</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            8 million Persians across 85+ countries. One community. One mission.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="card p-6 text-center">
            <Globe className="mx-auto text-amber-400 mb-2" size={28} />
            <p className="text-2xl font-bold text-white">85+</p>
            <p className="text-gray-500 text-sm">Countries</p>
          </div>
          <div className="card p-6 text-center">
            <MapPin className="mx-auto text-amber-400 mb-2" size={28} />
            <p className="text-2xl font-bold text-white">20+</p>
            <p className="text-gray-500 text-sm">Active Chapters</p>
          </div>
          <div className="card p-6 text-center">
            <Users className="mx-auto text-amber-400 mb-2" size={28} />
            <p className="text-2xl font-bold text-white">2,000+</p>
            <p className="text-gray-500 text-sm">Members</p>
          </div>
          <div className="card p-6 text-center">
            <Calendar className="mx-auto text-amber-400 mb-2" size={28} />
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="text-gray-500 text-sm">Events/Year</p>
          </div>
        </div>

        {/* Social Links */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Connect Online</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://discord.gg/miga"
              className="card p-6 hover:border-indigo-500/50 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:bg-indigo-500/30 transition">
                <MessageCircle className="text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Discord</h3>
              <p className="text-gray-400 text-sm">
                Real-time discussions, governance debates, and community events.
              </p>
            </a>

            <a
              href="https://twitter.com/migaprotocol"
              className="card p-6 hover:border-sky-500/50 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center mb-4 group-hover:bg-sky-500/30 transition">
                <Twitter className="text-sky-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Twitter</h3>
              <p className="text-gray-400 text-sm">
                Updates, announcements, and community highlights.
              </p>
            </a>

            <a
              href="https://t.me/migaprotocol"
              className="card p-6 hover:border-blue-500/50 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition">
                <Send className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Telegram</h3>
              <p className="text-gray-400 text-sm">
                Quick updates and Persian-language community chat.
              </p>
            </a>

            <a
              href="https://github.com/miga-protocol"
              className="card p-6 hover:border-gray-500/50 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-500/20 flex items-center justify-center mb-4 group-hover:bg-gray-500/30 transition">
                <Github className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">GitHub</h3>
              <p className="text-gray-400 text-sm">
                Open-source code. All contracts and SDKs.
              </p>
            </a>
          </div>
        </section>

        {/* Global Chapters */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Global Chapters</h2>
          <p className="text-gray-400 mb-8">
            MIGA chapters organize local events, provide mutual aid, and connect Persians in each city.
            Find your chapter or start one.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chapters.map((region) => (
              <div key={region.region} className="card p-6">
                <h3 className="text-lg font-semibold text-amber-400 mb-4">{region.region}</h3>
                <ul className="space-y-2">
                  {region.cities.map((city) => (
                    <li key={city.name} className="flex items-center justify-between text-sm">
                      <span className={city.active ? 'text-white' : 'text-gray-500'}>
                        {city.name}
                        {city.active && <span className="ml-2 text-green-400 text-xs">●</span>}
                      </span>
                      <span className="text-gray-500">{city.members}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Start a Chapter */}
        <section className="mb-16">
          <div className="card p-8 bg-gradient-to-br from-amber-500/5 to-indigo-500/5">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Start a Chapter</h2>
                <p className="text-gray-400 mb-6">
                  Don't see your city? The PAY (Consular) DAO supports new chapters with funding,
                  resources, and coordination. Requirements:
                </p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">•</span>
                    5+ local members to start
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">•</span>
                    Host at least 2 events per year
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">•</span>
                    Align with MIGA values and Cyrus Principle
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-400">•</span>
                    Submit quarterly reports to PAY DAO
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <a href="/contact" className="btn-primary inline-block">
                  Apply to Start a Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-amber-400 bg-amber-500/20 px-2 py-1 rounded">{event.type}</span>
                  <span className="text-xs text-gray-500">{event.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contribute */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Contribute</h2>
          <p className="text-gray-400 mb-8">
            MIGA needs all kinds of contributors. Whether you code, write, organize, or simply care,
            there's a place for you.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributorTypes.map((type, index) => (
              <div key={index} className="card p-6">
                <div className={`w-12 h-12 rounded-lg bg-${type.color}-500/20 flex items-center justify-center mb-4`}>
                  <type.icon className={`text-${type.color}-400`} size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                <p className="text-gray-400 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            The Persian diaspora has been scattered for decades. MIGA brings us together—not just online,
            but in person, in every city where our people have made a home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://discord.gg/miga" className="btn-primary">
              Join Discord
            </a>
            <a href="/contact" className="px-6 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition">
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
