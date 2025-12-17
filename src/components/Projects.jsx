import { memo, useCallback, useState, useEffect } from 'react';
import { animate } from 'animejs';
import { profileData } from '../data/profileData';
import { useIntersectionAnimate } from '../hooks/useIntersectionAnimate';
import SectionHeader from './SectionHeader';
import ScrollStack from './ScrollStack';

const ProjectCardContent = memo(({ project, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [project.images]);

  return (
    <div className={`h-full grid md:grid-cols-2 ${index % 2 === 1 ? '' : ''} h-full`}>
      {/* Image/Icon Section */}
      <div className={`relative bg-linear-to-br from-cerulean to-oxford-navy-light flex items-center justify-center overflow-hidden ${index % 2 === 1 ? 'md:order-2' : ''} ${!project.images ? 'p-6' : ''}`}>
        {project.images && project.images.length > 0 ? (
          <div className="absolute inset-0 w-full h-full">
            {project.images.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt={`${project.title} preview ${i + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            {/* Gradient Overlay for text readability if needed, or just style */}
            <div className="absolute inset-0 bg-oxford-navy/10 group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
        ) : (
          <>
            <i className={`${project.icon || 'fas fa-code'} text-9xl text-honeydew/30`}></i>
            <div className="absolute inset-0 bg-linear-to-br from-punch-red/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
          </>
        )}
      </div>
      
      {/* Info Section */}
      <div className={`p-8 md:p-12 flex flex-col justify-center bg-oxford-navy/50 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
        <div className="flex gap-2 flex-wrap mb-6">
          {project.featured && (
            <span className="bg-punch-red text-honeydew px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
          )}
          <span className="bg-frosted-blue/20 text-frosted-blue px-3 py-1 rounded-full text-xs font-semibold">
            <i className={project.teamSize === 1 ? 'fas fa-user' : 'fas fa-users'}></i> {project.teamSize === 1 ? 'Solo' : `Team of ${project.teamSize}`}
          </span>
          {project.isPublished && (
            <span className="bg-cerulean/30 text-cerulean-light px-3 py-1 rounded-full text-xs font-semibold">
              <i className="fas fa-book"></i> IEEE Published
            </span>
          )}
        </div>
        
        <h3 className="font-display text-3xl font-bold mb-4 text-white">{project.title}</h3>
        <p className="text-frosted-blue/80 mb-6 text-lg leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, i) => (
            <span key={i} className="px-3 py-1 bg-punch-red/15 border border-punch-red/30 rounded-full text-sm text-punch-red">{t}</span>
          ))}
        </div>
        
        <div className="flex gap-6 mt-auto">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-frosted-blue hover:text-punch-red transition-colors font-medium flex items-center text-lg">
              <i className="fas fa-external-link-alt mr-2"></i>Live Demo
            </a>
          )}
          {project.repoLink && (
            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-frosted-blue hover:text-punch-red transition-colors font-medium flex items-center text-lg">
              <i className="fab fa-github mr-2"></i>Code
            </a>
          )}
          {project.ieeeLink && (
            <a href={project.ieeeLink} target="_blank" rel="noopener noreferrer" className="text-frosted-blue hover:text-punch-red transition-colors font-medium flex items-center text-lg">
              <i className="fas fa-file-alt mr-2"></i>Paper
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCardContent.displayName = 'ProjectCardContent';

const Projects = () => {
  const runHeaderAnimation = useCallback(() => {
    animate('.proj-header .section-tag', {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: 'easeOutExpo'
    });
    animate('.proj-header .section-title', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: 'easeOutExpo'
    });
    animate('.proj-header .title-decoration', {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: 'easeOutExpo'
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { projects } = profileData;

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-oxford-navy-dark">
      <div className="w-full px-5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <SectionHeader
            tag="Portfolio"
            title="Projects"
            highlight="Showcase"
            className="proj-header"
          />
        </div>

        {/* Scroll Stack */}
        <div className="w-full flex justify-center">
            <ScrollStack 
                items={projects} 
                itemContent={(project, index) => (
                    <ProjectCardContent project={project} index={index} />
                )} 
            />
        </div>
      </div>
    </section>
  );
};

export default Projects;
