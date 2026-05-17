import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Download, ExternalLink, Zap } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "Transformador de Distribución 25kVA",
    category: "distribucion",
    tag: "Stock",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
    specs: ["Potencia: 25kVA", "Voltaje: 15/0.4kV", "Norma: IEC"]
  },
  {
    id: 2,
    name: "Subestación Unitaria 750kVA",
    category: "subestaciones",
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=2074&auto=format&fit=crop",
    specs: ["Potencia: 750kVA", "Configuración: Radial", "Protección: IP55"]
  },
  {
    id: 3,
    name: "Equipo Compacto de Medida (ECM)",
    category: "equipos",
    tag: "Nuevo",
    image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=2070&auto=format&fit=crop",
    specs: ["Voltaje: 12-24kV", "Precisión: CL 0.2S", "Material: Acero Galv."]
  },
  {
    id: 4,
    name: "Transformador Seco 1000kVA",
    category: "seco",
    tag: "Ecoeficiente",
    image: "https://images.unsplash.com/photo-1558444479-2753d719d19c?q=80&w=2070&auto=format&fit=crop",
    specs: ["Potencia: 1000kVA", "Aislamiento: Resina", "Uso: Interior"]
  },
  {
    id: 5,
    name: "Transformador de Poder 5MVA",
    category: "poder",
    tag: "Alta Tensión",
    image: "https://images.unsplash.com/photo-1579450841234-49351e3a312b?q=80&w=2070&auto=format&fit=crop",
    specs: ["Potencia: 5MVA", "Voltaje: 66/13.8kV", "Refrigeración: ONAN"]
  },
  {
    id: 6,
    name: "Celdas de Media Tensión SM6",
    category: "equipos",
    tag: "Protección",
    image: "https://images.unsplash.com/photo-1610444533042-4948a731d16c?q=80&w=2070&auto=format&fit=crop",
    specs: ["Modular", "Aislamiento: SF6", "Monitorización remota"]
  }
];

const CATEGORIES = [
  { id: 'todos', name: 'Todos' },
  { id: 'distribucion', name: 'Distribución' },
  { id: 'poder', name: 'Poder' },
  { id: 'subestaciones', name: 'Subestaciones' },
  { id: 'seco', name: 'Resina Seca' },
  { id: 'equipos', name: 'Equipos Auxiliares' }
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [search, setSearch] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black text-iasi-blue mb-6">
            CATÁLOGO DE <span className="text-iasi-accent">EQUIPOS</span>
          </h2>
          <p className="text-iasi-grey/60 font-medium">
            Explore nuestra amplia gama de soluciones energéticas certificadas. Equipamiento de alto rendimiento listo para ser desplegado en su proyecto.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat.id 
                    ? 'bg-iasi-blue text-white border-iasi-blue shadow-lg shadow-iasi-blue/20' 
                    : 'bg-transparent text-iasi-grey border-iasi-grey/20 hover:border-iasi-blue hover:text-iasi-blue'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-iasi-grey/40" size={18} />
            <input 
              type="text" 
              placeholder="Buscar equipo..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-iasi-white border border-iasi-grey/10 rounded-sm py-3 pl-12 pr-4 focus:outline-none focus:border-iasi-accent font-medium text-sm transition-colors"
            />
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group border border-iasi-grey/5 hover:border-iasi-accent transition-all duration-500 bg-iasi-white flex flex-col h-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-iasi-accent text-iasi-blue text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-iasi-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button className="bg-white text-iasi-blue p-3 rounded-full hover:bg-iasi-accent transition-colors shadow-xl">
                      <ExternalLink size={20} />
                    </button>
                    <button className="bg-white text-iasi-blue p-3 rounded-full hover:bg-iasi-accent transition-colors shadow-xl">
                      <Download size={20} />
                    </button>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-black text-iasi-blue mb-4 leading-tight group-hover:text-iasi-accent transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="space-y-2 mb-8 flex-grow">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-iasi-grey/60 uppercase">
                        <Zap size={12} className="text-iasi-accent" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <a 
                    href="#contacto" 
                    className="w-full border-2 border-iasi-blue text-iasi-blue py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-iasi-blue hover:text-white transition-all text-center"
                  >
                    COTIZAR AHORA
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-iasi-grey/40 text-lg font-medium italic">No se encontraron equipos bajo estos criterios.</p>
          </div>
        )}
      </div>
    </section>
  );
}
