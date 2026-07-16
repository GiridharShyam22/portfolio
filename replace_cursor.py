import re

with open('src/components/CustomCursor.jsx', 'r') as f:
    c = f.read()

c = c.replace("dotRef.current.style.width = '10px';", "dotRef.current.style.width = '14px';")
c = c.replace("dotRef.current.style.height = '10px';", "dotRef.current.style.height = '14px';")
c = c.replace("dotRef.current.style.background = '#68696e';", "dotRef.current.style.background = '#ffffff';")
c = c.replace("dotRef.current.style.boxShadow = '0 0 14px #68696e, 0 0 28px rgba(104,105,110,0.5)';", "dotRef.current.style.boxShadow = '0 0 16px #ffffff, 0 0 32px rgba(255,255,255,0.6)';")

c = c.replace("ringRef.current.style.width = '44px';", "ringRef.current.style.width = '56px';")
c = c.replace("ringRef.current.style.height = '44px';", "ringRef.current.style.height = '56px';")
c = c.replace("ringRef.current.style.borderColor = 'rgba(104,105,110,0.55)';", "ringRef.current.style.borderColor = 'rgba(255,255,255,0.7)';")
c = c.replace("ringRef.current.style.background = 'rgba(104,105,110,0.04)';", "ringRef.current.style.background = 'rgba(255,255,255,0.1)';")
c = c.replace("ringRef.current.style.transform = `translate3d(${ring.current.x - 18}px, ${ring.current.y - 18}px, 0)`;", "ringRef.current.style.transform = `translate3d(${ring.current.x - 20}px, ${ring.current.y - 20}px, 0)`;")

c = c.replace("dotRef.current.style.width = '8px';", "dotRef.current.style.width = '10px';")
c = c.replace("dotRef.current.style.height = '8px';", "dotRef.current.style.height = '10px';")
c = c.replace("dotRef.current.style.boxShadow = '0 0 8px rgba(104,105,110,0.8)';", "dotRef.current.style.boxShadow = '0 0 12px rgba(255,255,255,0.9)';")

c = c.replace("ringRef.current.style.width = '36px';", "ringRef.current.style.width = '40px';")
c = c.replace("ringRef.current.style.height = '36px';", "ringRef.current.style.height = '40px';")
c = c.replace("ringRef.current.style.borderColor = 'rgba(104,105,110,0.45)';", "ringRef.current.style.borderColor = 'rgba(255,255,255,0.5)';")

# also replace the react inline styles at the bottom
c = c.replace("width: '8px',", "width: '10px',")
c = c.replace("height: '8px',", "height: '10px',")
c = c.replace("background: '#68696e',", "background: '#ffffff',")
c = c.replace("boxShadow: '0 0 8px rgba(104,105,110,0.8)',", "boxShadow: '0 0 12px rgba(255,255,255,0.9)',")

c = c.replace("width: '36px',", "width: '40px',")
c = c.replace("height: '36px',", "height: '40px',")
c = c.replace("border: '1.5px solid rgba(104,105,110,0.45)',", "border: '1.5px solid rgba(255,255,255,0.5)',")

# fix ring transform in loop
c = c.replace("ringRef.current.style.transform = `translate3d(${ring.current.x - 20}px, ${ring.current.y - 20}px, 0)`;", "ringRef.current.style.transform = `translate3d(${ring.current.x - (parseInt(ringRef.current.style.width) / 2 || 20)}px, ${ring.current.y - (parseInt(ringRef.current.style.width) / 2 || 20)}px, 0)`;")
c = c.replace("dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;", "dotRef.current.style.transform = `translate3d(${e.clientX - (parseInt(dotRef.current.style.width) / 2 || 5)}px, ${e.clientY - (parseInt(dotRef.current.style.width) / 2 || 5)}px, 0)`;")

with open('src/components/CustomCursor.jsx', 'w') as f:
    f.write(c)
print("Updated Cursor")
