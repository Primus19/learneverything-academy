# Chapter 2: Security Monitoring Fundamentals

## Overview

Effective security monitoring forms the backbone of any Security Operations Center (SOC). This chapter explores the fundamental concepts, methodologies, and technologies that enable organizations to detect, analyze, and respond to security threats through comprehensive monitoring. We'll cover everything from basic log collection to advanced correlation techniques that help security teams identify potential threats in their environment.

## Security Event Monitoring Principles

### The Monitoring Lifecycle

1. **Collection**
   - Gathering security-relevant data from various sources
   - Ensuring comprehensive visibility across the environment
   - Establishing reliable data pipelines

2. **Normalization**
   - Converting disparate data formats into a standardized structure
   - Enriching raw data with context and metadata
   - Preparing data for efficient analysis

3. **Analysis**
   - Examining data for indicators of compromise or suspicious activity
   - Applying detection rules and analytics
   - Correlating events across multiple sources

4. **Alerting**
   - Generating notifications for security events that require attention
   - Prioritizing alerts based on severity and context
   - Routing alerts to appropriate response teams

5. **Investigation**
   - Performing deeper analysis of triggered alerts
   - Gathering additional context and evidence
   - Determining the nature and scope of potential incidents

6. **Response**
   - Taking action to address confirmed security incidents
   - Implementing containment and remediation measures
   - Documenting findings and actions taken

7. **Improvement**
   - Refining detection capabilities based on lessons learned
   - Tuning rules to reduce false positives
   - Expanding monitoring coverage to address gaps

![Security Monitoring Lifecycle](/images/courses/soc/security_monitoring_lifecycle.png)

### Monitoring Strategy Development

1. **Risk-Based Approach**
   - Align monitoring with organizational risk assessment
   - Focus resources on protecting critical assets
   - Prioritize detection capabilities for highest-risk threats

2. **Defense-in-Depth Monitoring**
   - Implement monitoring at multiple layers (network, endpoint, application)
   - Create overlapping detection capabilities
   - Ensure no single monitoring failure creates blind spots

3. **Threat-Informed Defense**
   - Base monitoring on known threat actor tactics and techniques
   - Map detection capabilities to frameworks like MITRE ATT&CK
   - Continuously update monitoring based on emerging threats

4. **Compliance-Driven Requirements**
   - Incorporate regulatory monitoring mandates
   - Ensure audit trail for compliance verification
   - Balance compliance needs with security effectiveness

### Visibility Requirements

1. **Network Visibility**
   - North-south traffic (ingress/egress)
   - East-west traffic (lateral movement)
   - Encrypted traffic inspection
   - DNS query monitoring
   - Network flow analysis

2. **Endpoint Visibility**
   - Process execution
   - File system changes
   - Registry modifications (Windows)
   - Memory analysis
   - User behavior

3. **Application Visibility**
   - Authentication events
   - Authorization decisions
   - Data access patterns
   - Configuration changes
   - API usage

4. **Cloud Visibility**
   - Control plane operations
   - Resource provisioning
   - Identity and access management
   - Serverless function execution
   - Storage access patterns

5. **Identity Visibility**
   - Authentication attempts
   - Privilege changes
   - Account lifecycle events
   - Session activities
   - Federation and SSO events

## Log Collection and Management

### Log Sources and Types

1. **Operating System Logs**
   - **Windows Event Logs**
     - Security events (Event ID 4624 for successful logins, 4625 for failed logins)
     - System events
     - Application events
     - PowerShell logs
     - Sysmon logs (if deployed)
   
   - **Linux/Unix Logs**
     - Authentication logs (/var/log/auth.log, /var/log/secure)
     - System logs (/var/log/syslog, /var/log/messages)
     - Application logs
     - Audit logs (auditd)
     - Kernel logs

2. **Network Device Logs**
   - Firewall logs
   - Router and switch logs
   - Load balancer logs
   - VPN concentrator logs
   - Wireless access point logs
   - Network IDS/IPS alerts

3. **Application Logs**
   - Web server logs (Apache, Nginx, IIS)
   - Database logs
   - Email server logs
   - Custom application logs
   - API gateway logs
   - Content management system logs

4. **Security Tool Logs**
   - Endpoint protection/antivirus
   - Data Loss Prevention (DLP)
   - Web proxy logs
   - Email security gateway logs
   - Multi-factor authentication logs
   - Vulnerability scanner results

5. **Cloud Service Logs**
   - AWS CloudTrail
   - Azure Activity Logs
   - Google Cloud Audit Logs
   - Office 365 Audit Logs
   - Salesforce Event Monitoring
   - Cloud security service logs

### Log Collection Methods

1. **Agent-Based Collection**
   - **Advantages**:
     - Reliable delivery
     - Local filtering and processing
     - Support for offline operation
     - Enhanced metadata collection
   
   - **Disadvantages**:
     - Deployment and maintenance overhead
     - Resource consumption on hosts
     - Potential compatibility issues
     - Agent security concerns

   - **Common Agent Technologies**:
     - Beats (Filebeat, Winlogbeat)
     - Fluentd/Fluent Bit
     - NXLog
     - Syslog agents
     - Vendor-specific agents

2. **Agentless Collection**
   - **Advantages**:
     - No host-based footprint
     - Easier deployment at scale
     - No impact on endpoint performance
     - Simpler management
   
   - **Disadvantages**:
     - Potential for data loss
     - Limited offline capabilities
     - Reduced context in some cases
     - Network dependency

   - **Common Agentless Methods**:
     - Syslog forwarding
     - API-based collection
     - Remote Windows Event Collection
     - SNMP traps
     - Database queries

3. **Hybrid Approaches**
   - Lightweight forwarders with central collectors
   - Event forwarding with local caching
   - Selective agent deployment based on criticality
   - Cloud-managed agents with minimal footprint

### Log Transport Considerations

1. **Transport Protocols**
   - **TCP-based**
     - Reliable delivery with acknowledgments
     - Flow control to prevent overwhelming receivers
     - Higher overhead and latency
   
   - **UDP-based**
     - Lower overhead and latency
     - No delivery guarantees
     - Better performance at high volumes
   
   - **HTTP/HTTPS**
     - Firewall-friendly
     - Built-in encryption with HTTPS
     - RESTful API integration
     - Potential for batching

2. **Security Requirements**
   - Transport encryption (TLS/SSL)
   - Authentication between endpoints
   - Message integrity verification
   - Non-repudiation mechanisms
   - Certificate management

3. **Reliability Mechanisms**
   - Local spooling/buffering
   - Acknowledgment and retry logic
   - Failover configurations
   - Load balancing
   - Circuit breakers for backpressure

### Log Storage and Retention

1. **Storage Considerations**
   - Volume estimation and capacity planning
   - Hot vs. cold storage tiering
   - Compression and archiving strategies
   - Indexing for efficient searching
   - Backup and disaster recovery

2. **Retention Policies**
   - Regulatory requirements (e.g., PCI DSS, HIPAA)
   - Legal and compliance mandates
   - Incident investigation needs
   - Storage cost optimization
   - Data lifecycle management

3. **Storage Technologies**
   - Elasticsearch
   - Relational databases
   - NoSQL databases
   - Object storage (S3, Blob Storage)
   - Hadoop/HDFS for big data
   - Time-series databases

### Log Normalization and Parsing

1. **Normalization Process**
   - Field extraction and mapping
   - Timestamp standardization
   - IP address and hostname normalization
   - User identity normalization
   - Event type classification

2. **Common Parsing Techniques**
   - Regular expressions
   - Grok patterns
   - JSON/XML parsing
   - CSV/delimited text processing
   - Custom parsers for proprietary formats

3. **Enrichment Strategies**
   - IP geolocation
   - Threat intelligence lookups
   - Asset information
   - User context
   - Business context

![Log Collection Architecture](/images/courses/soc/log_collection_architecture.png)

## SIEM Implementation and Configuration

### SIEM Architecture Components

1. **Collection Layer**
   - Log receivers and forwarders
   - API connectors
   - Native integrations
   - Custom data inputs

2. **Processing Layer**
   - Parsing and normalization engines
   - Correlation engines
   - Analytics processors
   - Machine learning components

3. **Storage Layer**
   - Hot storage for recent data
   - Warm storage for intermediate data
   - Cold storage for archived data
   - Indexing mechanisms

4. **Analysis Layer**
   - Search capabilities
   - Visualization tools
   - Reporting engines
   - Dashboard frameworks

5. **Response Layer**
   - Alert management
   - Case management
   - Automation interfaces
   - Integration with SOAR platforms

### SIEM Selection Criteria

1. **Technical Considerations**
   - Scalability and performance
   - Integration capabilities
   - Search and query performance
   - Analytics capabilities
   - Deployment options (on-premises, cloud, hybrid)

2. **Operational Considerations**
   - Ease of use and management
   - Training requirements
   - Vendor support quality
   - Community resources
   - Total cost of ownership

3. **Security Considerations**
   - Built-in content and use cases
   - Threat intelligence integration
   - Compliance reporting capabilities
   - Detection engineering flexibility
   - Security of the SIEM itself

### SIEM Deployment Planning

1. **Architecture Design**
   - Sizing and capacity planning
   - High availability configuration
   - Disaster recovery planning
   - Network placement and access
   - Security hardening

2. **Implementation Phases**
   - Proof of concept
   - Pilot deployment
   - Phased rollout by log source type
   - Validation and testing
   - Production transition

3. **Resource Requirements**
   - Hardware/cloud resources
   - Software licensing
   - Implementation team
   - Operational staff
   - Training and knowledge transfer

### SIEM Configuration Best Practices

1. **Initial Setup**
   - Secure installation and hardening
   - Role-based access control
   - Authentication integration (LDAP/AD, SSO)
   - Backup and recovery configuration
   - Performance tuning

2. **Data Source Onboarding**
   - Source prioritization based on value
   - Parser validation and testing
   - Field mapping standardization
   - Data quality verification
   - Volume baseline establishment

3. **Content Development**
   - Use case implementation
   - Correlation rule creation
   - Dashboard and report development
   - Alert configuration
   - Playbook integration

4. **Ongoing Management**
   - Performance monitoring
   - Capacity management
   - Version upgrades
   - Content updates
   - Configuration change management

### Common SIEM Challenges and Solutions

1. **Data Volume Challenges**
   - Implement selective logging
   - Use field filtering at source
   - Deploy aggregation points
   - Implement tiered storage
   - Consider cost-based retention policies

2. **Alert Fatigue**
   - Implement alert tuning processes
   - Use risk-based prioritization
   - Develop aggregation rules
   - Implement automated first-level triage
   - Establish alert quality metrics

3. **Performance Issues**
   - Optimize search queries
   - Implement proper indexing
   - Scale horizontally for processing
   - Use summary indexes for dashboards
   - Schedule resource-intensive reports

4. **Maintenance Overhead**
   - Automate routine tasks
   - Implement configuration as code
   - Develop testing frameworks for content
   - Create documentation standards
   - Establish change management processes

![SIEM Architecture Diagram](/images/courses/soc/siem_architecture.png)

## Creating Effective Correlation Rules

### Correlation Rule Fundamentals

1. **Rule Components**
   - Trigger conditions
   - Logical operators
   - Time windows
   - Thresholds
   - Enrichment lookups
   - Response actions

2. **Rule Types**
   - **Simple Pattern Matching**
     - Single event detection
     - Specific field values or patterns
     - Known bad indicators
   
   - **Threshold-Based**
     - Volume anomalies
     - Rate of occurrence
     - Count of events over time
   
   - **Chained Events**
     - Sequence detection
     - Related events across sources
     - Attack progression patterns
   
   - **Statistical**
     - Deviation from baseline
     - Rare event detection
     - Outlier identification

3. **Rule Development Process**
   - Threat modeling and use case definition
   - Data source identification
   - Rule logic design
   - Testing with sample data
   - Tuning and optimization
   - Documentation and knowledge transfer

### Correlation Use Cases

1. **Authentication-Based Detection**
   - Brute force attempts
   - Password spraying
   - Credential stuffing
   - Impossible travel scenarios
   - Off-hours authentication
   - Authentication from unusual locations

2. **Privilege Escalation Detection**
   - Unexpected privilege changes
   - Sensitive group modifications
   - Unusual sudo/UAC usage
   - Token manipulation
   - Account permission changes

3. **Malware and Persistence Detection**
   - Known malware signatures
   - Suspicious process relationships
   - Registry/startup modifications
   - Scheduled task creation
   - Service installation
   - Boot record modifications

4. **Data Exfiltration Detection**
   - Unusual outbound connections
   - Large file transfers
   - Abnormal database queries
   - Email attachment anomalies
   - Cloud storage access patterns
   - Encrypted channel detection

5. **Insider Threat Detection**
   - Unusual working hours
   - Excessive file access
   - Unauthorized application usage
   - Mass file operations
   - Sensitive data access patterns
   - Policy violation correlations

### Rule Writing Best Practices

1. **Performance Optimization**
   - Filter early in the rule chain
   - Use indexed fields when possible
   - Limit time windows appropriately
   - Avoid complex regex when possible
   - Test with production-level volumes

2. **Reducing False Positives**
   - Implement multi-condition validation
   - Use whitelisting for known good
   - Incorporate context and enrichment
   - Implement baselining periods
   - Create tuning feedback loops

3. **Maintainability**
   - Use descriptive rule names
   - Document rule logic and rationale
   - Include references to threat intelligence
   - Version control rule definitions
   - Implement rule testing frameworks

4. **Mapping to Frameworks**
   - Tag rules with MITRE ATT&CK techniques
   - Map to compliance requirements
   - Link to internal policies
   - Reference threat models
   - Align with risk framework

### Advanced Correlation Techniques

1. **Behavioral Analytics Integration**
   - User behavior profiling
   - Entity behavior analytics
   - Peer group analysis
   - Time-based pattern detection
   - Machine learning anomaly detection

2. **Threat Intelligence-Driven Correlation**
   - IOC matching
   - TTP detection
   - Campaign awareness
   - Actor-specific behaviors
   - Emerging threat adaptation

3. **Risk Scoring Frameworks**
   - Cumulative risk calculations
   - Multi-factor scoring models
   - Dynamic risk adjustment
   - Asset-based risk weighting
   - Time decay functions

4. **Cross-Source Correlation**
   - Network and endpoint correlation
   - Cloud and on-premises integration
   - Physical and logical access correlation
   - Application and infrastructure alignment
   - Business context integration

![Correlation Rule Development Process](/images/courses/soc/correlation_rule_development.png)

## Alert Prioritization and Triage

### Alert Classification Framework

1. **Severity Levels**
   - **Critical**: Immediate response required, active compromise
   - **High**: Urgent response needed, high confidence of malicious activity
   - **Medium**: Suspicious activity requiring investigation
   - **Low**: Potentially suspicious but low confidence
   - **Informational**: Context for awareness, no direct action needed

2. **Alert Metadata**
   - Affected assets and their criticality
   - Potential impact assessment
   - Confidence level
   - Associated threat actors or campaigns
   - Recommended response actions
   - Reference to related alerts

3. **Prioritization Factors**
   - Asset criticality
   - Vulnerability status
   - Threat intelligence context
   - Alert fidelity history
   - Detection stage in kill chain
   - Business impact potential

### Triage Process Design

1. **Initial Assessment**
   - Alert validation (true/false positive)
   - Context gathering
   - Preliminary scope determination
   - Initial impact assessment
   - Urgency evaluation

2. **Triage Workflow**
   - Alert queue management
   - Assignment based on expertise
   - Escalation paths
   - SLA tracking
   - Handoff procedures

3. **Decision Points**
   - Escalate to incident
   - Dismiss as false positive
   - Request additional information
   - Contain immediate threat
   - Monitor for additional context

4. **Documentation Requirements**
   - Triage actions taken
   - Evidence collected
   - Decision rationale
   - Next steps
   - Lessons learned for tuning

### Alert Enrichment Strategies

1. **Automated Enrichment**
   - Asset information lookup
   - User context retrieval
   - Vulnerability status
   - Historical alert patterns
   - Threat intelligence context
   - Related events correlation

2. **Manual Enrichment**
   - Additional log searches
   - Endpoint investigation
   - User interviews
   - Business context gathering
   - Threat hunting for related activity

3. **Enrichment Tools and Integrations**
   - CMDB integration
   - Threat intelligence platforms
   - Vulnerability management systems
   - Identity and access management systems
   - Business application mappings

### Triage Automation

1. **Automated Triage Actions**
   - Context gathering scripts
   - Preliminary analysis automation
   - False positive identification
   - Similar alert correlation
   - Playbook triggering
   - Ticket creation and routing

2. **Triage Decision Support**
   - Risk scoring algorithms
   - Historical case comparison
   - Analyst recommendation systems
   - Knowledge base integration
   - Similar case identification

3. **Triage Metrics and Optimization**
   - Time to triage
   - Triage accuracy rates
   - Automation effectiveness
   - Analyst efficiency
   - False positive identification rate

![Alert Triage Workflow](/images/courses/soc/alert_triage_workflow.png)

## Baselining Normal Network Behavior

### Baselining Methodology

1. **Baseline Development Process**
   - Define scope and objectives
   - Identify key metrics and data points
   - Determine appropriate timeframes
   - Collect and analyze initial data
   - Document normal patterns
   - Establish review and update cycles

2. **Baseline Categories**
   - Network traffic patterns
   - User activity profiles
   - System resource utilization
   - Application behavior
   - Authentication patterns
   - Data access patterns

3. **Statistical Approaches**
   - Mean and standard deviation
   - Percentile-based thresholds
   - Moving averages
   - Seasonal decomposition
   - Trend analysis
   - Outlier detection methods

### Network Traffic Baselining

1. **Traffic Volume Metrics**
   - Bytes/packets per second
   - Connections per second
   - Flow duration distributions
   - Protocol distribution
   - Bandwidth utilization
   - Diurnal patterns

2. **Connection Metrics**
   - Source/destination pairs
   - Port utilization
   - Session duration
   - Connection establishment rates
   - Geographic distribution
   - Internal vs. external ratios

3. **Application-Layer Metrics**
   - HTTP request patterns
   - DNS query types and volumes
   - Email traffic patterns
   - Database query patterns
   - API call distributions
   - File transfer characteristics

### User Behavior Baselining

1. **Authentication Patterns**
   - Login times and frequency
   - Authentication source locations
   - Failed attempt ratios
   - Session duration
   - Resource access patterns
   - Credential usage across systems

2. **Access Patterns**
   - Systems and applications accessed
   - Data access volume and types
   - Administrative action frequency
   - Peer group comparison
   - Job function alignment
   - Working hours patterns

3. **Endpoint Activity**
   - Process execution patterns
   - Software installation frequency
   - Resource utilization
   - Network connection patterns
   - File system activity
   - Peripheral device usage

### Baseline Maintenance

1. **Review Cycles**
   - Scheduled periodic reviews
   - Event-triggered reviews
   - Compliance-driven assessments
   - Post-incident evaluations
   - Business change alignments

2. **Baseline Drift Management**
   - Gradual change detection
   - Authorized vs. unauthorized drift
   - Rebaselining triggers
   - Documentation of baseline evolution
   - Change approval processes

3. **Seasonal and Business Cycle Adjustments**
   - Time-of-day variations
   - Day-of-week patterns
   - Monthly/quarterly cycles
   - Business event correlation
   - Holiday and special event adjustments

### Baseline Integration with Detection

1. **Anomaly Detection Methods**
   - Statistical outlier detection
   - Machine learning models
   - Heuristic-based detection
   - Pattern deviation alerting
   - Behavioral analytics

2. **Alert Threshold Management**
   - Dynamic thresholding
   - Adaptive alert levels
   - Confidence scoring
   - Contextual adjustment
   - Progressive alerting

3. **Baseline Visualization**
   - Trend graphs and charts
   - Heat maps
   - Behavioral graphs
   - Comparative visualizations
   - Anomaly highlighting

![Network Behavior Baseline Example](/images/courses/soc/network_baseline_example.png)

## Continuous Monitoring Strategies

### Monitoring Program Development

1. **Strategic Planning**
   - Define monitoring objectives
   - Align with security and business goals
   - Establish governance structure
   - Define roles and responsibilities
   - Develop resource allocation model
   - Create implementation roadmap

2. **Coverage Planning**
   - Asset inventory and classification
   - Threat modeling for prioritization
   - Compliance requirement mapping
   - Technical capability assessment
   - Gap analysis and remediation

3. **Operational Model**
   - 24x7 vs. 8x5 with on-call
   - Follow-the-sun approach
   - Tiered monitoring model
   - Escalation procedures
   - Handoff processes

### Monitoring Use Case Development

1. **Use Case Framework**
   - Threat scenario definition
   - Required data sources
   - Detection logic
   - Response actions
   - Success metrics
   - Validation procedures

2. **Use Case Lifecycle**
   - Development and testing
   - Implementation and tuning
   - Operational validation
   - Performance review
   - Retirement or replacement

3. **Use Case Prioritization**
   - Risk-based assessment
   - Implementation complexity
   - Data availability
   - Detection confidence
   - Operational impact

### Continuous Improvement Process

1. **Performance Metrics**
   - Detection effectiveness
   - False positive rates
   - Coverage gaps
   - Response times
   - Operational efficiency

2. **Feedback Mechanisms**
   - Post-incident reviews
   - False positive analysis
   - Missed detection analysis
   - Analyst feedback collection
   - Threat intelligence updates

3. **Maturity Advancement**
   - Capability enhancement planning
   - Technology roadmap
   - Skill development
   - Process refinement
   - Automation expansion

### Monitoring Technology Integration

1. **Integration Architecture**
   - Data flow design
   - API utilization
   - Common data formats
   - Authentication and authorization
   - Redundancy and failover

2. **Cross-Platform Correlation**
   - Multi-tool data aggregation
   - Unified search capabilities
   - Cross-platform alerting
   - Consolidated case management
   - Integrated response actions

3. **Monitoring Ecosystem Management**
   - Tool rationalization
   - Capability gap analysis
   - Vendor management
   - Version compatibility
   - Integration testing

![Continuous Monitoring Framework](/images/courses/soc/continuous_monitoring_framework.png)

## Network Security Monitoring Tools

### Open Source Tools

1. **Zeek (formerly Bro)**
   - **Capabilities**:
     - Deep packet inspection
     - Protocol analysis
     - Connection logging
     - File extraction
     - Custom policy scripting
   
   - **Use Cases**:
     - Network traffic analysis
     - Protocol anomaly detection
     - File type monitoring
     - SSL/TLS certificate monitoring
     - Custom detection development

2. **Suricata**
   - **Capabilities**:
     - Signature-based detection
     - Protocol identification
     - File identification
     - TLS certificate logging
     - Performance optimization
   
   - **Use Cases**:
     - Known threat detection
     - Protocol violation alerting
     - Malicious file transfer detection
     - Encrypted traffic analysis
     - Network IDS/IPS deployment

3. **Wazuh**
   - **Capabilities**:
     - Host-based monitoring
     - File integrity monitoring
     - Log analysis
     - Vulnerability detection
     - Compliance monitoring
   
   - **Use Cases**:
     - Endpoint security monitoring
     - Compliance checking
     - System file change detection
     - Log-based threat detection
     - Security configuration assessment

4. **Security Onion**
   - **Capabilities**:
     - All-in-one NSM solution
     - Multiple tool integration
     - Packet capture
     - Alert management
     - Analysis interface
   
   - **Use Cases**:
     - Comprehensive monitoring solution
     - Training and lab environments
     - Small to medium deployment
     - Forensic investigation platform
     - Detection capability testing

### Commercial Tools

1. **Darktrace**
   - **Capabilities**:
     - AI-based anomaly detection
     - Self-learning algorithms
     - Network visualization
     - Automated response
     - Entity behavior analytics
   
   - **Use Cases**:
     - Zero-day threat detection
     - Insider threat monitoring
     - IoT security monitoring
     - Industrial control system protection
     - Autonomous response implementation

2. **ExtraHop Reveal(x)**
   - **Capabilities**:
     - Real-time wire data analysis
     - Machine learning detection
     - Encrypted traffic analysis
     - Cloud integration
     - Forensic investigation
   
   - **Use Cases**:
     - East-west traffic monitoring
     - Performance and security correlation
     - Cloud workload protection
     - Advanced threat detection
     - Forensic investigation

3. **Cisco Secure Network Analytics (formerly Stealthwatch)**
   - **Capabilities**:
     - NetFlow analysis
     - Behavioral modeling
     - Threat intelligence integration
     - Entity modeling
     - Cloud visibility
   
   - **Use Cases**:
     - Large enterprise deployment
     - Cisco infrastructure integration
     - Encrypted traffic analytics
     - Data exfiltration detection
     - Network segmentation validation

4. **Palo Alto Networks Cortex XDR**
   - **Capabilities**:
     - Network and endpoint integration
     - Behavioral analytics
     - Investigation and response
     - Threat intelligence correlation
     - Automated playbooks
   
   - **Use Cases**:
     - Unified security operations
     - Advanced threat detection
     - Incident investigation
     - Automated response
     - Threat hunting

### Tool Selection and Implementation

1. **Requirements Analysis**
   - Coverage needs
   - Integration requirements
   - Scalability considerations
   - Performance expectations
   - Budget constraints

2. **Evaluation Criteria**
   - Detection capabilities
   - False positive rates
   - Ease of management
   - Reporting features
   - Total cost of ownership

3. **Deployment Planning**
   - Network tap/span port placement
   - Traffic volume considerations
   - Storage requirements
   - High availability design
   - Security of monitoring infrastructure

4. **Operational Considerations**
   - Staffing requirements
   - Training needs
   - Maintenance procedures
   - Update management
   - Performance monitoring

### Tool Integration Strategies

1. **Data Sharing Approaches**
   - API integration
   - Syslog forwarding
   - Common event format
   - Message queues
   - Shared databases

2. **Workflow Integration**
   - Alert consolidation
   - Cross-tool investigation
   - Unified case management
   - Coordinated response
   - Centralized reporting

3. **Management Considerations**
   - Unified administration
   - Consistent policy management
   - Coordinated updates
   - Integrated health monitoring
   - Consolidated licensing

![Network Security Monitoring Architecture](/images/courses/soc/network_security_monitoring_architecture.png)

## Hands-on Lab: Implementing Basic Security Monitoring

### Lab Objectives
In this hands-on lab, you will:
1. Set up a basic security monitoring environment
2. Configure log collection from multiple sources
3. Develop and test correlation rules
4. Create baseline profiles for network traffic
5. Implement a basic alert triage workflow

### Lab Requirements
- Virtual machine with at least 8GB RAM and 4 CPU cores
- Ubuntu Server 20.04 LTS or later
- Internet connectivity for downloading tools
- Basic Linux command line knowledge

### Step 1: Setting Up the Environment

1. **Create a virtual machine and install dependencies**
   ```bash
   # Update system packages
   sudo apt update
   sudo apt upgrade -y
   
   # Install required dependencies
   sudo apt install -y curl wget git python3-pip net-tools tcpdump
   ```

2. **Install Docker and Docker Compose**
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Add current user to docker group
   sudo usermod -aG docker $USER
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.18.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

3. **Create a project directory**
   ```bash
   mkdir -p ~/security-monitoring-lab
   cd ~/security-monitoring-lab
   ```

### Step 2: Deploying Security Monitoring Tools

1. **Create a docker-compose.yml file for ELK Stack and Wazuh**
   ```bash
   cat > docker-compose.yml << 'EOF'
   version: '3'
   services:
     elasticsearch:
       image: docker.elastic.co/elasticsearch/elasticsearch:7.17.0
       environment:
         - discovery.type=single-node
         - ES_JAVA_OPTS=-Xms512m -Xmx512m
       ports:
         - "9200:9200"
       volumes:
         - esdata:/usr/share/elasticsearch/data
       networks:
         - security-monitoring
   
     logstash:
       image: docker.elastic.co/logstash/logstash:7.17.0
       volumes:
         - ./logstash/pipeline:/usr/share/logstash/pipeline
       ports:
         - "5044:5044"
         - "5000:5000/tcp"
         - "5000:5000/udp"
         - "9600:9600"
       depends_on:
         - elasticsearch
       networks:
         - security-monitoring
   
     kibana:
       image: docker.elastic.co/kibana/kibana:7.17.0
       ports:
         - "5601:5601"
       depends_on:
         - elasticsearch
       networks:
         - security-monitoring
   
     filebeat:
       image: docker.elastic.co/beats/filebeat:7.17.0
       volumes:
         - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro
         - /var/log:/var/log:ro
         - /var/lib/docker/containers:/var/lib/docker/containers:ro
       depends_on:
         - elasticsearch
         - logstash
       networks:
         - security-monitoring
   
     suricata:
       image: jasonish/suricata:latest
       network_mode: host
       volumes:
         - ./suricata/logs:/var/log/suricata
         - ./suricata/rules:/etc/suricata/rules
       command: -i eth0 -v
   
   networks:
     security-monitoring:
       driver: bridge
   
   volumes:
     esdata:
       driver: local
   EOF
   ```

2. **Configure Logstash pipeline**
   ```bash
   mkdir -p logstash/pipeline
   cat > logstash/pipeline/logstash.conf << 'EOF'
   input {
     beats {
       port => 5044
     }
     tcp {
       port => 5000
       codec => json
     }
     udp {
       port => 5000
       codec => json
     }
   }
   
   filter {
     if [type] == "syslog" {
       grok {
         match => { "message" => "%{SYSLOGTIMESTAMP:syslog_timestamp} %{SYSLOGHOST:syslog_hostname} %{DATA:syslog_program}(?:\[%{POSINT:syslog_pid}\])?: %{GREEDYDATA:syslog_message}" }
       }
       date {
         match => [ "syslog_timestamp", "MMM  d HH:mm:ss", "MMM dd HH:mm:ss" ]
       }
     }
     
     if [type] == "suricata" {
       json {
         source => "message"
       }
     }
   }
   
   output {
     elasticsearch {
       hosts => ["elasticsearch:9200"]
       index => "logstash-%{+YYYY.MM.dd}"
     }
     stdout { codec => rubydebug }
   }
   EOF
   ```

3. **Configure Filebeat**
   ```bash
   mkdir -p filebeat
   cat > filebeat/filebeat.yml << 'EOF'
   filebeat.inputs:
   - type: log
     enabled: true
     paths:
       - /var/log/auth.log
       - /var/log/syslog
     tags: ["syslog"]
   
   - type: log
     enabled: true
     paths:
       - /var/log/suricata/eve.json
     json.keys_under_root: true
     json.add_error_key: true
     tags: ["suricata"]
   
   output.logstash:
     hosts: ["logstash:5044"]
   
   logging.level: info
   EOF
   ```

4. **Configure Suricata rules**
   ```bash
   mkdir -p suricata/rules suricata/logs
   cat > suricata/rules/local.rules << 'EOF'
   # Detect port scanning
   alert tcp any any -> $HOME_NET any (msg:"Potential TCP port scan"; flags:S; threshold: type threshold, track by_src, count 5, seconds 60; classtype:attempted-recon; sid:1000001; rev:1;)
   
   # Detect SSH brute force attempts
   alert tcp any any -> $HOME_NET 22 (msg:"Potential SSH brute force attempt"; flags:S; threshold: type threshold, track by_src, count 5, seconds 60; classtype:attempted-admin; sid:1000002; rev:1;)
   
   # Detect unusual outbound connections
   alert tcp $HOME_NET any -> any 8000:9000 (msg:"Unusual high port connection"; flags:S; classtype:misc-activity; sid:1000003; rev:1;)
   EOF
   ```

5. **Start the environment**
   ```bash
   docker-compose up -d
   ```

### Step 3: Creating Correlation Rules

1. **Create a simple correlation rule in Elasticsearch**
   ```bash
   # Wait for Elasticsearch to be ready
   sleep 30
   
   # Create a detection rule
   curl -X POST "localhost:9200/_watcher/watch/_execute" -H 'Content-Type: application/json' -d'
   {
     "watch": {
       "trigger": {
         "schedule": {
           "interval": "1m"
         }
       },
       "input": {
         "search": {
           "request": {
             "indices": ["logstash-*"],
             "body": {
               "query": {
                 "bool": {
                   "must": [
                     { "match": { "program": "sshd" } },
                     { "match": { "message": "Failed password" } }
                   ]
                 }
               },
               "aggs": {
                 "by_source": {
                   "terms": {
                     "field": "source.ip.keyword",
                     "size": 10,
                     "min_doc_count": 5
                   }
                 }
               },
               "size": 0
             }
           }
         }
       },
       "condition": {
         "compare": {
           "ctx.payload.aggregations.by_source.buckets": {
             "not_eq": []
           }
         }
       },
       "actions": {
         "log_hit": {
           "logging": {
             "text": "Potential brute force attack detected from: {{ctx.payload.aggregations.by_source.buckets.0.key}}"
           }
         }
       }
     }
   }'
   ```

### Step 4: Generating Test Data

1. **Generate authentication failure logs**
   ```bash
   for i in {1..10}; do
     echo "$(date '+%b %d %H:%M:%S') localhost sshd[1234]: Failed password for invalid user attacker from 192.168.1.$((RANDOM % 255)) port 12345 ssh2" | nc -u localhost 5000
     sleep 1
   done
   ```

2. **Generate suspicious network connection logs**
   ```bash
   for i in {1..5}; do
     echo "$(date '+%b %d %H:%M:%S') localhost kernel: [1234567.890123] DROPPED IN=eth0 OUT= MAC=aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77 SRC=10.0.0.$i DST=10.0.0.2 LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=12345 DF PROTO=TCP SPT=12345 DPT=22 WINDOW=65535 RES=0x00 SYN URGP=0" | nc -u localhost 5000
     sleep 1
   done
   ```

### Step 5: Creating Network Traffic Baselines

1. **Collect baseline network statistics**
   ```bash
   mkdir -p ~/security-monitoring-lab/baselines
   
   # Capture baseline network statistics for 5 minutes
   sudo tcpdump -i eth0 -w ~/security-monitoring-lab/baselines/baseline_traffic.pcap -G 300 -W 1
   
   # Analyze the captured traffic
   tcpdump -r ~/security-monitoring-lab/baselines/baseline_traffic.pcap -n -c 100 > ~/security-monitoring-lab/baselines/baseline_summary.txt
   
   # Generate protocol statistics
   tcpdump -r ~/security-monitoring-lab/baselines/baseline_traffic.pcap -n -c 1000 | awk '{print $2}' | sort | uniq -c | sort -nr > ~/security-monitoring-lab/baselines/protocol_distribution.txt
   ```

2. **Create a simple Python script to analyze the baseline**
   ```bash
   cat > ~/security-monitoring-lab/analyze_baseline.py << 'EOF'
   #!/usr/bin/env python3
   import sys
   import re
   from collections import Counter, defaultdict
   
   def analyze_pcap_summary(file_path):
       ip_pattern = re.compile(r'(\d+\.\d+\.\d+\.\d+)')
       src_dst_pairs = []
       ip_counts = Counter()
       
       with open(file_path, 'r') as f:
           for line in f:
               ips = ip_pattern.findall(line)
               if len(ips) >= 2:
                   src, dst = ips[0], ips[1]
                   src_dst_pairs.append((src, dst))
                   ip_counts[src] += 1
                   ip_counts[dst] += 1
       
       print("Top 10 IP addresses by frequency:")
       for ip, count in ip_counts.most_common(10):
           print(f"{ip}: {count}")
       
       print("\nTop 10 communication pairs:")
       pair_counts = Counter(src_dst_pairs)
       for pair, count in pair_counts.most_common(10):
           print(f"{pair[0]} -> {pair[1]}: {count}")
   
   if __name__ == "__main__":
       if len(sys.argv) != 2:
           print(f"Usage: {sys.argv[0]} <pcap_summary_file>")
           sys.exit(1)
       
       analyze_pcap_summary(sys.argv[1])
   EOF
   
   chmod +x ~/security-monitoring-lab/analyze_baseline.py
   
   # Run the analysis
   ~/security-monitoring-lab/analyze_baseline.py ~/security-monitoring-lab/baselines/baseline_summary.txt > ~/security-monitoring-lab/baselines/baseline_analysis.txt
   ```

### Step 6: Implementing Alert Triage Workflow

1. **Create a simple alert triage script**
   ```bash
   cat > ~/security-monitoring-lab/triage_alerts.py << 'EOF'
   #!/usr/bin/env python3
   import json
   import sys
   import datetime
   import os
   
   class AlertTriageSystem:
       def __init__(self):
           self.alerts_db_file = "alerts_db.json"
           self.load_alerts_db()
       
       def load_alerts_db(self):
           if os.path.exists(self.alerts_db_file):
               with open(self.alerts_db_file, 'r') as f:
                   self.alerts_db = json.load(f)
           else:
               self.alerts_db = {
                   "alerts": [],
                   "false_positives": [],
                   "whitelisted_ips": []
               }
       
       def save_alerts_db(self):
           with open(self.alerts_db_file, 'w') as f:
               json.dump(self.alerts_db, f, indent=2)
       
       def add_alert(self, alert_type, source_ip, details):
           # Check if IP is whitelisted
           if source_ip in self.alerts_db["whitelisted_ips"]:
               print(f"Alert from whitelisted IP {source_ip} - skipping")
               return False
           
           # Check if similar alert was marked as false positive recently
           for fp in self.alerts_db["false_positives"]:
               if fp["source_ip"] == source_ip and fp["alert_type"] == alert_type:
                   fp_time = datetime.datetime.fromisoformat(fp["timestamp"])
                   now = datetime.datetime.now()
                   if (now - fp_time).total_seconds() < 86400:  # Within 24 hours
                       print(f"Similar alert was marked as false positive within 24 hours - skipping")
                       return False
           
           # Add the alert
           alert = {
               "id": len(self.alerts_db["alerts"]) + 1,
               "timestamp": datetime.datetime.now().isoformat(),
               "alert_type": alert_type,
               "source_ip": source_ip,
               "details": details,
               "status": "new",
               "assigned_to": None,
               "resolution": None
           }
           
           self.alerts_db["alerts"].append(alert)
           self.save_alerts_db()
           print(f"Alert added: {alert['id']}")
           return True
       
       def list_alerts(self, status=None):
           filtered_alerts = self.alerts_db["alerts"]
           if status:
               filtered_alerts = [a for a in filtered_alerts if a["status"] == status]
           
           print(f"{'ID':4} | {'Timestamp':25} | {'Type':20} | {'Source IP':15} | {'Status':10}")
           print("-" * 80)
           for alert in filtered_alerts:
               print(f"{alert['id']:4} | {alert['timestamp']:25} | {alert['alert_type']:20} | {alert['source_ip']:15} | {alert['status']:10}")
       
       def assign_alert(self, alert_id, analyst):
           for alert in self.alerts_db["alerts"]:
               if alert["id"] == alert_id:
                   alert["status"] = "assigned"
                   alert["assigned_to"] = analyst
                   self.save_alerts_db()
                   print(f"Alert {alert_id} assigned to {analyst}")
                   return True
           print(f"Alert {alert_id} not found")
           return False
       
       def resolve_alert(self, alert_id, resolution, is_false_positive=False):
           for alert in self.alerts_db["alerts"]:
               if alert["id"] == alert_id:
                   alert["status"] = "resolved"
                   alert["resolution"] = resolution
                   
                   if is_false_positive:
                       self.alerts_db["false_positives"].append({
                           "timestamp": datetime.datetime.now().isoformat(),
                           "alert_type": alert["alert_type"],
                           "source_ip": alert["source_ip"]
                       })
                   
                   self.save_alerts_db()
                   print(f"Alert {alert_id} resolved as {'false positive' if is_false_positive else 'true positive'}")
                   return True
           print(f"Alert {alert_id} not found")
           return False
       
       def whitelist_ip(self, ip_address, reason):
           if ip_address not in self.alerts_db["whitelisted_ips"]:
               self.alerts_db["whitelisted_ips"].append(ip_address)
               self.save_alerts_db()
               print(f"IP {ip_address} added to whitelist: {reason}")
               return True
           print(f"IP {ip_address} already in whitelist")
           return False
   
   def print_usage():
       print("Usage:")
       print("  ./triage_alerts.py add <alert_type> <source_ip> <details>")
       print("  ./triage_alerts.py list [status]")
       print("  ./triage_alerts.py assign <alert_id> <analyst>")
       print("  ./triage_alerts.py resolve <alert_id> <resolution> [--false-positive]")
       print("  ./triage_alerts.py whitelist <ip_address> <reason>")
   
   if __name__ == "__main__":
       triage = AlertTriageSystem()
       
       if len(sys.argv) < 2:
           print_usage()
           sys.exit(1)
       
       command = sys.argv[1]
       
       if command == "add" and len(sys.argv) >= 5:
           alert_type = sys.argv[2]
           source_ip = sys.argv[3]
           details = " ".join(sys.argv[4:])
           triage.add_alert(alert_type, source_ip, details)
       
       elif command == "list":
           status = sys.argv[2] if len(sys.argv) > 2 else None
           triage.list_alerts(status)
       
       elif command == "assign" and len(sys.argv) == 4:
           alert_id = int(sys.argv[2])
           analyst = sys.argv[3]
           triage.assign_alert(alert_id, analyst)
       
       elif command == "resolve" and len(sys.argv) >= 4:
           alert_id = int(sys.argv[2])
           resolution = sys.argv[3]
           is_false_positive = "--false-positive" in sys.argv
           triage.resolve_alert(alert_id, resolution, is_false_positive)
       
       elif command == "whitelist" and len(sys.argv) >= 4:
           ip_address = sys.argv[2]
           reason = " ".join(sys.argv[3:])
           triage.whitelist_ip(ip_address, reason)
       
       else:
           print_usage()
           sys.exit(1)
   EOF
   
   chmod +x ~/security-monitoring-lab/triage_alerts.py
   ```

2. **Test the triage workflow**
   ```bash
   cd ~/security-monitoring-lab
   
   # Add some test alerts
   ./triage_alerts.py add "SSH Brute Force" "192.168.1.100" "Multiple failed SSH login attempts"
   ./triage_alerts.py add "Suspicious Outbound Connection" "10.0.0.5" "Connection to known malicious IP"
   
   # List all alerts
   ./triage_alerts.py list
   
   # Assign an alert
   ./triage_alerts.py assign 1 "analyst1"
   
   # Resolve an alert as true positive
   ./triage_alerts.py resolve 1 "Blocked IP at firewall"
   
   # Add another alert and mark as false positive
   ./triage_alerts.py add "Port Scan" "192.168.1.50" "Scanning multiple ports"
   ./triage_alerts.py resolve 3 "Legitimate vulnerability scan" --false-positive
   
   # Whitelist an IP
   ./triage_alerts.py whitelist "192.168.1.10" "Security scanner"
   
   # List resolved alerts
   ./triage_alerts.py list resolved
   ```

### Lab Conclusion

In this lab, you have:
1. Set up a basic security monitoring environment using ELK Stack and Suricata
2. Configured log collection from system logs and network traffic
3. Created a simple correlation rule for detecting authentication failures
4. Generated test data to validate your monitoring setup
5. Established a baseline for normal network traffic
6. Implemented a basic alert triage workflow

This foundation can be expanded with additional data sources, more sophisticated detection rules, and integration with other security tools to build a more comprehensive security monitoring solution.

## Chapter Summary

In this chapter, we explored the fundamental concepts and practices of security monitoring, which forms the foundation of effective SOC operations. We covered:

- The principles of security event monitoring and the monitoring lifecycle
- Comprehensive log collection and management strategies
- SIEM implementation and configuration best practices
- Techniques for creating effective correlation rules
- Methods for alert prioritization and triage
- Approaches to baselining normal network behavior
- Strategies for implementing continuous monitoring
- An overview of network security monitoring tools

Understanding these foundational elements provides the necessary context for the more advanced threat detection and analysis techniques covered in subsequent chapters. As we progress through the course, we will build on these concepts to develop a comprehensive understanding of how to detect, analyze, and respond to security threats effectively.

## Knowledge Check

1. What are the seven stages of the security monitoring lifecycle?
2. Name three different log collection methods and explain their advantages and disadvantages.
3. What are the key components of a SIEM architecture?
4. Explain the difference between simple pattern matching and threshold-based correlation rules.
5. What factors should be considered when prioritizing security alerts?
6. Why is baselining normal network behavior important for security monitoring?
7. What are the key considerations when selecting network security monitoring tools?
8. How does log normalization improve security monitoring capabilities?
9. What are the common challenges in implementing a SIEM solution and how can they be addressed?
10. Explain the concept of defense-in-depth monitoring and why it's important.

## Additional Resources

### Books
- "The Practice of Network Security Monitoring" by Richard Bejtlich
- "Applied Security Visualization" by Raffael Marty
- "Security Information and Event Management (SIEM) Implementation" by David Miller

### Online Resources
- SANS Reading Room: [Security Monitoring](https://www.sans.org/reading-room/whitepapers/detection/)
- Elastic Security Documentation: [https://www.elastic.co/guide/en/security/current/index.html](https://www.elastic.co/guide/en/security/current/index.html)
- Suricata User Guide: [https://suricata.readthedocs.io/](https://suricata.readthedocs.io/)

### Training and Certification
- SANS SEC555: SIEM with Tactical Analytics
- Elastic Certified Engineer
- Splunk Certified Cybersecurity Defense Analyst

## Next Steps
In the next chapter, we will build on these monitoring fundamentals to explore advanced threat detection and analysis techniques, including the application of the MITRE ATT&CK framework, behavioral analysis, and indicators of compromise.
