export function loadMarkdownContent(slug, chapterIndex) {
  // Sample course data - in a real app, this would come from a database or API
  const courses = {
    "devops": {
      title: "DevOps Engineering",
      description: "Master the tools and practices that enable continuous software delivery and infrastructure automation.",
      chapters: [
        {
          title: "Introduction to DevOps",
          content: `
# Introduction to DevOps

DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.

## Key DevOps Principles

1. **Collaboration**: Breaking down silos between development and operations teams
2. **Automation**: Automating manual tasks to improve consistency and efficiency
3. **Continuous Integration**: Regularly merging code changes into a central repository
4. **Continuous Delivery**: Automatically preparing code changes for release to production
5. **Monitoring**: Collecting and analyzing data to improve performance and availability

## Benefits of DevOps

- Faster time to market
- Improved quality and reliability
- Enhanced collaboration and communication
- Increased efficiency and productivity
- Better customer satisfaction
          `
        },
        {
          title: "Continuous Integration and Continuous Delivery",
          content: `
# Continuous Integration and Continuous Delivery

Continuous Integration (CI) and Continuous Delivery (CD) are essential practices in DevOps that help teams deliver code changes more frequently and reliably.

## Continuous Integration

Continuous Integration is the practice of regularly merging code changes into a central repository, followed by automated builds and tests. The primary goals of CI are to:

- Find and address bugs quicker
- Improve software quality
- Reduce the time it takes to validate and release new software updates

## Continuous Delivery

Continuous Delivery is the practice of automatically preparing code changes for release to production. With CD, every code change is built, tested, and then pushed to a non-production testing or staging environment.

## CI/CD Pipeline

A CI/CD pipeline is a series of automated steps that code changes go through from development to production. A typical pipeline includes:

1. **Source**: Code is committed to a version control system
2. **Build**: Code is compiled and built
3. **Test**: Automated tests are run
4. **Deploy**: Code is deployed to staging or production environments
          `
        }
      ]
    },
    "cloud-engineering": {
      title: "Cloud Engineering",
      description: "Learn to design, build, and manage cloud infrastructure on major platforms like AWS, Azure, and GCP.",
      chapters: [
        {
          title: "Introduction to Cloud Computing",
          content: `
# Introduction to Cloud Computing

Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.

## Cloud Service Models

1. **Infrastructure as a Service (IaaS)**: Provides virtualized computing resources over the Internet
2. **Platform as a Service (PaaS)**: Provides a platform allowing customers to develop, run, and manage applications
3. **Software as a Service (SaaS)**: Delivers software applications over the Internet, on-demand and typically on a subscription basis

## Cloud Deployment Models

1. **Public Cloud**: Cloud resources owned and operated by a third-party cloud service provider
2. **Private Cloud**: Cloud resources used exclusively by a single business or organization
3. **Hybrid Cloud**: Combination of public and private clouds, bound together by technology that allows data and applications to be shared between them
4. **Multi-Cloud**: Use of multiple cloud computing services in a single heterogeneous architecture

## Benefits of Cloud Computing

- **Cost Efficiency**: Pay only for the resources you use
- **Scalability**: Scale resources up or down based on demand
- **Reliability**: Data backup, disaster recovery, and business continuity are easier and less expensive
- **Performance**: Access to a global network of secure data centers that are regularly upgraded to the latest generation of fast and efficient computing hardware
- **Security**: Broad set of policies, technologies, and controls that strengthen your security posture
          `
        }
      ]
    }
  };
  
  // Get the course data based on the slug
  const course = courses[slug] || courses["devops"]; // Default to DevOps if course not found
  
  // Get the chapter data based on the index
  const chapter = course.chapters[chapterIndex] || course.chapters[0]; // Default to first chapter if not found
  
  return {
    course,
    chapter
  };
}
