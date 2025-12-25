import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-primary/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <Logo className="h-12 w-auto mr-4 grayscale hover:grayscale-0 transition-all duration-300" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-white tracking-wider">BRAWIJAYA ESPORT</span>
            <span className="text-xs text-gray-500 mt-1">© 2023 All rights reserved</span>
          </div>
        </div>
        <div className="flex space-x-8 text-sm text-gray-500">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Credits</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;