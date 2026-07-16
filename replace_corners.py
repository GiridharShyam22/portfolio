import re

with open('src/components/Hero.jsx', 'r') as f:
    c = f.read()

# Change rounded-2xl to rounded-none on the photo container, glare layer, and depth layer
c = c.replace('className="absolute inset-0 rounded-2xl overflow-hidden"', 'className="absolute inset-0 rounded-none overflow-hidden"')
c = c.replace('className="absolute inset-0 pointer-events-none rounded-2xl transition-none z-10"', 'className="absolute inset-0 pointer-events-none rounded-none transition-none z-10"')
c = c.replace('className="absolute inset-0 rounded-2xl pointer-events-none"', 'className="absolute inset-0 rounded-none pointer-events-none"')

with open('src/components/Hero.jsx', 'w') as f:
    f.write(c)

print("Updated corners to be sharp.")
