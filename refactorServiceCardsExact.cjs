const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const startStr = '<div className="grid grid-cols-1 md:grid-cols-2 gap-[calc(1.25*var(--scale-unit))] w-full mb-6">';
const endStr = '</div>\n                  </div>\n                );\n              })}\n            </div>';

const startIndex = content.indexOf(startStr);
if (startIndex !== -1) {
  const endIndex = content.indexOf(endStr, startIndex) + endStr.length;
  const originalBlock = content.substring(startIndex, endIndex);

  const replacementBlock = `<div className="grid grid-cols-1 md:grid-cols-3 gap-[calc(1.25*var(--scale-unit))] w-full mb-6">
              {[
                { 
                  id: "Standard", 
                  title: "Standard Clean", 
                  desc: "Maintenance clean on your schedule – same cleaner every visit.",
                  icon: Sparkles,
                  bullets: ["General up-keep", "Kitchen & bathrooms", "Dusting & floors"],
                  popular: true
                },
                { 
                  id: "Deep", 
                  title: "Deep Clean", 
                  desc: "Complete detailed scrub of every corner, walls & details.",
                  icon: Briefcase,
                  bullets: ["Inside cabinets", "Heavy grime buildup", "Skirting boards"],
                  popular: false
                },
                { 
                  id: "Vacate", 
                  title: "End of Lease", 
                  desc: "Cleaned to rental inspection standards with bond-back guarantee.",
                  icon: DoorOpen,
                  bullets: ["Oven & rangehood", "Window tracking", "Spot cleaning walls"],
                  popular: false
                }
              ].map((type) => {
                const isSelected = formData.cleaningType === type.id;
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    onClick={() => setFormData({ ...formData, cleaningType: type.id as any })}
                    className={\`relative border-2 rounded-[calc(1.25*var(--scale-unit))] p-[calc(1.25*var(--scale-unit))] cursor-pointer transition-all duration-300 flex flex-col h-full \${
                      isSelected
                        ? "border-[#FB8C42] bg-[#FFF8F3] shadow-[0_15px_30px_rgba(249,115,22,0.06)] scale-[1.02] z-10"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                    }\`}
                  >
                    {type.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#FB8C42] text-white text-[calc(0.55*var(--scale-unit))] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md z-10 whitespace-nowrap">
                        MOST POPULAR
                      </span>
                    )}
                    
                    <div className="flex items-center gap-3 mb-3 mt-1">
                      <div className={\`p-2 rounded-lg \${isSelected ? "bg-[#FB8C42]/10" : "bg-gray-100"}\`}>
                        <Icon className={\`w-6 h-6 \${isSelected ? "text-[#FB8C42]" : "text-gray-500"}\`} />
                      </div>
                      <h3 className="text-[calc(0.9375*var(--scale-unit))] font-semibold text-gray-900">{type.title}</h3>
                    </div>
                    
                    <p className="text-[calc(0.75*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-4 min-h-[48px]">
                      {type.desc}
                    </p>

                    <ul className="space-y-1.5 mb-5 flex-1">
                      {type.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[calc(0.72*var(--scale-unit))] text-gray-700 font-medium">
                          <Check className="w-[calc(1.25*var(--scale-unit))] h-[calc(1.25*var(--scale-unit))] text-[#FB8C42] shrink-0" strokeWidth={3} />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-[calc(1.5*var(--scale-unit))]">
                      {isSelected ? (
                        <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full bg-[#FB8C42]/10 border-[1.5px] border-[#FB8C42] text-[#FB8C42] font-semibold text-[calc(0.78*var(--scale-unit))] flex items-center justify-center gap-2">
                          <Check className="w-[calc(1*var(--scale-unit))] h-[calc(1*var(--scale-unit))]" /> Selected
                        </div>
                      ) : (
                        <button className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full border-[1.5px] border-gray-200 text-gray-700 font-semibold text-[calc(0.78*var(--scale-unit))] whitespace-nowrap hover:border-gray-300 hover:bg-gray-50 transition-colors">
                          Select {type.id}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>`;

  content = content.replace(originalBlock, replacementBlock);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log("Replaced successfully!");
} else {
  console.log("Could not find start index.");
}
