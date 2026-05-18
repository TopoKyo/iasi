import { useState, useEffect } from 'react';
import { auth, loginWithGoogle } from '../../lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  Settings, 
  Package, 
  Image as ImageIcon,
  Save,
  X,
  PlusCircle
} from 'lucide-react';
import { 
  getCatalogItems, 
  createCatalogItem, 
  updateCatalogItem, 
  deleteCatalogItem, 
  CatalogItem 
} from '../../lib/catalog';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = [
  { id: 'distribucion', name: 'Distribución' },
  { id: 'poder', name: 'Poder' },
  { id: 'subestaciones', name: 'Subestaciones' },
  { id: 'seco', name: 'Resina Seca' },
  { id: 'equipos', name: 'Equipos Auxiliares' }
];

export default function AdminPanel() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<Partial<CatalogItem>>({
    name: '',
    category: 'distribucion',
    tag: 'Stock',
    image: '',
    specs: ['']
  });

  useEffect(() => {
    // Safety timeout to prevent stuck loading state
    const timeout = setTimeout(() => {
      setLoading(prev => {
        if (prev) console.warn("Auth check timed out, forcing login UI");
        return false;
      });
    }, 5000);

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      clearTimeout(timeout);
      setUser(u);
      if (u) {
        loadItems();
      } else {
        setLoading(false);
      }
    }, (err) => {
      clearTimeout(timeout);
      console.error("Auth Error:", err);
      setLoading(false);
    });
    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await getCatalogItems();
      setItems(data);
    } catch (err) {
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  async function handleSave() {
    if (!currentItem.name || !currentItem.image || !currentItem.category) {
      alert("Por favor complete los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      const itemData = {
        name: currentItem.name,
        category: currentItem.category,
        tag: currentItem.tag || 'Stock',
        image: currentItem.image,
        specs: (currentItem.specs || []).filter(s => s.trim() !== '')
      };

      if (currentItem.id) {
        await updateCatalogItem(currentItem.id, itemData);
      } else {
        await createCatalogItem(itemData);
      }

      setIsEditing(false);
      setCurrentItem({ name: '', category: 'distribucion', tag: 'Stock', image: '', specs: [''] });
      await loadItems();
    } catch (err) {
      console.error("Save Error:", err);
      alert("No se pudo guardar el equipo. Verifique los permisos o intente más tarde.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("¿Está seguro de eliminar este equipo?")) {
      await deleteCatalogItem(id);
      loadItems();
    }
  }

  const isAdmin = user?.email === 'chinchuarchibo@gmail.com';

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-iasi-blue text-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-iasi-accent mb-6"></div>
      <p className="font-display font-black text-xl tracking-[0.2em] animate-pulse uppercase">Iniciando Panel de Control...</p>
      <p className="text-white/30 text-xs mt-2 uppercase tracking-widest">Estableciendo conexión segura con IASI Chile</p>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-iasi-blue px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-12 rounded-sm shadow-2xl max-w-md w-full text-center relative overflow-hidden backdrop-blur-md"
        >
          {/* Decorative glows */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-iasi-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>

          <Settings className="w-16 h-16 text-iasi-accent mx-auto mb-6" />
          <h2 className="text-3xl font-display font-black text-white mb-2 tracking-tighter">PANEL DE CONTROL</h2>
          <p className="text-white/40 mb-8 font-medium">Solo personal autorizado para la gestión del catálogo IASI.</p>
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-iasi-accent text-iasi-blue py-4 rounded-sm font-black text-xs tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg shadow-iasi-accent/10"
          >
            <ImageIcon size={18} />
            INGRESAR CON GOOGLE
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-iasi-blue px-6">
        <div className="bg-white/5 border border-white/10 p-12 rounded-sm shadow-2xl max-w-md w-full text-center backdrop-blur-md">
          <X className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-display font-black text-white mb-2">ACCESO DENEGADO</h2>
          <p className="text-white/40 mb-8 font-medium">Usted no tiene permisos de administrador para este sitio.</p>
          <button onClick={() => signOut(auth)} className="text-iasi-accent font-bold hover:underline">Cerrar Sesión</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-iasi-blue text-white selection:bg-iasi-accent selection:text-iasi-blue">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/5 py-6 px-10 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Settings className="text-iasi-accent" />
          <h1 className="font-display font-black text-2xl tracking-tight">ADMIN <span className="text-iasi-accent">CATÁLOGO</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-iasi-accent transition-colors hidden md:block">
            Volver al Sitio
          </a>
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-iasi-accent">{user.displayName}</p>
            <p className="text-[10px] text-white/40">{user.email}</p>
          </div>
          <button 
            onClick={() => signOut(auth)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="container mx-auto py-12 px-6 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-display font-black text-white">GESTIONAR EQUIPOS</h2>
            <p className="text-white/40 mt-1 font-medium">Total: {items.length} equipos registrados</p>
          </div>
          <button 
            onClick={() => {
              setCurrentItem({ name: '', category: 'distribucion', tag: 'Stock', image: '', specs: [''] });
              setIsEditing(true);
            }}
            className="bg-iasi-accent text-iasi-blue px-6 py-3 rounded-sm font-black text-xs tracking-widest hover:bg-white transition-all flex items-center gap-2 shadow-lg shadow-iasi-accent/20"
          >
            <Plus size={18} />
            AÑADIR EQUIPO
          </button>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white/5 border border-white/5 p-6 rounded-sm hover:border-white/20 transition-all group">
              <div className="aspect-video bg-white/5 mb-6 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => {
                      setCurrentItem(item);
                      setIsEditing(true);
                    }}
                    className="bg-white p-2 text-iasi-blue hover:bg-iasi-accent transition-colors shadow-lg"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id!)}
                    className="bg-red-500 p-2 text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] font-black uppercase text-iasi-accent tracking-[0.2em] mb-1">{item.tag}</p>
              <h3 className="text-lg font-display font-black text-white mb-2 truncate">{item.name}</h3>
              <p className="text-xs font-bold text-white/30 uppercase mb-4 tracking-widest">{CATEGORIES.find(c => c.id === item.category)?.name}</p>
              <div className="flex flex-wrap gap-2">
                {item.specs.slice(0, 2).map((s, i) => (
                  <span key={i} className="text-[10px] bg-white/5 px-2 py-1 text-white/60 font-bold border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
          IASI RENTAL STORE CHILE • PANEL DE ADMINISTRACIÓN SEGURO
        </p>
      </footer>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditing(false)}
              className="absolute inset-0 bg-iasi-blue/95 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-sm shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="bg-iasi-blue p-6 flex justify-between items-center text-white">
                <h3 className="font-display font-black text-xl uppercase tracking-tight">
                  {currentItem.id ? 'Editar Equipo' : 'Nuevo Equipo'}
                </h3>
                <button onClick={() => setIsEditing(false)} className="hover:text-iasi-accent transition-colors">
                  <X />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto bg-iasi-white">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-iasi-blue uppercase tracking-widest mb-2">Nombre del Equipo</label>
                      <input 
                        type="text" 
                        value={currentItem.name}
                        onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                        className="w-full bg-white border border-iasi-grey/10 p-3 focus:outline-none focus:border-iasi-accent font-medium text-sm text-iasi-blue"
                        placeholder="Ej: Transformador 500kVA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-iasi-blue uppercase tracking-widest mb-2">Categoría</label>
                      <select 
                        value={currentItem.category}
                        onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                        className="w-full bg-white border border-iasi-grey/10 p-3 focus:outline-none focus:border-iasi-accent font-medium text-sm text-iasi-blue"
                      >
                        {CATEGORIES.map(c => <option key={c.id} value={c.id} className="text-iasi-blue">{c.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-black text-iasi-blue uppercase tracking-widest mb-2">Etiqueta (Tag)</label>
                      <input 
                        type="text" 
                        value={currentItem.tag}
                        onChange={(e) => setCurrentItem({...currentItem, tag: e.target.value})}
                        className="w-full bg-white border border-iasi-grey/10 p-3 focus:outline-none focus:border-iasi-accent font-medium text-sm text-iasi-blue"
                        placeholder="Ej: Stock, Nuevo, Premium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-iasi-blue uppercase tracking-widest mb-2">URL de Imagen</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-iasi-grey/30" size={16} />
                        <input 
                          type="text" 
                          value={currentItem.image}
                          onChange={(e) => setCurrentItem({...currentItem, image: e.target.value})}
                          className="w-full bg-white border border-iasi-grey/10 p-3 pl-10 focus:outline-none focus:border-iasi-accent font-medium text-sm text-iasi-blue"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-black text-iasi-blue uppercase tracking-widest">Especificaciones Técnicas</label>
                      <button 
                        onClick={() => setCurrentItem({...currentItem, specs: [...(currentItem.specs || []), '']})}
                        className="text-iasi-accent hover:text-iasi-blue transition-colors"
                      >
                        <PlusCircle size={20} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {(currentItem.specs || []).map((spec, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input 
                            type="text" 
                            value={spec}
                            onChange={(e) => {
                              const newSpecs = [...(currentItem.specs || [])];
                              newSpecs[idx] = e.target.value;
                              setCurrentItem({...currentItem, specs: newSpecs});
                            }}
                            className="flex-grow bg-white border border-iasi-grey/10 p-3 focus:outline-none focus:border-iasi-accent font-medium text-sm text-iasi-blue"
                            placeholder="Ej: Potencia: 500kVA"
                          />
                          <button 
                            onClick={() => {
                              const newSpecs = [...(currentItem.specs || [])];
                              newSpecs.splice(idx, 1);
                              setCurrentItem({...currentItem, specs: newSpecs});
                            }}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-8 border-t border-iasi-grey/5 bg-white flex justify-end gap-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-3 font-black text-xs uppercase tracking-widest text-iasi-grey/60 hover:text-iasi-blue transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-iasi-blue text-white px-10 py-3 rounded-sm font-black text-xs tracking-widest hover:bg-iasi-accent hover:text-iasi-blue transition-all flex items-center gap-2 shadow-xl shadow-iasi-blue/20"
                >
                  <Save size={18} />
                  GUARDAR CAMBIOS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
