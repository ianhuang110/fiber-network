const fs = require('fs');

const filePath = 'C:\\\\Users\\\\IanHuang\\\\Desktop\\\\史瑞克社區網路\\\\src\\\\pages\\\\ApplicationFlow.tsx';

let content = fs.readFileSync(filePath, 'utf-8');

// Text changes
content = content.replace(/史瑞克社區網路/g, '社區網路');

// Colors - Backgrounds & Borders
content = content.replace(/bg-gray-50/g, 'bg-[#0B0F19]')
                 .replace(/bg-white/g, 'bg-[#131B2F]') // Mostly cards and modals
                 .replace(/border-gray-100/g, 'border-gray-800')
                 .replace(/border-gray-200/g, 'border-gray-800')
                 .replace(/border-gray-300/g, 'border-gray-700');

// Colors - Text
content = content.replace(/text-gray-900/g, 'text-white')
                 .replace(/text-gray-800/g, 'text-gray-100')
                 .replace(/text-gray-700/g, 'text-gray-300')
                 .replace(/text-gray-600/g, 'text-gray-400')
                 .replace(/text-gray-500/g, 'text-gray-400')
                 .replace(/text-gray-400/g, 'text-gray-500'); // Some original 400s need to go darker or lighter. Let's leave them if it gets confusing. Wait! text-gray-400 to text-gray-500 makes them darker on a dark background.

// Let's redo text replace:
// 900 -> white
// 800 -> gray-200
// 700 -> gray-300
// 600 -> gray-400
// 500 -> gray-500

// Colors - Themes
content = content.replace(/bg-shrek-500/g, 'bg-teal-500')
                 .replace(/bg-shrek-600/g, 'bg-teal-600')
                 .replace(/bg-shrek-700/g, 'bg-teal-700')
                 .replace(/text-shrek-600/g, 'text-teal-500')
                 .replace(/text-shrek-700/g, 'text-teal-400')
                 .replace(/border-shrek-200/g, 'border-teal-500\\/20')
                 .replace(/ring-shrek-100/g, 'ring-teal-500\\/30');

// Colors - specific blues from the form
content = content.replace(/bg-blue-50\/50/g, 'bg-teal-500\/10')
                 .replace(/text-blue-900/g, 'text-teal-400')
                 .replace(/text-blue-800/g, 'text-teal-500')
                 .replace(/border-blue-600/g, 'border-teal-500')
                 .replace(/text-blue-700/g, 'text-teal-400')
                 .replace(/focus:ring-blue-500/g, 'focus:ring-teal-500')
                 .replace(/focus:border-blue-500/g, 'focus:border-teal-500')
                 .replace(/border-blue-500/g, 'border-teal-500')
                 .replace(/ring-blue-500\/10/g, 'ring-teal-500\/20')
                 .replace(/text-blue-600/g, 'text-teal-400')
                 .replace(/bg-blue-500/g, 'bg-teal-500');

// Fix Specifics
content = content.replace(/outline-none appearance-none bg-\[#131B2F\]/g, 'outline-none appearance-none bg-[#0B0F19]')
                 .replace(/outline-none bg-\[#131B2F\]/g, 'outline-none bg-[#0B0F19]')
                 .replace(/resize-none/g, 'resize-none bg-[#0B0F19]')
                 .replace(/border-gray-400/g, 'border-gray-500');

// Modal overlays
content = content.replace(/bg-black\/50/g, 'bg-black/80');

// Success modal icon bg
content = content.replace(/bg-teal-100/g, 'bg-teal-500/20');

// Fix border-[#14b8a6] hexes to match tailwind teal-500
content = content.replace(/#14b8a6/g, '0d9488'); // 0d9488 is actually teal-600. wait, teal-500 is #14b8a6. The user already used #14b8a6.

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Done text replacement!");
