const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// STRIP PRICING FROM BookingSummaryCard

// Remove "Discount {pricingResult?.discounts?.frequency?.name}" and related code
content = content.replace(
/\{\s*pricingResult\?\.discounts\?\.frequency\s*&&\s*\([\s\S]*?\)\s*\}/g,
''
);

// Remove promo discount block
content = content.replace(
/\{\s*pricingResult\?\.discounts\?\.promo\s*&&\s*\([\s\S]*?\)\s*\}/g,
''
);

// Remove Large Service Discount
content = content.replace(
/\{\s*\(pricingResult\?\.largeServiceDiscountAmount\s*\?\?\s*0\)\s*>\s*0\s*&&\s*\([\s\S]*?\)\s*\}/g,
''
);

// Remove Travel Fee block
content = content.replace(
/\{\s*outOfAreaFee\s*>\s*0\s*&&\s*\([\s\S]*?\)\s*\}/g,
''
);

// Remove the estimated total breakdown block
content = content.replace(
/<\s*div\s+className="flex justify-between items-end"[\s\S]*?<\/\s*div\s*>/,
''
);

// Remove promo code input section (starts with {/* --- PROMO CODE SECTION --- */} and ends before {/* Out of Area Fee Banner */})
content = content.replace(
/\{\s*\/\*\s*---\s*PROMO CODE SECTION\s*---\s*\*\/[\s\S]*?\{\s*\/\*\s*Out of Area Fee Banner\s*\*\/\s*\}/,
'{/* Out of Area Fee Banner */}'
);

// Inside BookingSummaryCard breakdown, remove prices from items
content = content.replace(
/<\span\s+className="text-\[12\.5px\] font-normal text-\[#2b2523\]"\s*>\s*\$\{(.+?)\}\s*<\/span>/g,
''
);

content = content.replace(
/<\span\s+className="text-\[12\.5px\] font-normal text-\[#2b2523\]"\s*>\s*\$pricingResult\.breakdown\.cleaningType\.price\.toFixed\(2\)\s*<\/span>/g,
''
);

// Remove `+$XX` from extras in renderResStep2.
// Usually they look like `{`+$${EXTRA_PRICES[e].toFixed(0)}`}` or similar.
// Wait, I will just search for `+$\{(.+?)\}` or `+A$\{(.+?)\}` in the file.
content = content.replace(
/\+\$\{\s*EXTRA_PRICES\[e\.(?:id|name)\]\.toFixed\(0\)\s*\}/g,
''
);
content = content.replace(
/\+\$\{\s*EXTRA_PRICES\[extra\.name\]\?(?:\.toFixed\(0\))?\s*\}/g,
''
);
content = content.replace(
/\+\$\{\s*EXTRA_PRICES\[e\.name\].toFixed\(0\)\s*\}/g,
''
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Phase 2 completed');
