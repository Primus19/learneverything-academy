# Chapter 2: Continuous Integration & Continuous Deployment

## CI/CD Fundamentals

Continuous Integration (CI) and Continuous Deployment (CD) are fundamental practices in modern DevOps that enable teams to deliver code changes more frequently and reliably. Let's explore these concepts in detail.

### Continuous Integration (CI)

Continuous Integration is the practice of frequently integrating code changes from multiple contributors into a shared repository. Each integration is verified by an automated build and automated tests to detect integration errors as quickly as possible.

#### Key Principles of CI:

1. **Maintain a Single Source Repository**: All code should be stored in a version control system that all team members can access.

2. **Automate the Build**: The process of compiling code, running tests, and creating deployable artifacts should be fully automated.

3. **Make the Build Self-Testing**: Automated tests should be run as part of the build process to ensure that changes don't break existing functionality.

4. **Everyone Commits to the Mainline Every Day**: Developers should integrate their changes frequently (at least daily) to minimize integration conflicts.

5. **Every Commit Should Build the Mainline on an Integration Machine**: Each commit should trigger an automated build and test process on a dedicated integration server.

6. **Keep the Build Fast**: The build process should be optimized to provide quick feedback to developers.

7. **Test in a Clone of the Production Environment**: Tests should be run in an environment that closely resembles production.

8. **Make It Easy to Get the Latest Deliverables**: The latest build artifacts should be easily accessible to all team members.

9. **Everyone Can See the Results of the Latest Build**: Build results should be visible to the entire team to maintain transparency.

10. **Automate Deployment**: The process of deploying the application to various environments should be automated.

### Continuous Delivery (CD)

Continuous Delivery extends Continuous Integration by ensuring that code changes are always in a deployable state. This means that after passing automated tests, the code can be released to production at any time with minimal manual intervention.

#### Key Principles of CD:

1. **Build Quality In**: Quality should be built into the product from the beginning, not added later through testing.

2. **Work in Small Batches**: Changes should be small and incremental to reduce risk and make it easier to identify and fix issues.

3. **Computers Perform Repetitive Tasks, People Solve Problems**: Automate repetitive tasks to free up people to focus on solving problems.

4. **Relentlessly Pursue Continuous Improvement**: Continuously look for ways to improve the delivery process.

5. **Everyone is Responsible**: The entire team is responsible for the delivery process, not just operations or a dedicated release team.

### Continuous Deployment

Continuous Deployment takes Continuous Delivery a step further by automatically deploying every change that passes all stages of the production pipeline to production. With Continuous Deployment, there is no human intervention, and only a failed test will prevent a new change from being deployed to production.

### CI/CD Pipeline

A CI/CD pipeline is an automated sequence of steps that code changes go through from development to production. A typical CI/CD pipeline includes the following stages:

1. **Source**: Developers commit code changes to a version control system.

2. **Build**: The code is compiled, and dependencies are resolved.

3. **Test**: Automated tests are run to ensure the code works as expected.

4. **Deploy to Staging**: The code is deployed to a staging environment for further testing.

5. **Production Deployment**: The code is deployed to the production environment.

### Benefits of CI/CD

1. **Faster Time to Market**: Automate manual processes to deliver features to users more quickly.

2. **Improved Developer Productivity**: Developers spend less time on repetitive tasks and more time on value-adding activities.

3. **Higher Quality Code**: Automated testing catches issues early in the development process.

4. **Reduced Risk**: Small, incremental changes are easier to troubleshoot and roll back if necessary.

5. **Better Collaboration**: CI/CD encourages communication and collaboration between development, operations, and other teams.

## Setting Up Jenkins

Jenkins is one of the most popular open-source automation servers used for implementing CI/CD pipelines. In this section, we'll walk through the process of setting up Jenkins and configuring it for a basic CI/CD pipeline.

### Prerequisites

Before setting up Jenkins, ensure you have the following:

- A server or virtual machine with at least 2GB RAM and 10GB disk space
- Java Development Kit (JDK) 8 or 11 installed
- Docker installed (optional, but recommended for running Jenkins in a container)

### Option 1: Installing Jenkins Using Docker

Using Docker is the simplest way to get Jenkins up and running quickly.

1. **Pull the Jenkins Docker Image**:
   ```bash
   docker pull jenkins/jenkins:lts
   ```

2. **Create a Docker Network**:
   ```bash
   docker network create jenkins
   ```

3. **Run Jenkins Container**:
   ```bash
   docker run --name jenkins-server --restart=on-failure --detach \
     --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
     --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
     --publish 8080:8080 --publish 50000:50000 \
     --volume jenkins-data:/var/jenkins_home \
     --volume jenkins-docker-certs:/certs/client:ro \
     jenkins/jenkins:lts
   ```

4. **Get the Initial Admin Password**:
   ```bash
   docker exec jenkins-server cat /var/jenkins_home/secrets/initialAdminPassword
   ```

5. **Access Jenkins Web Interface**:
   Open a web browser and navigate to `http://localhost:8080`. You'll be prompted to enter the initial admin password.

6. **Complete the Setup Wizard**:
   - Install suggested plugins or select specific plugins
   - Create an admin user
   - Configure the Jenkins URL

### Option 2: Installing Jenkins on Ubuntu/Debian

If you prefer to install Jenkins directly on your server, follow these steps:

1. **Add the Jenkins Repository Key**:
   ```bash
   wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
   ```

2. **Add the Jenkins Repository**:
   ```bash
   sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
   ```

3. **Update Package Lists**:
   ```bash
   sudo apt update
   ```

4. **Install Jenkins**:
   ```bash
   sudo apt install jenkins
   ```

5. **Start Jenkins Service**:
   ```bash
   sudo systemctl start jenkins
   sudo systemctl enable jenkins
   ```

6. **Get the Initial Admin Password**:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

7. **Access Jenkins Web Interface**:
   Open a web browser and navigate to `http://localhost:8080`. You'll be prompted to enter the initial admin password.

8. **Complete the Setup Wizard**:
   - Install suggested plugins or select specific plugins
   - Create an admin user
   - Configure the Jenkins URL

### Installing Essential Jenkins Plugins

After the initial setup, you should install additional plugins to enhance Jenkins' functionality. Here are some essential plugins for CI/CD:

1. **Pipeline**: Supports defining pipelines as code using a Jenkinsfile.
2. **Git Integration**: Allows Jenkins to interact with Git repositories.
3. **Docker**: Enables Jenkins to build and use Docker containers.
4. **Blue Ocean**: Provides a modern, visual interface for Jenkins pipelines.
5. **Credentials Binding**: Securely manages credentials for use in builds.

To install these plugins:

1. Navigate to **Manage Jenkins** > **Manage Plugins** > **Available**.
2. Search for each plugin and select it.
3. Click **Install without restart** or **Download now and install after restart**.

### Configuring Jenkins Security

Securing your Jenkins installation is crucial. Here are some basic security configurations:

1. **Enable Security**:
   - Go to **Manage Jenkins** > **Configure Global Security**.
   - Check **Enable security**.
   - For **Security Realm**, select **Jenkins' own user database** and check **Allow users to sign up**.
   - For **Authorization**, select **Matrix-based security** or **Project-based Matrix Authorization Strategy**.
   - Click **Save**.

2. **Configure Authentication**:
   - Consider setting up LDAP or OAuth integration for enterprise environments.
   - Disable the ability for users to sign up after creating necessary accounts.

3. **Configure Authorization**:
   - Grant appropriate permissions to users and groups.
   - Follow the principle of least privilege.

4. **Secure Jenkins Behind a Reverse Proxy**:
   - Configure Nginx or Apache as a reverse proxy for Jenkins.
   - Enable HTTPS using Let's Encrypt or other SSL certificates.

### Setting Up Jenkins Agents

Jenkins agents (also known as slaves or nodes) are machines that perform the actual build tasks. Setting up agents allows you to distribute the build load and isolate build environments.

1. **Navigate to Agent Management**:
   Go to **Manage Jenkins** > **Manage Nodes and Clouds**.

2. **Add a New Node**:
   - Click **New Node**.
   - Enter a name for the node and select **Permanent Agent**.
   - Click **OK**.

3. **Configure the Node**:
   - **Remote root directory**: Specify a directory on the agent where Jenkins can create workspaces.
   - **Labels**: Add labels to identify the agent's capabilities (e.g., `docker`, `linux`).
   - **Usage**: Select how Jenkins should use this agent.
   - **Launch method**: Choose how Jenkins should start the agent (SSH, JNLP, etc.).
   - **Availability**: Specify when the agent should be available.
   - Click **Save**.

4. **Connect the Agent**:
   Follow the instructions provided by Jenkins to connect the agent to the master.

## Building CI Pipelines

Now that we have Jenkins set up, let's create a basic CI pipeline for a sample application.

### Understanding Jenkins Pipelines

Jenkins Pipelines are a suite of plugins that support implementing and integrating continuous delivery pipelines into Jenkins. A pipeline is defined using a domain-specific language (DSL) in a file called `Jenkinsfile`, which is checked into source control.

There are two types of Jenkins Pipelines:

1. **Declarative Pipeline**: A more recent and recommended way to define pipelines with a more structured syntax.
2. **Scripted Pipeline**: The original pipeline syntax, which offers more flexibility but can be more complex.

### Creating a Basic Declarative Pipeline

Let's create a basic declarative pipeline for a simple Node.js application:

1. **Create a Jenkinsfile**:
   Create a file named `Jenkinsfile` in the root of your project with the following content:

   ```groovy
   pipeline {
       agent any
       
       tools {
           nodejs 'Node14'
       }
       
       stages {
           stage('Checkout') {
               steps {
                   checkout scm
               }
           }
           
           stage('Install Dependencies') {
               steps {
                   sh 'npm install'
               }
           }
           
           stage('Run Tests') {
               steps {
                   sh 'npm test'
               }
           }
           
           stage('Build') {
               steps {
                   sh 'npm run build'
               }
           }
       }
       
       post {
           success {
               echo 'Pipeline completed successfully!'
           }
           failure {
               echo 'Pipeline failed!'
           }
       }
   }
   ```

2. **Configure Jenkins to Use the Jenkinsfile**:
   - Create a new Pipeline job in Jenkins.
   - In the job configuration, select **Pipeline script from SCM** as the Definition.
   - Select your SCM (e.g., Git) and provide the repository URL.
   - Specify the branch to build (e.g., `*/main`).
   - Set the Script Path to `Jenkinsfile`.
   - Click **Save**.

3. **Run the Pipeline**:
   - Click **Build Now** to run the pipeline.
   - Monitor the pipeline execution in the Jenkins UI.

### Pipeline Syntax Elements

Let's explore the key elements of a Jenkins Pipeline:

1. **`pipeline`**: The top-level block that defines the entire pipeline.

2. **`agent`**: Specifies where the pipeline will execute.
   - `agent any`: Run on any available agent.
   - `agent { label 'my-label' }`: Run on an agent with the specified label.
   - `agent { docker 'node:14' }`: Run inside a Docker container.

3. **`tools`**: Defines the tools to be auto-installed and added to the PATH.

4. **`stages`**: Contains a sequence of one or more stage directives.

5. **`stage`**: Defines a conceptually distinct subset of the pipeline, such as "Build", "Test", or "Deploy".

6. **`steps`**: Defines the steps to be executed in a stage.

7. **`post`**: Defines actions to be run at the end of the pipeline or stage.
   - `always`: Run regardless of the completion status.
   - `success`: Run only if the pipeline or stage is successful.
   - `failure`: Run only if the pipeline or stage fails.
   - `unstable`: Run only if the pipeline or stage is unstable.
   - `changed`: Run only if the pipeline or stage has a different completion status from the previous run.

### Advanced Pipeline Features

Let's explore some advanced features of Jenkins Pipelines:

1. **Parallel Execution**:
   Run stages in parallel to reduce build time.

   ```groovy
   stage('Parallel Tests') {
       parallel {
           stage('Unit Tests') {
               steps {
                   sh 'npm run test:unit'
               }
           }
           stage('Integration Tests') {
               steps {
                   sh 'npm run test:integration'
               }
           }
       }
   }
   ```

2. **Environment Variables**:
   Define environment variables for use in the pipeline.

   ```groovy
   pipeline {
       agent any
       
       environment {
           DEPLOY_ENV = 'staging'
           API_ENDPOINT = 'https://api.example.com'
       }
       
       stages {
           stage('Deploy') {
               steps {
                   echo "Deploying to ${DEPLOY_ENV}"
                   echo "API Endpoint: ${API_ENDPOINT}"
               }
           }
       }
   }
   ```

3. **Parameters**:
   Define parameters that can be specified when triggering the pipeline.

   ```groovy
   pipeline {
       agent any
       
       parameters {
           string(name: 'DEPLOY_ENV', defaultValue: 'staging', description: 'Deployment environment')
           booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests?')
           choice(name: 'REGION', choices: ['us-east-1', 'us-west-2', 'eu-west-1'], description: 'AWS region')
       }
       
       stages {
           stage('Deploy') {
               steps {
                   echo "Deploying to ${params.DEPLOY_ENV} in ${params.REGION}"
                   
                   script {
                       if (params.RUN_TESTS) {
                           echo "Running tests..."
                       } else {
                           echo "Skipping tests..."
                       }
                   }
               }
           }
       }
   }
   ```

4. **Credentials**:
   Securely use credentials in your pipeline.

   ```groovy
   pipeline {
       agent any
       
       stages {
           stage('Deploy') {
               steps {
                   withCredentials([
                       string(credentialsId: 'api-key', variable: 'API_KEY'),
                       usernamePassword(credentialsId: 'db-credentials', usernameVariable: 'DB_USER', passwordVariable: 'DB_PASS')
                   ]) {
                       sh 'deploy.sh --api-key $API_KEY --db-user $DB_USER --db-pass $DB_PASS'
                   }
               }
           }
       }
   }
   ```

5. **Conditional Execution**:
   Execute stages based on conditions.

   ```groovy
   pipeline {
       agent any
       
       stages {
           stage('Build') {
               steps {
                   sh 'npm run build'
               }
           }
           
           stage('Deploy to Staging') {
               when {
                   branch 'develop'
               }
               steps {
                   echo 'Deploying to staging...'
               }
           }
           
           stage('Deploy to Production') {
               when {
                   branch 'main'
               }
               steps {
                   echo 'Deploying to production...'
               }
           }
       }
   }
   ```

## Automated Testing in CI

Automated testing is a critical component of any CI/CD pipeline. It ensures that code changes don't break existing functionality and meet quality standards.

### Types of Tests in CI

1. **Unit Tests**: Test individual components or functions in isolation.
2. **Integration Tests**: Test how components work together.
3. **Functional Tests**: Test the application's functionality from a user's perspective.
4. **Performance Tests**: Test the application's performance under load.
5. **Security Tests**: Identify security vulnerabilities.

### Implementing Automated Tests in Jenkins

Let's see how to implement different types of tests in a Jenkins pipeline:

1. **Unit Tests**:
   ```groovy
   stage('Unit Tests') {
       steps {
           sh 'npm run test:unit'
       }
       post {
           always {
               junit 'test-results/unit/*.xml'
           }
       }
   }
   ```

2. **Integration Tests**:
   ```groovy
   stage('Integration Tests') {
       steps {
           sh 'npm run test:integration'
       }
       post {
           always {
               junit 'test-results/integration/*.xml'
           }
       }
   }
   ```

3. **Code Coverage**:
   ```groovy
   stage('Code Coverage') {
       steps {
           sh 'npm run test:coverage'
       }
       post {
           always {
               publishHTML(target: [
                   allowMissing: false,
                   alwaysLinkToLastBuild: false,
                   keepAll: true,
                   reportDir: 'coverage',
                   reportFiles: 'index.html',
                   reportName: 'Code Coverage Report'
               ])
           }
       }
   }
   ```

4. **Static Code Analysis**:
   ```groovy
   stage('Static Code Analysis') {
       steps {
           sh 'npm run lint'
       }
   }
   ```

5. **Security Scanning**:
   ```groovy
   stage('Security Scan') {
       steps {
           sh 'npm audit'
       }
   }
   ```

### Test Reporting in Jenkins

Jenkins provides several ways to visualize test results:

1. **JUnit Plugin**: Publishes test results in JUnit format.
   ```groovy
   post {
       always {
           junit 'test-results/**/*.xml'
       }
   }
   ```

2. **HTML Publisher Plugin**: Publishes HTML reports.
   ```groovy
   post {
       always {
           publishHTML(target: [
               allowMissing: false,
               alwaysLinkToLastBuild: false,
               keepAll: true,
               reportDir: 'reports',
               reportFiles: 'index.html',
               reportName: 'Test Report'
           ])
       }
   }
   ```

3. **Code Coverage Plugins**: Publishes code coverage reports.
   ```groovy
   post {
       always {
           cobertura coberturaReportFile: 'coverage/cobertura-coverage.xml'
       }
   }
   ```

## Deployment Strategies

Deployment strategies define how new versions of an application are released to production. Different strategies offer different trade-offs between risk, complexity, and downtime.

### Common Deployment Strategies

1. **Recreate Deployment**:
   - Terminate all instances and then deploy new ones.
   - Simple but causes downtime.

2. **Rolling Deployment**:
   - Gradually replace instances of the old version with the new version.
   - Minimizes downtime but takes longer to complete.

3. **Blue-Green Deployment**:
   - Maintain two identical environments (blue and green).
   - Deploy the new version to the inactive environment.
   - Switch traffic from the active environment to the inactive one.
   - Minimizes downtime and risk but requires more resources.

4. **Canary Deployment**:
   - Deploy the new version to a small subset of users.
   - Gradually increase the percentage of users receiving the new version.
   - Minimizes risk by allowing early detection of issues.

5. **A/B Testing**:
   - Similar to canary deployment but focuses on testing features rather than releases.
   - Deploy different versions to different user segments to compare performance.

### Implementing Deployment Strategies in Jenkins

Let's see how to implement some of these deployment strategies in a Jenkins pipeline:

1. **Recreate Deployment**:
   ```groovy
   stage('Deploy') {
       steps {
           sh 'kubectl delete deployment myapp || true'
           sh 'kubectl apply -f kubernetes/deployment.yaml'
       }
   }
   ```

2. **Rolling Deployment**:
   ```groovy
   stage('Deploy') {
       steps {
           sh 'kubectl apply -f kubernetes/deployment.yaml'
           sh 'kubectl rollout status deployment/myapp'
       }
   }
   ```

3. **Blue-Green Deployment**:
   ```groovy
   stage('Deploy Green Environment') {
       steps {
           sh 'kubectl apply -f kubernetes/green-deployment.yaml'
           sh 'kubectl rollout status deployment/myapp-green'
       }
   }
   
   stage('Switch Traffic') {
       steps {
           input message: 'Switch traffic to green environment?'
           sh 'kubectl apply -f kubernetes/service-green.yaml'
       }
   }
   
   stage('Cleanup Blue Environment') {
       steps {
           sh 'kubectl delete deployment myapp-blue'
       }
   }
   ```

4. **Canary Deployment**:
   ```groovy
   stage('Deploy Canary') {
       steps {
           sh 'kubectl apply -f kubernetes/canary-deployment.yaml'
           sh 'kubectl scale deployment myapp-canary --replicas=1'
           sh 'kubectl scale deployment myapp-production --replicas=9'
       }
   }
   
   stage('Monitor Canary') {
       steps {
           sleep 300 // Monitor for 5 minutes
           input message: 'Proceed with full deployment?'
       }
   }
   
   stage('Full Deployment') {
       steps {
           sh 'kubectl scale deployment myapp-canary --replicas=0'
           sh 'kubectl scale deployment myapp-production --replicas=10'
           sh 'kubectl apply -f kubernetes/production-deployment.yaml'
       }
   }
   ```

## Jenkins Pipeline as Code

Jenkins Pipeline as Code is the practice of defining Jenkins pipelines in code, typically in a file called `Jenkinsfile` that is stored in the source code repository. This approach offers several benefits:

1. **Version Control**: Pipeline definitions are versioned alongside the application code.
2. **Code Review**: Pipeline changes can be reviewed like any other code change.
3. **Auditability**: Changes to the pipeline are tracked in the version control system.
4. **Reusability**: Pipeline code can be shared across projects.

### Best Practices for Pipeline as Code

1. **Keep Pipelines Simple**: Start with a simple pipeline and add complexity as needed.
2. **Use Declarative Syntax**: Declarative pipelines are easier to read and maintain.
3. **Parameterize Pipelines**: Use parameters to make pipelines flexible.
4. **Extract Complex Logic**: Move complex logic to external scripts or shared libraries.
5. **Use Shared Libraries**: Create reusable pipeline components with shared libraries.
6. **Validate Jenkinsfiles**: Use the Jenkins Pipeline Linter to validate Jenkinsfiles.
7. **Document Pipelines**: Add comments to explain complex parts of the pipeline.

### Jenkins Shared Libraries

Jenkins Shared Libraries allow you to define reusable pipeline code that can be shared across multiple projects. This is particularly useful for standardizing CI/CD practices across an organization.

1. **Creating a Shared Library**:
   - Create a Git repository for the shared library.
   - Structure the repository as follows:
     ```
     ├── vars/          # Global variables/functions
     │   └── sayHello.groovy
     ├── src/           # Classes
     │   └── org/example/Utils.groovy
     └── resources/     # Non-Groovy files
         └── scripts/
             └── deploy.sh
     ```
   - Define functions in the `vars` directory:
     ```groovy
     // vars/sayHello.groovy
     def call(String name = 'human') {
         echo "Hello, ${name}!"
     }
     ```

2. **Configuring Jenkins to Use the Shared Library**:
   - Go to **Manage Jenkins** > **Configure System**.
   - Scroll down to **Global Pipeline Libraries**.
   - Click **Add**.
   - Enter a name for the library (e.g., `my-shared-lib`).
   - Set the **Default version** (e.g., `main`).
   - Select **Modern SCM** > **Git**.
   - Enter the repository URL.
   - Click **Save**.

3. **Using the Shared Library in a Pipeline**:
   ```groovy
   @Library('my-shared-lib') _
   
   pipeline {
       agent any
       
       stages {
           stage('Greet') {
               steps {
                   sayHello 'Jenkins'
               }
           }
       }
   }
   ```

### Example: Complete CI/CD Pipeline with Jenkins

Let's put everything together and create a complete CI/CD pipeline for a Node.js application:

```groovy
pipeline {
    agent {
        docker {
            image 'node:14'
            args '-p 3000:3000'
        }
    }
    
    environment {
        CI = 'true'
        DOCKER_REGISTRY = 'my-registry.example.com'
        IMAGE_NAME = 'my-app'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                    post {
                        always {
                            junit 'test-results/unit/*.xml'
                        }
                    }
                }
                
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                    post {
                        always {
                            junit 'test-results/integration/*.xml'
                        }
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([string(credentialsId: 'docker-registry-token', variable: 'DOCKER_TOKEN')]) {
                    sh "docker login ${DOCKER_REGISTRY} -u jenkins -p ${DOCKER_TOKEN}"
                    sh "docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh "kubectl --kubeconfig=${KUBECONFIG} set image deployment/my-app my-app=${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -n staging"
                    sh "kubectl --kubeconfig=${KUBECONFIG} rollout status deployment/my-app -n staging"
                }
            }
        }
        
        stage('Integration Tests on Staging') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run test:e2e -- --url https://staging.example.com'
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?'
                
                withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG')]) {
                    sh "kubectl --kubeconfig=${KUBECONFIG} set image deployment/my-app my-app=${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} -n production"
                    sh "kubectl --kubeconfig=${KUBECONFIG} rollout status deployment/my-app -n production"
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            slackSend channel: '#deployments', color: 'good', message: "Deployment of ${IMAGE_NAME}:${IMAGE_TAG} to production was successful!"
        }
        failure {
            slackSend channel: '#deployments', color: 'danger', message: "Deployment of ${IMAGE_NAME}:${IMAGE_TAG} failed!"
        }
    }
}
```

This pipeline:
1. Checks out the code
2. Installs dependencies
3. Runs linting
4. Runs unit and integration tests in parallel
5. Builds the application
6. Builds and pushes a Docker image
7. Deploys to staging
8. Runs integration tests on staging
9. Deploys to production after manual approval
10. Sends Slack notifications on success or failure

## Hands-On Exercise: Setting Up a CI/CD Pipeline for a Node.js Application

In this exercise, we'll set up a complete CI/CD pipeline for a simple Node.js application using Jenkins.

### Prerequisites

- Jenkins server set up as described earlier
- Git repository with a simple Node.js application
- Docker installed on the Jenkins server or agent

### Step 1: Create a Simple Node.js Application

First, let's create a simple Express.js application:

```bash
# Create a new directory
mkdir nodejs-cicd-demo
cd nodejs-cicd-demo

# Initialize a new Node.js project
npm init -y

# Install dependencies
npm install express --save
npm install jest supertest --save-dev

# Create a simple Express app
cat > app.js << 'EOF'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, CI/CD!' });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;
EOF

# Create a test file
mkdir -p __tests__
cat > __tests__/app.test.js << 'EOF'
const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  test('GET / should return a message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Hello, CI/CD!');
  });

  test('GET /api/status should return status information', async () => {
    const response = await request(app).get('/api/status');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('OK');
    expect(response.body).toHaveProperty('timestamp');
  });
});
EOF

# Update package.json with test script
cat > package.json << 'EOF'
{
  "name": "nodejs-cicd-demo",
  "version": "1.0.0",
  "description": "A simple Node.js app for CI/CD demo",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "jest --forceExit"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "supertest": "^6.1.4"
  }
}
EOF

# Create a Dockerfile
cat > Dockerfile << 'EOF'
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
EOF

# Create a .gitignore file
cat > .gitignore << 'EOF'
node_modules/
npm-debug.log
coverage/
.env
EOF
```

### Step 2: Create a Jenkinsfile

Create a `Jenkinsfile` in the root of your project:

```groovy
pipeline {
    agent {
        docker {
            image 'node:14-alpine'
            args '-p 3000:3000'
        }
    }
    
    environment {
        CI = 'true'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build("nodejs-cicd-demo")
                }
            }
        }
        
        stage('Run Container') {
            steps {
                script {
                    sh 'docker stop nodejs-cicd-demo || true'
                    sh 'docker rm nodejs-cicd-demo || true'
                    sh 'docker run -d -p 3000:3000 --name nodejs-cicd-demo nodejs-cicd-demo'
                }
            }
        }
        
        stage('Test Deployment') {
            steps {
                sh 'curl http://localhost:3000/api/status | grep "OK"'
            }
        }
    }
    
    post {
        always {
            sh 'docker stop nodejs-cicd-demo || true'
        }
    }
}
```

### Step 3: Initialize Git Repository and Push to GitHub

```bash
# Initialize Git repository
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Add remote repository (replace with your GitHub repository URL)
git remote add origin https://github.com/yourusername/nodejs-cicd-demo.git

# Push to GitHub
git push -u origin main
```

### Step 4: Create a Jenkins Pipeline Job

1. Open Jenkins in your web browser.
2. Click **New Item**.
3. Enter a name for the job (e.g., `nodejs-cicd-demo`).
4. Select **Pipeline** and click **OK**.
5. In the job configuration:
   - Under **Pipeline**, select **Pipeline script from SCM**.
   - Select **Git** as the SCM.
   - Enter your repository URL.
   - Specify the branch to build (e.g., `*/main`).
   - Set the Script Path to `Jenkinsfile`.
   - Click **Save**.

### Step 5: Run the Pipeline

1. Click **Build Now** to run the pipeline.
2. Monitor the pipeline execution in the Jenkins UI.
3. Check the console output for each stage to ensure everything is working as expected.

### Step 6: Extend the Pipeline for Continuous Deployment

To extend the pipeline for continuous deployment, you can add stages to deploy the application to staging and production environments. Here's an example of how to modify the Jenkinsfile:

```groovy
pipeline {
    agent {
        docker {
            image 'node:14-alpine'
            args '-p 3000:3000'
        }
    }
    
    environment {
        CI = 'true'
        DOCKER_REGISTRY = 'your-registry.example.com'
        IMAGE_NAME = 'nodejs-cicd-demo'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    app = docker.build("${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://your-registry.example.com', 'docker-registry-credentials') {
                        app.push("${IMAGE_TAG}")
                        app.push("latest")
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            steps {
                sh "kubectl set image deployment/${IMAGE_NAME} ${IMAGE_NAME}=${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} --namespace=staging"
                sh "kubectl rollout status deployment/${IMAGE_NAME} --namespace=staging"
            }
        }
        
        stage('Integration Tests on Staging') {
            steps {
                sh 'npm run test:integration'
            }
        }
        
        stage('Deploy to Production') {
            steps {
                input message: 'Deploy to production?'
                sh "kubectl set image deployment/${IMAGE_NAME} ${IMAGE_NAME}=${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} --namespace=production"
                sh "kubectl rollout status deployment/${IMAGE_NAME} --namespace=production"
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

## Summary

In this chapter, we've explored Continuous Integration and Continuous Deployment, two fundamental practices in modern DevOps. We've learned how to set up Jenkins, create CI pipelines, implement automated testing, and deploy applications using various strategies.

Key takeaways from this chapter:

1. CI/CD is a set of practices that enable teams to deliver code changes more frequently and reliably.
2. Jenkins is a popular open-source automation server used for implementing CI/CD pipelines.
3. Jenkins Pipelines allow you to define your CI/CD pipeline as code, making it versionable and reviewable.
4. Automated testing is a critical component of any CI/CD pipeline, ensuring that code changes don't break existing functionality.
5. Different deployment strategies offer different trade-offs between risk, complexity, and downtime.

In the next chapter, we'll dive into containerization with Docker, exploring how to create, manage, and deploy containerized applications.

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins Pipeline Syntax Reference](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Continuous Delivery by Jez Humble and David Farley](https://continuousdelivery.com/)
- [Jenkins Pipeline Examples](https://github.com/jenkinsci/pipeline-examples)
- [Jenkins Shared Libraries Documentation](https://www.jenkins.io/doc/book/pipeline/shared-libraries/)
