import re

with open('src/index.css', 'r') as f:
    c = f.read()

c = c.replace("--color-txt:     #e8eaf6;", "--color-txt:     #ffffff;")
c = c.replace("--color-txt-mid: #7986cb;", "--color-txt-mid: #e2e8f0;")
c = c.replace("--color-txt-dim: #4a5190;", "--color-txt-dim: #94a3b8;")

# Increase font size on html
c = c.replace("html {\n  scroll-behavior: smooth;", "html {\n  scroll-behavior: smooth;\n  font-size: 110%; /* Makes text bigger globally */")

with open('src/index.css', 'w') as f:
    f.write(c)

print("Text styles updated.")
