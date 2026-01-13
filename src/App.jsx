import { useState, lazy, Suspense, useCallback } from "react";
import { Loader, Navbar, Hero } from "./components/ui";
import { Terminal, TerminalPreview } from "./components/ui/Terminal";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

// Lazy load below-the-fold components
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Projects = lazy(() => import("./components/Projects"));
const Education = lazy(() => import("./components/Education"));
const Certifications = lazy(() => import("./components/Certifications"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));
const TechLogoLoop = lazy(() => import("./components/ui/TechLogoLoop"));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleTerminalToggle = useCallback(() => {
    setIsTerminalOpen((prev) => !prev);
  }, []);

  const handleTerminalClose = useCallback(() => {
    setIsTerminalOpen(false);
  }, []);

  // Initialize keyboard navigation with terminal handlers
  useKeyboardNavigation({
    onTerminalToggle: handleTerminalToggle,
    onEscape: handleTerminalClose,
  });

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-500"
        }
      >
        {/* Skip to main content link for keyboard/screen reader users */}
        <a href="#about" className="skip-link">
          Skip to main content
        </a>
        <Navbar onTerminalOpen={handleTerminalToggle} />
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

      {/* Terminal Preview Widget */}
      <TerminalPreview
        onClick={handleTerminalToggle}
        isTerminalOpen={isTerminalOpen}
      />

      {/* Terminal Modal */}
      <Terminal isOpen={isTerminalOpen} onClose={handleTerminalClose} />
    </>
  );
}

export default App;
