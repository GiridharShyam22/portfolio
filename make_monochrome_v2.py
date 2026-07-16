import os
import re

def rgb_to_gray(r, g, b):
    # Calculate luminance
    return int(0.299 * r + 0.587 * g + 0.114 * b)

def hex_replacer(match):
    hex_val = match.group(0)
    if len(hex_val) == 7:
        r = int(hex_val[1:3], 16)
        g = int(hex_val[3:5], 16)
        b = int(hex_val[5:7], 16)
        l = rgb_to_gray(r, g, b)
        # If it's the green dot (#4ade80), make it white for visibility
        if hex_val.lower() == '#4ade80':
            return '#ffffff'
        return f"#{l:02x}{l:02x}{l:02x}"
    return hex_val

def rgba_replacer(match):
    r, g, b = int(match.group(1)), int(match.group(2)), int(match.group(3))
    a = match.group(4)
    l = rgb_to_gray(r, g, b)
    
    # If the original was dark blue/purple text, let's brighten it up so it's readable
    # like rgba(121,134,203)
    if r == 121 and g == 134 and b == 203:
        return f"rgba(229,229,229,{a})" # much brighter gray
    # same for 137, 150, 204
    if r == 137 and g == 150 and b == 204:
        return f"rgba(229,229,229,{a})"
    # same for 165, 180, 252
    if r == 165 and g == 180 and b == 252:
        return f"rgba(255,255,255,{a})"
        
    return f"rgba({l},{l},{l},{a})"

hex_pattern = re.compile(r"#[0-9a-fA-F]{6}\b")
rgba_pattern = re.compile(r"rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9.]+)\s*\)")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
                
            original = content
            
            # Grayscale HEX
            content = hex_pattern.sub(hex_replacer, content)
            
            # Grayscale RGBA
            content = rgba_pattern.sub(rgba_replacer, content)
            
            # Fix description color specifically if it's still hard to read
            content = content.replace("color: 'rgba(128,128,128,0.9)'", "color: 'rgba(212,212,212,0.95)'") # lighter gray
            content = content.replace("color: 'rgba(128, 128, 128, 0.9)'", "color: 'rgba(212, 212, 212, 0.95)'")
            
            # Also replace animation pulse colors if any
            content = content.replace("pulse-glow-cyan", "pulse-glow")
            
            if content != original:
                with open(path, 'w') as f:
                    f.write(content)
                print(f"Grayscaled {path}")

print("V2 Monochrome Sweep Complete.")
