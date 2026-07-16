import { useState, useEffect, useRef } from 'react';
import { User, Eye } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

export default function About() {
  const { isDark } = useTheme();
  const titleRef = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const profileRef = useScrollReveal<HTMLDivElement>({ delay: 100 });
  
  const [showLightbox, setShowLightbox] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const triggerLightbox = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowLightbox(true);
    timerRef.current = setTimeout(() => {
      setShowLightbox(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section id="about" className={`py-24 relative overflow-hidden ${isDark ? 'bg-transparent' : 'bg-white/80'}`}>
      <div className="section-glow-purple absolute top-0 right-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden" ref={titleRef}>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            About{' '}
            <span className="bg-gradient-to-r from-cosmic-teal via-cosmic-blue to-cosmic-purple bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,217,255,0.5))' }}>
              Me
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Professional profile, academic background, and passion for technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Profile Picture Card */}
          <div className="lg:col-span-5 reveal-left flex justify-center" ref={profileRef}>
            <TiltCard
              glowColor="rgba(139,92,246,0.3)"
              maxTilt={8}
              className={`p-3 rounded-3xl border w-full max-w-sm ${
                isDark
                  ? 'bg-white/5 backdrop-blur-md border-white/10'
                  : 'bg-white shadow-lg border-transparent'
              }`}
            >
              <div
                onClick={triggerLightbox}
                className="relative aspect-square w-full rounded-2xl overflow-hidden group border border-cosmic-purple/30 cursor-pointer bg-cosmic-black"
                style={{
                  boxShadow: isDark
                    ? '0 0 25px rgba(139,92,246,0.2)'
                    : '0 10px 30px rgba(139,92,246,0.06)'
                }}
              >
                {/* Encrypted / Blurred image */}
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover opacity-20 blur-2xl scale-110 group-hover:opacity-30 group-hover:blur-xl transition-all duration-700"
                />

                {/* Central "VIEW PORTRAIT" high-tech overlay (Permanent, but interactive on hover) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-cosmic-black/40 backdrop-blur-sm group-hover:bg-cosmic-black/20 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full border border-cosmic-teal/40 bg-cosmic-teal/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-cosmic-teal/20 group-hover:border-cosmic-teal transition-all duration-300 shadow-[0_0_15px_rgba(0,245,212,0.2)] group-hover:shadow-[0_0_25px_rgba(0,245,212,0.4)]">
                    <Eye className="w-6 h-6 text-cosmic-teal" />
                  </div>
                  <span className="text-[10px] font-bold text-cosmic-teal mt-3 tracking-[0.2em] uppercase">VIEW PORTRAIT</span>
                  <span className="text-[9px] text-gray-500 mt-1 tracking-wider">(3s Decrypt Preview)</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-black/85 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-cosmic-black/80 backdrop-blur-md border border-white/10 text-left">
                  <p className="text-white text-sm font-bold tracking-wide">{personalInfo.name}</p>
                  <p className="text-cosmic-teal text-[10px] font-semibold mt-0.5">Python Full Stack Developer</p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Professional Profile */}
          <div className="lg:col-span-7">
            <TiltCard
              glowColor="rgba(0,245,212,0.25)"
              maxTilt={6}
              className={`p-8 rounded-2xl border ${
                isDark
                  ? 'bg-white/5 backdrop-blur-md border-white/10'
                  : 'bg-white shadow-lg border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <User size={28} style={{ color: '#00F5D4', filter: isDark ? 'drop-shadow(0 0 8px rgba(0,245,212,0.6))' : '' }} />
                <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Professional Profile</h3>
              </div>

              <p className={`leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I am a highly passionate <strong>Python Full Stack Developer</strong> and tech enthusiast with a deep commitment to the IT sector. I thrive on solving complex computational problems and translating them into simple, responsive, and robust digital solutions.
              </p>
              <p className={`leading-relaxed mb-7 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                With hands-on internship experience in building modern web architectures using <strong>React.js</strong>, <strong>Django</strong>, and <strong>MySQL</strong>, I am constantly learning, adapting to new technologies, and eager to bring my innovative energy and dedication to forward-thinking tech teams.
              </p>

              <div className={`grid grid-cols-2 gap-5 border-t pt-6 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                {[
                  { label: 'Location', value: personalInfo.location },
                  { label: 'Languages', value: 'English, Tamil' },
                  { label: 'Experience', value: 'Python Full Stack Intern' },
                  { label: 'Availability', value: 'Immediate Joiner', highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div key={label}>
                    <span className={`block text-xs font-semibold mb-1 uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</span>
                    <span className={`font-semibold text-sm ${highlight ? 'text-cosmic-teal' : isDark ? 'text-white' : 'text-gray-900'}`}
                      style={highlight && isDark ? { textShadow: '0 0 10px rgba(0,245,212,0.5)' } : {}}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal Modal - Auto closes in 3 seconds */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <div 
            className="relative max-w-sm w-full p-4 rounded-2xl bg-cosmic-black/90 border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.4)] animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-cosmic-purple/30">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-white text-xl font-bold">{personalInfo.name}</h3>
              <p className="text-cosmic-teal text-sm">{personalInfo.title}</p>
            </div>
            {/* 3s Visual Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-cosmic-teal animate-countdown-3s" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
