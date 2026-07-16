import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Certifications from './components/Certifications';
import Publications from './components/Publications';
import StatsCounter from './components/StatsCounter';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CosmicBackground from './components/CosmicBackground';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import LoadingScreen from './components/LoadingScreen';

import { publications } from './data/portfolioData';

function SectionDivider() {
  return <div className="section-divider" aria-hidden="true" />;
}

function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'hero', 'about', 'education', 'skills', 'projects', 'timeline',
        'certifications',
        ...(publications.length > 0 ? ['publications'] : []),
        'contact',
      ];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative min-h-screen ${isDark ? 'dark' : ''}`}>
      {/* Fixed full-page cosmic background */}
      <CosmicBackground />

      {/* UI Overlays */}
      <CustomCursor />
      <ScrollProgress />

      {/* Main content */}
      <div className="relative z-10">
        <Navbar activeSection={activeSection} />
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Education />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Timeline />
          <SectionDivider />
          <Certifications />
          {publications.length > 0 && (
            <>
              <SectionDivider />
              <Publications />
            </>
          )}
          <SectionDivider />
          <StatsCounter />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <Portfolio />
    </ThemeProvider>
  );
}

export default App;
