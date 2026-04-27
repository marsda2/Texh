import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, Loader2, ShieldCheck, Mail, Phone, Send, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../lib/i18n';

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

            // Trigger GA Event if window.gtag exists
            if (window.gtag) {
                window.gtag('event', 'generate_lead', {
                    'event_category': 'audit',
                    'event_label': service
                });
            }

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
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-chartreuse/10 text-chartreuse text-[10px] font-black uppercase tracking-widest rounded-full border border-chartreuse/20">
                                {es ? 'Auditoría Digital' : 'Digital Audit'}
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-obsidian tracking-tighter leading-none uppercase">
                            {t('footer.ideaStart')}{t('footer.ideaAccent')}<br/>
                            <span className="text-obsidian/40">{t('footer.ideaEnd')}</span>
                        </h2>
                        <p className="text-obsidian/60 font-medium text-sm md:text-base max-w-sm leading-relaxed">
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
                    {success ? (
                        /* Success state */
                        <div className="py-12 flex flex-col items-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-3xl bg-chartreuse flex items-center justify-center shadow-2xl shadow-chartreuse/30 rotate-3">
                                <Check size={36} className="text-obsidian stroke-[3px]" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-obsidian uppercase tracking-tight">
                                    {es ? 'Solicitud Recibida' : 'Request Received'}
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
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        className="w-full bg-white border border-obsidian/5 rounded-2xl p-5 text-sm font-bold focus:ring-4 ring-chartreuse/20 outline-none transition-all placeholder:text-obsidian/20"
                                    />
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2 text-obsidian/20">
                                        <Mail size={18} />
                                        <span className="opacity-50">|</span>
                                        <Phone size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-obsidian/40 ml-4 flex items-center gap-2">
                                    <Info size={12} />
                                    {es ? 'Servicio o Consulta *' : 'Service or Inquiry *'}
                                </label>
                                <select
                                    required
                                    value={service}
                                    onChange={e => setService(e.target.value)}
                                    className="w-full bg-white border border-obsidian/5 rounded-2xl p-5 text-sm font-bold focus:ring-4 ring-chartreuse/20 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" disabled>{es ? '— Selecciona una opción —' : '— Select an option —'}</option>
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
                                    {es ? 'Mensaje (Opcional)' : 'Message (Optional)'}
                                </label>
                                <textarea
                                    placeholder={es ? 'Cuéntanos brevemente tu proyecto o consulta...' : 'Tell us briefly about your project...'}
                                    rows="3"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    className="w-full bg-white border border-obsidian/5 rounded-2xl p-5 text-sm font-bold focus:ring-4 ring-chartreuse/20 outline-none transition-all resize-none placeholder:text-obsidian/20"
                                />
                            </div>

                            <div className="pt-4 flex flex-col md:flex-row gap-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !emailOrPhone.trim() || !service}
                                    className="flex-[2] bg-obsidian text-chartreuse py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-obsidian/90 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <>
                                            {es ? 'Enviar Solicitud' : 'Send Request'}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="flex-1 bg-white border border-obsidian/5 text-obsidian/40 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-neutral transition-all"
                                >
                                    {es ? 'Cancelar' : 'Cancel'}
                                </button>
                            </div>
                            
                            <p className="text-[10px] text-center text-obsidian/30 font-bold uppercase tracking-wider">
                                {es ? '🔒 Datos protegidos. Sin compromiso.' : '🔒 Secured data. No commitment.'}
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
