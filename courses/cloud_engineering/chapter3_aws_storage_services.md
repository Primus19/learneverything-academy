# Chapter 3: AWS Storage Services

## Introduction to AWS Storage Services

Storage is a fundamental component of any cloud infrastructure. AWS offers a comprehensive suite of storage services designed to meet various requirements, from simple object storage to complex file systems and specialized data migration solutions. In this chapter, we'll explore AWS's core storage services, including Amazon S3, Amazon EBS, Amazon EFS, AWS Storage Gateway, Amazon S3 Glacier, and the AWS Snow Family.

Each storage service is designed for specific use cases, with different performance characteristics, durability guarantees, and pricing models. Understanding these differences is crucial for designing cost-effective and efficient cloud architectures.

### Overview of AWS Storage Services

AWS offers several storage services, each designed for specific use cases:

1. **Amazon Simple Storage Service (S3)**: Object storage service for storing and retrieving any amount of data from anywhere on the web.

2. **Amazon Elastic Block Store (EBS)**: Persistent block storage volumes for use with Amazon EC2 instances.

3. **Amazon Elastic File System (EFS)**: Scalable file storage for use with Amazon EC2 instances and AWS Lambda.

4. **AWS Storage Gateway**: Hybrid storage service that enables on-premises applications to seamlessly use AWS cloud storage.

5. **Amazon S3 Glacier**: Low-cost storage service for data archiving and long-term backup.

6. **AWS Snow Family**: Physical devices to migrate large amounts of data into and out of AWS.

7. **Amazon FSx**: Fully managed file systems that support Windows File Server, Lustre, NetApp ONTAP, and OpenZFS.

8. **Amazon Elastic Block Store (EBS) Snapshots**: Point-in-time copies of EBS volumes stored in Amazon S3.

### Choosing the Right Storage Service

Selecting the appropriate storage service depends on several factors:

1. **Data Type**: Structured vs. unstructured data, file size, and format.

2. **Access Pattern**: Random vs. sequential access, read-heavy vs. write-heavy workloads.

3. **Performance Requirements**: IOPS, throughput, and latency needs.

4. **Durability and Availability**: Required level of data protection and accessibility.

5. **Cost Considerations**: Budget constraints and cost optimization goals.

6. **Integration Requirements**: Compatibility with existing applications and systems.

Let's explore each of these storage services in detail, starting with Amazon S3, the cornerstone of AWS storage services.

## Amazon S3 for Object Storage

Amazon Simple Storage Service (S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. It can store and retrieve any amount of data from anywhere on the web, making it ideal for a wide range of use cases, from static website hosting to data lakes for big data analytics.

### S3 Core Concepts

#### Objects and Buckets

S3 stores data as objects within buckets. An object consists of a file and optionally any metadata that describes that file.

- **Objects**: The fundamental entities stored in S3. Each object can be up to 5 TB in size and includes the data, a key (name), and metadata.

- **Buckets**: Containers for objects. Each bucket must have a globally unique name across all of AWS. You can have up to 100 buckets per AWS account by default.

#### S3 Data Organization

S3 uses a flat structure rather than a hierarchical file system:

- **Keys**: Object identifiers within a bucket. The key is the full path to the object, including any prefixes (folders).

- **Prefixes**: Common string beginnings for keys, used to organize objects within a bucket (similar to folders).

- **Delimiters**: Characters used to group keys hierarchically (typically the forward slash "/").

#### S3 URLs and Endpoints

S3 objects can be accessed via URLs:

- **Virtual-hosted-style URL**: `https://bucket-name.s3.region.amazonaws.com/key-name`
- **Path-style URL**: `https://s3.region.amazonaws.com/bucket-name/key-name`

#### S3 Storage Classes

S3 offers different storage classes optimized for different use cases:

1. **S3 Standard**: General-purpose storage for frequently accessed data.
   - High durability (99.999999999%, 11 9's) and availability (99.99%)
   - Low latency and high throughput
   - Designed for 99.999999999% durability across multiple AZs
   - Ideal for: Big data analytics, mobile and gaming applications, content distribution

2. **S3 Intelligent-Tiering**: Automatically moves objects between access tiers based on changing access patterns.
   - Same performance as S3 Standard
   - Small monthly monitoring and automation fee per object
   - Automatically moves objects between two access tiers: frequent access and infrequent access
   - Ideal for: Data with unknown or changing access patterns

3. **S3 Standard-IA (Infrequent Access)**: For data that is accessed less frequently but requires rapid access when needed.
   - Same durability as S3 Standard with slightly lower availability (99.9%)
   - Lower storage cost than S3 Standard, but with retrieval fees
   - Minimum storage duration of 30 days
   - Ideal for: Disaster recovery, backups

4. **S3 One Zone-IA**: Stores data in a single Availability Zone, costs 20% less than Standard-IA.
   - Same durability within the AZ as other S3 storage classes, but data is lost if the AZ is destroyed
   - Lower availability (99.5%) than other S3 storage classes
   - Minimum storage duration of 30 days
   - Ideal for: Secondary backup copies or easily recreatable data

5. **S3 Glacier Instant Retrieval**: For archive data that needs immediate access.
   - Same performance as S3 Standard
   - Retrieval in milliseconds
   - Higher retrieval costs
   - Minimum storage duration of 90 days
   - Ideal for: Archive data that needs immediate access

6. **S3 Glacier Flexible Retrieval**: Low-cost storage for archive data that is accessed 1-2 times per year.
   - Retrieval times from minutes to hours
   - Very low storage cost
   - Minimum storage duration of 90 days
   - Ideal for: Archive data that doesn't need immediate access

7. **S3 Glacier Deep Archive**: Lowest-cost storage class for long-term retention.
   - Retrieval time of 12 hours
   - Lowest storage cost
   - Minimum storage duration of 180 days
   - Ideal for: Long-term data archiving, compliance archives, digital preservation

8. **S3 Outposts**: Object storage for on-premises AWS Outposts environments.
   - Uses S3 APIs and features
   - Designed for data that needs to remain on-premises
   - Ideal for: Applications with local data processing needs

#### S3 Lifecycle Management

S3 Lifecycle management allows you to automatically transition objects between storage classes or expire them based on defined rules:

- **Transition Actions**: Move objects from one storage class to another after a specified time period.
- **Expiration Actions**: Delete objects after a specified time period.

Example lifecycle configuration:

```json
{
  "Rules": [
    {
      "ID": "Move to IA after 30 days, then to Glacier after 90 days",
      "Status": "Enabled",
      "Prefix": "documents/",
      "Transitions": [
        {
          "Days": 30,
          "StorageClass": "STANDARD_IA"
        },
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        }
      ]
    },
    {
      "ID": "Delete logs after 90 days",
      "Status": "Enabled",
      "Prefix": "logs/",
      "Expiration": {
        "Days": 90
      }
    }
  ]
}
```

#### S3 Versioning

S3 versioning keeps multiple variants of an object in the same bucket, allowing you to preserve, retrieve, and restore every version of every object stored in your bucket:

- **Benefits**: Protection from accidental deletions and overwrites, data recovery, and ability to roll back to previous versions.
- **Considerations**: Increased storage costs as all versions of an object are stored.

Once enabled, versioning cannot be disabled, only suspended.

### Creating and Managing S3 Buckets

Let's walk through the process of creating and managing S3 buckets using the AWS Management Console and AWS CLI.

#### Creating a Bucket Using the AWS Management Console

1. Sign in to the AWS Management Console and open the S3 console.
2. Click "Create bucket".
3. Enter a unique bucket name.
4. Select the AWS Region where you want the bucket to reside.
5. Configure bucket settings:
   - Object ownership
   - Block Public Access settings
   - Bucket versioning
   - Default encryption
   - Advanced settings (object lock, tags, etc.)
6. Click "Create bucket".

#### Creating a Bucket Using the AWS CLI

```bash
aws s3api create-bucket --bucket my-unique-bucket-name --region us-east-1
```

For regions other than us-east-1, you need to specify the location constraint:

```bash
aws s3api create-bucket --bucket my-unique-bucket-name --region eu-west-1 --create-bucket-configuration LocationConstraint=eu-west-1
```

#### Uploading Objects to a Bucket

Using the AWS Management Console:

1. Navigate to your bucket in the S3 console.
2. Click "Upload".
3. Select files or folders to upload.
4. Configure upload settings:
   - Storage class
   - Encryption settings
   - Metadata
   - Permissions
5. Click "Upload".

Using the AWS CLI:

```bash
# Upload a single file
aws s3 cp myfile.txt s3://my-bucket/

# Upload a directory
aws s3 cp my-directory/ s3://my-bucket/my-directory/ --recursive

# Upload with a specific storage class
aws s3 cp myfile.txt s3://my-bucket/ --storage-class STANDARD_IA
```

#### Managing Objects in a Bucket

Using the AWS Management Console:

1. Navigate to your bucket in the S3 console.
2. Select an object to view its properties, download it, delete it, or perform other actions.
3. Use the "Actions" dropdown to perform operations on selected objects.

Using the AWS CLI:

```bash
# List objects in a bucket
aws s3 ls s3://my-bucket/

# Download an object
aws s3 cp s3://my-bucket/myfile.txt myfile.txt

# Delete an object
aws s3 rm s3://my-bucket/myfile.txt

# Move an object
aws s3 mv s3://my-bucket/myfile.txt s3://my-bucket/subfolder/myfile.txt
```

### S3 Security and Access Control

S3 provides several mechanisms to control access to your data:

#### S3 Block Public Access

Block Public Access settings provide additional controls to ensure that objects in your buckets are not accidentally made public:

- Block public access to buckets and objects granted through new access control lists (ACLs)
- Block public access to buckets and objects granted through any access control lists (ACLs)
- Block public access to buckets and objects granted through new public bucket or access point policies
- Block public and cross-account access to buckets and objects through any public bucket or access point policies

These settings can be applied at the bucket level or at the account level.

#### S3 Bucket Policies

Bucket policies are JSON-based access policies attached to buckets. They define who can access the bucket and what actions they can perform.

Example bucket policy allowing public read access to all objects in a bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

#### Access Control Lists (ACLs)

ACLs are legacy access control mechanisms that define which AWS accounts or groups are granted access and the type of access. ACLs can be applied to buckets and objects.

AWS recommends using bucket policies and IAM policies instead of ACLs when possible.

#### IAM Policies

IAM policies can be attached to users, groups, or roles to control their access to S3 resources.

Example IAM policy allowing read access to a specific bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-bucket",
        "arn:aws:s3:::my-bucket/*"
      ]
    }
  ]
}
```

#### S3 Access Points

S3 Access Points are named network endpoints attached to buckets that simplify managing data access at scale for shared datasets in S3.

Each access point has its own access point policy that works with the bucket policy to control access to the bucket.

#### S3 Object Ownership

S3 Object Ownership is an S3 bucket setting that you can use to control ownership of objects uploaded to your bucket and to disable or enable ACLs:

- **Bucket owner enforced**: ACLs are disabled, and the bucket owner automatically owns and has full control over every object in the bucket.
- **Bucket owner preferred**: The bucket owner owns and has full control over new objects that other accounts write to the bucket with the bucket-owner-full-control canned ACL.
- **Object writer**: The AWS account that uploads an object owns the object, has full control over it, and can grant other users access to it through ACLs.

### S3 Data Protection

S3 provides several features to protect your data:

#### Encryption

S3 offers multiple encryption options:

1. **Server-Side Encryption (SSE)**:
   - **SSE-S3**: Amazon S3-managed keys
   - **SSE-KMS**: AWS Key Management Service-managed keys
   - **SSE-C**: Customer-provided keys

2. **Client-Side Encryption**: You encrypt data before uploading it to S3.

You can enforce encryption using bucket policies or default encryption settings.

#### Versioning

As mentioned earlier, S3 versioning keeps multiple variants of an object in the same bucket, protecting against accidental deletions and overwrites.

#### Object Lock

S3 Object Lock allows you to store objects using a write-once-read-many (WORM) model:

- **Retention Mode**: Specifies how long objects must be retained.
  - **Governance Mode**: Users with specific permissions can override retention settings.
  - **Compliance Mode**: No one, including the root user, can override retention settings.
- **Legal Hold**: Prevents an object from being overwritten or deleted until the legal hold is removed.

#### Replication

S3 replication enables automatic, asynchronous copying of objects across buckets in the same or different AWS Regions:

- **Same-Region Replication (SRR)**: Replicates objects within the same region.
- **Cross-Region Replication (CRR)**: Replicates objects across different regions.

Replication can be used for compliance requirements, data redundancy, or to minimize latency for users in different geographic locations.

### S3 Performance Optimization

S3 provides several features to optimize performance:

#### S3 Transfer Acceleration

S3 Transfer Acceleration enables fast, easy, and secure transfers of files over long distances between your client and an S3 bucket. It uses Amazon CloudFront's globally distributed edge locations to route data over an optimized network path.

#### Multipart Upload

Multipart upload allows you to upload a single object as a set of parts. Each part is a contiguous portion of the object's data. You can upload these parts independently and in any order.

Benefits of multipart upload:
- Improved throughput
- Quick recovery from network issues
- Pause and resume uploads
- Begin an upload before you know the final object size

#### S3 Select

S3 Select enables applications to retrieve only a subset of data from an object by using simple SQL expressions. This can significantly improve performance and reduce cost for applications that need to access specific data from objects.

#### S3 Inventory

S3 Inventory provides scheduled flat-file output of your objects and their metadata, which can be used for business, compliance, and analytical workflows.

### S3 Use Cases

S3 is versatile and can be used for various scenarios:

1. **Static Website Hosting**: Host static websites with custom domain names.

2. **Backup and Recovery**: Store backups of on-premises or cloud data.

3. **Data Lakes**: Store and analyze vast amounts of unstructured data.

4. **Content Distribution**: Store and distribute media files, software, and other content.

5. **Big Data Analytics**: Store data for processing with services like Amazon EMR, Amazon Redshift, and AWS Glue.

6. **Mobile Applications**: Store user-generated content, assets, and backups.

7. **IoT Data Storage**: Store data from Internet of Things (IoT) devices.

8. **Disaster Recovery**: Replicate data across regions for disaster recovery.

### Hands-On Lab: Working with Amazon S3

In this lab, we'll create an S3 bucket, upload objects, configure bucket policies, and set up static website hosting.

#### Prerequisites

- An AWS account
- AWS CLI installed and configured (optional)

#### Step 1: Create an S3 Bucket

1. Sign in to the AWS Management Console and open the S3 console.

2. Click "Create bucket".

3. Enter a unique bucket name (e.g., "my-unique-bucket-name-123").

4. Select a region (e.g., "US East (N. Virginia)").

5. Keep the default settings for "Object Ownership" (ACLs disabled).

6. For "Block Public Access settings for this bucket", keep all options checked for now.

7. Keep the default settings for "Bucket Versioning" (disabled).

8. Keep the default settings for "Default encryption" (Amazon S3-managed keys).

9. Click "Create bucket".

#### Step 2: Upload Objects to the Bucket

1. Click on the bucket name to open it.

2. Click "Upload".

3. Click "Add files" and select a few files from your computer (e.g., some images or text files).

4. Keep the default settings for "Destination", "Permissions", and "Properties".

5. Click "Upload".

6. Wait for the upload to complete and verify that your files appear in the bucket.

#### Step 3: Configure Bucket Policies

1. Click on the "Permissions" tab.

2. Scroll down to "Bucket policy" and click "Edit".

3. Enter a policy that allows public read access to all objects in the bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

Replace "your-bucket-name" with your actual bucket name.

4. Click "Save changes".

5. You'll see a warning that your bucket is now public. This is expected for this lab.

6. Go back to the "Permissions" tab and under "Block public access (bucket settings)", click "Edit".

7. Uncheck "Block all public access" and all four sub-options.

8. Click "Save changes".

9. Type "confirm" in the confirmation dialog and click "Confirm".

#### Step 4: Set Up Static Website Hosting

1. Click on the "Properties" tab.

2. Scroll down to "Static website hosting" and click "Edit".

3. Select "Enable".

4. For "Hosting type", select "Host a static website".

5. For "Index document", enter "index.html".

6. For "Error document", enter "error.html".

7. Click "Save changes".

8. Create simple HTML files for index.html and error.html:

index.html:
```html
<!DOCTYPE html>
<html>
<head>
    <title>My S3 Website</title>
</head>
<body>
    <h1>Welcome to my S3 website!</h1>
    <p>This is a simple static website hosted on Amazon S3.</p>
</body>
</html>
```

error.html:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Error</title>
</head>
<body>
    <h1>Error</h1>
    <p>The requested page was not found.</p>
</body>
</html>
```

9. Upload these files to your bucket as described in Step 2.

10. Go back to the "Properties" tab and scroll down to "Static website hosting".

11. Note the "Bucket website endpoint" URL. This is the URL of your static website.

12. Open the URL in a web browser to verify that your website is working.

#### Step 5: Configure Lifecycle Rules

1. Click on the "Management" tab.

2. Scroll down to "Lifecycle rules" and click "Create lifecycle rule".

3. Enter a name for the rule (e.g., "Move to IA and Glacier").

4. For "Rule scope", select "Apply to all objects in the bucket".

5. Under "Lifecycle rule actions", select "Move current versions of objects between storage classes" and "Expire current versions of objects".

6. Configure the transitions:
   - Transition to Standard-IA after 30 days
   - Transition to Glacier after 90 days

7. Configure the expiration:
   - Expire objects after 365 days

8. Click "Create rule".

#### Step 6: Enable Versioning

1. Click on the "Properties" tab.

2. Scroll down to "Bucket Versioning" and click "Edit".

3. Select "Enable" and click "Save changes".

4. Go back to the bucket contents and upload a new version of one of your files.

5. Click on the file name to view its details.

6. Click on the "Versions" tab to see all versions of the file.

#### Step 7: Clean Up

To avoid incurring charges, clean up the resources you created:

1. Delete all objects in the bucket:
   - Select all objects
   - Click "Delete"
   - Type "permanently delete" in the confirmation dialog
   - Click "Delete objects"

2. If versioning is enabled, you need to delete all versions:
   - Click "Show versions" at the top of the bucket contents
   - Select all objects and versions
   - Click "Delete"
   - Type "permanently delete" in the confirmation dialog
   - Click "Delete objects"

3. Delete the bucket:
   - Go back to the S3 console home
   - Select your bucket
   - Click "Delete"
   - Type your bucket name in the confirmation dialog
   - Click "Delete bucket"

## Amazon EBS for Block Storage

Amazon Elastic Block Store (EBS) provides persistent block storage volumes for use with Amazon EC2 instances. EBS volumes are network-attached storage that persists independently from the life of an instance, similar to a virtual hard drive.

### EBS Core Concepts

#### EBS Volumes

EBS volumes are block-level storage devices that you can attach to EC2 instances. Key characteristics include:

- **Persistence**: Data persists even when the associated EC2 instance is terminated.
- **Flexibility**: Volumes can be attached to and detached from instances as needed.
- **Snapshots**: Point-in-time backups of volumes can be created and stored in S3.
- **Encryption**: Volumes can be encrypted for additional security.
- **Performance**: Various volume types offer different performance characteristics.

#### EBS Volume Types

EBS offers several volume types optimized for different use cases:

1. **General Purpose SSD (gp2 and gp3)**:
   - Balanced price and performance
   - 3 IOPS/GB up to 16,000 IOPS for gp2
   - Baseline of 3,000 IOPS and 125 MiB/s for gp3, can be provisioned up to 16,000 IOPS and 1,000 MiB/s
   - Ideal for: Boot volumes, development and test environments, low-latency interactive applications

2. **Provisioned IOPS SSD (io1 and io2)**:
   - Highest performance SSD volume
   - Up to 64,000 IOPS and 1,000 MiB/s throughput
   - io2 offers higher durability and more IOPS per GiB than io1
   - Ideal for: I/O-intensive applications, large database workloads, applications that need sustained IOPS performance

3. **Throughput Optimized HDD (st1)**:
   - Low-cost HDD volume
   - Baseline throughput of 40 MB/s/TB, burst up to 250 MB/s/TB
   - Maximum throughput of 500 MB/s per volume
   - Cannot be a boot volume
   - Ideal for: Big data, data warehouses, log processing

4. **Cold HDD (sc1)**:
   - Lowest cost HDD volume
   - Baseline throughput of 12 MB/s/TB, burst up to 80 MB/s/TB
   - Maximum throughput of 250 MB/s per volume
   - Cannot be a boot volume
   - Ideal for: Infrequently accessed data, scenarios where the lowest storage cost is important

5. **Magnetic (standard)**:
   - Previous generation HDD volume
   - Average 100 IOPS, can burst to hundreds of IOPS
   - Ideal for: Workloads where data is infrequently accessed and lowest cost is important

#### EBS Snapshots

EBS snapshots are point-in-time copies of EBS volumes that are stored in Amazon S3. Key features include:

- **Incremental Backups**: Only the blocks that have changed since the last snapshot are saved.
- **Data Protection**: Snapshots can be used to protect data against accidental deletion or corruption.
- **Data Migration**: Snapshots can be used to migrate data across regions or accounts.
- **Volume Creation**: New volumes can be created from snapshots.

#### EBS Encryption

EBS encryption provides encryption for EBS volumes and snapshots. When you create an encrypted EBS volume:

- Data at rest inside the volume is encrypted
- All data moving between the volume and the instance is encrypted
- All snapshots created from the volume are encrypted
- All volumes created from those snapshots are encrypted

You can enable encryption by default for all new EBS volumes and snapshot copies in your account.

### Creating and Managing EBS Volumes

Let's walk through the process of creating and managing EBS volumes using the AWS Management Console and AWS CLI.

#### Creating an EBS Volume Using the AWS Management Console

1. Sign in to the AWS Management Console and open the EC2 console.
2. In the navigation pane, choose "Volumes" under "Elastic Block Store".
3. Click "Create Volume".
4. Configure the volume:
   - Volume Type: Choose the appropriate volume type for your workload
   - Size: Specify the size in GiB
   - Availability Zone: Select the same AZ as the instance you plan to attach it to
   - Snapshot ID: Optionally, create the volume from a snapshot
   - Encryption: Enable or disable encryption
   - Tags: Add tags to help identify the volume
5. Click "Create Volume".

#### Creating an EBS Volume Using the AWS CLI

```bash
aws ec2 create-volume --volume-type gp3 --size 100 --availability-zone us-east-1a
```

#### Attaching an EBS Volume to an EC2 Instance

Using the AWS Management Console:

1. In the EC2 console, select the volume you created.
2. Click "Actions" > "Attach Volume".
3. Select the instance to attach the volume to.
4. Specify the device name (e.g., /dev/sdf).
5. Click "Attach".

Using the AWS CLI:

```bash
aws ec2 attach-volume --volume-id vol-1234567890abcdef0 --instance-id i-1234567890abcdef0 --device /dev/sdf
```

#### Making the Volume Available for Use

After attaching the volume, you need to make it available for use:

For Linux instances:

1. Connect to your instance using SSH.
2. Check if the volume has a partition:

```bash
lsblk
```

3. If the volume is new and doesn't have a partition, create a file system:

```bash
sudo mkfs -t xfs /dev/xvdf
```

4. Create a mount point:

```bash
sudo mkdir /data
```

5. Mount the volume:

```bash
sudo mount /dev/xvdf /data
```

6. To mount the volume automatically after reboot, add an entry to /etc/fstab:

```bash
echo '/dev/xvdf /data xfs defaults,nofail 0 2' | sudo tee -a /etc/fstab
```

For Windows instances:

1. Connect to your instance using RDP.
2. Open Disk Management (diskmgmt.msc).
3. Initialize the disk if prompted.
4. Create a new simple volume, format it with NTFS, and assign a drive letter.

#### Creating EBS Snapshots

Using the AWS Management Console:

1. In the EC2 console, select the volume.
2. Click "Actions" > "Create Snapshot".
3. Enter a description for the snapshot.
4. Add tags if needed.
5. Click "Create Snapshot".

Using the AWS CLI:

```bash
aws ec2 create-snapshot --volume-id vol-1234567890abcdef0 --description "My snapshot"
```

#### Restoring a Volume from a Snapshot

Using the AWS Management Console:

1. In the EC2 console, navigate to "Snapshots".
2. Select the snapshot.
3. Click "Actions" > "Create Volume".
4. Configure the new volume (size, type, AZ, etc.).
5. Click "Create Volume".

Using the AWS CLI:

```bash
aws ec2 create-volume --snapshot-id snap-1234567890abcdef0 --availability-zone us-east-1a
```

### EBS Performance Optimization

To optimize EBS performance, consider the following:

#### Instance Types

Choose an instance type that supports EBS optimization. EBS-optimized instances provide dedicated throughput between your EC2 instance and EBS volumes.

#### RAID Configurations

For increased performance, you can create a RAID 0 array with multiple EBS volumes:

- **RAID 0**: Striping, which distributes I/O across volumes, increasing performance but with no redundancy.
- **RAID 1**: Mirroring, which provides redundancy but doesn't increase performance.

#### Pre-warming EBS Volumes

New EBS volumes created from snapshots need to be pre-warmed to achieve optimal performance. You can pre-warm a volume by reading all the blocks on the volume.

#### Monitoring EBS Performance

Use Amazon CloudWatch to monitor EBS volume performance metrics:

- **VolumeReadOps and VolumeWriteOps**: The number of read and write operations.
- **VolumeReadBytes and VolumeWriteBytes**: The number of bytes read and written.
- **VolumeTotalReadTime and VolumeTotalWriteTime**: The total time spent on read and write operations.
- **VolumeIdleTime**: The total time the volume was idle.
- **VolumeQueueLength**: The number of pending I/O requests.

### EBS Use Cases

EBS is suitable for various scenarios:

1. **Boot Volumes**: Store the operating system and application data for EC2 instances.

2. **Database Storage**: Provide reliable, high-performance storage for databases.

3. **Development and Test Environments**: Provide flexible storage for development and testing.

4. **Enterprise Applications**: Support enterprise applications that require persistent storage.

5. **Backup and Recovery**: Use snapshots for backup and disaster recovery.

### Hands-On Lab: Working with Amazon EBS

In this lab, we'll create an EBS volume, attach it to an EC2 instance, create a file system, and take a snapshot.

#### Prerequisites

- An AWS account
- An EC2 instance running in your account
- AWS CLI installed and configured (optional)

#### Step 1: Create an EBS Volume

1. Sign in to the AWS Management Console and open the EC2 console.

2. In the navigation pane, choose "Volumes" under "Elastic Block Store".

3. Click "Create Volume".

4. Configure the volume:
   - Volume Type: "General Purpose SSD (gp3)"
   - Size: 10 GiB
   - Availability Zone: Select the same AZ as your EC2 instance
   - Encryption: Keep the default setting
   - Tags: Add a tag with Key="Name" and Value="MyDataVolume"

5. Click "Create Volume".

6. Wait for the volume state to become "Available".

#### Step 2: Attach the Volume to Your EC2 Instance

1. Select the volume you just created.

2. Click "Actions" > "Attach Volume".

3. In the "Instance" field, select your EC2 instance.

4. For "Device name", keep the default value (e.g., /dev/sdf).

5. Click "Attach".

6. Verify that the volume state changes to "In-use".

#### Step 3: Connect to Your EC2 Instance

For Linux instances:

1. In the EC2 console, select your instance.

2. Click "Connect".

3. Follow the instructions to connect to your instance using SSH.

For Windows instances:

1. In the EC2 console, select your instance.

2. Click "Connect".

3. Follow the instructions to connect to your instance using RDP.

#### Step 4: Make the Volume Available for Use

For Linux instances:

1. Check if the volume is available:

```bash
lsblk
```

You should see your new volume listed (e.g., xvdf).

2. Create a file system on the volume:

```bash
sudo mkfs -t xfs /dev/xvdf
```

3. Create a mount point:

```bash
sudo mkdir /data
```

4. Mount the volume:

```bash
sudo mount /dev/xvdf /data
```

5. Verify that the volume is mounted:

```bash
df -h
```

6. Add an entry to /etc/fstab to mount the volume automatically after reboot:

```bash
echo '/dev/xvdf /data xfs defaults,nofail 0 2' | sudo tee -a /etc/fstab
```

For Windows instances:

1. Open Disk Management (diskmgmt.msc).

2. If prompted to initialize the disk, select "GPT" and click "OK".

3. Right-click on the unallocated space and select "New Simple Volume".

4. Follow the wizard to create a new volume:
   - Specify the volume size
   - Assign a drive letter
   - Format the volume with NTFS
   - Give the volume a label (e.g., "Data")

5. Click "Finish".

#### Step 5: Create Some Test Data

For Linux instances:

```bash
sudo dd if=/dev/zero of=/data/testfile bs=1M count=1000
```

This creates a 1 GB test file.

For Windows instances:

1. Open Command Prompt as Administrator.

2. Navigate to your new drive (e.g., E:).

3. Create a test file:

```cmd
fsutil file createnew testfile 1073741824
```

This creates a 1 GB test file.

#### Step 6: Create a Snapshot of the Volume

1. In the EC2 console, navigate to "Volumes".

2. Select your volume.

3. Click "Actions" > "Create Snapshot".

4. Enter a description (e.g., "Snapshot of MyDataVolume").

5. Add a tag with Key="Name" and Value="MyDataVolumeSnapshot".

6. Click "Create Snapshot".

7. Navigate to "Snapshots" to monitor the progress of your snapshot.

8. Wait for the snapshot state to become "Completed".

#### Step 7: Create a New Volume from the Snapshot

1. In the EC2 console, navigate to "Snapshots".

2. Select your snapshot.

3. Click "Actions" > "Create Volume".

4. Configure the new volume:
   - Volume Type: "General Purpose SSD (gp3)"
   - Size: 10 GiB (same as the original volume)
   - Availability Zone: Select the same AZ as your EC2 instance
   - Encryption: Keep the default setting
   - Tags: Add a tag with Key="Name" and Value="RestoredVolume"

5. Click "Create Volume".

6. Wait for the volume state to become "Available".

#### Step 8: Clean Up

To avoid incurring charges, clean up the resources you created:

1. Unmount the volume (for Linux instances):

```bash
sudo umount /data
```

2. Detach the volumes:
   - In the EC2 console, navigate to "Volumes"
   - Select your volumes
   - Click "Actions" > "Detach Volume"
   - Click "Yes, Detach"

3. Delete the volumes:
   - Select your volumes
   - Click "Actions" > "Delete Volume"
   - Click "Yes, Delete"

4. Delete the snapshot:
   - Navigate to "Snapshots"
   - Select your snapshot
   - Click "Actions" > "Delete Snapshot"
   - Click "Yes, Delete"

## Amazon EFS for File Storage

Amazon Elastic File System (EFS) provides scalable file storage for use with Amazon EC2 instances. EFS is designed to provide massively parallel shared access to thousands of EC2 instances, enabling your applications to achieve high levels of aggregate throughput and IOPS with consistent low latencies.

### EFS Core Concepts

#### EFS File Systems

An EFS file system is a fully managed elastic NFS file system that can be mounted on multiple EC2 instances simultaneously. Key characteristics include:

- **Elasticity**: Automatically grows and shrinks as you add and remove files.
- **Shared Access**: Multiple EC2 instances can access the file system concurrently.
- **Durability and Availability**: Data is stored redundantly across multiple Availability Zones.
- **Performance**: Provides low-latency access with high throughput and IOPS.
- **Security**: Integrates with IAM for access control and supports encryption at rest and in transit.

#### EFS Performance Modes

EFS offers two performance modes:

1. **General Purpose**: Default mode, ideal for latency-sensitive use cases like web serving, content management, and home directories.

2. **Max I/O**: Higher throughput and IOPS, but with slightly higher latency. Ideal for big data, media processing, and scientific computing.

#### EFS Throughput Modes

EFS offers three throughput modes:

1. **Bursting**: Throughput scales with the size of the file system. Provides a base rate of 50 MiB/s per TiB of storage and can burst up to 100 MiB/s per TiB.

2. **Provisioned**: You specify the throughput regardless of the size of the file system. Useful when you need higher throughput than the bursting model provides.

3. **Elastic**: Automatically scales throughput up or down based on workload. Provides up to 3 GiB/s for reads and 1 GiB/s for writes.

#### EFS Storage Classes

EFS offers two storage classes:

1. **Standard**: For frequently accessed files.

2. **Infrequent Access (IA)**: For files that are accessed less frequently. Costs less than Standard but has a retrieval fee.

You can use lifecycle management to automatically move files between storage classes based on access patterns.

### Creating and Managing EFS File Systems

Let's walk through the process of creating and managing EFS file systems using the AWS Management Console and AWS CLI.

#### Creating an EFS File System Using the AWS Management Console

1. Sign in to the AWS Management Console and open the EFS console.
2. Click "Create file system".
3. Choose "Customize" for more options or "Create" for quick creation with default settings.
4. If you chose "Customize", configure the file system:
   - Name: Enter a name for your file system
   - Availability and Durability: Choose "Regional" for multi-AZ redundancy
   - Automatic backups: Enable or disable
   - Lifecycle management: Configure if needed
   - Performance mode: Choose "General Purpose" or "Max I/O"
   - Throughput mode: Choose "Bursting", "Provisioned", or "Elastic"
   - Encryption: Enable or disable encryption at rest
5. Configure network access:
   - VPC: Select your VPC
   - Mount targets: Create mount targets in the subnets where your EC2 instances are located
   - Security groups: Select or create security groups that allow NFS traffic (port 2049)
6. Review and create the file system.

#### Creating an EFS File System Using the AWS CLI

```bash
# Create a security group for the EFS mount targets
aws ec2 create-security-group --group-name efs-sg --description "EFS Security Group" --vpc-id vpc-1234567890abcdef0

# Add an inbound rule to allow NFS traffic
aws ec2 authorize-security-group-ingress --group-id sg-1234567890abcdef0 --protocol tcp --port 2049 --source-group sg-0987654321fedcba0

# Create the EFS file system
aws efs create-file-system --performance-mode generalPurpose --throughput-mode bursting --encrypted --tags Key=Name,Value=MyEFSFileSystem

# Create mount targets in each subnet
aws efs create-mount-target --file-system-id fs-1234567890abcdef0 --subnet-id subnet-1234567890abcdef0 --security-groups sg-1234567890abcdef0
aws efs create-mount-target --file-system-id fs-1234567890abcdef0 --subnet-id subnet-0987654321fedcba0 --security-groups sg-1234567890abcdef0
```

#### Mounting an EFS File System on EC2 Instances

To mount an EFS file system on an EC2 instance:

1. Install the NFS client:

For Amazon Linux, Amazon Linux 2, and most other Linux distributions:

```bash
sudo yum install -y nfs-utils
```

For Ubuntu:

```bash
sudo apt-get install -y nfs-common
```

2. Create a mount point:

```bash
sudo mkdir /efs
```

3. Mount the file system:

```bash
sudo mount -t nfs4 -o nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport fs-1234567890abcdef0.efs.us-east-1.amazonaws.com:/ /efs
```

4. Verify that the file system is mounted:

```bash
df -h
```

5. To mount the file system automatically after reboot, add an entry to /etc/fstab:

```bash
echo 'fs-1234567890abcdef0.efs.us-east-1.amazonaws.com:/ /efs nfs4 nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport 0 0' | sudo tee -a /etc/fstab
```

#### Using the EFS Mount Helper

AWS provides an EFS mount helper that simplifies the process of mounting EFS file systems and includes additional features like encryption in transit:

1. Install the EFS mount helper:

For Amazon Linux and Amazon Linux 2:

```bash
sudo yum install -y amazon-efs-utils
```

For Ubuntu:

```bash
sudo apt-get install -y git
git clone https://github.com/aws/efs-utils
cd efs-utils
./build-deb.sh
sudo apt-get install -y ./build/amazon-efs-utils*deb
```

2. Mount the file system using the mount helper:

```bash
sudo mount -t efs fs-1234567890abcdef0:/ /efs
```

3. To enable encryption in transit:

```bash
sudo mount -t efs -o tls fs-1234567890abcdef0:/ /efs
```

4. To mount the file system automatically after reboot, add an entry to /etc/fstab:

```bash
echo 'fs-1234567890abcdef0:/ /efs efs defaults,_netdev 0 0' | sudo tee -a /etc/fstab
```

### EFS Security

EFS provides several security features:

#### Network Security

EFS mount targets are associated with security groups that control network access to the file system. You should configure these security groups to allow NFS traffic (port 2049) only from trusted sources.

#### IAM Authentication

EFS supports IAM authentication for NFS clients, allowing you to use IAM policies to control access to your file system:

1. Create an IAM policy that grants access to the file system:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "elasticfilesystem:ClientMount",
        "elasticfilesystem:ClientWrite"
      ],
      "Resource": "arn:aws:elasticfilesystem:us-east-1:123456789012:file-system/fs-1234567890abcdef0"
    }
  ]
}
```

2. Attach the policy to the IAM role used by your EC2 instances.

3. Mount the file system with IAM authorization:

```bash
sudo mount -t efs -o tls,iam fs-1234567890abcdef0:/ /efs
```

#### Encryption

EFS supports encryption at rest and in transit:

- **Encryption at Rest**: You can enable encryption at rest when creating a file system. EFS uses AWS KMS to manage the encryption keys.

- **Encryption in Transit**: You can enable encryption in transit when mounting the file system using the EFS mount helper with the `tls` option.

### EFS Performance Optimization

To optimize EFS performance, consider the following:

#### Choose the Right Performance Mode

- **General Purpose**: Lower latency, suitable for most workloads.
- **Max I/O**: Higher throughput and IOPS, but with slightly higher latency. Suitable for highly parallel workloads.

#### Choose the Right Throughput Mode

- **Bursting**: Suitable for workloads with variable throughput needs.
- **Provisioned**: Suitable for workloads that consistently need high throughput.
- **Elastic**: Suitable for unpredictable workloads that might need high throughput.

#### Optimize Client Settings

- Use the recommended mount options: `nfsvers=4.1,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport`
- Use the EFS mount helper for simplified mounting and encryption in transit.

#### Use Parallel Operations

- Distribute workloads across multiple instances to take advantage of EFS's distributed nature.
- Use parallel processing tools and techniques to maximize throughput.

### EFS Use Cases

EFS is suitable for various scenarios:

1. **Content Management Systems**: Store and serve web content.

2. **Web Serving**: Host static and dynamic website content.

3. **Application Development**: Share code and files across development environments.

4. **Big Data and Analytics**: Store and process large datasets.

5. **Media Processing**: Store and process media files.

6. **Home Directories**: Provide shared home directories for users.

7. **Database Backups**: Store database backups that need to be accessed by multiple instances.

8. **Container Storage**: Provide persistent storage for containerized applications.

### Hands-On Lab: Working with Amazon EFS

In this lab, we'll create an EFS file system, mount it on multiple EC2 instances, and test shared access.

#### Prerequisites

- An AWS account
- Two EC2 instances running in the same VPC but different Availability Zones
- AWS CLI installed and configured (optional)

#### Step 1: Create an EFS File System

1. Sign in to the AWS Management Console and open the EFS console.

2. Click "Create file system".

3. Choose "Customize".

4. Configure the file system:
   - Name: "MyEFSFileSystem"
   - Availability and Durability: "Regional"
   - Automatic backups: Disabled
   - Lifecycle management: Enable with 30-day policy
   - Performance mode: "General Purpose"
   - Throughput mode: "Bursting"
   - Encryption: Enable encryption at rest

5. Click "Next".

6. Configure network access:
   - VPC: Select the VPC where your EC2 instances are located
   - Mount targets: Create mount targets in the subnets where your EC2 instances are located
   - Security groups: Create or select security groups that allow NFS traffic (port 2049) from your EC2 instances

7. Click "Next", review your settings, and click "Create".

8. Wait for the file system to be created and the mount targets to become available.

#### Step 2: Install the NFS Client and EFS Mount Helper on Your EC2 Instances

Connect to each of your EC2 instances and run the following commands:

For Amazon Linux and Amazon Linux 2:

```bash
sudo yum update -y
sudo yum install -y nfs-utils amazon-efs-utils
```

For Ubuntu:

```bash
sudo apt-get update
sudo apt-get install -y nfs-common
sudo apt-get install -y git
git clone https://github.com/aws/efs-utils
cd efs-utils
./build-deb.sh
sudo apt-get install -y ./build/amazon-efs-utils*deb
```

#### Step 3: Mount the EFS File System on Your EC2 Instances

On each EC2 instance:

1. Create a mount point:

```bash
sudo mkdir /efs
```

2. Mount the file system using the EFS mount helper:

```bash
sudo mount -t efs fs-1234567890abcdef0:/ /efs
```

Replace `fs-1234567890abcdef0` with your actual file system ID.

3. Verify that the file system is mounted:

```bash
df -h
```

4. Add an entry to /etc/fstab to mount the file system automatically after reboot:

```bash
echo 'fs-1234567890abcdef0:/ /efs efs defaults,_netdev 0 0' | sudo tee -a /etc/fstab
```

Replace `fs-1234567890abcdef0` with your actual file system ID.

#### Step 4: Test Shared Access

1. On the first EC2 instance, create a file in the EFS file system:

```bash
sudo touch /efs/testfile
echo "This is a test file created on instance 1" | sudo tee /efs/testfile
ls -l /efs
cat /efs/testfile
```

2. On the second EC2 instance, verify that you can see and modify the file:

```bash
ls -l /efs
cat /efs/testfile
echo "This line was added on instance 2" | sudo tee -a /efs/testfile
cat /efs/testfile
```

3. Go back to the first instance and verify that you can see the changes:

```bash
cat /efs/testfile
```

#### Step 5: Test Performance

1. On one of the EC2 instances, create a large file to test write performance:

```bash
time dd if=/dev/zero of=/efs/largefile bs=1M count=1000
```

This creates a 1 GB file and reports the time taken.

2. Test read performance:

```bash
time dd if=/efs/largefile of=/dev/null bs=1M
```

3. Clean up the large file:

```bash
rm /efs/largefile
```

#### Step 6: Clean Up

To avoid incurring charges, clean up the resources you created:

1. Unmount the file system on each EC2 instance:

```bash
sudo umount /efs
```

2. Remove the entry from /etc/fstab on each EC2 instance:

```bash
sudo sed -i '/efs/d' /etc/fstab
```

3. In the EFS console, select your file system.

4. Click "Delete".

5. Type the file system ID to confirm deletion.

6. Click "Confirm".

## AWS Storage Gateway

AWS Storage Gateway is a hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. Storage Gateway provides a seamless integration between your on-premises environment and AWS storage infrastructure, allowing you to store and retrieve data in AWS while maintaining local access performance.

### Storage Gateway Types

Storage Gateway offers three types of gateways:

#### File Gateway

File Gateway provides a file interface into Amazon S3, allowing you to store and retrieve objects in Amazon S3 using standard file protocols such as NFS and SMB.

Key features:
- Mount S3 buckets as NFS or SMB file shares
- Local caching for frequently accessed data
- Integrates with Active Directory for authentication
- Supports S3 features like lifecycle policies, versioning, and cross-region replication

Use cases:
- File shares
- Content repositories
- Media workflows
- Backup and archiving

#### Volume Gateway

Volume Gateway provides cloud-backed storage volumes that you can mount as iSCSI devices from your on-premises application servers.

Volume Gateway offers two configurations:

1. **Cached Volumes**: Store your primary data in S3 while retaining frequently accessed data locally for low-latency access.
   - Volumes can be 1 GiB to 32 TiB in size
   - Each gateway can support up to 32 volumes
   - Total volume storage can be up to 1,024 TiB

2. **Stored Volumes**: Store all your data locally while asynchronously backing up point-in-time snapshots to S3.
   - Volumes can be 1 GiB to 16 TiB in size
   - Each gateway can support up to 32 volumes
   - Total volume storage can be up to 512 TiB

Use cases:
- Backup and disaster recovery
- Mirroring data to AWS
- Low-latency access to data in AWS

#### Tape Gateway

Tape Gateway provides a virtual tape infrastructure that replaces physical tapes with virtual tapes stored in S3 and S3 Glacier.

Key features:
- Emulates a physical tape library
- Integrates with existing backup software
- Stores virtual tapes in S3 and S3 Glacier
- Supports up to 1,500 virtual tapes per gateway

Use cases:
- Tape backup replacement
- Long-term data archiving
- Compliance requirements

### Setting Up Storage Gateway

Let's walk through the process of setting up a File Gateway:

#### Prerequisites

- An AWS account
- A virtualization environment (VMware ESXi, Microsoft Hyper-V, or KVM) or an EC2 instance
- A computer with a web browser to access the Storage Gateway console
- An S3 bucket to store your data

#### Step 1: Deploy the Storage Gateway Appliance

You can deploy Storage Gateway as a virtual appliance on-premises or as an EC2 instance in AWS:

For on-premises deployment:
1. Download the appropriate Storage Gateway virtual machine image for your hypervisor.
2. Deploy the virtual machine in your virtualization environment.
3. Allocate at least 80 GB of disk space for the VM's root disk.
4. Allocate at least 150 GB of disk space for the cache (for File Gateway and Cached Volume Gateway).

For EC2 deployment:
1. In the Storage Gateway console, click "Create gateway".
2. Select the gateway type (File Gateway).
3. Select "Amazon EC2" as the host platform.
4. Click "Launch instance" to launch an EC2 instance with the Storage Gateway AMI.

#### Step 2: Activate the Gateway

1. In the Storage Gateway console, click "Create gateway".
2. Select the gateway type (File Gateway).
3. Select your host platform.
4. Enter the IP address of your gateway.
5. Choose a time zone.
6. Optionally, configure CloudWatch log settings.
7. Click "Next".
8. Review your settings and click "Activate gateway".

#### Step 3: Configure the Gateway

For File Gateway:
1. Allocate local disks for cache storage.
2. Create a file share:
   - Select the S3 bucket to store your files
   - Choose the file share protocol (NFS or SMB)
   - Configure access settings
   - Set up CloudWatch monitoring
3. Click "Create file share".

For Volume Gateway:
1. Allocate local disks for cache storage (Cached Volumes) or upload buffer (Stored Volumes).
2. Create storage volumes:
   - Specify the volume size
   - Choose the volume type (Cached or Stored)
   - Configure CHAP authentication for iSCSI
3. Connect to the volumes from your application servers using iSCSI.

For Tape Gateway:
1. Allocate local disks for cache storage and upload buffer.
2. Create virtual tapes:
   - Specify the tape size
   - Configure the virtual tape library (VTL)
3. Connect to the VTL from your backup software.

### Storage Gateway Security

Storage Gateway provides several security features:

#### Data Encryption

- **Data in Transit**: All data transferred between the gateway and AWS is encrypted using SSL/TLS.
- **Data at Rest**: All data stored in S3 is encrypted using SSE-S3 or SSE-KMS.

#### Network Security

- Storage Gateway requires specific ports to be open for operation.
- You can restrict access to the gateway by configuring security groups and network ACLs.

#### Authentication and Authorization

- File Gateway integrates with Active Directory for SMB authentication.
- Volume Gateway supports CHAP authentication for iSCSI.
- IAM policies control access to the Storage Gateway API and resources.

### Storage Gateway Monitoring and Management

You can monitor and manage Storage Gateway using:

#### AWS Management Console

The Storage Gateway console provides a graphical interface to:
- Create and manage gateways
- Configure file shares, volumes, and tapes
- View gateway health and performance metrics
- Update gateway software

#### AWS CLI

The AWS CLI allows you to automate Storage Gateway operations:

```bash
# List gateways
aws storagegateway list-gateways

# Describe a gateway
aws storagegateway describe-gateway-information --gateway-arn arn:aws:storagegateway:us-east-1:123456789012:gateway/sgw-12345678

# Create an NFS file share
aws storagegateway create-nfs-file-share --client-token 12345 --gateway-arn arn:aws:storagegateway:us-east-1:123456789012:gateway/sgw-12345678 --role arn:aws:iam::123456789012:role/StorageGatewayRole --location-arn arn:aws:s3:::my-bucket/prefix
```

#### Amazon CloudWatch

CloudWatch provides metrics and logs for Storage Gateway:
- Gateway metrics: CPU utilization, memory usage, network throughput
- File share metrics: read/write operations, latency
- Volume metrics: read/write operations, latency, data transferred
- Tape metrics: read/write operations, data transferred

### Storage Gateway Use Cases

Storage Gateway is suitable for various scenarios:

1. **Hybrid Cloud Storage**: Extend on-premises storage to the cloud.

2. **Backup and Disaster Recovery**: Back up on-premises data to AWS.

3. **Data Migration**: Migrate on-premises data to AWS.

4. **Cloud Bursting**: Use cloud storage for peak demand periods.

5. **Storage Tiering**: Move infrequently accessed data to lower-cost storage.

6. **Content Distribution**: Distribute content to multiple locations.

## Amazon S3 Glacier for Archival Storage

Amazon S3 Glacier is a secure, durable, and extremely low-cost cloud storage service for data archiving and long-term backup. It is designed to deliver 99.999999999% durability, and provides comprehensive security and compliance capabilities.

### S3 Glacier Storage Classes

S3 Glacier offers three storage classes:

1. **S3 Glacier Instant Retrieval**: Provides millisecond retrieval for archive data that needs immediate access.
   - Retrieval time: Milliseconds
   - Minimum storage duration: 90 days
   - Ideal for: Archive data that needs immediate access

2. **S3 Glacier Flexible Retrieval** (formerly S3 Glacier): Provides three retrieval options ranging from minutes to hours.
   - Retrieval options:
     - Expedited: 1-5 minutes
     - Standard: 3-5 hours
     - Bulk: 5-12 hours
   - Minimum storage duration: 90 days
   - Ideal for: Archive data that doesn't need immediate access

3. **S3 Glacier Deep Archive**: Provides the lowest-cost storage for long-term data archiving.
   - Retrieval options:
     - Standard: 12 hours
     - Bulk: 48 hours
   - Minimum storage duration: 180 days
   - Ideal for: Long-term data archiving, compliance archives, digital preservation

### S3 Glacier vs. S3 Storage Classes

S3 Glacier storage classes are now integrated with Amazon S3, allowing you to use the S3 API to store and retrieve objects in Glacier. However, there are some differences:

- **Retrieval Time**: S3 Standard provides immediate access, while Glacier storage classes have varying retrieval times.
- **Minimum Storage Duration**: Glacier storage classes have minimum storage durations (90 or 180 days).
- **Retrieval Fees**: Glacier storage classes have retrieval fees in addition to storage costs.
- **Object Size**: Glacier storage classes have a minimum object size of 128 KB for billing purposes.

### Working with S3 Glacier

You can work with S3 Glacier in two ways:

#### Using S3 Lifecycle Policies

You can use S3 lifecycle policies to automatically transition objects from S3 Standard to Glacier storage classes:

1. In the S3 console, navigate to your bucket.
2. Click on the "Management" tab.
3. Click "Create lifecycle rule".
4. Configure the rule:
   - Name: Enter a name for the rule
   - Scope: Choose the objects to which the rule applies
   - Actions: Select "Transition current versions of objects between storage classes"
   - Transitions: Configure transitions to Glacier storage classes
5. Click "Create rule".

Example lifecycle configuration:

```json
{
  "Rules": [
    {
      "ID": "Archive to Glacier after 90 days, then to Deep Archive after 1 year",
      "Status": "Enabled",
      "Prefix": "archives/",
      "Transitions": [
        {
          "Days": 90,
          "StorageClass": "GLACIER"
        },
        {
          "Days": 365,
          "StorageClass": "DEEP_ARCHIVE"
        }
      ]
    }
  ]
}
```

#### Using the S3 API Directly

You can use the S3 API to store objects directly in Glacier storage classes:

```bash
# Upload an object to S3 Glacier Flexible Retrieval
aws s3 cp myfile.txt s3://my-bucket/myfile.txt --storage-class GLACIER

# Upload an object to S3 Glacier Deep Archive
aws s3 cp myfile.txt s3://my-bucket/myfile.txt --storage-class DEEP_ARCHIVE
```

### Retrieving Data from S3 Glacier

To retrieve data from S3 Glacier, you need to initiate a restore request:

Using the AWS Management Console:
1. Navigate to your bucket and select the object.
2. Click "Actions" > "Restore from Glacier".
3. Specify the retrieval tier and the number of days to keep the restored copy.
4. Click "Restore".

Using the AWS CLI:

```bash
# Initiate a restore request with Standard retrieval
aws s3api restore-object --bucket my-bucket --key myfile.txt --restore-request '{"Days":5,"GlacierJobParameters":{"Tier":"Standard"}}'

# Check the restore status
aws s3api head-object --bucket my-bucket --key myfile.txt
```

### S3 Glacier Vaults (Legacy)

Before S3 Glacier was integrated with S3, it was a separate service with its own API. This legacy interface is still available and uses the concept of vaults:

- **Vaults**: Containers for archives in S3 Glacier.
- **Archives**: Data stored in S3 Glacier, similar to objects in S3.
- **Vault Lock**: A policy that can be locked to prevent future changes, useful for compliance requirements.

### S3 Glacier Security

S3 Glacier provides several security features:

#### Data Encryption

- All data in S3 Glacier is encrypted by default using AES-256.
- You can use SSE-KMS for additional control over encryption keys.

#### Access Control

- IAM policies control access to S3 Glacier resources.
- S3 bucket policies and ACLs apply to objects in Glacier storage classes.
- Vault Lock policies (for legacy Glacier vaults) can enforce compliance controls.

#### Audit Logging

- AWS CloudTrail logs all API calls to S3 Glacier.
- S3 server access logging can track requests to objects in Glacier storage classes.

### S3 Glacier Use Cases

S3 Glacier is suitable for various scenarios:

1. **Long-term Data Archiving**: Store data that needs to be retained for years or decades.

2. **Compliance Archives**: Store data to meet regulatory requirements.

3. **Digital Preservation**: Preserve digital assets for future generations.

4. **Media Archives**: Archive media content that doesn't need immediate access.

5. **Scientific Data Archives**: Archive research data for long-term preservation.

6. **Healthcare Records**: Archive patient records that need to be retained for extended periods.

7. **Financial Records**: Archive financial records for compliance and historical purposes.

## AWS Snow Family for Data Migration

The AWS Snow Family is a collection of physical devices that help migrate large amounts of data into and out of AWS. These devices are especially useful when network constraints, such as limited bandwidth, high latency, or high costs, make it impractical to transfer data over the internet.

### Snow Family Devices

The Snow Family includes the following devices:

#### AWS Snowcone

Snowcone is the smallest member of the Snow Family, designed for edge computing and data transfer in space-constrained environments:

- **Storage Capacity**: 8 TB (HDD) or 14 TB (SSD)
- **Form Factor**: Small, rugged, portable (2.1 lbs / 0.95 kg)
- **Network Interfaces**: 10 Gbps RJ45 (copper), Wi-Fi
- **Computing Capabilities**: 2 vCPUs, 4 GB memory
- **Use Cases**: Edge computing, IoT data collection, content distribution, tactical edge computing

#### AWS Snowball

Snowball is available in two options:

1. **Snowball Edge Storage Optimized**:
   - **Storage Capacity**: 80 TB
   - **Computing Capabilities**: 40 vCPUs, 80 GB memory, optional GPU
   - **Network Interfaces**: 10/25/40/50/100 Gbps
   - **Use Cases**: Large-scale data migrations, disaster recovery, data center decommissioning

2. **Snowball Edge Compute Optimized**:
   - **Storage Capacity**: 42 TB (HDD) or 28 TB (NVMe SSD)
   - **Computing Capabilities**: 52 vCPUs, 208 GB memory, optional GPU
   - **Network Interfaces**: 10/25/40/50/100 Gbps
   - **Use Cases**: Machine learning, full motion video analysis, advanced analytics, local computing stacks

#### AWS Snowmobile

Snowmobile is an exabyte-scale data transfer service used to move extremely large amounts of data to AWS:

- **Storage Capacity**: Up to 100 PB
- **Form Factor**: 45-foot long ruggedized shipping container pulled by a semi-trailer truck
- **Network Interfaces**: Multiple 40 Gbps connections
- **Use Cases**: Data center migration, large-scale data center decommissioning, disaster recovery

### Snow Family Data Transfer Process

The data transfer process using Snow Family devices involves the following steps:

1. **Order a Device**: Request a Snow Family device from the AWS Management Console.

2. **Receive the Device**: AWS ships the device to your location.

3. **Connect the Device**: Connect the device to your local network.

4. **Transfer Data**: Use the provided software to transfer data to the device.

5. **Ship the Device Back**: Return the device to AWS using the pre-paid shipping label.

6. **AWS Transfers Data**: AWS transfers your data to the destination service (S3, EBS, etc.).

7. **Track Progress**: Track the status of your job in the AWS Management Console.

8. **Data Verification**: AWS performs a complete erasure of the device after your data has been transferred.

### Snow Family Edge Computing

In addition to data transfer, Snow Family devices can run compute workloads at the edge:

#### EC2-Compatible Compute

Snow Family devices can run EC2-compatible instances, allowing you to run applications locally:

- **AMI Compatibility**: Use Amazon Linux 2, Ubuntu, or Windows Server AMIs.
- **Instance Types**: Various instance types are available depending on the device.
- **Storage Options**: Instance store and EBS-compatible volumes.

#### AWS IoT Greengrass

Snow Family devices can run AWS IoT Greengrass, enabling local processing of IoT data:

- **Local Processing**: Process data locally to reduce latency and bandwidth usage.
- **Local Inference**: Run machine learning inference at the edge.
- **Offline Operation**: Continue to operate even when disconnected from the internet.

#### AWS Lambda

Snow Family devices can run AWS Lambda functions locally:

- **Event-Driven**: Trigger functions based on local events.
- **Local Processing**: Process data locally before sending to AWS.
- **Offline Operation**: Continue to run functions even when disconnected from the internet.

### Snow Family Security

Snow Family devices provide several security features:

#### Physical Security

- **Tamper-Evident Enclosure**: Devices are enclosed in tamper-evident packaging.
- **GPS Tracking**: Devices are equipped with GPS tracking.
- **Chain of Custody**: AWS maintains a chain of custody for the devices.

#### Data Security

- **Encryption**: All data is encrypted using 256-bit encryption.
- **Trusted Platform Module (TPM)**: Devices include a TPM to ensure the integrity of the device.
- **Secure Erase**: AWS performs a complete erasure of the device after data transfer.

#### Identity and Access Management

- **IAM Policies**: Control who can create and manage Snow jobs.
- **Job Credentials**: Secure credentials are provided for each job.
- **Manifest Files**: Encrypted manifest files are required to unlock the device.

### Snow Family Use Cases

Snow Family devices are suitable for various scenarios:

1. **Large-Scale Data Migration**: Migrate petabytes of data to AWS.

2. **Data Center Decommissioning**: Transfer data from decommissioned data centers to AWS.

3. **Disaster Recovery**: Back up critical data to AWS for disaster recovery.

4. **Edge Computing**: Run compute workloads in remote or disconnected locations.

5. **Content Distribution**: Distribute content to remote locations with limited connectivity.

6. **IoT Data Collection**: Collect and process IoT data at the edge.

7. **Machine Learning at the Edge**: Run machine learning inference at the edge.

8. **Tactical Edge Computing**: Run compute workloads in tactical environments.

### Hands-On Lab: Ordering and Using an AWS Snowball

In this lab, we'll walk through the process of ordering and using an AWS Snowball device for data migration.

#### Prerequisites

- An AWS account
- At least 10 GB of data to transfer
- A computer with a web browser to access the AWS Management Console
- A computer with an available USB-C port or RJ45 network port

#### Step 1: Create a Data Migration Job

1. Sign in to the AWS Management Console and open the Snow Family console.

2. Click "Create job".

3. Select "Import into Amazon S3" as the job type.

4. Select "Snowball Edge" as the device type.

5. Select "Storage Optimized" as the device option.

6. Click "Next".

7. Enter a job name and shipping details.

8. Select the AWS Region where you want your data to be imported.

9. Select the S3 bucket where you want your data to be imported.

10. Configure security settings:
    - Create a new service role or select an existing one
    - Choose KMS key options

11. Configure notification settings:
    - Create a new SNS topic or select an existing one
    - Enter email addresses for notifications

12. Configure job options:
    - Select the shipping speed
    - Add optional features if needed

13. Review your job details and click "Create job".

#### Step 2: Receive and Set Up the Snowball Device

1. Wait for the device to be shipped to your location (typically 1-3 business days).

2. When you receive the device, inspect it for any damage.

3. Connect the device to power and your network:
   - Connect the power cable
   - Connect the network cable to your network
   - Power on the device

4. Note the E Ink display on the device, which shows the IP address.

#### Step 3: Download and Install the Snowball Client

1. Download the Snowball client from the AWS website:
   - For Windows: [Snowball Client for Windows](https://snowball-client.s3.amazonaws.com/latest/snowball-client-windows.msi)
   - For macOS: [Snowball Client for macOS](https://snowball-client.s3.amazonaws.com/latest/snowball-client-mac.tar.gz)
   - For Linux: [Snowball Client for Linux](https://snowball-client.s3.amazonaws.com/latest/snowball-client-linux.tar.gz)

2. Install the Snowball client:
   - For Windows: Run the MSI installer
   - For macOS and Linux: Extract the tar.gz file and run the installation script

#### Step 4: Download the Job Manifest and Unlock Code

1. In the Snow Family console, select your job.

2. Click "Get credentials".

3. Enter the region where you created the job.

4. Click "Download manifest" and save the manifest file to your computer.

5. Note the 29-character unlock code displayed on the screen.

#### Step 5: Unlock the Snowball Device

1. Open a terminal or command prompt.

2. Use the Snowball client to unlock the device:

```bash
snowballEdge unlock-device --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code
```

Replace `device-ip`, `path-to-manifest-file`, and `unlock-code` with your actual values.

3. Verify that the device is unlocked:

```bash
snowballEdge list-services --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code
```

#### Step 6: Transfer Data to the Snowball Device

1. Use the Snowball client to copy data to the device:

```bash
# List available S3 buckets on the device
snowballEdge list-buckets --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code

# Copy a file to the device
snowballEdge cp file.txt s3://bucket-name/ --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code

# Copy a directory to the device
snowballEdge cp --recursive directory/ s3://bucket-name/prefix/ --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code
```

Replace `device-ip`, `path-to-manifest-file`, `unlock-code`, `file.txt`, `directory/`, `bucket-name`, and `prefix/` with your actual values.

2. Verify that the data was copied successfully:

```bash
snowballEdge ls s3://bucket-name/ --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code
```

#### Step 7: Prepare the Device for Return

1. Use the Snowball client to prepare the device for return:

```bash
snowballEdge stop-service s3 --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code
```

2. Power off the device:

```bash
snowballEdge shutdown-device --endpoint https://device-ip --manifest-file path-to-manifest-file --unlock-code unlock-code
```

3. Disconnect the power and network cables.

4. Close the device and ensure it's properly sealed.

5. Attach the pre-paid return shipping label to the device.

6. Return the device to AWS using the specified carrier.

#### Step 8: Track the Job Status

1. In the Snow Family console, select your job.

2. Monitor the job status as it progresses through the following stages:
   - Job created
   - Preparing Snowball
   - Snowball delivered to you
   - Snowball received by AWS
   - Importing data
   - Completed

3. Once the job is completed, verify that your data has been imported into the specified S3 bucket.

## Summary

In this chapter, we've explored AWS storage services, which provide a range of options for storing and managing data in the cloud. We've covered:

1. **Amazon S3**: Object storage service for storing and retrieving any amount of data from anywhere on the web. We learned about S3 storage classes, lifecycle management, security features, and performance optimization.

2. **Amazon EBS**: Persistent block storage volumes for use with Amazon EC2 instances. We discussed EBS volume types, snapshots, encryption, and performance optimization.

3. **Amazon EFS**: Scalable file storage for use with Amazon EC2 instances and AWS Lambda. We explored EFS performance modes, throughput modes, storage classes, and security features.

4. **AWS Storage Gateway**: Hybrid cloud storage service that gives you on-premises access to virtually unlimited cloud storage. We covered the different types of Storage Gateway and their use cases.

5. **Amazon S3 Glacier**: Low-cost storage service for data archiving and long-term backup. We discussed Glacier storage classes, retrieval options, and security features.

6. **AWS Snow Family**: Physical devices to migrate large amounts of data into and out of AWS. We explored the different Snow Family devices and their capabilities.

Through hands-on labs, we've gained practical experience with these services, learning how to create and manage storage resources in AWS.

Key takeaways from this chapter:

1. AWS offers a variety of storage services to meet different requirements, from simple object storage to complex file systems and specialized data migration solutions.

2. Choosing the right storage service depends on factors like data type, access pattern, performance requirements, durability and availability needs, cost considerations, and integration requirements.

3. S3 provides highly durable and available object storage with various storage classes to optimize for cost and performance.

4. EBS offers persistent block storage for EC2 instances with different volume types optimized for various workloads.

5. EFS provides scalable file storage that can be accessed by multiple EC2 instances simultaneously.

6. Storage Gateway enables hybrid cloud storage scenarios by connecting on-premises environments to AWS storage services.

7. S3 Glacier offers low-cost archival storage with various retrieval options.

8. The Snow Family provides physical devices for migrating large amounts of data to AWS when network transfer is impractical.

In the next chapter, we'll explore AWS networking services, including Amazon VPC, subnetting, security groups, and more.

## Additional Resources

- [Amazon S3 Documentation](https://docs.aws.amazon.com/s3/)
- [Amazon EBS Documentation](https://docs.aws.amazon.com/ebs/)
- [Amazon EFS Documentation](https://docs.aws.amazon.com/efs/)
- [AWS Storage Gateway Documentation](https://docs.aws.amazon.com/storagegateway/)
- [Amazon S3 Glacier Documentation](https://docs.aws.amazon.com/glacier/)
- [AWS Snow Family Documentation](https://docs.aws.amazon.com/snowball/)
- [AWS Storage Blog](https://aws.amazon.com/blogs/storage/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
