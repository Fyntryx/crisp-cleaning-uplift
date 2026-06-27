const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/lp');
const filesToUpdate = fs.readdirSync(dir).filter(f => f.endsWith('Client.tsx'));

const newCta = `<a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>`;

filesToUpdate.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // We find the pricing section
  const startRegex = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">|<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">|<div className="grid grid-cols-1 md:grid-cols-3 gap-8">|<div className="max-w-\[1200px\] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">/;
  
  const match = content.match(startRegex);
  if (match) {
    const parts = content.split(match[0]);
    let before = parts[0];
    let afterStart = parts.slice(1).join(match[0]);
    
    // Now split by `</section>`
    const parts2 = afterStart.split('</section>');
    let pricingContent = parts2[0]; 
    let afterPricing = parts2.slice(1).join('</section>');

    // Inject CTA if it's missing (i.e. `</ul>` directly followed by `</div>` with only whitespace)
    pricingContent = pricingContent.replace(/<\/ul>\s*<\/div>/g, '</ul>\n                ' + newCta + '\n              </div>');

    content = before + match[0] + pricingContent + '</section>' + afterPricing;
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Injected missing CTAs into ${file}`);
    }
  } else {
    console.log(`Could not find pricing section in ${file}`);
  }
});
