import { useState, useEffect } from "react";

const Navbar = ({ onTerminalOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    setIsMenuOpen(false);
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

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {/* Terminal Button (Mobile) */}
          <button
            onClick={onTerminalOpen}
            className="p-2 text-honeydew hover:text-punch-red transition-colors"
            aria-label="Open terminal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
          </button>

          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span
              className={`w-6 h-0.5 bg-honeydew transition-all ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
              aria-hidden="true"
            ></span>
            <span
              className={`w-6 h-0.5 bg-honeydew transition-all ${
                isMenuOpen ? "opacity-0" : ""
              }`}
              aria-hidden="true"
            ></span>
            <span
              className={`w-6 h-0.5 bg-honeydew transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
              aria-hidden="true"
            ></span>
          </button>
        </div>

        {/* Nav Menu */}
        <ul
          id="mobile-nav-menu"
          className={`md:flex gap-8 list-none ${
            isMenuOpen
              ? "flex flex-col absolute top-16 left-0 right-0 bg-oxford-navy/98 p-6 gap-4 border-b border-frosted-blue/10"
              : "hidden md:flex"
          }`}
          role="menubar"
        >
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
