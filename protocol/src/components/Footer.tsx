import { Link } from 'react-router-dom';
import { Send, Code, BookOpen, PenLine } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  protocol: {
    title: 'Protocol',
    items: [
      { title: 'Token', href: '/token' },
      { title: 'Documentation', href: '/docs' },
      { title: 'GitHub', href: 'https://github.com/miga-protocol', external: true },
      { title: 'Whitepaper', href: 'https://miga.xyz/whitepaper.pdf', external: true },
    ],
  },
  ecosystem: {
    title: 'Ecosystem',
    items: [
      { title: 'pars.network', href: 'https://pars.network', external: true },
      { title: 'pars.vote', href: 'https://pars.vote', external: true },
      { title: 'pars.markets', href: 'https://pars.markets', external: true },
      { title: 'pars.fund', href: 'https://pars.fund', external: true },
    ],
  },
  community: {
    title: 'Community',
    items: [
      { title: 'DAO', href: 'https://miga.us.org', external: true },
      { title: 'Discord', href: 'https://discord.gg/miga', external: true },
      { title: 'Twitter', href: 'https://twitter.com/migaprotocol', external: true },
      { title: 'Telegram', href: 'https://t.me/migaprotocol', external: true },
    ],
  },
  trade: {
    title: 'Trade',
    items: [
      { title: 'Meteora', href: 'https://app.meteora.ag', external: true },
      { title: 'Jupiter', href: 'https://jup.ag/swap/SOL-MIGA', external: true },
      { title: 'Raydium', href: 'https://raydium.io', external: true },
      { title: 'Governance', href: 'https://realms.today/dao/miga', external: true },
    ],
  },
};

const chatActions = [
  { icon: PenLine, label: 'Write' },
  { icon: BookOpen, label: 'Learn' },
  { icon: Code, label: 'Code' },
];

const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/migaprotocol',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/miga',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/migaprotocol',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const FooterColumn = ({
  title,
  items,
}: {
  title: string;
  items: Array<{ title: string; href: string; external?: boolean }>;
}) => (
  <div>
    <h3 className="text-white/40 text-xs font-medium mb-3 uppercase tracking-wider">{title}</h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.title}>
          {item.external ? (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {item.title}
            </a>
          ) : (
            <Link
              to={item.href}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export function Footer() {
  const [chatInput, setChatInput] = useState('');

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      window.dispatchEvent(new CustomEvent('openGlobalChat', { detail: { message: chatInput } }));
      setChatInput('');
    }
  };

  return (
    <footer className="bg-[#0a0a12] border-t border-[#D4AF37]/10 relative">
      {/* Persian pattern overlay */}
      <div className="absolute inset-0 persian-border-pattern opacity-3 pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Logo and chat widget - left column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/favicon.svg" alt="MIGA" className="w-10 h-10" />
              <span className="text-lg font-medium text-white">MIGA</span>
            </Link>

            <p className="text-white/40 text-sm max-w-sm leading-relaxed">
              A token powering a diaspora-led civic operating system for the Persian community worldwide.
            </p>

            {/* Chat widget */}
            <form onSubmit={handleChatSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about MIGA..."
                  className="w-full bg-[#1a1a2e] border border-[#D4AF37]/20 rounded-lg px-4 py-2.5 pr-10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded flex items-center justify-center transition-colors bg-[#D4AF37] hover:bg-[#F4D03F]"
                >
                  <Send className="w-3 h-3 text-[#0a0a12]" />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2">
                {chatActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      type="button"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('openGlobalChat', { detail: { action: action.label } }));
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1a1a2e] border border-[#D4AF37]/10 text-white/50 text-xs font-medium hover:bg-[#252541] hover:text-white hover:border-[#D4AF37]/20 transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </form>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <FooterColumn {...footerLinks.protocol} />
              <FooterColumn {...footerLinks.ecosystem} />
              <FooterColumn {...footerLinks.community} />
              <FooterColumn {...footerLinks.trade} />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#D4AF37]/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Copyright */}
            <div className="space-y-0.5">
              <p className="text-white/30 text-xs">
                &copy; {new Date().getFullYear()} MIGA Protocol
              </p>
              <p className="text-white/20 text-xs italic">
                Building in code what tyrants cannot burn.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[#D4AF37] transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Trade links */}
            <div className="flex gap-4 text-sm text-white/30">
              <a href="https://realms.today/dao/miga" className="hover:text-[#D4AF37] transition-colors" target="_blank" rel="noopener noreferrer">
                Governance
              </a>
              <a href="https://app.meteora.ag" className="hover:text-[#D4AF37] transition-colors" target="_blank" rel="noopener noreferrer">
                Trade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
