import { memo, useCallback, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * ProjectDetailModal — premium full-screen modal for project details.
 * Opens when a project card is clicked. Shows all project info:
 * images, full description, tech stack, team, links, etc.
 */
const ProjectDetailModal = memo(({ isOpen, onClose, project, category }) => {
  const modalRef = useRef(null);
  const projectKey = project?.title || "";
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes via key check
  const [prevKey, setPrevKey] = useState(projectKey);
  if (prevKey !== projectKey) {
    setPrevKey(projectKey);
    setCurrentImageIndex(0);
  }

  // Handle ESC key
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

  // Backdrop click
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-oxford-navy-dark/95 backdrop-blur-md p-4 md:p-8"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Project details: ${project.title}`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-honeydew transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <i className="fas fa-times text-lg"></i>
      </button>

      {/* Modal content */}
      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-oxford-navy/95 border border-frosted-blue/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image section */}
        {images.length > 0 && (
          <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-t-2xl">
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

            {/* Image navigation dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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

            {/* Category + Team overlay badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-oxford-navy-dark/70 backdrop-blur-sm border border-white/10">
              <span
                className={`w-2 h-2 rounded-full ${cat.dotClass || "bg-cerulean"}`}
              ></span>
              <span className="text-[10px] font-bold text-honeydew/90 uppercase tracking-wider">
                {cat.label || "Project"}
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-oxford-navy-dark/70 backdrop-blur-sm border border-white/10">
              <i
                className={`${project.teamSize === 1 ? "fas fa-user" : "fas fa-users"} text-[10px] text-frosted-blue/80`}
              ></i>
              <span className="text-[10px] font-bold text-honeydew/80 uppercase tracking-wider">
                {project.teamSize === 1
                  ? "Solo"
                  : `Team of ${project.teamSize}`}
              </span>
            </div>

            {/* Gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-oxford-navy/95 to-transparent pointer-events-none"></div>
          </div>
        )}

        {/* Content section */}
        <div className="p-6 md:p-10">
          {/* Title */}
          <h2 className="text-honeydew font-display text-2xl md:text-4xl font-bold mb-2 leading-tight">
            {project.title}
          </h2>

          {/* Role */}
          {project.role && (
            <p className="text-frosted-blue/70 text-sm font-medium mb-6">
              <i className="fas fa-briefcase mr-2 text-xs"></i>
              {project.role}
            </p>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-bold rounded-full bg-frosted-blue/10 text-frosted-blue/80 border border-frosted-blue/15 uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Full description */}
          <div className="space-y-4 mb-8">
            {descriptions.map((desc, i) => (
              <p
                key={i}
                className="text-honeydew/70 text-sm md:text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: desc.replace(
                    /\*\*(.*?)\*\*/g,
                    '<span class="text-honeydew font-semibold">$1</span>',
                  ),
                }}
              />
            ))}
          </div>

          {/* Badges row */}
          <div className="flex gap-2 flex-wrap mb-8">
            {project.isPublished && (
              <span className="bg-cerulean/15 text-cerulean-light px-3 py-1 rounded-full text-xs font-bold border border-cerulean/20">
                <i className="fas fa-book mr-1.5"></i>IEEE Published
              </span>
            )}
            <span className="bg-frosted-blue/10 text-frosted-blue/70 px-3 py-1 rounded-full text-xs font-bold border border-frosted-blue/10">
              <i
                className={
                  project.teamSize === 1
                    ? "fas fa-user mr-1.5"
                    : "fas fa-users mr-1.5"
                }
              ></i>
              {project.teamSize === 1
                ? "Solo Project"
                : `Team of ${project.teamSize}`}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg bg-punch-red hover:bg-punch-red-light text-white font-bold text-sm transition-all duration-200 flex items-center gap-2 uppercase tracking-widest shadow-lg shadow-punch-red/15 cursor-pointer"
              >
                View Live Demo
                <i className="fas fa-arrow-up-right-from-square text-xs"></i>
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-sm transition-all duration-200 flex items-center gap-2 uppercase tracking-widest cursor-pointer"
              >
                <i className="fab fa-github text-base"></i>
                Source Code
              </a>
            )}
            {project.ieeeLink && (
              <a
                href={project.ieeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-sm transition-all duration-200 flex items-center gap-2 uppercase tracking-widest cursor-pointer"
              >
                <i className="fas fa-file-alt text-base"></i>
                IEEE Paper
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
});

ProjectDetailModal.displayName = "ProjectDetailModal";

export default ProjectDetailModal;
