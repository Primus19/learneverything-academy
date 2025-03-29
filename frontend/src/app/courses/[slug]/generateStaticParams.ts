import { getAvailableCourses } from '@/lib/markdown/loader'

// Add generateStaticParams for static export
export async function generateStaticParams() {
  try {
    const courses = await getAvailableCourses()
    return courses.map(course => ({
      slug: course.slug
    }))
  } catch (error) {
    console.error('Error generating static params for courses:', error)
    // Fallback to hardcoded values if there's an error
    return [
      { slug: 'cloud-engineering' },
      { slug: 'devops' }
    ]
  }
}
