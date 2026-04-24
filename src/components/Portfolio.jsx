import React from 'react';
import { SuccessCaseCard } from './ui/SuccessCaseCard';
import { useLanguage } from '../lib/i18n';

const Portfolio = () => {
    const { t } = useLanguage();
    const translatedProjects = t('projects');

    const projects = [
        {
            title: "Isabel Ávila",
            category: "Creative Portfolio",
            imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.56.48_p._m._hehczs&profile=cld-looping&player[controls]=false",
            link: "https://mariaisabelavila.com/",
            description: translatedProjects[0].description,
        },
        {
            title: "Melodica",
            category: "AI & Music E-commerce",
            imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.57.49_p._m._frpiit&profile=cld-looping&player[controls]=false",
            link: "https://www.melodica.app/en",
            description: translatedProjects[1].description,
        },
        {
            title: "Striki",
            category: "Interactive UX",
            imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.59.03_p._m._sdoyna&profile=cld-looping&player[controls]=false",
            link: "https://striki.netlify.app/#/onboarding",
            description: translatedProjects[2].description,
        },
        {
            title: "Varoncare",
            category: "E-commerce & Health",
            imageUrl: "https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?q=80&w=2600&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.58.25_p._m._pqkbcv&profile=cld-looping&player[controls]=false",
            link: "https://www.varoncare.com/",
            description: translatedProjects[3].description,
        },
        {
            title: "Ari Lashes & Brow",
            category: "Beauty & Wellness",
            imageUrl: "https://images.unsplash.com/photo-1512496015851-a1dc8a477d69?q=80&w=2670&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabaci%C3%B3n_2026-04-22_022740_mub0cb&profile=cld-looping&player[controls]=false",
            link: "https://arilashes.com/",
            description: translatedProjects[4].description,
        },
        {
            title: "Kanda",
            category: "Specialty Coffee",
            imageUrl: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2670&auto=format&fit=crop",
            videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabaci%C3%B3n_2026-04-22_022846_dtjfb5&profile=cld-looping&player[controls]=false",
            link: "https://www.kandacafe.com/",
            description: translatedProjects[5].description,
        }
    ];

    return (
        <section id="portfolio" className="relative section-padding bg-neutral">
            <div className="container">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 animate-fade-up">
                    <div className="max-w-2xl">
                        <h2 className="mb-6 leading-tight text-obsidian">
                            {t('portfolio.titleStart')} <span className="bg-chartreuse text-obsidian px-3 pt-1 pb-2 inline-block underline decoration-obsidian decoration-[6px] underline-offset-4">{t('portfolio.titleAccent')}{t('portfolio.titleEnd')}</span>
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
