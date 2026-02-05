import React, { useRef, useState, useEffect } from 'react';
import Reveal from './Reveal';
import ParallaxSection from './ParallaxSection';
import GlitchReveal from './GlitchReveal';
import { motion } from 'framer-motion';

const Prestasi: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (carouselRef.current) {
                setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
            }
        };

        // Initial calculation
        updateWidth();

        // Add event listener
        window.addEventListener('resize', updateWidth);

        // Cleanup
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const images = [
        { src: '/LandingBuatBEST/Best.jpg', title: 'Turnamen Apa AJA', desc: 'Turnamen Apa AJA' },
        { src: '/LandingBuatBEST/Best.jpg', title: 'Turnamen Apa AJA', desc: 'Turnamen Apa AJA' },
        { src: '/LandingBuatBEST/Best.jpg', title: 'Turnamen Apa AJA', desc: 'Turnamen Apa AJA' },
        { src: '/LandingBuatBEST/Best.jpg', title: 'Turnamen Apa AJA', desc: 'Turnamen Apa AJA' },
        { src: '/LandingBuatBEST/Best.jpg', title: 'Turnamen Apa AJA', desc: 'Turnamen Apa AJA' },
    ];

    return (
        <ParallaxSection
            id="prestasi"
            className="py-20 md:py-32"
            backgroundContent={
                <>
                    {/* Parallax glow */}
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite 0.5s' }}></div>
                </>
            }
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                        <div>
                            {/* Badge */}
                            <GlitchReveal>
                                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30">
                                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                    <span className="text-primary font-sans text-xs font-bold tracking-[0.15em] uppercase">
                                        Prestasi
                                    </span>
                                </div>
                            </GlitchReveal>

                            <GlitchReveal>
                                <h3 className="text-3xl md:text-5xl font-sans font-black">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                                        Pencapaian
                                    </span>
                                </h3>
                            </GlitchReveal>
                        </div>
                    </div>
                </Reveal>

                {/* Carousel */}
                <div className="cursor-grab active:cursor-grabbing overflow-hidden">
                    <motion.div
                        ref={carouselRef}
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        className="flex gap-6"
                    >
                        {images.map((img, index) => (
                            <motion.div
                                key={index}
                                className="shrink-0 w-[240px] md:w-[280px] h-[350px] relative rounded-2xl overflow-hidden group border border-white/10"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100 pointer-events-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-3 py-1 mb-2 rounded-lg bg-primary/20 text-primary text-[10px] font-bold border border-primary/30 backdrop-blur-sm">
                                        {img.desc}
                                    </span>
                                    <h4 className="text-white font-sans font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                                        {img.title}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </ParallaxSection>
    );
};

export default Prestasi;
