import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { profileData } from '../data/profileData';

const TimelineItem = ({ exp, index }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: itemRef.current,
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 800,
              delay: index * 200,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={itemRef} className="relative pl-10 pb-10 opacity-0">
      {/* Marker */}
      <div className="absolute left-[-9px] top-1">
        <div className="w-5 h-5 bg-punch-red rounded-full border-3 border-oxford-navy-dark"></div>
        <div className="absolute -inset-1 border-2 border-punch-red rounded-full marker-pulse"></div>
      </div>
      
      {/* Card */}
      <div className="bg-oxford-navy/60 border border-frosted-blue/20 rounded-2xl p-6 transition-all hover:border-punch-red hover:glow-red">
        <div className="flex justify-between items-center flex-wrap gap-3 mb-4">
          <span className="bg-punch-red/20 text-punch-red px-4 py-1 rounded-full text-sm font-semibold">{exp.company}</span>
          <span className="text-frosted-blue text-sm">{exp.duration}</span>
        </div>
        <h3 className="text-xl font-bold mb-3">{exp.role}</h3>
        <p className="text-frosted-blue/80 mb-4">{exp.description}</p>
        <div className="flex gap-3 flex-wrap">
          {exp.tech.map((t, i) => (
            <span key={i} className="px-3 py-1 bg-frosted-blue/10 rounded-full text-sm text-frosted-blue">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.exp-header .section-tag',
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.exp-header .section-title',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.exp-header .title-decoration',
              width: [0, 80],
              duration: 600,
              delay: 400,
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

  const { experience } = profileData;

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-oxford-navy-dark to-oxford-navy -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="exp-header text-center mb-16">
          <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
            Journey
          </span>
          <h2 className="section-title font-display text-4xl md:text-5xl font-bold mb-4 opacity-0">
            Work <span className="text-punch-red">Experience</span>
          </h2>
          <div className="title-decoration w-0 h-1 bg-gradient-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto pl-8">
          {/* Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-punch-red to-frosted-blue"></div>
          
          {experience.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
