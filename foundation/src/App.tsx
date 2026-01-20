import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Governance } from './pages/Governance';
import { Community } from './pages/Community';
import { Board } from './pages/Board';
import { Programs } from './pages/Programs';
import { Transparency } from './pages/Transparency';
import { Contact } from './pages/Contact';
import { MIPs } from './pages/MIPs';
import './index.css';

function ExternalRedirect({ url }: { url: string }) {
  if (typeof window !== 'undefined') {
    window.location.replace(url);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center p-8">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-4 text-white">Redirecting...</h1>
        <p className="text-gray-400">Taking you to {url}</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-900">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/community" element={<Community />} />
            <Route path="/board" element={<Board />} />
            <Route path="/leadership" element={<Board />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/daos" element={<Programs />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mips" element={<MIPs />} />
            <Route path="/proposals" element={<MIPs />} />

            {/* External redirects */}
            <Route path="/token" element={<ExternalRedirect url="https://migaprotocol.xyz" />} />
            <Route path="/protocol" element={<ExternalRedirect url="https://migaprotocol.xyz" />} />
            <Route path="/buy" element={<ExternalRedirect url="https://migaprotocol.xyz" />} />

            {/* Catch-all */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
