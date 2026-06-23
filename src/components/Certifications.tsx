import { useState } from 'react';
import { Award, ExternalLink, Calendar, Building2, ChevronRight, X } from 'lucide-react';
import { certifications, Certification } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import TiltCard from './TiltCard';
import { useScrollRevealGroup } from '../hooks/useScrollReveal';

export default function Certifications() {
  const { isDark } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const setRef = useScrollRevealGroup(certifications.length + 1, 120);

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className={`py-24 relative overflow-hidden ${isDark ? 'bg-transparent' : 'bg-gray-50/80'}`}>
      <div className="section-glow-teal absolute top-0 right-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal-hidden" ref={setRef(0) as any}>
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className="bg-gradient-to-r from-cosmic-teal to-cosmic-blue bg-clip-text text-transparent"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,245,212,0.5))' }}>
              Certifications
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Professional validations of my technical expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className="reveal-hidden"
              ref={setRef(i + 1) as any}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <TiltCard
                glowColor="rgba(0,245,212,0.3)"
                maxTilt={10}
                className={`group cursor-pointer rounded-2xl p-6 h-full ${
                  isDark
                    ? 'bg-white/5 backdrop-blur-md border border-white/10'
                    : 'bg-white shadow-md border border-transparent'
                }`}
              >
                <div onClick={() => setSelectedCert(cert)}>
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: isDark ? 'rgba(0,245,212,0.08)' : 'rgba(0,245,212,0.1)',
                        color: '#00F5D4',
                        boxShadow: isDark ? '0 0 15px rgba(0,245,212,0.2)' : '',
                      }}
                    >
                      <Award size={26} />
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full ${
                      isDark ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Calendar size={12} /> {cert.date}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold mb-2 line-clamp-2 leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {cert.title}
                  </h3>

                  <div className={`flex items-center gap-2 mb-4 text-sm font-semibold ${isDark ? 'text-cosmic-blue' : 'text-cosmic-blue'}`}>
                    <Building2 size={14} /> {cert.issuer}
                  </div>

                  {cert.skills && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cert.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className={`px-2 py-1 text-xs rounded-md border ${
                          isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}>{skill}</span>
                      ))}
                      {cert.skills.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded-md border ${
                          isDark ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
                        }`}>+{cert.skills.length - 3}</span>
                      )}
                    </div>
                  )}

                  <div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                    isDark ? 'text-cosmic-teal group-hover:text-white' : 'text-cosmic-teal'
                  }`}>
                    View Details <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      {/* Cert Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCert(null)}>
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />
          <div
            className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,245,212,0.15)] border ${
              isDark ? 'bg-gray-950/95 border-white/10' : 'bg-white border-cosmic-teal/20'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`px-6 py-4 border-b flex justify-between items-center ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50'}`}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Certification Details</h3>
              <button onClick={() => setSelectedCert(null)} className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-cosmic-teal hover:bg-white/10' : 'text-gray-500 hover:bg-gray-100'}`}>
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 rounded-xl flex-shrink-0" style={{ background: 'rgba(0,245,212,0.1)', color: '#00F5D4', boxShadow: isDark ? '0 0 20px rgba(0,245,212,0.2)' : '' }}>
                  <Award size={32} />
                </div>
                <div>
                  <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedCert.title}</h4>
                  <div className={`flex flex-wrap items-center gap-4 text-sm font-semibold ${isDark ? 'text-cosmic-blue' : 'text-cosmic-blue'}`}>
                    <span className="flex items-center gap-1.5"><Building2 size={14} /> {selectedCert.issuer}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {selectedCert.date}</span>
                  </div>
                </div>
              </div>
              {selectedCert.description && (
                <p className={`mb-6 leading-relaxed text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{selectedCert.description}</p>
              )}
              {selectedCert.skills && (
                <div className="mb-6">
                  <h5 className={`text-sm font-bold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Skills Validated</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span key={skill} className={`px-3 py-1.5 text-sm font-medium rounded-lg border ${isDark ? 'bg-white/5 border-white/10 text-cosmic-teal' : 'bg-cosmic-teal/10 border-cosmic-teal/20 text-cosmic-teal'}`}>{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedCert.link && (
                <a href={selectedCert.link} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-950 transition-all hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #00F5D4, #00D9FF)', boxShadow: '0 0 20px rgba(0,245,212,0.4)' }}>
                  <ExternalLink size={18} /> Verify Credential
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
