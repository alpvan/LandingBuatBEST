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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none"></div>


          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1s' }}></div>
        </>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">


        <Reveal className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-center mb-12">
              <GlitchReveal>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  <span className="text-primary font-sans text-xs font-bold tracking-widest uppercase">WHO WE ARE</span>
                  <span className="w-8 h-[2px] bg-primary"></span>
                </div>
              </GlitchReveal>
            </div>

            <div className="mb-12">
              <GlitchReveal>
                <h3 className="text-4xl md:text-5xl font-sans font-black text-white mb-6">
                  <span className="text-primary">Visi</span> Kami
                </h3>
              </GlitchReveal>
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                Menjadi pusat pengembangan talenta esport mahasiswa yang unggul, berprestasi, dan menjunjung tinggi sportivitas serta nilai-nilai kompetitif di tingkat nasional maupun internasional untuk Universitas Brawijaya dan Indonesia.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center gap-4 group bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 hover:border-primary/20">
              <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform bg-primary/10">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed">
                Memberikan pelayanan terbaik dan manfaat berkelanjutan dalam rangka pemenuhan kebutuhan dan minat bakat mahasiswa di bidang Esports.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 group bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 hover:border-primary/20">
              <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform bg-primary/10">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed">
                Mewadahi dan memfasilitasi pengembangan skill serta meningkatkan prestasi mahasiswa UB melalui turnamen kompetitif.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 group bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 hover:border-primary/20">
              <div className="w-12 h-12 rounded-full border border-primary/50 flex items-center justify-center group-hover:scale-110 transition-transform bg-primary/10">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
              </div>
              <p className="text-gray-300 text-base leading-relaxed">
                Menciptakan komunitas gamer yang solid, inklusif, dan profesional dengan menjunjung tinggi sportivitas.
              </p>
            </div>
          </div>
        </Reveal>



        <Reveal direction="up" delay={400}>
          <div className="flex flex-col gap-20">

            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden p-8 md:p-12 h-full">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                <div className="text-center mb-16 relative z-20">
                  <GlitchReveal>
                    <h4 className="text-5xl md:text-6xl font-sans font-black text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                      Filosofi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">Logo</span>
                    </h4>
                  </GlitchReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                  <div className="flex justify-center items-center">
                    <div className="relative group w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] animate-pulse"></div>
                      <Logo3D size="medium" className="!w-full !h-full relative z-10" />
                    </div>
                  </div>

                  <div className="space-y-10">

                    <div className="grid grid-cols-1 gap-8">
                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/perisai.png" alt="Filosofi Perisai" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Shield className="w-5 h-5 text-primary" />
                            <GlitchReveal>
                              <h5 className="text-xl font-sans font-bold text-white group-hover:text-primary transition-colors">Perisai</h5>
                            </GlitchReveal>
                          </div>
                          <p className="text-gray-400 leading-relaxed">
                            Melambangkan kekuatan, ketangguhan, dan perlindungan. Perisai juga diartikan sebagai pelindung Komunitas dan ekosistem E-Sport agar selalu sehat dan stabil.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/huruf.png" alt="Filosofi Huruf" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Type className="w-5 h-5 text-primary" />
                            <GlitchReveal>
                              <h5 className="text-xl font-sans font-bold text-white group-hover:text-primary transition-colors">Huruf B, E, S, T</h5>
                            </GlitchReveal>
                          </div>
                          <p className="text-gray-400 leading-relaxed">
                            Singkatan dari "Brawijaya E-Sport". Terdapat huruf B, E, S, dan T di dalam logo yang menandakan bahwa logo tersebut milik kebanggaan Universitas Brawijaya.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/emas.png" alt="Filosofi Warna Emas" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Palette className="w-5 h-5 text-primary" />
                            <GlitchReveal>
                              <h5 className="text-xl font-sans font-bold text-white group-hover:text-primary transition-colors">Warna Emas</h5>
                            </GlitchReveal>
                          </div>
                          <p className="text-gray-400 leading-relaxed">
                            Memiliki arti kejayaan, kesuksesan, optimisme, dan prestasi. Warna emas juga salah satu warna dari logo Universitas Brawijaya yang menandakan bagian integral dari kampus.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center group bg-white/5 p-4 rounded-2xl md:bg-transparent md:p-0">
                        <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-all duration-300 relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                          <img src="/LandingBuatBEST/filosofi/bintang.png" alt="Filosofi Bintang" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Star className="w-5 h-5 text-primary fill-primary/20" />
                            <GlitchReveal>
                              <h5 className="text-xl font-sans font-bold text-white group-hover:text-primary transition-colors">Bintang</h5>
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