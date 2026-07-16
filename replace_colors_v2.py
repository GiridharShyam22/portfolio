import os
import re

replacements = {
    # Hex codes
    "#020303": "#000000",
    "#68696e": "#e8e4eb",
    "#0c1f5e": "#dbc0f0",
    "#020303".upper(): "#000000",
    "#68696E": "#e8e4eb",
    "#0C1F5E": "#dbc0f0",
    
    # RGBa values (from my previous replacements)
    "rgba(2,3,3": "rgba(0,0,0",
    "rgba(2, 3, 3": "rgba(0, 0, 0",
    
    "rgba(104,105,110": "rgba(232,228,235",
    "rgba(104, 105, 110": "rgba(232, 228, 235",
    
    "rgba(12,31,94": "rgba(219,192,240",
    "rgba(12, 31, 94": "rgba(219, 192, 240",
    
    # Tailwind custom classes added by me
    "bg-[#0c1f5e]": "bg-[#dbc0f0]",
    "from-[#0c1f5e]": "from-[#dbc0f0]",
    
    "bg-[#68696e]": "bg-[#e8e4eb]",
    "border-[#68696e]": "border-[#e8e4eb]",
    "from-[#68696e]": "from-[#e8e4eb]",
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
                
            original_content = content
            for old, new in replacements.items():
                content = content.replace(old, new)
                
            if content != original_content:
                with open(path, 'w') as f:
                    f.write(content)
                print(f"Updated {path}")
print("Colors replaced.")
