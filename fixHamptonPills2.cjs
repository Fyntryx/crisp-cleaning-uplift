const fs = require('fs');
let c = fs.readFileSync('src/components/lp/HamptonClient.tsx', 'utf-8');

const regex = /<ScrollReveal key=\{i\} delay=\{i \* 0\.1\}>[\s\S]*?<\/ScrollReveal>/;
const newStr = `<ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm hover:border-[#FB8C42]/50 transition-colors duration-200 group h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-[48px] h-[48px] rounded-xl bg-[#F0F7FF] flex items-center justify-center shrink-0 text-[#FB8C42]">
                      {card.icon}
                    </div>
                    <div className="flex items-baseline gap-1.5 bg-[#fff7ed] px-3 py-1.5 rounded-full">
                      <span className="text-[14px] font-extrabold text-[#d97706] leading-none">{card.stat}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#d97706] leading-none">{card.label}</span>
                    </div>
                  </div>
                  <h3 className="text-[18px] font-bold text-gray-900 mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed flex-grow">
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>`;

fs.writeFileSync('src/components/lp/HamptonClient.tsx', c.replace(regex, newStr));
