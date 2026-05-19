import { motion } from 'motion/react';
import codelco from '../assets/clients/codelco.png';
import finning from '../assets/clients/finning.png';
import rockwood from '../assets/clients/rockwood.png';
import belfi from '../assets/clients/belfi.png';
import empresas from '../assets/clients/empresas.png';

export default function Clients() {
  const clients = [
    { name: "Codelco", logo: codelco },
    { name: "Finning CAT", logo: finning },
    { name: "Rockwood", logo: rockwood },
    { name: "Belfi", logo: belfi },
    { name: "Empresas", logo: empresas }
  ];

  // Increase multiplier for smoother infinite loop
  const doubledClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="py-24 bg-white border-y border-iasi-grey/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-iasi-grey/40">
            Nuestros Clientes y Alianzas Estratégicas
          </p>
        </div>
      </div>
      
      {/* Moving Carousel Container */}
      <div className="relative flex overflow-hidden">
        <motion.div 
          className="flex gap-16 lg:gap-32 items-center whitespace-nowrap"
          animate={{
            x: [0, -2000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {doubledClients.map((client, idx) => (
            <div 
              key={idx}
              className="w-48 lg:w-72 h-32 flex items-center justify-center shrink-0"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
