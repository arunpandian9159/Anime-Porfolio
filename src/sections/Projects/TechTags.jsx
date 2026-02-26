import { memo } from "react";

const TechTags = memo(({ tech, maxTags = 5, hashPrefix = false }) => (
  <>
    {tech.slice(0, maxTags).map((t, i) => (
      <span
        key={i}
        className="px-2.5 py-0.5 text-[12px] bg-punch-red/15 border border-punch-red/30 rounded-full text-sm text-punch-red"
      >
        {hashPrefix ? `#${t.replace(/\s+/g, "")}` : t}
      </span>
    ))}
  </>
));

TechTags.displayName = "TechTags";

const IEEEBadge = memo(({ label = "IEEE Published", compact = false }) => (
  <span
    className={`px-2.5 py-0.5 text-[${compact ? "9px" : "10px"}] bg-cerulean/15 border border-cerulean/30 rounded-full font-bold text-cerulean-light shrink-0 flex items-center h-fit`}
  >
    <i className="fas fa-book mr-1"></i>
    {label}
  </span>
));

IEEEBadge.displayName = "IEEEBadge";

export { TechTags, IEEEBadge };
