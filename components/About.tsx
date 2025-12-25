import React from 'react';
import Reveal from './Reveal';
import CountUp from './CountUp';
import TextScramble from './TextScramble';
import { Trophy, Users, Gamepad2 } from 'lucide-react';
import ParallaxSection from './ParallaxSection';

const About: React.FC = () => {
  const stats = [
    { label: 'Anggota', end: 800, suffix: '+', icon: Users },
    { label: 'Prestasi', end: 50, suffix: '+', icon: Trophy },
    { label: 'Divisi Game', end: 10, suffix: '+', icon: Gamepad2 },
  ];

  return (
    <ParallaxSection
      id="about"
      className="py-20 md:py-32"
      backgroundContent={
        <>
          {/* Background - smooth transition from Hero */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none"></div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,215,0,1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,215,0,1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />

          {/* Parallax glow orbs */}
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1s' }}></div>
        </>
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <Reveal direction="left">
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-display text-xs font-bold tracking-[0.15em] uppercase">
                Profile
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-5xl font-display font-black mb-6 leading-tight">
              <span className="text-white">Membangun</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                <TextScramble text="Ekosistem Esport" />
              </span>
              <span className="text-white"> Kampus</span>
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-4 leading-relaxed text-base md:text-lg">
              Unit Kegiatan Mahasiswa (UKM) Brawijaya E-Sport (BEST) adalah wadah bagi mahasiswa Universitas Brawijaya yang berminat di bidang e-sports. Didirikan pada 1 Januari 2021, UKM ini bertujuan mengembangkan potensi mahasiswa melalui komunitas game aktif dan event rutin, dengan lebih dari 800 anggota.
            </p>
            <p className="text-gray-400 mb-8 leading-relaxed text-base md:text-lg">
              BEST juga membina tim e-sports UB untuk berkompetisi di tingkat regional dan nasional. Beberapa cabang yang dikembangkan meliputi Mobile Legends, PUBG Mobile, dan Valorant. Dengan menjunjung sportivitas dan prestasi, BEST berkomitmen menjadi pusat pengembangan e-sports mahasiswa di Universitas Brawijaya.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <Reveal key={index} delay={index * 150} direction="up" className="h-full">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group h-full flex flex-col items-center justify-center text-center">
                    <stat.icon className="w-5 h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <span className="block text-2xl md:text-3xl font-display font-black text-white">
                      <CountUp end={stat.end} suffix={stat.suffix} />
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mt-1">{stat.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={200}>
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-3xl scale-110"></div>

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-primary/20 shadow-[0_0_60px_rgba(255,215,0,0.1)]">
                <img
                  alt="Esport Team Gaming Setup"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                {/* Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-sm border border-primary/30">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="font-display text-primary font-bold tracking-widest text-sm">HOME OF CHAMPIONS</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </ParallaxSection>
  );
};

export default About;