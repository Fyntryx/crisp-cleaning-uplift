const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const isStepValidStart = content.indexOf('const isStepValid = () => {');
const isStepValidEnd = content.indexOf('};', isStepValidStart) + 2;

const isStepValidOld = content.substring(isStepValidStart, isStepValidEnd);

const isStepValidNew = `const isStepValid = () => {
    if (isCommercial) {
      switch (currentStep) {
        case 1: return formData.commercial?.businessName && formData.commercial?.businessSize && formData.commercial?.environment;
        case 2: return formData.commercial?.cleanType;
        case 3: return formData.commercial?.frequency;
        case 4: return formData.commercial?.days && formData.commercial.days.length > 0;
        case 5: return formData.selectedDate && formData.selectedTime;
        case 6: return true;
        default: return false;
      }
    } else {
      switch (currentStep) {
        case 1:
          return !!(
            formData.contact.firstName &&
            formData.contact.lastName &&
            formData.contact.email &&
            formData.contact.phone &&
            formData.contact.suburb
          );
        case 2:
          if (!formData.cleaningType) return false;
          if (formData.cleaningType === "Hourly") return (formData.hourlyDetails?.hours ?? 0) > 0;
          return (
            (formData.homeDetails.bedrooms || 0) +
            (formData.homeDetails.bathrooms || 0) +
            (formData.homeDetails.kitchens || 0) +
            (formData.homeDetails.livingRooms || 0) +
            (formData.homeDetails.other || 0) > 0
          );
        case 3: return !!formData.frequency && !!formData.selectedDate && !!formData.selectedTime;
        case 4: return true;
        case 5: return formData.contact.address.trim().length >= 10;
        default: return true;
      }
    }
  };`;

content = content.replace(isStepValidOld, isStepValidNew);

const renderContentStart = content.indexOf('const renderContent = () => {');
const renderContentEnd = content.indexOf('};', renderContentStart) + 2;

const renderContentOld = content.substring(renderContentStart, renderContentEnd);

const renderContentNew = `const renderContent = () => {
    if (isCommercial) {
      switch (currentStep) {
        case 1: return renderStep1();
        case 2: return renderCommStep2();
        case 3: return renderCommStep3();
        case 4: return renderCommStep4();
        case 5: return renderCommStep5();
        case 6: return renderCommStep6();
        default: return null;
      }
    } else {
      switch (currentStep) {
        case 1: return renderResStepDiscount();
        case 2: return renderResStep2();
        case 3: return renderResStep3();
        case 4: return renderResStep4();
        case 5: return renderResStep5();
        default: return null;
      }
    }
  };`;

content = content.replace(renderContentOld, renderContentNew);

const getStepTitleStart = content.indexOf('const getStepTitle = () => {');
const getStepTitleEnd = content.indexOf('};', getStepTitleStart) + 2;

const getStepTitleOld = content.substring(getStepTitleStart, getStepTitleEnd);

const getStepTitleNew = `const getStepTitle = () => {
    if (currentStep === 1)
      return (
        <span className="text-gray-900">Choose Service</span>
      );

    if (isCommercial) {
      switch (currentStep) {
        case 2:
          return "Tell Us About Your Business";
        case 3:
          return "What Needs Cleaning";
        case 4:
          return "How Often & Availability";
        case 5:
          return "Insurance & Budget";
        case 6:
          return "Commercial Sign Up";
        default:
          return "Commercial Quote";
      }
    } else {
      switch (currentStep) {
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
      }
    }
  };`;

content = content.replace(getStepTitleOld, getStepTitleNew);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Replaced perfectly by index");
