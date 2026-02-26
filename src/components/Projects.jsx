import { memo, useCallback, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "./ui/SectionHeader";
import VideoPreview from "./ui/VideoPreview";
import VideoModal from "./ui/VideoModal";

// Category configuration
const CATEGORIES = {
  ai: {
    label: "AI & Intelligence",
    color: "punch-red",
    dotClass: "bg-punch-red",
    glowClass: "card-glow-ai",
    icon: "fas fa-brain",
    iconBg: "bg-punch-red/10",
    iconText: "text-punch-red",
    iconHoverBg: "group-hover:bg-punch-red",
  },
  fullstack: {
    label: "Full Stack",
    color: "cerulean",
    dotClass: "bg-cerulean",
    glowClass: "card-glow-fullstack",
    icon: "fas fa-layer-group",
    iconBg: "bg-cerulean/10",
    iconText: "text-cerulean",
    iconHoverBg: "group-hover:bg-cerulean",
  },
  blockchain: {
    label: "Blockchain & Web3",
    color: "frosted-blue",
    dotClass: "bg-frosted-blue",
    glowClass: "card-glow-blockchain",
    icon: "fas fa-link",
    iconBg: "bg-frosted-blue/10",
    iconText: "text-frosted-blue",
    iconHoverBg: "group-hover:bg-frosted-blue",
  },
};

// Determine card size based on project properties
const getCardSize = (project) => {
  if (project.featured) return "large";
  if (project.images && project.images.length > 0) return "medium";
  return "small";
};

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ---------- Large Project Card (featured, 2-col span) ----------
const LargeProjectCard = memo(({ project, category, onVideoExpand }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cat = CATEGORIES[category] || CATEGORIES.ai;

  useEffect(() => {
    if (!project.videoSrc && project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [project.images, project.videoSrc]);

  const handleVideoExpand = useCallback(() => {
    if (onVideoExpand && project.videoSrc) {
      const poster =
        project.videoPoster || (project.images && project.images[0]);
      onVideoExpand(project.videoSrc, poster, project.title);
    }
  }, [onVideoExpand, project]);

  const videoPoster =
    project.videoPoster || (project.images && project.images[0]);
  const firstImage = project.images && project.images[0];

  return (
    <motion.article
      variants={cardVariants}
      className={`bento-card col-span-1 md:col-span-2 row-span-2 group cursor-pointer ${cat.glowClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image / Video area */}
      <div
        className="relative w-full h-56 md:h-72 overflow-hidden rounded-t-xl"
        style={{
          backgroundImage: firstImage ? `url('${firstImage}')` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {project.videoSrc && (
          <div className="absolute inset-0 z-10">
            <VideoPreview
              videoSrc={project.videoSrc}
              posterSrc={videoPoster}
              alt={`${project.title} demo video`}
              onExpand={handleVideoExpand}
            />
          </div>
        )}

        {!project.videoSrc && project.images && project.images.length > 1 && (
          <div className="absolute inset-0">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.title} preview ${i + 1}`}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
                  i === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        )}

        {!project.videoSrc && project.images && project.images.length === 1 && (
          <img
            src={firstImage}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        )}

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-oxford-navy-dark/70 backdrop-blur-sm border border-white/10">
          <span className={`w-2 h-2 rounded-full ${cat.dotClass}`}></span>
          <span className="text-[10px] font-bold text-honeydew/90 uppercase tracking-wider">
            {cat.label}
          </span>
        </div>

        {/* Gradient overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-oxford-navy-dark/90 to-transparent pointer-events-none"></div>
      </div>

      {/* Content area */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 5).map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-frosted-blue/10 text-frosted-blue/80 border border-frosted-blue/15 uppercase tracking-wider"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-honeydew font-display text-xl md:text-2xl font-bold mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-honeydew/60 text-sm font-normal leading-relaxed mb-4 line-clamp-3">
          {Array.isArray(project.description)
            ? project.description[0].replace(/\*\*/g, "")
            : project.description.replace(/\*\*/g, "")}
        </p>

        {/* Badges */}
        <div className="flex gap-2 flex-wrap mb-4">
          {project.featured && (
            <span className="bg-punch-red/15 text-punch-red px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-punch-red/20">
              <i className="fas fa-star mr-1 text-[8px]"></i>Featured
            </span>
          )}
          {project.isPublished && (
            <span className="bg-cerulean/15 text-cerulean-light px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-cerulean/20">
              <i className="fas fa-book mr-1"></i>IEEE Published
            </span>
          )}
          <span className="bg-frosted-blue/10 text-frosted-blue/70 px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-frosted-blue/10">
            <i
              className={
                project.teamSize === 1
                  ? "fas fa-user mr-1"
                  : "fas fa-users mr-1"
              }
            ></i>
            {project.teamSize === 1 ? "Solo" : `Team of ${project.teamSize}`}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2.5 mt-auto pt-3 border-t border-white/5">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-punch-red hover:bg-punch-red-light text-white font-bold text-xs transition-all duration-200 flex items-center gap-2 uppercase tracking-widest shadow-lg shadow-punch-red/15 cursor-pointer"
            >
              Live Demo
              <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-xs transition-all duration-200 flex items-center gap-2 uppercase tracking-widest cursor-pointer"
            >
              <i className="fab fa-github text-sm"></i>
              Source
            </a>
          )}
          {project.ieeeLink && (
            <a
              href={project.ieeeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-xs transition-all duration-200 flex items-center gap-2 uppercase tracking-widest cursor-pointer"
            >
              <i className="fas fa-file-alt text-sm"></i>
              Paper
            </a>
          )}
          {project.videoSrc && (
            <button
              onClick={handleVideoExpand}
              className="md:hidden px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-xs transition-all duration-200 flex items-center gap-2 uppercase tracking-widest cursor-pointer"
            >
              <i className="fas fa-play-circle text-sm"></i>
              Demo
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
});

LargeProjectCard.displayName = "LargeProjectCard";

// ---------- Medium Project Card (with image, 2-col span) ----------
const MediumProjectCard = memo(({ project, category, reverse = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cat = CATEGORIES[category] || CATEGORIES.ai;
  const firstImage = project.images && project.images[0];

  const shortDesc = Array.isArray(project.description)
    ? project.description[0].replace(/\*\*/g, "")
    : project.description.replace(/\*\*/g, "");

  return (
    <motion.article
      variants={cardVariants}
      className={`bento-card col-span-1 md:col-span-2 group cursor-pointer ${cat.glowClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex flex-col md:flex-row h-full ${reverse ? "md:flex-row-reverse" : ""}`}
      >
        {/* Image side */}
        <div className="relative w-full md:w-2/5 h-48 md:h-auto overflow-hidden shrink-0 rounded-t-xl md:rounded-t-none md:rounded-l-xl">
          {firstImage && (
            <img
              src={firstImage}
              alt={project.title}
              className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
          )}
          {/* Category badge */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-oxford-navy-dark/70 backdrop-blur-sm border border-white/10">
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dotClass}`}></span>
            <span className="text-[9px] font-bold text-honeydew/90 uppercase tracking-wider">
              {cat.label}
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-frosted-blue/10 text-frosted-blue/70 border border-frosted-blue/10 uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>

          <h3 className="text-honeydew font-display text-lg md:text-xl font-bold mb-2 leading-tight">
            {project.title}
          </h3>

          <p className="text-honeydew/55 text-sm font-normal leading-relaxed mb-3 line-clamp-2">
            {shortDesc}
          </p>

          {/* Badges */}
          <div className="flex gap-1.5 flex-wrap mb-3">
            {project.isPublished && (
              <span className="bg-cerulean/15 text-cerulean-light px-2 py-0.5 rounded-full text-[9px] font-bold border border-cerulean/20">
                <i className="fas fa-book mr-1"></i>IEEE
              </span>
            )}
            <span className="bg-frosted-blue/10 text-frosted-blue/60 px-2 py-0.5 rounded-full text-[9px] font-bold border border-frosted-blue/10">
              <i
                className={
                  project.teamSize === 1
                    ? "fas fa-user mr-1"
                    : "fas fa-users mr-1"
                }
              ></i>
              {project.teamSize === 1 ? "Solo" : `Team of ${project.teamSize}`}
            </span>
          </div>

          {/* Action links */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-punch-red text-xs font-bold uppercase tracking-widest hover:text-punch-red-light transition-colors cursor-pointer"
              >
                Live Demo
                <i className="fas fa-arrow-right text-[9px]"></i>
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-frosted-blue/70 text-xs font-bold uppercase tracking-widest hover:text-frosted-blue transition-colors cursor-pointer"
              >
                <i className="fab fa-github text-sm"></i>
                Source
              </a>
            )}
            {project.ieeeLink && (
              <a
                href={project.ieeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-frosted-blue/70 text-xs font-bold uppercase tracking-widest hover:text-frosted-blue transition-colors cursor-pointer"
              >
                Paper
                <i className="fas fa-arrow-right text-[9px]"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
});

MediumProjectCard.displayName = "MediumProjectCard";

// ---------- Small Project Card (compact, 1-col span) ----------
const SmallProjectCard = memo(({ project, category, onVideoExpand }) => {
  const cat = CATEGORIES[category] || CATEGORIES.ai;
  const displayIcon = project.icon || cat.icon || "fas fa-code";

  const shortDesc = Array.isArray(project.description)
    ? project.description[0].replace(/\*\*/g, "").substring(0, 120) + "..."
    : project.description.replace(/\*\*/g, "").substring(0, 120) + "...";

  return (
    <motion.article
      variants={cardVariants}
      className={`bento-card col-span-1 group cursor-pointer ${cat.glowClass}`}
    >
      <div className="p-5 md:p-6 flex flex-col h-full">
        {/* Top row: icon + category */}
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-2.5 rounded-lg ${cat.iconBg} ${cat.iconText} ${cat.iconHoverBg} group-hover:text-white transition-colors duration-300`}
          >
            <i className={`${displayIcon} text-lg`}></i>
          </div>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dotClass}`}></span>
            <span className="text-[9px] font-bold text-honeydew/50 uppercase tracking-wider">
              {cat.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-honeydew font-display text-base md:text-lg font-bold mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-honeydew/50 text-xs md:text-sm font-normal leading-relaxed mb-4 line-clamp-3">
          {shortDesc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="text-[9px] text-cerulean/70 font-bold uppercase tracking-tighter"
            >
              #{t.replace(/\s+/g, "")}
            </span>
          ))}
        </div>

        {/* Badges */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          <span className="bg-frosted-blue/8 text-frosted-blue/50 px-2 py-0.5 rounded-full text-[9px] font-bold">
            <i
              className={
                project.teamSize === 1
                  ? "fas fa-user mr-1"
                  : "fas fa-users mr-1"
              }
            ></i>
            {project.teamSize === 1 ? "Solo" : `Team of ${project.teamSize}`}
          </span>
        </div>

        {/* Action links */}
        <div className="mt-auto flex flex-wrap gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-punch-red text-[11px] font-bold uppercase tracking-widest hover:text-punch-red-light transition-colors cursor-pointer"
            >
              Live
              <i className="fas fa-chevron-right text-[8px]"></i>
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-frosted-blue/60 text-[11px] font-bold uppercase tracking-widest hover:text-frosted-blue transition-colors cursor-pointer"
            >
              Source
              <i className="fas fa-chevron-right text-[8px]"></i>
            </a>
          )}
          {project.videoSrc && onVideoExpand && (
            <button
              onClick={() => {
                const poster =
                  project.videoPoster || (project.images && project.images[0]);
                onVideoExpand(project.videoSrc, poster, project.title);
              }}
              className="inline-flex items-center gap-1 text-frosted-blue/60 text-[11px] font-bold uppercase tracking-widest hover:text-frosted-blue transition-colors cursor-pointer"
            >
              Demo
              <i className="fas fa-chevron-right text-[8px]"></i>
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
});

SmallProjectCard.displayName = "SmallProjectCard";

// ---------- Main Projects Component ----------
const Projects = () => {
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    videoSrc: null,
    posterSrc: null,
    title: "",
  });

  const handleVideoExpand = useCallback((videoSrc, posterSrc, title) => {
    setVideoModal({ isOpen: true, videoSrc, posterSrc, title });
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

  // Build ordered card list with sizes
  const cardList = useMemo(() => {
    return projects.map((project, index) => ({
      project,
      size: getCardSize(project, index),
      category: project.category || "fullstack",
    }));
  }, [projects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 bg-oxford-navy-dark"
    >
      <div className="w-full max-w-350 mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="Portfolio"
            title="Projects"
            highlight="Showcase"
            className="proj-header"
          />
        </div>

        {/* Bento Grid */}
        <motion.div
          className="projects-bento-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cardList.map(({ project, size, category }, index) => {
            switch (size) {
              case "large":
                return (
                  <LargeProjectCard
                    key={index}
                    project={project}
                    category={category}
                    onVideoExpand={handleVideoExpand}
                  />
                );
              case "medium":
                return (
                  <MediumProjectCard
                    key={index}
                    project={project}
                    category={category}
                    onVideoExpand={handleVideoExpand}
                    reverse={index % 2 === 1}
                  />
                );
              default:
                return (
                  <SmallProjectCard
                    key={index}
                    project={project}
                    category={category}
                    onVideoExpand={handleVideoExpand}
                  />
                );
            }
          })}
        </motion.div>
      </div>

      {/* Video Modal */}
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
