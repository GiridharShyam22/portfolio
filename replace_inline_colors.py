import os
import re

replacements = {
    "#4f6ef7": "#68696e",
    "#7c4fff": "#0c1f5e",
    "#00b4ff": "#68696e",
    "#8899ff": "#68696e",
    "#1d2066": "#0c1f5e",
    "#03040e": "#020303",
    "#080b1a": "#020303",
    "#0f1230": "#0c1f5e",
    "#252b80": "#0c1f5e",
    "#3340b8": "#68696e",
    "#f59e0b": "#68696e",
    "#2a3a9e": "#68696e",
    # also handle rgba in code if any left over that wasn't in css
    "rgba(79, 110, 247": "rgba(104, 105, 110",
    "rgba(79,110,247": "rgba(104,105,110",
    "rgba(124, 79, 255": "rgba(12, 31, 94",
    "rgba(124,79,255": "rgba(12,31,94",
    "rgba(0, 180, 255": "rgba(104, 105, 110",
    "rgba(0,180,255": "rgba(104,105,110"
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
                
            original_content = content
            # case insensitive replacement of hex
            for old, new in replacements.items():
                content = re.sub(re.escape(old), new, content, flags=re.IGNORECASE)
                
            if content != original_content:
                with open(path, 'w') as f:
                    f.write(content)
                print(f"Updated {path}")
print("Inline colors replaced.")
