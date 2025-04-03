// Modified to ensure course data is properly loaded in both development and production environments
import { Course } from '@/src/lib/course-loader';

// This file contains static course data that serves as a fallback
// and as demo content for the application

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
        icon: "code",
        title: "Hands-on Projects",
        description: "Build real-world React applications"
      },
      {
        icon: "users",
        title: "Community Access",
        description: "Join our React developer community"
      }
    ],
    chapters: [
      {
        title: "Introduction to React",
        content: `# Introduction to React

## What is React?
React is a JavaScript library for building user interfaces, particularly single-page applications. It's used for handling the view layer in web and mobile applications.

## Key Features of React
- **Component-Based Architecture**: Build encapsulated components that manage their own state
- **Declarative UI**: Design simple views for each state in your application
- **Virtual DOM**: Efficiently update and render components
- **JSX**: JavaScript syntax extension that allows HTML-like code in JavaScript
- **Unidirectional Data Flow**: Data flows down from parent to child components

## Setting Up Your React Environment
1. Install Node.js and npm
2. Create a new React app with Create React App:
\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Your First React Component
\`\`\`jsx
import React from 'react';

function HelloWorld() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to React!</p>
    </div>
  );
}

export default HelloWorld;
\`\`\`

## React Component Types
1. **Functional Components**: JavaScript functions that return JSX
2. **Class Components**: ES6 classes that extend React.Component

## JSX Basics
JSX allows you to write HTML-like syntax in JavaScript:

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

JSX expressions can include JavaScript:

\`\`\`jsx
const name = 'John';
const element = <h1>Hello, {name}!</h1>;
\`\`\`

## Practice Exercise
Create a simple React component that:
1. Displays a heading
2. Shows a list of your favorite programming languages
3. Includes a button (we'll add functionality later)`,
        slug: "introduction-to-react",
        order: 1
      },
      {
        title: "Components and Props",
        content: `# Components and Props

## Component Composition
React applications are built by composing components together. Components can be nested inside other components.

\`\`\`jsx
function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
\`\`\`

## Props
Props (short for properties) are how you pass data from parent to child components.

### Passing Props
\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}
\`\`\`

### Props are Read-Only
A component must never modify its own props. React components must act like pure functions with respect to their props.

## Destructuring Props
You can use destructuring to make your code cleaner:

\`\`\`jsx
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>You are {age} years old</p>
    </div>
  );
}

// Usage
<Welcome name="Alice" age={25} />
\`\`\`

## Default Props
You can specify default values for props:

\`\`\`jsx
function Button({ text = "Click me", onClick }) {
  return <button onClick={onClick}>{text}</button>;
}
\`\`\`

## PropTypes
For type checking, you can use PropTypes:

\`\`\`jsx
import PropTypes from 'prop-types';

function User({ name, age }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age} years old</p>
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};
\`\`\`

## Practice Exercise
1. Create a Card component that accepts title, description, and imageUrl props
2. Create a List component that renders multiple Card components
3. Pass different data to each Card component`,
        slug: "components-and-props",
        order: 2
      },
      {
        title: "State and Lifecycle",
        content: `# State and Lifecycle

## What is State?
State is a JavaScript object that stores component data that may change over time. When state changes, the component re-renders.

## Using State in Functional Components
With the useState hook:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Multiple State Variables
You can use useState multiple times in a single component:

\`\`\`jsx
function UserForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // ...
}
\`\`\`

## Complex State with Objects
You can use objects with useState:

\`\`\`jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });
  
  const updateName = (e) => {
    setUser({
      ...user,
      name: e.target.value
    });
  };
  
  // ...
}
\`\`\`

## Component Lifecycle with useEffect
The useEffect hook lets you perform side effects in functional components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    
    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount
  
  return <div>Seconds: {seconds}</div>;
}
\`\`\`

## useEffect Dependencies
The dependency array controls when the effect runs:

- Empty array (`[]`): Run once after initial render
- No dependency array: Run after every render
- With dependencies (`[dep1, dep2]`): Run when dependencies change

## Practice Exercise
1. Create a toggle component that shows/hides content when clicked
2. Build a form with multiple input fields using state
3. Create a component that fetches and displays data from an API using useEffect`,
        slug: "state-and-lifecycle",
        order: 3
      }
    ]
  }
];
