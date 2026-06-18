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

const DEFAULT_PRODUCTS: CatalogItem[] = [
  {
    id: 'cat-1',
    name: 'SUBESTACIÓN ELEVADORA UNITARIA',
    description: 'Venta y arriendo de subestaciones elevadoras unitarias.',
    category: 'subestaciones',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop',
    specs: ['Subestaciones tipo unitaria', 'Media y alta tensión', 'Certificación completa'],
  },
  {
    id: 'cat-2',
    name: 'TRANSFORMADOR PAD MOUNTED',
    description: 'Venta y arriendo de transformadores pad mounted.',
    category: 'distribucion',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    specs: ['Gabinete de seguridad', 'Instalación intemperie', 'Eficiencia energética'],
  },
  {
    id: 'cat-3',
    name: 'REPARACIÓN Y REPOTENCIACIÓN',
    description: 'Reparación y repotenciación de transformadores y ECM.',
    category: 'equipos',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
    specs: ['Restauración de devanados', 'Aumento de capacidad', 'Pruebas dieléctricas'],
  },
  {
    id: 'cat-4',
    name: 'TRANSFORMADOR EN ACEITE',
    description: 'Venta y arriendo de transformadores sumergidos en aceite.',
    category: 'distribucion',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
    specs: ['Refrigeración ONAN', 'Aislamiento mineral / vegetal', 'Alta durabilidad'],
  },
  {
    id: 'cat-5',
    name: 'TRANSFORMADOR DE PODER',
    description: 'Venta y arriendo de transformadores de poder.',
    category: 'poder',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop',
    specs: ['Grandes potencias', 'Tratamiento al vacío', 'Montaje en terreno'],
  },
  {
    id: 'cat-6',
    name: 'MANTENCIÓN Y CERTIFICACIÓN',
    description: 'Mantención y certificación de transformadores y ECM.',
    category: 'equipos',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop',
    specs: ['Protocolos SEC', 'Ensayos de rutina', 'Informes de laboratorio'],
  },
  {
    id: 'cat-7',
    name: 'TRANSFORMADOR SECO',
    description: 'Venta y arriendo de transformadores secos.',
    category: 'seco',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=800&auto=format&fit=crop',
    specs: ['Resina epóxica autocombatible', 'Uso interior / comercial', 'Cero riesgo de fuga'],
  },
  {
    id: 'cat-8',
    name: 'EQUIPO COMPACTO DE MEDIDA',
    description: 'Venta y arriendo de equipos compactos de medida.',
    category: 'equipos',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    specs: ['Medición compacta integrada', 'Media tensión SEC', 'Protección intemperie'],
  },
  {
    id: 'cat-9',
    name: 'ANÁLISIS DE ACEITE',
    description: 'Análisis de humedad, gases y capacidad dieléctrica del aceite.',
    category: 'equipos',
    tag: 'IASI THE RENTAL STORE CHILE',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop',
    specs: ['Cromatografía de gases', 'Contenido de humedad', 'Rigidez dieléctrica'],
  }
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
      if (data && data.length > 0) {
        const defaultNames = DEFAULT_PRODUCTS.map(p => p.name.toUpperCase());
        const filteredDB = data.filter(p => !defaultNames.includes(p.name.toUpperCase()));
        setProducts([...DEFAULT_PRODUCTS, ...filteredDB]);
      } else {
        setProducts(DEFAULT_PRODUCTS);
      }
    } catch (err) {
      console.error("Error loading products, using defaults:", err);
      setProducts(DEFAULT_PRODUCTS);
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
                    <a href="#contacto" className="bg-white text-iasi-blue p-3 rounded-full hover:bg-iasi-accent transition-colors shadow-xl">
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
                    href="#contacto" 
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
