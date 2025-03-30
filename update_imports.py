#!/usr/bin/env python3
import os
import re
import sys
from pathlib import Path

def update_imports(file_path):
    """Update imports to reference .jsx files instead of .tsx or .ts files."""
    
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Update import statements to reference .jsx files
    content = re.sub(r'from\s+[\'"]([^\'"]*)(\.tsx?)[\'"]', r'from "\1.jsx"', content)
    
    # Update relative imports that don't have extensions
    content = re.sub(r'from\s+[\'"]([^\'"]*/[^/\'".]+)[\'"]', r'from "\1.jsx"', content)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    return True

def process_directory(directory):
    """Process all JSX files in a directory recursively."""
    count = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.jsx') and 'node_modules' not in root:
                file_path = os.path.join(root, file)
                if update_imports(file_path):
                    count += 1
                    print(f"Updated imports in: {file_path}")
    
    return count

if __name__ == "__main__":
    src_dir = sys.argv[1] if len(sys.argv) > 1 else "src"
    count = process_directory(src_dir)
    print(f"\nUpdated imports in {count} JSX files.")
