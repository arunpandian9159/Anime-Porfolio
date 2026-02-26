import { memo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { CATEGORIES, cardVariants } from "./constants";
import { TechTags, IEEEBadge } from "./TechTags";
import TeamBadge from "./TeamBadge";
import { ActionLinksCompact } from "./ActionLinks";

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
            <TeamBadge
              teamSize={project.teamSize}
              textSize="9px"
              iconSize="9px"
              className="gap-1 px-2 py-1 text-honeydew/50"
            />
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
          <TechTags tech={project.tech} maxTags={3} hashPrefix />
          {project.isPublished && <IEEEBadge label="IEEE" compact />}
        </div>

        {/* Action links */}
        <ActionLinksCompact project={project} />
      </div>
    </motion.article>
  );
});

SmallProjectCard.displayName = "SmallProjectCard";

export default SmallProjectCard;
