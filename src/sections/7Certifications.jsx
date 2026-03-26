import { useCallback, useState } from "react";
import { animate } from "animejs";
import { profileData } from "../data/profileData";
import { useIntersectionAnimate } from "../hooks/useIntersectionAnimate";
import SectionHeader from "../components/ui/SectionHeader";
import CertCard from "../components/Certifications/CertCard";
import AchievementItem from "../components/Certifications/AchievementItem";
import ImageModal from "../components/Certifications/ImageModal";

const Certifications = () => {
  const [modalImages, setModalImages] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const handleImageClick = useCallback((images, title) => {
    setModalImages(images);
    setModalTitle(title);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalImages(null);
    setModalTitle("");
  }, []);

  const runHeaderAnimation = useCallback(() => {
    animate(".cert-header .section-tag", {
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 300,
      easing: "easeOutExpo",
    });
    animate(".cert-header .section-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 400,
      delay: 100,
      easing: "easeOutExpo",
    });
    animate(".cert-header .title-decoration", {
      width: [0, 80],
      duration: 300,
      delay: 200,
      easing: "easeOutExpo",
    });
  }, []);

  const sectionRef = useIntersectionAnimate(runHeaderAnimation);

  const { certifications, achievements } = profileData;

  return (
    <>
      <section
        id="certifications"
        ref={sectionRef}
        className="py-12 md:py-24 bg-oxford-navy-dark"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-5">
          {/* Header */}
          <SectionHeader
            tag="Credentials"
            title="Certifications &"
            highlight="Achievements"
            className="cert-header"
          />

          {/* Certifications Grid */}
          <h3 className="sr-only">Certifications</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-10 md:mb-16 px-1">
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.title}
                cert={cert}
                index={i}
                onImageClick={handleImageClick}
              />
            ))}
          </div>

          {/* Achievements */}
          <h3 className="font-display text-xl md:text-2xl text-frosted-blue text-center mb-5 md:mb-8">
            Achievements & Activities
          </h3>
          <div className="grid md:grid-cols-2 gap-3 md:gap-4 md:max-w-4xl md:mx-auto px-1">
            {achievements.map((item, i) => (
              <AchievementItem
                key={item.text}
                item={item}
                index={i}
                onImageClick={handleImageClick}
              />
            ))}
          </div>
        </div>
      </section>

      <ImageModal
        images={modalImages}
        title={modalTitle}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Certifications;
