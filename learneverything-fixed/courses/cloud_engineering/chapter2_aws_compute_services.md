# Chapter 2: AWS Compute Services

## Introduction to AWS Compute Services

Compute services form the backbone of cloud infrastructure, providing the processing power needed to run applications and workloads. AWS offers a comprehensive suite of compute services designed to meet various requirements, from traditional virtual machines to serverless computing and container orchestration.

In this chapter, we'll explore AWS's core compute services, including Amazon EC2, AWS Lambda, Amazon ECS, Amazon EKS, and AWS Elastic Beanstalk. We'll dive deep into each service, covering their features, use cases, pricing models, and best practices. We'll also provide hands-on examples to help you gain practical experience with these services.

### Overview of AWS Compute Services

AWS offers several compute services, each designed for specific use cases:

1. **Amazon Elastic Compute Cloud (EC2)**: Virtual servers in the cloud, providing resizable compute capacity.

2. **AWS Lambda**: Serverless compute service that runs code in response to events without provisioning or managing servers.

3. **Amazon Elastic Container Service (ECS)**: Highly scalable, high-performance container orchestration service for Docker containers.

4. **Amazon Elastic Kubernetes Service (EKS)**: Managed Kubernetes service for running containerized applications.

5. **AWS Elastic Beanstalk**: Platform as a Service (PaaS) for deploying and scaling web applications and services.

6. **Amazon Lightsail**: Simplified virtual private server (VPS) service for small projects and simple websites.

7. **AWS Batch**: Fully managed batch processing at any scale.

8. **AWS Fargate**: Serverless compute engine for containers that works with both ECS and EKS.

9. **Amazon EC2 Auto Scaling**: Automatically adjust capacity to maintain steady, predictable performance at the lowest possible cost.

10. **Elastic Load Balancing**: Automatically distributes incoming application traffic across multiple targets.

### Choosing the Right Compute Service

Selecting the appropriate compute service depends on several factors:

1. **Application Architecture**: Monolithic applications might be better suited for EC2, while microservices architectures might benefit from containers or serverless.

2. **Operational Overhead**: Consider how much infrastructure management you want to handle versus what you want AWS to manage.

3. **Scalability Requirements**: Some services offer more seamless scaling than others.

4. **Cost Considerations**: Different compute services have different pricing models.

5. **Development Workflow**: Some services integrate better with certain development workflows.

6. **Performance Requirements**: Consider the performance characteristics needed for your application.

Let's explore each of these compute services in detail, starting with Amazon EC2, the foundational compute service in AWS.

## Amazon EC2 Fundamentals

Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers by providing virtual servers, known as instances, that can be launched and managed programmatically.

### EC2 Core Concepts

#### Instances

An EC2 instance is a virtual server in the cloud. When you launch an instance, you select an Amazon Machine Image (AMI) that contains the operating system and software configuration. You also choose an instance type, which determines the hardware configuration of your instance.

#### Amazon Machine Images (AMIs)

An AMI is a template that contains a software configuration (operating system, application server, and applications). From an AMI, you launch an instance, which is a copy of the AMI running as a virtual server in the cloud.

AMIs can be:
- **Public AMIs**: Provided by AWS or the community
- **Private AMIs**: Created by you or shared with you
- **AWS Marketplace AMIs**: Purchased from third-party vendors

#### Instance Types

EC2 offers a wide variety of instance types optimized for different use cases. Instance types comprise varying combinations of CPU, memory, storage, and networking capacity.

Instance type categories include:

1. **General Purpose (T, M)**: Balanced compute, memory, and networking resources for a wide range of workloads.
2. **Compute Optimized (C)**: High-performance processors for compute-bound applications.
3. **Memory Optimized (R, X, z)**: Fast performance for workloads that process large data sets in memory.
4. **Storage Optimized (D, H, I)**: High, sequential read and write access to large data sets on local storage.
5. **Accelerated Computing (P, G, F)**: Hardware accelerators or co-processors for functions like graphics processing or machine learning.

#### Instance Lifecycle

EC2 instances go through various states during their lifecycle:

1. **Pending**: The instance is preparing to enter the running state.
2. **Running**: The instance is running and ready for use.
3. **Stopping**: The instance is preparing to be stopped or hibernated.
4. **Stopped**: The instance is shut down and cannot be used. You can restart the instance at any time.
5. **Shutting-down**: The instance is preparing to be terminated.
6. **Terminated**: The instance has been permanently deleted and cannot be restarted.

#### Storage Options

EC2 instances can use various storage options:

1. **Amazon Elastic Block Store (EBS)**: Persistent block storage volumes for EC2 instances.
2. **Instance Store**: Temporary block-level storage that's physically attached to the host computer.
3. **Amazon Elastic File System (EFS)**: Scalable file storage for use with EC2 instances.
4. **Amazon S3**: Object storage service for storing and retrieving any amount of data.

#### Networking

EC2 instances are launched in a Virtual Private Cloud (VPC), which provides networking features such as:

1. **Security Groups**: Virtual firewalls that control inbound and outbound traffic to instances.
2. **Network Interfaces**: Virtual network cards attached to instances.
3. **Elastic IP Addresses**: Static IPv4 addresses designed for dynamic cloud computing.
4. **VPC Endpoints**: Connect your VPC to supported AWS services without using public IP addresses.

### Launching an EC2 Instance

Let's walk through the process of launching an EC2 instance using the AWS Management Console:

1. **Sign in to the AWS Management Console** and open the EC2 console.

2. **Choose an AMI**:
   - Click "Launch Instance"
   - Select an AMI (e.g., Amazon Linux 2)

3. **Choose an Instance Type**:
   - Select an instance type based on your requirements (e.g., t2.micro for the free tier)
   - Click "Next: Configure Instance Details"

4. **Configure Instance Details**:
   - Select a VPC and subnet
   - Choose whether to auto-assign a public IP
   - Configure other settings as needed
   - Click "Next: Add Storage"

5. **Add Storage**:
   - Configure the root volume size and type
   - Add additional volumes if needed
   - Click "Next: Add Tags"

6. **Add Tags**:
   - Add tags to help identify and manage your instance
   - Click "Next: Configure Security Group"

7. **Configure Security Group**:
   - Create a new security group or select an existing one
   - Add rules to allow necessary traffic (e.g., SSH on port 22, HTTP on port 80)
   - Click "Review and Launch"

8. **Review and Launch**:
   - Review your instance configuration
   - Click "Launch"

9. **Create or Select a Key Pair**:
   - Create a new key pair or select an existing one
   - Download the key pair file (.pem) if creating a new one
   - Click "Launch Instances"

10. **View Instance Status**:
    - The instance will be in the "pending" state initially
    - Once it's in the "running" state, it's ready for use

### Connecting to an EC2 Instance

#### Connecting via SSH (Linux/macOS)

For Linux or macOS instances, you can connect using SSH:

```bash
# Set the correct permissions for your key pair file
chmod 400 your-key-pair.pem

# Connect to your instance
ssh -i your-key-pair.pem ec2-user@your-instance-public-ip
```

#### Connecting via PuTTY (Windows)

For Windows users without OpenSSH, you can use PuTTY:

1. Convert the .pem file to .ppk format using PuTTYgen
2. Configure PuTTY with the instance's public IP and the .ppk file
3. Connect to the instance

#### Connecting via EC2 Instance Connect

AWS also provides EC2 Instance Connect, which allows you to connect to your instance directly from the AWS Management Console:

1. Select your instance in the EC2 console
2. Click "Connect"
3. Choose "EC2 Instance Connect"
4. Click "Connect"

### Managing EC2 Instances

#### Starting and Stopping Instances

You can start, stop, and terminate instances as needed:

- **Start**: Resume a stopped instance
- **Stop**: Shut down an instance (you're not charged for instance usage while it's stopped, but you are charged for attached EBS volumes)
- **Terminate**: Permanently delete an instance

To start or stop an instance using the AWS CLI:

```bash
# Start an instance
aws ec2 start-instances --instance-ids i-1234567890abcdef0

# Stop an instance
aws ec2 stop-instances --instance-ids i-1234567890abcdef0

# Terminate an instance
aws ec2 terminate-instances --instance-ids i-1234567890abcdef0
```

#### Monitoring Instances

AWS provides several tools for monitoring EC2 instances:

1. **Amazon CloudWatch**: Collect and track metrics, collect and monitor log files, and set alarms.
2. **AWS CloudTrail**: Track user activity and API usage.
3. **Instance Status Checks**: Verify that your instance is reachable and that the operating system is accepting traffic.

To view basic monitoring information using the AWS CLI:

```bash
# Get status of an instance
aws ec2 describe-instance-status --instance-ids i-1234567890abcdef0

# Get detailed monitoring data
aws cloudwatch get-metric-statistics --namespace AWS/EC2 --metric-name CPUUtilization --period 3600 --statistics Average --dimensions Name=InstanceId,Value=i-1234567890abcdef0 --start-time 2023-01-01T00:00:00Z --end-time 2023-01-02T00:00:00Z
```

#### Tagging Instances

Tags are key-value pairs that you can use to categorize and manage your EC2 resources. They can help with:

- Resource organization
- Cost allocation
- Access control
- Automation

To add tags to an instance using the AWS CLI:

```bash
aws ec2 create-tags --resources i-1234567890abcdef0 --tags Key=Name,Value=WebServer Key=Environment,Value=Production
```

### EC2 Instance Types and Purchasing Options

#### Instance Type Families

EC2 offers various instance type families, each optimized for specific use cases:

1. **General Purpose (T, M)**:
   - T instances (e.g., t2.micro, t3.medium): Burstable performance instances that provide a baseline level of CPU performance with the ability to burst above the baseline when needed.
   - M instances (e.g., m5.large, m6g.xlarge): Balanced compute, memory, and networking resources for a wide range of workloads.

2. **Compute Optimized (C)**:
   - C instances (e.g., c5.large, c6g.xlarge): High-performance processors for compute-bound applications like batch processing, scientific modeling, and gaming servers.

3. **Memory Optimized (R, X, z)**:
   - R instances (e.g., r5.large, r6g.xlarge): Fast performance for workloads that process large data sets in memory, like in-memory databases and real-time big data analytics.
   - X instances (e.g., x1.16xlarge): Optimized for large-scale, enterprise-class, in-memory applications and high-performance databases.
   - z instances (e.g., z1d.large): High compute capacity and high memory footprint for workloads with high per-core licensing costs.

4. **Storage Optimized (D, H, I)**:
   - D instances (e.g., d2.xlarge): High disk throughput for data warehousing and Hadoop distributed computing.
   - H instances (e.g., h1.2xlarge): High disk throughput for big data workloads.
   - I instances (e.g., i3.large): Low latency, very high random I/O performance, and high sequential read throughput for NoSQL databases and data warehousing.

5. **Accelerated Computing (P, G, F)**:
   - P instances (e.g., p3.2xlarge): GPU-based instances for machine learning and high-performance computing.
   - G instances (e.g., g4dn.xlarge): Graphics-intensive applications and machine learning inference.
   - F instances (e.g., f1.2xlarge): Field Programmable Gate Array (FPGA) based instances for custom hardware acceleration.

#### Instance Purchasing Options

AWS offers several purchasing options for EC2 instances, each with different pricing and commitment levels:

1. **On-Demand Instances**:
   - Pay for compute capacity by the hour or second with no long-term commitments.
   - Ideal for short-term, irregular workloads that cannot be interrupted.
   - No upfront payment or long-term commitment.
   - Highest cost per instance hour.

2. **Reserved Instances (RIs)**:
   - Purchase instances in advance for 1 or 3 years.
   - Up to 72% discount compared to On-Demand pricing.
   - Available in three payment options: All Upfront, Partial Upfront, and No Upfront.
   - Types:
     - Standard RIs: Up to 72% discount, can be modified but not exchanged.
     - Convertible RIs: Up to 54% discount, can be exchanged for RIs with different instance attributes.

3. **Savings Plans**:
   - Commit to a consistent amount of usage (measured in $/hour) for a 1 or 3-year term.
   - Up to 72% savings compared to On-Demand pricing.
   - Types:
     - Compute Savings Plans: Most flexible, apply to EC2, Fargate, and Lambda usage.
     - EC2 Instance Savings Plans: Apply to EC2 usage within a specific family in a specific region.

4. **Spot Instances**:
   - Request unused EC2 capacity at steep discounts (up to 90% off On-Demand prices).
   - Instances can be terminated by AWS with a 2-minute warning when capacity is needed.
   - Ideal for fault-tolerant, flexible workloads like batch processing, scientific research, image processing, and CI/CD.

5. **Dedicated Hosts**:
   - Physical servers dedicated to your use.
   - Can help meet compliance requirements and reduce costs by using your existing server-bound software licenses.
   - Available On-Demand or as Reserved Hosts.

6. **Dedicated Instances**:
   - Instances that run on hardware dedicated to a single customer.
   - Less expensive than Dedicated Hosts but don't provide visibility or control over the physical host.

7. **Capacity Reservations**:
   - Reserve capacity for EC2 instances in a specific Availability Zone.
   - No billing discounts, but ensures capacity is available when needed.
   - Can be combined with Reserved Instances or Savings Plans for billing discounts.

#### Choosing the Right Instance Type and Purchasing Option

When selecting an instance type and purchasing option, consider:

1. **Workload Requirements**:
   - CPU, memory, storage, and network requirements
   - Operating system and software compatibility
   - Specialized hardware needs (e.g., GPUs, FPGAs)

2. **Cost Optimization**:
   - Predictability of workload
   - Flexibility requirements
   - Budget constraints
   - Commitment level

3. **Performance Needs**:
   - Consistent vs. burstable performance
   - Latency requirements
   - Throughput requirements

4. **Availability Requirements**:
   - Tolerance for interruptions
   - Multi-AZ deployment needs
   - Recovery time objectives

### Hands-On Lab: Working with EC2 Instances

In this lab, we'll launch an EC2 instance, connect to it, install a web server, and create an AMI from the instance.

#### Prerequisites

- An AWS account
- Basic knowledge of Linux commands
- SSH client (built into Linux/macOS, PuTTY for Windows)

#### Step 1: Launch an EC2 Instance

1. Sign in to the AWS Management Console and navigate to the EC2 dashboard.

2. Click "Launch Instance" and select "Launch Instance" from the dropdown.

3. Name your instance (e.g., "WebServer").

4. Choose an AMI:
   - Select "Amazon Linux 2 AMI" from the Quick Start list.

5. Choose an instance type:
   - Select "t2.micro" (eligible for the free tier).

6. Create a key pair:
   - Click "Create new key pair"
   - Name it (e.g., "ec2-lab-key")
   - Select "RSA" and ".pem" format
   - Click "Create key pair" and save the .pem file securely

7. Configure network settings:
   - Create a new security group
   - Allow SSH traffic from your IP
   - Allow HTTP traffic from anywhere

8. Configure storage:
   - Keep the default storage settings (8 GB gp2 EBS volume)

9. Click "Launch instance"

10. Click "View Instances" to see your instance being launched

#### Step 2: Connect to Your EC2 Instance

For Linux/macOS users:

1. Open a terminal window.

2. Change the permissions of your key pair file:
   ```bash
   chmod 400 /path/to/ec2-lab-key.pem
   ```

3. Connect to your instance using SSH:
   ```bash
   ssh -i /path/to/ec2-lab-key.pem ec2-user@your-instance-public-ip
   ```

For Windows users using PuTTY:

1. Convert the .pem file to .ppk format using PuTTYgen.

2. Configure PuTTY:
   - Host Name: ec2-user@your-instance-public-ip
   - Port: 22
   - Connection > SSH > Auth: Browse to your .ppk file
   - Save the session for future use

3. Click "Open" to connect.

#### Step 3: Install and Configure a Web Server

Once connected to your instance, install and configure Apache web server:

```bash
# Update the package index
sudo yum update -y

# Install Apache
sudo yum install -y httpd

# Start Apache
sudo systemctl start httpd

# Enable Apache to start on boot
sudo systemctl enable httpd

# Create a simple web page
echo "<html><body><h1>Hello from EC2!</h1><p>This is my first EC2 instance.</p></body></html>" | sudo tee /var/www/html/index.html
```

Now, open a web browser and navigate to your instance's public IP address. You should see your web page.

#### Step 4: Create a Custom AMI

Now that you have a configured web server, you can create an AMI to launch additional instances with the same configuration:

1. In the EC2 console, select your instance.

2. Click "Actions" > "Image and templates" > "Create image".

3. Provide an image name (e.g., "WebServer-AMI") and description.

4. Keep the default settings and click "Create image".

5. Navigate to "AMIs" in the left sidebar to monitor the AMI creation process.

#### Step 5: Launch an Instance from Your Custom AMI

Once your AMI is available (status: "available"), you can launch a new instance from it:

1. Select your AMI and click "Launch instance from AMI".

2. Follow the instance launch wizard, selecting the same instance type and key pair.

3. Launch the instance and verify that it's running the web server by accessing its public IP in a browser.

#### Step 6: Clean Up

To avoid incurring charges, clean up the resources you created:

1. Terminate your EC2 instances:
   - Select the instances in the EC2 console
   - Click "Instance state" > "Terminate instance"

2. Deregister your custom AMI:
   - Select the AMI in the AMIs section
   - Click "Actions" > "Deregister AMI"

3. Delete the associated EBS snapshot:
   - Navigate to "Snapshots" in the left sidebar
   - Select the snapshot associated with your AMI
   - Click "Actions" > "Delete snapshot"

### EC2 Auto Scaling and Load Balancing

EC2 Auto Scaling and Elastic Load Balancing are essential services for building scalable and highly available applications on AWS.

#### EC2 Auto Scaling

EC2 Auto Scaling helps you maintain application availability and allows you to automatically add or remove EC2 instances according to conditions you define. Key components include:

1. **Launch Templates or Launch Configurations**: Define the instance configuration for Auto Scaling.

2. **Auto Scaling Groups**: Collection of EC2 instances treated as a logical grouping for scaling and management.

3. **Scaling Policies**: Define how to scale the group based on conditions:
   - **Target Tracking Scaling**: Maintain a specific metric at a target value (e.g., CPU utilization at 50%).
   - **Step Scaling**: Add or remove instances based on alarm thresholds.
   - **Simple Scaling**: Add or remove a specific number of instances when an alarm is triggered.
   - **Scheduled Scaling**: Scale based on predictable load changes.

4. **Health Checks**: Determine the health of instances to replace unhealthy ones.

#### Creating an Auto Scaling Group

Here's how to create an Auto Scaling group using the AWS Management Console:

1. Navigate to the EC2 dashboard and select "Auto Scaling Groups" from the left sidebar.

2. Click "Create Auto Scaling group".

3. Choose a launch template or create a new one.

4. Configure the Auto Scaling group details:
   - Name the group
   - Select VPC and subnets
   - Configure advanced options (if needed)

5. Configure group size and scaling policies:
   - Set desired, minimum, and maximum capacity
   - Configure scaling policies (e.g., target tracking based on CPU utilization)

6. Configure notifications and tags (optional).

7. Review and create the Auto Scaling group.

#### Elastic Load Balancing (ELB)

Elastic Load Balancing automatically distributes incoming application traffic across multiple targets, such as EC2 instances. AWS offers three types of load balancers:

1. **Application Load Balancer (ALB)**:
   - Operates at the application layer (HTTP/HTTPS)
   - Supports path-based routing, host-based routing, and containerized applications
   - Ideal for web applications

2. **Network Load Balancer (NLB)**:
   - Operates at the transport layer (TCP/UDP)
   - Handles millions of requests per second with ultra-low latency
   - Ideal for high-performance applications

3. **Classic Load Balancer (CLB)**:
   - Legacy load balancer that operates at both application and transport layers
   - Less feature-rich than ALB and NLB
   - Maintained for backward compatibility

#### Creating an Application Load Balancer

Here's how to create an Application Load Balancer using the AWS Management Console:

1. Navigate to the EC2 dashboard and select "Load Balancers" from the left sidebar.

2. Click "Create Load Balancer" and select "Application Load Balancer".

3. Configure the load balancer:
   - Name the load balancer
   - Select the scheme (internet-facing or internal)
   - Select listeners (e.g., HTTP on port 80)
   - Select Availability Zones

4. Configure security settings (if using HTTPS).

5. Configure security groups.

6. Configure routing:
   - Create a target group
   - Select the target type (e.g., instances)
   - Configure health checks

7. Register targets (EC2 instances).

8. Review and create the load balancer.

#### Integrating Auto Scaling with Load Balancing

To create a scalable and highly available architecture, you can integrate Auto Scaling with Load Balancing:

1. Create a load balancer and target group.

2. When creating an Auto Scaling group, attach it to the load balancer's target group.

3. The Auto Scaling group will automatically register new instances with the load balancer and deregister terminated instances.

### Hands-On Lab: Setting Up Auto Scaling and Load Balancing

In this lab, we'll create a scalable web application using EC2 Auto Scaling and an Application Load Balancer.

#### Prerequisites

- An AWS account
- The WebServer AMI created in the previous lab (or create a new one)

#### Step 1: Create a Launch Template

1. Navigate to the EC2 dashboard and select "Launch Templates" from the left sidebar.

2. Click "Create launch template".

3. Configure the launch template:
   - Name: "WebServer-Template"
   - AMI: Select your WebServer AMI
   - Instance type: t2.micro
   - Key pair: Select your existing key pair
   - Security groups: Create or select a security group that allows HTTP (port 80) and SSH (port 22)
   - User data: Add the following script to ensure the web server starts on boot:
     ```bash
     #!/bin/bash
     yum update -y
     systemctl start httpd
     systemctl enable httpd
     ```

4. Click "Create launch template".

#### Step 2: Create an Application Load Balancer

1. Navigate to the EC2 dashboard and select "Load Balancers" from the left sidebar.

2. Click "Create Load Balancer" and select "Application Load Balancer".

3. Configure the load balancer:
   - Name: "WebServer-ALB"
   - Scheme: Internet-facing
   - Listeners: HTTP on port 80
   - Availability Zones: Select at least two Availability Zones

4. Configure security settings (skip if not using HTTPS).

5. Configure security groups:
   - Create a new security group that allows HTTP (port 80) from anywhere

6. Configure routing:
   - Target group: Create a new target group
   - Name: "WebServer-TG"
   - Target type: Instances
   - Protocol: HTTP
   - Port: 80
   - Health check path: "/"

7. Skip registering targets (the Auto Scaling group will do this).

8. Review and create the load balancer.

#### Step 3: Create an Auto Scaling Group

1. Navigate to the EC2 dashboard and select "Auto Scaling Groups" from the left sidebar.

2. Click "Create Auto Scaling group".

3. Choose the launch template you created earlier.

4. Configure the Auto Scaling group details:
   - Name: "WebServer-ASG"
   - Launch template version: Latest
   - Network: Select your VPC
   - Subnets: Select the same Availability Zones you selected for the load balancer

5. Configure advanced options:
   - Load balancing: Attach to an existing load balancer
   - Choose from your load balancer target groups: Select "WebServer-TG"
   - Health check type: ELB
   - Health check grace period: 300 seconds

6. Configure group size and scaling policies:
   - Desired capacity: 2
   - Minimum capacity: 2
   - Maximum capacity: 4
   - Scaling policies: Add a target tracking scaling policy
   - Metric type: Average CPU utilization
   - Target value: 50%

7. Add notifications (optional).

8. Add tags:
   - Key: Name
   - Value: WebServer-ASG-Instance

9. Review and create the Auto Scaling group.

#### Step 4: Test the Auto Scaling Group and Load Balancer

1. Wait for the instances to be launched and pass health checks.

2. Find the DNS name of your load balancer in the load balancer details.

3. Open a web browser and navigate to the load balancer's DNS name. You should see your web page.

4. To test auto scaling, you can simulate high CPU usage on one of the instances:
   - Connect to one of the instances using SSH
   - Run a command to stress the CPU:
     ```bash
     sudo yum install -y stress
     sudo stress --cpu 8 --timeout 600
     ```
   - Monitor the Auto Scaling group in the AWS console to see if it launches additional instances

#### Step 5: Clean Up

To avoid incurring charges, clean up the resources you created:

1. Delete the Auto Scaling group:
   - Navigate to Auto Scaling Groups
   - Select your Auto Scaling group
   - Click "Delete"
   - Confirm deletion

2. Delete the load balancer:
   - Navigate to Load Balancers
   - Select your load balancer
   - Click "Actions" > "Delete"
   - Confirm deletion

3. Delete the target group:
   - Navigate to Target Groups
   - Select your target group
   - Click "Actions" > "Delete"
   - Confirm deletion

4. Delete the launch template:
   - Navigate to Launch Templates
   - Select your launch template
   - Click "Actions" > "Delete template"
   - Confirm deletion

5. Deregister your AMI and delete associated snapshots as described in the previous lab.

## AWS Lambda and Serverless Computing

AWS Lambda is a serverless compute service that runs your code in response to events and automatically manages the underlying compute resources. With Lambda, you can run code without provisioning or managing servers, making it an ideal solution for many application scenarios.

### Serverless Computing Concepts

Serverless computing is a cloud computing execution model where the cloud provider dynamically manages the allocation and provisioning of servers. Key characteristics include:

1. **No Server Management**: You don't need to provision or maintain any servers.

2. **Pay-per-Use**: You're charged based on the actual amount of resources consumed by your application.

3. **Auto-scaling**: The service automatically scales with the size of the workload.

4. **High Availability**: Built-in high availability and fault tolerance.

5. **Event-Driven**: Functions are triggered by events.

### AWS Lambda Fundamentals

#### How Lambda Works

Lambda functions work as follows:

1. You upload your code to Lambda.
2. You set up your function to trigger from an event source, such as HTTP requests via API Gateway, modifications to objects in S3 buckets, table updates in DynamoDB, etc.
3. Lambda runs your function only when triggered.
4. You pay only for the compute time you consume.

#### Lambda Function Components

A Lambda function consists of:

1. **Function Code**: The code you want to execute.
2. **Handler**: The method in your code that processes events.
3. **Runtime**: The language-specific environment that runs your function (e.g., Node.js, Python, Java).
4. **Trigger**: The service or custom application that invokes your function.
5. **Resources**: The amount of memory and maximum execution time allocated to your function.
6. **Execution Role**: An IAM role that grants the function permission to access AWS services and resources.

#### Supported Runtimes

Lambda supports multiple programming languages through runtimes:

- Node.js
- Python
- Ruby
- Java
- Go
- .NET Core
- Custom Runtime via Lambda Layers

#### Lambda Limits

Lambda has certain limits:

- **Memory**: 128 MB to 10,240 MB, in 1 MB increments.
- **Execution Time**: Up to 15 minutes.
- **Deployment Package Size**: 50 MB (zipped) for direct upload, 250 MB (unzipped) including layers.
- **Concurrent Executions**: 1,000 per region (can be increased upon request).

### Creating and Deploying Lambda Functions

Let's explore how to create and deploy Lambda functions using different methods.

#### Using the AWS Management Console

1. Navigate to the Lambda console.
2. Click "Create function".
3. Choose "Author from scratch" or use a blueprint.
4. Configure basic information:
   - Function name
   - Runtime
   - Execution role
5. Click "Create function".
6. Write or upload your code in the code editor.
7. Configure triggers and permissions.
8. Test your function using the "Test" button.

#### Using the AWS CLI

1. Create a deployment package (ZIP file containing your code).
2. Create an execution role using IAM.
3. Create the Lambda function:

```bash
aws lambda create-function \
  --function-name my-function \
  --runtime python3.9 \
  --role arn:aws:iam::123456789012:role/lambda-ex \
  --handler lambda_function.lambda_handler \
  --zip-file fileb://function.zip
```

4. Invoke the function for testing:

```bash
aws lambda invoke \
  --function-name my-function \
  --payload '{"key": "value"}' \
  output.txt
```

#### Using the AWS Serverless Application Model (SAM)

AWS SAM is an open-source framework for building serverless applications. It extends AWS CloudFormation to provide a simplified way of defining serverless applications.

1. Install the AWS SAM CLI.
2. Create a SAM template (YAML file):

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: 'AWS::Serverless-2016-10-31'
Resources:
  MyFunction:
    Type: 'AWS::Serverless::Function'
    Properties:
      Handler: index.handler
      Runtime: nodejs14.x
      CodeUri: ./my-function/
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

3. Build and deploy the application:

```bash
# Build the application
sam build

# Deploy the application
sam deploy --guided
```

### Lambda Event Sources and Triggers

Lambda functions can be triggered by various event sources:

1. **API Gateway**: Create RESTful APIs that trigger Lambda functions.
2. **S3**: Trigger functions when objects are created, updated, or deleted.
3. **DynamoDB**: Trigger functions when items in a table are modified.
4. **SQS**: Process messages from an SQS queue.
5. **SNS**: Process notifications from an SNS topic.
6. **CloudWatch Events/EventBridge**: Trigger functions on a schedule or in response to AWS service events.
7. **Kinesis**: Process records from a Kinesis data stream.
8. **Cognito**: Trigger functions during user authentication flows.
9. **ALB**: Trigger functions from an Application Load Balancer.

### Lambda Execution Model and Concurrency

#### Cold Starts vs. Warm Starts

When a Lambda function is invoked, the following happens:

1. **Cold Start**: If no instance of your function is running, Lambda creates a new execution environment, initializes your code, and then runs the handler method. This process is called a cold start and can add latency to the function execution.

2. **Warm Start**: If an instance of your function is already running from a previous invocation, Lambda reuses it. This is called a warm start and is much faster than a cold start.

#### Concurrency

Concurrency refers to the number of function instances that serve requests at the same time:

1. **Reserved Concurrency**: Guarantees that a specific number of instances are available to serve requests for your function.
2. **Provisioned Concurrency**: Initializes a requested number of execution environments before the function is invoked, eliminating cold starts.
3. **Account Concurrency Limit**: By default, AWS limits the total concurrent executions across all functions in a region to 1,000.

### Lambda Networking and VPC Integration

Lambda functions can be configured to access resources in a VPC:

1. **Public Lambda**: By default, Lambda functions have access to public AWS services and the internet, but not to resources in a private VPC.

2. **VPC Lambda**: You can configure a Lambda function to access resources in a private VPC by specifying the VPC, subnets, and security groups.

When a Lambda function is configured to access resources in a VPC:

- Lambda creates an Elastic Network Interface (ENI) for each combination of security group and subnet.
- The function can access resources in the VPC but loses internet access unless the VPC has a NAT gateway or VPC endpoints.

### Lambda Security Best Practices

1. **Use IAM Roles with Least Privilege**: Grant only the permissions that your function needs.

2. **Environment Variables**: Use environment variables to pass operational parameters to your function, but avoid storing sensitive information in plaintext.

3. **Encryption**: Use AWS KMS to encrypt environment variables containing sensitive data.

4. **VPC**: If your function needs to access resources in a VPC, configure it to run in the VPC.

5. **Logging and Monitoring**: Enable CloudWatch Logs and use X-Ray for tracing.

6. **Code Scanning**: Scan your code for vulnerabilities before deployment.

7. **Dependency Management**: Keep dependencies updated to avoid security vulnerabilities.

### Lambda Pricing Model

Lambda pricing is based on:

1. **Number of Requests**: $0.20 per 1 million requests.
2. **Compute Time**: Based on the amount of memory allocated to your function and the time it runs.
3. **Additional Charges**: For resources used by your function, such as data transfer, S3 storage, etc.

The free tier includes:
- 1 million free requests per month
- 400,000 GB-seconds of compute time per month

### Hands-On Lab: Building a Serverless Application with Lambda

In this lab, we'll build a simple serverless application using AWS Lambda, API Gateway, and DynamoDB.

#### Prerequisites

- An AWS account
- Basic knowledge of JavaScript or Python

#### Step 1: Create a DynamoDB Table

1. Navigate to the DynamoDB console.

2. Click "Create table".

3. Configure the table:
   - Table name: "Users"
   - Partition key: "userId" (String)
   - Keep default settings for the rest

4. Click "Create table".

#### Step 2: Create a Lambda Function

1. Navigate to the Lambda console.

2. Click "Create function".

3. Choose "Author from scratch".

4. Configure basic information:
   - Function name: "UserFunction"
   - Runtime: Node.js 14.x
   - Architecture: x86_64
   - Permissions: Create a new role with basic Lambda permissions

5. Click "Create function".

6. Replace the code in the editor with the following:

```javascript
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users';

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    let response;
    
    try {
        const httpMethod = event.httpMethod;
        const path = event.path;
        
        if (path === '/users' && httpMethod === 'GET') {
            // List all users
            response = await listUsers();
        } else if (path === '/users' && httpMethod === 'POST') {
            // Create a new user
            const user = JSON.parse(event.body);
            response = await createUser(user);
        } else if (path.startsWith('/users/') && httpMethod === 'GET') {
            // Get a specific user
            const userId = path.split('/')[2];
            response = await getUser(userId);
        } else if (path.startsWith('/users/') && httpMethod === 'DELETE') {
            // Delete a user
            const userId = path.split('/')[2];
            response = await deleteUser(userId);
        } else {
            response = {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid request' })
            };
        }
    } catch (err) {
        console.error('Error:', err);
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' })
        };
    }
    
    // Add CORS headers
    response.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,DELETE'
    };
    
    return response;
};

async function listUsers() {
    const params = {
        TableName: TABLE_NAME
    };
    
    const result = await dynamodb.scan(params).promise();
    
    return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
}

async function getUser(userId) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId: userId
        }
    };
    
    const result = await dynamodb.get(params).promise();
    
    if (!result.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'User not found' })
        };
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
}

async function createUser(user) {
    if (!user.userId || !user.name) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'userId and name are required' })
        };
    }
    
    const params = {
        TableName: TABLE_NAME,
        Item: user,
        ConditionExpression: 'attribute_not_exists(userId)'
    };
    
    try {
        await dynamodb.put(params).promise();
        return {
            statusCode: 201,
            body: JSON.stringify(user)
        };
    } catch (err) {
        if (err.code === 'ConditionalCheckFailedException') {
            return {
                statusCode: 409,
                body: JSON.stringify({ message: 'User already exists' })
            };
        }
        throw err;
    }
}

async function deleteUser(userId) {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            userId: userId
        },
        ReturnValues: 'ALL_OLD'
    };
    
    const result = await dynamodb.delete(params).promise();
    
    if (!result.Attributes) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'User not found' })
        };
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User deleted successfully' })
    };
}
```

7. Click "Deploy" to save your function.

8. Update the function's permissions:
   - Go to the "Configuration" tab
   - Click on "Permissions"
   - Click on the role name to open the IAM console
   - Click "Add permissions" > "Attach policies"
   - Search for and attach "AmazonDynamoDBFullAccess" (in a production environment, you would create a more restrictive policy)
   - Click "Attach policies"

#### Step 3: Create an API Gateway

1. Navigate to the API Gateway console.

2. Click "Create API".

3. Select "REST API" and click "Build".

4. Choose "New API" and configure:
   - API name: "UserAPI"
   - Description: "API for user management"
   - Endpoint Type: Regional

5. Click "Create API".

6. Create a resource:
   - Click "Actions" > "Create Resource"
   - Resource Name: "users"
   - Resource Path: "/users"
   - Enable API Gateway CORS: Yes
   - Click "Create Resource"

7. Create methods for the /users resource:
   - Click "Actions" > "Create Method"
   - Select "GET" from the dropdown and click the checkmark
   - Integration type: Lambda Function
   - Lambda Function: UserFunction
   - Use Default Timeout: Yes
   - Click "Save"
   
   - Click "Actions" > "Create Method"
   - Select "POST" from the dropdown and click the checkmark
   - Integration type: Lambda Function
   - Lambda Function: UserFunction
   - Use Default Timeout: Yes
   - Click "Save"

8. Create a resource for individual users:
   - Select the "/users" resource
   - Click "Actions" > "Create Resource"
   - Resource Name: "userId"
   - Resource Path: "{userId}"
   - Enable API Gateway CORS: Yes
   - Click "Create Resource"

9. Create methods for the /{userId} resource:
   - Click "Actions" > "Create Method"
   - Select "GET" from the dropdown and click the checkmark
   - Integration type: Lambda Function
   - Lambda Function: UserFunction
   - Use Default Timeout: Yes
   - Click "Save"
   
   - Click "Actions" > "Create Method"
   - Select "DELETE" from the dropdown and click the checkmark
   - Integration type: Lambda Function
   - Lambda Function: UserFunction
   - Use Default Timeout: Yes
   - Click "Save"

10. Deploy the API:
    - Click "Actions" > "Deploy API"
    - Deployment stage: [New Stage]
    - Stage name: "prod"
    - Stage description: "Production stage"
    - Click "Deploy"

11. Note the Invoke URL at the top of the stage editor. This is the base URL for your API.

#### Step 4: Test the API

You can test your API using tools like curl, Postman, or a web browser:

1. List all users (initially empty):
   ```bash
   curl https://your-api-id.execute-api.your-region.amazonaws.com/prod/users
   ```

2. Create a user:
   ```bash
   curl -X POST https://your-api-id.execute-api.your-region.amazonaws.com/prod/users \
     -H "Content-Type: application/json" \
     -d '{"userId": "1", "name": "John Doe", "email": "john@example.com"}'
   ```

3. Get a specific user:
   ```bash
   curl https://your-api-id.execute-api.your-region.amazonaws.com/prod/users/1
   ```

4. Delete a user:
   ```bash
   curl -X DELETE https://your-api-id.execute-api.your-region.amazonaws.com/prod/users/1
   ```

#### Step 5: Clean Up

To avoid incurring charges, clean up the resources you created:

1. Delete the API Gateway:
   - Navigate to the API Gateway console
   - Select your API
   - Click "Actions" > "Delete"
   - Confirm deletion

2. Delete the Lambda function:
   - Navigate to the Lambda console
   - Select your function
   - Click "Actions" > "Delete"
   - Confirm deletion

3. Delete the DynamoDB table:
   - Navigate to the DynamoDB console
   - Select your table
   - Click "Delete"
   - Confirm deletion

## Amazon ECS and EKS for Container Orchestration

Containers have revolutionized how applications are packaged, deployed, and managed. AWS offers two primary services for container orchestration: Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).

### Container Fundamentals

#### What are Containers?

Containers are lightweight, standalone, executable packages that include everything needed to run an application: code, runtime, system tools, libraries, and settings. Containers isolate applications from their environment, ensuring they work uniformly despite differences between development and staging.

Key benefits of containers include:

1. **Consistency**: Containers run the same regardless of the environment.
2. **Isolation**: Applications run in isolated environments, preventing conflicts.
3. **Efficiency**: Containers share the host OS kernel, making them more lightweight than virtual machines.
4. **Portability**: Containers can run on any system that supports the container runtime.
5. **Scalability**: Containers can be easily scaled up or down based on demand.

#### Docker Overview

Docker is the most popular containerization platform. Key Docker components include:

1. **Docker Engine**: The runtime that builds and runs containers.
2. **Docker Images**: Read-only templates used to create containers.
3. **Docker Containers**: Running instances of Docker images.
4. **Dockerfile**: A text file with instructions to build a Docker image.
5. **Docker Registry**: A repository for storing and sharing Docker images.

#### Container Orchestration

Container orchestration automates the deployment, management, scaling, and networking of containers. Key features of container orchestration platforms include:

1. **Scheduling**: Placing containers on appropriate hosts.
2. **Scaling**: Automatically adjusting the number of container instances.
3. **Load Balancing**: Distributing traffic across container instances.
4. **Service Discovery**: Enabling containers to find and communicate with each other.
5. **Rolling Updates**: Updating applications without downtime.
6. **Self-healing**: Automatically replacing failed containers.

### Amazon Elastic Container Service (ECS)

Amazon ECS is a fully managed container orchestration service that makes it easy to run, stop, and manage Docker containers on a cluster.

#### ECS Core Concepts

1. **Cluster**: A logical grouping of tasks or services.
2. **Task Definition**: A blueprint for your application, defining containers, volumes, and task settings.
3. **Task**: An instantiation of a task definition that runs one or more containers.
4. **Service**: A configuration that maintains a specified number of tasks simultaneously.
5. **Container Instance**: An EC2 instance that runs the ECS container agent and is registered to a cluster.
6. **Launch Type**: The infrastructure where your tasks and services run (EC2 or Fargate).

#### ECS Launch Types

ECS supports two launch types:

1. **EC2 Launch Type**: You manage the EC2 instances that host your containers.
   - More control over the infrastructure
   - More cost-effective for steady-state workloads
   - Requires more management overhead

2. **Fargate Launch Type**: AWS manages the infrastructure for you.
   - Serverless option with no EC2 instances to manage
   - Pay only for the resources used by your containers
   - Less control over the underlying infrastructure
   - Ideal for variable workloads

#### Creating an ECS Cluster

Here's how to create an ECS cluster using the AWS Management Console:

1. Navigate to the ECS console.
2. Click "Create Cluster".
3. Select a cluster template:
   - For EC2 launch type: "EC2 Linux + Networking"
   - For Fargate: "Networking only"
4. Configure the cluster:
   - Cluster name
   - For EC2 launch type: Instance type, number of instances, etc.
   - VPC and subnet configuration
5. Click "Create".

#### Creating a Task Definition

Here's how to create a task definition:

1. In the ECS console, navigate to "Task Definitions".
2. Click "Create new Task Definition".
3. Select a launch type compatibility (EC2 or Fargate).
4. Configure the task definition:
   - Task definition name
   - Task role (IAM role for the task)
   - Network mode
   - Task execution role
   - Task size (CPU and memory)
5. Add container definitions:
   - Container name
   - Image (e.g., docker.io/nginx:latest)
   - Memory limits
   - Port mappings
   - Environment variables
   - Health check
6. Configure additional settings as needed.
7. Click "Create".

#### Creating an ECS Service

Here's how to create an ECS service:

1. In the ECS console, navigate to your cluster.
2. Click "Create" under the "Services" tab.
3. Configure the service:
   - Launch type (EC2 or Fargate)
   - Task definition and revision
   - Service name
   - Number of tasks
   - Deployment type (Rolling update or Blue/green deployment)
4. Configure networking:
   - VPC and subnets
   - Security groups
   - Load balancer (optional)
5. Configure auto scaling (optional).
6. Review and create the service.

#### ECS Service Auto Scaling

ECS services can be configured to automatically scale based on metrics like CPU utilization, memory utilization, or custom metrics. Auto scaling can be configured through:

1. **Target Tracking Scaling**: Maintain a specific metric at a target value.
2. **Step Scaling**: Add or remove tasks based on alarm thresholds.
3. **Scheduled Scaling**: Scale based on predictable load changes.

#### ECS Task Placement Strategies

ECS offers several task placement strategies for the EC2 launch type:

1. **Binpack**: Place tasks on instances to leave the least amount of unused CPU or memory.
2. **Random**: Place tasks randomly.
3. **Spread**: Place tasks evenly based on a specified value, such as instance ID or availability zone.

#### ECS Security Best Practices

1. **Use IAM Roles**: Use task roles to grant permissions to your containers.
2. **Secure Container Images**: Use trusted images and scan for vulnerabilities.
3. **Network Security**: Use security groups and network ACLs to control traffic.
4. **Secrets Management**: Use AWS Secrets Manager or Parameter Store for sensitive data.
5. **Logging and Monitoring**: Enable CloudWatch Logs and use Container Insights.

### Amazon Elastic Kubernetes Service (EKS)

Amazon EKS is a managed service that makes it easy to run Kubernetes on AWS without needing to install, operate, and maintain your own Kubernetes control plane.

#### Kubernetes Overview

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Key Kubernetes components include:

1. **Control Plane**: Manages the Kubernetes cluster.
   - API Server: Entry point for all REST commands
   - etcd: Distributed key-value store for cluster data
   - Scheduler: Assigns pods to nodes
   - Controller Manager: Runs controller processes
   - Cloud Controller Manager: Interacts with the underlying cloud provider

2. **Nodes**: Worker machines that run containerized applications.
   - Kubelet: Ensures containers are running in a pod
   - Kube-proxy: Maintains network rules on nodes
   - Container Runtime: Software responsible for running containers (e.g., Docker)

3. **Pods**: The smallest deployable units in Kubernetes, containing one or more containers.

4. **Services**: An abstraction that defines a logical set of pods and a policy to access them.

5. **Deployments**: Provide declarative updates for pods and replica sets.

6. **Namespaces**: Virtual clusters within a physical cluster.

#### EKS Architecture

Amazon EKS runs the Kubernetes control plane across multiple AWS Availability Zones, automatically detecting and replacing unhealthy control plane nodes. Key components include:

1. **EKS Control Plane**: Managed by AWS, includes the Kubernetes API server, etcd, and other control plane components.

2. **Worker Nodes**: EC2 instances that run your containers. Can be managed using:
   - Self-managed nodes: You create and manage the EC2 instances
   - Managed node groups: EKS provisions and manages the EC2 instances
   - Fargate: Serverless compute for Kubernetes pods

3. **VPC CNI Plugin**: Enables pod networking within your VPC.

4. **AWS IAM Authenticator**: Integrates Kubernetes RBAC with AWS IAM.

#### Creating an EKS Cluster

Here's how to create an EKS cluster using the AWS Management Console:

1. Navigate to the EKS console.
2. Click "Create cluster".
3. Configure the cluster:
   - Name
   - Kubernetes version
   - Role for the EKS service
   - VPC and subnets
   - Security groups
   - Cluster endpoint access
4. Configure logging (optional).
5. Review and create the cluster.

After the cluster is created, you need to add worker nodes:

1. In the EKS console, select your cluster.
2. Navigate to the "Compute" tab.
3. Click "Add node group" or "Add Fargate profile".
4. Configure the node group or Fargate profile.
5. Review and create.

#### Connecting to an EKS Cluster

To connect to an EKS cluster, you need to:

1. Install the AWS CLI, kubectl, and aws-iam-authenticator.
2. Configure kubectl to use your EKS cluster:

```bash
aws eks update-kubeconfig --name your-cluster-name --region your-region
```

3. Verify the connection:

```bash
kubectl get nodes
```

#### Deploying Applications to EKS

You can deploy applications to EKS using Kubernetes manifests or Helm charts:

1. Using kubectl:

```bash
# Deploy a simple application
kubectl apply -f https://k8s.io/examples/application/deployment.yaml

# Check the deployment
kubectl get deployments

# Expose the deployment as a service
kubectl expose deployment nginx-deployment --type=LoadBalancer --port=80

# Check the service
kubectl get services
```

2. Using Helm:

```bash
# Add a Helm repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Install a chart
helm install my-release bitnami/nginx

# Check the release
helm list
```

#### EKS Security Best Practices

1. **Use IAM Roles for Service Accounts (IRSA)**: Integrate Kubernetes service accounts with AWS IAM roles.
2. **Network Security**: Use security groups, network policies, and VPC CNI security.
3. **Pod Security Policies**: Enforce security standards for pods.
4. **Secrets Management**: Use AWS Secrets Manager or Parameter Store for sensitive data.
5. **Logging and Monitoring**: Enable control plane logging and use CloudWatch Container Insights.
6. **Regular Updates**: Keep your EKS cluster and worker nodes updated.

### AWS Fargate

AWS Fargate is a serverless compute engine for containers that works with both ECS and EKS. With Fargate, you don't need to provision, configure, or scale clusters of virtual machines to run containers.

#### Fargate vs. EC2 Launch Type

| Aspect | Fargate | EC2 Launch Type |
|--------|---------|----------------|
| Infrastructure Management | AWS manages the infrastructure | You manage the EC2 instances |
| Pricing | Pay for the vCPU and memory resources used by your containers | Pay for the EC2 instances regardless of container utilization |
| Scaling | Scales at the task level | Scales at the instance level |
| Control | Less control over the underlying infrastructure | More control over the infrastructure |
| Use Cases | Variable workloads, microservices, batch processing | Steady-state workloads, applications requiring GPU, specific instance types |

#### Using Fargate with ECS

To use Fargate with ECS:

1. Create a task definition with Fargate compatibility.
2. Create a cluster with the "Networking only" template.
3. Create a service or run a task with the Fargate launch type.

#### Using Fargate with EKS

To use Fargate with EKS:

1. Create an EKS cluster.
2. Create a Fargate profile, specifying namespaces and labels for pods that should run on Fargate.
3. Deploy applications that match the Fargate profile criteria.

### Hands-On Lab: Deploying a Containerized Application with ECS

In this lab, we'll deploy a simple containerized web application using Amazon ECS with the Fargate launch type.

#### Prerequisites

- An AWS account
- Basic knowledge of Docker and containers

#### Step 1: Create a Task Definition

1. Navigate to the ECS console.

2. Click on "Task Definitions" in the left sidebar, then click "Create new Task Definition".

3. Select "Fargate" as the launch type compatibility.

4. Configure the task definition:
   - Task Definition Name: "web-app"
   - Task Role: Create a new role or select an existing one
   - Network Mode: "awsvpc" (default for Fargate)
   - Task Execution Role: Create a new role or select an existing one
   - Task Size: 0.5 vCPU, 1 GB memory

5. Click "Add container":
   - Container name: "web-app"
   - Image: "amazon/amazon-ecs-sample"
   - Port mappings: 80
   - Keep the default values for the rest

6. Click "Add" to add the container to the task definition.

7. Click "Create" to create the task definition.

#### Step 2: Create an ECS Cluster

1. In the ECS console, click on "Clusters" in the left sidebar, then click "Create Cluster".

2. Select "Networking only" (for Fargate).

3. Configure the cluster:
   - Cluster name: "web-app-cluster"
   - Keep the default values for the rest

4. Click "Create" to create the cluster.

#### Step 3: Create a Service

1. In the ECS console, navigate to your cluster.

2. Click on the "Services" tab, then click "Create".

3. Configure the service:
   - Launch type: "FARGATE"
   - Task Definition: Select the task definition you created
   - Service name: "web-app-service"
   - Number of tasks: 2
   - Deployment type: "Rolling update"

4. Configure networking:
   - VPC: Select your default VPC
   - Subnets: Select at least two subnets
   - Security groups: Create a new security group with inbound rule for HTTP (port 80)
   - Auto-assign public IP: "ENABLED"

5. Skip load balancing for this lab.

6. Skip service auto scaling for this lab.

7. Review and click "Create Service".

#### Step 4: Access the Application

1. Wait for the service to be created and the tasks to reach the "RUNNING" state.

2. In the ECS console, navigate to your cluster, then to the "Tasks" tab.

3. Click on a running task to view its details.

4. Find the "Public IP" in the "Network" section.

5. Open a web browser and navigate to the public IP address. You should see the Amazon ECS sample application.

#### Step 5: Scale the Service

1. In the ECS console, navigate to your cluster, then to the "Services" tab.

2. Select your service and click "Update".

3. Change the "Number of tasks" to 4.

4. Click "Skip to review" and then "Update Service".

5. Monitor the service as it scales up to 4 tasks.

#### Step 6: Clean Up

To avoid incurring charges, clean up the resources you created:

1. In the ECS console, navigate to your cluster, then to the "Services" tab.

2. Select your service and click "Delete".

3. Confirm deletion and wait for the service to be deleted.

4. Navigate to the "Clusters" tab, select your cluster, and click "Delete Cluster".

5. Confirm deletion and wait for the cluster to be deleted.

6. Navigate to the "Task Definitions" tab, select your task definition, click "Deregister", and confirm.

## AWS Elastic Beanstalk for Application Deployment

AWS Elastic Beanstalk is a Platform as a Service (PaaS) that makes it easy to deploy, run, and scale web applications and services. It handles the infrastructure provisioning, load balancing, auto-scaling, and application health monitoring, allowing developers to focus on writing code.

### Elastic Beanstalk Fundamentals

#### How Elastic Beanstalk Works

Elastic Beanstalk automates the deployment process, from capacity provisioning and load balancing to auto-scaling and application health monitoring. When you deploy an application, Elastic Beanstalk:

1. Creates the necessary AWS resources (e.g., EC2 instances, security groups, load balancers)
2. Deploys your application code
3. Configures the environment based on your settings
4. Monitors the health of the application

#### Elastic Beanstalk Components

1. **Application**: A logical collection of Elastic Beanstalk components, including environments, versions, and environment configurations.

2. **Application Version**: A specific labeled iteration of deployable code for a web application.

3. **Environment**: A version that is deployed onto AWS resources. Each environment runs only one application version at a time.

4. **Environment Tier**: Determines the type of application that the environment runs:
   - Web server tier: For HTTP requests
   - Worker tier: For background processing tasks

5. **Environment Configuration**: A collection of parameters and settings that define how an environment and its resources behave.

#### Supported Platforms

Elastic Beanstalk supports various platforms:

1. **Docker**: Deploy containerized applications
2. **Node.js**: Deploy Node.js applications
3. **PHP**: Deploy PHP applications
4. **Python**: Deploy Python applications
5. **Ruby**: Deploy Ruby applications
6. **Java**: Deploy Java applications on Tomcat or with JAR files
7. **.NET**: Deploy .NET applications on Windows Server
8. **Go**: Deploy Go applications

### Creating and Deploying Applications with Elastic Beanstalk

#### Using the AWS Management Console

1. Navigate to the Elastic Beanstalk console.
2. Click "Create Application".
3. Configure the application:
   - Application name
   - Platform
   - Application code (upload your code or use a sample application)
4. Configure service access:
   - Create a new service role or use an existing one
   - Create a new EC2 instance profile or use an existing one
5. Configure additional options (optional):
   - Instance type
   - VPC
   - Environment variables
   - Monitoring
6. Click "Create application".

#### Using the AWS CLI

1. Initialize your application:

```bash
eb init -p python-3.8 my-app
```

2. Create an environment and deploy your application:

```bash
eb create my-app-env
```

3. Update your application:

```bash
eb deploy
```

4. Open your application in a browser:

```bash
eb open
```

5. View the status of your environment:

```bash
eb status
```

6. View the logs:

```bash
eb logs
```

7. Terminate the environment when you're done:

```bash
eb terminate my-app-env
```

#### Using the Elastic Beanstalk CLI with Docker

1. Create a Dockerfile in your application directory:

```dockerfile
FROM python:3.8

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

2. Initialize your application:

```bash
eb init -p docker my-docker-app
```

3. Create an environment and deploy your application:

```bash
eb create my-docker-env
```

### Configuring Elastic Beanstalk Environments

#### Environment Configuration

You can configure your Elastic Beanstalk environment through:

1. **Configuration files**: `.ebextensions` directory in your application source bundle
2. **Environment variables**: Set in the Elastic Beanstalk console or using the CLI
3. **Configuration options**: Set in the Elastic Beanstalk console or using the CLI

#### Configuration Files (.ebextensions)

Configuration files are YAML or JSON files that define how Elastic Beanstalk configures your environment. They are placed in a directory called `.ebextensions` in the root of your application source bundle.

Example configuration file (`example.config`):

```yaml
option_settings:
  aws:elasticbeanstalk:application:environment:
    DB_HOST: mydb.example.com
    DB_PORT: 3306
  aws:autoscaling:launchconfiguration:
    InstanceType: t2.micro
    SecurityGroups: sg-12345678

Resources:
  AWSEBAutoScalingGroup:
    Type: "AWS::AutoScaling::AutoScalingGroup"
    Properties:
      HealthCheckType: ELB
      HealthCheckGracePeriod: 300
```

#### Environment Variables

Environment variables can be set in the Elastic Beanstalk console or using the CLI:

```bash
eb setenv DB_HOST=mydb.example.com DB_PORT=3306
```

#### Saved Configurations

You can save environment configurations for reuse:

1. In the Elastic Beanstalk console, navigate to your environment.
2. Click "Actions" > "Save Configuration".
3. Provide a name and description for the configuration.
4. Click "Save".

To apply a saved configuration:

1. In the Elastic Beanstalk console, navigate to your environment.
2. Click "Actions" > "Load Configuration".
3. Select the saved configuration.
4. Click "Load".

### Elastic Beanstalk Deployment Strategies

Elastic Beanstalk supports several deployment strategies:

1. **All at once**: Deploy the new version to all instances simultaneously.
   - Fastest deployment
   - Application will be unavailable during deployment
   - If the deployment fails, you need to redeploy the previous version

2. **Rolling**: Deploy the new version in batches.
   - Application will be available during deployment, but with reduced capacity
   - If the deployment fails, you need to perform a rolling update to roll back

3. **Rolling with additional batch**: Launch a new batch of instances, then perform a rolling deployment.
   - Application will be available during deployment with full capacity
   - More expensive as it requires additional instances
   - If the deployment fails, you need to perform a rolling update to roll back

4. **Immutable**: Launch a new set of instances with the new version, then swap them with the old instances.
   - Application will be available during deployment with full capacity
   - Safest deployment method
   - More expensive as it requires a full set of new instances
   - If the deployment fails, you can terminate the new instances

5. **Traffic splitting**: Deploy the new version to a new set of instances and split traffic between the old and new versions.
   - Allows you to test the new version with a percentage of traffic
   - Requires an Application Load Balancer
   - If the deployment fails, you can route all traffic back to the old version

### Elastic Beanstalk Monitoring and Logging

#### Monitoring with CloudWatch

Elastic Beanstalk automatically integrates with Amazon CloudWatch to monitor your application's health and performance. You can:

1. View basic metrics in the Elastic Beanstalk console
2. Set up CloudWatch alarms for specific metrics
3. Use CloudWatch Logs to view application logs

#### Enhanced Health Reporting

Elastic Beanstalk provides enhanced health reporting, which gives you more detailed information about the health of your environment:

1. **Basic Health**: Reports on instance health based on EC2 status checks
2. **Enhanced Health**: Reports on application health based on various factors, including:
   - CPU utilization
   - Memory utilization
   - Network performance
   - HTTP request success rate
   - Application latency

To enable enhanced health reporting:

1. In the Elastic Beanstalk console, navigate to your environment.
2. Click "Configuration" > "Monitoring".
3. Set "Health reporting system" to "Enhanced".
4. Click "Apply".

#### Viewing Logs

You can view logs for your Elastic Beanstalk environment in several ways:

1. **Elastic Beanstalk console**: Navigate to your environment, click "Logs", and request logs.
2. **EB CLI**: Use the `eb logs` command.
3. **CloudWatch Logs**: If you've enabled CloudWatch Logs integration, you can view logs in the CloudWatch console.

To enable CloudWatch Logs integration:

1. In the Elastic Beanstalk console, navigate to your environment.
2. Click "Configuration" > "Software".
3. Under "CloudWatch Logs", enable "Log streaming".
4. Click "Apply".

### Elastic Beanstalk Best Practices

1. **Use Version Control**: Store your application code in a version control system.

2. **Use Configuration Files**: Use `.ebextensions` to configure your environment.

3. **Separate Environments**: Use separate environments for development, testing, and production.

4. **Use Environment Variables**: Store configuration values as environment variables.

5. **Enable Enhanced Health Reporting**: For better monitoring of your application's health.

6. **Enable CloudWatch Logs**: For centralized logging.

7. **Use a Custom Domain**: Set up a custom domain name for your production environment.

8. **Implement Blue/Green Deployments**: Use immutable deployments or traffic splitting for zero-downtime deployments.

9. **Regularly Clean Up**: Delete unused application versions and environments.

10. **Back Up Your Data**: Elastic Beanstalk doesn't back up your data automatically.

### Hands-On Lab: Deploying a Web Application with Elastic Beanstalk

In this lab, we'll deploy a simple Python web application using AWS Elastic Beanstalk.

#### Prerequisites

- An AWS account
- Basic knowledge of Python
- AWS CLI and EB CLI installed (optional)

#### Step 1: Create a Simple Python Web Application

1. Create a new directory for your application:

```bash
mkdir eb-python-app
cd eb-python-app
```

2. Create a virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Create a requirements.txt file:

```
Flask==2.0.1
```

4. Install the dependencies:

```bash
pip install -r requirements.txt
```

5. Create an application.py file:

```python
from flask import Flask

application = Flask(__name__)

@application.route('/')
def hello():
    return '<h1>Hello, Elastic Beanstalk!</h1>'

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=8000)
```

6. Create a .ebignore file to exclude unnecessary files:

```
venv/
__pycache__/
*.pyc
```

#### Step 2: Deploy the Application Using the AWS Management Console

1. Navigate to the Elastic Beanstalk console.

2. Click "Create Application".

3. Configure the application:
   - Application name: "eb-python-app"
   - Platform: "Python"
   - Platform branch: "Python 3.8"
   - Platform version: The latest version
   - Application code: "Upload your code"
   - Upload a ZIP file of your application directory (excluding the files in .ebignore)

4. Click "Create application".

5. Wait for the environment to be created and the application to be deployed.

6. Once the environment is ready, click the URL to access your application.

#### Step 3: Deploy the Application Using the EB CLI (Alternative)

1. Initialize your EB CLI repository:

```bash
eb init
```

2. Follow the prompts:
   - Select a region
   - Enter your AWS credentials (if not already configured)
   - Enter an application name
   - Select Python as the platform
   - Select the Python version
   - Choose whether to use CodeCommit (no for this lab)
   - Choose whether to set up SSH (optional)

3. Create an environment and deploy your application:

```bash
eb create eb-python-env
```

4. Wait for the environment to be created and the application to be deployed.

5. Open your application in a browser:

```bash
eb open
```

#### Step 4: Update the Application

1. Modify the application.py file:

```python
from flask import Flask, request

application = Flask(__name__)

@application.route('/')
def hello():
    user_agent = request.headers.get('User-Agent')
    return f'<h1>Hello, Elastic Beanstalk!</h1><p>Your user agent is: {user_agent}</p>'

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=8000)
```

2. Deploy the updated application:

If using the AWS Management Console:
   - Navigate to your environment
   - Click "Upload and deploy"
   - Upload a ZIP file of your updated application
   - Click "Deploy"

If using the EB CLI:
```bash
eb deploy
```

3. Wait for the deployment to complete and verify the changes.

#### Step 5: Configure Environment Variables

1. In the Elastic Beanstalk console, navigate to your environment.

2. Click "Configuration" > "Software".

3. Under "Environment properties", add a new property:
   - Name: "APP_COLOR"
   - Value: "blue"

4. Click "Apply".

5. Update your application.py file to use the environment variable:

```python
import os
from flask import Flask, request

application = Flask(__name__)

@application.route('/')
def hello():
    user_agent = request.headers.get('User-Agent')
    app_color = os.environ.get('APP_COLOR', 'default')
    return f'''
    <h1 style="color: {app_color};">Hello, Elastic Beanstalk!</h1>
    <p>Your user agent is: {user_agent}</p>
    <p>App color: {app_color}</p>
    '''

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=8000)
```

6. Deploy the updated application and verify that the heading is blue.

#### Step 6: Clean Up

To avoid incurring charges, clean up the resources you created:

1. In the Elastic Beanstalk console, navigate to your application.

2. Click "Actions" > "Terminate environment".

3. Confirm termination and wait for the environment to be terminated.

4. Once the environment is terminated, click "Actions" > "Delete application".

5. Confirm deletion.

If using the EB CLI:
```bash
eb terminate eb-python-env
```

## Summary

In this chapter, we've explored AWS compute services, which form the backbone of cloud infrastructure. We've covered:

1. **Amazon EC2**: Virtual servers in the cloud, providing resizable compute capacity. We learned about instance types, purchasing options, auto scaling, and load balancing.

2. **AWS Lambda**: Serverless compute service that runs code in response to events without provisioning or managing servers. We explored Lambda functions, event sources, and the serverless execution model.

3. **Amazon ECS and EKS**: Container orchestration services for Docker containers. We discussed container fundamentals, ECS concepts, EKS architecture, and AWS Fargate.

4. **AWS Elastic Beanstalk**: Platform as a Service (PaaS) for deploying and scaling web applications and services. We covered deployment strategies, configuration options, and monitoring.

Through hands-on labs, we've gained practical experience with these services, learning how to deploy and manage applications using different compute options.

Key takeaways from this chapter:

1. AWS offers a variety of compute services to meet different requirements, from traditional virtual machines to serverless computing and container orchestration.

2. Choosing the right compute service depends on factors like application architecture, operational overhead, scalability requirements, cost considerations, and performance needs.

3. EC2 provides the most control and flexibility but requires more management overhead.

4. Lambda offers a serverless option with automatic scaling and pay-per-use pricing, ideal for event-driven applications.

5. ECS and EKS provide container orchestration capabilities, with ECS being more AWS-native and EKS offering Kubernetes compatibility.

6. Elastic Beanstalk simplifies application deployment and management, handling the infrastructure provisioning, load balancing, auto-scaling, and monitoring.

In the next chapter, we'll explore AWS storage services, including Amazon S3, EBS, EFS, and more.

## Additional Resources

- [Amazon EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [Amazon ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Amazon EKS Documentation](https://docs.aws.amazon.com/eks/)
- [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [AWS Compute Blog](https://aws.amazon.com/blogs/compute/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
