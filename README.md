# LearnEverything Academy

A comprehensive learning platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Course catalog with detailed course information
- Resume templates and samples
- Dark mode support
- Responsive design
- Modern UI with shadcn/ui components

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Tech Stack

- Next.js 13 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
  
## Deployment

### Local Development

- Run the development server:

  ```bash
  npm run dev
  ```

### Netlify

This project is configured for deployment on Netlify using the `@netlify/plugin-nextjs`.
The Netlify build is defined in `netlify.toml`.

To deploy:
1. Install the Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Serve locally with Netlify Dev:

   ```bash
   netlify dev
   ```

3. Push your branch to your Netlify site; Netlify will run `npm run build` and deploy automatically.