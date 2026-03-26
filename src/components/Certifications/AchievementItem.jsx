import { memo, useCallback, useMemo } from "react";
import { useIntersectionAnimate } from "../../hooks/useIntersectionAnimate";

const AchievementItem = memo(({ item, index, onImageClick }) => {
  const animationConfig = {
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 300,
    delay: index * 50,
    easing: "easeOutExpo",
  };

  const itemRef = useIntersectionAnimate(animationConfig);

  // Normalize image to always be an array (or null)
  const images = useMemo(() => {
    if (!item.image) return null;
    return Array.isArray(item.image) ? item.image : [item.image];
  }, [item.image]);

  const handleClick = useCallback(() => {
    if (images) {
      onImageClick(images, item.text);
    }
  }, [images, item.text, onImageClick]);

  const handleLinkClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`opacity-0 bg-oxford-navy/50 border border-frosted-blue/15 rounded-lg md:rounded-xl p-4 md:p-5 transition-all hover:border-punch-red hover:translate-x-1 ${
        images ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 md:gap-4">
        {/* Icon or Image */}
        {images ? (
          <div className="w-12 h-9 md:w-16 md:h-12 rounded-lg overflow-hidden shrink-0">
            <img
              src={images[0]}
              alt={item.text}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-9 h-9 md:w-11 md:h-11 bg-linear-to-br from-punch-red to-cerulean rounded-lg md:rounded-xl flex items-center justify-center shrink-0">
            <i
              className={`${item.icon} text-honeydew text-sm md:text-base`}
            ></i>
          </div>
        )}

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          <span className="text-frosted-blue/90 text-sm md:text-base font-semibold md:font-normal block whitespace-normal leading-tight">
            {item.text}
          </span>
          {images && (
            <span className="block text-xs text-frosted-blue/50 mt-1">
              Click to view{" "}
              {images.length > 1
                ? `${images.length} certificates`
                : "certificate"}
            </span>
          )}
        </div>

        {/* PDF Link */}
        {item.paperLink && (
          <a
            href={item.paperLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View IEEE paper – Blockchain NFT Certification (opens PDF)"
            className="text-punch-red hover:text-punch-red-light transition-colors shrink-0 flex items-center gap-2 px-3 py-1 bg-punch-red/10 rounded-full md:bg-transparent md:p-0"
            onClick={handleLinkClick}
          >
            <span className="text-xs md:hidden">View PDF</span>
            <i className="fas fa-file-pdf text-lg md:text-xl"></i>
          </a>
        )}
      </div>
    </div>
  );
});

AchievementItem.displayName = "AchievementItem";

export default AchievementItem;
