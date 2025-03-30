import { getAvailableCourses } from "../../../../../lib/markdown/loader"

// Add generateStaticParams for static export
export async function generateStaticParams() {
  try {
    const courses = await getAvailableCourses()
    
    // Create an array to hold all possible chapter combinations
    const params = []
    
    // For each course, add entries for each possible chapter
    courses.forEach(course => {
      // Assuming each course has at least 2 chapters
      for (let i = 0; i < 5; i++) {
        params.push({
          slug: course.slug,
          chapterIndex: i.toString()
        })
      }
    })
    
    return params
  } catch (error) {
    console.error('Error generating static params for chapters:', error)
    // Fallback to hardcoded values if there's an error
    return [
      { slug: 'cloud-engineering', chapterIndex: '0' },
      { slug: 'cloud-engineering', chapterIndex: '1' },
      { slug: 'devops', chapterIndex: '0' },
      { slug: 'devops', chapterIndex: '1' }
    ]
  }
}
