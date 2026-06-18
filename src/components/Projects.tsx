import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Cpu, 
  Maximize, 
  HardHat, 
  ImageIcon 
} from 'lucide-react';
import { getProjects, Project } from '../lib/projects';

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'default-1',
    title: "SUBESTACIÓN ELEVADORA UNITARIA",
    subtitle: "IASI THE RENTAL STORE CHILE",
    description: "ARRIENDO Y VENTA DE TRANSFORMADORES, SUBESTACIONES Y EQUIPOS COMPACTOS",
    coverImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800",
    carouselImages: [],
    empresa: "Nombre",
    localizacion: "Localidad",
    ano: "2017",
    programa: "Minero",
    escala: "16 m²"
  },
  {
    id: 'default-2',
    title: "SUBESTACIÓN ELEVADORA UNITARIA",
    subtitle: "IASI THE RENTAL STORE CHILE",
    description: "ARRIENDO Y VENTA DE TRANSFORMADORES, SUBESTACIONES Y EQUIPOS COMPACTOS",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    carouselImages: [],
    empresa: "Nombre Empresa",
    localizacion: "Localidad",
    ano: "2017",
    programa: "Minero",
    escala: "16 m²"
  },
  {
    id: 'default-3',
    title: "SUBESTACIÓN ELEVADORA UNITARIA",
    subtitle: "IASI THE RENTAL STORE CHILE",
    description: "ARRIENDO Y VENTA DE TRANSFORMADORES, SUBESTACIONES Y EQUIPOS COMPACTOS",
    coverImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    carouselImages: [],
    empresa: "Nombre",
    localizacion: "Localidad",
    ano: "2017",
    programa: "Minero",
    escala: "16 m²"
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          const merged = data.map((dbProj, index) => {
            const fallback = DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length];
            return {
              ...fallback,
              ...dbProj,
              empresa: dbProj.empresa || fallback.empresa || "Nombre",
              localizacion: dbProj.localizacion || fallback.localizacion || "Localidad",
              ano: dbProj.ano || fallback.ano || "2017",
              programa: dbProj.programa || fallback.programa || "Minero",
              escala: dbProj.escala || fallback.escala || "16 m²",
              subtitle: dbProj.subtitle || fallback.subtitle || ""
            };
          });
          setProjects(merged);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch (error) {
        console.error("Error loading projects, loading defaults:", error);
        setProjects(DEFAULT_PROJECTS);
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
          ) : projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[620px] overflow-hidden rounded-sm border border-white/10 hover:border-iasi-accent/40 bg-iasi-blue/50 flex flex-col justify-end transition-colors duration-500 shadow-2xl"
            >
              <img 
                src={project.coverImage || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"} 
                alt={project.title} 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-iasi-blue via-iasi-blue/80 to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end">
                {/* Header Subtitle */}
                <span className="text-[10px] text-iasi-accent font-black tracking-[0.25em] uppercase mb-1">
                  {project.subtitle || "IASI THE RENTAL STORE CHILE"}
                </span>
                
                {/* Main Title */}
                <h3 className="text-xl md:text-2xl font-display font-black text-white leading-tight mb-2 group-hover:text-iasi-accent transition-colors uppercase tracking-tight">
                  {project.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/80 text-xs uppercase tracking-wider font-bold mb-6 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Specifications Grid */}
                <div className="border-t border-white/25 pt-4 space-y-3 bg-iasi-blue/40 backdrop-blur-sm p-4 rounded-sm border border-white/5 shadow-inner transition-colors group-hover:bg-iasi-blue/60">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Empresa */}
                    <div className="flex gap-2 items-center">
                      <Building2 className="text-iasi-accent shrink-0" size={14} />
                      <div className="leading-tight">
                        <span className="text-[8px] text-white/50 uppercase tracking-widest block font-black">Empresa</span>
                        <span className="text-xs font-bold text-white uppercase tracking-wide truncate">{project.empresa || "Nombre"}</span>
                      </div>
                    </div>
                    {/* Localizacion */}
                    <div className="flex gap-2 items-center">
                      <MapPin className="text-iasi-accent shrink-0" size={14} />
                      <div className="leading-tight">
                        <span className="text-[8px] text-white/50 uppercase tracking-widest block font-black">Localización</span>
                        <span className="text-xs font-bold text-white uppercase tracking-wide truncate">{project.localizacion || "Localidad"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
                    {/* Año */}
                    <div className="flex gap-1.5 items-center">
                      <Calendar className="text-iasi-accent shrink-0" size={12} />
                      <div className="leading-none">
                        <span className="text-[7px] text-white/50 uppercase tracking-widest block">Año</span>
                        <span className="text-[11px] font-bold text-white">{project.ano || "2017"}</span>
                      </div>
                    </div>
                    {/* Programa */}
                    <div className="flex gap-1.5 items-center">
                      <Cpu className="text-iasi-accent shrink-0" size={12} />
                      <div className="leading-none">
                        <span className="text-[7px] text-white/50 uppercase tracking-widest block">Programa</span>
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">{project.programa || "Minero"}</span>
                      </div>
                    </div>
                    {/* Escala */}
                    <div className="flex gap-1.5 items-center">
                      <Maximize className="text-iasi-accent shrink-0" size={12} />
                      <div className="leading-none">
                        <span className="text-[7px] text-white/50 uppercase tracking-widest block">Escala</span>
                        <span className="text-[11px] font-bold text-white truncate">{project.escala || "16 m²"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 text-[10px] uppercase tracking-widest font-bold text-white/40">
                  <span className="flex items-center gap-1"><HardHat size={12} className="text-iasi-accent" /> PROYECTO CERTIFICADO</span>
                  {project.carouselImages && project.carouselImages.length > 0 && (
                    <span className="flex items-center gap-1"><ImageIcon size={12} /> {project.carouselImages.length} FOTOS</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
