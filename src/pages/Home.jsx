import React, { useState } from 'react';
import { CinematicHero } from '../components/ui/cinematic-landing-hero';
import { AIVoiceInput } from '../components/ui/ai-voice-input';
import { Carousel } from '../components/ui/Carousel';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import { useLanguage } from '../lib/i18n';

const ReviewCard = ({ item }) => {
    const { language } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    
    const description = item.description || '';
    const words = description.split(/\s+/);
    const isLong = words.length > 20;
    const displayText = !isLong || isExpanded ? description : words.slice(0, 20).join(' ') + '...';

    return (
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-obsidian/5 border border-obsidian/10 flex flex-col items-center text-center hover:-translate-y-4 hover:shadow-chartreuse/20 transition-all duration-500 ease-out h-full">
            <div className="w-16 h-16 rounded-full bg-neutral flex items-center justify-center mb-6 text-2xl border border-obsidian/10 shadow-inner flex-shrink-0">
                <span className="carousel-icon-container text-chartreuse">★</span>
            </div>
            <h3 className="text-2xl font-bold font-heading text-obsidian mb-4 tracking-tight">
                {item.title}
            </h3>
            <p className="text-gray-dark font-body text-base leading-relaxed flex-grow">
                {displayText}
                {isLong && (
                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-obsidian font-bold text-sm ml-2 hover:text-chartreuse hover:underline transition-colors bg-transparent border-none cursor-pointer inline-block"
                    >
                        {isExpanded ? (language === 'es' ? 'Leer menos' : 'Read less') : (language === 'es' ? 'Leer más' : 'Read more')}
                    </button>
                )}
            </p>
        </div>
    );
};

const Home = () => {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col min-h-screen">
            <CinematicHero 
                tagline1={t('hero.tagline1')}
                tagline2={t('hero.tagline2')}
                cardHeading={t('hero.cardHeading')}
                cardDescription={t('hero.cardDesc')}
                metricLabel={t('hero.clients')}
            />
            
            {/* AI Voice Input Section */}
            <section className="py-24 bg-white border-y border-gray-light flex flex-col items-center justify-center relative shadow-lg z-30">
                <div className="container max-w-3xl text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-obsidian mb-6 tracking-tight">
                        {t('ai.titleStart')} <span className="text-accent underline decoration-chartreuse decoration-4 md:decoration-8 underline-offset-4 md:underline-offset-8">{t('ai.titleIdea')}</span>{t('ai.titleEnd')}
                    </h2>
                    <p className="text-gray-dark text-lg md:text-xl font-body font-light mb-12">
                        {t('ai.desc')}
                    </p>
                    <div className="p-8 md:p-12 radius-extreme bg-neutral border border-gray-light shadow-2xl flex flex-col items-center justify-center">
                        <AIVoiceInput 
                            placeholderText={t('ai.inputPlaceholder')}
                            recordingText={t('ai.inputRecording')}
                        />
                    </div>
                </div>
            </section>

            {/* Showcase Carousel */}
            <section className="py-24 bg-neutral border-b border-gray-light overflow-hidden flex flex-col items-center justify-center">
                <div className="container text-center mb-20 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-obsidian tracking-tight">
                        {t('reviews.titleStart')} <span className="text-accent">{t('reviews.titleAccent')}</span>
                    </h2>
                </div>
                
                {/* Mobile View: Single Card Carousel */}
                <div className="block md:hidden">
                    <Carousel 
                        items={t('carouselItems').map(item => ({ ...item, icon: <span className="carousel-icon-container text-chartreuse">★</span> }))}
                        baseWidth={320}
                        autoplay={true}
                        autoplayDelay={3000}
                        pauseOnHover={true}
                        loop={true}
                    />
                </div>

                {/* Desktop View: Multi-card Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 lg:px-8">
                    {t('carouselItems').map((item, idx) => (
                        <ReviewCard key={idx} item={item} />
                    ))}
                </div>
            </section>

            <Services />
            <Portfolio />
        </div>
    );
};

export default Home;
