import { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, Download, ChevronDown, MessageCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useMouseParallax } from '../hooks/useMouseParallax';

const ROLES = [
  'Python Full Stack Developer',
  'Front-end Developer',
  'Back-end Developer',
  ' Database Expert',
  'Problem Solver & Builder',
  'Innovator',
];

function useTypewriter(texts: string[], speed = 60, pauseMs = 2000) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setDeleting(true); }, pauseMs);
      return () => clearTimeout(t);
    }
    const currentText = texts[textIdx];
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < currentText.length) {
          setDisplay(currentText.slice(0, charIdx + 1));
          setCharIdx(c => c + 1);
        } else {
          setIsPaused(true);
        }
      } else {
        if (charIdx > 0) {
          setDisplay(currentText.slice(0, charIdx - 1));
          setCharIdx(c => c - 1);
        } else {
          setDeleting(false);
          setTextIdx(i => (i + 1) % texts.length);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, isPaused, textIdx, texts, speed, pauseMs]);

  return display;
}

const ORBIT_BADGES = [
  { label: 'React', icon: '⚛️', delay: '0s', radius: 130 },
  { label: 'Django', icon: '🐍', delay: '-6.67s', radius: 130 },
  { label: 'MySQL', icon: '🗄️', delay: '-13.33s', radius: 130 },
];

export default function Hero() {
  const { isDark } = useTheme();
  const mouse = useMouseParallax();
  const [showLightbox, setShowLightbox] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const roleText = useTypewriter(ROLES);

  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: y * -12, y: x * 12 });
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: personalInfo.socialLinks[0].url, label: 'GitHub' },
    { icon: <Linkedin size={20} />, href: personalInfo.socialLinks[1].url, label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: personalInfo.socialLinks[2].url, label: 'Email' },
    { icon: <MessageCircle size={20} />, href: personalInfo.socialLinks[3].url, label: 'WhatsApp' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Mouse-reactive section glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(600px circle at ${50 + mouse.x * 20}% ${50 + mouse.y * 20}%, rgba(139,92,246,0.08) 0%, transparent 60%)`,
          transition: 'background 0.3s ease',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-24">

          {/* Left — Text Content */}
          <div
            className="order-2 lg:order-1 space-y-8"
            style={{
              transform: `translate(${mouse.x * -6}px, ${mouse.y * -6}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-teal/30 bg-cosmic-teal/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cosmic-teal animate-pulse" style={{ boxShadow: '0 0 8px #00F5D4' }} />
              <span className="text-cosmic-teal text-sm font-medium tracking-wider">Available for Opportunities</span>
            </div>

            {/* Name with glitch */}
            <div>
              <h1
                className="glitch-text text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-none whitespace-nowrap"
                data-text={personalInfo.name}
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #00F5D4 40%, #00D9FF 70%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: '"Orbitron", monospace',
                }}
              >
                {personalInfo.name}
              </h1>
            </div>

            {/* Typewriter role */}
            <div className="h-12 flex items-center">
              <span
                className={`text-xl sm:text-2xl font-semibold typewriter-cursor ${isDark ? 'text-cosmic-blue' : 'text-cosmic-blue'}`}
                style={{ textShadow: '0 0 20px rgba(0,217,255,0.5)' }}
              >
                {roleText}
              </span>
            </div>

            {/* Bio */}
            <p className={`text-lg leading-relaxed max-w-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {personalInfo.valueStatement}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6, #00D9FF)',
                  boxShadow: '0 0 20px rgba(139,92,246,0.4)',
                }}
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold border-2 transition-all duration-300 hover:scale-105 ${isDark
                  ? 'border-cosmic-teal/50 text-cosmic-teal hover:bg-cosmic-teal/10 hover:border-cosmic-teal hover:shadow-[0_0_20px_rgba(0,245,212,0.3)]'
                  : 'border-cosmic-teal text-cosmic-teal hover:bg-cosmic-teal hover:text-gray-900'
                  }`}
              >
                <Download size={18} />
                Resume
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`p-3 rounded-xl border transition-all duration-300 hover:scale-110 ${isDark
                    ? 'border-white/10 bg-white/5 text-gray-400 hover:border-cosmic-teal/50 hover:text-cosmic-teal hover:bg-cosmic-teal/10 hover:shadow-[0_0_15px_rgba(0,245,212,0.3)]'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-cosmic-teal hover:text-cosmic-teal shadow-sm hover:shadow-[0_0_10px_rgba(0,245,212,0.3)]'
                    }`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — 3D Profile Card */}
          <div
            className="order-1 lg:order-2 flex items-center justify-center"
            style={{
              transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            {/* Orbiting badges */}
            <div className="relative" style={{ width: 320, height: 320 }}>
              {/* Orbit ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-cosmic-purple/20"
                style={{ top: '50%', left: '50%', width: 290, height: 290, transform: 'translate(-50%,-50%)' }}
              />

              {/* Floating Buttons */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute left-1/2 -top-8 -translate-x-1/2 pointer-events-auto">
                  <button className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-[0.15em] transition-all duration-300 border backdrop-blur-md hover:animate-shake cursor-pointer whitespace-nowrap
                    ${isDark ? 'bg-cosmic-black/80 border-cosmic-purple/40 text-cosmic-blue shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:border-cosmic-blue hover:text-white' : 'bg-white/90 border-cosmic-purple/30 text-cosmic-purple shadow-sm hover:shadow-md hover:border-cosmic-purple hover:bg-cosmic-purple hover:text-white'}`}>
                    PROBLEM SOLVER
                  </button>
                </div>
                <div className="absolute top-1/2 -left-20 -translate-y-1/2 pointer-events-auto">
                  <button className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-[0.15em] transition-all duration-300 border backdrop-blur-md hover:animate-shake cursor-pointer whitespace-nowrap
                    ${isDark ? 'bg-cosmic-black/80 border-cosmic-purple/40 text-cosmic-blue shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:border-cosmic-blue hover:text-white' : 'bg-white/90 border-cosmic-purple/30 text-cosmic-purple shadow-sm hover:shadow-md hover:border-cosmic-purple hover:bg-cosmic-purple hover:text-white'}`}>
                    INNOVATOR
                  </button>
                </div>
                <div className="absolute top-1/2 -right-20 -translate-y-1/2 pointer-events-auto">
                  <button className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-[0.15em] transition-all duration-300 border backdrop-blur-md hover:animate-shake cursor-pointer whitespace-nowrap
                    ${isDark ? 'bg-cosmic-black/80 border-cosmic-purple/40 text-cosmic-blue shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(0,217,255,0.4)] hover:border-cosmic-blue hover:text-white' : 'bg-white/90 border-cosmic-purple/30 text-cosmic-purple shadow-sm hover:shadow-md hover:border-cosmic-purple hover:bg-cosmic-purple hover:text-white'}`}>
                    DEVELOPER
                  </button>
                </div>
              </div>



              {ORBIT_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="absolute"
                  style={{
                    top: '50%', left: '50%',
                    width: 0, height: 0,
                    animation: `orbit 20s linear infinite`,
                    animationDelay: badge.delay,
                  }}
                >
                  <div
                    className={`absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md whitespace-nowrap ${isDark
                      ? 'bg-cosmic-black/80 border-cosmic-purple/40 text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]'
                      : 'bg-white/90 border-cosmic-purple/30 text-gray-800 shadow-md'
                      }`}
                    style={{ transform: `translate(-50%, -50%)` }}
                  >
                    <span>{badge.icon}</span>
                    {badge.label}
                  </div>
                </div>
              ))}

              {/* 3D Profile Card */}
              <div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setShowLightbox(true)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  transform: `translate(-50%, -50%) perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <div
                  className={`relative w-52 h-52 rounded-2xl overflow-hidden border-2 ${isDark ? 'border-cosmic-purple/50' : 'border-cosmic-purple/30'
                    }`}
                  style={{
                    boxShadow: isDark
                      ? `0 0 30px rgba(139,92,246,0.4), 0 0 60px rgba(0,217,255,0.2), inset 0 0 20px rgba(139,92,246,0.1)`
                      : `0 20px 60px rgba(139,92,246,0.2), 0 0 30px rgba(0,217,255,0.1)`,
                  }}
                >
                  <div className="w-full h-full relative group bg-cosmic-black">
                    <img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover opacity-30 blur-xl scale-110 group-hover:blur-md transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-full border border-cosmic-teal/40 bg-cosmic-teal/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-cosmic-teal/20 transition-all duration-300 shadow-[0_0_15px_rgba(0,245,212,0.2)]">
                        <svg className="w-6 h-6 text-cosmic-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-cosmic-teal mt-3 tracking-[0.2em]">VIEW PROFILE</span>
                    </div>
                  </div>
                  {/* Holographic overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(
                        ${135 + tilt.y * 2}deg,
                        rgba(0,245,212,0.08) 0%,
                        transparent 40%,
                        rgba(139,92,246,0.08) 100%
                      )`,
                    }}
                  />
                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-bold">{personalInfo.name}</p>
                    <p className="text-cosmic-teal text-xs">Full Stack Developer</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className={`text-xs tracking-widest font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            SCROLL
          </span>
          <button
            onClick={scrollToAbout}
            className={`p-2 rounded-full border animate-bounce transition-colors ${isDark
              ? 'border-cosmic-teal/30 text-cosmic-teal hover:bg-cosmic-teal/10'
              : 'border-cosmic-teal/50 text-cosmic-teal hover:bg-cosmic-teal/10'
              }`}
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <div className="relative max-w-sm w-full">
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.name}
              className="w-full rounded-2xl shadow-[0_0_60px_rgba(139,92,246,0.5)]"
            />
            <div className="text-center mt-4">
              <h3 className="text-white text-2xl font-bold">{personalInfo.name}</h3>
              <p className="text-cosmic-teal">{personalInfo.title}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
