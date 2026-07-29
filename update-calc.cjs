const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, 'src/components/BookingPageFlow.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Regex matches prefix-[Xpx] where prefix doesn't end with a colon.
// It will match min-[880px] if we aren't careful, so we explicitly exclude min- and max- when they are used as breakpoint queries.
// Tailwind breakpoints look like `min-[880px]:flex-col`.
// So we want to replace utilities like: w-[216px], max-w-[768px], text-[13px], pt-[15px]
// But ignore: min-[880px]:, max-[1179px]:, border-[1px], rounded-[999px]

const regex = /([a-zA-Z0-9_-]+)-\[([0-9.]+)px\]/g;

content = content.replace(regex, (match, prefix, pxValue) => {
  // If it's a breakpoint media query prefix, or a border, or a radius, ignore it.
  if (prefix === 'min' || prefix === 'max') {
    // Check if it's a media query (usually followed by ':')
    // Wait, max-w is prefix 'max-w'. 'min' is the prefix for min-[880px].
    return match;
  }
  if (prefix.includes('border') || prefix.includes('rounded')) {
    return match;
  }

  const px = parseFloat(pxValue);
  const rem = px / 16;
  const remStr = rem.toString().replace(/0+$/, '').replace(/\.$/, '');
  
  return `${prefix}-[calc(${remStr}*var(--scale-unit))]`;
});

fs.writeFileSync(targetFile, content);
console.log('Conversion complete!');
