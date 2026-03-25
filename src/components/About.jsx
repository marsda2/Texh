import React from 'react';
import { Users, Code2, Rocket } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="relative section-padding overflow-hidden bg-neutral">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text & PM Info */}
                    <div className="animate-fade-up">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-10 border border-obsidian bg-white">
                            <Users size={16} className="text-obsidian" />
                            <span className="font-heading font-semibold text-obsidian tracking-wider uppercase text-xs">
                                Quiénes Somos
                            </span>
                        </div>

                        <h2 className="mb-6 leading-tight">
                            Impulsados por la <span className="text-accent underline decoration-chartreuse decoration-8 underline-offset-8">Excelencia</span>.<br />
                            Liderados por Visión.
                        </h2>

                        <p className="text-gray-dark text-xl font-light font-body leading-relaxed mb-12">
                            En Texh Co., somos un colectivo de <strong className="text-obsidian font-semibold">desarrolladores y diseñadores full-stack</strong> con años de experiencia probada. Nos especializamos en crear e implementar ecosistemas omnicanal premium para <strong>empresas y fundadores visionarios</strong>.
                        </p>

                        <div className="p-8 radius-extreme border border-gray-light bg-white hover:border-obsidian transition-colors duration-500 group">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                                <div className="w-24 h-24 rounded-full bg-obsidian flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                    <span className="font-heading font-black text-3xl text-chartreuse">
                                        XH
                                    </span>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-2xl font-heading font-bold text-obsidian mb-1 tracking-tight">Xiunellys Huerta</h4>
                                    <p className="text-chartreuse font-body font-semibold uppercase tracking-widest text-sm mb-3">Lead Project Manager</p>
                                    <p className="text-gray-dark font-body font-light text-sm leading-relaxed max-w-sm">
                                        Nuestra misión es conectar tu visión de negocio con la infraestructura técnica exacta que demanda el futuro. Orquestamos la complejidad técnica para entregar productos impecables.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Values / Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                        <div className="p-10 radius-extreme border border-gray-light bg-white hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center mb-6 text-obsidian">
                                <Code2 size={24} />
                            </div>
                            <h3 className="text-xl font-body font-bold text-obsidian mb-3">Capacidad Full-Stack</h3>
                            <p className="text-gray-dark font-body font-light text-sm leading-relaxed">Desde infraestructuras de backend escalables hasta interfaces frontend con reaccón instantánea.</p>
                        </div>

                        <div className="p-10 radius-extreme border border-gray-light bg-white hover:-translate-y-2 transition-transform duration-500 sm:translate-y-8">
                            <div className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center mb-6 text-obsidian">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-xl font-body font-bold text-obsidian mb-3">Soluciones B2B & B2C</h3>
                            <p className="text-gray-dark font-body font-light text-sm leading-relaxed">Ingeniería versátil capaz de soportar desde el lanzamiento ágil de MVPs hasta el requerimiento de infraestructuras corporativas.</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
