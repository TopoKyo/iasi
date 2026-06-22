import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Download, ExternalLink, Zap } from 'lucide-react';
import { getCatalogItems, CatalogItem } from '../lib/catalog';

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
  const [products, setProducts] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    setError(null);
    try {
      const data = await getCatalogItems();
      setProducts(data || []);
    } catch (err) {
      console.error("Error loading products:", err);
      setError("No se pudo cargar el catálogo. Por favor intente más tarde.");
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = (products || []).filter(p => {
    const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
    const name = p.name || '';
    const desc = p.description || '';
    const searchTerm = (search || '').toLowerCase();
    const matchesSearch = name.toLowerCase().includes(searchTerm) || desc.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="py-24 bg-white min-h-[600px]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs text-iasi-grey/40 font-black uppercase tracking-[0.3em] block mb-2">CATÁLOGO DE PRODUCTOS Y SERVICIOS</span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-iasi-blue mb-4">
            IASI THE <span className="text-iasi-accent">RENTAL STORE</span>
          </h2>
          <p className="text-iasi-grey/60 font-medium uppercase tracking-wider text-xs font-black">
            VENTA Y ARRIENDO DE TRANSFORMADORES, SUBESTACIONES Y EQUIPOS COMPACTOS
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
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-iasi-accent mb-4"></div>
                <p className="text-iasi-grey/40 font-bold uppercase tracking-widest text-xs">Cargando catálogo...</p>
              </div>
            ) : filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group border border-iasi-grey/5 hover:border-iasi-accent transition-all duration-500 bg-iasi-white flex flex-col h-full rounded-sm overflow-hidden shadow-md"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-iasi-blue text-white text-[9px] font-black uppercase px-3 py-1 rounded-sm tracking-wider shadow-lg">
                      {product.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-iasi-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a href={`?view=producto&id=${product.id}`} className="bg-white text-iasi-blue p-3 rounded-full hover:bg-iasi-accent transition-colors shadow-xl">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-[9px] text-iasi-accent font-black tracking-widest uppercase mb-1">
                    {product.tag}
                  </span>
                  <h3 className="text-lg font-display font-black text-iasi-blue mb-3 leading-tight group-hover:text-iasi-accent transition-colors">
                    {product.name}
                  </h3>
                  
                  {product.description && (
                    <p className="text-xs text-iasi-grey/70 mb-4 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="space-y-1.5 mb-8 flex-grow border-t border-iasi-grey/5 pt-4">
                    {product.specs && product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-iasi-grey/60 uppercase tracking-wide">
                        <Zap size={10} className="text-iasi-accent shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>

                  <a 
                    href={`?view=producto&id=${product.id}`} 
                    className="w-full border-2 border-iasi-blue text-iasi-blue py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-iasi-blue hover:text-white transition-all text-center"
                  >
                    MÁS INFORMACIÓN
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
