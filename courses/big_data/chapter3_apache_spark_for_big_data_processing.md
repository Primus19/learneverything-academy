# Apache Spark for Big Data Processing

In this chapter, we'll explore Apache Spark, a powerful unified analytics engine for large-scale data processing. Spark has become one of the most popular big data processing frameworks due to its speed, ease of use, and versatility. We'll cover Spark's architecture, programming model, and key components, along with practical examples to help you get started with Spark applications.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand Spark's architecture and how it differs from Hadoop MapReduce
2. Write Spark applications using RDDs, DataFrames, and Datasets
3. Perform data transformations and actions in Spark
4. Use Spark SQL for structured data processing
5. Implement machine learning pipelines with MLlib
6. Process streaming data with Spark Streaming
7. Configure and tune Spark applications for optimal performance

## 1. Introduction to Apache Spark

### 1.1 What is Apache Spark?

Apache Spark is an open-source, distributed computing system designed for fast computation. It was developed in response to limitations in the MapReduce cluster computing paradigm, offering:

- **Speed**: Runs workloads up to 100x faster than Hadoop MapReduce for certain applications
- **Ease of Use**: Provides high-level APIs in Java, Scala, Python, and R
- **Generality**: Combines SQL, streaming, and complex analytics in the same application
- **In-Memory Processing**: Stores intermediate results in memory rather than on disk
- **Fault Tolerance**: Recovers lost work automatically

### 1.2 Spark vs. Hadoop MapReduce

Understanding the key differences between Spark and Hadoop MapReduce:

| Feature | Apache Spark | Hadoop MapReduce |
|---------|--------------|------------------|
| **Processing Model** | In-memory computation with disk persistence | Disk-based computation |
| **Performance** | Generally 10-100x faster | Slower due to disk I/O |
| **Programming Model** | Rich set of transformations and actions | Map and reduce operations only |
| **Ease of Use** | High-level APIs in multiple languages | More complex Java API |
| **Iterative Processing** | Efficient for iterative algorithms | Inefficient (writes to disk between iterations) |
| **Real-time Processing** | Supports streaming with micro-batches | Batch processing only |
| **Memory Requirements** | Higher (for in-memory processing) | Lower |
| **Recovery** | Lineage-based recovery | Replication-based recovery |

### 1.3 Spark Ecosystem

Spark includes several integrated components:

1. **Spark Core**: The foundation that provides distributed task dispatching, scheduling, and basic I/O functionalities

2. **Spark SQL**: Module for working with structured data, including SQL queries

3. **Spark Streaming**: Processing of real-time streaming data

4. **MLlib**: Machine learning library with common algorithms and utilities

5. **GraphX**: Graph computation engine for graph-parallel computation

6. **SparkR and PySpark**: R and Python interfaces to Spark

```
# Spark Ecosystem (ASCII Diagram)

+---------------------------------------------------------------+
|                      Spark Applications                        |
+---------------------------------------------------------------+
|                                                               |
|  +----------+  +----------+  +----------+  +----------+       |
|  | Spark SQL|  | Streaming|  |  MLlib   |  |  GraphX  |       |
|  +----------+  +----------+  +----------+  +----------+       |
|                                                               |
+---------------------------------------------------------------+
|                         Spark Core                            |
+---------------------------------------------------------------+
|                                                               |
|    YARN    |    Mesos    |   Kubernetes  |   Standalone       |
|                                                               |
+---------------------------------------------------------------+
|                                                               |
|     HDFS   |    Cassandra |    HBase    |   S3   |   etc.     |
|                                                               |
+---------------------------------------------------------------+
```

## 2. Spark Architecture

### 2.1 Distributed Architecture

Spark follows a master-worker architecture:

1. **Driver Program**: Contains the application's main function and creates a SparkContext
   - Converts user code into tasks
   - Schedules tasks on executors
   - Coordinates task execution

2. **Cluster Manager**: Allocates resources across applications
   - Standalone Scheduler
   - YARN
   - Mesos
   - Kubernetes

3. **Executors**: Worker processes that run tasks
   - Execute code assigned by the driver
   - Store computation results in memory or disk
   - Return results to the driver

```
# Spark Architecture (ASCII Diagram)

+----------------+
| Driver Program |
| (SparkContext) |
+----------------+
        |
        v
+----------------+
| Cluster Manager|
+----------------+
        |
        |-------------------+-------------------+
        |                   |                   |
        v                   v                   v
+----------------+  +----------------+  +----------------+
|    Executor    |  |    Executor    |  |    Executor    |
| +------------+ |  | +------------+ |  | +------------+ |
| |   Task     | |  | |   Task     | |  | |   Task     | |
| +------------+ |  | +------------+ |  | +------------+ |
| +------------+ |  | +------------+ |  | +------------+ |
| |   Task     | |  | |   Task     | |  | |   Task     | |
| +------------+ |  | +------------+ |  | +------------+ |
| +------------+ |  | +------------+ |  | +------------+ |
| |   Cache    | |  | |   Cache    | |  | |   Cache    | |
| +------------+ |  | +------------+ |  | +------------+ |
+----------------+  +----------------+  +----------------+
```

### 2.2 Execution Model

Spark's execution flow:

1. **Application Submission**: User submits application to cluster manager

2. **Task Creation**: Driver converts operations into a Directed Acyclic Graph (DAG) of tasks
   - Logical plan: Sequence of transformations
   - Physical plan: Optimized execution plan

3. **Task Scheduling**: Driver schedules tasks on executors based on data locality

4. **Task Execution**: Executors run tasks and cache data in memory when requested

5. **Result Collection**: Driver collects and combines results from executors

### 2.3 Resilient Distributed Datasets (RDDs)

RDDs are Spark's fundamental data abstraction:

1. **Key Characteristics**:
   - Immutable, partitioned collection of records
   - Can be created through transformations on existing RDDs or from external data
   - Automatically rebuilt on failure using lineage information
   - Can be persisted in memory or disk

2. **RDD Operations**:
   - **Transformations**: Create a new RDD from an existing one (e.g., map, filter, join)
   - **Actions**: Return a value to the driver program (e.g., count, collect, save)

3. **Lazy Evaluation**: Transformations are not computed until an action is called
   - Allows Spark to optimize the execution plan
   - Reduces unnecessary computation

```python
# Example: RDD operations in PySpark
from pyspark.sql import SparkSession

# Initialize Spark session
spark = SparkSession.builder \
    .appName("RDD Example") \
    .getOrCreate()

# Create an RDD from a text file
lines = spark.sparkContext.textFile("hdfs:///data/sample.txt")

# Apply transformations
words = lines.flatMap(lambda line: line.split(" "))
word_counts = words.map(lambda word: (word, 1)) \
                  .reduceByKey(lambda a, b: a + b)

# Cache the result in memory
word_counts.cache()

# Perform actions
top_words = word_counts.takeOrdered(10, key=lambda x: -x[1])
print("Top 10 words:")
for word, count in top_words:
    print(f"{word}: {count}")

# Save results to a file
word_counts.saveAsTextFile("hdfs:///data/word_count_results")

# Stop the Spark session
spark.stop()
```

> **Knowledge Check:** What is the difference between transformations and actions in Spark? Give three examples of each and explain when you would use them.

## 3. Programming with Spark

### 3.1 Spark DataFrames

DataFrames provide a higher-level abstraction than RDDs:

1. **Key Features**:
   - Distributed collection of data organized into named columns
   - Similar to tables in relational databases or data frames in R/Python
   - Built on top of RDDs with additional optimizations
   - Schema-aware data organization

2. **Advantages over RDDs**:
   - Optimized execution through Catalyst optimizer
   - Reduced memory usage with columnar storage
   - Higher-level operations for data manipulation
   - Better integration with data sources

```python
# Example: DataFrame operations in PySpark
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, sum, desc

# Initialize Spark session
spark = SparkSession.builder \
    .appName("DataFrame Example") \
    .getOrCreate()

# Create a DataFrame from a CSV file
employees = spark.read.csv("hdfs:///data/employees.csv", 
                          header=True, 
                          inferSchema=True)

# Show the schema
employees.printSchema()

# Show the first few rows
employees.show(5)

# Select specific columns
employees.select("name", "department", "salary").show(5)

# Filter data
high_salary = employees.filter(col("salary") > 70000)
high_salary.show(5)

# Group and aggregate
dept_stats = employees.groupBy("department") \
    .agg(avg("salary").alias("avg_salary"),
         sum("salary").alias("total_salary"),
         count("*").alias("employee_count"))

# Sort results
dept_stats.orderBy(desc("avg_salary")).show()

# Save results
dept_stats.write.parquet("hdfs:///data/department_stats")

# Stop the Spark session
spark.stop()
```

### 3.2 Spark Datasets

Datasets combine the benefits of RDDs and DataFrames:

1. **Key Features**:
   - Type-safe, object-oriented programming interface
   - Available in Scala and Java (not Python or R)
   - Combines RDD's type safety with DataFrame's optimization

2. **When to Use Datasets**:
   - When you need compile-time type safety
   - When working with complex data processing operations
   - When you want both performance optimizations and type safety

```scala
// Example: Dataset operations in Scala
import org.apache.spark.sql.{Dataset, SparkSession}
import org.apache.spark.sql.functions._

// Define a case class for type safety
case class Employee(id: Int, name: String, department: String, salary: Double)

// Initialize Spark session
val spark = SparkSession.builder()
  .appName("Dataset Example")
  .getOrCreate()

import spark.implicits._

// Create a Dataset from a CSV file
val employees: Dataset[Employee] = spark.read
  .option("header", "true")
  .option("inferSchema", "true")
  .csv("hdfs:///data/employees.csv")
  .as[Employee]

// Type-safe operations
val highSalary = employees.filter(e => e.salary > 70000)

// Mix of Dataset and DataFrame operations
val deptStats = employees
  .groupByKey(e => e.department)
  .agg(
    avg($"salary").as[Double],
    count("*").as[Long]
  )
  .map { case (dept, avgSal, count) => 
    (dept, avgSal, count, if (avgSal > 60000) "High" else "Low") 
  }
  .toDF("department", "avg_salary", "employee_count", "salary_level")

// Show results
deptStats.show()

// Stop the Spark session
spark.stop()
```

### 3.3 Common Transformations and Actions

Key operations for data processing in Spark:

#### Transformations (create a new RDD/DataFrame):

1. **map(func)**: Apply a function to each element
   ```python
   # Convert temperatures from Celsius to Fahrenheit
   temps_f = temps_c.map(lambda c: (c * 9/5) + 32)
   ```

2. **filter(func)**: Select elements that satisfy a condition
   ```python
   # Keep only positive values
   positive = numbers.filter(lambda x: x > 0)
   ```

3. **flatMap(func)**: Similar to map, but each input item can be mapped to 0 or more output items
   ```python
   # Split text into words
   words = lines.flatMap(lambda line: line.split(" "))
   ```

4. **groupByKey()**: Group values by key
   ```python
   # Group employees by department
   dept_employees = employees.map(lambda e: (e.department, e)).groupByKey()
   ```

5. **reduceByKey(func)**: Combine values with the same key
   ```python
   # Sum values by key
   totals = pairs.reduceByKey(lambda a, b: a + b)
   ```

6. **join(other)**: Join two RDDs/DataFrames by key
   ```python
   # Join employees with departments
   employee_dept = employees.join(departments)
   ```

#### Actions (return values to driver or write to storage):

1. **collect()**: Return all elements to the driver
   ```python
   # Get all results (caution: only for small datasets)
   result_list = result_rdd.collect()
   ```

2. **count()**: Return the number of elements
   ```python
   # Count records
   num_records = data.count()
   ```

3. **first()**: Return the first element
   ```python
   # Get the first element
   first_element = data.first()
   ```

4. **take(n)**: Return the first n elements
   ```python
   # Get the first 10 elements
   top_ten = data.take(10)
   ```

5. **reduce(func)**: Aggregate elements using a function
   ```python
   # Sum all values
   total = numbers.reduce(lambda a, b: a + b)
   ```

6. **saveAsTextFile(path)**: Write elements to a text file
   ```python
   # Save results
   results.saveAsTextFile("hdfs:///output/results")
   ```

> **Hands-on Exercise:** Implement a Spark application that analyzes a dataset of your choice. Use at least five different transformations and three different actions. Document your code and explain the purpose of each operation. For example, analyze a dataset of product reviews to find the most common words in positive and negative reviews, or process a dataset of sensor readings to identify anomalies.

## 4. Spark SQL and Structured Data Processing

### 4.1 Introduction to Spark SQL

Spark SQL is a module for structured data processing:

1. **Key Features**:
   - SQL interface for Spark
   - Optimized execution through the Catalyst optimizer
   - Integration with various data sources
   - Seamless mixing of SQL queries with programmatic data manipulation

2. **Components**:
   - DataFrame API
   - SQL query interface
   - Data source API
   - Catalyst optimizer

### 4.2 Working with Spark SQL

Using SQL queries in Spark applications:

```python
# Example: Spark SQL operations
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Spark SQL Example") \
    .getOrCreate()

# Create a DataFrame from a CSV file
sales = spark.read.csv("hdfs:///data/sales.csv", 
                      header=True, 
                      inferSchema=True)

# Register the DataFrame as a temporary view
sales.createOrReplaceTempView("sales")

# Run SQL queries
monthly_sales = spark.sql("""
    SELECT 
        MONTH(date) as month,
        YEAR(date) as year,
        SUM(amount) as total_sales,
        COUNT(DISTINCT customer_id) as unique_customers
    FROM sales
    WHERE year = 2023
    GROUP BY MONTH(date), YEAR(date)
    ORDER BY year, month
""")

# Show results
monthly_sales.show()

# Mix SQL with DataFrame operations
top_products = spark.sql("""
    SELECT 
        product_id,
        SUM(quantity) as total_quantity,
        SUM(amount) as total_revenue
    FROM sales
    GROUP BY product_id
""")

# Continue with DataFrame operations
top_products_filtered = top_products.filter(col("total_revenue") > 10000) \
    .orderBy(col("total_revenue").desc())

top_products_filtered.show(10)

# Stop the Spark session
spark.stop()
```

### 4.3 Data Sources

Spark SQL can read from and write to various data sources:

1. **Built-in Data Sources**:
   - CSV, JSON, Parquet, ORC, Avro
   - JDBC (relational databases)
   - Text files
   - Hive tables

2. **External Data Sources**:
   - Cassandra, HBase, MongoDB
   - Elasticsearch
   - Amazon S3, Azure Blob Storage
   - Delta Lake

```python
# Example: Working with different data sources
from pyspark.sql import SparkSession

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Data Sources Example") \
    .config("spark.jars.packages", "org.apache.spark:spark-avro_2.12:3.1.2") \
    .getOrCreate()

# Read from CSV
csv_data = spark.read \
    .option("header", "true") \
    .option("inferSchema", "true") \
    .csv("hdfs:///data/customers.csv")

# Read from JSON
json_data = spark.read \
    .option("multiline", "true") \
    .json("hdfs:///data/products.json")

# Read from Parquet
parquet_data = spark.read \
    .parquet("hdfs:///data/transactions.parquet")

# Read from a database using JDBC
jdbc_data = spark.read \
    .format("jdbc") \
    .option("url", "jdbc:postgresql://localhost:5432/mydatabase") \
    .option("dbtable", "employees") \
    .option("user", "username") \
    .option("password", "password") \
    .load()

# Write to Parquet
csv_data.write \
    .mode("overwrite") \
    .parquet("hdfs:///data/customers.parquet")

# Write to Avro
json_data.write \
    .format("avro") \
    .mode("overwrite") \
    .save("hdfs:///data/products.avro")

# Write to a database
parquet_data.write \
    .format("jdbc") \
    .option("url", "jdbc:postgresql://localhost:5432/mydatabase") \
    .option("dbtable", "transactions") \
    .option("user", "username") \
    .option("password", "password") \
    .mode("append") \
    .save()

# Stop the Spark session
spark.stop()
```

### 4.4 Performance Optimization

Techniques for optimizing Spark SQL performance:

1. **Catalyst Optimizer**:
   - Logical plan optimization
   - Physical plan optimization
   - Code generation

2. **Tungsten Execution Engine**:
   - Memory management optimization
   - Cache-aware computation
   - Code generation

3. **Optimization Techniques**:
   - Predicate pushdown
   - Column pruning
   - Partition pruning
   - Join optimization

```python
# Example: Performance optimization techniques
from pyspark.sql import SparkSession
from pyspark.sql.functions import col

# Initialize Spark session with performance configurations
spark = SparkSession.builder \
    .appName("Performance Optimization") \
    .config("spark.sql.adaptive.enabled", "true") \
    .config("spark.sql.adaptive.coalescePartitions.enabled", "true") \
    .config("spark.sql.shuffle.partitions", "200") \
    .getOrCreate()

# Read a partitioned dataset (partition pruning)
sales = spark.read \
    .option("header", "true") \
    .option("inferSchema", "true") \
    .parquet("hdfs:///data/sales_partitioned")

# Column pruning (select only needed columns)
filtered_sales = sales.select("date", "customer_id", "product_id", "amount")

# Predicate pushdown (filter early)
filtered_sales = filtered_sales.filter(
    (col("date") >= "2023-01-01") & 
    (col("date") <= "2023-12-31")
)

# Cache frequently used data
filtered_sales.cache()

# Repartition to optimize joins
customers = spark.read.parquet("hdfs:///data/customers")
optimized_customers = customers.repartition(col("customer_id"))

# Broadcast join for small tables
products = spark.read.parquet("hdfs:///data/products")
results = filtered_sales.join(
    spark.broadcast(products),
    filtered_sales.product_id == products.id
)

# Show execution plan
results.explain(True)

# Stop the Spark session
spark.stop()
```

> **Knowledge Check:** Identify three performance optimization techniques in Spark SQL and explain how each one improves query performance. When would you use each technique?

## 5. Machine Learning with MLlib

### 5.1 Introduction to MLlib

MLlib is Spark's machine learning library:

1. **Key Features**:
   - Scalable machine learning algorithms
   - Feature extraction and transformation
   - Model evaluation and tuning
   - Pipeline API for workflow management

2. **Supported Algorithms**:
   - Classification: Logistic regression, decision trees, random forests, etc.
   - Regression: Linear regression, generalized linear regression, etc.
   - Clustering: K-means, Gaussian mixture models, etc.
   - Recommendation: Collaborative filtering
   - Dimensionality reduction: PCA, SVD, etc.

### 5.2 ML Pipelines

Spark's ML Pipelines API for building machine learning workflows:

1. **Components**:
   - **Transformer**: Converts one DataFrame to another (e.g., feature transformer, model)
   - **Estimator**: Algorithm that can be fit on a DataFrame to produce a Transformer (e.g., a learning algorithm)
   - **Pipeline**: Chain of Transformers and Estimators
   - **Parameter**: Named parameter with default value

2. **Workflow**:
   - Data preparation and feature engineering
   - Model training
   - Model evaluation
   - Model tuning
   - Model deployment

```python
# Example: ML Pipeline for classification
from pyspark.sql import SparkSession
from pyspark.ml import Pipeline
from pyspark.ml.classification import RandomForestClassifier
from pyspark.ml.feature import VectorAssembler, StringIndexer, OneHotEncoder
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator

# Initialize Spark session
spark = SparkSession.builder \
    .appName("ML Pipeline Example") \
    .getOrCreate()

# Load data
data = spark.read.csv("hdfs:///data/customer_churn.csv", 
                     header=True, 
                     inferSchema=True)

# Split data into training and test sets
train_data, test_data = data.randomSplit([0.8, 0.2], seed=42)

# Feature engineering
# 1. Convert categorical features to indices
gender_indexer = StringIndexer(
    inputCol="gender", 
    outputCol="genderIndex"
)

# 2. Convert indexed categories to one-hot encoded features
gender_encoder = OneHotEncoder(
    inputCol="genderIndex", 
    outputCol="genderVec"
)

# 3. Assemble features into a single vector
feature_cols = ["age", "income", "genderVec", "usage_months", "monthly_bill"]
assembler = VectorAssembler(
    inputCols=feature_cols, 
    outputCol="features"
)

# 4. Define the model
rf = RandomForestClassifier(
    labelCol="churn",
    featuresCol="features",
    numTrees=100
)

# 5. Create the pipeline
pipeline = Pipeline(stages=[
    gender_indexer,
    gender_encoder,
    assembler,
    rf
])

# 6. Define parameter grid for tuning
paramGrid = ParamGridBuilder() \
    .addGrid(rf.maxDepth, [5, 10, 15]) \
    .addGrid(rf.minInstancesPerNode, [1, 2, 4]) \
    .addGrid(rf.numTrees, [20, 50, 100]) \
    .build()

# 7. Define evaluator
evaluator = MulticlassClassificationEvaluator(
    labelCol="churn",
    predictionCol="prediction",
    metricName="accuracy"
)

# 8. Create cross-validator
cv = CrossValidator(
    estimator=pipeline,
    estimatorParamMaps=paramGrid,
    evaluator=evaluator,
    numFolds=3
)

# 9. Train the model
cv_model = cv.fit(train_data)

# 10. Make predictions on test data
predictions = cv_model.transform(test_data)

# 11. Evaluate the model
accuracy = evaluator.evaluate(predictions)
print(f"Accuracy: {accuracy}")

# 12. Show feature importance
best_model = cv_model.bestModel.stages[-1]
feature_importance = best_model.featureImportances
for i, importance in enumerate(feature_importance):
    print(f"Feature {feature_cols[i]}: {importance}")

# Stop the Spark session
spark.stop()
```

### 5.3 Feature Engineering

Preparing data for machine learning:

1. **Feature Extraction**:
   - Text tokenization and TF-IDF
   - Word2Vec for text embedding
   - Image feature extraction

2. **Feature Transformation**:
   - Normalization and standardization
   - Bucketization and binning
   - One-hot encoding
   - Polynomial expansion

3. **Feature Selection**:
   - Chi-square selector
   - Variance threshold
   - Feature importance from tree-based models

```python
# Example: Feature engineering for text data
from pyspark.sql import SparkSession
from pyspark.ml.feature import Tokenizer, StopWordsRemover, HashingTF, IDF
from pyspark.ml import Pipeline

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Text Feature Engineering") \
    .getOrCreate()

# Sample data
data = spark.createDataFrame([
    (0, "Spark is a fast and general engine for large-scale data processing"),
    (1, "Machine learning is a method of data analysis"),
    (2, "Spark MLlib is the machine learning library for Spark")
], ["id", "text"])

# Feature engineering pipeline
tokenizer = Tokenizer(inputCol="text", outputCol="words")
remover = StopWordsRemover(inputCol="words", outputCol="filtered")
hashingTF = HashingTF(inputCol="filtered", outputCol="rawFeatures", numFeatures=20)
idf = IDF(inputCol="rawFeatures", outputCol="features")

# Create and run the pipeline
pipeline = Pipeline(stages=[tokenizer, remover, hashingTF, idf])
model = pipeline.fit(data)
result = model.transform(data)

# Show results
result.select("id", "text", "features").show(truncate=False)

# Stop the Spark session
spark.stop()
```

> **Hands-on Exercise:** Implement a complete machine learning pipeline in Spark to solve a classification or regression problem. Use a dataset of your choice, perform feature engineering, train a model, tune hyperparameters, and evaluate the model's performance. Document your approach, including the rationale for your feature engineering steps and model selection.

## 6. Spark Streaming

### 6.1 Introduction to Spark Streaming

Spark Streaming enables processing of real-time data streams:

1. **Key Features**:
   - Micro-batch processing model
   - Exactly-once semantics
   - Integration with various data sources
   - Unified programming model with batch processing

2. **Streaming Models**:
   - **DStream API**: Original streaming API based on RDDs
   - **Structured Streaming**: Newer API based on DataFrames

### 6.2 Structured Streaming

Processing streaming data with the DataFrame API:

1. **Programming Model**:
   - Treat streaming data as a continuously appended table
   - Apply the same operations as static DataFrames
   - Results updated continuously as new data arrives

2. **Output Modes**:
   - **Append**: Only add new rows to the result table
   - **Complete**: Rewrite the full result table
   - **Update**: Only update changed rows in the result table

3. **Supported Operations**:
   - Selection, projection, and aggregation
   - Joins (stream-static and stream-stream)
   - Window operations
   - Watermarking for handling late data

```python
# Example: Structured Streaming with socket source
from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, split, window, count

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Structured Streaming Example") \
    .getOrCreate()

# Create streaming DataFrame from socket source
lines = spark \
    .readStream \
    .format("socket") \
    .option("host", "localhost") \
    .option("port", 9999) \
    .load()

# Split lines into words
words = lines.select(
    explode(split(lines.value, " ")).alias("word")
)

# Count words
word_counts = words.groupBy("word").count()

# Start the query
query = word_counts \
    .writeStream \
    .outputMode("complete") \
    .format("console") \
    .start()

# Wait for the query to terminate
query.awaitTermination()

# Stop the Spark session
spark.stop()
```

### 6.3 Windowed Operations

Processing data in time windows:

```python
# Example: Windowed operations in Structured Streaming
from pyspark.sql import SparkSession
from pyspark.sql.functions import window, col, count, avg
from pyspark.sql.types import StructType, StructField, StringType, TimestampType, DoubleType

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Windowed Streaming") \
    .getOrCreate()

# Define schema for sensor data
schema = StructType([
    StructField("device_id", StringType(), True),
    StructField("timestamp", TimestampType(), True),
    StructField("temperature", DoubleType(), True)
])

# Create streaming DataFrame from Kafka source
sensor_data = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "sensors") \
    .load() \
    .select(col("value").cast("string")) \
    .select(from_json(col("value"), schema).alias("data")) \
    .select("data.*")

# Calculate average temperature by device in 5-minute windows
windowed_avg = sensor_data \
    .withWatermark("timestamp", "10 minutes") \
    .groupBy(
        window(col("timestamp"), "5 minutes"),
        col("device_id")
    ) \
    .agg(
        count("*").alias("reading_count"),
        avg("temperature").alias("avg_temperature")
    )

# Start the query
query = windowed_avg \
    .writeStream \
    .outputMode("append") \
    .format("console") \
    .option("truncate", "false") \
    .start()

# Wait for the query to terminate
query.awaitTermination()

# Stop the Spark session
spark.stop()
```

### 6.4 Streaming Sources and Sinks

Connecting Spark Streaming to external systems:

1. **Sources**:
   - File sources (reading from directories)
   - Kafka
   - Socket
   - Rate source (for testing)
   - Custom sources

2. **Sinks**:
   - File sink
   - Kafka sink
   - Console sink (for debugging)
   - Memory sink (for testing)
   - Foreach sink (for custom output logic)
   - Custom sinks

```python
# Example: Multiple streaming sources and sinks
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, from_json, to_json, struct

# Initialize Spark session
spark = SparkSession.builder \
    .appName("Streaming Sources and Sinks") \
    .getOrCreate()

# Read from Kafka
kafka_stream = spark \
    .readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "input-topic") \
    .load()

# Read from files in a directory
file_stream = spark \
    .readStream \
    .format("csv") \
    .option("header", "true") \
    .schema(schema) \
    .load("hdfs:///data/incoming/")

# Process Kafka stream
processed_kafka = kafka_stream \
    .select(col("value").cast("string")) \
    .select(from_json(col("value"), schema).alias("data")) \
    .select("data.*") \
    .filter(col("value") > 100)

# Process file stream
processed_files = file_stream \
    .filter(col("status") == "active") \
    .groupBy("category") \
    .count()

# Write to console for debugging
console_query = processed_kafka \
    .writeStream \
    .outputMode("append") \
    .format("console") \
    .start()

# Write to Kafka
kafka_query = processed_kafka \
    .select(to_json(struct("*")).alias("value")) \
    .writeStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("topic", "output-topic") \
    .option("checkpointLocation", "hdfs:///checkpoints/kafka") \
    .start()

# Write to files
file_query = processed_files \
    .writeStream \
    .format("parquet") \
    .option("path", "hdfs:///data/processed") \
    .option("checkpointLocation", "hdfs:///checkpoints/files") \
    .partitionBy("category") \
    .start()

# Wait for queries to terminate
spark.streams.awaitAnyTermination()

# Stop the Spark session
spark.stop()
```

> **Knowledge Check:** Compare batch processing with stream processing in Spark. What are the key differences in terms of programming model, execution, and use cases? When would you choose one over the other?

## 7. Spark Performance Tuning

### 7.1 Resource Allocation

Configuring resources for Spark applications:

1. **Driver and Executor Memory**:
   - `spark.driver.memory`: Memory for driver (default: 1g)
   - `spark.executor.memory`: Memory for each executor (default: 1g)

2. **CPU Allocation**:
   - `spark.executor.cores`: Cores per executor (default: all available)
   - `spark.cores.max`: Maximum total cores for application

3. **Number of Executors**:
   - `spark.executor.instances`: Number of executors to launch

```bash
# Example: Spark submit with resource configuration
spark-submit \
  --class com.example.SparkApp \
  --master yarn \
  --deploy-mode cluster \
  --driver-memory 4g \
  --executor-memory 8g \
  --executor-cores 4 \
  --num-executors 10 \
  --conf spark.dynamicAllocation.enabled=true \
  --conf spark.shuffle.service.enabled=true \
  path/to/application.jar
```

### 7.2 Data Serialization

Optimizing data transfer between nodes:

1. **Serialization Formats**:
   - Java serialization (default)
   - Kryo serialization (faster but requires registration)

2. **Compression**:
   - `spark.io.compression.codec`: Codec for compression (lz4, snappy, zstd)
   - `spark.shuffle.compress`: Whether to compress shuffle outputs
   - `spark.broadcast.compress`: Whether to compress broadcast variables

```python
# Example: Configuring Kryo serialization
from pyspark.sql import SparkSession

# Initialize Spark session with Kryo serialization
spark = SparkSession.builder \
    .appName("Kryo Serialization") \
    .config("spark.serializer", "org.apache.spark.serializer.KryoSerializer") \
    .config("spark.kryo.registrationRequired", "false") \
    .config("spark.kryo.registrator", "com.example.MyKryoRegistrator") \
    .getOrCreate()

# Application code
# ...

# Stop the Spark session
spark.stop()
```

### 7.3 Memory Management

Optimizing memory usage in Spark:

1. **Memory Fractions**:
   - `spark.memory.fraction`: Fraction of heap used for execution and storage (default: 0.6)
   - `spark.memory.storageFraction`: Amount of storage memory immune to eviction (default: 0.5)

2. **Caching Strategies**:
   - `MEMORY_ONLY`: Store RDDs as deserialized Java objects
   - `MEMORY_AND_DISK`: Spill to disk if memory is insufficient
   - `MEMORY_ONLY_SER`: Store RDDs as serialized data
   - `OFF_HEAP`: Store in off-heap memory (requires configuration)

```python
# Example: Memory management and caching
from pyspark.sql import SparkSession
from pyspark.storagelevel import StorageLevel

# Initialize Spark session with memory configuration
spark = SparkSession.builder \
    .appName("Memory Management") \
    .config("spark.memory.fraction", "0.8") \
    .config("spark.memory.storageFraction", "0.3") \
    .getOrCreate()

# Load and cache data with different storage levels
data1 = spark.read.parquet("hdfs:///data/frequent_access.parquet")
data1.persist(StorageLevel.MEMORY_ONLY)  # Cache in memory only

data2 = spark.read.parquet("hdfs:///data/large_dataset.parquet")
data2.persist(StorageLevel.MEMORY_AND_DISK)  # Cache in memory, spill to disk if needed

data3 = spark.read.parquet("hdfs:///data/serialized_access.parquet")
data3.persist(StorageLevel.MEMORY_ONLY_SER)  # Cache as serialized objects

# Use the cached data
result1 = data1.filter(data1.value > 100).count()
result2 = data2.groupBy("category").count()
result3 = data3.join(data1, "id").count()

# Unpersist when no longer needed
data1.unpersist()
data2.unpersist()
data3.unpersist()

# Stop the Spark session
spark.stop()
```

### 7.4 Shuffle Optimization

Optimizing the shuffle phase in Spark:

1. **Shuffle Configuration**:
   - `spark.shuffle.file.buffer`: Buffer size for shuffle file output (default: 32k)
   - `spark.reducer.maxSizeInFlight`: Maximum size of map outputs to fetch simultaneously (default: 48m)
   - `spark.shuffle.io.maxRetries`: Max retries for I/O exceptions (default: 3)

2. **Partition Tuning**:
   - `spark.sql.shuffle.partitions`: Number of partitions for shuffling (default: 200)
   - `spark.default.parallelism`: Default number of partitions in RDDs

3. **Optimization Techniques**:
   - Avoid unnecessary shuffles
   - Use broadcast joins for small tables
   - Repartition data appropriately
   - Use appropriate join strategies

```python
# Example: Shuffle optimization
from pyspark.sql import SparkSession
from pyspark.sql.functions import broadcast, col

# Initialize Spark session with shuffle configuration
spark = SparkSession.builder \
    .appName("Shuffle Optimization") \
    .config("spark.sql.shuffle.partitions", "400") \
    .config("spark.shuffle.file.buffer", "64k") \
    .config("spark.reducer.maxSizeInFlight", "96m") \
    .getOrCreate()

# Load data
large_table = spark.read.parquet("hdfs:///data/large_table.parquet")
small_table = spark.read.parquet("hdfs:///data/small_table.parquet")

# Repartition large table by join key to optimize shuffle
large_table_optimized = large_table.repartition(400, "join_key")

# Use broadcast join to avoid shuffle for small table
result = large_table_optimized.join(
    broadcast(small_table),
    large_table_optimized.join_key == small_table.id
)

# Show execution plan
result.explain()

# Stop the Spark session
spark.stop()
```

> **Hands-on Exercise:** Take an existing Spark application and optimize its performance. Identify bottlenecks using Spark UI, apply appropriate tuning techniques (resource allocation, caching, shuffle optimization, etc.), and measure the improvement in execution time. Document your optimization process and the results achieved.

## Summary

In this chapter, we've explored Apache Spark, a powerful unified analytics engine for big data processing:

- Spark's architecture and how it differs from Hadoop MapReduce
- Programming with RDDs, DataFrames, and Datasets
- Structured data processing with Spark SQL
- Machine learning capabilities with MLlib
- Real-time data processing with Spark Streaming
- Performance tuning techniques for Spark applications

Spark has become a cornerstone of modern big data processing due to its speed, ease of use, and versatility. By understanding Spark's capabilities and best practices, you can build efficient, scalable data processing applications for a wide range of use cases, from batch analytics to real-time processing and machine learning.

## Additional Resources

### Books
- "Learning Spark" by Jules Damji, Brooke Wenig, Tathagata Das, and Denny Lee
- "Spark: The Definitive Guide" by Bill Chambers and Matei Zaharia
- "High Performance Spark" by Holden Karau and Rachel Warren
- "Advanced Analytics with Spark" by Sandy Ryza, Uri Laserson, Sean Owen, and Josh Wills

### Online Resources
- [Apache Spark Documentation](https://spark.apache.org/docs/latest/)
- [Databricks Blog](https://databricks.com/blog)
- [Spark by Examples](https://sparkbyexamples.com/)
- [Spark SQL, DataFrames and Datasets Guide](https://spark.apache.org/docs/latest/sql-programming-guide.html)

### Practice Platforms
- [Databricks Community Edition](https://community.cloud.databricks.com/)
- [Google Colab with PySpark](https://colab.research.google.com/)
- [AWS EMR](https://aws.amazon.com/emr/)
- [Azure Databricks](https://azure.microsoft.com/en-us/services/databricks/)

## Next Steps

In the next chapter, we'll explore NoSQL databases and their role in big data architectures. We'll cover different types of NoSQL databases (document, key-value, column-family, and graph), their use cases, and how to integrate them with big data processing frameworks like Spark.

---

## Chapter Quiz

Test your understanding of Apache Spark concepts:

1. What are the key advantages of Spark over Hadoop MapReduce?
2. Explain the difference between transformations and actions in Spark. Give examples of each.
3. When would you use a DataFrame instead of an RDD in Spark?
4. How does Spark achieve fault tolerance for RDDs?
5. What is the purpose of the Catalyst optimizer in Spark SQL?

Good luck!
