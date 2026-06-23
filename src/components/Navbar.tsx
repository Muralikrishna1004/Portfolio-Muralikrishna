import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo, publications } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'timeline', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    ...(publications.length > 0 ? [{ id: 'publications', label: 'Publications' }] : []),
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-cosmic-black/80 backdrop-blur-lg border-b border-cosmic-purple/20 shadow-[0_4px_30px_rgba(139,92,246,0.15)]'
            : 'bg-white/80 backdrop-blur-lg border-b border-cosmic-blue/20 shadow-[0_4px_30px_rgba(0,217,255,0.1)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className={`font-bold text-xl transition-colors drop-shadow-md ${
              isDark ? 'text-white hover:text-cosmic-teal hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.8)]' : 'text-gray-900 hover:text-cosmic-blue'
            }`}
          >
            MK
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? isDark
                      ? 'bg-cosmic-purple/20 text-cosmic-teal shadow-[inset_0_0_10px_rgba(139,92,246,0.3)] border border-cosmic-purple/30'
                      : 'bg-cosmic-blue/10 text-cosmic-blue border border-cosmic-blue/20'
                    : isDark
                    ? 'text-gray-300 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}


            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-2 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white hover:shadow-[0_0_20px_rgba(0,217,255,0.6)]'
                  : 'bg-gradient-to-r from-cosmic-blue to-cosmic-teal text-white shadow-[0_0_15px_rgba(0,217,255,0.3)]'
              }`}
            >
              <Download size={16} />
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'text-gray-300 hover:bg-white/10' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`px-4 py-4 space-y-1 ${
            isDark ? 'bg-cosmic-black/98 backdrop-blur-md border-b border-cosmic-purple/30' : 'bg-white/98'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? isDark
                    ? 'bg-cosmic-purple/20 text-cosmic-teal shadow-[inset_0_0_10px_rgba(139,92,246,0.3)]'
                    : 'bg-cosmic-blue/10 text-cosmic-blue'
                  : isDark
                  ? 'text-gray-300 hover:bg-white/5'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 mt-2 ${
              isDark
                ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white shadow-[0_0_15px_rgba(0,217,255,0.4)]'
                : 'bg-gradient-to-r from-cosmic-blue to-cosmic-teal text-white shadow-[0_0_15px_rgba(0,217,255,0.3)]'
            }`}
          >
            <Download size={16} />
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
