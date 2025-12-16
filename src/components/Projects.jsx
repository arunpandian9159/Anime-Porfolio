import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { profileData } from '../data/profileData';

const FeaturedProject = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
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
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className={`opacity-0 grid md:grid-cols-[1fr_1.2fr] bg-oxford-navy/50 border border-frosted-blue/20 rounded-2xl overflow-hidden transition-all hover:border-punch-red hover:-translate-y-1 hover:shadow-2xl ${index % 2 === 1 ? 'md:grid-cols-[1.2fr_1fr]' : ''}`}>
      {/* Image */}
      <div className={`relative min-h-72 bg-gradient-to-br from-cerulean to-oxford-navy-light flex items-center justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
        <i className={`${project.icon} text-7xl text-honeydew/30`}></i>
        <div className="absolute inset-0 bg-gradient-to-br from-punch-red/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
      </div>
      
      {/* Info */}
      <div className={`p-7 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <div className="flex gap-3 flex-wrap mb-4">
          <span className="bg-punch-red text-honeydew px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
          <span className="bg-frosted-blue/20 text-frosted-blue px-3 py-1 rounded-full text-xs font-semibold">
            <i className={project.teamSize === 1 ? 'fas fa-user' : 'fas fa-users'}></i> {project.teamSize === 1 ? 'Solo' : `Team of ${project.teamSize}`}
          </span>
          {project.isPublished && (
            <span className="bg-cerulean/30 text-cerulean-light px-3 py-1 rounded-full text-xs font-semibold">
              <i className="fas fa-book"></i> IEEE Published
            </span>
          )}
        </div>
        
        <h3 className="font-display text-2xl font-bold mb-4">{project.title}</h3>
        <p className="text-frosted-blue/80 mb-5">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t, i) => (
            <span key={i} className="px-3 py-1 bg-punch-red/15 border border-punch-red/30 rounded-full text-xs text-punch-red">{t}</span>
          ))}
        </div>
        
        <div className="flex gap-5">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-frosted-blue hover:text-punch-red transition-colors font-medium">
              <i className="fas fa-external-link-alt mr-2"></i>Live Demo
            </a>
          )}
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-frosted-blue hover:text-punch-red transition-colors font-medium">
              <i className="fab fa-github mr-2"></i>Source Code
            </a>
          )}
          {project.ieeeLink && (
            <a href={project.ieeeLink} target="_blank" rel="noopener noreferrer" className="text-frosted-blue hover:text-punch-red transition-colors font-medium">
              <i className="fas fa-file-alt mr-2"></i>IEEE Paper
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const MiniProject = ({ project, index }) => {
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
              duration: 600,
              delay: index * 100,
              easing: 'easeOutExpo'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={cardRef} className="opacity-0 bg-oxford-navy/50 border border-frosted-blue/15 rounded-2xl p-6 transition-all hover:border-punch-red hover:-translate-y-1">
      <div className="flex justify-between mb-5">
        <div className="text-4xl text-frosted-blue">
          <i className="fas fa-folder-open"></i>
        </div>
        {project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-frosted-blue/60 hover:text-punch-red text-xl">
            <i className="fas fa-external-link-alt"></i>
          </a>
        )}
      </div>
      
      <h4 className="text-lg font-bold mb-3">{project.title}</h4>
      <p className="text-frosted-blue/70 text-sm mb-5">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 text-sm text-frosted-blue mb-4">
        {project.tech.map((t, i) => (
          <span key={i}>{t}{i < project.tech.length - 1 && <span className="ml-2 text-frosted-blue/40">•</span>}</span>
        ))}
      </div>
      
      <div className="flex justify-between text-sm text-frosted-blue/60">
        <span><i className="fas fa-users mr-2"></i>Team of {project.teamSize}</span>
        <span className="text-punch-red">{project.role}</span>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.proj-header .section-tag',
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.proj-header .section-title',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.proj-header .title-decoration',
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

  const { projects } = profileData;
  const featured = projects.filter(p => p.featured);
  const other = projects.filter(p => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-oxford-navy-dark">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="proj-header text-center mb-16">
          <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
            Portfolio
          </span>
          <h2 className="section-title font-display text-4xl md:text-5xl font-bold mb-4 opacity-0">
            Featured <span className="text-punch-red">Projects</span>
          </h2>
          <div className="title-decoration w-0 h-1 bg-gradient-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-10 mb-16">
          {featured.map((project, i) => (
            <FeaturedProject key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Other Projects */}
        <h3 className="font-display text-2xl text-frosted-blue text-center mb-8">Other Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {other.map((project, i) => (
            <MiniProject key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
