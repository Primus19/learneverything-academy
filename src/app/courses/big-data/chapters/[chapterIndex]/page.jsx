import React from 'react';
import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/components";

export const metadata = {
  title: 'LearnEverything Academy | Big Data | Chapter',
  description: 'Learn about big data concepts, challenges, and ecosystem in this introductory chapter.',
};

export default function BigDataChapterPage({ params }) {
  const chapterIndex = parseInt(params.chapterIndex);
  
  const chapters = [
    {
      title: "Introduction to Big Data",
      description: "Concepts, challenges, and ecosystem",
      content: `
# Introduction to Big Data

## What is Big Data?

Big Data refers to extremely large datasets that may be analyzed computationally to reveal patterns, trends, and associations. These datasets are so voluminous and complex that traditional data processing applications are inadequate to deal with them.

## The 5 Vs of Big Data

Big Data is often characterized by the following 5 Vs:

1. **Volume**: The quantity of generated and stored data. The size of the data determines the value and potential insight, and whether it can be considered big data or not.

2. **Variety**: The type and nature of the data. This helps people who analyze it to effectively use the resulting insight. Big data draws from text, images, audio, video; plus it completes missing pieces through data fusion.

3. **Velocity**: The speed at which the data is generated and processed to meet the demands and challenges that lie in the path of growth and development.

4. **Veracity**: The quality of captured data can vary greatly, affecting the accurate analysis.

5. **Value**: The worth of the data being extracted. Having endless amounts of data is one thing, but unless it can be turned into value it is useless.

## Big Data Challenges

Working with Big Data presents several challenges:

- **Storage**: Traditional databases cannot store and process big data efficiently.
- **Processing**: Traditional computing systems cannot process big data in a timely manner.
- **Management**: Managing the data lifecycle from ingestion to deletion is complex.
- **Security and Privacy**: Ensuring data security and privacy is challenging.
- **Quality and Cleanliness**: Ensuring data quality and cleanliness is difficult.

## Big Data Ecosystem

The Big Data ecosystem consists of various technologies and frameworks:

- **Hadoop**: An open-source framework for distributed storage and processing of large datasets.
- **Spark**: A unified analytics engine for large-scale data processing.
- **NoSQL Databases**: Non-relational databases designed for distributed data stores.
- **Data Lakes**: Storage repositories that hold a vast amount of raw data in its native format.
- **Data Warehouses**: Systems used for reporting and data analysis.
- **Business Intelligence Tools**: Tools used to transform data into actionable insights.

## Applications of Big Data

Big Data has applications in various domains:

- **Business**: Customer analytics, market analysis, fraud detection.
- **Healthcare**: Disease prediction, personalized medicine, healthcare analytics.
- **Finance**: Risk assessment, algorithmic trading, fraud detection.
- **Manufacturing**: Predictive maintenance, quality control, supply chain optimization.
- **Retail**: Customer behavior analysis, inventory management, recommendation systems.
- **Transportation**: Route optimization, predictive maintenance, traffic management.

## Conclusion

Big Data is transforming how organizations operate and make decisions. Understanding the fundamentals of Big Data is essential for anyone working in data-related fields.

In the next chapter, we will explore the Hadoop ecosystem, which is a key technology for processing Big Data.
      `
    },
    {
      title: "Hadoop Ecosystem",
      description: "HDFS, MapReduce, and YARN",
      content: `
# Hadoop Ecosystem

## Introduction to Hadoop

Apache Hadoop is an open-source framework that allows for the distributed processing of large data sets across clusters of computers using simple programming models. It is designed to scale up from single servers to thousands of machines, each offering local computation and storage.

## Core Components of Hadoop

### HDFS (Hadoop Distributed File System)

HDFS is the primary storage system used by Hadoop applications. It creates multiple replicas of data blocks and distributes them on compute nodes throughout a cluster to enable reliable, extremely rapid computations.

Key features of HDFS:
- **Distributed Storage**: Data is stored across multiple nodes.
- **Fault Tolerance**: Multiple copies of data are stored to ensure reliability.
- **High Throughput**: Designed for batch processing rather than interactive use.
- **Large Datasets**: Optimized for large files (typically gigabytes to terabytes).

### MapReduce

MapReduce is a programming model and an associated implementation for processing and generating large data sets. It allows for distributed processing of the map and reduction operations.

The MapReduce paradigm consists of two phases:
1. **Map Phase**: Each worker node applies the map function to the local data and writes the output to temporary storage.
2. **Reduce Phase**: Worker nodes redistribute data based on the output keys, such that all data belonging to one key is located on the same worker node.

### YARN (Yet Another Resource Negotiator)

YARN is a resource management platform responsible for managing computing resources in clusters and using them for scheduling of users' applications.

Key components of YARN:
- **ResourceManager**: The ultimate authority that arbitrates resources among all applications in the system.
- **NodeManager**: Responsible for containers, monitoring their resource usage, and reporting to the ResourceManager.
- **ApplicationMaster**: A framework-specific entity that negotiates resources from the ResourceManager and works with the NodeManager(s) to execute and monitor tasks.

## Hadoop Ecosystem Components

### Hive

Apache Hive is a data warehouse software project built on top of Hadoop that provides a SQL-like interface to query data stored in various databases and file systems that integrate with Hadoop.

### Pig

Apache Pig is a high-level platform for creating programs that run on Apache Hadoop. It provides a high-level language (Pig Latin) for expressing data analysis programs.

### HBase

Apache HBase is a distributed, scalable, big data store. It is a NoSQL database that runs on top of HDFS and provides real-time read/write access to large datasets.

### Spark

Apache Spark is a fast and general-purpose cluster computing system. It provides high-level APIs in Java, Scala, Python, and R, and an optimized engine that supports general execution graphs.

### Sqoop

Apache Sqoop is a tool designed for efficiently transferring bulk data between Apache Hadoop and structured datastores such as relational databases.

### Flume

Apache Flume is a distributed, reliable, and available service for efficiently collecting, aggregating, and moving large amounts of log data.

### Oozie

Apache Oozie is a workflow scheduler system to manage Apache Hadoop jobs. It allows users to create directed acyclic graphs of workflows.

## Hadoop Architecture

A typical Hadoop cluster consists of:
- **Master Nodes**: Run the NameNode, ResourceManager, and other master services.
- **Worker Nodes**: Run the DataNode, NodeManager, and execute tasks.

## Conclusion

The Hadoop ecosystem provides a comprehensive set of tools for big data processing. Understanding these components is essential for effectively working with big data.

In the next chapter, we will explore Apache Spark, which is another key technology for processing big data.
      `
    },
    {
      title: "Apache Spark",
      description: "RDDs, DataFrames, and SparkSQL",
      content: `
# Apache Spark

## Introduction to Apache Spark

Apache Spark is a unified analytics engine for large-scale data processing. It provides high-level APIs in Java, Scala, Python, and R, and an optimized engine that supports general execution graphs. It also supports a rich set of higher-level tools including Spark SQL for SQL and structured data processing, MLlib for machine learning, GraphX for graph processing, and Spark Streaming.

## Core Concepts of Spark

### Resilient Distributed Datasets (RDDs)

RDDs are the fundamental data structure of Spark. They are immutable distributed collections of objects that can be processed in parallel.

Key features of RDDs:
- **Resilient**: Fault-tolerant with the help of RDD lineage graph and so able to recompute missing or damaged partitions due to node failures.
- **Distributed**: Data residing on multiple nodes in a cluster.
- **Dataset**: Collection of partitioned data with primitive values or values of values, e.g., tuples or other objects.

### DataFrames

A DataFrame is a distributed collection of data organized into named columns. It is conceptually equivalent to a table in a relational database or a data frame in R/Python, but with richer optimizations under the hood.

Key features of DataFrames:
- **Structured Data**: Data is organized into named columns.
- **Optimized Execution**: Catalyst optimizer and Tungsten execution engine.
- **API Support**: APIs available in Java, Scala, Python, and R.

### Spark SQL

Spark SQL is a Spark module for structured data processing. It provides a programming abstraction called DataFrames and can also act as a distributed SQL query engine.

Key features of Spark SQL:
- **SQL Interface**: Allows running SQL queries on Spark data.
- **Unified Data Access**: Can read data from various sources like Hive, Avro, Parquet, ORC, JSON, and JDBC.
- **Integration**: Seamless integration with other Spark components.

## Spark Architecture

### Driver Program

The driver program runs the main() function of the application and creates the SparkContext, which coordinates the execution of Spark jobs.

### Cluster Manager

The cluster manager allocates resources across applications. Spark supports several cluster managers:
- Standalone
- Apache Mesos
- Hadoop YARN
- Kubernetes

### Worker Nodes

Worker nodes are responsible for executing tasks assigned by the driver program. Each worker node has one or more executors.

### Executors

Executors are processes launched on worker nodes. They run tasks and keep data in memory or disk storage across them.

## Spark Processing Modes

### Batch Processing

Batch processing involves processing a large volume of data all at once. Spark excels at batch processing due to its in-memory computation capabilities.

### Stream Processing

Spark Streaming enables scalable, high-throughput, fault-tolerant stream processing of live data streams. Data can be ingested from many sources like Kafka, Flume, Kinesis, or TCP sockets.

### Interactive Processing

Spark's interactive shell allows data scientists and analysts to explore data interactively, making it ideal for data exploration and analysis.

## Spark Libraries

### MLlib (Machine Learning)

MLlib is Spark's machine learning library. It provides various algorithms for classification, regression, clustering, collaborative filtering, and more.

### GraphX (Graph Processing)

GraphX is Spark's API for graphs and graph-parallel computation. It includes a growing collection of graph algorithms and builders to simplify graph analytics tasks.

### Spark Streaming

Spark Streaming enables scalable, high-throughput, fault-tolerant stream processing of live data streams.

## Conclusion

Apache Spark is a powerful and versatile big data processing framework. Its ability to handle batch, streaming, and interactive workloads makes it a popular choice for big data processing.

In the next chapter, we will explore NoSQL databases, which are essential for storing and retrieving big data efficiently.
      `
    },
    {
      title: "NoSQL Databases",
      description: "MongoDB, Cassandra, and HBase",
      content: `
# NoSQL Databases

## Introduction to NoSQL Databases

NoSQL (Not Only SQL) databases are designed to handle large volumes of unstructured, semi-structured, or structured data. They provide a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases.

## Types of NoSQL Databases

### Document Databases

Document databases store data in document formats like JSON, BSON, or XML. Each document contains pairs of fields and values, and the values can be various data types, including strings, numbers, booleans, arrays, or objects.

Example: MongoDB, Couchbase, RavenDB

### Key-Value Stores

Key-value stores are the simplest NoSQL databases. They store data as a collection of key-value pairs, where the key is an attribute name.

Example: Redis, DynamoDB, Riak

### Column-Family Stores

Column-family stores organize data into rows and columns. However, unlike relational databases, the names and format of the columns can vary from row to row in the same table.

Example: Cassandra, HBase, Google Bigtable

### Graph Databases

Graph databases use graph structures with nodes, edges, and properties to represent and store data. They are designed for data whose relations are well represented as a graph.

Example: Neo4j, JanusGraph, Amazon Neptune

## MongoDB

MongoDB is a document database that stores data in flexible, JSON-like documents. It is designed for ease of development and scaling.

Key features of MongoDB:
- **Document Model**: Stores data in flexible, JSON-like documents.
- **Distributed Architecture**: Provides high availability, horizontal scaling, and geographic distribution.
- **Aggregation Framework**: Allows for data processing in stages.
- **Indexing**: Supports various types of indexes for query optimization.

## Cassandra

Apache Cassandra is a distributed NoSQL database designed to handle large amounts of data across many commodity servers, providing high availability with no single point of failure.

Key features of Cassandra:
- **Distributed Architecture**: Designed to handle large amounts of data across many commodity servers.
- **Linear Scalability**: Performance increases linearly as new machines are added.
- **Fault Tolerance**: Data is automatically replicated to multiple nodes for fault-tolerance.
- **Tunable Consistency**: Consistency levels can be configured for each operation.

## HBase

Apache HBase is a distributed, scalable, big data store. It is a NoSQL database that runs on top of HDFS and provides real-time read/write access to large datasets.

Key features of HBase:
- **Column-Oriented**: Stores data in column families.
- **Scalability**: Designed to scale horizontally.
- **Integration with Hadoop**: Runs on top of HDFS and integrates well with Hadoop ecosystem.
- **Automatic Sharding**: Tables are automatically split and distributed across the cluster.

## Choosing the Right NoSQL Database

The choice of NoSQL database depends on various factors:

- **Data Model**: The structure of your data (document, key-value, column-family, graph).
- **Scalability Requirements**: How much data you need to store and process.
- **Consistency Requirements**: Whether you need strong consistency or can work with eventual consistency.
- **Performance Requirements**: Read/write performance needs.
- **Integration Requirements**: How the database needs to integrate with other systems.

## NoSQL vs. Relational Databases

NoSQL databases differ from relational databases in several ways:

- **Schema Flexibility**: NoSQL databases often allow for schema-less data storage.
- **Scalability**: NoSQL databases are designed to scale horizontally.
- **Data Model**: NoSQL databases support various data models beyond the tabular relations of relational databases.
- **ACID Properties**: Many NoSQL databases sacrifice some ACID properties for performance and scalability.

## Conclusion

NoSQL databases are essential tools for handling big data. They provide the scalability, flexibility, and performance needed to work with large volumes of diverse data.

In the next chapter, we will explore stream processing, which is crucial for handling real-time data.
      `
    },
    {
      title: "Stream Processing",
      description: "Kafka, Spark Streaming, and Flink",
      content: `
# Stream Processing

## Introduction to Stream Processing

Stream processing is a technology for processing continuous streams of data immediately as they are produced or received. Unlike batch processing, which operates on chunks of data all at once, stream processing operates on data in real-time.

## Key Concepts in Stream Processing

### Data Streams

A data stream is a continuous flow of data records. Examples include:
- Log files generated by users of mobile or web applications
- In-game player activity
- Information from social networks
- Financial trading floors
- Geospatial services
- Telemetry from connected devices or instrumentation in data centers

### Event Time vs. Processing Time

- **Event Time**: The time at which an event actually occurred.
- **Processing Time**: The time at which an event is observed in the system.

### Windowing

Windowing is a technique to divide a stream of data into finite chunks for processing. Common types of windows include:
- **Tumbling Windows**: Fixed-size, non-overlapping windows.
- **Sliding Windows**: Fixed-size windows that overlap.
- **Session Windows**: Windows that capture a period of activity followed by a period of inactivity.

### State Management

State management involves maintaining information across multiple events. This is essential for operations like aggregations, joins, and pattern detection.

## Apache Kafka

Apache Kafka is a distributed streaming platform that is designed to handle high-throughput, fault-tolerant, publish-subscribe messaging.

Key components of Kafka:
- **Topics**: Categories or feed names to which records are published.
- **Producers**: Applications that publish records to Kafka topics.
- **Consumers**: Applications that subscribe to topics and process the feed of published records.
- **Brokers**: Servers that store the published records.
- **ZooKeeper**: Used for managing and coordinating Kafka brokers.

## Spark Streaming

Spark Streaming is an extension of the core Spark API that enables scalable, high-throughput, fault-tolerant stream processing of live data streams.

Key features of Spark Streaming:
- **Micro-Batch Processing**: Processes data in small batches, providing a balance between latency and throughput.
- **Integration with Spark Ecosystem**: Seamlessly integrates with Spark's batch processing, SQL, and machine learning libraries.
- **Fault Tolerance**: Guarantees that data will be processed exactly once, even in the face of failures.

## Apache Flink

Apache Flink is a framework and distributed processing engine for stateful computations over unbounded and bounded data streams.

Key features of Flink:
- **True Streaming**: Processes data record by record, providing low latency.
- **Stateful Computations**: Maintains state across events, enabling complex event processing.
- **Event Time Processing**: Supports event time semantics, allowing for accurate processing of out-of-order events.
- **Exactly-Once Semantics**: Guarantees that each event affects the final results exactly once.

## Stream Processing Patterns

### Filter

The filter pattern involves selecting records from a stream based on a condition.

### Map

The map pattern involves transforming each record in a stream into a new record.

### Flatmap

The flatmap pattern involves transforming each record in a stream into zero, one, or more records.

### Aggregation

The aggregation pattern involves combining multiple records to compute a result, such as a sum, average, or count.

### Join

The join pattern involves combining records from multiple streams based on a common key.

### Window

The window pattern involves dividing a stream into finite chunks for processing.

## Use Cases for Stream Processing

- **Real-time Analytics**: Analyzing data as it is generated to provide immediate insights.
- **Fraud Detection**: Identifying fraudulent activities in real-time.
- **Monitoring and Alerting**: Monitoring systems and generating alerts when anomalies are detected.
- **Recommendation Systems**: Providing real-time recommendations based on user behavior.
- **IoT Data Processing**: Processing data from Internet of Things devices in real-time.

## Conclusion

Stream processing is a powerful paradigm for handling real-time data. It enables organizations to process and analyze data as it is generated, providing immediate insights and enabling real-time decision-making.

In the next chapter, we will explore big data analytics, focusing on how to apply machine learning techniques to big data.
      `
    },
    {
      title: "Big Data Analytics",
      description: "Machine learning with big data",
      content: `
# Big Data Analytics

## Introduction to Big Data Analytics

Big Data Analytics involves examining large and varied data sets to uncover hidden patterns, unknown correlations, market trends, customer preferences, and other useful information. It combines techniques from statistics, machine learning, data mining, and predictive analytics to extract value from data.

## Machine Learning for Big Data

Machine Learning is a subset of artificial intelligence that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. When applied to big data, machine learning algorithms can discover patterns and insights that would be impossible for humans to find manually.

## Types of Machine Learning

### Supervised Learning

Supervised learning involves training a model on a labeled dataset, which means we have both input data and output labels. The goal is to learn a mapping from inputs to outputs.

Common supervised learning algorithms for big data:
- **Linear Regression**: Predicts a continuous value.
- **Logistic Regression**: Predicts a binary outcome.
- **Decision Trees**: Creates a model that predicts the value of a target variable based on several input variables.
- **Random Forests**: An ensemble of decision trees.
- **Support Vector Machines (SVM)**: Classifies data by finding the hyperplane that best divides a dataset into classes.
- **Neural Networks**: Models inspired by the human brain, capable of learning complex patterns.

### Unsupervised Learning

Unsupervised learning involves training a model on an unlabeled dataset. The goal is to find hidden patterns or intrinsic structures in the data.

Common unsupervised learning algorithms for big data:
- **K-means Clustering**: Groups data into k clusters.
- **Hierarchical Clustering**: Builds a hierarchy of clusters.
- **Principal Component Analysis (PCA)**: Reduces the dimensionality of the data.
- **Association Rules**: Discovers interesting relations between variables.
- **Anomaly Detection**: Identifies rare items, events, or observations.

### Semi-Supervised Learning

Semi-supervised learning falls between supervised and unsupervised learning. It uses a small amount of labeled data and a large amount of unlabeled data.

### Reinforcement Learning

Reinforcement learning involves an agent learning to make decisions by taking actions in an environment to maximize a reward.

## Big Data Analytics Platforms

### Hadoop and MapReduce

Hadoop provides a distributed file system (HDFS) and a processing framework (MapReduce) for big data analytics. MapReduce is particularly useful for batch processing of large datasets.

### Spark MLlib

Spark MLlib is Spark's machine learning library. It provides a wide range of machine learning algorithms and utilities, including classification, regression, clustering, collaborative filtering, and dimensionality reduction.

### TensorFlow

TensorFlow is an open-source platform for machine learning. It provides a comprehensive ecosystem of tools, libraries, and community resources that lets researchers push the state-of-the-art in ML and developers easily build and deploy ML-powered applications.

### PyTorch

PyTorch is an open-source machine learning library based on the Torch library. It provides a wide range of algorithms for deep learning, and is primarily developed by Facebook's AI Research lab.

### Scikit-learn

Scikit-learn is a free software machine learning library for Python. It features various classification, regression, and clustering algorithms, and is designed to interoperate with the Python numerical and scientific libraries NumPy and SciPy.

## Big Data Analytics Process

### Data Collection

The first step in big data analytics is collecting data from various sources, which can include databases, files, APIs, web scraping, and IoT devices.

### Data Preprocessing

Data preprocessing involves cleaning and transforming the data to make it suitable for analysis. This includes handling missing values, removing duplicates, normalizing data, and feature engineering.

### Data Exploration

Data exploration involves understanding the data through statistical summaries and visualizations. This helps in identifying patterns, trends, and outliers in the data.

### Model Building

Model building involves selecting and training machine learning models on the data. This includes choosing appropriate algorithms, tuning hyperparameters, and evaluating model performance.

### Model Deployment

Model deployment involves integrating the trained model into a production environment where it can make predictions on new data.

### Model Monitoring

Model monitoring involves tracking the performance of the deployed model over time and retraining it when necessary.

## Use Cases for Big Data Analytics

- **Customer Analytics**: Understanding customer behavior and preferences.
- **Fraud Detection**: Identifying fraudulent activities.
- **Risk Assessment**: Evaluating and managing risks.
- **Recommendation Systems**: Providing personalized recommendations.
- **Predictive Maintenance**: Predicting when equipment is likely to fail.
- **Healthcare Analytics**: Improving patient outcomes and reducing costs.
- **Supply Chain Optimization**: Optimizing inventory and logistics.

## Challenges in Big Data Analytics

- **Data Quality**: Ensuring the accuracy, completeness, and consistency of data.
- **Data Privacy**: Protecting sensitive information and complying with regulations.
- **Scalability**: Handling the volume and velocity of big data.
- **Complexity**: Managing the complexity of big data analytics pipelines.
- **Interpretability**: Understanding and explaining the results of complex models.

## Conclusion

Big Data Analytics, particularly when combined with machine learning, provides powerful tools for extracting value from large and complex datasets. By understanding the types of machine learning, the analytics process, and the available platforms, organizations can leverage big data to gain insights, make better decisions, and create new opportunities.

This concludes our course on Big Data. We have covered the fundamentals of big data, the Hadoop ecosystem, Apache Spark, NoSQL databases, stream processing, and big data analytics. With this knowledge, you are well-equipped to start working with big data technologies and applying them to solve real-world problems.
      `
    }
  ];
  
  const chapter = chapters[chapterIndex] || chapters[0];
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Big Data</h1>
        <p className="text-xl text-muted-foreground">Chapter {chapterIndex + 1}: {chapter.title}</p>
        <p className="text-muted-foreground">{chapter.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Chapters</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                {chapters.map((ch, index) => (
                  <Link 
                    key={index}
                    href={`/courses/big-data/chapters/${index}`}
                    className={`block p-2 rounded-md ${index === chapterIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  >
                    {index + 1}. {ch.title}
                  </Link>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: chapter.content.split('\n').map(line => {
                  if (line.startsWith('# ')) {
                    return `<h1>${line.substring(2)}</h1>`;
                  } else if (line.startsWith('## ')) {
                    return `<h2>${line.substring(3)}</h2>`;
                  } else if (line.startsWith('### ')) {
                    return `<h3>${line.substring(4)}</h3>`;
                  } else if (line.startsWith('- ')) {
                    return `<ul><li>${line.substring(2)}</li></ul>`;
                  } else if (line.startsWith('1. ')) {
                    return `<ol><li>${line.substring(3)}</li></ol>`;
                  } else if (line.trim() === '') {
                    return '<br/>';
                  } else {
                    return `<p>${line}</p>`;
                  }
                }).join('') }} />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between mt-6">
            {chapterIndex > 0 ? (
              <Button asChild variant="outline">
                <Link href={`/courses/big-data/chapters/${chapterIndex - 1}`}>
                  <span className="mr-2">←</span> Previous Chapter
                </Link>
              </Button>
            ) : (
              <Button disabled variant="outline">
                <span className="mr-2">←</span> Previous Chapter
              </Button>
            )}
            
            {chapterIndex < chapters.length - 1 ? (
              <Button asChild>
                <Link href={`/courses/big-data/chapters/${chapterIndex + 1}`}>
                  Next Chapter <span className="ml-2">→</span>
                </Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/courses/big-data">
                  Complete Course <span className="ml-2">→</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
