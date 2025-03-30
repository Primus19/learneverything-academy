# NoSQL Databases for Big Data

In this chapter, we'll explore NoSQL databases and their role in big data architectures. As data volumes, variety, and velocity have increased, traditional relational databases have shown limitations in scalability and flexibility. NoSQL databases emerged as a solution to these challenges, offering different data models and distribution mechanisms optimized for specific use cases.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the key characteristics and types of NoSQL databases
2. Select appropriate NoSQL solutions for different big data use cases
3. Design effective data models for various NoSQL database types
4. Implement basic CRUD operations in different NoSQL databases
5. Integrate NoSQL databases with big data processing frameworks
6. Apply best practices for NoSQL database deployment and management

## 1. Introduction to NoSQL Databases

### 1.1 What are NoSQL Databases?

NoSQL ("Not Only SQL") databases are non-relational database management systems designed for distributed data stores with large-scale data storage and processing needs:

1. **Key Characteristics**:
   - Schema flexibility
   - Horizontal scalability
   - High availability
   - Optimized for specific data models and access patterns
   - Eventual consistency (in many cases)

2. **When to Use NoSQL**:
   - Handling large volumes of structured, semi-structured, or unstructured data
   - Rapid development with evolving data schemas
   - High write throughput
   - Geographically distributed data
   - Specific query patterns not well-served by relational databases

### 1.2 NoSQL vs. Relational Databases

Understanding the key differences between NoSQL and traditional relational databases:

| Feature | NoSQL Databases | Relational Databases |
|---------|----------------|----------------------|
| **Data Model** | Various (document, key-value, column, graph) | Tables with rows and columns |
| **Schema** | Flexible, schema-on-read | Rigid, schema-on-write |
| **Scaling** | Horizontal (scale-out) | Vertical (scale-up) |
| **Transactions** | Limited (often eventual consistency) | ACID compliance |
| **Query Language** | Database-specific APIs | SQL (standardized) |
| **Joins** | Limited or not supported | Fully supported |
| **Use Cases** | Big data, real-time web apps, IoT | Business systems, complex queries |

### 1.3 CAP Theorem and NoSQL

The CAP theorem states that a distributed database system can only guarantee two of the following three properties simultaneously:

1. **Consistency**: All nodes see the same data at the same time
2. **Availability**: Every request receives a response (success or failure)
3. **Partition Tolerance**: System continues to operate despite network partitions

NoSQL databases make different trade-offs among these properties:

- **CP Systems** (Consistency + Partition Tolerance):
  - MongoDB (in certain configurations)
  - HBase
  - Redis (in cluster mode)

- **AP Systems** (Availability + Partition Tolerance):
  - Cassandra
  - CouchDB
  - DynamoDB (by default)

- **CA Systems** (Consistency + Availability):
  - Traditional RDBMS (not truly distributed)

```
# CAP Theorem Visualization (ASCII Diagram)

                    Consistency
                         ^
                         |
                         |
                    +----|----+
                    |    |    |
                    |    |    |
                    |  RDBMS  |
                    |    |    |
                    |    |    |
                    +----|----+
                         |
                         |
 +--------------------+  |  +--------------------+
 |                    |  |  |                    |
 |      MongoDB       |  |  |     Cassandra      |
 |       HBase        |  |  |      CouchDB       |
 |                    |  |  |                    |
 +--------------------+  |  +--------------------+
                         |
Partition <--------------+--------------> Availability
Tolerance                                  
```

> **Knowledge Check:** For each of the following scenarios, would you prioritize consistency, availability, or partition tolerance, and why?
> - A banking system processing financial transactions
> - A social media platform serving user content globally
> - An e-commerce website tracking inventory and orders
> - A distributed sensor network collecting environmental data

## 2. Types of NoSQL Databases

### 2.1 Key-Value Stores

The simplest form of NoSQL databases, storing data as key-value pairs:

1. **Key Characteristics**:
   - Simple data model (keys mapped to values)
   - Very fast lookups by key
   - Highly scalable and performant
   - Limited query capabilities

2. **Use Cases**:
   - Caching
   - Session storage
   - User preferences
   - Shopping carts
   - Real-time analytics

3. **Popular Key-Value Databases**:
   - Redis
   - Amazon DynamoDB
   - Riak
   - Memcached

```python
# Example: Basic Redis operations
import redis

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Set a simple key-value pair
r.set('user:1001', 'John Doe')

# Get a value
username = r.get('user:1001')
print(f"Username: {username.decode('utf-8')}")

# Set with expiration (TTL)
r.setex('session:1001', 3600, 'active')  # Expires in 1 hour

# Check if key exists
if r.exists('user:1001'):
    print("User exists")

# Increment a counter
r.incr('page_views')
views = r.get('page_views')
print(f"Page views: {views.decode('utf-8')}")

# Store and retrieve a hash (multiple fields)
r.hset('user:profile:1001', mapping={
    'name': 'John Doe',
    'email': 'john@example.com',
    'age': '30'
})

# Get specific hash field
email = r.hget('user:profile:1001', 'email')
print(f"Email: {email.decode('utf-8')}")

# Get all hash fields
profile = r.hgetall('user:profile:1001')
print("Profile:", {k.decode('utf-8'): v.decode('utf-8') for k, v in profile.items()})

# Delete a key
r.delete('session:1001')
```

### 2.2 Document Stores

Document databases store data in flexible, JSON-like documents:

1. **Key Characteristics**:
   - Documents contain key-value pairs
   - Schema flexibility (documents in the same collection can have different fields)
   - Documents are typically stored in JSON, BSON, or XML format
   - Rich query capabilities
   - Indexing support

2. **Use Cases**:
   - Content management systems
   - User profiles
   - Product catalogs
   - Real-time analytics
   - IoT applications

3. **Popular Document Databases**:
   - MongoDB
   - Couchbase
   - Amazon DocumentDB
   - Firebase Firestore

```javascript
// Example: MongoDB CRUD operations
// Connect to MongoDB
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("ecommerce");
    const products = database.collection("products");
    
    // Create: Insert a document
    const product = {
      name: "Smartphone",
      brand: "TechCo",
      price: 699.99,
      specs: {
        screen: "6.5 inch",
        processor: "Octa-core",
        storage: "128GB"
      },
      colors: ["Black", "Silver", "Blue"],
      inStock: true,
      created_at: new Date()
    };
    
    const result = await products.insertOne(product);
    console.log(`Product inserted with ID: ${result.insertedId}`);
    
    // Read: Query documents
    // Find a single document
    const singleProduct = await products.findOne({ brand: "TechCo" });
    console.log("Found product:", singleProduct);
    
    // Find multiple documents with filter
    const cursor = products.find({ price: { $lt: 1000 } });
    const affordableProducts = await cursor.toArray();
    console.log(`Found ${affordableProducts.length} affordable products`);
    
    // Update: Modify documents
    // Update a single document
    const updateResult = await products.updateOne(
      { name: "Smartphone" },
      { $set: { price: 649.99, "specs.storage": "256GB" } }
    );
    console.log(`Updated ${updateResult.modifiedCount} document`);
    
    // Update multiple documents
    const bulkUpdateResult = await products.updateMany(
      { brand: "TechCo" },
      { $set: { featured: true } }
    );
    console.log(`Updated ${bulkUpdateResult.modifiedCount} documents`);
    
    // Delete: Remove documents
    // Delete a single document
    const deleteResult = await products.deleteOne({ inStock: false });
    console.log(`Deleted ${deleteResult.deletedCount} document`);
    
    // Aggregation: Complex queries
    const aggregationResult = await products.aggregate([
      { $match: { brand: "TechCo" } },
      { $group: { _id: "$brand", avgPrice: { $avg: "$price" } } }
    ]).toArray();
    console.log("Aggregation results:", aggregationResult);
    
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

### 2.3 Column-Family Stores

Column-family databases organize data in tables, rows, and column families:

1. **Key Characteristics**:
   - Data is stored in tables with rows and columns
   - Columns are grouped into column families
   - Sparse data storage (only stores non-null values)
   - Optimized for write-heavy workloads
   - Highly scalable for large datasets

2. **Use Cases**:
   - Time-series data
   - Logging systems
   - Recommendation systems
   - Sensor data storage
   - Historical data analysis

3. **Popular Column-Family Databases**:
   - Apache Cassandra
   - HBase
   - ScyllaDB
   - Google Bigtable

```java
// Example: Cassandra CQL operations
// Create a keyspace
CREATE KEYSPACE ecommerce 
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 3};

// Use the keyspace
USE ecommerce;

// Create a table with a compound primary key
CREATE TABLE product_events (
    product_id UUID,
    event_time TIMESTAMP,
    event_type TEXT,
    user_id UUID,
    details MAP<TEXT, TEXT>,
    PRIMARY KEY (product_id, event_time)
) WITH CLUSTERING ORDER BY (event_time DESC);

// Insert data
INSERT INTO product_events (
    product_id, event_time, event_type, user_id, details
) VALUES (
    uuid(), toTimestamp(now()), 'view', 
    uuid(), {'source': 'mobile', 'session_id': '12345'}
);

// Query with time range
SELECT * FROM product_events 
WHERE product_id = 550e8400-e29b-41d4-a716-446655440000
AND event_time > '2023-01-01' AND event_time < '2023-01-02';

// Create a counter table
CREATE TABLE product_counters (
    product_id UUID,
    date TEXT,
    views COUNTER,
    purchases COUNTER,
    PRIMARY KEY (product_id, date)
);

// Update counters
UPDATE product_counters 
SET views = views + 1 
WHERE product_id = 550e8400-e29b-41d4-a716-446655440000 AND date = '2023-01-15';

// Create a table with a secondary index
CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    email TEXT,
    name TEXT,
    country TEXT
);

CREATE INDEX ON users (country);

// Query using the secondary index
SELECT * FROM users WHERE country = 'USA';
```

### 2.4 Graph Databases

Graph databases store data in nodes, edges, and properties:

1. **Key Characteristics**:
   - Optimized for connected data
   - Nodes represent entities
   - Edges represent relationships between entities
   - Properties store attributes of nodes and edges
   - Efficient traversal operations

2. **Use Cases**:
   - Social networks
   - Recommendation engines
   - Fraud detection
   - Network and IT operations
   - Knowledge graphs

3. **Popular Graph Databases**:
   - Neo4j
   - Amazon Neptune
   - JanusGraph
   - ArangoDB

```cypher
// Example: Neo4j Cypher operations
// Create nodes and relationships
CREATE (john:Person {name: 'John', age: 35})
CREATE (mary:Person {name: 'Mary', age: 32})
CREATE (peter:Person {name: 'Peter', age: 28})
CREATE (acme:Company {name: 'ACME Corp', industry: 'Technology'})
CREATE (globex:Company {name: 'Globex', industry: 'Finance'})

CREATE (john)-[:WORKS_AT {since: 2018, position: 'Developer'}]->(acme)
CREATE (mary)-[:WORKS_AT {since: 2020, position: 'Manager'}]->(acme)
CREATE (peter)-[:WORKS_AT {since: 2019, position: 'Analyst'}]->(globex)

CREATE (john)-[:KNOWS {since: 2015}]->(mary)
CREATE (mary)-[:KNOWS {since: 2017}]->(peter)
CREATE (peter)-[:KNOWS {since: 2018}]->(john)

// Query relationships
// Find people who work at ACME
MATCH (p:Person)-[:WORKS_AT]->(c:Company {name: 'ACME Corp'})
RETURN p.name, p.age, c.name

// Find connections between people (friends of friends)
MATCH (john:Person {name: 'John'})-[:KNOWS]->(friend)-[:KNOWS]->(foaf)
WHERE john <> foaf
RETURN john.name, friend.name, foaf.name

// Find the shortest path between two people
MATCH path = shortestPath((john:Person {name: 'John'})-[:KNOWS*]-(peter:Person {name: 'Peter'}))
RETURN path

// Find people who work together
MATCH (p1:Person)-[:WORKS_AT]->(c:Company)<-[:WORKS_AT]-(p2:Person)
WHERE p1 <> p2
RETURN p1.name, p2.name, c.name

// Recommendation: Find people John might know
MATCH (john:Person {name: 'John'})-[:KNOWS]->(friend)-[:KNOWS]->(recommendation)
WHERE NOT (john)-[:KNOWS]->(recommendation) AND john <> recommendation
RETURN recommendation.name, COUNT(friend) AS mutual_friends
ORDER BY mutual_friends DESC
```

> **Hands-on Exercise:** Choose a real-world scenario (e.g., e-commerce platform, social network, IoT system) and design appropriate data models for at least two different types of NoSQL databases. Implement basic CRUD operations for each model and compare their strengths and limitations for your specific use case.

## 3. Data Modeling for NoSQL Databases

### 3.1 General Principles

Key considerations for NoSQL data modeling:

1. **Query-Driven Design**:
   - Model based on application query patterns
   - Optimize for the most frequent queries
   - Denormalize data to avoid joins

2. **Denormalization**:
   - Duplicate data to improve read performance
   - Trade storage for speed
   - Balance between duplication and consistency

3. **Aggregation**:
   - Group related data together
   - Design around entity boundaries
   - Consider access patterns

4. **Schema Evolution**:
   - Plan for schema changes
   - Version documents/entities
   - Use flexible fields

### 3.2 Data Modeling for Key-Value Stores

Strategies for effective key-value data modeling:

1. **Key Design Patterns**:
   - Simple keys: `user:1001`
   - Composite keys: `user:1001:profile`
   - Hierarchical keys: `org:5:dept:3:user:1001`

2. **Value Structures**:
   - Simple values (strings, numbers)
   - Serialized objects (JSON, Protocol Buffers)
   - Hashes (field-value pairs)

3. **Common Patterns**:
   - Caching with TTL
   - Counters and rate limiters
   - Session storage
   - Distributed locks

```
# Key-Value Data Modeling Example (ASCII Diagram)

Key                     Value
---------------------------------------------
user:1001               "John Doe"
user:1001:email         "john@example.com"
user:1001:preferences   {"theme":"dark","notifications":true}
user:1001:sessions      ["abc123","def456"]
user:1001:friends       [1002,1003,1005]
counter:page:home       42678
rate:api:user:1001      {"count":37,"reset":1672531200}
lock:resource:12345     {"owner":"process-5","expires":1672531200}
```

### 3.3 Data Modeling for Document Stores

Approaches for document database modeling:

1. **Document Structure**:
   - Embedded documents vs. references
   - Document size limitations
   - Nesting depth considerations

2. **Relationships**:
   - Embedding (one-to-few relationships)
   - Referencing (one-to-many or many-to-many)
   - Hybrid approaches

3. **Indexing Strategies**:
   - Single field indexes
   - Compound indexes
   - Text indexes
   - Geospatial indexes

```javascript
// Document Store Data Modeling Examples

// Example 1: Embedding (One-to-Few)
// User document with embedded addresses
{
  "_id": ObjectId("5f8a7b2c1c9d440000a7e621"),
  "name": "John Doe",
  "email": "john@example.com",
  "addresses": [
    {
      "type": "home",
      "street": "123 Main St",
      "city": "Boston",
      "state": "MA",
      "zip": "02101"
    },
    {
      "type": "work",
      "street": "456 Market St",
      "city": "Boston",
      "state": "MA",
      "zip": "02109"
    }
  ]
}

// Example 2: Referencing (One-to-Many)
// Order document with references to products
{
  "_id": ObjectId("5f8a7b2c1c9d440000a7e622"),
  "user_id": ObjectId("5f8a7b2c1c9d440000a7e621"),
  "order_date": ISODate("2023-01-15T14:30:00Z"),
  "status": "shipped",
  "total": 129.97,
  "items": [
    {
      "product_id": ObjectId("5f8a7b2c1c9d440000a7e623"),
      "quantity": 2,
      "price": 49.99
    },
    {
      "product_id": ObjectId("5f8a7b2c1c9d440000a7e624"),
      "quantity": 1,
      "price": 29.99
    }
  ],
  "shipping_address_id": ObjectId("5f8a7b2c1c9d440000a7e625")
}

// Example 3: Hybrid (Embedding and Referencing)
// Blog post with embedded comments and author reference
{
  "_id": ObjectId("5f8a7b2c1c9d440000a7e626"),
  "title": "Introduction to NoSQL",
  "content": "NoSQL databases are designed for specific data models...",
  "author_id": ObjectId("5f8a7b2c1c9d440000a7e621"),
  "tags": ["database", "nosql", "mongodb"],
  "published_date": ISODate("2023-01-10T09:00:00Z"),
  "comments": [
    {
      "user_id": ObjectId("5f8a7b2c1c9d440000a7e627"),
      "text": "Great introduction!",
      "date": ISODate("2023-01-10T10:15:00Z")
    },
    {
      "user_id": ObjectId("5f8a7b2c1c9d440000a7e628"),
      "text": "Very helpful, thanks.",
      "date": ISODate("2023-01-10T14:22:00Z")
    }
  ]
}
```

### 3.4 Data Modeling for Column-Family Stores

Strategies for column-family database modeling:

1. **Column Family Design**:
   - Group related columns together
   - Design for query patterns
   - Consider column family growth

2. **Row Key Design**:
   - Distribute data evenly
   - Avoid hotspots
   - Enable range scans when needed

3. **Time-Series Patterns**:
   - Time-based partitioning
   - Rolling windows
   - Bucketing strategies

```
# Column-Family Data Modeling Example (ASCII Diagram)

Table: user_activity

Row Key         | Column Family: profile            | Column Family: activity
----------------|-----------------------------------|---------------------------
user:1001       | name: "John Doe"                  | login:2023-01-15: "web"
                | email: "john@example.com"         | login:2023-01-14: "mobile"
                | joined: "2022-05-10"              | purchase:2023-01-10: "item:123"
                |                                   | view:2023-01-15: "product:456"
----------------|-----------------------------------|---------------------------
user:1002       | name: "Jane Smith"                | login:2023-01-15: "mobile"
                | email: "jane@example.com"         | login:2023-01-13: "web"
                | joined: "2022-07-22"              | view:2023-01-15: "product:123"
                |                                   | view:2023-01-14: "product:789"
```

### 3.5 Data Modeling for Graph Databases

Approaches for graph database modeling:

1. **Node and Edge Design**:
   - Identify entities as nodes
   - Define relationships as edges
   - Determine properties for both

2. **Labeling Strategy**:
   - Use descriptive labels
   - Create hierarchical label structures
   - Apply multiple labels when appropriate

3. **Property Placement**:
   - Node properties vs. edge properties
   - Indexing considerations
   - Query optimization

```
# Graph Data Modeling Example (ASCII Diagram)

[Person:John] ----- KNOWS ----> [Person:Mary]
     |                               |
     |                               |
  WORKS_AT                        WORKS_AT
     |                               |
     v                               v
[Company:ACME] <--- SUPPLIES --- [Company:Supplier]
     |
     |
  LOCATED_IN
     |
     v
[City:New York]
```

> **Knowledge Check:** For each of the following scenarios, which NoSQL data model would be most appropriate and why?
> - A social network application tracking user connections and activities
> - A time-series database for IoT sensor readings
> - A product catalog with complex hierarchical categories
> - A session store for a web application

## 4. NoSQL Database Operations

### 4.1 Basic CRUD Operations

Common patterns for Create, Read, Update, and Delete operations across NoSQL databases:

#### Redis (Key-Value)

```python
# Redis CRUD operations
import redis

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Create
r.set('product:1001', '{"name":"Laptop","price":999.99}')
r.hset('product:1002', mapping={
    'name': 'Smartphone',
    'price': '699.99',
    'brand': 'TechCo'
})

# Read
product = r.get('product:1001')
product_details = r.hgetall('product:1002')

# Update
r.set('product:1001', '{"name":"Laptop Pro","price":1299.99}')
r.hset('product:1002', 'price', '649.99')

# Delete
r.delete('product:1001')
r.hdel('product:1002', 'brand')
```

#### MongoDB (Document)

```javascript
// MongoDB CRUD operations
const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function crudOperations() {
  try {
    await client.connect();
    const collection = client.db("store").collection("products");
    
    // Create
    await collection.insertOne({
      name: "Laptop",
      price: 999.99,
      specs: { cpu: "i7", ram: "16GB", storage: "512GB SSD" }
    });
    
    // Read
    const product = await collection.findOne({ name: "Laptop" });
    const products = await collection.find({ price: { $lt: 1000 } }).toArray();
    
    // Update
    await collection.updateOne(
      { name: "Laptop" },
      { $set: { price: 899.99, "specs.ram": "32GB" } }
    );
    
    // Delete
    await collection.deleteOne({ name: "Laptop" });
    
  } finally {
    await client.close();
  }
}
```

#### Cassandra (Column-Family)

```sql
-- Cassandra CQL CRUD operations

-- Create
INSERT INTO products (
  product_id, name, price, category, created_at
) VALUES (
  uuid(), 'Laptop', 999.99, 'Electronics', toTimestamp(now())
);

-- Read
SELECT * FROM products WHERE product_id = 550e8400-e29b-41d4-a716-446655440000;
SELECT * FROM products WHERE category = 'Electronics' ALLOW FILTERING;

-- Update
UPDATE products 
SET price = 899.99, updated_at = toTimestamp(now())
WHERE product_id = 550e8400-e29b-41d4-a716-446655440000;

-- Delete
DELETE FROM products 
WHERE product_id = 550e8400-e29b-41d4-a716-446655440000;
```

#### Neo4j (Graph)

```cypher
// Neo4j Cypher CRUD operations

// Create
CREATE (p:Product {
  id: 'p1001',
  name: 'Laptop',
  price: 999.99,
  created_at: datetime()
})
CREATE (c:Category {name: 'Electronics'})
CREATE (p)-[:BELONGS_TO]->(c)

// Read
MATCH (p:Product {name: 'Laptop'}) RETURN p
MATCH (p:Product)-[:BELONGS_TO]->(c:Category {name: 'Electronics'}) RETURN p

// Update
MATCH (p:Product {id: 'p1001'})
SET p.price = 899.99, p.updated_at = datetime()
RETURN p

// Delete
MATCH (p:Product {id: 'p1001'})
DETACH DELETE p
```

### 4.2 Querying and Indexing

Strategies for efficient data retrieval across NoSQL databases:

#### Redis (Key-Value)

```python
# Redis querying and indexing
import redis

r = redis.Redis(host='localhost', port=6379, db=0)

# Pattern matching for keys
keys = r.keys('user:10*')
for key in keys:
    print(key)

# Sorted sets for range queries
r.zadd('products:price', {'product:1001': 999.99, 'product:1002': 699.99})
affordable_products = r.zrangebyscore('products:price', 0, 800)

# Secondary indexing with sets
r.sadd('category:electronics', 'product:1001', 'product:1002')
r.sadd('category:mobile', 'product:1002')
mobile_products = r.smembers('category:mobile')

# Intersections
r.sinterstore('affordable:mobile', ['category:mobile', 'affordable:products'])
```

#### MongoDB (Document)

```javascript
// MongoDB querying and indexing
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://localhost:27017");

async function queryOperations() {
  try {
    await client.connect();
    const collection = client.db("store").collection("products");
    
    // Create indexes
    await collection.createIndex({ name: 1 });  // Single field index
    await collection.createIndex({ category: 1, price: -1 });  // Compound index
    await collection.createIndex({ description: "text" });  // Text index
    await collection.createIndex({ location: "2dsphere" });  // Geospatial index
    
    // Basic queries
    const laptops = await collection.find({ category: "Laptops" }).toArray();
    
    // Query operators
    const affordableLaptops = await collection.find({
      category: "Laptops",
      price: { $lt: 1000 },
      "specs.ram": { $gte: "8GB" }
    }).toArray();
    
    // Text search
    const searchResults = await collection.find({
      $text: { $search: "gaming laptop" }
    }).toArray();
    
    // Aggregation pipeline
    const categoryStats = await collection.aggregate([
      { $match: { price: { $lt: 2000 } } },
      { $group: { 
          _id: "$category", 
          avgPrice: { $avg: "$price" },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgPrice: -1 } }
    ]).toArray();
    
  } finally {
    await client.close();
  }
}
```

#### Cassandra (Column-Family)

```sql
-- Cassandra querying and indexing

-- Create indexes
CREATE INDEX ON products(category);
CREATE INDEX ON user_activity(last_login);

-- Create materialized view for alternative access pattern
CREATE MATERIALIZED VIEW products_by_category AS
SELECT product_id, name, price, category
FROM products
WHERE category IS NOT NULL AND product_id IS NOT NULL
PRIMARY KEY (category, product_id);

-- Queries using primary key
SELECT * FROM products WHERE product_id = uuid();

-- Queries using indexes
SELECT * FROM products WHERE category = 'Electronics';
SELECT * FROM user_activity WHERE last_login > '2023-01-01';

-- Queries using materialized view
SELECT * FROM products_by_category WHERE category = 'Electronics';

-- Allow filtering (use cautiously)
SELECT * FROM products 
WHERE category = 'Electronics' AND price < 1000 
ALLOW FILTERING;
```

#### Neo4j (Graph)

```cypher
// Neo4j querying and indexing

// Create indexes
CREATE INDEX product_id FOR (p:Product) ON (p.id);
CREATE INDEX product_name FOR (p:Product) ON (p.name);
CREATE INDEX category_name FOR (c:Category) ON (c.name);

// Basic node queries
MATCH (p:Product {name: 'Laptop'}) RETURN p;
MATCH (p:Product) WHERE p.price < 1000 RETURN p;

// Relationship queries
MATCH (p:Product)-[:BELONGS_TO]->(c:Category {name: 'Electronics'})
RETURN p.name, p.price;

// Path queries
MATCH path = (u:User {name: 'John'})-[:PURCHASED]->(p:Product)-[:BELONGS_TO]->(c:Category)
RETURN path;

// Pattern matching
MATCH (u:User)-[:PURCHASED]->(p:Product)<-[:PURCHASED]-(other:User)
WHERE u.id = 'u1001' AND u <> other
RETURN other.name, COUNT(p) AS common_purchases
ORDER BY common_purchases DESC;

// Recommendations
MATCH (u:User {id: 'u1001'})-[:PURCHASED]->(p:Product)<-[:PURCHASED]-(other:User),
      (other)-[:PURCHASED]->(rec:Product)
WHERE NOT (u)-[:PURCHASED]->(rec)
RETURN rec.name, COUNT(other) AS recommendation_strength
ORDER BY recommendation_strength DESC
LIMIT 5;
```

### 4.3 Transactions and Consistency

Managing data integrity across NoSQL databases:

#### Redis (Key-Value)

```python
# Redis transactions
import redis

r = redis.Redis(host='localhost', port=6379, db=0)

# Basic transaction (MULTI/EXEC)
pipe = r.pipeline()
pipe.set('inventory:item1', 100)
pipe.decr('inventory:item1')
pipe.get('inventory:item1')
results = pipe.execute()

# Optimistic locking with WATCH
def transfer_points(from_user, to_user, amount):
    with r.pipeline() as pipe:
        while True:
            try:
                # Watch the keys for changes
                pipe.watch(f'user:{from_user}:points', f'user:{to_user}:points')
                
                # Get current values
                from_points = int(pipe.get(f'user:{from_user}:points') or 0)
                to_points = int(pipe.get(f'user:{to_user}:points') or 0)
                
                # Check if enough points
                if from_points < amount:
                    return False
                
                # Start transaction
                pipe.multi()
                pipe.decrby(f'user:{from_user}:points', amount)
                pipe.incrby(f'user:{to_user}:points', amount)
                
                # Execute transaction
                pipe.execute()
                return True
            except redis.WatchError:
                # Another client modified the key, retry
                continue
```

#### MongoDB (Document)

```javascript
// MongoDB transactions
const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb://localhost:27017");

async function transferMoney() {
  const session = client.startSession();
  
  try {
    await session.withTransaction(async () => {
      const accounts = client.db("bank").collection("accounts");
      
      // Debit from account A
      const resultA = await accounts.updateOne(
        { _id: "accountA", balance: { $gte: 100 } },
        { $inc: { balance: -100 } },
        { session }
      );
      
      if (resultA.modifiedCount !== 1) {
        throw new Error("Insufficient funds in account A");
      }
      
      // Credit to account B
      await accounts.updateOne(
        { _id: "accountB" },
        { $inc: { balance: 100 } },
        { session }
      );
    }, {
      readConcern: { level: "snapshot" },
      writeConcern: { w: "majority" },
      readPreference: "primary"
    });
    
    console.log("Transaction successful");
  } catch (error) {
    console.error("Transaction failed:", error);
  } finally {
    await session.endSession();
  }
}
```

#### Cassandra (Column-Family)

```java
// Cassandra lightweight transactions
// Using Java driver

import com.datastax.driver.core.*;

public class CassandraLWT {
    public static void main(String[] args) {
        Cluster cluster = Cluster.builder()
            .addContactPoint("localhost")
            .build();
        Session session = cluster.connect("store");
        
        // Conditional update (compare-and-set)
        String query = "UPDATE products " +
                       "SET price = 899.99 " +
                       "WHERE product_id = 550e8400-e29b-41d4-a716-446655440000 " +
                       "IF price = 999.99";
        
        ResultSet rs = session.execute(query);
        Row row = rs.one();
        boolean applied = row.getBool("[applied]");
        
        if (applied) {
            System.out.println("Price updated successfully");
        } else {
            System.out.println("Price update failed: current price is " + 
                              row.getDecimal("price"));
        }
        
        // Batch statement (not atomic)
        BatchStatement batch = new BatchStatement();
        batch.add(PreparedStatement...);  // Add prepared statements
        session.execute(batch);
        
        cluster.close();
    }
}
```

#### Neo4j (Graph)

```java
// Neo4j transactions
// Using Java driver

import org.neo4j.driver.*;

public class Neo4jTransactions {
    public static void main(String[] args) {
        Driver driver = GraphDatabase.driver("bolt://localhost:7687", 
                                           AuthTokens.basic("neo4j", "password"));
        
        try (Session session = driver.session()) {
            // Explicit transaction
            Transaction tx = session.beginTransaction();
            try {
                tx.run("CREATE (p:Product {id: 'p1001', name: 'Laptop', price: 999.99})");
                tx.run("CREATE (c:Category {name: 'Electronics'})");
                tx.run("MATCH (p:Product {id: 'p1001'}), (c:Category {name: 'Electronics'}) " +
                      "CREATE (p)-[:BELONGS_TO]->(c)");
                
                tx.commit();
                System.out.println("Transaction committed successfully");
            } catch (Exception e) {
                tx.rollback();
                System.err.println("Transaction rolled back: " + e.getMessage());
            }
            
            // Transaction function
            session.writeTransaction(tx -> {
                tx.run("CREATE (p:Product {id: 'p1002', name: 'Smartphone', price: 699.99})");
                return null;
            });
        }
        
        driver.close();
    }
}
```

> **Hands-on Exercise:** Implement a simple inventory management system using a NoSQL database of your choice. The system should handle product creation, inventory updates, and order processing with appropriate consistency guarantees. Include transactions where supported, and implement optimistic concurrency control where transactions are not available.

## 5. Integrating NoSQL with Big Data Frameworks

### 5.1 NoSQL and Spark Integration

Connecting Apache Spark with NoSQL databases:

#### MongoDB and Spark

```python
# MongoDB and Spark integration
from pyspark.sql import SparkSession

# Initialize Spark with MongoDB connector
spark = SparkSession.builder \
    .appName("MongoDB Spark Integration") \
    .config("spark.mongodb.input.uri", "mongodb://localhost:27017/store.products") \
    .config("spark.mongodb.output.uri", "mongodb://localhost:27017/store.product_analytics") \
    .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
    .getOrCreate()

# Read from MongoDB
products_df = spark.read.format("mongo").load()

# Process data with Spark
result_df = products_df.filter(products_df.price < 1000) \
    .groupBy("category") \
    .agg({"price": "avg", "price": "max"}) \
    .withColumnRenamed("avg(price)", "avg_price") \
    .withColumnRenamed("max(price)", "max_price")

# Write results back to MongoDB
result_df.write.format("mongo") \
    .mode("overwrite") \
    .option("collection", "category_stats") \
    .save()

# Stop Spark session
spark.stop()
```

#### Cassandra and Spark

```python
# Cassandra and Spark integration
from pyspark.sql import SparkSession

# Initialize Spark with Cassandra connector
spark = SparkSession.builder \
    .appName("Cassandra Spark Integration") \
    .config("spark.cassandra.connection.host", "localhost") \
    .config("spark.cassandra.connection.port", "9042") \
    .config("spark.jars.packages", "com.datastax.spark:spark-cassandra-connector_2.12:3.1.0") \
    .getOrCreate()

# Read from Cassandra
user_activity_df = spark.read \
    .format("org.apache.spark.sql.cassandra") \
    .options(table="user_activity", keyspace="analytics") \
    .load()

# Process data with Spark
daily_stats_df = user_activity_df \
    .withColumn("activity_date", to_date(col("timestamp"))) \
    .groupBy("activity_date", "activity_type") \
    .count() \
    .orderBy("activity_date", "activity_type")

# Write results back to Cassandra
daily_stats_df.write \
    .format("org.apache.spark.sql.cassandra") \
    .options(table="daily_activity_stats", keyspace="analytics") \
    .mode("append") \
    .save()

# Stop Spark session
spark.stop()
```

#### Redis and Spark

```python
# Redis and Spark integration
from pyspark.sql import SparkSession
import redis
from pyspark.sql.functions import col, udf
from pyspark.sql.types import StringType, IntegerType

# Initialize Spark
spark = SparkSession.builder \
    .appName("Redis Spark Integration") \
    .getOrCreate()

# Function to get data from Redis
def get_product_details(product_id):
    r = redis.Redis(host='localhost', port=6379, db=0)
    details = r.hgetall(f"product:{product_id}")
    if details:
        return {k.decode('utf-8'): v.decode('utf-8') for k, v in details.items()}
    return None

# Register UDF
get_product_name_udf = udf(lambda id: get_product_details(id).get('name') if get_product_details(id) else None, StringType())
get_product_price_udf = udf(lambda id: float(get_product_details(id).get('price')) if get_product_details(id) else 0.0, FloatType())

# Read order data from a source
orders_df = spark.read.parquet("hdfs:///data/orders.parquet")

# Enrich with Redis data
enriched_orders = orders_df \
    .withColumn("product_name", get_product_name_udf(col("product_id"))) \
    .withColumn("product_price", get_product_price_udf(col("product_id")))

# Process and analyze
enriched_orders.createOrReplaceTempView("orders")
result_df = spark.sql("""
    SELECT 
        product_name,
        COUNT(*) as order_count,
        SUM(quantity) as total_quantity,
        SUM(quantity * product_price) as total_revenue
    FROM orders
    GROUP BY product_name
    ORDER BY total_revenue DESC
""")

# Show results
result_df.show()

# Stop Spark session
spark.stop()
```

### 5.2 NoSQL and Hadoop Integration

Connecting Hadoop ecosystem with NoSQL databases:

#### HBase Integration

```java
// HBase and MapReduce integration
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.io.ImmutableBytesWritable;
import org.apache.hadoop.hbase.mapreduce.*;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.*;

public class HBaseMapReduceExample {
    public static class MyMapper extends TableMapper<Text, Text> {
        @Override
        protected void map(ImmutableBytesWritable row, Result value, Context context) 
                throws IOException, InterruptedException {
            // Extract data from HBase
            String rowKey = Bytes.toString(row.get());
            byte[] productNameBytes = value.getValue(
                Bytes.toBytes("details"), Bytes.toBytes("name"));
            byte[] priceBytes = value.getValue(
                Bytes.toBytes("details"), Bytes.toBytes("price"));
            
            if (productNameBytes != null && priceBytes != null) {
                String productName = Bytes.toString(productNameBytes);
                double price = Bytes.toDouble(priceBytes);
                
                // Emit category as key and price as value
                byte[] categoryBytes = value.getValue(
                    Bytes.toBytes("details"), Bytes.toBytes("category"));
                if (categoryBytes != null) {
                    String category = Bytes.toString(categoryBytes);
                    context.write(new Text(category), new Text(String.valueOf(price)));
                }
            }
        }
    }
    
    public static void main(String[] args) throws Exception {
        Configuration conf = HBaseConfiguration.create();
        Job job = Job.getInstance(conf, "HBase MapReduce Example");
        job.setJarByClass(HBaseMapReduceExample.class);
        
        // Configure MapReduce job to read from HBase
        Scan scan = new Scan();
        scan.setCaching(500);
        scan.setCacheBlocks(false);
        
        // Set input
        TableMapReduceUtil.initTableMapperJob(
            "products",        // Input table
            scan,              // Scan instance
            MyMapper.class,    // Mapper class
            Text.class,        // Mapper output key
            Text.class,        // Mapper output value
            job);
        
        // Set output (could be another HBase table or HDFS)
        job.setReducerClass(MyReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(Text.class);
        
        // Execute job
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
```

#### MongoDB and Hadoop

```java
// MongoDB and Hadoop integration
import com.mongodb.hadoop.MongoInputFormat;
import com.mongodb.hadoop.MongoOutputFormat;
import com.mongodb.hadoop.io.BSONWritable;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.*;
import org.bson.BSONObject;

public class MongoHadoopExample {
    public static class MyMapper extends Mapper<Object, BSONObject, Text, BSONWritable> {
        @Override
        protected void map(Object key, BSONObject value, Context context) 
                throws IOException, InterruptedException {
            // Extract data from MongoDB document
            String category = (String) value.get("category");
            Double price = (Double) value.get("price");
            
            if (category != null && price != null) {
                // Create output value
                BSONWritable output = new BSONWritable();
                BasicBSONObject outputDoc = new BasicBSONObject();
                outputDoc.put("price", price);
                output.setDoc(outputDoc);
                
                // Emit category as key and price as value
                context.write(new Text(category), output);
            }
        }
    }
    
    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        
        // Set MongoDB connection info
        conf.set("mongo.input.uri", "mongodb://localhost:27017/store.products");
        conf.set("mongo.output.uri", "mongodb://localhost:27017/analytics.category_stats");
        
        Job job = Job.getInstance(conf, "MongoDB Hadoop Example");
        job.setJarByClass(MongoHadoopExample.class);
        
        // Set input/output formats
        job.setInputFormatClass(MongoInputFormat.class);
        job.setOutputFormatClass(MongoOutputFormat.class);
        
        // Set mapper/reducer
        job.setMapperClass(MyMapper.class);
        job.setReducerClass(MyReducer.class);
        
        // Set output types
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(BSONWritable.class);
        
        // Execute job
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
```

### 5.3 ETL Patterns with NoSQL

Extract, Transform, Load patterns for NoSQL databases:

```python
# ETL from RDBMS to MongoDB
import pymysql
import pymongo
from datetime import datetime

# Connect to MySQL
mysql_conn = pymysql.connect(
    host='localhost',
    user='user',
    password='password',
    database='oltp_db'
)

# Connect to MongoDB
mongo_client = pymongo.MongoClient('mongodb://localhost:27017/')
mongo_db = mongo_client['analytics_db']
customers_collection = mongo_db['customers']

try:
    with mysql_conn.cursor(pymysql.cursors.DictCursor) as cursor:
        # Extract customer data
        cursor.execute("""
            SELECT c.customer_id, c.name, c.email, c.created_at,
                   a.address_id, a.street, a.city, a.state, a.zip,
                   o.order_id, o.order_date, o.total_amount
            FROM customers c
            LEFT JOIN addresses a ON c.customer_id = a.customer_id
            LEFT JOIN orders o ON c.customer_id = o.customer_id
            ORDER BY c.customer_id, a.address_id, o.order_id
        """)
        
        current_customer = None
        customer_doc = None
        
        # Transform and load
        for row in cursor:
            # New customer
            if current_customer != row['customer_id']:
                # Save previous customer document
                if customer_doc:
                    customers_collection.insert_one(customer_doc)
                
                # Create new customer document
                current_customer = row['customer_id']
                customer_doc = {
                    'customer_id': row['customer_id'],
                    'name': row['name'],
                    'email': row['email'],
                    'created_at': row['created_at'],
                    'addresses': [],
                    'orders': [],
                    'last_updated': datetime.now()
                }
            
            # Add address if not already added
            if row['address_id'] and not any(a['address_id'] == row['address_id'] for a in customer_doc['addresses']):
                customer_doc['addresses'].append({
                    'address_id': row['address_id'],
                    'street': row['street'],
                    'city': row['city'],
                    'state': row['state'],
                    'zip': row['zip']
                })
            
            # Add order if not already added
            if row['order_id'] and not any(o['order_id'] == row['order_id'] for o in customer_doc['orders']):
                customer_doc['orders'].append({
                    'order_id': row['order_id'],
                    'order_date': row['order_date'],
                    'total_amount': row['total_amount']
                })
        
        # Save last customer document
        if customer_doc:
            customers_collection.insert_one(customer_doc)
            
        print("ETL process completed successfully")
        
finally:
    mysql_conn.close()
```

```python
# Incremental ETL from MongoDB to Cassandra
from pymongo import MongoClient
from cassandra.cluster import Cluster
from datetime import datetime, timedelta

# Connect to MongoDB
mongo_client = MongoClient('mongodb://localhost:27017/')
mongo_db = mongo_client['store']
orders_collection = mongo_db['orders']

# Connect to Cassandra
cassandra_cluster = Cluster(['localhost'])
cassandra_session = cassandra_cluster.connect('analytics')

# Prepare Cassandra statement
insert_statement = cassandra_session.prepare("""
    INSERT INTO order_items (
        order_id, product_id, quantity, price, order_date, customer_id
    ) VALUES (?, ?, ?, ?, ?, ?)
""")

try:
    # Get last processed timestamp
    rows = cassandra_session.execute("SELECT max(last_etl_run) FROM etl_metadata WHERE process_name = 'orders_etl'")
    last_run = rows.one()[0] if rows.one() else datetime.min
    
    # Extract new/modified orders
    query = {"modified_at": {"$gt": last_run}}
    new_orders = orders_collection.find(query)
    
    # Process each order
    processed_count = 0
    for order in new_orders:
        order_id = str(order['_id'])
        order_date = order.get('order_date', datetime.now())
        customer_id = order.get('customer_id')
        
        # Process each item in the order
        for item in order.get('items', []):
            product_id = item.get('product_id')
            quantity = item.get('quantity', 1)
            price = item.get('price', 0.0)
            
            # Insert into Cassandra
            cassandra_session.execute(
                insert_statement, 
                (order_id, product_id, quantity, price, order_date, customer_id)
            )
            
            processed_count += 1
    
    # Update ETL metadata
    current_time = datetime.now()
    cassandra_session.execute(
        "INSERT INTO etl_metadata (process_name, last_etl_run, records_processed) VALUES (%s, %s, %s)",
        ('orders_etl', current_time, processed_count)
    )
    
    print(f"Incremental ETL completed: {processed_count} records processed")
    
finally:
    cassandra_cluster.shutdown()
```

> **Knowledge Check:** Compare and contrast the approaches for integrating NoSQL databases with Spark versus Hadoop. What are the advantages and limitations of each approach? When would you choose one over the other?

## 6. NoSQL Database Management

### 6.1 Deployment Strategies

Approaches for deploying NoSQL databases:

1. **On-Premises Deployment**:
   - Hardware provisioning and management
   - Network configuration
   - Backup and recovery planning
   - Scaling considerations

2. **Cloud Deployment**:
   - Managed services (e.g., Amazon DynamoDB, Azure Cosmos DB)
   - Self-managed on cloud VMs
   - Hybrid approaches
   - Cost optimization

3. **Containerized Deployment**:
   - Docker containers
   - Kubernetes orchestration
   - StatefulSets for persistent storage
   - Service discovery

```yaml
# Example: MongoDB deployment on Kubernetes
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: "mongodb"
  replicas: 3
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:5.0
        ports:
        - containerPort: 27017
          name: mongodb
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: username
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-secret
              key: password
        volumeMounts:
        - name: mongodb-data
          mountPath: /data/db
  volumeClaimTemplates:
  - metadata:
      name: mongodb-data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 10Gi
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb
spec:
  selector:
    app: mongodb
  ports:
  - port: 27017
    targetPort: 27017
  clusterIP: None  # Headless service for StatefulSet
```

### 6.2 Scaling and Performance Tuning

Strategies for optimizing NoSQL database performance:

1. **Horizontal Scaling**:
   - Adding more nodes to the cluster
   - Sharding strategies
   - Data distribution techniques
   - Rebalancing considerations

2. **Vertical Scaling**:
   - Increasing resources (CPU, memory, disk)
   - Instance type optimization
   - Storage optimization
   - Connection pooling

3. **Query Optimization**:
   - Index design and management
   - Query patterns analysis
   - Caching strategies
   - Data model refinement

```python
# Example: Redis performance tuning
import redis
import time

# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)

# Benchmark different approaches
def benchmark(name, func, iterations=10000):
    start_time = time.time()
    for i in range(iterations):
        func(i)
    end_time = time.time()
    print(f"{name}: {end_time - start_time:.4f} seconds")

# Approach 1: Individual SET commands
def individual_sets(i):
    r.set(f"user:{i}:name", f"User {i}")
    r.set(f"user:{i}:email", f"user{i}@example.com")
    r.set(f"user:{i}:age", i % 100)

# Approach 2: HSET for grouped data
def hash_set(i):
    r.hset(f"user:{i}", mapping={
        "name": f"User {i}",
        "email": f"user{i}@example.com",
        "age": i % 100
    })

# Approach 3: Pipeline for batched commands
def pipelined_sets(i):
    pipe = r.pipeline()
    pipe.set(f"user:{i}:name", f"User {i}")
    pipe.set(f"user:{i}:email", f"user{i}@example.com")
    pipe.set(f"user:{i}:age", i % 100)
    pipe.execute()

# Run benchmarks
benchmark("Individual SETs", individual_sets, 1000)
benchmark("HSET", hash_set, 1000)
benchmark("Pipelined SETs", pipelined_sets, 1000)
```

### 6.3 Monitoring and Maintenance

Tools and techniques for NoSQL database operations:

1. **Monitoring Metrics**:
   - Resource utilization (CPU, memory, disk, network)
   - Query performance
   - Latency and throughput
   - Error rates

2. **Backup and Recovery**:
   - Backup strategies
   - Point-in-time recovery
   - Disaster recovery planning
   - Data retention policies

3. **Maintenance Tasks**:
   - Compaction
   - Index rebuilding
   - Version upgrades
   - Security patching

```python
# Example: MongoDB monitoring script
from pymongo import MongoClient
import time
import json
from datetime import datetime

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
admin_db = client.admin

# Collect and store metrics
def collect_metrics():
    metrics = {
        'timestamp': datetime.now().isoformat(),
        'server_status': admin_db.command('serverStatus'),
        'replica_status': None,
        'db_stats': {}
    }
    
    # Get replica set status if applicable
    try:
        metrics['replica_status'] = admin_db.command('replSetGetStatus')
    except Exception as e:
        print(f"Not a replica set: {e}")
    
    # Get stats for each database
    for db_name in client.list_database_names():
        if db_name not in ['admin', 'local', 'config']:
            db = client[db_name]
            metrics['db_stats'][db_name] = {
                'db_stats': db.command('dbStats'),
                'collection_stats': {}
            }
            
            # Get stats for each collection
            for collection_name in db.list_collection_names():
                coll_stats = db.command('collStats', collection_name)
                metrics['db_stats'][db_name]['collection_stats'][collection_name] = coll_stats
    
    return metrics

# Monitor at regular intervals
def monitor(interval_seconds=60, max_samples=10):
    samples = []
    
    for i in range(max_samples):
        print(f"Collecting sample {i+1}/{max_samples}...")
        metrics = collect_metrics()
        samples.append(metrics)
        
        # Extract and display key metrics
        server_status = metrics['server_status']
        connections = server_status.get('connections', {}).get('current', 0)
        opcounters = server_status.get('opcounters', {})
        mem_usage = server_status.get('mem', {}).get('resident', 0)
        
        print(f"Connections: {connections}")
        print(f"Operations: {json.dumps(opcounters, indent=2)}")
        print(f"Memory usage: {mem_usage} MB")
        print("-" * 50)
        
        # Save to file
        with open(f"mongodb_metrics_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json", 'w') as f:
            json.dump(metrics, f, default=str)
        
        if i < max_samples - 1:
            time.sleep(interval_seconds)
    
    print("Monitoring complete")

# Run the monitoring
monitor(interval_seconds=30, max_samples=5)
```

> **Hands-on Exercise:** Set up a small NoSQL database cluster (e.g., MongoDB replica set, Redis Sentinel, or Cassandra cluster) using containers. Implement monitoring for key metrics, perform a backup and restore operation, and simulate a node failure to test failover capabilities. Document your setup, the monitoring approach, and the results of your failover test.

## Summary

In this chapter, we've explored NoSQL databases and their role in big data architectures:

- The key characteristics and types of NoSQL databases (key-value, document, column-family, and graph)
- How to select appropriate NoSQL solutions for different use cases
- Effective data modeling approaches for various NoSQL database types
- Implementation of CRUD operations and querying strategies
- Integration of NoSQL databases with big data processing frameworks like Spark and Hadoop
- Best practices for NoSQL database deployment, scaling, and management

NoSQL databases provide flexible, scalable solutions for handling the volume, variety, and velocity of big data. By understanding the strengths and limitations of different NoSQL database types, you can select the right tool for your specific data requirements and build robust, high-performance big data applications.

## Additional Resources

### Books
- "NoSQL Distilled" by Pramod J. Sadalage and Martin Fowler
- "MongoDB: The Definitive Guide" by Shannon Bradshaw, Eoin Brazil, and Kristina Chodorow
- "Cassandra: The Definitive Guide" by Jeff Carpenter and Eben Hewitt
- "Redis in Action" by Josiah L. Carlson
- "Graph Databases" by Ian Robinson, Jim Webber, and Emil Eifrem

### Online Resources
- [MongoDB University](https://university.mongodb.com/)
- [DataStax Academy (Cassandra)](https://www.datastax.com/dev)
- [Redis Documentation](https://redis.io/documentation)
- [Neo4j Developer Resources](https://neo4j.com/developer/)
- [AWS Database Blog](https://aws.amazon.com/blogs/database/)

### Practice Platforms
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- [Redis Cloud](https://redis.com/redis-enterprise-cloud/overview/) (free tier available)
- [ArangoDB Oasis](https://cloud.arangodb.com/) (free trial available)
- [Neo4j Sandbox](https://neo4j.com/sandbox/) (free for development)
- [DataStax Astra](https://www.datastax.com/products/datastax-astra) (free tier available)

## Next Steps

In the next chapter, we'll explore data warehousing and analytics in the context of big data, including modern cloud data warehouses, data modeling for analytics, and business intelligence tools for deriving insights from big data.

---

## Chapter Quiz

Test your understanding of NoSQL database concepts:

1. What are the four main types of NoSQL databases, and what are their key characteristics?
2. According to the CAP theorem, which two properties does a Cassandra database prioritize?
3. When would you choose a document database over a key-value store?
4. What are the main differences between data modeling for relational databases and NoSQL databases?
5. How does Spark integrate with NoSQL databases, and what are the advantages of this integration?

Good luck!
