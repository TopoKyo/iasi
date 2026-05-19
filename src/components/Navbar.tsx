import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Equipo', href: '#equipo' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' },
    { name: 'Admin', href: '/?view=admin' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        {/* Top Bar */}
      <div className={`hidden lg:flex bg-iasi-blue text-white py-2 px-6 justify-between items-center text-xs font-medium uppercase tracking-widest border-b border-white/10 transition-all duration-500 ${
        isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'h-auto opacity-100'
      }`}>
        <div className="flex gap-6">
          <a href="tel:+56220000000" className="flex items-center gap-2 hover:text-iasi-accent transition-colors">
            <Phone size={14} className="text-iasi-accent" />
            +56 2 2000 0000
          </a>
          <a href="mailto:contacto@iasi.cl" className="flex items-center gap-2 hover:text-iasi-accent transition-colors">
            <Mail size={14} className="text-iasi-accent" />
            contacto@iasi.cl
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="opacity-70">Lunes - Viernes: 08:30 - 18:00</span>
          <div className="h-3 w-[1px] bg-white/20"></div>
          <a href="#contacto" className="text-iasi-accent hover:underline flex items-center gap-1">
            Cotizar Proyecto <ArrowRight size={12} />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        id="navbar"
        className={`w-full transition-all duration-500 ${
          isScrolled || isOpen 
            ? 'bg-white py-4 shadow-2xl border-b border-iasi-blue/5' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <img 
              src="/images/logo_old.png" 
              alt="IASI Rental Store Chile Logo" 
              className="h-10 lg:h-12 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className={`text-xl lg:text-2xl font-display font-black tracking-tighter transition-colors ${isScrolled || isOpen ? 'text-iasi-blue' : 'text-white'}`}>
                IASI<span className="text-iasi-accent">RENTAL</span>
              </span>
              <span className={`text-[10px] uppercase font-bold tracking-[0.3em] ${isScrolled || isOpen ? 'text-iasi-blue/40' : 'text-white/70'}`}>
                Store Chile
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-bold transition-colors relative group py-2 ${
                  isScrolled || isOpen ? 'text-iasi-blue hover:text-iasi-accent' : 'text-white/90 hover:text-iasi-accent'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-iasi-accent transition-all duration-300 group-hover:w-full`}></span>
              </a>
            ))}
            <a 
              href="#catalogo" 
              className={`px-6 py-2.5 rounded-sm font-black text-xs tracking-widest transition-all transform hover:-translate-y-0.5 shadow-lg ${
                isScrolled || isOpen 
                  ? 'bg-iasi-blue text-white hover:bg-iasi-accent hover:text-iasi-blue shadow-iasi-blue/20' 
                  : 'bg-iasi-accent text-iasi-blue hover:bg-white shadow-iasi-accent/20'
              }`}
            >
              COTIZAR AHORA
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden p-2 transition-colors ${isScrolled || isOpen ? 'text-iasi-blue' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-iasi-blue border-t border-white/10 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-white hover:text-iasi-accent transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-white/70">
                    <Phone size={18} className="text-iasi-accent" />
                    <span>+56 2 2000 0000</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Mail size={18} className="text-iasi-accent" />
                    <span>contacto@iasi.cl</span>
                  </div>
                  <a 
                    href="https://wa.me/56900000000" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-md font-bold text-lg"
                  >
                    <MessageCircle size={24} />
                    WhatsApp Directo
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/56900000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-iasi-grey px-4 py-2 rounded-lg font-bold text-sm w-max opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          ¿En qué podemos ayudarte?
        </span>
      </a>
    </>
  );
}
