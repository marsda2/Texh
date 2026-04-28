import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import EstimatorQuizPage from './pages/EstimatorQuizPage';
import ContactCardPage from './pages/ContactCardPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ClientPortal from './pages/ClientPortal';
import AuditPage from './pages/AuditPage';
import PremiumWebDesignPage from './pages/services/PremiumWebDesignPage';
import LocalSEOPage from './pages/services/LocalSEOPage';
import BusinessAutomationPage from './pages/services/BusinessAutomationPage';
import Footer from './components/Footer';
import { LanguageProvider, useLanguage } from './lib/i18n';
import { CountdownTimer } from './components/ui/CountdownTimer';
import AuditModal from './components/AuditModal';

// Scroll to top helper

// Scroll to top helper
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const HamburgerButton = ({ isOpen, setIsOpen }) => (
    <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none group bg-obsidian rounded-full md:hidden"
        aria-label="Toggle Menu"
    >
        <span
            className={`h-[2px] bg-chartreuse rounded-full transition-all duration-300 ease-in-out transform origin-center ${isOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-5 self-end mr-3 group-hover:w-6'
                }`}
        />
        <span
            className={`h-[2px] bg-chartreuse rounded-full transition-all duration-300 ease-in-out origin-center ${isOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                }`}
        />
        <span
            className={`h-[2px] bg-chartreuse rounded-full transition-all duration-300 ease-in-out transform origin-center ${isOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-4 self-start ml-3 group-hover:w-6'
                }`}
        />
    </button>
);

function AppContent() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Referral tracking logic
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref') || params.get('utm_source');
        if (ref) {
            localStorage.setItem('referral_code', ref);
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <div className="app-wrapper min-h-screen">
            <ScrollToTop />
            
            <AuditModal 
                open={isAuditModalOpen} 
                onClose={() => setIsAuditModalOpen(false)} 
            />

            {/* Navigation */}
            <header className="navbar-container">
                <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                    <Link to="/" className="brand-logo">
                        <span className="logo-main">TEXH</span>
                        <span className="logo-sub">CO.</span>
                    </Link>

                    <div className="nav-links flex items-center">
                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>{t('nav.home')}</Link>
                        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>{t('nav.team')}</Link>
                        {isHome ? (
                            <>
                                <a href="#services" className="nav-link">{t('nav.services')}</a>
                                <a href="#portfolio" className="nav-link">{t('nav.portfolio')}</a>
                            </>
                        ) : (
                            <>
                                <Link to="/#services" className="nav-link">{t('nav.services')}</Link>
                                <Link to="/#portfolio" className="nav-link">{t('nav.portfolio')}</Link>
                            </>
                        )}
                        <button 
                            onClick={() => setIsAuditModalOpen(true)}
                            className="nav-link contact-link flex flex-col items-center justify-center !py-1.5 !px-5 gap-0.5 border border-chartreuse/30 shadow-[0_0_15px_rgba(201,255,31,0.2)] animate-pulse hover:animate-none"
                        >
                            <span className="font-bold text-sm tracking-tight">{t('nav.contact')}</span>
                            <div className="text-[10px] opacity-90 leading-none">
                                <CountdownTimer />
                            </div>
                        </button>

                        {/* Desktop Language Toggle */}
                        <div className="flex items-center gap-2 ml-6 font-heading font-black text-xs tracking-widest">
                            <button onClick={() => setLanguage('es')} className={`transition-all ${language === 'es' ? 'text-chartreuse opacity-100 scale-110 drop-shadow-md' : 'text-obsidian opacity-80 hover:opacity-100 hover:scale-105'}`}>ES</button>
                            <span className="text-obsidian opacity-20">|</span>
                            <button onClick={() => setLanguage('en')} className={`transition-all ${language === 'en' ? 'text-chartreuse opacity-100 scale-110 drop-shadow-md' : 'text-obsidian opacity-80 hover:opacity-100 hover:scale-105'}`}>EN</button>
                        </div>
                    </div>

                    <HamburgerButton isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
                </nav>

                {/* Mobile Navigation Overlay */}
                <div
                    className={`fixed inset-0 bg-neutral z-[-1] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'
                        }`}
                >
                    <div className="flex flex-col items-center gap-8 text-3xl font-heading font-black">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${location.pathname === '/' ? 'text-chartreuse' : 'text-obsidian hover:text-chartreuse'}`}>{t('nav.home')}</Link>
                        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${location.pathname === '/about' ? 'text-chartreuse' : 'text-obsidian hover:text-chartreuse'}`}>{t('nav.team')}</Link>
                        {isHome ? (
                            <>
                                <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">{t('nav.services')}</a>
                                <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">{t('nav.portfolio')}</a>
                            </>
                        ) : (
                            <>
                                <Link to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">{t('nav.services')}</Link>
                                <Link to="/#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">{t('nav.portfolio')}</Link>
                            </>
                        )}
                        <button 
                            onClick={() => { setIsAuditModalOpen(true); setIsMobileMenuOpen(false); }}
                            className="text-obsidian bg-chartreuse px-8 py-3 rounded-full hover:bg-white transition-colors mt-4 flex flex-col items-center justify-center shadow-lg shadow-chartreuse/20"
                        >
                            <span className="font-bold text-xl">{t('nav.contact')}</span>
                            <div className="text-sm font-mono font-bold opacity-80 mt-1">
                                <CountdownTimer />
                            </div>
                        </button>

                        {/* Mobile Language Toggle */}
                        <div className="flex items-center gap-4 mt-4 text-xl">
                            <button onClick={() => { setLanguage('es'); setIsMobileMenuOpen(false); }} className={`transition-all ${language === 'es' ? 'text-chartreuse opacity-100 scale-110 drop-shadow-md' : 'text-obsidian opacity-50 hover:opacity-100'}`}>ES</button>
                            <span className="text-obsidian opacity-20">|</span>
                            <button onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }} className={`transition-all ${language === 'en' ? 'text-chartreuse opacity-100 scale-110 drop-shadow-md' : 'text-obsidian opacity-50 hover:opacity-100'}`}>EN</button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <Routes>
                    <Route path="/" element={<Home onOpenAudit={() => setIsAuditModalOpen(true)} />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/estimator" element={<EstimatorQuizPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/portal" element={<ClientPortal />} />
                    <Route path="/audit" element={<AuditPage />} />
                    <Route path="/services/premium-web-design" element={<PremiumWebDesignPage />} />
                    <Route path="/services/local-seo" element={<LocalSEOPage />} />
                    <Route path="/services/business-automation" element={<BusinessAutomationPage />} />
                </Routes>
            </main>

            <Footer onOpenAudit={() => setIsAuditModalOpen(true)} />
        </div>
    );
}


function App() {
    return (
        <HelmetProvider>
            <LanguageProvider>
                <Router>
                    <Routes>
                        <Route path="/contact/:username" element={<ContactCardPage />} />
                        <Route path="/*" element={<AppContent />} />
                    </Routes>
                    <SpeedInsights />
                </Router>
            </LanguageProvider>
        </HelmetProvider>
    );
}

export default App;
