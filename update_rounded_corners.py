import re

with open('src/components/Hero.jsx', 'r') as f:
    c = f.read()

# Replace rounded-none with rounded-3xl
c = c.replace('className="absolute inset-0 rounded-none overflow-hidden"', 'className="absolute inset-0 rounded-[2.5rem] overflow-hidden"')
c = c.replace('className="absolute inset-0 pointer-events-none rounded-none transition-none z-10"', 'className="absolute inset-0 pointer-events-none rounded-[2.5rem] transition-none z-10"')
c = c.replace('className="absolute inset-0 rounded-none pointer-events-none"', 'className="absolute inset-0 rounded-[2.5rem] pointer-events-none"')

with open('src/components/Hero.jsx', 'w') as f:
    f.write(c)

print("Updated corners to be rounded-3xl equivalent.")
