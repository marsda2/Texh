import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    Zap, CalendarDays, CalendarClock, Compass, 
    Code, Smartphone, Wrench, Share2, 
    Wallet, Briefcase, Building, Rocket,
    ArrowRight, ArrowLeft, Loader2
} from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { supabase } from '../lib/supabase';
import { trackLeadEvent } from '../lib/analytics';

const ESTIMATOR_DATA = {
    es: [
        {
            id: 'service',
            phase: 'SYSTEM CONFIGURATION PHASE',
            question: '¿Qué tipo de infraestructura digital necesitas?',
            subtitle: 'Selecciona el enfoque principal para iniciar la proyección de tu ecosistema.',
            options: [
                { id: 'web', title: 'Desarrollo Web Premium', desc: 'Interfaces de alto impacto, rápidas y orientadas a la conversión visual.', icon: <Code size={24} /> },
                { id: 'app', title: 'Aplicación Móvil', desc: 'Soluciones nativas o híbridas para estar en el bolsillo de tus clientes.', icon: <Smartphone size={24} /> },
                { id: 'maintenance', title: 'Mantenimiento y Soporte', desc: 'Estabilidad garantizada, actualizaciones y monitoreo constante.', icon: <Wrench size={24} /> },
                { id: 'social', title: 'Diseño y Redes Sociales', desc: 'Contenido estratégico y gestión omnicanal de tu marca.', icon: <Share2 size={24} /> }
            ]
        },
        {
            id: 'urgency',
            phase: 'DEPLOYMENT TIMEFRAME',
            question: '¿Con qué rapidez necesitas el servicio?',
            subtitle: 'Selecciona la urgencia temporal para la integración y despliegue del sistema.',
            options: [
                { id: 'asap', title: 'ASAP (Emergencia)', desc: 'Movilización inmediata. Equipo de respuesta desplegado en 2-4 horas.', icon: <Zap size={24} /> },
                { id: '1week', title: 'En 1 Semana', desc: 'Integración estándar de alta prioridad. Finalización en 7 días hábiles.', icon: <CalendarDays size={24} /> },
                { id: '1month', title: 'En 1 Mes', desc: 'Pipeline de implementación estándar. Ideal para expansiones planificadas.', icon: <CalendarClock size={24} /> },
                { id: 'planning', title: 'Sólo Planeando', desc: 'Consulta y desarrollo de hoja de ruta para futuros proyectos locales.', icon: <Compass size={24} /> }
            ]
        },
        {
            id: 'budget',
            phase: 'RESOURCE ALLOCATION',
            question: '¿Cuál es el margen presupuestario de la operación?',
            subtitle: 'Definir el flujo de capital nos ayuda a escalar los componentes de forma óptima.',
            options: [
                { id: 'mvp', title: 'Agile MVP (< $1,000)', desc: 'Lanzamiento ágil del Minimum Viable Product para validar el mercado.', icon: <Rocket size={24} /> },
                { id: 'growth', title: 'Tracción & Growth ($1k - $3k)', desc: 'Estructuras sólidas para negocios locales buscando expansión digital continua.', icon: <Wallet size={24} /> },
                { id: 'scale', title: 'Escala Omnicanal ($3k - $10k)', desc: 'Ecosistemas complejos, automatización avanzada y alta personalización UX/UI.', icon: <Briefcase size={24} /> },
                { id: 'enterprise', title: 'Enterprise / B2B ($10k+)', desc: 'Infraestructura robusta corporativa, integraciones legacy y arquitectura a medida.', icon: <Building size={24} /> }
            ]
        },
        {
            id: 'contact',
            phase: 'FINAL INITIALIZATION',
            question: 'Sincronización de Datos',
            subtitle: 'Proporciona tus credenciales de comunicación para enviar la propuesta generada en menos de 24 horas.',
            isForm: true
        }
    ],
    en: [
        {
            id: 'service',
            phase: 'SYSTEM CONFIGURATION PHASE',
            question: 'What type of digital infrastructure do you need?',
            subtitle: 'Select the primary focus to start projecting your ecosystem.',
            options: [
                { id: 'web', title: 'Premium Web Development', desc: 'High-impact interfaces, fast, and oriented towards visual conversion.', icon: <Code size={24} /> },
                { id: 'app', title: 'Mobile Application', desc: 'Native or hybrid solutions to be in your clients\' pockets.', icon: <Smartphone size={24} /> },
                { id: 'maintenance', title: 'Maintenance & Support', desc: 'Guaranteed stability, updates, and constant monitoring.', icon: <Wrench size={24} /> },
                { id: 'social', title: 'Design & Social Media', desc: 'Strategic content and omnichannel management of your brand.', icon: <Share2 size={24} /> }
            ]
        },
        {
            id: 'urgency',
            phase: 'DEPLOYMENT TIMEFRAME',
            question: 'How quickly do you need the service?',
            subtitle: 'Select the temporal urgency for kinetic system integration and deployment.',
            options: [
                { id: 'asap', title: 'ASAP (Emergency)', desc: 'Immediate mobilization. Response team deployed within 2-4 hours of confirmation.', icon: <Zap size={24} /> },
                { id: '1week', title: 'Within 1 Week', desc: 'Standard high-priority integration. Completion scheduled within 7 business days.', icon: <CalendarDays size={24} /> },
                { id: '1month', title: 'Within 1 Month', desc: 'Standard implementation pipeline. Best for planned upgrades and expansions.', icon: <CalendarClock size={24} /> },
                { id: 'planning', title: 'Just Planning', desc: 'Consultation and roadmap development for future infrastructure projects.', icon: <Compass size={24} /> }
            ]
        },
        {
            id: 'budget',
            phase: 'RESOURCE ALLOCATION',
            question: 'What is the operational budget range?',
            subtitle: 'Defining the capital flow helps us scale the components optimally.',
            options: [
                { id: 'mvp', title: 'Agile MVP (< $1,000)', desc: 'Agile launch of the Minimum Viable Product to validate the market.', icon: <Rocket size={24} /> },
                { id: 'growth', title: 'Traction & Growth ($1k - $3k)', desc: 'Solid structures for local businesses seeking continuous digital expansion.', icon: <Wallet size={24} /> },
                { id: 'scale', title: 'Omnichannel Scale ($3k - $10k)', desc: 'Complex ecosystems, advanced automation, and high UX/UI customization.', icon: <Briefcase size={24} /> },
                { id: 'enterprise', title: 'Enterprise / B2B ($10k+)', desc: 'Robust corporate infrastructure, legacy integrations, and custom architecture.', icon: <Building size={24} /> }
            ]
        },
        {
            id: 'contact',
            phase: 'FINAL INITIALIZATION',
            question: 'Data Synchronization',
            subtitle: 'Provide your communication credentials to send the generated proposal in less than 24 hours.',
            isForm: true
        }
    ]
};

// ---------- Service-specific budget tiers ----------
const SERVICE_BUDGETS = {
    es: {
        web: [
            { id: 'starter',    title: 'Web Starter (€500 – €800)',     desc: 'Landing page profesional o web corporativa simple. Lista en 7-10 días hábiles.', icon: <Rocket size={24} /> },
            { id: 'growth',     title: 'Web Growth (€800 – €2.000)',    desc: 'Web completa con diseño a medida, CMS integrado y optimización SEO base.', icon: <Wallet size={24} /> },
            { id: 'premium',    title: 'Web Premium (€2.000 – €5.000)', desc: 'E-commerce, plataforma avanzada o web con integraciones y funcionalidades complejas.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Enterprise (€5.000+)',           desc: 'Arquitectura web escalable, multi-idioma, alta personalización y soporte dedicado.', icon: <Building size={24} /> },
        ],
        app: [
            { id: 'mvp',        title: 'App MVP (€800 – €2.000)',        desc: 'Prototipo funcional para validar tu idea con usuarios reales en el mercado.', icon: <Rocket size={24} /> },
            { id: 'growth',     title: 'App Growth (€2.000 – €5.000)',   desc: 'App completa iOS/Android con diseño UX/UI cuidado y funcionalidades esenciales.', icon: <Wallet size={24} /> },
            { id: 'scale',      title: 'App Scale (€5.000 – €10.000)',   desc: 'App avanzada con backend propio, notificaciones, pagos y analíticas integradas.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Enterprise (€10.000+)',           desc: 'Plataforma móvil corporativa con integraciones legacy, roles y arquitectura a medida.', icon: <Building size={24} /> },
        ],
        maintenance: [
            { id: 'basic',      title: 'Plan Básico (€99/mes)',          desc: 'Actualizaciones mensuales, backups semanales y monitoreo básico de disponibilidad.', icon: <Rocket size={24} /> },
            { id: 'standard',   title: 'Plan Estándar (€199/mes)',       desc: 'Soporte prioritario, actualizaciones de seguridad y revisiones de rendimiento mensuales.', icon: <Wallet size={24} /> },
            { id: 'pro',        title: 'Plan Pro (€349/mes)',            desc: 'SLA garantizado, soporte 24h, optimizaciones continuas y reportes mensuales detallados.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Plan Enterprise (A medida)',     desc: 'Infraestructura dedicada, equipo asignado y contrato de nivel de servicio personalizado.', icon: <Building size={24} /> },
        ],
        social: [
            { id: 'basic',      title: 'Social Starter (€199/mes)',      desc: '8 publicaciones/mes, diseño de contenido y gestión básica de una red social.', icon: <Rocket size={24} /> },
            { id: 'growth',     title: 'Social Growth (€349/mes)',       desc: '16 publicaciones/mes, estrategia de contenido, 2 redes sociales y reporte mensual.', icon: <Wallet size={24} /> },
            { id: 'premium',    title: 'Social Premium (€599/mes)',      desc: 'Gestión omnicanal, contenido creativo, campañas de pago y analíticas avanzadas.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Social Enterprise (A medida)',   desc: 'Equipo creativo dedicado, campañas integrales y estrategia de marca 360°.', icon: <Building size={24} /> },
        ],
    },
    en: {
        web: [
            { id: 'starter',    title: 'Web Starter (€500 – €800)',     desc: 'Professional landing page or simple corporate site. Ready in 7-10 business days.', icon: <Rocket size={24} /> },
            { id: 'growth',     title: 'Web Growth (€800 – €2,000)',    desc: 'Full website with custom design, integrated CMS, and base SEO optimization.', icon: <Wallet size={24} /> },
            { id: 'premium',    title: 'Web Premium (€2,000 – €5,000)', desc: 'E-commerce, advanced platform, or site with integrations and complex features.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Enterprise (€5,000+)',           desc: 'Scalable web architecture, multilingual, high customization and dedicated support.', icon: <Building size={24} /> },
        ],
        app: [
            { id: 'mvp',        title: 'App MVP (€800 – €2,000)',        desc: 'Functional prototype to validate your idea with real market users.', icon: <Rocket size={24} /> },
            { id: 'growth',     title: 'App Growth (€2,000 – €5,000)',   desc: 'Full iOS/Android app with polished UX/UI design and essential features.', icon: <Wallet size={24} /> },
            { id: 'scale',      title: 'App Scale (€5,000 – €10,000)',   desc: 'Advanced app with custom backend, notifications, payments, and integrated analytics.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Enterprise (€10,000+)',           desc: 'Corporate mobile platform with legacy integrations, roles and custom architecture.', icon: <Building size={24} /> },
        ],
        maintenance: [
            { id: 'basic',      title: 'Basic Plan (€99/mo)',            desc: 'Monthly updates, weekly backups and basic uptime monitoring.', icon: <Rocket size={24} /> },
            { id: 'standard',   title: 'Standard Plan (€199/mo)',        desc: 'Priority support, security updates and monthly performance reviews.', icon: <Wallet size={24} /> },
            { id: 'pro',        title: 'Pro Plan (€349/mo)',             desc: 'Guaranteed SLA, 24h support, continuous optimization and detailed monthly reports.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Enterprise Plan (Custom)',       desc: 'Dedicated infrastructure, assigned team and personalized service level agreement.', icon: <Building size={24} /> },
        ],
        social: [
            { id: 'basic',      title: 'Social Starter (€199/mo)',       desc: '8 posts/month, content design and basic management of one social channel.', icon: <Rocket size={24} /> },
            { id: 'growth',     title: 'Social Growth (€349/mo)',        desc: '16 posts/month, content strategy, 2 social networks and monthly report.', icon: <Wallet size={24} /> },
            { id: 'premium',    title: 'Social Premium (€599/mo)',       desc: 'Omnichannel management, creative content, paid campaigns and advanced analytics.', icon: <Briefcase size={24} /> },
            { id: 'enterprise', title: 'Social Enterprise (Custom)',     desc: 'Dedicated creative team, integrated campaigns and 360° brand strategy.', icon: <Building size={24} /> },
        ],
    },
};

const EstimatorQuizPage = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', details: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const quizData = ESTIMATOR_DATA[language];
    const totalSteps = quizData.length;
    const progressPercentage = ((currentStep + 1) / totalSteps) * 100;
    const rawQuestion = quizData[currentStep];

    // Inject service-specific budget options when on the budget step
    const selectedService = answers.service;
    const currentQuestion = rawQuestion.id === 'budget' && selectedService
        ? { ...rawQuestion, options: SERVICE_BUDGETS[language][selectedService] ?? rawQuestion.options }
        : rawQuestion;

    // Pre-fill answer if coming from a specific service card
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const preselectedService = queryParams.get('service');
        if (preselectedService && currentStep === 0) {
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: preselectedService }));
        }
    }, [location.search, currentStep, currentQuestion.id]);

    // Clear budget answer when service changes so stale selections don't persist
    useEffect(() => {
        setAnswers(prev => {
            if (prev.budget) return { ...prev, budget: undefined };
            return prev;
        });
    }, [selectedService]);

    const handleSelectOption = (optionId) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
    };

    const handleNext = async () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Submit to Supabase
            setIsSubmitting(true);
            try {
                let finalNotes = formData.details ? formData.details.trim() : '';
                const referralCode = localStorage.getItem('referral_code');
                if (referralCode) {
                    finalNotes = finalNotes 
                        ? `${finalNotes}\n\n[Referido por: ${referralCode}]`
                        : `[Referido por: ${referralCode}]`;
                }

                const { error } = await supabase
                    .from('quiz_leads')
                    .insert({
                        name: formData.name,
                        email: formData.email || null,
                        phone: formData.phone || null,
                        notes: finalNotes || null,
                        selected_service: answers.service || null,
                        selected_urgency: answers.urgency || null,
                        selected_budget: answers.budget || null,
                    });

                if (error) throw error;

                // Track successful lead generation
                trackLeadEvent('estimator_quiz');

                alert(language === 'es' ? '¡Propuesta en camino! Te contactaremos pronto.' : 'Proposal on its way! We will contact you soon.');
                navigate('/');
            } catch (err) {
                console.error('Error saving quiz lead:', err);
                // Still navigate even if Supabase fails — don't block the user
                alert(language === 'es' ? '¡Propuesta en camino! Te contactaremos pronto.' : 'Proposal on its way! We will contact you soon.');
                navigate('/');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            navigate('/');
        }
    };

    const isNextDisabled = () => {
        if (currentQuestion.isForm) {
            const hasValidEmail = formData.email && formData.email.includes('@');
            const hasPhone = !!formData.phone;
            return !formData.name || (!hasValidEmail && !hasPhone);
        }
        return !answers[currentQuestion.id];
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-obsidian flex flex-col font-body selection:bg-chartreuse selection:text-obsidian">
            {/* Top Progress Bar Container */}
            <div className="w-full bg-white border-b border-gray-200 px-6 pb-6 pt-[104px] md:pb-8 md:pt-[112px]">
                <div className="max-w-5xl mx-auto w-full">
                    <div className="flex justify-between items-end mb-4 font-heading">
                        <div>
                            <h3 className="text-obsidian text-xs tracking-[0.2em] font-bold uppercase mb-2 animate-fade-in opacity-80">
                                {currentQuestion.phase}
                            </h3>
                            <h2 className="text-xl text-gray-dark font-semibold">
                                Step {currentStep + 1} of {totalSteps}
                            </h2>
                        </div>
                        <div className="text-obsidian opacity-80 text-sm font-bold tracking-widest drop-shadow-sm">
                            {Math.round(progressPercentage)}% COMPLETE
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-[4px] bg-neutral rounded-full overflow-hidden border border-gray-100">
                        <div 
                            className="h-full bg-chartreuse transition-all duration-700 ease-out"
                            style={{ width: `${progressPercentage}%`, boxShadow: '0 0 10px #C9FF1F' }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-start px-6 pt-12 md:pt-16">
                <div className="max-w-5xl w-full">
                    {/* Header Section */}
                    <div className="mb-12">
                        {/* Question Text */}
                        <div className="animate-fade-up">
                            <h1 className="text-4xl md:text-5xl font-heading font-black text-obsidian mb-4 tracking-tight drop-shadow-sm">
                                {currentQuestion.question}
                            </h1>
                            <p className="text-gray-dark text-lg font-light max-w-2xl">
                                {currentQuestion.subtitle}
                            </p>
                        </div>
                    </div>

                    {/* Options Grid / Form */}
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {!currentQuestion.isForm ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
                                {currentQuestion.options.map((option) => {
                                    const isSelected = answers[currentQuestion.id] === option.id;
                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => handleSelectOption(option.id)}
                                            className={`group relative text-left p-6 rounded-[2rem] border transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg ${
                                                isSelected 
                                                    ? 'bg-white border-chartreuse shadow-[0_8px_30px_rgba(201,255,31,0.25)] transform scale-[1.02]' 
                                                    : 'bg-white border-gray-200 hover:border-obsidian'
                                            }`}
                                        >
                                            <div className={`mb-4 p-1 transition-colors duration-300 ${isSelected ? 'text-chartreuse drop-shadow-sm' : 'text-gray-dark group-hover:text-obsidian'}`}>
                                                {option.icon}
                                            </div>
                                            <h4 className={`text-lg font-heading font-bold mb-2 transition-colors duration-300 text-obsidian`}>
                                                {option.title}
                                            </h4>
                                            <p className={`text-sm tracking-wide leading-relaxed transition-colors duration-300 text-gray-dark font-light`}>
                                                {option.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-8 max-w-2xl pb-24">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-obsidian text-xs font-bold font-heading tracking-widest mb-2 uppercase">
                                            {language === 'es' ? 'Nombre o Entidad' : 'Name or Entity'}
                                        </label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-white border border-gray-200 focus:border-chartreuse focus:shadow-[0_0_15px_rgba(201,255,31,0.2)] outline-none rounded-[2rem] px-6 py-4 text-obsidian transition-all duration-500 placeholder:text-gray-400"
                                            placeholder="Gale Boetticher"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-obsidian text-xs font-bold font-heading tracking-widest mb-2 uppercase">
                                            {language === 'es' ? 'Dirección de Enlace (Email)' : 'Link Address (Email)'}
                                        </label>
                                        <input 
                                            type="email" 
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            className="w-full bg-white border border-gray-200 focus:border-chartreuse focus:shadow-[0_0_15px_rgba(201,255,31,0.2)] outline-none rounded-[2rem] px-6 py-4 text-obsidian transition-all duration-500 placeholder:text-gray-400"
                                            placeholder="gale@superlab.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-obsidian text-xs font-bold font-heading tracking-widest mb-2 uppercase">
                                            {language === 'es' ? 'Teléfono / WhatsApp' : 'Phone Number / WhatsApp'}
                                        </label>
                                        <input 
                                            type="tel" 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full bg-white border border-gray-200 focus:border-chartreuse focus:shadow-[0_0_15px_rgba(201,255,31,0.2)] outline-none rounded-[2rem] px-6 py-4 text-obsidian transition-all duration-500 placeholder:text-gray-400"
                                            placeholder={language === 'es' ? '+34 600 000 000' : '+1 234 567 8900'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-obsidian text-xs font-bold font-heading tracking-widest mb-2 uppercase">
                                            {language === 'es' ? 'Notas Adicionales (Opcional)' : 'Additional Notes (Optional)'}
                                        </label>
                                        <textarea 
                                            value={formData.details}
                                            onChange={(e) => setFormData({...formData, details: e.target.value})}
                                            className="w-full bg-white border border-gray-200 focus:border-chartreuse focus:shadow-[0_0_15px_rgba(201,255,31,0.2)] outline-none rounded-[2rem] px-6 py-4 text-obsidian transition-all duration-500 placeholder:text-gray-400 min-h-[120px] resize-none"
                                            placeholder={language === 'es' ? 'Detalles extra sobre tu visión...' : 'Extra details about your vision...'}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Bottom Navigation Bar */}
            <footer className="fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-6 md:px-12 z-50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="hidden md:block text-gray-dark font-mono text-[10px] uppercase tracking-[0.2em]">
                        {language === 'es' ? 'TEXH CO. // MÓDULO SECURE ESTIMATOR' : 'TEXH CO. // SECURE ESTIMATOR MODULE'}
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <button 
                            onClick={handleBack}
                            className="bg-neutral hover:bg-white text-obsidian px-8 py-3 rounded-full font-heading font-bold text-sm tracking-wider transition-all duration-300 uppercase border border-gray-200 hover:border-obsidian hover:shadow-md"
                        >
                            {language === 'es' ? 'Atrás' : 'Back'}
                        </button>
                        
                        <button 
                            onClick={handleNext}
                            disabled={isNextDisabled() || isSubmitting}
                            className={`flex items-center gap-2 px-10 py-3 rounded-full font-heading font-bold text-sm tracking-wider transition-all duration-300 uppercase
                                ${(isNextDisabled() || isSubmitting)
                                    ? 'bg-neutral text-gray-400 cursor-not-allowed border border-gray-200' 
                                    : 'bg-chartreuse text-obsidian hover:bg-[#b0df14] hover:-translate-y-1 shadow-[0_4px_15px_rgba(201,255,31,0.4)] border border-chartreuse'
                                }`}
                        >
                            {isSubmitting 
                                ? <Loader2 size={18} className="animate-spin" />
                                : currentStep === totalSteps - 1 
                                    ? (language === 'es' ? 'Finalizar' : 'Submit') 
                                    : (language === 'es' ? 'Siguiente' : 'Next')}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EstimatorQuizPage;
