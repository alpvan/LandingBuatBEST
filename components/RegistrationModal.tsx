import React, { useState, useEffect } from 'react';
import { X, CheckCircle, User, FileDigit, Gamepad2, School } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, eventName }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Hide navbar when modal opens
  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (isOpen) {
      setIsAnimating(true);
      setIsSubmitted(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-lg bg-surface-dark border border-primary/30 shadow-[0_0_50px_rgba(255,215,0,0.1)] transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
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

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <div className="mb-8 border-b border-gray-800 pb-4">
                <h4 className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-2">Pendaftaran Acara</h4>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight">
                  {eventName}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-3 h-3" /> Nama Lengkap
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-surface-dark-2 border border-gray-700 p-3 text-white focus:border-primary focus:outline-none focus:shadow-glow transition-all rounded-sm"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <FileDigit className="w-3 h-3" /> NIM
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-surface-dark-2 border border-gray-700 p-3 text-white focus:border-primary focus:outline-none focus:shadow-glow transition-all rounded-sm"
                      placeholder="mis. 215150..."
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <School className="w-3 h-3" /> Fakultas
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-surface-dark-2 border border-gray-700 p-3 text-white focus:border-primary focus:outline-none focus:shadow-glow transition-all rounded-sm"
                      placeholder="mis. Filkom"
                    />
                  </div>
                </div>



                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-black font-display font-bold text-lg py-4 hover:bg-white hover:shadow-glow transition-all duration-300 clip-polygon"
                  >
                    KONFIRMASI PENDAFTARAN
                  </button>

                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10 text-primary drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">Pendaftaran Berhasil!</h3>
              <p className="text-gray-400 mb-8 max-w-xs">
                Anda berhasil mendaftar untuk <span className="text-primary">{eventName}</span>. Periksa email Anda untuk instruksi lebih lanjut.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 font-bold uppercase tracking-wider text-sm"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;