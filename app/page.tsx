import { HomeHero } from "@/src/frontend/components/HomeHero"
import { FeaturedCourses } from "@/src/frontend/components/FeaturedCourses"
import { WhyChooseUs } from "@/src/frontend/components/WhyChooseUs"
import { CTASection } from "@/src/frontend/components/CTASection"
import { courses } from "@/src/courses/data"

export default function Home() {
  const featuredCourses = courses.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />
      <FeaturedCourses courses={featuredCourses} />
      <WhyChooseUs />
      <CTASection />
    </div>
  )
}