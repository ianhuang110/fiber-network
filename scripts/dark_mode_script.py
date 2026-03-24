import re

file_path = r'c:\Users\IanHuang\Desktop\史瑞克社區網路\src\pages\ApplicationFlow.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Text changes
content = content.replace('史瑞克社區網路', '社區網路')

# Colors - Backgrounds & Borders
content = content.replace('bg-gray-50', 'bg-[#0B0F19]')
content = content.replace('bg-white', 'bg-[#131B2F]') # Mostly cards and modals
content = content.replace('border-gray-100', 'border-gray-800')
content = content.replace('border-gray-200', 'border-gray-800')
content = content.replace('border-gray-300', 'border-gray-700')

# Colors - Text
content = content.replace('text-gray-900', 'text-white')
content = content.replace('text-gray-800', 'text-gray-100')
content = content.replace('text-gray-700', 'text-gray-300')
content = content.replace('text-gray-600', 'text-gray-400')
content = content.replace('text-gray-500', 'text-gray-400')

# Colors - Themes
content = content.replace('bg-shrek-500', 'bg-teal-500')
content = content.replace('bg-shrek-600', 'bg-teal-600')
content = content.replace('bg-shrek-700', 'bg-teal-700')
content = content.replace('text-shrek-600', 'text-teal-500')
content = content.replace('text-shrek-700', 'text-teal-400')
content = content.replace('border-shrek-200', 'border-teal-500/20')
content = content.replace('ring-shrek-100', 'ring-teal-500/30')

# Colors - specific blues from the form
content = content.replace('bg-blue-50/50', 'bg-teal-500/10')
content = content.replace('text-blue-900', 'text-teal-400')
content = content.replace('text-blue-800', 'text-teal-500')
content = content.replace('border-blue-600', 'border-teal-500')
content = content.replace('text-blue-700', 'text-teal-400')
content = content.replace('focus:ring-blue-500', 'focus:ring-teal-500')
content = content.replace('focus:border-blue-500', 'focus:border-teal-500')
content = content.replace('border-blue-500', 'border-teal-500')
content = content.replace('ring-blue-500/10', 'ring-teal-500/20')
content = content.replace('text-blue-600', 'text-teal-400')

content = content.replace('bg-blue-500', 'bg-teal-500') 

# Fix inputs bg
content = content.replace('outline-none appearance-none bg-[#131B2F]', 'outline-none appearance-none bg-[#0B0F19]')
content = content.replace('outline-none bg-[#131B2F]', 'outline-none bg-[#0B0F19]')
content = content.replace('resize-none', 'resize-none bg-[#0B0F19]')

# Fix Specifics broken by mass replace
content = content.replace('border-gray-400', 'border-gray-500')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done!")
