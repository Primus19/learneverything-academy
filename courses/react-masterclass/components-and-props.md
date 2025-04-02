---
title: "Components and Props"
order: 2
---

# Chapter 2: Components and Props

## Understanding React Components

Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.

## Types of Components

### Function Components

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Class Components

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## Props

Props are read-only inputs to components. They allow you to pass data from parent to child components.

### Props Example

```jsx
function UserProfile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Role: {props.role}</p>
      <p>Experience: {props.experience} years</p>
    </div>
  );
}
```

## Component Composition

Learn how to combine components to create more complex UIs:

- Nesting components
- Component extraction
- Props.children
- Component specialization

## Best Practices

1. Keep components focused and single-purpose
2. Use meaningful component and prop names
3. Validate props using PropTypes
4. Consider component reusability