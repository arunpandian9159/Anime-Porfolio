import { memo, useCallback } from "react";
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import {
  useCountUp,
  useCardReveal,
  useIntersectionAnimate,
} from "../hooks/useIntersectionAnimate";
import SectionHeader from "./ui/SectionHeader";
import GitHubActivity from "./ui/GitHubActivity"; 
import { formatBoldText } from "../utils/formatText";

const StatCard = memo(({ icon, value, label, index }) => {
  const countRef = useCountUp(value); 
  const cardRef = useCardReveal(index, { translateY: [20, 0] });  

  return (
    <div
      ref={cardRef}
      className="opacity-0 bg-linear-to-br from-oxford-navy/80 to-cerulean/30 border border-frosted-blue/20 rounded-2xl p-6 text-center transition-all hover:-translate-y-1 hover:border-punch-red hover:glow-red"
    >
      <div className="text-3xl text-frosted-blue mb-3">
        <i className={icon}></i>
      </div>
      <div className="font-display text-3xl md:text-4xl font-bold text-punch-red">
        <span ref={countRef}>0</span>+
      </div>
      <div className="text-frosted-blue/80 text-sm uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
});

StatCard.displayName = "StatCard";

const About = () => {
  const runHeaderAnimation = useCallback(() => {
    animate(".about-header .section-tag", {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: "easeOutExpo",
    });
    animate(".about-header .section-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: "easeOutExpo",
    });
    animate(".about-header .title-decoration", {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: "easeOutExpo",
    });
    animate(".about-card", {
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 400,
      delay: 300,
      easing: "easeOutExpo",
    });
    animate(".github-activity-container", {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 400,
      delay: 400,
      easing: "easeOutExpo",
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { profile, stats, socials } = profileData;

  // Extract GitHub username from URL
  const githubUsername = socials?.github?.split("/").pop() || "arunpandian9159";

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-cerulean/10 at-20% via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-radial from-punch-red/10 at-80% via-transparent to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <SectionHeader
          tag="Introduction"
          title="About"
          highlight="Me"
          className="about-header"
        />

        {/* Content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
          {/* Card */}
          <div className="about-card bg-oxford-navy/50 border border-frosted-blue/20 rounded-2xl p-6 md:p-8 relative overflow-hidden opacity-0">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-punch-red/10 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <p className="text-frosted-blue/90 text-base md:text-lg mb-8 leading-relaxed">
                {formatBoldText(profile.bio)}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-frosted-blue">
                  <i className="fas fa-map-marker-alt text-punch-red w-5"></i>
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-4 text-frosted-blue">
                  <i className="fas fa-envelope text-punch-red w-5"></i>
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-4 text-frosted-blue">
                  <i className="fas fa-phone text-punch-red w-5"></i>
                  <span>{profile.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5 h-full">
            <StatCard
              icon="fas fa-project-diagram"
              value={stats.projects}
              label="Projects"
              index={0}
            />
            <StatCard
              icon="fas fa-code"
              value={stats.technologies}
              label="Technologies"
              index={1}
            />
            <StatCard
              icon="fas fa-briefcase"
              value={stats.internships}
              label="Internships"
              index={2}
            />
            <StatCard
              icon="fas fa-award"
              value={stats.certifications}
              label="Certifications"
              index={3}
            />
          </div>
        </div>

        {/* GitHub Activity */}
        <div className="mt-10">
          <GitHubActivity
            username={githubUsername}
            className="bg-oxford-navy/50 border border-frosted-blue/20 rounded-2xl p-6 opacity-0"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
