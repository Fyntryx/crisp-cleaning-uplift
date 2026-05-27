const fs = require('fs');
let file = fs.readFileSync('src/components/Services.tsx', 'utf8');

// 1. Remove the white parent container background in Step 4 and Step 5
file = file.replace(/p-6 md:p-8 bg-\[#FFFAF6\] rounded-\[32px\]/g, 'pt-4');

// 2. Increase the text size of labels in Step 4 and Step 5
file = file.replace(/text-\[11px\] font-semibold uppercase text-gray-400 tracking-wider flex items-center gap-1\.5/g, 'text-[12px] font-bold uppercase text-gray-500 tracking-wider flex items-center gap-2');

// 3. Increase the text size of inputs and selects
file = file.replace(/w-full px-4 py-3\.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-\[#FB8C42\]\/10 text-gray-700 font-semibold text-xs cursor-pointer appearance-none pr-10 shadow-sm transition-all/g, 'w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-gray-800 font-semibold text-[14.5px] cursor-pointer appearance-none pr-10 shadow-sm transition-all');

file = file.replace(/w-full px-4 py-3\.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-\[#FB8C42\]\/10 text-gray-700 font-semibold text-xs shadow-sm transition-all/g, 'w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#FB8C42]/10 text-gray-800 font-semibold text-[14.5px] shadow-sm transition-all');

// 4. Increase textarea text size
file = file.replace(/w-full p-4 bg-white border border-gray-200 rounded-xl outline-none resize-none h-28 text-gray-700 text-xs font-semibold placeholder:text-gray-400 leading-relaxed focus:ring-2 focus:ring-\[#FB8C42\]\/10 shadow-sm transition-all/g, 'w-full p-5 bg-white border border-gray-200 rounded-2xl outline-none resize-none h-32 text-gray-800 text-[14.5px] font-semibold placeholder:text-gray-400 leading-relaxed focus:ring-2 focus:ring-[#FB8C42]/10 shadow-sm transition-all');

// 5. Increase icons slightly to match bigger labels
file = file.replace(/<PawPrint className=\"w-3\.5 h-3\.5/g, '<PawPrint className=\"w-4 h-4');
file = file.replace(/<Car className=\"w-3\.5 h-3\.5/g, '<Car className=\"w-4 h-4');
file = file.replace(/<Key className=\"w-3\.5 h-3\.5/g, '<Key className=\"w-4 h-4');
file = file.replace(/<AlertTriangle className=\"w-3\.5 h-3\.5/g, '<AlertTriangle className=\"w-4 h-4');
file = file.replace(/<FileText className=\"w-3\.5 h-3\.5/g, '<FileText className=\"w-4 h-4');

fs.writeFileSync('src/components/Services.tsx', file);
console.log("Done");
