import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, Loader2, ShieldCheck, Mail, Phone, Send, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n';
import { trackLeadEvent } from '../lib/analytics';

const AuditModal = ({ open, onClose }) => {
    const { t, language } = useLanguage();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [visible, setVisible] = useState(false);

    const es = language === 'es';

    // Animate in
    useEffect(() => {
        if (open) { setTimeout(() => setVisible(true), 10); }
        else { setVisible(false); }
    }, [open]);

    // Close on Escape
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') handleClose(); };
        if (open) document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [open]);

    const handleClose = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            onClose();
            setSuccess(false);
            setEmailOrPhone('');
            setService('');
            setMessage('');
        }, 300);
    }, [onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailOrPhone.trim() || !service) return;
        
        setIsSubmitting(true);
        try {
            // Check if it's email or phone
            const isEmail = emailOrPhone.includes('@');
            const data = {
                selected_service: service,
                message: message.trim() || 'No message provided',
            };

            if (isEmail) {
                data.email = emailOrPhone.trim();
            } else {
                data.phone = emailOrPhone.trim();
            }

            const { error } = await supabase.from('footer_leads').insert(data);
            if (error) throw error;

            // Track successful lead generation with CAPI support
            trackLeadEvent(`audit_${service.toLowerCase().replace(/\s+/g, '_')}`, 150, isEmail ? emailOrPhone.trim() : null, !isEmail ? emailOrPhone.trim() : null);

            setSuccess(true);
        } catch (err) {
            console.error('Audit submission error:', err);
            alert(es ? 'Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.' : 'There was an error sending your request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
            style={{ 
                background: `rgba(0,0,0,${visible ? 0.7 : 0})`, 
                transition: 'background 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
                backdropFilter: visible ? 'blur(12px)' : 'blur(0px)' 
            }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
            {/* Modal card */}
            <div
                className="relative bg-neutral rounded-[2.5rem] w-full max-w-lg shadow-[0_30px_100px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10"
                style={{
                    transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(40px)',
                    opacity: visible ? 1 : 0,
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
                    maxHeight: '95vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-chartreuse via-white to-chartreuse opacity-50"></div>

                {/* Header */}
                <div className="p-8 md:p-10 pb-4 flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="px-3 py-1 bg-chartreuse/20 text-obsidian font-black text-[10px] uppercase tracking-widest rounded-full border border-chartreuse/40 flex items-center gap-1.5 shadow-sm animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-chartreuse inline-block"></span>
                                {es ? '⚡ OFERTA LIMITADA — SOLO 3 PLAZAS LIBRES ESTA SEMANA' : '⚡ LIMITED TIME — ONLY 3 FREE AUDIT SLOTS LEFT THIS WEEK'}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-obsidian tracking-tighter leading-none uppercase">
                            {t('footer.ideaStart')}{t('footer.ideaAccent')}<br/>
                            <span className="text-obsidian/40">{t('footer.ideaEnd')}</span>
                        </h2>
                        <p className="text-obsidian/70 font-medium text-sm md:text-base max-w-sm leading-relaxed">
                            {t('footer.desc')}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-12 h-12 rounded-full bg-white border border-obsidian/5 flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-white transition-all shadow-xl group"
                    >
                        <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 md:px-10 pb-10 pt-4 custom-scrollbar">
                    {/* Social Proof & Value Checklist */}
                    <div className="mb-6 p-4 rounded-2xl bg-white border border-obsidian/10 shadow-sm space-y-2">
                        <div className="flex items-center gap-2 text-chartreuse font-black text-xs uppercase tracking-wider mb-1">
                            <span className="bg-obsidian text-chartreuse px-2 py-0.5 rounded-md text-[10px]">100% FREE</span>
                            <span className="text-obsidian text-[11px] font-bold">{es ? '¿Qué obtendrás en tu auditoría?' : 'What’s included in your free audit?'}</span>
                        </div>
                        <ul className="text-xs font-semibold text-obsidian/80 space-y-1.5 pl-1">
                            <li className="flex items-center gap-2">
                                <span className="text-chartreuse font-bold">✓</span>
                                {es ? 'Análisis de Posicionamiento SEO & Google Maps' : 'SEO & Google Maps Ranking Audit'}
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-chartreuse font-bold">✓</span>
                                {es ? 'Diagnóstico de Velocidad, UX Mobile & Conversión' : 'Page Speed, Mobile UX & Conversion Diagnostic'}
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-chartreuse font-bold">✓</span>
                                {es ? 'Plan de Acción Paso a Paso entregado en 24 horas' : 'Step-by-Step Action Plan delivered in 24 hours'}
                            </li>
                        </ul>
                        <div className="pt-2 border-t border-obsidian/5 flex items-center justify-between text-[11px] font-bold text-obsidian/60">
                            <span>⭐️ 4.9/5 (45+ {es ? 'auditorías este mes' : 'audits delivered this month'})</span>
                            <span className="text-chartreuse bg-obsidian px-2 py-0.5 rounded-full text-[9px]">{es ? 'Sin Compromiso' : 'Zero Risk'}</span>
                        </div>
                    </div>

                    {success ? (
                        /* Success state */
                        <div className="py-12 flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-3xl bg-chartreuse flex items-center justify-center shadow-2xl shadow-chartreuse/30 rotate-3">
                                <Check size={36} className="text-obsidian stroke-[3px]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-obsidian uppercase tracking-tight">
                                    {es ? 'Solicitud Recibida con Éxito' : 'Request Received Successfully'}
                                </h3>
                                <p className="text-obsidian/60 font-medium max-w-xs mx-auto">
                                    {es 
                                        ? 'Analizaremos tu caso y nos pondremos en contacto contigo en menos de 24 horas.' 
                                        : "We'll analyze your case and get back to you within 24 hours."}
                                </p>
                            </div>
                            <button
                                onClick={handleClose}
                                className="px-10 py-4 bg-obsidian text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-obsidian/90 transition-all shadow-xl"
                            >
                                {es ? 'Entendido' : 'Got it'}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40 ml-4 flex items-center gap-2">
                                    <ShieldCheck size={12} />
                                    {es ? 'Email o Teléfono *' : 'Email or Phone *'}
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder={es ? 'tu@email.com o +34 600 000 000' : 'you@email.com or +1 234...'}
                                        value={emailOrPhone}
                                        onChange={e => setEmailOrPhone(e.target.value)}
                                        className="w-full bg-white border border-obsidian/10 rounded-2xl p-5 text-sm font-bold focus:ring-4 ring-chartreuse/30 outline-none transition-all placeholder:text-obsidian/30"
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2 text-obsidian/30">
                                        <Mail size={18} />
                                        <span className="opacity-50">|</span>
                                        <Phone size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40 ml-4 flex items-center gap-2">
                                    <Info size={12} />
                                    {es ? 'Servicio a Auditar *' : 'Service to Audit *'}
                                </label>
                                <select
                                    required
                                    value={service}
                                    onChange={e => setService(e.target.value)}
                                    className="w-full bg-white border border-obsidian/10 rounded-2xl p-5 text-sm font-bold focus:ring-4 ring-chartreuse/30 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>{es ? '— Selecciona tu prioridad —' : '— Select your priority —'}</option>
                                    <option value="Web Premium">{es ? 'Web Premium & UX' : 'Premium Web & UX'}</option>
                                    <option value="IA Automatizacion">{es ? 'IA & Automatización' : 'AI & Automation'}</option>
                                    <option value="SEO Local">{es ? 'SEO Local & Google Maps' : 'Local SEO & Maps'}</option>
                                    <option value="Mantenimiento">{es ? 'Sistemas de Gestión' : 'Management Systems'}</option>
                                    <option value="Otro">{es ? 'Otra consulta' : 'Other inquiry'}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40 ml-4 flex items-center gap-2">
                                    <Send size={12} />
                                    {es ? 'Mensaje o Tu Web (Opcional)' : 'Message or Website URL (Optional)'}
                                </label>
                                <textarea
                                    placeholder={es ? 'Ej: www.minegocio.com o breve explicación de tus metas...' : 'e.g. www.mybusiness.com or brief info...'}
                                    rows="2"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="w-full bg-white border border-obsidian/10 rounded-2xl p-5 text-sm font-bold focus:ring-4 ring-chartreuse/30 outline-none transition-all resize-none placeholder:text-obsidian/30"
                                />
                            </div>

                            <div className="pt-2 flex flex-col md:flex-row gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !emailOrPhone.trim() || !service}
                                    className="flex-[2] bg-obsidian text-chartreuse py-5 px-6 rounded-2xl font-black uppercase tracking-wider text-xs hover:bg-obsidian/90 hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_35px_rgba(201,255,31,0.2)] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:scale-100 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>
                                            <span>{es ? 'SOLICITAR AUDITORÍA 100% GRATIS 🚀' : 'REQUEST 100% FREE AUDIT 🚀'}</span>
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 bg-white border border-obsidian/10 text-obsidian/50 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-neutral hover:text-obsidian transition-all cursor-pointer"
                                >
                                    {es ? 'Cancelar' : 'Cancel'}
                                </button>
                            </div>
                            
                            <p className="text-[10px] text-center text-obsidian/40 font-bold uppercase tracking-wider">
                                {es ? '🔒 Datos 100% protegidos. Respeta tu privacidad. Sin spam.' : '🔒 100% Secured data. Respects your privacy. Zero spam.'}
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const ArrowRight = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

export default AuditModal;
