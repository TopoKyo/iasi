import { motion } from 'motion/react';

export default function Clients() {
  // We'll use names/placeholders to represent corporate logos
  const clients = [
    { name: "AngloAmerican", color: "text-blue-800" },
    { name: "Codelco", color: "text-orange-700" },
    { name: "Antofagasta Minerals", color: "text-red-800" },
    { name: "Enel", color: "text-cyan-600" },
    { name: "Acciona", color: "text-red-700" },
    { name: "BHP", color: "text-orange-900" },
    { name: "Scheneider", color: "text-green-700" },
    { name: "Siemens", color: "text-teal-600" }
  ];

  return (
    <section className="py-20 bg-iasi-white border-y border-iasi-grey/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-iasi-grey/40">
            Confianza en Grandes Ligas
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
          {clients.map((client, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`text-2xl lg:text-3xl font-black italic tracking-tighter ${client.color}`}
            >
              {client.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
