import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
    Loader2, 
    Globe, 
    ArrowRight, 
    Phone, 
    Mail, 
    MapPin, 
    Calendar, 
    CheckCircle2, 
    ExternalLink, 
    Send,
    Sparkles
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { WebsiteBuildingLoader } from '../components/WebsiteBuildingLoader';

const ClientSiteView = ({ subdomain }) => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    
    // Lead Form inside the Client Site
    const [contactName, setContactName] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const fetchClientSite = async () => {
            try {
                const { data, error } = await supabase
                    .from('clients')
                    .select('*')
                    .eq('subdomain', subdomain.toLowerCase())
                    .single();

                if (error || !data) {
                    setNotFound(true);
                } else {
                    setClient(data);
                }
            } catch (err) {
                console.error('Error fetching client site:', err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        if (subdomain) {
            fetchClientSite();
        }
    }, [subdomain]);

    const handleClientLeadSubmit = async (e) => {
        e.preventDefault();
        if (!contactInfo.trim()) return;

        setIsSubmitting(true);
        try {
            // Store request in pro_requests or footer_leads with client reference
            await supabase.from('pro_requests').insert({
                client_id: client?.id,
                service_type: 'Client Site Lead',
                status: 'pending'
            });

            // Also send to footer_leads for notification pipeline
            await supabase.from('footer_leads').insert({
                email: contactInfo.includes('@') ? contactInfo : null,
                phone: !contactInfo.includes('@') ? contactInfo : null,
                selected_service: `Lead de ${client?.company_name || client?.business_name || subdomain}`,
                message: `Nombre: ${contactName}\nMensaje: ${contactMessage}`
            });

            setSubmitSuccess(true);
            setContactName('');
            setContactInfo('');
            setContactMessage('');
        } catch (err) {
            console.error('Error submitting lead:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center font-body">
                <div className="w-12 h-12 rounded-full border-2 border-obsidian/20 border-t-[#C9FF1F] animate-spin mb-4" />
                <p className="text-xs font-mono font-bold tracking-widest text-obsidian/60 uppercase">
                    Cargando Ecosistema Digital...
                </p>
            </div>
        );
    }

    if (notFound || !client) {
        return (
            <div className="min-h-screen bg-[#F0F0F0] flex flex-col items-center justify-center p-6 text-center font-body selection:bg-[#C9FF1F]">
                <div className="w-20 h-20 rounded-full bg-obsidian text-[#C9FF1F] flex items-center justify-center mb-6 shadow-2xl">
                    <Globe size={36} />
                </div>
                <h1 className="text-3xl md:text-5xl font-heading font-black text-obsidian mb-3 tracking-tight">
                    Sitio No Encontrado
                </h1>
                <p className="text-gray-600 max-w-md mb-8 font-light text-base">
                    El subdominio <strong className="text-obsidian font-bold">{subdomain}.texhco.com</strong> aún no ha sido configurado o se encuentra en proceso de activación.
                </p>
                <a 
                    href="https://texhco.com" 
                    className="bg-obsidian text-[#C9FF1F] px-8 py-4 rounded-full font-heading font-bold text-xs uppercase tracking-widest hover:bg-obsidian/90 transition-all inline-flex items-center gap-3 shadow-xl"
                >
                    Ir a Texh Co. <ArrowRight size={16} />
                </a>
            </div>
        );
    }

    const businessTitle = client.business_name || client.company_name || client.full_name || 'Your Business';
    
    // Check URL params to allow admin to bypass loader using ?demo=true or ?preview=true
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const forceDemo = searchParams?.get('demo') === 'true' || searchParams?.get('preview') === 'true';
    const isBuildingOrLeadPreview = (client.site_status === 'lead_preview' || client.site_status === 'building') && !forceDemo;

    // Render the sleek Texh Co Building Pipeline Loader for preview leads
    if (isBuildingOrLeadPreview) {
        return (
            <WebsiteBuildingLoader 
                businessName={businessTitle} 
                totalDurationMinutes={20}
            />
        );
    }

    const content = client.site_content || {};
    const hero = content.hero || {
        title: businessTitle,
        subtitle: content.description || 'Infraestructura digital de alto rendimiento diseñada para convertir visitas en clientes reales.',
        cta: 'Solicitar Presupuesto'
    };
    const services = content.services || [];
    const contactData = content.contact || {
        phone: client.phone || '',
        email: client.email || '',
        address: ''
    };

    return (
        <div className="min-h-screen bg-white text-obsidian font-body selection:bg-[#C9FF1F] selection:text-obsidian flex flex-col">
            <SEO 
                title={`${businessTitle} | Presencia Digital`} 
                description={hero.subtitle}
                url={`https://${subdomain}.texhco.com`}
            />

            {/* Top Bar for Lead Previews */}
            {isPreview && (
                <div className="bg-obsidian text-white px-4 py-2.5 flex items-center justify-between text-xs font-mono border-b border-white/10 z-50">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#C9FF1F] animate-pulse" />
                        <span className="text-[#C9FF1F] font-bold uppercase tracking-wider hidden sm:inline">Prototipo Exclusivo:</span>
                        <span className="text-white/80">{businessTitle}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-white/40 text-[10px] uppercase tracking-widest hidden md:inline">Desarrollado por Texh Co.</span>
                        <a 
                            href="https://texhco.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-[#C9FF1F] text-obsidian px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-white transition-all inline-flex items-center gap-1"
                        >
                            Ver Agencia <ExternalLink size={10} />
                        </a>
                    </div>
                </div>
            )}

            {/* Main Navigation */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-5 flex items-center justify-between z-40">
                <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-obsidian text-[#C9FF1F] flex items-center justify-center font-heading font-black text-sm">
                        {businessTitle.charAt(0)}
                    </span>
                    <span className="font-heading font-black text-lg md:text-xl tracking-tight text-obsidian">
                        {businessTitle}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    {contactData.phone && (
                        <a 
                            href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                            className="hidden sm:inline-flex items-center gap-2 text-xs font-heading font-bold text-obsidian/70 hover:text-obsidian"
                        >
                            <Phone size={14} className="text-[#C9FF1F]" />
                            {contactData.phone}
                        </a>
                    )}
                    <a 
                        href="#contacto"
                        className="bg-obsidian text-[#C9FF1F] px-6 py-2.5 rounded-full font-heading font-bold text-xs uppercase tracking-widest hover:bg-obsidian/90 transition-all shadow-md"
                    >
                        {hero.cta || 'Contactar'}
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative px-6 md:px-12 pt-20 pb-28 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0F0F0] border border-gray-200 text-obsidian text-xs font-mono font-bold uppercase tracking-wider mb-8">
                    <Sparkles size={14} className="text-[#96C700]" />
                    Sistema Digital Local
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight leading-[1.08] max-w-4xl text-obsidian mb-6">
                    {hero.title || businessTitle}
                </h1>

                <p className="text-gray-600 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-10">
                    {hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a 
                        href="#contacto" 
                        className="w-full sm:w-auto bg-obsidian text-[#C9FF1F] px-10 py-4 rounded-full font-heading font-bold text-sm uppercase tracking-wider hover:bg-obsidian/90 hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                    >
                        {hero.cta || 'Solicitar Información'}
                        <ArrowRight size={18} />
                    </a>
                    {contactData.phone && (
                        <a 
                            href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                            className="w-full sm:w-auto bg-[#F0F0F0] border border-gray-200 text-obsidian px-8 py-4 rounded-full font-heading font-bold text-sm uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2"
                        >
                            <Phone size={16} />
                            Llamar Ahora
                        </a>
                    )}
                </div>
            </section>

            {/* Services Grid (if provided) */}
            {services.length > 0 && (
                <section className="bg-[#F0F0F0] px-6 md:px-12 py-24 border-y border-gray-200">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-obsidian/50 block mb-2">Servicios Especializados</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight text-obsidian">Lo Que Hacemos</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {services.map((srv, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-[#F0F0F0] flex items-center justify-center font-heading font-black text-obsidian mb-6">
                                            0{idx + 1}
                                        </div>
                                        <h3 className="text-xl font-heading font-bold text-obsidian mb-3">{srv.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed font-light">{srv.description}</p>
                                    </div>
                                    {srv.price && (
                                        <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-mono font-bold text-obsidian">
                                            {srv.price}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact / Lead Capture Section */}
            <section id="contacto" className="px-6 md:px-12 py-24 max-w-4xl mx-auto w-full">
                <div className="bg-obsidian text-white rounded-[2.5rem] p-8 md:p-14 relative overflow-hidden shadow-2xl">
                    <div className="max-w-xl">
                        <span className="text-xs font-mono uppercase tracking-widest text-[#C9FF1F] font-bold block mb-3">Conexión Directa</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-black tracking-tight mb-4">
                            Ponte en Contacto con {businessTitle}
                        </h2>
                        <p className="text-white/60 font-light text-base mb-8">
                            Déjanos tus datos y nos pondremos en contacto contigo a la brevedad.
                        </p>

                        {submitSuccess ? (
                            <div className="bg-[#C9FF1F] text-obsidian p-6 rounded-2xl flex items-center gap-4 font-heading font-bold">
                                <CheckCircle2 size={28} />
                                <div>
                                    <p className="text-base font-black">¡Mensaje Enviado con Éxito!</p>
                                    <p className="text-xs font-normal opacity-80">Nos comunicaremos contigo muy pronto.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleClientLeadSubmit} className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Tu Nombre / Negocio"
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9FF1F] transition-all"
                                />
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Email o Teléfono *"
                                    value={contactInfo}
                                    onChange={(e) => setContactInfo(e.target.value)}
                                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9FF1F] transition-all"
                                />
                                <textarea 
                                    rows="3"
                                    placeholder="¿En qué podemos ayudarte? (Opcional)"
                                    value={contactMessage}
                                    onChange={(e) => setContactMessage(e.target.value)}
                                    className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C9FF1F] transition-all resize-none"
                                />
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting || !contactInfo.trim()}
                                    className="w-full bg-[#C9FF1F] text-obsidian py-4 rounded-2xl font-heading font-black text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>Enviar Solicitud <Send size={14} /></>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto border-t border-gray-100 px-6 md:px-12 py-8 bg-[#F8F9FA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
                <p>© {new Date().getFullYear()} {businessTitle}. Todos los derechos reservados.</p>
                <p className="flex items-center gap-2">
                    <span>Powered by</span>
                    <a href="https://texhco.com" target="_blank" rel="noopener noreferrer" className="font-heading font-black text-obsidian hover:text-[#96C700] transition-colors">
                        TEXH CO.
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default ClientSiteView;
