import { memo, useCallback, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { isGoogleDriveUrl, getDriveEmbedUrl } from "../../utils/videoUtils";

/**
 * ProjectDetailModal — Two-column modal matching screenshot reference.
 * Left: Image carousel + Role/Team metadata cards
 * Right: Project Brief bullets + Technical Architecture tags
 * Bottom: Action buttons (View Code + Live Link)
 */
const ProjectDetailModal = memo(({ isOpen, onClose, project, category }) => {
  const modalRef = useRef(null);
  const projectKey = project?.title || "";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [prevKey, setPrevKey] = useState(projectKey);
  if (prevKey !== projectKey) {
    setPrevKey(projectKey);
    setCurrentImageIndex(0);
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === modalRef.current) onClose();
    },
    [onClose],
  );

  if (!isOpen || !project) return null;

  const cat = category || {};
  const images = project.images || [];
  const descriptions = Array.isArray(project.description)
    ? project.description
    : [project.description];

  const modalContent = (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-oxford-navy-dark/95 backdrop-blur-md p-3 md:p-8"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
    >
      {/* Modal container */}
      <div
        className="w-full max-w-[95%] md:max-w-[85%] max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a1628]/98 border border-frosted-blue/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 md:px-10 pt-4 md:pt-8 pb-3 md:pb-4 border-b border-frosted-blue/10">
          <h2 className="text-punch-red font-display text-lg md:text-2xl font-bold uppercase tracking-wider leading-tight">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-honeydew transition-colors cursor-pointer shrink-0 ml-4"
            aria-label="Close modal"
          >
            <i className="fas fa-times text-base"></i>
          </button>
        </div>

        {/* Two-column body */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-10 p-4 md:p-10">
          {/* Left column — Image + Metadata */}
          <div className="w-full md:w-[42%] shrink-0 flex flex-col gap-5">
            {/* Image carousel — hidden when video is available */}
            {images.length > 0 && !project.videoSrc && (
              <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-oxford-navy/50">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} preview ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                      i === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Left/Right arrow navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev - 1 + images.length) % images.length,
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-9 md:h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors cursor-pointer backdrop-blur-sm"
                      aria-label="Previous image"
                    >
                      <i className="fas fa-chevron-left text-sm"></i>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % images.length,
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 md:w-9 md:h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors cursor-pointer backdrop-blur-sm"
                      aria-label="Next image"
                    >
                      <i className="fas fa-chevron-right text-sm"></i>
                    </button>
                  </>
                )}

                {/* Image navigation dots */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                          i === currentImageIndex
                            ? "bg-punch-red scale-110"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Video Player */}
            {project.videoSrc && (
              <div className="w-full rounded-xl overflow-hidden bg-oxford-navy/50 border border-frosted-blue/8">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-frosted-blue/8">
                  <i className="fas fa-play-circle text-punch-red text-sm"></i>
                  <span className="font-display text-xs font-bold text-honeydew/60 uppercase tracking-[0.2em]">
                    Demo Video
                  </span>
                </div>
                <div className="relative w-full aspect-video">
                  {isGoogleDriveUrl(project.videoSrc) ? (
                    <iframe
                      src={getDriveEmbedUrl(project.videoSrc)}
                      title={`${project.title} demo video`}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <video
                      src={project.videoSrc}
                      poster={
                        project.videoPoster ||
                        (project.images && project.images[0])
                      }
                      controls
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain bg-black"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Role + Team Size metadata cards */}
            <div className="flex flex-col sm:flex-row gap-3">
              {project.role && (
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-oxford-navy/60 border border-frosted-blue/8">
                  <div className="w-9 h-9 rounded-lg bg-frosted-blue/10 flex items-center justify-center shrink-0">
                    <i className="fas fa-briefcase text-frosted-blue/70 text-sm"></i>
                  </div>
                  <div>
                    <p className="text-honeydew/40 text-[10px] font-bold uppercase tracking-wider">
                      Role
                    </p>
                    <p className="text-honeydew text-sm font-semibold leading-tight">
                      {project.role}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-oxford-navy/60 border border-frosted-blue/8">
                <div className="w-9 h-9 rounded-lg bg-frosted-blue/10 flex items-center justify-center shrink-0">
                  <i
                    className={`${project.teamSize === 1 ? "fas fa-user" : "fas fa-users"} text-frosted-blue/70 text-sm`}
                  ></i>
                </div>
                <div>
                  <p className="text-honeydew/40 text-[10px] font-bold uppercase tracking-wider">
                    Team Size
                  </p>
                  <p className="text-honeydew text-sm font-semibold">
                    {project.teamSize === 1
                      ? "Solo"
                      : `${project.teamSize} Members`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Brief + Tech */}
          <div className="flex-1 flex flex-col">
            {/* Project Brief */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-file-alt text-frosted-blue/60 text-sm"></i>
                <h3 className="font-display text-xs font-bold text-honeydew/60 uppercase tracking-[0.2em]">
                  Project Brief
                </h3>
              </div>
              <div className="space-y-3">
                {descriptions.map((desc, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${cat.dotClass || "bg-cerulean"}`}
                    ></span>
                    <p
                      className="text-honeydew/65 text-sm md:text-xl leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: desc.replace(
                          /\*\*(.*?)\*\*/g,
                          '<span class="text-honeydew font-semibold">$1</span>',
                        ),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Architecture */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <i className="fas fa-code text-frosted-blue/60 text-sm"></i>
                <h3 className="font-display text-xs font-bold text-honeydew/60 uppercase tracking-[0.2em]">
                  Technical Architecture
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-xs font-bold rounded-full bg-punch-red/15 text-punch-red border border-punch-red/30 uppercase tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            {project.isPublished && (
              <div className="mb-6">
                <span className="bg-cerulean/15 text-cerulean-light px-3 py-1 rounded-full text-xs font-bold border border-cerulean/20">
                  <i className="fas fa-book mr-1.5"></i>IEEE Published
                </span>
              </div>
            )}

            {/* Action buttons — pushed to bottom */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-auto pt-5 md:pt-6 border-t border-white/5">
              {project.repoLink && (
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 md:py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
                >
                  <i className="fas fa-code text-xs"></i>
                  View Code
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 md:py-2.5 rounded-lg bg-punch-red hover:bg-punch-red-light text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-punch-red/15 cursor-pointer"
                >
                  Live Link
                  <i className="fas fa-arrow-up-right-from-square text-xs"></i>
                </a>
              )}
              {project.ieeeLink && (
                <a
                  href={project.ieeeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 md:py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
                >
                  <i className="fas fa-file-alt text-xs"></i>
                  IEEE Paper
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
});

ProjectDetailModal.displayName = "ProjectDetailModal";

export default ProjectDetailModal;
