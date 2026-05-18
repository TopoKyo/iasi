import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: "Andrés Silva",
      role: "Gerente General",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Claudia Méndez",
      role: "Directora de Proyectos",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    },
    {
      name: "Roberto Campos",
      role: "Jefe de Ingeniería Eléctrica",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Patricia Loyola",
      role: "Gerente Comercial",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    }
  ];

  return (
    <section id="equipo" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[2px] w-8 bg-iasi-accent"></span>
            <span className="text-iasi-blue font-bold tracking-[0.2em] text-sm uppercase">Capital Humano</span>
            <span className="h-[2px] w-8 bg-iasi-accent"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black text-iasi-blue mb-6">
            NUESTRO <span className="text-iasi-accent">EQUIPO</span> EXPERTO
          </h2>
          <p className="text-iasi-grey/60 font-medium">
            Profesionales altamente calificados y certificados para brindar soluciones de ingeniería eléctrica con los más altos estándares de seguridad y eficiencia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-iasi-white shadow-lg"
            >
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="p-6 text-center bg-white relative z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="w-10 h-10 bg-iasi-blue text-white rounded-full flex items-center justify-center hover:bg-iasi-accent hover:text-iasi-blue transition-all shadow-lg">
                    <Linkedin size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-iasi-blue text-white rounded-full flex items-center justify-center hover:bg-iasi-accent hover:text-iasi-blue transition-all shadow-lg">
                    <Mail size={18} />
                  </a>
                </div>
                
                <h3 className="text-xl font-display font-black text-iasi-blue group-hover:text-iasi-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-iasi-grey/40 uppercase tracking-widest mt-1">
                  {member.role}
                </p>
              </div>
              
              {/* Decorative border bottom */}
              <div className="h-1 w-0 bg-iasi-accent group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
