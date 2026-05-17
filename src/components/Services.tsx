import { motion } from 'motion/react';
import { 
  Zap, 
  Settings, 
  Wrench, 
  Activity, 
  FlaskConical, 
  Stethoscope, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: "Arriendo de Transformadores",
      desc: "Soluciones inmediatas para baja, media y alta tensión con entrega en todo Chile.",
      features: ["Stock permanente", "Pruebas de rutina", "Logística propia"]
    },
    {
      icon: Settings,
      title: "Venta de Equipos",
      desc: "Representación de marcas líderes y fabricación a medida para su industria.",
      features: ["Transformadores secos", "De aceite", "Compactos"]
    },
    {
      icon: TrendingUp,
      title: "Subestaciones Elevadoras",
      desc: "Implementación completa de subestaciones tipo unitaria, compacta y de intemperie.",
      features: ["Llave en mano", "Puesta en servicio", "Ingeniería"]
    },
    {
      icon: Wrench,
      title: "Mantención Preventiva",
      desc: "Planes de mantenimiento especializados para extender la vida útil de sus activos.",
      features: ["Certificación SEC", "Filtrado de aceite", "Pintura"]
    },
    {
      icon: FlaskConical,
      title: "Análisis de Aceite",
      desc: "Estudio físico-químico y de gases disueltos (Cromatografía) en nuestro laboratorio.",
      features: ["Informe técnico", "Predicciones de falla", "Certificado"]
    },
    {
      icon: Activity,
      title: "Estudios Eléctricos",
      desc: "Análisis de mallas de tierra, flujo de potencia y cortocircuitos bajo norma.",
      features: ["Ingeniería de detalle", "Simulaciones", "Consultoría"]
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-iasi-white bg-industrial-mesh">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-iasi-blue"></span>
              <span className="text-iasi-blue font-bold tracking-[0.2em] text-sm uppercase">Nuestro Expertis</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-iasi-blue mb-0">
              SOLUCIONES ENERGÉTICAS <br />
              INTEGRALES <span className="text-iasi-accent font-light">360°</span>
            </h2>
          </div>
          <p className="text-iasi-grey/60 max-w-sm text-sm mt-6 md:mt-0 font-medium border-l-2 border-iasi-accent pl-6">
            Certificados bajo los más altos estándares nacionales e internacionales. Calidad que impulsa la minería y gran industria chilena.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 group hover:bg-iasi-blue transition-all duration-500 shadow-xl shadow-iasi-blue/5 relative overflow-hidden flex flex-col h-full"
            >
              {/* Icon Background Circle */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-iasi-blue group-hover:text-white transition-colors">
                <service.icon size={120} />
              </div>

              <div className="mb-6 relative">
                <div className="bg-iasi-blue/5 w-16 h-16 flex items-center justify-center rounded-sm group-hover:bg-iasi-accent transition-all duration-500">
                  <service.icon className="text-iasi-blue group-hover:text-iasi-blue transition-colors" size={32} />
                </div>
              </div>

              <h3 className="text-2xl font-display font-black text-iasi-blue group-hover:text-white mb-4 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-iasi-grey/70 group-hover:text-white/70 mb-8 leading-relaxed transition-colors flex-grow">
                {service.desc}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-iasi-blue group-hover:text-iasi-accent transition-colors">
                    <span className="w-1.5 h-1.5 bg-iasi-accent rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href="#contacto" 
                className="inline-flex items-center gap-2 text-iasi-accent font-black text-sm uppercase group-hover:gap-4 transition-all"
              >
                SABER MÁS <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
