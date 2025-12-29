import React, { useState } from 'react';
import Reveal from './Reveal';
import RegistrationModal from './RegistrationModal';
import EventDetailsModal from './EventDetailsModal';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';
import GlitchReveal from './GlitchReveal';
import ParallaxSection from './ParallaxSection';

const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [detailEvent, setDetailEvent] = useState<any | null>(null);

  const events = [
    {
      date: '99',
      month: 'Januari 2026',
      title: 'Open Recruitment Batch 2',
      desc: 'aca apa ja yang terdekat nanti',
      btn: 'Daftar',
      active: true,
      details: {
        schedule: '15 Nov - 30 Nov 2023',
        location: 'Online Registration',
        prizePool: 'N/A',
        teams: 'All Game Divisions',
        fullDesc: 'Join the family! We are opening recruitment for Mobile Legends, PUBG Mobile, Valorant, Dota 2, and more.'
      }
    },
    {
      date: '99',
      month: 'Januari 2026',
      title: 'Nama Event',
      desc: 'aca apa ja yang terdekat nanti',
      tag: 'Members Only',
      active: false,
      details: {
        schedule: 'Serah',
        location: 'Di Mana Mana',
        prizePool: 'Duwek',
        teams: 'Se antero dunia',
        fullDesc: 'Yang Bikin Website butuh duit'
      }
    },
    {
      date: '99',
      month: 'Januari 2026',
      title: 'Nama Event',
      desc: 'aca apa ja yang terdekat nanti',
      btn: 'Info',
      active: true,
      details: {
        schedule: 'Serah',
        location: 'Di Mana Mana',
        prizePool: 'Duwek',
        teams: 'Se antero dunia',
        fullDesc: 'Yang Bikin Website butuh duit'
      }
    },
  ];

  const handleRegisterClick = (title: string, action?: string) => {
    if (action === 'Daftar') {
      setSelectedEvent(title);
    } else if (action === 'Info') {
      const evt = events.find(e => e.title === title);
      if (evt) setDetailEvent(evt);
    }
  };

  return (
    <>
      <ParallaxSection
        id="events"
        className="py-20 md:py-32"
        backgroundContent={
          <>


            {/* Parallax glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1s' }}></div>
          </>
        }
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              {/* Badge */}
              <GlitchReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30 mx-auto">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary font-display text-xs font-bold tracking-[0.15em] uppercase">
                    Acara
                  </span>
                </div>
              </GlitchReveal>

              {/* Title */}
              <GlitchReveal>
                <h3 className="text-3xl md:text-5xl font-display font-black">
                  <span className="text-white">Jadwal </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                    Mendatang
                  </span>
                </h3>
              </GlitchReveal>
            </div>
          </Reveal>

          <div className="space-y-4">
            {events.map((event, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className={`flex flex-col md:flex-row gap-6 items-center p-6 rounded-2xl transition-all duration-300 group ${event.active
                  ? 'bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]'
                  : 'bg-white/[0.02] border border-white/5 opacity-60 hover:opacity-100'
                  }`}>
                  {/* Date */}
                  <div className="flex-shrink-0 text-center md:text-left min-w-[100px] md:border-r md:border-white/10 md:pr-6">
                    <span className={`block text-4xl font-display font-black transition-colors ${event.active ? 'text-primary group-hover:text-white' : 'text-gray-500'
                      }`}>
                      {event.date}
                    </span>
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                      {event.month}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow text-center md:text-left">
                    <h4 className={`text-xl font-bold font-display transition-colors mb-2 ${event.active ? 'text-white group-hover:text-primary' : 'text-gray-300'
                      }`}>
                      {event.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3">{event.desc}</p>
                    <button
                      onClick={() => setDetailEvent(event)}
                      className="text-primary text-xs font-bold uppercase tracking-wider hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      Pelajari Lebih Lanjut <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    {event.btn ? (
                      <button
                        onClick={() => handleRegisterClick(event.title, event.btn)}
                        className={`px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${event.active
                          ? 'bg-gradient-to-r from-primary to-yellow-400 text-black hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:scale-105'
                          : 'bg-white/5 border border-white/20 text-white hover:border-primary hover:text-primary'
                          }`}
                      >
                        {event.btn}
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-gray-500 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                        {event.tag}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      <RegistrationModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventName={selectedEvent || ''}
      />

      <EventDetailsModal
        isOpen={!!detailEvent}
        onClose={() => setDetailEvent(null)}
        event={detailEvent}
        onRegister={() => {
          if (detailEvent?.btn === 'Daftar') {
            setDetailEvent(null);
            setSelectedEvent(detailEvent.title);
          }
        }}
      />
    </>
  );
};

export default Events;