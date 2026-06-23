import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-12 relative overflow-hidden transition-colors duration-300 ${
        isDark ? 'bg-cosmic-black border-t border-white/10' : 'bg-gray-50 border-t border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${
                isDark
                  ? 'bg-cosmic-purple/10 text-cosmic-purple shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                  : 'bg-cosmic-purple/10 text-cosmic-purple'
              }`}
            >
              MK
            </div>
            <div>
              <p
                className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {personalInfo.name}
              </p>
              <p
                className={`text-sm ${
                  isDark ? 'text-cosmic-blue' : 'text-cosmic-blue'
                }`}
              >
                {personalInfo.title}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.socialLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-400 hover:text-cosmic-teal hover:bg-white/10'
                  : 'text-gray-600 hover:text-cosmic-teal hover:bg-gray-100'
              }`}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personalInfo.socialLinks[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-400 hover:text-cosmic-teal hover:bg-white/10'
                  : 'text-gray-600 hover:text-cosmic-teal hover:bg-gray-100'
              }`}
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={personalInfo.socialLinks[2].url}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-gray-400 hover:text-cosmic-teal hover:bg-white/10'
                  : 'text-gray-600 hover:text-cosmic-teal hover:bg-gray-100'
              }`}
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p
              className={`text-sm flex items-center gap-1 justify-center md:justify-end ${
                isDark ? 'text-gray-500' : 'text-gray-600'
              }`}
            >
              Made with{' '}
              <Heart size={14} className="text-cosmic-purple fill-current drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]" />{' '}
              in {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
