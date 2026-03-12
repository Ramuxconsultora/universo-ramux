import re
import os

file_path = '/Users/fernandosilguero/Desktop/CNV-Ramux/m1_x9z_secure.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the button container and everything inside until the closing div
# Matches <div class="mt-12..."> or "mt-16..."
# Non-greedy matching for the content
pattern = r'\s*<div class="mt-(?:12|16) flex justify-end">\s*<button.*?<\/button>\s*<\/div>'

# Using re.DOTALL so . matches newlines
new_content, count = re.subn(pattern, '', content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Removed {count} blocks.")
