const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const addressString = `            <div className="flex flex-col space-y-2 md:col-span-2 relative">
              <label className="text-[calc(0.625*var(--scale-unit))] font-semibold uppercase text-ink-soft tracking-[0.09em]">
                ADDRESS
              </label>
              <AddressAutocomplete
                value={formData.contact.address}
                onChange={(value) => updateContact("address", value)}
                placeholder="Street address, suburb, postcode"
                showLocationButton={true}
                onLocationClick={handleUseCurrentLocation}
                isLoadingLocation={isLoadingLoc}
                onValidityChange={setIsAddressValid}
                onOutOfAreaFeeChange={setOutOfAreaFee}
                inputClassName="!py-3.5 !text-xs !font-semibold !text-gray-700 !bg-white !border !border-gray-200 !shadow-sm focus:!ring-2 focus:!ring-[#FB8C42]/10 !pl-4"
                className="[&>div>svg:first-child]:hidden"
              />
            </div>`;

// If the exact string isn't matched due to formatting, let's use regex matching carefully
const regexAddress = /<div className="flex flex-col space-y-2 (?:md:col-span-2 )?relative">\s*<label className="text-\[calc\(0\.625\*var\(--scale-unit\)\)\] font-semibold uppercase text-ink-soft tracking-\[0\.09em\]">\s*ADDRESS\s*<\/label>[\s\S]*?<AddressAutocomplete[\s\S]*?\/>\s*<\/div>/g;

const matches = content.match(regexAddress);
if (matches && matches.length > 0) {
    const matchedAddress = matches[0];
    
    // Replace placeholder
    let newAddressBlock = matchedAddress.replace(
      'placeholder="Street address, suburb, postcode"',
      'placeholder="Suburb or postcode"'
    );
    newAddressBlock = newAddressBlock.replace(
      'showLocationButton={true}',
      'showLocationButton={false}'
    );
    
    // Find renderResStep5 and remove address
    const step5Start = content.indexOf('const renderResStep5');
    if(step5Start !== -1) {
        const step5Content = content.substring(step5Start);
        content = content.substring(0, step5Start) + step5Content.replace(matchedAddress, '');
    }

    // Find renderResStep4 and insert address at the end of the grid
    const step4Start = content.indexOf('const renderResStep4');
    if (step4Start !== -1) {
        const step4End = content.indexOf('</div>', step4Start); // need to find proper end
        // let's insert it right after the CHEMICALS block
        content = content.replace(
            /(<label className="text-\[calc\(0\.625\*var\(--scale-unit\)\)\] font-semibold uppercase text-ink-soft tracking-\[0\.09em\]">\s*PREFERRED CHEMICALS\s*<\/label>[\s\S]*?<\/div>)/,
            `$1\n            ${newAddressBlock}`
        );
    }
} else {
    console.log("Address block still not found with new regex!");
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Phase 4 completed');
