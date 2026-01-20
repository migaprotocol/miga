import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="MIGA" className="h-10 w-10" />
            <span className="text-2xl font-bold gradient-text">MIGA</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
            <Link to="/programs" className="text-gray-300 hover:text-white transition">DAOs</Link>
            <Link to="/governance" className="text-gray-300 hover:text-white transition">Governance</Link>
            <Link to="/transparency" className="text-gray-300 hover:text-white transition">Transparency</Link>
            <Link to="/community" className="text-gray-300 hover:text-white transition">Community</Link>
            <a
              href="https://migaprotocol.xyz"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get $MIGA
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="flex flex-col gap-4">
              <Link to="/about" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/programs" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>DAOs</Link>
              <Link to="/governance" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Governance</Link>
              <Link to="/transparency" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Transparency</Link>
              <Link to="/community" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Community</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>Contact</Link>
              <a
                href="https://migaprotocol.xyz"
                className="btn-primary text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get $MIGA
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
