# Data Warehousing and Analytics for Big Data

In this chapter, we'll explore data warehousing and analytics in the context of big data. As organizations collect increasingly large volumes of data, traditional data warehousing approaches have evolved to accommodate big data requirements. We'll examine modern data warehouse architectures, cloud-based solutions, and analytics techniques that enable organizations to derive valuable insights from their big data assets.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the evolution from traditional to modern data warehousing
2. Design effective data warehouse architectures for big data
3. Implement data modeling techniques for analytics at scale
4. Use SQL and other query languages for big data analytics
5. Apply data visualization and business intelligence tools to big data
6. Implement data governance and security for data warehouses

## 1. Introduction to Data Warehousing for Big Data

### 1.1 Evolution of Data Warehousing

The journey from traditional data warehousing to modern big data analytics:

1. **Traditional Data Warehousing (1990s-2000s)**:
   - Centralized repository for structured data
   - ETL (Extract, Transform, Load) processes
   - Relational database management systems
   - Star and snowflake schemas
   - Predefined reports and OLAP cubes

2. **Big Data Warehousing (2010s-Present)**:
   - Distributed storage and processing
   - ELT (Extract, Load, Transform) processes
   - Columnar and MPP (Massively Parallel Processing) databases
   - Schema-on-read approaches
   - Self-service analytics and data discovery

3. **Modern Data Platforms**:
   - Cloud-native architectures
   - Data lakes and data lakehouses
   - Real-time analytics capabilities
   - Machine learning integration
   - Multi-model data support

```
# Evolution of Data Warehousing (ASCII Diagram)

+---------------------+      +---------------------+      +---------------------+
|    Traditional      |      |     Big Data        |      |    Modern Data      |
|  Data Warehousing   |      |    Warehousing      |      |     Platforms       |
+---------------------+      +---------------------+      +---------------------+
|                     |      |                     |      |                     |
| - Centralized       |      | - Distributed       |      | - Cloud-native      |
| - Structured data   |      | - Semi-structured   |      | - Multi-model data  |
| - ETL processes     |      | - ELT processes     |      | - Streaming ETL     |
| - RDBMS             |      | - MPP databases     |      | - Data lakehouse    |
| - Schema-on-write   |      | - Schema-on-read    |      | - Unified governance|
| - Batch processing  |      | - Batch + near-real |      | - Real-time         |
| - Predefined reports|      | - Self-service BI   |      | - AI/ML integration |
|                     |      |                     |      |                     |
+---------------------+      +---------------------+      +---------------------+
      (1990s-2000s)                (2010s)                    (Present)
```

### 1.2 Key Concepts in Modern Data Warehousing

Essential concepts for understanding big data warehousing:

1. **Data Lake vs. Data Warehouse vs. Data Lakehouse**:
   - **Data Lake**: Repository for raw, unprocessed data in native format
   - **Data Warehouse**: Structured, processed data optimized for analytics
   - **Data Lakehouse**: Combines data lake storage with data warehouse functionality

2. **Batch vs. Real-time Processing**:
   - **Batch Processing**: Scheduled processing of data in large chunks
   - **Real-time Processing**: Continuous processing of data as it arrives
   - **Lambda Architecture**: Combines batch and real-time processing

3. **On-premises vs. Cloud Data Warehousing**:
   - **On-premises**: Traditional deployment in company data centers
   - **Cloud**: Deployment in public cloud environments
   - **Hybrid**: Combination of on-premises and cloud deployments

4. **MPP (Massively Parallel Processing)**:
   - Distributes processing across multiple nodes
   - Enables horizontal scaling
   - Optimizes query performance for large datasets

### 1.3 Data Warehouse Architectures for Big Data

Modern architectural approaches for big data warehousing:

1. **Traditional Enterprise Data Warehouse (EDW)**:
   - Centralized repository
   - Structured data from operational systems
   - Historical data for reporting and analysis
   - Dimensional modeling (star/snowflake schemas)

2. **Data Mart Architecture**:
   - Subject-specific subsets of data warehouse
   - Optimized for specific business units
   - Can be dependent or independent

3. **Hub-and-Spoke Architecture**:
   - Central data warehouse (hub)
   - Multiple data marts (spokes)
   - Standardized data definitions
   - Controlled data distribution

4. **Data Lake Architecture**:
   - Raw data storage in native format
   - Schema-on-read approach
   - Support for all data types
   - Separation of storage and compute

5. **Data Lakehouse Architecture**:
   - Combines data lake storage with data warehouse features
   - ACID transactions on data lake
   - Schema enforcement and governance
   - Optimized for both ML and SQL analytics

```
# Data Lakehouse Architecture (ASCII Diagram)

+----------------------------------------------------------------------+
|                        DATA LAKEHOUSE                                 |
|                                                                      |
|  +------------------+  +------------------+  +------------------+    |
|  |   Raw Data Zone  |  | Processed Zone   |  |  Curated Zone    |    |
|  | (Data Lake)      |  | (Processing)     |  | (Data Warehouse) |    |
|  +------------------+  +------------------+  +------------------+    |
|          |                     |                      |              |
+----------------------------------------------------------------------+
           |                     |                      |
           v                     v                      v
+----------------------------------------------------------------------+
|                      UNIFIED METADATA LAYER                           |
+----------------------------------------------------------------------+
           |                     |                      |
           v                     v                      v
+----------------------------------------------------------------------+
|                      PROCESSING ENGINES                               |
|  +------------------+  +------------------+  +------------------+    |
|  |  Batch Processing|  |Stream Processing |  |  Interactive SQL |    |
|  +------------------+  +------------------+  +------------------+    |
|  +------------------+  +------------------+                          |
|  |  Machine Learning|  |  Data Science    |                          |
|  +------------------+  +------------------+                          |
+----------------------------------------------------------------------+
           |                     |                      |
           v                     v                      v
+----------------------------------------------------------------------+
|                      CONSUMPTION LAYER                                |
|  +------------------+  +------------------+  +------------------+    |
|  |    Dashboards    |  |  Ad-hoc Analysis |  |  Applications    |    |
|  +------------------+  +------------------+  +------------------+    |
+----------------------------------------------------------------------+
```

> **Knowledge Check:** Compare and contrast the data lake, data warehouse, and data lakehouse architectures. What are the key advantages and limitations of each approach? When would you recommend one over the others?

## 2. Cloud Data Warehousing

### 2.1 Cloud Data Warehouse Platforms

Overview of major cloud data warehouse solutions:

1. **Amazon Redshift**:
   - Columnar storage
   - MPP architecture
   - Integrated with AWS ecosystem
   - Redshift Spectrum for querying data in S3

2. **Google BigQuery**:
   - Serverless architecture
   - Separation of storage and compute
   - Automatic scaling
   - ML integration

3. **Microsoft Azure Synapse Analytics**:
   - Unified analytics platform
   - SQL and Spark integration
   - Data integration capabilities
   - Hybrid transactional/analytical processing

4. **Snowflake**:
   - Multi-cloud platform
   - Separation of storage, compute, and services
   - Data sharing capabilities
   - Time travel and zero-copy cloning

```sql
-- Example: Amazon Redshift SQL operations
-- Create a table with distribution and sort keys
CREATE TABLE sales (
    sale_id BIGINT PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    store_id INTEGER NOT NULL,
    sale_date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL
)
DISTKEY(customer_id)
SORTKEY(sale_date);

-- Load data from S3
COPY sales
FROM 's3://mybucket/sales/data/'
IAM_ROLE 'arn:aws:iam::123456789012:role/MyRedshiftRole'
FORMAT AS CSV
DELIMITER '|'
IGNOREHEADER 1;

-- Create a materialized view for aggregated data
CREATE MATERIALIZED VIEW daily_sales_by_store AS
SELECT 
    store_id,
    sale_date,
    SUM(quantity) AS total_quantity,
    SUM(amount) AS total_amount
FROM sales
GROUP BY store_id, sale_date;

-- Query using Redshift Spectrum (external tables)
CREATE EXTERNAL SCHEMA ext_schema
FROM DATA CATALOG
DATABASE 'external_db'
IAM_ROLE 'arn:aws:iam::123456789012:role/MyRedshiftRole';

CREATE EXTERNAL TABLE ext_schema.customer_demographics (
    customer_id INTEGER,
    age_group VARCHAR(10),
    income_bracket VARCHAR(10),
    region VARCHAR(50)
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE
LOCATION 's3://mybucket/customer/demographics/';

-- Join internal and external data
SELECT 
    d.region,
    s.sale_date,
    SUM(s.amount) AS total_sales
FROM sales s
JOIN ext_schema.customer_demographics d ON s.customer_id = d.customer_id
WHERE s.sale_date BETWEEN '2023-01-01' AND '2023-12-31'
GROUP BY d.region, s.sale_date
ORDER BY d.region, s.sale_date;
```

### 2.2 Benefits of Cloud Data Warehousing

Advantages of cloud-based data warehouse solutions:

1. **Scalability**:
   - Elastic scaling of compute resources
   - Separation of storage and compute
   - Pay-per-use pricing models
   - Handling of varying workloads

2. **Cost Efficiency**:
   - No upfront infrastructure costs
   - Operational expenditure vs. capital expenditure
   - Automatic optimization features
   - Resource scheduling and auto-scaling

3. **Performance**:
   - Distributed query processing
   - Columnar storage optimization
   - Caching and materialized views
   - Query optimization engines

4. **Integration**:
   - Native integration with cloud services
   - Support for diverse data sources
   - Built-in ETL/ELT capabilities
   - Ecosystem of compatible tools

### 2.3 Implementing a Cloud Data Warehouse

Steps for setting up and managing a cloud data warehouse:

1. **Planning and Design**:
   - Requirements gathering
   - Data volume and velocity assessment
   - Query pattern analysis
   - Security and compliance considerations

2. **Data Architecture**:
   - Data modeling approach
   - Table design and optimization
   - Partitioning and clustering strategy
   - Data lifecycle management

3. **Data Integration**:
   - Source system connectivity
   - ETL/ELT pipeline design
   - Batch vs. streaming ingestion
   - Data quality and validation

4. **Performance Optimization**:
   - Distribution and sort keys
   - Materialized views
   - Query optimization
   - Workload management

```python
# Example: Setting up a BigQuery data warehouse using Python
from google.cloud import bigquery

# Initialize BigQuery client
client = bigquery.Client()

# Create a dataset
dataset_id = f"{client.project}.retail_analytics"
dataset = bigquery.Dataset(dataset_id)
dataset.location = "US"
dataset = client.create_dataset(dataset, exists_ok=True)
print(f"Created dataset {client.project}.{dataset.dataset_id}")

# Create a table with schema
schema = [
    bigquery.SchemaField("sale_id", "INTEGER", mode="REQUIRED"),
    bigquery.SchemaField("customer_id", "INTEGER", mode="REQUIRED"),
    bigquery.SchemaField("product_id", "INTEGER", mode="REQUIRED"),
    bigquery.SchemaField("store_id", "INTEGER", mode="REQUIRED"),
    bigquery.SchemaField("sale_date", "DATE", mode="REQUIRED"),
    bigquery.SchemaField("quantity", "INTEGER", mode="REQUIRED"),
    bigquery.SchemaField("amount", "NUMERIC", mode="REQUIRED"),
]

table_id = f"{dataset_id}.sales"
table = bigquery.Table(table_id, schema=schema)

# Set clustering fields
table.clustering_fields = ["store_id", "sale_date"]

# Set partition
table.time_partitioning = bigquery.TimePartitioning(
    type_=bigquery.TimePartitioningType.DAY,
    field="sale_date",
)

table = client.create_table(table, exists_ok=True)
print(f"Created table {table.project}.{table.dataset_id}.{table.table_id}")

# Load data from GCS
job_config = bigquery.LoadJobConfig(
    source_format=bigquery.SourceFormat.CSV,
    skip_leading_rows=1,
    autodetect=True,
)

uri = "gs://my-bucket/sales-data/*.csv"
load_job = client.load_table_from_uri(
    uri, table_id, job_config=job_config
)

load_job.result()  # Wait for the job to complete
print(f"Loaded {client.get_table(table_id).num_rows} rows into {table_id}")

# Create a view
view_id = f"{dataset_id}.daily_sales_by_store"
view = bigquery.Table(view_id)
view.view_query = """
SELECT 
    store_id,
    sale_date,
    SUM(quantity) AS total_quantity,
    SUM(amount) AS total_amount
FROM `{table_id}`
GROUP BY store_id, sale_date
""".format(table_id=table_id)

view = client.create_table(view, exists_ok=True)
print(f"Created view {view.project}.{view.dataset_id}.{view.table_id}")
```

> **Hands-on Exercise:** Set up a small cloud data warehouse using a free tier account on Amazon Redshift, Google BigQuery, or Snowflake. Load sample data, create optimized tables with appropriate distribution and partitioning strategies, and implement a set of analytical queries. Document your approach, the optimizations you applied, and the performance results.

## 3. Data Modeling for Analytics

### 3.1 Dimensional Modeling

Traditional approach to data warehouse modeling:

1. **Star Schema**:
   - Fact tables (measures)
   - Dimension tables (context)
   - Denormalized for query performance
   - Simple join paths

```
# Star Schema Example (ASCII Diagram)

                  +----------------+
                  |   Date Dim     |
                  +----------------+
                  | date_key (PK)  |
                  | date           |
                  | month          |
                  | quarter        |
                  | year           |
                  +----------------+
                          |
                          |
+----------------+        |        +----------------+
|  Product Dim   |        |        |  Store Dim     |
+----------------+        |        +----------------+
| product_key(PK)|        |        | store_key (PK) |
| product_id     |        |        | store_id       |
| product_name   |        |        | store_name     |
| category       |--------+--------|  region        |
| brand          |        |        | country        |
+----------------+        |        +----------------+
                          |
                          |
                  +----------------+
                  |   Sales Fact   |
                  +----------------+
                  | date_key (FK)  |
                  | product_key(FK)|
                  | store_key (FK) |
                  | customer_key(FK|
                  | quantity       |
                  | amount         |
                  +----------------+
                          |
                          |
                  +----------------+
                  | Customer Dim   |
                  +----------------+
                  | customer_key(PK|
                  | customer_id    |
                  | name           |
                  | segment        |
                  | city           |
                  +----------------+
```

2. **Snowflake Schema**:
   - Extension of star schema
   - Normalized dimension tables
   - Reduced redundancy
   - More complex join paths

3. **Slowly Changing Dimensions (SCDs)**:
   - Type 1: Overwrite changes
   - Type 2: Track history with version records
   - Type 3: Add new attributes for changes
   - Type 4: Use history tables
   - Type 6: Hybrid approach

```sql
-- Example: Implementing Type 2 SCD in SQL
-- Create a customer dimension table with SCD Type 2
CREATE TABLE dim_customer (
    customer_key SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    segment VARCHAR(50),
    region VARCHAR(50),
    effective_date DATE NOT NULL,
    expiration_date DATE,
    is_current BOOLEAN NOT NULL,
    
    -- Natural key and effective date form a unique constraint
    CONSTRAINT uk_customer_version UNIQUE (customer_id, effective_date)
);

-- Insert a new customer
INSERT INTO dim_customer (
    customer_id, name, email, segment, region, 
    effective_date, expiration_date, is_current
) VALUES (
    1001, 'John Doe', 'john@example.com', 'Premium', 'East',
    '2023-01-01', NULL, TRUE
);

-- Update with SCD Type 2 (customer changed segment)
-- Step 1: Close the current record
UPDATE dim_customer
SET expiration_date = CURRENT_DATE - INTERVAL '1 day',
    is_current = FALSE
WHERE customer_id = 1001 AND is_current = TRUE;

-- Step 2: Insert the new version
INSERT INTO dim_customer (
    customer_id, name, email, segment, region, 
    effective_date, expiration_date, is_current
) VALUES (
    1001, 'John Doe', 'john@example.com', 'Standard', 'East',
    CURRENT_DATE, NULL, TRUE
);
```

### 3.2 Data Vault Modeling

Flexible approach for enterprise data warehousing:

1. **Core Components**:
   - Hubs: Business keys and identifiers
   - Links: Relationships between hubs
   - Satellites: Descriptive attributes

2. **Key Characteristics**:
   - Highly normalized structure
   - Resilient to change
   - Auditability and traceability
   - Parallel loading capability

```
# Data Vault Example (ASCII Diagram)

+----------------+        +----------------+        +----------------+
|  Hub_Customer  |        |  Link_Purchase |        |  Hub_Product   |
+----------------+        +----------------+        +----------------+
| H_Customer_Key |--------|L_Purchase_Key  |--------| H_Product_Key  |
| Customer_BK    |        | H_Customer_Key |        | Product_BK     |
| Load_Date      |        | H_Product_Key  |        | Load_Date      |
| Record_Source  |        | Load_Date      |        | Record_Source  |
+----------------+        | Record_Source  |        +----------------+
       |                  +----------------+                |
       |                         |                          |
       v                         v                          v
+----------------+        +----------------+        +----------------+
| Sat_Customer   |        | Sat_Purchase   |        | Sat_Product    |
+----------------+        +----------------+        +----------------+
| H_Customer_Key |        | L_Purchase_Key |        | H_Product_Key  |
| Load_Date      |        | Load_Date      |        | Load_Date      |
| Name           |        | Quantity       |        | Name           |
| Email          |        | Price          |        | Category       |
| Segment        |        | Purchase_Date  |        | Brand          |
| Region         |        | Payment_Method |        | Description    |
| HashDiff       |        | HashDiff       |        | HashDiff       |
+----------------+        +----------------+        +----------------+
```

### 3.3 Data Modeling for Big Data

Approaches optimized for big data environments:

1. **Denormalized Flat Models**:
   - Wide, denormalized tables
   - Optimized for distributed processing
   - Reduced join operations
   - Columnar storage friendly

2. **Nested and Semi-structured Models**:
   - JSON/XML/Parquet with nested structures
   - Array and map data types
   - Schema flexibility
   - Document-oriented approach

3. **Polyglot Persistence**:
   - Different data models for different use cases
   - Relational, document, graph, key-value
   - Unified access layer
   - Data virtualization

```sql
-- Example: BigQuery nested and repeated fields
-- Create a table with nested and repeated fields
CREATE OR REPLACE TABLE retail_analytics.orders (
    order_id STRING,
    customer_id STRING,
    order_date DATE,
    status STRING,
    total_amount NUMERIC,
    shipping_address STRUCT<
        street STRING,
        city STRING,
        state STRING,
        zip STRING,
        country STRING
    >,
    items ARRAY<STRUCT<
        product_id STRING,
        product_name STRING,
        quantity INT64,
        unit_price NUMERIC,
        discount NUMERIC
    >>,
    payment_methods ARRAY<STRUCT<
        method STRING,
        amount NUMERIC
    >>
);

-- Insert data with nested and repeated fields
INSERT INTO retail_analytics.orders
VALUES (
    'ORD-001',
    'CUST-123',
    DATE '2023-01-15',
    'DELIVERED',
    129.97,
    STRUCT('123 Main St', 'Boston', 'MA', '02101', 'USA'),
    [
        STRUCT('PROD-001', 'Smartphone', 1, 99.99, 0.00),
        STRUCT('PROD-002', 'Phone Case', 1, 29.99, 0.00)
    ],
    [
        STRUCT('CREDIT_CARD', 129.97)
    ]
);

-- Query with nested and repeated fields
SELECT
    order_id,
    order_date,
    customer_id,
    shipping_address.city,
    shipping_address.state,
    (SELECT SUM(item.quantity) FROM UNNEST(items) AS item) AS total_items,
    (SELECT SUM(item.quantity * item.unit_price) FROM UNNEST(items) AS item) AS subtotal
FROM retail_analytics.orders
WHERE order_date BETWEEN DATE '2023-01-01' AND DATE '2023-01-31';

-- Query with array unnesting
SELECT
    order_id,
    order_date,
    item.product_id,
    item.product_name,
    item.quantity,
    item.unit_price,
    item.quantity * item.unit_price AS item_total
FROM retail_analytics.orders,
UNNEST(items) AS item
WHERE order_date BETWEEN DATE '2023-01-01' AND DATE '2023-01-31'
ORDER BY order_id, item.product_id;
```

### 3.4 Data Modeling Best Practices for Analytics

Guidelines for effective analytical data modeling:

1. **Query-Driven Design**:
   - Model based on analytical requirements
   - Optimize for common query patterns
   - Consider reporting and dashboard needs

2. **Balance Normalization and Denormalization**:
   - Normalize for data integrity
   - Denormalize for query performance
   - Use materialized views for complex aggregations

3. **Partitioning and Clustering**:
   - Partition by date or other high-cardinality columns
   - Cluster by frequently filtered columns
   - Align with query patterns

4. **Metadata Management**:
   - Document data lineage
   - Maintain business glossary
   - Define data quality rules
   - Track schema evolution

> **Knowledge Check:** Compare dimensional modeling (star schema) with Data Vault modeling for a retail analytics use case. What are the trade-offs in terms of flexibility, complexity, and query performance? When would you recommend each approach?

## 4. SQL for Big Data Analytics

### 4.1 Advanced SQL Techniques

Powerful SQL features for analytical queries:

1. **Window Functions**:
   - Perform calculations across rows
   - Ranking, running totals, moving averages
   - Partitioning and ordering

```sql
-- Example: Window functions for analytics
-- Sales ranking by product category
SELECT
    category,
    product_name,
    total_sales,
    RANK() OVER (PARTITION BY category ORDER BY total_sales DESC) AS category_rank,
    DENSE_RANK() OVER (ORDER BY total_sales DESC) AS overall_rank
FROM product_sales;

-- Running totals and moving averages
SELECT
    sale_date,
    store_id,
    daily_sales,
    SUM(daily_sales) OVER (PARTITION BY store_id ORDER BY sale_date) AS running_total,
    AVG(daily_sales) OVER (
        PARTITION BY store_id 
        ORDER BY sale_date 
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS seven_day_moving_avg
FROM daily_store_sales;

-- Percent of total calculations
SELECT
    category,
    product_id,
    product_name,
    sales_amount,
    sales_amount / SUM(sales_amount) OVER () AS pct_of_total_sales,
    sales_amount / SUM(sales_amount) OVER (PARTITION BY category) AS pct_of_category_sales
FROM product_sales;
```

2. **Common Table Expressions (CTEs)**:
   - Create temporary result sets
   - Improve query readability
   - Enable recursive queries

```sql
-- Example: CTEs for complex analytics
-- Customer segmentation with CTEs
WITH customer_purchases AS (
    SELECT
        customer_id,
        COUNT(DISTINCT order_id) AS order_count,
        SUM(amount) AS total_spent,
        MAX(order_date) AS last_purchase_date,
        DATE_DIFF(CURRENT_DATE, MAX(order_date), DAY) AS days_since_last_purchase
    FROM orders
    WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
    GROUP BY customer_id
),
customer_segments AS (
    SELECT
        customer_id,
        order_count,
        total_spent,
        days_since_last_purchase,
        CASE
            WHEN order_count >= 10 AND days_since_last_purchase <= 30 THEN 'Champions'
            WHEN order_count >= 5 AND days_since_last_purchase <= 60 THEN 'Loyal Customers'
            WHEN order_count >= 2 AND days_since_last_purchase <= 90 THEN 'Potential Loyalists'
            WHEN order_count >= 1 AND days_since_last_purchase <= 30 THEN 'New Customers'
            WHEN days_since_last_purchase > 180 THEN 'At Risk'
            ELSE 'Others'
        END AS segment
    FROM customer_purchases
)
SELECT
    segment,
    COUNT(*) AS customer_count,
    ROUND(AVG(total_spent), 2) AS avg_spent,
    ROUND(AVG(order_count), 1) AS avg_orders
FROM customer_segments
GROUP BY segment
ORDER BY customer_count DESC;

-- Recursive CTE for hierarchical data
WITH RECURSIVE category_hierarchy AS (
    -- Base case: top-level categories
    SELECT
        category_id,
        category_name,
        parent_category_id,
        1 AS level,
        CAST(category_name AS STRING) AS path
    FROM categories
    WHERE parent_category_id IS NULL
    
    UNION ALL
    
    -- Recursive case: child categories
    SELECT
        c.category_id,
        c.category_name,
        c.parent_category_id,
        h.level + 1,
        CONCAT(h.path, ' > ', c.category_name)
    FROM categories c
    JOIN category_hierarchy h ON c.parent_category_id = h.category_id
)
SELECT * FROM category_hierarchy
ORDER BY path;
```

3. **Analytical Functions**:
   - Statistical calculations
   - Time series analysis
   - Pattern recognition

```sql
-- Example: Analytical functions
-- Time series analysis with lag and lead
SELECT
    sale_date,
    daily_sales,
    LAG(daily_sales) OVER (ORDER BY sale_date) AS previous_day_sales,
    LEAD(daily_sales) OVER (ORDER BY sale_date) AS next_day_sales,
    daily_sales - LAG(daily_sales) OVER (ORDER BY sale_date) AS day_over_day_change,
    (daily_sales - LAG(daily_sales) OVER (ORDER BY sale_date)) / 
        NULLIF(LAG(daily_sales) OVER (ORDER BY sale_date), 0) * 100 AS pct_change
FROM daily_sales;

-- Percentile calculations
SELECT
    category,
    AVG(price) AS avg_price,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY price) AS median_price,
    PERCENTILE_CONT(0.25) WITHIN GROUP (ORDER BY price) AS percentile_25,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY price) AS percentile_75
FROM products
GROUP BY category;

-- Anomaly detection with standard deviation
SELECT
    sale_date,
    store_id,
    daily_sales,
    AVG(daily_sales) OVER (PARTITION BY store_id) AS avg_sales,
    STDDEV(daily_sales) OVER (PARTITION BY store_id) AS stddev_sales,
    (daily_sales - AVG(daily_sales) OVER (PARTITION BY store_id)) / 
        NULLIF(STDDEV(daily_sales) OVER (PARTITION BY store_id), 0) AS z_score,
    CASE
        WHEN ABS((daily_sales - AVG(daily_sales) OVER (PARTITION BY store_id)) / 
            NULLIF(STDDEV(daily_sales) OVER (PARTITION BY store_id), 0)) > 2 THEN 'Anomaly'
        ELSE 'Normal'
    END AS detection
FROM daily_store_sales;
```

### 4.2 SQL Extensions for Big Data

SQL dialects and extensions for big data platforms:

1. **Hive QL**:
   - SQL-like language for Hadoop
   - Support for complex data types
   - Custom serialization formats
   - User-defined functions

```sql
-- Example: HiveQL for big data
-- Create an external table with partitioning
CREATE EXTERNAL TABLE sales_data (
    transaction_id STRING,
    customer_id STRING,
    product_id STRING,
    quantity INT,
    price DECIMAL(10,2),
    discount DECIMAL(5,2)
)
PARTITIONED BY (year INT, month INT, day INT)
STORED AS PARQUET
LOCATION '/data/sales';

-- Add partitions
ALTER TABLE sales_data ADD
PARTITION (year=2023, month=1, day=1) LOCATION '/data/sales/2023/01/01'
PARTITION (year=2023, month=1, day=2) LOCATION '/data/sales/2023/01/02';

-- Query with partition pruning
SELECT
    product_id,
    SUM(quantity) AS total_quantity,
    SUM(price * quantity) AS total_revenue
FROM sales_data
WHERE year = 2023 AND month = 1
GROUP BY product_id;

-- Complex types and lateral views
CREATE TABLE order_details (
    order_id STRING,
    customer_id STRING,
    order_date STRING,
    items ARRAY<STRUCT<
        product_id:STRING,
        quantity:INT,
        price:DOUBLE
    >>
);

-- Query with array explosion
SELECT
    order_id,
    order_date,
    item.product_id,
    item.quantity,
    item.price
FROM order_details
LATERAL VIEW EXPLODE(items) itemTable AS item
WHERE order_date LIKE '2023-01%';
```

2. **Spark SQL**:
   - SQL interface for Spark
   - Integration with DataFrame API
   - Catalyst optimizer
   - Support for structured streaming

```python
# Example: Spark SQL with Python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, explode, window

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Spark SQL Analytics") \
    .getOrCreate()

# Register a table from Parquet files
sales = spark.read.parquet("/data/sales/")
sales.createOrReplaceTempView("sales")

# Run SQL queries
result = spark.sql("""
    SELECT
        product_id,
        SUM(quantity) AS total_quantity,
        SUM(price * quantity) AS total_revenue,
        COUNT(DISTINCT customer_id) AS unique_customers
    FROM sales
    WHERE sale_date BETWEEN '2023-01-01' AND '2023-12-31'
    GROUP BY product_id
    HAVING SUM(quantity) > 100
    ORDER BY total_revenue DESC
    LIMIT 10
""")

# Show results
result.show()

# Mix SQL with DataFrame API
from pyspark.sql.functions import year, month, dayofmonth

sales_df = spark.table("sales")
monthly_sales = sales_df \
    .withColumn("year", year("sale_date")) \
    .withColumn("month", month("sale_date")) \
    .groupBy("year", "month", "product_id") \
    .agg({"quantity": "sum", "price": "avg"}) \
    .orderBy("year", "month", "product_id")

# Register the result as a view
monthly_sales.createOrReplaceTempView("monthly_sales")

# Query the view
spark.sql("""
    SELECT * FROM monthly_sales
    WHERE year = 2023 AND month = 1
""").show()
```

3. **Presto/Trino**:
   - Distributed SQL query engine
   - Query multiple data sources
   - Federation capabilities
   - Interactive query performance

```sql
-- Example: Presto/Trino federated queries
-- Query data from Hive
SELECT
    year,
    month,
    SUM(total_sales) AS monthly_sales
FROM hive.sales.monthly_sales
WHERE year = 2023
GROUP BY year, month
ORDER BY month;

-- Join data across different sources
SELECT
    s.sale_date,
    s.product_id,
    p.product_name,
    s.quantity,
    s.price,
    c.customer_name,
    c.segment
FROM hive.sales.transactions s
JOIN mysql.products.product_catalog p ON s.product_id = p.product_id
JOIN postgresql.customers.profiles c ON s.customer_id = c.customer_id
WHERE s.sale_date >= DATE '2023-01-01';

-- Create a view combining multiple sources
CREATE VIEW analytics.combined_sales AS
SELECT
    t.transaction_id,
    t.sale_date,
    p.product_name,
    p.category,
    t.quantity,
    t.price,
    c.customer_name,
    c.city,
    c.state
FROM hive.sales.transactions t
JOIN mysql.products.product_catalog p ON t.product_id = p.product_id
JOIN postgresql.customers.profiles c ON t.customer_id = c.customer_id;
```

### 4.3 Query Optimization for Big Data

Techniques for improving query performance:

1. **Partitioning and Clustering**:
   - Partition by date or high-cardinality columns
   - Cluster by frequently filtered columns
   - Enable partition pruning

2. **Materialized Views and Aggregations**:
   - Precompute common aggregations
   - Refresh strategies (incremental vs. full)
   - Query rewriting to use materialized views

3. **Join Optimization**:
   - Join order selection
   - Broadcast vs. shuffle joins
   - Denormalization to reduce joins

4. **Query Tuning**:
   - Filter pushdown
   - Predicate optimization
   - Column pruning
   - Statistics collection

```sql
-- Example: Query optimization techniques
-- Partitioning and clustering in BigQuery
CREATE OR REPLACE TABLE analytics.sales_optimized
PARTITION BY DATE_TRUNC(sale_date, MONTH)
CLUSTER BY store_id, product_category
AS
SELECT * FROM analytics.sales;

-- Materialized view in Redshift
CREATE MATERIALIZED VIEW mv_daily_sales_by_region
AUTO REFRESH YES
AS
SELECT
    region,
    sale_date,
    SUM(quantity) AS total_quantity,
    SUM(amount) AS total_sales
FROM sales s
JOIN stores st ON s.store_id = st.store_id
GROUP BY region, sale_date;

-- Join optimization in Snowflake
-- Create a distribution key
CREATE OR REPLACE TABLE sales (
    sale_id NUMBER,
    customer_id NUMBER,
    product_id NUMBER,
    store_id NUMBER,
    sale_date DATE,
    quantity NUMBER,
    amount NUMBER
)
CLUSTER BY (sale_date, store_id);

-- Analyze query performance
EXPLAIN
SELECT
    p.category,
    s.sale_date,
    SUM(s.amount) AS total_sales
FROM sales s
JOIN products p ON s.product_id = p.product_id
WHERE s.sale_date BETWEEN '2023-01-01' AND '2023-01-31'
GROUP BY p.category, s.sale_date
ORDER BY p.category, s.sale_date;
```

> **Hands-on Exercise:** Write a set of advanced SQL queries for a business analytics scenario of your choice. Implement window functions, CTEs, and analytical functions to derive insights from the data. Optimize your queries for performance using appropriate techniques such as partitioning, clustering, and materialized views. Test the queries on a cloud data warehouse platform and document the performance improvements.

## 5. Data Visualization and Business Intelligence

### 5.1 BI Tools for Big Data

Popular tools for visualizing and analyzing big data:

1. **Tableau**:
   - Rich visualization capabilities
   - Direct connection to big data sources
   - In-memory analytics engine
   - Self-service dashboards

2. **Power BI**:
   - Microsoft ecosystem integration
   - DAX and M query languages
   - AI-powered insights
   - Embedded analytics

3. **Looker**:
   - LookML modeling language
   - Git integration for version control
   - Embedded analytics
   - Data governance features

4. **Apache Superset**:
   - Open-source platform
   - SQL Lab for interactive queries
   - Visualization library
   - Dashboard creation and sharing

5. **Databricks SQL**:
   - Integrated with Databricks platform
   - Lakehouse architecture support
   - Query federation
   - Visualization capabilities

### 5.2 Connecting BI Tools to Big Data Sources

Methods for integrating visualization tools with big data:

1. **Direct Connection**:
   - Native connectors to data sources
   - Live query execution
   - Real-time dashboards
   - Query pass-through

2. **In-Memory Analytics**:
   - Data extraction to tool's memory
   - Fast interactive analysis
   - Disconnected operation
   - Refresh scheduling

3. **Semantic Layer**:
   - Business-friendly data models
   - Consistent metrics and dimensions
   - Reusable calculations
   - Governance and security

4. **Custom Integrations**:
   - API-based connections
   - Custom connectors
   - ETL/ELT pipelines
   - Data preparation services

```python
# Example: Connecting Tableau to BigQuery using Python
import tableauserverclient as TSC
from google.cloud import bigquery

# Set up BigQuery client
bq_client = bigquery.Client()

# Create a materialized dataset for Tableau
query = """
CREATE OR REPLACE TABLE tableau_analytics.sales_dashboard AS
SELECT
    DATE_TRUNC(sale_date, MONTH) AS month,
    product_category,
    store_region,
    SUM(quantity) AS total_quantity,
    SUM(amount) AS total_sales,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM retail_analytics.sales s
JOIN retail_analytics.products p ON s.product_id = p.product_id
JOIN retail_analytics.stores st ON s.store_id = st.store_id
WHERE sale_date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR)
GROUP BY month, product_category, store_region
"""

# Execute the query
job = bq_client.query(query)
job.result()

# Connect to Tableau Server
tableau_auth = TSC.TableauAuth('username', 'password', 'site')
server = TSC.Server('https://tableau-server')

with server.auth.sign_in(tableau_auth):
    # Get the default project
    all_projects, pagination_item = server.projects.get()
    default_project = next((project for project in all_projects if project.name == 'Default'), None)
    
    # Create a datasource
    datasource = TSC.DatasourceItem(default_project.id)
    datasource.name = 'BigQuery Sales Dashboard'
    
    # Publish the datasource
    # (In a real scenario, you would create a Tableau datasource file (.tdsx) first)
    # server.datasources.publish(datasource, 'path/to/datasource.tdsx', 'Overwrite')
    
    print("Datasource published successfully")
```

### 5.3 Designing Effective Dashboards

Principles for creating impactful data visualizations:

1. **Dashboard Design Principles**:
   - Clear purpose and audience
   - Logical information hierarchy
   - Consistent layout and formatting
   - Appropriate visualization types

2. **Visualization Best Practices**:
   - Choose the right chart type
   - Minimize chart junk
   - Use color effectively
   - Provide context and comparisons

3. **Interactive Features**:
   - Filters and parameters
   - Drill-down capabilities
   - Cross-filtering
   - Tooltips and annotations

4. **Performance Considerations**:
   - Optimize queries
   - Aggregate data appropriately
   - Use incremental refreshes
   - Monitor dashboard load times

### 5.4 Embedded Analytics

Integrating analytics into applications:

1. **Embedding Options**:
   - iFrames and web components
   - JavaScript APIs
   - Server-side rendering
   - White-labeled solutions

2. **Security Considerations**:
   - Authentication and authorization
   - Row-level security
   - Single sign-on (SSO)
   - API keys and tokens

3. **User Experience**:
   - Seamless integration
   - Consistent styling
   - Mobile responsiveness
   - Performance optimization

4. **Deployment Models**:
   - Cloud-hosted
   - On-premises
   - Hybrid approaches
   - Multi-tenant architecture

```javascript
// Example: Embedding Power BI dashboard using JavaScript
// HTML container
// <div id="dashboardContainer"></div>

// JavaScript code
function embedPowerBIDashboard() {
    // Configuration for the embedded dashboard
    const config = {
        type: 'dashboard',
        tokenType: models.TokenType.Embed,
        accessToken: 'your_access_token', // Generated on the server
        embedUrl: 'https://app.powerbi.com/dashboardEmbed',
        id: 'dashboard_id',
        permissions: models.Permissions.Read,
        settings: {
            filterPaneEnabled: false,
            navContentPaneEnabled: true
        }
    };
    
    // Get the container reference
    const dashboardContainer = document.getElementById('dashboardContainer');
    
    // Embed the dashboard
    const dashboard = powerbi.embed(dashboardContainer, config);
    
    // Handle events
    dashboard.on('loaded', function() {
        console.log('Dashboard loaded');
    });
    
    dashboard.on('error', function(event) {
        console.error('Dashboard error:', event.detail);
    });
    
    return dashboard;
}

// Call the function when the page loads
window.onload = embedPowerBIDashboard;
```

> **Knowledge Check:** Compare and contrast three different BI tools for big data analytics. What are the strengths and limitations of each tool? Which would you recommend for different types of organizations and use cases?

## 6. Data Governance and Security

### 6.1 Data Governance for Data Warehouses

Framework for managing data assets:

1. **Data Catalog**:
   - Inventory of data assets
   - Business and technical metadata
   - Data lineage
   - Search and discovery

2. **Data Quality Management**:
   - Quality rules and metrics
   - Monitoring and alerting
   - Data profiling
   - Remediation processes

3. **Master Data Management**:
   - Golden record creation
   - Entity resolution
   - Hierarchy management
   - Data stewardship

4. **Lifecycle Management**:
   - Data retention policies
   - Archiving strategies
   - Data purging
   - Historical data management

```python
# Example: Data catalog implementation with Python
import pandas as pd
from sqlalchemy import create_engine, MetaData, Table, Column, String, Integer, inspect
import json

# Connect to the data warehouse
engine = create_engine('postgresql://username:password@warehouse:5432/analytics')

# Create a data catalog
class DataCatalog:
    def __init__(self, engine):
        self.engine = engine
        self.catalog = {
            'schemas': {},
            'tables': {},
            'columns': {},
            'lineage': {},
            'business_terms': {}
        }
    
    def scan_database(self):
        """Scan database and extract metadata"""
        inspector = inspect(self.engine)
        schemas = inspector.get_schema_names()
        
        for schema in schemas:
            if schema not in ('pg_catalog', 'information_schema'):
                self.catalog['schemas'][schema] = {
                    'name': schema,
                    'tables': []
                }
                
                tables = inspector.get_table_names(schema=schema)
                for table in tables:
                    table_info = {
                        'name': table,
                        'schema': schema,
                        'columns': [],
                        'row_count': self._get_row_count(schema, table)
                    }
                    
                    self.catalog['tables'][f"{schema}.{table}"] = table_info
                    self.catalog['schemas'][schema]['tables'].append(table)
                    
                    columns = inspector.get_columns(table, schema=schema)
                    for column in columns:
                        col_name = column['name']
                        col_info = {
                            'name': col_name,
                            'type': str(column['type']),
                            'nullable': column.get('nullable', True),
                            'table': table,
                            'schema': schema
                        }
                        
                        self.catalog['columns'][f"{schema}.{table}.{col_name}"] = col_info
                        table_info['columns'].append(col_name)
    
    def _get_row_count(self, schema, table):
        """Get row count for a table"""
        try:
            query = f'SELECT COUNT(*) FROM "{schema}"."{table}"'
            result = self.engine.execute(query).scalar()
            return result
        except:
            return None
    
    def add_business_term(self, term, definition, related_columns=None):
        """Add business term to the catalog"""
        self.catalog['business_terms'][term] = {
            'definition': definition,
            'related_columns': related_columns or []
        }
        
        # Update column metadata with business term
        if related_columns:
            for col in related_columns:
                if col in self.catalog['columns']:
                    if 'business_terms' not in self.catalog['columns'][col]:
                        self.catalog['columns'][col]['business_terms'] = []
                    self.catalog['columns'][col]['business_terms'].append(term)
    
    def add_lineage(self, target, sources, transformation=None):
        """Add data lineage information"""
        self.catalog['lineage'][target] = {
            'sources': sources,
            'transformation': transformation
        }
    
    def export_catalog(self, filename):
        """Export catalog to JSON file"""
        with open(filename, 'w') as f:
            json.dump(self.catalog, f, indent=2)
    
    def search(self, term):
        """Search the catalog"""
        results = {
            'tables': [],
            'columns': [],
            'business_terms': []
        }
        
        # Search tables
        for table_id, table in self.catalog['tables'].items():
            if term.lower() in table_id.lower():
                results['tables'].append(table)
        
        # Search columns
        for col_id, col in self.catalog['columns'].items():
            if term.lower() in col_id.lower():
                results['columns'].append(col)
        
        # Search business terms
        for term_id, term_info in self.catalog['business_terms'].items():
            if term.lower() in term_id.lower() or term.lower() in term_info['definition'].lower():
                results['business_terms'].append({
                    'term': term_id,
                    'info': term_info
                })
        
        return results

# Create and populate the catalog
catalog = DataCatalog(engine)
catalog.scan_database()

# Add business terms
catalog.add_business_term(
    'Customer Lifetime Value',
    'The total worth of a customer to the business over the whole relationship',
    ['analytics.customers.ltv', 'analytics.customer_segments.avg_ltv']
)

# Add lineage
catalog.add_lineage(
    'analytics.daily_sales_by_region',
    ['raw.sales', 'raw.stores'],
    'Aggregated daily sales by store region'
)

# Export the catalog
catalog.export_catalog('data_catalog.json')

# Search the catalog
results = catalog.search('customer')
print(f"Found {len(results['tables'])} tables, {len(results['columns'])} columns, and {len(results['business_terms'])} business terms")
```

### 6.2 Security and Compliance

Protecting data in the warehouse:

1. **Authentication and Authorization**:
   - Identity management
   - Role-based access control (RBAC)
   - Attribute-based access control (ABAC)
   - Single sign-on (SSO)

2. **Data Protection**:
   - Encryption at rest and in transit
   - Tokenization
   - Data masking
   - Key management

3. **Auditing and Monitoring**:
   - Access logs
   - Query history
   - Anomaly detection
   - Compliance reporting

4. **Compliance Frameworks**:
   - GDPR, CCPA, HIPAA
   - Industry-specific regulations
   - Data residency requirements
   - Retention policies

```sql
-- Example: Implementing row-level security in Snowflake
-- Create a role for each region
CREATE ROLE IF NOT EXISTS east_region_analyst;
CREATE ROLE IF NOT EXISTS west_region_analyst;
CREATE ROLE IF NOT EXISTS central_region_analyst;

-- Grant roles to users
GRANT ROLE east_region_analyst TO USER jane_doe;
GRANT ROLE west_region_analyst TO USER john_smith;
GRANT ROLE central_region_analyst TO USER bob_johnson;

-- Create a secure view with row-level security
CREATE OR REPLACE SECURE VIEW sales_by_region AS
SELECT
    sale_date,
    store_id,
    product_id,
    quantity,
    amount,
    region
FROM sales s
JOIN stores st ON s.store_id = st.store_id
WHERE
    (CURRENT_ROLE() = 'EAST_REGION_ANALYST' AND region = 'East') OR
    (CURRENT_ROLE() = 'WEST_REGION_ANALYST' AND region = 'West') OR
    (CURRENT_ROLE() = 'CENTRAL_REGION_ANALYST' AND region = 'Central') OR
    CURRENT_ROLE() IN ('ACCOUNTADMIN', 'SYSADMIN');

-- Grant access to the view
GRANT SELECT ON VIEW sales_by_region TO ROLE east_region_analyst;
GRANT SELECT ON VIEW sales_by_region TO ROLE west_region_analyst;
GRANT SELECT ON VIEW sales_by_region TO ROLE central_region_analyst;

-- Create a masking policy for sensitive data
CREATE OR REPLACE MASKING POLICY email_mask AS
    (val STRING) RETURNS STRING ->
    CASE
        WHEN CURRENT_ROLE() IN ('ACCOUNTADMIN', 'SYSADMIN') THEN val
        ELSE CONCAT(SUBSTRING(SPLIT_PART(val, '@', 1), 1, 2), '***@', SPLIT_PART(val, '@', 2))
    END;

-- Apply the masking policy
ALTER TABLE customers MODIFY COLUMN email SET MASKING POLICY email_mask;

-- Set up audit logging
USE ROLE ACCOUNTADMIN;
CREATE OR REPLACE WAREHOUSE audit_warehouse WITH WAREHOUSE_SIZE = 'XSMALL';

-- Create audit table
CREATE OR REPLACE TABLE audit_logs (
    event_timestamp TIMESTAMP_LTZ,
    user_name STRING,
    role_name STRING,
    query_id STRING,
    query_text STRING,
    database_name STRING,
    schema_name STRING,
    table_name STRING,
    client_ip STRING
);

-- Create stored procedure for audit logging
CREATE OR REPLACE PROCEDURE log_query_history()
RETURNS STRING
LANGUAGE JAVASCRIPT
AS
$$
    var cmd = `
        INSERT INTO audit_logs
        SELECT
            QUERY_START_TIME,
            USER_NAME,
            ROLE_NAME,
            QUERY_ID,
            QUERY_TEXT,
            DATABASE_NAME,
            SCHEMA_NAME,
            SPLIT_PART(SPLIT_PART(QUERY_TEXT, ' FROM ', 2), ' ', 1) AS TABLE_NAME,
            CLIENT_IP
        FROM TABLE(INFORMATION_SCHEMA.QUERY_HISTORY())
        WHERE QUERY_TYPE = 'SELECT'
        AND EXECUTION_STATUS = 'SUCCESS'
        AND QUERY_START_TIME > DATEADD(HOUR, -1, CURRENT_TIMESTAMP())
    `;
    
    try {
        snowflake.execute({sqlText: cmd});
        return "Audit logging successful";
    } catch (err) {
        return "Error: " + err;
    }
$$;

-- Schedule the audit procedure
CREATE OR REPLACE TASK hourly_audit_logging
WAREHOUSE = audit_warehouse
SCHEDULE = 'USING CRON 0 * * * * UTC'
AS
CALL log_query_history();

-- Activate the task
ALTER TASK hourly_audit_logging RESUME;
```

### 6.3 Privacy and Ethical Considerations

Responsible data management practices:

1. **Data Privacy**:
   - Privacy by design
   - Consent management
   - Data subject rights
   - Privacy impact assessments

2. **Ethical Data Use**:
   - Fairness and bias mitigation
   - Transparency
   - Purpose limitation
   - Accountability

3. **Data Anonymization**:
   - De-identification techniques
   - K-anonymity
   - Differential privacy
   - Synthetic data generation

4. **Responsible AI**:
   - Explainable models
   - Human oversight
   - Bias detection and mitigation
   - Ethical guidelines

```python
# Example: Implementing differential privacy with Python
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

class DifferentialPrivacy:
    def __init__(self, epsilon=1.0):
        """
        Initialize with privacy budget epsilon.
        Lower epsilon = more privacy, less accuracy.
        """
        self.epsilon = epsilon
    
    def add_laplace_noise(self, data, sensitivity=1.0):
        """Add Laplace noise to numeric data"""
        scale = sensitivity / self.epsilon
        noise = np.random.laplace(0, scale, data.shape)
        return data + noise
    
    def privatize_count(self, count, sensitivity=1.0):
        """Privatize a count query"""
        noisy_count = count + np.random.laplace(0, sensitivity / self.epsilon)
        return max(0, round(noisy_count))
    
    def privatize_sum(self, sum_value, sensitivity):
        """Privatize a sum query"""
        noisy_sum = sum_value + np.random.laplace(0, sensitivity / self.epsilon)
        return noisy_sum
    
    def privatize_mean(self, values, sensitivity):
        """Privatize a mean calculation"""
        count = len(values)
        sum_value = np.sum(values)
        
        # Add noise to both sum and count
        noisy_sum = self.privatize_sum(sum_value, sensitivity)
        noisy_count = self.privatize_count(count)
        
        # Avoid division by zero
        if noisy_count == 0:
            return 0
        
        return noisy_sum / noisy_count
    
    def privatize_histogram(self, data, bins):
        """Create a differentially private histogram"""
        hist, bin_edges = np.histogram(data, bins=bins)
        noisy_hist = [self.privatize_count(count) for count in hist]
        return noisy_hist, bin_edges
    
    def privatize_dataframe(self, df, numeric_columns, categorical_columns=None):
        """
        Create a differentially private version of a dataframe
        
        Parameters:
        - df: pandas DataFrame
        - numeric_columns: list of numeric columns to add noise to
        - categorical_columns: list of categorical columns to create private histograms for
        """
        df_private = df.copy()
        
        # Handle numeric columns
        for col in numeric_columns:
            if col in df.columns:
                # Estimate sensitivity as the standard deviation
                sensitivity = df[col].std()
                df_private[col] = self.add_laplace_noise(df[col].values, sensitivity)
        
        # Handle categorical columns
        if categorical_columns:
            for col in categorical_columns:
                if col in df.columns:
                    # Get value counts
                    value_counts = df[col].value_counts()
                    
                    # Add noise to counts
                    noisy_counts = {}
                    for value, count in value_counts.items():
                        noisy_counts[value] = self.privatize_count(count)
                    
                    # Create a new distribution based on noisy counts
                    total_noisy = sum(noisy_counts.values())
                    if total_noisy > 0:
                        probabilities = {k: v/total_noisy for k, v in noisy_counts.items()}
                        
                        # Sample from the noisy distribution
                        new_values = np.random.choice(
                            list(probabilities.keys()),
                            size=len(df),
                            p=list(probabilities.values())
                        )
                        df_private[col] = new_values
        
        return df_private

# Example usage
# Load customer data
customer_data = pd.read_csv('customer_data.csv')

# Initialize differential privacy with epsilon=0.5 (strong privacy)
dp = DifferentialPrivacy(epsilon=0.5)

# Create a private version of the dataset
private_data = dp.privatize_dataframe(
    customer_data,
    numeric_columns=['age', 'income', 'purchase_amount'],
    categorical_columns=['gender', 'region']
)

# Calculate private statistics
original_avg_income = customer_data['income'].mean()
private_avg_income = dp.privatize_mean(customer_data['income'].values, customer_data['income'].std())

print(f"Original average income: {original_avg_income}")
print(f"Private average income: {private_avg_income}")

# Create a private histogram of ages
age_hist, age_bins = dp.privatize_histogram(customer_data['age'].values, bins=10)
print("Private age distribution:", age_hist)

# Save the privatized dataset
private_data.to_csv('private_customer_data.csv', index=False)
```

> **Hands-on Exercise:** Design a data governance framework for a data warehouse in a regulated industry (e.g., healthcare, finance). Include data catalog, quality management, security controls, and privacy measures. Implement a prototype of at least one component of your framework (e.g., a data catalog, access control system, or privacy-preserving query mechanism) and demonstrate its functionality.

## Summary

In this chapter, we've explored data warehousing and analytics for big data:

- The evolution from traditional data warehousing to modern big data platforms
- Cloud-based data warehouse solutions and their benefits
- Data modeling approaches for analytics at scale
- Advanced SQL techniques for big data analytics
- Data visualization and business intelligence tools
- Data governance, security, and privacy considerations

Modern data warehousing combines the best of traditional approaches with the scalability and flexibility needed for big data. By leveraging cloud platforms, optimized data models, and powerful analytical tools, organizations can derive valuable insights from their data assets while maintaining proper governance and security.

## Additional Resources

### Books
- "The Data Warehouse Toolkit" by Ralph Kimball and Margy Ross
- "Building a Scalable Data Warehouse with Data Vault 2.0" by Dan Linstedt and Michael Olschimke
- "Data Architecture: A Primer for the Data Scientist" by W.H. Inmon and Daniel Linstedt
- "Designing Data-Intensive Applications" by Martin Kleppmann
- "Big Data: Principles and Best Practices of Scalable Real-time Data Systems" by Nathan Marz and James Warren

### Online Resources
- [Snowflake Documentation](https://docs.snowflake.com/)
- [Google BigQuery Documentation](https://cloud.google.com/bigquery/docs)
- [Amazon Redshift Documentation](https://docs.aws.amazon.com/redshift/)
- [Databricks Documentation](https://docs.databricks.com/)
- [Tableau Learning Resources](https://www.tableau.com/learn)

### Practice Platforms
- [Google BigQuery Sandbox](https://cloud.google.com/bigquery/docs/sandbox)
- [Snowflake Free Trial](https://signup.snowflake.com/)
- [Databricks Community Edition](https://community.cloud.databricks.com/)
- [Power BI Desktop](https://powerbi.microsoft.com/desktop/)
- [Tableau Public](https://public.tableau.com/)

## Next Steps

In the next chapter, we'll explore machine learning for big data, including distributed machine learning frameworks, scalable algorithms, and deployment strategies for machine learning models in big data environments.

---

## Chapter Quiz

Test your understanding of data warehousing and analytics concepts:

1. What are the key differences between a data lake, a data warehouse, and a data lakehouse?
2. Explain the benefits of cloud-based data warehousing compared to on-premises solutions.
3. When would you use a star schema versus a Data Vault modeling approach?
4. What are window functions in SQL and how do they enhance analytical capabilities?
5. What are the main components of a data governance framework for a data warehouse?

Good luck!
