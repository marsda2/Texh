import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Code, Smartphone, Cpu, Megaphone, ArrowRight, ChevronLeft, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';

const Services = () => {
    const { t, language } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    // Scroll Progress Tracking
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const [progressPercent, setProgressPercent] = useState(0);

    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (latest) => {
            const pct = Math.min(100, Math.max(0, Math.round(latest * 100)));
            setProgressPercent(pct);
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    const systemModules = [
        {
            id: 'web',
            num: '01',
            category: t('services.category1'),
            title: t('services.webDesign'),
            description: t('services.webDesignDesc'),
            icon: <Code className="w-6 h-6 text-chartreuse" />,
            features: language === 'es' 
                ? ['Diseño Mobile-First', 'Velocidad Cero Fricción', 'UI/UX Orientada a Ventas'] 
                : ['Mobile-First Architecture', 'Zero Friction Speed', 'Sales-Oriented UI/UX']
        },
        {
            id: 'app',
            num: '02',
            category: t('services.category1'),
            title: t('services.apps'),
            description: t('services.appsDesc'),
            icon: <Smartphone className="w-6 h-6 text-chartreuse" />,
            features: language === 'es' 
                ? ['Posicionamiento en Maps', 'Indexación por IA', 'Estructura SEO Local'] 
                : ['Google Maps Visibility', 'AI-Search Indexing', 'Local SEO Structure']
        },
        {
            id: 'maintenance',
            num: '03',
            category: t('services.category1'),
            title: t('services.maintenance'),
            description: t('services.maintenanceDesc'),
            icon: <Cpu className="w-6 h-6 text-chartreuse" />,
            features: language === 'es' 
                ? ['Reservas Automáticas', 'Captación de Leads 24/7', 'Integración CRM'] 
                : ['Automated Bookings', '24/7 Lead Capture', 'CRM Integration']
        },
        {
            id: 'social',
            num: '04',
            category: t('services.category2'),
            title: t('services.social'),
            description: t('services.socialDesc'),
            icon: <Megaphone className="w-6 h-6 text-chartreuse" />,
            features: language === 'es' 
                ? ['Pixel de Meta Configurado', 'Campañas en TikTok & Google', 'Retargeting de Alta Conversión'] 
                : ['Meta Pixel Configured', 'TikTok & Google Campaigns', 'High-Conversion Retargeting']
        }
    ];

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % systemModules.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + systemModules.length) % systemModules.length);
    };

    return (
        <section 
            id="services" 
            ref={sectionRef} 
            className="relative py-20 lg:py-28 bg-white border-y border-obsidian/10 overflow-hidden"
        >
            {/* Background Grid Pattern Overlay */}
            <div className="grid-bg-overlay opacity-5"></div>

            <div className="container relative z-10">
                {/* Header with Title & Scroll Percentage Ring */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-obsidian text-chartreuse font-mono font-bold text-[10px] uppercase tracking-[0.2em] px-3.5 py-1 rounded-full shadow-inner flex items-center gap-2">
                                <Zap className="w-3 h-3 text-chartreuse animate-pulse" />
                                SYSTEM ARCHITECTURE
                            </span>
                            <span className="text-obsidian/40 font-mono text-xs font-bold">v2.6 // LIVE</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading text-obsidian tracking-tight uppercase leading-[0.9]">
                            {t('services.titleStart')} <span className="bg-chartreuse text-obsidian px-3 py-1 inline-block underline decoration-obsidian decoration-[6px] underline-offset-4">{t('services.titleAccent')}{t('services.titleEnd')}</span>
                        </h2>
                        <p className="text-gray-dark text-lg font-light font-body mt-4 max-w-xl leading-relaxed">
                            {t('services.desc')}
                        </p>
                    </div>

                    {/* Scroll Percentage & Controls Badge */}
                    <div className="flex items-center gap-6 bg-neutral p-4 rounded-3xl border border-obsidian/10 shadow-sm shrink-0 self-start lg:self-auto">
                        {/* Live Percentage Circle */}
                        <div className="relative w-14 h-14 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <path
                                    className="text-obsidian/10"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className="text-chartreuse transition-all duration-300"
                                    strokeDasharray={`${progressPercent}, 100`}
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <span className="absolute font-mono font-black text-xs text-obsidian">{progressPercent}%</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono font-black text-obsidian/40 uppercase tracking-widest">SYSTEM DISCOVERED</span>
                            <span className="text-sm font-black font-heading text-obsidian uppercase">MODULE 0{activeIndex + 1} / 04</span>
                        </div>

                        {/* Arrow Nav Buttons */}
                        <div className="flex items-center gap-2 ml-2">
                            <button
                                onClick={prevSlide}
                                className="w-10 h-10 rounded-2xl bg-white border border-obsidian/10 flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-chartreuse transition-all active:scale-95 shadow-sm"
                                aria-label="Previous Module"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-10 h-10 rounded-2xl bg-white border border-obsidian/10 flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-chartreuse transition-all active:scale-95 shadow-sm"
                                aria-label="Next Module"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Module Step Selector Pills */}
                <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
                    {systemModules.map((mod, idx) => (
                        <button
                            key={mod.id}
                            onClick={() => setActiveIndex(idx)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full font-heading font-black text-xs uppercase tracking-widest transition-all shrink-0 border ${
                                activeIndex === idx
                                    ? 'bg-obsidian text-chartreuse border-obsidian shadow-lg scale-[1.02]'
                                    : 'bg-neutral/80 text-obsidian/60 border-obsidian/10 hover:text-obsidian hover:bg-neutral'
                            }`}
                        >
                            <span className={`font-mono text-[11px] ${activeIndex === idx ? 'text-chartreuse' : 'text-obsidian/40'}`}>
                                {mod.num}.
                            </span>
                            {mod.title}
                        </button>
                    ))}
                </div>

                {/* Main Interactive Carousel Display */}
                <div className="relative overflow-hidden rounded-[2.5rem] bg-obsidian p-8 md:p-12 text-white shadow-2xl">
                    {/* Background Ambient Glow */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-chartreuse/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
                    >
                        {/* Left Side: Module Info */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="bg-chartreuse/20 text-chartreuse font-mono text-xs font-black px-3 py-1 rounded-full border border-chartreuse/30">
                                    MODULE {systemModules[activeIndex].num}
                                </span>
                                <span className="text-white/40 text-xs font-mono font-bold uppercase tracking-wider">
                                    {systemModules[activeIndex].category}
                                </span>
                            </div>

                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tight leading-none">
                                {systemModules[activeIndex].title}
                            </h3>

                            <p className="text-white/70 text-base md:text-lg font-light leading-relaxed max-w-xl">
                                {systemModules[activeIndex].description}
                            </p>

                            {/* Features Bullet List */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                {systemModules[activeIndex].features.map((feat, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 p-3 rounded-2xl">
                                        <CheckCircle2 className="w-4 h-4 text-chartreuse shrink-0" />
                                        <span className="text-xs font-bold text-white/90 leading-tight">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Link */}
                            <div className="pt-4">
                                <Link
                                    to={`/estimator?service=${systemModules[activeIndex].id}`}
                                    className="inline-flex items-center gap-3 text-xs font-heading font-black text-obsidian bg-chartreuse px-8 py-4 rounded-2xl uppercase tracking-widest hover:bg-white transition-all shadow-lg hover:shadow-chartreuse/20"
                                >
                                    {language === 'es' ? 'Comenzar Cotización' : 'Start Estimate'}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Interactive Visual Card */}
                        <div className="lg:col-span-5">
                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-between min-h-[320px]">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shadow-inner">
                                        {systemModules[activeIndex].icon}
                                    </div>
                                    <span className="font-mono text-3xl font-black text-chartreuse/30">
                                        #{systemModules[activeIndex].num}
                                    </span>
                                </div>

                                <div>
                                    <div className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-chartreuse mb-1">
                                        INTEGRATION READY
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">
                                        {systemModules[activeIndex].title}
                                    </h4>
                                    <p className="text-xs text-white/60 font-light leading-relaxed">
                                        {language === 'es'
                                            ? 'Módulo optimizado para máxima conversión y tracción automatizada.'
                                            : 'Module optimized for maximum conversion and automated traction.'}
                                    </p>
                                </div>

                                {/* Bottom Progress Line */}
                                <div className="w-full bg-white/10 h-1 rounded-full mt-6 overflow-hidden">
                                    <div 
                                        className="bg-chartreuse h-full transition-all duration-500"
                                        style={{ width: `${((activeIndex + 1) / systemModules.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Services;

