import { memo, useState } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { CATEGORIES, cardVariants } from "./constants";
import { TechTags, IEEEBadge } from "./TechTags";
import TeamBadge from "./TeamBadge";
import { ActionLinksInline } from "./ActionLinks";

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
                <TechTags tech={project.tech} maxTags={3} />
                {project.isPublished && <IEEEBadge label="IEEE" compact />}
              </div>

              {/* Team badge */}
              <TeamBadge
                teamSize={project.teamSize}
                textSize="9px"
                iconSize="9px"
                className="gap-1 px-2"
              />
            </div>

            <h3 className="text-honeydew font-display text-lg md:text-xl font-bold mb-2 leading-tight">
              {project.title}
            </h3>

            <p className="text-honeydew/55 text-sm font-normal leading-relaxed mb-3 line-clamp-2">
              {shortDesc}
            </p>

            {/* Action links */}
            <ActionLinksInline project={project} />
          </div>
        </div>
      </motion.article>
    );
  },
);

MediumProjectCard.displayName = "MediumProjectCard";

export default MediumProjectCard;
