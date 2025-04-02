import os
import re

def update_imports(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r') as f:
                    content = f.read()
                
                # Update import paths
                content = re.sub(r'from ["\'](\.\.?/)+components/', 'from "@/components/', content)
                content = re.sub(r'from ["\'](\.\.?/)+lib/', 'from "@/lib/', content)
                content = re.sub(r'from ["\'](\.\.?/)+hooks/', 'from "@/hooks/', content)
                
                with open(file_path, 'w') as f:
                    f.write(content)
                    
                print(f'Updated imports in {file_path}')

if __name__ == '__main__':
    update_imports('src')
    update_imports('app')