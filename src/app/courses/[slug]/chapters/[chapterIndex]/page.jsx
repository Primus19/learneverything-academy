import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../components/ui/components";
import Navbar from "../../../../../components/layout/Navbar";

export const metadata = {
  title: 'LearnEverything Academy | Course Chapter',
  description: 'Learn about the latest technologies with our comprehensive courses.',
};

export default function CourseChapterPage({ params }) {
  const { slug, chapterIndex } = params;
  const chapterIdx = parseInt(chapterIndex);
  
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
        },
        {
          title: "Infrastructure as Code",
          content: `
# Infrastructure as Code

Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through code instead of manual processes.

## Benefits of Infrastructure as Code

- **Consistency**: Infrastructure is deployed consistently every time
- **Repeatability**: The same infrastructure can be deployed multiple times
- **Scalability**: Infrastructure can be scaled up or down easily
- **Auditability**: Changes to infrastructure are tracked in version control
- **Collaboration**: Teams can collaborate on infrastructure changes

## Popular IaC Tools

- **Terraform**: A tool for building, changing, and versioning infrastructure safely and efficiently
- **AWS CloudFormation**: A service that helps you model and set up your AWS resources
- **Azure Resource Manager**: A deployment and management service for Azure
- **Google Cloud Deployment Manager**: A deployment service for Google Cloud Platform
- **Ansible**: A simple automation tool that automates cloud provisioning, configuration management, and application deployment
          `
        },
        {
          title: "Containerization with Docker",
          content: `
# Containerization with Docker

Containerization is a lightweight alternative to full machine virtualization that involves encapsulating an application in a container with its own operating environment.

## What is Docker?

Docker is a platform that enables developers to build, package, and run applications in containers. Docker containers are lightweight, portable, and self-sufficient, making them ideal for DevOps environments.

## Key Docker Concepts

- **Dockerfile**: A text document that contains all the commands a user could call on the command line to assemble an image
- **Image**: A read-only template with instructions for creating a Docker container
- **Container**: A runnable instance of an image
- **Registry**: A repository for Docker images
- **Docker Compose**: A tool for defining and running multi-container Docker applications

## Benefits of Containerization

- **Consistency**: Applications run the same way in any environment
- **Isolation**: Applications are isolated from each other
- **Portability**: Applications can run on any platform that supports Docker
- **Efficiency**: Containers share the host OS kernel, making them more efficient than virtual machines
- **Scalability**: Containers can be easily scaled up or down
          `
        },
        {
          title: "Orchestration with Kubernetes",
          content: `
# Orchestration with Kubernetes

Container orchestration is the automated arrangement, coordination, and management of containers. Kubernetes is the most popular container orchestration platform.

## What is Kubernetes?

Kubernetes is an open-source platform designed to automate deploying, scaling, and operating application containers. It groups containers that make up an application into logical units for easy management and discovery.

## Key Kubernetes Concepts

- **Pod**: The smallest deployable unit in Kubernetes, consisting of one or more containers
- **Service**: An abstraction that defines a logical set of Pods and a policy by which to access them
- **Deployment**: A resource that provides declarative updates for Pods and ReplicaSets
- **Namespace**: A way to divide cluster resources between multiple users
- **ConfigMap and Secret**: Resources for storing configuration data and sensitive information

## Benefits of Kubernetes

- **Automated rollouts and rollbacks**: Kubernetes progressively rolls out changes to your application or its configuration, while monitoring application health to ensure it doesn't kill all your instances at the same time
- **Service discovery and load balancing**: Kubernetes can expose a container using the DNS name or using their own IP address
- **Storage orchestration**: Kubernetes allows you to automatically mount a storage system of your choice
- **Self-healing**: Kubernetes restarts containers that fail, replaces containers, kills containers that don't respond to your user-defined health check, and doesn't advertise them to clients until they are ready to serve
          `
        },
        {
          title: "Monitoring and Logging",
          content: `
# Monitoring and Logging

Monitoring and logging are essential practices in DevOps that help teams understand the behavior and performance of their applications and infrastructure.

## Monitoring

Monitoring involves collecting, processing, aggregating, and displaying real-time quantitative data about a system to help operators maintain situational awareness.

### Key Monitoring Concepts

- **Metrics**: Numerical values that represent the state of a system at a point in time
- **Alerts**: Notifications that are triggered when certain conditions are met
- **Dashboards**: Visual representations of metrics that help operators understand the state of a system

### Popular Monitoring Tools

- **Prometheus**: An open-source monitoring and alerting toolkit
- **Grafana**: A platform for monitoring and observability
- **Datadog**: A monitoring service for cloud-scale applications
- **New Relic**: A platform for monitoring application performance

## Logging

Logging involves recording events that occur in a system to help operators understand what happened and why.

### Key Logging Concepts

- **Log levels**: Different levels of severity for log messages (e.g., debug, info, warning, error)
- **Structured logging**: Logging in a format that is easy to parse and analyze
- **Centralized logging**: Collecting logs from multiple sources in a central location

### Popular Logging Tools

- **ELK Stack (Elasticsearch, Logstash, Kibana)**: A popular stack for collecting, processing, and visualizing logs
- **Fluentd**: An open-source data collector for unified logging
- **Graylog**: A log management platform
- **Splunk**: A platform for searching, monitoring, and analyzing machine-generated data
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
        },
        {
          title: "Amazon Web Services (AWS)",
          content: `
# Amazon Web Services (AWS)

Amazon Web Services (AWS) is a comprehensive and widely adopted cloud platform, offering over 200 fully featured services from data centers globally.

## Core AWS Services

### Compute Services

- **EC2 (Elastic Compute Cloud)**: Virtual servers in the cloud
- **Lambda**: Run code without provisioning or managing servers
- **ECS (Elastic Container Service)**: Run and manage Docker containers
- **EKS (Elastic Kubernetes Service)**: Run Kubernetes without installing or maintaining a Kubernetes control plane

### Storage Services

- **S3 (Simple Storage Service)**: Object storage built to store and retrieve any amount of data
- **EBS (Elastic Block Store)**: Persistent block storage for EC2 instances
- **EFS (Elastic File System)**: Scalable file storage for EC2 instances
- **Glacier**: Low-cost archive storage

### Database Services

- **RDS (Relational Database Service)**: Managed relational database service
- **DynamoDB**: Managed NoSQL database service
- **ElastiCache**: In-memory data store and cache
- **Redshift**: Data warehouse service

### Networking Services

- **VPC (Virtual Private Cloud)**: Isolated cloud resources
- **Route 53**: Domain Name System (DNS) web service
- **CloudFront**: Content delivery network (CDN)
- **API Gateway**: Create, publish, maintain, monitor, and secure APIs

## AWS Management Tools

- **CloudFormation**: Infrastructure as Code service
- **CloudWatch**: Monitoring and observability service
- **CloudTrail**: Governance, compliance, operational auditing, and risk auditing service
- **Config**: Resource inventory, configuration history, and configuration change notifications
          `
        },
        {
          title: "Microsoft Azure",
          content: `
# Microsoft Azure

Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.

## Core Azure Services

### Compute Services

- **Virtual Machines**: Windows or Linux virtual machines
- **Azure Functions**: Event-driven, serverless compute
- **Azure Kubernetes Service (AKS)**: Managed Kubernetes service
- **Azure Container Instances**: Run containers without managing servers

### Storage Services

- **Azure Blob Storage**: Object storage for unstructured data
- **Azure Files**: Fully managed file shares
- **Azure Disk Storage**: Block-level storage volumes for Azure VMs
- **Azure Archive Storage**: Low-cost storage for rarely accessed data

### Database Services

- **Azure SQL Database**: Managed relational database service
- **Azure Cosmos DB**: Globally distributed, multi-model database service
- **Azure Database for MySQL/PostgreSQL**: Managed MySQL and PostgreSQL database services
- **Azure Cache for Redis**: In-memory data store

### Networking Services

- **Virtual Network**: Isolated network in the cloud
- **Load Balancer**: Distribute network traffic across multiple servers
- **Application Gateway**: Web traffic load balancer
- **Azure DNS**: Domain name system hosting

## Azure Management Tools

- **Azure Resource Manager**: Deployment and management service
- **Azure Monitor**: Comprehensive solution for collecting, analyzing, and acting on telemetry from your cloud and on-premises environments
- **Azure Policy**: Enforce organizational standards and assess compliance at-scale
- **Azure Security Center**: Unified security management and advanced threat protection
          `
        },
        {
          title: "Google Cloud Platform (GCP)",
          content: `
# Google Cloud Platform (GCP)

Google Cloud Platform (GCP) is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, Google Drive, and YouTube.

## Core GCP Services

### Compute Services

- **Compute Engine**: Virtual machines running in Google's data centers
- **Cloud Functions**: Serverless execution environment for building and connecting cloud services
- **Google Kubernetes Engine (GKE)**: Managed Kubernetes service
- **Cloud Run**: Fully managed compute platform for containerized applications

### Storage Services

- **Cloud Storage**: Object storage for companies of all sizes
- **Persistent Disk**: Block storage for VM instances
- **Filestore**: Fully managed file storage service
- **Cloud Storage for Firebase**: Object storage for app developers

### Database Services

- **Cloud SQL**: Fully managed relational database service
- **Cloud Bigtable**: NoSQL wide-column database service
- **Cloud Spanner**: Horizontally scalable, globally consistent, relational database service
- **Cloud Firestore**: NoSQL document database

### Networking Services

- **Virtual Private Cloud (VPC)**: Isolated network in the cloud
- **Cloud Load Balancing**: High-performance, scalable load balancing
- **Cloud CDN**: Content delivery network
- **Cloud DNS**: Domain name system hosting

## GCP Management Tools

- **Cloud Deployment Manager**: Infrastructure as Code service
- **Cloud Monitoring**: Monitoring and observability service
- **Cloud Logging**: Logging service
- **Cloud Security Scanner**: Automated vulnerability scanning service
          `
        },
        {
          title: "Cloud Security",
          content: `
# Cloud Security

Cloud security refers to the policies, technologies, and controls deployed to protect data, applications, and infrastructure in cloud computing environments.

## Shared Responsibility Model

The shared responsibility model delineates the security responsibilities of the cloud provider and the customer:

- **Cloud Provider Responsibilities**: Security OF the cloud (infrastructure, hardware, software, facilities)
- **Customer Responsibilities**: Security IN the cloud (data, applications, identity and access management, network traffic protection)

## Key Cloud Security Concepts

### Identity and Access Management (IAM)

IAM enables you to manage access to cloud services and resources securely. Key components include:

- **Authentication**: Verifying the identity of users or services
- **Authorization**: Determining what actions authenticated users or services can perform
- **Auditing**: Tracking who did what, when, and where

### Data Protection

Data protection involves safeguarding data at rest, in transit, and in use:

- **Encryption**: Converting data into a code to prevent unauthorized access
- **Key Management**: Securely storing, managing, and rotating encryption keys
- **Data Loss Prevention (DLP)**: Detecting and preventing data breaches

### Network Security

Network security involves protecting the network infrastructure and traffic:

- **Virtual Private Cloud (VPC)**: Isolated network environment
- **Security Groups and Network ACLs**: Virtual firewalls that control traffic
- **Web Application Firewall (WAF)**: Protects web applications from common web exploits

### Compliance and Governance

Compliance and governance involve ensuring that cloud environments meet regulatory requirements:

- **Compliance Frameworks**: Standards and regulations that organizations must adhere to (e.g., GDPR, HIPAA, PCI DSS)
- **Audit and Reporting**: Mechanisms to demonstrate compliance
- **Policy Enforcement**: Ensuring that cloud resources adhere to organizational policies

## Cloud Security Best Practices

1. **Implement the principle of least privilege**: Grant only the permissions necessary to perform a task
2. **Enable multi-factor authentication (MFA)**: Require multiple forms of verification
3. **Encrypt sensitive data**: Protect data at rest and in transit
4. **Regularly audit and monitor**: Track and review access and changes to cloud resources
5. **Implement security controls**: Deploy firewalls, intrusion detection/prevention systems, and other security measures
6. **Keep systems updated**: Apply security patches and updates promptly
7. **Train employees**: Educate staff about security risks and best practices
8. **Develop an incident response plan**: Prepare for security incidents
          `
        },
        {
          title: "Cloud Cost Optimization",
          content: `
# Cloud Cost Optimization

Cloud cost optimization involves managing and reducing cloud spending while maximizing business value from cloud services.

## Understanding Cloud Costs

Cloud costs are influenced by various factors:

- **Resource Usage**: The amount of resources (compute, storage, network) consumed
- **Pricing Models**: On-demand, reserved instances, spot instances, etc.
- **Data Transfer**: Moving data between services or regions
- **Service-Specific Charges**: Costs associated with specific cloud services

## Cost Optimization Strategies

### Right-Sizing Resources

Right-sizing involves matching instance types and sizes to workload performance and capacity requirements:

- **Analyze resource utilization**: Identify underutilized or overutilized resources
- **Adjust resource allocation**: Scale resources up or down based on actual needs
- **Use auto-scaling**: Automatically adjust resources based on demand

### Reserved Instances and Savings Plans

Reserved Instances and Savings Plans offer significant discounts in exchange for a commitment to use a specific amount of resources:

- **Reserved Instances**: Commit to a specific instance type in a specific region for a term (1 or 3 years)
- **Savings Plans**: Commit to a specific amount of compute usage for a term (1 or 3 years)

### Spot Instances and Preemptible VMs

Spot Instances (AWS) and Preemptible VMs (GCP) offer significant discounts for interruptible compute capacity:

- **Use for fault-tolerant workloads**: Batch processing, data analysis, etc.
- **Implement graceful handling of interruptions**: Save state and resume when capacity becomes available

### Storage Optimization

Storage optimization involves managing storage costs effectively:

- **Use storage tiers**: Move infrequently accessed data to lower-cost storage tiers
- **Implement lifecycle policies**: Automatically transition or delete objects based on age
- **Delete unnecessary data**: Regularly review and delete unneeded data

### Monitoring and Governance

Monitoring and governance help maintain control over cloud costs:

- **Set up cost alerts**: Receive notifications when costs exceed thresholds
- **Implement tagging**: Tag resources for cost allocation and tracking
- **Use cost management tools**: Leverage cloud provider cost management services
- **Establish budgets**: Set spending limits for teams or projects

## Cloud Cost Optimization Tools

### AWS Cost Optimization Tools

- **AWS Cost Explorer**: Visualize and analyze costs and usage
- **AWS Budgets**: Set custom budgets and receive alerts
- **AWS Trusted Advisor**: Identify ways to optimize costs
- **AWS Cost and Usage Report**: Detailed cost and usage data

### Azure Cost Optimization Tools

- **Azure Cost Management**: Monitor, allocate, and optimize cloud costs
- **Azure Advisor**: Get recommendations to optimize Azure resources
- **Azure Pricing Calculator**: Estimate costs for Azure services
- **Azure Reservations**: Purchase reserved capacity for Azure resources

### GCP Cost Optimization Tools

- **Google Cloud Billing**: View and analyze cloud costs
- **Google Cloud Recommender**: Get recommendations to optimize costs
- **Google Cloud Pricing Calculator**: Estimate costs for GCP services
- **Google Cloud Committed Use Discounts**: Commit to using a minimum level of resources
          `
        }
      ]
    }
  };
  
  // Get the course data based on the slug
  const course = courses[slug] || courses["devops"]; // Default to DevOps if course not found
  
  // Get the chapter data based on the index
  const chapter = course.chapters[chapterIdx] || course.chapters[0]; // Default to first chapter if not found
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{course.title}</h1>
          <p className="text-xl text-muted-foreground">Chapter {chapterIdx + 1}: {chapter.title}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {course.chapters.map((ch, index) => (
                    <Link 
                      key={index}
                      href={`/courses/${slug}/chapters/${index}`}
                      className={`block p-2 rounded-md ${index === chapterIdx ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    >
                      {index + 1}. {ch.title}
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: chapter.content.split('\n').map(line => {
                    if (line.startsWith('# ')) {
                      return `<h1>${line.substring(2)}</h1>`;
                    } else if (line.startsWith('## ')) {
                      return `<h2>${line.substring(3)}</h2>`;
                    } else if (line.startsWith('### ')) {
                      return `<h3>${line.substring(4)}</h3>`;
                    } else if (line.startsWith('- ')) {
                      return `<ul><li>${line.substring(2)}</li></ul>`;
                    } else if (line.startsWith('1. ')) {
                      return `<ol><li>${line.substring(3)}</li></ol>`;
                    } else if (line.trim() === '') {
                      return '<br/>';
                    } else {
                      return `<p>${line}</p>`;
                    }
                  }).join('') }} />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-6">
              {chapterIdx > 0 ? (
                <Button asChild variant="outline">
                  <Link href={`/courses/${slug}/chapters/${chapterIdx - 1}`}>
                    <span className="mr-2">←</span> Previous Chapter
                  </Link>
                </Button>
              ) : (
                <Button disabled variant="outline">
                  <span className="mr-2">←</span> Previous Chapter
                </Button>
              )}
              
              {chapterIdx < course.chapters.length - 1 ? (
                <Button asChild>
                  <Link href={`/courses/${slug}/chapters/${chapterIdx + 1}`}>
                    Next Chapter <span className="ml-2">→</span>
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href={`/courses/${slug}`}>
                    Complete Course <span className="ml-2">→</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
