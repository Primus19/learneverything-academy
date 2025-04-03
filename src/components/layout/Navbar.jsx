import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">LearnEverything Academy</Link>
          <div className="flex gap-6">
            <Link href="/courses" className="hover:text-primary">Courses</Link>
            <Link href="/resume-templates" className="hover:text-primary">Resume Templates</Link>
            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-primary">Login</Link>
            <Link href="/register" className="hover:text-primary font-medium text-primary">Register</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
