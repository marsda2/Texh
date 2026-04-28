import React from 'react';
import About from '../components/About';
import { useLanguage } from '../lib/i18n';
import { SEO } from '../components/SEO';

const AboutPage = () => {
    const { t, language } = useLanguage();
    const es = language === 'es';
    return (
        <div className="pt-24 min-h-screen bg-neutral">
            <SEO
                title={es ? "Quiénes Somos — Tu Socio Tecnológico" : "About Us — Your Strategic Tech Partner"}
                description={es ? "Conoce al equipo de Texh Co. Ingenieros y estrategas digitales construyendo sistemas de crecimiento para negocios locales." : "Meet the Texh Co. team. Engineers and digital strategists building growth systems for local businesses."}
                url="https://texhco.com/about"
            />
            <div className="grid-bg-overlay"></div>
            <About />
            
            <section className="section-padding">
                <div className="container relative z-10">
                    <div className="p-16 radius-extreme bg-obsidian text-center animate-fade-up shadow-2xl">
                        <h3 className="text-3xl font-heading font-black text-white mb-6">{t('philosophy.title')}</h3>
                        <p className="text-gray-light text-xl max-w-3xl mx-auto font-body font-light leading-relaxed">
                            {t('philosophy.desc')}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
