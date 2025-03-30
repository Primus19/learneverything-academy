import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">LearnEverything Academy</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="/courses" className="text-sm font-medium hover:underline">
            Courses
          </Link>
          <Link href="/resume-templates" className="text-sm font-medium hover:underline">
            Resume Templates
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:underline">
            Login
          </Link>
          <Link 
            href="/register" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
