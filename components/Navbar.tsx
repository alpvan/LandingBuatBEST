import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ShoppingBag } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          // Detect active section
          const sections = ['about', 'organization', 'prestasi', 'events', 'committee', 'contact'];
          let currentSection = '';

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section;
                break;
              }
            }
          }
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Profile', href: '#about', id: 'about' },
    { name: 'Pengurus', href: '#organization', id: 'organization' },
    { name: 'Prestasi', href: '#prestasi', id: 'prestasi' },
    { name: 'Acara', href: '#events', id: 'events' },
    { name: 'Saran', href: '#contact', id: 'contact' },
  ] as Array<{ name: string; href: string; id: string; external?: boolean }>;

  return (
    <nav
      className={`fixed top-3 left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl z-50 transition-all duration-500 rounded-full ${isScrolled
        ? 'shadow-[0_4px_20px_rgba(0,0,0,0.3)] bg-black/50 backdrop-blur-xl border border-white/10 py-0.5'
        : 'bg-black/20 backdrop-blur-md border border-white/5 py-1'
        }`}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="px-4 md:px-5">
        <div className="flex items-center justify-between h-12">
          {/* Logo Section */}
          <div
            className={`flex items-center flex-shrink-0 cursor-pointer transition-all duration-500 group ${isScrolled ? 'scale-95' : 'scale-100'
              }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <Logo className="h-9 w-auto" />
              {/* Logo glow on hover */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-150"></div>
            </div>
            <div className="ml-3 flex flex-col">
              <span className="font-sans font-black text-base tracking-wide leading-tight">
                <span className="text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">BRAWIJAYA</span>
              </span>
              <span className="font-sans font-medium text-xs tracking-[0.3em] text-gray-400">ESPORT</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-1 bg-white/5 rounded-xl p-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={`relative px-4 py-2 rounded-lg font-sans text-xs font-medium uppercase tracking-wider transition-all duration-300 ${activeSection === link.id
                    ? 'text-black bg-primary shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
            {/* Theme Toggle */}
            <div className="ml-3">
              <ThemeToggle />
            </div>
            {/* CTA Button */}
            <a
              href="https://www.instagram.com/brawijayaesports.store/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-black font-sans text-xs font-bold uppercase tracking-wider 
                         hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 
                         transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Merchandise
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative p-2.5 rounded-xl transition-all duration-300 ${isMobileMenuOpen
                ? 'bg-primary text-black'
                : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <div className="px-4 py-4 border-t border-white/10 bg-black/50 backdrop-blur-xl rounded-b-2xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl font-sans text-sm font-medium transition-all duration-300 ${activeSection === link.id
                  ? 'bg-primary text-black'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></span>
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://www.instagram.com/brawijayaesports.store/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-yellow-400 text-black font-sans text-sm font-bold transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4" />
              Merchandise
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;