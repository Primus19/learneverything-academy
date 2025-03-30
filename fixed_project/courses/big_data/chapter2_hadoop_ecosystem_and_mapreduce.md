# Hadoop Ecosystem and MapReduce

In this chapter, we'll explore the Apache Hadoop ecosystem and the MapReduce programming model. Hadoop revolutionized big data processing by providing a framework for distributed storage and computation across clusters of commodity hardware. Understanding Hadoop and MapReduce is essential for working with large-scale data processing applications.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the core components of the Hadoop ecosystem
2. Explain the architecture and functionality of HDFS
3. Implement MapReduce algorithms for distributed data processing
4. Configure and run Hadoop jobs
5. Utilize key Hadoop ecosystem tools for specific data processing tasks

## 1. Introduction to the Hadoop Ecosystem

### 1.1 Hadoop Core Components

Apache Hadoop consists of several core components that work together to provide a complete big data processing solution:

1. **Hadoop Distributed File System (HDFS)**: A distributed file system designed to run on commodity hardware, providing high-throughput access to application data.

2. **Hadoop YARN (Yet Another Resource Negotiator)**: A resource management platform responsible for managing computing resources in clusters and using them for scheduling users' applications.

3. **Hadoop MapReduce**: A programming model for large-scale data processing using parallel, distributed algorithms on a cluster.

4. **Hadoop Common**: The common utilities that support the other Hadoop modules.

```
# Hadoop Ecosystem Architecture (ASCII Diagram)

+-----------------------------------------------------+
|                  Client Applications                 |
+-----------------------------------------------------+
                          |
+-----------------------------------------------------+
|                    Hadoop Core                       |
|  +----------------+  +----------------+             |
|  |      HDFS      |  |      YARN      |             |
|  | (Storage Layer)|  |(Resource Mgmt) |             |
|  +----------------+  +----------------+             |
|  +----------------+  +----------------+             |
|  |   MapReduce    |  |  Hadoop Common |             |
|  | (Processing)   |  |   (Utilities)  |             |
|  +----------------+  +----------------+             |
+-----------------------------------------------------+
                          |
+-----------------------------------------------------+
|                 Hadoop Ecosystem                     |
|  +----------+  +--------+  +-------+  +---------+   |
|  |   Hive   |  |  Pig   |  | HBase |  |  Sqoop  |   |
|  +----------+  +--------+  +-------+  +---------+   |
|  +----------+  +--------+  +-------+  +---------+   |
|  |  Oozie   |  | Flume  |  | Kafka |  |  Spark  |   |
|  +----------+  +--------+  +-------+  +---------+   |
+-----------------------------------------------------+
```

### 1.2 Hadoop Ecosystem Tools

Beyond the core components, the Hadoop ecosystem includes numerous tools that extend its capabilities:

1. **Data Ingestion**
   - **Apache Flume**: Collects, aggregates, and moves large amounts of log data
   - **Apache Sqoop**: Transfers data between Hadoop and relational databases
   - **Apache Kafka**: Distributed streaming platform for building real-time data pipelines

2. **Data Processing**
   - **Apache Pig**: High-level platform for creating MapReduce programs
   - **Apache Hive**: Data warehouse infrastructure for data summarization, query, and analysis
   - **Apache Spark**: Fast, in-memory data processing engine

3. **Data Storage**
   - **Apache HBase**: Non-relational, distributed database for random, real-time read/write access
   - **Apache Cassandra**: Highly scalable, high-performance distributed database

4. **Workflow Management**
   - **Apache Oozie**: Workflow scheduler system to manage Hadoop jobs
   - **Apache Airflow**: Platform to programmatically author, schedule, and monitor workflows

5. **Data Governance and Security**
   - **Apache Atlas**: Data governance and metadata framework
   - **Apache Ranger**: Framework to enable, monitor, and manage comprehensive data security
   - **Apache Knox**: Gateway providing a single point of secure access for Hadoop clusters

> **Knowledge Check:** Match each of the following use cases with the most appropriate Hadoop ecosystem tool:
> - Scheduling a series of interdependent Hadoop jobs to run daily
> - Importing data from a MySQL database into HDFS
> - Creating a SQL-like interface for data analysts to query HDFS data
> - Building a real-time data pipeline for streaming events

### 1.3 Hadoop Distributions

Several vendors provide Hadoop distributions with additional features, support, and management tools:

1. **Apache Hadoop**: The original open-source project
2. **Cloudera**: Enterprise data platform with advanced management and security features
3. **Hortonworks** (now part of Cloudera): Open-source focused distribution
4. **Amazon EMR**: Cloud-based Hadoop framework on AWS
5. **Google Dataproc**: Managed Spark and Hadoop service on Google Cloud
6. **Microsoft HDInsight**: Hadoop distribution on Azure

```bash
# Example: Starting a Hadoop cluster on Amazon EMR
aws emr create-cluster \
    --name "My Hadoop Cluster" \
    --release-label emr-6.3.0 \
    --applications Name=Hadoop Name=Hive Name=Spark \
    --ec2-attributes KeyName=myKey \
    --instance-type m5.xlarge \
    --instance-count 3 \
    --use-default-roles
```

## 2. Hadoop Distributed File System (HDFS)

### 2.1 HDFS Architecture

HDFS is designed to reliably store very large files across machines in a large cluster:

1. **NameNode**: The master server that manages the file system namespace and regulates access to files by clients
   - Maintains the file system tree and metadata for all files and directories
   - Records changes to the file system namespace
   - Determines the mapping of blocks to DataNodes

2. **DataNodes**: The slave nodes that store the actual data blocks
   - Serve read and write requests from clients
   - Perform block creation, deletion, and replication upon instruction from the NameNode
   - Send heartbeats to the NameNode to confirm they are operating correctly

3. **Secondary NameNode**: Performs periodic checkpoints of the namespace
   - Not a backup or standby for the NameNode
   - Helps prevent the edit log from becoming too large
   - Maintains a merged copy of the edit log

```
# HDFS Architecture (ASCII Diagram)

+----------------+      Metadata Operations      +----------------+
|    Client      |<-------------------------->   |   NameNode     |
+----------------+                               +----------------+
        |                                                |
        |                                                |
        |                                                |
        |        +---------------------------------------|
        |        |                                       |
        v        v                                       v
+----------------+     +----------------+     +----------------+
|   DataNode 1   |     |   DataNode 2   |     |   DataNode 3   |
+----------------+     +----------------+     +----------------+
|   Block 1-1    |     |   Block 1-2    |     |   Block 1-3    |
|   Block 2-1    |     |   Block 3-2    |     |   Block 2-3    |
|   Block 3-1    |     |   Block 4-2    |     |   Block 4-3    |
+----------------+     +----------------+     +----------------+
        ^                      ^                      ^
        |                      |                      |
        +----------------------|----------------------+
                               |
                        Data Operations
                               |
                               v
                        +----------------+
                        |    Client      |
                        +----------------+
```

### 2.2 HDFS Features

Key characteristics that make HDFS suitable for big data:

1. **Fault Tolerance**
   - Data is replicated across multiple DataNodes (default replication factor is 3)
   - If a DataNode fails, data can be read from other replicas
   - Automatic re-replication when replication factor falls below threshold

2. **High Throughput**
   - Designed for batch processing rather than interactive use
   - Optimized for large streaming reads and writes
   - Data locality optimization reduces network congestion

3. **Large Datasets**
   - Supports files that are gigabytes to terabytes in size
   - A single HDFS instance can scale to hundreds of nodes and petabytes of storage
   - Automatic handling of hardware failure

4. **Simple Coherency Model**
   - Write-once-read-many access model
   - Files cannot be modified after creation (except for appends)
   - Simplifies data coherency and enables high throughput

### 2.3 Working with HDFS

Common operations for interacting with HDFS:

```bash
# Basic HDFS commands

# List files in HDFS
hdfs dfs -ls /user/hadoop

# Create a directory
hdfs dfs -mkdir /user/hadoop/new_dir

# Copy a local file to HDFS
hdfs dfs -put localfile.txt /user/hadoop/

# Copy a file from HDFS to local filesystem
hdfs dfs -get /user/hadoop/hdfsfile.txt local_copy.txt

# View file content
hdfs dfs -cat /user/hadoop/hdfsfile.txt

# Remove a file
hdfs dfs -rm /user/hadoop/unwanted_file.txt

# Check disk usage
hdfs dfs -du -h /user/hadoop

# View file block locations
hdfs fsck /user/hadoop/hdfsfile.txt -files -blocks -locations
```

Using HDFS with Java API:

```java
// Example: Writing a file to HDFS using Java API
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.io.IOException;

public class HDFSWriter {
    public static void main(String[] args) throws IOException {
        // Create configuration
        Configuration conf = new Configuration();
        conf.set("fs.defaultFS", "hdfs://localhost:9000");
        
        // Get filesystem instance
        FileSystem fs = FileSystem.get(conf);
        
        // Specify file path
        Path file = new Path("/user/hadoop/example.txt");
        
        // Create file and write content
        if (fs.exists(file)) {
            fs.delete(file, true);
        }
        
        BufferedWriter br = new BufferedWriter(
            new OutputStreamWriter(fs.create(file, true))
        );
        
        // Write to file
        br.write("This is an example text written to HDFS.");
        br.newLine();
        br.close();
        
        System.out.println("File written successfully");
    }
}
```

> **Hands-on Exercise:** Set up a single-node Hadoop cluster on your local machine or a cloud instance. Practice basic HDFS operations including creating directories, uploading files, listing contents, and retrieving files. Write a simple Java program to read and write files to HDFS.

## 3. MapReduce Programming Model

### 3.1 MapReduce Concepts

MapReduce is a programming model for processing and generating large datasets with a parallel, distributed algorithm on a cluster:

1. **Map Phase**: Each worker node applies the map function to local data and writes the output to temporary storage
   - Input: Key-value pairs
   - Process: Apply function to each pair
   - Output: Intermediate key-value pairs

2. **Shuffle and Sort Phase**: The system groups all intermediate values associated with the same intermediate key
   - Automatically performed by the framework
   - Redistributes data based on the keys
   - Sorts the intermediate keys

3. **Reduce Phase**: Each worker node processes each group of intermediate data per key in parallel
   - Input: Key and list of values for that key
   - Process: Combine values into smaller set
   - Output: Final key-value pairs

```
# MapReduce Data Flow (ASCII Diagram)

Input Data:    [Split 1]   [Split 2]   [Split 3]   [Split 4]
                  |           |           |           |
                  v           v           v           v
Map:           (Map 1)     (Map 2)     (Map 3)     (Map 4)
                  |           |           |           |
                  v           v           v           v
Intermediate:  [k1,v1]     [k2,v2]     [k1,v3]     [k3,v4]
                  |           |           |           |
                  +-----+-----+           +-----+-----+
                        |                       |
                        v                       v
Shuffle & Sort:  [k1,[v1,v3]]             [k2,[v2]]
                        |                       |
                        |                 [k3,[v4]]
                        |                       |
                        v                       v
Reduce:         (Reduce 1)                 (Reduce 2)
                        |                       |
                        v                       v
Output:         [k1,result1]              [k2,result2]
                                          [k3,result3]
```

### 3.2 MapReduce Example: Word Count

The classic "Hello World" of MapReduce - counting word occurrences in a text:

```java
// Example: Word Count in MapReduce
import java.io.IOException;
import java.util.StringTokenizer;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;

public class WordCount {

    // Mapper class
    public static class TokenizerMapper
            extends Mapper<Object, Text, Text, IntWritable> {

        private final static IntWritable one = new IntWritable(1);
        private Text word = new Text();

        public void map(Object key, Text value, Context context)
                throws IOException, InterruptedException {
            // Split input text into words
            StringTokenizer itr = new StringTokenizer(value.toString());
            while (itr.hasMoreTokens()) {
                word.set(itr.nextToken());
                // Emit each word with count 1
                context.write(word, one);
            }
        }
    }

    // Reducer class
    public static class IntSumReducer
            extends Reducer<Text, IntWritable, Text, IntWritable> {

        private IntWritable result = new IntWritable();

        public void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {
            int sum = 0;
            // Sum all counts for the same word
            for (IntWritable val : values) {
                sum += val.get();
            }
            result.set(sum);
            // Emit word with total count
            context.write(key, result);
        }
    }

    public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "word count");
        
        job.setJarByClass(WordCount.class);
        job.setMapperClass(TokenizerMapper.class);
        job.setCombinerClass(IntSumReducer.class);
        job.setReducerClass(IntSumReducer.class);
        
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        
        FileInputFormat.addInputPath(job, new Path(args[0]));
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
}
```

Step-by-step explanation of the Word Count example:

1. **Map Phase**:
   - Input: Text documents split into lines
   - Process: Split each line into words and emit (word, 1) pairs
   - Example: "Hello world" → [("Hello", 1), ("world", 1)]

2. **Shuffle and Sort Phase**:
   - Group values by keys (words)
   - Example: ("Hello", [1, 1, 1]), ("world", [1, 1])

3. **Reduce Phase**:
   - Input: Word and list of counts
   - Process: Sum the counts for each word
   - Output: Word with total count
   - Example: ("Hello", 3), ("world", 2)

### 3.3 MapReduce Job Configuration

Setting up and configuring MapReduce jobs:

```java
// Example: Configuring a MapReduce job
Configuration conf = new Configuration();

// Set job-specific configuration
conf.set("mapreduce.job.reduces", "5");  // Number of reducers
conf.set("mapreduce.map.memory.mb", "2048");  // Memory for each mapper
conf.set("mapreduce.reduce.memory.mb", "3072");  // Memory for each reducer

// Create and configure job
Job job = Job.getInstance(conf, "custom job");
job.setJarByClass(CustomJob.class);

// Set mapper and reducer classes
job.setMapperClass(CustomMapper.class);
job.setReducerClass(CustomReducer.class);

// Optionally set combiner class (for local aggregation)
job.setCombinerClass(CustomCombiner.class);

// Set output key and value classes
job.setOutputKeyClass(Text.class);
job.setOutputValueClass(IntWritable.class);

// If mapper output types differ from job output types
job.setMapOutputKeyClass(Text.class);
job.setMapOutputValueClass(CustomWritable.class);

// Set input and output formats
job.setInputFormatClass(TextInputFormat.class);
job.setOutputFormatClass(SequenceFileOutputFormat.class);

// Set input and output paths
FileInputFormat.addInputPath(job, new Path("/input/path"));
FileOutputFormat.setOutputPath(job, new Path("/output/path"));

// Submit job and wait for completion
boolean success = job.waitForCompletion(true);
```

### 3.4 Advanced MapReduce Concepts

Beyond the basics of MapReduce:

1. **Combiners**: Mini-reducers that run on the map output to reduce data transfer
   - Improves efficiency by performing local aggregation
   - Must be commutative and associative operations
   - Example: In word count, combining counts locally before sending to reducers

2. **Partitioners**: Determine which reducer receives which keys
   - Default: Hash partitioning based on key's hash code
   - Custom partitioners for specific data distribution needs
   - Example: Ensuring related data goes to the same reducer

3. **Input and Output Formats**:
   - Control how data is read and written
   - Built-in formats for text, key-value pairs, sequence files, etc.
   - Custom formats for specialized data types

4. **Counters**: Track statistics about job execution
   - Built-in counters for input/output records, bytes, etc.
   - Custom counters for application-specific metrics
   - Useful for monitoring and debugging

```java
// Example: Custom Partitioner for MapReduce
public class CustomPartitioner extends Partitioner<Text, IntWritable> {
    @Override
    public int getPartition(Text key, IntWritable value, int numReduceTasks) {
        String word = key.toString();
        
        // Send words starting with A-M to first half of reducers
        // and words starting with N-Z to second half
        if (numReduceTasks == 0) {
            return 0;
        }
        
        char firstChar = word.charAt(0);
        if (firstChar >= 'A' && firstChar <= 'M') {
            return Math.abs(word.hashCode() % (numReduceTasks / 2));
        } else {
            return Math.abs(word.hashCode() % (numReduceTasks / 2)) + (numReduceTasks / 2);
        }
    }
}

// Using the custom partitioner in a job
job.setPartitionerClass(CustomPartitioner.class);
```

> **Hands-on Exercise:** Implement a MapReduce job to analyze a dataset of your choice. For example, create a program that calculates the average temperature by location from weather data, or finds the most frequent words in a collection of documents. Include a custom partitioner or combiner to optimize your solution.

## 4. YARN (Yet Another Resource Negotiator)

### 4.1 YARN Architecture

YARN is the resource management layer of Hadoop, separating resource management from processing logic:

1. **ResourceManager**: The master daemon that arbitrates resources among applications
   - Tracks resource usage and node liveness
   - Allocates resources to applications
   - Enforces scheduling policies

2. **NodeManager**: The per-node slave daemon responsible for containers, monitoring resource usage, and reporting to the ResourceManager
   - Manages resources on a single node
   - Launches and monitors containers
   - Reports node health and resource utilization

3. **ApplicationMaster**: A per-application process that negotiates resources from the ResourceManager and works with the NodeManager(s) to execute tasks
   - Requests containers from ResourceManager
   - Coordinates task execution
   - Handles task failures

4. **Container**: A collection of physical resources (CPU, memory, disk, network, etc.) on a single node
   - Execution environment for tasks
   - Isolated resource allocation
   - Monitored by NodeManager

```
# YARN Architecture (ASCII Diagram)

+-------------------+
| ResourceManager   |
| (Master)          |
+-------------------+
          |
          |
+-------------------+     +-------------------+     +-------------------+
| NodeManager 1     |     | NodeManager 2     |     | NodeManager 3     |
| +---------------+ |     | +---------------+ |     | +---------------+ |
| | Container 1-1 | |     | | Container 2-1 | |     | | Container 3-1 | |
| +---------------+ |     | +---------------+ |     | +---------------+ |
| | Container 1-2 | |     | | Container 2-2 | |     | | Container 3-2 | |
| +---------------+ |     | +---------------+ |     | +---------------+ |
+-------------------+     +-------------------+     +-------------------+
          |                         |                         |
          |                         |                         |
          v                         v                         v
+-----------------------------------------------------------+
|                     ApplicationMaster                      |
+-----------------------------------------------------------+
```

### 4.2 YARN Workflow

The lifecycle of a YARN application:

1. **Application Submission**:
   - Client submits application to ResourceManager
   - ResourceManager allocates a container for ApplicationMaster

2. **ApplicationMaster Initialization**:
   - ApplicationMaster starts in allocated container
   - Registers with ResourceManager

3. **Resource Negotiation**:
   - ApplicationMaster requests containers from ResourceManager
   - ResourceManager allocates containers based on availability and scheduling policy

4. **Application Execution**:
   - ApplicationMaster launches tasks in allocated containers
   - NodeManagers execute tasks and report progress

5. **Application Completion**:
   - ApplicationMaster notifies ResourceManager of completion
   - Resources are released
   - Application status is reported to client

### 4.3 YARN Schedulers

YARN provides different schedulers to allocate resources based on various policies:

1. **FIFO Scheduler**: First-In-First-Out scheduling
   - Simple queue-based allocation
   - Applications processed in order of submission
   - Not suitable for multi-tenant clusters

2. **Capacity Scheduler**: Multi-tenant resource allocation
   - Hierarchical queues with capacity guarantees
   - Elastic resource allocation
   - Queue-level access control
   - Default scheduler in most Hadoop distributions

3. **Fair Scheduler**: Dynamic resource allocation
   - Shares resources equally among applications
   - Hierarchical queues with weights
   - Minimum share guarantees
   - Preemption support

```xml
<!-- Example: Capacity Scheduler Configuration -->
<property>
  <name>yarn.scheduler.capacity.root.queues</name>
  <value>default,production,development</value>
</property>

<property>
  <name>yarn.scheduler.capacity.root.production.capacity</name>
  <value>60</value>
</property>

<property>
  <name>yarn.scheduler.capacity.root.development.capacity</name>
  <value>30</value>
</property>

<property>
  <name>yarn.scheduler.capacity.root.default.capacity</name>
  <value>10</value>
</property>
```

> **Knowledge Check:** For each of the following scenarios, which YARN scheduler would be most appropriate and why?
> - A research cluster where multiple teams need to share resources fairly
> - A production environment with critical jobs that must run immediately
> - A multi-department cluster where each department needs guaranteed resources

## 5. Hadoop Ecosystem Tools

### 5.1 Apache Hive

Hive provides a SQL-like interface for querying data stored in HDFS:

1. **HiveQL**: SQL-like query language
   - Familiar syntax for SQL users
   - Automatically translated to MapReduce, Tez, or Spark jobs
   - Support for custom functions (UDFs)

2. **Metastore**: Repository of metadata
   - Stores table schemas, partitions, and properties
   - Supports multiple database backends

3. **Use Cases**:
   - Data warehousing
   - Ad-hoc queries
   - ETL operations

```sql
-- Example: Hive queries

-- Create a table
CREATE TABLE employees (
    id INT,
    name STRING,
    department STRING,
    salary FLOAT
)
ROW FORMAT DELIMITED
FIELDS TERMINATED BY ','
STORED AS TEXTFILE;

-- Load data into the table
LOAD DATA INPATH '/user/hadoop/employees.csv' INTO TABLE employees;

-- Run a query
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING avg_salary > 50000
ORDER BY avg_salary DESC;

-- Create a partitioned table
CREATE TABLE sales (
    transaction_id STRING,
    product_id STRING,
    price FLOAT
)
PARTITIONED BY (year INT, month INT)
STORED AS PARQUET;

-- Insert data with partition
INSERT INTO sales PARTITION (year=2023, month=3)
SELECT transaction_id, product_id, price
FROM raw_sales
WHERE year = 2023 AND month = 3;
```

### 5.2 Apache Pig

Pig provides a high-level scripting language (Pig Latin) for data processing:

1. **Pig Latin**: Dataflow language
   - Procedural rather than declarative
   - Automatically compiled to MapReduce jobs
   - Extensible with user-defined functions

2. **Use Cases**:
   - ETL processing
   - Data exploration
   - Research on raw data

```pig
-- Example: Pig Latin script

-- Load data
employees = LOAD '/user/hadoop/employees.csv' USING PigStorage(',') AS (
    id:int,
    name:chararray,
    department:chararray,
    salary:float
);

-- Filter data
high_salary = FILTER employees BY salary > 75000;

-- Group and aggregate
dept_stats = GROUP high_salary BY department;
dept_avg = FOREACH dept_stats GENERATE
    group AS department,
    COUNT(high_salary) AS emp_count,
    AVG(high_salary.salary) AS avg_salary;

-- Sort results
ordered_results = ORDER dept_avg BY avg_salary DESC;

-- Store results
STORE ordered_results INTO '/user/hadoop/dept_salary_stats';
```

### 5.3 Apache HBase

HBase is a distributed, scalable, big data store built on top of HDFS:

1. **Key Features**:
   - Column-oriented NoSQL database
   - Real-time random read/write access
   - Automatic sharding and region management
   - Strong consistency model

2. **Data Model**:
   - Tables, rows, column families, and columns
   - Sparse storage (only stores non-null values)
   - Versioned data with timestamps

3. **Use Cases**:
   - Time-series data
   - Random, real-time read/write access to big data
   - Storing semi-structured or sparse data

```java
// Example: HBase operations using Java API
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.*;
import org.apache.hadoop.hbase.client.*;
import org.apache.hadoop.hbase.util.Bytes;

// Create HBase configuration
Configuration config = HBaseConfiguration.create();

// Create a connection to HBase
Connection connection = ConnectionFactory.createConnection(config);

// Get a reference to the table
Table table = connection.getTable(TableName.valueOf("users"));

try {
    // Create a put operation for a row
    Put put = new Put(Bytes.toBytes("user123"));
    
    // Add columns to the put operation
    put.addColumn(Bytes.toBytes("profile"), Bytes.toBytes("name"), Bytes.toBytes("John Doe"));
    put.addColumn(Bytes.toBytes("profile"), Bytes.toBytes("email"), Bytes.toBytes("john@example.com"));
    put.addColumn(Bytes.toBytes("metrics"), Bytes.toBytes("last_login"), Bytes.toBytes(System.currentTimeMillis()));
    
    // Execute the put operation
    table.put(put);
    
    // Create a get operation to retrieve the row
    Get get = new Get(Bytes.toBytes("user123"));
    
    // Execute the get operation
    Result result = table.get(get);
    
    // Process the result
    byte[] nameValue = result.getValue(Bytes.toBytes("profile"), Bytes.toBytes("name"));
    System.out.println("Name: " + Bytes.toString(nameValue));
    
    // Scan for multiple rows
    Scan scan = new Scan();
    scan.addFamily(Bytes.toBytes("profile"));
    
    ResultScanner scanner = table.getScanner(scan);
    for (Result scanResult : scanner) {
        // Process each row
    }
    scanner.close();
} finally {
    // Close resources
    table.close();
    connection.close();
}
```

### 5.4 Apache Sqoop

Sqoop is a tool designed for efficiently transferring bulk data between Hadoop and structured datastores:

1. **Key Features**:
   - Parallel import and export
   - Incremental imports
   - Direct import to Hive or HBase
   - Support for most relational databases

2. **Use Cases**:
   - ETL processes
   - Data warehouse population
   - Database archiving

```bash
# Example: Sqoop commands

# Import data from MySQL to HDFS
sqoop import \
  --connect jdbc:mysql://database_server/database \
  --username username \
  --password password \
  --table employees \
  --target-dir /user/hadoop/employees \
  --split-by id \
  --num-mappers 4

# Import data from MySQL to Hive
sqoop import \
  --connect jdbc:mysql://database_server/database \
  --username username \
  --password password \
  --table sales \
  --hive-import \
  --hive-table sales \
  --create-hive-table \
  --split-by transaction_id

# Export data from HDFS to MySQL
sqoop export \
  --connect jdbc:mysql://database_server/database \
  --username username \
  --password password \
  --table processed_data \
  --export-dir /user/hadoop/processed_data \
  --input-fields-terminated-by ',' \
  --update-mode allowinsert \
  --update-key id
```

> **Hands-on Exercise:** Design and implement a data processing pipeline using Hadoop ecosystem tools. For example, use Sqoop to import data from a relational database into HDFS, process it using Hive or Pig, and store the results in HBase for real-time access. Document your approach, the tools used, and the rationale for your design decisions.

## Summary

In this chapter, we've explored the Hadoop ecosystem and MapReduce programming model:

- The core components of Hadoop: HDFS, YARN, MapReduce, and Hadoop Common
- The architecture and features of HDFS for distributed storage
- The MapReduce programming model for parallel data processing
- YARN's role in resource management and job scheduling
- Key Hadoop ecosystem tools like Hive, Pig, HBase, and Sqoop

Understanding these components provides a foundation for working with big data processing frameworks and building scalable data applications. While newer technologies like Spark have emerged, the concepts and architecture of Hadoop remain fundamental to distributed computing and big data processing.

## Additional Resources

### Books
- "Hadoop: The Definitive Guide" by Tom White
- "Programming Pig" by Alan Gates
- "HBase: The Definitive Guide" by Lars George
- "Programming Hive" by Edward Capriolo, Dean Wampler, and Jason Rutherglen

### Online Resources
- [Apache Hadoop Documentation](https://hadoop.apache.org/docs/)
- [Cloudera Hadoop Tutorial](https://www.cloudera.com/tutorials.html)
- [Hortonworks Hadoop Tutorials](https://docs.cloudera.com/HDPDocuments/HDP3/HDP-3.1.5/index.html)
- [Yahoo! Hadoop Tutorial](https://developer.yahoo.com/hadoop/tutorial/)

### Practice Platforms
- [Cloudera QuickStart VM](https://www.cloudera.com/downloads/quickstart_vms.html)
- [Hortonworks Sandbox](https://www.cloudera.com/downloads/hortonworks-sandbox.html)
- [AWS EMR](https://aws.amazon.com/emr/)
- [Google Cloud Dataproc](https://cloud.google.com/dataproc)

## Next Steps

In the next chapter, we'll explore Apache Spark, a fast and general-purpose cluster computing system that provides high-level APIs in Java, Scala, Python, and R, and supports a rich set of higher-level tools including Spark SQL, MLlib for machine learning, GraphX for graph processing, and Spark Streaming.

---

## Chapter Quiz

Test your understanding of Hadoop and MapReduce concepts:

1. What are the four main components of the Hadoop core ecosystem?
2. How does HDFS achieve fault tolerance in data storage?
3. Explain the three main phases of the MapReduce programming model.
4. What is the role of the ApplicationMaster in YARN?
5. When would you use Hive instead of Pig for data processing tasks?

Good luck!
