import os

replacements = {
    # Hex codes
    "#0b132b": "#020303",
    "#00b4d8": "#68696e",
    "#48cae4": "#0c1f5e",
    
    # RGBa values
    "rgba(11,19,43": "rgba(2,3,3",
    "rgba(11, 19, 43": "rgba(2, 3, 3",
    
    "rgba(0,180,216": "rgba(104,105,110",
    "rgba(0, 180, 216": "rgba(104, 105, 110",
    
    "rgba(72,202,228": "rgba(12,31,94",
    "rgba(72, 202, 228": "rgba(12, 31, 94",
    
    # Tailwind custom classes added by me
    "bg-[#00b4d8]": "bg-[#68696e]",
    "from-[#00b4d8]": "from-[#68696e]",
    "border-[#00b4d8]": "border-[#68696e]",
    
    "bg-[#48cae4]": "bg-[#0c1f5e]",
    "from-[#48cae4]": "from-[#0c1f5e]",
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
print("Original custom palette restored.")
