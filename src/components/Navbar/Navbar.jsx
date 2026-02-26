import { useState, useEffect } from "react";

const Navbar = ({ onTerminalOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Terminal typing animation state for mobile
  const [displayText, setDisplayText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
 
  const terminalLines = [
    "$ help",
    "$ skills",
    "$ projects",
    "$ contact",
    "$ about",
    "$ experience",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Terminal typing effect for mobile
  useEffect(() => {
    const currentLine = terminalLines[currentLineIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= currentLine.length) {
        setDisplayText(currentLine.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        setTimeout(() => {
          setDisplayText("");
          setCurrentLineIndex((prev) => (prev + 1) % terminalLines.length);
          setIsTyping(true);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex]);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact", isCta: true },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? "bg-oxford-navy/95 backdrop-blur-lg shadow-lg" : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-3xl font-black text-punch-red text-glow-red"
          aria-label="Go to top of page"
        >
          AC
        </a>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:flex items-center gap-4 ml-auto mr-8">
          {/* Terminal Button */}
          <button
            onClick={onTerminalOpen}
            className="p-2 text-honeydew hover:text-punch-red transition-colors relative group"
            aria-label="Open terminal (Ctrl+K)"
            title="Open terminal (Ctrl+K)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-oxford-navy text-xs text-honeydew rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Ctrl+K
            </span>
          </button>
        </div>

        {/* Mobile Terminal Preview */}
        <div
          className="md:hidden flex items-center gap-2 cursor-pointer group"
          onClick={onTerminalOpen}
          role="button"
          aria-label="Open terminal"
        >
          <div className="flex items-center bg-[#0d1117] rounded-md px-3 py-1.5 border border-[#30363d] group-hover:border-cerulean/50 transition-all">
            <span className="font-mono text-sm text-green-400">
              <span className="text-blue-400">Terminal</span> {displayText}
            </span>
            <span
              className={`inline-block w-2 h-4 bg-green-400 ml-0.5 ${
                isTyping ? "animate-pulse" : "opacity-0"
              }`}
            />
          </div>
        </div>

        {/* Nav Menu - Desktop Only */}
        <ul className="hidden md:flex gap-8 list-none" role="menubar">
          {navLinks.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                role="menuitem"
                aria-label={`Navigate to ${link.label} section`}
                className={`font-medium transition-all relative ${
                  link.isCta
                    ? "bg-punch-red px-5 py-2 rounded hover:bg-punch-red-light"
                    : "text-honeydew hover:text-punch-red after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-punch-red after:transition-all hover:after:w-full"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
