import os

replacements = {
    # Hex codes
    "#000000": "#0b132b",
    "#e8e4eb": "#00b4d8",
    "#dbc0f0": "#48cae4",
    
    # RGBa values (from my previous replacements)
    "rgba(0,0,0": "rgba(11,19,43",
    "rgba(0, 0, 0": "rgba(11, 19, 43",
    
    "rgba(232,228,235": "rgba(0,180,216",
    "rgba(232, 228, 235": "rgba(0, 180, 216",
    
    "rgba(219,192,240": "rgba(72,202,228",
    "rgba(219, 192, 240": "rgba(72, 202, 228",
    
    # Tailwind custom classes added by me
    "bg-[#dbc0f0]": "bg-[#48cae4]",
    "from-[#dbc0f0]": "from-[#48cae4]",
    
    "bg-[#e8e4eb]": "bg-[#00b4d8]",
    "border-[#e8e4eb]": "border-[#00b4d8]",
    "from-[#e8e4eb]": "from-[#00b4d8]",
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
print("Midnight Aurora palette applied.")
