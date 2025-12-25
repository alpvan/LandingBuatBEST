import React from 'react';
import Reveal from './Reveal';
import { MapPin, Mail, Instagram, MessageCircle, Send, Building } from 'lucide-react';
import ParallaxSection from './ParallaxSection';

const Contact: React.FC = () => {
  return (
    <ParallaxSection
      id="contact"
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

          {/* Parallax glow orbs */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'glowPulse 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" style={{ animation: 'glowPulse 5s ease-in-out infinite 1.5s' }}></div>
        </>
      }
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          <Reveal direction="left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-primary/20 to-amber-500/20 border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-display text-xs font-bold tracking-[0.15em] uppercase">
                Hubungi Kami
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-5xl font-display font-black mb-6 leading-tight">
              <span className="text-white">Siap </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-300 to-amber-400">
                Bergabung?
              </span>
            </h3>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Punya pertanyaan seputar keanggotaan, sponsorship, atau ajakan sparring? Kirimkan pesan kepada kami.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="text-primary w-5 h-5" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">Gedung UKM Universitas Brawijaya, Malang</span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-amber-500/20 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="text-primary w-5 h-5" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">official@brawijayaesport.id</span>
              </div>

              {/* Social Links */}
              <div className="pt-6 flex gap-3">
                {[
                  { icon: Instagram, label: 'Instagram' },
                  { icon: MessageCircle, label: 'Discord' },
                  { icon: Send, label: 'Telegram' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={200}>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 relative">
              {/* Corner accents */}
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-primary rounded-tr-xl"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-primary rounded-bl-xl"></div>

              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">Nama</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder-gray-600"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-primary tracking-widest uppercase mb-2">Pesan</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your message here..."
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder-gray-600 resize-none"
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-black font-bold font-display uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </Reveal>

        </div>

        {/* Map */}
        <Reveal delay={300} direction="up">
          <div className="mt-16 relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
            <iframe
              title="Map"
              allowFullScreen
              className="absolute inset-0 w-full h-full grayscale transition-all duration-500 group-hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.448744093874!2d112.61280387588893!3d-7.952479992072044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78827926715555%3A0x629553018260388f!2sStudent%20Activity%20Center%20Universitas%20Brawijaya!5e0!3m2!1sen!2sid!4v1715424000000!5m2!1sen!2sid"
              style={{ filter: 'invert(92%) contrast(83%)', border: 0 }}
            ></iframe>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-6 left-6 p-4 rounded-xl bg-black/80 backdrop-blur-sm border border-primary/30 max-w-xs">
              <div className="flex items-start gap-3">
                <Building className="text-primary mt-1 w-6 h-6" />
                <div>
                  <h4 className="text-white font-display font-bold text-sm tracking-wide mb-1">MARKAS BESAR</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Gedung UKM Universitas Brawijaya<br />Jalan Veteran, Malang</p>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-primary text-[10px] font-bold uppercase mt-2 inline-block hover:underline">
                    Buka di Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </ParallaxSection>
  );
};

export default Contact;