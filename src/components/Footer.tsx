import { ArrowUp, Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-iasi-blue text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white h-full"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20 text-center lg:text-left">
          {/* Logo Brand */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            <a href="/" className="flex items-center gap-2 group">
              <img 
                src="/images/logo.png" 
                alt="IASI Rental Store Chile Logo" 
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-display font-black tracking-tighter text-white">
                  IASI<span className="text-iasi-accent">RENTAL</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/50">
                  Store Chile
                </span>
              </div>
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs uppercase tracking-widest font-medium text-[10px]">
              Soluciones integrales de energía para los desafíos más complejos del territorio nacional. Calidad, seguridad y eficiencia en cada kilovoltio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-iasi-accent hover:text-iasi-blue transition-all">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-iasi-accent hover:text-iasi-blue transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-iasi-accent hover:text-iasi-blue transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-iasi-accent font-black uppercase tracking-widest text-xs border-b border-iasi-accent/20 pb-4 inline-block lg:block">Navegación</h4>
            <ul className="space-y-4">
              {[
                { name: 'Inicio', href: '#inicio' },
                { name: 'Nosotros', href: '#nosotros' },
                { name: 'Servicios', href: '#servicios' },
                { name: 'Catálogo', href: '#catalogo' },
                { name: 'Proyectos', href: '#proyectos' },
                { name: 'Contacto', href: '#contacto' },
                { name: 'Panel de Control', href: '/?view=admin' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className={`hover:text-iasi-accent transition-colors text-sm font-bold uppercase tracking-widest ${item.name === 'Panel de Control' ? 'text-white/20' : 'text-white/60'}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-8">
            <h4 className="text-iasi-accent font-black uppercase tracking-widest text-xs border-b border-iasi-accent/20 pb-4 inline-block lg:block">Soluciones</h4>
            <ul className="space-y-4">
              {[
                'Venta de Transformadores',
                'Arriendo de Equipos',
                'Subestaciones Elevadoras',
                'Mantención y Certificación',
                'Análisis de Cromatografía',
                'Ingeniería Eléctrica'
              ].map((item) => (
                <li key={item}>
                  <a href="#servicios" className="text-white/60 hover:text-iasi-accent transition-colors text-sm font-bold uppercase tracking-widest">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className="text-iasi-accent font-black uppercase tracking-widest text-xs border-b border-iasi-accent/20 pb-4 inline-block lg:block">Ubicaciones</h4>
            <div className="space-y-6">
              <div className="flex items-center lg:items-start justify-center lg:justify-start gap-4 text-white/60">
                <MapPin size={24} className="text-iasi-accent shrink-0" />
                <p className="text-xs uppercase tracking-widest font-bold leading-relaxed">
                  Casa Matriz: <br />
                  Quilicura, Santiago, Chile
                </p>
              </div>
              <div className="flex items-center lg:items-start justify-center lg:justify-start gap-4 text-white/60">
                <MapPin size={24} className="text-iasi-accent shrink-0" />
                <p className="text-xs uppercase tracking-widest font-bold leading-relaxed">
                  Logística Norte: <br />
                  Antofagasta, Chile
                </p>
              </div>
              <a href="tel:+56220000000" className="flex items-center justify-center lg:justify-start gap-4 text-white/60 hover:text-iasi-accent transition-colors">
                <Phone size={20} className="text-iasi-accent shrink-0" />
                <span className="text-xs uppercase tracking-widest font-bold">+56 2 2000 0000</span>
              </a>
              <a href="mailto:contacto@iasi.cl" className="flex items-center justify-center lg:justify-start gap-4 text-white/60 hover:text-iasi-accent transition-colors">
                <Mail size={20} className="text-iasi-accent shrink-0" />
                <span className="text-xs uppercase tracking-widest font-bold lowercase">contacto@iasi.cl</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
            <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
              © {currentYear} IASI RENTAL STORE CHILE. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
              Página creada por <a href="https://kobit.cl" target="_blank" rel="noopener noreferrer" className="text-iasi-accent hover:underline">kobit.cl</a>
            </p>
          </div>
          
          <div className="flex items-center gap-8 order-1 md:order-2">
            <button 
              onClick={scrollToTop}
              className="group flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-iasi-accent group-hover:border-iasi-accent transition-all">
                <ArrowUp size={20} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Subir</span>
            </button>
          </div>

          <div className="flex gap-8 order-3 grayscale opacity-30">
            <span className="text-[10px] font-black italic tracking-tighter">SEC CERTIFIED</span>
            <span className="text-[10px] font-black italic tracking-tighter">ISO 9001</span>
            <span className="text-[10px] font-black italic tracking-tighter">ACHS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
