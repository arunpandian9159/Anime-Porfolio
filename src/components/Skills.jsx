import { memo, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import { profileData } from '../data/profileData';
import { useIntersectionAnimate } from '../hooks/useIntersectionAnimate';
import SectionHeader from './ui/SectionHeader';

const SkillCategory = memo(({ title, icon, skills, index }) => {
  const runAnimation = useCallback((element) => {
    animate(element, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 300,
      delay: index * 50,
      easing: 'easeOutExpo'
    });
    animate(element.querySelectorAll('.skill-tag'), {
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: stagger(30, { start: 150 + index * 50 }),
      duration: 200,
      easing: 'easeOutExpo'
    });
  }, [index]);

  const categoryRef = useIntersectionAnimate(runAnimation);

  return (
    <div ref={categoryRef} className="opacity-0 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-2xl p-5 md:p-7 transition-all hover:border-punch-red hover:-translate-y-1">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center text-xl text-honeydew">
          <i className={icon}></i>
        </div>
        <h3 className="font-display text-lg md:text-xl font-bold">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span key={i} className="skill-tag opacity-0 px-3 py-1.5 md:px-4 md:py-2 bg-frosted-blue/10 border border-frosted-blue/30 rounded-full text-sm text-frosted-blue transition-all cursor-default hover:bg-punch-red hover:border-punch-red hover:text-honeydew hover:scale-105">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
});

SkillCategory.displayName = 'SkillCategory';

const Skills = () => {
  const runHeaderAnimation = useCallback(() => {
    animate('.skills-header .section-tag', {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: 'easeOutExpo'
    });
    animate('.skills-header .section-title', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: 'easeOutExpo'
    });
    animate('.skills-header .title-decoration', {
      width: [0, 80], 
      duration: 300,
      delay: 200,
      easing: 'easeOutExpo'
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { skills } = profileData;

  const categories = [
    { title: 'Frontend', icon: 'fas fa-palette', skills: skills.frontend },
    { title: 'Backend', icon: 'fas fa-server', skills: skills.backend },
    { title: 'Tools', icon: 'fas fa-tools', skills: skills.tools },
    { title: 'Soft Skills', icon: 'fas fa-users', skills: skills.soft_skills }
  ];

  return (
    <section id="skills" ref={sectionRef} className="py-16 md:py-24 md:pb-0 bg-oxford-navy">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <SectionHeader
          tag="Expertise"
          title="Skills &"
          highlight="Arsenal"
          className="skills-header"
        />

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
