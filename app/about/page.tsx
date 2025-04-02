import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">About LearnEverything Academy</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Empowering learners worldwide</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              At LearnEverything Academy, we believe in making high-quality education accessible to everyone. 
              Our platform offers comprehensive courses designed by industry experts, helping you master the 
              skills needed for today&apos;s digital world.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Choose Us</CardTitle>
            <CardDescription>What sets us apart</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Expert-led courses with practical projects</li>
              <li>Flexible learning schedule</li>
              <li>Industry-relevant curriculum</li>
              <li>Supportive learning community</li>
              <li>Career guidance and resources</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
            <CardDescription>What drives us forward</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="font-semibold">Excellence</h3>
                <p>We strive for excellence in everything we do, from course content to student support.</p>
              </div>
              <div>
                <h3 className="font-semibold">Innovation</h3>
                <p>We continuously innovate our teaching methods and platform features.</p>
              </div>
              <div>
                <h3 className="font-semibold">Community</h3>
                <p>We foster a supportive learning community where students can grow together.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}