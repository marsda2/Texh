import React, { useState } from 'react';
import { CinematicHero } from '../components/ui/cinematic-landing-hero';
import { AIVoiceInput } from '../components/ui/ai-voice-input';
import { Carousel } from '../components/ui/Carousel';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import { useLanguage } from '../lib/i18n';
import { useScrollReveal } from '../lib/useScrollReveal';
import { CountdownTimer } from '../components/ui/CountdownTimer';

const ReviewCard = ({ item, index }) => {
    const { language } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useScrollReveal({ threshold: 0.1 });
    
    const description = item.description || '';
    const words = description.split(/\s+/);
    const isLong = words.length > 20;
    const displayText = !isLong || isExpanded ? description : words.slice(0, 20).join(' ') + '...';

    return (
        <div
            ref={cardRef}
            className="srv-card-reveal bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-obsidian/5 border border-obsidian/10 flex flex-col items-center text-center hover:-translate-y-4 hover:shadow-chartreuse/20 transition-all duration-500 ease-out h-full"
            style={{ transitionDelay: `${index * 120}ms` }}
        >
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

const Home = ({ onOpenAudit }) => {
    const { t } = useLanguage();
    const voiceHeaderRef = useScrollReveal();
    const voiceMicRef = useScrollReveal({ className: 'mic-visible' });
    const reviewsHeaderRef = useScrollReveal();

    return (
        <div className="flex flex-col min-h-screen">
            <CinematicHero 
                tagline1={t('hero.tagline1')}
                tagline2={t('hero.tagline2')}
                cardHeading={t('hero.cardHeading')}
                cardDescription={t('hero.cardDesc')}
                metricLabel={t('hero.clients')}
                badgeTitle={t('hero.badgeTitle')}
                badgeSubtitle={t('hero.badgeSubtitle')}
            />
            
            {/* Mobile CTA */}
            <div className="md:hidden flex justify-center w-full px-4 pb-12 z-40 relative">
                <button 
                    onClick={onOpenAudit}
                    className="w-full max-w-sm text-obsidian bg-chartreuse px-6 py-4 rounded-[2rem] hover:bg-white transition-colors flex flex-col items-center justify-center shadow-[0_15px_30px_rgba(201,255,31,0.2)] animate-pulse hover:animate-none border border-chartreuse/50"
                >
                    <span className="font-bold text-2xl mb-1 tracking-tight">{t('nav.contact')}</span>
                    <div className="text-sm font-mono font-bold opacity-80 flex items-center justify-center">
                        <CountdownTimer />
                    </div>
                </button>
            </div>

            
            {/* AI Voice Input Section */}
            <section className="py-24 bg-white border-y border-gray-light flex flex-col items-center justify-center relative shadow-lg z-30">
                <div className="container max-w-3xl text-center">
                    <div ref={voiceHeaderRef} className="srv-reveal">
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-obsidian mb-6 tracking-tight">
                            {t('ai.titleStart')} <span className="bg-chartreuse text-obsidian px-3 pt-1 pb-2 inline-block underline decoration-obsidian decoration-[6px] underline-offset-4">{t('ai.titleIdea')}{t('ai.titleEnd')}</span>
                        </h2>
                        <p className="text-gray-dark text-lg md:text-xl font-body font-light mb-12">
                            {t('ai.desc')}
                        </p>
                    </div>
                    <div
                        ref={voiceMicRef}
                        className="mic-reveal p-8 md:p-12 radius-extreme bg-neutral border border-gray-light shadow-2xl flex flex-col items-center justify-center"
                    >
                        <AIVoiceInput 
                            placeholderText={t('ai.inputPlaceholder')}
                            recordingText={t('ai.inputRecording')}
                        />
                    </div>
                </div>
            </section>

            {/* Showcase Carousel / Testimonials */}
            <section className="py-24 bg-neutral border-b border-gray-light overflow-hidden flex flex-col items-center justify-center">
                <div ref={reviewsHeaderRef} className="srv-reveal container text-center mb-20 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-obsidian tracking-tight">
                        {t('reviews.titleStart')} <span className="bg-chartreuse text-obsidian px-3 pt-1 pb-2 inline-block underline decoration-obsidian decoration-[6px] underline-offset-4">{t('reviews.titleAccent')}</span>
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

                {/* Desktop View: Multi-card Grid with staggered reveal */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 lg:px-8">
                    {t('carouselItems').map((item, idx) => (
                        <ReviewCard key={idx} item={item} index={idx} />
                    ))}
                </div>
            </section>

            <Services />
            <Portfolio />
        </div>
    );
};

export default Home;

