const fs = require('fs');

const simplifiedSummary = `const BookingSummaryCard = ({
  className = "",
  formData,
  currentStep = 1,
}: {
  className?: string;
  formData: any;
  pricingConfig?: any;
  pricingResult?: any;
  promoCode?: string;
  setPromoCode?: (val: string) => void;
  isValidatingPromo?: boolean;
  setIsValidatingPromo?: (val: boolean) => void;
  appliedPromo?: any;
  setAppliedPromo?: (val: any) => void;
  appliedReferral?: any;
  setAppliedReferral?: (val: any) => void;
  apiBaseUrl?: string;
  outOfAreaFee?: number;
  currentStep?: number;
}) => (
  <div
    className={\`bg-cream px-6 py-[calc(1.625*var(--scale-unit))] gap-2.5 text-[calc(0.78125*var(--scale-unit))] relative overflow-visible border-l border-[#f2eadf] \${className}\`}
  >
    <div className="mb-6 relative z-10 flex flex-col items-start gap-2">
      <div className="w-full mb-3">
        <h2 className="text-[11px] font-[700] text-[#8d8378] tracking-[0.1em] uppercase">
          BOOKING SUMMARY
        </h2>
      </div>
      {formData.contact?.firstName && (
        <h3 className="text-[14px] font-[600] text-[#2b2523]">
          Hi {formData.contact.firstName}
        </h3>
      )}
      <div className="flex flex-wrap gap-2">
        {(() => {
          const badges: any[] = [];
          if (formData.frequency === "Weekly") badges.push(\`WEEKLY CLEAN\`);
          else if (formData.frequency === "Fortnightly") badges.push(\`FORTNIGHTLY CLEAN\`);
          else if (formData.frequency === "Monthly") badges.push(\`MONTHLY CLEAN\`);

          if (formData.cleaningType === "Vacate") badges.push("BOND BACK GUARANTEE");

          return badges.map((badge, i) => (
            <div key={i} className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#fff4ea] text-[#e0731f] text-[10px] font-bold tracking-wider uppercase border border-[#f6d3b3]/50">
              {badge}
            </div>
          ));
        })()}
      </div>
    </div>

    <div className="flex flex-col gap-6 relative z-10 text-[13px]">
      <div className="flex flex-col gap-[calc(1*var(--scale-unit))]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-semibold text-[#2b2523] mb-[calc(0.125*var(--scale-unit))]">
              {formData.serviceCategory === "commercial" ? "Commercial Clean" : \`\${formData.cleaningType} Clean\`}
            </span>
            <span className="text-[calc(0.75*var(--scale-unit))] text-[#8d8378]">
              {formData.frequency === "One-off" ? "One-off Service" : \`\${formData.frequency} Schedule\`}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);`;

let c = fs.readFileSync('src/components/RequestQuoteFlow.tsx', 'utf8');

// Find the start of BookingSummaryCard
let startIdx = c.indexOf('const BookingSummaryCard =');
// Find the end: it's a bit tricky, but it's followed by `export default RequestQuoteFlow;`
let endIdx = c.indexOf('export default RequestQuoteFlow;');

if (startIdx !== -1 && endIdx !== -1) {
    let before = c.substring(0, startIdx);
    let after = c.substring(endIdx);
    c = before + simplifiedSummary + '\\n\\n' + after;
    fs.writeFileSync('src/components/RequestQuoteFlow.tsx', c, 'utf8');
    console.log('Successfully replaced BookingSummaryCard.');
} else {
    console.log('Could not find BookingSummaryCard or export default.');
}
