const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const newSummaryCard = `const BookingSummaryCard = ({
  className = "",
  formData,
  pricingConfig,
  pricingResult,
  promoCode,
  setPromoCode,
  isValidatingPromo,
  setIsValidatingPromo,
  appliedPromo,
  setAppliedPromo,
  appliedReferral,
  setAppliedReferral,
  apiBaseUrl,
  outOfAreaFee = 0,
  currentStep = 1,
}: any) => {
  const formatEta = (mins: number) => {
    if (mins < 60) return \`\${mins} mins\`;
    const hrs = Math.floor(mins / 60);
    const rm = mins % 60;
    return rm > 0 ? \`\${hrs}h \${rm}m\` : \`\${hrs} hrs\`;
  };

  return (
  <div
    className={\`bg-cream px-6 py-[calc(1.625*var(--scale-unit))] gap-2.5 text-[calc(0.78125*var(--scale-unit))] relative overflow-visible border-l border-[#f2eadf] \${className}\`}
  >
    <div className="mb-6 relative z-10 flex flex-col items-start gap-2">
      <div className="w-full mb-3">
        <h2 className="text-[11px] font-[700] text-[#8d8378] tracking-[0.1em] uppercase">
          QUOTE SUMMARY
        </h2>
      </div>
      {formData.contact?.firstName && (
        <h3 className="text-[14px] font-[600] text-[#2b2523]">
          Hi {formData.contact.firstName}
        </h3>
      )}
    </div>

    <div className="w-full h-px bg-[#f2eadf] my-5" />

    <div className="relative z-10 text-[calc(0.90625*var(--scale-unit))]">
        <div className="flex justify-between items-center py-3.5">
          <span className="text-[12.5px] font-medium text-[#8d8378]">Service Type</span>
          <span className="text-[12.5px] font-normal text-[#2b2523]">{formData.cleaningType || "Standard"} Clean</span>
        </div>

        {formData.selectedDate && formData.selectedTime && (
            <div className="flex justify-between items-center py-2 gap-4">
              <span className="text-[12.5px] font-medium text-[#8d8378] whitespace-nowrap">Date & Time</span>
              <span className="text-[12.5px] font-normal text-[#2b2523] text-right">
                {formData.selectedDate.toLocaleDateString("en-AU", { weekday: 'long', day: 'numeric', month: 'long' })} at {formData.selectedTime}
              </span>
            </div>
        )}

        <div className="flex justify-between items-center py-2 mb-2">
          <span className="text-[12.5px] font-medium text-[#8d8378]">Frequency</span>
          <span className="text-[12.5px] font-normal text-[#2b2523]">{formData.frequency || "One time"}</span>
        </div>

      <div className="mt-2 text-[15px] font-[400] text-[#8d8378] leading-[1.55]">
        {currentStep === 1 ? (
          <p>Please select your services to continue.</p>
        ) : formData.cleaningType === 'Hourly' ? (
          <p>Billed on time worked &mdash; this is your cap.</p>
        ) : (
          (pricingResult?.estimatedMinutes ?? 0) > 0 && (
            <div className="flex justify-between w-full pt-1">
              <span className="text-[13px] font-medium text-[#8d8378]">Estimated Time</span>
              <span className="text-[13px] font-medium text-[#2b2523]">{formatEta(pricingResult.estimatedMinutes)}</span>
            </div>
          )
        )}
      </div>

      <div className="w-full h-px bg-[#f2eadf] mt-5 mb-4" />
      
      <div className="relative group cursor-help w-full">
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-[260px] bg-[#2b2523] text-white text-[12.5px] font-medium text-center px-4 py-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl leading-snug">
          Not Happy? Receive a 100% refund if your concerns are not addressed!
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-[#2b2523] border-t-8 border-x-transparent border-x-8 border-b-0 w-0 h-0" />
        </div>
        
        {/* Pill */}
        <div className="flex items-center justify-center gap-2 bg-[#fff4ea] border border-[#f6d3b3]/50 py-2.5 px-4 rounded-xl w-full transition-colors group-hover:bg-[#ffe9d6]">
          <CheckCircle2 className="w-4 h-4 text-[#e0731f]" strokeWidth={2.5} />
          <span className="text-[13.5px] font-bold text-[#e0731f]">Satisfaction Guaranteed</span>
        </div>
      </div>
    </div>
  </div>
  );
};`;

const startIndex = content.indexOf('const BookingSummaryCard =');
const endIndex = content.indexOf('const CountdownTimer =');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newSummaryCard + '\\n\\n' + content.substring(endIndex);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed BookingSummaryCard successfully');
} else {
  console.log('Could not find the bounds to replace');
}
