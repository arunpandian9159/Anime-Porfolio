import { memo, useCallback, useState, useEffect } from "react";
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "./ui/SectionHeader";
import ScrollStack from "./ui/ScrollStack";
import VideoPreview from "./ui/VideoPreview";
import VideoModal from "./ui/VideoModal";

const ProjectCardContent = memo(({ project, index, onVideoExpand }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Only auto-rotate images if no video and multiple images exist
    if (!project.videoSrc && project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [project.images, project.videoSrc]);

  const handleVideoExpand = useCallback(() => {
    if (onVideoExpand) {
      const videoPoster =
        project.videoPoster || (project.images && project.images[0]);
      onVideoExpand(project.videoSrc, videoPoster, project.title);
    }
  }, [onVideoExpand, project]);

  // Determine poster image for video
  const videoPoster =
    project.videoPoster || (project.images && project.images[0]);

  return (
    <div className="h-full grid md:grid-cols-2">
      {/* Image/Video Section */}
      <div
        className={`relative bg-linear-to-br from-cerulean to-oxford-navy-light hidden md:flex items-center justify-center overflow-hidden ${
          !project.images && !project.videoSrc ? "p-6" : ""
        }`}
      >
        {/* Video Preview - shown if videoSrc exists */}
        {project.videoSrc ? (
          <VideoPreview
            videoSrc={project.videoSrc}
            posterSrc={videoPoster}
            alt={`${project.title} demo video`}
            onExpand={handleVideoExpand}
          />
        ) : project.images && project.images.length > 0 ? (
          /* Image carousel - fallback when no video */
          <div className="absolute inset-0 w-full h-full">
            {project.imageLayout === "split-vertical" ? (
              <div className="flex flex-col h-full w-full">
                {project.images.slice(0, 2).map((img, i) => (
                  <div
                    key={i}
                    className="h-1/2 w-full relative overflow-hidden border-b last:border-b-0 border-frosted-blue/10"
                  >
                    <img
                      src={img}
                      alt={`${project.title} part ${i + 1}`}
                      className="w-full h-full object-cover object-top-left"
                    />
                  </div>
                ))}
              </div>
            ) : (
              project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} preview ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover object-top-left transition-opacity duration-1000 ${
                    i === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))
            )}
            {/* Gradient Overlay for text readability if needed, or just style */}
            <div className="absolute inset-0 bg-oxford-navy/10 group-hover:bg-transparent transition-colors duration-300"></div>
          </div>
        ) : (
          /* Icon fallback when no images or video */
          <>
            <i
              className={`${
                project.icon || "fas fa-code"
              } text-9xl text-honeydew/30`}
            ></i>
            <div className="absolute inset-0 bg-linear-to-br from-punch-red/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
          </>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 md:p-5 flex flex-col justify-center bg-oxford-navy/50">
        <div className="flex gap-2 flex-wrap lg:mb-6 mb-2">
          {project.featured && (
            <span className="bg-punch-red text-honeydew px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          <span className="bg-frosted-blue/20 text-frosted-blue px-3 py-1 rounded-full text-xs font-semibold">
            <i
              className={
                project.teamSize === 1 ? "fas fa-user" : "fas fa-users"
              }
            ></i>{" "}
            {project.teamSize === 1 ? "Solo" : `Team of ${project.teamSize}`}
          </span>
          {project.isPublished && (
            <span className="bg-cerulean/30 text-cerulean-light px-3 py-1 rounded-full text-xs font-semibold">
              <i className="fas fa-book"></i> IEEE Published
            </span>
          )}
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-bold lg:mb-4 mb-2 text-white">
          {project.title}
        </h3>
        {Array.isArray(project.description) ? (
          <ul className="list-disc list-outside ml-5 text-frosted-blue/80 mb-4 space-y-2">
            {project.description.map((point, idx) => (
              <li key={idx} className={idx >= 2 ? "hidden md:list-item" : ""}>
                {point}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-frosted-blue/80 mb-6 text-base md:text-lg leading-relaxed">
            {project.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-punch-red/15 border border-punch-red/30 rounded-full text-sm text-punch-red"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-6 mt-auto">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-frosted-blue hover:text-punch-red transition-colors font-medium flex items-center text-base md:text-lg"
            >
              <i className="fas fa-external-link-alt mr-2"></i>Live Demo
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-frosted-blue hover:text-punch-red transition-colors font-medium flex items-center text-base md:text-lg"
            >
              <i className="fab fa-github mr-2"></i>Code
            </a>
          )}
          {project.ieeeLink && (
            <a
              href={project.ieeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-frosted-blue hover:text-punch-red transition-colors font-medium hidden md:flex items-center text-lg"
            >
              <i className="fas fa-file-alt mr-2"></i>Paper
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCardContent.displayName = "ProjectCardContent";

const Projects = () => {
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoSrc: null,
    posterSrc: null,
    title: "",
  });

  const handleVideoExpand = useCallback((videoSrc, posterSrc, title) => {
    setVideoModal({
      isOpen: true,
      videoSrc,
      posterSrc,
      title,
    });
  }, []);

  const handleCloseVideoModal = useCallback(() => {
    setVideoModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const runHeaderAnimation = useCallback(() => {
    animate(".proj-header .section-tag", {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: "easeOutExpo",
    });
    animate(".proj-header .section-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: "easeOutExpo",
    });
    animate(".proj-header .title-decoration", {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: "easeOutExpo",
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { projects } = profileData;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 bg-oxford-navy-dark"
    >
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
              <ProjectCardContent
                project={project}
                index={index}
                onVideoExpand={handleVideoExpand}
              />
            )}
          />
        </div>
      </div>

      {/* Video Modal - rendered at Projects level for proper z-index */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideoModal}
        videoSrc={videoModal.videoSrc}
        posterSrc={videoModal.posterSrc}
        title={videoModal.title}
      />
    </section>
  );
};

export default Projects;
