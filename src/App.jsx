import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';

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
            className={`h-[2px] bg-chartreuse rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                isOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-5 self-end mr-3 group-hover:w-6'
            }`}
        />
        <span
            className={`h-[2px] bg-chartreuse rounded-full transition-all duration-300 ease-in-out origin-center ${
                isOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
            }`}
        />
        <span
            className={`h-[2px] bg-chartreuse rounded-full transition-all duration-300 ease-in-out transform origin-center ${
                isOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-4 self-start ml-3 group-hover:w-6'
            }`}
        />
    </button>
);

function AppContent() {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <div className="app-wrapper min-h-screen">
            <ScrollToTop />

            {/* Navigation */}
            <header className="navbar-container">
                <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                    <Link to="/" className="brand-logo">
                        <span className="logo-main">TEXH</span>
                        <span className="logo-sub">CO.</span>
                    </Link>

                    <div className="nav-links">
                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
                        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>The Team</Link>
                        {isHome ? (
                            <>
                                <a href="#services" className="nav-link">Services</a>
                                <a href="#portfolio" className="nav-link">Portfolio</a>
                            </>
                        ) : (
                            <>
                                <Link to="/#services" className="nav-link">Services</Link>
                                <Link to="/#portfolio" className="nav-link">Portfolio</Link>
                            </>
                        )}
                        <a href="#contact" className="nav-link contact-link">Contact</a>
                    </div>
                    
                    <HamburgerButton isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
                </nav>

                {/* Mobile Navigation Overlay */}
                <div 
                    className={`fixed inset-0 bg-neutral z-[-1] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
                        isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'
                    }`}
                >
                    <div className="flex flex-col items-center gap-8 text-3xl font-heading font-black">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${location.pathname === '/' ? 'text-chartreuse' : 'text-obsidian hover:text-chartreuse'}`}>Home</Link>
                        <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={`transition-colors ${location.pathname === '/about' ? 'text-chartreuse' : 'text-obsidian hover:text-chartreuse'}`}>The Team</Link>
                        {isHome ? (
                            <>
                                <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">Services</a>
                                <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">Portfolio</a>
                            </>
                        ) : (
                            <>
                                <Link to="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">Services</Link>
                                <Link to="/#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-obsidian hover:text-chartreuse transition-colors">Portfolio</Link>
                            </>
                        )}
                        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white bg-obsidian px-8 py-3 rounded-full hover:text-chartreuse transition-colors mt-8">Contact</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
