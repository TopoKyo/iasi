import { motion } from 'motion/react';
import { MapPin, Calendar, HardHat, TrendingUp } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "Expansión Mina Los Bronces",
      location: "Región Metropolitana",
      year: "2024",
      desc: "Implementación de 4 subestaciones compactas de 1500kVA para sistemas de bombeo.",
      image: "https://images.unsplash.com/photo-1579450841234-49351e3a312b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Parque Eólico Vientos del Sur",
      location: "Región del Biobío",
      year: "2023",
      desc: "Suministro y montaje de transformadores de poder de 5MVA para elevación de tensión.",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Data Center High-Tech",
      location: "Quilicura, Santiago",
      year: "2023",
      desc: "Arriendo de transformadores secos de resina para sistemas críticos de respaldo UPS.",
      image: "https://images.unsplash.com/photo-1558444479-2753d719d19c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <section id="proyectos" className="py-24 bg-iasi-blue relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              PROYECTOS <span className="text-iasi-accent">DESTACADOS</span>
            </h2>
            <p className="text-white/60 font-medium">
              Conozca algunos de nuestros casos de éxito más emblemáticos en diversos sectores industriales a lo largo del país. Transformamos energía en resultados reales.
            </p>
          </div>
          <a href="#contacto" className="text-white border-b-2 border-iasi-accent pb-2 font-black text-xs uppercase tracking-widest hover:text-iasi-accent transition-colors">
            Ver Todos los Proyectos
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-[500px] overflow-hidden rounded-sm"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iasi-blue via-iasi-blue/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-4 mb-4 text-iasi-accent font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {project.year}</span>
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-4 group-hover:text-iasi-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3">
                  {project.desc}
                </p>
                <div className="flex items-center gap-4 border-t border-white/20 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-iasi-accent" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">100% Operativo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardHat size={16} className="text-iasi-accent" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Cero Accidentes</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
