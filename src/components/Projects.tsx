import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HardHat, TrendingUp, ImageIcon } from 'lucide-react';
import { getProjects, Project } from '../lib/projects';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

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
          <p className="text-white/40 font-bold text-xs uppercase tracking-widest">
            {projects.length} Proyectos Registrados
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-iasi-accent mx-auto mb-4"></div>
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Cargando proyectos...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-full py-20 text-center border border-white/5 bg-white/5">
              <p className="text-white/40 font-bold uppercase tracking-widest text-xs italic">Cargando portafolio de obras...</p>
            </div>
          ) : projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] overflow-hidden rounded-sm"
            >
              <img 
                src={project.coverImage} 
                alt={project.title} 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iasi-blue via-iasi-blue/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex gap-4 mb-4 text-iasi-accent font-bold text-[10px] uppercase tracking-widest">
                  <span className="flex items-center gap-1"><HardHat size={12} /> PROYECTO CERTIFICADO</span>
                  {project.carouselImages.length > 0 && (
                    <span className="flex items-center gap-1"><ImageIcon size={12} /> {project.carouselImages.length} FOTOS</span>
                  )}
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-4 group-hover:text-iasi-accent transition-colors uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-3 italic">
                  {project.description}
                </p>
                <div className="flex items-center gap-4 border-t border-white/20 pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-iasi-accent" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">100% OPERATIVO</span>
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
