import { BookOpen, ExternalLink, Users, Calendar, Building } from 'lucide-react';
import { publications } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Publications() {
  const { isDark } = useTheme();

  if (publications.length === 0) return null;

  return (
    <section id="publications" className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-cosmic-black' : 'bg-gray-50'}`}>
      {/* Background Glow */}
      <div className={`absolute bottom-0 left-1/4 w-1/3 h-1/3 bg-cosmic-purple/10 blur-[100px] pointer-events-none ${isDark ? 'block' : 'hidden'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 drop-shadow-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Publications & Research
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Academic contributions and technical writing
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {publications.map((pub, index) => (
            <div 
              key={index}
              className={`group relative p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                isDark 
                  ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-cosmic-purple/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]' 
                  : 'bg-white shadow-lg hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:border-cosmic-purple/20 border border-transparent'
              }`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen size={120} className={isDark ? 'text-cosmic-purple' : 'text-cosmic-purple'} />
              </div>

              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-4 drop-shadow-sm leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {pub.title}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-cosmic-teal' : 'text-cosmic-teal'}`}>
                    <Building size={16} />
                    {pub.publisher}
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <Calendar size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                    {pub.date}
                  </div>
                </div>

                <p className={`mb-6 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {pub.description}
                </p>

                <div className="flex items-center gap-2 mb-8">
                  <Users size={16} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
                  <div className="flex flex-wrap gap-2 text-sm">
                    {pub.authors.map((author, i) => (
                      <span key={i} className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {author}{i < pub.authors.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all ${
                    isDark
                      ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:scale-105'
                      : 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white shadow-md hover:shadow-lg hover:scale-105'
                  }`}
                >
                  <ExternalLink size={18} />
                  Read Publication
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
