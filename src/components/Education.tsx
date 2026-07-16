import { BookOpen, Landmark, GraduationCap, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal, useScrollRevealGroup } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

const educationList = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dr. M.G.R. Educational and Research Institute',
    period: '2024 - 2026',
    performance: 'CGPA of 8.0',
    icon: <GraduationCap size={22} style={{ color: '#00F5D4' }} />,
    glow: 'rgba(0,245,212,0.3)',
  },
  {
    degree: 'Bachelor of Computer Science (BSc)',
    institution: 'C. Abdul Hakeem College',
    period: '2021 - 2024',
    performance: '72% in Academics',
    icon: <BookOpen size={22} style={{ color: '#00D9FF' }} />,
    glow: 'rgba(0,217,255,0.3)',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Sri Vijay Matric Hr.Sec School',
    period: '2020 - 2021',
    performance: '78% Score',
    icon: <Landmark size={22} style={{ color: '#8B5CF6' }} />,
    glow: 'rgba(139,92,246,0.3)',
  },
  {
    degree: 'Secondary School Certificate (SSLC)',
    institution: 'Sri Vijay Matric Hr.Sec School',
    period: '2018 - 2019',
    performance: '70% Score',
    icon: <Award size={22} style={{ color: '#00D9FF' }} />,
    glow: 'rgba(0,217,255,0.3)',
  },
];

export default function Education() {
  const { isDark } = useTheme();
  const titleRef = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const setEduRef = useScrollRevealGroup(educationList.length, 120);

  return (
    <section id="education" className={`py-24 relative overflow-hidden ${isDark ? 'bg-transparent' : 'bg-white/80'}`}>
      {/* Decorative background glow */}
      <div className="section-glow-teal absolute top-0 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden" ref={titleRef}>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            My{' '}
            <span className="bg-gradient-to-r from-cosmic-teal via-cosmic-blue to-cosmic-purple bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,217,255,0.5))' }}>
              Education
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Academic foundation and credentials
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical timeline line */}
          <div
            className={`absolute left-8 top-0 bottom-0 w-[2px] ${isDark ? 'bg-cosmic-purple/20' : 'bg-cosmic-blue/15'} overflow-hidden`}
            style={{ boxShadow: isDark ? '0 0 8px rgba(139,92,246,0.2)' : '' }}
          >
            <div 
              className="absolute top-0 left-0 right-0 w-full bg-gradient-to-b from-transparent via-cosmic-teal to-transparent h-32 animate-laser-pulse"
              style={{ filter: 'drop-shadow(0 0 8px #00F5D4)' }}
            />
          </div>

          <div className="space-y-12">
            {educationList.map((edu, index) => (
              <div
                key={index}
                className="relative flex items-start reveal-hidden"
                ref={setEduRef(index) as any}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Timeline Node Icon */}
                <div
                  className={`absolute left-8 w-11 h-11 rounded-full transform -translate-x-1/2 flex items-center justify-center border-2 z-10 transition-transform duration-300 hover:scale-110 ${
                    isDark ? 'bg-gray-950 border-cosmic-purple' : 'bg-white border-cosmic-purple shadow-sm'
                  }`}
                  style={{
                    boxShadow: isDark 
                      ? '0 0 20px rgba(139,92,246,0.5), 0 0 40px rgba(139,92,246,0.2)' 
                      : '0 0 12px rgba(139,92,246,0.25)'
                  }}
                >
                  {edu.icon}
                </div>

                {/* Qualification Card */}
                <div className="ml-20 md:ml-24 w-full pr-4 md:pr-0 md:max-w-3xl">
                  <TiltCard
                    glowColor={edu.glow}
                    maxTilt={5}
                    className={`p-6 md:p-8 rounded-2xl border transition-all duration-500 hover:scale-[1.02] ${
                      isDark
                        ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-cosmic-teal/50 hover:shadow-[0_0_30px_rgba(0,245,212,0.15)]'
                        : 'bg-white shadow-lg border-transparent hover:shadow-[0_0_20px_rgba(0,245,212,0.1)]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <h4 className={`text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {edu.degree}
                      </h4>
                      <span className={`self-start sm:self-center text-xs font-semibold px-3 py-1.5 rounded-full border whitespace-nowrap ${
                        isDark 
                          ? 'bg-cosmic-purple/15 text-cosmic-purple border-cosmic-purple/30' 
                          : 'bg-cosmic-blue/10 text-cosmic-blue border-cosmic-blue/20'
                      }`}>
                        {edu.period}
                      </span>
                    </div>
                    <p className={`text-sm md:text-base font-medium mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Result:</span>
                      <p className="text-sm md:text-base font-bold" style={{ color: '#00F5D4', textShadow: isDark ? '0 0 8px rgba(0,245,212,0.3)' : '' }}>
                        {edu.performance}
                      </p>
                    </div>
                  </TiltCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
