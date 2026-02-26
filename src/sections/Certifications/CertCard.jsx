import { memo, useCallback } from "react";
import { useIntersectionAnimate } from "../../hooks/useIntersectionAnimate";

const CertCard = memo(({ cert, index, onImageClick }) => {
  const animationConfig = {
    opacity: [0, 1],
    rotateY: [45, 0],
    duration: 400,
    delay: index * 50,
    easing: "easeOutExpo",
  };

  const cardRef = useIntersectionAnimate(animationConfig);

  const handleClick = useCallback(() => {
    if (cert.image) {
      onImageClick([cert.image], cert.title);
    }
  }, [cert.image, cert.title, onImageClick]);

  return (
    <div
      ref={cardRef}
      className="cert-card opacity-0 bg-linear-to-br from-oxford-navy/80 to-cerulean/20 border border-frosted-blue/20 rounded-xl md:rounded-2xl p-3 md:p-4 text-center transition-all hover:border-punch-red hover:-translate-y-1 relative overflow-hidden cursor-pointer group"
      onClick={handleClick}
    >
      {cert.image ? (
        <div className="aspect-4/3 rounded-lg overflow-hidden mb-2 md:mb-3">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="text-3xl md:text-4xl text-frosted-blue mb-3 md:mb-4 py-3 md:py-4">
          <i className={cert.icon}></i>
        </div>
      )}
      <h4 className="font-semibold text-xs md:text-sm">{cert.title}</h4>
      {cert.image && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <i className="fas fa-expand text-honeydew text-xl md:text-2xl"></i>
        </div>
      )}
      <div className="cert-shine"></div>
    </div>
  );
});

CertCard.displayName = "CertCard";

export default CertCard;
