import { useCallback } from "react";
import { animate, stagger } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "./ui/SectionHeader";

const Contact = () => {
  const runHeaderAnimation = useCallback(() => {
    animate(".contact-header .section-tag", {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: "easeOutExpo",
    }); 
    animate(".contact-header .section-title", { 
      opacity: [0, 1], 
      translateY: [30, 0],
      duration: 400, 
      delay: 100,
      easing: "easeOutExpo",
    });
    animate(".contact-header .title-decoration", {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: "easeOutExpo",
    });
    animate(".contact-method-item", {
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: stagger(50, { start: 300 }),
      duration: 300,
      easing: "easeOutExpo",
    });
    animate(".social-connect-box", {
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 400,
      delay: 400,
      easing: "easeOutExpo",
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { profile, socials } = profileData;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-12 md:py-24 bg-oxford-navy relative"
      aria-label="Contact information"
    >
      <div className="absolute inset-0 bg-gradient-radial from-punch-red/10 to-transparent opacity-50 -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-5">
        {/* Header */}
        <SectionHeader
          tag="Get In Touch"
          title="Let's"
          highlight="Connect"
          className="contact-header"
        />

        {/* Content */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 md:gap-16 items-center">
          {/* Contact Info */}
          <div>
            <p className="text-frosted-blue/80 text-sm md:text-lg mb-5 md:mb-8">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I'll get back to you!
            </p>

            <div className="space-y-3 md:space-y-5">
              <a
                href={`mailto:${profile.email}`}
                className="contact-method-item flex items-center gap-3 md:gap-5 p-3 md:p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-xl md:rounded-2xl transition-all hover:border-punch-red hover:translate-x-2 opacity-0"
                aria-label={`Send email to ${profile.email}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-punch-red to-cerulean rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-xl text-honeydew shrink-0">
                  <i className="fas fa-envelope" aria-hidden="true"></i>
                </div>
                <div className="min-w-0">
                  <span className="text-frosted-blue/60 text-xs md:text-sm uppercase tracking-wider block">
                    Email
                  </span>
                  <span className="font-semibold text-sm md:text-base truncate block">
                    {profile.email}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="contact-method-item flex items-center gap-3 md:gap-5 p-3 md:p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-xl md:rounded-2xl transition-all hover:border-punch-red hover:translate-x-2 opacity-0"
                aria-label={`Call ${profile.phone}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-punch-red to-cerulean rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-xl text-honeydew shrink-0">
                  <i className="fas fa-phone" aria-hidden="true"></i>
                </div>
                <div>
                  <span className="text-frosted-blue/60 text-xs md:text-sm uppercase tracking-wider block">
                    Phone
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    {profile.phone}
                  </span>
                </div>
              </a>

              <div
                className="contact-method-item flex items-center gap-3 md:gap-5 p-3 md:p-5 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-xl md:rounded-2xl opacity-0"
                aria-label={`Location: ${profile.location}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-punch-red to-cerulean rounded-lg md:rounded-xl flex items-center justify-center text-lg md:text-xl text-honeydew shrink-0">
                  <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                </div>
                <div>
                  <span className="text-frosted-blue/60 text-xs md:text-sm uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="font-semibold text-sm md:text-base">
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Connect */}
          <div className="social-connect-box text-center p-6 md:p-10 bg-oxford-navy-dark/50 border border-frosted-blue/15 rounded-xl md:rounded-2xl opacity-0">
            <h3 className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6">
              Connect With Me
            </h3>
            <div
              className="flex justify-center gap-3 md:gap-5"
              role="group"
              aria-label="Social media links"
            >
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-5 bg-oxford-navy/50 border border-frosted-blue/20 rounded-xl md:rounded-2xl text-frosted-blue/80 transition-all hover:border-honeydew hover:text-honeydew hover:bg-white/10"
                aria-label="Visit my GitHub profile (opens in new tab)"
              >
                <i
                  className="fab fa-github text-2xl md:text-3xl"
                  aria-hidden="true"
                ></i>
                <span className="text-sm md:text-base">GitHub</span>
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 md:gap-3 px-5 md:px-8 py-3 md:py-5 bg-oxford-navy/50 border border-frosted-blue/20 rounded-xl md:rounded-2xl text-frosted-blue/80 transition-all hover:border-[#0077b5] hover:text-[#0077b5] hover:bg-[#0077b5]/10"
                aria-label="Visit my LinkedIn profile (opens in new tab)"
              >
                <i
                  className="fab fa-linkedin-in text-2xl md:text-3xl"
                  aria-hidden="true"
                ></i>
                <span className="text-sm md:text-base">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
