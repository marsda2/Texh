import React from 'react';
import { ShowcaseCard } from './ui/showcase-card-1';

const projects = [
    {
        title: "Varoncare",
        category: "E-commerce & Health",
        image: "https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?q=80&w=2600&auto=format&fit=crop",
        link: "https://www.varoncare.com/",
        description: "Tienda online y plataforma integral de salud diseñada para hombres.",
    },
    {
        title: "Striki Onboarding",
        category: "Interactive UX",
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
        link: "https://striki.netlify.app/#/onboarding",
        description: "Sistema paso a paso interactivo diseñado para retener clientes.",
    },
    {
        title: "Melodica",
        category: "Educational App",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop",
        link: "https://www.melodica.app/en",
        description: "Aplicación móvil educativa para aprender música de forma sencilla.",
    },
    {
        title: "Isabel Ávila",
        category: "Creative Portfolio",
        image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
        link: "https://mariaisabelavila.com/",
        description: "Web y portafolio visual dinámico para una maquilladora profesional.",
    }
];

const Portfolio = () => {
    return (
        <section id="portfolio" className="relative section-padding bg-neutral">
            <div className="container">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-fade-up">
                    <div className="max-w-2xl">
                        <h2 className="mb-6 leading-tight">
                            Casos de <span className="text-accent underline decoration-obsidian decoration-8 underline-offset-8">Éxito</span>.
                        </h2>
                        <p className="text-gray-dark text-xl font-light font-body">
                            Explora algunos de los negocios que han confiado en nosotros para lanzar
                            o mejorar su presencia digital y conseguir más ventas.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-12">
                    {projects.map((project, index) => (
                        <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative group">
                                <ShowcaseCard 
                                    projectTitle={project.title}
                                    projectSubtitle={project.category}
                                    imageUrl={project.image}
                                    description={project.description}
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
