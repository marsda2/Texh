import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, Globe, Copy, Check, Download, X, Linkedin, Instagram, Send, ArrowLeft, MessageCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackLeadEvent } from '../lib/analytics';
import './ContactCardPage.css';

const USERS_DATA = {
    xiuny: {
        displayName: 'Xiuny',
        fullName: 'Xiuny',
        lastName: 'Huerta',
        initials: 'XH',
        title: 'Digital Advisor',
        company: 'Texh Co.',
        tagline: 'DIGITAL GROWTH ECOSYSTEMS',
        email: 'xiuny@texhco.com',
        phone: '+1 347 888 7424',
        website: 'https://texhco.com',
        instagram: 'https://www.instagram.com/texh.co',
        linkedin: '#',
    },
    marcos: {
        displayName: 'Marcos',
        fullName: 'Marcos',
        lastName: 'Troger',
        initials: 'MT',
        title: 'Fullstack Lead',
        company: 'Texh Co.',
        tagline: 'DIGITAL GROWTH ECOSYSTEMS',
        email: 'marcos@texhco.com',
        phone: '+1 332 200 1854',
        website: 'https://texhco.com',
        instagram: 'https://www.instagram.com/texh.co',
        linkedin: '#',
    }
};

// Generate vCard string
const generateVCard = (c) => {
    return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${c.displayName} ${c.lastName}`,
        `N:${c.lastName};${c.fullName};;;`,
        `ORG:${c.company}`,
        `TITLE:${c.title}`,
        `EMAIL;TYPE=WORK:${c.email}`,
        `TEL;TYPE=CELL:${c.phone}`,
        `URL:${c.website}`,
        'END:VCARD',
    ].join('\n');
};

const CopyButton = ({ value, label }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            const el = document.createElement('textarea');
            el.value = value;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="vcard-copy-btn" aria-label={`Copy ${label}`} title={`Copy ${label}`}>
            {copied ? <Check size={15} className="vcard-copy-icon--done" /> : <Copy size={15} />}
        </button>
    );
};

const ContactCardPage = () => {
    const { username } = useParams();
    const contactInfo = USERS_DATA[username?.toLowerCase()] || USERS_DATA.xiuny;

    const [mounted, setMounted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ contact: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(t);
    }, []);

    const handleSave = () => {
        setSaving(true);
        const blob = new Blob([generateVCard(contactInfo)], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${contactInfo.displayName}_${contactInfo.lastName}.vcf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setTimeout(() => setSaving(false), 1800);
    };

    const handleClose = () => {
        window.location.href = 'https://texhco.com/';
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.contact.trim()) return;
        setIsSubmitting(true);
        try {
            const contactValue = formData.contact.trim();
            const isEmail = contactValue.includes('@');
            const { error } = await supabase
                .from('contact_card_leads')
                .insert({
                    email: isEmail ? contactValue : null,
                    phone: !isEmail ? contactValue : null,
                    card_owner: username || 'xiuny',
                    source: 'contact_card',
                });
            if (error) throw error;
            
            // Track successful lead generation
            trackLeadEvent('contact_card');
        } catch (err) {
            console.error('Error saving contact card lead:', err);
            // Still show success — don't block UX
        } finally {
            setIsSubmitting(false);
        }
        setSubmitted(true);
        setTimeout(() => {
            setShowForm(false);
            setSubmitted(false);
            setFormData({ contact: '' });
        }, 3000);
    };

    const fields = [
        { icon: Mail, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
        { icon: Phone, label: 'Teléfono', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
        { icon: Globe, label: 'Web', value: 'texhco.com', href: contactInfo.website },
    ];

    return (
        <div className="vc-page">
            <div className="vc-bg-pattern" />

            <button onClick={handleClose} className="vc-close" aria-label="Cerrar">
                <X size={22} strokeWidth={2.5} />
            </button>

            <div className={`vc-card ${mounted ? 'vc-card--in' : ''}`}>
                <p className="vc-tagline">{contactInfo.tagline}</p>

                <div className="vc-identity">
                    <div className="vc-avatar">
                        <span>{contactInfo.initials}</span>
                    </div>
                    <div>
                        <h1 className="vc-name">
                            {contactInfo.displayName} <span>{contactInfo.lastName}</span>
                        </h1>
                        <p className="vc-title">{contactInfo.title} · {contactInfo.company}</p>
                    </div>
                </div>

                <div className="vc-sep" />

                <div className={`vc-request-wrap ${mounted ? 'vc-field--in' : ''}`} style={{ transitionDelay: '200ms' }}>
                    {!showForm ? (
                        <button onClick={() => setShowForm(true)} className="vc-request-btn">
                            <MessageCircle size={18} />
                            <span>Solicitar más información</span>
                        </button>
                    ) : (
                        <div className="vc-request-form">
                            {!submitted ? (
                                <>
                                    <button onClick={() => setShowForm(false)} className="vc-form-back" aria-label="Volver">
                                        <ArrowLeft size={16} />
                                    </button>
                                    <p className="vc-form-title">¿Cómo te contactamos?</p>
                                    <p className="vc-form-desc">Déjanos tu email o teléfono y nos pondremos en contacto contigo.</p>
                                    <form onSubmit={handleFormSubmit} className="vc-form">
                                        <input
                                            type="text"
                                            placeholder="Email o teléfono"
                                            value={formData.contact}
                                            onChange={(e) => setFormData({ contact: e.target.value })}
                                            className="vc-form-input"
                                            autoFocus
                                            required
                                        />
                                        <button type="submit" className="vc-form-submit" disabled={isSubmitting}>
                                            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="vc-form-success">
                                    <Check size={24} />
                                    <p>¡Recibido! Nos pondremos en contacto pronto.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="vc-fields">
                    {fields.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={f.label}
                                className={`vc-field ${mounted ? 'vc-field--in' : ''}`}
                                style={{ transitionDelay: `${280 + i * 70}ms` }}
                            >
                                <div className="vc-field-icon"><Icon size={18} /></div>
                                <div className="vc-field-body">
                                    <span className="vc-field-label">{f.label}</span>
                                    {f.href ? (
                                        <a
                                            href={f.href}
                                            className="vc-field-value vc-link"
                                            target={f.href.startsWith('http') ? '_blank' : undefined}
                                            rel={f.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        >
                                            {f.value}
                                        </a>
                                    ) : (
                                        <span className="vc-field-value">{f.value}</span>
                                    )}
                                    {f.sub && <span className="vc-field-sub">{f.sub}</span>}
                                </div>
                                <CopyButton value={f.value} label={f.label} />
                            </div>
                        );
                    })}
                </div>

                <div className="vc-socials">
                    <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="vc-social" aria-label="Instagram">
                        <Instagram size={20} />
                    </a>
                    <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="vc-social" aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                </div>

                <button onClick={handleSave} className={`vc-save ${saving ? 'vc-save--done' : ''}`}>
                    {saving ? (
                        <><Check size={20} /> <span>¡Contacto Guardado!</span></>
                    ) : (
                        <><Download size={20} /> <span>Guardar Contacto</span></>
                    )}
                </button>
            </div>

            <a href="https://texhco.com/" className="vc-footer">
                Powered by <strong>TE<span>X</span>H CO.</strong>
            </a>
        </div>
    );
};

export default ContactCardPage;
