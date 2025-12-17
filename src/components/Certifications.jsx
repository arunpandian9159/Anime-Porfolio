import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';
import { profileData } from '../data/profileData';

const CertCard = ({ cert, index, onImageClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(cardRef.current, {
              opacity: [0, 1],
              rotateY: [45, 0],
              duration: 800,
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
    <div 
      ref={cardRef} 
      className="cert-card opacity-0 bg-linear-to-br from-oxford-navy/80 to-cerulean/20 border border-frosted-blue/20 rounded-2xl p-4 text-center transition-all hover:border-punch-red hover:-translate-y-1 relative overflow-hidden cursor-pointer group"
      onClick={() => cert.image && onImageClick(cert.image, cert.title)}
    >
      {cert.image ? (
        <div className="aspect-4/3 rounded-lg overflow-hidden mb-3">
          <img 
            src={cert.image} 
            alt={cert.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
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
};

const AchievementItem = ({ item, index, onImageClick }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(itemRef.current, {
              opacity: [0, 1],
              translateX: [-30, 0],
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
    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div 
      ref={itemRef} 
      className={`opacity-0 flex items-center gap-4 bg-oxford-navy/50 border border-frosted-blue/15 rounded-xl p-5 transition-all hover:border-punch-red hover:translate-x-1 ${item.image ? 'cursor-pointer' : ''}`}
      onClick={() => item.image && onImageClick(item.image, item.text)}
    >
      {item.image ? (
        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0">
          <img src={item.image} alt={item.text} className="w-full h-full object-cover" />
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
          onClick={(e) => e.stopPropagation()}
        >
          <i className="fas fa-file-pdf text-xl"></i>
        </a>
      )}
    </div>
  );
};

const ImageModal = ({ image, title, onClose }) => {
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
};

const Certifications = () => {
  const sectionRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleImageClick = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
  };

  const handleCloseModal = () => {
    setModalImage(null);
    setModalTitle('');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate('.cert-header .section-tag', {
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            animate('.cert-header .section-title', {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            animate('.cert-header .title-decoration', {
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

  const { certifications, achievements } = profileData;

  return (
    <>
      <section id="certifications" ref={sectionRef} className="py-24 bg-oxford-navy-dark">
        <div className="max-w-6xl mx-auto px-5">
          {/* Header */}
          <div className="cert-header text-center mb-16">
            <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
              Credentials
            </span>
            <h2 className="section-title font-display text-4xl md:text-5xl font-bold mb-4 opacity-0">
              Certifications & <span className="text-punch-red">Achievements</span>
            </h2>
            <div className="title-decoration w-0 h-1 bg-linear-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
          </div>

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
