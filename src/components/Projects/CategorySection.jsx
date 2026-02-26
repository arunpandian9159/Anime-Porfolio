import { memo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { CATEGORIES, containerVariants } from "./constants";
import LargeProjectCard from "./LargeProjectCard";
import MediumProjectCard from "./MediumProjectCard";
import SmallProjectCard from "./SmallProjectCard";

const CategorySection = memo(({ catKey, catProjects, onCardClick }) => {
  const cat = CATEGORIES[catKey];
  if (!cat || !catProjects || catProjects.length === 0) return null;

  return (
    <div className="mb-16 last:mb-0">
      {/* Category section title */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-2.5 rounded-lg ${cat.iconBg} ${cat.iconText}`}>
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
                  onCardClick={onCardClick}
                />
              );
            case "medium":
              return (
                <MediumProjectCard
                  key={index}
                  project={project}
                  category={category}
                  onCardClick={onCardClick}
                  reverse={index % 2 === 1}
                />
              );
            default:
              return (
                <SmallProjectCard
                  key={index}
                  project={project}
                  category={category}
                  onCardClick={onCardClick}
                />
              );
          }
        })}
      </motion.div>
    </div>
  );
});

CategorySection.displayName = "CategorySection";

export default CategorySection;
