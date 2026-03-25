import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral section-padding-lg">
            {/* Minimalist Grid Constraint Background */}
            <div className="grid-bg-overlay"></div>

            <div className="container relative z-10 flex flex-col items-center xl:items-start text-center xl:text-left">
                {/* Subtle Top Badge - Extreme contrast styling */}
                <div className="animate-fade-up inline-flex items-center gap-3 px-5 py-2 rounded-full mb-10 border border-obsidian bg-white" style={{ animationDelay: '0s' }}>
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chartreuse opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-chartreuse"></span>
                    </span>
                    <span className="font-heading font-semibold text-obsidian tracking-wide uppercase text-xs">
                        Ingeniería + Diseño
                    </span>
                </div>

                {/* Massive Typography - "Tu Ecosistema Omnicanal Premium" */}
                <h1 className="mb-8 animate-fade-up max-w-5xl leading-tight" style={{ animationDelay: '0.1s' }}>
                    Tu Ecosistema <br className="hidden md:block" />
                    Omnicanal <span className="text-accent underline decoration-obsidian decoration-8 underline-offset-8">Premium</span>.
                </h1>

                {/* Body text - technical but inspiring */}
                <p className="text-xl max-w-3xl mb-12 animate-fade-up font-light text-gray-dark" style={{ animationDelay: '0.2s' }}>
                    Construimos tu infraestructura digital completa: desde el desarrollo web premium hasta el ecosistema omnicanal de IA que automatiza tu crecimiento local.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-6 animate-fade-up" style={{ animationDelay: '0.3s' }}>
                    <a href="#services" className="btn btn-primary radius-extreme group">
                        Agendar Sesión Estratégica
                        <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-chartreuse" />
                    </a>
                    <a href="#portfolio" className="btn btn-outline radius-extreme">
                        Explorar Casos de Estudio
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50 cursor-pointer z-20">
                <a href="#services" className="flex flex-col items-center no-underline text-obsidian">
                    <span className="text-xs uppercase tracking-widest mb-2 font-heading font-bold">Descubre el Ecosistema</span>
                    <div className="w-[2px] h-12 bg-obsidian"></div>
                </a>
            </div>
        </section>
    );
};

export default Hero;
