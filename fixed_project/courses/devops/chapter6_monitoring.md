# Chapter 6: Monitoring and Logging in DevOps

## Introduction to Monitoring and Logging

Monitoring and logging are essential components of a successful DevOps practice. They provide visibility into the health, performance, and behavior of your applications and infrastructure, enabling you to detect and resolve issues quickly, optimize performance, and make data-driven decisions.

### Why Monitoring and Logging Matter

In a modern DevOps environment, applications are often distributed across multiple servers, containers, and cloud services. This complexity makes it challenging to understand what's happening in your systems without proper monitoring and logging. Here's why monitoring and logging are crucial:

1. **Proactive Issue Detection**: Identify problems before they affect users.
2. **Faster Troubleshooting**: Quickly pinpoint the root cause of issues.
3. **Performance Optimization**: Identify bottlenecks and areas for improvement.
4. **Capacity Planning**: Make informed decisions about resource allocation.
5. **Security and Compliance**: Detect and respond to security threats and ensure compliance with regulations.
6. **Business Insights**: Gain insights into user behavior and business metrics.

### The Difference Between Monitoring and Logging

While monitoring and logging are related, they serve different purposes:

**Monitoring** focuses on collecting and analyzing metrics about the performance and health of your systems. It answers questions like:
- Is the system up or down?
- How much CPU, memory, and disk space is being used?
- How many requests per second is the application handling?
- What is the response time for API calls?

**Logging** involves collecting and storing detailed records of events that occur in your systems. It answers questions like:
- What happened at a specific point in time?
- What was the sequence of events that led to an error?
- Who performed a specific action?
- What data was processed during a transaction?

### The Monitoring and Logging Pipeline

A typical monitoring and logging pipeline consists of several components:

1. **Collection**: Gathering metrics and logs from various sources.
2. **Processing**: Transforming, filtering, and enriching the collected data.
3. **Storage**: Storing the processed data for later analysis.
4. **Analysis**: Analyzing the data to extract insights and detect anomalies.
5. **Visualization**: Presenting the data in a human-readable format.
6. **Alerting**: Notifying the appropriate people when issues are detected.

In this chapter, we'll explore popular tools and techniques for implementing each of these components in a DevOps environment.

## Monitoring with Prometheus and Grafana

Prometheus and Grafana are two of the most popular open-source tools for monitoring in the DevOps world. Prometheus is a monitoring system and time series database, while Grafana is a visualization and dashboarding tool that works well with Prometheus and other data sources.

### Prometheus Architecture

Prometheus follows a pull-based model, where it scrapes metrics from instrumented applications and services at regular intervals. The key components of Prometheus include:

1. **Prometheus Server**: The core component that scrapes and stores time series data.
2. **Exporters**: Programs that expose metrics from third-party systems in a format Prometheus can scrape.
3. **Pushgateway**: An intermediary service that allows ephemeral jobs to push their metrics to Prometheus.
4. **Alertmanager**: Handles alerts sent by the Prometheus server, including deduplicating, grouping, and routing them to the correct receiver.
5. **PromQL**: A powerful query language for selecting and aggregating time series data.

### Installing Prometheus

Let's walk through the process of installing Prometheus on a Linux server:

```bash
# Create a system user for Prometheus
sudo useradd --no-create-home --shell /bin/false prometheus

# Create directories for Prometheus
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus

# Download Prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.37.0/prometheus-2.37.0.linux-amd64.tar.gz
tar -xvf prometheus-2.37.0.linux-amd64.tar.gz

# Copy Prometheus binaries
sudo cp prometheus-2.37.0.linux-amd64/prometheus /usr/local/bin/
sudo cp prometheus-2.37.0.linux-amd64/promtool /usr/local/bin/
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

# Copy Prometheus configuration files
sudo cp -r prometheus-2.37.0.linux-amd64/consoles /etc/prometheus
sudo cp -r prometheus-2.37.0.linux-amd64/console_libraries /etc/prometheus
sudo cp prometheus-2.37.0.linux-amd64/prometheus.yml /etc/prometheus/
sudo chown -R prometheus:prometheus /etc/prometheus

# Create a systemd service for Prometheus
sudo tee /etc/systemd/system/prometheus.service > /dev/null << EOF
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start Prometheus
sudo systemctl daemon-reload
sudo systemctl enable prometheus
sudo systemctl start prometheus
sudo systemctl status prometheus
```

### Configuring Prometheus

The main Prometheus configuration file is `prometheus.yml`. Here's a basic configuration:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
    - targets: ['localhost:9090']
```

Let's add a new scrape configuration for a Node Exporter, which collects system metrics:

```yaml
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
    - targets: ['localhost:9090']
  
  - job_name: 'node_exporter'
    static_configs:
    - targets: ['localhost:9100']
```

### Installing and Configuring Node Exporter

Node Exporter is a Prometheus exporter for hardware and OS metrics:

```bash
# Create a system user for Node Exporter
sudo useradd --no-create-home --shell /bin/false node_exporter

# Download Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
tar -xvf node_exporter-1.3.1.linux-amd64.tar.gz

# Copy Node Exporter binary
sudo cp node_exporter-1.3.1.linux-amd64/node_exporter /usr/local/bin/
sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

# Create a systemd service for Node Exporter
sudo tee /etc/systemd/system/node_exporter.service > /dev/null << EOF
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start Node Exporter
sudo systemctl daemon-reload
sudo systemctl enable node_exporter
sudo systemctl start node_exporter
sudo systemctl status node_exporter
```

### PromQL Basics

PromQL (Prometheus Query Language) is a powerful language for querying Prometheus data. Here are some basic examples:

1. **Simple query**: Get the current value of a metric
   ```
   node_cpu_seconds_total
   ```

2. **Filter by label**: Get CPU usage for mode="user"
   ```
   node_cpu_seconds_total{mode="user"}
   ```

3. **Range vector**: Get CPU usage over the last 5 minutes
   ```
   node_cpu_seconds_total{mode="user"}[5m]
   ```

4. **Rate**: Calculate the per-second rate of increase
   ```
   rate(node_cpu_seconds_total{mode="user"}[5m])
   ```

5. **Aggregation**: Sum CPU usage across all CPUs
   ```
   sum by (instance) (rate(node_cpu_seconds_total{mode="user"}[5m]))
   ```

6. **CPU usage percentage**: Calculate CPU usage as a percentage
   ```
   100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
   ```

### Alerting with Prometheus

Prometheus supports alerting based on PromQL expressions. Let's set up a simple alert for high CPU usage:

1. Create an alert rules file:
   ```bash
   sudo tee /etc/prometheus/alert_rules.yml > /dev/null << EOF
   groups:
   - name: example
     rules:
     - alert: HighCPULoad
       expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
       for: 5m
       labels:
         severity: warning
       annotations:
         summary: High CPU load (instance {{ $labels.instance }})
         description: CPU load is > 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}
   EOF
   ```

2. Update the Prometheus configuration to include the rules file:
   ```yaml
   rule_files:
     - "alert_rules.yml"
   ```

3. Restart Prometheus:
   ```bash
   sudo systemctl restart prometheus
   ```

### Installing and Configuring Alertmanager

Alertmanager handles alerts sent by Prometheus:

```bash
# Create a system user for Alertmanager
sudo useradd --no-create-home --shell /bin/false alertmanager

# Create directories for Alertmanager
sudo mkdir /etc/alertmanager
sudo mkdir /var/lib/alertmanager
sudo chown alertmanager:alertmanager /var/lib/alertmanager

# Download Alertmanager
wget https://github.com/prometheus/alertmanager/releases/download/v0.24.0/alertmanager-0.24.0.linux-amd64.tar.gz
tar -xvf alertmanager-0.24.0.linux-amd64.tar.gz

# Copy Alertmanager binaries
sudo cp alertmanager-0.24.0.linux-amd64/alertmanager /usr/local/bin/
sudo cp alertmanager-0.24.0.linux-amd64/amtool /usr/local/bin/
sudo chown alertmanager:alertmanager /usr/local/bin/alertmanager
sudo chown alertmanager:alertmanager /usr/local/bin/amtool

# Copy Alertmanager configuration
sudo cp alertmanager-0.24.0.linux-amd64/alertmanager.yml /etc/alertmanager/
sudo chown alertmanager:alertmanager /etc/alertmanager/alertmanager.yml

# Create a systemd service for Alertmanager
sudo tee /etc/systemd/system/alertmanager.service > /dev/null << EOF
[Unit]
Description=Alertmanager
Wants=network-online.target
After=network-online.target

[Service]
User=alertmanager
Group=alertmanager
Type=simple
ExecStart=/usr/local/bin/alertmanager \
    --config.file /etc/alertmanager/alertmanager.yml \
    --storage.path /var/lib/alertmanager/

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start Alertmanager
sudo systemctl daemon-reload
sudo systemctl enable alertmanager
sudo systemctl start alertmanager
sudo systemctl status alertmanager
```

Configure Alertmanager to send alerts to Slack:

```yaml
global:
  slack_api_url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'

route:
  receiver: 'slack-notifications'
  group_by: ['alertname', 'instance']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h

receivers:
- name: 'slack-notifications'
  slack_configs:
  - channel: '#alerts'
    send_resolved: true
    title: "{{ range .Alerts }}{{ .Annotations.summary }}\n{{ end }}"
    text: "{{ range .Alerts }}{{ .Annotations.description }}\n{{ end }}"
```

Update the Prometheus configuration to use Alertmanager:

```yaml
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - localhost:9093
```

### Installing Grafana

Grafana is a visualization tool that works well with Prometheus:

```bash
# Install dependencies
sudo apt-get install -y apt-transport-https software-properties-common

# Add Grafana GPG key
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -

# Add Grafana repository
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"

# Update package lists
sudo apt-get update

# Install Grafana
sudo apt-get install -y grafana

# Enable and start Grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
sudo systemctl status grafana-server
```

### Configuring Grafana

1. Access Grafana at `http://<your-server-ip>:3000`
2. Log in with the default credentials (admin/admin)
3. Add Prometheus as a data source:
   - Click on "Configuration" (gear icon) > "Data Sources"
   - Click "Add data source"
   - Select "Prometheus"
   - Set the URL to `http://localhost:9090`
   - Click "Save & Test"

### Creating Grafana Dashboards

Grafana allows you to create dashboards to visualize your metrics. Here's how to create a basic dashboard:

1. Click on "+" > "Dashboard"
2. Click "Add new panel"
3. In the query editor, enter a PromQL query, e.g., `100 - (avg by (instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)`
4. Set the panel title to "CPU Usage"
5. Click "Apply"

You can also import pre-built dashboards from the Grafana dashboard repository:

1. Click on "+" > "Import"
2. Enter the dashboard ID (e.g., 1860 for Node Exporter Full)
3. Select your Prometheus data source
4. Click "Import"

## Logging with the ELK Stack

The ELK Stack (Elasticsearch, Logstash, Kibana) is a popular open-source logging solution. It allows you to collect, process, store, and visualize logs from various sources.

### ELK Stack Architecture

The ELK Stack consists of three main components:

1. **Elasticsearch**: A distributed, RESTful search and analytics engine that stores and indexes logs.
2. **Logstash**: A server-side data processing pipeline that ingests, transforms, and ships logs to Elasticsearch.
3. **Kibana**: A visualization layer that allows you to explore, visualize, and analyze logs stored in Elasticsearch.

In addition, Beats are lightweight data shippers that can send data from hundreds or thousands of machines to Logstash or Elasticsearch.

### Installing Elasticsearch

```bash
# Import the Elasticsearch GPG key
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -

# Add the Elasticsearch repository
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-7.x.list

# Update package lists
sudo apt-get update

# Install Elasticsearch
sudo apt-get install -y elasticsearch

# Configure Elasticsearch
sudo tee /etc/elasticsearch/elasticsearch.yml > /dev/null << EOF
cluster.name: elk-cluster
node.name: node-1
network.host: 0.0.0.0
http.port: 9200
discovery.type: single-node
EOF

# Enable and start Elasticsearch
sudo systemctl enable elasticsearch
sudo systemctl start elasticsearch
sudo systemctl status elasticsearch
```

### Installing Kibana

```bash
# Install Kibana
sudo apt-get install -y kibana

# Configure Kibana
sudo tee /etc/kibana/kibana.yml > /dev/null << EOF
server.port: 5601
server.host: "0.0.0.0"
elasticsearch.hosts: ["http://localhost:9200"]
EOF

# Enable and start Kibana
sudo systemctl enable kibana
sudo systemctl start kibana
sudo systemctl status kibana
```

### Installing Logstash

```bash
# Install Logstash
sudo apt-get install -y logstash

# Create a simple Logstash configuration
sudo tee /etc/logstash/conf.d/01-beats-input.conf > /dev/null << EOF
input {
  beats {
    port => 5044
  }
}
EOF

sudo tee /etc/logstash/conf.d/30-elasticsearch-output.conf > /dev/null << EOF
output {
  elasticsearch {
    hosts => ["localhost:9200"]
    manage_template => false
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
  }
}
EOF

# Enable and start Logstash
sudo systemctl enable logstash
sudo systemctl start logstash
sudo systemctl status logstash
```

### Installing Filebeat

Filebeat is a lightweight shipper for logs:

```bash
# Install Filebeat
sudo apt-get install -y filebeat

# Configure Filebeat to collect system logs
sudo tee /etc/filebeat/filebeat.yml > /dev/null << EOF
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/*.log
    - /var/log/syslog
    - /var/log/auth.log

output.logstash:
  hosts: ["localhost:5044"]
EOF

# Enable and start Filebeat
sudo systemctl enable filebeat
sudo systemctl start filebeat
sudo systemctl status filebeat
```

### Exploring Logs in Kibana

1. Access Kibana at `http://<your-server-ip>:5601`
2. Go to "Management" > "Stack Management" > "Index Patterns"
3. Create an index pattern for Filebeat logs (e.g., `filebeat-*`)
4. Go to "Discover" to explore your logs
5. Use the search bar to filter logs (e.g., `host.name: your-hostname`)
6. Create visualizations and dashboards to analyze your logs

### Log Processing with Logstash

Logstash can process and transform logs before sending them to Elasticsearch. Here's an example configuration that parses Apache access logs:

```
filter {
  if [fileset][name] == "access" {
    grok {
      match => { "message" => "%{COMBINEDAPACHELOG}" }
    }
    date {
      match => [ "timestamp", "dd/MMM/yyyy:HH:mm:ss Z" ]
      remove_field => [ "timestamp" ]
    }
    geoip {
      source => "clientip"
    }
    useragent {
      source => "agent"
      target => "user_agent"
    }
  }
}
```

### Creating Kibana Dashboards

Kibana allows you to create dashboards to visualize your logs. Here's how to create a basic dashboard:

1. Go to "Visualize" and create a visualization (e.g., a bar chart of log counts by host)
2. Save the visualization
3. Go to "Dashboard" and click "Create new dashboard"
4. Add your saved visualization to the dashboard
5. Save the dashboard

## Centralized Logging with Fluentd

Fluentd is an open-source data collector that lets you unify data collection and consumption for better use and understanding of data. It's often used as an alternative to Logstash in the EFK (Elasticsearch, Fluentd, Kibana) stack.

### Fluentd Architecture

Fluentd has a flexible plugin-based architecture:

1. **Input Plugins**: Collect logs from various sources.
2. **Parser Plugins**: Parse logs into structured data.
3. **Filter Plugins**: Modify, filter, or process logs.
4. **Output Plugins**: Send logs to various destinations.
5. **Buffer Plugins**: Buffer logs before sending them to outputs.
6. **Formatter Plugins**: Format logs before sending them to outputs.

### Installing Fluentd

```bash
# Install dependencies
sudo apt-get install -y build-essential ruby-dev

# Install Fluentd using gem
sudo gem install fluentd

# Initialize a Fluentd configuration
sudo fluentd --setup /etc/fluentd

# Create a systemd service for Fluentd
sudo tee /etc/systemd/system/fluentd.service > /dev/null << EOF
[Unit]
Description=Fluentd
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/fluentd -c /etc/fluentd/fluent.conf
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start Fluentd
sudo systemctl daemon-reload
sudo systemctl enable fluentd
sudo systemctl start fluentd
sudo systemctl status fluentd
```

### Configuring Fluentd

Here's a basic Fluentd configuration that collects system logs and sends them to Elasticsearch:

```xml
<source>
  @type tail
  path /var/log/syslog
  pos_file /var/log/td-agent/syslog.pos
  tag system.syslog
  <parse>
    @type syslog
  </parse>
</source>

<match system.**>
  @type elasticsearch
  host localhost
  port 9200
  logstash_format true
  logstash_prefix fluentd
  logstash_dateformat %Y%m%d
  include_tag_key true
  type_name access_log
  tag_key @log_name
  flush_interval 1s
</match>
```

### Collecting Docker Logs with Fluentd

Fluentd can collect logs from Docker containers:

```xml
<source>
  @type forward
  port 24224
  bind 0.0.0.0
</source>

<match docker.**>
  @type elasticsearch
  host localhost
  port 9200
  logstash_format true
  logstash_prefix docker
  logstash_dateformat %Y%m%d
  include_tag_key true
  type_name docker_log
  tag_key @log_name
  flush_interval 1s
</match>
```

Configure Docker to use the Fluentd logging driver:

```json
{
  "log-driver": "fluentd",
  "log-opts": {
    "fluentd-address": "localhost:24224",
    "tag": "docker.{{.Name}}"
  }
}
```

## Application Performance Monitoring (APM)

Application Performance Monitoring (APM) tools provide insights into the performance and behavior of your applications. They help you identify bottlenecks, errors, and other issues that affect user experience.

### What is APM?

APM tools monitor various aspects of application performance, including:

1. **Response Time**: How long it takes for the application to respond to requests.
2. **Throughput**: How many requests the application can handle.
3. **Error Rate**: How often the application encounters errors.
4. **Resource Usage**: How much CPU, memory, and other resources the application uses.
5. **Database Performance**: How database queries affect application performance.
6. **External Service Calls**: How calls to external services affect application performance.

### Popular APM Tools

There are many APM tools available, both open-source and commercial:

1. **Elastic APM**: Part of the Elastic Stack, integrates well with Elasticsearch and Kibana.
2. **Jaeger**: Open-source, end-to-end distributed tracing system.
3. **Zipkin**: Open-source distributed tracing system.
4. **New Relic**: Commercial APM solution with a comprehensive feature set.
5. **Datadog APM**: Commercial APM solution that integrates with Datadog's monitoring platform.
6. **Dynatrace**: Commercial APM solution with AI-powered insights.

### Installing Elastic APM

Let's set up Elastic APM, which integrates well with the ELK Stack:

```bash
# Download and install the APM Server
wget https://artifacts.elastic.co/downloads/apm-server/apm-server-7.15.0-amd64.deb
sudo dpkg -i apm-server-7.15.0-amd64.deb

# Configure the APM Server
sudo tee /etc/apm-server/apm-server.yml > /dev/null << EOF
apm-server:
  host: "0.0.0.0:8200"

output.elasticsearch:
  hosts: ["localhost:9200"]
EOF

# Enable and start the APM Server
sudo systemctl enable apm-server
sudo systemctl start apm-server
sudo systemctl status apm-server
```

### Instrumenting Applications for APM

To use APM, you need to instrument your applications. Here's an example of instrumenting a Node.js application with the Elastic APM agent:

```javascript
// Install the agent: npm install elastic-apm-node

// Add this to the top of your main file
const apm = require('elastic-apm-node').start({
  serviceName: 'my-service',
  serverUrl: 'http://localhost:8200',
  environment: 'production'
});

// The rest of your application code
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

### Viewing APM Data in Kibana

1. Access Kibana at `http://<your-server-ip>:5601`
2. Go to "APM" in the left sidebar
3. You should see your instrumented services
4. Click on a service to view detailed performance data

## Distributed Tracing

Distributed tracing is a method used to profile and monitor applications, especially those built using a microservices architecture. It helps pinpoint where failures occur and what causes poor performance.

### What is Distributed Tracing?

Distributed tracing tracks the flow of requests through a distributed system, showing the relationships between services and identifying performance bottlenecks.

Key concepts in distributed tracing:

1. **Trace**: A record of a request as it flows through a distributed system.
2. **Span**: A named, timed operation representing a piece of the workflow.
3. **Context Propagation**: The process of passing trace information between services.

### OpenTelemetry

OpenTelemetry is an open-source observability framework that provides a single set of APIs, libraries, agents, and instrumentation to capture distributed traces and metrics from your application.

#### Installing the OpenTelemetry Collector

```bash
# Download the OpenTelemetry Collector
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.47.0/otelcol_0.47.0_linux_amd64.tar.gz
tar -xvf otelcol_0.47.0_linux_amd64.tar.gz

# Create a configuration file
sudo mkdir -p /etc/otelcol
sudo tee /etc/otelcol/config.yaml > /dev/null << EOF
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 1s
    send_batch_size: 1024

exporters:
  logging:
    loglevel: debug
  jaeger:
    endpoint: localhost:14250
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [logging, jaeger]
EOF

# Create a systemd service for the OpenTelemetry Collector
sudo tee /etc/systemd/system/otelcol.service > /dev/null << EOF
[Unit]
Description=OpenTelemetry Collector
After=network.target

[Service]
ExecStart=/path/to/otelcol --config=/etc/otelcol/config.yaml
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start the OpenTelemetry Collector
sudo systemctl daemon-reload
sudo systemctl enable otelcol
sudo systemctl start otelcol
sudo systemctl status otelcol
```

#### Installing Jaeger

Jaeger is an open-source distributed tracing system:

```bash
# Download and install Jaeger
wget -O jaeger-1.28.0-linux-amd64.tar.gz https://github.com/jaegertracing/jaeger/releases/download/v1.28.0/jaeger-1.28.0-linux-amd64.tar.gz
tar -xvf jaeger-1.28.0-linux-amd64.tar.gz
sudo cp jaeger-1.28.0-linux-amd64/jaeger-all-in-one /usr/local/bin/

# Create a systemd service for Jaeger
sudo tee /etc/systemd/system/jaeger.service > /dev/null << EOF
[Unit]
Description=Jaeger
After=network.target

[Service]
ExecStart=/usr/local/bin/jaeger-all-in-one
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd, enable and start Jaeger
sudo systemctl daemon-reload
sudo systemctl enable jaeger
sudo systemctl start jaeger
sudo systemctl status jaeger
```

#### Instrumenting Applications for Distributed Tracing

Here's an example of instrumenting a Node.js application with OpenTelemetry:

```javascript
// Install the required packages:
// npm install @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http

// tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces',
  }),
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start();

// app.js
require('./tracing');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

#### Viewing Traces in Jaeger

1. Access the Jaeger UI at `http://<your-server-ip>:16686`
2. Select your service from the dropdown
3. Click "Find Traces" to view traces
4. Click on a trace to view detailed information

## Monitoring Kubernetes with Prometheus Operator

Monitoring a Kubernetes cluster requires a different approach than monitoring traditional infrastructure. The Prometheus Operator provides Kubernetes-native deployment and management of Prometheus and related monitoring components.

### Installing the Prometheus Operator

The easiest way to install the Prometheus Operator is using Helm:

```bash
# Add the Prometheus community Helm repository
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# Update Helm repositories
helm repo update

# Install the Prometheus Operator
helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

### Monitoring Kubernetes Resources

The Prometheus Operator automatically monitors various Kubernetes resources:

1. **Nodes**: CPU, memory, disk, and network usage
2. **Pods**: CPU, memory, and network usage
3. **Containers**: CPU, memory, and network usage
4. **API Server**: Request latency, request count, and error rate
5. **etcd**: Disk operations, network operations, and leader changes
6. **CoreDNS**: Query latency, query count, and error rate

### Custom Resource Definitions (CRDs)

The Prometheus Operator introduces several Custom Resource Definitions (CRDs):

1. **Prometheus**: Defines a Prometheus deployment
2. **ServiceMonitor**: Defines how to monitor a set of services
3. **PodMonitor**: Defines how to monitor a set of pods
4. **PrometheusRule**: Defines alerting rules
5. **AlertmanagerConfig**: Defines Alertmanager configuration

### Creating a ServiceMonitor

To monitor a service, you need to create a ServiceMonitor:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: example-app
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: example-app
  endpoints:
  - port: web
    interval: 15s
```

### Creating a PrometheusRule

To define alerting rules, you need to create a PrometheusRule:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: example-app-alerts
  namespace: monitoring
  labels:
    prometheus: k8s
    role: alert-rules
spec:
  groups:
  - name: example-app.rules
    rules:
    - alert: ExampleAppDown
      expr: up{job="example-app"} == 0
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "Example app is down"
        description: "Example app has been down for more than 5 minutes."
```

### Accessing Prometheus and Grafana

By default, the Prometheus Operator doesn't expose Prometheus and Grafana outside the cluster. You can use port forwarding to access them:

```bash
# Port forward Prometheus
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090

# Port forward Grafana
kubectl port-forward -n monitoring svc/prometheus-grafana 3000:80
```

Then access Prometheus at `http://localhost:9090` and Grafana at `http://localhost:3000`.

## Hands-On Exercise: Setting Up a Complete Monitoring and Logging Stack

In this exercise, we'll set up a complete monitoring and logging stack for a simple web application. We'll use Prometheus and Grafana for monitoring, and the ELK Stack for logging.

### Prerequisites

- A Linux server with at least 4GB RAM and 20GB disk space
- Docker and Docker Compose installed
- Basic knowledge of Docker and Docker Compose

### Step 1: Create the Project Structure

```bash
mkdir -p monitoring-logging-demo/{app,prometheus,grafana,elasticsearch,logstash,kibana,filebeat}
cd monitoring-logging-demo
```

### Step 2: Create a Simple Web Application

Create a simple Node.js web application that exposes Prometheus metrics:

```bash
# Create the application directory
mkdir -p app/src

# Create package.json
cat > app/package.json << EOF
{
  "name": "monitoring-demo",
  "version": "1.0.0",
  "description": "A simple web application for monitoring and logging demo",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "prom-client": "^14.0.1",
    "winston": "^3.3.3"
  }
}
EOF

# Create the application code
cat > app/src/index.js << EOF
const express = require('express');
const promClient = require('prom-client');
const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'monitoring-demo' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '/var/log/app.log' })
  ]
});

// Create an Express app
const app = express();
const port = 3000;

// Create a Prometheus registry
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Create a counter for HTTP requests
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});
register.registerMetric(httpRequestsTotal);

// Create a histogram for HTTP request duration
const httpRequestDurationMs = new promClient.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in milliseconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [10, 50, 100, 500, 1000, 5000]
});
register.registerMetric(httpRequestDurationMs);

// Middleware to measure request duration
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const route = req.route ? req.route.path : req.path;
    const method = req.method;
    const status = res.statusCode;
    
    httpRequestsTotal.inc({ method, route, status });
    httpRequestDurationMs.observe({ method, route, status }, duration);
    
    logger.info('HTTP request', {
      method,
      route,
      status,
      duration,
      userAgent: req.get('user-agent')
    });
  });
  
  next();
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/error', (req, res) => {
  logger.error('This is an error!');
  res.status(500).send('Something went wrong!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start the server
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
EOF

# Create a Dockerfile for the application
cat > app/Dockerfile << EOF
FROM node:14-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY src/ src/

RUN mkdir -p /var/log
RUN touch /var/log/app.log
RUN chmod 666 /var/log/app.log

EXPOSE 3000

CMD ["npm", "start"]
EOF
```

### Step 3: Configure Prometheus

```bash
# Create prometheus.yml
cat > prometheus/prometheus.yml << EOF
global:
  scrape_interval: 15s
  evaluation_interval: 15s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
  
  - job_name: 'app'
    static_configs:
      - targets: ['app:3000']
EOF
```

### Step 4: Configure Grafana

```bash
# Create a datasource configuration
mkdir -p grafana/provisioning/datasources
cat > grafana/provisioning/datasources/datasource.yml << EOF
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
EOF

# Create a dashboard configuration
mkdir -p grafana/provisioning/dashboards
cat > grafana/provisioning/dashboards/dashboard.yml << EOF
apiVersion: 1

providers:
  - name: 'default'
    orgId: 1
    folder: ''
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    options:
      path: /var/lib/grafana/dashboards
EOF

# Create a dashboard
mkdir -p grafana/dashboards
cat > grafana/dashboards/app-dashboard.json << EOF
{
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": "-- Grafana --",
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "type": "dashboard"
      }
    ]
  },
  "editable": true,
  "gnetId": null,
  "graphTooltip": 0,
  "id": 1,
  "links": [],
  "panels": [
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "Prometheus",
      "fieldConfig": {
        "defaults": {
          "custom": {}
        },
        "overrides": []
      },
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 0
      },
      "hiddenSeries": false,
      "id": 2,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "nullPointMode": "null",
      "options": {
        "alertThreshold": true
      },
      "percentage": false,
      "pluginVersion": "7.3.7",
      "pointradius": 2,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "expr": "sum(rate(http_requests_total[1m])) by (route)",
          "interval": "",
          "legendFormat": "{{route}}",
          "refId": "A"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "HTTP Requests per Second",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "aliasColors": {},
      "bars": false,
      "dashLength": 10,
      "dashes": false,
      "datasource": "Prometheus",
      "fieldConfig": {
        "defaults": {
          "custom": {}
        },
        "overrides": []
      },
      "fill": 1,
      "fillGradient": 0,
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 12,
        "y": 0
      },
      "hiddenSeries": false,
      "id": 4,
      "legend": {
        "avg": false,
        "current": false,
        "max": false,
        "min": false,
        "show": true,
        "total": false,
        "values": false
      },
      "lines": true,
      "linewidth": 1,
      "nullPointMode": "null",
      "options": {
        "alertThreshold": true
      },
      "percentage": false,
      "pluginVersion": "7.3.7",
      "pointradius": 2,
      "points": false,
      "renderer": "flot",
      "seriesOverrides": [],
      "spaceLength": 10,
      "stack": false,
      "steppedLine": false,
      "targets": [
        {
          "expr": "histogram_quantile(0.95, sum(rate(http_request_duration_ms_bucket[1m])) by (le, route))",
          "interval": "",
          "legendFormat": "{{route}}",
          "refId": "A"
        }
      ],
      "thresholds": [],
      "timeFrom": null,
      "timeRegions": [],
      "timeShift": null,
      "title": "HTTP Request Duration (95th percentile)",
      "tooltip": {
        "shared": true,
        "sort": 0,
        "value_type": "individual"
      },
      "type": "graph",
      "xaxis": {
        "buckets": null,
        "mode": "time",
        "name": null,
        "show": true,
        "values": []
      },
      "yaxes": [
        {
          "format": "ms",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        },
        {
          "format": "short",
          "label": null,
          "logBase": 1,
          "max": null,
          "min": null,
          "show": true
        }
      ],
      "yaxis": {
        "align": false,
        "alignLevel": null
      }
    },
    {
      "datasource": "Prometheus",
      "fieldConfig": {
        "defaults": {
          "custom": {},
          "mappings": [],
          "thresholds": {
            "mode": "absolute",
            "steps": [
              {
                "color": "green",
                "value": null
              },
              {
                "color": "red",
                "value": 1
              }
            ]
          }
        },
        "overrides": []
      },
      "gridPos": {
        "h": 9,
        "w": 12,
        "x": 0,
        "y": 9
      },
      "id": 6,
      "options": {
        "colorMode": "value",
        "graphMode": "area",
        "justifyMode": "auto",
        "orientation": "auto",
        "reduceOptions": {
          "calcs": [
            "lastNotNull"
          ],
          "fields": "",
          "values": false
        },
        "textMode": "auto"
      },
      "pluginVersion": "7.3.7",
      "targets": [
        {
          "expr": "sum(http_requests_total{status=~\"5..\"})",
          "interval": "",
          "legendFormat": "",
          "refId": "A"
        }
      ],
      "timeFrom": null,
      "timeShift": null,
      "title": "Total Error Responses",
      "type": "stat"
    }
  ],
  "schemaVersion": 26,
  "style": "dark",
  "tags": [],
  "templating": {
    "list": []
  },
  "time": {
    "from": "now-6h",
    "to": "now"
  },
  "timepicker": {},
  "timezone": "",
  "title": "App Dashboard",
  "uid": "app-dashboard",
  "version": 1
}
EOF
```

### Step 5: Configure Elasticsearch, Logstash, Kibana, and Filebeat

```bash
# Create Logstash configuration
cat > logstash/pipeline/logstash.conf << EOF
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][log_type] == "app" {
    json {
      source => "message"
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "%{[@metadata][beat]}-%{[@metadata][version]}-%{+YYYY.MM.dd}"
  }
}
EOF

# Create Filebeat configuration
cat > filebeat/filebeat.yml << EOF
filebeat.inputs:
- type: log
  enabled: true
  paths:
    - /var/log/app.log
  fields:
    log_type: app
  fields_under_root: false
  json.keys_under_root: true

output.logstash:
  hosts: ["logstash:5044"]
EOF
```

### Step 6: Create Docker Compose Configuration

```bash
cat > docker-compose.yml << EOF
version: '3'

services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    volumes:
      - app_logs:/var/log
    networks:
      - monitoring
      - logging

  prometheus:
    image: prom/prometheus:v2.30.3
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/usr/share/prometheus/console_libraries'
      - '--web.console.templates=/usr/share/prometheus/consoles'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:8.2.2
    ports:
      - "3001:3000"
    volumes:
      - ./grafana/provisioning:/etc/grafana/provisioning
      - ./grafana/dashboards:/var/lib/grafana/dashboards
      - grafana_data:/var/lib/grafana
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    networks:
      - monitoring

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    ports:
      - "9200:9200"
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
    networks:
      - logging

  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.0
    ports:
      - "5044:5044"
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    environment:
      - "LS_JAVA_OPTS=-Xms256m -Xmx256m"
    depends_on:
      - elasticsearch
    networks:
      - logging

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch
    networks:
      - logging

  filebeat:
    image: docker.elastic.co/beats/filebeat:7.15.0
    volumes:
      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
      - app_logs:/var/log:ro
    depends_on:
      - logstash
    networks:
      - logging

networks:
  monitoring:
  logging:

volumes:
  app_logs:
  prometheus_data:
  grafana_data:
  elasticsearch_data:
EOF
```

### Step 7: Start the Stack

```bash
docker-compose up -d
```

### Step 8: Generate Some Traffic

```bash
# Generate normal traffic
for i in {1..100}; do curl http://localhost:3000/; sleep 0.1; done

# Generate some errors
for i in {1..10}; do curl http://localhost:3000/error; sleep 0.1; done
```

### Step 9: Access the Monitoring and Logging Interfaces

- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (username: admin, password: admin)
- Kibana: http://localhost:5601

### Step 10: Explore the Monitoring and Logging Data

1. In Prometheus, try some queries:
   - `http_requests_total`: Total number of HTTP requests
   - `rate(http_requests_total[1m])`: HTTP requests per second over the last minute
   - `histogram_quantile(0.95, sum(rate(http_request_duration_ms_bucket[1m])) by (le))`: 95th percentile of HTTP request duration

2. In Grafana, explore the pre-configured dashboard:
   - Go to "Dashboards" > "Manage" > "App Dashboard"
   - Observe the HTTP request rate, request duration, and error count

3. In Kibana, set up an index pattern and explore the logs:
   - Go to "Management" > "Stack Management" > "Index Patterns"
   - Create an index pattern for `filebeat-*`
   - Go to "Discover" to explore the logs
   - Filter for error logs: `level: error`

## Summary

In this chapter, we've explored monitoring and logging in DevOps. We've learned about the importance of monitoring and logging, the different types of monitoring and logging tools available, and how to set up a complete monitoring and logging stack.

Key takeaways from this chapter:

1. Monitoring and logging are essential components of a successful DevOps practice, providing visibility into the health, performance, and behavior of your applications and infrastructure.

2. Prometheus and Grafana are powerful tools for monitoring, allowing you to collect, store, query, and visualize metrics from your applications and infrastructure.

3. The ELK Stack (Elasticsearch, Logstash, Kibana) and Fluentd provide robust solutions for centralized logging, enabling you to collect, process, store, and analyze logs from various sources.

4. Application Performance Monitoring (APM) and distributed tracing tools like Elastic APM, Jaeger, and OpenTelemetry provide insights into the performance and behavior of your applications, helping you identify bottlenecks and errors.

5. For Kubernetes environments, the Prometheus Operator provides Kubernetes-native deployment and management of Prometheus and related monitoring components.

In the next chapter, we'll explore DevSecOps, focusing on how to integrate security into your DevOps practices.

## Additional Resources

- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
- [Grafana Documentation](https://grafana.com/docs/grafana/latest/)
- [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
- [Logstash Documentation](https://www.elastic.co/guide/en/logstash/current/index.html)
- [Kibana Documentation](https://www.elastic.co/guide/en/kibana/current/index.html)
- [Fluentd Documentation](https://docs.fluentd.org/)
- [OpenTelemetry Documentation](https://opentelemetry.io/docs/)
- [Jaeger Documentation](https://www.jaegertracing.io/docs/1.28/)
- [Prometheus Operator Documentation](https://github.com/prometheus-operator/prometheus-operator/blob/main/Documentation/user-guides/getting-started.md)
