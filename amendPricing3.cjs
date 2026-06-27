const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/lp');
const files = fs.readdirSync(dir).filter(f => f.endsWith('Client.tsx'));

const newCta = `<a href="/#booking" className="block w-full text-center bg-[#d97706] text-[#ffffff] rounded-[99px] px-[24px] py-[12px] text-[14px] font-[600] mt-[20px] hover:bg-[#b45309] hover:-translate-y-[1px] transition-all duration-200">
                  Get an Instant Quote
                </a>`;

const bullets1 = `<ul className="space-y-4 mb-8 flex-1 mt-4">
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Up to 3 bed</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All bathrooms</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Eco products included</li>
            </ul>`;

const bullets2 = `<ul className="space-y-4 mb-8 flex-1 mt-4">
              <li className="flex items-center gap-3 text-[14px] text-white font-[500]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Full property scope</li>
              <li className="flex items-center gap-3 text-[14px] text-white font-[500]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Oven & inside cabinets</li>
              <li className="flex items-center gap-3 text-[14px] text-white font-[500]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Grout & hard-to-reach areas</li>
            </ul>`;

const bullets3 = `<ul className="space-y-4 mb-8 flex-1 mt-4">
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Bond-back standard</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> All rooms & surfaces</li>
              <li className="flex items-center gap-3 text-[14px] text-[#374151]"><CheckCircle2 className="w-5 h-5 text-[#d97706]" /> Inspection ready</li>
            </ul>`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  const regex = /{\/\*\s*(?:Regular Clean|Card 1)\s*\*\/}|{\/\*\s*(?:Deep Clean — featured|Card 2 - Featured)\s*\*\/}|{\/\*\s*(?:End of Lease|Card 3)\s*\*\/}/;
  let parts = content.split(regex);
  const delims = content.match(new RegExp(regex, 'g'));
  
  if (parts.length === 4 && delims.length === 3) {
    let before = parts[0];
    let c1 = parts[1];
    let c2 = parts[2];
    let c3 = parts[3];
    
    // Process Card 1 (Standard)
    c1 = c1.replace(/>Regular [Cc]lean</i, '>Standard<');
    c1 = c1.replace(/\$180/g, '$145');
    c1 = c1.replace(/<a href="\/#booking"[^>]*>[\s\S]*?<\/a>/, newCta);
    if (!c1.includes('Up to 3 bed')) {
      c1 = c1.replace(/<p[^>]*>per visit[\s\S]*?<\/p>\s*<p[^>]*>Weekly & fortnightly<\/p>/, bullets1 + '\n' + newCta);
    }
    
    // Process Card 2 (Deep)
    c2 = c2.replace(/>Deep [Cc]lean</i, '>Deep<');
    c2 = c2.replace(/\$320/g, '$235');
    c2 = c2.replace(/>\s*Get a quote\s*</, '>From $235<'); // From $235 (if it was "Get a quote" in large font)
    // For the CTA that might have "Get a quote <ArrowRight"
    c2 = c2.replace(/<a href="\/#booking"[^>]*>[\s\S]*?<\/a>/, newCta);
    if (!c2.includes('Full property scope')) {
      c2 = c2.replace(/<p[^>]*>scope-based pricing<\/p>/, bullets2); // The <a> is already replaced above
    }
    
    // Process Card 3 (Vacate)
    c3 = c3.replace(/>End of [Ll]ease</i, '>Vacate<');
    c3 = c3.replace(/\$320/, '$380');
    c3 = c3.replace(/>\s*Fixed quote\s*</, '>From $380<');
    c3 = c3.replace(/>\s*Get a quote\s*</, '>From $380<');
    
    c3 = c3.replace(/<a href="\/#booking"[^>]*>[\s\S]*?<\/a>/, newCta);
    if (!c3.includes('Bond-back standard')) {
        c3 = c3.replace(/<p[^>]*>scope-based pricing<\/p>\s*<p[^>]*>Fixed price guaranteed<\/p>/, bullets3 + '\n' + newCta);
    }

    content = before + delims[0] + c1 + delims[1] + c2 + delims[2] + c3;
  } else {
    console.log(`Could not split ${file} properly (Length: ${parts.length})`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});
