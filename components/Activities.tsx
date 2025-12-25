import React, { useState } from 'react';
import Reveal from './Reveal';
import { ArrowRight } from 'lucide-react';
import ActivitiesModal from './ActivitiesModal';
import ParallaxSection from './ParallaxSection';

const Activities: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ParallaxSection
        id="activities"
        className="py-20 md:py-32"
        backgroundContent={
          <>
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,215,0,1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,215,0,1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />

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
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary font-display text-xs font-bold tracking-[0.15em] uppercase">
                    Kegiatan
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl font-display font-black">
                  <span className="text-white">Galeri </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                    Aktivitas
                  </span>
                </h3>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/20 text-white font-display text-sm font-bold uppercase tracking-wider hover:bg-gradient-to-r hover:from-primary hover:to-yellow-400 hover:text-black hover:border-transparent transition-all duration-300 flex items-center gap-2"
              >
                Lihat Semua
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[900px] md:h-[600px]">
            {/* Main large card */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300">
              <Reveal className="w-full h-full">
                <img
                  alt="Tournament Final"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  src="/tournament_thumb.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-lg bg-gradient-to-r from-primary to-yellow-400 text-black text-xs font-bold tracking-wide">
                    TOURNAMENT
                  </span>
                  <h4 className="text-white font-display font-bold text-2xl group-hover:text-primary transition-colors">
                    Brawijaya Esport Cup 2023
                  </h4>
                </div>
              </Reveal>
            </div>

            {/* Top right card */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300">
              <Reveal delay={100} className="w-full h-full">
                <img
                  alt="Gathering"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  src="/gathering_thumb.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-lg bg-gradient-to-r from-primary to-yellow-400 text-black text-xs font-bold tracking-wide">
                    GATHERING
                  </span>
                  <h4 className="text-white font-display font-bold text-xl group-hover:text-primary transition-colors">
                    Community Meetup
                  </h4>
                </div>
              </Reveal>
            </div>

            {/* Bottom left small card */}
            <div className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300">
              <Reveal delay={200} className="w-full h-full">
                <img
                  alt="Bootcamp"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  src="/bootcamp_thumb.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-display font-bold text-sm group-hover:text-primary transition-colors">Bootcamp</h4>
                </div>
              </Reveal>
            </div>

            {/* Bottom right small card */}
            <div className="relative group overflow-hidden rounded-2xl border border-white/10 hover:border-primary/50 transition-all duration-300">
              <Reveal delay={300} className="w-full h-full">
                <img
                  alt="Workshop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  src="/workshop_thumb.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h4 className="text-white font-display font-bold text-sm group-hover:text-primary transition-colors">Workshop</h4>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Activities Modal */}
      <ActivitiesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Activities;