import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { profileData } from '../data/profileData';

const Hero = () => {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Hero animation timeline
    const timeline = anime.timeline({ easing: 'easeOutExpo' });

    timeline
      .add({
        targets: '.profile-frame',
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 1000
      })
      .add({
        targets: '.frame-border-anim',
        opacity: [0, 1],
        scale: [1.2, 1],
        duration: 600
      }, '-=600')
      .add({
        targets: '.quick-stat',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        duration: 600
      }, '-=300')
      .add({
        targets: '.hero-intro',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 600
      }, '-=400')
      .add({
        targets: '.hero-name',
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800
      }, '-=400')
      .add({
        targets: '.hero-role',
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600
      }, '-=500')
      .add({
        targets: '.role-underline',
        width: [0, 100],
        duration: 600
      }, '-=400')
      .add({
        targets: '.hero-bio',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
      }, '-=300')
      .add({
        targets: '.hero-cta',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600
      }, '-=200');

    // Create particles
    createParticles();
  }, []);

  const createParticles = () => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: ${Math.random() > 0.5 ? '#e63946' : '#a8dadc'};
        opacity: ${Math.random() * 0.5 + 0.2};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      container.appendChild(particle);
      animateParticle(particle);
    }
  };

  const animateParticle = (particle) => {
    const duration = Math.random() * 5000 + 3000;
    anime({
      targets: particle,
      translateX: () => anime.random(-100, 100),
      translateY: () => anime.random(-100, 100),
      opacity: [{ value: 0.1 }, { value: 0.6 }],
      scale: [{ value: 0.5 }, { value: 1.5 }],
      duration,
      delay: Math.random() * 2000,
      easing: 'easeInOutSine',
      complete: () => animateParticle(particle)
    });
  };

  const { profile, socials, stats } = profileData;

  return (
    <section id="hero" ref={heroRef} className="min-h-screen relative flex overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-oxford-navy-dark via-oxford-navy to-cerulean/30">
        {/* Diagonal slice */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cerulean/10" 
             style={{ clipPath: 'polygon(100% 0, 100% 100%, 40% 100%)' }}></div>
        {/* Speed lines */}
        <div className="speed-line" style={{ top: '30%', left: '-100%' }}></div>
        <div className="speed-line" style={{ top: '70%', left: '-100%', animationDelay: '1.5s' }}></div>
        {/* Particles container */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden"></div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center min-h-screen px-6 md:px-12 py-24 max-w-7xl mx-auto z-10 w-full">
        {/* Left - Profile */}
        <div className="text-center">
          <div className="profile-frame relative inline-block opacity-0">
            {/* Frame Border */}
            <div className="frame-border-anim absolute -inset-3 border-3 border-punch-red rounded-2xl frame-pulse opacity-0"></div>
            
            {/* Avatar */}
            <div className="w-56 h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden relative">
              <div className="w-full h-full bg-gradient-to-br from-cerulean to-oxford-navy-light flex items-center justify-center">
                <span className="font-display text-6xl md:text-7xl font-black text-honeydew text-glow-blue">AC</span>
              </div>
              {/* Aura */}
              <div className="absolute -inset-5 bg-gradient-radial from-punch-red/30 to-transparent avatar-aura -z-10"></div>
            </div>
            
            {/* Badge */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-punch-red rounded-full flex items-center justify-center glow-red">
              <i className="fas fa-code text-xl text-honeydew"></i>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="quick-stat flex items-center gap-2 text-frosted-blue text-sm opacity-0">
              <i className="fas fa-folder-open"></i>
              <span>{stats.projects}+ Projects</span>
            </div>
            <div className="quick-stat flex items-center gap-2 text-frosted-blue text-sm opacity-0">
              <i className="fas fa-certificate"></i>
              <span>{stats.certifications}+ Certifications</span>
            </div>
          </div>
        </div>

        {/* Right - Info */}
        <div className="md:pr-12 text-center md:text-left">
          <div className="hero-intro mb-2 opacity-0">
            <span className="text-frosted-blue text-lg tracking-wider">Hello, I'm</span>
          </div>
          
          <h1 className="hero-name font-display text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 opacity-0">
            <span className="block text-honeydew">{profile.firstName}</span>
            <span className="text-punch-red text-glow-red">{profile.lastName}</span>
          </h1>
          
          <div className="hero-role mb-5 opacity-0">
            <span className="text-frosted-blue text-xl font-semibold">{profile.headline}</span>
            <div className="role-underline h-0.5 bg-gradient-to-r from-punch-red to-frosted-blue mt-2 w-0"></div>
          </div>
          
          <p className="hero-bio text-frosted-blue/80 text-lg mb-8 max-w-lg mx-auto md:mx-0 opacity-0">
            {profile.shortBio}
          </p>
          
          <div className="hero-cta flex items-center gap-6 justify-center md:justify-start opacity-0">
            <a href="#projects" className="inline-flex items-center gap-3 bg-punch-red text-honeydew px-7 py-4 rounded font-semibold glow-red transition-all hover:bg-punch-red-light hover:-translate-y-1 hover:shadow-lg">
              <span>Explore Work</span>
              <i className="fas fa-rocket"></i>
            </a>
            
            <div className="flex gap-4">
              <a href={socials.github} target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 border-2 border-frosted-blue rounded-full flex items-center justify-center text-frosted-blue transition-all hover:bg-frosted-blue hover:text-oxford-navy-dark hover:-translate-y-1">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
                 className="w-12 h-12 border-2 border-frosted-blue rounded-full flex items-center justify-center text-frosted-blue transition-all hover:bg-frosted-blue hover:text-oxford-navy-dark hover:-translate-y-1">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
