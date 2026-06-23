import { useEffect, useState, useRef } from 'react';
import { Users, Folder, Cpu, BookOpen, Calendar } from 'lucide-react';
import { stats } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useVisitorStats } from '../hooks/useVisitor';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function useCounter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return { count, suffix, ref };
}

function StatItem({
  icon,
  label,
  end,
  suffix = '',
  textValue,
}: {
  icon: React.ReactNode;
  label: string;
  end?: number;
  suffix?: string;
  textValue?: string;
}) {
  const { isDark } = useTheme();
  const { count, suffix: s, ref } = useCounter({ end: end || 0, suffix });

  return (
    <div
      ref={ref}
      className={`text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105 ${
        isDark
          ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-cosmic-blue/50 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]'
          : 'bg-white shadow-lg hover:shadow-[0_0_15px_rgba(0,217,255,0.2)] hover:border-cosmic-blue/30 border border-transparent'
      }`}
    >
      <div
        className={`inline-flex p-4 rounded-2xl mb-4 transition-all duration-300 ${
          isDark
            ? 'bg-cosmic-blue/10 text-cosmic-blue shadow-[0_0_10px_rgba(0,217,255,0.2)]'
            : 'bg-cosmic-blue/10 text-cosmic-blue'
        }`}
      >
        {icon}
      </div>
      <div
        className={`text-4xl sm:text-5xl font-bold mb-2 drop-shadow-sm ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        {textValue ? textValue : `${count.toLocaleString()}${s}`}
      </div>
      <p
        className={`text-sm sm:text-base font-medium ${
          isDark ? 'text-cosmic-blue' : 'text-cosmic-blue'
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter() {
  const { isDark } = useTheme();
  const { totalVisitors } = useVisitorStats();

  const statItems = [
    {
      icon: <Users size={28} />,
      label: 'Portfolio Visitors',
      end: totalVisitors || stats.totalVisitors,
    },
    {
      icon: <Folder size={28} />,
      label: 'Projects Completed',
      end: stats.projectsCompleted,
    },
    {
      icon: <Cpu size={28} />,
      label: 'Technologies Mastered',
      end: stats.technologiesLearned,
    },
    ...(stats.publications > 0 ? [
      {
        icon: <BookOpen size={28} />,
        label: 'Publications',
        end: stats.publications,
      }
    ] : []),
    {
      icon: <Calendar size={28} />,
      label: 'Experience Level',
      textValue: 'Fresher',
    },
  ];

  return (
    <section
      className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-cosmic-black' : 'bg-gray-50'}`}
    >
      {/* Background Glow */}
      <div className={`absolute top-0 right-1/4 w-1/4 h-1/3 bg-cosmic-purple/10 blur-[100px] pointer-events-none ${isDark ? 'block' : 'hidden'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-4 drop-shadow-sm ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            By The Numbers
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Milestones from my development journey
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-3 ${statItems.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'} gap-4 md:gap-6`}>
          {statItems.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
