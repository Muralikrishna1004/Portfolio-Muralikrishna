import { Code2, Database, Server, Cpu, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import TiltCard from './TiltCard';
import { useScrollRevealGroup } from '../hooks/useScrollReveal';

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Code2 size={24} />,
  Backend: <Server size={24} />,
  Database: <Database size={24} />,
  'AI / ML': <Cpu size={24} />,
  'Tools & DevOps': <Wrench size={24} />,
  'Backend & Database': <Database size={24} />,
  Tools: <Wrench size={24} />,
};

const glowColors: Record<string, string> = {
  Frontend: 'rgba(0,217,255,0.3)',
  Backend: 'rgba(0,245,212,0.3)',
  Database: 'rgba(139,92,246,0.3)',
  'Backend & Database': 'rgba(139,92,246,0.3)',
  Tools: 'rgba(0,245,212,0.3)',
};

export default function Skills() {
  const { isDark } = useTheme();
  const setRef = useScrollRevealGroup(skillCategories.length, 100);

  return (
    <section
      id="skills"
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-transparent' : 'bg-gray-50/80'}`}
    >
      {/* Section glow */}
      <div className="section-glow-blue absolute top-0 right-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden" ref={setRef(0) as any}>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Technical{' '}
            <span
              className="bg-gradient-to-r from-cosmic-teal to-cosmic-blue bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,217,255,0.5))' }}
            >
              Skills
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Technologies I work with to build exceptional applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className="reveal-hidden"
              ref={setRef(categoryIndex + 1) as any}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <TiltCard
                glowColor={glowColors[category.category] || 'rgba(139,92,246,0.3)'}
                maxTilt={10}
                className={`p-6 rounded-2xl h-full ${
                  isDark
                    ? 'bg-white/5 backdrop-blur-md border border-white/10'
                    : 'bg-white shadow-lg border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl ${
                      isDark
                        ? 'bg-cosmic-blue/10 text-cosmic-blue'
                        : 'bg-cosmic-blue/10 text-cosmic-blue'
                    }`}
                    style={{ boxShadow: isDark ? '0 0 10px rgba(0,217,255,0.2)' : '' }}
                  >
                    {categoryIcons[category.category] ?? <Code2 size={24} />}
                  </div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {category.category}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-700'}`}>
                          {skill.name}
                        </span>
                        <span className="text-sm font-semibold" style={{ color: '#00F5D4', textShadow: '0 0 8px rgba(0,245,212,0.5)' }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-800/80' : 'bg-gray-200'}`}>
                        <div
                          className="h-full rounded-full relative"
                          style={{
                            width: `${skill.level}%`,
                            background: 'linear-gradient(90deg, #00F5D4, #00D9FF)',
                            boxShadow: isDark ? '0 0 10px rgba(0,217,255,0.8)' : 'none',
                            transition: `width 1.2s ease-out ${categoryIndex * 100 + skillIndex * 60}ms`,
                          }}
                        >
                          {isDark && (
                            <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-sm rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
