import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Check, Loader2, X, Mail, Phone, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { supabase } from '../lib/supabase';
import { trackLeadEvent } from '../lib/analytics';
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

const Footer = ({ onOpenAudit }) => {
    const { t, language } = useLanguage();
    const [showBooking, setShowBooking] = useState(false);

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

                        {/* CTA Button - Now opens Audit Modal */}
                        <button
                            onClick={onOpenAudit}
                            className="btn btn-primary radius-extreme px-10 py-5 group inline-flex items-center gap-6 text-chartreuse bg-obsidian text-lg shadow-2xl shadow-obsidian/20 hover:-translate-y-1 transition-all duration-300"
                        >
                            {t('footer.accept')}
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
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
                            <a href="https://www.instagram.com/p/DXfh65QAj-P/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center hover:bg-obsidian hover:text-chartreuse transition-colors text-obsidian">
                                <Instagram size={24} />
                            </a>
                            <a href="https://www.linkedin.com/company/texhco" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center hover:bg-obsidian hover:text-chartreuse transition-colors text-obsidian">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-light flex flex-col md:flex-row justify-between items-center gap-6 text-gray-medium text-sm font-body font-medium">
                    <p className="flex items-center gap-2">
                        <span className="font-heading font-black tracking-tight text-obsidian text-base">TEXH<span className="text-chartreuse">.</span></span>
                        <span>© {new Date().getFullYear()}. {t('footer.rights')}</span>
                    </p>
                    <div className="flex gap-8">
                        <Link to="/privacy" className="hover:text-obsidian transition-colors">{t('footer.privacy')}</Link>
                        <Link to="/terms" className="hover:text-obsidian transition-colors">{t('footer.terms')}</Link>
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





