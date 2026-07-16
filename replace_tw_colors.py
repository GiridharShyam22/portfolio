import os
import re

def replace_in_file(path):
    with open(path, 'r') as f:
        content = f.read()
    
    orig = content
    # For background, border, from, via, to
    # Replace blue-X, cyan-X with arbitrary #68696e or #0c1f5e
    # Let's map blue-900/950 -> #0c1f5e, blue-400/500 -> #68696e
    
    content = re.sub(r'bg-blue-9\d0', 'bg-[#0c1f5e]', content)
    content = re.sub(r'from-blue-9\d0', 'from-[#0c1f5e]', content)
    
    content = re.sub(r'bg-blue-[45]00', 'bg-[#68696e]', content)
    content = re.sub(r'border-blue-[45]00', 'border-[#68696e]', content)
    content = re.sub(r'from-blue-[45]00', 'from-[#68696e]', content)
    
    content = re.sub(r'bg-cyan-[45]00', 'bg-[#68696e]', content)
    
    if orig != content:
        with open(path, 'w') as f:
            f.write(content)
        print("Updated", path)

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.jsx'):
            replace_in_file(os.path.join(root, file))
print("Tailwind non-text colors updated.")
