const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Insert summary into Step 5
const summaryBlock = `
          {/* Quote Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mt-4">
            <h3 className="text-[calc(0.9375*var(--scale-unit))] font-semibold text-gray-900 mb-4">Your Quote Summary</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Service</span>
                <span className="text-gray-900 font-medium text-sm">{formData.cleaningType} Clean</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Rooms</span>
                <span className="text-gray-900 font-medium text-sm text-right">
                  {[
                    formData.homeDetails.bedrooms ? \`\${formData.homeDetails.bedrooms} Bed\` : '',
                    formData.homeDetails.bathrooms ? \`\${formData.homeDetails.bathrooms} Bath\` : '',
                    formData.homeDetails.livingRooms ? \`\${formData.homeDetails.livingRooms} Living\` : '',
                    formData.homeDetails.kitchens ? \`\${formData.homeDetails.kitchens} Kitchen\` : '',
                  ].filter(Boolean).join(', ')}
                </span>
              </div>
              {Object.keys(formData.extras).length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Extras</span>
                  <span className="text-gray-900 font-medium text-sm text-right">
                    {Object.entries(formData.extras).map(([k, v]) => \`\${v}x \${k}\`).join(', ')}
                  </span>
                </div>
              )}
              {formData.selectedDate && formData.selectedTime && (
                <div className="flex justify-between">
                  <span className="text-gray-500 text-sm">Schedule</span>
                  <span className="text-gray-900 font-medium text-sm text-right">
                    {formData.frequency} - {new Date(formData.selectedDate).toLocaleDateString()} @ {formData.selectedTime}
                  </span>
                </div>
              )}
            </div>
          </div>
`;

content = content.replace(
  /<div className="grid grid-cols-1 md:grid-cols-2 gap-5">/g,
  (match, offset, str) => {
    // Only replace in renderResStep5
    const step5Start = str.indexOf('const renderResStep5');
    if (offset > step5Start) {
      return summaryBlock + '\n' + match;
    }
    return match;
  }
);

// Inject Address into Step 4
const addressStep4 = `
            {/* Address Capture */}
            <div className="flex flex-col space-y-2 md:col-span-2 relative mt-4">
              <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
                ADDRESS / SUBURB
              </label>
              <AddressAutocomplete
                value={formData.contact.address}
                onChange={(value) => updateContact("address", value)}
                placeholder="Suburb or postcode"
                showLocationButton={false}
                onLocationClick={handleUseCurrentLocation}
                isLoadingLocation={isLoadingLoc}
                onValidityChange={setIsAddressValid}
                onOutOfAreaFeeChange={setOutOfAreaFee}
                inputClassName="!py-3.5 !text-xs !font-semibold !text-gray-700 !bg-white !border !border-gray-200 !shadow-sm focus:!ring-2 focus:!ring-[#FB8C42]/10 !pl-4"
                className="[&>div>svg:first-child]:hidden"
              />
            </div>
`;

content = content.replace(
  /<div className="flex flex-col space-y-2">\s*<label className="text-\[calc\(0\.625\*var\(--scale-unit\)\)\] font-semibold uppercase text-ink-soft\s*tracking-\[0\.09em\]">\s*PREFERRED CHEMICALS\s*<\/label>[\s\S]*?<\/div>/,
  match => match + '\n' + addressStep4
);

// Remove the old address block from Step 5
content = content.replace(/<div className="flex flex-col space-y-2(?: md:col-span-2)? relative">[\s\S]*?<AddressAutocomplete[\s\S]*?\/>\s*<\/div>/g, (match, offset, str) => {
    const step5Start = str.indexOf('const renderResStep5');
    if (offset > step5Start) {
        return ''; // Remove only in Step 5
    }
    return match; // keep in Step 4
});


fs.writeFileSync(filePath, content, 'utf-8');
console.log('Phase 5 completed');
