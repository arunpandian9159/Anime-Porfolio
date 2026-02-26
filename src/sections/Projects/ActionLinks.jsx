import { memo } from "react";

const stopPropagation = (e) => e.stopPropagation();

// Button-style action links (used in LargeProjectCard)
const ActionButtons = memo(({ project }) => (
  <div className="flex flex-wrap gap-2.5 mt-auto pt-3 border-t border-white/5">
    {project.liveLink && (
      <a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stopPropagation}
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
        onClick={stopPropagation}
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
        onClick={stopPropagation}
        className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-frosted-blue border border-white/10 font-bold text-xs transition-all duration-200 flex items-center gap-2 uppercase tracking-widest cursor-pointer"
      >
        <i className="fas fa-file-alt text-sm"></i>
        Paper
      </a>
    )}
  </div>
));

ActionButtons.displayName = "ActionButtons";

// Inline text-style action links (used in MediumProjectCard)
const ActionLinksInline = memo(({ project }) => (
  <div className="flex flex-wrap gap-2 mt-auto">
    {project.liveLink && (
      <a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stopPropagation}
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
        onClick={stopPropagation}
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
        onClick={stopPropagation}
        className="inline-flex items-center gap-1.5 text-frosted-blue/70 text-xs font-bold uppercase tracking-widest hover:text-frosted-blue transition-colors cursor-pointer"
      >
        Paper
        <i className="fas fa-arrow-right text-[9px]"></i>
      </a>
    )}
  </div>
));

ActionLinksInline.displayName = "ActionLinksInline";

// Compact text-style action links (used in SmallProjectCard)
const ActionLinksCompact = memo(({ project }) => (
  <div className="mt-auto flex flex-wrap gap-3">
    {project.liveLink && (
      <a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={stopPropagation}
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
        onClick={stopPropagation}
        className="inline-flex items-center gap-1 text-frosted-blue/60 text-[11px] font-bold uppercase tracking-widest hover:text-frosted-blue transition-colors cursor-pointer"
      >
        Source
        <i className="fas fa-chevron-right text-[8px]"></i>
      </a>
    )}
  </div>
));

ActionLinksCompact.displayName = "ActionLinksCompact";

export { ActionButtons, ActionLinksInline, ActionLinksCompact };
