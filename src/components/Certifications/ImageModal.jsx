import { memo, useState, useCallback } from "react";

const ImageModal = memo(({ images, title, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hasMultiple = images && images.length > 1;

  const handlePrev = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images],
  );

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images],
  );

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={title}
          className="max-w-full max-h-[85vh] object-contain"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
          <h3 className="text-honeydew font-semibold text-center">{title}</h3>
          {hasMultiple && (
            <p className="text-frosted-blue/70 text-sm text-center mt-1">
              {currentIndex + 1} / {images.length}
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 bg-punch-red rounded-full flex items-center justify-center text-honeydew hover:bg-punch-red-light transition-colors"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Navigation arrows */}
        {hasMultiple && (
          <>
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-honeydew transition-colors"
              onClick={handlePrev}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-honeydew transition-colors"
              onClick={handleNext}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
});

ImageModal.displayName = "ImageModal";

export default ImageModal;
