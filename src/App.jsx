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

// SVG Icons
const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

function AppContent() {
    const [scrolled, setScrolled] = useState(false);
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
                </nav>
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
