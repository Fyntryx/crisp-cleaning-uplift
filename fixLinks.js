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

fs.readdirSync(lpDir).forEach(file => {
  if (!file.endsWith('.tsx')) return;
  const filePath = path.join(lpDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We look for arrays like {['A', 'B', 'C'].map...}
  // And replace it by defining the array with objects [{name: 'A', hasLink: true}, ...]
  // Then map over it and conditionally render Link/a or span.
  
  // Or even simpler: the links always have href={...}. We can replace href={...} with:
  // href={['built_list_json'].includes(area.toLowerCase()) ? ... : undefined}
  // But Next.js Link throws an error if href is undefined.
  // We can convert all <Link> and <a> to a ternary:
  // isBuilt ? <a ...>...</a> : <span ...>...</span>

  // Let's just find the `Nearby Areas We Also Service` section mapping manually for each file using regex
  const mapRegex = /\{\s*\[(.*?)\]\.map\(\s*(\([^)]+\)|[a-zA-Z0-9_]+)\s*=>\s*\(\s*(<([a-zA-Z]+)[\s\S]*?<\/\4>)\s*\)\s*\)/;
  
  const match = content.match(mapRegex);
  if (match) {
    const arrayStr = match[1]; // "'Coburg', 'Preston', ..."
    const items = arrayStr.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    
    // Let's create an array of objects text
    const mappedArray = items.map(item => {
        return `{ name: '${item}', isBuilt: ${isBuilt(item)} }`;
    }).join(', ');
    
    const paramNameRaw = match[2]; // e.g. "suburb", "(area, i)"
    const paramNameMatch = paramNameRaw.match(/[a-zA-Z0-9_]+/); // gets "suburb" or "area"
    const elementStr = match[3]; // The whole <a ...>...</a> or <Link ...>...</Link>
    const tagName = match[4]; // "a" or "Link"
    
    // If it uses (area, i), we keep the exact paramNameRaw.
    const paramMatch2 = paramNameRaw.match(/\(\s*([a-zA-Z0-9_]+)\s*,\s*([a-zA-Z0-9_]+)\s*\)/);
    let indexVar = "";
    let itemVar = paramNameRaw.trim();
    if (paramMatch2) {
        itemVar = paramMatch2[1];
        indexVar = paramMatch2[2];
    } else if (itemVar.startsWith('(') && itemVar.endsWith(')')) {
        itemVar = itemVar.slice(1, -1);
    }
    
    let originalElement = elementStr;
    // We want to replace `{itemVar}` with `{itemObj.name}`
    // and `href={`...${itemVar.toLowerCase()...}`}` with `href={`...${itemObj.name.toLowerCase()...}`}`
    // But since `itemVar` might be "area" or "suburb", we can just destructure!
    
    // Example: `({ name: suburb, isBuilt }, i)`
    const newParamName = paramMatch2 
        ? `({ name: ${itemVar}, isBuilt }, ${indexVar})` 
        : `({ name: ${itemVar}, isBuilt })`;

    // The span should be identical but without href. And change "hover:..." classes?
    // User said "just remove the link behind these". Removing href and changing tag to span/div works.
    let spanElement = originalElement
        .replace(/<Link /g, '<span ')
        .replace(/<\/Link>/g, '</span>')
        .replace(/<a /g, '<span ')
        .replace(/<\/a>/g, '</span>')
        .replace(/href=\{[^\}]+\}/, '')
        .replace(/href="[^"]+"/g, '')
        // Remove hover effects so it doesn't look clickable
        .replace(/hover:[a-zA-Z0-9_\[\]\-#]+/g, '')
        .replace(/group-hover:[a-zA-Z0-9_\[\]\-#]+/g, '')
        .replace(/cursor-pointer/g, 'cursor-default')
        // remove any ArrowRight icons inside since it's not clickable
        .replace(/<ArrowRight[\s\S]*?\/>/g, '');

    // Now wrap in ternary
    const newMapContent = `{ [${mappedArray}].map(${newParamName} => (
              isBuilt 
                ? ${originalElement}
                : ${spanElement}
            )) }`;
            
    content = content.replace(match[0], newMapContent);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
