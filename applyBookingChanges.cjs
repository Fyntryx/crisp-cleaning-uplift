const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let c = fs.readFileSync(filePath, 'utf8');

c = c.replace('const totalSteps = 7;', 'const totalSteps = 5;');

const oldIsStepValid = `      switch (currentStep) {
        case 1:
          return !!(
            formData.contact.firstName &&
            formData.contact.email && isValidEmail(formData.contact.email) &&
            formData.contact.phone && isValidPhone(formData.contact.phone)
          );
        case 2: return !!formData.cleaningType;
        case 3: return ['Standard', 'Deep', 'Vacate'].includes(formData.cleaningType) && !!formData.condition;
        case 4:
          if (formData.cleaningType === "Hourly") return (formData.hourlyDetails?.hours ?? 0) > 0;
          return (
            (formData.homeDetails.bedrooms || 0) +
            (formData.homeDetails.bathrooms || 0) +
            (formData.homeDetails.kitchens || 0) +
            (formData.homeDetails.livingRooms || 0) +
            (formData.homeDetails.other || 0) > 0
          );
        case 5: return !!formData.frequency && !!formData.selectedDate && !!formData.selectedTime;
        case 6: return !!formData.instructions.entry && !!formData.instructions.parking && !!formData.instructions.pets && !!formData.instructions.chemicals;
        case 7: return formData.contact.address.trim().length >= 10;
        default: return false;
      }`;
const newIsStepValid = `      switch (currentStep) {
        case 1:
          return !!(
            formData.contact.firstName &&
            formData.contact.email && isValidEmail(formData.contact.email) &&
            formData.contact.phone && isValidPhone(formData.contact.phone)
          );
        case 2:
          return !!formData.contact.suburb && !!formData.cleaningType && (
            (formData.homeDetails.bedrooms || 0) +
            (formData.homeDetails.bathrooms || 0) +
            (formData.homeDetails.kitchens || 0) +
            (formData.homeDetails.livingRooms || 0) +
            (formData.homeDetails.other || 0) > 0
          );
        case 3: return !!formData.frequency && !!formData.selectedDate && !!formData.selectedTime;
        case 4: return !!formData.instructions.entry && !!formData.instructions.parking && !!formData.instructions.pets && !!formData.instructions.chemicals && formData.contact.address.trim().length >= 4;
        case 5: return true;
        default: return false;
      }`;
c = c.replace(oldIsStepValid, newIsStepValid);

const oldRenderContent = `        case 1: return renderResStepDiscount();
        case 2: return renderStep1();
        case 3: return renderConditionAssessmentStep();
        case 4: return renderResStep2();
        case 5: return renderResStep3();
        case 6: return renderResStep4();
        case 7: return renderResStep5();`;
const newRenderContent = `        case 1: return renderResStepDiscount();
        case 2: return renderResStep2();
        case 3: return renderResStep3();
        case 4: return renderResStep4();
        case 5: return renderResStep5();`;
c = c.replace(oldRenderContent, newRenderContent);

const oldGetStepTitle = `      switch (currentStep) {
        case 2:
          return "Quote Summary";
        case 3:
          return "Condition";
        case 4:
          return "Customise Cleaning";
        case 5:
          return "Schedule Cleaning";
        case 6:
          return "Special Instructions";
        case 7:
          return "Submit Request";
        default:
          return "Request a Quote";
      }`;
const newGetStepTitle = `      switch (currentStep) {
        case 2:
          return "Customise Cleaning";
        case 3:
          return "Schedule Cleaning";
        case 4:
          return "Special Instructions";
        case 5:
          return "Submit Request";
        default:
          return "Request a Quote";
      }`;
c = c.replace(oldGetStepTitle, newGetStepTitle);

const oldHandleNext = `      if (currentStep === 2 && !isCommercial && formData.cleaningType === "Hourly") {
        setCurrentStep(4); // Skip Step 3 (Service & Condition)
      } else {
        setCurrentStep((prev) => prev + 1);
      }`;
const newHandleNext = `      setCurrentStep((prev) => prev + 1);`;
c = c.replace(oldHandleNext, newHandleNext);

const oldHandlePrev = `      if (currentStep === 4 && !isCommercial && formData.cleaningType === "Hourly") {
        setCurrentStep(2); // Skip back over Step 3
      } else {
        setCurrentStep((prev) => prev - 1);
      }`;
const newHandlePrev = `      setCurrentStep((prev) => prev - 1);`;
c = c.replace(oldHandlePrev, newHandlePrev);

const oldHandlePrevModal = `  const handlePrevModal = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setIsModalOpen(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("triggerLeadPopup"));
      }
    } else {
      handlePrev();
    }
  };`;
const newHandlePrevModal = `  const handlePrevModal = () => {
    if (currentStep === 1) {
      setIsModalOpen(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("triggerLeadPopup"));
      }
    } else {
      handlePrev();
    }
  };`;
c = c.replace(oldHandlePrevModal, newHandlePrevModal);

const locationAndCards = `
      {/* NEW LOCATION FIELD */}
      <div className="mb-8">
        <h2 className="text-[calc(1.125*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight mb-2">
          Where is your home?
        </h2>
        <div className="flex flex-col gap-[6px]">
          <input
            type="text"
            placeholder="Enter your suburb or postcode"
            className="w-full px-[14px] py-[11px] bg-white border-[1.5px] border-[#e9ddcf] rounded-xl outline-none focus:ring-2 focus:ring-[#FB8C42]/20 focus:border-[#FB8C42] text-[13px] font-[400] text-gray-900 placeholder:text-[#a89c8f] shadow-sm transition-all"
            value={formData.contact.suburb || ""}
            onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, suburb: e.target.value } })}
          />
        </div>
      </div>

      {/* NEW SERVICE CARDS */}
      <div className="mb-8">
        <h2 className="text-[calc(1.125*var(--scale-unit))] font-semibold text-gray-900 tracking-tight leading-tight mb-2">
          What type of clean do you need?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[calc(1.25*var(--scale-unit))] w-full">
          {/* STANDARD CARD */}
          <div
            onClick={() => setFormData({ ...formData, cleaningType: 'Standard' })}
            className={\`relative border-2 rounded-[calc(1.25*var(--scale-unit))] p-[calc(1.25*var(--scale-unit))] cursor-pointer transition-all duration-300 flex flex-col h-full \${formData.cleaningType === 'Standard'
              ? "border-[#FB8C42] bg-[#FFF8F3] shadow-[0_15px_30px_rgba(249,115,22,0.06)]"
              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }\`}
          >
            <div className="mt-1">
              <h3 className="text-[calc(0.9375*var(--scale-unit))] font-semibold text-gray-900 mb-1.5">Standard</h3>
              <p className="text-[calc(0.75*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-4">
                Perfect for maintaining a clean home.
              </p>
            </div>
            <div className="mt-auto pt-[calc(1.5*var(--scale-unit))]">
              {formData.cleaningType === 'Standard' ? (
                <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full bg-[#FB8C42]/10 border-[1.5px] border-[#FB8C42] text-[#FB8C42] font-semibold text-[calc(0.78*var(--scale-unit))] flex items-center justify-center gap-2">
                  <svg className="w-[calc(1*var(--scale-unit))] h-[calc(1*var(--scale-unit))]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Selected
                </div>
              ) : (
                <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full border border-gray-200 text-gray-600 font-medium text-[calc(0.78*var(--scale-unit))] flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  Select
                </div>
              )}
            </div>
          </div>
          {/* DEEP CARD */}
          <div
            onClick={() => setFormData({ ...formData, cleaningType: 'Deep' })}
            className={\`relative border-2 rounded-[calc(1.25*var(--scale-unit))] p-[calc(1.25*var(--scale-unit))] cursor-pointer transition-all duration-300 flex flex-col h-full \${formData.cleaningType === 'Deep'
              ? "border-[#FB8C42] bg-[#FFF8F3] shadow-[0_15px_30px_rgba(249,115,22,0.06)]"
              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }\`}
          >
            <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#FB8C42] text-white text-[calc(0.55*var(--scale-unit))] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md z-10 whitespace-nowrap">
              MOST POPULAR
            </span>
            <div className="mt-1">
              <h3 className="text-[calc(0.9375*var(--scale-unit))] font-semibold text-gray-900 mb-1.5">Deep</h3>
              <p className="text-[calc(0.75*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-4">
                Thorough clean for lived-in homes.
              </p>
            </div>
            <div className="mt-auto pt-[calc(1.5*var(--scale-unit))]">
              {formData.cleaningType === 'Deep' ? (
                <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full bg-[#FB8C42]/10 border-[1.5px] border-[#FB8C42] text-[#FB8C42] font-semibold text-[calc(0.78*var(--scale-unit))] flex items-center justify-center gap-2">
                  <svg className="w-[calc(1*var(--scale-unit))] h-[calc(1*var(--scale-unit))]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Selected
                </div>
              ) : (
                <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full border border-gray-200 text-gray-600 font-medium text-[calc(0.78*var(--scale-unit))] flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  Select
                </div>
              )}
            </div>
          </div>
          {/* VACATE CARD */}
          <div
            onClick={() => setFormData({ ...formData, cleaningType: 'Vacate' })}
            className={\`relative border-2 rounded-[calc(1.25*var(--scale-unit))] p-[calc(1.25*var(--scale-unit))] cursor-pointer transition-all duration-300 flex flex-col h-full \${formData.cleaningType === 'Vacate'
              ? "border-[#FB8C42] bg-[#FFF8F3] shadow-[0_15px_30px_rgba(249,115,22,0.06)]"
              : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
              }\`}
          >
            <div className="mt-1">
              <h3 className="text-[calc(0.9375*var(--scale-unit))] font-semibold text-gray-900 mb-1.5">Vacate</h3>
              <p className="text-[calc(0.75*var(--scale-unit))] font-normal text-gray-600 leading-relaxed mb-4">
                Detailed clean for moving in or out.
              </p>
            </div>
            <div className="mt-auto pt-[calc(1.5*var(--scale-unit))]">
              {formData.cleaningType === 'Vacate' ? (
                <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full bg-[#FB8C42]/10 border-[1.5px] border-[#FB8C42] text-[#FB8C42] font-semibold text-[calc(0.78*var(--scale-unit))] flex items-center justify-center gap-2">
                  <svg className="w-[calc(1*var(--scale-unit))] h-[calc(1*var(--scale-unit))]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Selected
                </div>
              ) : (
                <div className="w-full px-[calc(1.25*var(--scale-unit))] py-[calc(0.6*var(--scale-unit))] rounded-full border border-gray-200 text-gray-600 font-medium text-[calc(0.78*var(--scale-unit))] flex items-center justify-center hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  Select
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
`;
c = c.replace('{/* MIDDLE ROW: Selectors */}', locationAndCards + '\\n          {/* MIDDLE ROW: Selectors */}');

fs.writeFileSync(filePath, c, 'utf8');
console.log('Modifications completed.');
