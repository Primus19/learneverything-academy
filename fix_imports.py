import os
import re

def fix_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r') as f:
                    content = f.read()
                
                # Fix relative imports
                content = re.sub(r'from ["\']\.\./(?!\.\.)', 'from "@/', content)
                content = re.sub(r'from ["\']\./(?!\.)', 'from "@/', content)
                
                with open(file_path, 'w') as f:
                    f.write(content)
                    
                print(f'Fixed imports in {file_path}')

if __name__ == '__main__':
    fix_imports('src')
    fix_imports('app')