const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/lp');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Client.tsx'));

const ctaButton = `<a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // We are going to replace labels:
  // "Regular clean" -> "Standard"
  // "Deep clean" -> "Deep"
  // "End of lease" -> "Vacate"
  
  content = content.replace(/(>|\b)(Regular [Cc]lean)(<|\b)/g, '$1Standard$3');
  content = content.replace(/(>|\b)(Deep [Cc]lean)(<|\b)/g, '$1Deep$3');
  content = content.replace(/(>|\b)(End of [Ll]ease)(<|\b)/g, '$1Vacate$3');
  // For BrightonClient which has "End of Lease"
  content = content.replace(/(>|\b)(End of Lease)(<|\b)/g, '$1Vacate$3');
  content = content.replace(/(>|\b)(Regular Clean)(<|\b)/g, '$1Standard$3');
  content = content.replace(/(>|\b)(Deep Clean)(<|\b)/g, '$1Deep$3');

  // Replace Prices
  // SouthYarra/Toorak use "From $180" in one block, Brighton uses "From" and "$180" in separate blocks.
  // We'll replace "$180" with "$145". (Since all standard cleans were $180, this is safe).
  content = content.replace(/\$180/g, '$145');
  
  // We'll replace "$320" with "$235" (Deep clean). But wait, what if "Fixed quote" was used instead?
  // End of lease was "Fixed quote" or "$320". Deep was "$320".
  // Let's just replace $320 with $235 first. 
  // Wait, EOL was also $320 in some places! If we do a global replace, both will become $235.
  // We need to scope to the cards!

});

console.log("Done");
