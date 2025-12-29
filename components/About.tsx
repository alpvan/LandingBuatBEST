import React from 'react';
import Reveal from './Reveal';
import CountUp from './CountUp';
import TextScramble from './TextScramble';
import { Trophy, Users, Gamepad2, Shield, Star, Palette, Type } from 'lucide-react';
import ParallaxSection from './ParallaxSection';
import Logo3D from './Logo3D';

import GlitchReveal from './GlitchReveal';

const About: React.FC = () => {
  const stats = [
    { label: 'Anggota', end: 800, suffix: '+', icon: Users },
    { label: 'Prestasi', end: 50, suffix: '+', icon: Trophy },
  ];

  return (
    <ParallaxSection
      id="about"
      className="py-20 md:py-32"
      backgroundContent={
        <>
          {/* Background - smooth transition from Hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none"></div>

          {/* Subtle grid pattern removed as per previous unification task, ensuring it's clean */}

          {/* Parallax glow orbs */}
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1s' }}></div>
        </>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Section: Intro & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">

          {/* Left Column: Visi & Misi */}
          <Reveal direction="left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <GlitchReveal>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  <span className="text-primary font-display text-xs font-bold tracking-widest uppercase">WHO WE ARE</span>
                </div>
              </GlitchReveal>
            </div>

            {/* Visi Section */}
            <div className="mb-12">
              <GlitchReveal>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
                  <span className="text-primary">Visi</span> Kami
                </h3>
              </GlitchReveal>
              <p className="text-gray-300 text-lg leading-relaxed">
                Menjadi pusat pengembangan talenta esport mahasiswa yang unggul, berprestasi, dan menjunjung tinggi sportivitas serta nilai-nilai kompetitif di tingkat nasional maupun internasional untuk Universitas Brawijaya dan Indonesia.
              </p>
            </div>

            {/* Misi Section */}
            <div>
              <GlitchReveal>
                <h3 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
                  <span className="text-primary">Misi</span> Kami
                </h3>
              </GlitchReveal>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center mt-1 group-hover:bg-primary/10 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Memberikan pelayanan terbaik dan manfaat berkelanjutan dalam rangka pemenuhan kebutuhan dan minat bakat mahasiswa di bidang Esports.
                  </p>
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center mt-1 group-hover:bg-primary/10 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Mewadahi dan memfasilitasi pengembangan skill serta meningkatkan prestasi mahasiswa UB melalui turnamen kompetitif.
                  </p>
                </li>
                <li className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center mt-1 group-hover:bg-primary/10 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Menciptakan komunitas gamer yang solid, inklusif, dan profesional dengan menjunjung tinggi sportivitas.
                  </p>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Right Column: Image with Badge */}
          <Reveal direction="right" delay={200}>
            <div className="relative sticky top-24">
              {/* Circular Badge - Top Right Overlay */}
              <div className="absolute -top-12 -right-6 z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex flex-col items-center justify-center shadow-2xl animate-spin-slow">
                <div className="text-center">
                  <span className="block text-4xl font-display font-black text-primary">2025</span>
                  <span className="block text-xs font-bold text-black tracking-widest mt-1">BEST UB</span>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-white/5 shadow-2xl group">
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <img
                  alt="Brawijaya Esport Team"
                  className="w-full h-auto object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
                />
              </div>

              {/* Back Decoration */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -z-10 transform rotate-2"></div>
            </div>
          </Reveal>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20"></div>

        {/* Bottom Section: Filosofi Logo & Stats */}
        <Reveal direction="up" delay={400}>
          <div className="flex flex-col gap-20">

            {/* Detailed Filosofi Logo Section - Border Removed */}
            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-12 h-full">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                {/* Title Section */}
                <div className="text-center mb-16 relative z-20">
                  <GlitchReveal>
                    <h4 className="text-5xl md:text-6xl font-display font-black text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                      Filosofi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">Logo</span>
                    </h4>
                  </GlitchReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                  {/* Left: Main Logo Display */}
                  <div className="flex justify-center items-center">
                    <div className="relative group w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
                      <Logo3D size="medium" className="!w-full !h-full relative z-10" />
                    </div>
                  </div>

                  <div className="space-y-10">

                    <div className="grid grid-cols-1 gap-8">
                      {/* 1. Perisai */}
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/perisai.png" alt="Filosofi Perisai" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <GlitchReveal>
                              <h5 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">Perisai</h5>
                            </GlitchReveal>
                          </div>
                          <p className="text-gray-400 leading-relaxed">
                            Melambangkan kekuatan, ketangguhan, dan perlindungan. Perisai juga diartikan sebagai pelindung Komunitas dan ekosistem E-Sport agar selalu sehat dan stabil.
                          </p>
                        </div>
                      </div>

                      {/* 2. Huruf BEST */}
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/huruf.png" alt="Filosofi Huruf" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Type className="w-5 h-5 text-primary" />
                            <GlitchReveal>
                              <h5 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">Huruf B, E, S, T</h5>
                            </GlitchReveal>
                          </div>
                          <p className="text-gray-400 leading-relaxed">
                            Singkatan dari "Brawijaya E-Sport". Terdapat huruf B, E, S, dan T di dalam logo yang menandakan bahwa logo tersebut milik kebanggaan Universitas Brawijaya.
                          </p>
                        </div>
                      </div>

                      {/* 3. Warna Emas */}
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/emas.png" alt="Filosofi Warna Emas" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Palette className="w-5 h-5 text-primary" />
                            <GlitchReveal>
                              <h5 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">Warna Emas</h5>
                            </GlitchReveal>
                          </div>
                          <p className="text-gray-400 leading-relaxed">
                            Memiliki arti kejayaan, kesuksesan, optimisme, dan prestasi. Warna emas juga salah satu warna dari logo Universitas Brawijaya yang menandakan bagian integral dari kampus.
                          </p>
                        </div>
                      </div>

                      {/* 4. Bintang */}
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/bintang.png" alt="Filosofi Bintang" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Star className="w-5 h-5 text-primary fill-primary/20" />
                            <GlitchReveal>
                              <h5 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">Bintang</h5>
                            </GlitchReveal>
                          </div>
                          <p className="text-gray-400 leading-relaxed">
                            Menandakan bahwa BEST memiliki harapan yang tinggi dan akan terus berkembang. Memancarkan sinar dan menjadi pusat perhatian serta penuntun bagi pecinta esports.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>

        </Reveal>
      </div >
    </ParallaxSection >
  );
};

export default About;