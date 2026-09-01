const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Rename Component and export
content = content.replace(/const Services = /g, 'const RequestQuoteFlow = ');
content = content.replace(/export default Services;/g, 'export default RequestQuoteFlow;');
content = content.replace(/Booking Summary/g, 'Quote Summary');

// 2. Adjust totalSteps
content = content.replace(/const totalSteps = 7;/g, 'const totalSteps = 5;');

// 3. Fix Step renders in renderContent
content = content.replace(
`      switch (currentStep) {
        case 1: return renderResStepDiscount();
        case 2: return renderStep1();
        case 3: return renderConditionAssessmentStep();
        case 4: return renderResStep2();
        case 5: return renderResStep3();
        case 6: return renderResStep4();
        case 7: return renderResStep5();
        default: return null;
      }`,
`      switch (currentStep) {
        case 1: return renderResStepDiscount();
        case 2: return renderResStep2();
        case 3: return renderResStep3();
        case 4: return renderResStep4();
        case 5: return renderResStep5();
        default: return null;
      }`
);

// 4. Fix isStepValid for Residential
content = content.replace(
`      switch (currentStep) {
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
      }`,
`      switch (currentStep) {
        case 1:
          return !!(
            formData.contact.firstName &&
            formData.contact.email && isValidEmail(formData.contact.email) &&
            formData.contact.phone && isValidPhone(formData.contact.phone)
          );
        case 2:
          return !!formData.cleaningType && (
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
      }`
);

// 5. Fix handleNext and handlePrev skipping logic
// In handleNext:
content = content.replace(
`      if (currentStep === 2 && !isCommercial && formData.cleaningType === "Hourly") {
        setCurrentStep(4); // Skip Step 3 (Service & Condition)
      } else {
        setCurrentStep((prev) => prev + 1);
      }`,
`      setCurrentStep((prev) => prev + 1);`
);

// In handlePrev:
content = content.replace(
`      if (currentStep === 4 && !isCommercial && formData.cleaningType === "Hourly") {
        setCurrentStep(2); // Skip back over Step 3
      } else {
        setCurrentStep((prev) => prev - 1);
      }`,
`      setCurrentStep((prev) => prev - 1);`
);
content = content.replace(
`  const handlePrevModal = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setIsModalOpen(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("triggerLeadPopup"));
      }
    } else {
      handlePrev();
    }
  };`,
`  const handlePrevModal = () => {
    if (currentStep === 1) { // It used to be 2 when Step 1 was discount, wait the discount is step 1 now!
      setIsModalOpen(false);
    } else {
      handlePrev();
    }
  };`
);


fs.writeFileSync(filePath, content, 'utf-8');
console.log('Phase 1 completed');
