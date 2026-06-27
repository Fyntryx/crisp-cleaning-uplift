const fs = require('fs');
let c = fs.readFileSync('src/components/lp/HamptonClient.tsx', 'utf-8');

const targetStr = `            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="relative bg-white border border-gray-200 rounded-[16px] px-8 pb-8 shadow-sm hover:border-[#FB8C42] transition-colors duration-200 group h-full">
                  <div className="absolute top-0 left-8 flex items-baseline gap-2 bg-[#F7F9FB] px-2" style={{ marginTop: '-24px' }}>
                    <span className="text-[28px] font-extrabold text-[#FB8C42] leading-none">{card.stat}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 leading-none">{card.label}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4 mt-6">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F7FF] flex items-center justify-center shrink-0 text-[#FB8C42]">
                      {card.icon}
                    </div>
                    <h3 className="text-[17px] font-bold text-gray-900 leading-snug">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-[15px] text-gray-600 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))`;

const replacementStr = `            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
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
              </ScrollReveal>
            ))`;

fs.writeFileSync('src/components/lp/HamptonClient.tsx', c.replace(targetStr, replacementStr));
