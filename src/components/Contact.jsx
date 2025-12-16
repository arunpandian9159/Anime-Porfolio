import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { profileData } from '../data/profileData';

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.contact-header .section-tag',
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.contact-header .section-title',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.contact-header .title-decoration',
              width: [0, 80],
              duration: 600,
              delay: 400,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.contact-method-item',
              opacity: [0, 1],
              translateX: [-30, 0],
              delay: anime.stagger(100, { start: 600 }),
              duration: 600,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.social-connect-box',
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              delay: 800,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { profile, socials } = profileData;

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-oxford-navy relative">
      <div className="absolute inset-0 bg-gradient-radial from-punch-red/10 to-transparent opacity-50 -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
            Get In Touch
          </span>
          <h2 className="section-title font-display text-4xl md:text-5xl font-bold mb-4 opacity-0">
            Let's <span className="text-punch-red">Connect</span>
          </h2>
          <div className="title-decoration w-0 h-1 bg-gradient-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
          {/* Contact Info */}
          <div>
            <p className="text-frosted-blue/80 text-lg mb-8">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll get back to you!
            </p>
            
            <div className="space-y-5">
              <a href={`mailto:${profile.email}`} className="contact-method-item flex items-center gap-5 p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl transition-all hover:border-punch-red hover:translate-x-2 opacity-0">
                <div className="w-12 h-12 bg-gradient-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <span className="text-frosted-blue/60 text-sm uppercase tracking-wider block">Email</span>
                  <span className="font-semibold">{profile.email}</span>
                </div>
              </a>
              
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-method-item flex items-center gap-5 p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl transition-all hover:border-punch-red hover:translate-x-2 opacity-0">
                <div className="w-12 h-12 bg-gradient-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <span className="text-frosted-blue/60 text-sm uppercase tracking-wider block">Phone</span>
                  <span className="font-semibold">{profile.phone}</span>
                </div>
              </a>
              
              <div className="contact-method-item flex items-center gap-5 p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl opacity-0">
                <div className="w-12 h-12 bg-gradient-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <span className="text-frosted-blue/60 text-sm uppercase tracking-wider block">Location</span>
                  <span className="font-semibold">{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Connect */}
          <div className="social-connect-box text-center p-10 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl opacity-0">
            <h3 className="font-display text-xl font-bold mb-6">Connect With Me</h3>
            <div className="flex justify-center gap-5">
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 px-8 py-5 bg-oxford-navy/50 border border-frosted-blue/20 rounded-2xl text-frosted-blue/80 transition-all hover:border-honeydew hover:text-honeydew hover:bg-white/10">
                <i className="fab fa-github text-3xl"></i>
                <span>GitHub</span>
              </a>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 px-8 py-5 bg-oxford-navy/50 border border-frosted-blue/20 rounded-2xl text-frosted-blue/80 transition-all hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10">
                <i className="fab fa-linkedin-in text-3xl"></i>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
