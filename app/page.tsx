import { HomeHero } from "@/src/frontend/components/HomeHero"
import { FeaturedCourses } from "@/src/frontend/components/FeaturedCourses"
import { WhyChooseUs } from "@/src/frontend/components/WhyChooseUs"
import { CTASection } from "@/src/frontend/components/CTASection"
import { getAllCourses } from "@/src/lib/course-loader"

export default function Home() {
  const allCourses = getAllCourses()
  const featuredCourses = allCourses.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHero />
      <FeaturedCourses courses={featuredCourses} />
      <WhyChooseUs />
      <CTASection />
    </div>
  )
}