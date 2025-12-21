export const profileData = {
  profile: {
    name: "Arunpandian C",
    firstName: "Arunpandian",
    lastName: "C",
    headline: "Full Stack",
    bio: "An aspiring full-stack developer with a strong foundation in front-end and back-end technologies. I have a passion for building responsive, scalable, and user-focused web applications. I am committed to writing clean, efficient code and continuously learning new tools and frameworks. My goal is to deliver seamless user experiences through intuitive interfaces and robust server-side logic to drive functionality, performance, and user satisfaction.",
    shortBio: "Building responsive, scalable, and user-focused web applications with passion and precision.",
    location: "Puducherry, India",
    email: "arunpandiancse25@gmail.com",
    phone: "+91 8072396488",
    profileImage: "/profile.jpg",
    icon: "/icon-144.webp",
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
      location: "Vellore (tripxplo.com)",
      duration: "June 2025 - Dec 2025 (7 months)",
      description: [
        "Completed a 7-month frontend developer internship contributing to real-world SaaS products in the travel domain.",
        "Built core UI components for an Internship Management System (Internbyte) using Next.js and TypeScript, focusing on student onboarding, course management, and academic tracking workflows.",
        "Collaborated in a 4-member team to translate product requirements into responsive, user-friendly pages backed by SQL-driven data flows.",
        "Worked on a Travel Industry CRM Platform, implementing React and Tailwind CSS interfaces tailored for lead, customer, and booking management.",
        "Practiced Git-based collaboration, API integration, and UI refinement in cross-functional teams."
      ],
      tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "SQL", "Git"]
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
    { title: "Python (Certiport)", icon: "fab fa-python", image: "/python-certiport.webp" },
    { title: "ICT Learnathon 2023", icon: "fas fa-laptop-code", image: "/learnathon.webp" },
    { title: "Skill-a-thon 2024", icon: "fas fa-trophy", image: "/skill-la-thon.webp" },
    { title: "Fullstack Capgemini", icon: "fas fa-layer-group", image: "/capgemini.webp" },
    { title: "MongoDB Certification", icon: "fas fa-database", image: "/mongodb.webp" }
  ],
  achievements: [
    { text: "Typewriting-Distinction (Senior)", icon: "fas fa-medal" },
    { text: "Published IEEE Paper (ICDSBS 2025)", icon: "fas fa-file-alt", image: "/certificate-presentation.webp", paperLink: "/622_Final Camera Ready Copy.pdf" },
    { text: "Tripxplo Internship Certificate", icon: "fas fa-certificate", image: "/tripxplo-intern-certificate.webp" },
    { text: "VEI Technologies Certificate", icon: "fas fa-certificate", image: "/vei-technologies.webp" },
    { text: "NSS Activities - Cycle Rally", icon: "fas fa-bicycle" },
    { text: "NCC Air Force", icon: "fas fa-plane" }
  ],
  projects: [
    {
      title: "Jez Cabs Management Platform",
      description: [
        "Architected a production-ready multi-role cab management system using NestJS and a hybrid database strategy (PostgreSQL & MongoDB) to handle complex data relationships and booking logs.",
        "Engineered a type-safe frontend with React 19 and Tailwind CSS v4, integrating Leaflet and OSRM to provide real-time GPS tracking, precise route calculation, and interactive visual rendering.",
        "Implemented robust Role-Based Access Control (RBAC) with JWT authentication to secure workflows for 6 distinct user types, including Drivers, Fleet Owners, and Admins."
      ],
      tech: ["NestJS", "React", "PostgreSQL", "TypeScript", "Docker"],
      liveLink: "https://jez-cabs-management-frontend.vercel.app/",
      repoLink: "https://github.com/arunpandian9159/Jez-Cabs-Management-Platform",
      teamSize: 1,
      role: "Full Stack Developer",
      featured: true,
      images: ["/Jezcabs.png"],
      icon: "fas fa-car"
    },
    {
      title: "NFT Based Certification System",
      description: [
        "Developed a decentralized NFT-based certification platform on the Polygon blockchain ensuring authenticity, ownership, and provenance tracking for digital artwork.",
        "Designed and deployed smart contracts in Solidity to mint tamper-proof NFT certificates, integrating seamlessly with a JavaScript-based web interface.",
        "Architected a scalable, gas-efficient ecosystem enabling secure, verifiable transactions for artists and collectors within the digital art marketplace."
      ],
      tech: ["Solidity", "Web3", "Polygon", "JavaScript", "Smart Contracts"],
      repoLink: "https://github.com/arunpandian9159/NFT-PROJECT",
      ieeeLink: "https://ieeexplore.ieee.org/document/11031552",
      teamSize: 3,
      featured: true,
      isPublished: true,
      images: ["/SRM Conference image.jpg", "/certificate-presentation.webp"],
      icon: "fas fa-certificate"
    },
    {
      title: "Tariff Extraction Process",
      description: [
        "Engineered an AI-powered pipeline to extract and structure hotel tariff data from PDFs, using Mistral OCR for text extraction and Google Gemini for parsing base rates, seasonal surcharges, and pricing rules into queryable JSON.",
        "Implemented a multi-stage LLM orchestration system with triage, validity period parsing, and rule extraction, enabling dynamic price calculations for room categories, meal plans, extra persons, and GST across validity dates.",
        "Developed a pricing engine with fuzzy matching and rule application logic (surcharges, discounts, mandatory fees), automating  complex booking quotes and reducing manual tariff processing time for TripXplo's travel booking platform."
      ],
      tech: ["Python", "Mistral AI", "Google Gemini", "Langchain"],
      role: "AI Engineer Intern",
      featured: false,
      images: ["/tariff extraction 1.png", "/tariff extraction 2.png"],
      icon: "fas fa-robot",
      teamSize: 1
    },
    {
      title: "Internship Management System",
      description: [
        "Built a scalable internship management platform using Next.js with TypeScript, integrating a real-time SQL database for seamless student onboarding, course tracking, and certification workflows.",
        "Engineered secure authentication, attendance monitoring, and automated quiz evaluation to enhance transparency and efficiency for institutions and interns.",
        "Delivered a responsive, mobile-first interface optimizing user experience for students, instructors, and administrators across devices."
      ],
      tech: ["Next.js", "TypeScript", "Tailwind"],
      liveLink: "https://internbyte.com",
      teamSize: 4,
      role: "Frontend Developer",
      images: ["/internbyte 1.png"],
      featured: false
    },
    {
      title: "Travel Industry CRM Platform",
      description: [
        "Engineered a domain-specific Travel Industry CRM using React, TypeScript, Redux, and Tailwind CSS to centralize quotes, leads, invoices, and trip itineraries for travel agencies and tour operators.",
        "Designed and implemented responsive, modular UI components that streamline day-to-day workflows like quotes management, follow-ups and booking lifecycle tracking in a single integrated platform.",
        "Enhanced customer engagement capabilities by building views for tracking client preferences, booking history, and communication logs to support personalized travel experiences."
      ],
      tech: ["React", "TypeScript", "Redux"],
      teamSize: 5,
      role: "Frontend Developer",
      images: ["/crm tripxplo 1.png", "/crm tripxplo 2.png"],
      imageLayout: 'split-vertical',
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
