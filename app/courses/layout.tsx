import { ReactNode } from 'react'
import Starfield from '@/components/Starfield'

export const dynamic = 'force-static'

export default function CoursesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark bg-background relative min-h-screen">
      <Starfield />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}