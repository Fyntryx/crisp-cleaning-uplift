const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'components', 'lp');
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('Client.tsx')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all instances of the wrong orange with the brand orange
    const originalContent = content;
    content = content.replace(/#d97706/gi, '#FB8C42');
    content = content.replace(/#b45309/gi, '#ea6309');
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
