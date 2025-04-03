#!/usr/bin/env python3
import os
import re
import sys
from pathlib import Path

def convert_file_to_jsx(file_path):
    """Convert a TypeScript file to JavaScript by removing type annotations."""
    
    # Skip if already a JSX file
    if file_path.endswith('.jsx'):
        return False
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove TypeScript type annotations
    # Remove type imports
    content = re.sub(r'import\s+type\s+\{[^}]*\}\s+from\s+[\'"][^\'"]*[\'"];?\n?', '', content)
    
    # Remove interface and type declarations
    content = re.sub(r'(interface|type)\s+[A-Za-z0-9_]+(\s*<[^>]*>)?\s*\{[^}]*\}', '', content)
    
    # Remove type annotations from variables, parameters, and function returns
    content = re.sub(r':\s*[A-Za-z0-9_]+(\[\])?(\s*\|\s*[A-Za-z0-9_]+(\[\])?)*', '', content)
    content = re.sub(r':\s*\{[^}]*\}', '', content)
    content = re.sub(r'<[A-Za-z0-9_,\s]+>', '', content)
    
    # Remove 'as' type assertions
    content = re.sub(r'\s+as\s+[A-Za-z0-9_]+(\[\])?', '', content)
    
    # Create new JSX file path
    new_file_path = file_path.replace('.tsx', '.jsx').replace('.ts', '.jsx')
    
    with open(new_file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    # Remove the original TypeScript file
    os.remove(file_path)
    
    print(f"Converted: {file_path} -> {new_file_path}")
    return True

def process_directory(directory):
    """Process all TypeScript files in a directory recursively."""
    count = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if (file.endswith('.tsx') or file.endswith('.ts')) and 'node_modules' not in root:
                file_path = os.path.join(root, file)
                if convert_file_to_jsx(file_path):
                    count += 1
    
    return count

if __name__ == "__main__":
    src_dir = sys.argv[1] if len(sys.argv) > 1 else "src"
    count = process_directory(src_dir)
    print(f"\nConverted {count} TypeScript files to JavaScript.")
