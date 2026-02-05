import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Trophy, Clock, MapPin } from 'lucide-react';

interface EventDetails {
  schedule: string;
  teams: string;
  prizePool: string;
  fullDesc: string;
  location?: string;
}

interface EventData {
  title: string;
  date: string;
  month: string;
  details?: EventDetails;
  btn?: string;
  active: boolean;
  desc: string;
}

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData | null;
  onRegister: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({ isOpen, onClose, event, onRegister }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Hide navbar when modal opens
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
      if (navbar) {
        navbar.style.transform = 'translateX(-50%) translateY(-150%)';
        navbar.style.opacity = '0';
      }
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      if (navbar) {
        navbar.style.transform = 'translateX(-50%) translateY(0)';
        navbar.style.opacity = '1';
      }
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;
  if (!event) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl bg-surface-dark border border-primary/30 shadow-[0_0_50px_rgba(255,215,0,0.1)] transform transition-all duration-300 flex flex-col max-h-[90vh] ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 overflow-y-auto custom-scrollbar">
          <div className="mb-6 border-b border-gray-800 pb-6">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2 block">Detail Acara</span>
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white leading-tight mb-4">{event.title}</h2>
            <div className="flex flex-wrap items-center text-gray-400 text-sm gap-6">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {event.date} {event.month}</span>
              {event.details?.location && <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.details.location}</span>}
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <h4 className="text-white font-sans font-bold text-lg mb-2">Deskripsi</h4>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
              {event.details?.fullDesc || event.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-surface-dark-2 p-4 border border-gray-800 rounded-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Jadwal</span>
              </div>
              <p className="text-sm text-white font-medium">{event.details?.schedule || "TBA"}</p>
            </div>
            <div className="bg-surface-dark-2 p-4 border border-gray-800 rounded-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Users className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Peserta</span>
              </div>
              <p className="text-sm text-white font-medium">{event.details?.teams || "Terbuka untuk Semua"}</p>
            </div>
            <div className="bg-surface-dark-2 p-4 border border-gray-800 rounded-sm hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Trophy className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Hadiah</span>
              </div>
              <p className="text-sm text-white font-medium">{event.details?.prizePool || "Sertifikat & Kehormatan"}</p>
            </div>
          </div>

          {(event.btn === 'Daftar' || event.btn === 'Info') && event.active && (
            <div className="pt-4 border-t border-gray-800">
              <button
                onClick={onRegister}
                className="w-full bg-primary text-black font-sans font-bold text-lg py-4 hover:bg-white hover:shadow-glow transition-all duration-300 clip-polygon uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {event.btn === 'Daftar' ? 'Daftar Sekarang' : 'Informasi Lebih Lanjut'}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Pendaftaran ditutup 2 hari sebelum acara dimulai.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsModal;