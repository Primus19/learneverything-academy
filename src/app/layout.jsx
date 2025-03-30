import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LearnEverything Academy',
  description: 'Master the most in-demand skills with our comprehensive, hands-on courses designed for modern technology professionals.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <header className="border-b">
          <div className="container mx-auto py-4 px-4 md:px-6">
            <nav className="flex justify-between items-center">
              <a href="/" className="text-xl font-bold">LearnEverything Academy</a>
              <div className="flex gap-6">
                <a href="/courses" className="hover:text-primary">Courses</a>
                <a href="/resume-templates" className="hover:text-primary">Resume Templates</a>
                <a href="/dashboard" className="hover:text-primary">Dashboard</a>
              </div>
              <div className="flex gap-4">
                <a href="/login" className="hover:text-primary">Login</a>
                <a href="/register" className="hover:text-primary font-medium text-primary">Register</a>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t mt-24">
          <div className="container mx-auto py-8 px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">LearnEverything Academy</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering professionals with the skills they need to succeed in today's technology landscape.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-4">Courses</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/courses/devops" className="hover:text-primary">DevOps</a></li>
                  <li><a href="/courses/cloud-engineering" className="hover:text-primary">Cloud Engineering</a></li>
                  <li><a href="/courses/soc" className="hover:text-primary">Security Operations</a></li>
                  <li><a href="/courses/data-analytics" className="hover:text-primary">Data Analytics</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-primary">Blog</a></li>
                  <li><a href="#" className="hover:text-primary">Documentation</a></li>
                  <li><a href="#" className="hover:text-primary">Community</a></li>
                  <li><a href="#" className="hover:text-primary">Support</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-primary">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>© 2025 LearnEverything Academy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
