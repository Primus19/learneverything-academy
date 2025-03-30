# Chapter 8: Real-World DevOps Projects and Case Studies

## Introduction to Real-World DevOps Projects

In this chapter, we'll explore real-world DevOps projects and case studies that demonstrate how DevOps principles and practices are applied in actual organizations. These examples will help you understand how to implement DevOps in different contexts and learn from the experiences of others.

### The Value of Real-World Examples

Real-world examples provide several benefits:

1. **Practical Insights**: They offer practical insights into how DevOps principles are applied in actual environments.
2. **Lessons Learned**: They highlight challenges faced and lessons learned during DevOps implementations.
3. **Best Practices**: They showcase best practices that have been proven effective in real organizations.
4. **Inspiration**: They provide inspiration for your own DevOps initiatives.
5. **Validation**: They validate the theoretical concepts discussed in previous chapters.

### Types of DevOps Projects

DevOps projects can vary widely depending on the organization's size, industry, and specific needs. Here are some common types of DevOps projects:

1. **CI/CD Pipeline Implementation**: Setting up automated build, test, and deployment pipelines.
2. **Infrastructure Automation**: Automating infrastructure provisioning and management using IaC.
3. **Containerization and Orchestration**: Migrating applications to containers and implementing container orchestration.
4. **Monitoring and Observability**: Implementing comprehensive monitoring and observability solutions.
5. **Cloud Migration**: Migrating applications and infrastructure to the cloud.
6. **DevSecOps Implementation**: Integrating security into the DevOps process.
7. **Microservices Adoption**: Breaking down monolithic applications into microservices.
8. **Cultural Transformation**: Fostering a DevOps culture within the organization.

In this chapter, we'll explore case studies that cover these different types of DevOps projects.

## Case Study 1: E-Commerce Platform CI/CD Pipeline

### Background

A mid-sized e-commerce company was facing challenges with their software delivery process. Their manual deployment process was error-prone and time-consuming, leading to frequent production issues and delays in releasing new features. They decided to implement a CI/CD pipeline to automate their build, test, and deployment processes.

### Challenges

The company faced several challenges:

1. **Complex Application**: Their e-commerce platform consisted of multiple components, including a frontend, backend API, payment processing service, and inventory management system.
2. **Diverse Technology Stack**: The platform used a mix of technologies, including React for the frontend, Node.js for the API, and Java for the backend services.
3. **Database Migrations**: They needed to handle database migrations safely during deployments.
4. **Zero-Downtime Deployments**: They needed to ensure zero-downtime deployments to avoid disrupting customer transactions.
5. **Testing**: They needed to implement comprehensive testing, including unit tests, integration tests, and end-to-end tests.

### Solution

The company implemented a CI/CD pipeline using the following tools and practices:

1. **Version Control**: They used Git for version control, with a GitFlow branching strategy.
2. **CI Server**: They set up Jenkins as their CI server to automate builds and tests.
3. **Containerization**: They containerized their applications using Docker to ensure consistency across environments.
4. **Container Orchestration**: They used Kubernetes for container orchestration and to facilitate zero-downtime deployments.
5. **Infrastructure as Code**: They used Terraform to manage their infrastructure.
6. **Automated Testing**: They implemented automated testing at multiple levels:
   - Unit tests using Jest for JavaScript and JUnit for Java
   - Integration tests using Postman and Newman
   - End-to-end tests using Cypress
7. **Database Migrations**: They used Flyway for database migrations, with a strategy to ensure backward compatibility.
8. **Monitoring**: They implemented monitoring using Prometheus and Grafana.

### Implementation

Here's how they implemented their CI/CD pipeline:

1. **Development Workflow**:
   - Developers worked on feature branches created from the develop branch.
   - They submitted pull requests to merge their changes into the develop branch.
   - Pull requests required code reviews and passing automated tests.

2. **CI Pipeline**:
   - When a pull request was created or updated, Jenkins automatically built the code and ran unit tests.
   - If the build and tests passed, the code was deployed to a development environment for further testing.
   - Integration and end-to-end tests were run in the development environment.

3. **CD Pipeline**:
   - When changes were merged into the develop branch, they were automatically deployed to a staging environment.
   - Manual approval was required to deploy to production.
   - Production deployments were performed using a blue-green deployment strategy to ensure zero downtime.

4. **Infrastructure Management**:
   - Infrastructure was managed using Terraform, with separate configurations for development, staging, and production environments.
   - Infrastructure changes were also subject to code reviews and automated testing.

5. **Monitoring and Feedback**:
   - Prometheus and Grafana were used to monitor the application and infrastructure.
   - Alerts were set up to notify the team of any issues.
   - Feedback from monitoring was used to improve the application and the CI/CD pipeline.

### Results

The implementation of the CI/CD pipeline yielded significant benefits:

1. **Faster Deployments**: Deployment time was reduced from several hours to less than 30 minutes.
2. **Higher Quality**: The number of production issues decreased by 70% due to comprehensive automated testing.
3. **Increased Deployment Frequency**: The team was able to deploy to production multiple times per week, compared to once every two weeks previously.
4. **Improved Developer Productivity**: Developers spent less time on manual tasks and more time on feature development.
5. **Better Collaboration**: The CI/CD pipeline facilitated better collaboration between development and operations teams.

### Lessons Learned

The company learned several valuable lessons during this project:

1. **Start Small**: They initially tried to implement too many changes at once, which was overwhelming. They found it more effective to start with a basic pipeline and gradually add more features.
2. **Invest in Testing**: Comprehensive automated testing was crucial for the success of the CI/CD pipeline.
3. **Cultural Change**: Implementing CI/CD required not just technical changes but also cultural changes in how teams worked together.
4. **Continuous Improvement**: The CI/CD pipeline was not a one-time project but required continuous improvement based on feedback and changing requirements.
5. **Documentation**: Good documentation was essential for onboarding new team members and troubleshooting issues.

## Case Study 2: Financial Services Infrastructure Automation

### Background

A large financial services company was struggling with their infrastructure management. They had a mix of on-premises and cloud infrastructure, with manual processes for provisioning and configuring servers. This led to inconsistencies, compliance issues, and long lead times for new infrastructure requests. They decided to implement infrastructure automation to address these challenges.

### Challenges

The company faced several challenges:

1. **Hybrid Infrastructure**: They had a mix of on-premises and cloud infrastructure (AWS and Azure).
2. **Compliance Requirements**: As a financial services company, they had strict compliance requirements for security and auditing.
3. **Legacy Systems**: They had several legacy systems that were difficult to automate.
4. **Skill Gaps**: Their operations team had limited experience with infrastructure automation tools.
5. **Resistance to Change**: There was resistance to changing established processes and workflows.

### Solution

The company implemented infrastructure automation using the following tools and practices:

1. **Infrastructure as Code**: They used Terraform for infrastructure provisioning across their hybrid environment.
2. **Configuration Management**: They used Ansible for configuration management and application deployment.
3. **Version Control**: They stored their infrastructure code in Git, with a branching strategy similar to their application code.
4. **CI/CD for Infrastructure**: They implemented CI/CD pipelines for their infrastructure code using Jenkins.
5. **Compliance as Code**: They implemented compliance checks as part of their CI/CD pipeline using tools like Terraform Compliance and Ansible Lint.
6. **Secret Management**: They used HashiCorp Vault for managing secrets.
7. **Monitoring**: They implemented comprehensive monitoring using Prometheus, Grafana, and the ELK Stack.

### Implementation

Here's how they implemented infrastructure automation:

1. **Infrastructure as Code Implementation**:
   - They started by documenting their existing infrastructure.
   - They created Terraform modules for common infrastructure patterns.
   - They gradually migrated their infrastructure to Terraform, starting with non-production environments.
   - They implemented a state management strategy using remote state storage in S3 with state locking.

2. **Configuration Management Implementation**:
   - They created Ansible roles for common configuration patterns.
   - They implemented idempotent playbooks to ensure consistent configurations.
   - They integrated Ansible with their existing configuration management database (CMDB).

3. **CI/CD for Infrastructure**:
   - They set up Jenkins pipelines for their Terraform and Ansible code.
   - The pipelines included syntax validation, linting, and automated testing.
   - They implemented a review and approval process for infrastructure changes.

4. **Compliance and Security**:
   - They implemented pre-commit hooks to catch common issues before code was committed.
   - They integrated compliance checks into their CI/CD pipeline.
   - They implemented automated security scanning of their infrastructure code.
   - They set up audit logging for all infrastructure changes.

5. **Training and Knowledge Transfer**:
   - They provided training on Terraform and Ansible for their operations team.
   - They created comprehensive documentation for their infrastructure automation.
   - They established a center of excellence for infrastructure automation to support teams across the organization.

### Results

The implementation of infrastructure automation yielded significant benefits:

1. **Faster Provisioning**: Infrastructure provisioning time was reduced from weeks to hours.
2. **Improved Consistency**: Infrastructure inconsistencies were significantly reduced.
3. **Better Compliance**: Compliance issues were caught earlier in the process, reducing audit findings.
4. **Increased Agility**: Teams could provision infrastructure more quickly, enabling faster application development.
5. **Cost Savings**: Automation led to more efficient resource utilization and reduced operational costs.

### Lessons Learned

The company learned several valuable lessons during this project:

1. **Start with Non-Critical Infrastructure**: They found it effective to start with non-critical infrastructure to build confidence and experience.
2. **Document Everything**: Comprehensive documentation was essential for knowledge transfer and troubleshooting.
3. **Invest in Training**: Training was crucial for overcoming skill gaps and reducing resistance to change.
4. **Implement Gradually**: A gradual implementation approach was more effective than a big-bang approach.
5. **Engage Stakeholders Early**: Early engagement with stakeholders, including security and compliance teams, was essential for success.

## Case Study 3: Healthcare Microservices Migration

### Background

A healthcare software provider was facing challenges with their monolithic electronic health record (EHR) system. The system was difficult to scale, maintain, and update, leading to performance issues and slow feature development. They decided to migrate to a microservices architecture to address these challenges.

### Challenges

The company faced several challenges:

1. **Complex Domain**: Healthcare systems involve complex domain logic and data relationships.
2. **Data Privacy**: Healthcare data is subject to strict privacy regulations like HIPAA.
3. **High Availability**: The system needed to be highly available, as it was critical for patient care.
4. **Legacy Codebase**: The existing monolithic system had a large legacy codebase with limited test coverage.
5. **Integration**: The system needed to integrate with various external systems and devices.

### Solution

The company implemented a microservices migration using the following tools and practices:

1. **Microservices Architecture**: They designed a microservices architecture based on domain-driven design (DDD) principles.
2. **Containerization**: They used Docker for containerizing their microservices.
3. **Container Orchestration**: They used Kubernetes for container orchestration.
4. **Service Mesh**: They implemented Istio as a service mesh to handle service-to-service communication.
5. **API Gateway**: They used Kong as an API gateway to manage external access to their services.
6. **Event-Driven Architecture**: They implemented an event-driven architecture using Kafka for asynchronous communication between services.
7. **Database Per Service**: Each microservice had its own database, with a mix of SQL and NoSQL databases depending on the service's needs.
8. **CI/CD**: They implemented CI/CD pipelines for each microservice using GitLab CI.
9. **Monitoring**: They implemented comprehensive monitoring using Prometheus, Grafana, and the ELK Stack.
10. **Security**: They implemented security at multiple levels, including network security, authentication, authorization, and data encryption.

### Implementation

Here's how they implemented the microservices migration:

1. **Domain Analysis and Service Design**:
   - They conducted domain analysis to identify bounded contexts and service boundaries.
   - They designed their microservices based on these bounded contexts.
   - They defined clear interfaces and contracts between services.

2. **Strangler Pattern Implementation**:
   - They used the strangler pattern to gradually migrate functionality from the monolith to microservices.
   - They started with non-critical, relatively independent functionality.
   - They implemented an API gateway to route requests to either the monolith or the new microservices.

3. **Data Migration Strategy**:
   - They implemented a data migration strategy that involved dual writes during the transition period.
   - They used change data capture (CDC) to synchronize data between the monolith's database and the microservices' databases.
   - They gradually shifted read and write operations to the new microservices.

4. **DevOps Implementation**:
   - They set up CI/CD pipelines for each microservice.
   - They implemented infrastructure as code using Terraform.
   - They automated testing at multiple levels, including unit tests, integration tests, and end-to-end tests.
   - They implemented blue-green deployments to minimize downtime during updates.

5. **Monitoring and Observability**:
   - They implemented distributed tracing using Jaeger to track requests across services.
   - They set up centralized logging using the ELK Stack.
   - They implemented metrics collection using Prometheus and visualization using Grafana.
   - They set up alerts for critical issues.

### Results

The microservices migration yielded significant benefits:

1. **Improved Scalability**: The system could scale individual services based on demand, improving resource utilization.
2. **Faster Feature Development**: Teams could develop and deploy features independently, reducing time-to-market.
3. **Better Fault Isolation**: Issues in one service didn't affect the entire system, improving overall reliability.
4. **Improved Performance**: Performance bottlenecks could be addressed more effectively, leading to better user experience.
5. **Enhanced Maintainability**: The codebase was more maintainable, with clear service boundaries and responsibilities.

### Lessons Learned

The company learned several valuable lessons during this project:

1. **Start with a Clear Strategy**: A clear migration strategy was essential for a successful transition.
2. **Focus on Domain Boundaries**: Proper domain analysis and service boundary definition were crucial for a good microservices architecture.
3. **Invest in DevOps**: A solid DevOps foundation was necessary for managing the increased complexity of a microservices architecture.
4. **Prioritize Observability**: Comprehensive monitoring and observability were essential for troubleshooting issues in a distributed system.
5. **Plan for Data Management**: Data management was one of the most challenging aspects of the migration and required careful planning.

## Case Study 4: Retail DevSecOps Implementation

### Background

A retail company with a significant online presence was concerned about the security of their e-commerce platform. They had experienced security breaches in the past and wanted to implement DevSecOps practices to improve their security posture while maintaining their ability to deliver features quickly.

### Challenges

The company faced several challenges:

1. **Security vs. Speed**: They needed to balance security requirements with the need for rapid feature delivery.
2. **Complex Application**: Their e-commerce platform was complex, with multiple components and integrations.
3. **Compliance Requirements**: They needed to comply with PCI DSS for handling payment card data.
4. **Legacy Components**: Some parts of their system were legacy components with known security issues.
5. **Security Skill Gap**: Their development team had limited security expertise.

### Solution

The company implemented DevSecOps using the following tools and practices:

1. **Shift-Left Security**: They integrated security into the early stages of their development process.
2. **Automated Security Testing**: They implemented automated security testing as part of their CI/CD pipeline.
3. **Security as Code**: They implemented security policies as code.
4. **Continuous Monitoring**: They implemented continuous security monitoring.
5. **Vulnerability Management**: They established a vulnerability management process.
6. **Security Training**: They provided security training for their development team.

### Implementation

Here's how they implemented DevSecOps:

1. **Security Requirements and Threat Modeling**:
   - They integrated security requirements into their user stories.
   - They conducted threat modeling sessions for new features and significant changes.
   - They created a security checklist for developers to follow.

2. **Secure Coding Practices**:
   - They established secure coding guidelines based on OWASP recommendations.
   - They implemented pre-commit hooks to catch common security issues.
   - They provided security training for developers.

3. **Automated Security Testing**:
   - They integrated static application security testing (SAST) into their CI pipeline using SonarQube and OWASP Dependency-Check.
   - They implemented dynamic application security testing (DAST) using OWASP ZAP.
   - They conducted regular penetration testing.

4. **Infrastructure Security**:
   - They implemented infrastructure as code using Terraform.
   - They integrated security checks into their infrastructure code using tools like tfsec.
   - They implemented network segmentation and least privilege access.

5. **Continuous Monitoring and Response**:
   - They implemented security monitoring using the ELK Stack and Wazuh.
   - They set up alerts for security events.
   - They established an incident response process.
   - They conducted regular security drills.

### Results

The DevSecOps implementation yielded significant benefits:

1. **Improved Security Posture**: The number of security vulnerabilities decreased significantly.
2. **Faster Vulnerability Remediation**: The time to remediate vulnerabilities was reduced from weeks to days.
3. **Maintained Delivery Speed**: They were able to maintain their feature delivery speed while improving security.
4. **Better Compliance**: They achieved and maintained PCI DSS compliance more effectively.
5. **Enhanced Security Awareness**: Developers became more security-conscious and proactive about addressing security issues.

### Lessons Learned

The company learned several valuable lessons during this project:

1. **Security as a Shared Responsibility**: Making security everyone's responsibility was crucial for success.
2. **Automate Where Possible**: Automation was key to integrating security without slowing down development.
3. **Focus on Education**: Security education for developers was as important as technical controls.
4. **Start with High-Risk Areas**: Focusing initially on high-risk areas provided the most immediate benefits.
5. **Continuous Improvement**: DevSecOps was not a one-time project but required continuous improvement.

## Project 1: Setting Up a Complete CI/CD Pipeline

In this project, we'll set up a complete CI/CD pipeline for a simple web application. We'll use Jenkins as our CI/CD server, Docker for containerization, and Kubernetes for deployment.

### Prerequisites

- A Linux server with at least 4GB RAM and 20GB disk space
- Docker and Docker Compose installed
- kubectl installed
- A Kubernetes cluster (you can use Minikube for local development)
- Git

### Step 1: Create a Simple Web Application

First, let's create a simple Node.js web application:

```bash
mkdir -p cicd-project/app
cd cicd-project/app

# Create package.json
cat > package.json << EOF
{
  "name": "cicd-demo",
  "version": "1.0.0",
  "description": "A simple web application for CI/CD demo",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "supertest": "^6.1.4"
  }
}
EOF

# Create app.js
cat > app.js << EOF
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, CI/CD!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

const server = app.listen(port, () => {
  console.log(\`App listening at http://localhost:\${port}\`);
});

module.exports = { app, server };
EOF

# Create a test file
mkdir -p __tests__
cat > __tests__/app.test.js << EOF
const request = require('supertest');
const { app, server } = require('../app');

afterAll(() => {
  server.close();
});

describe('GET /', () => {
  it('responds with a json message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello, CI/CD!');
  });
});

describe('GET /health', () => {
  it('responds with a status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('UP');
  });
});
EOF

# Create Dockerfile
cat > Dockerfile << EOF
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
EOF

# Create .dockerignore
cat > .dockerignore << EOF
node_modules
npm-debug.log
__tests__
EOF

# Create .gitignore
cat > .gitignore << EOF
node_modules
npm-debug.log
EOF

# Initialize Git repository
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Set Up Jenkins

Let's set up Jenkins using Docker Compose:

```bash
cd ..
mkdir -p jenkins
cd jenkins

# Create docker-compose.yml
cat > docker-compose.yml << EOF
version: '3'
services:
  jenkins:
    image: jenkins/jenkins:lts
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false
    user: root

volumes:
  jenkins_home:
EOF

# Start Jenkins
docker-compose up -d
```

### Step 3: Configure Jenkins

1. Access Jenkins at http://localhost:8080
2. Install the following plugins:
   - Docker Pipeline
   - Kubernetes CLI
   - Blue Ocean

3. Set up credentials for Docker Hub and Kubernetes:
   - Go to "Manage Jenkins" > "Manage Credentials" > "Jenkins" > "Global credentials" > "Add Credentials"
   - Add Docker Hub credentials (Username with password)
   - Add Kubernetes credentials (Secret file with kubeconfig)

### Step 4: Create Kubernetes Deployment Files

Create Kubernetes deployment files for our application:

```bash
cd ..
mkdir -p k8s
cd k8s

# Create deployment.yaml
cat > deployment.yaml << EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cicd-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: cicd-demo
  template:
    metadata:
      labels:
        app: cicd-demo
    spec:
      containers:
      - name: cicd-demo
        image: \${DOCKER_IMAGE}
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
EOF

# Create service.yaml
cat > service.yaml << EOF
apiVersion: v1
kind: Service
metadata:
  name: cicd-demo
spec:
  selector:
    app: cicd-demo
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
EOF
```

### Step 5: Create Jenkinsfile

Create a Jenkinsfile in the root of your project:

```bash
cd ..
cat > Jenkinsfile << EOF
pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = "yourusername/cicd-demo:\${BUILD_NUMBER}"
        KUBECONFIG_CREDS = credentials('kubeconfig-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                dir('app') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('app') {
                    sh 'npm test'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                dir('app') {
                    sh 'docker build -t \${DOCKER_IMAGE} .'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                sh 'echo \${DOCKER_HUB_CREDS_PSW} | docker login -u \${DOCKER_HUB_CREDS_USR} --password-stdin'
                sh 'docker push \${DOCKER_IMAGE}'
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh 'mkdir -p ~/.kube'
                sh 'cat \${KUBECONFIG_CREDS} > ~/.kube/config'
                
                dir('k8s') {
                    sh "sed -i 's|\\\${DOCKER_IMAGE}|\${DOCKER_IMAGE}|g' deployment.yaml"
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl apply -f service.yaml'
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
            cleanWs()
        }
    }
}
EOF
```

### Step 6: Create a Jenkins Pipeline

1. In Jenkins, create a new Pipeline job.
2. Configure it to use the Jenkinsfile from your Git repository.
3. Run the pipeline.

### Step 7: Verify the Deployment

After the pipeline runs successfully, verify the deployment:

```bash
kubectl get pods
kubectl get services
```

Access the application using the external IP provided by the LoadBalancer service.

### Step 8: Make a Change and See the CI/CD Pipeline in Action

1. Make a change to the application code.
2. Commit and push the change.
3. Watch the Jenkins pipeline automatically build, test, and deploy the updated application.

## Project 2: Implementing Infrastructure as Code with Terraform and Ansible

In this project, we'll implement Infrastructure as Code (IaC) using Terraform for infrastructure provisioning and Ansible for configuration management. We'll set up a web server infrastructure on AWS.

### Prerequisites

- AWS account with appropriate permissions
- Terraform installed
- Ansible installed
- AWS CLI installed and configured

### Step 1: Set Up Project Structure

First, let's set up the project structure:

```bash
mkdir -p iac-project/{terraform,ansible}
cd iac-project
```

### Step 2: Create Terraform Configuration

Create Terraform configuration files to provision AWS infrastructure:

```bash
cd terraform

# Create main.tf
cat > main.tf << EOF
provider "aws" {
  region = var.region
}

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  
  tags = {
    Name = "\${var.project_name}-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.subnet_cidr
  availability_zone = "\${var.region}a"
  
  map_public_ip_on_launch = true
  
  tags = {
    Name = "\${var.project_name}-public-subnet"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "\${var.project_name}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "\${var.project_name}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "web" {
  name        = "\${var.project_name}-web-sg"
  description = "Allow HTTP and SSH traffic"
  vpc_id      = aws_vpc.main.id
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "\${var.project_name}-web-sg"
  }
}

resource "aws_key_pair" "main" {
  key_name   = "\${var.project_name}-key"
  public_key = file(var.public_key_path)
}

resource "aws_instance" "web" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.main.key_name
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]
  
  tags = {
    Name = "\${var.project_name}-web"
  }
}

resource "local_file" "ansible_inventory" {
  content = templatefile("\${path.module}/inventory.tmpl", {
    web_public_ip = aws_instance.web.public_ip
  })
  filename = "\${path.module}/../ansible/inventory.ini"
}
EOF

# Create variables.tf
cat > variables.tf << EOF
variable "region" {
  description = "The AWS region to deploy to"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "iac-demo"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "subnet_cidr" {
  description = "CIDR block for the subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "ami_id" {
  description = "The AMI ID to use for the instance"
  type        = string
  default     = "ami-0c55b159cbfafe1f0"  # Ubuntu 20.04 LTS in us-west-2
}

variable "instance_type" {
  description = "The type of instance to start"
  type        = string
  default     = "t2.micro"
}

variable "public_key_path" {
  description = "Path to the public key to use for SSH access"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}
EOF

# Create outputs.tf
cat > outputs.tf << EOF
output "web_public_ip" {
  description = "The public IP of the web instance"
  value       = aws_instance.web.public_ip
}

output "web_url" {
  description = "The URL of the web application"
  value       = "http://\${aws_instance.web.public_ip}"
}
EOF

# Create inventory template
cat > inventory.tmpl << EOF
[webservers]
\${web_public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa
EOF
```

### Step 3: Create Ansible Configuration

Create Ansible configuration files to configure the web server:

```bash
cd ../ansible

# Create ansible.cfg
cat > ansible.cfg << EOF
[defaults]
host_key_checking = False
inventory = inventory.ini
EOF

# Create playbook.yml
cat > playbook.yml << EOF
---
- name: Configure web server
  hosts: webservers
  become: true
  
  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes
        cache_valid_time: 3600
    
    - name: Install required packages
      apt:
        name:
          - nginx
          - git
          - nodejs
          - npm
        state: present
    
    - name: Start and enable Nginx
      service:
        name: nginx
        state: started
        enabled: true
    
    - name: Clone web application repository
      git:
        repo: https://github.com/yourusername/web-app.git
        dest: /var/www/web-app
      ignore_errors: yes
    
    - name: Create a simple web page if repository clone fails
      copy:
        content: |
          <!DOCTYPE html>
          <html>
          <head>
            <title>IaC Demo</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }
              h1 {
                color: #333;
              }
            </style>
          </head>
          <body>
            <h1>Hello from Terraform and Ansible!</h1>
            <p>This server was provisioned using Terraform and configured using Ansible.</p>
          </body>
          </html>
        dest: /var/www/html/index.html
      when: git_result is failed
    
    - name: Configure Nginx
      copy:
        content: |
          server {
            listen 80 default_server;
            listen [::]:80 default_server;
            
            root /var/www/html;
            index index.html;
            
            server_name _;
            
            location / {
              try_files $uri $uri/ =404;
            }
          }
        dest: /etc/nginx/sites-available/default
      notify: Restart Nginx
  
  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted
EOF
```

### Step 4: Apply Terraform Configuration

Initialize and apply the Terraform configuration:

```bash
cd ../terraform
terraform init
terraform plan
terraform apply -auto-approve
```

### Step 5: Run Ansible Playbook

Run the Ansible playbook to configure the web server:

```bash
cd ../ansible
ansible-playbook playbook.yml
```

### Step 6: Verify the Deployment

After Ansible completes, verify the deployment by accessing the web server in your browser using the URL provided in the Terraform output.

### Step 7: Clean Up

When you're done, clean up the resources:

```bash
cd ../terraform
terraform destroy -auto-approve
```

## Project 3: Implementing Monitoring and Logging

In this project, we'll implement a comprehensive monitoring and logging solution using Prometheus, Grafana, and the ELK Stack.

### Prerequisites

- A Linux server with at least 8GB RAM and 40GB disk space
- Docker and Docker Compose installed

### Step 1: Set Up Project Structure

First, let's set up the project structure:

```bash
mkdir -p monitoring-project/{prometheus,grafana,elasticsearch,logstash,kibana,filebeat,app}
cd monitoring-project
```

### Step 2: Create a Simple Web Application

Create a simple Node.js web application that we'll monitor:

```bash
cd app

# Create package.json
cat > package.json << EOF
{
  "name": "monitoring-demo",
  "version": "1.0.0",
  "description": "A simple web application for monitoring demo",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "prom-client": "^14.0.1",
    "winston": "^3.3.3"
  }
}
EOF

# Create app.js
cat > app.js << EOF
const express = require('express');
const promClient = require('prom-client');
const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'monitoring-demo' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '/var/log/app.log' })
  ]
});

// Create an Express app
const app = express();
const port = 3000;

// Create a Prometheus registry
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Create a counter for HTTP requests
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});
register.registerMetric(httpRequestsTotal);

// Create a histogram for HTTP request duration
const httpRequestDurationMs = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [10, 50, 100, 500, 1000, 5000]
});
register.registerMetric(httpRequestDurationMs);

// Middleware to measure request duration
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const route = req.route ? req.route.path : req.path;
    const method = req.method;
    const status = res.statusCode;
    
    httpRequestsTotal.inc({ method, route, status });
    httpRequestDurationMs.observe({ method, route, status }, duration);
    
    logger.info('HTTP request', {
      method,
      route,
      status,
      duration,
      userAgent: req.get('user-agent')
    });
  });
  
  next();
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, Monitoring!');
});

app.get('/error', (req, res) => {
  logger.error('This is an error!');
  res.status(500).send('Something went wrong!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start the server
app.listen(port, () => {
  logger.info(\`Server listening on port \${port}\`);
});
EOF

# Create Dockerfile
cat > Dockerfile << EOF
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /var/log
RUN touch /var/log/app.log
RUN chmod 666 /var/log/app.log

EXPOSE 3000

CMD ["node", "app.js"]
EOF
```

### Step 3: Configure Prometheus

Configure Prometheus to scrape metrics from our application:

```bash
cd ../prometheus

# Create prometheus.yml
cat > prometheus.yml << EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'app'
    static_configs:
      - targets: ['app:3000']
EOF
```

### Step 4: Configure Grafana

Configure Grafana with a datasource and dashboard:

```bash
cd ../grafana

# Create datasource configuration
mkdir -p provisioning/datasources
cat > provisioning/datasources/datasource.yml << EOF
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
EOF

# Create dashboard configuration
mkdir -p provisioning/dashboards
cat > provisioning/dashboards/dashboard.yml << EOF
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /var/lib/grafana/dashboards
EOF

# Create a dashboard
mkdir -p dashboards
cat > dashboards/app-dashboard.json << EOF
{
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": "-- Grafana --",
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "gnetId": null,
  "graphTooltip": 0,
  "id": 1,
  "links": [],
  "panels": [
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "Prometheus",
      "fieldConfig": {
        "defaults": {
          "custom": {}
        },
        "overrides": []
      },
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 0
      },
      "hiddenSeries": false,
      "id": 2,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "nullPointMode": "null",
      "options": {
        "alertThreshold": true
      },
      "percentage": false,
      "pluginVersion": "7.3.7",
      "pointradius": 2,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "expr": "sum(rate(http_requests_total[1m])) by (route)",
          "interval": "",
          "legendFormat": "{{route}}",
          "refId": "A"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "HTTP Requests per Second",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "Prometheus",
      "fieldConfig": {
        "defaults": {
          "custom": {}
        },
        "overrides": []
      },
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 0
      },
      "hiddenSeries": false,
      "id": 4,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "nullPointMode": "null",
      "options": {
        "alertThreshold": true
      },
      "percentage": false,
      "pluginVersion": "7.3.7",
      "pointradius": 2,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_ms_bucket[1m])) by (le, route))",
          "interval": "",
          "legendFormat": "{{route}}",
          "refId": "A"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "HTTP Request Duration (95th percentile)",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "ms",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "datasource": "Prometheus",
      "fieldConfig": {
        "defaults": {
          "custom": {},
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 1
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 9
      },
      "id": 6,
      "options": {
        "colorMode": "value",
        "graphMode": "area",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "7.3.7",
      "targets": [
        {
          "expr": "sum(http_requests_total{status=~\"5..\"})",
          "interval": "",
          "legendFormat": "",
          "refId": "A"
        }
      ],
      "timeFrom": null,
      "timeShift": null,
      "title": "Total Error Responses",
      "type": "stat"
    }
  ],
  "schemaVersion": 26,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": []
  },
  "time": {
    "from": "now-6h",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "App Dashboard",
  "uid": "app-dashboard",
  "version": 1
}
EOF
```

### Step 5: Configure ELK Stack

Configure Elasticsearch, Logstash, and Kibana:

```bash
cd ../logstash

# Create Logstash configuration
mkdir -p pipeline
cat > pipeline/logstash.conf << EOF
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][log_type] == "app" {
    json {
      source => "message"
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
  }
}
EOF

cd ../filebeat

# Create Filebeat configuration
cat > filebeat.yml << EOF
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/app.log
  fields:
    log_type: app
  fields_under_root: false
  json.keys_under_root: true

output.logstash:
  hosts: ["logstash:5044"]
EOF
```

### Step 6: Create Docker Compose Configuration

Create a Docker Compose configuration to run all the components:

```bash
cd ..

# Create docker-compose.yml
cat > docker-compose.yml << EOF
version: '3'

services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    volumes:
      - app_logs:/var/log
    networks:
      - monitoring
      - logging

  prometheus:
    image: prom/prometheus:v2.30.3
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:8.2.2
    ports:
      - "3001:3000"
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning
      - ./grafana/dashboards:/var/lib/grafana/dashboards
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    networks:
      - monitoring

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - logging

  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    environment:
      - "LS_JAVA_OPTS=-Xms256m -Xmx256m"
    depends_on:
      - elasticsearch
    networks:
      - logging

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch
    networks:
      - logging

  filebeat:
    image: docker.elastic.co/beats/filebeat:7.15.0
    volumes:
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - app_logs:/var/log:ro
    depends_on:
      - logstash
    networks:
      - logging

networks:
  monitoring:
  logging:

volumes:
  app_logs:
  prometheus_data:
  grafana_data:
  elasticsearch_data:
EOF
```

### Step 7: Start the Stack

Start the monitoring and logging stack:

```bash
docker-compose up -d
```

### Step 8: Generate Some Traffic

Generate some traffic to the application:

```bash
# Generate normal traffic
for i in {1..100}; do curl http://localhost:3000/; sleep 0.1; done

# Generate some errors
for i in {1..10}; do curl http://localhost:3000/error; sleep 0.1; done
```

### Step 9: Access the Monitoring and Logging Interfaces

Access the monitoring and logging interfaces:

- Application: http://localhost:3000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (username: admin, password: admin)
- Kibana: http://localhost:5601

### Step 10: Explore the Monitoring and Logging Data

1. In Prometheus, try some queries:
   - `http_requests_total`: Total number of HTTP requests
   - `rate(http_requests_total[1m])`: HTTP requests per second over the last minute
   - `histogram_quantile(0.95, sum(rate(http_request_duration_ms_bucket[1m])) by (le))`: 95th percentile of HTTP request duration

2. In Grafana, explore the pre-configured dashboard:
   - Go to "Dashboards" > "Manage" > "App Dashboard"
   - Observe the HTTP request rate, request duration, and error count

3. In Kibana, set up an index pattern and explore the logs:
   - Go to "Management" > "Stack Management" > "Index Patterns"
   - Create an index pattern for `filebeat-*`
   - Go to "Discover" to explore the logs
   - Filter for error logs: `level: error`

## Summary

In this chapter, we've explored real-world DevOps projects and case studies that demonstrate how DevOps principles and practices are applied in actual organizations. We've also implemented three hands-on projects that cover key aspects of DevOps:

1. Setting up a complete CI/CD pipeline using Jenkins, Docker, and Kubernetes.
2. Implementing Infrastructure as Code with Terraform and Ansible.
3. Implementing a comprehensive monitoring and logging solution using Prometheus, Grafana, and the ELK Stack.

These projects and case studies provide practical insights into how DevOps works in real-world scenarios and give you hands-on experience with essential DevOps tools and practices.

Key takeaways from this chapter:

1. Real-world DevOps implementations vary widely depending on the organization's size, industry, and specific needs.
2. Successful DevOps implementations require not just technical changes but also cultural changes.
3. Starting small and gradually expanding is often more effective than trying to implement everything at once.
4. Automation is a key aspect of DevOps, but it's important to automate the right things in the right way.
5. Continuous improvement is essential for long-term DevOps success.

By studying these case studies and completing the hands-on projects, you've gained practical experience that will help you implement DevOps practices in your own organization.

## Additional Resources

- [The DevOps Handbook](https://itrevolution.com/book/the-devops-handbook/) by Gene Kim, Jez Humble, Patrick Debois, and John Willis
- [Accelerate: The Science of Lean Software and DevOps](https://itrevolution.com/book/accelerate/) by Nicole Forsgren, Jez Humble, and Gene Kim
- [DevOps Case Studies](https://cloud.google.com/solutions/devops/devops-case-studies) by Google Cloud
- [AWS DevOps Blog](https://aws.amazon.com/blogs/devops/)
- [Microsoft DevOps Blog](https://devblogs.microsoft.com/devops/)
- [The Phoenix Project](https://itrevolution.com/book/the-phoenix-project/) by Gene Kim, Kevin Behr, and George Spafford (a novel about DevOps)
