import React from 'react';
import Reveal from './Reveal';

const TeamLogos: React.FC = () => {
  const teams = [
    { name: 'Mobile Legends', id: 'MLBB' },
    { name: 'PUBG Mobile', id: 'PUBGM' },
    { name: 'Valorant', id: 'VAL' },
    { name: 'Dota 2', id: 'DOTA2' },
    { name: 'Free Fire', id: 'FF' },
    { name: 'E-Football', id: 'PES' },
  ];

  return (
    <section className="py-12 bg-background-dark border-y border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <Reveal>
            <h3 className="text-gray-500 font-sans text-xs font-bold tracking-[0.3em] uppercase mb-8">
              Official Game Divisions
            </h3>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-12 w-full">
            {teams.map((team, index) => (
              <Reveal key={index} delay={index * 100} direction="up">
                <div
                  className="group flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-24 h-24 rounded-full bg-surface-dark-2 border border-gray-800 flex items-center justify-center p-4 group-hover:border-primary group-hover:shadow-glow transform group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={`https://placehold.co/150x150/1A1A1A/FFD700?text=${team.id}&font=orbitron`}
                      alt={`${team.name} Logo`}
                      className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-sans font-bold text-gray-500 group-hover:text-primary transition-colors tracking-wider text-center">
                    {team.name}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamLogos;