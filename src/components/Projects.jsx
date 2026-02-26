import { memo, useCallback, useState, useEffect, useMemo } from "react";
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "./ui/SectionHeader";
import VideoPreview from "./ui/VideoPreview";
import VideoModal from "./ui/VideoModal";

// Category configuration: label, accent color, icon
const CATEGORIES = {
  ai: {
    label: "AI & Intelligence",
    accentBorder: "border-punch-red",
    accentBg: "bg-punch-red",
    heroHoverBorder: "hover:border-punch-red/50",
    heroShadow: "hover:shadow-[0_0_30px_rgba(230,57,70,0.2)]",
    icon: "fas fa-brain",
  },
  fullstack: {
    label: "Full Stack Systems",
    accentBorder: "border-cerulean",
    accentBg: "bg-cerulean",
    heroHoverBorder: "hover:border-cerulean/50",
    heroShadow: "hover:shadow-[0_0_30px_rgba(69,123,157,0.2)]",
    icon: "fas fa-layer-group",
  },
  blockchain: {
    label: "Blockchain & Web3",
    accentBorder: "border-frosted-blue",
    accentBg: "bg-frosted-blue",
    heroHoverBorder: "hover:border-frosted-blue/40",
    heroShadow: "hover:shadow-[0_0_30px_rgba(168,218,220,0.2)]",
    icon: "fas fa-link",
  },
};

// ---------- Hero Project Card ----------
const HeroProjectCard = memo(({ project, category, onVideoExpand }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!project.videoSrc && project.images && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 4000);
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

  const videoPoster =
    project.videoPoster || (project.images && project.images[0]);
  const firstImage = project.images && project.images[0];
  const cat = CATEGORIES[category] || CATEGORIES.ai;

  // Determine column span based on number of sibling cards
  const heroSpan = "md:col-span-8";

  return (
    <article
      className={`${heroSpan} group rounded-xl bg-oxford-navy-light/30 border border-oxford-navy-light ${cat.heroHoverBorder} overflow-hidden shadow-xl transition-all duration-500 ${cat.heroShadow} flex flex-col h-full`}
    >
      {/* Image / Video area */}
      <div
        className="w-full h-[350px] md:h-[450px] bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: firstImage ? `url('${firstImage}')` : undefined,
        }}
      >
        {/* Video overlay if project has video */}
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

        {/* Image carousel for non-video projects */}
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-oxford-navy via-oxford-navy/50 to-transparent z-20 pointer-events-none"></div>

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-linear-to-t from-oxford-navy to-transparent z-30">
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
            {project.tech.slice(0, 4).map((t, i) => (
              <span
                key={i}
                className="px-3 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-bold rounded-full bg-frosted-blue/20 text-frosted-blue border border-frosted-blue/30 backdrop-blur-md uppercase tracking-wider"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-honeydew font-display text-2xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 drop-shadow-lg">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-honeydew/90 text-sm md:text-lg font-normal mb-4 md:mb-6 leading-relaxed max-w-3xl line-clamp-3">
            {Array.isArray(project.description)
              ? project.description[0].replace(/\*\*/g, "")
              : project.description.replace(/\*\*/g, "")}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 md:px-8 h-10 md:h-12 rounded-lg bg-punch-red hover:bg-red-600 text-white font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-punch-red/20"
              >
                View Live Demo
                <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 md:px-8 h-10 md:h-12 rounded-lg bg-cerulean/20 hover:bg-cerulean/40 text-frosted-blue border border-cerulean/30 font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
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
                className="px-6 md:px-8 h-10 md:h-12 rounded-lg bg-cerulean/20 hover:bg-cerulean/40 text-frosted-blue border border-cerulean/30 font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                <i className="fas fa-file-alt text-sm"></i>
                Paper
              </a>
            )}
            {/* Mobile-only video button */}
            {project.videoSrc && (
              <button
                onClick={handleVideoExpand}
                className="md:hidden px-6 h-10 rounded-lg bg-cerulean/20 hover:bg-cerulean/40 text-frosted-blue border border-cerulean/30 font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                <i className="fas fa-play-circle text-sm"></i>
                Demo
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
});

HeroProjectCard.displayName = "HeroProjectCard";

// ---------- Compact Project Card ----------
const CompactProjectCard = memo(({ project, onVideoExpand }) => {
  const handleVideoExpand = useCallback(() => {
    if (onVideoExpand && project.videoSrc) {
      const videoPoster =
        project.videoPoster || (project.images && project.images[0]);
      onVideoExpand(project.videoSrc, videoPoster, project.title);
    }
  }, [onVideoExpand, project]);

  // Get a short description
  const shortDesc = Array.isArray(project.description)
    ? project.description[0].replace(/\*\*/g, "").substring(0, 150) + "..."
    : project.description.replace(/\*\*/g, "").substring(0, 150) + "...";

  // Pick a material-like icon mapping based on project icon
  const iconMap = {
    "fas fa-robot": "fas fa-robot",
    "fas fa-car": "fas fa-car",
    "fas fa-certificate": "fas fa-certificate",
    "fas fa-code": "fas fa-code",
  };
  const displayIcon = iconMap[project.icon] || project.icon || "fas fa-code";

  return (
    <div className="group relative rounded-lg bg-oxford-navy-light/10 border border-oxford-navy-light hover:border-frosted-blue/50 p-6 md:p-8 transition-all duration-300 flex-1 flex flex-col justify-center">
      <div className="flex justify-between items-start mb-4 md:mb-6">
        <div className="p-2.5 md:p-3 rounded-lg bg-punch-red/10 text-punch-red group-hover:bg-punch-red group-hover:text-white transition-colors">
          <i className={`${displayIcon} text-xl md:text-2xl`}></i>
        </div>
        {/* Tech hashtags */}
        <div className="flex gap-2 flex-wrap justify-end">
          {project.tech.slice(0, 2).map((t, i) => (
            <span
              key={i}
              className="text-[10px] text-cerulean font-bold uppercase tracking-tighter"
            >
              #{t.replace(/\s+/g, "")}
            </span>
          ))}
        </div>
      </div>

      <h3 className="text-frosted-blue text-xl md:text-2xl font-bold mb-2 md:mb-3">
        {project.title}
      </h3>

      <p className="text-honeydew/70 text-sm md:text-base font-light leading-relaxed mb-4 md:mb-6 line-clamp-3">
        {shortDesc}
      </p>

      {/* Badges row */}
      <div className="flex gap-2 flex-wrap mb-4">
        {project.featured && (
          <span className="bg-punch-red text-honeydew px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
            Featured
          </span>
        )}
        {project.isPublished && (
          <span className="bg-cerulean/30 text-cerulean-light px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
            <i className="fas fa-book mr-1"></i>IEEE
          </span>
        )}
        <span className="bg-frosted-blue/20 text-frosted-blue px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
          <i
            className={
              project.teamSize === 1 ? "fas fa-user mr-1" : "fas fa-users mr-1"
            }
          ></i>
          {project.teamSize === 1 ? "Solo" : `Team of ${project.teamSize}`}
        </span>
      </div>

      {/* Action links */}
      <div className="mt-auto flex flex-wrap gap-4">
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-punch-red text-xs font-black uppercase tracking-widest hover:text-white transition-colors group/link"
          >
            Live Demo{" "}
            <span className="ml-1 group-hover/link:translate-x-1 transition-transform">
              <i className="fas fa-chevron-right text-[10px]"></i>
            </span>
          </a>
        )}
        {project.repoLink && (
          <a
            href={project.repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-punch-red text-xs font-black uppercase tracking-widest hover:text-white transition-colors group/link"
          >
            Source{" "}
            <span className="ml-1 group-hover/link:translate-x-1 transition-transform">
              <i className="fas fa-chevron-right text-[10px]"></i>
            </span>
          </a>
        )}
        {project.videoSrc && (
          <button
            onClick={handleVideoExpand}
            className="inline-flex items-center text-punch-red text-xs font-black uppercase tracking-widest hover:text-white transition-colors group/link"
          >
            Demo Video{" "}
            <span className="ml-1 group-hover/link:translate-x-1 transition-transform">
              <i className="fas fa-chevron-right text-[10px]"></i>
            </span>
          </button>
        )}
        {project.ieeeLink && (
          <a
            href={project.ieeeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-punch-red text-xs font-black uppercase tracking-widest hover:text-white transition-colors group/link"
          >
            Paper{" "}
            <span className="ml-1 group-hover/link:translate-x-1 transition-transform">
              <i className="fas fa-chevron-right text-[10px]"></i>
            </span>
          </a>
        )}
      </div>
    </div>
  );
});

CompactProjectCard.displayName = "CompactProjectCard";

// ---------- Category Section ----------
const CategorySection = memo(({ categoryKey, projects, onVideoExpand }) => {
  const cat = CATEGORIES[categoryKey];
  if (!cat || projects.length === 0) return null;

  // Find featured project for hero card, fallback to first project
  const heroProject = projects.find((p) => p.featured) || projects[0];
  const sidebarProjects = projects.filter((p) => p !== heroProject);

  return (
    <section className="mb-16 md:mb-24">
      {/* Category Header */}
      <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-10">
        <h2
          className={`text-honeydew font-display text-xl md:text-3xl font-extrabold tracking-widest uppercase border-l-4 ${cat.accentBorder} pl-3 md:pl-4`}
        >
          {cat.label}
        </h2>
        <div className="h-px bg-linear-to-r from-oxford-navy-light to-transparent flex-1"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-stretch">
        {/* Hero card */}
        <HeroProjectCard
          project={heroProject}
          category={categoryKey}
          onVideoExpand={onVideoExpand}
        />

        {/* Sidebar compact cards */}
        {sidebarProjects.length > 0 && (
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            {sidebarProjects.map((project, i) => (
              <CompactProjectCard
                key={i}
                project={project}
                onVideoExpand={onVideoExpand}
              />
            ))}
          </div>
        )}

        {/* If no sidebar cards, let hero take full width */}
        {sidebarProjects.length === 0 && (
          <div className="md:col-span-4 flex flex-col gap-6 justify-center items-center">
            <div className="p-8 rounded-lg bg-oxford-navy-light/10 border border-oxford-navy-light text-center w-full h-full flex flex-col items-center justify-center">
              <div className={`p-4 rounded-xl ${cat.accentBg}/10 mb-4`}>
                <i className={`${cat.icon} text-4xl text-frosted-blue/50`}></i>
              </div>
              <p className="text-honeydew/40 text-sm font-light">
                More projects coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

CategorySection.displayName = "CategorySection";

// ---------- Main Projects Component ----------
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

  // Group projects by category, maintaining order
  const groupedProjects = useMemo(() => {
    const groups = {};
    const categoryOrder = ["ai", "fullstack", "blockchain"];

    for (const cat of categoryOrder) {
      groups[cat] = [];
    }

    for (const project of projects) {
      const cat = project.category || "fullstack";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(project);
    }

    return categoryOrder
      .filter((cat) => groups[cat].length > 0)
      .map((cat) => ({ key: cat, projects: groups[cat] }));
  }, [projects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-24 bg-oxford-navy-dark"
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            tag="Portfolio"
            title="Projects"
            highlight="Showcase"
            className="proj-header"
          />
        </div>

        {/* Category Sections */}
        {groupedProjects.map(({ key, projects: catProjects }) => (
          <CategorySection
            key={key}
            categoryKey={key}
            projects={catProjects}
            onVideoExpand={handleVideoExpand}
          />
        ))}
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
