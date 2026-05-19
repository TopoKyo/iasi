import { motion } from 'motion/react';
export default function Clients() {
  const clients = [
    { name: "Codelco", logo: "/images/clients/codelco.png" },
    { name: "Finning CAT", logo: "/images/clients/finning.png" },
    { name: "Rockwood", logo: "/images/clients/rockwood.png" },
    { name: "Belfi", logo: "/images/clients/belfi.png" },
    { name: "Empresas", logo: "/images/clients/empresas.png" }
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
