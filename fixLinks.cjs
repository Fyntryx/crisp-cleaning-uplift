const fs = require('fs');
const path = require('path');

const builtSuburbs = [
  'Brighton', 'North Melbourne', 'Cheltenham', 'Essendon', 'Maribyrnong', 'Bundoora', 'Hampton', 'Brunswick', 'Malvern', 'Point Cook', 'Preston', 'South Yarra', 'Toorak', 'Melbourne CBD',
  'Doncaster', 'Doncaster East', 'Mount Waverley', 'Kew', 'Hawthorn', 'Camberwell', 'Glen Iris', 'Glen Waverley', 'Bentleigh East', 'Moonee Ponds', 'Reservoir', 'Caroline Springs', 'Greensborough', 'Footscray', 'Templestowe', 'Balwyn North', 'Brooklyn', 'Coburg', 'St Albans', 'Mernda', 'Chelsea', 'Ringwood', 'Strathmore', 'Werribee', 'Croydon', 'Windsor', 'Craigieburn', 'Richmond', 'Albert Park', 'Carnegie', 'Sandringham', 'Box Hill', 'Oakleigh', 'Yarraville', 'Ivanhoe'
].map(s => s.toLowerCase());

function isBuilt(name) {
  return builtSuburbs.includes(name.toLowerCase());
}

const lpDir = path.join(__dirname, 'src/components/lp');

['CheltenhamClient.tsx', 'EssendonClient.tsx'].forEach(file => {
  const filePath = path.join(lpDir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Match the entire curly brace block containing the map
  const mapRegex = /\{\s*\[(.*?)\]\.map\(\s*(\([^)]+\)|[a-zA-Z0-9_]+)\s*=>\s*\(\s*(<([a-zA-Z]+)[\s\S]*?<\/\4>)\s*\)\s*\)\s*\}/g;
  
  let newContent = content;
  let matches;
  while ((matches = mapRegex.exec(content)) !== null) {
    const fullMatch = matches[0];
    const arrayStr = matches[1];
    const paramNameRaw = matches[2];
    const elementStr = matches[3];
    const tagName = matches[4];
    
    // Check if it's a suburb link mapper
    if (!elementStr.includes('house-cleaning-')) continue;
    
    const items = arrayStr.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    
    let allBuilt = true;
    for (const item of items) {
       if (!isBuilt(item)) allBuilt = false;
    }
    
    if (allBuilt) {
       console.log(`Skipping match in ${file} - all suburbs are built`);
       continue;
    }

    const mappedArray = items.map(item => {
        return `{ name: '${item}', isBuilt: ${isBuilt(item)} }`;
    }).join(', ');
    
    const paramMatch2 = paramNameRaw.match(/\(\s*([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*\)/);
    let indexVar = "";
    let itemVar = paramNameRaw.trim();
    if (paramMatch2) {
        itemVar = paramMatch2[1];
        indexVar = paramMatch2[2];
    } else if (itemVar.startsWith('(') && itemVar.endsWith(')')) {
        itemVar = itemVar.slice(1, -1);
    }
    
    const newParamName = paramMatch2 
        ? `({ name: ${itemVar}, isBuilt }, ${indexVar})` 
        : `({ name: ${itemVar}, isBuilt })`;

    // Safely remove href and other specific attributes that denote links
    // IMPORTANT: using \b to match tag name start without requiring space
    let spanElement = elementStr
        .replace(/<Link\b/g, '<span')
        .replace(/<\/Link>/g, '</span>')
        .replace(/<a\b/g, '<span')
        .replace(/<\/a>/g, '</span>')
        .replace(/href=\{`[^`]+`\}/g, '')
        .replace(/href=\{'[^']+'\}/g, '')
        .replace(/href="[^"]+"/g, '')
        .replace(/href=\{.*?\}/g, '')
        .replace(/hover:[a-zA-Z0-9_\[\]\-#]+/g, '')
        .replace(/group-hover:[a-zA-Z0-9_\[\]\-#]+/g, '')
        .replace(/cursor-pointer/g, 'cursor-default')
        .replace(/<ArrowRight[^>]*\/>/g, '');

    const newMapContent = `{ [${mappedArray}].map(${newParamName} => (
              isBuilt 
                ? ${elementStr}
                : ${spanElement}
            )) }`;
            
    newContent = newContent.replace(fullMatch, newMapContent);
    console.log(`Updated match in ${file}`);
  }
  
  if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
  }
});
