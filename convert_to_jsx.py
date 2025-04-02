import os
import sys

def convert_to_jsx(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.js'):
                file_path = os.path.join(root, file)
                jsx_path = file_path[:-3] + '.jsx'
                
                try:
                    os.rename(file_path, jsx_path)
                    print(f'Converted {file_path} to {jsx_path}')
                except Exception as e:
                    print(f'Error converting {file_path}: {str(e)}')

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print('Usage: python convert_to_jsx.py <directory>')
        sys.exit(1)
    
    directory = sys.argv[1]
    if not os.path.isdir(directory):
        print(f'Error: {directory} is not a valid directory')
        sys.exit(1)
    
    convert_to_jsx(directory)