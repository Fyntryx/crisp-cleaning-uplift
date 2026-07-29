const fs = require('fs');

const path = 'src/components/BookingPageFlow.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Safely add Clock to lucide-react imports
if (!content.includes('Clock,')) {
    // find 'lucide-react' import block and insert Clock,
    content = content.replace(/import\s*\{([\s\S]*?)\}\s*from\s*["']lucide-react["'];/, (match, p1) => {
        return `import { Clock, ${p1} } from "lucide-react";`;
    });
}

// 2. Redesign the grid and button
const oldGridStart = `<div className="grid grid-cols-3 gap-2.5">`;
const newGridStart = `<div className="grid grid-cols-2 gap-[calc(0.75*var(--scale-unit))]">`;
content = content.replace(oldGridStart, newGridStart);

const oldButtonRegex = /className=\{`w-full py-\[calc\(0\.625\*var\(--scale-unit\)\)\] px-\[calc\(0\.0625\*var\(--scale-unit\)\)\] rounded-full border-\[1\.5px\] text-center text-\[calc\(0\.78125\*var\(--scale-unit\)\)\] transition-all \$\{isSelected[\s\S]*?\?\s*"border-brand bg-cream-tag text-brand-dark font-semibold shadow-sm"[\s\S]*?:\s*"border-tan bg-white text-\[#5c534b\] font-medium hover:border-brand\/30 hover:bg-cream-tag\/20"[\s\S]*?\}`\}[\s\S]*?>[\s\S]*?\{time\}[\s\S]*?<\/button>/;

const newButton = `className={\`w-full py-[calc(0.875*var(--scale-unit))] px-3 rounded-xl border-[1.5px] flex items-center justify-center gap-[calc(0.5*var(--scale-unit))] text-[calc(0.8125*var(--scale-unit))] transition-all duration-200 shadow-sm \${isSelected
                        ? "border-brand bg-brand/5 text-brand-dark font-semibold ring-1 ring-brand/20"
                        : "border-gray-200 bg-white text-gray-600 font-medium hover:border-brand/40 hover:bg-brand/5 hover:text-brand-dark hover:shadow-md"
                        }\`}
                    >
                      <Clock className="w-[calc(1*var(--scale-unit))] h-[calc(1*var(--scale-unit))] opacity-60" />
                      <span>{time}</span>
                    </button>`;

content = content.replace(oldButtonRegex, newButton);

fs.writeFileSync(path, content);
console.log('Done redesigning slots');
