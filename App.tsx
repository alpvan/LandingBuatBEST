import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import BackgroundParticles from './components/BackgroundParticles';
import Hero from './components/Hero';
import About from './components/About';
import TeamLogos from './components/TeamLogos';
import Organization from './components/Organization';
import Prestasi from './components/Prestasi';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for the intro animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loader />}

      {/* 
         We keep the main content mounted but hidden or behind the loader 
         to ensure it's ready when the loader fades out. 
         However, for a clean React implementation, we can conditionally render
         or just use CSS opacity control controlled by the loading state if we wanted
         a cross-fade. Here we strictly swap or overlay.
      */}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <BackgroundParticles />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />

          <Organization />
          <Prestasi />
          <Events />
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default App;