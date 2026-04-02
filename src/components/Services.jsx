import React from 'react';
import { Smartphone, Code, Cpu, Megaphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../lib/i18n';

const Services = () => {
    const { t, language } = useLanguage();

    const services = [
        {
            category: t('services.category1'),
            items: [
                {
                    id: 'web',
                    icon: <Code size={28} className="text-obsidian" />,
                    title: t('services.webDesign'),
                    description: t('services.webDesignDesc'),
                },
                {
                    id: 'app',
                    icon: <Smartphone size={28} className="text-obsidian" />,
                    title: t('services.apps'),
                    description: t('services.appsDesc'),
                },
                {
                    id: 'maintenance',
                    icon: <Cpu size={28} className="text-chartreuse" />,
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
                    icon: <Megaphone size={28} className="text-obsidian" />,
                    title: t('services.social'),
                    description: t('services.socialDesc'),
                }
            ]
        }
    ];

    return (
        <section id="services" className="relative section-padding bg-white">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-fade-up">
                    <div className="max-w-3xl">
                        <h2 className="mb-6 leading-tight">
                            {t('services.titleStart')} <span className="text-accent underline decoration-chartreuse decoration-8 underline-offset-8">{t('services.titleAccent')}</span>{t('services.titleEnd')}
                        </h2>
                        <p className="text-gray-dark text-xl font-light font-body">
                            {t('services.desc')}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-16">
                    {services.map((section, idx) => (
                        <div key={idx} className="animate-fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                            {/* Section Header */}
                            <h3 className={`text-2xl mb-8 border-b-2 border-obsidian pb-4 ${idx === 0 ? 'font-body font-bold tracking-tight' : 'font-heading font-medium'}`}>
                                {section.category}
                            </h3>

                            {/* Service Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {section.items.map((service, index) => (
                                    <div
                                        key={index}
                                        className="p-10 relative overflow-hidden group border border-gray-light bg-neutral radius-extreme transition-all duration-500 hover:border-obsidian hover:shadow-xl flex flex-col h-full"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-8 border border-gray-light group-hover:scale-110 transition-transform duration-500 shrink-0">
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
                                                    className="inline-flex items-center gap-2 text-sm font-heading font-bold text-obsidian bg-transparent px-0 py-0 uppercase tracking-widest hover:text-chartreuse transition-colors"
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    {language === 'es' ? 'Comenzar Cotización' : 'Start Estimate'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
