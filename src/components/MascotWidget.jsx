import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

export const MascotWidget = ({ onOpenAudit }) => {
    const { language } = useLanguage();
    const es = language === 'es';
    
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Show initial 'Hey! 👋' floating teaser pill after 4.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4500);

        return () => clearTimeout(timer);
    }, []);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleAction = () => {
        setIsExpanded(false);
        onOpenAudit();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end pointer-events-none select-none font-sans">
            {/* Custom keyframes style for hand wave animation */}
            <style>{`
                @keyframes texh-wave {
                    0% { transform: rotate(0deg); }
                    15% { transform: rotate(18deg); }
                    30% { transform: rotate(-12deg); }
                    45% { transform: rotate(18deg); }
                    60% { transform: rotate(-8deg); }
                    75% { transform: rotate(12deg); }
                    100% { transform: rotate(0deg); }
                }
                .animate-texh-wave {
                    display: inline-block;
                    transform-origin: 70% 70%;
                    animation: texh-wave 2s infinite ease-in-out;
                }
            `}</style>

            {/* Expanded Premium Card Chat Popover */}
            {isExpanded && (
                <div 
                    className="pointer-events-auto mb-3 w-[320px] sm:w-[360px] bg-obsidian text-white rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-chartreuse/30 backdrop-blur-2xl transition-all duration-300 transform origin-bottom-right animate-in fade-in slide-in-from-bottom-4 zoom-in-95"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                        <div className="flex items-center gap-2.5">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-chartreuse/20 border border-chartreuse flex items-center justify-center text-chartreuse font-black text-sm">
                                    🤖
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-chartreuse rounded-full ring-2 ring-obsidian animate-ping" />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-chartreuse rounded-full ring-2 ring-obsidian" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-1.5">
                                    Texh Co. Assistant
                                </h4>
                                <p className="text-[10px] text-white/50">{es ? 'Estrategia Digital & Conversión' : 'Digital Strategy & Conversion'}</p>
                            </div>
                        </div>
                        <button 
                            onClick={handleToggleExpand}
                            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                            title={es ? 'Cerrar' : 'Close'}
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Content - Refined Professional Tone */}
                    <div className="space-y-4">
                        <p className="text-xs sm:text-sm font-normal text-white/90 leading-relaxed">
                            {es ? (
                                <>
                                    ¿Quieres analizar el rendimiento real y el potencial de captación de clientes de tu sitio web?
                                </>
                            ) : (
                                <>
                                    Looking to evaluate your website’s true performance and client conversion potential?
                                </>
                            )}
                        </p>
                        
                        <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 flex items-start gap-3">
                            <Sparkles size={16} className="text-chartreuse flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] text-white/70 font-medium leading-relaxed">
                                {es 
                                    ? 'Elaboramos una Auditoría Técnica y Estratégica 100% gratuita con plan de acción en 24 horas.' 
                                    : 'We deliver a 100% free Technical & Strategic Audit with an actionable roadmap within 24 hours.'}
                            </p>
                        </div>

                        {/* High conversion CTA Button */}
                        <button
                            onClick={handleAction}
                            className="w-full bg-chartreuse text-obsidian font-black text-xs uppercase tracking-wider py-4 px-4 rounded-2xl hover:bg-white transition-all shadow-[0_0_25px_rgba(201,255,31,0.35)] flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            <span>{es ? 'Solicitar Auditoría Gratuita 🚀' : 'Claim Free Audit 🚀'}</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Teaser Pill ("Hey! 👋") */}
            <button
                onClick={handleToggleExpand}
                className="pointer-events-auto relative group flex items-center gap-3 bg-obsidian/95 text-white rounded-full py-2.5 px-4 border border-chartreuse/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:border-chartreuse hover:shadow-[0_0_25px_rgba(201,255,31,0.3)] transition-all duration-300 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-md"
            >
                <div className="w-8 h-8 rounded-full bg-chartreuse/20 border border-chartreuse/60 flex items-center justify-center text-chartreuse text-sm font-bold shadow-sm relative flex-shrink-0">
                    🤖
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-chartreuse rounded-full ring-2 ring-obsidian" />
                </div>
                <div className="flex items-center gap-1.5 text-left">
                    <span className="text-xs sm:text-sm font-black text-white tracking-tight">Hey!</span>
                    <span className="animate-texh-wave text-base">👋</span>
                </div>
                <span className="ml-1 text-[10px] font-mono font-bold text-chartreuse bg-chartreuse/10 border border-chartreuse/20 px-2 py-0.5 rounded-full uppercase hidden sm:inline-block">
                    {es ? 'Auditoría' : 'Audit'}
                </span>
            </button>
        </div>
    );
};

export default MascotWidget;

