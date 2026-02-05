import React from 'react';
import Reveal from './Reveal';
import { Instagram } from 'lucide-react';
import GlitchReveal from './GlitchReveal';
import ParallaxSection from './ParallaxSection';

const Contact: React.FC = () => {
  return (
    <ParallaxSection
      id="contact"
      className="py-20 md:py-32"
      backgroundContent={
        <>
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1.5s' }}></div>
        </>
      }
    >
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <Reveal className="w-full">
          <div className="flex flex-col items-center">
            <GlitchReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary font-sans text-xs font-bold tracking-[0.15em] uppercase">
                  Saran
                </span>
              </div>
            </GlitchReveal>

            <GlitchReveal>
              <h3 className="text-3xl md:text-5xl font-sans font-black mb-6 leading-tight">
                <span className="text-white">Punya Pertanyaan </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                  atau Saran?
                </span>
                <br></br>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                  Hubungi Kami
                </span>
              </h3>
            </GlitchReveal>

            <p className="text-gray-400 mb-8 font-medium italic">
              Kami siap mendengar masukan Anda untuk perkembangan BEST UB
            </p>

            <div className="relative group">
              <a
                href="https://www.instagram.com/brawijaya_esports/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-black font-sans text-sm font-bold uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:scale-105 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
                Kirim Pesan via Instagram
              </a>

              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-primary/50">
                Follow Instagram Kami
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-primary/50"></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </ParallaxSection>
  );
};

export default Contact;