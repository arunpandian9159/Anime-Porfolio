import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { CATEGORIES, cardVariants } from "./constants";
import { TechTags, IEEEBadge } from "./TechTags";
import TeamBadge from "./TeamBadge";
import { ActionButtons } from "./ActionLinks";

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
            <TechTags tech={project.tech} maxTags={5} />
            {project.isPublished && <IEEEBadge />}
          </div>

          {/* Team badge */}
          <TeamBadge teamSize={project.teamSize} />
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
        <ActionButtons project={project} />
      </div>
    </motion.article>
  );
});

LargeProjectCard.displayName = "LargeProjectCard";

export default LargeProjectCard;
