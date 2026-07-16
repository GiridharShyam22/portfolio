import re

with open('src/index.css', 'r') as f:
    css = f.read()

# Font import
css = re.sub(
    r"@import url\('https://fonts\.googleapis\.com/css2\?family=Inter:.*?'\);",
    "@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500;700&display=swap');",
    css
)

# Variables
css = css.replace("--color-bg:        #03040e;", "--color-bg:        #020303;")
css = css.replace("--color-bg2:       #080b1a;", "--color-bg2:       #020303;")
css = css.replace("--color-bg3:       #0f1230;", "--color-bg3:       #0c1f5e;")
css = css.replace("--color-navy:      #1d2066;", "--color-navy:      #0c1f5e;")
css = css.replace("--color-navy-mid:  #252b80;", "--color-navy-mid:  #0c1f5e;")
css = css.replace("--color-navy-light:#3340b8;", "--color-navy-light:#68696e;")

css = css.replace("--color-accent:      #4f6ef7;", "--color-accent:      #68696e;")
css = css.replace("--color-accent-cyan: #00b4ff;", "--color-accent-cyan: #68696e;")
css = css.replace("--color-accent-violet: #7c4fff;", "--color-accent-violet: #0c1f5e;")
css = css.replace("--color-accent-gold:   #f59e0b;", "--color-accent-gold:   #68696e;")
css = css.replace("--color-accent-dim:  #2a3a9e;", "--color-accent-dim:  #68696e;")

css = css.replace("--color-glow-blue:   rgba(79,110,247,0.35);", "--color-glow-blue:   rgba(104,105,110,0.35);")
css = css.replace("--color-glow-cyan:   rgba(0,180,255,0.3);", "--color-glow-cyan:   rgba(104,105,110,0.3);")
css = css.replace("--color-glow-violet: rgba(124,79,255,0.3);", "--color-glow-violet: rgba(12,31,94,0.3);")
css = css.replace("--color-glow-navy:   rgba(29,32,102,0.6);", "--color-glow-navy:   rgba(12,31,94,0.6);")

# Fonts
css = css.replace("--font-sans: 'Space Grotesk', 'Inter', sans-serif;", "--font-sans: 'Plus Jakarta Sans', sans-serif;")
css = css.replace("--font-display: 'Space Grotesk', sans-serif;", "--font-display: 'Outfit', sans-serif;")

# Hardcoded rgba/hex replacements
replacements = {
    "rgba(79,110,247,": "rgba(104,105,110,",
    "rgba(79, 110, 247,": "rgba(104, 105, 110,",
    "rgba(29,32,102,": "rgba(12,31,94,",
    "rgba(29, 32, 102,": "rgba(12, 31, 94,",
    "rgba(8,11,26,": "rgba(2,3,3,",
    "rgba(8, 11, 26,": "rgba(2, 3, 3,",
    "rgba(15,18,48,": "rgba(12,31,94,",
    "rgba(0,180,255,": "rgba(104,105,110,",
    "rgba(124,79,255,": "rgba(12,31,94,",
    "#4f6ef7": "#68696e",
    "#00b4ff": "#68696e",
    "#7c4fff": "#0c1f5e",
    "#8899ff": "#68696e",
    "rgba(245,158,11,": "rgba(104,105,110,"
}

for old, new in replacements.items():
    css = css.replace(old, new)

with open('src/index.css', 'w') as f:
    f.write(css)

print("Done replacing.")
