import { useState, useEffect, useCallback } from "react";
import {
  FaHouse,
  FaCode,
  FaBriefcase,
  FaLaptopCode,
  FaEnvelope,
} from "react-icons/fa6";

const MobileNavBar = () => {
  const [activeSection, setActiveSection] = useState("about");
  const [isProjectsBannerExpanded, setIsProjectsBannerExpanded] =
    useState(false);

  const navItems = [
    { id: "about", label: "About", icon: "home" },
    { id: "skills", label: "Skills", icon: "skills" }, 
    { id: "experience", label: "Experience", icon: "experience" },
    { id: "projects", label: "Projects", icon: "projects" },
    { id: "contact", label: "Contact", icon: "contact" }, 
  ];

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setActiveSection(sectionId);

      // Haptic feedback for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    }
  }, []);

  const handleBannerClick = () => {
    setIsProjectsBannerExpanded(!isProjectsBannerExpanded);
    // Navigate to projects section
    const target = document.getElementById("projects");
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      setActiveSection("projects");
    }
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  const renderIcon = (iconType, isActive) => {
    const iconClass = `w-5 h-5 transition-all duration-200 ${
      isActive ? "text-oxford-navy-dark" : "text-honeydew"
    }`;

    switch (iconType) {
      case "home":
        return <FaHouse className={iconClass} />;
      case "skills":
        return <FaCode className={iconClass} />;
      case "experience":
        return <FaBriefcase className={iconClass} />;
      case "projects":
        return <FaLaptopCode className={iconClass} />;
      case "contact":
        return <FaEnvelope className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="navigation"
      aria-label="Mobile navigation"
    >
      {/* Main Navigation Card */}
      <div className="mx-3 mb-3 bg-oxford-navy/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-frosted-blue/10 overflow-hidden">
        {/* Navigation Icons */}
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex flex-col items-center justify-center flex-1 min-h-[52px] rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-cerulean scale-105 shadow-lg shadow-cerulean/30"
                    : "bg-transparent hover:bg-oxford-navy-light/30"
                }`}
                aria-label={`Navigate to ${item.label} section`}
                aria-current={isActive ? "page" : undefined}
              >
                {renderIcon(item.icon, isActive)}
                <span
                  className={`text-[10px] mt-1 font-medium tracking-tight transition-all duration-300 ${
                    isActive
                      ? "text-oxford-navy-dark scale-105"
                      : "text-honeydew/70"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Styles for animations */}
      <style>{`
        @keyframes pulse-badge {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        .animate-pulse-badge {
          animation: pulse-badge 2s ease-in-out infinite;
        }
      `}</style>
    </nav>
  );
};

export default MobileNavBar;
