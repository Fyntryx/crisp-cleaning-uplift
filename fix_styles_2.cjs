const fs = require('fs');
let file = fs.readFileSync('src/components/Services.tsx', 'utf8');

// Labels
file = file.replace(/text-\[12px\] font-bold uppercase text-gray-500 tracking-wider flex items-center gap-2/g, 'text-[12px] font-semibold uppercase text-stone-500 tracking-[0.6px] leading-[18px] flex items-center gap-2');

// 1. Selects in Step 4
file = file.replace(/w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-\[#FB8C42\]\/10 text-gray-800 font-semibold text-\[14\.5px\] cursor-pointer appearance-none pr-10 shadow-sm transition-all/g, 'w-full px-[14px] py-[12px] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[14.5px] tracking-normal cursor-pointer appearance-none pr-10 shadow-sm transition-all');

// 2. Inputs in Step 5 (with pr-12 for password)
file = file.replace(/w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-\[#FB8C42\]\/10 text-gray-800 font-semibold text-\[14\.5px\] shadow-sm transition-all pr-12/g, 'w-full px-[14px] py-[12px] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[14.5px] tracking-normal shadow-sm transition-all pr-12');

// 3. Inputs in Step 5 (regular)
file = file.replace(/w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-\[#FB8C42\]\/10 text-gray-800 font-semibold text-\[14\.5px\] shadow-sm transition-all/g, 'w-full px-[14px] py-[12px] bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-stone-900 font-normal text-[14.5px] tracking-normal shadow-sm transition-all');

// 4. Textarea in Step 4
file = file.replace(/w-full p-5 bg-white border border-gray-200 rounded-2xl outline-none resize-none h-32 text-gray-800 text-\[14\.5px\] font-semibold placeholder:text-gray-400 leading-relaxed focus:ring-2 focus:ring-\[#FB8C42\]\/10 shadow-sm transition-all/g, 'w-full px-[14px] py-[12px] bg-white border border-gray-200 rounded-xl outline-none resize-none h-32 text-stone-900 text-[14.5px] font-normal tracking-normal placeholder:text-gray-400 leading-relaxed focus:ring-2 focus:ring-[#FB8C42]/10 shadow-sm transition-all');

fs.writeFileSync('src/components/Services.tsx', file);
console.log("Done");
