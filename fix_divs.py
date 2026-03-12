
import os

file_path = '/Users/fernandosilguero/Desktop/CNV-Ramux/m3_transparencia.html'

with open(file_path, 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Check for Level headers that imply the previous level ended
    if '<!-- LEVEL 2 -->' in line:
        new_lines.append('                </div>\n')
    elif '<!-- LEVEL 3 -->' in line:
        new_lines.append('                </div>\n')
    elif '<!-- LEVEL 4 -->' in line:
        new_lines.append('                </div>\n')
    # Level 5 was seemingly fixed manually, but check if I added it?
    # I replaced lines 1110-1110. So it should be there.
    # Level 7 end -> before Level 8
    elif '<!-- LEVEL 8 -->' in line:
        new_lines.append('                </div>\n')
    # Level 8 end -> before Level 9
    elif '<!-- LEVEL 9 -->' in line:
        new_lines.append('                </div>\n')
    
    new_lines.append(line)

with open(file_path, 'w') as f:
    f.writelines(new_lines)

print("Fixed closing divs")
