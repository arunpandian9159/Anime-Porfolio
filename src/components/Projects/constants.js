// Category configuration
export const CATEGORIES = {
  ai: {
    label: "AI",
    color: "punch-red",
    dotClass: "bg-punch-red",
    glowClass: "card-glow-ai",
    icon: "fas fa-brain",
    iconBg: "bg-punch-red/10",
    iconText: "text-punch-red",
    iconHoverBg: "group-hover:bg-punch-red",
  },
  fullstack: {
    label: "Full Stack",
    color: "cerulean",
    dotClass: "bg-cerulean",
    glowClass: "card-glow-fullstack",
    icon: "fas fa-layer-group",
    iconBg: "bg-cerulean/10",
    iconText: "text-cerulean",
    iconHoverBg: "group-hover:bg-cerulean",
  },
  blockchain: {
    label: "Blockchain & Web3",
    color: "frosted-blue",
    dotClass: "bg-frosted-blue",
    glowClass: "card-glow-blockchain",
    icon: "fas fa-link",
    iconBg: "bg-frosted-blue/10",
    iconText: "text-frosted-blue",
    iconHoverBg: "group-hover:bg-frosted-blue",
  },
};

// Category display order
export const CATEGORY_ORDER = ["ai", "fullstack", "blockchain"];

// Determine card size based on project properties
export const getCardSize = (project) => {
  if (project.featured) return "large";
  if (project.images && project.images.length > 0) return "medium";
  return "small";
};

// Animation variants
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};
