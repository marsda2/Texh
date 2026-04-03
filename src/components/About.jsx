import React from 'react';
import { Users, Code2, Rocket, Mail } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

const About = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="relative section-padding overflow-hidden bg-neutral">
            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Text & PM Info */}
                    <div className="animate-fade-up">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-10 border border-obsidian bg-white">
                            <Users size={16} className="text-obsidian" />
                            <span className="font-heading font-semibold text-obsidian tracking-wider uppercase text-xs">
                                {t('about.whoWeAre')}
                            </span>
                        </div>

                        <h2 className="mb-6 leading-tight">
                            {t('about.titleStart')} <span className="text-accent underline decoration-chartreuse decoration-8 underline-offset-8">{t('about.titleAccent')}</span><br />
                            {t('about.titleEnd')}
                        </h2>

                        <p className="text-gray-dark text-xl font-light font-body leading-relaxed mb-12">
                            {t('about.desc1')}<strong className="text-obsidian font-semibold">{t('about.descBold1')}</strong>{t('about.desc2')}<strong>{t('about.descBold2')}</strong>{t('about.descEnd')}
                        </p>

                        <div className="p-8 radius-extreme border border-gray-light bg-white hover:border-obsidian transition-colors duration-500 group">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                                <div className="w-24 h-24 rounded-full bg-obsidian flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                    <span className="font-heading font-black text-3xl text-chartreuse">
                                        XH
                                    </span>
                                </div>
                                <div className="text-center sm:text-left">
                                    <h4 className="text-2xl font-heading font-bold text-obsidian mb-1 tracking-tight">Xiuny Huerta</h4>
                                    <p className="text-chartreuse font-body font-semibold uppercase tracking-widest text-sm mb-3">{t('about.pmTitle')}</p>
                                    <p className="text-gray-dark font-body font-light text-sm leading-relaxed max-w-sm mb-4">
                                        {t('about.pmDesc')}
                                    </p>
                                    <a href="mailto:xiuny@texhco.com" className="inline-flex items-center gap-2 text-obsidian hover:text-chartreuse transition-colors font-body text-sm font-semibold underline decoration-transparent hover:decoration-chartreuse underline-offset-4">
                                        <Mail size={16} /> xiuny@texhco.com
                                    </a>
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
                            <h3 className="text-xl font-body font-bold text-obsidian mb-3">{t('about.capability')}</h3>
                            <p className="text-gray-dark font-body font-light text-sm leading-relaxed">{t('about.capabilityDesc')}</p>
                        </div>

                        <div className="p-10 radius-extreme border border-gray-light bg-white hover:-translate-y-2 transition-transform duration-500 sm:translate-y-8">
                            <div className="w-14 h-14 rounded-full border border-gray-light flex items-center justify-center mb-6 text-obsidian">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-xl font-body font-bold text-obsidian mb-3">{t('about.b2b')}</h3>
                            <p className="text-gray-dark font-body font-light text-sm leading-relaxed">{t('about.b2bDesc')}</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
