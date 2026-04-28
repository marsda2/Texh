import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircleQuestion } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { SEO } from '../components/SEO';

/**
 * Reusable Service Landing Page Template.
 *
 * Props:
 *   slug       – URL slug for canonical
 *   titleEn / titleEs – H1 titles
 *   descEn / descEs   – Hero description
 *   metaTitleEn / metaTitleEs – SEO <title>
 *   metaDescEn / metaDescEs   – SEO <meta description>
 *   icon       – Lucide icon component
 *   features   – Array of { en, es } feature strings
 *   faqs       – Array of { questionEn, questionEs, answerEn, answerEs }
 *   ctaTextEn / ctaTextEs
 */
const ServicePage = ({
    slug,
    titleEn, titleEs,
    descEn, descEs,
    metaTitleEn, metaTitleEs,
    metaDescEn, metaDescEs,
    icon: Icon,
    features = [],
    faqs = [],
    ctaTextEn = "Request Your Free Audit",
    ctaTextEs = "Solicitar Auditoría Gratuita",
}) => {
    const { language } = useLanguage();
    const es = language === 'es';

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": es ? titleEs : titleEn,
        "provider": {
            "@type": "ProfessionalService",
            "name": "Texh Co.",
            "url": "https://texhco.com"
        },
        "description": es ? metaDescEs : metaDescEn,
        "areaServed": ["New Jersey", "New York"],
        "serviceOutput": "Increased local visibility, calls, and leads"
    };

    const faqSchema = faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": es ? faq.questionEs : faq.questionEn,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": es ? faq.answerEs : faq.answerEn
            }
        }))
    } : null;

    const schemas = [serviceSchema];
    if (faqSchema) schemas.push(faqSchema);

    return (
        <div className="min-h-screen bg-neutral pt-28 pb-0">
            <SEO
                title={es ? metaTitleEs : metaTitleEn}
                description={es ? metaDescEs : metaDescEn}
                url={`https://texhco.com/services/${slug}`}
                schema={schemas}
            />

            {/* ── Hero ── */}
            <section className="section-padding bg-white border-b border-gray-light">
                <div className="container max-w-5xl">
                    <div className="flex flex-col md:flex-row items-start gap-12">
                        <div className="flex-1">
                            <span className="inline-block px-4 py-1.5 bg-chartreuse/10 text-obsidian text-[10px] font-black uppercase tracking-widest rounded-full border border-chartreuse/20 mb-6">
                                {es ? 'Servicio' : 'Service'}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-obsidian tracking-tighter leading-[1.05] mb-8">
                                {es ? titleEs : titleEn}
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-dark font-body font-light leading-relaxed max-w-2xl mb-10">
                                {es ? descEs : descEn}
                            </p>
                            <Link
                                to="/audit"
                                className="inline-flex items-center gap-3 bg-obsidian text-chartreuse px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-obsidian/90 transition-all shadow-xl group"
                            >
                                {es ? ctaTextEs : ctaTextEn}
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        {Icon && (
                            <div className="hidden md:flex w-32 h-32 rounded-[2rem] bg-chartreuse/10 items-center justify-center border border-chartreuse/20 flex-shrink-0">
                                <Icon size={48} className="text-obsidian" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── What's Included ── */}
            {features.length > 0 && (
                <section className="section-padding bg-neutral">
                    <div className="container max-w-5xl">
                        <h2 className="text-3xl md:text-4xl font-heading font-black text-obsidian tracking-tighter mb-12">
                            {es ? '¿Qué incluye?' : "What's included?"}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feat, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-light shadow-sm">
                                    <CheckCircle2 size={22} className="text-chartreuse flex-shrink-0 mt-0.5" />
                                    <p className="text-obsidian font-body font-medium text-base leading-relaxed">
                                        {es ? feat.es : feat.en}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── FAQ ── */}
            {faqs.length > 0 && (
                <section className="section-padding bg-white border-t border-gray-light">
                    <div className="container max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-heading font-black text-obsidian tracking-tighter mb-12 flex items-center gap-3">
                            <MessageCircleQuestion size={28} className="text-chartreuse" />
                            {es ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq, i) => (
                                <details key={i} className="group bg-neutral rounded-2xl border border-gray-light overflow-hidden">
                                    <summary className="p-6 cursor-pointer font-heading font-bold text-obsidian text-lg flex items-center justify-between list-none">
                                        {es ? faq.questionEs : faq.questionEn}
                                        <span className="text-chartreuse text-2xl font-black group-open:rotate-45 transition-transform duration-300">+</span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-dark font-body leading-relaxed">
                                        {es ? faq.answerEs : faq.answerEn}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Bottom CTA ── */}
            <section className="section-padding bg-obsidian text-center">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-heading font-black text-white tracking-tighter mb-6">
                        {es ? '¿Listo para crecer?' : 'Ready to grow?'}
                    </h2>
                    <p className="text-white/60 text-lg font-body font-light mb-10">
                        {es
                            ? 'Reserva una sesión estratégica gratuita y descubre cómo podemos escalar tu negocio.'
                            : 'Book a free strategy session and discover how we can scale your business.'}
                    </p>
                    <Link
                        to="/audit"
                        className="inline-flex items-center gap-3 bg-chartreuse text-obsidian px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl group"
                    >
                        {es ? ctaTextEs : ctaTextEn}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
