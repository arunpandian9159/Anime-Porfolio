import { memo, useCallback } from "react";
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "./ui/SectionHeader";
import { formatBoldText } from "../utils/formatText";

const TimelineItem = memo(({ exp, index }) => {
  const animationConfig = {
    opacity: [0, 1],
    translateX: [-30, 0],
    duration: 400,
    delay: index * 100,
    easing: "easeOutExpo",
  };
 
  const itemRef = useIntersectionAnimate(animationConfig);
 
  return (
    <div
      ref={itemRef}
      className="relative pl-6 md:pl-10 pb-6 md:pb-10 opacity-0"
    >
      {/* Marker */}
      <div className="absolute left-[-9px] top-1">
        <div className="w-4 h-4 md:w-5 md:h-5 bg-punch-red rounded-full border-2 md:border-3 border-oxford-navy-dark"></div>
        <div className="absolute -inset-1 border-2 border-punch-red rounded-full marker-pulse"></div>
      </div>

      {/* Card */}
      <div className="bg-oxford-navy/60 border border-frosted-blue/20 rounded-xl md:rounded-2xl p-3 md:p-6 transition-all hover:border-punch-red hover:glow-red">
        <div className="flex justify-between items-center flex-wrap gap-2 md:gap-3 mb-2 md:mb-4">
          <span className="bg-punch-red/20 text-punch-red px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-semibold">
            {exp.company}
          </span>
          <span className="text-frosted-blue text-xs md:text-sm">
            {exp.duration}
          </span>
        </div>
        <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">
          {exp.role}
        </h3>
        {Array.isArray(exp.description) ? (
          <ul className="list-disc list-outside ml-4 md:ml-5 text-frosted-blue/80 text-sm md:text-base mb-3 md:mb-4 space-y-1 md:space-y-2">
            {exp.description.map((point, idx) => (
              <li key={idx} className={idx >= 2 ? "hidden md:list-item" : ""}>
                {formatBoldText(point)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-frosted-blue/80 text-sm md:text-base mb-3 md:mb-4">
            {formatBoldText(exp.description)}
          </p>
        )}
        <div className="flex gap-2 md:gap-3 flex-wrap">
          {exp.tech.map((t, i) => (
            <span
              key={i}
              className="px-2 md:px-3 py-0.5 md:py-1 bg-frosted-blue/10 rounded-full text-xs md:text-sm text-frosted-blue"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

TimelineItem.displayName = "TimelineItem";

const Experience = () => {
  const runHeaderAnimation = useCallback(() => {
    animate(".exp-header .section-tag", {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: "easeOutExpo",
    });
    animate(".exp-header .section-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: "easeOutExpo",
    });
    animate(".exp-header .title-decoration", {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: "easeOutExpo",
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { experience } = profileData;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-16 md:py-24 relative"
    >
      <div className="absolute inset-0 bg-linear-to-b from-oxford-navy-dark to-oxford-navy -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-5">
        {/* Header */}
        <SectionHeader
          tag="Journey"
          title="Work"
          highlight="Experience"
          className="exp-header"
        />

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto pl-5 md:pl-8">
          {/* Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-punch-red to-frosted-blue"></div>

          {experience.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
