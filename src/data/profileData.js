export const profileData = {
  profile: {
    name: "Arunpandian C",
    firstName: "Arunpandian",
    lastName: "C",
    headline: "Full Stack Developer",
    bio: "An aspiring full-stack developer with a strong foundation in front-end and back-end technologies. I have a passion for building responsive, scalable, and user-focused web applications. I am committed to writing clean, efficient code and continuously learning new tools and frameworks. My goal is to deliver seamless user experiences through intuitive interfaces and robust server-side logic to drive functionality, performance, and user satisfaction.",
    shortBio: "Building responsive, scalable, and user-focused web applications with passion and precision.",
    location: "Puducherry, India",
    email: "arunpandiancse25@gmail.com",
    phone: "+91 8072396488",
    profileImage: "/profile.jpg",
    icon: "/icon-144.png",
    resume: "/Arunpandian_C_Resume.pdf"
  },
  socials: {
    github: "https://github.com/arunpandian9159",
    linkedin: "https://www.linkedin.com/in/arunpandian-c/"
  },
  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React", "Next.js", "TypeScript"],
    backend: ["Python", "NestJS", "PostgreSQL", "MongoDB"],
    tools: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Cursor", "Docker"],
    soft_skills: ["Problem Solving", "Communication", "Team Collaboration", "Adaptability"]
  },
  education: [
    {
      degree: "Bachelor of Technology in CSE",
      institution: "Manakula Vinayagar Institute of Technology",
      location: "Puducherry",
      year: "2021-2025",
      grade: "CGPA: 7.6",
      icon: "fa-graduation-cap",
      isMain: true
    },
    {
      degree: "Higher Secondary Course (HSC)",
      institution: "Amalorpavam Higher Secondary School",
      location: "Puducherry",
      year: "2020-2021",
      grade: "Percentage: 87%",
      icon: "fa-school"
    },
    {
      degree: "Secondary School Leaving Certificate (SSLC)",
      institution: "Amalorpavam Higher Secondary School",
      location: "Puducherry",
      year: "2018-2019",
      grade: "Percentage: 82%",
      icon: "fa-book-reader"
    }
  ],
  experience: [
    {
      role: "Frontend Development Intern",
      company: "Tripmilestone Tours Pvt Ltd",
      duration: "6 months",
      description: "Developed and maintained responsive UI components for tripxplo.com using React and Tailwind CSS. Collaborated with senior developers on coding and debugging tasks.",
      tech: ["React", "Tailwind CSS"]
    },
    {
      role: "Full Stack Development Intern",
      company: "VEI Technologies Pvt Ltd",
      duration: "2 weeks",
      description: "Worked on web development projects using modern technologies.",
      tech: ["Full Stack"]
    }
  ],
  certifications: [
    { title: "Python (Certiport)", icon: "fab fa-python", image: "/python-certiport.png" },
    { title: "ICT Learnathon 2023", icon: "fas fa-laptop-code", image: "/Learnathon.png" },
    { title: "Skill-a-thon 2024", icon: "fas fa-trophy", image: "/Skill la thon.png" },
    { title: "Fullstack Capgemini", icon: "fas fa-layer-group", image: "/Capgemini.png" },
    { title: "MongoDB Certification", icon: "fas fa-database", image: "/mongoDB.png" }
  ],
  achievements: [
    { text: "Typewriting-Distinction (Senior)", icon: "fas fa-medal" },
    { text: "Published IEEE Paper (ICDSBS 2025)", icon: "fas fa-file-alt", image: "/certificate of presentation.png", paperLink: "/622_Final Camera Ready Copy.pdf" },
    { text: "Tripxplo Internship Certificate", icon: "fas fa-certificate", image: "/tripxplo intern certificate.png" },
    { text: "VEI Technologies Certificate", icon: "fas fa-certificate", image: "/VEI technologies.jpg" },
    { text: "NSS Activities - Cycle Rally", icon: "fas fa-bicycle" },
    { text: "NCC Air Force", icon: "fas fa-plane" }
  ],
  projects: [
    {
      title: "Jez Cabs Management Platform",
      description: "A comprehensive, production-ready multi-tenant SaaS platform for B2B cab rental companies. Features fleet management, bookings, driver coordination, maintenance scheduling, and invoicing.",
      tech: ["NestJS", "React", "PostgreSQL", "TypeScript", "Docker"],
      liveLink: "https://jez-cabs-management-frontend.vercel.app/",
      repoLink: "https://github.com/arunpandian9159/Jez-Cabs-Management-Platform",
      teamSize: 1,
      role: "Full Stack Developer",
      featured: true,
      icon: "fas fa-car"
    },
    {
      title: "NFT Based Certification System",
      description: "A decentralized certification system for digital artwork leveraging NFT technology on the Polygon blockchain. Ensures authenticity, ownership verification, and provenance tracking.",
      tech: ["Solidity", "Web3", "Polygon", "JavaScript", "Smart Contracts"],
      repoLink: "https://github.com/arunpandian9159/NFT-PROJECT",
      ieeeLink: "https://ieeexplore.ieee.org/document/11031552",
      teamSize: 3,
      featured: true,
      isPublished: true,
      icon: "fas fa-certificate"
    },
    {
      title: "Internship Management System",
      description: "A comprehensive internship management platform designed to streamline student onboarding, course management, and academic tracking.",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      liveLink: "https://internbyte.com",
      teamSize: 4,
      role: "Frontend Developer",
      featured: false
    },
    {
      title: "Travel Industry CRM Platform",
      description: "A comprehensive CRM system for travel and tourism industry with quotes management, leads tracking, and itinerary planning.",
      tech: ["React", "TypeScript", "Redux"],
      teamSize: 5,
      role: "Frontend Developer",
      featured: false
    }
  ],
  stats: {
    projects: 6,
    technologies: 10,
    internships: 2,
    certifications: 5
  }
};
