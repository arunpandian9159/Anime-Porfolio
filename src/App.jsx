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
import TechLogoLoop from './components/TechLogoLoop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
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
