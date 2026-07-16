import re

with open('src/components/About.jsx', 'r') as f:
    c = f.read()

# Add import
if "import SkillLoop from './SkillLoop';" not in c:
    c = c.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport SkillLoop from './SkillLoop';")

# Find the start of RIGHT: Orbital Skill Ring
start_idx = c.find("{/* RIGHT: Orbital Skill Ring */}")
end_idx = c.find("        {/* Bottom: Stat Cards */}")

if start_idx != -1 and end_idx != -1:
    old_section = c[start_idx:end_idx]
    
    new_section = """{/* RIGHT: Infinite Skill Loop Marquee */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9 }}
            className="flex flex-col items-center justify-center relative w-full h-full min-h-[360px]"
          >
            <SkillLoop />
          </motion.div>
        </div>

"""
    c = c[:start_idx] + new_section + c[end_idx:]

with open('src/components/About.jsx', 'w') as f:
    f.write(c)

print("Updated About.jsx successfully.")
