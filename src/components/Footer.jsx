import PerformanceBadge from "./ui/PerformanceBadge";

const Footer = () => {
  return (
    <footer className="py-6 md:py-10 bg-oxford-navy-dark border-t border-frosted-blue/10">
      <div className="max-w-6xl mx-auto px-4 md:px-5 text-center">
        <div className="font-display text-2xl md:text-3xl font-black text-punch-red text-glow-red mb-2 md:mb-4">
          AC
        </div>
        <p className="text-frosted-blue/80 text-sm md:text-base mb-1 md:mb-2">
          Designed & Built by{" "}
          <span className="text-punch-red">Arunpandian C</span>
        </p>
        <p className="text-frosted-blue/50 text-xs md:text-sm mb-4 md:mb-6">
          © 2025 All Rights Reserved
        </p> 
        <div className="pt-3 md:pt-4 border-t border-frosted-blue/10">
          <PerformanceBadge />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
