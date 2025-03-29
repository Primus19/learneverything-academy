# Mobile Application Security Testing

In this chapter, we'll explore the techniques and methodologies used in mobile application security testing. With the proliferation of mobile devices and applications, understanding how to identify and exploit vulnerabilities in mobile apps is essential for security professionals. We'll cover both Android and iOS platforms, focusing on practical approaches to mobile app penetration testing.

## Learning Objectives

By the end of this chapter, you will be able to:

1. Understand the mobile application security testing methodology
2. Set up a mobile application testing environment for both Android and iOS
3. Perform static analysis on mobile applications
4. Execute dynamic analysis and runtime manipulation
5. Identify and exploit common mobile application vulnerabilities
6. Test mobile application network communications
7. Assess secure data storage implementations
8. Document mobile vulnerabilities and provide effective remediation recommendations

## 1. Mobile Application Security Testing Methodology

### 1.1 Planning and Preparation

Before beginning a mobile application security assessment, proper planning is essential:

1. **Defining Scope**:
   - Target applications and versions
   - Testing environments (emulators, real devices)
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
# Mobile Application Security Testing Methodology (ASCII Diagram)

+------------------------+     +------------------------+     +------------------------+
|                        |     |                        |     |                        |
|  Planning/Preparation  | --> |  Application Analysis  | --> |  Static Analysis       |
|                        |     |  & Reconnaissance      |     |                        |
|                        |     |                        |     |                        |
+------------------------+     +------------------------+     +------------------------+
                                                                          |
                                                                          v
+------------------------+     +------------------------+     +------------------------+
|                        |     |                        |     |                        |
|  Reporting &           | <-- |  API Testing &        | <-- |  Dynamic Analysis      |
|  Remediation           |     |  Network Security     |     |  & Runtime Testing     |
|                        |     |                        |     |                        |
+------------------------+     +------------------------+     +------------------------+
```

### 1.2 Mobile Security Testing Frameworks

Several established frameworks guide mobile application security testing:

1. **OWASP Mobile Security Testing Guide (MSTG)**:
   - Comprehensive methodology for mobile application security testing
   - Covers mobile platform internals, security testing processes, and reverse engineering
   - Provides detailed testing procedures and examples for both Android and iOS

2. **OWASP Mobile Application Security Verification Standard (MASVS)**:
   - Framework for security requirements and verification
   - Four security verification levels (L1, L2, R, L2+R)
   - Detailed security controls across multiple categories

3. **NIST Mobile Device Security Guidelines**:
   - Guidelines for managing the security of mobile devices
   - Recommendations for securing mobile applications
   - Enterprise mobile security considerations

4. **SANS Mobile Device Checklist**:
   - Practical checklist for mobile security testing
   - Quick reference for common mobile vulnerabilities
   - Platform-specific security considerations

> **Knowledge Check:** What are the key differences between testing mobile applications and traditional web applications? What additional security concerns exist in the mobile environment?

## 2. Setting Up a Mobile Testing Environment

### 2.1 Android Testing Environment

Setting up an environment for Android application security testing:

1. **Required Tools**:
   - Android Studio and SDK
   - Android Emulator or physical devices
   - ADB (Android Debug Bridge)
   - Frida and Objection
   - Burp Suite or OWASP ZAP
   - APKTool, dex2jar, JD-GUI

2. **Emulator Setup**:
   - Creating AVDs (Android Virtual Devices)
   - Configuring emulator settings
   - Installing root certificates
   - Setting up proxy configuration
   - Installing testing tools

3. **Physical Device Setup**:
   - Enabling Developer Options
   - Enabling USB debugging
   - Rooting considerations
   - Installing certificates
   - Configuring proxy settings

```bash
# Example: Setting up an Android testing environment

# Step 1: Install Android Studio and SDK
# Download from https://developer.android.com/studio

# Step 2: Install required tools
sudo apt update
sudo apt install -y adb apktool dex2jar jd-gui

# Step 3: Install Frida
pip install frida-tools

# Step 4: Install Objection
pip install objection

# Step 5: Create and configure an Android Virtual Device (AVD)
# Using Android Studio:
# Tools > AVD Manager > Create Virtual Device

# Step 6: Start the emulator
emulator -avd Pixel_3a_API_30 -writable-system

# Step 7: Install Burp Suite certificate
# Export Burp certificate in DER format
# Convert to PEM format
openssl x509 -inform DER -in burp.der -out burp.pem

# Step 8: Push certificate to emulator
adb push burp.pem /sdcard/

# Step 9: Install certificate on emulator
# Navigate to Settings > Security > Install from SD Card
# Select the certificate file

# Step 10: Configure proxy settings
adb shell settings put global http_proxy 192.168.1.100:8080

# Step 11: Verify ADB connection
adb devices
```

### 2.2 iOS Testing Environment

Setting up an environment for iOS application security testing:

1. **Required Tools**:
   - macOS system
   - Xcode and iOS SDK
   - iOS Simulator or physical devices
   - Frida and Objection
   - Burp Suite or OWASP ZAP
   - Cydia Impactor
   - Class-dump, Clutch, Hopper

2. **Simulator Setup**:
   - Installing Xcode and iOS Simulator
   - Configuring simulator settings
   - Installing certificates
   - Setting up proxy configuration
   - Installing testing tools

3. **Physical Device Setup**:
   - Registering as Apple Developer
   - Jailbreaking considerations
   - Installing certificates
   - Configuring proxy settings
   - Installing testing tools

```bash
# Example: Setting up an iOS testing environment

# Step 1: Install Xcode from the App Store

# Step 2: Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Step 3: Install required tools
brew install class-dump
brew install --cask hopper-disassembler
brew install --cask burp-suite

# Step 4: Install Frida
pip3 install frida-tools

# Step 5: Install Objection
pip3 install objection

# Step 6: Launch iOS Simulator
open -a Simulator

# Step 7: Install Burp Suite certificate on Simulator
# Export Burp certificate in DER format
# Convert to PEM format
openssl x509 -inform DER -in burp.der -out burp.pem

# Step 8: Install certificate on Simulator
# Navigate to Settings > General > Profiles & Device Management
# Install the certificate

# Step 9: Configure proxy settings on Simulator
# Settings > Wi-Fi > Configure Proxy > Manual
# Set proxy host to 127.0.0.1 and port to 8080

# Step 10: For physical devices (jailbroken)
# Install OpenSSH and Cydia Substrate
# Install Frida from Cydia
# Configure proxy settings manually
```

### 2.3 Proxy Setup and SSL Pinning Bypass

Configuring proxies and bypassing certificate pinning:

1. **Proxy Configuration**:
   - Setting up Burp Suite or OWASP ZAP
   - Configuring proxy settings on devices
   - Installing CA certificates
   - Handling non-proxy traffic

2. **SSL Pinning Bypass Techniques**:
   - Using Frida for runtime manipulation
   - Objection for automated bypassing
   - Modifying application code
   - Xposed modules (Android)
   - Substrate tweaks (iOS)

3. **Proxy Limitations**:
   - Non-HTTP traffic
   - Native code communication
   - Custom encryption
   - Alternative transport protocols

```javascript
// Example: Frida script to bypass SSL pinning on Android

Java.perform(function() {
    console.log('[+] SSL Pinning Bypass Script Loaded');
    
    // Bypass OkHttp3 CertificatePinner
    try {
        var CertificatePinner = Java.use('okhttp3.CertificatePinner');
        CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function(hostname, certificateChain) {
            console.log('[+] OkHttp3 CertificatePinner.check() bypassed for ' + hostname);
            return;
        };
        console.log('[+] OkHttp3 CertificatePinner.check() hooked');
    } catch(err) {
        console.log('[-] OkHttp3 CertificatePinner.check() not found');
    }
    
    // Bypass TrustManager (Android default SSL validation)
    try {
        var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');
        TrustManagerImpl.verifyChain.implementation = function(untrustedChain, trustAnchorChain, host, clientAuth, ocspData, tlsSctData) {
            console.log('[+] TrustManagerImpl.verifyChain() bypassed for ' + host);
            return untrustedChain;
        };
        console.log('[+] TrustManagerImpl.verifyChain() hooked');
    } catch(err) {
        console.log('[-] TrustManagerImpl.verifyChain() not found');
    }
    
    // Bypass custom X509TrustManager implementations
    var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');
    var SSLContext = Java.use('javax.net.ssl.SSLContext');
    
    // TrustManager implementation with no certificate validation
    var TrustManager = Java.registerClass({
        name: 'com.example.FridaTrustManager',
        implements: [X509TrustManager],
        methods: {
            checkClientTrusted: function(chain, authType) {},
            checkServerTrusted: function(chain, authType) {},
            getAcceptedIssuers: function() { return []; }
        }
    });
    
    // Create a new SSLContext using our custom TrustManager
    var TrustManagers = [TrustManager.$new()];
    var SSLContext_init = SSLContext.init.overload(
        '[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom'
    );
    
    // Override SSLContext.init to use our custom TrustManager
    SSLContext_init.implementation = function(keyManager, trustManager, secureRandom) {
        console.log('[+] Overriding SSLContext.init() with custom TrustManager');
        SSLContext_init.call(this, keyManager, TrustManagers, secureRandom);
    };
    
    console.log('[+] SSL Pinning bypass complete');
});
```

> **Hands-on Exercise:** Set up a complete mobile testing environment for either Android or iOS (based on your available resources). Configure an emulator/simulator, install the necessary tools, and set up a proxy for intercepting traffic. Install a test application and verify that you can intercept its traffic. If the application implements certificate pinning, use Frida or Objection to bypass it. Document your setup process and any challenges encountered.

## 3. Static Analysis of Mobile Applications

### 3.1 Application Reconnaissance

Gathering information about the target application:

1. **Application Metadata**:
   - Package name and version
   - Minimum and target SDK versions
   - Permissions requested
   - Components and entry points
   - Libraries and dependencies

2. **Application Extraction**:
   - Obtaining APK files (Android)
   - Obtaining IPA files (iOS)
   - App store metadata
   - Developer information
   - Application description and functionality

3. **Initial Analysis Tools**:
   - APKTool (Android)
   - IPA Installer (iOS)
   - MobSF (Mobile Security Framework)
   - APK Analyzer
   - App Store analysis tools

```bash
# Example: Android application reconnaissance

# Step 1: Download the APK
# Option 1: From device
adb shell pm list packages | grep target.package.name
adb shell pm path target.package.name
adb pull /data/app/target.package.name-1/base.apk target.apk

# Option 2: From app store using APKPure, APKMirror, etc.

# Step 2: Basic APK analysis
aapt dump badging target.apk

# Step 3: Extract APK contents
apktool d target.apk -o target_extracted

# Step 4: Analyze AndroidManifest.xml
cat target_extracted/AndroidManifest.xml

# Step 5: Check permissions
grep -r "uses-permission" target_extracted/AndroidManifest.xml

# Step 6: Identify activities and entry points
grep -r "activity" target_extracted/AndroidManifest.xml

# Step 7: Find services and receivers
grep -r "service\|receiver" target_extracted/AndroidManifest.xml

# Step 8: Check for content providers
grep -r "provider" target_extracted/AndroidManifest.xml

# Step 9: Identify libraries
ls -la target_extracted/lib/

# Step 10: Convert DEX to JAR for Java code analysis
d2j-dex2jar target.apk -o target.jar

# Step 11: Use automated tools
# MobSF
docker pull opensecurity/mobile-security-framework-mobsf
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf
# Access MobSF at http://localhost:8000 and upload the APK
```

### 3.2 Code Analysis

Analyzing the application's code for security vulnerabilities:

1. **Decompilation and Disassembly**:
   - Java/Kotlin decompilation (Android)
   - Objective-C/Swift disassembly (iOS)
   - Smali code analysis (Android)
   - Native code analysis

2. **Common Code Vulnerabilities**:
   - Hardcoded credentials
   - Insecure cryptographic implementations
   - Weak random number generation
   - Excessive logging
   - Insecure WebView configurations

3. **Code Analysis Tools**:
   - JD-GUI, JADX (Android)
   - Hopper, IDA Pro (iOS)
   - MobSF
   - Ghidra
   - Android Studio, Xcode

```java
// Example: Android code vulnerabilities to look for

// Hardcoded credentials
private static final String API_KEY = "1234567890abcdef";
private static final String USERNAME = "admin";
private static final String PASSWORD = "P@ssw0rd";

// Insecure cryptographic implementations
// Weak encryption (ECB mode)
Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
cipher.init(Cipher.ENCRYPT_MODE, secretKey);

// Hardcoded encryption key
byte[] key = "ThisIsAHardcodedEncryptionKey".getBytes();
SecretKeySpec secretKey = new SecretKeySpec(key, "AES");

// Insecure random number generation
Random random = new Random();  // Predictable sequence
int randomValue = random.nextInt();

// Excessive logging of sensitive information
Log.d("AUTH", "User logged in with password: " + password);
Log.i("PAYMENT", "Credit card number: " + ccNumber);

// Insecure WebView configuration
WebView webView = findViewById(R.id.webView);
webView.setJavaScriptEnabled(true);
webView.addJavascriptInterface(new JavaScriptInterface(), "Android");
webView.setAllowFileAccess(true);

// Insecure file permissions
File file = new File(getExternalFilesDir(null), "sensitive_data.txt");
FileOutputStream fos = new FileOutputStream(file);
fos.write(sensitiveData.getBytes());
fos.close();

// Insecure content provider
<provider
    android:name=".DataProvider"
    android:authorities="com.example.app.provider"
    android:exported="true" />

// Insecure broadcast receiver
<receiver
    android:name=".SensitiveReceiver"
    android:exported="true">
    <intent-filter>
        <action android:name="com.example.SENSITIVE_ACTION" />
    </intent-filter>
</receiver>
```

### 3.3 Manifest and Permission Analysis

Analyzing the application's manifest and permissions:

1. **Android Manifest Analysis**:
   - Exported components
   - Intent filters
   - Permission declarations
   - Protection levels
   - Backup settings
   - Debuggable flag

2. **iOS Info.plist Analysis**:
   - URL schemes
   - Background modes
   - Permission usage descriptions
   - App Transport Security settings
   - Entitlements

3. **Permission Risk Assessment**:
   - Dangerous permissions
   - Permission combinations
   - Overprivileged applications
   - Permission usage context
   - Runtime permissions

```xml
<!-- Example: Android manifest security issues to look for -->

<!-- Debuggable application -->
<application
    android:debuggable="true"
    ... >

<!-- Backup enabled (potentially exposing sensitive data) -->
<application
    android:allowBackup="true"
    android:fullBackupContent="true"
    ... >

<!-- Exported activities without permissions -->
<activity
    android:name=".SensitiveActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
</activity>

<!-- Exported services without permissions -->
<service
    android:name=".SensitiveService"
    android:exported="true" />

<!-- Exported content providers without permissions -->
<provider
    android:name=".SensitiveProvider"
    android:authorities="com.example.app.provider"
    android:exported="true" />

<!-- Exported broadcast receivers without permissions -->
<receiver
    android:name=".SensitiveReceiver"
    android:exported="true">
    <intent-filter>
        <action android:name="com.example.SENSITIVE_ACTION" />
    </intent-filter>
</receiver>

<!-- Dangerous permission combinations -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.SEND_SMS" />
```

> **Knowledge Check:** What are the most critical security issues to look for during static analysis of mobile applications? How do these issues differ between Android and iOS platforms?

## 4. Dynamic Analysis and Runtime Manipulation

### 4.1 Runtime Analysis

Analyzing the application during execution:

1. **Application Monitoring**:
   - Process monitoring
   - Network traffic analysis
   - File system access
   - API calls
   - Inter-process communication

2. **Runtime Analysis Tools**:
   - Frida
   - Objection
   - Drozer (Android)
   - Cycript (iOS)
   - Dynamic instrumentation frameworks

3. **Behavioral Analysis**:
   - User input handling
   - Authentication flows
   - Session management
   - Permission usage
   - Data processing

```bash
# Example: Runtime analysis with Frida and Objection

# Step 1: Install Frida server on the device
# For Android:
adb push frida-server /data/local/tmp/
adb shell "chmod 755 /data/local/tmp/frida-server"
adb shell "/data/local/tmp/frida-server &"

# Step 2: Verify Frida connection
frida-ps -U

# Step 3: Basic application monitoring with Frida
frida -U -l monitor.js com.example.app

# Content of monitor.js:
/*
setTimeout(function() {
    Java.perform(function() {
        console.log("[*] Starting application monitoring...");
        
        // Monitor file access
        var FileInputStream = Java.use("java.io.FileInputStream");
        FileInputStream.$init.overload("java.lang.String").implementation = function(path) {
            console.log("[+] FileInputStream: " + path);
            return this.$init(path);
        };
        
        // Monitor SharedPreferences
        var SharedPreferencesImpl = Java.use("android.app.SharedPreferencesImpl");
        SharedPreferencesImpl.getString.implementation = function(key, defValue) {
            var value = this.getString(key, defValue);
            console.log("[+] SharedPreferences.getString: " + key + " = " + value);
            return value;
        };
        
        // Monitor HTTP requests
        var URL = Java.use("java.net.URL");
        URL.openConnection.implementation = function() {
            console.log("[+] Opening URL: " + this.toString());
            return this.openConnection();
        };
        
        // Monitor crypto operations
        var Cipher = Java.use("javax.crypto.Cipher");
        Cipher.doFinal.overload("[B").implementation = function(data) {
            console.log("[+] Cipher.doFinal called");
            console.log("[+] Algorithm: " + this.getAlgorithm());
            console.log("[+] Mode: " + this.getParameters().getMode());
            return this.doFinal(data);
        };
    });
}, 0);
*/

# Step 4: Using Objection for runtime analysis
objection -g com.example.app explore

# Step 5: Explore application with Objection
# List activities
android hooking list activities

# List services
android hooking list services

# List broadcast receivers
android hooking list receivers

# Monitor file system access
android hooking watch file /data/data/com.example.app

# Monitor clipboard
android hooking watch clipboard

# Dump keystore
android keystore list

# Search for sensitive information in memory
memory search --string "password" --dump-all

# Step 6: Analyze SQLite databases
sqlite connect /data/data/com.example.app/databases/app.db
sqlite .tables
sqlite .schema users
sqlite select * from users
```

### 4.2 Method Hooking and Code Injection

Manipulating application behavior at runtime:

1. **Method Hooking Techniques**:
   - Function interception
   - Return value modification
   - Parameter manipulation
   - Exception handling
   - Native library hooking

2. **Code Injection**:
   - Loading custom scripts
   - In-memory patching
   - Dynamic library loading
   - Java/Objective-C runtime manipulation
   - Native code injection

3. **Hooking Frameworks**:
   - Frida
   - Xposed (Android)
   - Substrate (iOS)
   - ADBI (Android Dynamic Binary Instrumentation)
   - Introspy

```javascript
// Example: Frida script for method hooking and manipulation

Java.perform(function() {
    console.log("[*] Starting method hooking...");
    
    // Hook login function
    var LoginManager = Java.use("com.example.app.LoginManager");
    
    // Hook isValidCredentials method
    LoginManager.isValidCredentials.implementation = function(username, password) {
        console.log("[+] Login attempt detected");
        console.log("[+] Username: " + username);
        console.log("[+] Password: " + password);
        
        // Call the original method
        var result = this.isValidCredentials(username, password);
        console.log("[+] Original result: " + result);
        
        // Modify the result to bypass authentication
        console.log("[+] Bypassing authentication...");
        return true;
    };
    
    // Hook encryption method
    var CryptoUtil = Java.use("com.example.app.CryptoUtil");
    
    // Hook encrypt method
    CryptoUtil.encrypt.overload("java.lang.String", "java.lang.String").implementation = function(plaintext, key) {
        console.log("[+] Encryption detected");
        console.log("[+] Plaintext: " + plaintext);
        console.log("[+] Key: " + key);
        
        // Call the original method
        var result = this.encrypt(plaintext, key);
        console.log("[+] Encrypted result: " + result);
        
        return result;
    };
    
    // Hook decryption method
    CryptoUtil.decrypt.overload("java.lang.String", "java.lang.String").implementation = function(ciphertext, key) {
        console.log("[+] Decryption detected");
        console.log("[+] Ciphertext: " + ciphertext);
        console.log("[+] Key: " + key);
        
        // Call the original method
        var result = this.decrypt(ciphertext, key);
        console.log("[+] Decrypted result: " + result);
        
        return result;
    };
    
    // Hook biometric authentication
    var BiometricManager = Java.use("androidx.biometric.BiometricManager");
    BiometricManager.canAuthenticate.implementation = function() {
        console.log("[+] Biometric authentication check bypassed");
        return 0; // BIOMETRIC_SUCCESS
    };
    
    // Hook root detection
    var RootDetector = Java.use("com.example.app.security.RootDetector");
    RootDetector.isDeviceRooted.implementation = function() {
        console.log("[+] Root detection bypassed");
        return false;
    };
    
    console.log("[*] Method hooking complete");
});
```

### 4.3 Instrumentation Attacks

Using instrumentation to manipulate application behavior:

1. **UI Automation**:
   - Simulating user input
   - Screen scraping
   - UI element manipulation
   - Gesture simulation
   - Accessibility service abuse

2. **Intent Manipulation**:
   - Intent interception
   - Intent spoofing
   - Broadcast injection
   - Activity hijacking
   - Service manipulation

3. **IPC Manipulation**:
   - Binder interception
   - Content provider manipulation
   - Shared memory access
   - Socket interception
   - Custom protocol manipulation

```bash
# Example: Android intent manipulation with ADB

# Step 1: List exported activities
adb shell pm list packages -f | grep target.package.name
adb shell dumpsys package target.package.name | grep -A10 "Activity"

# Step 2: Launch an exported activity directly
adb shell am start -n target.package.name/target.package.name.ExportedActivity

# Step 3: Send broadcast to an exported receiver
adb shell am broadcast -a com.example.CUSTOM_ACTION --es "data" "test_value" -n target.package.name/target.package.name.ExportedReceiver

# Step 4: Start an exported service
adb shell am startservice -n target.package.name/target.package.name.ExportedService

# Step 5: Query an exported content provider
adb shell content query --uri content://target.package.name.provider/data

# Step 6: Insert data into an exported content provider
adb shell content insert --uri content://target.package.name.provider/data --bind name:s:test --bind value:s:test_value

# Step 7: Using Drozer for more advanced intent manipulation
# Start Drozer server on device
adb forward tcp:31415 tcp:31415
# Start Drozer client
drozer console connect

# List attack surface
run app.package.attacksurface target.package.name

# List activities
run app.activity.info -a target.package.name

# Start activity
run app.activity.start --component target.package.name target.package.name.ExportedActivity

# Interact with content provider
run app.provider.query content://target.package.name.provider/data
```

> **Hands-on Exercise:** Choose a mobile application (preferably one with authentication) and perform runtime analysis using Frida or Objection. Hook into the authentication mechanism to bypass it, and monitor sensitive API calls such as cryptographic operations or file system access. Document your findings, including the methods you hooked, the data you were able to intercept, and how the application's security could be improved to prevent such attacks.

## 5. Common Mobile Vulnerabilities

### 5.1 Insecure Data Storage

Identifying vulnerabilities in how applications store sensitive data:

1. **Local Storage Locations**:
   - Shared Preferences (Android)
   - UserDefaults (iOS)
   - SQLite databases
   - Internal/external storage
   - Cache files

2. **Common Storage Vulnerabilities**:
   - Unencrypted sensitive data
   - Weak encryption implementations
   - Hardcoded encryption keys
   - Insecure file permissions
   - Backup vulnerabilities

3. **Testing Data Storage Security**:
   - File system analysis
   - Database inspection
   - Preference file examination
   - Backup file analysis
   - Cache inspection

```bash
# Example: Testing for insecure data storage on Android

# Step 1: Examine shared preferences
adb shell "run-as target.package.name cat /data/data/target.package.name/shared_prefs/preferences.xml"

# Step 2: Examine SQLite databases
adb shell "run-as target.package.name ls -la /data/data/target.package.name/databases/"
adb shell "run-as target.package.name sqlite3 /data/data/target.package.name/databases/app.db .tables"
adb shell "run-as target.package.name sqlite3 /data/data/target.package.name/databases/app.db 'SELECT * FROM users;'"

# Step 3: Check files in internal storage
adb shell "run-as target.package.name ls -la /data/data/target.package.name/files/"
adb shell "run-as target.package.name cat /data/data/target.package.name/files/config.txt"

# Step 4: Check external storage
adb shell "ls -la /sdcard/Android/data/target.package.name/"

# Step 5: Examine cache files
adb shell "run-as target.package.name ls -la /data/data/target.package.name/cache/"

# Step 6: Create and analyze backup (if allowed)
adb backup -f backup.ab target.package.name
# Convert backup to tar
( printf "\x1f\x8b\x08\x00\x00\x00\x00\x00" ; tail -c +25 backup.ab ) | tar xvf -

# Step 7: Using Objection for storage analysis
objection -g target.package.name explore

# List files in app data directory
ls /data/data/target.package.name

# Search for sensitive information
android hooking search classes --pattern "password"
android hooking search classes --pattern "credit"
android hooking search classes --pattern "token"

# Dump shared preferences
android hooking get shared_preferences

# Dump SQLite databases
sqlite connect /data/data/target.package.name/databases/app.db
sqlite .tables
sqlite .schema users
sqlite select * from users
```

### 5.2 Insecure Communication

Identifying vulnerabilities in network communications:

1. **Transport Layer Security Issues**:
   - Missing TLS/SSL
   - Weak cipher suites
   - Invalid certificates
   - Certificate validation issues
   - SSL pinning implementation flaws

2. **API Communication Vulnerabilities**:
   - Insecure API endpoints
   - Sensitive data in requests
   - Lack of API authentication
   - Insecure session management
   - Excessive data exposure

3. **Testing Communication Security**:
   - Proxy interception
   - Traffic analysis
   - Certificate validation testing
   - API endpoint testing
   - Man-in-the-middle attacks

```bash
# Example: Testing for insecure communication

# Step 1: Set up proxy interception (Burp Suite or OWASP ZAP)
# Configure device to use proxy

# Step 2: Bypass SSL pinning if necessary
# Using Frida script from earlier section

# Step 3: Capture and analyze HTTP traffic
# Look for:
# - Unencrypted HTTP connections
# - Sensitive data in requests/responses
# - Authentication tokens
# - Personal information

# Step 4: Test certificate validation
# Create self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Configure Burp Suite to use custom certificate
# If the app accepts the invalid certificate, it has improper validation

# Step 5: Test for sensitive data in requests
# Look for:
# - Passwords in POST bodies
# - API keys in headers
# - Session tokens
# - Personal information

# Step 6: Test API authentication
# Try accessing API endpoints without authentication
# Try using expired tokens
# Try manipulating tokens

# Step 7: Using Objection to monitor network traffic
objection -g target.package.name explore

# Monitor network connectivity
android network monitor

# Dump outgoing HTTP requests
android hooking watch class_method okhttp3.Request$Builder.build --dump-args --dump-return
android hooking watch class_method java.net.URL.openConnection --dump-args --dump-return
```

### 5.3 Authentication and Authorization Flaws

Identifying vulnerabilities in authentication and authorization mechanisms:

1. **Authentication Vulnerabilities**:
   - Weak password policies
   - Insecure biometric implementation
   - Token-based authentication flaws
   - Session handling issues
   - Multi-factor authentication bypasses

2. **Authorization Vulnerabilities**:
   - Insufficient authorization checks
   - Vertical privilege escalation
   - Horizontal privilege escalation
   - Intent redirection
   - Insecure deeplinks

3. **Testing Authentication and Authorization**:
   - Authentication bypass attempts
   - Session token analysis
   - Authorization check testing
   - Intent manipulation
   - Deeplink testing

```javascript
// Example: Frida script for testing authentication and authorization

Java.perform(function() {
    console.log("[*] Testing authentication and authorization...");
    
    // Bypass login screen
    var LoginActivity = Java.use("com.example.app.LoginActivity");
    LoginActivity.verifyCredentials.implementation = function(username, password) {
        console.log("[+] Login bypass attempted");
        console.log("[+] Username: " + username);
        console.log("[+] Password: " + password);
        
        // Bypass authentication
        return true;
    };
    
    // Bypass biometric authentication
    var BiometricPrompt = Java.use("androidx.biometric.BiometricPrompt");
    BiometricPrompt.authenticate.overload().implementation = function() {
        console.log("[+] Biometric authentication bypassed");
        
        // Get the authentication callback
        var callback = this.mAuthenticationCallback.value;
        
        // Create a successful authentication result
        var AuthenticationResult = Java.use("androidx.biometric.BiometricPrompt$AuthenticationResult");
        var CryptoObject = Java.use("androidx.biometric.BiometricPrompt$CryptoObject");
        var crypto = CryptoObject.$new(null);
        var result = AuthenticationResult.$new(crypto, null, 0);
        
        // Call the success method
        callback.onAuthenticationSucceeded(result);
        
        return;
    };
    
    // Test for authorization checks
    var UserManager = Java.use("com.example.app.UserManager");
    UserManager.isAdmin.implementation = function() {
        console.log("[+] Admin check bypassed");
        return true;
    };
    
    UserManager.hasPermission.implementation = function(permission) {
        console.log("[+] Permission check bypassed for: " + permission);
        return true;
    };
    
    // Monitor intent handling for deeplink vulnerabilities
    var Intent = Java.use("android.content.Intent");
    Intent.parseUri.implementation = function(uri, flags) {
        console.log("[+] Intent parsed from URI: " + uri);
        return this.parseUri(uri, flags);
    };
    
    var Activity = Java.use("android.app.Activity");
    Activity.startActivity.overload("android.content.Intent").implementation = function(intent) {
        console.log("[+] Activity started with intent");
        console.log("[+] Action: " + intent.getAction());
        console.log("[+] Data: " + intent.getDataString());
        
        var extras = intent.getExtras();
        if (extras) {
            var keys = extras.keySet();
            var iterator = keys.iterator();
            while (iterator.hasNext()) {
                var key = iterator.next();
                console.log("[+] Extra: " + key + " = " + extras.get(key));
            }
        }
        
        return this.startActivity(intent);
    };
    
    console.log("[*] Authentication and authorization testing complete");
});
```

### 5.4 Code Quality and Platform Issues

Identifying vulnerabilities related to code quality and platform-specific issues:

1. **Code Quality Vulnerabilities**:
   - Insecure coding practices
   - Improper error handling
   - Race conditions
   - Memory corruption
   - Input validation issues

2. **Platform-Specific Issues**:
   - WebView vulnerabilities
   - Custom URL scheme abuse
   - Clipboard vulnerabilities
   - Accessibility service abuse
   - Broadcast receiver vulnerabilities

3. **Testing Code Quality and Platform Issues**:
   - Fuzzing inputs
   - Error triggering
   - WebView configuration testing
   - URL scheme testing
   - Component interaction testing

```bash
# Example: Testing WebView vulnerabilities

# Step 1: Identify WebView usage in the application
grep -r "WebView" target_extracted/

# Step 2: Check for JavaScript enabled in WebViews
grep -r "setJavaScriptEnabled" target_extracted/

# Step 3: Check for JavaScript interfaces
grep -r "addJavascriptInterface" target_extracted/

# Step 4: Check for file access in WebViews
grep -r "setAllowFileAccess" target_extracted/

# Step 5: Using Frida to monitor WebView usage
frida -U -l webview_monitor.js target.package.name

# Content of webview_monitor.js:
/*
Java.perform(function() {
    console.log("[*] Monitoring WebView usage...");
    
    // Monitor WebView creation
    var WebView = Java.use("android.webkit.WebView");
    
    WebView.$init.overload("android.content.Context").implementation = function(context) {
        console.log("[+] WebView created");
        return this.$init(context);
    };
    
    // Monitor JavaScript enabling
    WebView.setJavaScriptEnabled.implementation = function(enabled) {
        console.log("[+] setJavaScriptEnabled: " + enabled);
        return this.setJavaScriptEnabled(enabled);
    };
    
    // Monitor JavaScript interfaces
    WebView.addJavascriptInterface.implementation = function(obj, name) {
        console.log("[+] addJavascriptInterface: " + name);
        console.log("[+] Interface class: " + obj.$className);
        return this.addJavascriptInterface(obj, name);
    };
    
    // Monitor file access settings
    WebView.setAllowFileAccess.implementation = function(allow) {
        console.log("[+] setAllowFileAccess: " + allow);
        return this.setAllowFileAccess(allow);
    };
    
    // Monitor URL loading
    WebView.loadUrl.overload("java.lang.String").implementation = function(url) {
        console.log("[+] WebView loading URL: " + url);
        return this.loadUrl(url);
    };
    
    // Monitor data loading
    WebView.loadData.implementation = function(data, mimeType, encoding) {
        console.log("[+] WebView loading data");
        console.log("[+] MIME type: " + mimeType);
        console.log("[+] Data: " + data.substring(0, 100) + "...");
        return this.loadData(data, mimeType, encoding);
    };
});
*/

# Step 6: Test custom URL schemes
# Find URL schemes in the manifest
grep -r "android:scheme" target_extracted/

# Test URL scheme handling
adb shell am start -a android.intent.action.VIEW -d "customscheme://test?param=value"

# Step 7: Test for clipboard vulnerabilities
# Using Objection
objection -g target.package.name explore
android hooking watch clipboard

# Step 8: Test for broadcast receiver vulnerabilities
# Find exported receivers
grep -r "receiver.*exported=\"true\"" target_extracted/AndroidManifest.xml

# Send broadcast to receiver
adb shell am broadcast -a com.example.CUSTOM_ACTION --es "data" "test_value" -n target.package.name/target.package.name.ExportedReceiver
```

> **Knowledge Check:** What are the most common security vulnerabilities found in mobile applications? How do these vulnerabilities compare to those found in web applications, and what unique mobile-specific issues should security testers be aware of?

## 6. Advanced Mobile Security Testing

### 6.1 Reverse Engineering Protection Bypass

Bypassing anti-reverse engineering protections:

1. **Common Protection Mechanisms**:
   - Code obfuscation
   - Anti-debugging techniques
   - Root/jailbreak detection
   - Emulator detection
   - Integrity checks

2. **Bypassing Techniques**:
   - Hooking detection functions
   - Patching binaries
   - Memory manipulation
   - Emulator environment hiding
   - Native library hooking

3. **Tools for Bypassing Protections**:
   - Frida
   - Objection
   - Substrate
   - Binary patching tools
   - Custom scripts

```javascript
// Example: Frida script to bypass common protection mechanisms

Java.perform(function() {
    console.log("[*] Bypassing protection mechanisms...");
    
    // Bypass root detection
    var RootDetector = Java.use("com.example.app.security.RootDetector");
    
    // Method 1: Direct boolean return
    RootDetector.isDeviceRooted.implementation = function() {
        console.log("[+] Root detection bypassed");
        return false;
    };
    
    // Method 2: Bypass specific root detection techniques
    RootDetector.checkForSUBinary.implementation = function() {
        console.log("[+] SU binary check bypassed");
        return false;
    };
    
    RootDetector.checkForRootAPK.implementation = function() {
        console.log("[+] Root APK check bypassed");
        return false;
    };
    
    RootDetector.checkForRWPaths.implementation = function() {
        console.log("[+] RW paths check bypassed");
        return false;
    };
    
    // Bypass emulator detection
    var EmulatorDetector = Java.use("com.example.app.security.EmulatorDetector");
    EmulatorDetector.isEmulator.implementation = function() {
        console.log("[+] Emulator detection bypassed");
        return false;
    };
    
    // Bypass debugger detection
    var DebugDetector = Java.use("com.example.app.security.DebugDetector");
    DebugDetector.isBeingDebugged.implementation = function() {
        console.log("[+] Debug detection bypassed");
        return false;
    };
    
    // Bypass tamper detection
    var IntegrityChecker = Java.use("com.example.app.security.IntegrityChecker");
    IntegrityChecker.verifyAppSignature.implementation = function() {
        console.log("[+] Signature verification bypassed");
        return true;
    };
    
    IntegrityChecker.checkAppIntegrity.implementation = function() {
        console.log("[+] Integrity check bypassed");
        return true;
    };
    
    // Bypass SafetyNet attestation
    try {
        var SafetyNetHelper = Java.use("com.google.android.gms.safetynet.SafetyNetApi");
        SafetyNetHelper.attest.implementation = function() {
            console.log("[+] SafetyNet attestation bypassed");
            // This is simplified - would need to create a proper response
            return null;
        };
    } catch(err) {
        console.log("[-] SafetyNet class not found");
    }
    
    // Bypass certificate pinning (if not done earlier)
    try {
        var CertificatePinner = Java.use("okhttp3.CertificatePinner");
        CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function(hostname, certificateChain) {
            console.log("[+] OkHttp3 CertificatePinner.check() bypassed for " + hostname);
            return;
        };
    } catch(err) {
        console.log("[-] OkHttp3 CertificatePinner not found");
    }
    
    console.log("[*] Protection bypasses complete");
});
```

### 6.2 Memory Analysis

Analyzing application memory for sensitive information:

1. **Memory Dumping Techniques**:
   - Process memory dumps
   - Heap analysis
   - Memory scanning
   - Runtime memory inspection
   - Native memory analysis

2. **Memory Analysis Tools**:
   - Frida Memory APIs
   - Objection memory commands
   - DDMS (Android)
   - Memfetch
   - Fridump

3. **Common Memory Vulnerabilities**:
   - Sensitive data in memory
   - Uncleared credentials
   - Encryption keys in memory
   - Session tokens
   - Personal information

```bash
# Example: Memory analysis for sensitive information

# Step 1: Dump process memory with Frida
frida -U -l memory_dump.js target.package.name

# Content of memory_dump.js:
/*
function dumpMemory() {
    console.log("[*] Starting memory dump...");
    
    Java.perform(function() {
        // Get the application context
        var currentApplication = Java.use("android.app.ActivityThread").currentApplication();
        var context = currentApplication.getApplicationContext();
        
        // Get the process ID
        var pid = Process.id;
        console.log("[+] Process ID: " + pid);
        
        // Dump memory ranges
        console.log("[+] Dumping memory ranges...");
        var ranges = Process.enumerateRanges({protection: 'rw-', coalesce: true});
        console.log("[+] Found " + ranges.length + " memory ranges");
        
        // Search for sensitive information in memory
        var patterns = [
            "password",
            "token",
            "secret",
            "api_key",
            "credit_card",
            "username"
        ];
        
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            console.log("[+] Searching range: " + range.base + " - " + range.size + " bytes");
            
            try {
                var memory = Memory.readByteArray(range.base, range.size);
                var memoryStr = Memory.readUtf8String(range.base, range.size);
                
                for (var j = 0; j < patterns.length; j++) {
                    var pattern = patterns[j];
                    if (memoryStr && memoryStr.indexOf(pattern) !== -1) {
                        console.log("[!] Found pattern '" + pattern + "' in memory range " + range.base);
                        
                        // Extract context around the pattern
                        var index = memoryStr.indexOf(pattern);
                        var start = Math.max(0, index - 50);
                        var end = Math.min(memoryStr.length, index + pattern.length + 50);
                        var context = memoryStr.substring(start, end);
                        
                        console.log("[!] Context: " + context);
                    }
                }
            } catch (e) {
                console.log("[-] Error reading memory range: " + e);
            }
        }
    });
}

// Wait for the application to initialize
setTimeout(dumpMemory, 5000);
*/

# Step 2: Using Objection for memory analysis
objection -g target.package.name explore

# Search for patterns in memory
memory search --string "password" --dump-all
memory search --string "token" --dump-all
memory search --string "credit" --dump-all

# Dump specific memory address
memory dump from_base 0x12345678 size 4096 output dump.bin

# Step 3: Using Fridump to dump process memory
python fridump.py -U -s target.package.name

# Step 4: Analyze the memory dump
strings dump.bin | grep -i password
strings dump.bin | grep -i token
strings dump.bin | grep -i secret
strings dump.bin | grep -i credit
```

### 6.3 Native Code Analysis

Analyzing and testing native code components:

1. **Native Library Analysis**:
   - Identifying native libraries
   - Disassembling native code
   - Identifying vulnerabilities
   - Native API usage
   - JNI implementation analysis

2. **Native Code Vulnerabilities**:
   - Buffer overflows
   - Format string vulnerabilities
   - Use-after-free
   - Integer overflows
   - Memory corruption

3. **Native Code Analysis Tools**:
   - IDA Pro
   - Ghidra
   - Radare2
   - Binary Ninja
   - Frida for native hooking

```bash
# Example: Native code analysis

# Step 1: Extract native libraries
mkdir -p native_libs
adb pull /data/app/target.package.name-1/lib/arm64/ native_libs/

# Step 2: Identify native libraries in the APK
unzip -l target.apk | grep "\.so"

# Step 3: Extract native libraries from the APK
unzip target.apk "lib/*/*.so" -d native_libs_from_apk

# Step 4: Basic analysis with strings
strings native_libs/libexample.so | grep -i password
strings native_libs/libexample.so | grep -i key
strings native_libs/libexample.so | grep -i encrypt

# Step 5: Identify exported functions
nm -D native_libs/libexample.so

# Step 6: Disassemble with objdump
objdump -d native_libs/libexample.so > libexample.disasm

# Step 7: Using Frida for native library hooking
frida -U -l native_hooks.js target.package.name

# Content of native_hooks.js:
/*
Interceptor.attach(Module.findExportByName("libexample.so", "Java_com_example_app_NativeLib_encrypt"), {
    onEnter: function(args) {
        console.log("[+] Native encrypt function called");
        
        // args[0] is the JNIEnv pointer
        // args[1] is the jclass or jobject pointer
        // args[2] is the first actual parameter
        
        // For a method like:
        // Java_com_example_app_NativeLib_encrypt(JNIEnv *env, jobject thiz, jstring plaintext, jstring key)
        
        var plaintext = Java.vm.getEnv().getStringUtfChars(args[2], null).readUtf8String();
        var key = Java.vm.getEnv().getStringUtfChars(args[3], null).readUtf8String();
        
        console.log("[+] Plaintext: " + plaintext);
        console.log("[+] Key: " + key);
    },
    onLeave: function(retval) {
        // For a method returning jstring
        var result = Java.vm.getEnv().getStringUtfChars(retval, null).readUtf8String();
        console.log("[+] Encrypted result: " + result);
    }
});

Interceptor.attach(Module.findExportByName("libexample.so", "Java_com_example_app_NativeLib_decrypt"), {
    onEnter: function(args) {
        console.log("[+] Native decrypt function called");
        
        var ciphertext = Java.vm.getEnv().getStringUtfChars(args[2], null).readUtf8String();
        var key = Java.vm.getEnv().getStringUtfChars(args[3], null).readUtf8String();
        
        console.log("[+] Ciphertext: " + ciphertext);
        console.log("[+] Key: " + key);
    },
    onLeave: function(retval) {
        var result = Java.vm.getEnv().getStringUtfChars(retval, null).readUtf8String();
        console.log("[+] Decrypted result: " + result);
    }
});
*/

# Step 8: Using Ghidra for in-depth analysis
# Launch Ghidra and create a new project
# Import the native library
# Analyze the library
# Look for vulnerable functions like:
# - strcpy, strcat (buffer overflows)
# - sprintf, vsprintf (format string vulnerabilities)
# - malloc/free pairs (use-after-free)
# - integer arithmetic without bounds checking
```

> **Hands-on Exercise:** Choose a mobile application that uses native code (look for .so files in Android or native frameworks in iOS). Extract the native libraries and perform basic analysis using tools like strings, nm, and objdump. Identify exported functions and any potentially sensitive information in the binary. If possible, use Frida to hook into native functions and monitor their inputs and outputs during runtime. Document your findings and explain how the application could better protect its native code components.

## 7. Mobile Application Security Testing Documentation

### 7.1 Vulnerability Documentation

Properly documenting discovered mobile vulnerabilities:

1. **Vulnerability Documentation Components**:
   - Vulnerability description and classification
   - Affected components and versions
   - Technical details and proof of concept
   - Exploitation method and impact
   - Evidence (screenshots, code snippets, logs)

2. **Documentation Best Practices**:
   - Clear, concise descriptions
   - Reproducible steps
   - Evidence-based findings
   - Severity and risk ratings
   - Affected component inventory

3. **Documentation Tools**:
   - Penetration testing frameworks
   - Note-taking applications
   - Screenshot and screen recording tools
   - Mobile-specific reporting templates
   - Vulnerability management platforms

```markdown
# Example: Mobile vulnerability documentation template

## Vulnerability: Insecure Data Storage in Shared Preferences

### Description
The application stores sensitive user information, including authentication tokens and personal data, in Android Shared Preferences without encryption. This data is accessible to any process with the same user ID or to attackers who gain access to a rooted device.

### Affected Components
- Package: com.example.app
- Version: 2.1.4
- Component: UserDataManager.java
- Storage Location: /data/data/com.example.app/shared_prefs/user_prefs.xml

### Technical Details
The application stores the user's authentication token, email address, and payment information in Shared Preferences without encryption. The data is stored in plain text and can be easily extracted from the device.

### Evidence

#### Code Snippet:
```java
SharedPreferences prefs = context.getSharedPreferences("user_prefs", Context.MODE_PRIVATE);
SharedPreferences.Editor editor = prefs.edit();
editor.putString("auth_token", authToken);
editor.putString("email", userEmail);
editor.putString("payment_info", paymentInfo);
editor.apply();
```

#### Extracted Shared Preferences:
```xml
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <string name="auth_token">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</string>
    <string name="email">user@example.com</string>
    <string name="payment_info">4111-1111-1111-1111:123:12/25</string>
</map>
```

#### Command Used:
```bash
adb shell "run-as com.example.app cat /data/data/com.example.app/shared_prefs/user_prefs.xml"
```

[Screenshot of extracted shared preferences]

### Exploitation Method
1. On a rooted device or an application with the same user ID, access the shared preferences file at `/data/data/com.example.app/shared_prefs/user_prefs.xml`
2. Extract the authentication token, email, and payment information
3. Use the authentication token to access the user's account
4. Use the payment information for fraudulent transactions

### Impact
This vulnerability allows attackers with physical access to a rooted device or malicious applications with the same user ID to:
1. Steal authentication tokens and hijack user sessions
2. Access personal information including email addresses
3. Obtain payment information that could be used for fraud
4. Impersonate the user in the application

### Remediation
1. Use Android Keystore System to securely store cryptographic keys
2. Encrypt sensitive data before storing in Shared Preferences
3. Consider using EncryptedSharedPreferences from the AndroidX Security library
4. Implement secure storage alternatives like the Jetpack Security library
5. Validate the integrity of stored data when reading it back

### CVSS Score
CVSS:3.1/AV:P/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N (Base Score: 7.1)
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
# Example: Remediation recommendations for common mobile vulnerabilities

## 1. Insecure Data Storage

### Finding
The application stores sensitive information in plain text in Shared Preferences, SQLite databases, and local files.

### Remediation Steps
1. **High Priority**: Encrypt sensitive data before storage
   ```java
   // Instead of:
   SharedPreferences prefs = context.getSharedPreferences("user_prefs", Context.MODE_PRIVATE);
   prefs.edit().putString("auth_token", authToken).apply();
   
   // Use:
   // 1. Generate and store encryption key securely
   KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
   keyGenerator.init(256);
   SecretKey key = keyGenerator.generateKey();
   
   // Store key in Android Keystore
   KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
   keyStore.load(null);
   KeyStore.SecretKeyEntry secretKeyEntry = new KeyStore.SecretKeyEntry(key);
   keyStore.setEntry("encryption_key", secretKeyEntry, null);
   
   // 2. Encrypt data before storing
   Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
   cipher.init(Cipher.ENCRYPT_MODE, key);
   byte[] encryptedData = cipher.doFinal(authToken.getBytes());
   
   // 3. Store encrypted data
   prefs.edit().putString("auth_token", Base64.encodeToString(encryptedData, Base64.DEFAULT)).apply();
   ```

2. **High Priority**: Use AndroidX Security library for simplified encryption
   ```java
   // Add dependency:
   // implementation "androidx.security:security-crypto:1.1.0-alpha03"
   
   MasterKey masterKey = new MasterKey.Builder(context)
       .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
       .build();
   
   EncryptedSharedPreferences encryptedPrefs = EncryptedSharedPreferences.create(
       context,
       "encrypted_user_prefs",
       masterKey,
       EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
       EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
   );
   
   encryptedPrefs.edit().putString("auth_token", authToken).apply();
   ```

3. **Medium Priority**: Implement secure file storage
   ```java
   // Instead of storing sensitive files directly:
   File file = new File(context.getFilesDir(), "user_data.txt");
   FileOutputStream fos = new FileOutputStream(file);
   fos.write(userData.getBytes());
   
   // Use encrypted file:
   MasterKey masterKey = new MasterKey.Builder(context)
       .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
       .build();
   
   EncryptedFile encryptedFile = new EncryptedFile.Builder(
       context,
       new File(context.getFilesDir(), "encrypted_user_data.txt"),
       masterKey,
       EncryptedFile.FileEncryptionScheme.AES256_GCM_HKDF_4KB
   ).build();
   
   OutputStream outputStream = encryptedFile.openFileOutput();
   outputStream.write(userData.getBytes());
   outputStream.close();
   ```

4. **Medium Priority**: Secure SQLite databases
   ```java
   // Use SQLCipher for database encryption
   // Add dependency:
   // implementation "net.zetetic:android-database-sqlcipher:4.5.0"
   
   SQLiteDatabase database = SQLiteDatabase.openOrCreateDatabase(
       databaseFile,
       "strong_password",
       null
   );
   ```

5. **Verification**: Confirm implementation by examining storage:
   ```bash
   # Check if data is encrypted in shared preferences
   adb shell "run-as com.example.app cat /data/data/com.example.app/shared_prefs/encrypted_user_prefs.xml"
   
   # Check if database is encrypted
   adb shell "run-as com.example.app cat /data/data/com.example.app/databases/app.db | strings | grep -i password"
   ```

## 2. Insecure Communication

### Finding
The application transmits sensitive data over unencrypted connections and has improper certificate validation.

### Remediation Steps
1. **High Priority**: Enforce HTTPS for all network communications
   ```java
   // In Network Security Configuration (res/xml/network_security_config.xml):
   <?xml version="1.0" encoding="utf-8"?>
   <network-security-config>
       <base-config cleartextTrafficPermitted="false">
           <trust-anchors>
               <certificates src="system" />
           </trust-anchors>
       </base-config>
   </network-security-config>
   
   // In AndroidManifest.xml:
   <application
       android:networkSecurityConfig="@xml/network_security_config"
       ...>
   ```

2. **High Priority**: Implement proper certificate validation
   ```java
   // Instead of disabling hostname verification:
   HostnameVerifier hostnameVerifier = new HostnameVerifier() {
       @Override
       public boolean verify(String hostname, SSLSession session) {
           return true; // UNSAFE
       }
   };
   
   // Use proper validation:
   HostnameVerifier hostnameVerifier = HttpsURLConnection.getDefaultHostnameVerifier();
   ```

3. **High Priority**: Implement certificate pinning
   ```java
   // Using OkHttp:
   String hostname = "example.com";
   CertificatePinner certificatePinner = new CertificatePinner.Builder()
       .add(hostname, "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
       .add(hostname, "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=")
       .build();
   
   OkHttpClient client = new OkHttpClient.Builder()
       .certificatePinner(certificatePinner)
       .build();
   ```

4. **Medium Priority**: Implement TLS configuration best practices
   ```java
   // Specify secure TLS versions and cipher suites
   SSLContext sslContext = SSLContext.getInstance("TLSv1.2");
   sslContext.init(null, null, null);
   
   SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
   
   OkHttpClient client = new OkHttpClient.Builder()
       .sslSocketFactory(sslSocketFactory, (X509TrustManager) trustManagers[0])
       .connectionSpecs(Arrays.asList(
           ConnectionSpec.MODERN_TLS,
           ConnectionSpec.COMPATIBLE_TLS
       ))
       .build();
   ```

5. **Verification**: Test secure communication implementation:
   ```bash
   # Check for cleartext traffic
   mitmproxy -p 8080
   
   # Test certificate validation
   openssl s_server -cert invalid.pem -key invalid.key -accept 8443
   
   # Test certificate pinning
   Burp Suite with valid CA certificate
   ```

## 3. Insufficient Authentication and Authorization

### Finding
The application has weak authentication mechanisms and insufficient authorization checks.

### Remediation Steps
1. **High Priority**: Implement strong authentication
   ```java
   // Add biometric authentication
   BiometricPrompt.PromptInfo promptInfo = new BiometricPrompt.PromptInfo.Builder()
       .setTitle("Biometric Authentication")
       .setSubtitle("Log in using your biometric credential")
       .setNegativeButtonText("Cancel")
       .build();
   
   BiometricPrompt biometricPrompt = new BiometricPrompt(activity,
       executor,
       new BiometricPrompt.AuthenticationCallback() {
           @Override
           public void onAuthenticationSucceeded(BiometricPrompt.AuthenticationResult result) {
               // Proceed with authenticated action
           }
       });
   
   biometricPrompt.authenticate(promptInfo);
   ```

2. **High Priority**: Implement proper authorization checks
   ```java
   // Instead of:
   public void performAdminAction() {
       // No authorization check
       // Perform admin action
   }
   
   // Use:
   public void performAdminAction() {
       if (!userManager.isUserAdmin()) {
           throw new SecurityException("User is not authorized to perform this action");
       }
       // Perform admin action
   }
   ```

3. **Medium Priority**: Implement secure session management
   ```java
   // Store tokens securely
   KeyStore keyStore = KeyStore.getInstance("AndroidKeyStore");
   keyStore.load(null);
   
   KeyGenerator keyGenerator = KeyGenerator.getInstance(
       KeyProperties.KEY_ALGORITHM_AES,
       "AndroidKeyStore"
   );
   
   keyGenerator.init(new KeyGenParameterSpec.Builder(
       "token_encryption_key",
       KeyProperties.PURPOSE_ENCRYPT | KeyProperties.PURPOSE_DECRYPT)
       .setBlockModes(KeyProperties.BLOCK_MODE_GCM)
       .setEncryptionPaddings(KeyProperties.ENCRYPTION_PADDING_NONE)
       .build());
   
   SecretKey secretKey = keyGenerator.generateKey();
   
   // Encrypt token
   Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
   cipher.init(Cipher.ENCRYPT_MODE, secretKey);
   byte[] encryptedToken = cipher.doFinal(authToken.getBytes());
   
   // Store IV for decryption
   byte[] iv = cipher.getIV();
   ```

4. **Medium Priority**: Implement secure deeplink handling
   ```java
   // Validate deeplink parameters
   Uri uri = getIntent().getData();
   if (uri != null) {
       String scheme = uri.getScheme();
       String host = uri.getHost();
       
       // Validate scheme and host
       if (!"example".equals(scheme) || !"app".equals(host)) {
           Log.e(TAG, "Invalid deeplink: " + uri.toString());
           finish();
           return;
       }
       
       // Validate and sanitize parameters
       String id = uri.getQueryParameter("id");
       if (id != null) {
           // Validate id format
           if (!id.matches("[a-zA-Z0-9]+")) {
               Log.e(TAG, "Invalid id parameter: " + id);
               finish();
               return;
           }
       }
   }
   ```

5. **Verification**: Test authentication and authorization:
   ```bash
   # Test authentication bypass
   # Attempt to access protected resources without authentication
   
   # Test authorization bypass
   # Attempt to access admin functions as regular user
   
   # Test session management
   # Attempt to use expired tokens
   ```
```

### 7.3 Mobile Application Penetration Testing Reports

Creating comprehensive mobile application penetration testing reports:

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
# Example: Mobile Application Penetration Test Report Structure

# Mobile Application Penetration Test Report
## Application: Example Banking App
## Version: 2.1.4
## Date: March 15, 2023

---

## 1. Executive Summary

### 1.1 Overview
This report presents the findings of a mobile application penetration test conducted for the Example Banking App (version 2.1.4) between March 1-15, 2023. The assessment focused on identifying security vulnerabilities in the Android application, its backend APIs, and associated infrastructure.

### 1.2 Key Findings
- **Critical Risk (2)**: Insecure storage of banking credentials; authentication bypass in biometric implementation
- **High Risk (3)**: Lack of certificate pinning; hardcoded API keys; insufficient authorization checks
- **Medium Risk (5)**: Insecure deeplink handling; excessive permissions; WebView vulnerabilities; weak root detection; sensitive data in logs
- **Low Risk (7)**: Outdated libraries; debuggable application; exported components; insecure random number generation; verbose error messages

### 1.3 Risk Summary Chart
[Insert risk distribution chart]

### 1.4 Recommendation Summary
Immediate actions required:
1. Implement secure storage for banking credentials using Android Keystore and encryption
2. Fix authentication bypass in biometric implementation
3. Implement certificate pinning for all API communications
4. Remove hardcoded API keys and store them securely
5. Implement proper authorization checks for all sensitive operations

---

## 2. Methodology

### 2.1 Approach
The assessment followed the OWASP Mobile Security Testing Guide (MSTG) methodology:
1. Static analysis of the application code
2. Dynamic analysis during runtime
3. Network traffic analysis
4. Data storage analysis
5. Authentication and authorization testing
6. Client-side injection testing
7. Anti-tampering and anti-reverse engineering testing

### 2.2 Tools Used
- Static analysis: APKTool, JADX, MobSF, Android Studio
- Dynamic analysis: Frida, Objection, Drozer
- Traffic analysis: Burp Suite, mitmproxy
- Reverse engineering: IDA Pro, Ghidra
- Device tools: Rooted Android device, Android Emulator

### 2.3 Scope
The assessment covered:
- Android application (version 2.1.4)
- Mobile API endpoints
- Authentication mechanisms
- Local data storage
- Network communications
- Client-side security controls

---

## 3. Detailed Findings

### 3.1 Critical Findings

#### 3.1.1 Insecure Storage of Banking Credentials (Critical)
**Affected Component**: com.example.banking.auth.CredentialManager

**Description**: The application stores banking credentials (account number, PIN, and transaction password) in SharedPreferences without encryption. This data is stored in plain text and can be accessed on rooted devices or by applications with the same user ID.

**Evidence**: [Include screenshot of extracted credentials and code snippet]

**Impact**: An attacker with access to a rooted device or a malicious application with the same user ID could extract banking credentials, potentially leading to unauthorized account access and financial loss.

**Recommendation**: Implement secure storage using the Android Keystore System and encrypt all sensitive data before storing it. Consider using the AndroidX Security library's EncryptedSharedPreferences for simplified implementation.

#### 3.1.2 Authentication Bypass in Biometric Implementation (Critical)
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

### 5.1 Testing Environment
...

### 5.2 Exploitation Proof of Concept
...

### 5.3 OWASP MASVS Coverage
...

### 5.4 Testing Timeline
...
```

> **Knowledge Check:** What are the key components of an effective mobile application penetration testing report? How should findings be prioritized and presented to maximize value for the organization?

## Summary

In this chapter, we've explored mobile application security testing in depth:

- The methodology and approaches for mobile application security testing
- Setting up testing environments for Android and iOS applications
- Static analysis techniques for identifying vulnerabilities in mobile applications
- Dynamic analysis and runtime manipulation methods
- Common mobile application vulnerabilities and their exploitation
- Advanced mobile security testing techniques
- Documentation and reporting best practices for mobile application penetration tests

Mobile application security testing is a critical component of a comprehensive security program. By identifying and addressing mobile vulnerabilities before malicious actors can exploit them, organizations can significantly improve their security posture and reduce the risk of successful attacks.

## Additional Resources

### Books
- "Mobile Application Hacker's Handbook" by Dominic Chell et al.
- "Android Security Internals" by Nikolay Elenkov
- "iOS Application Security" by David Thiel
- "Hacking and Securing iOS Applications" by Jonathan Zdziarski
- "Android Hacker's Handbook" by Joshua J. Drake et al.

### Online Resources
- [OWASP Mobile Security Testing Guide (MSTG)](https://owasp.org/www-project-mobile-security-testing-guide/)
- [OWASP Mobile Application Security Verification Standard (MASVS)](https://owasp.org/www-project-mobile-app-security/)
- [Android Security Guidelines](https://developer.android.com/topic/security/best-practices)
- [iOS Security Guide](https://support.apple.com/guide/security/welcome/web)
- [NowSecure Mobile App Security Blog](https://www.nowsecure.com/blog/)

### Tools
- [MobSF (Mobile Security Framework)](https://github.com/MobSF/Mobile-Security-Framework-MobSF)
- [Frida](https://frida.re/)
- [Objection](https://github.com/sensepost/objection)
- [Drozer](https://github.com/FSecureLABS/drozer)
- [APKTool](https://ibotpeaches.github.io/Apktool/)

## Next Steps

In the next chapter, we'll focus on cloud security testing, exploring techniques for identifying and exploiting vulnerabilities in cloud environments, including infrastructure as code, container security, serverless functions, and cloud-specific misconfigurations.

---

## Chapter Quiz

Test your understanding of mobile application security testing:

1. What are the key differences between static and dynamic analysis in mobile application security testing?
2. Explain how certificate pinning works in mobile applications and how it can be bypassed during security testing.
3. What are the most critical security issues to look for when examining mobile application data storage?
4. Describe three methods for testing authentication and authorization in mobile applications.
5. What tools would you use to analyze native code in mobile applications, and what types of vulnerabilities would you look for?

Good luck!
