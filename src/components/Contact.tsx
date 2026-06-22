import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Linkedin, Facebook, Instagram } from 'lucide-react';
import React, { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      const quoteProduct = p.get('quote');
      if (quoteProduct) {
        setFormState(prev => ({
          ...prev,
          message: `Deseo solicitar una cotización formal para el siguiente equipo de su catálogo: ${decodeURIComponent(quoteProduct)}`
        }));
        
        // Wait a small moment for initial page layout to settle, then scroll to form
        setTimeout(() => {
          const contactSection = document.getElementById('contacto');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative side element */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-iasi-blue/5 hidden lg:block -z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Contact Info Side */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-iasi-blue"></span>
              <span className="text-iasi-blue font-bold tracking-[0.2em] text-sm uppercase">Canales de Atención</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-black text-iasi-blue leading-tight mb-8">
              HABLEMOS DE <br />
              <span className="text-iasi-accent">TU PRÓXIMO</span> <br />
              PROYECTO CRÍTICO
            </h2>

            <p className="text-lg text-iasi-grey/70 mb-12 leading-relaxed max-w-lg">
              Cotice hoy mismo. Nuestro equipo comercial y técnico le brindará una respuesta experta en menos de 24 horas hábiles.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex gap-6 items-start group">
                <div className="bg-iasi-blue p-4 rounded-sm text-white group-hover:bg-iasi-accent group-hover:text-iasi-blue transition-all shadow-xl shadow-iasi-blue/20">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-iasi-grey/40 mb-1">Central de Ventas</p>
                  <p className="text-xl font-bold text-iasi-blue">(+56) 232 328 249</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="bg-iasi-blue p-4 rounded-sm text-white group-hover:bg-iasi-accent group-hover:text-iasi-blue transition-all shadow-xl shadow-iasi-blue/20">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-iasi-grey/40 mb-1">Correo Electrónico</p>
                  <p className="text-xl font-bold text-iasi-blue">contacto@iasi.cl</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="bg-iasi-blue p-4 rounded-sm text-white group-hover:bg-iasi-accent group-hover:text-iasi-blue transition-all shadow-xl shadow-iasi-blue/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-iasi-grey/40 mb-1">Oficina Comercial</p>
                  <p className="text-xl font-bold text-iasi-blue leading-tight">Manquehue Sur 520, <br />Las Condes, Chile</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="bg-iasi-blue p-4 rounded-sm text-white group-hover:bg-iasi-accent group-hover:text-iasi-blue transition-all shadow-xl shadow-iasi-blue/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-iasi-grey/40 mb-1">Centro de operaciones</p>
                  <p className="text-xl font-bold text-iasi-blue leading-tight">El Taqueral parcela 18A, <br />Lampa, Chile</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="bg-iasi-blue p-4 rounded-sm text-white group-hover:bg-iasi-accent group-hover:text-iasi-blue transition-all shadow-xl shadow-iasi-blue/20">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-iasi-grey/40 mb-1">Horario de Negocio</p>
                  <p className="text-xl font-bold text-iasi-blue leading-tight">Lunes - Viernes: 8:00 - 18:00</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-iasi-blue/5 rounded-full flex items-center justify-center hover:bg-iasi-blue hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-iasi-blue/5 rounded-full flex items-center justify-center hover:bg-iasi-blue hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 bg-iasi-blue/5 rounded-full flex items-center justify-center hover:bg-iasi-blue hover:text-white transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-12 shadow-2xl border border-iasi-grey/5 relative">
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-iasi-accent"></div>
            
            <AnimatePresence mode='wait'>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send size={40} />
                  </div>
                  <h3 className="text-3xl font-display font-black text-iasi-blue mb-4">¡MENSAJE ENVIADO!</h3>
                  <p className="text-iasi-grey/60 mb-8 font-medium">Gracias por contactarnos. Un ejecutivo comercial se pondrá en contacto contigo en breve.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-iasi-blue font-bold uppercase tracking-widest border-b-2 border-iasi-accent"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-iasi-grey/40">Nombre Completo</label>
                      <input 
                        required
                        type="text" 
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-iasi-white border border-iasi-grey/10 p-4 focus:outline-none focus:border-iasi-accent font-medium text-sm transition-all"
                        placeholder="Ej: Juan Pérez"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-iasi-grey/40">Empresa / Faena</label>
                      <input 
                        required
                        type="text" 
                        value={formState.company}
                        onChange={(e) => setFormState({...formState, company: e.target.value})}
                        className="w-full bg-iasi-white border border-iasi-grey/10 p-4 focus:outline-none focus:border-iasi-accent font-medium text-sm transition-all"
                        placeholder="Ej: Minera Escondida"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-iasi-grey/40">Email Corporativo</label>
                    <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-iasi-white border border-iasi-grey/10 p-4 focus:outline-none focus:border-iasi-accent font-medium text-sm transition-all"
                      placeholder="jperez@empresa.cl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-iasi-grey/40">Requerimiento o Equipo</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-iasi-white border border-iasi-grey/10 p-4 focus:outline-none focus:border-iasi-accent font-medium text-sm transition-all resize-none"
                      placeholder="Describa el equipo o servicio que necesita cotizar..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-iasi-blue text-white py-5 rounded-sm font-black text-sm uppercase tracking-[0.2em] hover:bg-iasi-accent hover:text-iasi-blue transition-all shadow-xl shadow-iasi-blue/20 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'ENVIANDO...' : 'ENVIAR SOLICITUD DE COTIZACIÓN'}
                    {!isSubmitting && <Send size={18} />}
                  </button>
                  
                  <p className="text-center text-[10px] text-iasi-grey/40 uppercase tracking-widest">
                    Seguridad garantizada. Protegemos sus datos corporativos.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Maps Section */}
        <div id="ubicaciones" className="mt-24 border-t border-iasi-grey/10 pt-20">
          <div className="text-center mb-16">
            <span className="h-[2px] w-8 bg-iasi-blue mx-auto block mb-4"></span>
            <h3 className="text-3xl md:text-4xl font-display font-black text-iasi-blue tracking-tight uppercase">
              NUESTRAS <span className="text-iasi-accent">INSTALACIONES</span>
            </h3>
            <p className="text-xs text-iasi-grey/60 mt-3 max-w-lg mx-auto uppercase tracking-widest font-black">
              Visitas programadas y despacho logístico a nivel nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map 1: Oficina */}
            <div className="bg-white border border-iasi-grey/10 shadow-2xl relative overflow-hidden rounded-sm group hover:border-iasi-accent transition-all duration-500">
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-iasi-accent opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 border-b border-iasi-grey/5">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-iasi-blue p-3 text-white rounded-sm group-hover:bg-iasi-accent group-hover:text-iasi-blue transition-all duration-300">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-iasi-blue tracking-tight text-xl">OFICINA COMERCIAL</h4>
                    <p className="text-[10px] text-iasi-grey/40 font-black uppercase tracking-wider">Santiago Oriente</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-iasi-grey/70 uppercase tracking-wider leading-relaxed">
                  Manquehue Sur 520, Las Condes, Chile
                </p>
              </div>
              <div className="h-[350px] w-full relative">
                <iframe
                  title="Oficina Las Condes - IASI"
                  src="https://maps.google.com/maps?q=Manquehue%20Sur%20520,%20Las%20Condes,%20Chile&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* Map 2: Centro de operaciones */}
            <div className="bg-white border border-iasi-grey/10 shadow-2xl relative overflow-hidden rounded-sm group hover:border-iasi-accent transition-all duration-500">
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-iasi-accent opacity-30 group-hover:opacity-100 transition-opacity"></div>
              <div className="p-8 border-b border-iasi-grey/5">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-iasi-blue p-3 text-white rounded-sm group-hover:bg-iasi-accent group-hover:text-iasi-blue transition-all duration-300">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-iasi-blue tracking-tight text-xl">CENTRO DE OPERACIONES</h4>
                    <p className="text-[10px] text-iasi-grey/40 font-black uppercase tracking-wider">Santiago Norte</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-iasi-grey/70 uppercase tracking-wider leading-relaxed">
                  El Taqueral parcela 18A, Lampa, Chile
                </p>
              </div>
              <div className="h-[350px] w-full relative">
                <iframe
                  title="Centro de operaciones Lampa - IASI"
                  src="https://maps.google.com/maps?q=El%20Taqueral%20parcela%2018A,%20Lampa,%20Chile&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
