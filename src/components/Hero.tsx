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

export default function Hero() {
  const { isDark } = useTheme();
  const mouse = useMouseParallax();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const roleText = useTypewriter(ROLES);
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    
    // Open the terminal simulation page served from public in a new tab
    window.open('/run.html', '_blank');
    
    setTimeout(() => {
      setIsRunning(false);
    }, 1500);
  };

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        {/* On lg screens: side-by-side layout. On mobile/tablet: stacked flex-col */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 min-h-[calc(100vh-120px)] w-full py-12">

          {/* Left Side: Content Section (Name, Typewriter, Badge, Bio, Buttons, Socials) */}
          <div
            className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-2xl w-full"
            style={{
              transform: `translate(${mouse.x * -6}px, ${mouse.y * -6}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          >
            {/* Badge */}
            <div className="flex lg:justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cosmic-teal/30 bg-cosmic-teal/5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-cosmic-teal animate-pulse" style={{ boxShadow: '0 0 8px #00F5D4' }} />
                <span className="text-cosmic-teal text-sm font-medium tracking-wider">Available for Opportunities</span>
              </div>
            </div>

            {/* Name with glitch */}
            <div className="w-full">
              <h1
                className="glitch-text text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-none text-center lg:text-left inline-block whitespace-nowrap"
                data-text="Hello I'm Murali Krishna"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #00F5D4 40%, #00D9FF 70%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: '"Orbitron", monospace',
                }}
              >
                Hello I'm Murali Krishna
              </h1>
            </div>

            {/* Typewriter role */}
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <span
                className={`text-xl sm:text-3xl font-semibold typewriter-cursor ${isDark ? 'text-cosmic-blue' : 'text-cosmic-blue'}`}
                style={{ textShadow: '0 0 20px rgba(0,217,255,0.5)' }}
              >
                {roleText}
              </span>
            </div>

            {/* Bio with custom decorative border and background */}
            <div
              className="relative p-[1.5px] rounded-2xl overflow-hidden w-full group/bio"
              style={{
                boxShadow: isDark 
                  ? '0 0 25px rgba(139,92,246,0.15)' 
                  : '0 4px 25px rgba(0,217,255,0.08)'
              }}
            >
              {/* Rotating background gradient for the border */}
              <div 
                className="absolute inset-[-500%] animate-border-spin pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, #00F5D4 0%, #00D9FF 25%, #8B5CF6 50%, #00D9FF 75%, #00F5D4 100%)',
                }}
              />

              {/* Inside Content Card */}
              <div
                className={`relative p-5 rounded-2xl backdrop-blur-xl transition-all duration-500 w-full h-full z-10
                  ${isDark ? 'bg-cosmic-black/90 text-gray-300' : 'bg-white/95 text-gray-700'}`}
              >
                {/* Corner tech accents/glow lines */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cosmic-teal/40 group-hover/bio:border-cosmic-teal transition-colors duration-500 rounded-tl-md" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cosmic-purple/40 group-hover/bio:border-cosmic-purple transition-colors duration-500 rounded-br-md" />
                
                <p className="text-base sm:text-lg leading-relaxed relative z-10">
                  {personalInfo.valueStatement}
                </p>
              </div>
            </div>

            {/* CTA Buttons & Social Icons */}
            <div className="space-y-6 w-full flex flex-col items-center lg:items-start">
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
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
              <div className="flex items-center gap-3 justify-center lg:justify-start">
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
          </div>

          {/* Right Side: Coding IDE Window Mockup */}
          <div
            className="flex-1 flex items-center justify-center py-8 lg:py-0 w-full"
            style={{
              transform: `translate(${mouse.x * 6}px, ${mouse.y * 6}px)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            <div className="relative w-full max-w-xl px-12 py-10">
              {/* Floating ambient role badges positioned safely inside the padding boundary with z-20 */}
              <div className="absolute top-0 left-6 z-20 px-4 py-2 rounded-xl bg-cosmic-blue/10 border border-cosmic-blue/20 flex items-center justify-center text-cosmic-blue text-xs font-bold font-mono animate-float-slow backdrop-blur-sm shadow-[0_0_15px_rgba(0,217,255,0.1)] whitespace-nowrap">
                Developer
              </div>
              <div className="absolute bottom-0 right-6 z-20 px-4 py-2 rounded-xl bg-cosmic-purple/10 border border-cosmic-purple/20 flex items-center justify-center text-cosmic-purple text-xs font-bold font-mono animate-float-delayed backdrop-blur-sm shadow-[0_0_15px_rgba(139,92,246,0.1)] whitespace-nowrap">
                Tech Enthusiast
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-6 z-20 px-4 py-2 rounded-xl bg-cosmic-teal/10 border border-cosmic-teal/20 flex items-center justify-center text-cosmic-teal text-xs font-bold font-mono animate-float-slow backdrop-blur-sm shadow-[0_0_15px_rgba(0,245,212,0.1)] whitespace-nowrap">
                Innovator
              </div>

              {/* Code window */}
              <div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className={`w-full rounded-2xl border ${
                  isDark
                    ? 'bg-cosmic-black/90 border-cosmic-purple/40 shadow-[0_0_35px_rgba(139,92,246,0.2)]'
                    : 'bg-white border-cosmic-purple/20 shadow-[0_20px_40px_rgba(139,92,246,0.1)]'
                } overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-cosmic-blue/50 hover:shadow-[0_0_40px_rgba(0,217,255,0.35)]`}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {/* Header bar */}
                <div className={`flex items-center justify-between px-4 py-3.5 border-b ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-gray-100/80 border-gray-200'
                }`}>
                  <div className="flex gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRunCode}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[10px] font-bold border transition-all duration-300 ${
                        isRunning
                          ? 'bg-cosmic-teal/20 border-cosmic-teal text-cosmic-teal shadow-[0_0_10px_rgba(0,245,212,0.3)] animate-pulse'
                          : isDark
                          ? 'bg-white/5 border-white/10 text-gray-400 hover:border-cosmic-teal/50 hover:text-cosmic-teal hover:bg-cosmic-teal/5 hover:shadow-[0_0_10px_rgba(0,245,212,0.2)]'
                          : 'bg-gray-200/50 border-gray-300 text-gray-600 hover:border-cosmic-teal hover:text-cosmic-teal hover:bg-cosmic-teal/10 shadow-sm'
                      }`}
                    >
                      <span className="text-[8px]">▶</span> {isRunning ? 'RUNNING...' : 'RUN CODE'}
                    </button>
                    <span className={`text-xs font-mono font-medium tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      portfolio.js
                    </span>
                  </div>
                </div>

                {/* Editor Content */}
                <div className="p-6 sm:p-8 font-mono text-sm sm:text-base leading-relaxed text-left relative overflow-hidden bg-black/40 min-h-[220px]">
                  {/* Vertical indicator bar on right edge */}
                  <div className="absolute right-4 top-4 bottom-4 w-[2px] bg-cosmic-blue/80 shadow-[0_0_12px_#00D9FF] animate-pulse" />

                  {/* Code structure */}
                  <div className="space-y-3 relative z-10 select-none">
                    <div>
                      <span className="text-[#ff79c6] font-semibold">const</span>{' '}
                      <span className="text-[#50fa7b]">developer</span>{' '}
                      <span className="text-[#ff79c6]">=</span>{' '}
                      <span className="text-[#f8f8f2]">{'{'}</span>
                    </div>

                    <div className="pl-6">
                      <span className="text-[#ffb86c]">name</span>
                      <span className="text-[#f8f8f2]">:</span>{' '}
                      <span className="text-[#f1fa8c]">'Murali Krishna'</span>
                      <span className="text-[#f8f8f2]">,</span>
                    </div>

                    <div className="pl-6">
                      <span className="text-[#ffb86c]">role</span>
                      <span className="text-[#f8f8f2]">:</span>{' '}
                      <span className="text-[#f1fa8c]">'Python Full Stack'</span>
                    </div>

                    <div>
                      <span className="text-[#f8f8f2]">{'}'};</span>
                    </div>

                    <div className="h-2" />

                    <div>
                      <span className="text-[#ff79c6] font-semibold">function</span>{' '}
                      <span className="text-[#50fa7b]">build</span>
                      <span className="text-[#f8f8f2]">()</span>{' '}
                      <span className="text-[#f8f8f2]">{'{'}</span>
                    </div>

                    <div className="pl-6">
                      <span className="text-[#ff79c6] font-semibold">return</span>{' '}
                      <span className="text-[#f1fa8c]">'🚀 Excellence'</span>
                      <span className="text-[#f8f8f2] font-semibold">;</span>
                    </div>

                    <div>
                      <span className="text-[#f8f8f2]">{'}'}</span>
                    </div>
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
    </section>
  );
}
