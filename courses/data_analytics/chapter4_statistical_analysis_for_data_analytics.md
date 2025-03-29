# Statistical Analysis for Data Analytics

In this chapter, we'll explore statistical analysis techniques essential for data analytics. Statistics provides the mathematical foundation for drawing meaningful conclusions from data, testing hypotheses, and making predictions. Whether you're analyzing business metrics, conducting research, or building predictive models, a solid understanding of statistical methods is crucial.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Apply appropriate statistical tests based on data characteristics and analysis goals
2. Interpret statistical results correctly and communicate their significance
3. Understand probability distributions and their applications in data analysis
4. Perform hypothesis testing to validate assumptions and draw conclusions
5. Apply regression analysis to model relationships between variables

## 1. Fundamentals of Statistical Thinking

### 1.1 Population vs. Sample

Understanding the distinction between populations and samples is fundamental to statistical analysis:

- **Population**: The entire set of items or individuals you want to draw conclusions about
- **Sample**: A subset of the population used to make inferences about the population

```python
# Example Python code demonstrating sampling
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Create a simulated population
np.random.seed(42)  # For reproducibility
population = np.random.normal(loc=100, scale=15, size=10000)

# Take a random sample
sample_size = 100
sample = np.random.choice(population, size=sample_size, replace=False)

# Visualize population vs. sample
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Population distribution
sns.histplot(population, kde=True, ax=ax1)
ax1.axvline(np.mean(population), color='red', linestyle='--', 
            label=f'Population Mean: {np.mean(population):.2f}')
ax1.set_title(f'Population Distribution (N={len(population)})')
ax1.legend()

# Sample distribution
sns.histplot(sample, kde=True, ax=ax2)
ax2.axvline(np.mean(sample), color='green', linestyle='--', 
            label=f'Sample Mean: {np.mean(sample):.2f}')
ax2.set_title(f'Sample Distribution (n={len(sample)})')
ax2.legend()

plt.tight_layout()
plt.show()

print(f"Population mean: {np.mean(population):.2f}")
print(f"Sample mean: {np.mean(sample):.2f}")
print(f"Difference: {abs(np.mean(population) - np.mean(sample)):.2f}")
```

### 1.2 Types of Data and Measurement Scales

Different statistical methods are appropriate for different types of data:

1. **Nominal Data**: Categories with no inherent order (e.g., product categories, colors)
2. **Ordinal Data**: Categories with a meaningful order (e.g., satisfaction ratings, education levels)
3. **Interval Data**: Numeric data with meaningful intervals but no true zero (e.g., temperature in Celsius)
4. **Ratio Data**: Numeric data with meaningful intervals and a true zero (e.g., age, income, weight)

> **Knowledge Check:** For each of the following variables, identify the measurement scale (nominal, ordinal, interval, or ratio) and explain your reasoning:
> - Customer satisfaction rating (1-5 stars)
> - Annual income
> - Product category
> - Time spent on website
> - Zip code

### 1.3 Descriptive vs. Inferential Statistics

Two main branches of statistical analysis:

- **Descriptive Statistics**: Summarizing and describing data characteristics
  - Measures of central tendency (mean, median, mode)
  - Measures of dispersion (variance, standard deviation, range)
  - Distribution shape (skewness, kurtosis)

- **Inferential Statistics**: Drawing conclusions about populations based on sample data
  - Hypothesis testing
  - Confidence intervals
  - Regression analysis
  - Analysis of variance (ANOVA)

## 2. Probability Distributions

### 2.1 Common Probability Distributions

Understanding probability distributions helps in modeling random phenomena:

1. **Normal (Gaussian) Distribution**
   ```python
   # Example Python code for normal distribution
   from scipy import stats
   import numpy as np
   import matplotlib.pyplot as plt
   
   # Parameters
   mu = 100  # Mean
   sigma = 15  # Standard deviation
   
   # Generate x values
   x = np.linspace(mu - 4*sigma, mu + 4*sigma, 1000)
   
   # Calculate probability density
   y = stats.norm.pdf(x, mu, sigma)
   
   # Plot
   plt.figure(figsize=(10, 6))
   plt.plot(x, y, 'b-', linewidth=2)
   plt.fill_between(x, y, where=(x >= mu-sigma) & (x <= mu+sigma), 
                   color='blue', alpha=0.2, 
                   label='68% (±1σ)')
   plt.fill_between(x, y, where=(x >= mu-2*sigma) & (x <= mu+2*sigma), 
                   color='blue', alpha=0.1, 
                   label='95% (±2σ)')
   plt.fill_between(x, y, where=(x >= mu-3*sigma) & (x <= mu+3*sigma), 
                   color='blue', alpha=0.05, 
                   label='99.7% (±3σ)')
   
   plt.axvline(mu, color='red', linestyle='--', label=f'Mean (μ): {mu}')
   plt.axvline(mu+sigma, color='green', linestyle=':', alpha=0.7)
   plt.axvline(mu-sigma, color='green', linestyle=':', alpha=0.7)
   
   plt.title('Normal Distribution')
   plt.xlabel('Value')
   plt.ylabel('Probability Density')
   plt.legend()
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   
   # Calculate probabilities
   prob_within_1sigma = stats.norm.cdf(mu+sigma, mu, sigma) - stats.norm.cdf(mu-sigma, mu, sigma)
   prob_within_2sigma = stats.norm.cdf(mu+2*sigma, mu, sigma) - stats.norm.cdf(mu-2*sigma, mu, sigma)
   prob_within_3sigma = stats.norm.cdf(mu+3*sigma, mu, sigma) - stats.norm.cdf(mu-3*sigma, mu, sigma)
   
   print(f"Probability within 1 standard deviation: {prob_within_1sigma:.4f} (≈ 68%)")
   print(f"Probability within 2 standard deviations: {prob_within_2sigma:.4f} (≈ 95%)")
   print(f"Probability within 3 standard deviations: {prob_within_3sigma:.4f} (≈ 99.7%)")
   ```

2. **Binomial Distribution**
   ```python
   # Example Python code for binomial distribution
   # Parameters
   n = 20  # Number of trials
   p = 0.3  # Probability of success
   
   # Generate x values (number of successes)
   x = np.arange(0, n+1)
   
   # Calculate probability mass function
   y = stats.binom.pmf(x, n, p)
   
   # Plot
   plt.figure(figsize=(10, 6))
   plt.bar(x, y, alpha=0.7)
   plt.axvline(n*p, color='red', linestyle='--', 
               label=f'Mean (n·p): {n*p}')
   
   plt.title(f'Binomial Distribution (n={n}, p={p})')
   plt.xlabel('Number of Successes')
   plt.ylabel('Probability')
   plt.legend()
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   
   # Calculate probabilities
   prob_at_least_10 = 1 - stats.binom.cdf(9, n, p)
   print(f"Probability of at least 10 successes: {prob_at_least_10:.4f}")
   ```

3. **Poisson Distribution**
   ```python
   # Example Python code for Poisson distribution
   # Parameter
   lambda_param = 5  # Average rate
   
   # Generate x values
   x = np.arange(0, 20)
   
   # Calculate probability mass function
   y = stats.poisson.pmf(x, lambda_param)
   
   # Plot
   plt.figure(figsize=(10, 6))
   plt.bar(x, y, alpha=0.7)
   plt.axvline(lambda_param, color='red', linestyle='--', 
               label=f'Mean (λ): {lambda_param}')
   
   plt.title(f'Poisson Distribution (λ={lambda_param})')
   plt.xlabel('Number of Events')
   plt.ylabel('Probability')
   plt.legend()
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

4. **Uniform Distribution**
   ```python
   # Example Python code for uniform distribution
   # Parameters
   a = 0  # Lower bound
   b = 10  # Upper bound
   
   # Generate x values
   x = np.linspace(a-1, b+1, 1000)
   
   # Calculate probability density
   y = stats.uniform.pdf(x, a, b-a)
   
   # Plot
   plt.figure(figsize=(10, 6))
   plt.plot(x, y, 'b-', linewidth=2)
   plt.fill_between(x, y, where=(x >= a) & (x <= b), 
                   color='blue', alpha=0.2)
   
   plt.axvline((a+b)/2, color='red', linestyle='--', 
               label=f'Mean: {(a+b)/2}')
   
   plt.title(f'Uniform Distribution (a={a}, b={b})')
   plt.xlabel('Value')
   plt.ylabel('Probability Density')
   plt.legend()
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

### 2.2 Central Limit Theorem

One of the most important concepts in statistics:

```python
# Example Python code demonstrating the Central Limit Theorem
# Create a non-normal population (exponential distribution)
np.random.seed(42)
population = np.random.exponential(scale=1.0, size=10000)

# Function to take samples and calculate means
def sample_means(population, sample_size, num_samples):
    means = []
    for _ in range(num_samples):
        sample = np.random.choice(population, size=sample_size, replace=True)
        means.append(np.mean(sample))
    return np.array(means)

# Take samples of different sizes
sample_sizes = [1, 5, 30, 100]
num_samples = 1000

# Create plots
fig, axes = plt.subplots(len(sample_sizes)+1, 1, figsize=(10, 15))

# Plot population distribution
sns.histplot(population, kde=True, ax=axes[0])
axes[0].set_title(f'Population Distribution (Exponential)')
axes[0].axvline(np.mean(population), color='red', linestyle='--', 
                label=f'Mean: {np.mean(population):.2f}')
axes[0].legend()

# Plot sample mean distributions for different sample sizes
for i, size in enumerate(sample_sizes):
    means = sample_means(population, size, num_samples)
    sns.histplot(means, kde=True, ax=axes[i+1])
    axes[i+1].set_title(f'Distribution of Sample Means (n={size}, {num_samples} samples)')
    axes[i+1].axvline(np.mean(means), color='red', linestyle='--', 
                      label=f'Mean: {np.mean(means):.2f}')
    axes[i+1].axvline(np.mean(population), color='green', linestyle=':', 
                      label=f'Population Mean: {np.mean(population):.2f}')
    axes[i+1].legend()

plt.tight_layout()
plt.show()

# Print standard errors
print("Standard Error of the Mean (SEM) for different sample sizes:")
for size in sample_sizes:
    sem = np.std(population) / np.sqrt(size)
    print(f"Sample size {size}: {sem:.4f}")
```

> **Hands-on Exercise:** Generate a non-normal population distribution of your choice (e.g., bimodal, skewed). Apply the Central Limit Theorem by taking samples of increasing size and plotting the distribution of sample means. At what sample size does the distribution of sample means begin to appear normal?

## 3. Hypothesis Testing

### 3.1 Hypothesis Testing Framework

The systematic approach to making statistical decisions:

1. **State the hypotheses**
   - Null hypothesis (H₀): The default assumption of no effect or no difference
   - Alternative hypothesis (H₁ or Hₐ): The claim you're testing for

2. **Choose a significance level (α)**
   - Typically 0.05 (5%), 0.01 (1%), or 0.10 (10%)
   - Represents the probability of rejecting H₀ when it's actually true (Type I error)

3. **Select an appropriate test statistic**
   - Based on data type, distribution, and research question

4. **Calculate the test statistic and p-value**
   - p-value: Probability of observing results at least as extreme as yours if H₀ is true

5. **Make a decision**
   - If p-value < α: Reject H₀ in favor of H₁
   - If p-value ≥ α: Fail to reject H₀

6. **Interpret the results**
   - Statistical significance vs. practical significance
   - Effect size and confidence intervals

### 3.2 Common Statistical Tests

1. **t-tests**
   - **One-sample t-test**: Compare a sample mean to a known value
   ```python
   # Example Python code for one-sample t-test
   from scipy import stats
   
   # Sample data: customer satisfaction scores (1-10)
   satisfaction_scores = np.array([7, 8, 9, 6, 8, 7, 9, 8, 7, 8, 9, 7, 6, 8, 9])
   
   # Hypothesized population mean (industry average)
   mu = 7.5
   
   # Perform one-sample t-test
   t_stat, p_value = stats.ttest_1samp(satisfaction_scores, mu)
   
   print(f"One-sample t-test results:")
   print(f"t-statistic: {t_stat:.4f}")
   print(f"p-value: {p_value:.4f}")
   
   # Interpret results
   alpha = 0.05
   if p_value < alpha:
       print(f"Reject H₀: Sample mean is significantly different from {mu}")
   else:
       print(f"Fail to reject H₀: No significant difference from {mu}")
   
   # Calculate effect size (Cohen's d)
   effect_size = (np.mean(satisfaction_scores) - mu) / np.std(satisfaction_scores, ddof=1)
   print(f"Effect size (Cohen's d): {effect_size:.4f}")
   ```

   - **Independent samples t-test**: Compare means between two unrelated groups
   ```python
   # Example Python code for independent samples t-test
   # Sample data: conversion rates for two different website designs
   design_a = np.array([0.12, 0.15, 0.13, 0.14, 0.11, 0.13, 0.12, 0.15, 0.14, 0.13])
   design_b = np.array([0.14, 0.17, 0.16, 0.15, 0.13, 0.16, 0.15, 0.18, 0.17, 0.16])
   
   # Perform independent samples t-test
   t_stat, p_value = stats.ttest_ind(design_a, design_b, equal_var=False)  # Welch's t-test
   
   print(f"Independent samples t-test results:")
   print(f"t-statistic: {t_stat:.4f}")
   print(f"p-value: {p_value:.4f}")
   
   # Interpret results
   alpha = 0.05
   if p_value < alpha:
       print("Reject H₀: There is a significant difference between the designs")
   else:
       print("Fail to reject H₀: No significant difference between the designs")
   
   # Calculate effect size (Cohen's d)
   effect_size = (np.mean(design_b) - np.mean(design_a)) / np.sqrt(
       (np.var(design_a, ddof=1) + np.var(design_b, ddof=1)) / 2)
   print(f"Effect size (Cohen's d): {effect_size:.4f}")
   
   # Visualize
   plt.figure(figsize=(10, 6))
   plt.boxplot([design_a, design_b], labels=['Design A', 'Design B'])
   plt.title('Conversion Rates by Website Design')
   plt.ylabel('Conversion Rate')
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

   - **Paired samples t-test**: Compare means between two related groups
   ```python
   # Example Python code for paired samples t-test
   # Sample data: customer satisfaction before and after website redesign
   before = np.array([6, 7, 5, 8, 6, 7, 9, 7, 6, 8])
   after = np.array([7, 8, 6, 9, 8, 7, 9, 8, 7, 9])
   
   # Perform paired samples t-test
   t_stat, p_value = stats.ttest_rel(before, after)
   
   print(f"Paired samples t-test results:")
   print(f"t-statistic: {t_stat:.4f}")
   print(f"p-value: {p_value:.4f}")
   
   # Interpret results
   alpha = 0.05
   if p_value < alpha:
       print("Reject H₀: There is a significant change after redesign")
   else:
       print("Fail to reject H₀: No significant change after redesign")
   
   # Calculate effect size (Cohen's d for paired samples)
   d = np.mean(after - before) / np.std(after - before, ddof=1)
   print(f"Effect size (Cohen's d): {d:.4f}")
   
   # Visualize
   plt.figure(figsize=(10, 6))
   plt.plot(['Before', 'After'], [np.mean(before), np.mean(after)], 'o-', linewidth=2)
   plt.errorbar(['Before', 'After'], [np.mean(before), np.mean(after)], 
                yerr=[np.std(before, ddof=1), np.std(after, ddof=1)], 
                fmt='o', capsize=5)
   
   # Add individual data points with connecting lines
   for i in range(len(before)):
       plt.plot(['Before', 'After'], [before[i], after[i]], 'gray', alpha=0.3)
   
   plt.title('Customer Satisfaction Before and After Website Redesign')
   plt.ylabel('Satisfaction Score')
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

2. **Chi-Square Tests**
   - **Chi-square goodness of fit**: Compare observed frequencies to expected frequencies
   ```python
   # Example Python code for chi-square goodness of fit test
   # Sample data: observed customer distribution across four market segments
   observed = np.array([120, 85, 65, 30])
   
   # Expected distribution based on historical data (equal proportions)
   total = np.sum(observed)
   expected = np.array([total/4, total/4, total/4, total/4])
   
   # Perform chi-square goodness of fit test
   chi2_stat, p_value = stats.chisquare(observed, expected)
   
   print(f"Chi-square goodness of fit test results:")
   print(f"Chi-square statistic: {chi2_stat:.4f}")
   print(f"p-value: {p_value:.4f}")
   
   # Interpret results
   alpha = 0.05
   if p_value < alpha:
       print("Reject H₀: The observed distribution differs from expected")
   else:
       print("Fail to reject H₀: No significant difference from expected distribution")
   
   # Visualize
   plt.figure(figsize=(10, 6))
   segments = ['Segment A', 'Segment B', 'Segment C', 'Segment D']
   
   x = np.arange(len(segments))
   width = 0.35
   
   plt.bar(x - width/2, observed, width, label='Observed')
   plt.bar(x + width/2, expected, width, label='Expected')
   
   plt.xlabel('Market Segment')
   plt.ylabel('Number of Customers')
   plt.title('Observed vs. Expected Customer Distribution')
   plt.xticks(x, segments)
   plt.legend()
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

   - **Chi-square test of independence**: Test association between categorical variables
   ```python
   # Example Python code for chi-square test of independence
   # Sample data: contingency table of marketing channel vs. conversion
   # Rows: Marketing Channel (Email, Social, Search)
   # Columns: Conversion (Yes, No)
   observed = np.array([
       [150, 350],  # Email: 150 converted, 350 didn't
       [200, 300],  # Social: 200 converted, 300 didn't
       [100, 400]   # Search: 100 converted, 400 didn't
   ])
   
   # Perform chi-square test of independence
   chi2_stat, p_value, dof, expected = stats.chi2_contingency(observed)
   
   print(f"Chi-square test of independence results:")
   print(f"Chi-square statistic: {chi2_stat:.4f}")
   print(f"p-value: {p_value:.4f}")
   print(f"Degrees of freedom: {dof}")
   
   # Interpret results
   alpha = 0.05
   if p_value < alpha:
       print("Reject H₀: There is a significant association between marketing channel and conversion")
   else:
       print("Fail to reject H₀: No significant association between marketing channel and conversion")
   
   # Calculate Cramer's V (effect size for chi-square)
   n = np.sum(observed)
   min_dim = min(observed.shape) - 1
   cramer_v = np.sqrt(chi2_stat / (n * min_dim))
   print(f"Effect size (Cramer's V): {cramer_v:.4f}")
   
   # Visualize
   plt.figure(figsize=(12, 6))
   
   # Conversion rates by channel
   conversion_rates = observed[:, 0] / (observed[:, 0] + observed[:, 1])
   channels = ['Email', 'Social', 'Search']
   
   plt.bar(channels, conversion_rates)
   plt.title('Conversion Rate by Marketing Channel')
   plt.xlabel('Marketing Channel')
   plt.ylabel('Conversion Rate')
   plt.ylim(0, 0.5)
   
   # Add percentage labels
   for i, rate in enumerate(conversion_rates):
       plt.text(i, rate + 0.01, f"{rate:.1%}", ha='center')
   
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

3. **ANOVA (Analysis of Variance)**
   - Compare means across three or more groups
   ```python
   # Example Python code for one-way ANOVA
   # Sample data: customer satisfaction scores for three different product versions
   version_a = np.array([7, 8, 9, 6, 8, 7, 9, 8])
   version_b = np.array([6, 7, 8, 5, 7, 6, 8, 7])
   version_c = np.array([8, 9, 7, 9, 8, 9, 10, 8])
   
   # Perform one-way ANOVA
   f_stat, p_value = stats.f_oneway(version_a, version_b, version_c)
   
   print(f"One-way ANOVA results:")
   print(f"F-statistic: {f_stat:.4f}")
   print(f"p-value: {p_value:.4f}")
   
   # Interpret results
   alpha = 0.05
   if p_value < alpha:
       print("Reject H₀: There are significant differences among product versions")
   else:
       print("Fail to reject H₀: No significant differences among product versions")
   
   # If ANOVA is significant, perform post-hoc tests
   if p_value < alpha:
       from statsmodels.stats.multicomp import pairwise_tukeyhsd
       
       # Prepare data for Tukey's test
       data = np.concatenate([version_a, version_b, version_c])
       labels = np.concatenate([
           np.repeat('Version A', len(version_a)),
           np.repeat('Version B', len(version_b)),
           np.repeat('Version C', len(version_c))
       ])
       
       # Perform Tukey's HSD test
       tukey_results = pairwise_tukeyhsd(data, labels, alpha=0.05)
       print("\nTukey's HSD post-hoc test results:")
       print(tukey_results)
   
   # Visualize
   plt.figure(figsize=(10, 6))
   plt.boxplot([version_a, version_b, version_c], labels=['Version A', 'Version B', 'Version C'])
   plt.title('Customer Satisfaction by Product Version')
   plt.ylabel('Satisfaction Score')
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

4. **Non-parametric Tests**
   - Used when data doesn't meet assumptions for parametric tests
   - **Mann-Whitney U test**: Non-parametric alternative to independent samples t-test
   ```python
   # Example Python code for Mann-Whitney U test
   # Sample data: response times (in seconds) for two different server configurations
   config_a = np.array([0.8, 1.2, 0.9, 1.0, 1.1, 0.7, 1.3, 0.9, 1.0, 1.2])
   config_b = np.array([0.6, 0.9, 0.7, 0.8, 0.7, 0.6, 0.8, 0.7, 0.9, 0.8])
   
   # Perform Mann-Whitney U test
   u_stat, p_value = stats.mannwhitneyu(config_a, config_b, alternative='two-sided')
   
   print(f"Mann-Whitney U test results:")
   print(f"U-statistic: {u_stat:.4f}")
   print(f"p-value: {p_value:.4f}")
   
   # Interpret results
   alpha = 0.05
   if p_value < alpha:
       print("Reject H₀: There is a significant difference between configurations")
   else:
       print("Fail to reject H₀: No significant difference between configurations")
   
   # Visualize
   plt.figure(figsize=(10, 6))
   plt.boxplot([config_a, config_b], labels=['Configuration A', 'Configuration B'])
   plt.title('Response Times by Server Configuration')
   plt.ylabel('Response Time (seconds)')
   plt.grid(True, alpha=0.3)
   plt.tight_layout()
   plt.show()
   ```

> **Hands-on Exercise:** For a provided dataset containing customer purchase amounts by different marketing channels, perform the appropriate statistical test to determine if there are significant differences in purchase amounts across channels. Interpret your results and create visualizations to support your findings.

### 3.3 Type I and Type II Errors

Understanding the two types of errors in hypothesis testing:

- **Type I Error (False Positive)**: Rejecting H₀ when it's actually true
  - Probability = α (significance level)
  - Example: Concluding a marketing campaign increased sales when it actually had no effect

- **Type II Error (False Negative)**: Failing to reject H₀ when it's actually false
  - Probability = β
  - Power = 1 - β (probability of correctly rejecting a false H₀)
  - Example: Failing to detect that a marketing campaign increased sales when it actually did

```python
# Example Python code demonstrating statistical power and sample size
from statsmodels.stats.power import TTestIndPower

# Parameters
effect_sizes = [0.2, 0.5, 0.8]  # Small, medium, large
alpha = 0.05
sample_sizes = np.arange(10, 100, 5)

# Calculate power for different effect sizes and sample sizes
power_analysis = TTestIndPower()
plt.figure(figsize=(10, 6))

for effect in effect_sizes:
    power = [power_analysis.power(effect, n, alpha) for n in sample_sizes]
    plt.plot(sample_sizes, power, label=f'Effect size = {effect}')

plt.axhline(0.8, color='red', linestyle='--', label='Target power = 0.8')
plt.title('Statistical Power by Sample Size and Effect Size')
plt.xlabel('Sample Size (per group)')
plt.ylabel('Statistical Power (1 - β)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Calculate required sample size for a specific scenario
required_n = power_analysis.solve_power(effect_size=0.5, power=0.8, alpha=0.05)
print(f"Required sample size per group for medium effect (0.5), 80% power, α=0.05: {np.ceil(required_n)}")
```

> **Knowledge Check:** In a clinical trial for a new medication, which type of error would be more serious: a Type I error or a Type II error? Explain your reasoning.

## 4. Regression Analysis

### 4.1 Simple Linear Regression

Modeling the relationship between two continuous variables:

```python
# Example Python code for simple linear regression
import statsmodels.api as sm
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error

# Sample data: advertising spend vs. sales
advertising = np.array([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70])
sales = np.array([25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 85, 90, 95]) + np.random.normal(0, 5, 13)

# Reshape for sklearn
X = advertising.reshape(-1, 1)

# Fit linear regression model using sklearn
model_sk = LinearRegression()
model_sk.fit(X, sales)

# Predictions
sales_pred = model_sk.predict(X)

# Model evaluation
r2 = r2_score(sales, sales_pred)
rmse = np.sqrt(mean_squared_error(sales, sales_pred))

print(f"Linear Regression Results (sklearn):")
print(f"Coefficient (slope): {model_sk.coef_[0]:.4f}")
print(f"Intercept: {model_sk.intercept_:.4f}")
print(f"R-squared: {r2:.4f}")
print(f"RMSE: {rmse:.4f}")

# Fit linear regression model using statsmodels (for detailed statistics)
X_sm = sm.add_constant(advertising)  # Add intercept term
model_sm = sm.OLS(sales, X_sm)
results = model_sm.fit()

print("\nDetailed Regression Results (statsmodels):")
print(results.summary())

# Visualize
plt.figure(figsize=(10, 6))
plt.scatter(advertising, sales, color='blue', alpha=0.7, label='Actual data')
plt.plot(advertising, sales_pred, color='red', linewidth=2, label='Regression line')

# Add confidence intervals
from statsmodels.sandbox.regression.predstd import wls_prediction_std
_, lower, upper = wls_prediction_std(results)
plt.fill_between(advertising, lower, upper, color='red', alpha=0.1, label='95% CI')

plt.title('Relationship Between Advertising Spend and Sales')
plt.xlabel('Advertising Spend ($1000s)')
plt.ylabel('Sales ($1000s)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Prediction for new data
new_advertising = np.array([55, 75]).reshape(-1, 1)
new_sales_pred = model_sk.predict(new_advertising)
print(f"\nPredictions for new advertising spends:")
for ad, sales in zip(new_advertising.flatten(), new_sales_pred):
    print(f"Advertising spend: ${ad}k, Predicted sales: ${sales:.2f}k")
```

### 4.2 Multiple Linear Regression

Extending regression to include multiple predictors:

```python
# Example Python code for multiple linear regression
# Sample data: sales predicted by advertising spend, price, and competitor price
advertising = np.array([10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70])
price = np.array([9.5, 9.0, 9.2, 8.8, 8.5, 8.0, 7.8, 7.5, 7.2, 7.0, 6.8, 6.5, 6.2])
competitor_price = np.array([8.0, 8.2, 8.5, 8.0, 7.8, 7.5, 7.0, 6.8, 6.5, 6.2, 6.0, 5.8, 5.5])
sales = np.array([25, 30, 35, 40, 50, 55, 60, 65, 70, 75, 85, 90, 95]) + np.random.normal(0, 5, 13)

# Combine predictors
X = np.column_stack((advertising, price, competitor_price))

# Fit multiple regression model using sklearn
model_sk = LinearRegression()
model_sk.fit(X, sales)

# Predictions
sales_pred = model_sk.predict(X)

# Model evaluation
r2 = r2_score(sales, sales_pred)
rmse = np.sqrt(mean_squared_error(sales, sales_pred))

print(f"Multiple Regression Results (sklearn):")
print(f"Coefficients: {model_sk.coef_}")
print(f"Intercept: {model_sk.intercept_:.4f}")
print(f"R-squared: {r2:.4f}")
print(f"RMSE: {rmse:.4f}")

# Fit multiple regression model using statsmodels (for detailed statistics)
X_sm = sm.add_constant(X)  # Add intercept term
model_sm = sm.OLS(sales, X_sm)
results = model_sm.fit()

print("\nDetailed Multiple Regression Results (statsmodels):")
print(results.summary())

# Visualize partial regression plots
fig = plt.figure(figsize=(15, 5))

# Partial regression plot for advertising
ax1 = fig.add_subplot(131)
sm.graphics.plot_partregress(ax1, 'Sales', 'Advertising', ['Price', 'Competitor Price'], 
                            results, obs_labels=False)

# Partial regression plot for price
ax2 = fig.add_subplot(132)
sm.graphics.plot_partregress(ax2, 'Sales', 'Price', ['Advertising', 'Competitor Price'], 
                            results, obs_labels=False)

# Partial regression plot for competitor price
ax3 = fig.add_subplot(133)
sm.graphics.plot_partregress(ax3, 'Sales', 'Competitor Price', ['Advertising', 'Price'], 
                            results, obs_labels=False)

plt.tight_layout()
plt.show()

# Prediction for new data
new_data = np.array([
    [55, 7.5, 6.5],  # Scenario 1
    [65, 6.0, 5.5]   # Scenario 2
])
new_sales_pred = model_sk.predict(new_data)
print(f"\nPredictions for new scenarios:")
for i, (ad, p, cp) in enumerate(new_data):
    print(f"Scenario {i+1}: Advertising=${ad}k, Price=${p}, Competitor Price=${cp}")
    print(f"Predicted sales: ${new_sales_pred[i]:.2f}k")
```

### 4.3 Logistic Regression

Modeling binary outcomes:

```python
# Example Python code for logistic regression
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc

# Sample data: customer conversion based on time on site and pages viewed
time_on_site = np.array([1, 2, 3, 1.5, 2.5, 3.5, 4, 5, 2, 3, 4, 5, 6, 1, 2])
pages_viewed = np.array([2, 3, 4, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 1, 1])
converted = np.array([0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0])

# Combine predictors
X = np.column_stack((time_on_site, pages_viewed))

# Fit logistic regression model
model = LogisticRegression(random_state=42)
model.fit(X, converted)

# Predictions
y_pred_prob = model.predict_proba(X)[:, 1]  # Probability of conversion
y_pred = model.predict(X)  # Binary prediction

# Model evaluation
print(f"Logistic Regression Results:")
print(f"Coefficients: {model.coef_[0]}")
print(f"Intercept: {model.intercept_[0]:.4f}")
print("\nConfusion Matrix:")
print(confusion_matrix(converted, y_pred))
print("\nClassification Report:")
print(classification_report(converted, y_pred))

# ROC curve
fpr, tpr, thresholds = roc_curve(converted, y_pred_prob)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(10, 6))
plt.plot(fpr, tpr, color='blue', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='gray', lw=1, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.legend(loc="lower right")
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Visualize decision boundary
plt.figure(figsize=(10, 6))

# Create a mesh grid
x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, 0.1),
                     np.arange(y_min, y_max, 0.1))

# Predict probabilities for all points in the mesh
Z = model.predict_proba(np.c_[xx.ravel(), yy.ravel()])[:, 1]
Z = Z.reshape(xx.shape)

# Plot decision boundary
plt.contourf(xx, yy, Z, alpha=0.3, cmap=plt.cm.RdBu)
plt.colorbar(label='Probability of Conversion')

# Plot training points
plt.scatter(X[converted==0, 0], X[converted==0, 1], c='blue', marker='o', label='Not Converted')
plt.scatter(X[converted==1, 0], X[converted==1, 1], c='red', marker='^', label='Converted')

plt.title('Logistic Regression Decision Boundary')
plt.xlabel('Time on Site (minutes)')
plt.ylabel('Pages Viewed')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()

# Prediction for new data
new_data = np.array([
    [2.5, 4],  # Scenario 1
    [4.5, 5]   # Scenario 2
])
new_pred_prob = model.predict_proba(new_data)[:, 1]
print(f"\nPredictions for new visitors:")
for i, (time, pages) in enumerate(new_data):
    print(f"Visitor {i+1}: Time on site={time} min, Pages viewed={pages}")
    print(f"Probability of conversion: {new_pred_prob[i]:.2f}")
```

> **Hands-on Project:** For a provided e-commerce dataset:
> 1. Build a multiple regression model to predict customer spending based on demographic and behavioral variables
> 2. Evaluate the model's performance and interpret the coefficients
> 3. Create visualizations to explain your findings
> 4. Make recommendations based on your analysis

## 5. Advanced Statistical Concepts

### 5.1 Bootstrapping

Resampling technique for estimating statistics and constructing confidence intervals:

```python
# Example Python code for bootstrapping
from sklearn.utils import resample

# Sample data: customer lifetime value (CLV)
clv_data = np.array([500, 750, 1000, 1250, 1500, 1750, 2000, 2250, 2500, 2750])

# Bootstrap parameters
n_bootstraps = 1000
bootstrap_means = []

# Perform bootstrapping
for i in range(n_bootstraps):
    # Sample with replacement
    bootstrap_sample = resample(clv_data, replace=True, n_samples=len(clv_data))
    # Calculate and store mean
    bootstrap_means.append(np.mean(bootstrap_sample))

# Convert to numpy array
bootstrap_means = np.array(bootstrap_means)

# Calculate 95% confidence interval
conf_interval = np.percentile(bootstrap_means, [2.5, 97.5])

print(f"Original sample mean: ${np.mean(clv_data):.2f}")
print(f"Bootstrap mean: ${np.mean(bootstrap_means):.2f}")
print(f"95% confidence interval: ${conf_interval[0]:.2f} to ${conf_interval[1]:.2f}")

# Visualize bootstrap distribution
plt.figure(figsize=(10, 6))
plt.hist(bootstrap_means, bins=30, alpha=0.7, color='blue')
plt.axvline(np.mean(clv_data), color='red', linestyle='--', 
            label=f'Original Mean: ${np.mean(clv_data):.2f}')
plt.axvline(conf_interval[0], color='green', linestyle=':', 
            label=f'2.5th Percentile: ${conf_interval[0]:.2f}')
plt.axvline(conf_interval[1], color='green', linestyle=':', 
            label=f'97.5th Percentile: ${conf_interval[1]:.2f}')

plt.title('Bootstrap Distribution of Mean Customer Lifetime Value')
plt.xlabel('Mean CLV ($)')
plt.ylabel('Frequency')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
```

### 5.2 Bayesian Statistics

An alternative approach to statistical inference:

```python
# Example Python code for Bayesian inference
import pymc3 as pm
import arviz as az

# Sample data: conversion rates for A/B test
# Group A: 120 conversions out of 1000 visitors
# Group B: 150 conversions out of 1000 visitors
conversions_A = 120
visitors_A = 1000
conversions_B = 150
visitors_B = 1000

# Bayesian model
with pm.Model() as model:
    # Prior distributions for conversion rates
    p_A = pm.Beta('p_A', alpha=1, beta=1)  # Uniform prior
    p_B = pm.Beta('p_B', alpha=1, beta=1)  # Uniform prior
    
    # Likelihood
    obs_A = pm.Binomial('obs_A', n=visitors_A, p=p_A, observed=conversions_A)
    obs_B = pm.Binomial('obs_B', n=visitors_B, p=p_B, observed=conversions_B)
    
    # Derived quantities
    difference = pm.Deterministic('difference', p_B - p_A)
    relative_improvement = pm.Deterministic('relative_improvement', (p_B - p_A) / p_A)
    
    # Sample from the posterior
    trace = pm.sample(2000, tune=1000, return_inferencedata=True)

# Summarize results
summary = az.summary(trace, var_names=['p_A', 'p_B', 'difference', 'relative_improvement'])
print("Bayesian A/B Test Results:")
print(summary)

# Probability that B is better than A
prob_B_better = (trace.posterior['p_B'] > trace.posterior['p_A']).mean().values
print(f"Probability that B is better than A: {prob_B_better:.4f}")

# Expected improvement
expected_diff = trace.posterior['difference'].mean().values
print(f"Expected absolute improvement: {expected_diff:.4f}")
expected_rel_imp = trace.posterior['relative_improvement'].mean().values
print(f"Expected relative improvement: {expected_rel_imp:.4f} ({expected_rel_imp*100:.1f}%)")

# Visualize posterior distributions
az.plot_posterior(trace, var_names=['p_A', 'p_B'], figsize=(10, 6))
plt.tight_layout()
plt.show()

# Visualize difference
az.plot_posterior(trace, var_names=['difference'], figsize=(10, 6),
                 ref_val=0, color='blue')
plt.tight_layout()
plt.show()

# Visualize relative improvement
az.plot_posterior(trace, var_names=['relative_improvement'], figsize=(10, 6),
                 ref_val=0, color='blue')
plt.tight_layout()
plt.show()
```

> **Knowledge Check:** Compare and contrast the frequentist and Bayesian approaches to statistical inference. What are the advantages and limitations of each approach?

## Summary

In this chapter, we've covered the essential statistical methods for data analytics:

- Fundamentals of statistical thinking and data types
- Probability distributions and their applications
- Hypothesis testing framework and common statistical tests
- Regression analysis for modeling relationships
- Advanced statistical concepts like bootstrapping and Bayesian inference

These statistical tools provide the foundation for drawing meaningful conclusions from data, validating assumptions, and making data-driven decisions. Remember that statistics is not just about calculations but about understanding the underlying concepts and applying them appropriately to real-world problems.

## Additional Resources

### Books
- "Practical Statistics for Data Scientists" by Peter Bruce and Andrew Bruce
- "Statistical Inference" by George Casella and Roger L. Berger
- "Bayesian Data Analysis" by Andrew Gelman et al.

### Online Resources
- [Khan Academy: Statistics and Probability](https://www.khanacademy.org/math/statistics-probability)
- [Seeing Theory: A visual introduction to probability and statistics](https://seeing-theory.brown.edu/)
- [StatQuest with Josh Starmer (YouTube)](https://www.youtube.com/c/joshstarmer)

### Tools Documentation
- [SciPy Stats Documentation](https://docs.scipy.org/doc/scipy/reference/stats.html)
- [StatsModels Documentation](https://www.statsmodels.org/stable/index.html)
- [PyMC3 Documentation](https://docs.pymc.io/)

## Next Steps

In the next chapter, we'll explore Data Visualization and Storytelling, where we'll learn how to create compelling visual narratives that effectively communicate insights from your data analysis.

---

## Chapter Quiz

Test your understanding of statistical analysis concepts:

1. What is the difference between a population parameter and a sample statistic?
2. When would you use a t-test instead of a z-test?
3. What does a p-value of 0.03 tell you in the context of hypothesis testing?
4. In a multiple regression model, what does the R-squared value represent?
5. Why might you choose to use non-parametric tests instead of parametric tests?

Good luck!
