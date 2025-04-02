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
    id: "devops-engineer-entry",
    title: "Entry-Level DevOps Engineer Resume",
    description: "Professional resume template tailored for entry-level DevOps engineers who have completed comprehensive DevOps training.",
    category: "DevOps",
    downloadUrl: "/templates/devops-engineer-entry.pdf",
    previewImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60",
    features: [
      "ATS-friendly format",
      "Skills section with technology stack",
      "Project highlights section",
      "Education and certifications layout"
    ],
    suitableFor: [
      "Recent graduates",
      "Career changers",
      "DevOps bootcamp graduates",
      "Junior DevOps engineers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "devops-engineer-mid",
    title: "Mid-Level DevOps Engineer Resume",
    description: "Comprehensive resume template for DevOps engineers with 3+ years of experience in CI/CD, cloud platforms, and infrastructure automation.",
    category: "DevOps",
    downloadUrl: "/templates/devops-engineer-mid.pdf",
    previewImage: "https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?w=800&auto=format&fit=crop&q=60",
    features: [
      "Detailed work experience section",
      "Advanced technical skills layout",
      "Project achievements",
      "Professional certifications"
    ],
    suitableFor: [
      "Mid-level DevOps engineers",
      "Site Reliability Engineers",
      "Platform Engineers",
      "Cloud Engineers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "devops-architect",
    title: "Senior DevOps Architect Resume",
    description: "Executive-level resume template for DevOps architects and leaders with extensive experience in enterprise DevOps transformation.",
    category: "DevOps",
    downloadUrl: "/templates/devops-architect.pdf",
    previewImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
    features: [
      "Leadership experience highlights",
      "Enterprise architecture skills",
      "Strategic initiatives section",
      "Industry recognition"
    ],
    suitableFor: [
      "DevOps Architects",
      "Technical Leaders",
      "Enterprise Architects",
      "DevOps Managers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "aws-cloud-engineer-entry",
    title: "Entry-Level AWS Cloud Engineer Resume",
    description: "Tailored resume template for entry-level AWS cloud engineers showcasing cloud infrastructure and automation skills.",
    category: "Cloud",
    downloadUrl: "/templates/aws-cloud-engineer-entry.pdf",
    previewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    features: [
      "AWS services expertise",
      "Cloud projects showcase",
      "Technical certifications",
      "Best practices implementation"
    ],
    suitableFor: [
      "Cloud Engineering graduates",
      "Junior Cloud Engineers",
      "AWS certification holders",
      "Infrastructure Engineers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "aws-cloud-engineer-mid",
    title: "Mid-Level AWS Cloud Engineer Resume",
    description: "Professional resume template for experienced AWS cloud engineers with proven expertise in cloud architecture and operations.",
    category: "Cloud",
    downloadUrl: "/templates/aws-cloud-engineer-mid.pdf",
    previewImage: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=800&auto=format&fit=crop&q=60",
    features: [
      "Advanced AWS architecture",
      "Multi-account management",
      "Security implementations",
      "Cost optimization"
    ],
    suitableFor: [
      "Senior Cloud Engineers",
      "Cloud Architects",
      "DevOps Engineers",
      "Solutions Architects"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "soc-analyst-entry",
    title: "Entry-Level SOC Analyst Resume",
    description: "Specialized resume template for entry-level Security Operations Center analysts with cybersecurity training.",
    category: "Security",
    downloadUrl: "/templates/soc-analyst-entry.pdf",
    previewImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60",
    features: [
      "Security tools proficiency",
      "Incident response skills",
      "Technical certifications",
      "Project experience"
    ],
    suitableFor: [
      "Junior SOC Analysts",
      "Security Analysts",
      "Cybersecurity graduates",
      "IT Security professionals"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  },
  {
    id: "soc-analyst-senior",
    title: "Senior SOC Analyst Resume",
    description: "Executive resume template for senior SOC analysts and security operations managers with extensive experience in threat detection and incident response.",
    category: "Security",
    downloadUrl: "/templates/soc-analyst-senior.pdf",
    previewImage: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&auto=format&fit=crop&q=60",
    features: [
      "Leadership experience",
      "Advanced threat hunting",
      "Team management",
      "Security strategy"
    ],
    suitableFor: [
      "Senior SOC Analysts",
      "Security Operations Managers",
      "Threat Hunters",
      "Security Team Leads"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-03"
  }
];