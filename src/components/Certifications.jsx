import { memo, useState, useCallback } from 'react';
import { animate } from 'animejs';
import { profileData } from '../data/profileData';
import { useIntersectionAnimate } from '../hooks/useIntersectionAnimate';
import SectionHeader from './ui/SectionHeader';

const CertCard = memo(({ cert, index, onImageClick }) => {
  const animationConfig = {
    opacity: [0, 1],
    rotateY: [45, 0],
    duration: 400,
    delay: index * 50,
    easing: 'easeOutExpo'
  }; 

  const cardRef = useIntersectionAnimate(animationConfig);

  const handleClick = useCallback(() => {
    if (cert.image) {
      onImageClick(cert.image, cert.title);
    }
  }, [cert.image, cert.title, onImageClick]);

  return (
    <div 
      ref={cardRef} 
      className="cert-card opacity-0 bg-linear-to-br from-oxford-navy/80 to-cerulean/20 border border-frosted-blue/20 rounded-2xl p-4 text-center transition-all hover:border-punch-red hover:-translate-y-1 relative overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      {cert.image ? (
        <div className="aspect-4/3 rounded-lg overflow-hidden mb-3">
          <img 
            src={cert.image} 
            alt={cert.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="text-4xl text-frosted-blue mb-4 py-4">
          <i className={cert.icon}></i>
        </div>
      )}
      <h4 className="font-semibold text-sm">{cert.title}</h4>
      {cert.image && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <i className="fas fa-expand text-honeydew text-2xl"></i>
        </div>
      )}
      <div className="cert-shine"></div>
    </div>
  );
});

CertCard.displayName = 'CertCard';

const AchievementItem = memo(({ item, index, onImageClick }) => {
  const animationConfig = {
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 300,
    delay: index * 50,
    easing: 'easeOutExpo'
  };

  const itemRef = useIntersectionAnimate(animationConfig);

  const handleClick = useCallback(() => {
    if (item.image) {
      onImageClick(item.image, item.text);
    }
  }, [item.image, item.text, onImageClick]);

  const handleLinkClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div 
      ref={itemRef} 
      className={`opacity-0 flex items-center gap-4 bg-oxford-navy/50 border border-frosted-blue/15 rounded-xl p-5 transition-all hover:border-punch-red hover:translate-x-1 ${item.image ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {item.image ? (
        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
          <img src={item.image} alt={item.text} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div className="w-11 h-11 bg-linear-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center shrink-0">
          <i className={`${item.icon} text-honeydew`}></i>
        </div>
      )}
      <div className="flex-1">
        <span className="text-frosted-blue/90">{item.text}</span>
        {item.image && (
          <span className="block text-xs text-frosted-blue/50 mt-1">Click to view certificate</span>
        )}
      </div>
      {item.paperLink && (
        <a 
          href={item.paperLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-punch-red hover:text-punch-red-light transition-colors"
          onClick={handleLinkClick}
        >
          <i className="fas fa-file-pdf text-xl"></i>
        </a>
      )}
    </div>
  );
});

AchievementItem.displayName = 'AchievementItem';

const ImageModal = memo(({ image, title, onClose }) => {
  if (!image) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden">
        <img src={image} alt={title} className="max-w-full max-h-[85vh] object-contain" />
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
          <h3 className="text-honeydew font-semibold text-center">{title}</h3>
        </div>
        <button 
          className="absolute top-4 right-4 w-10 h-10 bg-punch-red rounded-full flex items-center justify-center text-honeydew hover:bg-punch-red-light transition-colors"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
});

ImageModal.displayName = 'ImageModal';

const Certifications = () => {
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleImageClick = useCallback((image, title) => {
    setModalImage(image);
    setModalTitle(title);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalImage(null);
    setModalTitle('');
  }, []);

  const runHeaderAnimation = useCallback(() => {
    animate('.cert-header .section-tag', {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: 'easeOutExpo'
    });
    animate('.cert-header .section-title', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: 'easeOutExpo'
    });
    animate('.cert-header .title-decoration', {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: 'easeOutExpo'
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { certifications, achievements } = profileData;

  return (
    <>
      <section id="certifications" ref={sectionRef} className="py-24 bg-oxford-navy-dark">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <SectionHeader
            tag="Credentials"
            title="Certifications &"
            highlight="Achievements"
            className="cert-header"
          />

          {/* Certifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mb-16">
            {certifications.map((cert, i) => (
              <CertCard key={cert.title} cert={cert} index={i} onImageClick={handleImageClick} />
            ))}
          </div>

          {/* Achievements */}
          <h3 className="font-display text-2xl text-frosted-blue text-center mb-8">Achievements & Activities</h3>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {achievements.map((item, i) => (
              <AchievementItem key={item.text} item={item} index={i} onImageClick={handleImageClick} />
            ))}
          </div>
        </div>
      </section>
      
      <ImageModal image={modalImage} title={modalTitle} onClose={handleCloseModal} />
    </>
  );
};

export default Certifications;
