const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/lp');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Client.tsx'));

const newCta = `<a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">\n                  Get an Instant Quote\n                </a>`;

for (let file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Labels
  content = content.replace(/>\s*Regular [Cc]lean\s*</g, '>Standard<');
  content = content.replace(/>\s*Deep [Cc]lean\s*</g, '>Deep<');
  content = content.replace(/>\s*End of [Ll]ease\s*</g, '>Vacate<');
  
  // 2. Prices
  content = content.replace(/\$180/g, '$145');
  
  // Splitting by cards is the safest way to target the prices for Deep vs Vacate
  const parts = content.split(/(>Standard<|>Deep<|>Vacate<)/);
  if (parts.length >= 7) {
    // parts[4] = Deep
    parts[4] = parts[4].replace(/\$320/g, '$235');
    parts[4] = parts[4].replace(/>\s*Get a quote\s*</g, '>$235<');
    parts[4] = parts[4].replace(/Get a quote <ArrowRight/g, '$235 <ArrowRight');

    // parts[6] = Vacate
    parts[6] = parts[6].replace(/\$320/g, '$380');
    parts[6] = parts[6].replace(/>\s*Fixed quote\s*</g, '>From $380<');
    parts[6] = parts[6].replace(/>\s*Get a quote\s*</g, '>$380<');
  } else {
    // Fallback if the labels weren't exactly matched (e.g. if one was already Vacate)
    console.log(`Could not split ${file} properly (Length: ${parts.length}). Skipping price fixes.`);
  }

  content = parts.join('');

  // 3. CTA Buttons
  // The cards currently have different CTAs.
  // In SouthYarra: `<a href="/#booking" className="block text-center w-full ...">Book Regular</a>`
  // We can replace any `<a href="/#booking"[^>]*>.*?<\/a>` inside the pricing section.
  // We can locate the Pricing section which starts with "Pricing" or "Transparent Pricing".
  // But there's also the hero booking button. We ONLY want to replace the buttons inside the pricing cards.
  // Let's do it card by card.
  
  const parts2 = content.split(/(>Standard<|>Deep<|>Vacate<)/);
  if (parts2.length >= 7) {
    // Card 1
    // Some cards don't have an <a> tag! Brighton has:
    // <p className="text-[12px] text-gray-400 mb-4">per visit · Start cleaning</p>
    // <p className="text-[12px] font-semibold text-[#FB8C42]">Weekly & fortnightly</p>
    // Let's just replace everything from the end of the bullets (or price if no bullets) to the end of the card div.
    // To do this safely, let's just find the existing <a> tag in the card and replace it.
    // For Brighton which doesn't have <a> in Card 1 & 3:
    parts2[2] = parts2[2].replace(/<p className="text-\[12px\] text-gray-400 mb-4">per visit · Start cleaning<\/p>\s*<p className="text-\[12px\] font-semibold text-\[#FB8C42\]">Weekly & fortnightly<\/p>/, newCta);
    parts2[2] = parts2[2].replace(/<a href="\/#booking"[^>]*>[\s\S]*?<\/a>/, newCta);

    // Card 2
    parts2[4] = parts2[4].replace(/<a href="\/#booking"[^>]*>[\s\S]*?<\/a>/, newCta);

    // Card 3
    parts2[6] = parts2[6].replace(/<p className="text-\[12px\] text-gray-400 mb-4">scope-based pricing<\/p>\s*<p className="text-\[12px\] font-semibold text-\[#FB8C42\]">Fixed price guaranteed<\/p>/, newCta);
    parts2[6] = parts2[6].replace(/<a href="\/#booking"[^>]*>[\s\S]*?<\/a>/, newCta);
  }

  content = parts2.join('');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
}
