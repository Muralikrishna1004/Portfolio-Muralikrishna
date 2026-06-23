import { GitCommit, Star, GitPullRequest, GitFork } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { personalInfo } from '../data/portfolioData';

// Generate dummy contribution data for the graph
const generateContributionData = () => {
  const data = [];
  const weeks = 52;
  const daysPerWeek = 7;

  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < daysPerWeek; j++) {
      // Generate random contribution level (0-4)
      // Higher probability of 0 for realistic look
      const rand = Math.random();
      let level = 0;
      if (rand > 0.5) level = 1;
      if (rand > 0.7) level = 2;
      if (rand > 0.85) level = 3;
      if (rand > 0.95) level = 4;
      
      week.push(level);
    }
    data.push(week);
  }
  return data;
};

const contributionData = generateContributionData();

export default function GitHubStats() {
  const { isDark } = useTheme();
  // Extract username from GitHub URL
  const username = personalInfo.socialLinks[0].url.split('/').pop() || '';
  
  const stats = {
    totalCommits: 450,
    totalPRs: 25,
    totalStars: 10,
    contributedRepos: 8
  };

  const getLevelColor = (level: number) => {
    if (!isDark) {
      switch (level) {
        case 1: return 'bg-cosmic-purple/20';
        case 2: return 'bg-cosmic-purple/40';
        case 3: return 'bg-cosmic-purple/60';
        case 4: return 'bg-cosmic-purple';
        default: return 'bg-gray-100';
      }
    }
    switch (level) {
      case 1: return 'bg-cosmic-purple/30 shadow-[0_0_5px_rgba(139,92,246,0.3)]';
      case 2: return 'bg-cosmic-purple/50 shadow-[0_0_8px_rgba(139,92,246,0.5)]';
      case 3: return 'bg-cosmic-blue/70 shadow-[0_0_10px_rgba(0,217,255,0.7)]';
      case 4: return 'bg-cosmic-teal shadow-[0_0_15px_rgba(0,245,212,0.9)]';
      default: return 'bg-white/5 border border-white/5';
    }
  };

  const statCards = [
    { label: 'Total Commits', value: stats.totalCommits, icon: <GitCommit size={20} />, color: 'text-cosmic-purple' },
    { label: 'Total PRs', value: stats.totalPRs, icon: <GitPullRequest size={20} />, color: 'text-cosmic-blue' },
    { label: 'Total Stars', value: stats.totalStars, icon: <Star size={20} />, color: 'text-cosmic-teal' },
    { label: 'Repositories', value: stats.contributedRepos, icon: <GitFork size={20} />, color: 'text-cosmic-blue' },
  ];

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-cosmic-black' : 'bg-white'}`}>
      {/* Background Glow */}
      <div className={`absolute top-0 left-0 w-1/3 h-1/3 bg-cosmic-blue/10 blur-[120px] pointer-events-none ${isDark ? 'block' : 'hidden'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 drop-shadow-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
            GitHub Activity
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            My open source contributions and coding frequency
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-cosmic-purple/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                    : 'bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md hover:border-cosmic-purple/20'
                }`}
              >
                <div className={`mb-4 drop-shadow-[0_0_5px_currentColor] ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`text-3xl font-bold mb-1 drop-shadow-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stat.value.toLocaleString()}
                </div>
                <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contribution Graph */}
          <div className={`lg:col-span-8 p-6 sm:p-8 rounded-2xl overflow-hidden ${
            isDark
              ? 'bg-white/5 backdrop-blur-md border border-white/10 hover:shadow-[0_0_30px_rgba(0,217,255,0.1)]'
              : 'bg-white shadow-lg border border-gray-100 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className={`text-lg font-bold drop-shadow-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contributions in last year
              </h3>
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-semibold transition-colors flex items-center gap-2 ${
                  isDark ? 'text-cosmic-blue hover:text-cosmic-teal drop-shadow-[0_0_5px_rgba(0,217,255,0.4)]' : 'text-cosmic-blue hover:text-cosmic-teal'
                }`}
              >
                @ {username}
              </a>
            </div>

            <div className="overflow-x-auto pb-4 hide-scrollbar">
              <div className="inline-flex flex-col gap-1.5 min-w-max">
                <div className="flex gap-1.5">
                  {contributionData.map((week, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      {week.map((level, j) => (
                        <div
                          key={j}
                          className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm transition-colors duration-300 hover:scale-125 ${getLevelColor(level)}`}
                          title={`${level > 0 ? 'Contributions' : 'No contributions'} on this day`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-end gap-2 mt-6 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>Less</span>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map(level => (
                  <div key={level} className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${getLevelColor(level)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
