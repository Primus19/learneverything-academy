export interface ResumeSample {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
  previewImage: string;
  features: string[];
  suitableFor: string[];
  format: string;
  lastUpdated: string;
}

export const resumeSamples: ResumeSample[] = [
  {
    id: "junior-web-developer",
    title: "Junior Web Developer Resume",
    description: "Professional resume template for entry-level web developers showcasing frontend and backend skills.",
    category: "Web Development",
    downloadUrl: "/templates/junior-web-developer.pdf",
    previewImage: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60",
    features: [
      "Clean, modern design",
      "Skills section with tech stack",
      "Project showcase section",
      "Education and certifications layout"
    ],
    suitableFor: [
      "Recent graduates",
      "Career changers",
      "Bootcamp graduates",
      "Junior developers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "senior-web-developer",
    title: "Senior Web Developer Resume",
    description: "Comprehensive resume template for experienced web developers with full-stack expertise.",
    category: "Web Development",
    downloadUrl: "/templates/senior-web-developer.pdf",
    previewImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    features: [
      "Advanced skills section",
      "Project leadership highlights",
      "Technical achievements",
      "Professional certifications"
    ],
    suitableFor: [
      "Senior developers",
      "Team leads",
      "Full-stack developers",
      "Technical architects"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "junior-react-developer",
    title: "Junior React Developer Resume",
    description: "Specialized resume template for React developers highlighting frontend skills and project experience.",
    category: "Frontend",
    downloadUrl: "/templates/junior-react-developer.pdf",
    previewImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    features: [
      "React project showcase",
      "Frontend skills section",
      "UI/UX highlights",
      "GitHub portfolio"
    ],
    suitableFor: [
      "Junior React developers",
      "Frontend engineers",
      "UI developers",
      "Web developers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "senior-react-developer",
    title: "Senior React Developer Resume",
    description: "Professional resume template for experienced React developers with advanced frontend expertise.",
    category: "Frontend",
    downloadUrl: "/templates/senior-react-developer.pdf",
    previewImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60",
    features: [
      "Advanced React patterns",
      "Architecture experience",
      "Team leadership",
      "Performance optimization"
    ],
    suitableFor: [
      "Senior React developers",
      "Frontend architects",
      "Technical leads",
      "UI/UX engineers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "devops-engineer-entry",
    title: "Entry-Level DevOps Engineer Resume",
    description: "Professional resume template tailored for entry-level DevOps engineers.",
    category: "DevOps",
    downloadUrl: "/templates/devops-engineer-entry.pdf",
    previewImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60",
    features: [
      "CI/CD pipeline experience",
      "Cloud platform skills",
      "Infrastructure as Code",
      "Monitoring tools"
    ],
    suitableFor: [
      "Junior DevOps engineers",
      "Cloud engineers",
      "System administrators",
      "IT professionals"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "senior-devops-engineer",
    title: "Senior DevOps Engineer Resume",
    description: "Comprehensive resume template for experienced DevOps engineers.",
    category: "DevOps",
    downloadUrl: "/templates/senior-devops-engineer.pdf",
    previewImage: "https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?w=800&auto=format&fit=crop&q=60",
    features: [
      "Advanced automation",
      "Multi-cloud expertise",
      "Team leadership",
      "Architecture design"
    ],
    suitableFor: [
      "Senior DevOps engineers",
      "Platform engineers",
      "Technical leads",
      "Cloud architects"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "junior-data-engineer",
    title: "Junior Data Engineer Resume",
    description: "Specialized resume template for entry-level data engineers.",
    category: "Data Engineering",
    downloadUrl: "/templates/junior-data-engineer.pdf",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    features: [
      "Data pipeline experience",
      "SQL expertise",
      "ETL processes",
      "Big data tools"
    ],
    suitableFor: [
      "Junior data engineers",
      "ETL developers",
      "Database developers",
      "Analytics engineers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "senior-data-engineer",
    title: "Senior Data Engineer Resume",
    description: "Professional resume template for experienced data engineers.",
    category: "Data Engineering",
    downloadUrl: "/templates/senior-data-engineer.pdf",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    features: [
      "Advanced data architecture",
      "Team leadership",
      "Data governance",
      "Performance optimization"
    ],
    suitableFor: [
      "Senior data engineers",
      "Data architects",
      "Technical leads",
      "Big data specialists"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "junior-data-analyst",
    title: "Junior Data Analyst Resume",
    description: "Resume template for entry-level data analysts.",
    category: "Data Analytics",
    downloadUrl: "/templates/junior-data-analyst.pdf",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    features: [
      "Data visualization",
      "SQL skills",
      "Statistical analysis",
      "BI tools"
    ],
    suitableFor: [
      "Junior data analysts",
      "Business analysts",
      "BI analysts",
      "Analytics specialists"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "senior-data-analyst",
    title: "Senior Data Analyst Resume",
    description: "Professional resume template for experienced data analysts.",
    category: "Data Analytics",
    downloadUrl: "/templates/senior-data-analyst.pdf",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    features: [
      "Advanced analytics",
      "Project leadership",
      "Stakeholder management",
      "Strategic insights"
    ],
    suitableFor: [
      "Senior data analysts",
      "Analytics managers",
      "BI managers",
      "Data strategists"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "junior-security-analyst",
    title: "Junior Security Analyst Resume",
    description: "Resume template for entry-level security analysts.",
    category: "Security",
    downloadUrl: "/templates/junior-security-analyst.pdf",
    previewImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    features: [
      "Security tools",
      "Incident response",
      "Vulnerability assessment",
      "Security monitoring"
    ],
    suitableFor: [
      "Junior security analysts",
      "SOC analysts",
      "Security specialists",
      "IT security"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "senior-security-analyst",
    title: "Senior Security Analyst Resume",
    description: "Professional resume template for experienced security analysts.",
    category: "Security",
    downloadUrl: "/templates/senior-security-analyst.pdf",
    previewImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    features: [
      "Advanced security",
      "Team leadership",
      "Threat hunting",
      "Security architecture"
    ],
    suitableFor: [
      "Senior security analysts",
      "Security managers",
      "SOC managers",
      "Security architects"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  }
];