import { memo } from "react";

const TeamBadge = memo(
  ({ teamSize, textSize = "10px", iconSize = "10px", className = "" }) => (
    <div
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 shrink-0 ${className}`}
    >
      <i
        className={`${teamSize === 1 ? "fas fa-user" : "fas fa-users"} text-[${iconSize}] text-frosted-blue/80`}
      ></i>
      <span
        className={`text-[${textSize}] font-bold text-honeydew/80 uppercase tracking-wider`}
      >
        {teamSize === 1 ? "Solo" : `Team of ${teamSize}`}
      </span>
    </div>
  ),
);

TeamBadge.displayName = "TeamBadge";

export default TeamBadge;
