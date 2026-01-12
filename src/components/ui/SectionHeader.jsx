import { memo } from "react";

/**
 * Reusable Section Header Component
 * Standardizes the header structure across all sections
 */
const SectionHeader = memo(({ tag, title, highlight, className = "" }) => {
  return (
    <div className={`${className} text-center mb-5 md:mb-16`}>
      <span className="section-tag inline-block px-5 py-2 bg-punch-red/15 rounded-full text-punch-red text-sm font-semibold uppercase tracking-wider mb-4 opacity-0">
        {tag}
      </span>
      <h2 className="section-title font-display text-3xl md:text-5xl font-bold mb-4 opacity-0">
        {title} <span className="text-punch-red">{highlight}</span>
      </h2>
      <div className="title-decoration w-0 h-1 bg-linear-to-r from-punch-red to-frosted-blue mx-auto rounded"></div>
    </div>
  );
});

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
