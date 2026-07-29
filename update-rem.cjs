const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, 'src/components/BookingPageFlow.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// We want to match things like w-[216px], min-w-[300px], max-w-[768px], text-[13px], pt-[15px], etc.
// But we want to IGNORE border-[1px], border-b-[2px], rounded-[999px].

const regex = /([a-zA-Z0-9_-]+)-\[([0-9.]+)px\]/g;

content = content.replace(regex, (match, prefix, pxValue) => {
  // Check if it's a border or rounded utility
  if (prefix.includes('border') || prefix.includes('rounded')) {
    return match; // do not scale borders or border-radius (designer said leave radii as rem or 999px, wait. Let's just leave rounded-[Xpx] alone for now to be safe, except pills are 999px anyway)
  }

  const px = parseFloat(pxValue);
  const rem = px / 16;
  
  // Format rem to avoid long decimals, e.g., 1.375
  // But keep it precise enough
  const remStr = rem.toString().replace(/0+$/, '').replace(/\.$/, '');
  
  return `${prefix}-[${remStr}rem]`;
});

// Write back
fs.writeFileSync(targetFile, content);
console.log('Conversion complete!');
