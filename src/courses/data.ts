export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  instructor: {
    name: string;
    bio: string;
    avatar: string;
  };
  curriculum: {
    weeks: {
      title: string;
      topics: string[];
      description: string;
    }[];
  };
  requirements: string[];
  objectives: string[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export const courses: Course[] = [
  {
    id: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    description: "Master the core concepts of web development with HTML, CSS, and JavaScript. Build responsive websites from scratch.",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60",
    price: 99.99,
    duration: "8 weeks",
    level: "Beginner",
    topics: [
      "HTML5 Fundamentals",
      "CSS3 Styling & Layouts",
      "JavaScript Basics",
      "Responsive Design",
      "Web Accessibility",
      "Version Control with Git",
      "Web Performance",
      "Basic SEO"
    ],
    instructor: {
      name: "Sarah Johnson",
      bio: "Senior Web Developer with 10+ years of experience in building modern web applications",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60"
    },
    curriculum: {
      weeks: [
        {
          title: "Introduction to HTML",
          topics: ["Basic HTML structure", "Semantic HTML", "Forms and validation"],
          description: "Learn the fundamentals of HTML and how to structure web content properly."
        },
        {
          title: "CSS Fundamentals",
          topics: ["CSS selectors", "Box model", "Flexbox", "Grid"],
          description: "Master CSS layouts and styling techniques."
        },
        {
          title: "JavaScript Basics",
          topics: ["Variables", "Functions", "DOM manipulation"],
          description: "Get started with JavaScript programming."
        }
      ]
    },
    requirements: [
      "Basic computer knowledge",
      "Text editor (VS Code recommended)",
      "Internet connection"
    ],
    objectives: [
      "Build responsive websites from scratch",
      "Understand modern web development practices",
      "Create interactive web applications"
    ],
    features: [
      {
        icon: "video",
        title: "HD Video Content",
        description: "Access high-quality video lectures"
      },
      {
        icon: "code",
        title: "Practical Projects",
        description: "Build real-world projects"
      },
      {
        icon: "message-circle",
        title: "Community Support",
        description: "Get help from peers and instructors"
      }
    ]
  },
  {
    id: "react-masterclass",
    title: "React Masterclass",
    description: "Learn React from the ground up. Build modern web applications with the most popular JavaScript library.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    price: 149.99,
    duration: "10 weeks",
    level: "Intermediate",
    topics: [
      "React Fundamentals",
      "Hooks in Depth",
      "State Management",
      "React Router",
      "Testing React Apps",
      "Performance Optimization",
      "Server-Side Rendering",
      "React Best Practices"
    ],
    instructor: {
      name: "Michael Chen",
      bio: "React expert and tech lead at a Fortune 500 company",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60"
    },
    curriculum: {
      weeks: [
        {
          title: "React Basics",
          topics: ["Components", "Props", "State", "JSX"],
          description: "Understanding the core concepts of React."
        },
        {
          title: "Advanced React",
          topics: ["Hooks", "Context", "HOCs", "Render props"],
          description: "Dive deep into advanced React patterns."
        },
        {
          title: "State Management",
          topics: ["Redux", "MobX", "Zustand"],
          description: "Learn different state management solutions."
        }
      ]
    },
    requirements: [
      "JavaScript fundamentals",
      "ES6+ knowledge",
      "Basic HTML & CSS",
      "Node.js installed"
    ],
    objectives: [
      "Build complex React applications",
      "Implement state management",
      "Master React hooks",
      "Deploy React apps"
    ],
    features: [
      {
        icon: "book",
        title: "Comprehensive Material",
        description: "In-depth coverage of React concepts"
      },
      {
        icon: "lab",
        title: "Hands-on Labs",
        description: "Practice with real-world exercises"
      },
      {
        icon: "certificate",
        title: "Certificate",
        description: "Earn a completion certificate"
      }
    ]
  }
];