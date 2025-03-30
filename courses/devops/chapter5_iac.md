# Chapter 5: Infrastructure as Code with Terraform and Ansible

## Introduction to Infrastructure as Code

Infrastructure as Code (IaC) is a key DevOps practice that involves managing and provisioning computing infrastructure through machine-readable definition files, rather than physical hardware configuration or interactive configuration tools. This approach enables you to treat your infrastructure the same way you treat your application code: version it, test it, and automate its deployment.

### What is Infrastructure as Code?

Infrastructure as Code is the practice of defining and managing infrastructure resources using code and declarative configuration files. Instead of manually configuring servers, networks, and other infrastructure components, you define them in code, which can be version-controlled, tested, and deployed automatically.

### Benefits of Infrastructure as Code

1. **Consistency**: Infrastructure is deployed consistently every time, eliminating configuration drift and "works on my machine" problems.

2. **Speed and Efficiency**: Automating infrastructure provisioning and management reduces the time and effort required to deploy and maintain infrastructure.

3. **Scalability**: IaC makes it easier to scale infrastructure up or down based on demand.

4. **Disaster Recovery**: In case of a disaster, you can quickly rebuild your infrastructure using your IaC definitions.

5. **Documentation**: Your infrastructure code serves as documentation, making it easier for team members to understand the infrastructure.

6. **Version Control**: Infrastructure changes can be tracked, reviewed, and rolled back if necessary.

7. **Reduced Risk**: Automated testing and validation reduce the risk of errors and security vulnerabilities.

### Types of Infrastructure as Code Tools

There are several types of IaC tools, each with its own approach and use cases:

1. **Configuration Management Tools**: These tools focus on installing and managing software on existing servers. Examples include Ansible, Chef, and Puppet.

2. **Server Templating Tools**: These tools create machine images with preinstalled software and configurations. Examples include Packer and Docker.

3. **Orchestration Tools**: These tools manage the deployment and coordination of multiple services and applications. Examples include Kubernetes and Docker Swarm.

4. **Provisioning Tools**: These tools focus on creating and managing infrastructure resources. Examples include Terraform, AWS CloudFormation, and Azure Resource Manager.

In this chapter, we'll focus on two popular IaC tools: Terraform for provisioning infrastructure resources and Ansible for configuration management.

## Terraform Fundamentals

Terraform is an open-source infrastructure as code software tool created by HashiCorp. It enables users to define and provision a datacenter infrastructure using a high-level configuration language known as HashiCorp Configuration Language (HCL), or optionally JSON.

### What is Terraform?

Terraform is a tool for building, changing, and versioning infrastructure safely and efficiently. Terraform can manage existing and popular service providers as well as custom in-house solutions.

Key features of Terraform include:

1. **Infrastructure as Code**: Define infrastructure in configuration files that can be versioned, shared, and reused.

2. **Execution Plans**: Terraform generates an execution plan describing what it will do to reach the desired state, and then executes it to build the described infrastructure.

3. **Resource Graph**: Terraform builds a graph of all your resources, and parallelizes the creation and modification of any non-dependent resources.

4. **Change Automation**: Complex changesets can be applied to your infrastructure with minimal human interaction.

### Terraform Architecture

Terraform follows a client-server architecture:

1. **Terraform Core**: The main component that reads the configuration files, builds the resource graph, and executes the plan.

2. **Providers**: Plugins that interact with various infrastructure providers (AWS, Azure, GCP, etc.) through their APIs.

3. **State**: Terraform maintains a state file that maps real-world resources to your configuration, keeps track of metadata, and improves performance.

### Installing Terraform

Let's install Terraform on different operating systems:

#### For macOS:

```bash
brew install terraform
```

#### For Windows (with Chocolatey):

```bash
choco install terraform
```

#### For Linux (Ubuntu/Debian):

```bash
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform
```

#### Verify Installation:

```bash
terraform version
```

### Terraform Configuration Language

Terraform uses HashiCorp Configuration Language (HCL) for its configuration files. Let's explore the basic syntax and structure of Terraform configuration files.

#### Basic Syntax

```hcl
# Define a provider
provider "aws" {
  region = "us-west-2"
}

# Define a resource
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "example-instance"
  }
}
```

#### Blocks

Terraform configurations consist of blocks, which are containers for other content:

1. **Provider Block**: Configures a specific provider, such as AWS, Azure, or GCP.
2. **Resource Block**: Defines a resource that Terraform manages.
3. **Data Block**: Retrieves data from a provider.
4. **Variable Block**: Defines input variables.
5. **Output Block**: Defines output values.
6. **Module Block**: Includes a module.
7. **Terraform Block**: Configures Terraform itself.

#### Expressions

Terraform uses expressions to refer to or compute values:

```hcl
resource "aws_instance" "example" {
  ami           = var.ami_id  # Reference to a variable
  instance_type = "t2.micro"
  
  tags = {
    Name = "example-${var.environment}"  # String interpolation
  }
}
```

#### Variables and Outputs

Variables allow you to parameterize your configurations:

```hcl
# Define a variable
variable "region" {
  description = "The AWS region to deploy to"
  type        = string
  default     = "us-west-2"
}

# Use the variable
provider "aws" {
  region = var.region
}

# Define an output
output "instance_ip" {
  description = "The public IP of the instance"
  value       = aws_instance.example.public_ip
}
```

### Terraform Workflow

The Terraform workflow consists of three main steps:

1. **Write**: Define your infrastructure in Terraform configuration files.
2. **Plan**: Preview the changes Terraform will make to match your configuration.
3. **Apply**: Apply the changes to reach the desired state.

Let's explore the commands used in this workflow:

#### terraform init

The `terraform init` command initializes a working directory containing Terraform configuration files. It downloads the required provider plugins and sets up the backend for storing the state.

```bash
terraform init
```

#### terraform plan

The `terraform plan` command creates an execution plan, showing what actions Terraform will take to change real infrastructure to match the configuration.

```bash
terraform plan
```

#### terraform apply

The `terraform apply` command executes the actions proposed in the Terraform plan.

```bash
terraform apply
```

You can also auto-approve the apply without being prompted for confirmation:

```bash
terraform apply -auto-approve
```

#### terraform destroy

The `terraform destroy` command destroys all resources managed by the current Terraform configuration.

```bash
terraform destroy
```

### Terraform State

Terraform uses a state file to map resources defined in your configuration to real-world resources. The state file is used to determine which changes to make to your infrastructure.

By default, Terraform stores the state locally in a file named `terraform.tfstate`. However, in a team environment, it's recommended to use a remote backend to store the state.

#### Remote Backend

A remote backend stores the state file remotely, allowing multiple team members to access it. Here's an example of configuring an S3 backend:

```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "terraform.tfstate"
    region = "us-west-2"
  }
}
```

#### State Commands

Terraform provides several commands to manage the state:

```bash
# List resources in the state
terraform state list

# Show a specific resource in the state
terraform state show aws_instance.example

# Move a resource to a different address
terraform state mv aws_instance.example aws_instance.new_example

# Remove a resource from the state
terraform state rm aws_instance.example

# Import an existing resource into the state
terraform import aws_instance.example i-1234567890abcdef0
```

### Terraform Modules

Modules are containers for multiple resources that are used together. They allow you to organize your Terraform code, make it reusable, and encapsulate groups of resources.

#### Creating a Module

A module is simply a directory containing Terraform configuration files. Here's an example of a module that creates an AWS VPC:

```
modules/
  vpc/
    main.tf
    variables.tf
    outputs.tf
```

**main.tf**:
```hcl
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  
  tags = {
    Name = var.vpc_name
  }
}

resource "aws_subnet" "public" {
  count      = length(var.public_subnet_cidrs)
  vpc_id     = aws_vpc.main.id
  cidr_block = var.public_subnet_cidrs[count.index]
  
  tags = {
    Name = "${var.vpc_name}-public-${count.index}"
  }
}
```

**variables.tf**:
```hcl
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "vpc_name" {
  description = "Name of the VPC"
  type        = string
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for the public subnets"
  type        = list(string)
}
```

**outputs.tf**:
```hcl
output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "The IDs of the public subnets"
  value       = aws_subnet.public[*].id
}
```

#### Using a Module

To use a module, you include it in your configuration with a `module` block:

```hcl
module "vpc" {
  source = "./modules/vpc"
  
  vpc_cidr            = "10.0.0.0/16"
  vpc_name            = "my-vpc"
  public_subnet_cidrs = ["10.0.1.0/24", "10.0.2.0/24"]
}

# Access module outputs
output "vpc_id" {
  value = module.vpc.vpc_id
}
```

### Terraform Best Practices

Here are some best practices to follow when using Terraform:

1. **Use Version Control**: Store your Terraform configurations in a version control system like Git.

2. **Use Remote State**: Store your Terraform state in a remote backend to enable collaboration.

3. **Use State Locking**: Enable state locking to prevent concurrent modifications.

4. **Use Modules**: Organize your code into modules to promote reusability and maintainability.

5. **Use Variables**: Parameterize your configurations using variables.

6. **Use Outputs**: Define outputs to expose important information.

7. **Use Workspaces**: Use Terraform workspaces to manage multiple environments (dev, staging, prod).

8. **Follow Naming Conventions**: Use consistent naming conventions for resources, variables, and outputs.

9. **Document Your Code**: Add comments and documentation to your Terraform configurations.

10. **Test Your Code**: Use tools like Terratest to test your Terraform code.

## Ansible Fundamentals

Ansible is an open-source automation tool that simplifies configuration management, application deployment, and task automation. It uses a simple, human-readable language called YAML to describe automation tasks.

### What is Ansible?

Ansible is a configuration management and orchestration tool that allows you to automate the deployment and configuration of software, the management of system configurations, and the orchestration of advanced workflows.

Key features of Ansible include:

1. **Agentless**: Ansible doesn't require any agents to be installed on the managed nodes. It uses SSH for communication.

2. **Idempotent**: Running the same Ansible playbook multiple times will result in the same state.

3. **Declarative**: You describe the desired state of the system, and Ansible figures out how to achieve it.

4. **Simple**: Ansible uses YAML, which is easy to read and write.

5. **Extensible**: Ansible can be extended with modules, plugins, and roles.

### Ansible Architecture

Ansible follows a simple architecture:

1. **Control Node**: The machine where Ansible is installed and from which Ansible commands are run.

2. **Managed Nodes**: The machines that Ansible manages.

3. **Inventory**: A list of managed nodes.

4. **Modules**: Units of code that Ansible executes.

5. **Playbooks**: YAML files that describe the tasks to be executed.

6. **Roles**: Reusable units of organization for playbooks.

### Installing Ansible

Let's install Ansible on different operating systems:

#### For macOS:

```bash
brew install ansible
```

#### For Windows:

Ansible doesn't run natively on Windows. You can use Windows Subsystem for Linux (WSL) or a virtual machine.

#### For Linux (Ubuntu/Debian):

```bash
sudo apt update
sudo apt install ansible
```

#### Verify Installation:

```bash
ansible --version
```

### Ansible Inventory

The inventory file defines the hosts and groups of hosts upon which commands, modules, and tasks in a playbook operate. The default location for the inventory file is `/etc/ansible/hosts`, but you can specify a different inventory file using the `-i` option.

#### Static Inventory

A static inventory file can be in INI or YAML format:

**INI format**:
```ini
[webservers]
web1.example.com
web2.example.com

[dbservers]
db1.example.com
db2.example.com

[datacenter:children]
webservers
dbservers
```

**YAML format**:
```yaml
all:
  children:
    webservers:
      hosts:
        web1.example.com:
        web2.example.com:
    dbservers:
      hosts:
        db1.example.com:
        db2.example.com:
    datacenter:
      children:
        webservers:
        dbservers:
```

#### Dynamic Inventory

Ansible can also use dynamic inventory scripts to pull inventory information from external sources like cloud providers, LDAP, or custom databases.

### Ansible Playbooks

Playbooks are Ansible's configuration, deployment, and orchestration language. They are expressed in YAML format and can be used to describe a policy you want your remote systems to enforce, or a set of steps in a general IT process.

#### Basic Playbook Structure

```yaml
---
- name: Install and configure web server
  hosts: webservers
  become: true
  
  tasks:
    - name: Install Apache
      apt:
        name: apache2
        state: present
    
    - name: Start Apache service
      service:
        name: apache2
        state: started
        enabled: true
```

#### Running a Playbook

```bash
ansible-playbook playbook.yml
```

You can also specify an inventory file:

```bash
ansible-playbook -i inventory.ini playbook.yml
```

### Ansible Modules

Modules are the units of work that Ansible executes. They are reusable, standalone scripts that can be used by the Ansible API, or by the `ansible` or `ansible-playbook` commands.

Here are some commonly used modules:

1. **apt/yum/dnf**: Manage packages on different distributions.
2. **copy**: Copy files to remote hosts.
3. **file**: Set attributes of files and directories.
4. **service**: Manage services.
5. **template**: Process templates using Jinja2.
6. **user**: Manage user accounts.
7. **git**: Manage git repositories.
8. **command/shell**: Execute commands on remote hosts.

#### Example: Using the `apt` Module

```yaml
- name: Install Apache
  apt:
    name: apache2
    state: present
    update_cache: yes
```

#### Example: Using the `template` Module

```yaml
- name: Configure Apache
  template:
    src: apache.conf.j2
    dest: /etc/apache2/apache.conf
    owner: root
    group: root
    mode: '0644'
  notify: Restart Apache
```

### Ansible Variables

Variables in Ansible can be defined at various levels and can be used to store values that can be reused throughout your playbooks.

#### Defining Variables

Variables can be defined in several places:

1. **In a playbook**:
   ```yaml
   vars:
     http_port: 80
     max_clients: 200
   ```

2. **In a separate variables file**:
   ```yaml
   # vars/main.yml
   http_port: 80
   max_clients: 200
   ```

3. **In the inventory**:
   ```ini
   [webservers]
   web1.example.com http_port=80 max_clients=200
   ```

4. **In group_vars or host_vars directories**:
   ```
   inventory/
     group_vars/
       webservers.yml
     host_vars/
       web1.example.com.yml
   ```

#### Using Variables

Variables can be used in playbooks, templates, and command-line arguments:

```yaml
- name: Configure Apache
  template:
    src: apache.conf.j2
    dest: /etc/apache2/sites-available/{{ http_port }}.conf
```

In a Jinja2 template:
```jinja
<VirtualHost *:{{ http_port }}>
    ServerAdmin webmaster@example.com
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

### Ansible Roles

Roles are a way to organize playbooks and reuse code. They provide a framework for fully independent, or interdependent collections of variables, tasks, files, templates, and modules.

#### Role Directory Structure

```
roles/
  webserver/
    defaults/      # Default variables
      main.yml
    files/         # Files to be copied to the remote server
    handlers/      # Handlers
      main.yml
    meta/          # Role metadata
      main.yml
    tasks/         # Tasks
      main.yml
    templates/     # Templates
    vars/          # Variables
      main.yml
```

#### Creating a Role

You can create a role using the `ansible-galaxy` command:

```bash
ansible-galaxy init webserver
```

#### Using a Role

Roles can be used in a playbook:

```yaml
---
- name: Configure webservers
  hosts: webservers
  roles:
    - webserver
```

You can also pass variables to a role:

```yaml
---
- name: Configure webservers
  hosts: webservers
  roles:
    - role: webserver
      vars:
        http_port: 8080
```

### Ansible Galaxy

Ansible Galaxy is a hub for finding, reusing, and sharing Ansible content. It provides pre-packaged units of work known as roles.

#### Installing a Role from Galaxy

```bash
ansible-galaxy install geerlingguy.nginx
```

#### Using a Galaxy Role

```yaml
---
- name: Configure webservers
  hosts: webservers
  roles:
    - geerlingguy.nginx
```

### Ansible Best Practices

Here are some best practices to follow when using Ansible:

1. **Use Version Control**: Store your Ansible playbooks and roles in a version control system like Git.

2. **Use Roles**: Organize your code into roles to promote reusability and maintainability.

3. **Use Variables**: Parameterize your playbooks using variables.

4. **Use Templates**: Use Jinja2 templates for configuration files.

5. **Use Handlers**: Use handlers for actions that should only be run when a task changes something.

6. **Use Tags**: Use tags to selectively run parts of a playbook.

7. **Test Your Playbooks**: Use tools like Molecule to test your Ansible roles.

8. **Document Your Code**: Add comments and documentation to your Ansible playbooks and roles.

9. **Use Vault for Sensitive Data**: Use Ansible Vault to encrypt sensitive data.

10. **Keep It Simple**: Write simple, readable playbooks and roles.

## Integrating Terraform and Ansible

Terraform and Ansible complement each other well: Terraform excels at provisioning infrastructure, while Ansible excels at configuring that infrastructure. Let's explore how to integrate these tools.

### Provisioning with Terraform, Configuring with Ansible

A common pattern is to use Terraform to provision the infrastructure and then use Ansible to configure it. Here's a high-level workflow:

1. Use Terraform to create the infrastructure (VMs, networks, etc.).
2. Generate an Ansible inventory from the Terraform output.
3. Use Ansible to configure the infrastructure.

#### Example: Provisioning AWS EC2 Instances with Terraform

```hcl
provider "aws" {
  region = "us-west-2"
}

resource "aws_instance" "web" {
  count         = 2
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  key_name      = "my-key"
  
  tags = {
    Name = "web-${count.index}"
  }
}

output "web_public_ips" {
  value = aws_instance.web[*].public_ip
}
```

#### Example: Generating an Ansible Inventory from Terraform Output

You can use a local-exec provisioner to generate an Ansible inventory:

```hcl
resource "local_file" "ansible_inventory" {
  content = templatefile("inventory.tmpl", {
    web_public_ips = aws_instance.web[*].public_ip
  })
  filename = "inventory.ini"
}
```

With an inventory template like:

```
[webservers]
%{ for ip in web_public_ips ~}
${ip} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/my-key.pem
%{ endfor ~}
```

#### Example: Running Ansible from Terraform

You can also use a local-exec provisioner to run Ansible:

```hcl
resource "null_resource" "ansible" {
  depends_on = [aws_instance.web, local_file.ansible_inventory]
  
  provisioner "local-exec" {
    command = "ansible-playbook -i inventory.ini playbook.yml"
  }
}
```

### Using Ansible as a Terraform Provisioner

Terraform has a built-in `local-exec` provisioner that can run Ansible commands. However, there are also third-party provisioners specifically for Ansible:

#### Example: Using the Terraform Ansible Provisioner

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  key_name      = "my-key"
  
  provisioner "remote-exec" {
    inline = ["echo 'Wait until SSH is ready'"]
    
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("~/.ssh/my-key.pem")
      host        = self.public_ip
    }
  }
  
  provisioner "local-exec" {
    command = "ansible-playbook -i '${self.public_ip},' --private-key ~/.ssh/my-key.pem playbook.yml"
  }
}
```

### Dynamic Inventory for Terraform-managed Infrastructure

Ansible provides a dynamic inventory script for Terraform-managed infrastructure:

1. Install the Ansible Terraform inventory plugin:
   ```bash
   pip install ansible-terraform-inventory
   ```

2. Create a `terraform.tfstate` file using Terraform.

3. Use the Terraform inventory plugin:
   ```bash
   ansible-playbook -i terraform-inventory playbook.yml
   ```

## Hands-On Exercise: Deploying a Web Application with Terraform and Ansible

In this exercise, we'll deploy a web application using Terraform to provision the infrastructure and Ansible to configure it.

### Prerequisites

- Terraform installed
- Ansible installed
- AWS account with appropriate permissions
- AWS CLI configured with your credentials

### Step 1: Create the Project Structure

```bash
mkdir -p terraform-ansible-demo/{terraform,ansible/{roles,playbooks}}
cd terraform-ansible-demo
```

### Step 2: Create Terraform Configuration

Create the following files in the `terraform` directory:

**terraform/main.tf**:
```hcl
provider "aws" {
  region = var.region
}

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  
  tags = {
    Name = "${var.project_name}-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.subnet_cidr
  availability_zone = "${var.region}a"
  
  map_public_ip_on_launch = true
  
  tags = {
    Name = "${var.project_name}-public-subnet"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "${var.project_name}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "${var.project_name}-public-rt"
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "web" {
  name        = "${var.project_name}-web-sg"
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
    Name = "${var.project_name}-web-sg"
  }
}

resource "aws_key_pair" "main" {
  key_name   = "${var.project_name}-key"
  public_key = file(var.public_key_path)
}

resource "aws_instance" "web" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.main.key_name
  subnet_id              = aws_subnet.public.id
  vpc_security_group_ids = [aws_security_group.web.id]
  
  tags = {
    Name = "${var.project_name}-web"
  }
}

resource "local_file" "ansible_inventory" {
  content = templatefile("${path.module}/inventory.tmpl", {
    web_public_ip = aws_instance.web.public_ip
  })
  filename = "${path.module}/../ansible/inventory.ini"
}

resource "null_resource" "ansible" {
  depends_on = [aws_instance.web, local_file.ansible_inventory]
  
  provisioner "local-exec" {
    command = "cd ${path.module}/../ansible && ansible-playbook -i inventory.ini playbooks/site.yml"
  }
}
```

**terraform/variables.tf**:
```hcl
variable "region" {
  description = "The AWS region to deploy to"
  type        = string
  default     = "us-west-2"
}

variable "project_name" {
  description = "The name of the project"
  type        = string
  default     = "terraform-ansible-demo"
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
```

**terraform/outputs.tf**:
```hcl
output "web_public_ip" {
  description = "The public IP of the web instance"
  value       = aws_instance.web.public_ip
}

output "web_url" {
  description = "The URL of the web application"
  value       = "http://${aws_instance.web.public_ip}"
}
```

**terraform/inventory.tmpl**:
```
[webservers]
${web_public_ip} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/id_rsa
```

### Step 3: Create Ansible Configuration

Create the following files in the `ansible` directory:

**ansible/ansible.cfg**:
```ini
[defaults]
host_key_checking = False
inventory = inventory.ini
roles_path = roles
```

**ansible/playbooks/site.yml**:
```yaml
---
- name: Configure web server
  hosts: webservers
  become: true
  
  roles:
    - common
    - nginx
    - webapp
```

**ansible/roles/common/tasks/main.yml**:
```yaml
---
- name: Update apt cache
  apt:
    update_cache: yes
    cache_valid_time: 3600
  
- name: Install common packages
  apt:
    name:
      - vim
      - curl
      - git
      - unzip
    state: present
```

**ansible/roles/nginx/tasks/main.yml**:
```yaml
---
- name: Install Nginx
  apt:
    name: nginx
    state: present
  
- name: Start and enable Nginx
  service:
    name: nginx
    state: started
    enabled: true
  
- name: Configure Nginx
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/default
    owner: root
    group: root
    mode: '0644'
  notify: Restart Nginx
```

**ansible/roles/nginx/templates/nginx.conf.j2**:
```jinja
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
```

**ansible/roles/nginx/handlers/main.yml**:
```yaml
---
- name: Restart Nginx
  service:
    name: nginx
    state: restarted
```

**ansible/roles/webapp/tasks/main.yml**:
```yaml
---
- name: Create web application directory
  file:
    path: /var/www/html
    state: directory
    owner: www-data
    group: www-data
    mode: '0755'
  
- name: Deploy web application
  template:
    src: index.html.j2
    dest: /var/www/html/index.html
    owner: www-data
    group: www-data
    mode: '0644'
```

**ansible/roles/webapp/templates/index.html.j2**:
```jinja
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terraform and Ansible Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .container {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 5px;
        }
        .info {
            margin-top: 20px;
            padding: 10px;
            background-color: #e9f7ef;
            border-left: 5px solid #2ecc71;
        }
    </style>
</head>
<body>
    <h1>Terraform and Ansible Demo</h1>
    <div class="container">
        <p>This web application was deployed using Terraform and Ansible.</p>
        <p>Terraform was used to provision the infrastructure, and Ansible was used to configure it.</p>
        <div class="info">
            <p><strong>Hostname:</strong> {{ ansible_hostname }}</p>
            <p><strong>IP Address:</strong> {{ ansible_default_ipv4.address }}</p>
            <p><strong>Operating System:</strong> {{ ansible_distribution }} {{ ansible_distribution_version }}</p>
            <p><strong>Deployment Time:</strong> {{ ansible_date_time.iso8601 }}</p>
        </div>
    </div>
</body>
</html>
```

### Step 4: Deploy the Infrastructure with Terraform

```bash
cd terraform
terraform init
terraform plan
terraform apply -auto-approve
```

### Step 5: Verify the Deployment

After the deployment is complete, Terraform will output the public IP address of the web server and the URL of the web application. Open the URL in your browser to see the web application.

```bash
terraform output web_url
```

### Step 6: Clean Up

When you're done, you can destroy the infrastructure:

```bash
terraform destroy -auto-approve
```

## Summary

In this chapter, we've explored Infrastructure as Code (IaC) with Terraform and Ansible. We've learned how to use Terraform to provision infrastructure and Ansible to configure it. We've also seen how to integrate these tools to create a complete deployment pipeline.

Key takeaways from this chapter:

1. Infrastructure as Code (IaC) allows you to define and manage infrastructure using code, making it more consistent, efficient, and scalable.

2. Terraform is a powerful tool for provisioning infrastructure across multiple cloud providers and services.

3. Ansible is a simple yet powerful tool for configuration management and application deployment.

4. Terraform and Ansible complement each other well: Terraform excels at provisioning infrastructure, while Ansible excels at configuring it.

5. By integrating Terraform and Ansible, you can create a complete deployment pipeline that provisions and configures infrastructure in a repeatable and automated way.

In the next chapter, we'll explore monitoring and logging in DevOps, focusing on tools like Prometheus, Grafana, and the ELK Stack.

## Additional Resources

- [Terraform Documentation](https://www.terraform.io/docs/index.html)
- [Ansible Documentation](https://docs.ansible.com/)
- [Terraform: Up & Running](https://www.terraformupandrunning.com/) by Yevgeniy Brikman
- [Ansible for DevOps](https://www.ansiblefordevops.com/) by Jeff Geerling
- [Terraform Registry](https://registry.terraform.io/)
- [Ansible Galaxy](https://galaxy.ansible.com/)
