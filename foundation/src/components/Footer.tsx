import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="MIGA" className="h-12 w-12" />
              <span className="text-2xl font-bold gradient-text">MIGA</span>
            </div>
            <p className="mt-4 text-gray-400 text-sm">
              An experimental Civic Operating System for the Persian diaspora. Building in code what tyrants cannot burn.
            </p>
            <p className="mt-2 text-amber-400/60 text-xs italic">
              "One day, we go home."
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Foundation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/board" className="hover:text-white">Leadership</Link></li>
              <li><Link to="/programs" className="hover:text-white">10 DAOs</Link></li>
              <li><Link to="/transparency" className="hover:text-white">Transparency</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Protocol</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="https://migaprotocol.xyz" className="hover:text-white">Get Token</a></li>
              <li><Link to="/governance" className="hover:text-white">Governance</Link></li>
              <li><Link to="/community" className="hover:text-white">Community</Link></li>
              <li><a href="https://github.com/miga-protocol" className="hover:text-white">GitHub</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="https://twitter.com/migaprotocol" className="hover:text-white">Twitter</a></li>
              <li><a href="https://discord.gg/miga" className="hover:text-white">Discord</a></li>
              <li><a href="https://t.me/migaprotocol" className="hover:text-white">Telegram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700/50 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MIGA DAO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
