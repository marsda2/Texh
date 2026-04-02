import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Instagram, Linkedin, ArrowRight, ChevronDown, Send, Check, Loader2, X } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { supabase } from '../lib/supabase';
import BookingModal from './BookingModal';

const SERVICES_ES = [
    'Desarrollo Web Premium',
    'Aplicación Móvil',
    'Mantenimiento y Soporte',
    'Diseño y Redes Sociales',
    'Consulta General',
];

const SERVICES_EN = [
    'Premium Web Development',
    'Mobile Application',
    'Maintenance & Support',
    'Design & Social Media',
    'General Consultation',
];

const Footer = () => {
    const { t, language } = useLanguage();
    const [open, setOpen] = useState(false);
    const [contact, setContact] = useState('');
    const [service, setService] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const formRef = useRef(null);
    const services = language === 'es' ? SERVICES_ES : SERVICES_EN;

    // Smooth height animation
    useEffect(() => {
        if (!formRef.current) return;
        if (open) {
            formRef.current.style.maxHeight = formRef.current.scrollHeight + 'px';
            formRef.current.style.opacity = '1';
        } else {
            formRef.current.style.maxHeight = '0px';
            formRef.current.style.opacity = '0';
        }
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!contact.trim()) return;
        setIsSubmitting(true);
        try {
            const isEmail = contact.includes('@');
            const { error } = await supabase.from('footer_leads').insert({
                email: isEmail ? contact.trim() : null,
                phone: !isEmail ? contact.trim() : null,
                selected_service: service || null,
                message: message.trim() || null,
            });
            if (error) throw error;
        } catch (err) {
            console.error('Error saving footer lead:', err);
        } finally {
            setIsSubmitting(false);
        }
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            setOpen(false);
            setContact('');
            setService('');
            setMessage('');
        }, 3500);
    };

    return (
        <>
        <footer id="contact" className="relative section-padding bg-white border-t border-gray-light">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

                    <div className="col-span-1 lg:col-span-6">
                        <h2 className="text-4xl lg:text-5xl mb-8 leading-tight font-heading font-black text-obsidian">
                            {t('footer.ideaStart')} <span className="text-accent underline decoration-chartreuse decoration-8 underline-offset-8">{t('footer.ideaAccent')}</span><br />
                            {t('footer.ideaEnd')}
                        </h2>
                        <p className="text-gray-dark text-xl max-w-md mb-10 font-body font-light">
                            {t('footer.desc')}
                        </p>

                        {/* CTA Button */}
                        <button
                            onClick={() => setOpen(o => !o)}
                            className="btn btn-primary radius-extreme px-8 py-4 group inline-flex items-center gap-4 text-chartreuse bg-obsidian text-lg shadow-xl shadow-obsidian/10 transition-all duration-300"
                        >
                            {t('footer.accept')}
                            <ChevronDown
                                size={22}
                                className={`transition-transform duration-300 ${open ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
                            />
                        </button>

                        {/* Inline form — slides open */}
                        <div
                            ref={formRef}
                            style={{ maxHeight: '0px', opacity: 0, overflow: 'hidden', transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease' }}
                            className="mt-6"
                        >
                            {success ? (
                                <div className="flex flex-col items-start gap-3 py-6">
                                    <div className="w-12 h-12 rounded-full bg-chartreuse flex items-center justify-center">
                                        <Check size={22} className="text-obsidian" />
                                    </div>
                                    <p className="font-heading font-black text-obsidian text-xl">
                                        {language === 'es' ? '¡Mensaje recibido!' : 'Message received!'}
                                    </p>
                                    <p className="text-gray-dark font-body">
                                        {language === 'es' ? 'Nos pondremos en contacto contigo muy pronto.' : 'We will get back to you very soon.'}
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                                    {/* Email / Phone */}
                                    <div>
                                        <label className="block text-xs font-heading font-bold tracking-widest text-obsidian uppercase mb-2">
                                            {language === 'es' ? 'Email o Teléfono *' : 'Email or Phone *'}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={contact}
                                            onChange={e => setContact(e.target.value)}
                                            placeholder={language === 'es' ? 'tu@email.com o +34 600 000 000' : 'you@email.com or +1 234 567 8900'}
                                            className="w-full bg-neutral border border-gray-light focus:border-obsidian focus:shadow-[0_0_0_3px_rgba(33,33,33,0.08)] outline-none rounded-2xl px-5 py-3.5 text-obsidian font-body text-sm transition-all duration-300 placeholder:text-gray-medium"
                                        />
                                    </div>

                                    {/* Service dropdown */}
                                    <div>
                                        <label className="block text-xs font-heading font-bold tracking-widest text-obsidian uppercase mb-2">
                                            {language === 'es' ? 'Servicio o Consulta' : 'Service or Inquiry'}
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={service}
                                                onChange={e => setService(e.target.value)}
                                                className="w-full appearance-none bg-neutral border border-gray-light focus:border-obsidian focus:shadow-[0_0_0_3px_rgba(33,33,33,0.08)] outline-none rounded-2xl px-5 py-3.5 text-obsidian font-body text-sm transition-all duration-300 cursor-pointer pr-10"
                                            >
                                                <option value="">{language === 'es' ? '— Selecciona una opción —' : '— Select an option —'}</option>
                                                {services.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-medium pointer-events-none" />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs font-heading font-bold tracking-widest text-obsidian uppercase mb-2">
                                            {language === 'es' ? 'Mensaje (Opcional)' : 'Message (Optional)'}
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            placeholder={language === 'es' ? 'Cuéntanos brevemente tu proyecto o consulta...' : 'Tell us briefly about your project or inquiry...'}
                                            rows={3}
                                            className="w-full bg-neutral border border-gray-light focus:border-obsidian focus:shadow-[0_0_0_3px_rgba(33,33,33,0.08)] outline-none rounded-2xl px-5 py-3.5 text-obsidian font-body text-sm transition-all duration-300 placeholder:text-gray-medium resize-none"
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3 pt-1">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !contact.trim()}
                                            className="flex items-center gap-2 bg-obsidian text-chartreuse px-7 py-3.5 rounded-2xl font-heading font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:bg-obsidian/90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                                        >
                                            {isSubmitting
                                                ? <Loader2 size={16} className="animate-spin" />
                                                : <Send size={16} />
                                            }
                                            {language === 'es' ? 'Enviar' : 'Send'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="flex items-center gap-1.5 text-gray-medium hover:text-obsidian font-body text-sm transition-colors"
                                        >
                                            <X size={15} />
                                            {language === 'es' ? 'Cancelar' : 'Cancel'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <h4 className="text-sm font-heading font-bold tracking-widest text-obsidian uppercase mb-8">{t('footer.writeUs')}</h4>
                        <ul className="flex flex-col gap-6 text-lg text-gray-dark font-body font-medium">
                            <li className="flex items-center gap-4 hover:text-obsidian transition-colors cursor-pointer group">
                                <span className="p-3 rounded-full border border-gray-light bg-neutral group-hover:bg-obsidian group-hover:text-chartreuse transition-colors">
                                    <Mail size={20} />
                                </span>
                                hello@texhco.com
                            </li>
                            <li className="flex items-center gap-4 hover:text-obsidian transition-colors cursor-pointer group">
                                <span className="p-3 rounded-full border border-gray-light bg-neutral group-hover:bg-obsidian group-hover:text-chartreuse transition-colors">
                                    <Phone size={20} />
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowBooking(true)}
                                    className="text-left font-body font-medium hover:text-obsidian transition-colors"
                                >
                                    {t('footer.schedule')}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <h4 className="text-sm font-heading font-bold tracking-widest text-obsidian uppercase mb-8">{t('footer.socials')}</h4>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/texh.co?igsh=dTl6cjhqMThmMHI2" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center hover:bg-obsidian hover:text-chartreuse transition-colors text-obsidian">
                                <Instagram size={24} />
                            </a>
                            <button onClick={() => alert(t('footer.comingSoon'))} className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center hover:bg-obsidian hover:text-chartreuse transition-colors text-obsidian">
                                <Linkedin size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-light flex flex-col md:flex-row justify-between items-center gap-6 text-gray-medium text-sm font-body font-medium">
                    <p className="flex items-center gap-2">
                        <span className="font-heading font-black tracking-tight text-obsidian text-base">TEXH<span className="text-chartreuse">.</span></span>
                        <span>© {new Date().getFullYear()}. {t('footer.rights')}</span>
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-obsidian transition-colors">{t('footer.privacy')}</a>
                        <a href="#" className="hover:text-obsidian transition-colors">{t('footer.terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
        <BookingModal
            open={showBooking}
            onClose={() => setShowBooking(false)}
            language={language}
        />
    </>
    );
};

export default Footer;





