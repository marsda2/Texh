import React from 'react';
import { Smartphone, Code, Cpu, Megaphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';
import { useScrollReveal } from '../lib/useScrollReveal';

const Services = () => {
    const { t, language } = useLanguage();
    const headerRef = useScrollReveal();

    const services = [
        {
            category: t('services.category1'),
            items: [
                {
                    id: 'web',
                    icon: <Code size={28} />,
                    title: t('services.webDesign'),
                    description: t('services.webDesignDesc'),
                },
                {
                    id: 'app',
                    icon: <Smartphone size={28} />,
                    title: t('services.apps'),
                    description: t('services.appsDesc'),
                },
                {
                    id: 'maintenance',
                    icon: <Cpu size={28} />,
                    title: t('services.maintenance'),
                    description: t('services.maintenanceDesc'),
                }
            ]
        },
        {
            category: t('services.category2'),
            items: [
                {
                    id: 'social',
                    icon: <Megaphone size={28} />,
                    title: t('services.social'),
                    description: t('services.socialDesc'),
                }
            ]
        }
    ];

    return (
        <section id="services" className="relative section-padding bg-white">
            <div className="container">
                {/* Section header — scroll reveal */}
                <div
                    ref={headerRef}
                    className="srv-reveal flex flex-col md:flex-row justify-between items-end mb-20"
                >
                    <div className="max-w-3xl">
                        <h2 className="mb-6 leading-tight text-obsidian">
                            {t('services.titleStart')} <span className="bg-chartreuse text-obsidian px-3 pt-1 pb-2 inline-block underline decoration-obsidian decoration-[6px] underline-offset-4">{t('services.titleAccent')}{t('services.titleEnd')}</span>
                        </h2>
                        <p className="text-gray-dark text-xl font-light font-body">
                            {t('services.desc')}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-16">
                    {services.map((section, idx) => (
                        <ServiceSection
                            key={idx}
                            section={section}
                            idx={idx}
                            language={language}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* Separated so each section gets its own observer */
const ServiceSection = ({ section, idx, language }) => {
    const headingRef = useScrollReveal();

    return (
        <div>
            <h3
                ref={headingRef}
                className={`srv-reveal text-2xl mb-8 border-b-2 border-obsidian pb-4 ${idx === 0 ? 'font-body font-bold tracking-tight' : 'font-heading font-medium'}`}
            >
                {section.category}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((service, index) => (
                    <ServiceCard
                        key={index}
                        service={service}
                        index={index}
                        idx={idx}
                        language={language}
                    />
                ))}
            </div>
        </div>
    );
};

/* Each card gets its own observer + staggered delay */
const ServiceCard = ({ service, index, idx, language }) => {
    const cardRef = useScrollReveal({ threshold: 0.1 });

    return (
        <div
            ref={cardRef}
            className="srv-card-reveal p-10 relative overflow-hidden group border border-gray-light bg-neutral radius-extreme flex flex-col h-full"
            style={{ transitionDelay: `${index * 80}ms` }}
        >
            {/* Chartreuse accent line that slides in on hover */}
            <div className="srv-accent-line" />

            <div className="srv-icon-wrap mb-8">
                {service.icon}
            </div>

            <div className="relative z-10 flex flex-col flex-grow">
                <div>
                    <h4 className={`text-xl mb-3 text-obsidian ${idx === 0 ? 'font-body font-semibold' : 'font-heading font-bold'}`}>
                        {service.title}
                    </h4>
                    <p className="text-gray-dark font-body font-light leading-relaxed mb-8">
                        {service.description}
                    </p>
                </div>
                <div className="mt-auto">
                    <Link
                        to={`/estimator?service=${service.id || 'web'}`}
                        className="inline-flex items-center gap-2 text-sm font-heading font-bold text-obsidian bg-transparent px-0 py-0 uppercase tracking-widest hover:text-chartreuse transition-colors srv-cta-link"
                        style={{ textDecoration: 'none' }}
                    >
                        {language === 'es' ? 'Comenzar Cotización' : 'Start Estimate'}
                        <ArrowRight size={16} className="srv-arrow" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;
