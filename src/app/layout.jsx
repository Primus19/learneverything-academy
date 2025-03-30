import { Geist, Geist_Mono } from "next/font/google"
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata = {
  title: 'Tech Academy - Professional DevOps & Cloud Engineering Courses',
  description: 'Comprehensive, practical training for DevOps and Cloud Engineering professionals with hands-on examples and downloadable code.'
}

export default function RootLayout({
  children
}<{
  children.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>{children}</body>
    </html>
  )
}
