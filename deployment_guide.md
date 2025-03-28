# Deployment Guide for Tech Academy Platform

This guide provides step-by-step instructions for deploying the Tech Academy educational platform to AWS S3 for static website hosting. Follow these instructions carefully to ensure a successful deployment.

## Prerequisites

Before you begin, ensure you have the following:

1. An AWS account with appropriate permissions
2. AWS CLI installed and configured on your local machine
3. Node.js and npm installed on your local machine
4. The Tech Academy platform source code (provided in the zip file)

## Step 1: Extract the Project Files

1. Extract the contents of the `tech_academy_lite.zip` file to a local directory:

```bash
unzip tech_academy_lite.zip -d tech_academy
cd tech_academy
```

## Step 2: Install Dependencies and Build the Frontend

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install the required dependencies:

```bash
npm install
```

3. Build the production version of the website:

```bash
npm run build
```

This will create a `build` or `.next` directory containing the optimized production build.

## Step 3: Create an S3 Bucket for Website Hosting

1. Log in to the AWS Management Console and navigate to the S3 service.

2. Click "Create bucket" and provide a globally unique name for your bucket (e.g., `tech-academy-website`).

3. Choose the AWS Region closest to your target audience.

4. Uncheck "Block all public access" and acknowledge the warning (since this is a public website).

5. Enable "Static website hosting" under the bucket properties:
   - Select "Use this bucket to host a website"
   - Set "Index document" to `index.html`
   - Set "Error document" to `index.html` (for SPA routing)

6. Click "Create bucket".

## Step 4: Configure Bucket Permissions

1. Select your newly created bucket and go to the "Permissions" tab.

2. Update the Bucket Policy to allow public read access by clicking on "Bucket Policy" and adding the following policy (replace `your-bucket-name` with your actual bucket name):

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

3. Click "Save".

## Step 5: Upload Website Files to S3

1. Upload the contents of the build directory to your S3 bucket:

Using AWS CLI:
```bash
aws s3 sync build/ s3://your-bucket-name --acl public-read
```

Or using the AWS Console:
- Navigate to your bucket
- Click "Upload"
- Add files or drag and drop the contents of the build directory
- Click "Upload"

## Step 6: Upload Course Content to S3

1. Create a directory structure in your S3 bucket for course content:

```bash
aws s3api put-object --bucket your-bucket-name --key courses/
aws s3api put-object --bucket your-bucket-name --key courses/devops/
aws s3api put-object --bucket your-bucket-name --key courses/cloud_engineering/
```

2. Upload the course content:

```bash
aws s3 sync courses/devops/ s3://your-bucket-name/courses/devops/ --acl public-read
aws s3 sync courses/cloud_engineering/ s3://your-bucket-name/courses/cloud_engineering/ --acl public-read
```

## Step 7: Upload Resume Templates to S3

1. Create a directory for resume templates:

```bash
aws s3api put-object --bucket your-bucket-name --key resume_samples/
```

2. Upload the resume templates:

```bash
aws s3 sync resume_samples/ s3://your-bucket-name/resume_samples/ --acl public-read
```

## Step 8: Configure CloudFront (Optional but Recommended)

For better performance and HTTPS support:

1. Navigate to CloudFront in the AWS Console.

2. Click "Create Distribution".

3. For "Origin Domain Name", select your S3 bucket.

4. Configure the following settings:
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Compress Objects Automatically: Yes
   - Default Root Object: index.html

5. Under "Error Pages", add a custom error response:
   - HTTP Error Code: 403
   - Response Page Path: /index.html
   - HTTP Response Code: 200

6. Click "Create Distribution".

7. Wait for the distribution to deploy (status changes from "In Progress" to "Deployed").

## Step 9: Set Up Custom Domain (Optional)

If you have a custom domain:

1. Register your domain in Route 53 or use an existing domain.

2. Create a new record set in Route 53:
   - Name: www (or @ for root domain)
   - Type: A - IPv4 address
   - Alias: Yes
   - Alias Target: Select your CloudFront distribution

3. If using CloudFront, update your distribution to use your custom domain:
   - Edit the distribution
   - Add your domain to "Alternate Domain Names (CNAMEs)"
   - Set up an SSL certificate using AWS Certificate Manager

## Step 10: Test Your Deployment

1. Access your website using the S3 website endpoint, CloudFront domain, or your custom domain.

2. Test all functionality:
   - Navigation
   - Course browsing
   - User registration and login
   - Checkout process
   - Course content access
   - Resume template access

## Step 11: Set Up Monitoring and Logging

1. Enable S3 server access logging:
   - Go to your bucket properties
   - Under "Server access logging", click "Edit"
   - Enable logging and specify a target bucket for logs

2. Set up CloudWatch Alarms for monitoring (if using CloudFront):
   - Navigate to CloudWatch
   - Create alarms for metrics like 5xxErrorRate, 4xxErrorRate, etc.

## Troubleshooting Common Issues

### Issue: Files not displaying correctly
- Ensure proper content types are set for your files
- Verify that bucket policy allows public read access
- Check for any CloudFront caching issues (may need to create an invalidation)

### Issue: Routing problems with SPA
- Ensure error document is set to index.html
- If using CloudFront, verify custom error response is configured correctly

### Issue: CORS issues
- Add appropriate CORS configuration to your S3 bucket

### Issue: SSL/HTTPS not working
- Verify SSL certificate is properly configured in AWS Certificate Manager
- Ensure CloudFront distribution is using the certificate

## Maintenance and Updates

To update your website:

1. Make changes to your local codebase
2. Rebuild the frontend: `npm run build`
3. Sync the new build to S3:
   ```bash
   aws s3 sync build/ s3://your-bucket-name --acl public-read
   ```
4. If using CloudFront, create an invalidation to clear the cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

## Security Best Practices

1. Enable versioning on your S3 bucket to protect against accidental deletions
2. Set up AWS WAF with CloudFront for additional security
3. Regularly rotate AWS access keys
4. Monitor S3 and CloudFront logs for unusual activity
5. Implement least privilege access for IAM users managing the website

## Cost Optimization

1. Monitor your AWS costs regularly
2. Consider using Reserved Instances if you're using EC2 for any backend services
3. Set up budget alerts in AWS to notify you of unexpected spending
4. Use CloudFront caching effectively to reduce S3 request costs

## Backup and Disaster Recovery

1. Enable versioning on your S3 bucket
2. Consider cross-region replication for critical data
3. Regularly back up your website code and content
4. Document your deployment process for quick recovery

By following this guide, you should have successfully deployed the Tech Academy platform to AWS S3 with optional CloudFront distribution for improved performance and security.
