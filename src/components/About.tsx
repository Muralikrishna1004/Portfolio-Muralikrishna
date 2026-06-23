import { User, BookOpen, Landmark, GraduationCap, Award } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useScrollReveal, useScrollRevealGroup } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';

const educationList = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dr. M.G.R. Educational and Research Institute',
    period: '2024 - 2026',
    performance: 'CGPA of 8.0 (Up to 3rd Semester)',
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

export default function About() {
  const { isDark } = useTheme();
  const titleRef = useScrollReveal<HTMLDivElement>({ delay: 0 });
  const profileRef = useScrollReveal<HTMLDivElement>({ delay: 100 });
  const setEduRef = useScrollRevealGroup(educationList.length, 120);

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
            Professional journey, academic background, and passion for technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Profile card */}
          <div className="lg:col-span-5 reveal-left" ref={profileRef}>
            <TiltCard
              glowColor="rgba(0,245,212,0.25)"
              maxTilt={8}
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
                I am a dedicated <strong>Python Full Stack Developer</strong> with a strong academic foundation in Computer Applications. I thrive on translating complex requirements into simple, responsive, and robust digital solutions.
              </p>
              <p className={`leading-relaxed mb-7 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                With hands-on internship experience in both frontend development using <strong>React.js</strong> and backend architectures with <strong>Django & MySQL</strong>, I am highly eager to apply my problem-solving capabilities to forward-thinking teams.
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

          {/* Education timeline */}
          <div className="lg:col-span-7 space-y-5">
            <h3 className={`text-2xl font-bold flex items-center gap-3 mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <BookOpen size={26} style={{ color: '#00D9FF', filter: isDark ? 'drop-shadow(0 0 8px rgba(0,217,255,0.6))' : '' }} />
              Educational Qualifications
            </h3>

            <div className={`relative border-l-2 ml-5 pl-8 space-y-6 ${isDark ? 'border-cosmic-purple/30' : 'border-cosmic-blue/30'}`}>
              {educationList.map((edu, index) => (
                <div
                  key={index}
                  className="relative group reveal-hidden"
                  ref={setEduRef(index) as any}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {/* Dot */}
                  <div className={`absolute -left-[47px] top-3 p-2 rounded-full border-2 group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-gray-950 border-cosmic-purple' : 'bg-white border-cosmic-purple shadow-sm'
                  }`}
                    style={{ boxShadow: isDark ? '0 0 15px rgba(139,92,246,0.5)' : '' }}
                  >
                    {edu.icon}
                  </div>

                  <TiltCard
                    glowColor={edu.glow}
                    maxTilt={6}
                    className={`p-6 rounded-2xl border ${
                      isDark
                        ? 'bg-white/5 backdrop-blur-sm border-white/10'
                        : 'bg-white shadow-sm border-transparent'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{edu.degree}</h4>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${isDark ? 'bg-cosmic-purple/15 text-cosmic-purple border-cosmic-purple/30' : 'bg-cosmic-blue/10 text-cosmic-blue border-cosmic-blue/20'}`}>
                        {edu.period}
                      </span>
                    </div>
                    <p className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{edu.institution}</p>
                    <p className="text-sm font-bold" style={{ color: '#00F5D4', textShadow: isDark ? '0 0 6px rgba(0,245,212,0.4)' : '' }}>
                      {edu.performance}
                    </p>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
