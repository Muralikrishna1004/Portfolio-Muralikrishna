import { useState } from 'react';
import { ExternalLink, Github, X, ChevronRight, Zap, Target, Lightbulb, Rocket, AlertTriangle } from 'lucide-react';
import { projects, Project } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import TiltCard from './TiltCard';
import { useScrollRevealGroup } from '../hooks/useScrollReveal';

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const { isDark } = useTheme();
  const categoryGlow: Record<string, string> = {
    ai: 'rgba(168,85,247,0.35)',
    fullstack: 'rgba(0,245,212,0.35)',
    backend: 'rgba(0,217,255,0.35)',
    frontend: 'rgba(59,130,246,0.35)',
  };

  return (
    <TiltCard
      onClick={onClick}
      glowColor={categoryGlow[project.category] || 'rgba(139,92,246,0.3)'}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer h-full ${
        isDark
          ? 'bg-white/5 backdrop-blur-md border border-white/10'
          : 'bg-white shadow-lg border border-transparent'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 border ${
            project.category === 'ai'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
              : project.category === 'fullstack'
              ? 'bg-cosmic-teal/20 text-cosmic-teal border-cosmic-teal/40'
              : 'bg-cosmic-blue/20 text-cosmic-blue border-cosmic-blue/40'
          }`}>
            {project.category === 'ai' ? 'AI/ML' : project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
          <h3 className="text-xl font-bold text-white drop-shadow-md">{project.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.tagline}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className={`px-2 py-1 text-xs font-medium rounded-lg border ${
              isDark ? 'bg-white/5 border-white/10 text-cosmic-blue' : 'bg-cosmic-blue/5 border-cosmic-blue/10 text-cosmic-blue'
            }`}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isDark ? 'text-cosmic-purple group-hover:text-cosmic-teal' : 'text-cosmic-purple group-hover:text-cosmic-teal'}`}>
          View Case Study
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </TiltCard>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { isDark } = useTheme();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border shadow-[0_0_60px_rgba(139,92,246,0.2)] ${
          isDark ? 'bg-gray-950/95 border-white/10' : 'bg-white border-cosmic-purple/10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`sticky top-0 z-10 px-6 py-4 border-b flex justify-between items-center backdrop-blur-md ${isDark ? 'border-white/10 bg-gray-950/90' : 'border-gray-100 bg-white/90'}`}>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h2>
          <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-cosmic-teal hover:bg-white/5' : 'text-gray-600 hover:bg-gray-100'}`}>
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-8">
          <div className="relative rounded-xl overflow-hidden h-64 border border-white/10">
            <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Overview */}
          <div>
            <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Overview</h3>
            <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
          </div>

          {/* Tech */}
          <div>
            <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDark ? 'bg-white/5 text-cosmic-blue border-white/10' : 'bg-cosmic-blue/10 text-cosmic-blue border-cosmic-blue/20'}`}>{tech}</span>
              ))}
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Problem', icon: <AlertTriangle size={20} className="text-orange-400" />, text: project.problem },
              { title: 'Solution', icon: <Lightbulb size={20} className="text-yellow-400" />, text: project.solution },
            ].map(({ title, icon, text }) => (
              <div key={title} className={`p-5 rounded-xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                <div className="flex items-center gap-2 mb-3">{icon}<h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h4></div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{text}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Zap size={20} style={{ color: '#00F5D4' }} />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Key Features</h3>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.features.map((f, i) => (
                <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-cosmic-teal flex-shrink-0" style={{ boxShadow: '0 0 5px #00F5D4' }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Rocket size={20} style={{ color: '#8B5CF6' }} />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Impact</h3>
            </div>
            <ul className="space-y-2">
              {project.impact.map((item, i) => (
                <li key={i} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cosmic-purple flex-shrink-0" style={{ boxShadow: '0 0 5px #8B5CF6' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target size={20} style={{ color: '#00D9FF' }} />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Architecture</h3>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{project.architecture}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { isDark } = useTheme();
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);
  const setRef = useScrollRevealGroup(projects.length + 1, 120);

  return (
    <section id="projects" className={`py-24 relative overflow-hidden ${isDark ? 'bg-transparent' : 'bg-gray-50/80'}`}>
      <div className="section-glow-purple absolute top-1/3 left-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden" ref={setRef(0) as any}>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured{' '}
            <span className="bg-gradient-to-r from-cosmic-purple to-cosmic-blue bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' }}>
              Projects
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Case studies of my recent work and personal projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project, i) => (
            <div key={project.id} className="reveal-hidden" ref={setRef(i + 1) as any} style={{ transitionDelay: `${i * 120}ms` }}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </div>
          ))}
        </div>

        {otherProjects.length > 0 && (
          <>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Other Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, i) => (
                <div key={project.id} className="reveal-hidden" ref={setRef(featuredProjects.length + i + 1) as any} style={{ transitionDelay: `${i * 120}ms` }}>
                  <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
