import { motion } from 'motion/react';
import { CheckCircle2, Factory, Construction, HardHat } from 'lucide-react';

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl relative z-10">
              <img 
                src="/images/about.jpg" 
                alt="IASI Operativo" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-iasi-blue -z-0 rounded-sm hidden md:block"></div>
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 bg-iasi-accent p-8 rounded-sm shadow-xl z-20 hidden md:block">
              <div className="flex items-center gap-4 text-iasi-blue">
                <HardHat size={48} />
                <div>
                  <p className="text-4xl font-black leading-none">100%</p>
                  <p className="text-sm font-bold uppercase tracking-wider">COMPROMETIDOS</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-iasi-blue"></span>
              <span className="text-iasi-blue font-bold tracking-[0.2em] text-sm uppercase">Más que arriendo</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-black text-iasi-blue leading-tight mb-8">
              SOLIDEZ, EXPERIENCIA Y <br />
              <span className="text-iasi-accent bg-iasi-blue px-4 inline-block transform -rotate-1 mt-2">ALTO RENDIMIENTO</span>
            </h2>

            <p className="text-lg text-iasi-grey/80 mb-8 leading-relaxed">
              En IASI Rental Store Chile, entendemos que la energía es el motor de sus proyectos. Somos líderes en soluciones de infraestructura eléctrica, especializándonos en satisfacer las demandas críticas de los sectores minero, industrial y energético del país.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { title: "Innovación Técnica", desc: "Equipamiento de última generación." },
                { title: "Seguridad Garantizada", desc: "Protocolos estrictos y cumplimiento SEC." },
                { title: "Rapidez Logística", desc: "Entrega e instalación en tiempo récord." },
                { title: "Respuesta 24/7", desc: "Soporte técnico ininterrumpido." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 className="text-iasi-accent mt-1 shrink-0" size={20} />
                  <div>
                    <h4 className="font-bold text-iasi-blue">{item.title}</h4>
                    <p className="text-sm text-iasi-grey/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-10 border-t border-iasi-grey/10 pt-10 mt-2">
              <div className="flex items-center gap-4">
                <Factory className="text-iasi-blue" size={32} />
                <span className="text-xs font-bold text-iasi-grey/60 uppercase leading-tight">Sector <br />Industrial</span>
              </div>
              <div className="flex items-center gap-4">
                <Construction className="text-iasi-blue" size={32} />
                <span className="text-xs font-bold text-iasi-grey/60 uppercase leading-tight">Grandes <br />Faenas</span>
              </div>
              <div className="flex items-center gap-4">
                <ShieldCheck className="text-iasi-blue" size={32} />
                <span className="text-xs font-bold text-iasi-grey/60 uppercase leading-tight">Normativa <br />Internacional</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShieldCheck({ size, className }: { size: number; className?: string }) {
  return (
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </motion.svg>
  );
}
