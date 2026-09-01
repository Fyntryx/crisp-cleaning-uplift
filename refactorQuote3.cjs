const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// The replacement for the start of renderResStep2
const serviceTypeCards = `
        <div className="flex flex-col space-y-4">
          <div className="mb-2">
            <h3 className="text-[calc(1.375*var(--scale-unit))] font-semibold text-gray-900 mb-1">What type of clean do you need?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[calc(1.25*var(--scale-unit))] w-full mb-6">
            {['Standard', 'Deep', 'Vacate'].map((type) => {
              const isSelected = formData.cleaningType === type;
              return (
                <div
                  key={type}
                  onClick={() => setFormData({ ...formData, cleaningType: type as any })}
                  className={\`relative border-2 rounded-[calc(1.25*var(--scale-unit))] p-[calc(1.25*var(--scale-unit))] cursor-pointer transition-all duration-300 flex flex-col h-full \${
                    isSelected
                      ? "border-[#FB8C42] bg-[#FFF8F3] shadow-[0_15px_30px_rgba(249,115,22,0.06)]"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                  }\`}
                >
                  <div className="mt-1">
                    <h3 className="text-[calc(0.9375*var(--scale-unit))] font-semibold text-gray-900 mb-1.5">{type} Clean</h3>
                  </div>
                  <div className="mt-auto pt-[calc(1.5*var(--scale-unit))]">
                    {isSelected ? (
                      <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full bg-[#FB8C42]/10 border-[1.5px] border-[#FB8C42] text-[#FB8C42] font-semibold text-[calc(0.78*var(--scale-unit))] flex items-center justify-center gap-2">
                        <Check className="w-[calc(1*var(--scale-unit))] h-[calc(1*var(--scale-unit))]" /> Selected
                      </div>
                    ) : (
                      <button className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full border-[1.5px] border-gray-200 text-gray-700 font-semibold text-[calc(0.78*var(--scale-unit))] whitespace-nowrap hover:border-gray-300 hover:bg-gray-50 transition-colors">
                        Select {type}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
`;

content = content.replace(
  /<div className="flex flex-col space-y-4">[\s\S]*?\{formData\.cleaningType === 'Hourly' \? \(/,
  serviceTypeCards + "\n          {formData.cleaningType === 'Hourly' ? ("
);

// We need to also rename Checkout to Submit in Step 5 (which is renderResStep5)
// And modify CTA button text.
// Change address field to be on renderResStep4 instead of 5.

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Phase 3 (Service Types) completed');
