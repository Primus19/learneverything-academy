# Infrastructure as Code with AWS CloudFormation and Terraform

In this chapter, we'll explore Infrastructure as Code (IaC) tools that allow you to define and provision your AWS infrastructure using code. Understanding these tools is essential for creating reproducible, version-controlled, and automated infrastructure deployments. We'll cover AWS CloudFormation and Terraform, two of the most popular IaC tools for AWS.

## Introduction to Infrastructure as Code

Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through machine-readable definition files, rather than through physical hardware configuration or interactive configuration tools. IaC allows you to:

- **Automate infrastructure provisioning**: Deploy infrastructure with minimal manual intervention.
- **Version control infrastructure**: Track changes to your infrastructure over time.
- **Ensure consistency**: Deploy identical environments for development, testing, and production.
- **Improve collaboration**: Share infrastructure definitions with team members.
- **Implement infrastructure testing**: Test infrastructure changes before deploying to production.
- **Enable disaster recovery**: Quickly rebuild infrastructure in case of failure.

Let's explore the two most popular IaC tools for AWS: CloudFormation and Terraform.

## AWS CloudFormation

AWS CloudFormation is a service that helps you model and set up your AWS resources so you can spend less time managing those resources and more time focusing on your applications. You create a template that describes all the AWS resources that you want, and CloudFormation takes care of provisioning and configuring those resources for you.

### Key Concepts

- **Template**: A JSON or YAML file that describes the AWS resources and their properties.
- **Stack**: A collection of AWS resources that you can manage as a single unit.
- **Change Set**: A summary of proposed changes to a stack that allows you to see how changes might impact your running resources.
- **Stack Set**: A feature that enables you to create, update, or delete stacks across multiple accounts and regions with a single operation.
- **Drift Detection**: A feature that detects when a stack's actual configuration differs from its expected configuration.
- **Resource**: An AWS component that CloudFormation can provision and manage.
- **Parameter**: A value that you can pass to a template at runtime.
- **Output**: A value that is returned by a template.
- **Mapping**: A way to look up values based on a key.
- **Condition**: A statement that determines whether a resource is created or a property is defined.
- **Pseudo Parameter**: A predefined parameter that is available to all CloudFormation templates.

### Hands-on Lab: Creating a Basic CloudFormation Template

Let's create a CloudFormation template to provision a simple web server.

#### Step 1: Create a CloudFormation Template

Create a file named `web-server.yaml` with the following content:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'A simple EC2 instance with a security group'

Parameters:
  InstanceType:
    Description: EC2 instance type
    Type: String
    Default: t2.micro
    AllowedValues:
      - t2.micro
      - t2.small
      - t2.medium
    ConstraintDescription: Must be a valid EC2 instance type.
  
  KeyName:
    Description: Name of an existing EC2 KeyPair to enable SSH access
    Type: AWS::EC2::KeyPair::KeyName
    ConstraintDescription: Must be the name of an existing EC2 KeyPair.

  SSHLocation:
    Description: The IP address range that can SSH to the EC2 instance
    Type: String
    Default: 0.0.0.0/0
    AllowedPattern: (\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/(\d{1,2})
    ConstraintDescription: Must be a valid IP CIDR range of the form x.x.x.x/x.

Resources:
  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP and SSH access
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: !Ref SSHLocation

  WebServerInstance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      SecurityGroups:
        - !Ref WebServerSecurityGroup
      KeyName: !Ref KeyName
      ImageId: ami-0c55b159cbfafe1f0  # Amazon Linux 2 AMI in us-east-1
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash -xe
          yum update -y
          yum install -y httpd
          systemctl start httpd
          systemctl enable httpd
          echo "<html><body><h1>Hello, World!</h1></body></html>" > /var/www/html/index.html

Outputs:
  WebsiteURL:
    Description: URL for the web server
    Value: !Sub http://${WebServerInstance.PublicDnsName}
```

#### Step 2: Deploy the CloudFormation Stack

1. Navigate to the CloudFormation console.
2. Click "Create stack" > "With new resources (standard)".
3. Select "Upload a template file" and upload your `web-server.yaml` file.
4. Click "Next".
5. Enter a stack name (e.g., "WebServerStack").
6. Configure the parameters:
   - InstanceType: t2.micro
   - KeyName: Select an existing key pair
   - SSHLocation: Your IP address or 0.0.0.0/0 (not recommended for production)
7. Click "Next".
8. Configure stack options (tags, permissions, etc.) as needed.
9. Click "Next".
10. Review the stack details and click "Create stack".
11. Wait for the stack creation to complete.

#### Step 3: Access the Web Server

1. Once the stack is created, go to the "Outputs" tab.
2. Click on the WebsiteURL link to access your web server.
3. You should see the "Hello, World!" message.

#### Step 4: Update the Stack

Let's update the stack to add a second EC2 instance and an Elastic Load Balancer.

Modify your `web-server.yaml` file:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'A web server with an Elastic Load Balancer'

Parameters:
  InstanceType:
    Description: EC2 instance type
    Type: String
    Default: t2.micro
    AllowedValues:
      - t2.micro
      - t2.small
      - t2.medium
    ConstraintDescription: Must be a valid EC2 instance type.
  
  KeyName:
    Description: Name of an existing EC2 KeyPair to enable SSH access
    Type: AWS::EC2::KeyPair::KeyName
    ConstraintDescription: Must be the name of an existing EC2 KeyPair.

  SSHLocation:
    Description: The IP address range that can SSH to the EC2 instance
    Type: String
    Default: 0.0.0.0/0
    AllowedPattern: (\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/(\d{1,2})
    ConstraintDescription: Must be a valid IP CIDR range of the form x.x.x.x/x.

Resources:
  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP and SSH access
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: !Ref SSHLocation

  ELBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP access to ELB
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0

  WebServerInstance1:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      SecurityGroups:
        - !Ref WebServerSecurityGroup
      KeyName: !Ref KeyName
      ImageId: ami-0c55b159cbfafe1f0  # Amazon Linux 2 AMI in us-east-1
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash -xe
          yum update -y
          yum install -y httpd
          systemctl start httpd
          systemctl enable httpd
          echo "<html><body><h1>Hello from Instance 1!</h1></body></html>" > /var/www/html/index.html

  WebServerInstance2:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      SecurityGroups:
        - !Ref WebServerSecurityGroup
      KeyName: !Ref KeyName
      ImageId: ami-0c55b159cbfafe1f0  # Amazon Linux 2 AMI in us-east-1
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash -xe
          yum update -y
          yum install -y httpd
          systemctl start httpd
          systemctl enable httpd
          echo "<html><body><h1>Hello from Instance 2!</h1></body></html>" > /var/www/html/index.html

  ElasticLoadBalancer:
    Type: AWS::ElasticLoadBalancing::LoadBalancer
    Properties:
      SecurityGroups:
        - !Ref ELBSecurityGroup
      Listeners:
        - LoadBalancerPort: 80
          InstancePort: 80
          Protocol: HTTP
      HealthCheck:
        Target: HTTP:80/
        HealthyThreshold: 3
        UnhealthyThreshold: 5
        Interval: 30
        Timeout: 5
      Instances:
        - !Ref WebServerInstance1
        - !Ref WebServerInstance2

Outputs:
  WebsiteURL:
    Description: URL for the web server
    Value: !Sub http://${ElasticLoadBalancer.DNSName}
```

Update the stack:
1. Navigate to the CloudFormation console.
2. Select your stack.
3. Click "Update".
4. Select "Replace current template".
5. Upload the updated template.
6. Click "Next" through the wizard, making any necessary changes to parameters.
7. Click "Update stack".
8. Wait for the update to complete.
9. Access the new WebsiteURL from the Outputs tab.

#### Step 5: Delete the Stack

When you're done, delete the stack to avoid incurring charges:
1. Navigate to the CloudFormation console.
2. Select your stack.
3. Click "Delete".
4. Confirm the deletion.
5. Wait for the stack deletion to complete.

### CloudFormation Best Practices

1. **Use version control**: Store your templates in a version control system like Git.
2. **Validate templates**: Use the `aws cloudformation validate-template` command to check for syntax errors.
3. **Use parameters**: Make your templates reusable by parameterizing values.
4. **Use conditions**: Make your templates adaptable to different environments.
5. **Use mappings**: Define lookup tables for values that vary by region or environment.
6. **Use nested stacks**: Break down complex templates into smaller, reusable components.
7. **Use stack policies**: Protect critical resources from accidental updates or deletions.
8. **Use change sets**: Preview changes before applying them.
9. **Use drift detection**: Ensure your resources match your template.
10. **Use stack outputs**: Share information between stacks.

### Advanced CloudFormation Features

#### Nested Stacks

Nested stacks allow you to compose complex templates from smaller, reusable templates. Here's an example:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Parent stack that creates nested stacks'

Resources:
  NetworkStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/bucket-name/network.yaml
      Parameters:
        VpcCidr: 10.0.0.0/16

  WebServerStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/bucket-name/web-server.yaml
      Parameters:
        VpcId: !GetAtt NetworkStack.Outputs.VpcId
        SubnetId: !GetAtt NetworkStack.Outputs.SubnetId
```

#### Custom Resources

Custom resources enable you to write custom provisioning logic that CloudFormation runs when you create, update, or delete stacks. Here's an example:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Template with a custom resource'

Resources:
  MyCustomResource:
    Type: Custom::MyCustomResource
    Properties:
      ServiceToken: !GetAtt MyLambdaFunction.Arn
      CustomProperty1: value1
      CustomProperty2: value2

  MyLambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          import json
          import boto3
          import cfnresponse

          def handler(event, context):
              print('Received event: ' + json.dumps(event))
              
              response_data = {}
              
              try:
                  if event['RequestType'] == 'Create':
                      # Add create logic here
                      response_data['Message'] = 'Resource created'
                  elif event['RequestType'] == 'Update':
                      # Add update logic here
                      response_data['Message'] = 'Resource updated'
                  elif event['RequestType'] == 'Delete':
                      # Add delete logic here
                      response_data['Message'] = 'Resource deleted'
                  
                  cfnresponse.send(event, context, cfnresponse.SUCCESS, response_data)
              except Exception as e:
                  print(e)
                  cfnresponse.send(event, context, cfnresponse.FAILED, {})
      Runtime: python3.9
      Timeout: 30
```

#### Macros

Macros enable you to perform custom processing on templates, from simple actions like find-and-replace operations to complex transformations. Here's an example:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Template with a macro'

Transform: MyMacro

Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-bucket
```

#### StackSets

StackSets allow you to create, update, or delete stacks across multiple accounts and regions with a single operation. Here's an example:

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Template for creating a StackSet'

Resources:
  MyStackSet:
    Type: AWS::CloudFormation::StackSet
    Properties:
      StackSetName: MyStackSet
      Description: StackSet for deploying S3 buckets
      TemplateBody: |
        AWSTemplateFormatVersion: '2010-09-09'
        Description: 'Template for creating an S3 bucket'
        Resources:
          MyBucket:
            Type: AWS::S3::Bucket
            Properties:
              BucketName: !Sub my-bucket-${AWS::AccountId}-${AWS::Region}
      PermissionModel: SELF_MANAGED
      AdministrationRoleARN: arn:aws:iam::123456789012:role/AWSCloudFormationStackSetAdministrationRole
      ExecutionRoleName: AWSCloudFormationStackSetExecutionRole
      StackInstancesGroup:
        - Regions:
            - us-east-1
            - us-west-2
          DeploymentTargets:
            Accounts:
              - 123456789012
              - 234567890123
```

## Terraform

Terraform is an open-source infrastructure as code software tool created by HashiCorp. It allows users to define and provision infrastructure using a declarative configuration language called HashiCorp Configuration Language (HCL).

### Key Concepts

- **Provider**: A plugin that interacts with a specific cloud or service provider.
- **Resource**: An infrastructure object that Terraform manages.
- **Data Source**: A read-only view of existing resources.
- **Module**: A reusable collection of resources.
- **State**: A file that maps real-world resources to your configuration.
- **Plan**: A preview of changes that Terraform will make.
- **Apply**: The action of creating, updating, or deleting resources.
- **Output**: A value that is returned by a Terraform configuration.
- **Variable**: A parameter that can be passed to a Terraform configuration.
- **Local**: A local value that can be used within a Terraform configuration.
- **Backend**: Where Terraform stores its state file.

### Hands-on Lab: Creating a Basic Terraform Configuration

Let's create a Terraform configuration to provision a simple web server.

#### Step 1: Install Terraform

1. Download Terraform from the [official website](https://www.terraform.io/downloads.html).
2. Extract the binary to a directory in your PATH.
3. Verify the installation:

```bash
terraform version
```

#### Step 2: Create a Terraform Configuration

Create a file named `main.tf` with the following content:

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "web_server" {
  name        = "web-server-sg"
  description = "Allow HTTP and SSH traffic"

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
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI in us-east-1
  instance_type = "t2.micro"
  key_name      = "your-key-pair"  # Replace with your key pair name

  security_groups = [aws_security_group.web_server.name]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<html><body><h1>Hello, World!</h1></body></html>" > /var/www/html/index.html
              EOF

  tags = {
    Name = "web-server"
  }
}

output "website_url" {
  value = "http://${aws_instance.web_server.public_dns}"
}
```

#### Step 3: Initialize Terraform

```bash
terraform init
```

This command initializes the working directory, downloads the AWS provider, and prepares Terraform to run.

#### Step 4: Create a Terraform Plan

```bash
terraform plan
```

This command creates an execution plan, showing what actions Terraform will take to create your infrastructure.

#### Step 5: Apply the Terraform Configuration

```bash
terraform apply
```

This command applies the changes required to reach the desired state of the configuration. You'll be prompted to confirm the action.

#### Step 6: Access the Web Server

After Terraform completes, it will output the website URL. Open this URL in a web browser to see your web server in action.

#### Step 7: Update the Terraform Configuration

Let's update the configuration to add a second EC2 instance and an Elastic Load Balancer.

Modify your `main.tf` file:

```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "web_server" {
  name        = "web-server-sg"
  description = "Allow HTTP and SSH traffic"

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
}

resource "aws_security_group" "elb" {
  name        = "elb-sg"
  description = "Allow HTTP traffic to ELB"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web_server_1" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI in us-east-1
  instance_type = "t2.micro"
  key_name      = "your-key-pair"  # Replace with your key pair name

  security_groups = [aws_security_group.web_server.name]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<html><body><h1>Hello from Instance 1!</h1></body></html>" > /var/www/html/index.html
              EOF

  tags = {
    Name = "web-server-1"
  }
}

resource "aws_instance" "web_server_2" {
  ami           = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI in us-east-1
  instance_type = "t2.micro"
  key_name      = "your-key-pair"  # Replace with your key pair name

  security_groups = [aws_security_group.web_server.name]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<html><body><h1>Hello from Instance 2!</h1></body></html>" > /var/www/html/index.html
              EOF

  tags = {
    Name = "web-server-2"
  }
}

resource "aws_elb" "web_elb" {
  name               = "web-elb"
  security_groups    = [aws_security_group.elb.id]
  availability_zones = ["us-east-1a", "us-east-1b"]

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }

  instances                   = [aws_instance.web_server_1.id, aws_instance.web_server_2.id]
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400
}

output "website_url" {
  value = "http://${aws_elb.web_elb.dns_name}"
}
```

Apply the updated configuration:

```bash
terraform apply
```

#### Step 8: Destroy the Infrastructure

When you're done, destroy the infrastructure to avoid incurring charges:

```bash
terraform destroy
```

This command destroys all resources created by your Terraform configuration. You'll be prompted to confirm the action.

### Terraform Best Practices

1. **Use version control**: Store your Terraform configurations in a version control system like Git.
2. **Use modules**: Break down complex configurations into smaller, reusable modules.
3. **Use variables**: Make your configurations reusable by parameterizing values.
4. **Use remote state**: Store your state file in a remote backend like S3.
5. **Use state locking**: Prevent concurrent modifications to your infrastructure.
6. **Use workspaces**: Manage multiple environments (dev, staging, prod) with the same configuration.
7. **Use data sources**: Reference existing resources instead of hardcoding values.
8. **Use outputs**: Share information between modules and with external systems.
9. **Use dependencies**: Explicitly define dependencies between resources.
10. **Use provisioners sparingly**: Prefer cloud-init or other initialization methods.

### Advanced Terraform Features

#### Modules

Modules allow you to organize and reuse your Terraform code. Here's an example:

```hcl
# modules/web-server/main.tf
resource "aws_security_group" "web_server" {
  name        = "${var.name}-sg"
  description = "Allow HTTP and SSH traffic"

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
}

resource "aws_instance" "web_server" {
  ami           = var.ami
  instance_type = var.instance_type
  key_name      = var.key_name

  security_groups = [aws_security_group.web_server.name]

  user_data = var.user_data

  tags = {
    Name = var.name
  }
}

# modules/web-server/variables.tf
variable "name" {
  description = "Name of the web server"
  type        = string
}

variable "ami" {
  description = "AMI ID for the web server"
  type        = string
}

variable "instance_type" {
  description = "Instance type for the web server"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Key pair name for SSH access"
  type        = string
}

variable "user_data" {
  description = "User data script for the web server"
  type        = string
  default     = ""
}

# modules/web-server/outputs.tf
output "instance_id" {
  description = "ID of the web server instance"
  value       = aws_instance.web_server.id
}

output "public_dns" {
  description = "Public DNS of the web server instance"
  value       = aws_instance.web_server.public_dns
}

# main.tf
provider "aws" {
  region = "us-east-1"
}

module "web_server_1" {
  source = "./modules/web-server"

  name         = "web-server-1"
  ami          = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  key_name     = "your-key-pair"
  user_data    = <<-EOF
                 #!/bin/bash
                 yum update -y
                 yum install -y httpd
                 systemctl start httpd
                 systemctl enable httpd
                 echo "<html><body><h1>Hello from Instance 1!</h1></body></html>" > /var/www/html/index.html
                 EOF
}

module "web_server_2" {
  source = "./modules/web-server"

  name         = "web-server-2"
  ami          = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  key_name     = "your-key-pair"
  user_data    = <<-EOF
                 #!/bin/bash
                 yum update -y
                 yum install -y httpd
                 systemctl start httpd
                 systemctl enable httpd
                 echo "<html><body><h1>Hello from Instance 2!</h1></body></html>" > /var/www/html/index.html
                 EOF
}

resource "aws_security_group" "elb" {
  name        = "elb-sg"
  description = "Allow HTTP traffic to ELB"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_elb" "web_elb" {
  name               = "web-elb"
  security_groups    = [aws_security_group.elb.id]
  availability_zones = ["us-east-1a", "us-east-1b"]

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }

  instances                   = [module.web_server_1.instance_id, module.web_server_2.instance_id]
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400
}

output "website_url" {
  value = "http://${aws_elb.web_elb.dns_name}"
}
```

#### Remote State

Remote state allows you to store your Terraform state file in a remote backend like S3. Here's an example:

```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "web-server/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

#### Workspaces

Workspaces allow you to manage multiple environments (dev, staging, prod) with the same configuration. Here's an example:

```hcl
provider "aws" {
  region = "us-east-1"
}

locals {
  environment = terraform.workspace
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = local.environment == "prod" ? "t2.medium" : "t2.micro"

  tags = {
    Name        = "web-server-${local.environment}"
    Environment = local.environment
  }
}
```

To use workspaces:

```bash
# Create a new workspace
terraform workspace new dev

# Select an existing workspace
terraform workspace select prod

# List all workspaces
terraform workspace list

# Show the current workspace
terraform workspace show
```

#### Provisioners

Provisioners allow you to execute commands on local or remote machines as part of resource creation or destruction. Here's an example:

```hcl
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  key_name      = "your-key-pair"

  provisioner "remote-exec" {
    inline = [
      "sudo yum update -y",
      "sudo yum install -y httpd",
      "sudo systemctl start httpd",
      "sudo systemctl enable httpd",
      "echo '<html><body><h1>Hello, World!</h1></body></html>' | sudo tee /var/www/html/index.html"
    ]

    connection {
      type        = "ssh"
      user        = "ec2-user"
      private_key = file("~/.ssh/your-key-pair.pem")
      host        = self.public_ip
    }
  }
}
```

#### Data Sources

Data sources allow you to fetch data from existing resources. Here's an example:

```hcl
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "web_server" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t2.micro"
}
```

## CloudFormation vs. Terraform

Both CloudFormation and Terraform are powerful IaC tools, but they have some key differences:

| Feature | CloudFormation | Terraform |
|---------|---------------|-----------|
| Provider | AWS only | Multi-cloud (AWS, Azure, GCP, etc.) |
| Language | JSON or YAML | HCL (HashiCorp Configuration Language) |
| State Management | Managed by AWS | Managed by Terraform (local or remote) |
| Drift Detection | Built-in | Manual (terraform plan) |
| Change Sets | Built-in | Manual (terraform plan) |
| Rollbacks | Automatic | Manual |
| Custom Resources | Yes (Lambda-backed) | Yes (providers and provisioners) |
| Modules | Yes (nested stacks) | Yes (modules) |
| Community | AWS-focused | Broader community |
| Cost | Free | Open-source (free), with paid enterprise features |

### When to Use CloudFormation

- You're working exclusively with AWS resources.
- You want a fully managed service with automatic rollbacks.
- You need built-in drift detection.
- You want to use AWS-specific features like StackSets.

### When to Use Terraform

- You're working with multiple cloud providers.
- You need more flexibility in your configuration language.
- You want to use a rich ecosystem of providers and modules.
- You need to manage resources that CloudFormation doesn't support.

## Conclusion

In this chapter, we've explored Infrastructure as Code (IaC) tools that allow you to define and provision your AWS infrastructure using code. We've covered AWS CloudFormation and Terraform, two of the most popular IaC tools for AWS.

Understanding these tools is essential for creating reproducible, version-controlled, and automated infrastructure deployments. By leveraging IaC, you can ensure that your infrastructure is consistent, reliable, and easy to manage.

## Hands-on Project: Building a Multi-Tier Application with IaC

As a final project for this chapter, let's build a multi-tier application using Infrastructure as Code. You can choose to use either CloudFormation or Terraform for this project.

### Project Requirements

Create a multi-tier application with the following components:
- A VPC with public and private subnets
- An Internet Gateway and NAT Gateway
- Security groups for each tier
- EC2 instances for the web tier
- RDS for the database tier
- An Elastic Load Balancer for the web tier
- Auto Scaling for the web tier
- S3 bucket for static assets
- CloudFront distribution for the S3 bucket

### Implementation Steps

1. Define the network infrastructure:
   - Create a VPC with CIDR block 10.0.0.0/16
   - Create public subnets in two Availability Zones
   - Create private subnets in two Availability Zones
   - Create an Internet Gateway and attach it to the VPC
   - Create a NAT Gateway in a public subnet
   - Create route tables for public and private subnets

2. Define security groups:
   - Create a security group for the load balancer (allow HTTP/HTTPS from anywhere)
   - Create a security group for the web tier (allow HTTP/HTTPS from the load balancer)
   - Create a security group for the database tier (allow MySQL from the web tier)

3. Define the database tier:
   - Create a DB subnet group using the private subnets
   - Create an RDS MySQL instance in the private subnets
   - Configure backup and maintenance windows

4. Define the web tier:
   - Create a launch template for EC2 instances
   - Configure user data to install and configure a web server
   - Create an Auto Scaling group using the launch template
   - Configure scaling policies based on CPU utilization

5. Define the load balancer:
   - Create an Application Load Balancer in the public subnets
   - Configure a target group for the Auto Scaling group
   - Configure health checks and listeners

6. Define the static assets:
   - Create an S3 bucket for static assets
   - Configure bucket policies for public access
   - Create a CloudFront distribution for the S3 bucket

7. Define outputs:
   - Output the load balancer DNS name
   - Output the CloudFront distribution domain name
   - Output the RDS endpoint

This project will give you hands-on experience with designing and implementing a multi-tier application using Infrastructure as Code, incorporating many of the concepts covered in this chapter.

## Additional Resources

- [AWS CloudFormation Documentation](https://docs.aws.amazon.com/cloudformation/)
- [AWS CloudFormation Sample Templates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-sample-templates.html)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Terraform AWS Provider Documentation](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)
- [AWS re:Invent 2022: Infrastructure as code best practices](https://www.youtube.com/watch?v=fVMlxJJNmyA)
- [AWS Well-Architected Framework - Infrastructure as Code](https://docs.aws.amazon.com/wellarchitected/latest/framework/iac.html)

## Practice Exercises

1. Create a CloudFormation template for a VPC with public and private subnets.
2. Create a Terraform configuration for an EC2 instance with a security group.
3. Use CloudFormation nested stacks to create a modular infrastructure.
4. Use Terraform modules to create a reusable infrastructure.
5. Implement drift detection with CloudFormation.
6. Implement remote state with Terraform.
7. Create a CloudFormation template with custom resources.
8. Create a Terraform configuration with provisioners.

By completing these exercises, you'll gain practical experience with Infrastructure as Code tools and be well-prepared to implement IaC solutions for your own applications.
