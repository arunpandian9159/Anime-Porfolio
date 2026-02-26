import { useCallback, useState, useMemo } from "react";
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "../components/ui/SectionHeader";
import ProjectDetailModal from "../components/ui/ProjectDetailModal";
import { CATEGORIES, CATEGORY_ORDER, getCardSize } from "./Projects/constants";
import CategorySection from "./Projects/CategorySection";

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
        {CATEGORY_ORDER.map((catKey) => (
          <CategorySection
            key={catKey}
            catKey={catKey}
            catProjects={groupedProjects[catKey]}
            onCardClick={handleProjectClick}
          />
        ))}
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
