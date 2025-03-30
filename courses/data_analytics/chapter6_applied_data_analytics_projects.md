# Applied Data Analytics Projects

In this chapter, we'll apply the knowledge and skills you've gained throughout this course to real-world data analytics projects. Working through complete analytics workflows will help you consolidate your learning and develop the practical experience needed to succeed as a data analyst.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Plan and execute end-to-end data analytics projects
2. Apply appropriate analytical techniques to solve business problems
3. Communicate findings effectively to different stakeholders
4. Build a portfolio of data analytics projects to showcase your skills
5. Evaluate the impact and success of data analytics initiatives

## 1. Project Planning and Management

### 1.1 The Data Analytics Project Lifecycle

Understanding the typical phases of a data analytics project:

1. **Problem Definition**
   - Identify business questions and objectives
   - Define scope and constraints
   - Establish success criteria

2. **Data Acquisition and Preparation**
   - Identify data sources
   - Collect and integrate data
   - Clean and preprocess data

3. **Exploratory Analysis**
   - Understand data characteristics
   - Identify patterns and relationships
   - Generate initial insights

4. **Detailed Analysis**
   - Apply appropriate analytical techniques
   - Test hypotheses
   - Build and validate models

5. **Insight Generation**
   - Interpret results
   - Draw conclusions
   - Develop recommendations

6. **Communication and Implementation**
   - Create visualizations and reports
   - Present findings to stakeholders
   - Support implementation of recommendations

7. **Evaluation and Iteration**
   - Measure impact
   - Gather feedback
   - Refine approach

### 1.2 Project Planning Tools and Techniques

Effective planning ensures project success:

1. **Project Charter**
   ```
   # Example Project Charter Template
   
   ## Project Title: [Name of the analytics project]
   
   ## Business Context:
   [Brief description of the business situation and why this analysis is needed]
   
   ## Objectives:
   - [Primary objective 1]
   - [Primary objective 2]
   - [Primary objective 3]
   
   ## Key Questions:
   - [Specific question 1]
   - [Specific question 2]
   - [Specific question 3]
   
   ## Scope:
   [What is included and excluded from the analysis]
   
   ## Stakeholders:
   - [Stakeholder 1]: [Role/Interest]
   - [Stakeholder 2]: [Role/Interest]
   - [Stakeholder 3]: [Role/Interest]
   
   ## Success Criteria:
   - [Measurable outcome 1]
   - [Measurable outcome 2]
   - [Measurable outcome 3]
   
   ## Timeline:
   - [Phase 1]: [Start date] - [End date]
   - [Phase 2]: [Start date] - [End date]
   - [Phase 3]: [Start date] - [End date]
   
   ## Resources:
   - [Data source 1]
   - [Data source 2]
   - [Tool/Technology 1]
   - [Tool/Technology 2]
   
   ## Constraints:
   - [Constraint 1]
   - [Constraint 2]
   - [Constraint 3]
   
   ## Risks:
   - [Risk 1]: [Mitigation strategy]
   - [Risk 2]: [Mitigation strategy]
   - [Risk 3]: [Mitigation strategy]
   ```

2. **SMART Objectives**
   - **Specific**: Clearly defined and unambiguous
   - **Measurable**: Quantifiable success criteria
   - **Achievable**: Realistic given resources and constraints
   - **Relevant**: Aligned with business goals
   - **Time-bound**: Clear timeline and deadlines

3. **Work Breakdown Structure (WBS)**
   ```python
   # Example Python code for creating a simple WBS visualization
   import matplotlib.pyplot as plt
   import networkx as nx
   
   # Create a directed graph
   G = nx.DiGraph()
   
   # Add nodes (tasks)
   G.add_node("Data Analytics Project")
   
   # Phase 1: Problem Definition
   G.add_node("1. Problem Definition")
   G.add_edge("Data Analytics Project", "1. Problem Definition")
   G.add_node("1.1 Stakeholder Interviews")
   G.add_edge("1. Problem Definition", "1.1 Stakeholder Interviews")
   G.add_node("1.2 Requirements Gathering")
   G.add_edge("1. Problem Definition", "1.2 Requirements Gathering")
   G.add_node("1.3 Project Charter")
   G.add_edge("1. Problem Definition", "1.3 Project Charter")
   
   # Phase 2: Data Acquisition
   G.add_node("2. Data Acquisition")
   G.add_edge("Data Analytics Project", "2. Data Acquisition")
   G.add_node("2.1 Source Identification")
   G.add_edge("2. Data Acquisition", "2.1 Source Identification")
   G.add_node("2.2 Data Collection")
   G.add_edge("2. Data Acquisition", "2.2 Data Collection")
   G.add_node("2.3 Data Integration")
   G.add_edge("2. Data Acquisition", "2.3 Data Integration")
   
   # Phase 3: Data Preparation
   G.add_node("3. Data Preparation")
   G.add_edge("Data Analytics Project", "3. Data Preparation")
   G.add_node("3.1 Data Cleaning")
   G.add_edge("3. Data Preparation", "3.1 Data Cleaning")
   G.add_node("3.2 Feature Engineering")
   G.add_edge("3. Data Preparation", "3.2 Feature Engineering")
   G.add_node("3.3 Data Validation")
   G.add_edge("3. Data Preparation", "3.3 Data Validation")
   
   # Phase 4: Analysis
   G.add_node("4. Analysis")
   G.add_edge("Data Analytics Project", "4. Analysis")
   G.add_node("4.1 Exploratory Analysis")
   G.add_edge("4. Analysis", "4.1 Exploratory Analysis")
   G.add_node("4.2 Statistical Testing")
   G.add_edge("4. Analysis", "4.2 Statistical Testing")
   G.add_node("4.3 Modeling")
   G.add_edge("4. Analysis", "4.3 Modeling")
   
   # Phase 5: Communication
   G.add_node("5. Communication")
   G.add_edge("Data Analytics Project", "5. Communication")
   G.add_node("5.1 Visualization Creation")
   G.add_edge("5. Communication", "5.1 Visualization Creation")
   G.add_node("5.2 Report Writing")
   G.add_edge("5. Communication", "5.2 Report Writing")
   G.add_node("5.3 Presentation")
   G.add_edge("5. Communication", "5.3 Presentation")
   
   # Create a hierarchical layout
   pos = nx.nx_agraph.graphviz_layout(G, prog="dot")
   
   # Create figure
   plt.figure(figsize=(15, 10))
   
   # Draw the graph
   nx.draw(G, pos, with_labels=True, node_size=3000, node_color="lightblue", 
           font_size=8, font_weight="bold", arrows=False)
   
   plt.title("Work Breakdown Structure: Data Analytics Project")
   plt.axis("off")
   plt.tight_layout()
   plt.show()
   ```

4. **Gantt Chart**
   ```python
   # Example Python code for creating a Gantt chart
   import matplotlib.pyplot as plt
   import pandas as pd
   import numpy as np
   from datetime import datetime, timedelta
   
   # Create task data
   tasks = [
       "1. Problem Definition",
       "1.1 Stakeholder Interviews",
       "1.2 Requirements Gathering",
       "1.3 Project Charter",
       "2. Data Acquisition",
       "2.1 Source Identification",
       "2.2 Data Collection",
       "2.3 Data Integration",
       "3. Data Preparation",
       "3.1 Data Cleaning",
       "3.2 Feature Engineering",
       "3.3 Data Validation",
       "4. Analysis",
       "4.1 Exploratory Analysis",
       "4.2 Statistical Testing",
       "4.3 Modeling",
       "5. Communication",
       "5.1 Visualization Creation",
       "5.2 Report Writing",
       "5.3 Presentation"
   ]
   
   # Project start date
   start_date = datetime(2023, 6, 1)
   
   # Generate random durations (in days) for illustration
   np.random.seed(42)
   durations = np.random.randint(3, 15, size=len(tasks))
   
   # Calculate start and end dates
   task_data = []
   current_date = start_date
   
   for i, (task, duration) in enumerate(zip(tasks, durations)):
       # For subtasks, add some overlap with main tasks
       if "." in task:
           parent_idx = tasks.index(task.split(".")[0] + ".")
           start = task_data[parent_idx]["Start"] + timedelta(days=np.random.randint(1, 5))
           end = start + timedelta(days=duration)
       else:
           # For main tasks, continue from the previous main task
           if i > 0 and "." not in tasks[i-1]:
               current_date = task_data[i-1]["End"] + timedelta(days=1)
           start = current_date
           end = start + timedelta(days=duration)
       
       task_data.append({
           "Task": task,
           "Start": start,
           "End": end,
           "Duration": duration
       })
   
   # Create DataFrame
   df = pd.DataFrame(task_data)
   
   # Sort by start date
   df = df.sort_values("Start")
   
   # Create Gantt chart
   fig, ax = plt.subplots(figsize=(12, 10))
   
   # Plot each task
   for i, task in enumerate(df.itertuples()):
       start_date = task.Start
       end_date = task.End
       
       # Determine color based on task level (main task or subtask)
       if "." in task.Task and len(task.Task.split(".")) > 1:
           color = "lightblue"
           y_pos = i
       else:
           color = "steelblue"
           y_pos = i
       
       # Plot task bar
       ax.barh(y_pos, (end_date - start_date).days, left=start_date, height=0.5, 
               color=color, alpha=0.8, edgecolor="black")
       
       # Add task label
       ax.text(start_date - timedelta(days=1), y_pos, task.Task, ha="right", va="center")
   
   # Format x-axis as dates
   ax.xaxis_date()
   
   # Remove y-axis ticks
   ax.set_yticks([])
   
   # Add grid lines for dates
   ax.grid(axis="x", alpha=0.3)
   
   # Set title and labels
   ax.set_title("Data Analytics Project Gantt Chart")
   ax.set_xlabel("Date")
   
   plt.tight_layout()
   plt.show()
   ```

> **Hands-on Exercise:** Create a project charter for a data analytics project of your choice. Define the business problem, objectives, key questions, stakeholders, and success criteria. Then, create a simple work breakdown structure for the project.

### 1.3 Stakeholder Management

Effective stakeholder engagement is critical for project success:

1. **Stakeholder Identification and Analysis**
   ```
   # Example Stakeholder Analysis Matrix
   
   | Stakeholder | Role | Interest | Influence | Engagement Strategy |
   |-------------|------|----------|-----------|---------------------|
   | CEO | Executive Sponsor | High-level insights for strategic decisions | High | Monthly executive summary |
   | Marketing Director | Primary Client | Campaign optimization insights | High | Weekly progress updates |
   | IT Manager | Data Provider | Data access and security | Medium | Technical documentation |
   | Sales Team | End Users | Actionable sales insights | Low | Final report with specific recommendations |
   | Data Engineers | Technical Support | Data pipeline maintenance | Medium | Technical specifications |
   ```

2. **Communication Planning**
   - Tailor communication to stakeholder needs
   - Establish regular update cadence
   - Create templates for consistent reporting

3. **Expectation Management**
   - Clearly define what is possible given constraints
   - Address scope creep proactively
   - Document and communicate assumptions

> **Knowledge Check:** For a customer churn analysis project, identify three key stakeholders and describe how you would tailor your communication approach for each one.

## 2. Project 1: Customer Segmentation Analysis

### 2.1 Business Context

Understanding customer segments helps businesses target marketing efforts, develop products, and improve customer experience:

```
# Project Charter: Customer Segmentation Analysis

## Business Context:
The marketing team needs to develop targeted campaigns for different customer groups but currently uses a one-size-fits-all approach. They need data-driven customer segments to improve campaign effectiveness and ROI.

## Objectives:
- Identify distinct customer segments based on purchasing behavior, demographics, and engagement
- Develop profiles for each segment with actionable characteristics
- Recommend targeted marketing strategies for each segment

## Key Questions:
- What natural groupings exist in our customer base?
- What are the defining characteristics of each segment?
- How should marketing strategies differ across segments?
- Which segments offer the highest potential value?

## Success Criteria:
- Segments are statistically distinct and business-relevant
- Segment profiles provide actionable insights
- Marketing team can assign new customers to segments with 80%+ accuracy
- Pilot campaign using segmentation shows 15%+ improvement in conversion rate
```

### 2.2 Data Preparation

```python
# Example Python code for customer segmentation data preparation
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer

# Load the dataset
customer_data = pd.read_csv('customer_data.csv')

print("Original dataset shape:", customer_data.shape)
print("\nFirst few rows:")
print(customer_data.head())

# Check for missing values
print("\nMissing values per column:")
print(customer_data.isnull().sum())

# Basic statistics
print("\nBasic statistics:")
print(customer_data.describe())

# Data cleaning
# 1. Handle missing values
numeric_features = customer_data.select_dtypes(include=['int64', 'float64']).columns
categorical_features = customer_data.select_dtypes(include=['object']).columns

# For numeric features, impute with median
numeric_imputer = SimpleImputer(strategy='median')
customer_data[numeric_features] = numeric_imputer.fit_transform(customer_data[numeric_features])

# For categorical features, impute with most frequent value
categorical_imputer = SimpleImputer(strategy='most_frequent')
customer_data[categorical_features] = categorical_imputer.fit_transform(customer_data[categorical_features])

# 2. Handle outliers
# Example: Cap outliers in purchase_frequency at 3 standard deviations
for col in ['purchase_frequency', 'avg_order_value', 'total_spend']:
    mean = customer_data[col].mean()
    std = customer_data[col].std()
    customer_data[col] = customer_data[col].clip(lower=mean - 3*std, upper=mean + 3*std)

# 3. Feature engineering
# Calculate recency (days since last purchase)
customer_data['last_purchase_date'] = pd.to_datetime(customer_data['last_purchase_date'])
reference_date = pd.to_datetime('2023-06-01')  # Assuming this is "today"
customer_data['recency'] = (reference_date - customer_data['last_purchase_date']).dt.days

# Create RFM features (Recency, Frequency, Monetary)
customer_data['rfm_recency'] = pd.qcut(customer_data['recency'], 5, labels=[5, 4, 3, 2, 1])
customer_data['rfm_frequency'] = pd.qcut(customer_data['purchase_frequency'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5])
customer_data['rfm_monetary'] = pd.qcut(customer_data['total_spend'].rank(method='first'), 5, labels=[1, 2, 3, 4, 5])

# Convert categorical variables to dummy variables
customer_data = pd.get_dummies(customer_data, columns=['gender', 'location', 'preferred_channel'])

# Select features for clustering
clustering_features = [
    'age', 'recency', 'purchase_frequency', 'avg_order_value', 
    'total_spend', 'website_visits', 'rfm_recency', 'rfm_frequency', 
    'rfm_monetary'
]

# Standardize the features
scaler = StandardScaler()
scaled_features = scaler.fit_transform(customer_data[clustering_features])
scaled_df = pd.DataFrame(scaled_features, columns=clustering_features)

print("\nPrepared data shape:", scaled_df.shape)
print("\nFirst few rows of prepared data:")
print(scaled_df.head())

# Save prepared data
scaled_df.to_csv('prepared_customer_data.csv', index=False)
```

### 2.3 Exploratory Analysis

```python
# Example Python code for customer segmentation exploratory analysis
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import pearsonr

# Load prepared data
prepared_data = pd.read_csv('prepared_customer_data.csv')
original_data = pd.read_csv('customer_data.csv')  # For reference

# Combine datasets for analysis
analysis_data = original_data.copy()
for col in prepared_data.columns:
    if col not in analysis_data.columns:
        analysis_data[col] = prepared_data[col]

# 1. Distribution of key variables
plt.figure(figsize=(15, 10))

# Age distribution
plt.subplot(2, 3, 1)
sns.histplot(analysis_data['age'], kde=True)
plt.title('Age Distribution')

# Recency distribution
plt.subplot(2, 3, 2)
sns.histplot(analysis_data['recency'], kde=True)
plt.title('Recency Distribution (Days)')

# Purchase frequency distribution
plt.subplot(2, 3, 3)
sns.histplot(analysis_data['purchase_frequency'], kde=True)
plt.title('Purchase Frequency Distribution')

# Average order value distribution
plt.subplot(2, 3, 4)
sns.histplot(analysis_data['avg_order_value'], kde=True)
plt.title('Average Order Value Distribution')

# Total spend distribution
plt.subplot(2, 3, 5)
sns.histplot(analysis_data['total_spend'], kde=True)
plt.title('Total Spend Distribution')

# Website visits distribution
plt.subplot(2, 3, 6)
sns.histplot(analysis_data['website_visits'], kde=True)
plt.title('Website Visits Distribution')

plt.tight_layout()
plt.show()

# 2. Correlation analysis
plt.figure(figsize=(12, 10))
correlation_features = [
    'age', 'recency', 'purchase_frequency', 'avg_order_value', 
    'total_spend', 'website_visits'
]
correlation_matrix = analysis_data[correlation_features].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title('Correlation Matrix of Customer Features')
plt.tight_layout()
plt.show()

# 3. Relationship between key variables
plt.figure(figsize=(15, 10))

# Age vs. Total Spend
plt.subplot(2, 2, 1)
sns.scatterplot(x='age', y='total_spend', data=analysis_data, alpha=0.6)
plt.title('Age vs. Total Spend')

# Recency vs. Purchase Frequency
plt.subplot(2, 2, 2)
sns.scatterplot(x='recency', y='purchase_frequency', data=analysis_data, alpha=0.6)
plt.title('Recency vs. Purchase Frequency')

# Purchase Frequency vs. Average Order Value
plt.subplot(2, 2, 3)
sns.scatterplot(x='purchase_frequency', y='avg_order_value', data=analysis_data, alpha=0.6)
plt.title('Purchase Frequency vs. Average Order Value')

# Website Visits vs. Total Spend
plt.subplot(2, 2, 4)
sns.scatterplot(x='website_visits', y='total_spend', data=analysis_data, alpha=0.6)
plt.title('Website Visits vs. Total Spend')

plt.tight_layout()
plt.show()

# 4. RFM analysis
plt.figure(figsize=(15, 5))

# RFM distribution
plt.subplot(1, 3, 1)
sns.countplot(x='rfm_recency', data=analysis_data)
plt.title('Recency Segments Distribution')

plt.subplot(1, 3, 2)
sns.countplot(x='rfm_frequency', data=analysis_data)
plt.title('Frequency Segments Distribution')

plt.subplot(1, 3, 3)
sns.countplot(x='rfm_monetary', data=analysis_data)
plt.title('Monetary Segments Distribution')

plt.tight_layout()
plt.show()

# 5. Calculate and visualize RFM combined score
analysis_data['rfm_score'] = analysis_data['rfm_recency'].astype(int) + \
                            analysis_data['rfm_frequency'].astype(int) + \
                            analysis_data['rfm_monetary'].astype(int)

plt.figure(figsize=(10, 6))
sns.histplot(analysis_data['rfm_score'], bins=12, kde=True)
plt.title('Distribution of RFM Scores')
plt.xlabel('RFM Score (3-15)')
plt.ylabel('Number of Customers')
plt.tight_layout()
plt.show()

# 6. Preliminary segment identification based on RFM
analysis_data['rfm_segment'] = pd.cut(
    analysis_data['rfm_score'], 
    bins=[2, 5, 8, 11, 15], 
    labels=['Low Value', 'Medium Value', 'High Value', 'Top Value']
)

plt.figure(figsize=(10, 6))
segment_counts = analysis_data['rfm_segment'].value_counts().sort_index()
plt.bar(segment_counts.index, segment_counts.values)
plt.title('Preliminary Customer Segments Based on RFM Score')
plt.xlabel('Segment')
plt.ylabel('Number of Customers')
plt.tight_layout()
plt.show()

# 7. Segment characteristics
plt.figure(figsize=(15, 10))

# Age by segment
plt.subplot(2, 2, 1)
sns.boxplot(x='rfm_segment', y='age', data=analysis_data)
plt.title('Age Distribution by Segment')

# Total spend by segment
plt.subplot(2, 2, 2)
sns.boxplot(x='rfm_segment', y='total_spend', data=analysis_data)
plt.title('Total Spend Distribution by Segment')

# Purchase frequency by segment
plt.subplot(2, 2, 3)
sns.boxplot(x='rfm_segment', y='purchase_frequency', data=analysis_data)
plt.title('Purchase Frequency Distribution by Segment')

# Website visits by segment
plt.subplot(2, 2, 4)
sns.boxplot(x='rfm_segment', y='website_visits', data=analysis_data)
plt.title('Website Visits Distribution by Segment')

plt.tight_layout()
plt.show()
```

### 2.4 Cluster Analysis

```python
# Example Python code for customer segmentation cluster analysis
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from sklearn.decomposition import PCA

# Load prepared data
scaled_df = pd.read_csv('prepared_customer_data.csv')
original_data = pd.read_csv('customer_data.csv')

# 1. Determine optimal number of clusters using the Elbow Method
inertia = []
silhouette_scores = []
k_range = range(2, 11)

for k in k_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(scaled_df)
    inertia.append(kmeans.inertia_)
    
    # Calculate silhouette score
    labels = kmeans.labels_
    silhouette_scores.append(silhouette_score(scaled_df, labels))

# Plot Elbow Method results
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.plot(k_range, inertia, 'o-')
plt.xlabel('Number of Clusters (k)')
plt.ylabel('Inertia')
plt.title('Elbow Method for Optimal k')
plt.grid(True, alpha=0.3)

plt.subplot(1, 2, 2)
plt.plot(k_range, silhouette_scores, 'o-')
plt.xlabel('Number of Clusters (k)')
plt.ylabel('Silhouette Score')
plt.title('Silhouette Score for Optimal k')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Based on the elbow method and silhouette score, let's choose k=4
optimal_k = 4
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
cluster_labels = kmeans.fit_predict(scaled_df)

# Add cluster labels to the original data
customer_segments = original_data.copy()
customer_segments['cluster'] = cluster_labels

# 2. Visualize clusters using PCA for dimensionality reduction
pca = PCA(n_components=2)
principal_components = pca.fit_transform(scaled_df)
pca_df = pd.DataFrame(data=principal_components, columns=['PC1', 'PC2'])
pca_df['cluster'] = cluster_labels

# Plot PCA results
plt.figure(figsize=(10, 8))
sns.scatterplot(x='PC1', y='PC2', hue='cluster', data=pca_df, palette='viridis', s=100, alpha=0.7)
plt.title('Customer Segments Visualization using PCA')

# Add cluster centers
centers = pca.transform(kmeans.cluster_centers_)
plt.scatter(centers[:, 0], centers[:, 1], c='red', marker='X', s=200, alpha=1, label='Cluster Centers')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 3. Analyze cluster characteristics
# Calculate mean values for each cluster
cluster_means = customer_segments.groupby('cluster').mean()
print("Cluster means:")
print(cluster_means[['age', 'purchase_frequency', 'avg_order_value', 'total_spend', 'website_visits']])

# Radar chart for cluster profiles
plt.figure(figsize=(12, 10))

# Select features for the radar chart
features = ['age', 'purchase_frequency', 'avg_order_value', 'total_spend', 'website_visits']

# Normalize the features for radar chart
normalized_means = cluster_means[features].copy()
for feature in features:
    normalized_means[feature] = (normalized_means[feature] - normalized_means[feature].min()) / \
                               (normalized_means[feature].max() - normalized_means[feature].min())

# Number of variables
N = len(features)

# Create angles for each feature
angles = [n / float(N) * 2 * np.pi for n in range(N)]
angles += angles[:1]  # Close the loop

# Create radar chart
ax = plt.subplot(111, polar=True)

# Draw one axis per variable and add labels
plt.xticks(angles[:-1], features, size=12)

# Draw ylabels
ax.set_rlabel_position(0)
plt.yticks([0.25, 0.5, 0.75], ["0.25", "0.5", "0.75"], color="grey", size=10)
plt.ylim(0, 1)

# Plot each cluster
for i in range(optimal_k):
    values = normalized_means.iloc[i].values.tolist()
    values += values[:1]  # Close the loop
    ax.plot(angles, values, linewidth=2, linestyle='solid', label=f'Cluster {i}')
    ax.fill(angles, values, alpha=0.1)

plt.legend(loc='upper right', bbox_to_anchor=(0.1, 0.1))
plt.title('Cluster Profiles', size=15)
plt.tight_layout()
plt.show()

# 4. Segment distribution
plt.figure(figsize=(10, 6))
cluster_counts = customer_segments['cluster'].value_counts().sort_index()
plt.bar(cluster_counts.index, cluster_counts.values)
plt.title('Customer Distribution Across Segments')
plt.xlabel('Cluster')
plt.ylabel('Number of Customers')
plt.xticks(range(optimal_k))
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 5. Detailed cluster analysis
# Create a function to generate cluster profile
def generate_cluster_profile(cluster_id):
    cluster_data = customer_segments[customer_segments['cluster'] == cluster_id]
    
    print(f"Cluster {cluster_id} Profile:")
    print(f"Number of customers: {len(cluster_data)} ({len(cluster_data)/len(customer_segments)*100:.1f}%)")
    print("\nDemographic Profile:")
    print(f"Average age: {cluster_data['age'].mean():.1f} years")
    
    if 'gender' in cluster_data.columns:
        print("Gender distribution:")
        print(cluster_data['gender'].value_counts(normalize=True).mul(100).round(1).astype(str) + '%')
    
    if 'location' in cluster_data.columns:
        print("Top locations:")
        print(cluster_data['location'].value_counts(normalize=True).head(3).mul(100).round(1).astype(str) + '%')
    
    print("\nBehavioral Profile:")
    print(f"Average purchase frequency: {cluster_data['purchase_frequency'].mean():.2f} purchases")
    print(f"Average order value: ${cluster_data['avg_order_value'].mean():.2f}")
    print(f"Average total spend: ${cluster_data['total_spend'].mean():.2f}")
    print(f"Average website visits: {cluster_data['website_visits'].mean():.2f} visits")
    
    if 'preferred_channel' in cluster_data.columns:
        print("Preferred channels:")
        print(cluster_data['preferred_channel'].value_counts(normalize=True).mul(100).round(1).astype(str) + '%')
    
    print("\n" + "-"*50 + "\n")

# Generate profiles for each cluster
for i in range(optimal_k):
    generate_cluster_profile(i)
```

### 2.5 Segment Naming and Profiling

Based on the cluster analysis, we can name and profile each segment:

```
# Example Segment Profiles

## Segment 1: High-Value Loyalists
- **Demographics**: Older (avg. 45 years), predominantly female (65%)
- **Behavior**: Frequent purchases (avg. 12 per year), high average order value ($120)
- **Engagement**: Regular website visitors, prefer email communication
- **Value**: Highest total spend, represent 20% of customers but 45% of revenue
- **Marketing Strategy**: Loyalty rewards, exclusive offers, personalized recommendations

## Segment 2: Occasional Big Spenders
- **Demographics**: Middle-aged (avg. 38 years), mixed gender
- **Behavior**: Infrequent purchases (avg. 3 per year), very high average order value ($200)
- **Engagement**: Moderate website visits, prefer mobile app
- **Value**: High individual transaction value, represent 15% of customers and 25% of revenue
- **Marketing Strategy**: Premium product offers, special occasion reminders, upselling

## Segment 3: Frequent Budget Shoppers
- **Demographics**: Younger (avg. 32 years), predominantly male (60%)
- **Behavior**: Very frequent purchases (avg. 18 per year), low average order value ($45)
- **Engagement**: Highest website visits, prefer social media
- **Value**: Moderate total spend, represent 35% of customers and 20% of revenue
- **Marketing Strategy**: Flash sales, loyalty points, bundle offers

## Segment 4: At-Risk Low Engagers
- **Demographics**: Mixed age, mixed gender
- **Behavior**: Very infrequent purchases (avg. 1.5 per year), low average order value ($50)
- **Engagement**: Few website visits, no clear channel preference
- **Value**: Lowest total spend, represent 30% of customers but only 10% of revenue
- **Marketing Strategy**: Re-engagement campaigns, surveys to understand needs, special "win-back" offers
```

### 2.6 Recommendations and Implementation

```
# Example Recommendations Document

## Strategic Recommendations Based on Customer Segmentation

### 1. Marketing Campaign Optimization
- **High-Value Loyalists**: Implement a tiered loyalty program with exclusive benefits
- **Occasional Big Spenders**: Create seasonal campaign calendar targeting key purchasing moments
- **Frequent Budget Shoppers**: Develop a points-based rewards system for frequent purchases
- **At-Risk Low Engagers**: Launch a targeted win-back campaign with compelling first-purchase incentives

### 2. Product Development and Merchandising
- **High-Value Loyalists**: Develop premium product lines and early access to new products
- **Occasional Big Spenders**: Focus on high-margin luxury items and gift packages
- **Frequent Budget Shoppers**: Create budget-friendly bundles and subscription options
- **At-Risk Low Engagers**: Simplify product offerings and focus on entry-level items

### 3. Customer Experience Enhancements
- **High-Value Loyalists**: Provide dedicated customer service representatives
- **Occasional Big Spenders**: Implement premium packaging and delivery options
- **Frequent Budget Shoppers**: Streamline checkout process and offer flexible payment options
- **At-Risk Low Engagers**: Simplify user experience and provide guided shopping assistance

### 4. Channel Strategy
- **High-Value Loyalists**: Focus on personalized email marketing with exclusive content
- **Occasional Big Spenders**: Develop mobile app features for premium shopping experience
- **Frequent Budget Shoppers**: Increase social media engagement and influencer partnerships
- **At-Risk Low Engagers**: Test multi-channel approach to identify preferred engagement method

### 5. Implementation Roadmap
- **Phase 1 (Month 1-2)**: Segment tagging in CRM and initial communication strategy
- **Phase 2 (Month 3-4)**: Launch segment-specific marketing campaigns
- **Phase 3 (Month 5-6)**: Implement product and experience enhancements
- **Phase 4 (Month 7-8)**: Measure results and refine segmentation model

### 6. Success Metrics
- **High-Value Loyalists**: 15% increase in retention rate, 10% increase in average order value
- **Occasional Big Spenders**: 25% increase in purchase frequency, 5% increase in average order value
- **Frequent Budget Shoppers**: 10% increase in average order value, 5% increase in purchase frequency
- **At-Risk Low Engagers**: 30% reduction in churn rate, 50% increase in engagement metrics
```

> **Hands-on Project:** Using the provided customer segmentation code as a template, analyze a retail customer dataset of your choice. Identify meaningful customer segments, create detailed profiles for each segment, and develop targeted marketing recommendations. Present your findings in a format suitable for business stakeholders.

## 3. Project 2: Sales Forecasting and Trend Analysis

### 3.1 Business Context

Accurate sales forecasting helps businesses plan inventory, staffing, and financial resources:

```
# Project Charter: Sales Forecasting and Trend Analysis

## Business Context:
The sales and inventory management teams need accurate forecasts to optimize inventory levels, plan staffing, and set realistic targets. Current forecasting is based on simple averages and manager intuition, leading to stockouts and overstock situations.

## Objectives:
- Develop a time series forecasting model for product sales
- Identify seasonal patterns and trends in sales data
- Quantify the impact of external factors on sales
- Create a forecasting dashboard for ongoing use

## Key Questions:
- What are the short and long-term sales trends?
- What seasonal patterns exist in our sales data?
- How do external factors (promotions, holidays, weather) affect sales?
- How accurate are our forecasts at different time horizons?

## Success Criteria:
- Forecast accuracy within 15% of actual sales (MAPE < 15%)
- Clear identification of seasonal patterns and trends
- Quantifiable impact of key external factors
- User-friendly dashboard adopted by sales and inventory teams
```

### 3.2 Data Preparation

```python
# Example Python code for sales forecasting data preparation
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta

# Load the dataset
sales_data = pd.read_csv('sales_data.csv')

print("Original dataset shape:", sales_data.shape)
print("\nFirst few rows:")
print(sales_data.head())

# Convert date column to datetime
sales_data['date'] = pd.to_datetime(sales_data['date'])

# Check for missing values
print("\nMissing values per column:")
print(sales_data.isnull().sum())

# Basic statistics
print("\nBasic statistics:")
print(sales_data.describe())

# Aggregate sales by date if data is at transaction level
if 'product_id' in sales_data.columns:
    daily_sales = sales_data.groupby('date')['sales_amount'].sum().reset_index()
else:
    daily_sales = sales_data.copy()

# Sort by date
daily_sales = daily_sales.sort_values('date')

# Check for missing dates
date_range = pd.date_range(start=daily_sales['date'].min(), end=daily_sales['date'].max(), freq='D')
missing_dates = set(date_range) - set(daily_sales['date'])

print(f"\nNumber of missing dates: {len(missing_dates)}")
if len(missing_dates) > 0:
    print("Sample of missing dates:")
    print(list(missing_dates)[:5])

# Fill in missing dates with zeros or interpolated values
full_date_range = pd.DataFrame({'date': date_range})
daily_sales = pd.merge(full_date_range, daily_sales, on='date', how='left')
daily_sales['sales_amount'] = daily_sales['sales_amount'].fillna(0)

# Feature engineering for time series
daily_sales['year'] = daily_sales['date'].dt.year
daily_sales['month'] = daily_sales['date'].dt.month
daily_sales['day'] = daily_sales['date'].dt.day
daily_sales['dayofweek'] = daily_sales['date'].dt.dayofweek  # Monday=0, Sunday=6
daily_sales['quarter'] = daily_sales['date'].dt.quarter
daily_sales['is_weekend'] = daily_sales['dayofweek'].isin([5, 6]).astype(int)
daily_sales['is_month_start'] = daily_sales['date'].dt.is_month_start.astype(int)
daily_sales['is_month_end'] = daily_sales['date'].dt.is_month_end.astype(int)

# Add holiday indicators if available
# This is a simplified example - in practice, you would use a holiday calendar
holidays = ['2022-01-01', '2022-12-25', '2023-01-01', '2023-12-25']  # Example holidays
holidays = pd.to_datetime(holidays)
daily_sales['is_holiday'] = daily_sales['date'].isin(holidays).astype(int)

# Add lag features
for lag in [1, 7, 14, 28]:
    daily_sales[f'sales_lag_{lag}'] = daily_sales['sales_amount'].shift(lag)

# Add rolling statistics
for window in [7, 14, 30]:
    daily_sales[f'sales_rolling_mean_{window}'] = daily_sales['sales_amount'].rolling(window=window).mean()
    daily_sales[f'sales_rolling_std_{window}'] = daily_sales['sales_amount'].rolling(window=window).std()

# Drop rows with NaN values from lag features
daily_sales = daily_sales.dropna()

print("\nPrepared data shape:", daily_sales.shape)
print("\nFirst few rows of prepared data:")
print(daily_sales.head())

# Save prepared data
daily_sales.to_csv('prepared_sales_data.csv', index=False)
```

### 3.3 Exploratory Analysis

```python
# Example Python code for sales forecasting exploratory analysis
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

# Load prepared data
sales_data = pd.read_csv('prepared_sales_data.csv')
sales_data['date'] = pd.to_datetime(sales_data['date'])

# Set date as index for time series analysis
sales_ts = sales_data.set_index('date')

# 1. Visualize the time series
plt.figure(figsize=(15, 6))
plt.plot(sales_ts.index, sales_ts['sales_amount'])
plt.title('Daily Sales Over Time')
plt.xlabel('Date')
plt.ylabel('Sales Amount')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 2. Seasonal decomposition
# Assuming the data has a weekly seasonality
decomposition = seasonal_decompose(sales_ts['sales_amount'], model='additive', period=7)

plt.figure(figsize=(15, 12))

plt.subplot(4, 1, 1)
plt.plot(decomposition.observed)
plt.title('Observed')
plt.grid(True, alpha=0.3)

plt.subplot(4, 1, 2)
plt.plot(decomposition.trend)
plt.title('Trend')
plt.grid(True, alpha=0.3)

plt.subplot(4, 1, 3)
plt.plot(decomposition.seasonal)
plt.title('Seasonality')
plt.grid(True, alpha=0.3)

plt.subplot(4, 1, 4)
plt.plot(decomposition.resid)
plt.title('Residuals')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 3. Monthly sales patterns
monthly_sales = sales_data.groupby(['year', 'month'])['sales_amount'].sum().reset_index()
monthly_sales['year_month'] = monthly_sales['year'].astype(str) + '-' + monthly_sales['month'].astype(str).str.zfill(2)

plt.figure(figsize=(15, 6))
plt.bar(monthly_sales['year_month'], monthly_sales['sales_amount'])
plt.title('Monthly Sales')
plt.xlabel('Year-Month')
plt.ylabel('Sales Amount')
plt.xticks(rotation=45)
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 4. Day of week patterns
day_of_week_sales = sales_data.groupby('dayofweek')['sales_amount'].mean().reindex(range(7))
day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

plt.figure(figsize=(12, 6))
plt.bar(day_names, day_of_week_sales)
plt.title('Average Sales by Day of Week')
plt.xlabel('Day of Week')
plt.ylabel('Average Sales Amount')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 5. Autocorrelation and Partial Autocorrelation
plt.figure(figsize=(15, 8))

plt.subplot(2, 1, 1)
plot_acf(sales_ts['sales_amount'], lags=30, ax=plt.gca())
plt.title('Autocorrelation Function')

plt.subplot(2, 1, 2)
plot_pacf(sales_ts['sales_amount'], lags=30, ax=plt.gca())
plt.title('Partial Autocorrelation Function')

plt.tight_layout()
plt.show()

# 6. Correlation with lag features
lag_columns = [col for col in sales_data.columns if 'lag' in col]
correlation_data = sales_data[['sales_amount'] + lag_columns]

plt.figure(figsize=(12, 8))
sns.heatmap(correlation_data.corr(), annot=True, cmap='coolwarm', vmin=-1, vmax=1)
plt.title('Correlation Between Sales and Lag Features')
plt.tight_layout()
plt.show()

# 7. Impact of holidays
plt.figure(figsize=(12, 6))
sns.boxplot(x='is_holiday', y='sales_amount', data=sales_data)
plt.title('Sales Distribution: Regular Days vs. Holidays')
plt.xlabel('Is Holiday')
plt.ylabel('Sales Amount')
plt.xticks([0, 1], ['Regular Day', 'Holiday'])
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 8. Weekday vs. Weekend comparison
plt.figure(figsize=(12, 6))
sns.boxplot(x='is_weekend', y='sales_amount', data=sales_data)
plt.title('Sales Distribution: Weekdays vs. Weekends')
plt.xlabel('Is Weekend')
plt.ylabel('Sales Amount')
plt.xticks([0, 1], ['Weekday', 'Weekend'])
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

### 3.4 Time Series Forecasting

```python
# Example Python code for sales forecasting models
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.model_selection import TimeSeriesSplit
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from prophet import Prophet
from xgboost import XGBRegressor

# Load prepared data
sales_data = pd.read_csv('prepared_sales_data.csv')
sales_data['date'] = pd.to_datetime(sales_data['date'])

# Set date as index for time series analysis
sales_ts = sales_data.set_index('date')

# Define a function to calculate forecast accuracy
def calculate_metrics(actual, predicted):
    mae = mean_absolute_error(actual, predicted)
    rmse = np.sqrt(mean_squared_error(actual, predicted))
    mape = np.mean(np.abs((actual - predicted) / actual)) * 100
    r2 = r2_score(actual, predicted)
    
    print(f"Mean Absolute Error (MAE): {mae:.2f}")
    print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
    print(f"Mean Absolute Percentage Error (MAPE): {mape:.2f}%")
    print(f"R-squared: {r2:.4f}")
    
    return mae, rmse, mape, r2

# Split data into train and test sets (last 30 days as test)
train_data = sales_data[:-30]
test_data = sales_data[-30:]

print(f"Training data shape: {train_data.shape}")
print(f"Test data shape: {test_data.shape}")

# 1. ARIMA Model
print("\n--- ARIMA Model ---")
# Convert to time series
train_ts = train_data.set_index('date')['sales_amount']
test_ts = test_data.set_index('date')['sales_amount']

# Fit ARIMA model
# p=1 (AR order), d=1 (differencing), q=1 (MA order)
arima_model = ARIMA(train_ts, order=(1, 1, 1))
arima_results = arima_model.fit()
print(arima_results.summary())

# Forecast
arima_forecast = arima_results.forecast(steps=len(test_ts))

# Evaluate
print("\nARIMA Forecast Accuracy:")
arima_metrics = calculate_metrics(test_ts, arima_forecast)

# Visualize
plt.figure(figsize=(15, 6))
plt.plot(train_ts.index, train_ts, label='Training Data')
plt.plot(test_ts.index, test_ts, label='Actual Test Data')
plt.plot(test_ts.index, arima_forecast, label='ARIMA Forecast')
plt.title('ARIMA Sales Forecast')
plt.xlabel('Date')
plt.ylabel('Sales Amount')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 2. SARIMA Model (Seasonal ARIMA)
print("\n--- SARIMA Model ---")
# p=1, d=1, q=1, P=1, D=1, Q=1, S=7 (weekly seasonality)
sarima_model = SARIMAX(train_ts, order=(1, 1, 1), seasonal_order=(1, 1, 1, 7))
sarima_results = sarima_model.fit(disp=False)
print(sarima_results.summary())

# Forecast
sarima_forecast = sarima_results.forecast(steps=len(test_ts))

# Evaluate
print("\nSARIMA Forecast Accuracy:")
sarima_metrics = calculate_metrics(test_ts, sarima_forecast)

# Visualize
plt.figure(figsize=(15, 6))
plt.plot(train_ts.index, train_ts, label='Training Data')
plt.plot(test_ts.index, test_ts, label='Actual Test Data')
plt.plot(test_ts.index, sarima_forecast, label='SARIMA Forecast')
plt.title('SARIMA Sales Forecast')
plt.xlabel('Date')
plt.ylabel('Sales Amount')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# 3. Prophet Model
print("\n--- Prophet Model ---")
# Prepare data for Prophet
prophet_train = train_data[['date', 'sales_amount']].rename(columns={'date': 'ds', 'sales_amount': 'y'})
prophet_test = test_data[['date', 'sales_amount']].rename(columns={'date': 'ds', 'sales_amount': 'y'})

# Add holiday effects if available
if 'is_holiday' in train_data.columns:
    holidays = train_data[train_data['is_holiday'] == 1][['date']].rename(columns={'date': 'ds'})
    holidays['holiday'] = 'holiday'
    
    # Fit Prophet model with holidays
    prophet_model = Prophet(holidays=holidays)
else:
    # Fit Prophet model without holidays
    prophet_model = Prophet()

# Add weekly and yearly seasonality
prophet_model.add_seasonality(name='weekly', period=7, fourier_order=3)
prophet_model.add_seasonality(name='yearly', period=365.25, fourier_order=5)

# Fit the model
prophet_model.fit(prophet_train)

# Create future dataframe for forecasting
future = prophet_model.make_future_dataframe(periods=len(prophet_test))
prophet_forecast = prophet_model.predict(future)

# Extract forecast for test period
prophet_test_forecast = prophet_forecast[prophet_forecast['ds'].isin(prophet_test['ds'])]['yhat'].values

# Evaluate
print("\nProphet Forecast Accuracy:")
prophet_metrics = calculate_metrics(prophet_test['y'].values, prophet_test_forecast)

# Visualize
plt.figure(figsize=(15, 6))
plt.plot(prophet_train['ds'], prophet_train['y'], label='Training Data')
plt.plot(prophet_test['ds'], prophet_test['y'], label='Actual Test Data')
plt.plot(prophet_test['ds'], prophet_test_forecast, label='Prophet Forecast')
plt.title('Prophet Sales Forecast')
plt.xlabel('Date')
plt.ylabel('Sales Amount')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Plot Prophet components
prophet_model.plot_components(prophet_forecast)
plt.tight_layout()
plt.show()

# 4. XGBoost Model (Machine Learning Approach)
print("\n--- XGBoost Model ---")
# Prepare features
feature_columns = [col for col in train_data.columns if col not in ['date', 'sales_amount']]
X_train = train_data[feature_columns]
y_train = train_data['sales_amount']
X_test = test_data[feature_columns]
y_test = test_data['sales_amount']

# Fit XGBoost model
xgb_model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=3, random_state=42)
xgb_model.fit(X_train, y_train)

# Forecast
xgb_forecast = xgb_model.predict(X_test)

# Evaluate
print("\nXGBoost Forecast Accuracy:")
xgb_metrics = calculate_metrics(y_test, xgb_forecast)

# Visualize
plt.figure(figsize=(15, 6))
plt.plot(train_data['date'], y_train, label='Training Data')
plt.plot(test_data['date'], y_test, label='Actual Test Data')
plt.plot(test_data['date'], xgb_forecast, label='XGBoost Forecast')
plt.title('XGBoost Sales Forecast')
plt.xlabel('Date')
plt.ylabel('Sales Amount')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Feature importance
plt.figure(figsize=(12, 8))
feature_importance = pd.DataFrame({
    'Feature': feature_columns,
    'Importance': xgb_model.feature_importances_
}).sort_values('Importance', ascending=False)

plt.barh(feature_importance['Feature'], feature_importance['Importance'])
plt.title('XGBoost Feature Importance')
plt.xlabel('Importance')
plt.tight_layout()
plt.show()

# 5. Model Comparison
print("\n--- Model Comparison ---")
models = ['ARIMA', 'SARIMA', 'Prophet', 'XGBoost']
metrics = [arima_metrics, sarima_metrics, prophet_metrics, xgb_metrics]

comparison_df = pd.DataFrame({
    'Model': models,
    'MAE': [m[0] for m in metrics],
    'RMSE': [m[1] for m in metrics],
    'MAPE (%)': [m[2] for m in metrics],
    'R-squared': [m[3] for m in metrics]
})

print(comparison_df)

# Visualize comparison
plt.figure(figsize=(15, 10))

plt.subplot(2, 2, 1)
plt.bar(comparison_df['Model'], comparison_df['MAE'])
plt.title('Mean Absolute Error (MAE)')
plt.grid(True, alpha=0.3)

plt.subplot(2, 2, 2)
plt.bar(comparison_df['Model'], comparison_df['RMSE'])
plt.title('Root Mean Squared Error (RMSE)')
plt.grid(True, alpha=0.3)

plt.subplot(2, 2, 3)
plt.bar(comparison_df['Model'], comparison_df['MAPE (%)'])
plt.title('Mean Absolute Percentage Error (MAPE)')
plt.grid(True, alpha=0.3)

plt.subplot(2, 2, 4)
plt.bar(comparison_df['Model'], comparison_df['R-squared'])
plt.title('R-squared')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# 6. Final Forecast (using the best model)
# Assuming XGBoost performed best
print("\n--- Final Forecast (Next 30 Days) ---")
# Prepare future dates
last_date = sales_data['date'].max()
future_dates = pd.date_range(start=last_date + pd.Timedelta(days=1), periods=30, freq='D')
future_df = pd.DataFrame({'date': future_dates})

# Add features for future dates
future_df['year'] = future_df['date'].dt.year
future_df['month'] = future_df['date'].dt.month
future_df['day'] = future_df['date'].dt.day
future_df['dayofweek'] = future_df['date'].dt.dayofweek
future_df['quarter'] = future_df['date'].dt.quarter
future_df['is_weekend'] = future_df['dayofweek'].isin([5, 6]).astype(int)
future_df['is_month_start'] = future_df['date'].dt.is_month_start.astype(int)
future_df['is_month_end'] = future_df['date'].dt.is_month_end.astype(int)

# Add holiday indicators if available
holidays = ['2023-01-01', '2023-12-25']  # Example holidays
holidays = pd.to_datetime(holidays)
future_df['is_holiday'] = future_df['date'].isin(holidays).astype(int)

# Add lag features from the last known values
for lag in [1, 7, 14, 28]:
    if lag == 1:
        # For lag 1, use the last known value for the first prediction
        future_df[f'sales_lag_{lag}'] = np.nan
        future_df.loc[0, f'sales_lag_{lag}'] = sales_data.iloc[-1]['sales_amount']
    else:
        # For other lags, use values from the historical data where available
        future_df[f'sales_lag_{lag}'] = np.nan
        for i in range(min(lag, len(future_df))):
            if i < len(sales_data) - lag:
                future_df.loc[i, f'sales_lag_{lag}'] = sales_data.iloc[-(lag-i)]['sales_amount']

# Add rolling statistics (use the last values from historical data)
for window in [7, 14, 30]:
    future_df[f'sales_rolling_mean_{window}'] = sales_data[f'sales_rolling_mean_{window}'].iloc[-1]
    future_df[f'sales_rolling_std_{window}'] = sales_data[f'sales_rolling_std_{window}'].iloc[-1]

# For simplicity, we'll only forecast a few days where we have complete lag features
forecast_days = 7  # Adjust based on available lag features
future_features = future_df.iloc[:forecast_days][feature_columns]

# Make predictions
future_forecast = xgb_model.predict(future_features)

# Create forecast dataframe
forecast_result = pd.DataFrame({
    'date': future_df['date'].iloc[:forecast_days],
    'forecasted_sales': future_forecast
})

print(forecast_result)

# Visualize final forecast
plt.figure(figsize=(15, 6))
plt.plot(sales_data['date'], sales_data['sales_amount'], label='Historical Data')
plt.plot(forecast_result['date'], forecast_result['forecasted_sales'], 'r--', label='Forecast')
plt.title('Sales Forecast for Next Week')
plt.xlabel('Date')
plt.ylabel('Sales Amount')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

### 3.5 Insights and Recommendations

```
# Example Sales Forecasting Insights Document

## Key Insights from Sales Forecasting Analysis

### 1. Sales Patterns and Trends
- **Overall Trend**: 12% year-over-year growth with accelerating momentum in Q4
- **Seasonality**: Strong weekly pattern with sales peaking on weekends (45% higher than weekdays)
- **Monthly Pattern**: Consistent sales spike in the first week of each month (+22% compared to other weeks)
- **Annual Cycle**: Q4 sales are 35% higher than other quarters, with December showing the strongest performance

### 2. External Factor Impact
- **Holidays**: Sales increase by an average of 65% during major holidays
- **Promotions**: Flash sales drive a 40% increase during the promotion period but cause a 15% dip in the following week
- **Weather**: Each 10°F increase in temperature correlates with a 5% increase in sales of seasonal products

### 3. Forecast Accuracy
- **Short-term (1-7 days)**: MAPE of 8.5% using XGBoost model
- **Medium-term (8-30 days)**: MAPE of 12.3% using Prophet model
- **Long-term (1-3 months)**: MAPE of 18.7% using SARIMA model

### 4. Product Category Insights
- **Electronics**: Highest forecast accuracy (MAPE 7.2%) with strong weekend and holiday patterns
- **Clothing**: Moderate forecast accuracy (MAPE 13.5%) with significant weather sensitivity
- **Home Goods**: Lower forecast accuracy (MAPE 16.8%) with less predictable purchasing patterns

## Strategic Recommendations

### 1. Inventory Management
- Increase safety stock levels by 20% for high-demand products during identified peak periods
- Implement dynamic reordering based on 7-day forecasts for fast-moving items
- Reduce inventory holding of seasonal items during predicted low-demand periods

### 2. Staffing and Operations
- Adjust staffing levels to match forecasted demand patterns, particularly for weekends and holidays
- Schedule major maintenance and system updates during identified low-volume periods
- Prepare fulfillment centers for 30% higher volume during holiday seasons

### 3. Marketing and Promotion Planning
- Schedule major promotions during forecasted low-demand periods to smooth sales patterns
- Avoid overlapping promotions with naturally high-demand periods to maximize revenue
- Develop targeted campaigns for specific product categories during their predicted growth periods

### 4. Financial Planning
- Use 30-day forecasts for short-term cash flow management with 90% confidence intervals
- Incorporate quarterly forecasts into budget planning with appropriate risk adjustments
- Set sales targets based on forecast baseline plus growth initiatives

### 5. Continuous Improvement
- Implement weekly forecast accuracy tracking and model retraining
- Expand data collection to include more external variables (competitor promotions, economic indicators)
- Develop product-level forecasting for top 20% of SKUs by revenue
```

> **Hands-on Project:** Using the provided sales forecasting code as a template, analyze a time series dataset of your choice. Implement at least three different forecasting models, compare their performance, and create visualizations of the forecasts. Develop actionable recommendations based on the patterns and trends you identify.

## 4. Building a Data Analytics Portfolio

### 4.1 Portfolio Project Selection

Choosing projects that showcase your skills:

1. **Demonstrate Range of Skills**
   - Data cleaning and preparation
   - Exploratory data analysis
   - Statistical analysis
   - Machine learning applications
   - Data visualization and storytelling

2. **Address Real Business Problems**
   - Customer segmentation and targeting
   - Sales forecasting and trend analysis
   - Churn prediction and retention
   - Pricing optimization
   - Marketing campaign analysis

3. **Use Diverse Data Types**
   - Structured data (tables, databases)
   - Time series data
   - Text data
   - Geospatial data
   - Network data

### 4.2 Project Documentation

Creating professional documentation:

```
# Example Project Documentation Template

# [Project Title]

## Executive Summary
[Brief overview of the project, key findings, and impact - 3-5 sentences]

## Business Problem
[Clear statement of the business problem or opportunity addressed]

## Data Sources
[Description of data sources, including size, time period, and key variables]

## Methodology
[Overview of analytical approach, techniques used, and why they were chosen]

## Key Findings
[Bullet points of 3-5 most important insights discovered]

## Visualizations
[2-3 key visualizations that best illustrate the findings]

## Recommendations
[Actionable recommendations based on the analysis]

## Impact and Results
[Quantifiable business impact, either projected or actual]

## Technical Details
[Brief description of tools, libraries, and algorithms used]

## Challenges and Solutions
[Key challenges encountered and how they were addressed]

## Future Work
[Potential next steps or extensions of the analysis]
```

### 4.3 Presentation and Communication

Effectively communicating your work:

1. **Executive Presentations**
   - Focus on business impact and actionable insights
   - Limit technical details unless specifically requested
   - Use clear, simple visualizations
   - Structure: Problem → Approach → Findings → Recommendations

2. **Technical Documentation**
   - Include detailed methodology and code
   - Document data preprocessing steps
   - Explain model selection and evaluation
   - Provide reproducibility instructions

3. **Interactive Dashboards**
   - Enable stakeholders to explore data themselves
   - Focus on key metrics and KPIs
   - Include filtering and drill-down capabilities
   - Provide clear context and explanations

> **Hands-on Exercise:** Create a portfolio documentation template for one of the projects you've completed in this course. Include sections for the business problem, methodology, key findings, visualizations, and recommendations. Write the executive summary and business problem sections.

## 5. Measuring Analytics Impact

### 5.1 Defining Success Metrics

Quantifying the value of data analytics:

1. **Business Performance Metrics**
   - Revenue growth
   - Cost reduction
   - Profit margin improvement
   - Market share increase
   - Customer satisfaction scores

2. **Operational Metrics**
   - Process efficiency improvements
   - Error rate reduction
   - Resource utilization
   - Cycle time reduction
   - Inventory optimization

3. **Model Performance Metrics**
   - Prediction accuracy (RMSE, MAE, MAPE)
   - Classification metrics (precision, recall, F1-score)
   - Lift and gain
   - ROC AUC
   - R-squared and adjusted R-squared

### 5.2 Before-and-After Analysis

Measuring impact through comparison:

```python
# Example Python code for before-and-after analysis
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Load data
campaign_data = pd.read_csv('marketing_campaign_results.csv')
campaign_data['date'] = pd.to_datetime(campaign_data['date'])

# Define before and after periods
implementation_date = pd.to_datetime('2023-03-01')
before_data = campaign_data[campaign_data['date'] < implementation_date]
after_data = campaign_data[campaign_data['date'] >= implementation_date]

print(f"Before period: {before_data['date'].min()} to {before_data['date'].max()}")
print(f"After period: {after_data['date'].min()} to {after_data['date'].max()}")
print(f"Before period data points: {len(before_data)}")
print(f"After period data points: {len(after_data)}")

# Calculate key metrics for both periods
metrics = ['conversion_rate', 'average_order_value', 'customer_acquisition_cost']

results = []
for metric in metrics:
    before_mean = before_data[metric].mean()
    after_mean = after_data[metric].mean()
    absolute_change = after_mean - before_mean
    percent_change = (absolute_change / before_mean) * 100
    
    # Perform t-test to check if the difference is statistically significant
    t_stat, p_value = stats.ttest_ind(before_data[metric], after_data[metric], equal_var=False)
    
    results.append({
        'Metric': metric,
        'Before': before_mean,
        'After': after_mean,
        'Absolute Change': absolute_change,
        'Percent Change': percent_change,
        't-statistic': t_stat,
        'p-value': p_value,
        'Statistically Significant': p_value < 0.05
    })

# Create results dataframe
results_df = pd.DataFrame(results)
print("\nBefore-and-After Analysis Results:")
print(results_df)

# Visualize results
plt.figure(figsize=(15, 10))

for i, metric in enumerate(metrics):
    plt.subplot(len(metrics), 1, i+1)
    
    # Plot time series with vertical line at implementation date
    plt.plot(campaign_data['date'], campaign_data[metric])
    plt.axvline(implementation_date, color='red', linestyle='--', 
               label='Implementation Date')
    
    # Add average lines for before and after periods
    plt.axhline(before_data[metric].mean(), color='blue', linestyle=':', 
               label=f'Before Avg: {before_data[metric].mean():.2f}')
    plt.axhline(after_data[metric].mean(), color='green', linestyle=':', 
               label=f'After Avg: {after_data[metric].mean():.2f}')
    
    plt.title(f'{metric.replace("_", " ").title()} Over Time')
    plt.xlabel('Date')
    plt.ylabel(metric.replace("_", " ").title())
    plt.legend()
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Statistical visualization
plt.figure(figsize=(15, 5))

for i, metric in enumerate(metrics):
    plt.subplot(1, len(metrics), i+1)
    
    # Create box plots for before and after
    sns.boxplot(x='period', y=metric, data=pd.concat([
        before_data.assign(period='Before'),
        after_data.assign(period='After')
    ]))
    
    plt.title(f'{metric.replace("_", " ").title()}: Before vs. After')
    plt.xlabel('')
    plt.ylabel(metric.replace("_", " ").title())
    plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Calculate ROI if applicable
if 'revenue' in campaign_data.columns and 'cost' in campaign_data.columns:
    before_revenue = before_data['revenue'].sum()
    before_cost = before_data['cost'].sum()
    before_profit = before_revenue - before_cost
    
    after_revenue = after_data['revenue'].sum()
    after_cost = after_data['cost'].sum()
    after_profit = after_revenue - after_cost
    
    profit_increase = after_profit - before_profit
    implementation_cost = 50000  # Example implementation cost
    
    roi = (profit_increase - implementation_cost) / implementation_cost * 100
    
    print(f"\nROI Analysis:")
    print(f"Before Period - Revenue: ${before_revenue:,.2f}, Cost: ${before_cost:,.2f}, Profit: ${before_profit:,.2f}")
    print(f"After Period - Revenue: ${after_revenue:,.2f}, Cost: ${after_cost:,.2f}, Profit: ${after_profit:,.2f}")
    print(f"Profit Increase: ${profit_increase:,.2f}")
    print(f"Implementation Cost: ${implementation_cost:,.2f}")
    print(f"ROI: {roi:.2f}%")
```

### 5.3 A/B Testing for Analytics Solutions

Validating impact through controlled experiments:

```python
# Example Python code for A/B testing analysis
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Load A/B test data
ab_test_data = pd.read_csv('ab_test_results.csv')

# Examine the data
print("A/B Test Data Sample:")
print(ab_test_data.head())
print("\nData Summary:")
print(ab_test_data.describe())

# Check group sizes
group_counts = ab_test_data['group'].value_counts()
print("\nGroup Sizes:")
print(group_counts)

# Calculate conversion rates by group
conversion_by_group = ab_test_data.groupby('group')['converted'].mean()
print("\nConversion Rates:")
print(conversion_by_group)

# Visualize conversion rates
plt.figure(figsize=(10, 6))
sns.barplot(x='group', y='converted', data=ab_test_data, ci=95)
plt.title('Conversion Rate by Test Group')
plt.xlabel('Group')
plt.ylabel('Conversion Rate')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Perform statistical test (z-test for proportions)
control_data = ab_test_data[ab_test_data['group'] == 'control']
treatment_data = ab_test_data[ab_test_data['group'] == 'treatment']

control_conversions = control_data['converted'].sum()
control_size = len(control_data)
control_rate = control_conversions / control_size

treatment_conversions = treatment_data['converted'].sum()
treatment_size = len(treatment_data)
treatment_rate = treatment_conversions / treatment_size

# Calculate the z-score
pooled_rate = (control_conversions + treatment_conversions) / (control_size + treatment_size)
se = np.sqrt(pooled_rate * (1 - pooled_rate) * (1/control_size + 1/treatment_size))
z_score = (treatment_rate - control_rate) / se
p_value = 2 * (1 - stats.norm.cdf(abs(z_score)))  # Two-tailed test

print("\nStatistical Test Results:")
print(f"Control Conversion Rate: {control_rate:.4f} ({control_conversions} / {control_size})")
print(f"Treatment Conversion Rate: {treatment_rate:.4f} ({treatment_conversions} / {treatment_size})")
print(f"Absolute Difference: {treatment_rate - control_rate:.4f}")
print(f"Relative Difference: {(treatment_rate - control_rate) / control_rate * 100:.2f}%")
print(f"Z-score: {z_score:.4f}")
print(f"P-value: {p_value:.4f}")

if p_value < 0.05:
    print("The difference is statistically significant at the 95% confidence level.")
else:
    print("The difference is not statistically significant at the 95% confidence level.")

# Calculate confidence interval
margin_of_error = 1.96 * np.sqrt((treatment_rate * (1 - treatment_rate)) / treatment_size + 
                                (control_rate * (1 - control_rate)) / control_size)
ci_lower = (treatment_rate - control_rate) - margin_of_error
ci_upper = (treatment_rate - control_rate) + margin_of_error

print(f"\n95% Confidence Interval for the difference: [{ci_lower:.4f}, {ci_upper:.4f}]")

# Visualize the results with confidence intervals
plt.figure(figsize=(12, 6))

# Plot conversion rates with confidence intervals
plt.subplot(1, 2, 1)
sns.barplot(x='group', y='converted', data=ab_test_data, ci=95)
plt.title('Conversion Rate by Group with 95% CI')
plt.xlabel('Group')
plt.ylabel('Conversion Rate')
plt.grid(True, alpha=0.3)

# Plot the difference with confidence interval
plt.subplot(1, 2, 2)
diff = treatment_rate - control_rate
plt.bar(['Difference'], [diff])
plt.errorbar(['Difference'], [diff], yerr=margin_of_error, fmt='o', color='black')
plt.axhline(y=0, color='red', linestyle='--')
plt.title('Difference in Conversion Rate with 95% CI')
plt.ylabel('Difference (Treatment - Control)')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

# Calculate required sample size for future tests
# For detecting a 10% relative difference with 80% power
target_diff = 0.1 * control_rate
alpha = 0.05  # Significance level
beta = 0.2  # 1 - power
z_alpha = stats.norm.ppf(1 - alpha/2)
z_beta = stats.norm.ppf(1 - beta)

p_avg = (control_rate + control_rate * (1 + target_diff)) / 2
required_sample_size = (2 * p_avg * (1 - p_avg) * (z_alpha + z_beta)**2) / target_diff**2

print(f"\nSample Size Planning for Future Tests:")
print(f"To detect a {target_diff:.4f} absolute difference ({target_diff/control_rate*100:.1f}% relative difference)")
print(f"With {(1-beta)*100}% power at {(1-alpha)*100}% confidence level")
print(f"Required sample size per group: {np.ceil(required_sample_size):.0f}")
```

### 5.4 Long-term Impact Assessment

Evaluating sustained value:

1. **Trend Analysis**
   - Track key metrics over extended periods
   - Identify sustained improvements vs. temporary effects
   - Monitor for diminishing returns or adaptation effects

2. **Counterfactual Analysis**
   - Estimate what would have happened without the analytics solution
   - Use forecasting models to project baseline scenarios
   - Compare actual results to projected baseline

3. **Stakeholder Feedback**
   - Collect qualitative feedback from users and stakeholders
   - Assess changes in decision-making processes
   - Identify unexpected benefits or challenges

> **Hands-on Exercise:** Design an impact measurement plan for a data analytics project of your choice. Define the key success metrics, describe how you would conduct a before-and-after analysis, and outline an A/B testing approach if applicable.

## Summary

In this chapter, we've explored the practical application of data analytics through real-world projects:

- Planning and managing data analytics projects from problem definition to implementation
- Conducting customer segmentation analysis to identify and target distinct customer groups
- Performing sales forecasting and trend analysis to support business planning
- Building a professional data analytics portfolio to showcase your skills
- Measuring the impact and ROI of analytics initiatives

These applied projects demonstrate how the technical skills you've learned throughout this course can be combined to solve business problems and drive value. By following the structured approaches outlined in this chapter, you'll be well-equipped to tackle real-world data analytics challenges in your career.

## Additional Resources

### Books
- "Data Science for Business" by Foster Provost and Tom Fawcett
- "Storytelling with Data" by Cole Nussbaumer Knaflic
- "Competing on Analytics" by Thomas H. Davenport and Jeanne G. Harris

### Online Resources
- [Kaggle Competitions](https://www.kaggle.com/competitions)
- [Harvard Business Review: Data & Analytics](https://hbr.org/topic/data-and-analytics)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)

### Tools and Templates
- [Project Management Templates](https://www.projectmanagement.com/Templates/index.cfm)
- [Tableau Public Gallery](https://public.tableau.com/en-us/gallery)
- [Power BI Community Showcase](https://community.powerbi.com/t5/Data-Stories-Gallery/bd-p/DataStoriesGallery)

## Next Steps

As you complete this course, consider these next steps to continue your data analytics journey:

1. **Apply your skills to real-world problems**:
   - Volunteer your analytics skills for non-profit organizations
   - Participate in Kaggle competitions
   - Create personal projects based on your interests

2. **Expand your technical toolkit**:
   - Learn additional programming languages or tools
   - Explore specialized analytics domains (marketing analytics, financial analytics, etc.)
   - Develop expertise in big data technologies

3. **Build your professional network**:
   - Join data analytics communities and forums
   - Attend industry conferences and meetups
   - Connect with other professionals in the field

4. **Continue your education**:
   - Pursue advanced certifications
   - Take specialized courses in areas of interest
   - Stay updated on emerging trends and technologies

---

## Chapter Quiz

Test your understanding of applied data analytics concepts:

1. What are the key components of a well-defined data analytics project charter?
2. In customer segmentation, what criteria should you use to evaluate the quality of your segments?
3. What are the advantages and disadvantages of different time series forecasting methods?
4. How would you measure the ROI of a data analytics project that aims to reduce customer churn?
5. What elements should you include in a data analytics portfolio project to make it stand out to potential employers?

Good luck!
