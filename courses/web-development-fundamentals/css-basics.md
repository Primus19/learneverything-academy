---
title: "CSS Basics"
order: 3
---

# Chapter 3: CSS Basics

## Introduction to CSS

CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.

## CSS Syntax

The basic syntax of CSS consists of:
- Selectors
- Properties
- Values

```css
selector {
  property: value;
}
```

## Selectors

### Basic Selectors

1. Element Selector
```css
p {
  color: blue;
}
```

2. Class Selector
```css
.highlight {
  background-color: yellow;
}
```

3. ID Selector
```css
#header {
  font-size: 24px;
}
```

## Box Model

The CSS box model is the foundation of layout on the web. It consists of:

- Content
- Padding
- Border
- Margin

```css
.box {
  padding: 20px;
  border: 1px solid black;
  margin: 10px;
}
```

## Colors and Typography

### Colors

CSS provides several ways to specify colors:

- Named colors: `red`, `blue`, `green`
- Hexadecimal: `#FF0000`
- RGB: `rgb(255, 0, 0)`
- RGBA: `rgba(255, 0, 0, 0.5)`

### Typography

```css
body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
```

## Layout

### Display Properties

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### Position

```css
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
}
```

## Responsive Design

### Media Queries

```css
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

## Best Practices

1. Use meaningful class names
2. Keep selectors simple
3. Organize CSS logically
4. Comment your code
5. Consider mobile-first design

## Exercises

1. Create a responsive navigation bar
2. Style a contact form
3. Build a card layout using flexbox
4. Implement a mobile-friendly menu

## Additional Resources

- MDN Web Docs
- CSS-Tricks
- W3Schools CSS Reference