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
    id: "software-engineer-template",
    title: "Software Engineer Resume",
    description: "Professional resume template tailored for software engineers with 1-5 years of experience.",
    category: "Technology",
    downloadUrl: "/templates/software-engineer-resume.pdf",
    previewImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
    features: [
      "ATS-friendly format",
      "Skills section with technology stack",
      "Project highlights section",
      "Education and certifications layout"
    ],
    suitableFor: [
      "Software Engineers",
      "Full Stack Developers",
      "Backend Developers",
      "Frontend Developers"
    ],
    format: "PDF, DOCX",
    lastUpdated: "2024-01-15"
  },
  {
    id: "frontend-developer-template",
    title: "Frontend Developer Resume",
    description: "Clean and modern resume template optimized for frontend development roles.",
    category: "Technology",
    downloadUrl: "/templates/frontend-developer-resume.pdf",
    previewImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&auto=format&fit=crop&q=60",
    features: [
      "Portfolio section",
      "UI/UX project showcase",
      "Technical skills grid",
      "Responsive design examples"
    ],
    suitableFor: [
      "Frontend Developers",
      "UI Developers",
      "Web Designers",
      "UX Engineers"
    ],
    format: "PDF, DOCX, Figma",
    lastUpdated: "2024-01-20"
  }
];