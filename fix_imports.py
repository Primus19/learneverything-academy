#!/usr/bin/env python3
import os
import re
import sys
from pathlib import Path

def fix_imports(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if file imports AdvancedSearch
    if 'import AdvancedSearch from' in content:
        # Update to use the JSX version
        content = content.replace(
            'import AdvancedSearch from "../../components/features/advanced_search"',
            'import AdvancedSearch from "../../components/features/advanced_search.jsx"'
        )
        content = content.replace(
            'import AdvancedSearch from "../components/features/advanced_search"',
            'import AdvancedSearch from "../components/features/advanced_search.jsx"'
        )
    
    # Update Card component imports to use card-direct
    if 'import { Card' in content and 'from' in content and 'card' in content:
        # Extract the import line
        card_import_pattern = r'import\s+\{\s*(Card(?:,\s*CardHeader|,\s*CardTitle|,\s*CardDescription|,\s*CardContent|,\s*CardFooter)*)\s*\}\s*from\s*[\'"]([^\'"]*/card)[\'"]'
        match = re.search(card_import_pattern, content)
        
        if match:
            components = [c.strip() for c in match.group(1).split(',')]
            path_prefix = match.group(2).replace('card', 'card-direct')
            
            # Create individual imports
            new_imports = []
            for component in components:
                if component:
                    new_imports.append(f'import {component} from "{path_prefix}/{component}.jsx"')
            
            # Replace the original import with the new imports
            new_import_text = '\n'.join(new_imports)
            content = re.sub(card_import_pattern, new_import_text, content)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    return True

def process_directory(directory):
    count = 0
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx')) and 'node_modules' not in root:
                file_path = os.path.join(root, file)
                if fix_imports(file_path):
                    count += 1
                    print(f"Fixed imports in: {file_path}")
    
    return count

if __name__ == "__main__":
    src_dir = sys.argv[1] if len(sys.argv) > 1 else "src"
    count = process_directory(src_dir)
    print(f"\nFixed imports in {count} files.")
