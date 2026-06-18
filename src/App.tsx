import { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Team from './components/Team';
import Catalog from './components/Catalog';
import Projects from './components/Projects';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/Admin/AdminPanel';
import { motion, useScroll, useSpring } from 'motion/react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-iasi-blue text-white p-10 text-center">
          <div>
            <h2 className="text-2xl font-display font-black mb-4">ALGO SALIÓ MAL</h2>
            <p className="text-white/60 mb-8">Hubo un error al cargar este componente. Por favor intenta recargar la página.</p>
            <button onClick={() => window.location.href = '/'} className="bg-iasi-accent text-iasi-blue px-6 py-3 font-bold uppercase tracking-widest text-xs">Volver al inicio</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return p.get('view') || 'site';
    }
    return 'site';
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const p = new URLSearchParams(window.location.search);
      const newView = p.get('view') || 'site';
      if (newView !== view) {
        setView(newView);
        window.scrollTo(0, 0);
      }
    };

    // Standard popstate for browser buttons
    window.addEventListener('popstate', handleUrlChange);
    
    // Listen for custom navigation events if we use them, 
    // but for now <a> tags with different queries will work via periodic check
    // keeping the check but making it more efficient
    const interval = setInterval(handleUrlChange, 200);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      clearInterval(interval);
    };
  }, [view]);

  if (view === 'admin') {
    return (
      <ErrorBoundary>
        <div className="bg-iasi-blue min-h-screen">
          <AdminPanel />
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="relative selection:bg-iasi-accent selection:text-iasi-blue">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-iasi-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Team />
        <Catalog />
        <Projects />
        <Clients />
        <Contact />
      </main>

      <Footer />
    </div>
    </ErrorBoundary>
  );
}
