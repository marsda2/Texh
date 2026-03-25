import React from 'react';
import About from '../components/About';

const AboutPage = () => {
    return (
        <div className="pt-24 min-h-screen bg-neutral">
            <div className="grid-bg-overlay"></div>
            <About />
            
            <section className="section-padding">
                <div className="container relative z-10">
                    <div className="p-16 radius-extreme bg-obsidian text-center animate-fade-up shadow-2xl">
                        <h3 className="text-3xl font-heading font-black text-white mb-6">Nuestra Filosofía</h3>
                        <p className="text-gray-light text-xl max-w-3xl mx-auto font-body font-light leading-relaxed">
                            Creemos que cada desafío técnico es una oportunidad para crear
                            algo extraordinario. Nuestro equipo no solo escribe código; 
                            forjamos las soluciones digitales que potenciarán la próxima generación de ideas locales.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
