const fs = require('fs');
const filePath = 'C:\\\\Users\\\\IanHuang\\\\Desktop\\\\史瑞克社區網路\\\\src\\\\pages\\\\ApplicationFlow.tsx';
let content = fs.readFileSync(filePath, 'utf-8');
content = content.replace(/\[0d9488\]/g, '[#14b8a6]');
fs.writeFileSync(filePath, content, 'utf-8');
