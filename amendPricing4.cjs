const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/lp');
const filesToUpdate = ['EssendonClient.tsx', 'MalvernClient.tsx', 'MaribyrnongClient.tsx'];

const newCta = `<a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>`;

filesToUpdate.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  const startRegex = /<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">/;
  const parts = content.split(startRegex);
  
  if (parts.length === 2) {
    let before = parts[0];
    let afterStart = parts[1];
    
    // Now split by `</section>`
    const parts2 = afterStart.split('</section>');
    let pricingContent = parts2[0]; // This is everything inside the pricing section
    let afterPricing = parts2.slice(1).join('</section>');

    // Standard
    pricingContent = pricingContent.replace(/>\s*Regular clean\s*</gi, '>Standard<');
    pricingContent = pricingContent.replace(/\$180/g, '$145');
    
    // Deep
    pricingContent = pricingContent.replace(/>\s*Deep clean\s*</gi, '>Deep<');
    // We only replace the FIRST $320 because the Vacate card might also have $320.
    pricingContent = pricingContent.replace(/\$320/, '$235'); 
    pricingContent = pricingContent.replace(/>\s*Get a quote\s*</, '>From $235<'); 
    
    // Vacate
    pricingContent = pricingContent.replace(/>\s*End of lease\s*</gi, '>Vacate<');
    pricingContent = pricingContent.replace(/\$320/, '$380'); // Second $320 if any
    pricingContent = pricingContent.replace(/>\s*Fixed quote\s*</, '>From $380<');
    
    // CTAs
    pricingContent = pricingContent.replace(/<a href="\/#booking"[^>]*>[\s\S]*?<\/a>/g, newCta);

    content = before + '<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">' + pricingContent + '</section>' + afterPricing;
    
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Could not split ${file}`);
  }
});
