const fs = require('fs');
let code = fs.readFileSync('src/components/BookingPageFlow.tsx', 'utf8');

const lines = code.split('\n');

// We want to replace from line 244 to 451 (0-indexed 243 to 450)
const before = lines.slice(0, 244).join('\n'); // 0 to 243
const after = lines.slice(451).join('\n'); // 451 to end
const originalBlock = lines.slice(244, 451).join('\n');

const newBlock = `{currentStep === 7 ? (
        <div className="space-y-3 mt-1">
          <div className="flex justify-between items-start gap-4">
            <span className="text-[12.5px] font-medium text-[#8d8378]">Service</span>
            <span className="text-[12.5px] font-normal text-[#2b2523] text-right">
              {formData.cleaningType || "Standard"}{formData.condition && formData.condition !== 'Standard' ? \` · \${formData.condition}\` : ''} Clean
            </span>
          </div>
          
          {(() => {
            const parts = [];
            if (formData.homeDetails?.livingRooms) parts.push(\`\${formData.homeDetails.livingRooms} liv\`);
            if (formData.homeDetails?.bedrooms) parts.push(\`\${formData.homeDetails.bedrooms} bed\`);
            if (formData.homeDetails?.bathrooms) parts.push(\`\${formData.homeDetails.bathrooms} bath\`);
            const roomsStr = parts.join(' · ');
            if (!roomsStr) return null;
            return (
              <div className="flex justify-between items-start gap-4">
                <span className="text-[12.5px] font-medium text-[#8d8378]">Rooms</span>
                <span className="text-[12.5px] font-normal text-[#2b2523] text-right">{roomsStr}</span>
              </div>
            );
          })()}

          {(() => {
            if (!pricingResult?.breakdown.extras.items || pricingResult.breakdown.extras.items.length === 0) return null;
            const addonsStr = pricingResult.breakdown.extras.items.map((e) => e.name).join(' · ');
            return (
              <div className="flex justify-between items-start gap-4">
                <span className="text-[12.5px] font-medium text-[#8d8378]">Add-ons</span>
                <span className="text-[12.5px] font-normal text-[#2b2523] text-right max-w-[200px] leading-snug">{addonsStr}</span>
              </div>
            );
          })()}
          
          {formData.selectedDate && formData.selectedTime && (
            <div className="flex justify-between items-start gap-4">
              <span className="text-[12.5px] font-medium text-[#8d8378]">Date</span>
              <span className="text-[12.5px] font-normal text-[#2b2523] text-right">
                {formData.selectedDate.toLocaleDateString("en-AU", { weekday: 'short', day: 'numeric', month: 'short' })} · {formData.selectedTime}
              </span>
            </div>
          )}

          <div className="flex justify-between items-start gap-4">
            <span className="text-[12.5px] font-medium text-[#8d8378]">Frequency</span>
            <span className="text-[12.5px] font-normal text-[#2b2523] text-right">{formData.frequency || "One time"}</span>
          </div>
          
          <div className="my-5 border-t border-[#f2eadf]" />
          
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[12.5px] font-medium text-[#8d8378]">Subtotal</span>
            <span className="text-[12.5px] font-medium text-[#2b2523]">$\${pricingResult?.subtotal?.toFixed(2) || '0.00'}</span>
          </div>
          
          {/* Discounts */}
          {(pricingResult?.largeServiceDiscountAmount ?? 0) > 0 && (
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12.5px] font-semibold text-[#FB8C42]">Large Service Discount</span>
              <span className="text-[12.5px] font-semibold text-[#FB8C42]">-${\${pricingResult!.largeServiceDiscountAmount!.toFixed(2)}}</span>
            </div>
          )}
          {pricingResult?.discounts?.frequency && (
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12.5px] font-semibold text-[#FB8C42]">{pricingResult?.discounts?.frequency?.name} Discount</span>
              <span className="text-[12.5px] font-semibold text-[#FB8C42]">-${\${pricingResult?.discounts?.frequency?.amount?.toFixed(2)}}</span>
            </div>
          )}
          {pricingResult?.discounts?.promo && (
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[12.5px] font-semibold text-[#FB8C42]">{pricingResult?.discounts?.promo?.name}</span>
              <span className="text-[12.5px] font-semibold text-[#FB8C42]">-${\${pricingResult?.discounts?.promo?.amount?.toFixed(2)}}</span>
            </div>
          )}
          
          {outOfAreaFee > 0 && (
             <div className="flex justify-between items-center mb-1.5">
               <span className="text-[12.5px] font-semibold text-amber-600">Travel Fee (Extended Area)</span>
               <span className="text-[12.5px] font-semibold text-amber-600">+$\${outOfAreaFee.toFixed(2)}</span>
             </div>
          )}
          
          <div className="my-5 border-t border-[#f2eadf]" />

          <div className="flex justify-between items-end">
            <span className="text-[19px] font-[700] text-[#2b2523] tracking-tight leading-none mb-1">Total</span>
            <span className="text-[19px] font-[700] text-[#2b2523] tracking-tight leading-none">
              $\${(pricingResult?.total || 0).toFixed(2)}
            </span>
          </div>
        </div>
      ) : (
        <>
          ORIGINAL_BLOCK_PLACEHOLDER
        </>
      )}`;

const newCode = before + '\n' + newBlock.replace('ORIGINAL_BLOCK_PLACEHOLDER', originalBlock) + '\n' + after;
fs.writeFileSync('src/components/BookingPageFlow.tsx', newCode);
console.log('Successfully updated BookingSummaryCard for step 7!');
