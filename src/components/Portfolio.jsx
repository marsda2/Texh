import React, { useState } from 'react';
import { SuccessCaseCard } from './ui/SuccessCaseCard';
import { useLanguage } from '../lib/i18n';

const Portfolio = () => {
    const { t } = useLanguage();
    const translatedProjects = t('projects');
    const [selectedSector, setSelectedSector] = useState('all');

    const sectors = [
        {
            id: 'ecommerce',
            badge: t('portfolio.sectors.ecommerce.badge'),
            title: t('portfolio.sectors.ecommerce.title'),
            subtitle: t('portfolio.sectors.ecommerce.subtitle'),
            projects: [
                {
                    title: "Melodica",
                    category: "AI & Music E-commerce",
                    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2674&auto=format&fit=crop",
                    videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.57.49_p._m._frpiit&profile=cld-looping&player[controls]=false",
                    link: "https://www.melodica.app/en",
                    description: translatedProjects[1].description,
                },
                {
                    title: "Varoncare",
                    category: "E-commerce & Health",
                    imageUrl: "https://images.unsplash.com/photo-1542451542907-6cf80ff362d6?q=80&w=2600&auto=format&fit=crop",
                    videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.58.25_p._m._pqkbcv&profile=cld-looping&player[controls]=false",
                    link: "https://www.varoncare.com/",
                    description: translatedProjects[3].description,
                }
            ]
        },
        {
            id: 'services',
            badge: t('portfolio.sectors.services.badge'),
            title: t('portfolio.sectors.services.title'),
            subtitle: t('portfolio.sectors.services.subtitle'),
            projects: [
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
            ]
        },
        {
            id: 'creative',
            badge: t('portfolio.sectors.creative.badge'),
            title: t('portfolio.sectors.creative.title'),
            subtitle: t('portfolio.sectors.creative.subtitle'),
            projects: [
                {
                    title: "Isabel Ávila",
                    category: "Creative Portfolio",
                    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2670&auto=format&fit=crop",
                    videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.56.48_p._m._hehczs&profile=cld-looping&player[controls]=false",
                    link: "https://mariaisabelavila.com/",
                    description: translatedProjects[0].description,
                },
                {
                    title: "Striki",
                    category: "Interactive UX",
                    imageUrl: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop",
                    videoUrl: "https://player.cloudinary.com/embed/?cloud_name=dtajpvp8x&public_id=Grabacio%CC%81n_de_pantalla_2026-03-24_a_las_6.59.03_p._m._sdoyna&profile=cld-looping&player[controls]=false",
                    link: "https://striki.netlify.app/#/onboarding",
                    description: translatedProjects[2].description,
                }
            ]
        }
    ];

    const filteredSectors = selectedSector === 'all' 
        ? sectors 
        : sectors.filter(s => s.id === selectedSector);

    return (
        <section id="portfolio" className="relative section-padding bg-neutral">
            <div className="container">

                {/* Main Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 animate-fade-up gap-6">
                    <div className="max-w-2xl">
                        <h2 className="mb-4 leading-tight text-obsidian">
                            {t('portfolio.titleStart')} <span className="bg-chartreuse text-obsidian px-3 pt-1 pb-2 inline-block underline decoration-obsidian decoration-[6px] underline-offset-4">{t('portfolio.titleAccent')}{t('portfolio.titleEnd')}</span>
                        </h2>
                        <p className="text-gray-dark text-xl font-light font-body">
                            {t('portfolio.desc')}
                        </p>
                    </div>

                    {/* Sector Filter Tabs */}
                    <div className="flex flex-wrap gap-2 bg-white p-2 rounded-[2rem] border border-obsidian/10 shadow-sm">
                        <button
                            onClick={() => setSelectedSector('all')}
                            className={`px-5 py-2.5 rounded-full text-xs font-heading font-black tracking-widest uppercase transition-all ${
                                selectedSector === 'all'
                                    ? 'bg-obsidian text-chartreuse shadow-md'
                                    : 'text-obsidian/60 hover:text-obsidian hover:bg-neutral'
                            }`}
                        >
                            {t('portfolio.all')}
                        </button>
                        {sectors.map((sec) => (
                            <button
                                key={sec.id}
                                onClick={() => setSelectedSector(sec.id)}
                                className={`px-5 py-2.5 rounded-full text-xs font-heading font-black tracking-widest uppercase transition-all ${
                                    selectedSector === sec.id
                                        ? 'bg-obsidian text-chartreuse shadow-md'
                                        : 'text-obsidian/60 hover:text-obsidian hover:bg-neutral'
                                }`}
                            >
                                {sec.title.split('&')[0]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Categorized Sector Blocks */}
                <div className="flex flex-col gap-20">
                    {filteredSectors.map((sector) => (
                        <div key={sector.id} className="space-y-8">
                            {/* Sector Header Banner */}
                            <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-obsidian/10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <span className="inline-block bg-obsidian text-chartreuse text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-3 shadow-inner">
                                        {sector.badge}
                                    </span>
                                    <h3 className="text-3xl font-black font-heading text-obsidian tracking-tight">
                                        {sector.title}
                                    </h3>
                                    <p className="text-gray-dark text-base font-light mt-1">
                                        {sector.subtitle}
                                    </p>
                                </div>
                                <span className="text-xs font-mono font-bold text-obsidian/40 uppercase tracking-widest shrink-0">
                                    {sector.projects.length} {sector.projects.length === 1 ? 'ejemplo' : 'ejemplos'}
                                </span>
                            </div>

                            {/* 2 Projects Grid per Sector */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {sector.projects.map((project, index) => (
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
