# Chapter 3: Containerization with Docker

## Docker Fundamentals

Containerization has revolutionized how we build, ship, and run applications. At the forefront of this revolution is Docker, a platform that enables developers to package applications with all their dependencies into standardized units called containers. In this chapter, we'll explore Docker fundamentals, best practices, and how to effectively use Docker in a DevOps environment.

### What is Docker?

Docker is an open-source platform that automates the deployment of applications inside lightweight, portable containers. A container is a standard unit of software that packages code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

#### Key Concepts in Docker

1. **Container**: A lightweight, standalone, executable package that includes everything needed to run an application: code, runtime, system tools, libraries, and settings.

2. **Image**: A read-only template with instructions for creating a Docker container. Images are built from a Dockerfile.

3. **Dockerfile**: A text document containing instructions to build a Docker image.

4. **Registry**: A repository for Docker images. Docker Hub is the default public registry.

5. **Docker Engine**: The runtime that runs and manages containers.

6. **Docker Compose**: A tool for defining and running multi-container Docker applications.

7. **Docker Swarm**: Docker's native clustering and orchestration solution.

### Docker Architecture

Docker uses a client-server architecture:

1. **Docker Client**: The primary way users interact with Docker. When you run commands like `docker run`, the client sends these commands to the Docker daemon.

2. **Docker Daemon (dockerd)**: Listens for Docker API requests and manages Docker objects such as images, containers, networks, and volumes.

3. **Docker Registry**: Stores Docker images. Docker Hub is a public registry that anyone can use.

The workflow typically looks like this:

1. You use the Docker client to issue commands.
2. The Docker daemon receives these commands and manages Docker objects accordingly.
3. The daemon pulls images from or pushes images to a registry as needed.

### Benefits of Docker

1. **Consistency**: Docker ensures that applications run the same regardless of where they are deployed.

2. **Isolation**: Containers isolate applications from one another and from the underlying infrastructure.

3. **Portability**: Containers can run anywhere Docker is installed, from a developer's laptop to production servers.

4. **Efficiency**: Containers share the host OS kernel, making them more lightweight than virtual machines.

5. **Scalability**: Containers can be easily scaled up or down based on demand.

6. **Version Control**: Docker images can be versioned, allowing for easy rollbacks.

7. **Rapid Deployment**: Containers can be started and stopped in seconds.

### Docker vs. Virtual Machines

While both Docker containers and virtual machines (VMs) provide isolation, they do so in different ways:

| Feature | Docker Containers | Virtual Machines |
|---------|------------------|------------------|
| Isolation | Process-level isolation | Hardware-level isolation |
| Size | Typically megabytes | Typically gigabytes |
| Boot Time | Seconds | Minutes |
| Performance | Near-native | Overhead due to hypervisor |
| OS | Shares host OS kernel | Requires full OS |
| Resource Usage | Efficient | Higher resource usage |
| Portability | Highly portable | Less portable |

## Creating Dockerfiles

A Dockerfile is a text document containing instructions to build a Docker image. It specifies the base image, adds application code, installs dependencies, configures settings, and defines how the container should run.

### Dockerfile Syntax

Here's the basic syntax of a Dockerfile:

```dockerfile
# Comment
INSTRUCTION arguments
```

Common instructions include:

1. **FROM**: Specifies the base image.
2. **RUN**: Executes commands in a new layer.
3. **COPY/ADD**: Copies files from the host to the container.
4. **WORKDIR**: Sets the working directory.
5. **ENV**: Sets environment variables.
6. **EXPOSE**: Informs Docker that the container listens on specific ports.
7. **CMD**: Provides defaults for executing a container.
8. **ENTRYPOINT**: Configures a container to run as an executable.

### Example Dockerfile for a Node.js Application

```dockerfile
# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to run the application
CMD ["node", "app.js"]
```

### Best Practices for Writing Dockerfiles

1. **Use Specific Base Images**: Use specific versions of base images (e.g., `node:14-alpine` instead of `node:latest`) to ensure consistency.

2. **Minimize Layers**: Combine related commands into a single RUN instruction to reduce the number of layers.

3. **Use .dockerignore**: Create a `.dockerignore` file to exclude files and directories that shouldn't be copied to the container.

4. **Order Instructions Strategically**: Place instructions that change less frequently at the beginning of the Dockerfile to leverage Docker's build cache.

5. **Use Multi-stage Builds**: Use multi-stage builds to create smaller production images.

6. **Don't Run as Root**: Use the USER instruction to run the container as a non-root user for security.

7. **Clean Up After Installations**: Remove unnecessary files after installations to reduce image size.

8. **Set Default Environment Variables**: Use ENV to set default environment variables.

9. **Use HEALTHCHECK**: Add a HEALTHCHECK instruction to verify that the container is working correctly.

10. **Document Exposed Ports and Volumes**: Use EXPOSE and VOLUME to document which ports and volumes the container uses.

### Multi-stage Builds

Multi-stage builds allow you to use multiple FROM statements in your Dockerfile. Each FROM instruction can use a different base, and begins a new stage of the build. You can selectively copy artifacts from one stage to another, leaving behind everything you don't need in the final image.

Here's an example of a multi-stage build for a Node.js application:

```dockerfile
# Build stage
FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/app.js"]
```

This Dockerfile uses two stages:
1. The build stage installs all dependencies and builds the application.
2. The production stage copies only the built artifacts and production dependencies, resulting in a smaller final image.

### Building and Tagging Images

To build an image from a Dockerfile, use the `docker build` command:

```bash
docker build -t myapp:1.0 .
```

This command builds an image from the Dockerfile in the current directory (`.`) and tags it as `myapp:1.0`.

You can also tag an existing image:

```bash
docker tag myapp:1.0 myregistry.example.com/myapp:1.0
```

### Pushing Images to a Registry

To push an image to a registry, first log in to the registry:

```bash
docker login myregistry.example.com
```

Then push the image:

```bash
docker push myregistry.example.com/myapp:1.0
```

## Docker Compose for Multi-Container Applications

Docker Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application's services, networks, and volumes. Then, with a single command, you create and start all the services from your configuration.

### Docker Compose File Structure

A Docker Compose file (typically named `docker-compose.yml`) defines services, networks, and volumes:

```yaml
version: '3'

services:
  web:
    build: ./web
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://postgres:postgres@db:5432/postgres

  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=postgres

volumes:
  postgres_data:
```

This example defines two services:
1. `web`: A service built from the Dockerfile in the `./web` directory.
2. `db`: A PostgreSQL database service using the official PostgreSQL image.

It also defines a volume (`postgres_data`) to persist the database data.

### Key Docker Compose Concepts

1. **Services**: Containers that make up your application.
2. **Networks**: How services communicate with each other.
3. **Volumes**: Persistent data storage for services.
4. **Environment Variables**: Configuration for services.
5. **Dependencies**: The order in which services should start.

### Common Docker Compose Commands

- **Start services**: `docker-compose up`
- **Start services in detached mode**: `docker-compose up -d`
- **Stop services**: `docker-compose down`
- **View logs**: `docker-compose logs`
- **Execute a command in a service**: `docker-compose exec web bash`
- **Build or rebuild services**: `docker-compose build`
- **List containers**: `docker-compose ps`
- **Stop and remove containers, networks, and volumes**: `docker-compose down -v`

### Example: MEAN Stack Application with Docker Compose

Let's create a Docker Compose configuration for a MEAN (MongoDB, Express.js, Angular, Node.js) stack application:

```yaml
version: '3'

services:
  # MongoDB service
  mongo:
    image: mongo:4.4
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password

  # Backend API service
  api:
    build: ./api
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    environment:
      - MONGO_URI=mongodb://admin:password@mongo:27017/myapp?authSource=admin
    volumes:
      - ./api:/app
      - /app/node_modules

  # Frontend service
  frontend:
    build: ./frontend
    ports:
      - "4200:4200"
    depends_on:
      - api
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  mongo_data:
```

This configuration defines three services:
1. `mongo`: A MongoDB database service.
2. `api`: A Node.js/Express.js API service.
3. `frontend`: An Angular frontend service.

It also defines a volume (`mongo_data`) to persist the MongoDB data.

### Docker Compose for Development vs. Production

Docker Compose is often used differently in development and production environments:

#### Development
- Mount source code as volumes for live reloading.
- Expose debugging ports.
- Use development-specific environment variables.
- Include development tools and dependencies.

#### Production
- Build optimized images.
- Use production-specific environment variables.
- Implement proper logging and monitoring.
- Configure for high availability and scalability.

You can use multiple Compose files to manage these differences:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Docker Networking

Docker networking enables communication between containers and between containers and the outside world. Docker provides several network drivers to accommodate different use cases.

### Network Drivers

1. **Bridge**: The default network driver. Containers on the same bridge network can communicate with each other.

2. **Host**: Removes network isolation between the container and the host.

3. **Overlay**: Connects multiple Docker daemons and enables Swarm services to communicate.

4. **Macvlan**: Assigns a MAC address to a container, making it appear as a physical device on the network.

5. **None**: Disables all networking for a container.

### Creating and Managing Networks

Create a network:
```bash
docker network create mynetwork
```

List networks:
```bash
docker network ls
```

Inspect a network:
```bash
docker network inspect mynetwork
```

Connect a container to a network:
```bash
docker network connect mynetwork mycontainer
```

Disconnect a container from a network:
```bash
docker network disconnect mynetwork mycontainer
```

Remove a network:
```bash
docker network rm mynetwork
```

### Network Configuration in Docker Compose

In Docker Compose, you can define custom networks and specify which services should use them:

```yaml
version: '3'

services:
  web:
    build: ./web
    networks:
      - frontend
      - backend

  db:
    image: postgres:13
    networks:
      - backend

networks:
  frontend:
  backend:
```

This configuration creates two networks (`frontend` and `backend`). The `web` service is connected to both networks, while the `db` service is only connected to the `backend` network.

### Service Discovery

Docker provides built-in service discovery through DNS. Containers can communicate with each other using service names as hostnames:

```bash
# From inside the 'web' container
curl http://db:5432
```

This works because Docker's embedded DNS server resolves the service name `db` to the IP address of the `db` container.

## Docker Volumes and Persistence

Docker volumes provide a way to persist data generated by and used by Docker containers. Volumes are completely managed by Docker and are isolated from the core functionality of the host machine.

### Types of Data Persistence in Docker

1. **Volumes**: Managed by Docker and stored in a part of the host filesystem that's managed by Docker.

2. **Bind Mounts**: Map a host file or directory to a container file or directory.

3. **tmpfs Mounts**: Stored in the host system's memory only.

### Creating and Managing Volumes

Create a volume:
```bash
docker volume create myvolume
```

List volumes:
```bash
docker volume ls
```

Inspect a volume:
```bash
docker volume inspect myvolume
```

Remove a volume:
```bash
docker volume rm myvolume
```

Remove all unused volumes:
```bash
docker volume prune
```

### Using Volumes with Containers

Mount a volume when running a container:
```bash
docker run -v myvolume:/data myimage
```

Mount a host directory (bind mount):
```bash
docker run -v /host/path:/container/path myimage
```

Use the newer `--mount` syntax:
```bash
docker run --mount type=volume,source=myvolume,target=/data myimage
```

### Volume Configuration in Docker Compose

In Docker Compose, you can define volumes and mount them to services:

```yaml
version: '3'

services:
  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

This configuration creates a volume named `postgres_data` and mounts it to the `/var/lib/postgresql/data` directory in the `db` service.

### Backup and Restore Data in Volumes

Backup a volume:
```bash
docker run --rm -v myvolume:/data -v $(pwd):/backup alpine tar -czf /backup/myvolume.tar.gz -C /data .
```

Restore a volume:
```bash
docker run --rm -v myvolume:/data -v $(pwd):/backup alpine sh -c "cd /data && tar -xzf /backup/myvolume.tar.gz"
```

## Docker Security Best Practices

Security is a critical aspect of using Docker in production environments. Here are some best practices to enhance the security of your Docker deployments:

### Image Security

1. **Use Official or Verified Images**: Use images from trusted sources like Docker Hub Official Images or Docker Verified Publishers.

2. **Scan Images for Vulnerabilities**: Use tools like Docker Scout, Trivy, or Clair to scan images for vulnerabilities.

3. **Use Specific Tags**: Avoid using the `latest` tag, which can lead to unexpected changes.

4. **Implement Image Signing**: Use Docker Content Trust to sign and verify images.

5. **Keep Images Updated**: Regularly update base images to include security patches.

### Container Security

1. **Run Containers as Non-root**: Use the USER instruction in your Dockerfile to run containers as a non-root user.

2. **Limit Capabilities**: Use the `--cap-drop` and `--cap-add` flags to limit container capabilities.

3. **Use Read-Only Filesystems**: Mount filesystems as read-only when possible using the `--read-only` flag.

4. **Set Resource Limits**: Use the `--memory` and `--cpu` flags to limit container resources.

5. **Use Security Scanning Tools**: Regularly scan running containers for vulnerabilities.

### Host Security

1. **Keep Docker Updated**: Regularly update Docker to get the latest security patches.

2. **Secure the Docker Daemon**: Configure TLS authentication for the Docker daemon.

3. **Use a Firewall**: Implement a firewall to control access to the Docker host.

4. **Audit Docker Daemon**: Monitor and audit Docker daemon activities.

5. **Implement Host Hardening**: Apply security best practices to the host operating system.

### Network Security

1. **Use User-defined Networks**: Create user-defined networks to isolate container communication.

2. **Limit Exposed Ports**: Only expose necessary ports to the host.

3. **Use TLS for Communication**: Implement TLS for secure communication between containers.

4. **Implement Network Segmentation**: Separate containers into different networks based on their function.

5. **Monitor Network Traffic**: Implement network monitoring to detect suspicious activities.

### Secret Management

1. **Use Docker Secrets**: Use Docker Secrets to manage sensitive data in Swarm mode.

2. **Avoid Environment Variables for Secrets**: Don't use environment variables for sensitive data.

3. **Use External Secret Management Tools**: Consider using tools like HashiCorp Vault or AWS Secrets Manager.

4. **Rotate Secrets Regularly**: Implement a process to regularly rotate secrets.

5. **Audit Secret Access**: Monitor and audit access to secrets.

## Hands-On Exercise: Containerizing a Web Application

In this exercise, we'll containerize a simple web application using Docker and Docker Compose.

### Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine
- Basic knowledge of HTML, CSS, and JavaScript
- Basic knowledge of Node.js and Express

### Step 1: Create a Simple Web Application

First, let's create a simple Express.js web application:

```bash
# Create a new directory
mkdir docker-web-app
cd docker-web-app

# Create the application structure
mkdir -p public src

# Create package.json
cat > package.json << 'EOF'
{
  "name": "docker-web-app",
  "version": "1.0.0",
  "description": "A simple web application for Docker demonstration",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}
EOF

# Create the Express application
cat > src/app.js << 'EOF'
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint
app.get('/api/info', (req, res) => {
  res.json({
    app: 'Docker Web App',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
EOF

# Create a simple HTML page
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Docker Web App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>Docker Web App</h1>
    <p>This is a simple web application containerized with Docker.</p>
    <div id="info">Loading...</div>
  </div>
  <script src="script.js"></script>
</body>
</html>
EOF

# Create CSS file
cat > public/styles.css << 'EOF'
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  border-radius: 5px;
}

h1 {
  color: #333;
}

#info {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 5px;
  margin-top: 1rem;
}
EOF

# Create JavaScript file
cat > public/script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
  const infoElement = document.getElementById('info');
  
  fetch('/api/info')
    .then(response => response.json())
    .then(data => {
      infoElement.innerHTML = `
        <p><strong>App:</strong> ${data.app}</p>
        <p><strong>Version:</strong> ${data.version}</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      `;
    })
    .catch(error => {
      infoElement.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
node_modules/
npm-debug.log
.DS_Store
EOF
```

### Step 2: Create a Dockerfile

Now, let's create a Dockerfile to containerize our application:

```bash
cat > Dockerfile << 'EOF'
# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Define the command to run the application
CMD ["node", "src/app.js"]
EOF
```

### Step 3: Create a Docker Compose File

Let's create a Docker Compose file to make it easier to run our application:

```bash
cat > docker-compose.yml << 'EOF'
version: '3'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    environment:
      - NODE_ENV=production
      - PORT=3000
EOF
```

### Step 4: Create a Development Docker Compose File

Let's also create a development-specific Docker Compose file:

```bash
cat > docker-compose.dev.yml << 'EOF'
version: '3'

services:
  web:
    command: npm run dev
    environment:
      - NODE_ENV=development
    volumes:
      - ./:/app
      - /app/node_modules
EOF
```

### Step 5: Build and Run the Application

Now, let's build and run our containerized application:

```bash
# Install dependencies locally (for development)
npm install

# Build and run the production container
docker-compose up --build

# In a separate terminal, build and run the development container
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Open your browser and navigate to `http://localhost:3000` to see the application running.

### Step 6: Add a Database Service

Let's enhance our application by adding a MongoDB database service:

```bash
# Update the Express application to use MongoDB
cat > src/app.js << 'EOF'
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/dockerapp';

let db;

// Connect to MongoDB
async function connectToMongo() {
  try {
    const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db();
    
    // Create a visits collection if it doesn't exist
    const collections = await db.listCollections().toArray();
    if (!collections.some(c => c.name === 'visits')) {
      await db.createCollection('visits');
    }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

connectToMongo();

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API endpoint
app.get('/api/info', async (req, res) => {
  try {
    // Record the visit
    if (db) {
      await db.collection('visits').insertOne({
        timestamp: new Date(),
        userAgent: req.headers['user-agent']
      });
      
      // Get visit count
      const visitCount = await db.collection('visits').countDocuments();
      
      res.json({
        app: 'Docker Web App',
        version: '1.0.0',
        timestamp: new Date(),
        visits: visitCount
      });
    } else {
      res.json({
        app: 'Docker Web App',
        version: '1.0.0',
        timestamp: new Date(),
        visits: 'Database not connected'
      });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
EOF

# Update package.json to include MongoDB
cat > package.json << 'EOF'
{
  "name": "docker-web-app",
  "version": "1.0.0",
  "description": "A simple web application for Docker demonstration",
  "main": "src/app.js",
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongodb": "^4.1.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}
EOF

# Update the JavaScript file to display visit count
cat > public/script.js << 'EOF'
document.addEventListener('DOMContentLoaded', () => {
  const infoElement = document.getElementById('info');
  
  fetch('/api/info')
    .then(response => response.json())
    .then(data => {
      infoElement.innerHTML = `
        <p><strong>App:</strong> ${data.app}</p>
        <p><strong>Version:</strong> ${data.version}</p>
        <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
        <p><strong>Visits:</strong> ${data.visits}</p>
      `;
    })
    .catch(error => {
      infoElement.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
EOF

# Update Docker Compose file to include MongoDB
cat > docker-compose.yml << 'EOF'
version: '3'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    environment:
      - NODE_ENV=production
      - PORT=3000
      - MONGO_URL=mongodb://mongo:27017/dockerapp
    depends_on:
      - mongo

  mongo:
    image: mongo:4.4
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo_data:
EOF
```

### Step 7: Rebuild and Run the Enhanced Application

```bash
# Install the new dependencies
npm install

# Build and run the enhanced application
docker-compose up --build
```

Open your browser and navigate to `http://localhost:3000` to see the enhanced application running with MongoDB integration.

### Step 8: Push the Image to Docker Hub

Let's push our image to Docker Hub so others can use it:

```bash
# Log in to Docker Hub
docker login

# Tag the image (replace 'yourusername' with your Docker Hub username)
docker tag docker-web-app_web yourusername/docker-web-app:1.0

# Push the image to Docker Hub
docker push yourusername/docker-web-app:1.0
```

## Summary

In this chapter, we've explored Docker fundamentals, including creating Dockerfiles, using Docker Compose for multi-container applications, managing Docker networking and volumes, and implementing Docker security best practices. We've also completed a hands-on exercise to containerize a web application with a database.

Key takeaways from this chapter:

1. Docker enables you to package applications with all their dependencies into standardized containers.
2. Dockerfiles define how to build Docker images, which are templates for creating containers.
3. Docker Compose simplifies the management of multi-container applications.
4. Docker networking enables communication between containers and with the outside world.
5. Docker volumes provide persistent storage for containers.
6. Implementing security best practices is crucial for using Docker in production environments.

In the next chapter, we'll dive into container orchestration with Kubernetes, exploring how to deploy, manage, and scale containerized applications in a production environment.

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/security/)
- [Docker Curriculum](https://docker-curriculum.com/)
- [Play with Docker](https://labs.play-with-docker.com/)
