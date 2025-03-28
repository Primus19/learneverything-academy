# AWS Networking Services

In this chapter, we'll explore AWS networking services and concepts that form the backbone of cloud infrastructure. Understanding these services is crucial for designing secure, scalable, and highly available architectures in AWS. We'll cover Virtual Private Cloud (VPC) design, subnetting strategies, security groups, network ACLs, connectivity options, and DNS management with Route 53.

## Introduction to AWS Networking

AWS provides a comprehensive suite of networking services that allow you to define and control how your applications connect to each other and to the internet. These services enable you to:

- Create isolated network environments
- Control traffic flow with fine-grained security controls
- Connect to on-premises networks
- Distribute traffic across multiple resources
- Route users to the closest endpoint
- Protect against network-based attacks

Let's dive into the core networking services and concepts that every AWS Cloud Engineer should master.

## Amazon Virtual Private Cloud (VPC)

Amazon VPC is the fundamental building block for your network in AWS. It allows you to provision a logically isolated section of the AWS cloud where you can launch resources in a virtual network that you define.

### VPC Concepts

A VPC spans all the Availability Zones in a region and consists of the following components:

- **Subnets**: Segments of a VPC's IP address range where you place resources
- **Route Tables**: Rules that determine where network traffic is directed
- **Internet Gateway**: Connects a VPC to the internet
- **NAT Gateway/Instance**: Allows private subnet resources to access the internet
- **Security Groups**: Virtual firewalls that control inbound and outbound traffic at the resource level
- **Network ACLs**: Stateless firewalls that control inbound and outbound traffic at the subnet level
- **VPC Endpoints**: Private connections to supported AWS services without using the internet
- **VPC Peering**: Direct network connection between two VPCs
- **Transit Gateway**: Network transit hub to connect VPCs and on-premises networks

### VPC Design Best Practices

When designing a VPC, consider the following best practices:

1. **Plan your IP address space carefully**: Use CIDR blocks that don't overlap with your on-premises network or other VPCs.
2. **Create multiple subnets across Availability Zones**: For high availability and fault tolerance.
3. **Separate public and private subnets**: Place internet-facing resources in public subnets and backend resources in private subnets.
4. **Use security groups and NACLs effectively**: Apply defense in depth by using both security mechanisms.
5. **Implement VPC Flow Logs**: For network monitoring, troubleshooting, and security analysis.
6. **Plan for growth**: Allocate more IP addresses than you currently need.

### Hands-on Lab: Creating a VPC with Public and Private Subnets

Let's create a VPC with public and private subnets across two Availability Zones.

#### Step 1: Create a VPC

1. Open the AWS Management Console and navigate to the VPC service.
2. Click "Create VPC".
3. Configure the following settings:
   - Resources to create: VPC and more
   - Name tag: MyProductionVPC
   - IPv4 CIDR block: 10.0.0.0/16
   - Number of Availability Zones: 2
   - Number of public subnets: 2
   - Number of private subnets: 2
   - NAT gateways: 1 per AZ
   - VPC endpoints: None
4. Click "Create VPC".

This will create:
- A VPC with CIDR block 10.0.0.0/16
- Two public subnets (10.0.0.0/24 and 10.0.1.0/24)
- Two private subnets (10.0.2.0/24 and 10.0.3.0/24)
- An internet gateway attached to the VPC
- NAT gateways in each public subnet
- Route tables for public and private subnets

#### Step 2: Verify the VPC Configuration

1. Navigate to the "Your VPCs" section and select your newly created VPC.
2. Explore the "Resource map" to see all the components created.
3. Check the route tables:
   - Public route table should have a route to the internet gateway (0.0.0.0/0 → igw-xxx)
   - Private route table should have a route to the NAT gateway (0.0.0.0/0 → nat-xxx)

#### Step 3: Launch EC2 Instances in Public and Private Subnets

1. Navigate to the EC2 service.
2. Launch an EC2 instance in a public subnet:
   - AMI: Amazon Linux 2
   - Instance type: t2.micro
   - VPC: MyProductionVPC
   - Subnet: Public subnet
   - Auto-assign public IP: Enable
   - Security group: Allow SSH (port 22) and HTTP (port 80) from anywhere
   - User data:
     ```bash
     #!/bin/bash
     yum update -y
     yum install -y httpd
     systemctl start httpd
     systemctl enable httpd
     echo "<h1>Hello from Public Subnet</h1>" > /var/www/html/index.html
     ```

3. Launch an EC2 instance in a private subnet:
   - AMI: Amazon Linux 2
   - Instance type: t2.micro
   - VPC: MyProductionVPC
   - Subnet: Private subnet
   - Auto-assign public IP: Disable
   - Security group: Allow SSH (port 22) from the VPC CIDR and HTTP (port 80) from the VPC CIDR
   - User data:
     ```bash
     #!/bin/bash
     yum update -y
     yum install -y httpd
     systemctl start httpd
     systemctl enable httpd
     echo "<h1>Hello from Private Subnet</h1>" > /var/www/html/index.html
     ```

#### Step 4: Test Connectivity

1. Connect to the public instance using SSH.
2. From the public instance, try to connect to the private instance:
   ```bash
   ssh -i your-key.pem ec2-user@private-instance-ip
   ```
3. From the private instance, verify internet connectivity:
   ```bash
   ping google.com
   ```
   This should work because of the NAT gateway.

4. Access the web server on the public instance from your browser using the public IP.

#### Step 5: Clean Up Resources

To avoid incurring charges, delete the resources you created:
1. Terminate the EC2 instances.
2. Delete the NAT gateways.
3. Release the Elastic IPs.
4. Delete the VPC and its components.

## Subnetting Strategies

Subnetting is the practice of dividing a VPC's CIDR block into smaller CIDR blocks. Proper subnetting is crucial for organizing resources, controlling traffic flow, and ensuring scalability.

### Public vs. Private Subnets

- **Public Subnets**: Have a route to the internet via an internet gateway. Resources in public subnets can have public IP addresses and can be directly accessible from the internet.
- **Private Subnets**: Don't have a direct route to the internet. Resources in private subnets can access the internet via a NAT gateway or instance but cannot be directly accessed from the internet.

### Subnet Sizing

When determining subnet sizes, consider:

1. **Number of resources**: Estimate how many IP addresses you'll need for each subnet.
2. **Future growth**: Allocate more IP addresses than you currently need.
3. **Reserved IP addresses**: AWS reserves the first four and the last IP address in each subnet.

Here's a table of common CIDR blocks and the number of available IP addresses:

| CIDR Block | Number of IP Addresses | Usable IP Addresses (AWS) |
|------------|------------------------|---------------------------|
| /16        | 65,536                 | 65,531                    |
| /20        | 4,096                  | 4,091                     |
| /24        | 256                    | 251                       |
| /27        | 32                     | 27                        |
| /28        | 16                     | 11                        |

### Multi-Tier Architecture Example

A common pattern is to create a multi-tier architecture with different subnet types:

1. **Public subnet**: For load balancers, bastion hosts, and NAT gateways
2. **Private application subnet**: For web and application servers
3. **Private database subnet**: For database servers

Here's an example CIDR allocation for a VPC with CIDR 10.0.0.0/16:

| Subnet Type | AZ1 CIDR    | AZ2 CIDR    | AZ3 CIDR    |
|-------------|-------------|-------------|-------------|
| Public      | 10.0.0.0/24 | 10.0.1.0/24 | 10.0.2.0/24 |
| App Private | 10.0.3.0/24 | 10.0.4.0/24 | 10.0.5.0/24 |
| DB Private  | 10.0.6.0/24 | 10.0.7.0/24 | 10.0.8.0/24 |

## Security Groups and Network ACLs

AWS provides two main tools for network security: security groups and network ACLs.

### Security Groups

Security groups act as virtual firewalls for your instances to control inbound and outbound traffic. Key characteristics:

- **Stateful**: If you allow inbound traffic, the corresponding outbound traffic is automatically allowed, regardless of outbound rules.
- **Instance level**: Associated with EC2 instances, RDS instances, etc.
- **Allow rules only**: You can only specify allow rules, not deny rules.
- **Evaluated as a whole**: All rules are evaluated before deciding whether to allow traffic.

Example security group configuration for a web server:

```json
{
  "Inbound Rules": [
    {
      "Type": "HTTP",
      "Protocol": "TCP",
      "Port Range": "80",
      "Source": "0.0.0.0/0"
    },
    {
      "Type": "HTTPS",
      "Protocol": "TCP",
      "Port Range": "443",
      "Source": "0.0.0.0/0"
    },
    {
      "Type": "SSH",
      "Protocol": "TCP",
      "Port Range": "22",
      "Source": "10.0.0.0/16"
    }
  ],
  "Outbound Rules": [
    {
      "Type": "All Traffic",
      "Protocol": "All",
      "Port Range": "All",
      "Destination": "0.0.0.0/0"
    }
  ]
}
```

### Network ACLs (NACLs)

Network ACLs are an additional layer of security that acts as a firewall for controlling traffic in and out of subnets. Key characteristics:

- **Stateless**: You must specify both inbound and outbound rules.
- **Subnet level**: Associated with subnets.
- **Allow and deny rules**: You can specify both allow and deny rules.
- **Rule number**: Rules are evaluated in order, from lowest to highest.
- **Default NACL**: Allows all inbound and outbound traffic.
- **Custom NACL**: Denies all inbound and outbound traffic until you add rules.

Example NACL configuration:

```json
{
  "Inbound Rules": [
    {
      "Rule #": 100,
      "Type": "HTTP",
      "Protocol": "TCP",
      "Port Range": "80",
      "Source": "0.0.0.0/0",
      "Allow/Deny": "ALLOW"
    },
    {
      "Rule #": 110,
      "Type": "HTTPS",
      "Protocol": "TCP",
      "Port Range": "443",
      "Source": "0.0.0.0/0",
      "Allow/Deny": "ALLOW"
    },
    {
      "Rule #": 120,
      "Type": "SSH",
      "Protocol": "TCP",
      "Port Range": "22",
      "Source": "10.0.0.0/16",
      "Allow/Deny": "ALLOW"
    },
    {
      "Rule #": 130,
      "Type": "Custom TCP",
      "Protocol": "TCP",
      "Port Range": "1024-65535",
      "Source": "0.0.0.0/0",
      "Allow/Deny": "ALLOW"
    },
    {
      "Rule #": "*",
      "Type": "All Traffic",
      "Protocol": "All",
      "Port Range": "All",
      "Source": "0.0.0.0/0",
      "Allow/Deny": "DENY"
    }
  ],
  "Outbound Rules": [
    {
      "Rule #": 100,
      "Type": "HTTP",
      "Protocol": "TCP",
      "Port Range": "80",
      "Destination": "0.0.0.0/0",
      "Allow/Deny": "ALLOW"
    },
    {
      "Rule #": 110,
      "Type": "HTTPS",
      "Protocol": "TCP",
      "Port Range": "443",
      "Destination": "0.0.0.0/0",
      "Allow/Deny": "ALLOW"
    },
    {
      "Rule #": 120,
      "Type": "Custom TCP",
      "Protocol": "TCP",
      "Port Range": "1024-65535",
      "Destination": "0.0.0.0/0",
      "Allow/Deny": "ALLOW"
    },
    {
      "Rule #": "*",
      "Type": "All Traffic",
      "Protocol": "All",
      "Port Range": "All",
      "Destination": "0.0.0.0/0",
      "Allow/Deny": "DENY"
    }
  ]
}
```

### Security Groups vs. NACLs: When to Use Each

| Feature | Security Group | Network ACL |
|---------|---------------|-------------|
| Scope | Instance level | Subnet level |
| State | Stateful | Stateless |
| Rules | Allow rules only | Allow and deny rules |
| Rule evaluation | All rules evaluated | Rules evaluated in order |
| Default | Deny all inbound, allow all outbound | Allow all inbound and outbound (default NACL) |

Best practices:
- Use security groups as your primary method of controlling access to resources.
- Use NACLs as a secondary layer of defense for your subnets.
- Use NACLs when you need to explicitly deny traffic.

## VPC Connectivity Options

AWS offers several options for connecting your VPC to other networks:

### Internet Gateway

An internet gateway is a horizontally scaled, redundant, and highly available VPC component that allows communication between your VPC and the internet.

To set up an internet gateway:
1. Create an internet gateway.
2. Attach it to your VPC.
3. Update your route table to direct internet-bound traffic to the internet gateway.

Example route table entry:
```
Destination: 0.0.0.0/0
Target: igw-1234567890abcdef0
```

### NAT Gateway

A NAT (Network Address Translation) gateway enables instances in a private subnet to connect to the internet or other AWS services while preventing the internet from initiating connections to those instances.

To set up a NAT gateway:
1. Create a NAT gateway in a public subnet.
2. Allocate an Elastic IP address to the NAT gateway.
3. Update the route table associated with your private subnet to direct internet-bound traffic to the NAT gateway.

Example route table entry:
```
Destination: 0.0.0.0/0
Target: nat-1234567890abcdef0
```

### VPC Peering

VPC peering is a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses.

Key characteristics:
- Non-transitive: If VPC A is peered with VPC B and VPC B is peered with VPC C, VPC A cannot communicate with VPC C through VPC B.
- No overlapping CIDR blocks: The VPCs cannot have overlapping CIDR blocks.
- No gateway or VPN connection: Traffic stays on the AWS network and does not go through the internet.

To set up VPC peering:
1. Create a peering connection from one VPC to another.
2. Accept the peering connection request.
3. Update route tables in both VPCs to direct traffic destined for the other VPC to the peering connection.

Example route table entries:
```
# In VPC A route table
Destination: 10.1.0.0/16 (VPC B CIDR)
Target: pcx-1234567890abcdef0

# In VPC B route table
Destination: 10.0.0.0/16 (VPC A CIDR)
Target: pcx-1234567890abcdef0
```

### AWS Transit Gateway

AWS Transit Gateway is a network transit hub that you can use to interconnect your VPCs and on-premises networks.

Key benefits:
- Simplifies network architecture: Acts as a hub for all traffic.
- Transitive routing: Enables transitive connections between all attached networks.
- Centralized control: Single place to manage connections and routing.
- Scalable: Can connect thousands of VPCs.

To set up a Transit Gateway:
1. Create a Transit Gateway.
2. Create Transit Gateway attachments for your VPCs and on-premises networks.
3. Configure Transit Gateway route tables.
4. Update VPC route tables to direct traffic to the Transit Gateway.

Example route table entry in a VPC:
```
Destination: 0.0.0.0/0
Target: tgw-1234567890abcdef0
```

### VPC Endpoints

VPC endpoints enable you to privately connect your VPC to supported AWS services without requiring an internet gateway, NAT device, VPN connection, or AWS Direct Connect connection.

Types of VPC endpoints:
- **Interface Endpoints**: Uses AWS PrivateLink and creates an elastic network interface in your subnet with a private IP address.
- **Gateway Endpoints**: A gateway that is a target for a specific route in your route table, used for S3 and DynamoDB.

To set up a Gateway Endpoint for S3:
1. Navigate to the VPC console and select "Endpoints".
2. Click "Create Endpoint".
3. Select "AWS services" and choose "com.amazonaws.region.s3" from the service list.
4. Select your VPC and route tables.
5. Click "Create endpoint".

Example route table entry:
```
Destination: com.amazonaws.us-east-1.s3
Target: vpce-1234567890abcdef0
```

### AWS Direct Connect

AWS Direct Connect is a cloud service that establishes a dedicated network connection from your premises to AWS.

Key benefits:
- Reduced network costs
- Increased bandwidth
- Consistent network performance
- Private connectivity to your VPC

To set up Direct Connect:
1. Create a Direct Connect connection or order through a Direct Connect partner.
2. Create a virtual interface (public or private).
3. Configure your on-premises router.
4. Establish BGP peering.

### Hands-on Lab: Setting Up VPC Peering

Let's create two VPCs and establish peering between them.

#### Step 1: Create Two VPCs

1. Create the first VPC:
   - Name: VPC-A
   - CIDR block: 10.0.0.0/16
   - Create a public subnet: 10.0.0.0/24
   - Create a private subnet: 10.0.1.0/24
   - Attach an internet gateway

2. Create the second VPC:
   - Name: VPC-B
   - CIDR block: 10.1.0.0/16
   - Create a public subnet: 10.1.0.0/24
   - Create a private subnet: 10.1.1.0/24
   - Attach an internet gateway

#### Step 2: Create a VPC Peering Connection

1. Navigate to the VPC console and select "Peering Connections".
2. Click "Create Peering Connection".
3. Configure the peering connection:
   - Name: VPC-A-to-VPC-B
   - VPC (Requester): VPC-A
   - Account: My account
   - Region: Same region
   - VPC (Accepter): VPC-B
4. Click "Create Peering Connection".
5. Select the peering connection you just created and click "Actions" > "Accept Request".

#### Step 3: Update Route Tables

1. Update the route table for VPC-A:
   - Navigate to "Route Tables" and select the route table associated with VPC-A.
   - Click "Edit routes" and add a new route:
     - Destination: 10.1.0.0/16 (VPC-B CIDR)
     - Target: Select "Peering Connection" and choose the peering connection you created.
   - Save the changes.

2. Update the route table for VPC-B:
   - Navigate to "Route Tables" and select the route table associated with VPC-B.
   - Click "Edit routes" and add a new route:
     - Destination: 10.0.0.0/16 (VPC-A CIDR)
     - Target: Select "Peering Connection" and choose the peering connection you created.
   - Save the changes.

#### Step 4: Test the Peering Connection

1. Launch an EC2 instance in VPC-A:
   - AMI: Amazon Linux 2
   - Instance type: t2.micro
   - VPC: VPC-A
   - Subnet: Public subnet
   - Auto-assign public IP: Enable
   - Security group: Allow SSH (port 22) from your IP and ICMP from VPC-B CIDR (10.1.0.0/16)

2. Launch an EC2 instance in VPC-B:
   - AMI: Amazon Linux 2
   - Instance type: t2.micro
   - VPC: VPC-B
   - Subnet: Public subnet
   - Auto-assign public IP: Enable
   - Security group: Allow SSH (port 22) from your IP and ICMP from VPC-A CIDR (10.0.0.0/16)

3. Connect to the instance in VPC-A using SSH and ping the private IP of the instance in VPC-B:
   ```bash
   ping private-ip-of-instance-in-vpc-b
   ```

4. Connect to the instance in VPC-B using SSH and ping the private IP of the instance in VPC-A:
   ```bash
   ping private-ip-of-instance-in-vpc-a
   ```

If the pings are successful, your VPC peering connection is working correctly.

#### Step 5: Clean Up Resources

To avoid incurring charges, delete the resources you created:
1. Terminate the EC2 instances.
2. Delete the VPC peering connection.
3. Delete the VPCs and their components.

## Amazon Route 53

Amazon Route 53 is a highly available and scalable Domain Name System (DNS) web service. It connects user requests to infrastructure running in AWS and can also be used to route users to infrastructure outside of AWS.

### Key Features

- **Domain registration**: Register domain names.
- **DNS routing**: Route internet traffic to your website.
- **Health checking**: Monitor the health of your resources.
- **Traffic flow**: Route traffic based on various criteria.
- **Private DNS**: Use Route 53 for your VPC's private domain.

### Routing Policies

Route 53 supports several routing policies:

1. **Simple routing**: Use for a single resource that performs a given function.
2. **Weighted routing**: Route traffic to multiple resources in proportions that you specify.
3. **Latency-based routing**: Route traffic to the region that provides the best latency.
4. **Failover routing**: Route traffic to a backup resource when the primary resource is unavailable.
5. **Geolocation routing**: Route traffic based on the geographic location of your users.
6. **Geoproximity routing**: Route traffic based on the geographic location of your resources and, optionally, shift traffic from resources in one location to resources in another.
7. **Multivalue answer routing**: Respond to DNS queries with up to eight healthy records selected at random.

### Hands-on Lab: Setting Up Route 53 for a Static Website

Let's set up Route 53 to route traffic to a static website hosted on S3.

#### Step 1: Create an S3 Bucket for Website Hosting

1. Create an S3 bucket with a name that matches your domain (e.g., example.com).
2. Enable static website hosting:
   - Properties > Static website hosting > Enable
   - Index document: index.html
   - Error document: error.html
3. Add a bucket policy to make the content public:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::example.com/*"
       }
     ]
   }
   ```
4. Upload a simple index.html file:
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>My Static Website</title>
   </head>
   <body>
     <h1>Hello, World!</h1>
     <p>This is my static website hosted on S3 and served via Route 53.</p>
   </body>
   </html>
   ```

#### Step 2: Register a Domain (or Use an Existing Domain)

1. Navigate to the Route 53 console.
2. Click "Registered domains" > "Register domain".
3. Follow the steps to register a domain or use an existing domain.

#### Step 3: Create a Hosted Zone

If you registered your domain with Route 53, a hosted zone is automatically created. If you're using an existing domain registered elsewhere:

1. Navigate to the Route 53 console.
2. Click "Hosted zones" > "Create hosted zone".
3. Enter your domain name and click "Create".
4. Note the NS (Name Server) records and update your domain's name servers at your registrar.

#### Step 4: Create an A Record

1. In your hosted zone, click "Create record".
2. Leave the name field empty (for the apex domain) or enter a subdomain.
3. Choose "A - Routes traffic to an IPv4 address and some AWS resources" as the record type.
4. Enable "Alias".
5. In the "Route traffic to" dropdown, select "Alias to S3 website endpoint".
6. Select your region and S3 bucket.
7. Keep the routing policy as "Simple routing".
8. Click "Create records".

#### Step 5: Test Your Setup

1. Wait for DNS propagation (can take up to 48 hours, but often much less).
2. Open a web browser and navigate to your domain.
3. You should see your static website content.

### Private Hosted Zones

A private hosted zone is a container for DNS records that are only visible within one or more VPCs.

To create a private hosted zone:
1. Navigate to the Route 53 console.
2. Click "Hosted zones" > "Create hosted zone".
3. Enter your domain name (e.g., example.internal).
4. Select "Private hosted zone" for VPCs.
5. Select the VPC to associate with the hosted zone.
6. Click "Create".

You can now create DNS records in this hosted zone that will only resolve within the associated VPC.

## VPC Flow Logs

VPC Flow Logs is a feature that enables you to capture information about the IP traffic going to and from network interfaces in your VPC.

### Benefits of VPC Flow Logs

- **Troubleshooting**: Diagnose overly restrictive security group rules.
- **Security monitoring**: Monitor the traffic reaching your instances.
- **Compliance**: Maintain records of network traffic for compliance requirements.

### Flow Log Record Format

A flow log record represents a network flow in your VPC. Each record is a string with space-separated fields:

```
<version> <account-id> <interface-id> <srcaddr> <dstaddr> <srcport> <dstport> <protocol> <packets> <bytes> <start> <end> <action> <log-status>
```

Example:
```
2 123456789012 eni-1234567890abcdef0 172.31.16.139 172.31.16.21 20641 22 6 20 4249 1418530010 1418530070 ACCEPT OK
```

### Creating VPC Flow Logs

You can create flow logs for:
- VPCs
- Subnets
- Network interfaces

To create a flow log:
1. Navigate to the VPC console.
2. Select the resource for which you want to create a flow log.
3. Click "Actions" > "Create flow log".
4. Configure the flow log:
   - Filter: All, Accepted, or Rejected traffic
   - Maximum aggregation interval: 1 minute or 10 minutes
   - Destination: CloudWatch Logs or S3
   - Log format: Default or custom
5. Click "Create flow log".

### Analyzing Flow Logs

You can analyze flow logs using:
- **CloudWatch Logs Insights**: Query and analyze your logs in real-time.
- **Amazon Athena**: Run SQL queries against your logs stored in S3.
- **Amazon QuickSight**: Create visualizations of your log data.

Example CloudWatch Logs Insights query to find rejected traffic:
```
filter action = "REJECT"
| stats count(*) as requestCount by srcAddr, dstAddr, dstPort
| sort requestCount desc
| limit 20
```

Example Athena query to find the top talkers:
```sql
SELECT srcaddr, dstaddr, dstport, COUNT(*) as count
FROM vpc_flow_logs
WHERE action = 'ACCEPT'
GROUP BY srcaddr, dstaddr, dstport
ORDER BY count DESC
LIMIT 10;
```

## Elastic Load Balancing (ELB)

Elastic Load Balancing automatically distributes incoming application traffic across multiple targets, such as EC2 instances, containers, and IP addresses, in one or more Availability Zones.

### Types of Load Balancers

AWS offers three types of load balancers:

1. **Application Load Balancer (ALB)**: 
   - Operates at the application layer (HTTP/HTTPS)
   - Supports path-based routing, host-based routing, and routing to multiple ports on the same instance
   - Supports WebSockets and HTTP/2
   - Supports redirects
   - Supports user authentication

2. **Network Load Balancer (NLB)**:
   - Operates at the transport layer (TCP/UDP/TLS)
   - Can handle millions of requests per second
   - Supports static IP addresses
   - Preserves source IP address
   - Supports long-lived connections

3. **Classic Load Balancer (CLB)**:
   - Legacy load balancer
   - Operates at both the application and transport layers
   - Not recommended for new applications

### Key Components

- **Listeners**: Check for connection requests.
- **Target groups**: Route requests to registered targets.
- **Health checks**: Determine if targets are available to handle requests.
- **Rules**: Determine how the load balancer routes requests to targets.

### Hands-on Lab: Setting Up an Application Load Balancer

Let's set up an Application Load Balancer to distribute traffic to EC2 instances in multiple Availability Zones.

#### Step 1: Create a Target Group

1. Navigate to the EC2 console and select "Target Groups" under "Load Balancing".
2. Click "Create target group".
3. Configure the target group:
   - Choose a target type: Instances
   - Name: my-target-group
   - Protocol: HTTP
   - Port: 80
   - VPC: Select your VPC
   - Health check protocol: HTTP
   - Health check path: /
   - Advanced health check settings: Use defaults
4. Click "Next".
5. Don't register any targets yet. Click "Create target group".

#### Step 2: Launch EC2 Instances

1. Launch two EC2 instances in different Availability Zones:
   - AMI: Amazon Linux 2
   - Instance type: t2.micro
   - VPC: Your VPC
   - Subnet: Select subnets in different AZs
   - Auto-assign public IP: Enable
   - Security group: Allow HTTP (port 80) from anywhere
   - User data for the first instance:
     ```bash
     #!/bin/bash
     yum update -y
     yum install -y httpd
     systemctl start httpd
     systemctl enable httpd
     echo "<h1>Hello from Instance 1 in AZ $(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)</h1>" > /var/www/html/index.html
     ```
   - User data for the second instance:
     ```bash
     #!/bin/bash
     yum update -y
     yum install -y httpd
     systemctl start httpd
     systemctl enable httpd
     echo "<h1>Hello from Instance 2 in AZ $(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)</h1>" > /var/www/html/index.html
     ```

#### Step 3: Register Instances with the Target Group

1. Navigate to the EC2 console and select "Target Groups" under "Load Balancing".
2. Select your target group and click "Actions" > "Edit".
3. In the "Targets" tab, click "Register targets".
4. Select your instances and click "Include as pending below".
5. Click "Register pending targets".

#### Step 4: Create an Application Load Balancer

1. Navigate to the EC2 console and select "Load Balancers" under "Load Balancing".
2. Click "Create Load Balancer".
3. Select "Application Load Balancer" and click "Create".
4. Configure the load balancer:
   - Name: my-alb
   - Scheme: Internet-facing
   - IP address type: IPv4
   - Listeners: HTTP on port 80
   - Availability Zones: Select at least two AZs and the corresponding subnets
5. Configure security settings (skip if not using HTTPS).
6. Configure security groups:
   - Create a new security group or select an existing one that allows HTTP (port 80) from anywhere.
7. Configure routing:
   - Target group: Select your target group
8. Review and create:
   - Review your settings and click "Create load balancer".

#### Step 5: Test the Load Balancer

1. Wait for the load balancer to be provisioned (state changes to "active").
2. Copy the DNS name of the load balancer.
3. Open a web browser and paste the DNS name.
4. Refresh the page multiple times. You should see the page alternating between the two instances, showing different AZs.

#### Step 6: Clean Up Resources

To avoid incurring charges, delete the resources you created:
1. Delete the load balancer.
2. Delete the target group.
3. Terminate the EC2 instances.

## AWS Global Accelerator

AWS Global Accelerator is a networking service that improves the availability and performance of your applications for local and global users.

### How Global Accelerator Works

1. Global Accelerator provides you with static IP addresses that serve as a fixed entry point to your application.
2. These IP addresses are anycast from AWS edge locations.
3. Traffic is routed to the optimal AWS endpoint based on factors like health, geographic proximity, and routing policies.

### Benefits of Global Accelerator

- **Improved availability**: Automatically routes traffic to the closest healthy endpoint.
- **Better performance**: Uses the AWS global network to optimize the path from users to your application.
- **Static IP addresses**: Provides static IP addresses that eliminate the need for DNS cache refreshes.
- **Instant failover**: Quickly redirects traffic to healthy endpoints during failures.
- **Easy management**: Simplifies global traffic management with a single service.

### Use Cases

- **Multi-region applications**: Route users to the closest healthy region.
- **Gaming**: Reduce latency for global players.
- **IoT**: Provide reliable connectivity for IoT devices.
- **Voice and video**: Improve quality for real-time communications.

### Setting Up Global Accelerator

1. Navigate to the Global Accelerator console.
2. Click "Create accelerator".
3. Configure the accelerator:
   - Name: my-accelerator
   - IP address type: IPv4
4. Add listeners:
   - Protocol: TCP or UDP
   - Port ranges: Specify the ports your application uses
5. Add endpoint groups:
   - Region: Select the AWS regions where your application runs
   - Traffic dial: Control the percentage of traffic to the region
6. Add endpoints:
   - Endpoint type: ALB, NLB, EC2 instance, or Elastic IP
   - Select your endpoints
7. Review and create:
   - Review your settings and click "Create accelerator".

## Conclusion

In this chapter, we've explored AWS networking services and concepts that are essential for designing secure, scalable, and highly available architectures in AWS. We've covered VPC design, subnetting strategies, security groups, network ACLs, connectivity options, and DNS management with Route 53.

Understanding these networking fundamentals is crucial for any AWS Cloud Engineer, as they form the foundation upon which all other AWS services operate. By mastering these concepts and services, you'll be able to design and implement robust network architectures that meet your organization's requirements for security, performance, and reliability.

## Hands-on Project: Building a Multi-Tier Network Architecture

As a final project for this chapter, let's build a complete multi-tier network architecture that incorporates many of the concepts we've learned.

### Project Requirements

Create a network architecture with the following components:
- A VPC with public and private subnets across two Availability Zones
- A bastion host for secure SSH access to instances in private subnets
- Web servers in private subnets
- An Application Load Balancer to distribute traffic to the web servers
- A NAT Gateway for outbound internet access from private subnets
- Security groups and NACLs to control traffic flow
- VPC Flow Logs for network monitoring
- Route 53 for DNS management

### Implementation Steps

1. Create a VPC with CIDR block 10.0.0.0/16.
2. Create subnets:
   - Public subnet 1: 10.0.0.0/24 in AZ1
   - Public subnet 2: 10.0.1.0/24 in AZ2
   - Private web subnet 1: 10.0.2.0/24 in AZ1
   - Private web subnet 2: 10.0.3.0/24 in AZ2
   - Private data subnet 1: 10.0.4.0/24 in AZ1
   - Private data subnet 2: 10.0.5.0/24 in AZ2
3. Create an internet gateway and attach it to the VPC.
4. Create a NAT Gateway in each public subnet.
5. Create route tables:
   - Public route table: Route 0.0.0.0/0 to the internet gateway
   - Private route table for AZ1: Route 0.0.0.0/0 to the NAT Gateway in AZ1
   - Private route table for AZ2: Route 0.0.0.0/0 to the NAT Gateway in AZ2
6. Associate route tables with subnets.
7. Create security groups:
   - Bastion host: Allow SSH from your IP
   - Web servers: Allow SSH from bastion host and HTTP/HTTPS from ALB
   - ALB: Allow HTTP/HTTPS from anywhere
8. Launch a bastion host in a public subnet.
9. Launch web servers in private web subnets.
10. Create an Application Load Balancer with listeners for HTTP and HTTPS.
11. Create a target group and register the web servers.
12. Configure VPC Flow Logs to send logs to CloudWatch Logs.
13. Create a Route 53 hosted zone and records for your domain.

This project will give you hands-on experience with designing and implementing a secure, scalable network architecture in AWS, incorporating many of the services and concepts covered in this chapter.

## Additional Resources

- [Amazon VPC Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [AWS Networking & Content Delivery Blog](https://aws.amazon.com/blogs/networking-and-content-delivery/)
- [AWS re:Invent 2022: Advanced VPC design and new capabilities](https://www.youtube.com/watch?v=fi5A8ZBLmJw)
- [AWS Networking Workshop](https://networking.workshop.aws/)
- [AWS Well-Architected Framework - Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html)

## Practice Exercises

1. Create a VPC with public and private subnets across three Availability Zones.
2. Implement a Transit Gateway to connect multiple VPCs.
3. Set up a private hosted zone in Route 53 for internal DNS resolution.
4. Configure VPC Flow Logs and analyze the logs using CloudWatch Logs Insights.
5. Implement a Network Load Balancer with static IP addresses.
6. Create a Global Accelerator to improve the performance of a multi-region application.
7. Design a network architecture for a three-tier application with web, application, and database layers.

By completing these exercises, you'll gain practical experience with AWS networking services and be well-prepared to design and implement network architectures for your own applications.
