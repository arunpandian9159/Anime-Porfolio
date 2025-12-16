import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { profileData } from '../data/profileData';

const CertCard = ({ cert, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
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
    <div ref={cardRef} className="cert-card opacity-0 bg-gradient-to-br from-oxford-navy/80 to-cerulean/20 border border-frosted-blue/20 rounded-2xl p-7 text-center transition-all hover:border-punch-red hover:-translate-y-1 relative overflow-hidden">
      <div className="text-4xl text-frosted-blue mb-4">
        <i className={cert.icon}></i>
      </div>
      <h4 className="font-semibold">{cert.title}</h4>
      <div className="cert-shine"></div>
    </div>
  );
};

const AchievementItem = ({ item, index }) => {
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
    <div ref={itemRef} className="opacity-0 flex items-center gap-4 bg-oxford-navy/50 border border-frosted-blue/15 rounded-xl p-5 transition-all hover:border-punch-red hover:translate-x-1">
      <div className="w-11 h-11 bg-gradient-to-br from-punch-red to-cerulean rounded-xl flex items-center justify-center flex-shrink-0">
        <i className={`${item.icon} text-honeydew`}></i>
      </div>
      <span className="text-frosted-blue/90">{item.text}</span>
    </div>
  );
};

const Certifications = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.cert-header .section-tag',
              opacity: [0, 1],
              translateY: [-20, 0],
              duration: 600,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.cert-header .section-title',
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 800,
              delay: 200,
              easing: 'easeOutExpo'
            });
            anime({
              targets: '.cert-header .title-decoration',
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
          <div className="title-decoration w-0 h-1 bg-gradient-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>

        {/* Achievements */}
        <h3 className="font-display text-2xl text-frosted-blue text-center mb-8">Achievements & Activities</h3>
        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {achievements.map((item, i) => (
            <AchievementItem key={item.text} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
