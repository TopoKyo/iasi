import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Cog } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden bg-iasi-blue pt-32 lg:pt-40">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Industrial Electrical Infrastructure" 
          className="w-full h-full object-cover object-[center_25%] opacity-60 scale-105 hover:scale-100 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-iasi-blue via-iasi-blue/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-[2px] w-12 bg-iasi-accent"></span>
              <span className="text-iasi-accent uppercase tracking-[0.3em] font-bold text-sm">
                Liderazgo en Soluciones Eléctricas
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.05] tracking-tighter mb-8">
              POTENCIA <br />
              <span className="text-iasi-accent">INDUSTRIAL</span> <br />
              SIN LÍMITES
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl leading-relaxed mb-10 font-medium">
              Especialistas en venta, arriendo y mantenimiento de transformadores y subestaciones eléctricas para minería, industria y construcción en todo Chile.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <a 
                href="#contacto" 
                className="bg-iasi-accent text-iasi-blue px-10 py-5 rounded-sm font-black text-lg hover:bg-white transition-all transform hover:scale-105 flex items-center gap-3 shadow-2xl shadow-iasi-accent/30"
              >
                SOLICITAR COTIZACIÓN
                <ArrowRight size={20} />
              </a>
              <a 
                href="#catalogo" 
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-sm font-bold text-lg hover:bg-white/20 transition-all"
              >
                VER CATÁLOGO
              </a>
            </div>

            {/* Micro Stats / Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "Certificación SEC", desc: "Equipos certificados bajo normativa." },
                { icon: Zap, title: "Continuidad Operacional", desc: "Garantizamos energía para su faena." },
                { icon: Cog, title: "Soporte 24/7", desc: "Respuesta técnica inmediata a nivel nacional." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="bg-white/5 p-3 rounded-sm group-hover:bg-iasi-accent/20 transition-colors">
                    <item.icon className="text-iasi-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative side element */}
      <div className="absolute right-0 bottom-0 top-0 w-24 hidden xl:flex items-center justify-center border-l border-white/5 bg-white/2">
        <span className="writing-vertical uppercase tracking-[0.5em] text-[10px] text-white/20 font-bold rotate-180">
          IASI RENTAL STORE CHILE • INDUSTRIAL ENERGY SOLUTIONS
        </span>
      </div>
    </section>
  );
}
