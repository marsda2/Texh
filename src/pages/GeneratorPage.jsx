import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, 
    ArrowRight, 
    ArrowLeft, 
    Check, 
    Loader2, 
    Building, 
    Scissors, 
    Wrench, 
    Stethoscope, 
    Utensils, 
    Briefcase, 
    Palette, 
    Target, 
    Phone, 
    Calendar, 
    MessageSquare, 
    FileText, 
    ShieldCheck,
    Globe,
    Zap
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackLeadEvent } from '../lib/analytics';
import { SEO } from '../components/SEO';

const INDUSTRIES = [
    { id: 'beauty', label: 'Belleza, Salones & Spas', icon: Scissors, example: 'ej. Lumina Spa' },
    { id: 'contractor', label: 'Construcción & Contratistas', icon: Wrench, example: 'ej. Apex Roofing' },
    { id: 'health', label: 'Clínicas & Salud Privada', icon: Stethoscope, example: 'ej. Nova Dental' },
    { id: 'hospitality', label: 'Restaurantes & Hostelería', icon: Utensils, example: 'ej. Bistro 9' },
    { id: 'professional', label: 'Servicios Profesionales', icon: Briefcase, example: 'ej. Lex Consulting' },
    { id: 'other', label: 'Otro Negocio Local', icon: Building, example: 'ej. Urban Fitness' }
];

const PALETTES = [
    { 
        id: 'obsidian_tech', 
        name: 'Obsidian & Minimal Tech', 
        desc: 'Negro profundo, blanco nítido y acento Chartreuse neón. Moderno y de alto impacto.',
        swatches: ['#212121', '#FFFFFF', '#C9FF1F']
    },
    { 
        id: 'luxury_gold', 
        name: 'Lujo & Alta Gama', 
        desc: 'Negro mate, blanco marfil y acento Dorado cálido. Elegante y exclusivo.',
        swatches: ['#1C1917', '#FDFBF7', '#D4AF37']
    },
    { 
        id: 'warm_organic', 
        name: 'Cálido & Orgánico', 
        desc: 'Tonos tierra, verde salvia y terracota. Natural, acogedor y confiable.',
        swatches: ['#2D3748', '#F7FAFC', '#38A169']
    },
    { 
        id: 'corporate_blue', 
        name: 'Corporativo & Autoridad', 
        desc: 'Azul cobalto, pizarra y gris perla. Sólido, estructurado y profesional.',
        swatches: ['#0F172A', '#F8FAFC', '#2563EB']
    }
];

const GOALS = [
    { id: 'booking', title: 'Reservar Cita Online', desc: 'Conectar agenda digital (Calendly, Vagaro, Square)', icon: Calendar },
    { id: 'phone', title: 'Llamadas Directas', desc: 'Botón flotante de llamada telefónica inmediata', icon: Phone },
    { id: 'whatsapp', title: 'Chat de WhatsApp', desc: 'Conversaciones directas con tu equipo comercial', icon: MessageSquare },
    { id: 'quote', title: 'Solicitar Presupuesto', desc: 'Formulario de cotización personalizado con filtros', icon: FileText }
];

const PRICE_TIERS = [
    { id: 'tier1', label: 'Menos de $100', value: 100 },
    { id: 'tier2', label: '$100 – $500', value: 300 },
    { id: 'tier3', label: '$500 – $2,000', value: 1000 },
    { id: 'tier4', label: 'Más de $2,000 (High-Ticket)', value: 2500 }
];

export const GeneratorPage = () => {
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Form Data
    const [businessName, setBusinessName] = useState('');
    const [location, setLocation] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0].id);
    const [selectedPalette, setSelectedPalette] = useState(PALETTES[0].id);
    
    // Services
    const [service1, setService1] = useState('');
    const [service2, setService2] = useState('');
    const [service3, setService3] = useState('');
    const [selectedPriceTier, setSelectedPriceTier] = useState(PRICE_TIERS[1].id);

    // Goal
    const [selectedGoal, setSelectedGoal] = useState(GOALS[0].id);

    // Credentials
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const sanitizeSubdomain = (name) => {
        if (!name) return `demo-${Date.now().toString().slice(-4)}`;
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]/g, '')
            .slice(0, 24) || `demo-${Date.now().toString().slice(-4)}`;
    };

    const handleNext = (e) => {
        if (e) e.preventDefault();
        setErrorMsg('');

        if (step === 0 && !businessName.trim()) {
            setErrorMsg('Por favor introduce el nombre de tu negocio.');
            return;
        }

        if (step === 2 && !service1.trim()) {
            setErrorMsg('Introduce al menos tu servicio o producto principal.');
            return;
        }

        if (step < 4) {
            setStep(s => s + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(s => s - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!fullName.trim() || !phone.trim() || !email.trim()) {
            setErrorMsg('Por favor completa todos los campos de contacto.');
            return;
        }

        setIsSubmitting(true);

        try {
            const baseSubdomain = sanitizeSubdomain(businessName);
            let finalSubdomain = baseSubdomain;

            // Check if subdomain already exists to prevent collisions
            const { data: existingClient } = await supabase
                .from('clients')
                .select('id')
                .eq('subdomain', baseSubdomain)
                .maybeSingle();

            if (existingClient) {
                finalSubdomain = `${baseSubdomain}-${Math.floor(100 + Math.random() * 900)}`;
            }

            const chosenGoalObj = GOALS.find(g => g.id === selectedGoal) || GOALS[0];
            const chosenTierObj = PRICE_TIERS.find(t => t.id === selectedPriceTier) || PRICE_TIERS[1];
            const industryLabel = INDUSTRIES.find(i => i.id === selectedIndustry)?.label || 'Servicios';

            const activeServices = [service1, service2, service3]
                .filter(s => s && s.trim())
                .map(s => ({
                    title: s.trim(),
                    description: `Servicio especializado de ${s.trim()} con atención de primer nivel y resultados garantizados.`,
                    price: chosenTierObj.label
                }));

            const siteContent = {
                hero: {
                    title: businessName.trim(),
                    subtitle: `${industryLabel} en ${location.trim() || 'tu zona'}. Ecosistema digital diseñado para multiplicar tus reservas y clientes locales.`,
                    cta: chosenGoalObj.title
                },
                services: activeServices,
                palette: selectedPalette,
                contact: {
                    phone: phone.trim(),
                    email: email.trim(),
                    address: location.trim()
                }
            };

            // 1. Insert into Supabase clients table
            const { error: insertError } = await supabase
                .from('clients')
                .insert([{
                    full_name: fullName.trim(),
                    company_name: businessName.trim(),
                    business_name: businessName.trim(),
                    email: email.trim().toLowerCase(),
                    phone: phone.trim(),
                    subdomain: finalSubdomain,
                    site_status: 'lead_preview',
                    site_content: siteContent
                }]);

            if (insertError) throw insertError;

            // 2. Track Meta Pixel & CAPI conversion event
            trackLeadEvent('generator_funnel', chosenTierObj.value, email.trim(), phone.trim());

            // 3. Instant Redirect to their newly created custom subdomain!
            setTimeout(() => {
                const isLocal = window.location.hostname.includes('localhost');
                if (isLocal) {
                    window.location.href = `http://${finalSubdomain}.localhost:5173`;
                } else {
                    window.location.href = `https://${finalSubdomain}.texhco.com`;
                }
            }, 600);

        } catch (err) {
            console.error('Error in website generator:', err);
            setErrorMsg('Hubo un error al generar tu prototipo. Por favor intenta de nuevo.');
            setIsSubmitting(false);
        }
    };

    const progressPercent = Math.round(((step + 1) / 5) * 100);

    return (
        <div className="min-h-screen bg-[#F0F0F0] text-obsidian font-body selection:bg-chartreuse selection:text-obsidian flex flex-col justify-between py-8 px-4 sm:px-6 md:px-12">
            <SEO 
                title="Generador de Sistemas Web en Vivo"
                description="Configura la identidad y servicios de tu negocio y genera tu prototipo web interactivo en 60 segundos con Texh Co."
                url="https://texhco.com/generator"
            />

            {/* Top Navigation Bar */}
            <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4 px-6 md:px-8 bg-white/80 backdrop-blur-md rounded-full border border-obsidian/5 shadow-sm mb-8">
                <a href="/" className="flex items-center gap-1 font-heading font-black text-lg tracking-tighter text-obsidian">
                    <span>TEXH</span>
                    <span className="text-xs bg-chartreuse text-obsidian px-1.5 py-0.5 rounded font-black ml-0.5">CO.</span>
                </a>

                <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-obsidian/60 hidden sm:inline">
                        Paso 0{step + 1} de 05
                    </span>
                    <span className="px-3 py-1 bg-obsidian text-chartreuse rounded-full text-[10px] font-mono font-black uppercase tracking-wider">
                        {progressPercent}% Completo
                    </span>
                </div>
            </header>

            {/* Main Form Container */}
            <main className="max-w-3xl w-full mx-auto bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 md:p-14 shadow-2xl border border-obsidian/5 relative z-10 flex-1 my-auto">
                
                {/* Progress Indicator Bar */}
                <div className="w-full bg-[#F0F0F0] rounded-full h-2 mb-10 overflow-hidden">
                    <motion.div 
                        className="bg-chartreuse h-full rounded-full"
                        initial={{ width: '20%' }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 0: Identidad del Negocio */}
                    {step === 0 && (
                        <motion.div 
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-chartreuse/20 text-obsidian border border-chartreuse/40 mb-3">
                                    <Sparkles size={12} className="text-obsidian" />
                                    Fase 01 // Identidad
                                </span>
                                <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-obsidian uppercase leading-tight">
                                    ¿Cuál es el nombre de tu negocio?
                                </h1>
                                <p className="text-gray-600 text-sm sm:text-base font-light mt-2">
                                    Usaremos este nombre para crear tu subdominio exclusivo y redactar la propuesta en vivo.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Nombre del Negocio o Marca *
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        autoFocus
                                        placeholder="ej. Lumina Spa & Salon"
                                        value={businessName}
                                        onChange={(e) => setBusinessName(e.target.value)}
                                        className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 md:p-5 text-base md:text-lg font-bold outline-none transition-all placeholder:text-obsidian/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Ciudad, Estado o Zona Principal
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="ej. Bergen County, NJ / Miami, FL"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 md:p-5 text-base md:text-lg font-bold outline-none transition-all placeholder:text-obsidian/30"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Sector o Industria
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {INDUSTRIES.map((ind) => {
                                            const Icon = ind.icon;
                                            const isSelected = selectedIndustry === ind.id;
                                            return (
                                                <button
                                                    key={ind.id}
                                                    type="button"
                                                    onClick={() => setSelectedIndustry(ind.id)}
                                                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 ${
                                                        isSelected 
                                                            ? 'border-obsidian bg-obsidian text-white shadow-lg' 
                                                            : 'border-obsidian/10 bg-[#F0F0F0]/60 text-obsidian hover:border-obsidian/30 hover:bg-[#F0F0F0]'
                                                    }`}
                                                >
                                                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-chartreuse text-obsidian' : 'bg-white text-obsidian'}`}>
                                                        <Icon size={18} />
                                                    </div>
                                                    <span className="font-heading font-bold text-xs sm:text-sm">{ind.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: Estilo & Paleta de Colores */}
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-chartreuse/20 text-obsidian border border-chartreuse/40 mb-3">
                                    <Palette size={12} className="text-obsidian" />
                                    Fase 02 // Estética Visual
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-obsidian uppercase leading-tight">
                                    ¿Qué personalidad visual buscas?
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base font-light mt-2">
                                    Generaremos la interfaz y los contrastes de tu web basados en esta dirección de arte.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {PALETTES.map((pal) => {
                                    const isSelected = selectedPalette === pal.id;
                                    return (
                                        <button
                                            key={pal.id}
                                            type="button"
                                            onClick={() => setSelectedPalette(pal.id)}
                                            className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between ${
                                                isSelected 
                                                    ? 'border-obsidian bg-obsidian text-white shadow-xl scale-[1.02]' 
                                                    : 'border-obsidian/10 bg-[#F0F0F0]/50 text-obsidian hover:border-obsidian/30 hover:bg-[#F0F0F0]'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    {pal.swatches.map((color, cIdx) => (
                                                        <span 
                                                            key={cIdx} 
                                                            className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                                {isSelected && (
                                                    <span className="w-6 h-6 rounded-full bg-chartreuse text-obsidian flex items-center justify-center font-bold">
                                                        <Check size={14} className="stroke-[3px]" />
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <h3 className={`font-heading font-bold text-base ${isSelected ? 'text-white' : 'text-obsidian'}`}>
                                                    {pal.name}
                                                </h3>
                                                <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-white/70' : 'text-gray-600'}`}>
                                                    {pal.desc}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: Servicios Principales & Ticket */}
                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-chartreuse/20 text-obsidian border border-chartreuse/40 mb-3">
                                    <Zap size={12} className="text-obsidian" />
                                    Fase 03 // Oferta & Catálogo
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-obsidian uppercase leading-tight">
                                    ¿Cuáles son tus 3 servicios clave?
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base font-light mt-2">
                                    Coloca los servicios o productos más rentables que quieres destacar en la página principal.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Servicio Principal (Más Rentable) *
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        autoFocus
                                        placeholder="ej. Balayage & Colorimetría / Remodelación de Cocinas"
                                        value={service1}
                                        onChange={(e) => setService1(e.target.value)}
                                        className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 text-sm md:text-base font-bold outline-none transition-all placeholder:text-obsidian/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Servicio 02 (Opcional)
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="ej. Tratamientos Faciales / Reparación de Tejados"
                                        value={service2}
                                        onChange={(e) => setService2(e.target.value)}
                                        className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 text-sm md:text-base font-bold outline-none transition-all placeholder:text-obsidian/30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Servicio 03 (Opcional)
                                    </label>
                                    <input 
                                        type="text"
                                        placeholder="ej. Cortes de Autor / Mantenimiento General"
                                        value={service3}
                                        onChange={(e) => setService3(e.target.value)}
                                        className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 text-sm md:text-base font-bold outline-none transition-all placeholder:text-obsidian/30"
                                    />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Ticket o Precio Promedio por Cliente
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                        {PRICE_TIERS.map((tier) => (
                                            <button
                                                key={tier.id}
                                                type="button"
                                                onClick={() => setSelectedPriceTier(tier.id)}
                                                className={`p-3 rounded-2xl border text-center transition-all text-xs font-bold font-mono ${
                                                    selectedPriceTier === tier.id
                                                        ? 'border-obsidian bg-obsidian text-chartreuse shadow-md'
                                                        : 'border-obsidian/10 bg-[#F0F0F0]/60 text-obsidian hover:bg-[#F0F0F0]'
                                                }`}
                                            >
                                                {tier.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Objetivo de Conversión */}
                    {step === 3 && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-chartreuse/20 text-obsidian border border-chartreuse/40 mb-3">
                                    <Target size={12} className="text-obsidian" />
                                    Fase 04 // Embudo de Ventas
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-obsidian uppercase leading-tight">
                                    ¿Cuál es tu objetivo principal?
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base font-light mt-2">
                                    Optimizaremos los botones de llamada a la acción (CTA) para maximizar esta acción en tu web.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {GOALS.map((goal) => {
                                    const Icon = goal.icon;
                                    const isSelected = selectedGoal === goal.id;
                                    return (
                                        <button
                                            key={goal.id}
                                            type="button"
                                            onClick={() => setSelectedGoal(goal.id)}
                                            className={`p-5 rounded-3xl border-2 text-left transition-all flex items-start gap-4 ${
                                                isSelected 
                                                    ? 'border-obsidian bg-obsidian text-white shadow-xl' 
                                                    : 'border-obsidian/10 bg-[#F0F0F0]/50 text-obsidian hover:border-obsidian/30 hover:bg-[#F0F0F0]'
                                            }`}
                                        >
                                            <div className={`p-3 rounded-2xl flex-shrink-0 ${isSelected ? 'bg-chartreuse text-obsidian' : 'bg-white text-obsidian'}`}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h3 className={`font-heading font-bold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-obsidian'}`}>
                                                    {goal.title}
                                                </h3>
                                                <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-white/70' : 'text-gray-600'}`}>
                                                    {goal.desc}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 4: Credenciales de Entrega (Captura de Lead) */}
                    {step === 4 && (
                        <motion.div 
                            key="step4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <div>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-chartreuse/20 text-obsidian border border-chartreuse/40 mb-3">
                                    <ShieldCheck size={12} className="text-obsidian" />
                                    Fase 05 // Despliegue en Vivo
                                </span>
                                <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-obsidian uppercase leading-tight">
                                    Tu sistema está listo para generarse.
                                </h2>
                                <p className="text-gray-600 text-sm sm:text-base font-light mt-2">
                                    Introduce tus datos para asignarte el subdominio <strong className="text-obsidian font-bold">{sanitizeSubdomain(businessName)}.texhco.com</strong> y enviarte el enlace interactivo.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                        Nombre y Apellido *
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        autoFocus
                                        placeholder="ej. Sofía Ramírez"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 text-sm md:text-base font-bold outline-none transition-all placeholder:text-obsidian/30"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                            Teléfono / WhatsApp *
                                        </label>
                                        <input 
                                            type="tel"
                                            required
                                            placeholder="ej. +1 (201) 555-0192"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 text-sm md:text-base font-bold outline-none transition-all placeholder:text-obsidian/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-obsidian/70">
                                            Correo Electrónico *
                                        </label>
                                        <input 
                                            type="email"
                                            required
                                            placeholder="ej. sofia@gmail.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-[#F0F0F0] border-2 border-transparent focus:border-obsidian focus:bg-white rounded-2xl p-4 text-sm md:text-base font-bold outline-none transition-all placeholder:text-obsidian/30"
                                        />
                                    </div>
                                </div>

                                {errorMsg && (
                                    <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200">
                                        {errorMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !fullName || !phone || !email}
                                    className="w-full bg-obsidian text-chartreuse py-5 rounded-2xl font-heading font-black text-sm uppercase tracking-widest hover:bg-obsidian/90 hover:scale-[1.01] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 mt-6"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin text-chartreuse" />
                                            <span>Generando Ecosistema...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Generar Prototipo en Vivo ⚡</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {errorMsg && step !== 4 && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-200">
                        {errorMsg}
                    </div>
                )}

                {/* Bottom Navigation Buttons (Steps 0-3) */}
                {step < 4 && (
                    <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                        {step > 0 ? (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-obsidian/60 hover:text-obsidian hover:bg-[#F0F0F0] transition-all flex items-center gap-2"
                            >
                                <ArrowLeft size={14} />
                                Anterior
                            </button>
                        ) : <div />}

                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-obsidian text-chartreuse px-8 py-3.5 rounded-full font-heading font-bold text-xs uppercase tracking-widest hover:bg-obsidian/90 hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                        >
                            Siguiente
                            <ArrowRight size={14} />
                        </button>
                    </div>
                )}

            </main>

            {/* Ambient Footer */}
            <footer className="mt-8 text-center text-xs font-mono text-obsidian/40 uppercase tracking-widest">
                © {new Date().getFullYear()} TEXH CO. // LOCAL GROWTH SYSTEMS
            </footer>
        </div>
    );
};

export default GeneratorPage;
