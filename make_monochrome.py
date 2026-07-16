import os
import re

# 1. Regex for tailwind colors: text-blue-400, bg-green-500/10, etc.
# We want to replace the color name with "neutral"
color_names = r"(blue|green|purple|violet|indigo|cyan|red|yellow|orange|amber|emerald|teal|sky|rose|fuchsia|pink)"
tw_pattern = re.compile(r"\b(text|bg|border|from|via|to|shadow|ring)-" + color_names + r"-(\d{2,3})\b")

def replace_tw(match):
    prefix = match.group(1) # text, bg, etc.
    intensity = match.group(3) # 400, 500, etc.
    return f"{prefix}-neutral-{intensity}"

# 2. Hex code replacements for the old palette
hex_replacements = {
    "#020303": "#000000",
    "#68696e": "#737373", # neutral-500
    "#0c1f5e": "#171717", # neutral-900
    
    # rgb values
    "rgba(2,3,3": "rgba(0,0,0",
    "rgba(2, 3, 3": "rgba(0, 0, 0",
    "rgba(104,105,110": "rgba(115,115,115",
    "rgba(104, 105, 110": "rgba(115, 115, 115",
    "rgba(12,31,94": "rgba(23,23,23",
    "rgba(12, 31, 94": "rgba(23, 23, 23",
    
    # Some specific text replacements in components
    "text-blue-300": "text-neutral-300",
    "text-blue-400/70": "text-neutral-400/70",
    "text-blue-200": "text-neutral-200",
    "text-[#a1a1aa]": "text-[#a1a1aa]", # keep
    "bg-green-400": "bg-neutral-300", # keep bright
    "text-green-300": "text-neutral-300"
}

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r') as f:
                content = f.read()
                
            original_content = content
            
            # Replace tailwind colors using regex
            content = tw_pattern.sub(replace_tw, content)
            
            # Replace hex codes
            for old, new in hex_replacements.items():
                content = content.replace(old, new)
                
            if content != original_content:
                with open(path, 'w') as f:
                    f.write(content)
                print(f"Updated {path}")

print("Site is now monochrome.")
