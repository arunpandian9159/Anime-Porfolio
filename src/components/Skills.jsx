import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { profileData } from '../data/profileData';

const SkillCategory = ({ title, icon, skills, index }) => {
  const categoryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(categoryRef.current, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: index * 100,
              easing: 'easeOutExpo'
            });
            animate(categoryRef.current.querySelectorAll('.skill-tag'), {
              opacity: [0, 1],
              scale: [0.8, 1],
              delay: stagger(50, { start: 300 + index * 100 }),
              duration: 400,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (categoryRef.current) observer.observe(categoryRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={categoryRef} className="opacity-0 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl p-7 transition-all hover:border-punch-red hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 bg-linear-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
          <i className={icon}></i>
        </div>
        <h3 className="font-display text-xl font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span key={i} className="skill-tag opacity-0 px-4 py-2 bg-frosted-blue/10 border border-frosted-blue/30 rounded-full text-sm text-frosted-blue transition-all cursor-default hover:bg-punch-red hover:border-punch-red hover:text-honeydew hover:scale-105">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.skills-header .section-tag', {
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            animate('.skills-header .section-title', {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            animate('.skills-header .title-decoration', {
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

  const { skills } = profileData;

  const categories = [
    { title: 'Frontend', icon: 'fas fa-palette', skills: skills.frontend },
    { title: 'Backend', icon: 'fas fa-server', skills: skills.backend },
    { title: 'Tools', icon: 'fas fa-tools', skills: skills.tools },
    { title: 'Soft Skills', icon: 'fas fa-users', skills: skills.soft_skills }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-0 bg-oxford-navy">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="skills-header text-center mb-16">
          <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
            Expertise
          </span>
          <h2 className="section-title font-display text-4xl md:text-5xl font-bold mb-4 opacity-0">
            Skills & <span className="text-punch-red">Arsenal</span>
          </h2>
          <div className="title-decoration w-0 h-1 bg-linear-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-7">
          {categories.map((cat, i) => (
            <SkillCategory key={cat.title} {...cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
