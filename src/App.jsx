import { useState, lazy, Suspense } from 'react';
import {
  Loader,
  Navbar,
  Hero,
} from './components';

// Lazy load below-the-fold components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const TechLogoLoop = lazy(() => import('./components/TechLogoLoop'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <Navbar />
        <Hero isLoading={isLoading} />
        
        <Suspense fallback={<div className="min-h-[20vh]" />}>
          <About />
          <Skills />
          <TechLogoLoop />
          <Experience />
          <Projects />
          <Education />
          <Certifications />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;

