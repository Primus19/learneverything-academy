import { Chapter } from "@/src/lib/course-loader";

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
  chapters: Chapter[];
}

export const courses: Course[] = [
  {
    id: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    description: "Master the core concepts of web development with HTML, CSS, and JavaScript. Build responsive websites from scratch.",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&auto=format&fit=crop&q=60",
    price: 4.99,
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
    ],
    chapters: [
      {
        title: "Getting Started with Web Development",
        content: `# Getting Started with Web Development

## Introduction
Welcome to web development! In this chapter, you'll learn the fundamentals of how the web works and set up your development environment.

## What is Web Development?
Web development is the process of building and maintaining websites. It involves:
- Frontend development (what users see)
- Backend development (server-side logic)
- Database management
- Web security

## Setting Up Your Environment
1. Install Visual Studio Code
2. Set up Git for version control
3. Install Node.js and npm
4. Configure browser developer tools

## Basic Web Technologies
- HTML: Structure
- CSS: Styling
- JavaScript: Interactivity

## Your First Webpage
\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to web development!</p>
</body>
</html>
\`\`\`

## Practice Exercise
Create a simple webpage that includes:
1. A heading
2. A paragraph
3. An image
4. A list
5. A link`,
        slug: "getting-started",
        order: 1
      },
      {
        title: "HTML Fundamentals",
        content: `# HTML Fundamentals

## Basic HTML Structure
Every HTML document needs a basic structure:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Page Title</title>
</head>
<body>
    <!-- Content goes here -->
</body>
</html>
\`\`\`

## Common HTML Elements

### Text Elements
- \`<h1>\` to \`<h6>\`: Headings
- \`<p>\`: Paragraphs
- \`<span>\`: Inline text
- \`<strong>\`: Bold text
- \`<em>\`: Italic text

### Lists
\`\`\`html
<ul>
    <li>Unordered list item</li>
</ul>

<ol>
    <li>Ordered list item</li>
</ol>
\`\`\`

### Links and Images
\`\`\`html
<a href="https://example.com">Click here</a>
<img src="image.jpg" alt="Description">
\`\`\`

## Semantic HTML
Use semantic elements to give meaning to your content:
- \`<header>\`
- \`<nav>\`
- \`<main>\`
- \`<article>\`
- \`<section>\`
- \`<footer>\`

## Forms
\`\`\`html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
</form>
\`\`\`

## Practice Projects
1. Create a personal profile page
2. Build a simple blog layout
3. Design a contact form`,
        slug: "html-fundamentals",
        order: 2
      },
      {
        title: "CSS Basics",
        content: `# CSS Basics

## Introduction to CSS
CSS (Cascading Style Sheets) is used to style and layout web pages.

## CSS Syntax
\`\`\`css
selector {
    property: value;
}
\`\`\`

## Selectors
1. Element Selector
\`\`\`css
p {
    color: blue;
}
\`\`\`

2. Class Selector
\`\`\`css
.highlight {
    background-color: yellow;
}
\`\`\`

3. ID Selector
\`\`\`css
#header {
    font-size: 24px;
}
\`\`\`

## Box Model
- Content
- Padding
- Border
- Margin

\`\`\`css
.box {
    padding: 20px;
    border: 1px solid black;
    margin: 10px;
}
\`\`\`

## Flexbox Layout
\`\`\`css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
\`\`\`

## Grid Layout
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
\`\`\`

## Responsive Design
\`\`\`css
@media screen and (max-width: 768px) {
    .container {
        flex-direction: column;
    }
}
\`\`\`

## Practice Exercise
Style a webpage with:
1. Custom colors and typography
2. Responsive layout
3. Hover effects
4. Transitions
5. Custom buttons`,
        slug: "css-basics",
        order: 3
      }
    ]
  },
  {
    id: "react-masterclass",
    title: "React Masterclass",
    description: "Learn React from the ground up. Build modern web applications with the most popular JavaScript library.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    price: 7.99,
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
    ],
    chapters: [
      {
        title: "Introduction to React",
        content: `# Introduction to React

## What is React?
React is a JavaScript library for building user interfaces, developed by Facebook.

## Key Concepts
- Virtual DOM
- Component-Based Architecture
- Unidirectional Data Flow
- JSX

## Setting Up React
\`\`\`bash
# Create a new React project
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Your First Component
\`\`\`jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}

export default Welcome;
\`\`\`

## JSX Basics
\`\`\`jsx
const name = 'John';
const element = (
  <div>
    <h1>Hello, {name}</h1>
    <p>Welcome to React</p>
  </div>
);
\`\`\`

## Practice Exercise
Create a simple React app that displays:
1. A header
2. A list of items
3. A button that logs a message
4. Styled components using CSS`,
        slug: "intro-to-react",
        order: 1
      },
      {
        title: "Components and Props",
        content: `# Components and Props

## Understanding Components
Components are the building blocks of React applications.

## Function Components
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
\`\`\`

## Class Components
\`\`\`jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
\`\`\`

## Props
Props are read-only inputs to components:

\`\`\`jsx
function UserProfile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Role: {props.role}</p>
      <p>Experience: {props.experience} years</p>
    </div>
  );
}
\`\`\`

## Component Composition
\`\`\`jsx
function App() {
  return (
    <div>
      <Header />
      <MainContent>
        <Sidebar />
        <Content />
      </MainContent>
      <Footer />
    </div>
  );
}
\`\`\`

## Practice Projects
1. Create a reusable button component
2. Build a card component
3. Implement a navigation menu
4. Design a form with multiple components`,
        slug: "components-and-props",
        order: 2
      },
      {
        title: "State and Lifecycle",
        content: `# State and Lifecycle

## Understanding State
State allows React components to change their output over time.

## useState Hook
\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook
\`\`\`jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>Time: {time} seconds</div>;
}
\`\`\`

## Custom Hooks
\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
\`\`\`

## Practice Projects
1. Build a todo list with state
2. Create a form with validation
3. Implement a data fetching component
4. Design an image carousel`,
        slug: "state-and-lifecycle",
        order: 3
      }
    ]
  }
];