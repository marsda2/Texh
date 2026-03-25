import React from 'react';
import { Mail, MapPin, Phone, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="relative section-padding bg-white border-t border-gray-light">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">

                    <div className="col-span-1 lg:col-span-6">
                        <h2 className="text-4xl lg:text-5xl mb-8 leading-tight font-heading font-black text-obsidian">
                            ¿Tienes una <span className="text-accent underline decoration-chartreuse decoration-8 underline-offset-8">Idea?</span><br />
                            Vamos a Construirla.
                        </h2>
                        <p className="text-gray-dark text-xl max-w-md mb-10 font-body font-light">
                            Creamos obras maestras digitales. Contáctanos para discutir el inicio de tu ecosistema omnicanal.
                        </p>
                        <a href="mailto:hello@texhco.com" className="btn btn-primary radius-extreme px-8 py-4 group inline-flex items-center gap-4 text-chartreuse bg-obsidian text-lg shadow-xl shadow-obsidian/10">
                            Aceptar Propuesta <ArrowRight size={24} className="transition-transform group-hover:translate-x-2" />
                        </a>
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <h4 className="text-sm font-heading font-bold tracking-widest text-obsidian uppercase mb-8">Escríbenos</h4>
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
                                Agendar llamada
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-3">
                        <h4 className="text-sm font-heading font-bold tracking-widest text-obsidian uppercase mb-8">Socials</h4>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/texh.co?igsh=dTl6cjhqMThmMHI2" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center hover:bg-obsidian hover:text-chartreuse transition-colors text-obsidian">
                                <Instagram size={24} />
                            </a>
                            <button onClick={() => alert('¡Próximamente! / Coming soon')} className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center hover:bg-obsidian hover:text-chartreuse transition-colors text-obsidian">
                                <Linkedin size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-light flex flex-col md:flex-row justify-between items-center gap-6 text-gray-medium text-sm font-body font-medium">
                    <p className="flex items-center gap-2">
                        <span className="font-heading font-black tracking-tight text-obsidian text-base">TEXH<span className="text-chartreuse">.</span></span>
                        <span>© {new Date().getFullYear()}. Ingeniería + Diseño.</span>
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-obsidian transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-obsidian transition-colors">Términos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
