import { memo, useCallback } from "react";
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "./ui/SectionHeader";

const EducationCard = memo(({ edu, index }) => {
  const animationConfig = {
    opacity: [0, 1],
    translateY: [30, 0],
    scale: [0.95, 1],
    duration: 350,
    delay: index * 75,
    easing: "easeOutExpo",
  };

  const cardRef = useIntersectionAnimate(animationConfig, { threshold: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`opacity-0 ${
        edu.isMain
          ? "bg-linear-to-br from-punch-red/10 to-oxford-navy/50 border-punch-red"
          : "bg-oxford-navy-dark/50 border-frosted-blue/15"
      } border rounded-xl md:rounded-2xl p-4 md:p-7 text-center transition-all hover:-translate-y-1 hover:border-punch-red`}
    >
      <div className="w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-punch-red to-cerulean rounded-full flex items-center justify-center mx-auto mb-3 md:mb-5 text-xl md:text-2xl text-honeydew">
        <i className={`fas ${edu.icon}`}></i>
      </div>
      <span className="inline-block px-3 md:px-4 py-0.5 md:py-1 bg-frosted-blue/10 rounded-full text-xs md:text-sm text-frosted-blue mb-2 md:mb-4">
        {edu.year}
      </span>
      <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">
        {edu.degree}
      </h3>
      <p className="text-frosted-blue/80 text-xs md:text-base mb-1">
        {edu.institution}
      </p>
      <p className="text-frosted-blue/60 text-xs mb-2 md:mb-4">
        <i className="fas fa-map-marker-alt mr-1 md:mr-2"></i>
        {edu.location}
      </p>
      <span className="inline-block px-3 md:px-5 py-1 md:py-2 bg-punch-red text-honeydew rounded-full text-sm md:text-base font-semibold">
        {edu.grade}
      </span>
    </div>
  );
});

EducationCard.displayName = "EducationCard";

const Education = () => {
  const runHeaderAnimation = useCallback(() => {
    animate(".edu-header .section-tag", {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: "easeOutExpo",
    });
    animate(".edu-header .section-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: "easeOutExpo",
    });
    animate(".edu-header .title-decoration", {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: "easeOutExpo",
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { education } = profileData;

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-12 md:py-24 bg-oxford-navy relative"
    >
      <div className="absolute inset-0 bg-gradient-radial from-punch-red/10 to-transparent opacity-50 -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-5">
        {/* Header */}
        <SectionHeader
          tag="Academics"
          title="Education"
          highlight="Journey"
          className="edu-header"
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {education.map((edu, i) => (
            <EducationCard key={edu.degree} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
