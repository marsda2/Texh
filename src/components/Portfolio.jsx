import React from 'react';
import { SuccessCaseCard } from './ui/SuccessCaseCard';
import { useLanguage } from '../lib/i18n';

const Portfolio = () => {
    const { t } = useLanguage();
    const translatedProjects = t('projects');

    const projects = [
        {
            title: "Varoncare",
            category: "E-commerce & Health",
            imageUrl: "https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?q=80&w=2600&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.58.25_p._m._pqkbcv&profile=cld-looping&player[controls]=false",
            link: "https://www.varoncare.com/",
            description: translatedProjects[0].description,
        },
        {
            title: "Striki",
            category: "Interactive UX",
            imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.59.03_p._m._sdoyna&profile=cld-looping&player[controls]=false",
            link: "https://striki.netlify.app/#/onboarding",
            description: translatedProjects[1].description,
        },
        {
            title: "Melodica",
            category: "AI & Music E-commerce",
            imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.57.49_p._m._frpiit&profile=cld-looping&player[controls]=false",
            link: "https://www.melodica.app/en",
            description: translatedProjects[2].description,
        },
        {
            title: "Isabel Ávila",
            category: "Creative Portfolio",
            imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.56.48_p._m._hehczs&profile=cld-looping&player[controls]=false",
            link: "https://mariaisabelavila.com/",
            description: translatedProjects[3].description,
        }
    ];

    return (
        <section id="portfolio" className="relative section-padding bg-neutral">
            <div className="container">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-fade-up">
                    <div className="max-w-2xl">
                        <h2 className="mb-6 leading-tight">
                            {t('portfolio.titleStart')} <span className="text-accent underline decoration-obsidian decoration-8 underline-offset-8">{t('portfolio.titleAccent')}</span>{t('portfolio.titleEnd')}
                        </h2>
                        <p className="text-gray-dark text-xl font-light font-body">
                            {t('portfolio.desc')}
                        </p>
                    </div>
                </div>

                <div className="success-cases-grid">
                    {projects.map((project, index) => (
                        <SuccessCaseCard
                            key={index}
                            title={project.title}
                            category={project.category}
                            description={project.description}
                            link={project.link}
                            imageUrl={project.imageUrl}
                            videoUrl={project.videoUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
