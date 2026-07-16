import { Briefcase, Calendar, MapPin, Building2, Code2 } from 'lucide-react';
import { experience } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useScrollRevealGroup } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

export default function Timeline() {
  const { isDark } = useTheme();
  const setRef = useScrollRevealGroup(experience.length + 1, 150);

  return (
    <section id="timeline" className={`py-24 relative overflow-hidden ${isDark ? 'bg-transparent' : 'bg-white/80'}`}>
      <div className="section-glow-blue absolute top-1/2 left-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden" ref={setRef(0) as any}>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Professional{' '}
            <span className="bg-gradient-to-r from-cosmic-blue to-cosmic-teal bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,217,255,0.5))' }}>
              Experience
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            My journey through the tech industry
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div
            className={`absolute left-8 top-0 bottom-0 w-[2px] ${isDark ? 'bg-cosmic-blue/20' : 'bg-cosmic-blue/15'} overflow-hidden`}
            style={{ boxShadow: isDark ? '0 0 8px rgba(0,217,255,0.2)' : '' }}
          >
            <div 
              className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-transparent via-cosmic-blue to-transparent h-32 animate-laser-pulse"
              style={{ filter: 'drop-shadow(0 0 8px #00D9FF)' }}
            />
          </div>

          <div className="space-y-16">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="reveal-up"
                ref={setRef(index + 1) as any}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative flex items-start">
                  {/* Node */}
                  <div
                    className={`absolute left-8 w-10 h-10 rounded-full transform -translate-x-1/2 flex items-center justify-center border-2 z-10 ${isDark ? 'bg-gray-950 border-cosmic-purple' : 'bg-white border-cosmic-purple shadow-md'
                      }`}
                    style={{ boxShadow: isDark ? '0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(139,92,246,0.2)' : '0 0 15px rgba(139,92,246,0.3)' }}
                  >
                    <Briefcase size={16} style={{ color: '#8B5CF6' }} />
                  </div>
                  {/* Card */}
                  <div className="ml-20 md:ml-24 w-full pr-4 md:pr-0 md:max-w-3xl">
                    <TiltCard
                      glowColor="rgba(139,92,246,0.25)"
                      maxTilt={4}
                      className={`p-6 md:p-8 rounded-2xl ${isDark
                          ? 'bg-white/5 border border-white/10'
                          : 'bg-white shadow-lg border border-transparent'
                        }`}
                    >
                      <div className="flex flex-wrap gap-4 items-start justify-between mb-4">
                        <div>
                          <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
                          <div className="flex items-center gap-2" style={{ color: '#00F5D4' }}>
                            <Building2 size={16} />
                            <span className="font-semibold text-sm">{exp.company}</span>
                          </div>
                        </div>
                        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded border ${isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'
                          }`}>
                          <Calendar size={12} /> {exp.period}
                        </span>
                      </div>

                      <div className={`flex items-center gap-2 text-sm mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <MapPin size={14} /> {exp.location}
                      </div>

                      <ul className="space-y-3 mb-5">
                        {exp.description.map((item, i) => (
                          <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: '#00D9FF', boxShadow: isDark ? '0 0 5px rgba(0,217,255,0.8)' : '' }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg border ${isDark
                              ? 'bg-white/5 border border-white/10 text-cosmic-purple'
                              : 'bg-cosmic-purple/10 border-cosmic-purple/20 text-cosmic-purple'
                            }`}>
                            <Code2 size={10} /> {tech}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
