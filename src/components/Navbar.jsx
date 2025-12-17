import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact', isCta: true }
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
      isScrolled ? 'bg-oxford-navy/95 backdrop-blur-lg shadow-lg' : ''
    }`}>
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        <a href="#hero" className="font-display text-3xl font-black text-punch-red text-glow-red">
          AC
        </a>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`w-6 h-0.5 bg-honeydew transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-honeydew transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-honeydew transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Nav Menu */}
        <ul className={`md:flex gap-8 list-none ${
          isMenuOpen
            ? 'flex flex-col absolute top-16 left-0 right-0 bg-oxford-navy/98 p-6 gap-4 border-b border-frosted-blue/10'
            : 'hidden md:flex'
        }`}>
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`font-medium transition-all relative ${
                  link.isCta
                    ? 'bg-punch-red px-5 py-2 rounded hover:bg-punch-red-light'
                    : 'text-honeydew hover:text-punch-red after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-punch-red after:transition-all hover:after:w-full'
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
