import { Mail, MessageSquare, Globe, Shield, Github, Twitter } from 'lucide-react';
import { useState } from 'react';

const contactMethods = [
  {
    icon: MessageSquare,
    title: 'Community Discord',
    description: 'Join our community for discussions, support, and collaboration.',
    link: '#',
    linkText: 'Join Discord',
  },
  {
    icon: Twitter,
    title: 'X (Twitter)',
    description: 'Follow for updates, announcements, and community highlights.',
    link: '#',
    linkText: '@MIGAProtocol',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Contribute to the open-source codebase and review our contracts.',
    link: '#',
    linkText: 'View Repository',
  },
];

const offices = [
  {
    region: 'North America',
    cities: ['Los Angeles', 'New York', 'Toronto', 'Vancouver'],
  },
  {
    region: 'Europe',
    cities: ['London', 'Berlin', 'Paris', 'Stockholm'],
  },
  {
    region: 'Middle East',
    cities: ['Dubai', 'Istanbul'],
  },
  {
    region: 'Asia-Pacific',
    cities: ['Sydney', 'Singapore'],
  },
];

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    console.log('Form submitted:', formState);
    setSubmitted(true);
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Contact Us</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Connect with the MIGA community across 85+ countries.
          </p>
        </div>

        {/* Contact Methods */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="card p-6">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
                  <method.icon className="text-amber-400" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                <a
                  href={method.link}
                  className="text-amber-400 hover:text-amber-300 text-sm inline-flex items-center gap-2"
                >
                  {method.linkText}
                </a>
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            {submitted ? (
              <div className="card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Mail className="text-green-400" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Message Received</h3>
                <p className="text-gray-400">
                  Thank you for reaching out. We'll respond as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
                  <select
                    required
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="technical">Technical Support</option>
                    <option value="governance">Governance Question</option>
                    <option value="media">Media / Press</option>
                    <option value="chapter">Start a Chapter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500 text-white resize-none"
                    placeholder="Your message..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            )}
          </section>

          {/* Global Presence */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Global Presence</h2>
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-amber-400" size={24} />
                <p className="text-gray-300">
                  MIGA operates as a decentralized protocol with community chapters across the Persian diaspora.
                </p>
              </div>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index}>
                    <h3 className="text-amber-400 font-semibold mb-2">{office.region}</h3>
                    <div className="flex flex-wrap gap-2">
                      {office.cities.map((city, cityIndex) => (
                        <span
                          key={cityIndex}
                          className="px-3 py-1 bg-slate-800 rounded-full text-gray-400 text-sm"
                        >
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="card p-6 mt-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20">
              <div className="flex items-start gap-4">
                <Shield className="text-red-400 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-red-400 mb-2">Security Notice</h3>
                  <p className="text-gray-400 text-sm">
                    MIGA will never ask for your private keys, seed phrases, or passwords.
                    Be wary of impersonators. Always verify official channels through our website.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Start a Chapter */}
        <section className="mt-16 card p-8 bg-gradient-to-br from-amber-500/10 to-indigo-500/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Start a Chapter</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Want to organize MIGA activities in your city? We support community chapters
            worldwide through the PAY (Consular) DAO. Connect with fellow Persians in your area.
          </p>
          <a href="/community" className="btn-primary inline-block">
            Learn About Chapters
          </a>
        </section>
      </div>
    </div>
  );
}
