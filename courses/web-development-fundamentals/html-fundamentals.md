---
title: "HTML Fundamentals"
order: 2
---

# Chapter 2: HTML Fundamentals

## Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of web content using elements and tags.

## Basic HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
```

## HTML Elements

### Text Elements

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<p>This is a paragraph.</p>
<strong>Bold text</strong>
<em>Italic text</em>
```

### Lists

```html
<ul>
    <li>Unordered list item</li>
    <li>Another item</li>
</ul>

<ol>
    <li>Ordered list item</li>
    <li>Second item</li>
</ol>
```

### Links and Images

```html
<a href="https://example.com">Click here</a>

<img src="image.jpg" alt="Description of image">
```

## Forms

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
</form>
```

## Semantic HTML

Using semantic elements for better structure and accessibility:

```html
<header>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <section>
            <h2>Article Title</h2>
            <p>Article content...</p>
        </section>
    </article>
</main>

<footer>
    <p>&copy; 2024 My Website</p>
</footer>
```

## Tables

```html
<table>
    <thead>
        <tr>
            <th>Header 1</th>
            <th>Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
</table>
```

## HTML5 Features

- Audio and Video
- Canvas
- Local Storage
- Semantic Elements
- Form Validation

## Best Practices

1. Use semantic HTML
2. Ensure proper indentation
3. Write valid HTML
4. Include alt text for images
5. Make your HTML accessible

## Exercises

1. Create a personal profile page
2. Build a contact form
3. Design a blog post layout
4. Implement a navigation menu

## Additional Resources

- MDN HTML Guide
- W3Schools HTML Reference
- HTML Validator