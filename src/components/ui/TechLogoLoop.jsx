import LogoLoop from "./LogoLoop";

// Tech logos with icons from Font Awesome (as nodes)
const techLogos = [
  {
    node: <i className="fab fa-html5" style={{ color: "#E34F26" }}></i>,
    title: "HTML5",
  },
  {
    node: <i className="fab fa-css3-alt" style={{ color: "#1572B6" }}></i>,
    title: "CSS3",
  },
  {
    node: <i className="fab fa-js-square" style={{ color: "#F7DF1E" }}></i>,
    title: "JavaScript",
  },
  {
    node: <i className="fab fa-react" style={{ color: "#61DAFB" }}></i>,
    title: "React",
  },
  {
    node: <i className="fab fa-node-js" style={{ color: "#339933" }}></i>,
    title: "Node.js",
  },
  {
    node: <i className="fab fa-python" style={{ color: "#3776AB" }}></i>,
    title: "Python",
  },
  {
    node: <i className="fab fa-git-alt" style={{ color: "#F05032" }}></i>,
    title: "Git",
  },
  {
    node: <i className="fab fa-docker" style={{ color: "#2496ED" }}></i>,
    title: "Docker",
  },
  {
    node: <i className="fab fa-github" style={{ color: "#a8dadc" }}></i>,
    title: "GitHub",
  },
  {
    node: <i className="fas fa-database" style={{ color: "#336791" }}></i>,
    title: "PostgreSQL",
  },
  {
    node: <i className="fas fa-leaf" style={{ color: "#47A248" }}></i>,
    title: "MongoDB",
  },
  {
    node: <i className="fab fa-npm" style={{ color: "#CB3837" }}></i>,
    title: "NPM",
  },
];

const TechLogoLoop = () => {
  return (
    <section className="py-12 bg-oxford-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-punch-red/5 via-transparent to-transparent"></div>

      <div className="text-center mb-8">
        <span className="text-frosted-blue/60 text-sm uppercase tracking-widest">
          Technologies I Work With
        </span>
      </div>

      <LogoLoop
        logos={techLogos}
        speed={80}
        direction="left"
        logoHeight={52}
        gap={48}
        hoverSpeed={40}
        fadeOut={true}
        fadeOutColor="#1d3557"
        scaleOnHover={true}
        className="tech-logo-loop"
      />
    </section>
  );
};

export default TechLogoLoop;
