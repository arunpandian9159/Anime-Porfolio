import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { profileData } from '../data/profileData';
import { useCountUp } from '../hooks/useAnime';

const StatCard = ({ icon, value, label, delay }) => {
  const countRef = useCountUp(value);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              anime({
                targets: cardRef.current,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                easing: 'easeOutExpo'
              });
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={cardRef} className="opacity-0 bg-gradient-to-br from-oxford-navy/80 to-cerulean/30 border border-frosted-blue/20 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:border-punch-red hover:glow-red">
      <div className="text-3xl text-frosted-blue mb-3">
        <i className={icon}></i>
      </div>
      <div className="font-display text-4xl font-bold text-punch-red">
        <span ref={countRef}>0</span>+
      </div>
      <div className="text-frosted-blue/80 text-sm uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.about-header .section-tag',
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.about-header .section-title',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.about-header .title-decoration',
              width: [0, 80],
              duration: 600,
              delay: 400,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.about-card',
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 800,
              delay: 600,
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

  const { profile, stats } = profileData;

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-cerulean/10 at-20% via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-radial from-punch-red/10 at-80% via-transparent to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="about-header text-center mb-16">
          <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
            Introduction
          </span>
          <h2 className="section-title font-display text-4xl md:text-5xl font-bold mb-4 opacity-0">
            About <span className="text-punch-red">Me</span>
          </h2>
          <div className="title-decoration w-0 h-1 bg-gradient-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
          {/* Card */}
          <div className="about-card bg-oxford-navy/50 border border-frosted-blue/20 rounded-2xl p-8 relative overflow-hidden opacity-0">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-punch-red/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10">
              <p className="text-frosted-blue/90 text-lg mb-5 leading-relaxed">
                An aspiring full-stack developer with a strong foundation in front-end and back-end technologies. I have a passion for building responsive, scalable, and user-focused web applications.
              </p>
              <p className="text-frosted-blue/90 text-lg mb-8 leading-relaxed">
                I am committed to writing clean, efficient code and continuously learning new tools and frameworks. My goal is to deliver seamless user experiences through intuitive interfaces and robust server-side logic.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-frosted-blue">
                  <i className="fas fa-map-marker-alt text-punch-red w-5"></i>
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-4 text-frosted-blue">
                  <i className="fas fa-envelope text-punch-red w-5"></i>
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-4 text-frosted-blue">
                  <i className="fas fa-phone text-punch-red w-5"></i>
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5">
            <StatCard icon="fas fa-project-diagram" value={stats.projects} label="Projects" delay={0} />
            <StatCard icon="fas fa-code" value={stats.technologies} label="Technologies" delay={100} />
            <StatCard icon="fas fa-briefcase" value={stats.internships} label="Internships" delay={200} />
            <StatCard icon="fas fa-award" value={stats.certifications} label="Certifications" delay={300} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
