import { useState } from 'react';
import {
  Loader,
  Navbar,
  Hero,
  About,
  Skills,
  Experience,
  Projects,
  Education,
  Certifications,
  Contact,
  Footer
} from './components';
import PixelTrail from './components/PixelTrail';
import TechLogoLoop from './components/TechLogoLoop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {/* Global Pixel Trail Effect */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <PixelTrail 
            gridSize={50}
            trailSize={0.08}
            maxAge={200}
            color="#e63946"
          />
        </div>
        
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <TechLogoLoop />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;

