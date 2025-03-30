# Introduction to Data Engineering

In this chapter, we'll explore the fundamentals of data engineering, a discipline focused on designing, building, and maintaining the infrastructure and architecture for data generation, storage, processing, and consumption. Data engineers play a crucial role in modern organizations by creating robust data pipelines that transform raw data into valuable insights for business decision-making.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the role and responsibilities of a data engineer
2. Identify the key components of a data engineering ecosystem
3. Distinguish between different data processing paradigms
4. Recognize various data storage solutions and their use cases
5. Understand data modeling concepts for engineering applications
6. Implement basic data pipelines using modern tools

## 1. The Data Engineering Landscape

### 1.1 What is Data Engineering?

Data engineering is the practice of designing and building systems for collecting, storing, and analyzing data at scale. It encompasses a range of activities:

1. **Data Collection**: Gathering data from various sources, including databases, APIs, streaming platforms, and files
2. **Data Storage**: Designing and implementing storage solutions for different types of data
3. **Data Processing**: Transforming raw data into formats suitable for analysis
4. **Data Quality**: Ensuring data accuracy, completeness, and consistency
5. **Data Architecture**: Designing the overall structure of data systems
6. **Data Pipeline Development**: Building automated workflows for data movement and transformation
7. **Infrastructure Management**: Maintaining the technical infrastructure that supports data operations

```
# Data Engineering Workflow (ASCII Diagram)

+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|  Data Sources  | --> |  Data Ingestion| --> |  Data Storage  |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
                                                      |
                                                      v
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|  Data Serving  | <-- | Data Processing| <-- |  Data Quality  |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
```

### 1.2 The Role of a Data Engineer

Data engineers bridge the gap between data generation and data consumption:

1. **Technical Skills**:
   - Programming (Python, Java, Scala)
   - SQL and database management
   - Big data technologies (Hadoop, Spark)
   - Cloud platforms (AWS, Azure, GCP)
   - ETL/ELT tools and frameworks
   - Data modeling and architecture

2. **Responsibilities**:
   - Designing and implementing data infrastructure
   - Building and maintaining data pipelines
   - Ensuring data quality and reliability
   - Optimizing data flow and query performance
   - Collaborating with data scientists and analysts
   - Implementing data governance and security measures

3. **Relationship with Other Roles**:
   - **Data Scientists**: Consume the data prepared by engineers to build models
   - **Data Analysts**: Use the data for reporting and business insights
   - **Software Engineers**: Build applications that generate or consume data
   - **Database Administrators**: Focus on database performance and maintenance
   - **DevOps Engineers**: Manage the infrastructure where data systems run

### 1.3 Data Engineering Ecosystem

The data engineering ecosystem consists of various tools and technologies:

1. **Data Storage**:
   - Relational databases (PostgreSQL, MySQL, Oracle)
   - NoSQL databases (MongoDB, Cassandra, DynamoDB)
   - Data warehouses (Snowflake, Redshift, BigQuery)
   - Data lakes (S3, Azure Data Lake, GCS)
   - Lake houses (Delta Lake, Iceberg, Hudi)

2. **Data Processing**:
   - Batch processing (Apache Hadoop, Apache Spark)
   - Stream processing (Apache Kafka, Apache Flink, Apache Beam)
   - ETL/ELT tools (Apache Airflow, dbt, Fivetran)
   - Query engines (Presto, Trino, Apache Drill)

3. **Data Orchestration**:
   - Workflow management (Apache Airflow, Prefect, Dagster)
   - Job scheduling (Oozie, Luigi)
   - Resource management (YARN, Kubernetes)

4. **Data Governance**:
   - Metadata management (Apache Atlas, Amundsen)
   - Data quality (Great Expectations, Deequ)
   - Data lineage (OpenLineage, Marquez)
   - Data catalogs (DataHub, Collibra)

5. **Infrastructure**:
   - Cloud providers (AWS, Azure, GCP)
   - Containerization (Docker, Kubernetes)
   - Infrastructure as Code (Terraform, CloudFormation)
   - Monitoring and logging (Prometheus, Grafana, ELK stack)

> **Knowledge Check:** What are the key differences between the roles of a data engineer and a data scientist? How do their responsibilities complement each other in a data-driven organization?

## 2. Data Processing Paradigms

### 2.1 Batch Processing

Batch processing involves collecting data over a period and processing it as a single unit:

1. **Characteristics**:
   - Processes large volumes of data at scheduled intervals
   - Typically runs during off-peak hours
   - Optimized for throughput rather than latency
   - Well-suited for historical analysis and reporting

2. **Common Use Cases**:
   - Daily financial reconciliations
   - Monthly billing processes
   - Periodic data warehouse updates
   - Regular report generation

3. **Technologies**:
   - Apache Hadoop MapReduce
   - Apache Spark
   - Apache Hive
   - Traditional ETL tools

```python
# Example: Simple batch processing with Python
import pandas as pd
from datetime import datetime

def process_daily_sales():
    # Step 1: Load yesterday's sales data
    print(f"Starting batch process at {datetime.now()}")
    sales_data = pd.read_csv('sales_20230315.csv')
    
    # Step 2: Clean and transform data
    sales_data['date'] = pd.to_datetime(sales_data['date'])
    sales_data['amount'] = sales_data['amount'].fillna(0)
    
    # Step 3: Aggregate data
    daily_summary = sales_data.groupby(['store_id', 'product_category']).agg({
        'amount': 'sum',
        'transaction_id': 'count'
    }).reset_index()
    daily_summary.rename(columns={'transaction_id': 'num_transactions'}, inplace=True)
    
    # Step 4: Save results
    daily_summary.to_csv('daily_summary_20230315.csv', index=False)
    print(f"Batch process completed at {datetime.now()}")
    print(f"Processed {len(sales_data)} transactions")
    print(f"Generated summary with {len(daily_summary)} rows")

# Run the batch process
process_daily_sales()
```

### 2.2 Stream Processing

Stream processing handles data continuously as it arrives:

1. **Characteristics**:
   - Processes data in real-time or near real-time
   - Handles unbounded data sets
   - Optimized for low latency
   - Enables immediate insights and actions

2. **Common Use Cases**:
   - Real-time fraud detection
   - Live dashboards and monitoring
   - IoT sensor data processing
   - Recommendation systems

3. **Technologies**:
   - Apache Kafka
   - Apache Flink
   - Apache Beam
   - Amazon Kinesis
   - Google Pub/Sub

```python
# Example: Simple stream processing with Python and Kafka
from kafka import KafkaConsumer, KafkaProducer
import json
from datetime import datetime

# Step 1: Set up Kafka consumer
consumer = KafkaConsumer(
    'transactions',
    bootstrap_servers=['localhost:9092'],
    auto_offset_reset='latest',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

# Step 2: Set up Kafka producer for processed data
producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda x: json.dumps(x).encode('utf-8')
)

# Step 3: Process the stream
def detect_large_transactions(transaction):
    """Flag transactions over $1000 as potentially suspicious"""
    if transaction['amount'] > 1000:
        transaction['flagged'] = True
        transaction['flag_reason'] = 'Large amount'
        transaction['processed_at'] = datetime.now().isoformat()
        
        # Send to alerts topic
        producer.send('alerts', transaction)
        print(f"Flagged transaction {transaction['transaction_id']} for ${transaction['amount']}")
    
    # Send all transactions to processed topic
    producer.send('processed_transactions', transaction)

# Step 4: Continuously process incoming transactions
print("Starting stream processor...")
for message in consumer:
    transaction = message.value
    detect_large_transactions(transaction)
```

### 2.3 Lambda Architecture

Lambda architecture combines batch and stream processing:

1. **Components**:
   - **Batch Layer**: Processes historical data for accuracy and completeness
   - **Speed Layer**: Processes real-time data for immediate insights
   - **Serving Layer**: Combines results from both layers for queries

2. **Advantages**:
   - Balances latency, throughput, and fault-tolerance
   - Provides both real-time and historical views
   - Allows for reprocessing of historical data

3. **Challenges**:
   - Complexity of maintaining two processing paths
   - Code duplication between batch and stream layers
   - Reconciliation of results from different layers

```
# Lambda Architecture (ASCII Diagram)

                  +----------------+
                  |                |
                  |  Data Sources  |
                  |                |
                  +----------------+
                         |
                         v
          +-----------------------------+
          |                             |
          |                             |
+---------v---------+         +---------v---------+
|                   |         |                   |
|   Batch Layer     |         |   Speed Layer     |
|                   |         |                   |
+---------+---------+         +---------+---------+
          |                             |
          |                             |
          |                             |
+---------v---------+         +---------v---------+
|                   |         |                   |
| Batch Views       |         | Realtime Views    |
|                   |         |                   |
+---------+---------+         +---------+---------+
          |                             |
          |                             |
          +-------------+---------------+
                        |
                        v
              +---------+---------+
              |                   |
              |   Serving Layer   |
              |                   |
              +---------+---------+
                        |
                        v
              +---------+---------+
              |                   |
              |   Applications    |
              |                   |
              +-------------------+
```

### 2.4 Kappa Architecture

Kappa architecture simplifies Lambda by using stream processing for all data:

1. **Approach**:
   - Treats all data as streams
   - Uses a single processing path for both real-time and historical data
   - Reprocesses data by replaying the stream when needed

2. **Advantages**:
   - Simpler architecture with less code duplication
   - Unified processing logic
   - Easier maintenance and deployment

3. **Challenges**:
   - Requires robust stream processing system
   - May not be optimal for all batch processing scenarios
   - Historical reprocessing can be time-consuming

```
# Kappa Architecture (ASCII Diagram)

                  +----------------+
                  |                |
                  |  Data Sources  |
                  |                |
                  +----------------+
                         |
                         v
                  +----------------+
                  |                |
                  |  Stream Layer  |
                  |  (All Data)    |
                  |                |
                  +-------+--------+
                         |
                         v
                  +----------------+
                  |                |
                  |  Serving Layer |
                  |                |
                  +-------+--------+
                         |
                         v
                  +----------------+
                  |                |
                  |  Applications  |
                  |                |
                  +----------------+
```

> **Hands-on Exercise:** Set up a simple data processing pipeline that demonstrates both batch and streaming approaches. For the batch component, create a script that processes a CSV file of transactions, calculating daily totals and averages. For the streaming component, set up a simple Kafka producer and consumer that processes transactions in real-time, flagging any that meet certain criteria (e.g., amount > $1000). Compare the two approaches in terms of implementation complexity, processing time, and use cases.

## 3. Data Storage Solutions

### 3.1 Relational Databases

Relational databases organize data into tables with predefined relationships:

1. **Key Characteristics**:
   - Structured data model with tables, rows, and columns
   - ACID (Atomicity, Consistency, Isolation, Durability) compliance
   - SQL query language
   - Schema enforcement
   - Referential integrity through foreign keys

2. **Common Use Cases**:
   - Transactional systems (OLTP)
   - Applications with complex relationships
   - Scenarios requiring strong consistency
   - Structured data with well-defined schema

3. **Popular Solutions**:
   - PostgreSQL
   - MySQL
   - Oracle Database
   - Microsoft SQL Server
   - Amazon RDS

```sql
-- Example: Creating and querying a relational database schema

-- Step 1: Create tables with relationships
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(customer_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount DECIMAL(10, 2)
);

CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(order_id),
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL
);

-- Step 2: Insert sample data
INSERT INTO customers (first_name, last_name, email)
VALUES 
    ('John', 'Doe', 'john.doe@example.com'),
    ('Jane', 'Smith', 'jane.smith@example.com');

INSERT INTO products (name, description, price, category)
VALUES 
    ('Laptop', 'High-performance laptop', 1299.99, 'Electronics'),
    ('Smartphone', '5G smartphone with camera', 799.99, 'Electronics'),
    ('Headphones', 'Wireless noise-canceling', 199.99, 'Accessories');

INSERT INTO orders (customer_id, status, total_amount)
VALUES 
    (1, 'completed', 1499.98),
    (2, 'processing', 799.99);

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES 
    (1, 1, 1, 1299.99),
    (1, 3, 1, 199.99),
    (2, 2, 1, 799.99);

-- Step 3: Query with joins to analyze data
SELECT 
    o.order_id,
    c.first_name || ' ' || c.last_name AS customer_name,
    o.order_date,
    o.status,
    COUNT(oi.order_item_id) AS item_count,
    SUM(oi.quantity * oi.unit_price) AS calculated_total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, customer_name, o.order_date, o.status
ORDER BY o.order_date DESC;
```

### 3.2 NoSQL Databases

NoSQL databases provide flexible data models beyond the traditional relational approach:

1. **Types of NoSQL Databases**:
   - **Document Stores**: MongoDB, Couchbase
   - **Key-Value Stores**: Redis, DynamoDB
   - **Column-Family Stores**: Cassandra, HBase
   - **Graph Databases**: Neo4j, Amazon Neptune

2. **Key Characteristics**:
   - Flexible schema or schema-less design
   - Horizontal scalability
   - Eventual consistency (in many cases)
   - Optimized for specific data models and access patterns
   - BASE (Basically Available, Soft state, Eventually consistent) properties

3. **Common Use Cases**:
   - High-volume data with simple access patterns
   - Semi-structured or unstructured data
   - Applications requiring high scalability
   - Real-time web applications
   - Graph relationships and networks

```javascript
// Example: Working with MongoDB (Document Store)

// Step 1: Create a collection (similar to a table)
db.createCollection("customers")
db.createCollection("products")
db.createCollection("orders")

// Step 2: Insert documents (flexible schema)
db.customers.insertMany([
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02101"
    },
    phone_numbers: [
      { type: "home", number: "555-1234" },
      { type: "mobile", number: "555-5678" }
    ],
    created_at: new Date()
  },
  {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    address: {
      street: "456 Oak Ave",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    created_at: new Date()
  }
])

db.products.insertMany([
  {
    name: "Laptop",
    description: "High-performance laptop",
    price: 1299.99,
    category: "Electronics",
    specs: {
      processor: "Intel i7",
      memory: "16GB",
      storage: "512GB SSD"
    },
    created_at: new Date()
  },
  {
    name: "Smartphone",
    description: "5G smartphone with camera",
    price: 799.99,
    category: "Electronics",
    specs: {
      screen: "6.5 inch",
      camera: "48MP",
      battery: "4500mAh"
    },
    created_at: new Date()
  }
])

// Step 3: Insert order with embedded items (denormalized)
db.orders.insertOne({
  customer_id: db.customers.findOne({ email: "john.doe@example.com" })._id,
  order_date: new Date(),
  status: "completed",
  items: [
    {
      product_id: db.products.findOne({ name: "Laptop" })._id,
      product_name: "Laptop",
      quantity: 1,
      unit_price: 1299.99
    },
    {
      product_id: db.products.findOne({ name: "Smartphone" })._id,
      product_name: "Smartphone",
      quantity: 1,
      unit_price: 799.99
    }
  ],
  shipping_address: {
    street: "123 Main St",
    city: "Boston",
    state: "MA",
    zip: "02101"
  },
  total_amount: 2099.98
})

// Step 4: Query data
// Find all orders for a specific customer with product details
db.orders.find({
  customer_id: db.customers.findOne({ email: "john.doe@example.com" })._id
})

// Aggregation to get order statistics
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: {
      _id: "$customer_id",
      total_orders: { $sum: 1 },
      total_items: { $sum: "$items.quantity" },
      total_spent: { $sum: { $multiply: ["$items.quantity", "$items.unit_price"] } }
    }
  },
  { $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $project: {
      _id: 0,
      customer: { $arrayElemAt: ["$customer_info.first_name", 0] },
      total_orders: 1,
      total_items: 1,
      total_spent: 1
    }
  }
])
```

### 3.3 Data Warehouses

Data warehouses are specialized databases optimized for analytics and reporting:

1. **Key Characteristics**:
   - Optimized for OLAP (Online Analytical Processing)
   - Columnar storage for efficient queries
   - Denormalized schemas (star, snowflake)
   - Historical data storage
   - Query optimization for complex analytics

2. **Common Use Cases**:
   - Business intelligence and reporting
   - Historical data analysis
   - Complex analytical queries
   - Centralized data repository for an organization

3. **Popular Solutions**:
   - Snowflake
   - Amazon Redshift
   - Google BigQuery
   - Microsoft Azure Synapse
   - Teradata

```sql
-- Example: Data warehouse schema and queries

-- Step 1: Create a star schema
-- Dimension tables
CREATE TABLE dim_date (
    date_key INT PRIMARY KEY,
    date DATE NOT NULL,
    day_of_week VARCHAR(10),
    month VARCHAR(10),
    quarter INT,
    year INT,
    is_holiday BOOLEAN
);

CREATE TABLE dim_customer (
    customer_key INT PRIMARY KEY,
    customer_id VARCHAR(20) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(2),
    customer_segment VARCHAR(20)
);

CREATE TABLE dim_product (
    product_key INT PRIMARY KEY,
    product_id VARCHAR(20) NOT NULL,
    product_name VARCHAR(100),
    category VARCHAR(50),
    subcategory VARCHAR(50),
    unit_price DECIMAL(10, 2),
    cost DECIMAL(10, 2)
);

-- Fact table
CREATE TABLE fact_sales (
    sales_key INT PRIMARY KEY,
    date_key INT REFERENCES dim_date(date_key),
    customer_key INT REFERENCES dim_customer(customer_key),
    product_key INT REFERENCES dim_product(product_key),
    order_id VARCHAR(20),
    quantity INT,
    unit_price DECIMAL(10, 2),
    discount DECIMAL(5, 2),
    sales_amount DECIMAL(10, 2)
);

-- Step 2: Analytical queries
-- Monthly sales by product category
SELECT 
    d.year,
    d.month,
    p.category,
    SUM(f.sales_amount) AS total_sales,
    COUNT(DISTINCT f.order_id) AS order_count
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
WHERE d.year = 2023
GROUP BY d.year, d.month, p.category
ORDER BY d.month, total_sales DESC;

-- Customer segmentation by sales
SELECT 
    c.customer_segment,
    COUNT(DISTINCT c.customer_key) AS customer_count,
    SUM(f.sales_amount) AS total_sales,
    AVG(f.sales_amount) AS avg_sale_per_customer,
    MAX(f.sales_amount) AS max_sale
FROM fact_sales f
JOIN dim_customer c ON f.customer_key = c.customer_key
JOIN dim_date d ON f.date_key = d.date_key
WHERE d.year = 2023
GROUP BY c.customer_segment
ORDER BY total_sales DESC;

-- Product performance analysis
SELECT 
    p.product_name,
    p.category,
    SUM(f.quantity) AS total_units_sold,
    SUM(f.sales_amount) AS total_revenue,
    SUM(f.sales_amount - (f.quantity * p.cost)) AS total_profit,
    (SUM(f.sales_amount - (f.quantity * p.cost)) / SUM(f.sales_amount)) * 100 AS profit_margin
FROM fact_sales f
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_date d ON f.date_key = d.date_key
WHERE d.year = 2023
GROUP BY p.product_name, p.category
ORDER BY total_profit DESC
LIMIT 10;
```

### 3.4 Data Lakes

Data lakes store vast amounts of raw data in its native format:

1. **Key Characteristics**:
   - Store structured, semi-structured, and unstructured data
   - Schema-on-read approach
   - Highly scalable and cost-effective storage
   - Support for diverse data processing tools
   - Separation of storage and compute

2. **Common Use Cases**:
   - Raw data preservation
   - Data science and exploration
   - Machine learning training data
   - Historical archives
   - IoT data storage

3. **Popular Solutions**:
   - Amazon S3
   - Azure Data Lake Storage
   - Google Cloud Storage
   - Hadoop Distributed File System (HDFS)
   - MinIO

```python
# Example: Working with a data lake using Python and AWS S3

import boto3
import pandas as pd
from io import StringIO, BytesIO
import json

# Step 1: Set up S3 client
s3_client = boto3.client('s3',
                        aws_access_key_id='YOUR_ACCESS_KEY',
                        aws_secret_access_key='YOUR_SECRET_KEY')
bucket_name = 'your-data-lake-bucket'

# Step 2: Define data lake zones
raw_zone = 'raw/'
processed_zone = 'processed/'
curated_zone = 'curated/'

# Step 3: Upload raw data to the data lake
# CSV data
sales_data = pd.DataFrame({
    'date': ['2023-03-15', '2023-03-15', '2023-03-16'],
    'product_id': ['P001', 'P002', 'P001'],
    'quantity': [5, 2, 3],
    'price': [10.99, 24.99, 10.99]
})

csv_buffer = StringIO()
sales_data.to_csv(csv_buffer, index=False)
s3_client.put_object(
    Bucket=bucket_name,
    Key=f"{raw_zone}sales/dt=2023-03-16/sales.csv",
    Body=csv_buffer.getvalue()
)

# JSON data
customer_data = [
    {'customer_id': 'C001', 'name': 'John Doe', 'email': 'john@example.com'},
    {'customer_id': 'C002', 'name': 'Jane Smith', 'email': 'jane@example.com'}
]

s3_client.put_object(
    Bucket=bucket_name,
    Key=f"{raw_zone}customers/dt=2023-03-16/customers.json",
    Body=json.dumps(customer_data)
)

# Step 4: Process data and store in processed zone
# Read CSV data
response = s3_client.get_object(
    Bucket=bucket_name,
    Key=f"{raw_zone}sales/dt=2023-03-16/sales.csv"
)
sales_df = pd.read_csv(StringIO(response['Body'].read().decode('utf-8')))

# Transform data
sales_df['total'] = sales_df['quantity'] * sales_df['price']
sales_df['date'] = pd.to_datetime(sales_df['date'])

# Write to processed zone in Parquet format
parquet_buffer = BytesIO()
sales_df.to_parquet(parquet_buffer)
s3_client.put_object(
    Bucket=bucket_name,
    Key=f"{processed_zone}sales/dt=2023-03-16/sales.parquet",
    Body=parquet_buffer.getvalue()
)

# Step 5: Create curated data for analytics
# Aggregate sales by product
product_sales = sales_df.groupby('product_id').agg({
    'quantity': 'sum',
    'total': 'sum'
}).reset_index()

# Write to curated zone
csv_buffer = StringIO()
product_sales.to_csv(csv_buffer, index=False)
s3_client.put_object(
    Bucket=bucket_name,
    Key=f"{curated_zone}product_sales/dt=2023-03-16/product_sales.csv",
    Body=csv_buffer.getvalue()
)

# Step 6: List files in the data lake
def list_objects_in_path(bucket, prefix):
    response = s3_client.list_objects_v2(
        Bucket=bucket,
        Prefix=prefix
    )
    return [obj['Key'] for obj in response.get('Contents', [])]

print("Raw zone files:")
print(list_objects_in_path(bucket_name, raw_zone))

print("Processed zone files:")
print(list_objects_in_path(bucket_name, processed_zone))

print("Curated zone files:")
print(list_objects_in_path(bucket_name, curated_zone))
```

### 3.5 Data Lakehouses

Data lakehouses combine the best features of data lakes and data warehouses:

1. **Key Characteristics**:
   - ACID transactions on data lake storage
   - Schema enforcement and governance
   - Data warehouse performance
   - Support for diverse data types
   - Unified architecture for all data workloads

2. **Common Use Cases**:
   - Organizations seeking to consolidate data platforms
   - Combined analytics and machine learning workloads
   - Real-time and batch analytics
   - Data science and business intelligence

3. **Popular Solutions**:
   - Databricks Delta Lake
   - Amazon Redshift Spectrum
   - Google BigLake
   - Apache Iceberg
   - Apache Hudi

```python
# Example: Working with Delta Lake (a data lakehouse technology)

from pyspark.sql import SparkSession
from delta.tables import DeltaTable
import pyspark.sql.functions as F

# Step 1: Initialize Spark with Delta Lake support
spark = SparkSession.builder \
    .appName("Delta Lake Example") \
    .config("spark.jars.packages", "io.delta:delta-core_2.12:1.2.1") \
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension") \
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog") \
    .getOrCreate()

# Step 2: Create a Delta table
# Sample data
data = [
    (1, "2023-03-15", "P001", 5, 10.99),
    (2, "2023-03-15", "P002", 2, 24.99),
    (3, "2023-03-16", "P001", 3, 10.99)
]

# Create DataFrame
columns = ["order_id", "date", "product_id", "quantity", "price"]
df = spark.createDataFrame(data, columns)

# Write as Delta table
delta_table_path = "/path/to/delta/sales_table"
df.write.format("delta").save(delta_table_path)

# Step 3: Read from Delta table
sales_df = spark.read.format("delta").load(delta_table_path)
sales_df.show()

# Step 4: Update data with ACID transactions
delta_table = DeltaTable.forPath(spark, delta_table_path)

# Update prices with 10% increase for product P001
delta_table.update(
    condition=F.col("product_id") == "P001",
    set={"price": F.col("price") * 1.1}
)

# Step 5: Add new data (upsert/merge operation)
new_data = [
    (4, "2023-03-17", "P003", 1, 15.99),
    (5, "2023-03-17", "P001", 2, 12.09),  # Note: Price already updated
    (3, "2023-03-16", "P001", 4, 12.09)   # Update existing record
]

new_df = spark.createDataFrame(new_data, columns)

# Perform merge operation (upsert)
delta_table.alias("target").merge(
    new_df.alias("source"),
    "target.order_id = source.order_id"
) \
.whenMatchedUpdate(set={
    "quantity": "source.quantity",
    "price": "source.price"
}) \
.whenNotMatchedInsert(values={
    "order_id": "source.order_id",
    "date": "source.date",
    "product_id": "source.product_id",
    "quantity": "source.quantity",
    "price": "source.price"
}) \
.execute()

# Step 6: Time travel (query data at a specific version)
# Get current version
version_df = spark.sql(f"DESCRIBE HISTORY delta.`{delta_table_path}`")
current_version = version_df.select("version").first()[0]

# Query previous version
previous_version = current_version - 1
previous_df = spark.read.format("delta").option("versionAsOf", previous_version).load(delta_table_path)
previous_df.show()

# Step 7: Optimize the table
spark.sql(f"OPTIMIZE delta.`{delta_table_path}`")

# Step 8: Vacuum old files (remove files not needed for time travel beyond 7 days)
spark.sql(f"VACUUM delta.`{delta_table_path}` RETAIN 168 HOURS")
```

> **Knowledge Check:** Compare and contrast data warehouses, data lakes, and data lakehouses. What are the key advantages and limitations of each approach? When would you recommend one over the others for a specific use case?

## 4. Data Modeling for Engineering

### 4.1 Relational Data Modeling

Relational data modeling organizes data into normalized tables with relationships:

1. **Normalization Levels**:
   - First Normal Form (1NF): Eliminate duplicates, create separate tables
   - Second Normal Form (2NF): Remove partial dependencies
   - Third Normal Form (3NF): Remove transitive dependencies
   - Boyce-Codd Normal Form (BCNF): More rigorous 3NF
   - Fourth and Fifth Normal Forms: Address multi-valued dependencies

2. **Entity-Relationship Modeling**:
   - Entities (tables)
   - Attributes (columns)
   - Relationships (one-to-one, one-to-many, many-to-many)
   - Primary and foreign keys

3. **Schema Types**:
   - **Conceptual Schema**: High-level view of entities and relationships
   - **Logical Schema**: Detailed view with attributes and keys
   - **Physical Schema**: Implementation details including data types and indexes

```sql
-- Example: Normalized database schema

-- First normal form (1NF)
-- Eliminate repeating groups, create separate tables for each set of related data
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100)
);

-- Second normal form (2NF)
-- Remove partial dependencies
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date DATE,
    shipping_address VARCHAR(200)
);

-- Third normal form (3NF)
-- Remove transitive dependencies
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10, 2),
    category_id INT REFERENCES product_categories(category_id)
);

CREATE TABLE product_categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(50),
    department VARCHAR(50)
);

-- Junction table for many-to-many relationship
CREATE TABLE order_items (
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT,
    unit_price DECIMAL(10, 2),
    PRIMARY KEY (order_id, product_id)
);
```

### 4.2 Dimensional Data Modeling

Dimensional modeling is optimized for data warehousing and analytics:

1. **Star Schema**:
   - Fact tables (contain measures and foreign keys)
   - Dimension tables (contain descriptive attributes)
   - Denormalized for query performance
   - Simple join paths

2. **Snowflake Schema**:
   - Extension of star schema
   - Normalized dimension tables
   - Multiple levels of relationships
   - Reduced redundancy but more complex joins

3. **Fact Table Types**:
   - **Transaction Facts**: Individual events (e.g., sales transactions)
   - **Periodic Snapshots**: Regular point-in-time captures (e.g., monthly inventory)
   - **Accumulating Snapshots**: Track progress through a process (e.g., order fulfillment)

```sql
-- Example: Star schema for sales analytics

-- Dimension tables
CREATE TABLE dim_date (
    date_key INT PRIMARY KEY,
    date DATE,
    day_of_week VARCHAR(10),
    day_of_month INT,
    month INT,
    month_name VARCHAR(10),
    quarter INT,
    year INT,
    is_weekend BOOLEAN,
    is_holiday BOOLEAN
);

CREATE TABLE dim_product (
    product_key INT PRIMARY KEY,
    product_id VARCHAR(20),
    product_name VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    subcategory VARCHAR(50),
    brand VARCHAR(50),
    unit_cost DECIMAL(10, 2),
    unit_price DECIMAL(10, 2)
);

CREATE TABLE dim_store (
    store_key INT PRIMARY KEY,
    store_id VARCHAR(20),
    store_name VARCHAR(100),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(2),
    zip VARCHAR(10),
    region VARCHAR(20),
    store_type VARCHAR(30),
    open_date DATE
);

CREATE TABLE dim_customer (
    customer_key INT PRIMARY KEY,
    customer_id VARCHAR(20),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(2),
    zip VARCHAR(10),
    customer_since DATE,
    loyalty_segment VARCHAR(20)
);

-- Fact table
CREATE TABLE fact_sales (
    sales_key INT PRIMARY KEY,
    date_key INT REFERENCES dim_date(date_key),
    product_key INT REFERENCES dim_product(product_key),
    store_key INT REFERENCES dim_store(store_key),
    customer_key INT REFERENCES dim_customer(customer_key),
    transaction_id VARCHAR(20),
    quantity INT,
    unit_price DECIMAL(10, 2),
    unit_cost DECIMAL(10, 2),
    discount_amount DECIMAL(10, 2),
    sales_amount DECIMAL(10, 2),
    profit_amount DECIMAL(10, 2)
);

-- Example query using star schema
SELECT 
    d.year,
    d.quarter,
    p.category,
    s.region,
    SUM(f.sales_amount) AS total_sales,
    SUM(f.profit_amount) AS total_profit
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_store s ON f.store_key = s.store_key
WHERE d.year = 2023
GROUP BY d.year, d.quarter, p.category, s.region
ORDER BY d.quarter, total_sales DESC;
```

### 4.3 Data Vault Modeling

Data Vault is a modeling approach designed for enterprise data warehousing:

1. **Core Components**:
   - **Hubs**: Business keys and identifiers
   - **Links**: Relationships between hubs
   - **Satellites**: Descriptive attributes and context

2. **Key Characteristics**:
   - Highly normalized and auditable
   - Resilient to change
   - Designed for historization
   - Supports parallel loading
   - Separates structure from content

3. **Advantages**:
   - Scalability for enterprise data
   - Adaptability to changing business requirements
   - Auditability and traceability
   - Integration of disparate data sources

```sql
-- Example: Data Vault model for customer and order data

-- Hub tables (business keys)
CREATE TABLE hub_customer (
    customer_hk CHAR(32) PRIMARY KEY,  -- Hash key
    customer_bk VARCHAR(50) NOT NULL,  -- Business key
    record_source VARCHAR(100),
    load_date TIMESTAMP,
    UNIQUE(customer_bk)
);

CREATE TABLE hub_product (
    product_hk CHAR(32) PRIMARY KEY,
    product_bk VARCHAR(50) NOT NULL,
    record_source VARCHAR(100),
    load_date TIMESTAMP,
    UNIQUE(product_bk)
);

CREATE TABLE hub_order (
    order_hk CHAR(32) PRIMARY KEY,
    order_bk VARCHAR(50) NOT NULL,
    record_source VARCHAR(100),
    load_date TIMESTAMP,
    UNIQUE(order_bk)
);

-- Link tables (relationships)
CREATE TABLE link_order_customer (
    link_order_customer_hk CHAR(32) PRIMARY KEY,
    order_hk CHAR(32) REFERENCES hub_order(order_hk),
    customer_hk CHAR(32) REFERENCES hub_customer(customer_hk),
    record_source VARCHAR(100),
    load_date TIMESTAMP
);

CREATE TABLE link_order_product (
    link_order_product_hk CHAR(32) PRIMARY KEY,
    order_hk CHAR(32) REFERENCES hub_order(order_hk),
    product_hk CHAR(32) REFERENCES hub_product(product_hk),
    record_source VARCHAR(100),
    load_date TIMESTAMP
);

-- Satellite tables (descriptive attributes)
CREATE TABLE sat_customer (
    customer_hk CHAR(32) REFERENCES hub_customer(customer_hk),
    load_date TIMESTAMP,
    record_source VARCHAR(100),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(2),
    zip VARCHAR(10),
    hashdiff CHAR(32),  -- Hash of all attributes for change detection
    PRIMARY KEY (customer_hk, load_date)
);

CREATE TABLE sat_product (
    product_hk CHAR(32) REFERENCES hub_product(product_hk),
    load_date TIMESTAMP,
    record_source VARCHAR(100),
    product_name VARCHAR(100),
    description TEXT,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    cost DECIMAL(10, 2),
    hashdiff CHAR(32),
    PRIMARY KEY (product_hk, load_date)
);

CREATE TABLE sat_order (
    order_hk CHAR(32) REFERENCES hub_order(order_hk),
    load_date TIMESTAMP,
    record_source VARCHAR(100),
    order_date TIMESTAMP,
    status VARCHAR(20),
    shipping_address VARCHAR(200),
    shipping_city VARCHAR(50),
    shipping_state VARCHAR(2),
    shipping_zip VARCHAR(10),
    total_amount DECIMAL(10, 2),
    hashdiff CHAR(32),
    PRIMARY KEY (order_hk, load_date)
);

CREATE TABLE sat_order_product (
    link_order_product_hk CHAR(32) REFERENCES link_order_product(link_order_product_hk),
    load_date TIMESTAMP,
    record_source VARCHAR(100),
    quantity INT,
    unit_price DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    hashdiff CHAR(32),
    PRIMARY KEY (link_order_product_hk, load_date)
);
```

### 4.4 NoSQL Data Modeling

NoSQL data modeling focuses on access patterns and denormalization:

1. **Document Model**:
   - Nested structures
   - Embedded documents for related data
   - Denormalization for query efficiency
   - Schema flexibility

2. **Key-Value Model**:
   - Simple key-based access
   - Optimized for high-throughput operations
   - Limited query capabilities
   - Efficient for session data, caching, etc.

3. **Column-Family Model**:
   - Row keys and column families
   - Sparse data storage
   - Optimized for specific access patterns
   - Time-series and wide-row data

4. **Graph Model**:
   - Nodes and relationships
   - Property-based attributes
   - Optimized for connected data
   - Complex relationship traversal

```javascript
// Example: Document model in MongoDB

// Customer collection with embedded addresses
db.customers.insertOne({
  customer_id: "C1001",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  phone: "555-123-4567",
  addresses: [
    {
      type: "billing",
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      zip: "02101"
    },
    {
      type: "shipping",
      street: "456 Oak Ave",
      city: "Cambridge",
      state: "MA",
      zip: "02138"
    }
  ],
  payment_methods: [
    {
      type: "credit_card",
      last_four: "1234",
      expiry: "05/25"
    }
  ],
  created_at: new Date(),
  updated_at: new Date()
});

// Order collection with embedded items and references
db.orders.insertOne({
  order_id: "ORD10001",
  customer_id: "C1001",  // Reference to customer
  order_date: new Date(),
  status: "processing",
  shipping_address: {
    street: "456 Oak Ave",
    city: "Cambridge",
    state: "MA",
    zip: "02138"
  },
  items: [
    {
      product_id: "P1001",  // Reference to product
      product_name: "Laptop",  // Denormalized for query efficiency
      quantity: 1,
      unit_price: 1299.99
    },
    {
      product_id: "P2001",
      product_name: "Wireless Mouse",
      quantity: 1,
      unit_price: 49.99
    }
  ],
  payment: {
    method: "credit_card",
    last_four: "1234",
    amount: 1349.98,
    status: "approved",
    transaction_id: "T123456789"
  },
  shipping: {
    method: "express",
    tracking_number: null,
    estimated_delivery: new Date(new Date().setDate(new Date().getDate() + 2))
  },
  total_amount: 1349.98,
  created_at: new Date(),
  updated_at: new Date()
});

// Product collection
db.products.insertOne({
  product_id: "P1001",
  name: "Laptop",
  description: "High-performance laptop with 16GB RAM",
  category: "Electronics",
  subcategory: "Computers",
  price: 1299.99,
  cost: 950.00,
  inventory: {
    in_stock: 45,
    reserved: 5,
    reorder_level: 10
  },
  specifications: {
    processor: "Intel i7",
    memory: "16GB",
    storage: "512GB SSD",
    display: "15.6 inch",
    battery: "8 hours"
  },
  images: [
    "https://example.com/images/laptop_front.jpg",
    "https://example.com/images/laptop_side.jpg"
  ],
  created_at: new Date(),
  updated_at: new Date()
});

// Queries optimized for access patterns
// Find all orders for a specific customer
db.orders.find({ customer_id: "C1001" });

// Find orders containing a specific product
db.orders.find({ "items.product_id": "P1001" });

// Find customers in a specific location
db.customers.find({ "addresses.city": "Boston" });

// Aggregate order totals by customer
db.orders.aggregate([
  { $group: {
      _id: "$customer_id",
      total_orders: { $sum: 1 },
      total_spent: { $sum: "$total_amount" }
    }
  },
  { $sort: { total_spent: -1 } }
]);
```

> **Hands-on Exercise:** Design and implement a data model for an e-commerce application using both relational and NoSQL approaches. For the relational model, create a normalized schema with appropriate tables, relationships, and constraints. For the NoSQL model, design a document-based structure optimized for common access patterns. Compare the two approaches in terms of data integrity, query flexibility, and performance considerations.

## 5. Introduction to Data Pipelines

### 5.1 ETL vs. ELT

Extract, Transform, Load (ETL) and Extract, Load, Transform (ELT) are two approaches to data integration:

1. **ETL (Extract, Transform, Load)**:
   - Data is transformed before loading into the target system
   - Transformations occur in a separate processing layer
   - Traditionally used with data warehouses
   - Optimized for structured data and predefined schemas

2. **ELT (Extract, Load, Transform)**:
   - Data is loaded into the target system before transformation
   - Transformations occur within the target system
   - Common with data lakes and modern data warehouses
   - Leverages the processing power of the target system

3. **Comparison**:
   - **ETL**: Better for complex transformations, data privacy, limited target resources
   - **ELT**: Better for large volumes, exploratory analysis, when target has processing power

```
# ETL vs. ELT Workflow (ASCII Diagram)

ETL Process:
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|    Extract     | --> |   Transform    | --> |     Load       |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
Source Systems          Processing Layer       Target System

ELT Process:
+----------------+     +----------------+     +----------------+
|                |     |                |     |                |
|    Extract     | --> |      Load      | --> |   Transform    |
|                |     |                |     |                |
+----------------+     +----------------+     +----------------+
Source Systems          Target System          Target System
```

### 5.2 Building Data Pipelines

Data pipelines automate the flow of data between systems:

1. **Components of a Data Pipeline**:
   - Data sources and extractors
   - Transformers and processors
   - Loaders and writers
   - Orchestration and scheduling
   - Monitoring and error handling

2. **Types of Data Pipelines**:
   - **Batch Pipelines**: Process data in scheduled intervals
   - **Streaming Pipelines**: Process data in real-time
   - **Hybrid Pipelines**: Combine batch and streaming approaches

3. **Pipeline Design Considerations**:
   - Scalability and performance
   - Fault tolerance and recovery
   - Idempotence and reprocessing
   - Monitoring and observability
   - Data quality and validation

```python
# Example: Simple ETL pipeline with Python

import pandas as pd
import sqlite3
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('etl_pipeline')

def extract_data():
    """Extract data from source systems"""
    logger.info("Starting extraction phase")
    
    try:
        # Extract from CSV file
        sales_data = pd.read_csv('source_data/sales.csv')
        logger.info(f"Extracted {len(sales_data)} sales records")
        
        # Extract from database
        conn = sqlite3.connect('source_data/products.db')
        products_data = pd.read_sql("SELECT * FROM products", conn)
        conn.close()
        logger.info(f"Extracted {len(products_data)} product records")
        
        return {
            'sales': sales_data,
            'products': products_data
        }
    except Exception as e:
        logger.error(f"Extraction failed: {str(e)}")
        raise

def transform_data(data_dict):
    """Transform the extracted data"""
    logger.info("Starting transformation phase")
    
    try:
        sales_data = data_dict['sales']
        products_data = data_dict['products']
        
        # Clean sales data
        sales_data['date'] = pd.to_datetime(sales_data['date'])
        sales_data['amount'] = sales_data['amount'].fillna(0)
        
        # Join with product data
        merged_data = sales_data.merge(
            products_data[['product_id', 'product_name', 'category', 'unit_cost']],
            on='product_id',
            how='left'
        )
        
        # Calculate derived columns
        merged_data['profit'] = merged_data['amount'] - (merged_data['quantity'] * merged_data['unit_cost'])
        
        # Aggregate for reporting
        daily_sales = merged_data.groupby(['date', 'category']).agg({
            'amount': 'sum',
            'quantity': 'sum',
            'profit': 'sum'
        }).reset_index()
        
        logger.info(f"Transformed data into {len(daily_sales)} aggregated records")
        
        return {
            'detailed_sales': merged_data,
            'daily_sales': daily_sales
        }
    except Exception as e:
        logger.error(f"Transformation failed: {str(e)}")
        raise

def load_data(transformed_data):
    """Load transformed data into target systems"""
    logger.info("Starting loading phase")
    
    try:
        detailed_sales = transformed_data['detailed_sales']
        daily_sales = transformed_data['daily_sales']
        
        # Load to SQLite database
        conn = sqlite3.connect('target_data/sales_dwh.db')
        
        # Detailed sales to fact table
        detailed_sales.to_sql('fact_sales', conn, if_exists='append', index=False)
        logger.info(f"Loaded {len(detailed_sales)} records to fact_sales table")
        
        # Daily aggregates to summary table
        daily_sales.to_sql('summary_daily_sales', conn, if_exists='append', index=False)
        logger.info(f"Loaded {len(daily_sales)} records to summary_daily_sales table")
        
        conn.close()
        
        # Export CSV for reporting
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        daily_sales.to_csv(f'target_data/reports/daily_sales_{timestamp}.csv', index=False)
        logger.info(f"Exported daily sales report to CSV")
        
        return True
    except Exception as e:
        logger.error(f"Loading failed: {str(e)}")
        raise

def run_pipeline():
    """Execute the full ETL pipeline"""
    logger.info("Starting ETL pipeline")
    start_time = datetime.now()
    
    try:
        # Extract
        extracted_data = extract_data()
        
        # Transform
        transformed_data = transform_data(extracted_data)
        
        # Load
        load_data(transformed_data)
        
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        logger.info(f"ETL pipeline completed successfully in {duration} seconds")
        
    except Exception as e:
        logger.error(f"ETL pipeline failed: {str(e)}")
        raise

if __name__ == "__main__":
    run_pipeline()
```

### 5.3 Data Pipeline Orchestration

Orchestration tools manage the execution and monitoring of data pipelines:

1. **Apache Airflow**:
   - Python-based workflow management
   - DAG (Directed Acyclic Graph) structure
   - Extensive operator library
   - Rich UI and monitoring

2. **Other Orchestration Tools**:
   - Prefect
   - Dagster
   - Luigi
   - AWS Step Functions
   - Azure Data Factory

```python
# Example: Apache Airflow DAG for data pipeline

from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.bash_operator import BashOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.providers.amazon.aws.transfers.s3_to_redshift import S3ToRedshiftOperator

# Define default arguments
default_args = {
    'owner': 'data_engineering',
    'depends_on_past': False,
    'start_date': datetime(2023, 3, 15),
    'email': ['alerts@example.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

# Create DAG
dag = DAG(
    'sales_etl_pipeline',
    default_args=default_args,
    description='ETL pipeline for sales data',
    schedule_interval='0 2 * * *',  # Run at 2 AM daily
    catchup=False
)

# Define tasks
# Task 1: Check if source data exists
check_source_data = BashOperator(
    task_id='check_source_data',
    bash_command='aws s3 ls s3://source-bucket/sales/{{ ds }}/ || exit 1',
    dag=dag
)

# Task 2: Extract and transform data with Python
def extract_transform_function(**kwargs):
    import pandas as pd
    import boto3
    from io import StringIO
    
    # Get execution date
    execution_date = kwargs['ds']
    
    # Extract from S3
    s3_client = boto3.client('s3')
    response = s3_client.get_object(
        Bucket='source-bucket',
        Key=f'sales/{execution_date}/sales.csv'
    )
    sales_data = pd.read_csv(StringIO(response['Body'].read().decode('utf-8')))
    
    # Transform data
    sales_data['date'] = pd.to_datetime(sales_data['date'])
    sales_data['amount'] = sales_data['amount'].fillna(0)
    
    # Calculate aggregates
    daily_sales = sales_data.groupby(['store_id', 'product_category']).agg({
        'amount': 'sum',
        'quantity': 'sum'
    }).reset_index()
    
    # Save to S3
    csv_buffer = StringIO()
    daily_sales.to_csv(csv_buffer, index=False)
    s3_client.put_object(
        Bucket='target-bucket',
        Key=f'processed/{execution_date}/daily_sales.csv',
        Body=csv_buffer.getvalue()
    )
    
    return f"Processed {len(sales_data)} records into {len(daily_sales)} aggregates"

extract_transform_task = PythonOperator(
    task_id='extract_transform',
    python_callable=extract_transform_function,
    provide_context=True,
    dag=dag
)

# Task 3: Create tables if not exist
create_tables = PostgresOperator(
    task_id='create_tables',
    postgres_conn_id='redshift_conn',
    sql="""
    CREATE TABLE IF NOT EXISTS daily_sales (
        date DATE,
        store_id VARCHAR(10),
        product_category VARCHAR(50),
        amount DECIMAL(10,2),
        quantity INTEGER
    );
    """,
    dag=dag
)

# Task 4: Load data to Redshift
load_to_redshift = S3ToRedshiftOperator(
    task_id='load_to_redshift',
    schema='sales',
    table='daily_sales',
    s3_bucket='target-bucket',
    s3_key='processed/{{ ds }}/daily_sales.csv',
    copy_options=['CSV', 'IGNOREHEADER 1'],
    redshift_conn_id='redshift_conn',
    aws_conn_id='aws_default',
    dag=dag
)

# Task 5: Validate data
validate_data = PostgresOperator(
    task_id='validate_data',
    postgres_conn_id='redshift_conn',
    sql="""
    SELECT COUNT(*) AS record_count, 
           SUM(amount) AS total_amount,
           '{{ ds }}' AS execution_date
    FROM sales.daily_sales
    WHERE date = '{{ ds }}';
    """,
    dag=dag
)

# Task 6: Send notification
send_notification = BashOperator(
    task_id='send_notification',
    bash_command='echo "ETL pipeline completed for {{ ds }}" | mail -s "ETL Complete" data_team@example.com',
    dag=dag
)

# Define task dependencies
check_source_data >> extract_transform_task >> create_tables >> load_to_redshift >> validate_data >> send_notification
```

### 5.4 Data Quality and Testing

Ensuring data quality is critical for reliable data pipelines:

1. **Data Quality Dimensions**:
   - Completeness: All required data is present
   - Accuracy: Data correctly represents reality
   - Consistency: Data is consistent across systems
   - Timeliness: Data is available when needed
   - Validity: Data conforms to defined rules

2. **Testing Approaches**:
   - Schema validation
   - Data profiling
   - Statistical analysis
   - Business rule validation
   - Referential integrity checks

3. **Tools for Data Quality**:
   - Great Expectations
   - dbt (data build tool)
   - Apache Griffin
   - Deequ
   - Custom validation frameworks

```python
# Example: Data quality checks with Great Expectations

import great_expectations as ge
import pandas as pd
from datetime import datetime

# Load data
sales_data = pd.read_csv('processed_data/sales.csv')

# Convert to Great Expectations DataFrame
ge_df = ge.from_pandas(sales_data)

# Define and run expectations
results = ge_df.expect_compound_columns_to_be_unique(
    column_list=['date', 'store_id', 'product_id']
)
print(f"Unique composite key check: {results['success']}")

results = ge_df.expect_column_values_to_not_be_null('transaction_id')
print(f"Non-null transaction_id check: {results['success']}")

results = ge_df.expect_column_values_to_be_between(
    'amount', min_value=0, max_value=10000
)
print(f"Amount range check: {results['success']}")

results = ge_df.expect_column_values_to_be_of_type('date', 'str')
print(f"Date type check: {results['success']}")

results = ge_df.expect_column_values_to_match_regex(
    'store_id', r'^S\d{4}$'
)
print(f"Store ID format check: {results['success']}")

# Validate date format
results = ge_df.expect_column_values_to_match_strftime_format(
    'date', '%Y-%m-%d'
)
print(f"Date format check: {results['success']}")

# Statistical checks
results = ge_df.expect_column_mean_to_be_between(
    'amount', min_value=50, max_value=200
)
print(f"Amount mean check: {results['success']}")

results = ge_df.expect_column_quantile_values_to_be_between(
    'quantity',
    quantile_ranges={
        0.25: [1, 5],
        0.5: [2, 10],
        0.75: [5, 20]
    }
)
print(f"Quantity distribution check: {results['success']}")

# Relationship checks
results = ge_df.expect_column_pair_values_to_be_in_set(
    'product_category', 'department',
    {
        ('Electronics', 'Tech'),
        ('Clothing', 'Apparel'),
        ('Groceries', 'Food'),
        ('Books', 'Media')
    }
)
print(f"Category-department relationship check: {results['success']}")

# Save validation results
validation_time = datetime.now().strftime('%Y%m%d_%H%M%S')
ge_df.save_expectation_suite(f'expectations/sales_expectations_{validation_time}.json')
```

> **Knowledge Check:** Compare ETL and ELT approaches for data integration. What are the key differences, and when would you choose one over the other? How do data quality checks fit into each approach?

## Summary

In this chapter, we've explored the fundamentals of data engineering:

- The role and responsibilities of data engineers in modern organizations
- Different data processing paradigms including batch, streaming, Lambda, and Kappa architectures
- Various data storage solutions such as relational databases, NoSQL databases, data warehouses, data lakes, and data lakehouses
- Data modeling approaches for different use cases, including relational, dimensional, Data Vault, and NoSQL modeling
- Introduction to data pipelines, ETL vs. ELT, orchestration, and data quality

Data engineering provides the foundation for all data-driven activities in an organization. By designing robust data architectures and efficient data pipelines, data engineers enable analysts, data scientists, and business users to derive valuable insights from data.

## Additional Resources

### Books
- "Fundamentals of Data Engineering" by Joe Reis and Matt Housley
- "Designing Data-Intensive Applications" by Martin Kleppmann
- "The Data Warehouse Toolkit" by Ralph Kimball and Margy Ross
- "Data Engineering with Python" by Paul Crickard
- "Streaming Systems" by Tyler Akidau, Slava Chernyak, and Reuven Lax

### Online Resources
- [Apache Airflow Documentation](https://airflow.apache.org/docs/)
- [dbt Documentation](https://docs.getdbt.com/)
- [Great Expectations Documentation](https://docs.greatexpectations.io/)
- [The Data Engineering Podcast](https://www.dataengineeringpodcast.com/)
- [Databricks Academy](https://www.databricks.com/learn/training)

### Practice Platforms
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Google Cloud Free Tier](https://cloud.google.com/free)
- [Azure Free Account](https://azure.microsoft.com/en-us/free/)
- [Databricks Community Edition](https://community.cloud.databricks.com/)
- [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas/register)

## Next Steps

In the next chapter, we'll dive deeper into data integration and ETL/ELT processes, exploring tools and techniques for extracting data from various sources, transforming it to meet business requirements, and loading it into target systems for analysis and reporting.

---

## Chapter Quiz

Test your understanding of data engineering fundamentals:

1. What are the key responsibilities of a data engineer in a modern organization?
2. Compare and contrast batch processing and stream processing. When would you use each approach?
3. What are the main differences between a data warehouse, a data lake, and a data lakehouse?
4. Explain the concept of normalization in relational data modeling and its benefits.
5. What is the difference between ETL and ELT approaches to data integration?

Good luck!
