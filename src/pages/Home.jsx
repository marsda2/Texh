import React from 'react';
import { CinematicHero } from '../components/ui/cinematic-landing-hero';
import { AIVoiceInput } from '../components/ui/ai-voice-input';
import { Carousel, DEFAULT_ITEMS } from '../components/ui/Carousel';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <CinematicHero />
            
            {/* AI Voice Input Section */}
            <section className="py-24 bg-white border-y border-gray-light flex flex-col items-center justify-center relative shadow-lg z-30">
                <div className="container max-w-3xl text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-obsidian mb-6 tracking-tight">
                        Cuentanos tu <span className="text-accent underline decoration-chartreuse decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">idea</span>.
                    </h2>
                    <p className="text-gray-dark text-lg md:text-xl font-body font-light mb-12">
                        Habla y nuestro sistema transcribirá inmediatamente las necesidades exactas de tu negocio para generar una propuesta a medida.
                    </p>
                    <div className="p-8 md:p-12 radius-extreme bg-neutral border border-gray-light shadow-2xl flex flex-col items-center justify-center">
                        <AIVoiceInput />
                    </div>
                </div>
            </section>

            {/* Showcase Carousel */}
            <section className="py-24 bg-neutral border-b border-gray-light overflow-hidden flex flex-col items-center justify-center">
                <div className="container text-center mb-20 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-obsidian tracking-tight">
                        Lo que dicen de <span className="text-accent">nosotros</span>
                    </h2>
                </div>
                
                {/* Mobile View: Single Card Carousel */}
                <div className="block md:hidden">
                    <Carousel 
                        baseWidth={320}
                        autoplay={true}
                        autoplayDelay={3000}
                        pauseOnHover={true}
                        loop={true}
                    />
                </div>

                {/* Desktop View: Multi-card Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 lg:px-8">
                    {DEFAULT_ITEMS.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-obsidian/5 border border-obsidian/10 flex flex-col items-center text-center hover:-translate-y-4 hover:shadow-chartreuse/20 transition-all duration-500 ease-out"
                        >
                            <div className="w-16 h-16 rounded-full bg-neutral flex items-center justify-center mb-6 text-2xl border border-obsidian/10 shadow-inner">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-bold font-heading text-obsidian mb-4 tracking-tight">
                                {item.title}
                            </h3>
                            <p className="text-gray-dark font-body text-base leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <Services />
            <Portfolio />
        </div>
    );
};

export default Home;
