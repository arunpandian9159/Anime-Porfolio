import { useCallback } from 'react';
import { animate, stagger } from 'animejs';
import { profileData } from '../data/profileData';
import { useIntersectionAnimate } from '../hooks/useIntersectionAnimate';
import SectionHeader from './ui/SectionHeader';

const Contact = () => {
  const runHeaderAnimation = useCallback(() => {
    animate('.contact-header .section-tag', {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: 'easeOutExpo'
    });
    animate('.contact-header .section-title', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: 'easeOutExpo'
    });
    animate('.contact-header .title-decoration', {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: 'easeOutExpo'
    });
    animate('.contact-method-item', {
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: stagger(50, { start: 300 }),
      duration: 300,
      easing: 'easeOutExpo'
    });
    animate('.social-connect-box', {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 400, 
      delay: 400, 
      easing: 'easeOutExpo'
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { profile, socials } = profileData;

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-oxford-navy relative">
      <div className="absolute inset-0 bg-gradient-radial from-punch-red/10 to-transparent opacity-50 -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <SectionHeader
          tag="Get In Touch"
          title="Let's"
          highlight="Connect" 
          className="contact-header"
        />

        {/* Content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
          {/* Contact Info */}
          <div>
            <p className="text-frosted-blue/80 text-lg mb-8">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll get back to you!
            </p>
            
            <div className="space-y-5">
              <a href={`mailto:${profile.email}`} className="contact-method-item flex items-center gap-5 p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl transition-all hover:border-punch-red hover:translate-x-2 opacity-0">
                <div className="w-12 h-12 bg-linear-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <span className="text-frosted-blue/60 text-sm uppercase tracking-wider block">Email</span>
                  <span className="font-semibold">{profile.email}</span>
                </div>
              </a>
              
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="contact-method-item flex items-center gap-5 p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl transition-all hover:border-punch-red hover:translate-x-2 opacity-0">
                <div className="w-12 h-12 bg-linear-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <span className="text-frosted-blue/60 text-sm uppercase tracking-wider block">Phone</span>
                  <span className="font-semibold">{profile.phone}</span>
                </div>
              </a>
              
              <div className="contact-method-item flex items-center gap-5 p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl opacity-0">
                <div className="w-12 h-12 bg-linear-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
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
