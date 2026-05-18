import { motion } from 'motion/react';
import { 
  Wrench, 
  Factory, 
  Hammer, 
  Lightbulb, 
  Zap, 
  FlaskConical 
} from 'lucide-react';

export default function Expertise() {
  const items = [
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
    <section className="py-24 bg-iasi-blue text-white overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-iasi-accent opacity-5 -skew-x-12 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-iasi-accent font-black tracking-[0.3em] text-sm mb-4 uppercase"
          >
            IASI THE RENTAL STORE CHILE
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-black leading-tight"
          >
            EXPERTOS EN SERVICIOS DE <br className="hidden md:block" />
            <span className="text-iasi-accent">EQUIPAMIENTO ELÉCTRICO</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center rounded-sm group-hover:bg-iasi-accent group-hover:border-iasi-accent transition-all duration-300">
                    <item.icon className="text-iasi-accent group-hover:text-iasi-blue transition-colors" size={32} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-display font-black mb-3 group-hover:text-iasi-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
