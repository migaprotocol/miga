import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Token', href: '/token' },
  { label: 'Docs', href: '/docs' },
  { label: 'DAO', href: 'https://miga.us.org', external: true },
  { label: 'GitHub', href: 'https://github.com/miga-protocol', external: true },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass border-b border-[#D4AF37]/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/favicon.svg" alt="MIGA" className="w-9 h-9 transition-transform group-hover:scale-105" />
            <span className="text-lg font-medium tracking-tight text-white">MIGA</span>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.external ? (
                <a 
                  key={link.label}
                  href={link.href} 
                  className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.label}
                  to={link.href} 
                  className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right side - CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="#tokenomics" 
              className="px-4 py-2 text-sm text-[#D4AF37] hover:text-[#F4D03F] transition-colors"
            >
              Tokenomics
            </a>
            <WalletMultiButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <WalletMultiButton />
            <button
              className="p-2 text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#D4AF37]/10">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                link.external ? (
                  <a 
                    key={link.label}
                    href={link.href} 
                    className="px-4 py-3 text-sm text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link 
                    key={link.label}
                    to={link.href} 
                    className="px-4 py-3 text-sm text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <a 
                href="#tokenomics" 
                className="px-4 py-3 text-sm text-[#D4AF37] hover:text-[#F4D03F] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Tokenomics
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
