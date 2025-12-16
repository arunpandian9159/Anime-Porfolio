import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { profileData } from '../data/profileData';

const EducationCard = ({ edu, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.95, 1],
              duration: 700,
              delay: index * 150,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className={`opacity-0 ${edu.isMain ? 'bg-gradient-to-br from-punch-red/10 to-oxford-navy/50 border-punch-red' : 'bg-oxford-navy-dark/50 border-frosted-blue/15'} border rounded-2xl p-7 text-center transition-all hover:-translate-y-1 hover:border-punch-red`}>
      <div className="w-16 h-16 bg-gradient-to-br from-punch-red to-cerulean rounded-full flex items-center justify-center mx-auto mb-5 text-2xl text-honeydew">
        <i className={`fas ${edu.icon}`}></i>
      </div>
      <span className="inline-block px-4 py-1 bg-frosted-blue/10 rounded-full text-sm text-frosted-blue mb-4">{edu.year}</span>
      <h3 className="text-lg font-bold mb-2">{edu.degree}</h3>
      <p className="text-frosted-blue/80 mb-1">{edu.institution}</p>
      <p className="text-frosted-blue/60 text-sm mb-4">
        <i className="fas fa-map-marker-alt mr-2"></i>{edu.location}
      </p>
      <span className="inline-block px-5 py-2 bg-punch-red text-honeydew rounded-full font-semibold">{edu.grade}</span>
    </div>
  );
};

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.edu-header .section-tag',
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.edu-header .section-title',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.edu-header .title-decoration',
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

  const { education } = profileData;

  return (
    <section id="education" ref={sectionRef} className="py-24 bg-oxford-navy relative">
      <div className="absolute inset-0 bg-gradient-radial from-punch-red/10 to-transparent opacity-50 -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="edu-header text-center mb-16">
          <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
            Academics
          </span>
          <h2 className="section-title font-display text-4xl md:text-5xl font-bold mb-4 opacity-0">
            Education <span className="text-punch-red">Journey</span>
          </h2>
          <div className="title-decoration w-0 h-1 bg-gradient-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <EducationCard key={edu.degree} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
