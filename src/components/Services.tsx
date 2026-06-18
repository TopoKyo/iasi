import { motion } from 'motion/react';
import { 
  Wrench, 
  Factory, 
  Hammer, 
  Lightbulb, 
  Zap, 
  FlaskConical, 
  ArrowRight
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Wrench,
      title: "MANTENIMIENTO",
      desc: "Mantenimiento de equipos rutinarios, correctivos, programados, preventivos y/o predictivos."
    },
    {
      icon: Factory,
      title: "FABRICACIÓN",
      desc: "Se diseñan, fabrican y prueban de acuerdo a las especificaciones del cliente."
    },
    {
      icon: Hammer,
      title: "REPARACIÓN",
      desc: "Se reparan equipos eléctricos de cualquier especificación."
    },
    {
      icon: Lightbulb,
      title: "TRABAJAMOS SOBRE TUS IDEAS",
      desc: "Tú eliges las especificaciones."
    },
    {
      icon: Zap,
      title: "RÁPIDO Y FIABLE",
      desc: "Servicio de traslado, armado, procesos y pruebas de transformadores de poder."
    },
    {
      icon: FlaskConical,
      title: "LABORATORIO DE INNOVACIÓN",
      desc: "Departamento encargado de implementar innovaciones y desarrollo de nuevas tecnologías."
    }
  ];

  return (
    <section id="servicios" className="py-24 bg-iasi-white bg-industrial-mesh">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-8 bg-iasi-blue"></span>
              <span className="text-iasi-blue font-bold tracking-[0.2em] text-sm uppercase">
                IASI THE RENTAL STORE CHILE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-iasi-blue mb-0">
              SOLUCIONES ENERGÉTICAS <br />
              INTEGRALES <span className="text-iasi-accent font-light">360°</span>
            </h2>
          </div>
          <p className="text-iasi-grey/80 max-w-sm text-sm mt-6 md:mt-0 font-bold border-l-4 border-iasi-accent pl-6 uppercase tracking-wider">
            EXPERTOS EN SERVICIOS DE EQUIPAMIENTO ELÉCTRICO
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
              className="bg-white p-10 group hover:bg-iasi-blue transition-all duration-500 shadow-xl shadow-iasi-blue/5 relative overflow-hidden flex flex-col h-full border border-iasi-grey/5 hover:border-transparent rounded-sm"
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

              <a 
                href="#contacto" 
                className="inline-flex items-center gap-2 text-iasi-blue group-hover:text-iasi-accent font-black text-xs tracking-wider uppercase group-hover:gap-4 transition-all"
              >
                COTIZAR SERVICIO <ArrowRight size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
