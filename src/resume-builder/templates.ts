export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  previewImage: string;
  styles: {
    container: string;
    header: string;
    section: string;
    sectionTitle: string;
    content: string;
    socialLinks: string;
    projectItem: string;
  };
}

export const resumeTemplates: ResumeTemplate[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with a focus on readability",
    previewImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60",
    styles: {
      container: "max-w-[800px] mx-auto p-8 bg-white shadow-lg print:shadow-none",
      header: "text-center mb-8",
      section: "mb-6 print:mb-4",
      sectionTitle: "text-xl font-semibold border-b border-gray-300 pb-2 mb-4 print:text-lg",
      content: "space-y-4 print:space-y-2",
      socialLinks: "flex justify-center gap-4 mt-2",
      projectItem: "mb-4 p-4 bg-gray-50 rounded-lg"
    }
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional layout perfect for corporate environments",
    previewImage: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=800&auto=format&fit=crop&q=60",
    styles: {
      container: "max-w-[800px] mx-auto p-8 bg-white shadow-lg border-t-4 border-primary print:shadow-none print:border-none",
      header: "border-b-2 border-primary pb-4 mb-8 print:border-black",
      section: "mb-8 print:mb-4",
      sectionTitle: "text-xl font-bold text-primary mb-4 print:text-black print:text-lg",
      content: "space-y-4 print:space-y-2",
      socialLinks: "flex gap-4 mt-2",
      projectItem: "mb-4 border-l-4 border-primary pl-4"
    }
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant design that lets your content shine",
    previewImage: "https://images.unsplash.com/photo-1586282023358-79e989f7c651?w=800&auto=format&fit=crop&q=60",
    styles: {
      container: "max-w-[800px] mx-auto p-8 bg-white",
      header: "mb-8",
      section: "mb-6 print:mb-4",
      sectionTitle: "text-lg font-medium mb-4 uppercase tracking-wider print:text-base",
      content: "space-y-3 print:space-y-2",
      socialLinks: "flex gap-4 mt-2 text-gray-600",
      projectItem: "mb-4"
    }
  }
];