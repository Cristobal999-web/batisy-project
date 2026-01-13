'use client';

import { motion } from 'framer-motion';
import { Battery, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Tecnología', href: '#technology' },
    { label: 'Modelos', href: '#models' },
    { label: 'Suscripción', href: '#subscription' },
    { label: 'Inversores', href: '#footer' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <Battery className="w-8 h-8 text-primary" />
            <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-primary/50 transition-all duration-300" />
          </div>
          <span className="text-2xl font-bold tracking-tight">BATISY</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button className="btn-primary text-sm">
            Reservar Ahora
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-foreground p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass mt-4 mx-4 rounded-2xl p-6"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-lg font-medium text-muted hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="btn-primary mt-4 w-full">
              Reservar Ahora
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
