# Machine Learning and AI for Big Data

In this chapter, we'll explore the intersection of machine learning, artificial intelligence, and big data. As organizations collect increasingly large volumes of data, traditional machine learning approaches must evolve to handle the scale, velocity, and variety of big data. We'll examine distributed machine learning frameworks, scalable algorithms, and practical applications of AI in big data environments.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the challenges and opportunities of applying ML/AI to big data
2. Implement distributed machine learning using popular frameworks
3. Apply scalable machine learning algorithms to large datasets
4. Build and deploy machine learning pipelines for big data
5. Implement deep learning at scale
6. Address ethical considerations in big data AI applications

## 1. Introduction to Machine Learning for Big Data

### 1.1 Challenges of Machine Learning with Big Data

When applying machine learning to big data, several challenges emerge:

1. **Scale**:
   - Processing terabytes or petabytes of data
   - Training models on billions of examples
   - Handling high-dimensional feature spaces

2. **Velocity**:
   - Processing streaming data in real-time
   - Adapting models to concept drift
   - Continuous learning and updating

3. **Variety**:
   - Handling structured, semi-structured, and unstructured data
   - Multimodal learning (text, images, audio, video)
   - Feature extraction from diverse data sources

4. **Infrastructure**:
   - Distributed computing requirements
   - Memory limitations
   - Network bandwidth constraints
   - Hardware acceleration needs

5. **Algorithmic Complexity**:
   - Scalability of traditional algorithms
   - Convergence in distributed settings
   - Hyperparameter tuning at scale
   - Model interpretability

```
# Challenges of ML with Big Data (ASCII Diagram)

+----------------------------------------------------------------------+
|                    MACHINE LEARNING WITH BIG DATA                     |
+----------------------------------------------------------------------+
|                                                                      |
|  +------------------+  +------------------+  +------------------+    |
|  |      SCALE       |  |     VELOCITY     |  |     VARIETY      |    |
|  | - Volume         |  | - Streaming      |  | - Structured     |    |
|  | - Dimensionality |  | - Concept drift  |  | - Semi-structured|    |
|  | - Parallelization|  | - Online learning|  | - Unstructured   |    |
|  +------------------+  +------------------+  +------------------+    |
|                                                                      |
|  +------------------+  +------------------+                          |
|  |  INFRASTRUCTURE  |  |   ALGORITHMIC    |                          |
|  | - Distributed    |  | - Scalability    |                          |
|  | - Memory         |  | - Convergence    |                          |
|  | - Acceleration   |  | - Interpretability|                         |
|  +------------------+  +------------------+                          |
|                                                                      |
+----------------------------------------------------------------------+
```

### 1.2 Distributed Computing Paradigms for ML

To address big data challenges, several distributed computing paradigms have emerged:

1. **Data Parallelism**:
   - Split data across multiple nodes
   - Train the same model on different data subsets
   - Aggregate results (e.g., parameter averaging)
   - Examples: Distributed SGD, parameter servers

2. **Model Parallelism**:
   - Split model across multiple nodes
   - Each node processes the same data but different parts of the model
   - Useful for very large models that don't fit in memory
   - Examples: Distributed neural networks, ensemble methods

3. **Pipeline Parallelism**:
   - Split the ML workflow into stages
   - Process data through stages in parallel
   - Examples: Feature extraction, model training, evaluation

4. **Hybrid Approaches**:
   - Combine multiple parallelism strategies
   - Optimize for specific hardware configurations
   - Examples: Distributed deep learning frameworks

```python
# Example: Data parallelism with parameter averaging
import numpy as np
from sklearn.linear_model import SGDClassifier
from joblib import Parallel, delayed

def train_on_partition(X_partition, y_partition, alpha=0.01):
    """Train a model on a data partition"""
    model = SGDClassifier(alpha=alpha, max_iter=100)
    model.fit(X_partition, y_partition)
    return model.coef_, model.intercept_

def average_models(models):
    """Average the parameters of multiple models"""
    coefs, intercepts = zip(*models)
    avg_coef = np.mean(coefs, axis=0)
    avg_intercept = np.mean(intercepts, axis=0)
    return avg_coef, avg_intercept

# Simulate distributed data
n_partitions = 4
X = np.random.randn(1000, 10)  # 1000 samples, 10 features
y = (np.random.randn(1000) > 0).astype(int)  # Binary labels

# Split data into partitions
X_partitions = np.array_split(X, n_partitions)
y_partitions = np.array_split(y, n_partitions)

# Train models in parallel
models = Parallel(n_jobs=n_partitions)(
    delayed(train_on_partition)(X_part, y_part) 
    for X_part, y_part in zip(X_partitions, y_partitions)
)

# Average model parameters
avg_coef, avg_intercept = average_models(models)

# Create a final model with averaged parameters
final_model = SGDClassifier()
final_model.coef_ = avg_coef
final_model.intercept_ = avg_intercept

print("Final model coefficients:", final_model.coef_)
print("Final model intercept:", final_model.intercept_)
```

### 1.3 Big Data ML Frameworks and Platforms

Overview of popular frameworks for machine learning with big data:

1. **Apache Spark MLlib**:
   - Built on Spark's distributed computing engine
   - Scalable ML algorithms
   - Pipeline API for end-to-end workflows
   - Integration with SQL, streaming, and graph processing

2. **TensorFlow on Distributed Systems**:
   - Distributed TensorFlow
   - Parameter servers and workers architecture
   - Horovod for distributed deep learning
   - TFX (TensorFlow Extended) for ML pipelines

3. **PyTorch Distributed**:
   - Distributed Data Parallel (DDP)
   - Distributed RPC framework
   - Integration with Ray and Dask
   - TorchServe for model serving

4. **Cloud ML Platforms**:
   - AWS SageMaker
   - Google Cloud AI Platform
   - Azure Machine Learning
   - Databricks ML

5. **Specialized Frameworks**:
   - Ray for distributed Python
   - Dask for parallel computing
   - H2O for scalable ML
   - RAPIDS for GPU-accelerated data science

> **Knowledge Check:** Compare and contrast data parallelism and model parallelism approaches for distributed machine learning. What are the advantages and limitations of each approach? When would you choose one over the other?

## 2. Distributed Machine Learning with Spark MLlib

### 2.1 Introduction to Spark MLlib

Apache Spark MLlib is a scalable machine learning library that runs on top of Spark's distributed computing engine:

1. **Key Features**:
   - Distributed data processing
   - In-memory computation
   - Fault tolerance
   - Unified API across languages
   - Integration with Spark ecosystem

2. **MLlib Components**:
   - ML Algorithms: Classification, regression, clustering, etc.
   - Feature Engineering: Transformers and estimators
   - Pipelines: Combining multiple stages
   - Persistence: Saving and loading models
   - Utilities: Linear algebra, statistics, etc.

3. **DataFrame-based API**:
   - Built on Spark SQL's DataFrame
   - Optimized execution through Catalyst optimizer
   - Support for structured and semi-structured data
   - Integration with other Spark components

### 2.2 Setting Up Spark for Machine Learning

Follow these steps to set up a Spark environment for machine learning:

1. **Install Spark and Dependencies**:

```bash
# Step 1: Install Java (if not already installed)
sudo apt-get update
sudo apt-get install -y openjdk-11-jdk

# Step 2: Download and extract Spark
wget https://downloads.apache.org/spark/spark-3.3.2/spark-3.3.2-bin-hadoop3.tgz
tar -xzf spark-3.3.2-bin-hadoop3.tgz
mv spark-3.3.2-bin-hadoop3 /opt/spark

# Step 3: Set environment variables
echo 'export SPARK_HOME=/opt/spark' >> ~/.bashrc
echo 'export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin' >> ~/.bashrc
source ~/.bashrc

# Step 4: Install PySpark
pip install pyspark==3.3.2
```

2. **Initialize a Spark Session**:

```python
# Step 1: Import necessary libraries
from pyspark.sql import SparkSession
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, StandardScaler
from pyspark.ml.classification import LogisticRegression

# Step 2: Create a Spark session
spark = SparkSession.builder \
    .appName("ML with Spark") \
    .config("spark.executor.memory", "4g") \
    .config("spark.driver.memory", "2g") \
    .config("spark.executor.cores", "2") \
    .getOrCreate()

# Step 3: Verify the session
print(f"Spark version: {spark.version}")
print(f"Spark UI: {spark.sparkContext.uiWebUrl}")
```

3. **Configure for Distributed Execution**:

```python
# Step 1: Set log level
spark.sparkContext.setLogLevel("WARN")

# Step 2: Check cluster configuration
print(f"Available executors: {spark.sparkContext.defaultParallelism}")
print(f"Default partition count: {spark.sparkContext.defaultMinPartitions}")

# Step 3: Configure shuffle partitions for better performance
spark.conf.set("spark.sql.shuffle.partitions", "20")
```

### 2.3 Building ML Pipelines with Spark

Spark MLlib provides a Pipeline API for building end-to-end machine learning workflows:

1. **Create a Complete ML Pipeline**:

```python
# Step 1: Load and examine data
data = spark.read.csv("s3://your-bucket/customer_churn.csv", 
                     header=True, inferSchema=True)
print(f"Dataset has {data.count()} rows and {len(data.columns)} columns")
data.printSchema()
data.show(5)

# Step 2: Split data into training and testing sets
train_data, test_data = data.randomSplit([0.8, 0.2], seed=42)
print(f"Training set size: {train_data.count()}")
print(f"Testing set size: {test_data.count()}")

# Step 3: Define feature columns and target
feature_cols = ["age", "income", "usage_minutes", "num_support_calls"]
target_col = "churned"

# Step 4: Create a feature vector assembler
assembler = VectorAssembler(inputCols=feature_cols, outputCol="features_raw")

# Step 5: Create a feature scaler
scaler = StandardScaler(inputCol="features_raw", outputCol="features")

# Step 6: Create a logistic regression model
lr = LogisticRegression(featuresCol="features", labelCol=target_col, 
                        maxIter=10, regParam=0.01)

# Step 7: Build the pipeline
pipeline = Pipeline(stages=[assembler, scaler, lr])

# Step 8: Train the model
model = pipeline.fit(train_data)

# Step 9: Make predictions
predictions = model.transform(test_data)
predictions.select("customer_id", target_col, "probability", "prediction").show(10)

# Step 10: Evaluate the model
from pyspark.ml.evaluation import BinaryClassificationEvaluator

evaluator = BinaryClassificationEvaluator(
    labelCol=target_col, 
    rawPredictionCol="rawPrediction",
    metricName="areaUnderROC"
)

auc = evaluator.evaluate(predictions)
print(f"Area under ROC: {auc:.4f}")
```

2. **Hyperparameter Tuning with Cross-Validation**:

```python
# Step 1: Import necessary components
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator

# Step 2: Create parameter grid
paramGrid = ParamGridBuilder() \
    .addGrid(lr.regParam, [0.01, 0.1, 1.0]) \
    .addGrid(lr.elasticNetParam, [0.0, 0.5, 1.0]) \
    .addGrid(lr.maxIter, [10, 50, 100]) \
    .build()

# Step 3: Set up cross-validator
cv = CrossValidator(
    estimator=pipeline,
    estimatorParamMaps=paramGrid,
    evaluator=evaluator,
    numFolds=3,
    parallelism=2  # Run evaluations in parallel
)

# Step 4: Run cross-validation
cvModel = cv.fit(train_data)

# Step 5: Get the best model
bestModel = cvModel.bestModel
bestPipeline = bestModel.stages[-1]  # Get the logistic regression model
print(f"Best regularization parameter: {bestPipeline.getRegParam()}")
print(f"Best elastic net parameter: {bestPipeline.getElasticNetParam()}")
print(f"Best max iterations: {bestPipeline.getMaxIter()}")

# Step 6: Evaluate the best model
best_predictions = bestModel.transform(test_data)
best_auc = evaluator.evaluate(best_predictions)
print(f"Best model AUC: {best_auc:.4f}")
```

3. **Save and Load Models**:

```python
# Step 1: Save the model
model_path = "s3://your-bucket/models/churn_prediction_model"
bestModel.write().overwrite().save(model_path)

# Step 2: Load the model
from pyspark.ml import PipelineModel
loaded_model = PipelineModel.load(model_path)

# Step 3: Use the loaded model
new_predictions = loaded_model.transform(test_data)
new_auc = evaluator.evaluate(new_predictions)
print(f"Loaded model AUC: {new_auc:.4f}")
```

### 2.4 Implementing Scalable ML Algorithms

Spark MLlib provides a variety of scalable machine learning algorithms:

1. **Classification Algorithms**:

```python
# Step 1: Import classification algorithms
from pyspark.ml.classification import (
    LogisticRegression,
    RandomForestClassifier,
    GBTClassifier,
    LinearSVC,
    NaiveBayes,
    MultilayerPerceptronClassifier
)

# Step 2: Create a Random Forest classifier
rf = RandomForestClassifier(
    featuresCol="features",
    labelCol=target_col,
    numTrees=100,
    maxDepth=5,
    seed=42
)

# Step 3: Build and train the pipeline
rf_pipeline = Pipeline(stages=[assembler, scaler, rf])
rf_model = rf_pipeline.fit(train_data)

# Step 4: Make predictions
rf_predictions = rf_model.transform(test_data)

# Step 5: Evaluate the model
rf_auc = evaluator.evaluate(rf_predictions)
print(f"Random Forest AUC: {rf_auc:.4f}")

# Step 6: Extract feature importance
feature_importance = rf_model.stages[-1].featureImportances
for i, importance in enumerate(feature_importance):
    print(f"Feature {feature_cols[i]}: {importance:.4f}")
```

2. **Clustering Algorithms**:

```python
# Step 1: Import clustering algorithms
from pyspark.ml.clustering import KMeans, BisectingKMeans, GaussianMixture

# Step 2: Prepare data for clustering
cluster_data = data.select(feature_cols)
cluster_assembler = VectorAssembler(inputCols=feature_cols, outputCol="features")
cluster_data = cluster_assembler.transform(cluster_data)

# Step 3: Create a K-Means model
kmeans = KMeans(featuresCol="features", k=5, seed=42)
kmeans_model = kmeans.fit(cluster_data)

# Step 4: Get cluster centers
centers = kmeans_model.clusterCenters()
print("Cluster Centers:")
for i, center in enumerate(centers):
    print(f"Cluster {i}: {center}")

# Step 5: Make predictions
clustered_data = kmeans_model.transform(cluster_data)
clustered_data.groupBy("prediction").count().show()

# Step 6: Evaluate the clustering
from pyspark.ml.evaluation import ClusteringEvaluator
evaluator = ClusteringEvaluator(featuresCol="features")
silhouette = evaluator.evaluate(clustered_data)
print(f"Silhouette score: {silhouette:.4f}")
```

3. **Recommendation Systems**:

```python
# Step 1: Import ALS algorithm
from pyspark.ml.recommendation import ALS

# Step 2: Prepare ratings data
ratings = spark.read.csv("s3://your-bucket/ratings.csv", 
                        header=True, inferSchema=True)
ratings.show(5)

# Step 3: Create an ALS model
als = ALS(
    userCol="user_id",
    itemCol="product_id",
    ratingCol="rating",
    coldStartStrategy="drop",
    nonnegative=True,
    implicitPrefs=False,
    rank=10,
    maxIter=10
)

# Step 4: Split data
train_ratings, test_ratings = ratings.randomSplit([0.8, 0.2], seed=42)

# Step 5: Train the model
als_model = als.fit(train_ratings)

# Step 6: Make recommendations
user_recs = als_model.recommendForAllUsers(10)  # Top 10 items for each user
item_recs = als_model.recommendForAllItems(10)  # Top 10 users for each item

# Step 7: Show recommendations for a specific user
user_recs.filter(user_recs.user_id == 123).show()

# Step 8: Evaluate the model
predictions = als_model.transform(test_ratings)
from pyspark.ml.evaluation import RegressionEvaluator
rmse = RegressionEvaluator(
    metricName="rmse", 
    labelCol="rating", 
    predictionCol="prediction"
).evaluate(predictions)
print(f"Root Mean Squared Error: {rmse:.4f}")
```

> **Hands-on Exercise:** Build a complete machine learning pipeline using Spark MLlib for a classification or regression problem of your choice. Implement data preprocessing, feature engineering, model training with hyperparameter tuning, and evaluation. Compare the performance of at least three different algorithms and document your findings. Bonus: Implement distributed cross-validation to find the optimal hyperparameters.

## 3. Scalable Deep Learning for Big Data

### 3.1 Distributed Deep Learning Frameworks

Several frameworks enable distributed deep learning on big data:

1. **Distributed TensorFlow**:
   - Parameter server architecture
   - Mirrored strategy for data parallelism
   - Multi-worker strategies
   - Integration with TF.Keras

2. **Horovod**:
   - Ring-allreduce algorithm
   - Support for TensorFlow, PyTorch, and MXNet
   - Integration with Spark
   - Efficient distributed training

3. **PyTorch Distributed**:
   - Distributed Data Parallel (DDP)
   - DistributedDataParallel for model training
   - RPC-based distributed training
   - Integration with Ray and Dask

4. **BigDL and Analytics Zoo**:
   - Deep learning on Spark
   - Distributed training and inference
   - Integration with TensorFlow and PyTorch
   - End-to-end analytics pipelines

### 3.2 Implementing Distributed Deep Learning with Horovod

Horovod is a popular framework for distributed deep learning:

1. **Set Up Horovod with TensorFlow**:

```bash
# Step 1: Install Horovod with TensorFlow support
pip install horovod[tensorflow]
```

```python
# Step 2: Import libraries
import tensorflow as tf
import horovod.tensorflow.keras as hvd
import numpy as np

# Step 3: Initialize Horovod
hvd.init()

# Step 4: Set up GPU (if available)
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    tf.config.experimental.set_visible_devices(gpus[hvd.local_rank()], 'GPU')
    tf.config.experimental.set_memory_growth(gpus[hvd.local_rank()], True)

# Step 5: Print Horovod configuration
print(f"Horovod size: {hvd.size()}")
print(f"Horovod rank: {hvd.rank()}")
print(f"Horovod local rank: {hvd.local_rank()}")
```

2. **Build and Train a Distributed Model**:

```python
# Step 1: Prepare data (MNIST example)
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

# Step 2: Shard the data between workers
train_dataset = tf.data.Dataset.from_tensor_slices((x_train, y_train))
train_dataset = train_dataset.shard(hvd.size(), hvd.rank())
train_dataset = train_dataset.shuffle(10000).batch(128).repeat()

test_dataset = tf.data.Dataset.from_tensor_slices((x_test, y_test))
test_dataset = test_dataset.batch(128)

# Step 3: Build the model
model = tf.keras.Sequential([
    tf.keras.layers.Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
    tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
    tf.keras.layers.Dropout(0.25),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(10, activation='softmax')
])

# Step 4: Adjust learning rate based on number of workers
opt = tf.keras.optimizers.Adam(0.001 * hvd.size())

# Step 5: Use Horovod Distributed Optimizer
opt = hvd.DistributedOptimizer(opt)

# Step 6: Compile the model
model.compile(
    loss='categorical_crossentropy',
    optimizer=opt,
    metrics=['accuracy'],
    experimental_run_tf_function=False
)

# Step 7: Define callbacks
callbacks = [
    hvd.callbacks.BroadcastGlobalVariablesCallback(0),
    hvd.callbacks.MetricAverageCallback(),
]

# Add checkpointing on the first worker only
if hvd.rank() == 0:
    callbacks.append(tf.keras.callbacks.ModelCheckpoint('./checkpoint-{epoch}.h5'))

# Step 8: Train the model
steps_per_epoch = len(x_train) // (128 * hvd.size())
model.fit(
    train_dataset,
    steps_per_epoch=steps_per_epoch,
    epochs=10,
    callbacks=callbacks,
    verbose=1 if hvd.rank() == 0 else 0
)

# Step 9: Evaluate on the first worker only
if hvd.rank() == 0:
    score = model.evaluate(test_dataset)
    print(f"Test loss: {score[0]:.4f}")
    print(f"Test accuracy: {score[1]:.4f}")
```

3. **Run Distributed Training**:

```bash
# Run on 4 GPUs on a single machine
horovodrun -np 4 python distributed_training.py

# Run on multiple nodes (e.g., 4 nodes with 4 GPUs each)
horovodrun -np 16 -H server1:4,server2:4,server3:4,server4:4 python distributed_training.py
```

### 3.3 Deep Learning on Spark with TensorFlow

Combining Spark with TensorFlow for distributed deep learning:

1. **Set Up TensorFlow on Spark**:

```python
# Step 1: Import libraries
from pyspark.sql import SparkSession
import tensorflow as tf
import numpy as np
import pandas as pd

# Step 2: Create a Spark session
spark = SparkSession.builder \
    .appName("TensorFlow on Spark") \
    .config("spark.executor.memory", "4g") \
    .config("spark.driver.memory", "2g") \
    .getOrCreate()

# Step 3: Define a function to create and train a TF model
def train_model(iterator):
    # This function runs on each executor
    for batch in iterator:
        # Convert batch to pandas
        pdf = batch.toPandas()
        
        # Extract features and labels
        features = pdf.drop('label', axis=1).values.astype(np.float32)
        labels = pdf['label'].values.astype(np.int32)
        
        # Create a simple model
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(features.shape[1],)),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        
        # Compile and train
        model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        history = model.fit(features, labels, epochs=5, verbose=0)
        
        # Return the trained model and metrics
        yield {
            'model_weights': model.get_weights(),
            'final_loss': history.history['loss'][-1],
            'final_accuracy': history.history['accuracy'][-1]
        }

# Step 4: Load data
data = spark.read.csv("s3://your-bucket/customer_churn.csv", 
                     header=True, inferSchema=True)

# Step 5: Prepare features
from pyspark.ml.feature import VectorAssembler, StandardScaler
feature_cols = ["age", "income", "usage_minutes", "num_support_calls"]
assembler = VectorAssembler(inputCols=feature_cols, outputCol="features_vec")
scaler = StandardScaler(inputCol="features_vec", outputCol="features")
pipeline = Pipeline(stages=[assembler, scaler])
data = pipeline.fit(data).transform(data)

# Step 6: Split data
train_data, test_data = data.randomSplit([0.8, 0.2], seed=42)

# Step 7: Repartition for distributed training
train_data = train_data.repartition(8)  # 8 partitions

# Step 8: Run distributed training
results = train_data.mapInPandas(train_model, schema="model_weights: array<array<float>>, final_loss: float, final_accuracy: float").collect()

# Step 9: Aggregate results (e.g., average weights)
all_weights = [result['model_weights'] for result in results]
avg_weights = [np.mean([w[i] for w in all_weights], axis=0) for i in range(len(all_weights[0]))]

# Step 10: Create a final model with averaged weights
final_model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(len(feature_cols),)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])
final_model.set_weights(avg_weights)

# Step 11: Save the final model
final_model.save("s3://your-bucket/models/spark_tf_model")
```

2. **Use TensorFlow Ecosystem (TFX) with Spark**:

```python
# Step 1: Import TFX components
import tensorflow as tf
import tensorflow_transform as tft
from tfx.components import StatisticsGen, SchemaGen, ExampleValidator
from tfx.components import Transform, Trainer, Evaluator, Pusher
from tfx.orchestration import pipeline
from tfx.orchestration.beam.beam_dag_runner import BeamDagRunner
from tfx.proto import trainer_pb2
from tfx.extensions.google_cloud_big_query.example_gen.component import BigQueryExampleGen
from tfx.dsl.components.common import resolver
from tfx.dsl.experimental import latest_blessed_model_resolver

# Step 2: Define preprocessing function
def preprocessing_fn(inputs):
    """TensorFlow Transform preprocessing function."""
    outputs = {}
    
    # Scale numerical features
    for key in ['age', 'income', 'usage_minutes', 'num_support_calls']:
        outputs[key + '_scaled'] = tft.scale_to_z_score(inputs[key])
    
    # Convert categorical features to one-hot
    outputs['gender_onehot'] = tft.compute_and_apply_vocabulary(
        inputs['gender'], vocab_filename='gender')
    
    # Create features and label
    outputs['features'] = tf.stack([
        outputs['age_scaled'],
        outputs['income_scaled'],
        outputs['usage_minutes_scaled'],
        outputs['num_support_calls_scaled'],
        outputs['gender_onehot']
    ], axis=1)
    
    outputs['label'] = tf.cast(inputs['churned'], tf.int64)
    
    return outputs

# Step 3: Define model function
def run_fn(fn_args):
    """Define a model using Keras."""
    tf_transform_output = tft.TFTransformOutput(fn_args.transform_output)
    
    # Get the transformed feature specifications
    feature_spec = tf_transform_output.transformed_feature_spec()
    
    # Create the input layers
    feature_layer = tf.keras.layers.Input(shape=(5,), name='features')
    
    # Build the model
    x = tf.keras.layers.Dense(64, activation='relu')(feature_layer)
    x = tf.keras.layers.Dropout(0.2)(x)
    x = tf.keras.layers.Dense(32, activation='relu')(x)
    x = tf.keras.layers.Dropout(0.2)(x)
    outputs = tf.keras.layers.Dense(1, activation='sigmoid')(x)
    
    model = tf.keras.Model(inputs=feature_layer, outputs=outputs)
    
    # Compile the model
    model.compile(
        optimizer=tf.keras.optimizers.Adam(0.001),
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    # Train the model
    train_dataset = fn_args.train_files
    eval_dataset = fn_args.eval_files
    
    model.fit(
        train_dataset,
        steps_per_epoch=1000,
        validation_data=eval_dataset,
        validation_steps=100,
        epochs=5
    )
    
    # Save the model
    model.save(fn_args.serving_model_dir, save_format='tf')

# Step 4: Define the pipeline
def create_pipeline():
    # Get data from BigQuery
    example_gen = BigQueryExampleGen(
        query='SELECT * FROM customer_churn.training_data')
    
    # Generate statistics
    statistics_gen = StatisticsGen(examples=example_gen.outputs['examples'])
    
    # Generate schema
    schema_gen = SchemaGen(
        statistics=statistics_gen.outputs['statistics'],
        infer_feature_shape=True)
    
    # Validate examples
    example_validator = ExampleValidator(
        statistics=statistics_gen.outputs['statistics'],
        schema=schema_gen.outputs['schema'])
    
    # Transform features
    transform = Transform(
        examples=example_gen.outputs['examples'],
        schema=schema_gen.outputs['schema'],
        preprocessing_fn=preprocessing_fn)
    
    # Train the model
    trainer = Trainer(
        module_file='model.py',  # Contains run_fn
        examples=transform.outputs['transformed_examples'],
        transform_graph=transform.outputs['transform_graph'],
        schema=schema_gen.outputs['schema'],
        train_args=trainer_pb2.TrainArgs(num_steps=1000),
        eval_args=trainer_pb2.EvalArgs(num_steps=100))
    
    # Get the latest blessed model for evaluation
    model_resolver = resolver.Resolver(
        strategy_class=latest_blessed_model_resolver.LatestBlessedModelResolver,
        model=trainer.outputs['model'],
        model_blessing=evaluator.outputs['blessing']).with_id('latest_blessed_model_resolver')
    
    # Evaluate the model
    evaluator = Evaluator(
        examples=example_gen.outputs['examples'],
        model=trainer.outputs['model'],
        baseline_model=model_resolver.outputs['model'],
        eval_config=eval_config)
    
    # Push the model to a serving destination
    pusher = Pusher(
        model=trainer.outputs['model'],
        model_blessing=evaluator.outputs['blessing'],
        push_destination=pusher_pb2.PushDestination(
            filesystem=pusher_pb2.PushDestination.Filesystem(
                base_directory='/serving_model')))
    
    # Define the pipeline
    return pipeline.Pipeline(
        pipeline_name='customer_churn_pipeline',
        pipeline_root='/pipeline_root',
        components=[
            example_gen, statistics_gen, schema_gen, example_validator,
            transform, trainer, model_resolver, evaluator, pusher
        ],
        enable_cache=True)

# Step 5: Run the pipeline
BeamDagRunner().run(create_pipeline())
```

### 3.4 Scaling Deep Learning with Ray

Ray is a distributed computing framework that simplifies scaling deep learning:

1. **Set Up Ray with PyTorch**:

```python
# Step 1: Import libraries
import ray
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
from ray import tune
from ray.tune.schedulers import ASHAScheduler

# Step 2: Initialize Ray
ray.init(address='auto', dashboard_host='0.0.0.0')
print(f"Ray dashboard available at: {ray.get_webui_url()}")

# Step 3: Define a PyTorch model
class ConvNet(nn.Module):
    def __init__(self):
        super(ConvNet, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.dropout1 = nn.Dropout2d(0.25)
        self.dropout2 = nn.Dropout2d(0.5)
        self.fc1 = nn.Linear(9216, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = nn.functional.relu(x)
        x = self.conv2(x)
        x = nn.functional.relu(x)
        x = nn.functional.max_pool2d(x, 2)
        x = self.dropout1(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = nn.functional.relu(x)
        x = self.dropout2(x)
        x = self.fc2(x)
        return nn.functional.log_softmax(x, dim=1)
```

2. **Distributed Training with Ray Tune**:

```python
# Step 1: Define training function
def train_mnist(config):
    # Data transformations
    transform = transforms.Compose([
        transforms.ToTensor(),
        transforms.Normalize((0.1307,), (0.3081,))
    ])
    
    # Load data
    trainset = torchvision.datasets.MNIST(
        root='./data', train=True, download=True, transform=transform)
    testset = torchvision.datasets.MNIST(
        root='./data', train=False, download=True, transform=transform)
    
    # Create data loaders
    train_loader = torch.utils.data.DataLoader(
        trainset, batch_size=config["batch_size"], shuffle=True)
    test_loader = torch.utils.data.DataLoader(
        testset, batch_size=config["batch_size"], shuffle=False)
    
    # Set device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    # Create model, optimizer, and loss function
    model = ConvNet().to(device)
    optimizer = optim.SGD(
        model.parameters(),
        lr=config["lr"],
        momentum=config["momentum"]
    )
    criterion = nn.CrossEntropyLoss()
    
    # Training loop
    for epoch in range(config["epochs"]):
        model.train()
        for batch_idx, (data, target) in enumerate(train_loader):
            data, target = data.to(device), target.to(device)
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            optimizer.step()
            
        # Validation
        model.eval()
        correct = 0
        total = 0
        with torch.no_grad():
            for data, target in test_loader:
                data, target = data.to(device), target.to(device)
                outputs = model(data)
                _, predicted = torch.max(outputs.data, 1)
                total += target.size(0)
                correct += (predicted == target).sum().item()
        
        accuracy = correct / total
        
        # Report metrics to Ray Tune
        tune.report(loss=loss.item(), accuracy=accuracy)

# Step 2: Configure hyperparameter search
config = {
    "lr": tune.loguniform(1e-4, 1e-1),
    "momentum": tune.uniform(0.1, 0.9),
    "batch_size": tune.choice([32, 64, 128]),
    "epochs": 10
}

# Step 3: Configure search algorithm and scheduler
scheduler = ASHAScheduler(
    metric="accuracy",
    mode="max",
    max_t=10,
    grace_period=1,
    reduction_factor=2
)

# Step 4: Run hyperparameter tuning
result = tune.run(
    train_mnist,
    resources_per_trial={"cpu": 2, "gpu": 0.5},
    config=config,
    num_samples=10,
    scheduler=scheduler
)

# Step 5: Get best trial
best_trial = result.get_best_trial("accuracy", "max", "last")
print(f"Best trial config: {best_trial.config}")
print(f"Best trial final accuracy: {best_trial.last_result['accuracy']}")
```

3. **Distributed Data Processing with Ray**:

```python
# Step 1: Define data processing tasks
@ray.remote
def preprocess_chunk(chunk_data):
    # Simulate preprocessing
    import time
    import numpy as np
    
    # Add some processing delay
    time.sleep(0.5)
    
    # Apply transformations
    processed = np.array(chunk_data) * 2 + 1
    
    # Return processed data
    return processed

# Step 2: Generate sample data
import numpy as np
data = np.random.rand(1000000)

# Step 3: Split data into chunks
chunk_size = 100000
chunks = [data[i:i+chunk_size] for i in range(0, len(data), chunk_size)]

# Step 4: Process chunks in parallel
futures = [preprocess_chunk.remote(chunk) for chunk in chunks]

# Step 5: Get results
processed_chunks = ray.get(futures)

# Step 6: Combine results
processed_data = np.concatenate(processed_chunks)
print(f"Processed {len(processed_data)} data points")
```

> **Hands-on Exercise:** Implement a distributed deep learning solution using either Horovod, TensorFlow on Spark, or Ray for a computer vision or natural language processing task. Compare the training time and model performance between single-node and distributed training. Document your approach, challenges faced, and the performance improvements achieved through distributed training.

## 4. Machine Learning Pipelines for Big Data

### 4.1 End-to-End ML Pipelines

Building production-ready machine learning pipelines for big data:

1. **Pipeline Components**:
   - Data ingestion
   - Data validation
   - Feature engineering
   - Model training
   - Model evaluation
   - Model deployment
   - Monitoring and feedback

2. **Pipeline Orchestration**:
   - Apache Airflow
   - Kubeflow
   - MLflow
   - TFX (TensorFlow Extended)
   - Metaflow

3. **Pipeline Requirements**:
   - Scalability
   - Reproducibility
   - Monitoring
   - Versioning
   - Automation

### 4.2 Building ML Pipelines with MLflow

MLflow is an open-source platform for managing the ML lifecycle:

1. **Set Up MLflow**:

```bash
# Step 1: Install MLflow
pip install mlflow

# Step 2: Start MLflow tracking server
mlflow server --host 0.0.0.0 --port 5000
```

2. **Track Experiments with MLflow**:

```python
# Step 1: Import libraries
import mlflow
import mlflow.pyfunc
import mlflow.sklearn
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Step 2: Set tracking URI
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("customer_churn_prediction")

# Step 3: Load and prepare data
data = pd.read_csv("s3://your-bucket/customer_churn.csv")
X = data.drop("churned", axis=1)
y = data["churned"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 4: Train with experiment tracking
with mlflow.start_run(run_name="random_forest_model"):
    # Log parameters
    params = {
        "n_estimators": 100,
        "max_depth": 10,
        "min_samples_split": 5,
        "random_state": 42
    }
    mlflow.log_params(params)
    
    # Train model
    rf = RandomForestClassifier(**params)
    rf.fit(X_train, y_train)
    
    # Make predictions
    y_pred = rf.predict(X_test)
    
    # Log metrics
    metrics = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred)
    }
    mlflow.log_metrics(metrics)
    
    # Log feature importance
    feature_importance = pd.DataFrame(
        rf.feature_importances_,
        index=X.columns,
        columns=["importance"]
    ).sort_values("importance", ascending=False)
    
    # Create and log feature importance plot
    import matplotlib.pyplot as plt
    plt.figure(figsize=(10, 6))
    plt.barh(feature_importance.index, feature_importance["importance"])
    plt.xlabel("Importance")
    plt.title("Feature Importance")
    plt.tight_layout()
    plt.savefig("feature_importance.png")
    mlflow.log_artifact("feature_importance.png")
    
    # Log model
    mlflow.sklearn.log_model(rf, "random_forest_model")
    
    # Log input example
    mlflow.log_input(mlflow.data.from_pandas(X_train.head()))
    
    print(f"Model trained with accuracy: {metrics['accuracy']:.4f}")
```

3. **Create an MLflow Project**:

```yaml
# MLproject file
name: customer_churn_prediction

conda_env: conda.yaml

entry_points:
  main:
    parameters:
      data_path: {type: string, default: "s3://your-bucket/customer_churn.csv"}
      n_estimators: {type: int, default: 100}
      max_depth: {type: int, default: 10}
      min_samples_split: {type: int, default: 5}
    command: "python train.py --data-path {data_path} --n-estimators {n_estimators} --max-depth {max_depth} --min-samples-split {min_samples_split}"
  
  preprocess:
    parameters:
      data_path: {type: string, default: "s3://your-bucket/raw_data.csv"}
      output_path: {type: string, default: "s3://your-bucket/customer_churn.csv"}
    command: "python preprocess.py --data-path {data_path} --output-path {output_path}"
```

```yaml
# conda.yaml file
name: churn_prediction
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.8
  - pip
  - pandas>=1.3.0
  - scikit-learn>=1.0.0
  - matplotlib>=3.4.0
  - pip:
    - mlflow>=2.0.0
    - boto3>=1.20.0
```

```python
# train.py file
import argparse
import mlflow
import mlflow.sklearn
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def parse_args():
    parser = argparse.ArgumentParser(description="Train a Random Forest model for customer churn prediction")
    parser.add_argument("--data-path", type=str, default="s3://your-bucket/customer_churn.csv")
    parser.add_argument("--n-estimators", type=int, default=100)
    parser.add_argument("--max-depth", type=int, default=10)
    parser.add_argument("--min-samples-split", type=int, default=5)
    return parser.parse_args()

def main():
    # Parse command line arguments
    args = parse_args()
    
    # Set experiment
    mlflow.set_experiment("customer_churn_prediction")
    
    # Start MLflow run
    with mlflow.start_run():
        # Log parameters
        mlflow.log_param("data_path", args.data_path)
        mlflow.log_param("n_estimators", args.n_estimators)
        mlflow.log_param("max_depth", args.max_depth)
        mlflow.log_param("min_samples_split", args.min_samples_split)
        
        # Load data
        data = pd.read_csv(args.data_path)
        X = data.drop("churned", axis=1)
        y = data["churned"]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Train model
        rf = RandomForestClassifier(
            n_estimators=args.n_estimators,
            max_depth=args.max_depth,
            min_samples_split=args.min_samples_split,
            random_state=42
        )
        rf.fit(X_train, y_train)
        
        # Make predictions
        y_pred = rf.predict(X_test)
        
        # Log metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        
        mlflow.log_metrics({
            "accuracy": accuracy,
            "precision": precision,
            "recall": recall,
            "f1": f1
        })
        
        # Log model
        mlflow.sklearn.log_model(rf, "model")
        
        print(f"Model trained with accuracy: {accuracy:.4f}")

if __name__ == "__main__":
    main()
```

4. **Run MLflow Project**:

```bash
# Run locally
mlflow run . -P data_path=s3://your-bucket/customer_churn.csv -P n_estimators=200

# Run on remote cluster
mlflow run git@github.com:username/customer-churn.git -P data_path=s3://your-bucket/customer_churn.csv -P n_estimators=200 --backend databricks --backend-config cluster-spec.json
```

### 4.3 Deploying ML Models for Big Data

Strategies for deploying machine learning models in big data environments:

1. **Batch Prediction**:

```python
# Step 1: Load the trained model
import mlflow.pyfunc
import pandas as pd

# Load model from MLflow
model_uri = "models:/customer_churn_model/production"
model = mlflow.pyfunc.load_model(model_uri)

# Step 2: Load batch data
batch_data = pd.read_csv("s3://your-bucket/new_customers.csv")

# Step 3: Make predictions
predictions = model.predict(batch_data)

# Step 4: Save predictions
results = batch_data.copy()
results["churn_prediction"] = predictions
results["churn_probability"] = [p[1] for p in model.predict_proba(batch_data)]
results.to_csv("s3://your-bucket/churn_predictions.csv", index=False)
```

2. **Real-time Serving with MLflow**:

```python
# Step 1: Register the model
import mlflow.sklearn

# Register model in MLflow Model Registry
model_uri = "runs:/your-run-id/model"
mlflow.register_model(model_uri, "customer_churn_model")

# Step 2: Deploy as a REST API
mlflow models serve -m "models:/customer_churn_model/production" -p 5001 --no-conda

# Step 3: Test the API
import requests
import json

# Prepare test data
test_data = {
    "columns": ["age", "income", "usage_minutes", "num_support_calls"],
    "data": [[45, 75000, 350, 2]]
}

# Send request to the API
response = requests.post(
    "http://localhost:5001/invocations",
    data=json.dumps(test_data),
    headers={"Content-Type": "application/json"}
)

# Parse response
result = json.loads(response.text)
print(f"Churn prediction: {result}")
```

3. **Deployment on Kubernetes with Seldon Core**:

```yaml
# seldon-deployment.yaml
apiVersion: machinelearning.seldon.io/v1
kind: SeldonDeployment
metadata:
  name: churn-predictor
spec:
  name: churn-prediction
  predictors:
  - name: default
    graph:
      name: churn-model
      implementation: SKLEARN_SERVER
      modelUri: s3://your-bucket/models/churn-model
      envSecretRefName: s3-credentials
    replicas: 2
    traffic: 100
```

```bash
# Apply the deployment
kubectl apply -f seldon-deployment.yaml

# Test the deployment
curl -X POST http://seldon-gateway/seldon/churn-predictor/api/v1.0/predictions \
    -H "Content-Type: application/json" \
    -d '{"data": {"ndarray": [[45, 75000, 350, 2]]}}'
```

4. **Spark Streaming for Online Predictions**:

```python
# Step 1: Import libraries
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, udf
from pyspark.sql.types import DoubleType, ArrayType
import mlflow.pyfunc
import pandas as pd

# Step 2: Create Spark session
spark = SparkSession.builder \
    .appName("Streaming Predictions") \
    .getOrCreate()

# Step 3: Load the model
model_path = "models:/customer_churn_model/production"
loaded_model = mlflow.pyfunc.load_model(model_path)

# Step 4: Define prediction UDF
@udf(returnType=DoubleType())
def predict_churn(age, income, usage_minutes, num_support_calls):
    # Create a DataFrame with the input data
    data = pd.DataFrame({
        "age": [age],
        "income": [income],
        "usage_minutes": [usage_minutes],
        "num_support_calls": [num_support_calls]
    })
    
    # Make prediction
    prediction = loaded_model.predict(data)[0]
    return float(prediction)

# Step 5: Read streaming data
streaming_data = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("subscribe", "customer-events") \
    .load()

# Step 6: Parse JSON data
from pyspark.sql.functions import from_json
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType

schema = StructType([
    StructField("customer_id", StringType(), True),
    StructField("timestamp", StringType(), True),
    StructField("age", IntegerType(), True),
    StructField("income", DoubleType(), True),
    StructField("usage_minutes", DoubleType(), True),
    StructField("num_support_calls", IntegerType(), True)
])

parsed_data = streaming_data \
    .select(from_json(col("value").cast("string"), schema).alias("data")) \
    .select("data.*")

# Step 7: Apply predictions
predictions = parsed_data \
    .withColumn("churn_prediction", 
                predict_churn(
                    col("age"), 
                    col("income"), 
                    col("usage_minutes"), 
                    col("num_support_calls")
                ))

# Step 8: Write predictions to output
query = predictions \
    .selectExpr("customer_id", "timestamp", "churn_prediction", 
                "to_json(struct(*)) AS value") \
    .writeStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "kafka:9092") \
    .option("topic", "churn-predictions") \
    .option("checkpointLocation", "/tmp/checkpoints") \
    .start()

# Step 9: Wait for termination
query.awaitTermination()
```

> **Knowledge Check:** Compare batch prediction, real-time serving, and stream processing approaches for deploying machine learning models in big data environments. What are the trade-offs in terms of latency, throughput, and complexity? When would you choose each approach?

## 5. Advanced Topics in Big Data ML/AI

### 5.1 Federated Learning

Federated learning enables training models across decentralized devices:

1. **Key Concepts**:
   - Training on edge devices
   - Privacy preservation
   - Model aggregation
   - Reduced data transfer

2. **Implementation with TensorFlow Federated**:

```python
# Step 1: Import libraries
import tensorflow as tf
import tensorflow_federated as tff
import numpy as np

# Step 2: Load and preprocess data
mnist_train, mnist_test = tf.keras.datasets.mnist.load_data()

def preprocess(dataset):
    """Preprocess MNIST dataset."""
    images, labels = dataset
    images = images.reshape(-1, 28, 28, 1) / 255.0
    labels = labels.astype(np.int32)
    return images, labels

train_images, train_labels = preprocess(mnist_train)
test_images, test_labels = preprocess(mnist_test)

# Step 3: Create client datasets (simulate multiple clients)
NUM_CLIENTS = 10
BATCH_SIZE = 32

# Divide training data among clients
client_train_datasets = []
samples_per_client = len(train_images) // NUM_CLIENTS

for i in range(NUM_CLIENTS):
    start_idx = i * samples_per_client
    end_idx = (i + 1) * samples_per_client
    
    client_images = train_images[start_idx:end_idx]
    client_labels = train_labels[start_idx:end_idx]
    
    dataset = tf.data.Dataset.from_tensor_slices((client_images, client_labels))
    dataset = dataset.shuffle(samples_per_client).batch(BATCH_SIZE)
    client_train_datasets.append(dataset)

# Step 4: Define the model
def create_keras_model():
    return tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Conv2D(64, kernel_size=(3, 3), activation='relu'),
        tf.keras.layers.MaxPooling2D(pool_size=(2, 2)),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(128, activation='relu'),
        tf.keras.layers.Dense(10, activation='softmax')
    ])

# Step 5: Define TFF model
def model_fn():
    keras_model = create_keras_model()
    return tff.learning.from_keras_model(
        keras_model,
        input_spec=client_train_datasets[0].element_spec,
        loss=tf.keras.losses.SparseCategoricalCrossentropy(),
        metrics=[tf.keras.metrics.SparseCategoricalAccuracy()]
    )

# Step 6: Create and run federated training
federated_algorithm = tff.learning.build_federated_averaging_process(
    model_fn,
    client_optimizer_fn=lambda: tf.keras.optimizers.SGD(0.1)
)

# Initialize server state
state = federated_algorithm.initialize()

# Run federated training for multiple rounds
NUM_ROUNDS = 10
for round_num in range(NUM_ROUNDS):
    state, metrics = federated_algorithm.next(state, client_train_datasets)
    print(f'Round {round_num+1}, metrics: {metrics}')

# Step 7: Evaluate the final model
evaluation = tff.learning.build_federated_evaluation(model_fn)
test_dataset = tf.data.Dataset.from_tensor_slices((test_images, test_labels)).batch(BATCH_SIZE)
test_metrics = evaluation(state.model, [test_dataset])
print(f'Test metrics: {test_metrics}')
```

### 5.2 Reinforcement Learning at Scale

Scaling reinforcement learning for big data applications:

1. **Distributed RL with Ray RLlib**:

```python
# Step 1: Import libraries
import ray
from ray import tune
from ray.rllib.agents.ppo import PPOTrainer
from ray.tune.registry import register_env
import gym
import numpy as np

# Step 2: Initialize Ray
ray.init()

# Step 3: Define a custom environment
class CustomEnv(gym.Env):
    def __init__(self, config=None):
        self.action_space = gym.spaces.Discrete(2)  # Two actions: 0 or 1
        self.observation_space = gym.spaces.Box(
            low=0, high=1, shape=(4,), dtype=np.float32)
        self.state = np.random.rand(4)
        self.steps = 0
        self.max_steps = 100
    
    def reset(self):
        self.state = np.random.rand(4)
        self.steps = 0
        return self.state
    
    def step(self, action):
        # Simple dynamics
        if action == 0:
            self.state[0] += 0.1
            self.state[1] -= 0.1
        else:
            self.state[0] -= 0.1
            self.state[1] += 0.1
        
        # Clip state to valid range
        self.state = np.clip(self.state, 0, 1)
        
        # Calculate reward
        reward = 1.0 if np.sum(self.state) > 2.0 else -0.1
        
        # Check if episode is done
        self.steps += 1
        done = self.steps >= self.max_steps
        
        return self.state, reward, done, {}

# Step 4: Register the environment
register_env("custom_env", lambda config: CustomEnv(config))

# Step 5: Configure the RL algorithm
config = {
    "env": "custom_env",
    "num_workers": 4,
    "num_gpus": 0,
    "framework": "tf",
    "train_batch_size": 4000,
    "rollout_fragment_length": 200,
    "sgd_minibatch_size": 128,
    "num_sgd_iter": 10,
    "lr": 5e-5,
    "gamma": 0.99,
    "lambda": 0.95,
    "clip_param": 0.2,
    "vf_clip_param": 10.0,
    "entropy_coeff": 0.01,
    "kl_coeff": 0.5,
    "kl_target": 0.01,
}

# Step 6: Run distributed training
results = tune.run(
    "PPO",
    config=config,
    stop={"training_iteration": 100},
    checkpoint_freq=10,
    checkpoint_at_end=True,
    verbose=1
)

# Step 7: Get the best checkpoint
best_checkpoint = results.get_best_checkpoint(
    results.get_best_trial("episode_reward_mean", "max"),
    "episode_reward_mean",
    "max"
)

# Step 8: Load and test the trained policy
agent = PPOTrainer(config=config)
agent.restore(best_checkpoint)

env = CustomEnv()
state = env.reset()
done = False
total_reward = 0

while not done:
    action = agent.compute_single_action(state)
    state, reward, done, _ = env.step(action)
    total_reward += reward

print(f"Total reward: {total_reward}")
```

### 5.3 AutoML for Big Data

Automated machine learning for big data environments:

1. **AutoML with H2O**:

```python
# Step 1: Import libraries
import h2o
from h2o.automl import H2OAutoML
import pandas as pd

# Step 2: Initialize H2O cluster
h2o.init(nthreads=-1, max_mem_size="8G")

# Step 3: Load data
data = pd.read_csv("s3://your-bucket/customer_churn.csv")
h2o_data = h2o.H2OFrame(data)

# Step 4: Split data
train, test = h2o_data.split_frame(ratios=[0.8], seed=42)

# Step 5: Identify predictors and response
x = list(h2o_data.columns)
y = "churned"
x.remove(y)

# Step 6: Run AutoML
aml = H2OAutoML(
    max_runtime_secs=3600,  # 1 hour
    max_models=20,
    seed=42,
    sort_metric="AUC"
)
aml.train(x=x, y=y, training_frame=train)

# Step 7: View AutoML leaderboard
lb = aml.leaderboard
print(lb.head(10))

# Step 8: Get the best model
best_model = aml.leader

# Step 9: Evaluate on test data
perf = best_model.model_performance(test)
print(perf)

# Step 10: Make predictions
predictions = best_model.predict(test)
predictions.head()

# Step 11: Save the model
model_path = h2o.save_model(model=best_model, path="./models", force=True)
print(f"Model saved to: {model_path}")
```

2. **Distributed AutoML with FLAML**:

```python
# Step 1: Import libraries
import flaml
from flaml.automl.spark import SparkML
from pyspark.sql import SparkSession
import pandas as pd

# Step 2: Create Spark session
spark = SparkSession.builder \
    .appName("Distributed AutoML") \
    .config("spark.executor.memory", "4g") \
    .config("spark.driver.memory", "2g") \
    .getOrCreate()

# Step 3: Load data
data = spark.read.csv("s3://your-bucket/customer_churn.csv", 
                     header=True, inferSchema=True)

# Step 4: Prepare features
from pyspark.ml.feature import VectorAssembler
feature_cols = [c for c in data.columns if c != "churned"]
assembler = VectorAssembler(inputCols=feature_cols, outputCol="features")
data = assembler.transform(data)

# Step 5: Split data
train_data, test_data = data.randomSplit([0.8, 0.2], seed=42)

# Step 6: Configure and run AutoML
automl = flaml.AutoML()
settings = {
    "time_budget": 3600,  # 1 hour
    "metric": "accuracy",
    "task": "classification",
    "estimator_list": ["lgbm", "rf", "xgboost", "catboost"],
    "n_concurrent_trials": 4,  # Number of parallel trials
    "force_cancel": True,  # Enable early stopping
}

# Step 7: Run AutoML with Spark
spark_ml = SparkML(
    spark_session=spark,
    metric="accuracy",
    task="classification"
)
spark_ml.fit(
    train_data=train_data,
    label="churned",
    features="features",
    time_budget=3600
)

# Step 8: Get the best model
best_model = spark_ml.model

# Step 9: Evaluate on test data
predictions = spark_ml.predict(test_data)
predictions.show(10)

# Step 10: Calculate metrics
from pyspark.ml.evaluation import BinaryClassificationEvaluator
evaluator = BinaryClassificationEvaluator(
    labelCol="churned",
    rawPredictionCol="probability",
    metricName="areaUnderROC"
)
auc = evaluator.evaluate(predictions)
print(f"AUC: {auc:.4f}")

# Step 11: Save the model
best_model.save("s3://your-bucket/models/automl_best_model")
```

### 5.4 Ethical Considerations in Big Data AI

Addressing ethical challenges in big data AI applications:

1. **Bias and Fairness**:
   - Detecting bias in training data
   - Fairness metrics and constraints
   - Mitigating algorithmic bias
   - Inclusive AI development

2. **Privacy and Security**:
   - Privacy-preserving machine learning
   - Differential privacy
   - Secure multi-party computation
   - Homomorphic encryption

3. **Transparency and Explainability**:
   - Interpretable models
   - Post-hoc explanations
   - Model cards and documentation
   - Regulatory compliance

4. **Environmental Impact**:
   - Energy consumption of big data AI
   - Carbon footprint measurement
   - Green AI practices
   - Sustainable computing

```python
# Example: Fairness assessment and mitigation
# Step 1: Import libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix
import aif360.datasets
from aif360.algorithms.preprocessing import Reweighing
from aif360.metrics import BinaryLabelDatasetMetric

# Step 2: Load and prepare data
data = pd.read_csv("s3://your-bucket/loan_data.csv")

# Step 3: Identify protected attributes
protected_attribute = "gender"  # Example: gender, race, age, etc.

# Step 4: Convert to AIF360 dataset
from aif360.datasets import BinaryLabelDataset
aif_data = BinaryLabelDataset(
    df=data,
    label_names=["loan_approved"],
    protected_attribute_names=[protected_attribute],
    favorable_label=1,
    unfavorable_label=0
)

# Step 5: Split data
train, test = aif_data.split([0.8], shuffle=True)

# Step 6: Measure bias in the original data
metric_orig_train = BinaryLabelDatasetMetric(train, 
                                            unprivileged_groups=[{protected_attribute: 0}],
                                            privileged_groups=[{protected_attribute: 1}])

print("Original training dataset:")
print(f"Disparate impact: {metric_orig_train.disparate_impact()}")
print(f"Statistical parity difference: {metric_orig_train.statistical_parity_difference()}")

# Step 7: Apply bias mitigation (reweighing)
rw = Reweighing(unprivileged_groups=[{protected_attribute: 0}],
               privileged_groups=[{protected_attribute: 1}])
train_transformed = rw.fit_transform(train)

# Step 8: Measure bias after mitigation
metric_transf_train = BinaryLabelDatasetMetric(train_transformed, 
                                              unprivileged_groups=[{protected_attribute: 0}],
                                              privileged_groups=[{protected_attribute: 1}])

print("\nTransformed training dataset:")
print(f"Disparate impact: {metric_transf_train.disparate_impact()}")
print(f"Statistical parity difference: {metric_transf_train.statistical_parity_difference()}")

# Step 9: Train models on original and transformed data
# Original model
X_train_orig = train.features
y_train_orig = train.labels.ravel()
orig_model = RandomForestClassifier(n_estimators=100, random_state=42)
orig_model.fit(X_train_orig, y_train_orig)

# Transformed model (with bias mitigation)
X_train_transf = train_transformed.features
y_train_transf = train_transformed.labels.ravel()
sample_weights = train_transformed.instance_weights.ravel()
transf_model = RandomForestClassifier(n_estimators=100, random_state=42)
transf_model.fit(X_train_transf, y_train_transf, sample_weight=sample_weights)

# Step 10: Evaluate and compare models
X_test = test.features
y_test = test.labels.ravel()

# Predictions
y_pred_orig = orig_model.predict(X_test)
y_pred_transf = transf_model.predict(X_test)

# Accuracy
print("\nModel accuracy:")
print(f"Original model: {accuracy_score(y_test, y_pred_orig):.4f}")
print(f"Transformed model: {accuracy_score(y_test, y_pred_transf):.4f}")

# Step 11: Evaluate fairness metrics on predictions
from aif360.metrics import ClassificationMetric

# Create datasets with predictions
test_pred_orig = test.copy()
test_pred_orig.labels = y_pred_orig.reshape(-1, 1)

test_pred_transf = test.copy()
test_pred_transf.labels = y_pred_transf.reshape(-1, 1)

# Compute metrics
classified_metric_orig = ClassificationMetric(
    test, test_pred_orig,
    unprivileged_groups=[{protected_attribute: 0}],
    privileged_groups=[{protected_attribute: 1}]
)

classified_metric_transf = ClassificationMetric(
    test, test_pred_transf,
    unprivileged_groups=[{protected_attribute: 0}],
    privileged_groups=[{protected_attribute: 1}]
)

# Print fairness metrics
print("\nFairness metrics on test data:")
print("Original model:")
print(f"Equal opportunity difference: {classified_metric_orig.equal_opportunity_difference():.4f}")
print(f"Average odds difference: {classified_metric_orig.average_odds_difference():.4f}")
print(f"Disparate impact: {classified_metric_orig.disparate_impact():.4f}")

print("\nTransformed model:")
print(f"Equal opportunity difference: {classified_metric_transf.equal_opportunity_difference():.4f}")
print(f"Average odds difference: {classified_metric_transf.average_odds_difference():.4f}")
print(f"Disparate impact: {classified_metric_transf.disparate_impact():.4f}")
```

> **Hands-on Exercise:** Choose a big data machine learning problem with potential ethical implications (e.g., loan approval, hiring decisions, or healthcare diagnostics). Implement a solution that addresses at least one ethical consideration such as bias detection and mitigation, privacy preservation, or model explainability. Document your approach, the ethical challenges identified, and how your solution addresses them.

## Summary

In this chapter, we've explored machine learning and AI for big data:

- Challenges and opportunities of applying ML/AI to big data
- Distributed machine learning frameworks and platforms
- Scalable algorithms for classification, regression, and clustering
- Deep learning at scale with distributed frameworks
- End-to-end machine learning pipelines for big data
- Advanced topics including federated learning, reinforcement learning, and AutoML
- Ethical considerations in big data AI applications

The intersection of machine learning, AI, and big data offers tremendous opportunities for organizations to derive value from their data assets. By leveraging distributed computing, specialized frameworks, and scalable algorithms, data scientists can build powerful models that handle the volume, velocity, and variety of big data while addressing important ethical considerations.

## Additional Resources

### Books
- "Spark: The Definitive Guide" by Bill Chambers and Matei Zaharia
- "Deep Learning with Python" by François Chollet
- "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow" by Aurélien Géron
- "Distributed Machine Learning Patterns" by Yuan Tang
- "Ethics of Artificial Intelligence and Robotics" by Vincent C. Müller

### Online Resources
- [Apache Spark MLlib Documentation](https://spark.apache.org/docs/latest/ml-guide.html)
- [TensorFlow Distributed Training Guide](https://www.tensorflow.org/guide/distributed_training)
- [Horovod Documentation](https://horovod.readthedocs.io/)
- [Ray Documentation](https://docs.ray.io/)
- [MLflow Documentation](https://mlflow.org/docs/latest/index.html)

### Practice Platforms
- [Databricks Community Edition](https://community.cloud.databricks.com/)
- [Google Colab](https://colab.research.google.com/)
- [Kaggle Kernels](https://www.kaggle.com/code)
- [AWS SageMaker Studio Lab](https://studiolab.sagemaker.aws/)
- [H2O.ai Aquarium](https://aquarium.h2o.ai/)

## Next Steps

In the next chapter, we'll explore data engineering for big data, including data pipelines, ETL/ELT processes, data quality, and governance in big data environments.

---

## Chapter Quiz

Test your understanding of machine learning and AI for big data:

1. What are the main challenges of applying machine learning to big data?
2. Compare and contrast data parallelism and model parallelism in distributed machine learning.
3. How does Spark MLlib enable scalable machine learning on big data?
4. What are the key components of an end-to-end machine learning pipeline for big data?
5. What ethical considerations should be addressed when implementing AI solutions with big data?

Good luck!
