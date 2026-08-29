import React, { useState, useEffect, useMemo } from 'react';
import { Check, Loader2, Sparkles, Bell, ExternalLink, ShieldCheck } from 'lucide-react';
import { SEO } from './SEO';

export const WebsiteBuildingLoader = ({
  businessName = "Your Business",
  totalDurationMinutes = 20,
}) => {
  const [progress, setProgress] = useState(0);
  const [estimatedMinutesLeft, setEstimatedMinutesLeft] = useState(totalDurationMinutes);

  const steps = useMemo(() => [
    { id: 1, label: "Analizando perfil de negocio y audiencia local...", targetPercent: 20 },
    { id: 2, label: "Estructurando arquitectura web mobile-first y wireframes...", targetPercent: 45 },
    { id: 3, label: "Redactando copy de alta conversión y metadatos SEO local...", targetPercent: 70 },
    { id: 4, label: "Conectando sistemas de reservas y captación de leads...", targetPercent: 88 },
    { id: 5, label: "Desplegando prototipo en servidores edge de Vercel...", targetPercent: 99 },
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

      // Curva de progresión asintótica realista (avanza fluido y se pausa en 99%)
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
    <div className="min-h-screen bg-neutral text-obsidian flex flex-col items-center justify-center p-4 sm:p-6 font-body selection:bg-chartreuse selection:text-obsidian relative overflow-hidden">
      <SEO 
        title={`Generando Sistema Digital | ${businessName}`}
        description={`Texh Co. está construyendo el ecosistema digital para ${businessName}.`}
      />

      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-chartreuse/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-obsidian/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Main Terminal Card */}
      <div className="w-full max-w-xl bg-obsidian text-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl border border-white/10 relative z-10">
        
        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-chartreuse/10 text-chartreuse border border-chartreuse/20">
              <span className="h-1.5 w-1.5 rounded-full bg-chartreuse animate-pulse" />
              Pipeline Activo // v2.6
            </span>
          </div>
          <div className="text-right font-mono text-[10px] uppercase tracking-widest text-white/40">
            Staging Environment
          </div>
        </div>

        {/* Headline with Texh Co Signature Accent */}
        <div className="flex items-end justify-between gap-4 mb-8 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 block mb-1">
              Despliegue en curso
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase leading-tight text-white">
              SISTEMA <span className="bg-chartreuse text-obsidian px-2 py-0.5 inline-block">{businessName}</span>
            </h1>
          </div>
          <div className="text-right">
            <span className="text-4xl sm:text-5xl font-mono font-black text-chartreuse tracking-tight">
              {progress}%
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2.5 mb-8">
          <div className="w-full bg-white/10 rounded-full h-3 p-0.5 border border-white/5 overflow-hidden">
            <div
              className="bg-chartreuse h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(201,255,31,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-white/50 uppercase tracking-wider">
            <span>Generación de Prototipo</span>
            <span>Tiempo restante: ~{estimatedMinutesLeft} min</span>
          </div>
        </div>

        {/* Step Checklist */}
        <div className="space-y-3 mb-8">
          {steps.map((step) => {
            const isCompleted = progress >= step.targetPercent;
            const isCurrent = progress < step.targetPercent && (
              step.id === 1 || progress >= steps[step.id - 2].targetPercent
            );

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-white/[0.03] border-white/5 text-white/70'
                    : isCurrent
                    ? 'bg-chartreuse/10 border-chartreuse/30 text-white shadow-lg shadow-chartreuse/5'
                    : 'bg-transparent border-transparent text-white/25'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-chartreuse text-obsidian flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-chartreuse animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-white/10 bg-white/5" />
                  )}
                </div>
                <span className={`text-xs sm:text-sm font-body ${isCurrent ? 'font-bold text-white' : 'font-light'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Notification Banner */}
        <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/10 flex items-start gap-3 text-xs text-white/70 font-light leading-relaxed">
          <Bell className="w-4 h-4 text-chartreuse flex-shrink-0 mt-0.5" />
          <p>
            Puedes cerrar esta pestaña con tranquilidad. Te notificaremos por <strong className="text-white font-bold">SMS y correo</strong> en cuanto tu prototipo interactivo esté listo para probar.
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
          <span>Engineered by Texh Co.</span>
          <a 
            href="https://texhco.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-chartreuse hover:underline inline-flex items-center gap-1 font-bold"
          >
            texhco.com <ExternalLink size={10} />
          </a>
        </div>

      </div>
    </div>
  );
};
