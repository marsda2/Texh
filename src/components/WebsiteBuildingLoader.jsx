import React, { useState, useEffect, useMemo } from 'react';
import { Check, Loader2, Bell, ExternalLink, Sparkles, Clock, Globe, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { SEO } from './SEO';

export const WebsiteBuildingLoader = ({
  businessName = "Your Business",
  totalDurationMinutes = 20,
}) => {
  const [progress, setProgress] = useState(0);
  const [estimatedMinutesLeft, setEstimatedMinutesLeft] = useState(totalDurationMinutes);

  const steps = useMemo(() => [
    { 
      id: 1, 
      tag: "FASE 01", 
      title: "Auditoría de Perfil & Audiencia Local", 
      desc: "Analizando competidores locales y puntos de conversión en Bergen County / NJ.", 
      targetPercent: 20 
    },
    { 
      id: 2, 
      tag: "FASE 02", 
      title: "Arquitectura Web Mobile-First & Wireframes", 
      desc: "Estructurando navegación ultra-rápida optimizada para tráfico de Meta Ads.", 
      targetPercent: 45 
    },
    { 
      id: 3, 
      tag: "FASE 03", 
      title: "Copywriting de Conversión & SEO Local", 
      desc: "Redactando propuestas de valor y etiquetas estructuradas para Google Maps.", 
      targetPercent: 70 
    },
    { 
      id: 4, 
      tag: "FASE 04", 
      title: "Sistemas de Reservas & Captación de Leads", 
      desc: "Integrando formularios interactivos con notificaciones inmediatas.", 
      targetPercent: 88 
    },
    { 
      id: 5, 
      tag: "FASE 05", 
      title: "Despliegue en Servidores Edge de Vercel", 
      desc: "Generando certificados SSL e infraestructura CDN global de alto rendimiento.", 
      targetPercent: 99 
    },
  ], []);

  useEffect(() => {
    const storageKey = `website_build_start_${businessName.replace(/\s+/g, '_').toLowerCase()}`;
    let startTime = localStorage.getItem(storageKey);

    if (!startTime) {
      startTime = Date.now().toString();
      localStorage.setItem(storageKey, startTime);
    }

    const totalDurationMs = totalDurationMinutes * 60 * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - parseInt(startTime, 10);

      // Curva de progresión fluida y asintótica hacia el 99%
      const linearRatio = Math.min(elapsed / totalDurationMs, 1);
      const calculatedProgress = Math.min(
        Math.floor(12 + Math.pow(linearRatio, 0.7) * 86),
        99
      );

      setProgress(calculatedProgress);

      const msRemaining = Math.max(0, totalDurationMs - elapsed);
      setEstimatedMinutesLeft(Math.max(1, Math.ceil(msRemaining / 60000)));
    }, 1000);

    return () => clearInterval(interval);
  }, [businessName, totalDurationMinutes]);

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-obsidian flex flex-col items-center justify-between p-4 sm:p-8 md:p-12 font-body selection:bg-chartreuse selection:text-obsidian relative overflow-hidden">
      <SEO 
        title={`Generando Sistema Digital | ${businessName}`}
        description={`Texh Co. está construyendo el ecosistema digital para ${businessName}.`}
      />

      {/* Top Floating Branding Navbar (Matching Texh Co Homepage) */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 px-6 md:px-8 bg-white/80 backdrop-blur-md rounded-full border border-obsidian/5 shadow-sm mb-8 relative z-20">
        <a href="https://texhco.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-heading font-black text-lg tracking-tighter text-obsidian">
          <span>TEXH</span>
          <span className="text-xs bg-chartreuse text-obsidian px-1.5 py-0.5 rounded font-black ml-0.5">CO.</span>
        </a>

        <div className="hidden sm:flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-obsidian/70">
            Pipeline Staging // v2.6 // Live
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-obsidian text-chartreuse rounded-full text-[10px] font-mono font-black uppercase tracking-wider">
            Staging Node
          </span>
        </div>
      </header>

      {/* Main Console Container */}
      <main className="w-full max-w-5xl bg-[#1A1A1A] text-white rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 md:p-14 shadow-2xl border border-white/10 relative z-10 flex-1 flex flex-col justify-between my-auto">
        
        {/* Top Meta Details */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-black uppercase tracking-widest bg-chartreuse/15 text-chartreuse border border-chartreuse/30">
              <Sparkles size={13} className="text-chartreuse" />
              Ecosistema en Generación
            </div>
            <div className="flex items-center gap-2 text-white/80 font-mono text-xs font-bold uppercase tracking-wider">
              <Clock size={14} className="text-chartreuse" />
              <span>Tiempo Estimado: <strong className="text-white font-black">~{estimatedMinutesLeft} min</strong></span>
            </div>
          </div>

          {/* Headline & Progress Percentage (High Contrast) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/60 font-bold block mb-2">
                Arquitectura de Crecimiento Local
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight uppercase leading-none text-white">
                SISTEMA <span className="bg-chartreuse text-obsidian px-3 py-1 inline-block mt-1">{businessName}</span>
              </h1>
            </div>
            <div className="flex items-baseline md:flex-col md:items-end gap-2 md:gap-0">
              <span className="text-5xl sm:text-6xl md:text-7xl font-mono font-black text-chartreuse tracking-tighter drop-shadow-[0_0_25px_rgba(201,255,31,0.3)]">
                {progress}%
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold">
                Progreso del Pipeline
              </span>
            </div>
          </div>

          {/* Progress Bar (High Glow) */}
          <div className="space-y-3 mb-10">
            <div className="w-full bg-white/10 rounded-full h-4 p-0.5 border border-white/10 overflow-hidden shadow-inner">
              <div
                className="bg-chartreuse h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(201,255,31,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-white/70 uppercase tracking-wider font-bold">
              <span>Fase actual: {steps.find(s => progress < s.targetPercent)?.tag || 'FINALIZANDO'}</span>
              <span className="text-chartreuse">Entorno Vercel Edge</span>
            </div>
          </div>

          {/* Multi-Step Checklist (High Contrast & Clear Readability) */}
          <div className="space-y-3.5 mb-10">
            {steps.map((step) => {
              const isCompleted = progress >= step.targetPercent;
              const isCurrent = progress < step.targetPercent && (
                step.id === 1 || progress >= steps[step.id - 2].targetPercent
              );

              return (
                <div
                  key={step.id}
                  className={`flex items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                    isCompleted
                      ? 'bg-white/[0.04] border-white/10 text-white'
                      : isCurrent
                      ? 'bg-chartreuse/10 border-chartreuse/50 text-white shadow-lg shadow-chartreuse/5'
                      : 'bg-white/[0.01] border-white/5 text-gray-300'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-4 flex-1">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-0.5 sm:mt-0">
                      {isCompleted ? (
                        <div className="w-7 h-7 rounded-full bg-chartreuse text-obsidian flex items-center justify-center font-bold shadow-md shadow-chartreuse/20">
                          <Check className="w-4 h-4 stroke-[3px]" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-7 h-7 rounded-full bg-chartreuse/20 border border-chartreuse/40 flex items-center justify-center">
                          <Loader2 className="w-4 h-4 text-chartreuse animate-spin" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full border border-white/20 bg-white/5 flex items-center justify-center font-mono text-[10px] text-white/40">
                          0{step.id}
                        </div>
                      )}
                    </div>

                    {/* Step Title & Description */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                          isCompleted ? 'bg-white/10 text-white/70' : isCurrent ? 'bg-chartreuse text-obsidian font-black' : 'bg-white/5 text-white/40'
                        }`}>
                          {step.tag}
                        </span>
                        <h4 className={`text-sm sm:text-base font-heading ${isCurrent ? 'font-black text-white' : isCompleted ? 'font-bold text-white' : 'font-medium text-gray-200'}`}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 font-light mt-1 leading-relaxed hidden sm:block">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Status Label on Desktop */}
                  <div className="hidden md:block text-right">
                    <span className={`text-xs font-mono font-bold uppercase tracking-widest ${
                      isCompleted ? 'text-chartreuse' : isCurrent ? 'text-white animate-pulse' : 'text-white/30'
                    }`}>
                      {isCompleted ? 'Listo' : isCurrent ? 'En Proceso...' : 'En Espera'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom High-Contrast Alert Box */}
          <div className="bg-[#242424] rounded-2xl p-5 md:p-6 border border-white/15 shadow-xl flex items-start gap-4 text-white">
            <div className="w-10 h-10 rounded-xl bg-chartreuse/10 border border-chartreuse/30 text-chartreuse flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bell size={20} />
            </div>
            <div className="text-sm leading-relaxed text-gray-200">
              <p className="font-bold text-white text-base mb-1">
                Puedes cerrar esta pestaña con tranquilidad
              </p>
              <p className="font-light text-gray-300 text-xs sm:text-sm">
                Nuestro sistema enviará una notificación por <strong className="text-chartreuse font-black uppercase tracking-wider">SMS y correo electrónico</strong> en el momento exacto en el que el prototipo interactivo esté desplegado y listo para probar.
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-chartreuse" />
            <span>Infraestructura Segura de Alta Velocidad</span>
          </div>
          <a 
            href="https://texhco.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-chartreuse transition-colors inline-flex items-center gap-1.5 font-bold"
          >
            <span>Desarrollado por TEXH CO.</span>
            <ArrowUpRight size={14} className="text-chartreuse" />
          </a>
        </div>

      </main>

      {/* Ambient Page Footer */}
      <footer className="mt-8 text-center text-xs font-mono text-obsidian/40 uppercase tracking-widest">
        © {new Date().getFullYear()} TEXH CO. DIGITAL GROWTH ECOSYSTEMS.
      </footer>
    </div>
  );
};
