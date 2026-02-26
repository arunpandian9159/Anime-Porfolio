import { memo, useCallback, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectDetailModal from "../components/ui/ProjectDetailModal";

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
const LargeProjectCard = memo(({ project, category, onCardClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cat = CATEGORIES[category] || CATEGORIES.ai;

  useEffect(() => {
    if (project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [project.images]);

  const firstImage = project.images && project.images[0];

  return (
    <motion.article
      variants={cardVariants}
      className={`bento-card col-span-1 md:col-span-2 row-span-2 group cursor-pointer ${cat.glowClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onCardClick && onCardClick(project, category)}
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
        {project.images && project.images.length > 1 && (
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

        {project.images && project.images.length === 1 && (
          <img
            src={firstImage}
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        )}

        {/* Gradient overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-oxford-navy-dark/90 to-transparent pointer-events-none"></div>
      </div>

      {/* Content area */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3 gap-2">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 align-middle items-center">
            {project.tech.slice(0, 5).map((t, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[12px] bg-punch-red/15 border border-punch-red/30 rounded-full text-sm text-punch-red"
              >
                {t}
              </span>
            ))}
            {project.isPublished && (
              <span className="px-2.5 py-0.5 text-[10px] bg-cerulean/15 border border-cerulean/30 rounded-full font-bold text-cerulean-light shrink-0 flex items-center h-fit">
                <i className="fas fa-book mr-1"></i>IEEE Published
              </span>
            )}
          </div>

          {/* Team badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
            <i
              className={`${project.teamSize === 1 ? "fas fa-user" : "fas fa-users"} text-[10px] text-frosted-blue/80`}
            ></i>
            <span className="text-[10px] font-bold text-honeydew/80 uppercase tracking-wider">
              {project.teamSize === 1 ? "Solo" : `Team of ${project.teamSize}`}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-honeydew font-display text-xl md:text-2xl font-bold mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Description — 2 lines */}
        <p className="text-honeydew/60 text-sm font-normal leading-relaxed mb-4 line-clamp-2">
          {Array.isArray(project.description)
            ? project.description[0].replace(/\*\*/g, "")
            : project.description.replace(/\*\*/g, "")}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2.5 mt-auto pt-3 border-t border-white/5">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-xs transition-all duration-200 flex items-center gap-2 uppercase tracking-widest cursor-pointer"
            >
              <i className="fas fa-file-alt text-sm"></i>
              Paper
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
});

LargeProjectCard.displayName = "LargeProjectCard";

// ---------- Medium Project Card (with image, 2-col span) ----------
const MediumProjectCard = memo(
  ({ project, category, reverse = false, onCardClick }) => {
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
        onClick={() => onCardClick && onCardClick(project, category)}
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
          </div>

          {/* Content side */}
          <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
            {/* Top row with Tech tags and Team badge */}
            <div className="flex justify-between items-start mb-2 gap-2">
              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 align-middle items-center">
                {project.tech.slice(0, 3).map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 text-[12px] bg-punch-red/15 border border-punch-red/30 rounded-full text-sm text-punch-red"
                  >
                    {t}
                  </span>
                ))}
                {project.isPublished && (
                  <span className="px-2.5 py-0.5 text-[10px] bg-cerulean/15 border border-cerulean/30 rounded-full font-bold text-cerulean-light shrink-0 flex items-center h-fit">
                    <i className="fas fa-book mr-1"></i>IEEE
                  </span>
                )}
              </div>

              {/* Team badge */}
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 shrink-0">
                <i
                  className={`${project.teamSize === 1 ? "fas fa-user" : "fas fa-users"} text-[9px] text-frosted-blue/80`}
                ></i>
                <span className="text-[9px] font-bold text-honeydew/80 uppercase tracking-wider">
                  {project.teamSize === 1
                    ? "Solo"
                    : `Team of ${project.teamSize}`}
                </span>
              </div>
            </div>

            <h3 className="text-honeydew font-display text-lg md:text-xl font-bold mb-2 leading-tight">
              {project.title}
            </h3>

            <p className="text-honeydew/55 text-sm font-normal leading-relaxed mb-3 line-clamp-2">
              {shortDesc}
            </p>

            {/* Action links */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
                  onClick={(e) => e.stopPropagation()}
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
  },
);

MediumProjectCard.displayName = "MediumProjectCard";

// ---------- Small Project Card (compact, 1-col span) ----------
const SmallProjectCard = memo(({ project, category, onCardClick }) => {
  const cat = CATEGORIES[category] || CATEGORIES.ai;
  const displayIcon = project.icon || cat.icon || "fas fa-code";

  const shortDesc = Array.isArray(project.description)
    ? project.description[0].replace(/\*\*/g, "").substring(0, 120) + "..."
    : project.description.replace(/\*\*/g, "").substring(0, 120) + "...";

  return (
    <motion.article
      variants={cardVariants}
      className={`bento-card col-span-1 group cursor-pointer ${cat.glowClass}`}
      onClick={() => onCardClick && onCardClick(project, category)}
    >
      <div className="p-5 md:p-6 flex flex-col h-full">
        {/* Top row: icon + category + team */}
        <div className="flex justify-between items-start mb-4">
          <div
            className={`p-2.5 rounded-lg ${cat.iconBg} ${cat.iconText} ${cat.iconHoverBg} group-hover:text-white transition-colors duration-300`}
          >
            <i className={`${displayIcon} text-lg`}></i>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <i
                className={`${project.teamSize === 1 ? "fas fa-user" : "fas fa-users"} text-[9px] text-frosted-blue/60`}
              ></i>
              <span className="text-[9px] font-bold text-honeydew/50 uppercase tracking-wider">
                {project.teamSize === 1
                  ? "Solo"
                  : `Team of ${project.teamSize}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${cat.dotClass}`}
              ></span>
              <span className="text-[9px] font-bold text-honeydew/50 uppercase tracking-wider">
                {cat.label}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-honeydew font-display text-base md:text-lg font-bold mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Description — 2 lines */}
        <p className="text-honeydew/50 text-xs md:text-sm font-normal leading-relaxed mb-4 line-clamp-2">
          {shortDesc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-3 align-middle items-center">
          {project.tech.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-[12px] bg-punch-red/15 border border-punch-red/30 rounded-full text-sm text-punch-red"
            >
              #{t.replace(/\s+/g, "")}
            </span>
          ))}
          {project.isPublished && (
            <span className="px-2 py-0.5 text-[9px] bg-cerulean/15 border border-cerulean/30 rounded-full font-bold text-cerulean-light shrink-0 flex items-center h-fit">
              <i className="fas fa-book mr-1"></i>IEEE
            </span>
          )}
        </div>

        {/* Action links */}
        <div className="mt-auto flex flex-wrap gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-frosted-blue/60 text-[11px] font-bold uppercase tracking-widest hover:text-frosted-blue transition-colors cursor-pointer"
            >
              Source
              <i className="fas fa-chevron-right text-[8px]"></i>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
});

SmallProjectCard.displayName = "SmallProjectCard";

// Category display order
const CATEGORY_ORDER = ["ai", "fullstack", "blockchain"];

// ---------- Main Projects Component ----------
const Projects = () => {
  const [projectDetail, setProjectDetail] = useState({
    isOpen: false,
    project: null,
    category: null,
  });

  const handleProjectClick = useCallback((project, category) => {
    setProjectDetail({ isOpen: true, project, category });
  }, []);

  const handleCloseProjectDetail = useCallback(() => {
    setProjectDetail((prev) => ({ ...prev, isOpen: false }));
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

  // Group projects by category
  const groupedProjects = useMemo(() => {
    const groups = {};
    for (const cat of CATEGORY_ORDER) {
      groups[cat] = [];
    }
    projects.forEach((project) => {
      const cat = project.category || "fullstack";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push({
        project,
        size: getCardSize(project),
        category: cat,
      });
    });
    return groups;
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

        {/* Category-grouped sections */}
        {CATEGORY_ORDER.map((catKey) => {
          const catProjects = groupedProjects[catKey];
          if (!catProjects || catProjects.length === 0) return null;
          const cat = CATEGORIES[catKey];

          return (
            <div key={catKey} className="mb-16 last:mb-0">
              {/* Category section title */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`p-2.5 rounded-lg ${cat.iconBg} ${cat.iconText}`}
                >
                  <i className={`${cat.icon} text-lg`}></i>
                </div>
                <div className="flex items-center gap-3">
                  <h3
                    className="font-display text-xl md:text-2xl font-bold uppercase tracking-wider"
                    style={{ color: `var(--color-${cat.color})` }}
                  >
                    {cat.label} Projects
                  </h3>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                    style={{
                      color: `var(--color-${cat.color})`,
                      borderColor: `var(--color-${cat.color})`,
                      backgroundColor: `color-mix(in srgb, var(--color-${cat.color}) 10%, transparent)`,
                    }}
                  >
                    {catProjects.length}
                  </span>
                </div>
                <div
                  className="flex-1 h-px ml-4 opacity-20"
                  style={{
                    background: `linear-gradient(to right, var(--color-${cat.color}), transparent)`,
                  }}
                ></div>
              </div>

              {/* Bento Grid for this category */}
              <motion.div
                className="projects-bento-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {catProjects.map(({ project, size, category }, index) => {
                  switch (size) {
                    case "large":
                      return (
                        <LargeProjectCard
                          key={index}
                          project={project}
                          category={category}
                          onCardClick={handleProjectClick}
                        />
                      );
                    case "medium":
                      return (
                        <MediumProjectCard
                          key={index}
                          project={project}
                          category={category}
                          onCardClick={handleProjectClick}
                          reverse={index % 2 === 1}
                        />
                      );
                    default:
                      return (
                        <SmallProjectCard
                          key={index}
                          project={project}
                          category={category}
                          onCardClick={handleProjectClick}
                        />
                      );
                  }
                })}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={projectDetail.isOpen}
        onClose={handleCloseProjectDetail}
        project={projectDetail.project}
        category={CATEGORIES[projectDetail.category] || null}
      />
    </section>
  );
};

export default Projects;
