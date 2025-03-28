# AWS Architecture Best Practices

In this chapter, we'll explore AWS architecture best practices that help you design reliable, secure, efficient, and cost-effective cloud architectures. Understanding these best practices is essential for building well-architected applications on AWS. We'll cover the AWS Well-Architected Framework, design patterns, and practical examples of well-architected solutions.

## Introduction to AWS Well-Architected Framework

The AWS Well-Architected Framework helps cloud architects build secure, high-performing, resilient, and efficient infrastructure for their applications. It provides a consistent approach for customers and partners to evaluate architectures and implement designs that will scale over time.

The framework is based on six pillars:

1. **Operational Excellence**: The ability to run and monitor systems to deliver business value and to continually improve supporting processes and procedures.
2. **Security**: The ability to protect information, systems, and assets while delivering business value through risk assessments and mitigation strategies.
3. **Reliability**: The ability of a system to recover from infrastructure or service disruptions, dynamically acquire computing resources to meet demand, and mitigate disruptions such as misconfigurations or transient network issues.
4. **Performance Efficiency**: The ability to use computing resources efficiently to meet system requirements and to maintain that efficiency as demand changes and technologies evolve.
5. **Cost Optimization**: The ability to run systems to deliver business value at the lowest price point.
6. **Sustainability**: The ability to continually improve sustainability impacts by reducing energy consumption and increasing efficiency across all components of a workload.

Let's explore each pillar in detail.

## Operational Excellence Pillar

The Operational Excellence pillar focuses on running and monitoring systems to deliver business value and continually improving processes and procedures. Key topics include managing and automating changes, responding to events, and defining standards to manage daily operations.

### Key Best Practices

1. **Perform operations as code**: Define your entire workload (applications, infrastructure, etc.) as code and update it with code. Implement operations procedures as code and automate their execution by triggering them in response to events.

2. **Make frequent, small, reversible changes**: Design workloads to allow components to be updated regularly. Make changes in small increments that can be reversed if they fail.

3. **Refine operations procedures frequently**: As you evolve your workload, evolve your operations procedures appropriately. Set up regular game days to review and validate that all procedures are effective and that teams are familiar with them.

4. **Anticipate failure**: Perform "pre-mortem" exercises to identify potential sources of failure so that they can be removed or mitigated. Test your failure scenarios and validate your understanding of their impact.

5. **Learn from all operational failures**: Drive improvement through lessons learned from all operational events and failures. Share what is learned across teams and through the entire organization.

### Implementation Examples

#### Infrastructure as Code

Use AWS CloudFormation or Terraform to define your infrastructure:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags:
        - Key: Name
          Value: MyVPC
```

#### Automated Deployment Pipeline

Set up a CI/CD pipeline using AWS CodePipeline, CodeBuild, and CodeDeploy:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyPipeline:
    Type: AWS::CodePipeline::Pipeline
    Properties:
      RoleArn: !GetAtt CodePipelineServiceRole.Arn
      ArtifactStore:
        Type: S3
        Location: !Ref ArtifactBucket
      Stages:
        - Name: Source
          Actions:
            - Name: Source
              ActionTypeId:
                Category: Source
                Owner: AWS
                Provider: CodeStarSourceConnection
                Version: '1'
              Configuration:
                ConnectionArn: !Ref GitHubConnection
                FullRepositoryId: !Ref GitHubRepo
                BranchName: main
              OutputArtifacts:
                - Name: SourceCode
        - Name: Build
          Actions:
            - Name: BuildAction
              ActionTypeId:
                Category: Build
                Owner: AWS
                Provider: CodeBuild
                Version: '1'
              Configuration:
                ProjectName: !Ref CodeBuildProject
              InputArtifacts:
                - Name: SourceCode
              OutputArtifacts:
                - Name: BuildOutput
        - Name: Deploy
          Actions:
            - Name: DeployAction
              ActionTypeId:
                Category: Deploy
                Owner: AWS
                Provider: CodeDeploy
                Version: '1'
              Configuration:
                ApplicationName: !Ref CodeDeployApplication
                DeploymentGroupName: !Ref CodeDeployDeploymentGroup
              InputArtifacts:
                - Name: BuildOutput
```

#### Monitoring and Alerting

Set up CloudWatch alarms and dashboards:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  CPUUtilizationAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmDescription: Alarm if CPU utilization exceeds 80%
      MetricName: CPUUtilization
      Namespace: AWS/EC2
      Statistic: Average
      Period: 300
      EvaluationPeriods: 2
      Threshold: 80
      AlarmActions:
        - !Ref SNSTopic
      Dimensions:
        - Name: InstanceId
          Value: !Ref EC2Instance
      ComparisonOperator: GreaterThanThreshold
```

## Security Pillar

The Security pillar focuses on protecting information, systems, and assets while delivering business value through risk assessments and mitigation strategies. Key topics include confidentiality and integrity of data, identifying and managing who can do what with privilege management, protecting systems, and establishing controls to detect security events.

### Key Best Practices

1. **Implement a strong identity foundation**: Implement the principle of least privilege and enforce separation of duties with appropriate authorization for each interaction with your AWS resources. Centralize identity management, and aim to eliminate reliance on long-term static credentials.

2. **Enable traceability**: Monitor, alert, and audit actions and changes to your environment in real time. Integrate logs and metrics with systems to automatically respond and take action.

3. **Apply security at all layers**: Apply a defense in depth approach with multiple security controls. Apply to all layers (e.g., edge network, VPC, subnet, load balancer, instance, operating system, and application).

4. **Automate security best practices**: Automated software-based security mechanisms improve your ability to securely scale more rapidly and cost-effectively. Create secure architectures, including the implementation of controls that are defined and managed as code in version-controlled templates.

5. **Protect data in transit and at rest**: Classify your data into sensitivity levels and use mechanisms, such as encryption, tokenization, and access control where appropriate.

6. **Keep people away from data**: Create mechanisms and tools to reduce or eliminate the need for direct access or manual processing of data. This reduces the risk of mishandling or modification and human error when handling sensitive data.

7. **Prepare for security events**: Prepare for an incident by having incident management and investigation policy and processes that align to your organizational requirements. Run incident response simulations and use tools with automation to increase your speed for detection, investigation, and recovery.

### Implementation Examples

#### Identity and Access Management

Use AWS IAM to implement least privilege:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/my-prefix/*"
    }
  ]
}
```

#### Network Security

Implement security groups and network ACLs:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Enable HTTP and HTTPS access
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
      SecurityGroupEgress:
        - IpProtocol: -1
          CidrIp: 0.0.0.0/0
```

#### Data Encryption

Encrypt data at rest and in transit:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  EncryptedBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-encrypted-bucket
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256
```

#### Security Monitoring

Set up AWS Security Hub and GuardDuty:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  GuardDuty:
    Type: AWS::GuardDuty::Detector
    Properties:
      Enable: true
      FindingPublishingFrequency: FIFTEEN_MINUTES
  SecurityHub:
    Type: AWS::SecurityHub::Hub
    Properties: {}
```

## Reliability Pillar

The Reliability pillar focuses on the ability of a system to recover from infrastructure or service disruptions, dynamically acquire computing resources to meet demand, and mitigate disruptions such as misconfigurations or transient network issues. Key topics include designing distributed systems, recovery planning, and handling change.

### Key Best Practices

1. **Test recovery procedures**: Test how your system recovers from failure and fix any issues found during testing. Test regularly to ensure that the recovery procedures work and that the team is familiar with the execution of the procedures.

2. **Automatically recover from failure**: Configure your systems to automatically recover from failure. Use automation to react to monitoring data. For example, when a particular metric crosses a threshold, trigger an automated action to remediate the problem.

3. **Scale horizontally to increase aggregate system availability**: Replace one large resource with multiple small resources to reduce the impact of a single failure on the overall system. Distribute requests across multiple, smaller resources to ensure that they don't share a common point of failure.

4. **Stop guessing capacity**: Monitor demand and system utilization, and automate the addition or removal of resources to maintain the optimal level to satisfy demand without over- or under-provisioning.

5. **Manage change in automation**: Use automation to make changes to infrastructure and manage changes to automation.

### Implementation Examples

#### High Availability Architecture

Design a multi-AZ architecture:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MultiAZDB:
    Type: AWS::RDS::DBInstance
    Properties:
      AllocatedStorage: 20
      DBInstanceClass: db.t3.micro
      Engine: MySQL
      MasterUsername: admin
      MasterUserPassword: !Ref DBPassword
      MultiAZ: true
```

#### Auto Scaling

Implement Auto Scaling for EC2 instances:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServerGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      VPCZoneIdentifier:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      LaunchConfigurationName: !Ref LaunchConfig
      MinSize: 2
      MaxSize: 10
      DesiredCapacity: 2
      TargetGroupARNs:
        - !Ref ALBTargetGroup
  CPUScalingPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref WebServerGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: ASGAverageCPUUtilization
        TargetValue: 70.0
```

#### Disaster Recovery

Implement backup and restore procedures:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  BackupVault:
    Type: AWS::Backup::BackupVault
    Properties:
      BackupVaultName: MyBackupVault
  BackupPlan:
    Type: AWS::Backup::BackupPlan
    Properties:
      BackupPlan:
        BackupPlanName: DailyBackupPlan
        BackupPlanRule:
          - RuleName: DailyBackups
            TargetBackupVault: !Ref BackupVault
            ScheduleExpression: cron(0 5 ? * * *)
            StartWindowMinutes: 60
            CompletionWindowMinutes: 180
            Lifecycle:
              DeleteAfterDays: 35
```

#### Fault Isolation

Use multiple Availability Zones and implement bulkhead patterns:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
```

## Performance Efficiency Pillar

The Performance Efficiency pillar focuses on the efficient use of computing resources to meet requirements and how to maintain that efficiency as demand changes and technologies evolve. Key topics include selecting the right resource types and sizes based on workload requirements, monitoring performance, and making informed decisions to maintain efficiency as business needs evolve.

### Key Best Practices

1. **Democratize advanced technologies**: Make advanced technology implementation easier for your team by delegating complex tasks to your cloud vendor. Rather than having your team learn how to host and run a new technology, consider consuming the technology as a service.

2. **Go global in minutes**: Easily deploy your system in multiple AWS Regions around the world with just a few clicks. This allows you to provide lower latency and a better experience for your customers at minimal cost.

3. **Use serverless architectures**: Serverless architectures remove the need for you to run and maintain physical servers for traditional compute activities. For example, serverless storage services can act as static websites (removing the need for web servers) and event services can host code.

4. **Experiment more often**: With virtual and automatable resources, you can quickly carry out comparative testing using different types of instances, storage, or configurations.

5. **Consider mechanical sympathy**: Use the technology approach that aligns best with your objectives. For example, consider data access patterns when selecting database or storage approaches.

### Implementation Examples

#### Right-Sizing Resources

Choose appropriate instance types for your workload:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t3.micro  # Choose based on workload requirements
      ImageId: ami-0c55b159cbfafe1f0
```

#### Serverless Architecture

Use AWS Lambda and API Gateway:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            return {
              statusCode: 200,
              body: JSON.stringify('Hello from Lambda!'),
            };
          };
      Runtime: nodejs14.x
  MyApi:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MyApi
  MyResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref MyApi
      ParentId: !GetAtt MyApi.RootResourceId
      PathPart: hello
  MyMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref MyApi
      ResourceId: !Ref MyResource
      HttpMethod: GET
      AuthorizationType: NONE
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${MyFunction.Arn}/invocations
```

#### Content Delivery Network

Use Amazon CloudFront to deliver content globally:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        DefaultCacheBehavior:
          TargetOriginId: myS3Origin
          ViewerProtocolPolicy: redirect-to-https
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
        Origins:
          - DomainName: !GetAtt MyBucket.DomainName
            Id: myS3Origin
            S3OriginConfig:
              OriginAccessIdentity: !Sub origin-access-identity/cloudfront/${CloudFrontOAI}
```

#### Caching

Implement caching with ElastiCache:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  RedisCluster:
    Type: AWS::ElastiCache::CacheCluster
    Properties:
      Engine: redis
      CacheNodeType: cache.t3.micro
      NumCacheNodes: 1
      VpcSecurityGroupIds:
        - !Ref RedisSecurityGroup
```

## Cost Optimization Pillar

The Cost Optimization pillar focuses on avoiding unnecessary costs. Key topics include understanding and controlling where money is being spent, selecting the most appropriate and right number of resource types, analyzing spend over time, and scaling to meet business needs without overspending.

### Key Best Practices

1. **Implement Cloud Financial Management**: Dedicate time and resources to build capability in this new domain of technology and usage management. Similar to your Security or Operations capability, you need to build capability through knowledge building, programs, resources, and processes to become a cost-efficient organization.

2. **Adopt a consumption model**: Pay only for the computing resources that you require and increase or decrease usage depending on business requirements, not by using elaborate forecasting. For example, development and test environments are typically only used for eight hours a day during the work week. You can stop these resources when they're not in use for a potential cost savings of 75% (40 hours versus 168 hours).

3. **Measure overall efficiency**: Measure the business output of the workload and the costs associated with delivering it. Use this measure to understand the gains you make from increasing output and reducing costs.

4. **Stop spending money on undifferentiated heavy lifting**: AWS does the heavy lifting of data center operations like racking, stacking, and powering servers. It also removes the operational burden of managing operating systems and applications with managed services. This allows you to focus on your customers and business projects rather than on IT infrastructure.

5. **Analyze and attribute expenditure**: The cloud makes it easier to accurately identify the usage and cost of systems, which then allows transparent attribution of IT costs to individual workload owners. This helps measure return on investment (ROI) and gives workload owners an opportunity to optimize their resources and reduce costs.

### Implementation Examples

#### Resource Tagging

Implement a tagging strategy for cost allocation:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t3.micro
      ImageId: ami-0c55b159cbfafe1f0
      Tags:
        - Key: Environment
          Value: Production
        - Key: Department
          Value: Marketing
        - Key: Project
          Value: Website
```

#### Reserved Instances

Use Reserved Instances for predictable workloads:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyReservedInstance:
    Type: AWS::EC2::ReservedInstances
    Properties:
      InstanceType: t3.micro
      InstanceCount: 1
      OfferingClass: standard
      ProductDescription: Linux/UNIX
      ReservedInstancesOfferingId: 4b2293b4-5813-4679-a6e6-EXAMPLE
      AvailabilityZone: us-east-1a
      Duration: 31536000  # 1 year in seconds
```

#### Auto Scaling Based on Demand

Scale resources based on demand:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServerGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      VPCZoneIdentifier:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      LaunchConfigurationName: !Ref LaunchConfig
      MinSize: 1
      MaxSize: 10
      DesiredCapacity: 2
  ScaleUpPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AdjustmentType: ChangeInCapacity
      AutoScalingGroupName: !Ref WebServerGroup
      Cooldown: 60
      ScalingAdjustment: 1
  CPUAlarmHigh:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmDescription: Scale up if CPU > 80% for 5 minutes
      MetricName: CPUUtilization
      Namespace: AWS/EC2
      Statistic: Average
      Period: 300
      EvaluationPeriods: 1
      Threshold: 80
      AlarmActions:
        - !Ref ScaleUpPolicy
      Dimensions:
        - Name: AutoScalingGroupName
          Value: !Ref WebServerGroup
      ComparisonOperator: GreaterThanThreshold
```

#### Serverless for Cost Optimization

Use serverless services to pay only for what you use:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            return {
              statusCode: 200,
              body: JSON.stringify('Hello from Lambda!'),
            };
          };
      Runtime: nodejs14.x
      MemorySize: 128  # Optimize memory size for cost
      Timeout: 3
```

## Sustainability Pillar

The Sustainability pillar focuses on minimizing the environmental impacts of running cloud workloads. Key topics include a shared responsibility model for sustainability, understanding impact, and maximizing utilization to minimize required resources and reduce downstream impacts.

### Key Best Practices

1. **Understand your impact**: Measure the impact of your cloud workload and model the future impact of your workload. Include all sources of impact, including impacts resulting from customer use of your products, and impacts resulting from their eventual decommissioning and retirement. Compare the productive output with the total impact of your cloud workloads by reviewing the resources and emissions required per unit of work.

2. **Establish sustainability goals**: For each cloud workload, establish long-term sustainability goals such as reducing the compute and storage resources required per transaction. Model the return on investment of sustainability improvements for existing workloads, and give owners the resources they need to invest in sustainability goals.

3. **Maximize utilization**: Right-size workloads and implement efficient design to ensure high utilization and maximize the energy efficiency of the underlying hardware. Two hosts running at 30% utilization are less efficient than one host running at 60% due to baseline power consumption.

4. **Anticipate and adopt new, more efficient hardware and software offerings**: Support the upstream improvements your partners and suppliers make to help you reduce the impact of your cloud workloads.

5. **Use managed services**: Sharing services across a broad customer base helps maximize resource utilization, which reduces the amount of infrastructure needed to support cloud workloads. For example, customers can share the impact of common data center components like power and networking by migrating workloads to the AWS Cloud and adopting managed services.

6. **Reduce the downstream impact of your cloud workloads**: Reduce the amount of energy or resources required to use your services and reduce the need for your customers to upgrade their devices.

### Implementation Examples

#### Right-Sizing Resources

Choose the most efficient instance types:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: t4g.micro  # ARM-based instances are more energy-efficient
      ImageId: ami-0c55b159cbfafe1f0
```

#### Implement Lifecycle Policies

Automatically transition or delete data based on lifecycle policies:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  DataBucket:
    Type: AWS::S3::Bucket
    Properties:
      LifecycleConfiguration:
        Rules:
          - Id: TransitionToGlacier
            Status: Enabled
            Transitions:
              - TransitionInDays: 30
                StorageClass: GLACIER
            ExpirationInDays: 365
```

#### Use Graviton Processors

Use AWS Graviton processors for better performance per watt:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  GravitonCluster:
    Type: AWS::ECS::Cluster
    Properties:
      ClusterName: GravitonCluster
  GravitonService:
    Type: AWS::ECS::Service
    Properties:
      Cluster: !Ref GravitonCluster
      TaskDefinition: !Ref GravitonTaskDefinition
      DesiredCount: 2
  GravitonTaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: graviton-task
      RequiresCompatibilities:
        - FARGATE
      Cpu: 256
      Memory: 512
      RuntimePlatform:
        CpuArchitecture: ARM64
        OperatingSystemFamily: LINUX
      ContainerDefinitions:
        - Name: web-app
          Image: public.ecr.aws/nginx/nginx:latest
          Essential: true
          PortMappings:
            - ContainerPort: 80
```

#### Optimize Data Transfer

Reduce data transfer with compression and caching:

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  MyDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        DefaultCacheBehavior:
          TargetOriginId: myS3Origin
          ViewerProtocolPolicy: redirect-to-https
          Compress: true  # Enable compression
          MinTTL: 86400   # Cache for at least 1 day
          DefaultTTL: 86400
          MaxTTL: 31536000  # Cache for up to 1 year
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
        Origins:
          - DomainName: !GetAtt MyBucket.DomainName
            Id: myS3Origin
            S3OriginConfig:
              OriginAccessIdentity: !Sub origin-access-identity/cloudfront/${CloudFrontOAI}
```

## AWS Architecture Design Patterns

Design patterns are reusable solutions to common problems in software architecture. Let's explore some common AWS architecture design patterns.

### Microservices Architecture

Microservices architecture is an approach to building applications as a collection of small, independent services that communicate over well-defined APIs.

#### Implementation Example

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  UserServiceFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            // User service logic
          };
      Runtime: nodejs14.x
  OrderServiceFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            // Order service logic
          };
      Runtime: nodejs14.x
  ProductServiceFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            // Product service logic
          };
      Runtime: nodejs14.x
  ApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MicroservicesApi
```

### Serverless Architecture

Serverless architecture allows you to build and run applications without thinking about servers. It eliminates infrastructure management tasks and scales automatically.

#### Implementation Example

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  ApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: ServerlessApi
  LambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            // Function logic
          };
      Runtime: nodejs14.x
  DynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub serverless-app-${AWS::AccountId}
```

### Event-Driven Architecture

Event-driven architecture is a design pattern where components communicate through events. It enables loose coupling and scalability.

#### Implementation Example

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  EventBus:
    Type: AWS::Events::EventBus
    Properties:
      Name: MyEventBus
  OrderCreatedRule:
    Type: AWS::Events::Rule
    Properties:
      EventBusName: !Ref EventBus
      EventPattern:
        source:
          - com.mycompany.orders
        detail-type:
          - OrderCreated
      Targets:
        - Arn: !GetAtt ProcessOrderFunction.Arn
          Id: ProcessOrderTarget
  ProcessOrderFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          exports.handler = async (event) => {
            // Process order logic
          };
      Runtime: nodejs14.x
  OrderCreatedPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref ProcessOrderFunction
      Principal: events.amazonaws.com
      SourceArn: !GetAtt OrderCreatedRule.Arn
```

### Multi-Tier Architecture

Multi-tier architecture separates an application into multiple logical and physical tiers, typically web, application, and database tiers.

#### Implementation Example

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.3.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.4.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
  DatabaseSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.5.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  DatabaseSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.6.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
  WebTierALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref WebTierALBSecurityGroup
  AppTierALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Subnets:
        - !Ref PrivateSubnet1
        - !Ref PrivateSubnet2
      SecurityGroups:
        - !Ref AppTierALBSecurityGroup
      Scheme: internal
  Database:
    Type: AWS::RDS::DBInstance
    Properties:
      Engine: MySQL
      DBInstanceClass: db.t3.small
      AllocatedStorage: 20
      DBSubnetGroupName: !Ref DBSubnetGroup
      VPCSecurityGroups:
        - !Ref DatabaseSecurityGroup
      MultiAZ: true
  DBSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: Subnet group for the database
      SubnetIds:
        - !Ref DatabaseSubnet1
        - !Ref DatabaseSubnet2
```

### Hybrid Architecture

Hybrid architecture combines on-premises infrastructure with cloud services, allowing you to extend your existing infrastructure to the cloud.

#### Implementation Example

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
  VPNGateway:
    Type: AWS::EC2::VPNGateway
    Properties:
      Type: ipsec.1
      Tags:
        - Key: Name
          Value: MyVPNGateway
  CustomerGateway:
    Type: AWS::EC2::CustomerGateway
    Properties:
      Type: ipsec.1
      BgpAsn: 65000
      IpAddress: 203.0.113.1  # On-premises router IP
  VPNConnection:
    Type: AWS::EC2::VPNConnection
    Properties:
      Type: ipsec.1
      CustomerGatewayId: !Ref CustomerGateway
      VpnGatewayId: !Ref VPNGateway
      StaticRoutesOnly: true
  DirectConnectGateway:
    Type: AWS::DirectConnect::DirectConnectGateway
    Properties:
      AmazonSideAsn: 64512
      DirectConnectGatewayName: MyDirectConnectGateway
```

## Well-Architected Reference Architectures

Let's explore some reference architectures that follow the AWS Well-Architected Framework.

### Web Application Hosting

A scalable, highly available web application architecture.

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.3.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.4.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
  InternetGateway:
    Type: AWS::EC2::InternetGateway
  VPCGatewayAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref InternetGateway
  NatGateway1:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt NatGateway1EIP.AllocationId
      SubnetId: !Ref PublicSubnet1
  NatGateway1EIP:
    Type: AWS::EC2::EIP
    Properties:
      Domain: vpc
  NatGateway2:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt NatGateway2EIP.AllocationId
      SubnetId: !Ref PublicSubnet2
  NatGateway2EIP:
    Type: AWS::EC2::EIP
    Properties:
      Domain: vpc
  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: VPCGatewayAttachment
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway
  PublicSubnet1RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnet1
      RouteTableId: !Ref PublicRouteTable
  PublicSubnet2RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnet2
      RouteTableId: !Ref PublicRouteTable
  PrivateRouteTable1:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
  PrivateRoute1:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTable1
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NatGateway1
  PrivateSubnet1RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PrivateSubnet1
      RouteTableId: !Ref PrivateRouteTable1
  PrivateRouteTable2:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
  PrivateRoute2:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTable2
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NatGateway2
  PrivateSubnet2RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PrivateSubnet2
      RouteTableId: !Ref PrivateRouteTable2
  ALBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for the ALB
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for the web servers
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          SourceSecurityGroupId: !Ref ALBSecurityGroup
  DBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for the database
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 3306
          ToPort: 3306
          SourceSecurityGroupId: !Ref WebServerSecurityGroup
  ALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref ALBSecurityGroup
  ALBTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      VpcId: !Ref VPC
      Port: 80
      Protocol: HTTP
      HealthCheckPath: /
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 5
  ALBListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref ALBTargetGroup
      LoadBalancerArn: !Ref ALB
      Port: 80
      Protocol: HTTP
  WebServerLaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateData:
        ImageId: ami-0c55b159cbfafe1f0
        InstanceType: t3.micro
        SecurityGroupIds:
          - !Ref WebServerSecurityGroup
        UserData:
          Fn::Base64: !Sub |
            #!/bin/bash -xe
            yum update -y
            yum install -y httpd
            systemctl start httpd
            systemctl enable httpd
            echo "<html><body><h1>Hello, World!</h1></body></html>" > /var/www/html/index.html
  WebServerAutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      VPCZoneIdentifier:
        - !Ref PrivateSubnet1
        - !Ref PrivateSubnet2
      LaunchTemplate:
        LaunchTemplateId: !Ref WebServerLaunchTemplate
        Version: !GetAtt WebServerLaunchTemplate.LatestVersionNumber
      MinSize: 2
      MaxSize: 10
      DesiredCapacity: 2
      TargetGroupARNs:
        - !Ref ALBTargetGroup
      HealthCheckType: ELB
      HealthCheckGracePeriod: 300
  ScaleUpPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref WebServerAutoScalingGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: ASGAverageCPUUtilization
        TargetValue: 70.0
  DBSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: Subnet group for the database
      SubnetIds:
        - !Ref PrivateSubnet1
        - !Ref PrivateSubnet2
  Database:
    Type: AWS::RDS::DBInstance
    Properties:
      Engine: MySQL
      DBInstanceClass: db.t3.small
      AllocatedStorage: 20
      DBSubnetGroupName: !Ref DBSubnetGroup
      VPCSecurityGroups:
        - !Ref DBSecurityGroup
      MultiAZ: true
      BackupRetentionPeriod: 7
      DeleteAutomatedBackups: false
      DeletionProtection: true
```

### Serverless Web Application

A serverless web application architecture using AWS Lambda, API Gateway, DynamoDB, and S3.

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  ApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: ServerlessApi
  ApiGatewayResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref ApiGateway
      ParentId: !GetAtt ApiGateway.RootResourceId
      PathPart: items
  ApiGatewayMethod:
    Type: AWS::ApiGateway::Method
    Properties:
      RestApiId: !Ref ApiGateway
      ResourceId: !Ref ApiGatewayResource
      HttpMethod: GET
      AuthorizationType: NONE
      Integration:
        Type: AWS_PROXY
        IntegrationHttpMethod: POST
        Uri: !Sub arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${GetItemsFunction.Arn}/invocations
  ApiGatewayDeployment:
    Type: AWS::ApiGateway::Deployment
    DependsOn: ApiGatewayMethod
    Properties:
      RestApiId: !Ref ApiGateway
      StageName: prod
  GetItemsFunction:
    Type: AWS::Lambda::Function
    Properties:
      Handler: index.handler
      Role: !GetAtt LambdaExecutionRole.Arn
      Code:
        ZipFile: |
          const AWS = require('aws-sdk');
          const dynamodb = new AWS.DynamoDB.DocumentClient();
          
          exports.handler = async (event) => {
            const params = {
              TableName: process.env.TABLE_NAME
            };
            
            try {
              const data = await dynamodb.scan(params).promise();
              return {
                statusCode: 200,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data.Items)
              };
            } catch (error) {
              return {
                statusCode: 500,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: error.message })
              };
            }
          };
      Runtime: nodejs14.x
      Environment:
        Variables:
          TABLE_NAME: !Ref DynamoDBTable
  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
      Policies:
        - PolicyName: DynamoDBAccess
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:Scan
                Resource: !GetAtt DynamoDBTable.Arn
  ApiGatewayPermission:
    Type: AWS::Lambda::Permission
    Properties:
      Action: lambda:InvokeFunction
      FunctionName: !Ref GetItemsFunction
      Principal: apigateway.amazonaws.com
      SourceArn: !Sub arn:aws:execute-api:${AWS::Region}:${AWS::AccountId}:${ApiGateway}/*/GET/items
  DynamoDBTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST
  WebsiteBucket:
    Type: AWS::S3::Bucket
    Properties:
      WebsiteConfiguration:
        IndexDocument: index.html
      PublicAccessBlockConfiguration:
        BlockPublicAcls: false
        BlockPublicPolicy: false
        IgnorePublicAcls: false
        RestrictPublicBuckets: false
  WebsiteBucketPolicy:
    Type: AWS::S3::BucketPolicy
    Properties:
      Bucket: !Ref WebsiteBucket
      PolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal: '*'
            Action: s3:GetObject
            Resource: !Sub ${WebsiteBucket.Arn}/*
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt WebsiteBucket.RegionalDomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: ''
        Enabled: true
        DefaultRootObject: index.html
        DefaultCacheBehavior:
          TargetOriginId: S3Origin
          ForwardedValues:
            QueryString: false
            Cookies:
              Forward: none
          ViewerProtocolPolicy: redirect-to-https
        PriceClass: PriceClass_100
        ViewerCertificate:
          CloudFrontDefaultCertificate: true
```

### Microservices Architecture

A microservices architecture using Amazon ECS, API Gateway, and DynamoDB.

```yaml
# CloudFormation example
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.3.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.4.0/24
      AvailabilityZone: !Select [1, !GetAZs '']
  ECSCluster:
    Type: AWS::ECS::Cluster
    Properties:
      ClusterName: MicroservicesCluster
  UserServiceTaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: user-service
      RequiresCompatibilities:
        - FARGATE
      NetworkMode: awsvpc
      Cpu: 256
      Memory: 512
      ExecutionRoleArn: !GetAtt ECSTaskExecutionRole.Arn
      TaskRoleArn: !GetAtt UserServiceTaskRole.Arn
      ContainerDefinitions:
        - Name: user-service
          Image: amazon/amazon-ecs-sample
          Essential: true
          PortMappings:
            - ContainerPort: 80
          LogConfiguration:
            LogDriver: awslogs
            Options:
              awslogs-group: !Ref UserServiceLogGroup
              awslogs-region: !Ref AWS::Region
              awslogs-stream-prefix: user-service
  OrderServiceTaskDefinition:
    Type: AWS::ECS::TaskDefinition
    Properties:
      Family: order-service
      RequiresCompatibilities:
        - FARGATE
      NetworkMode: awsvpc
      Cpu: 256
      Memory: 512
      ExecutionRoleArn: !GetAtt ECSTaskExecutionRole.Arn
      TaskRoleArn: !GetAtt OrderServiceTaskRole.Arn
      ContainerDefinitions:
        - Name: order-service
          Image: amazon/amazon-ecs-sample
          Essential: true
          PortMappings:
            - ContainerPort: 80
          LogConfiguration:
            LogDriver: awslogs
            Options:
              awslogs-group: !Ref OrderServiceLogGroup
              awslogs-region: !Ref AWS::Region
              awslogs-stream-prefix: order-service
  UserServiceLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: /ecs/user-service
      RetentionInDays: 30
  OrderServiceLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: /ecs/order-service
      RetentionInDays: 30
  ECSTaskExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
  UserServiceTaskRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: UserServicePolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:GetItem
                  - dynamodb:PutItem
                  - dynamodb:UpdateItem
                  - dynamodb:DeleteItem
                  - dynamodb:Query
                  - dynamodb:Scan
                Resource: !GetAtt UserTable.Arn
  OrderServiceTaskRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ecs-tasks.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: OrderServicePolicy
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - dynamodb:GetItem
                  - dynamodb:PutItem
                  - dynamodb:UpdateItem
                  - dynamodb:DeleteItem
                  - dynamodb:Query
                  - dynamodb:Scan
                Resource: !GetAtt OrderTable.Arn
  UserServiceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for user service
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          SourceSecurityGroupId: !Ref ALBSecurityGroup
  OrderServiceSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for order service
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          SourceSecurityGroupId: !Ref ALBSecurityGroup
  ALBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Security group for the ALB
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
  UserServiceService:
    Type: AWS::ECS::Service
    Properties:
      ServiceName: user-service
      Cluster: !Ref ECSCluster
      TaskDefinition: !Ref UserServiceTaskDefinition
      DesiredCount: 2
      LaunchType: FARGATE
      NetworkConfiguration:
        AwsvpcConfiguration:
          AssignPublicIp: DISABLED
          SecurityGroups:
            - !Ref UserServiceSecurityGroup
          Subnets:
            - !Ref PrivateSubnet1
            - !Ref PrivateSubnet2
      LoadBalancers:
        - ContainerName: user-service
          ContainerPort: 80
          TargetGroupArn: !Ref UserServiceTargetGroup
  OrderServiceService:
    Type: AWS::ECS::Service
    Properties:
      ServiceName: order-service
      Cluster: !Ref ECSCluster
      TaskDefinition: !Ref OrderServiceTaskDefinition
      DesiredCount: 2
      LaunchType: FARGATE
      NetworkConfiguration:
        AwsvpcConfiguration:
          AssignPublicIp: DISABLED
          SecurityGroups:
            - !Ref OrderServiceSecurityGroup
          Subnets:
            - !Ref PrivateSubnet1
            - !Ref PrivateSubnet2
      LoadBalancers:
        - ContainerName: order-service
          ContainerPort: 80
          TargetGroupArn: !Ref OrderServiceTargetGroup
  ALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
      SecurityGroups:
        - !Ref ALBSecurityGroup
  UserServiceTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      HealthCheckPath: /health
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 5
      Port: 80
      Protocol: HTTP
      TargetType: ip
      VpcId: !Ref VPC
  OrderServiceTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      HealthCheckPath: /health
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 5
      Port: 80
      Protocol: HTTP
      TargetType: ip
      VpcId: !Ref VPC
  UserServiceListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref UserServiceTargetGroup
      LoadBalancerArn: !Ref ALB
      Port: 80
      Protocol: HTTP
  UserTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST
  OrderTable:
    Type: AWS::DynamoDB::Table
    Properties:
      AttributeDefinitions:
        - AttributeName: id
          AttributeType: S
      KeySchema:
        - AttributeName: id
          KeyType: HASH
      BillingMode: PAY_PER_REQUEST
  ApiGateway:
    Type: AWS::ApiGateway::RestApi
    Properties:
      Name: MicroservicesApi
  UserResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref ApiGateway
      ParentId: !GetAtt ApiGateway.RootResourceId
      PathPart: users
  OrderResource:
    Type: AWS::ApiGateway::Resource
    Properties:
      RestApiId: !Ref ApiGateway
      ParentId: !GetAtt ApiGateway.RootResourceId
      PathPart: orders
```

## Conclusion

In this chapter, we've explored AWS architecture best practices that help you design reliable, secure, efficient, and cost-effective cloud architectures. We've covered the AWS Well-Architected Framework, design patterns, and practical examples of well-architected solutions.

Understanding these best practices is essential for building well-architected applications on AWS. By following the principles of the Well-Architected Framework and implementing appropriate design patterns, you can create cloud architectures that meet your business requirements while being reliable, secure, efficient, and cost-effective.

## Hands-on Project: Building a Well-Architected Application

As a final project for this chapter, let's build a well-architected application that follows the principles of the AWS Well-Architected Framework.

### Project Requirements

Create a web application with the following characteristics:
- Highly available and fault-tolerant
- Secure and compliant
- Performance-efficient
- Cost-optimized
- Sustainable
- Operationally excellent

### Implementation Steps

1. Design the architecture:
   - Multi-AZ deployment for high availability
   - Auto Scaling for elasticity
   - Security groups and network ACLs for network security
   - IAM roles and policies for access control
   - Encryption for data protection
   - Monitoring and alerting for operational excellence

2. Implement the infrastructure:
   - Use Infrastructure as Code (CloudFormation or Terraform)
   - Create a VPC with public and private subnets
   - Set up security groups and network ACLs
   - Create IAM roles and policies
   - Set up Auto Scaling groups
   - Configure load balancers
   - Set up databases with encryption and backups

3. Implement the application:
   - Use a serverless architecture where appropriate
   - Implement caching for performance
   - Use managed services to reduce operational overhead
   - Implement logging and monitoring
   - Set up automated deployments

4. Implement security:
   - Enable encryption at rest and in transit
   - Implement least privilege access
   - Set up security monitoring and alerting
   - Implement compliance controls

5. Optimize for cost:
   - Right-size resources
   - Implement Auto Scaling
   - Use reserved instances for predictable workloads
   - Implement lifecycle policies for storage
   - Set up cost monitoring and alerting

6. Implement operational excellence:
   - Set up CI/CD pipelines
   - Implement infrastructure as code
   - Set up monitoring and alerting
   - Create runbooks and playbooks
   - Implement automated remediation

This project will give you hands-on experience with designing and implementing a well-architected application on AWS, incorporating many of the principles and best practices covered in this chapter.

## Additional Resources

- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Solutions Library](https://aws.amazon.com/solutions/)
- [AWS Well-Architected Tool](https://aws.amazon.com/well-architected-tool/)
- [AWS re:Invent 2022: AWS Well-Architected best practices](https://www.youtube.com/watch?v=_Z5FfXtAx-Q)

## Practice Exercises

1. Use the AWS Well-Architected Tool to assess an existing workload.
2. Design a multi-tier web application that follows the Well-Architected Framework.
3. Implement a serverless architecture using AWS Lambda, API Gateway, and DynamoDB.
4. Design a microservices architecture using Amazon ECS or EKS.
5. Implement a disaster recovery solution for a critical application.
6. Design a hybrid architecture that connects on-premises infrastructure to AWS.
7. Implement a cost optimization strategy for an existing workload.
8. Design a security architecture that follows the principle of least privilege.

By completing these exercises, you'll gain practical experience with AWS architecture best practices and be well-prepared to design and implement well-architected solutions for your own applications.
