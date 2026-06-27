const fs = require('fs');
let content = fs.readFileSync('src/components/lp/HamptonClient.tsx', 'utf-8');

const targetStr = `                  </p>
                </div>
              </motion.div>
            </div>`;

const replacementStr = `                className="w-full relative"
              >
                <div className="w-full h-[520px] rounded-[24px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.10)] relative">
                  <Image 
                    src="/images/housecleaning-hampton.jpg"
                    alt="Clean coastal home interior in Hampton Melbourne"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                
                <div className="absolute -bottom-[20px] -left-[20px] bg-[#ffffff] rounded-[16px] px-[20px] py-[16px] shadow-[0_8px_32px_rgba(0,0,0,0.10)] flex items-center gap-[12px] z-20">
                  <div className="w-[40px] h-[40px] rounded-full bg-[#fff7ed] flex items-center justify-center shrink-0">
                    <svg className="w-[18px] h-[18px] text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-[700] text-[#1a1a1a] leading-none">Hampton Beach</span>
                    <span className="text-[11px] text-[#9ca3af] mt-[2px] leading-none">Foreshore · Bayside</span>
                  </div>
                </div>
              </motion.div>
            </div>`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/components/lp/HamptonClient.tsx', content);
