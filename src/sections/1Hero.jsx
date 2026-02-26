import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { profileData } from "../data/profileData";
import { formatBoldText } from "../utils/formatText";
import PARTICLES from "../components/Hero/particles";

const Hero = ({ isLoading }) => {
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only run animations when loading is complete and hasn't run yet
    if (isLoading || hasAnimated.current) return;

    hasAnimated.current = true;

    // Hero animation timeline - smooth sequential animations
    const runAnimations = async () => {
      // Profile frame enters with spring effect
      await animate(".profile-frame", {
        opacity: [0, 1],
        scale: [0.7, 1.02, 1],
        rotate: [-5, 0],
        duration: 800,
        easing: "easeOutQuart",
      }).finished;

      // Frame border pulses in
      animate(".frame-border-anim", {
        opacity: [0, 1],
        scale: [1.3, 1],
        duration: 500,
        easing: "easeOutQuart",
      });

      // Quick stats slide up with stagger
      animate(".quick-stat", {
        opacity: [0, 1],
        translateY: [30, 0],
        delay: stagger(100),
        duration: 500,
        easing: "easeOutQuart",
      });

      // Hero intro slides in smoothly
      animate(".hero-intro", {
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 500,
        easing: "easeOutQuart",
      });

      // Name with spring effect
      await animate(".hero-name", {
        opacity: [0, 1],
        translateX: [-60, 0],
        translateY: [20, 0],
        duration: 600,
        easing: "easeOutQuart",
      }).finished;

      // Role fades in
      animate(".hero-role", {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 400,
        easing: "easeOutQuart",
      });

      // Underline draws with smooth ease
      animate(".role-underline", {
        width: [0, 200],
        duration: 500,
        easing: "easeOutQuart",
      });

      // Bio and CTA slide up
      animate(".hero-bio", {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 500,
        delay: 50,
        easing: "easeOutQuart",
      });

      animate(".hero-cta", {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 500,
        delay: 100,
        easing: "easeOutQuart",
      });
    };

    // Small delay to ensure DOM transition is complete
    requestAnimationFrame(() => {
      runAnimations();
    });
  }, [isLoading]);

  const { profile, socials, stats } = profileData;

  return (
    <section
      id="hero"
      className="min-h-screen relative flex overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-oxford-navy-dark via-oxford-navy to-cerulean/30">
        {/* Diagonal slice */}
        <div
          className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-cerulean/10"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 40% 100%)" }}
        ></div>
        {/* Speed lines */}
        <div className="speed-line" style={{ top: "30%", left: "-100%" }}></div>
        <div
          className="speed-line"
          style={{ top: "70%", left: "-100%", animationDelay: "1.5s" }}
        ></div>
        {/* CSS-Only Particles - GPU Accelerated */}
        <div className="particles-container">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className={`particle particle--${p.color}`}
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                "--duration": `${p.duration}s`,
                "--delay": `${p.delay}s`,
                "--move-x": `${p.moveX}px`,
                "--move-y": `${p.moveY}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-16 items-center min-h-screen px-4 md:px-12 py-16 md:py-24 max-w-7xl mx-auto z-10 w-full">
        {/* Left - Profile */}
        <div className="text-center">
          <div className="profile-frame relative inline-block opacity-0">
            {/* Frame Border */}
            <div className="frame-border-anim absolute -inset-3 border-3 border-punch-red rounded-2xl frame-pulse opacity-0"></div>

            {/* Avatar */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden relative">
              <picture>
                {/* Optimized WebP images with responsive sizes */}
                <source
                  type="image/webp"
                  srcSet="/profile-256.webp 256w, /profile-512.webp 512w"
                  sizes="(max-width: 768px) 224px, 256px"
                />
                {/* Fallback to original JPG */}
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  width={256}
                  height={256}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onError={(e) => {
                    // Hide picture element if images fail
                    e.target.parentElement.style.display = "none";
                    e.target.parentElement.nextSibling.style.display = "flex";
                  }}
                />
              </picture>
              <div className="w-full h-full bg-linear-to-br from-cerulean to-oxford-navy-light items-center justify-center hidden">
                <span className="font-display text-5xl md:text-7xl font-black text-honeydew text-glow-blue">
                  AC
                </span>
              </div>
              {/* Aura */}
              <div className="absolute -inset-5 bg-gradient-radial from-punch-red/30 to-transparent avatar-aura -z-10"></div>
            </div>

            {/* Badge */}
            <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-punch-red rounded-full flex items-center justify-center glow-red">
              <i className="fas fa-code text-xl text-honeydew"></i>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-6 mt-8">
            <div className="quick-stat flex items-center gap-2 text-frosted-blue text-sm opacity-0">
              <i className="fas fa-folder-open"></i>
              <span>{stats.projects}+ Projects</span>
            </div>
            <div className="quick-stat flex items-center gap-2 text-frosted-blue text-sm opacity-0">
              <i className="fas fa-certificate"></i>
              <span>{stats.certifications}+ Certifications</span>
            </div>
          </div>
        </div>

        {/* Right - Info */}
        <div className="md:pr-12 text-center md:text-left">
          <div className="hero-intro mb-2 opacity-0">
            <span className="text-frosted-blue text-lg tracking-wider">
              Hello, I'm
            </span>
          </div>

          <h1 className="hero-name font-display text-3xl md:text-5xl lg:text-7xl font-black leading-tight mb-4 opacity-0 whitespace-nowrap">
            <span className="text-honeydew">{profile.firstName}</span>{" "}
            <span className="text-punch-red text-glow-red">
              {profile.lastName}
            </span>
          </h1>

          <div className="hero-role mb-5 opacity-0">
            <span className="text-frosted-blue text-xl font-semibold">
              {profile.headline} Developer
            </span>
            <div className="role-underline h-0.5 bg-linear-to-r from-punch-red to-frosted-blue mt-2 w-0"></div>
          </div>

          <p className="hero-bio text-frosted-blue/80 text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0 opacity-0">
            {formatBoldText(profile.shortBio)}
          </p>

          <div className="hero-cta flex flex-wrap items-center gap-4 justify-center md:justify-start opacity-0">
            <a
              href="#projects"
              className="inline-flex items-center gap-3 bg-punch-red text-honeydew px-5 py-3 md:px-7 md:py-4 rounded font-semibold glow-red transition-all hover:bg-punch-red-light hover:-translate-y-1 hover:shadow-lg"
              aria-label="View my projects"
            >
              <span>Explore Work</span>
              <i className="fas fa-rocket" aria-hidden="true"></i>
            </a>

            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-frosted-blue text-frosted-blue px-5 py-3 md:px-7 md:py-4 rounded font-semibold transition-all hover:bg-frosted-blue hover:text-oxford-navy-dark hover:-translate-y-1"
              aria-label="Download my resume (opens in new tab)"
            >
              <span>Resume</span>
              <i className="fas fa-download" aria-hidden="true"></i>
            </a>

            <div
              className="flex gap-4"
              role="group"
              aria-label="Social media links"
            >
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-frosted-blue rounded-full flex items-center justify-center text-frosted-blue transition-all hover:bg-frosted-blue hover:text-oxford-navy-dark hover:-translate-y-1"
                aria-label="Visit my GitHub profile (opens in new tab)"
              >
                <i className="fab fa-github text-xl" aria-hidden="true"></i>
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 border-2 border-frosted-blue rounded-full flex items-center justify-center text-frosted-blue transition-all hover:bg-frosted-blue hover:text-oxford-navy-dark hover:-translate-y-1"
                aria-label="Visit my LinkedIn profile (opens in new tab)"
              >
                <i
                  className="fab fa-linkedin-in text-xl"
                  aria-hidden="true"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
