import { Inter } from "next/font/google"
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

export const metadata = {
  title: 'Tech Academy - Professional DevOps & Cloud Engineering Courses',
  description: 'Comprehensive, practical training for DevOps and Cloud Engineering professionals with hands-on examples and downloadable code.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen`}>{children}</body>
    </html>
  )
}
