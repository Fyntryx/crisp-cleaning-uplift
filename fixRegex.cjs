const fs = require('fs');
let c = fs.readFileSync('applyBookingChanges.cjs', 'utf8');

c = c.replace(/\\/\\\\s\\*/g, '/\\s*');

// Replace the regex section from line 253 to the end:
let lines = c.split('\n');
let regexStart = lines.findIndex(l => l.includes('// STRIP PRICING FROM BookingSummaryCard'));
if (regexStart !== -1) {
  let newLines = lines.slice(0, regexStart);
  newLines.push(`// STRIP PRICING FROM BookingSummaryCard`);
  newLines.push(`c = c.replace(/\\{\\s*pricingResult\\?\\.discounts\\?\\.frequency\\s*&&\\s*\\([\\s\\S]*?\\)\\s*\\}/g, '');`);
  newLines.push(`c = c.replace(/\\{\\s*pricingResult\\?\\.discounts\\?\\.promo\\s*&&\\s*\\([\\s\\S]*?\\)\\s*\\}/g, '');`);
  newLines.push(`c = c.replace(/\\{\\s*\\(pricingResult\\?\\.largeServiceDiscountAmount\\s*\\?\\?\\s*0\\)\\s*>\\s*0\\s*&&\\s*\\([\\s\\S]*?\\)\\s*\\}/g, '');`);
  newLines.push(`c = c.replace(/\\{\\s*outOfAreaFee\\s*>\\s*0\\s*&&\\s*\\([\\s\\S]*?\\)\\s*\\}/g, '');`);
  newLines.push(`c = c.replace(/<\\s*div\\s+className="flex justify-between items-end"[\\s\\S]*?<\\/\\s*div\\s*>/, '');`);
  newLines.push(`c = c.replace(/\\{\\s*\\/\\*\\s*---\\s*PROMO CODE SECTION\\s*---\\s*\\*\\/[\\s\\S]*?\\{\\s*\\/\\*\\s*Out of Area Fee Banner\\s*\\*\\/\\s*\\}/, '{/* Out of Area Fee Banner */}');`);
  newLines.push(`c = c.replace(/<span\\s+className="text-\\[12\\.5px\\] font-normal text-\\[#2b2523\\]"\\s*>\\s*\\$\\{[^{}]*\\}\\s*<\\/span>/g, '');`);
  newLines.push(`c = c.replace(/<span\\s+className="text-\\[12\\.5px\\] font-normal text-\\[#2b2523\\]"\\s*>\\s*\\$pricingResult\\.breakdown\\.cleaningType\\.price\\.toFixed\\(2\\)\\s*<\\/span>/g, '');`);
  newLines.push(`c = c.replace(/\\+\\$\\{\\s*EXTRA_PRICES\\[e\\.(?:id|name)\\]\\.toFixed\\(0\\)\\s*\\}/g, '');`);
  newLines.push(`c = c.replace(/\\+\\$\\{\\s*EXTRA_PRICES\\[extra\\.name\\]\\?\\(?:\\.toFixed\\(0\\)\\)?\\s*\\}/g, '');`);
  newLines.push(`c = c.replace(/\\+\\$\\{\\s*EXTRA_PRICES\\[e\\.name\\]\\.toFixed\\(0\\)\\s*\\}/g, '');`);
  newLines.push(`fs.writeFileSync('src/components/RequestQuoteFlow.tsx', c, 'utf8');`);
  newLines.push(`console.log('Modifications completed.');`);
  c = newLines.join('\\n');
}

fs.writeFileSync('applyBookingChanges.cjs', c, 'utf8');
