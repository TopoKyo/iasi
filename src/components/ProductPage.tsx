import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Cpu, 
  MapPin, 
  HardHat, 
  Zap, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Layers
} from 'lucide-react';
import { getCatalogItemById, CatalogItem } from '../lib/catalog';
import Navbar from './Navbar';
import Footer from './Footer';

interface ProductPageProps {
  productId: string;
  onBack: () => void;
}

const CATEGORY_NAMES: Record<string, string> = {
  distribucion: 'Distribución',
  poder: 'Poder',
  subestaciones: 'Subestaciones',
  seco: 'Resina Seca',
  equipos: 'Equipos Auxiliares'
};

export default function ProductPage({ productId, onBack }: ProductPageProps) {
  const [product, setProduct] = useState<CatalogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCatalogItemById(productId);
        if (data) {
          setProduct(data);
        } else {
          setError("El equipo solicitado no se encuentra disponible o fue removido.");
        }
      } catch (err) {
        console.error("Error loading product page:", err);
        setError("Ocurrió un error al cargar la información del producto.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
    window.scrollTo(0, 0);
  }, [productId]);

  const handleQuoteClick = () => {
    if (product) {
      // Set parameters and scroll
      const prefillMsg = encodeURIComponent(product.name);
      window.location.href = `/?view=site&quote=${prefillMsg}#contacto`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-iasi-white text-iasi-blue flex flex-col justify-center items-center">
        <Navbar />
        <div className="text-center py-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-iasi-accent mx-auto mb-6"></div>
          <p className="font-display font-black text-xl tracking-[0.2em] uppercase text-iasi-blue animate-pulse">Cargando Ficha Técnica...</p>
          <p className="text-iasi-grey/40 text-xs mt-2 uppercase tracking-widest">Consultando base de equipamiento IASI CHILE</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-iasi-white text-iasi-blue flex flex-col justify-between">
        <Navbar />
        <div className="container mx-auto px-6 py-40 text-center max-w-lg">
          <Layers className="text-red-500 w-16 h-16 mx-auto mb-6 opacity-30" />
          <h2 className="text-3xl font-display font-black mb-4 uppercase">EQUIPO NO ENCONTRADO</h2>
          <p className="text-iasi-grey/60 mb-8">{error || "Lo sentimos, el producto solicitado no existe."}</p>
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-iasi-blue text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-iasi-accent hover:text-iasi-blue transition-all rounded-sm"
          >
            <ArrowLeft size={16} /> Volver al catálogo
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-iasi-white flex flex-col justify-between selection:bg-iasi-accent selection:text-iasi-blue">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        {/* Breadcrumbs */}
        <div className="bg-iasi-blue/5 py-4 border-b border-iasi-grey/5 mb-12">
          <div className="container mx-auto px-6 flex items-center gap-3 text-xs font-black uppercase tracking-wider text-iasi-grey/50">
            <a href="/" className="hover:text-iasi-blue transition-colors">Inicio</a>
            <ChevronRight size={12} />
            <button onClick={onBack} className="hover:text-iasi-blue transition-colors">Catálogo</button>
            <ChevronRight size={12} />
            <span className="text-iasi-blue truncate">{product.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-6">
          {/* Back button */}
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 text-iasi-blue font-black uppercase tracking-widest text-xs mb-8 hover:text-iasi-accent transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver al Catálogo
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Visual Spotlight (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-video lg:aspect-[4/3] w-full bg-white border border-iasi-grey/5 rounded-sm overflow-hidden shadow-2xl group"
              >
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200"} 
                  alt={product.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Tag */}
                <span className="absolute top-6 left-6 bg-iasi-blue text-white text-[10px] tracking-[0.2em] font-black uppercase px-4 py-1.5 rounded-sm shadow-xl">
                  {product.tag || "IASI CHILE"}
                </span>

                {/* Subtitle Accent Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none"></div>
              </motion.div>

              {/* Highlight Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 border border-iasi-grey/5 rounded-sm flex items-center gap-4 hover:border-iasi-accent/40 transition-colors">
                  <div className="bg-iasi-blue/5 p-3 text-iasi-blue rounded-sm shrink-0">
                    <ShieldCheck size={20} className="text-iasi-accent" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-iasi-grey/40 mb-0.5">Norma Eléctrica</h5>
                    <p className="text-xs font-bold text-iasi-blue uppercase">Certificación SEC</p>
                  </div>
                </div>

                <div className="bg-white p-5 border border-iasi-grey/5 rounded-sm flex items-center gap-4 hover:border-iasi-accent/40 transition-colors">
                  <div className="bg-iasi-blue/5 p-3 text-iasi-blue rounded-sm shrink-0">
                    <Zap size={20} className="text-iasi-accent" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-iasi-grey/40 mb-0.5">Disponibilidad</h5>
                    <p className="text-xs font-bold text-iasi-blue uppercase">{product.tag || "Arriendo & Venta"}</p>
                  </div>
                </div>

                <div className="bg-white p-5 border border-iasi-grey/5 rounded-sm flex items-center gap-4 hover:border-iasi-accent/40 transition-colors">
                  <div className="bg-iasi-blue/5 p-3 text-iasi-blue rounded-sm shrink-0">
                    <Clock size={20} className="text-iasi-accent" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-wider text-iasi-grey/40 mb-0.5">Soporte Técnico</h5>
                    <p className="text-xs font-bold text-iasi-blue uppercase">Atención 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications & Content (Right Column) */}
            <div className="lg:col-span-5 flex flex-col">
              <span className="text-xs font-black text-iasi-accent uppercase tracking-[0.3em] block mb-2">
                CATEGORÍA: {CATEGORY_NAMES[product.category] || 'Equipamiento Eléctrico'}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-display font-black text-iasi-blue leading-tight uppercase tracking-tight mb-4">
                {product.name}
              </h1>

              <p className="text-iasi-grey/40 text-xs font-black tracking-widest uppercase mb-6 pb-6 border-b border-iasi-grey/5">
                {product.tag || "IASI THE RENTAL STORE"}
              </p>

              {/* Description */}
              {product.description ? (
                <div className="prose text-iasi-grey/70 text-sm mb-8 leading-relaxed font-medium">
                  <p>{product.description}</p>
                </div>
              ) : (
                <p className="text-iasi-grey/50 italic text-sm mb-8">
                  Venta, arriendo e instalación garantizada bajo los más rigurosos estándares técnicos del mercado.
                </p>
              )}

              {/* Spec Sheet Table */}
              <div className="bg-white p-6 border border-iasi-grey/5 rounded-sm mb-10 shadow-lg shadow-iasi-blue/5">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-iasi-grey/5">
                  <Cpu className="text-iasi-accent" size={18} />
                  <h4 className="font-display font-black text-xs text-iasi-blue uppercase tracking-widest">Ficha de Especificaciones Técnicas</h4>
                </div>

                {product.specs && product.specs.length > 0 ? (
                  <div className="space-y-3.5">
                    {product.specs.map((spec, index) => {
                      // Try splitting on colon for label: value styling
                      const colonIndex = spec.indexOf(':');
                      let term = '';
                      let definition = spec;
                      if (colonIndex > -1) {
                        term = spec.substring(0, colonIndex).trim();
                        definition = spec.substring(colonIndex + 1).trim();
                      }

                      return (
                        <div key={index} className="flex justify-between items-start text-xs border-b border-iasi-grey/5 pb-2.5 last:border-0 last:pb-0">
                          {term ? (
                            <>
                              <span className="font-bold text-iasi-grey/50 uppercase tracking-wider">{term}</span>
                              <span className="font-extrabold text-iasi-blue text-right uppercase">{definition}</span>
                            </>
                          ) : (
                            <span className="font-bold text-iasi-blue uppercase flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-iasi-accent rounded-full inline-block"></span>
                              {spec}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-iasi-grey/40 italic">Especificaciones generales de fábrica. Consulte detalles específicos.</p>
                )}
              </div>

              {/* Quote CTA Button */}
              <button
                onClick={handleQuoteClick}
                className="w-full bg-iasi-blue text-white py-5 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-iasi-accent hover:text-iasi-blue transition-all shadow-xl shadow-iasi-blue/20 flex items-center justify-center gap-4"
              >
                Solicitar Cotización de este Equipo
                <Zap size={16} className="text-iasi-accent" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
