const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace renderContent switch block
const renderContentSearch = `      } else {
        switch (currentStep) {
          case 1: return renderResStepDiscount();
          case 2: return renderStep1();
          case 3: return renderConditionAssessmentStep();
          case 4: return renderResStep2();
          case 5: return renderResStep3();
          case 6: return renderResStep4();
          case 7: return renderResStep5();
          default: return null;
        }
      }`;

const renderContentReplace = `      } else {
        switch (currentStep) {
          case 1: return renderResStepDiscount(); // Details
          case 2: return renderResStep2(); // Customise
          case 3: return renderResStep3(); // Schedule
          case 4: return renderResStep4(); // Instructions
          case 5: return renderResStep5(); // Submit (includes Address)
          default: return null;
        }
      }`;

if (content.includes(renderContentSearch)) {
  content = content.replace(renderContentSearch, renderContentReplace);
  console.log("Replaced renderContent");
} else {
  console.log("Could not find renderContent block");
}

// Replace isStepValid switch block
const isStepValidSearch = `      } else {
        switch (currentStep) {
          case 1:
            return !!(
              formData.contact.firstName &&
              formData.contact.lastName &&
              formData.contact.email &&
              formData.contact.phone &&
              formData.contact.postcode
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
          default: return true;
        }
      }`;

const isStepValidReplace = `      } else {
        switch (currentStep) {
          case 1:
            return !!(
              formData.contact.firstName &&
              formData.contact.lastName &&
              formData.contact.email &&
              formData.contact.phone &&
              formData.contact.postcode
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
          case 4: return true; // Optional instructions
          case 5: return true; // Handled by onSubmit
          default: return true;
        }
      }`;

if (content.includes(isStepValidSearch)) {
  content = content.replace(isStepValidSearch, isStepValidReplace);
  console.log("Replaced isStepValid");
} else {
  console.log("Could not find isStepValid block");
}

// Replace getStepTitle switch block
const getStepTitleSearch = `      } else {
        switch (currentStep) {
          case 1:
            return "Your Details";
          case 2:
            return "Property Details";
          case 3:
            return "Claim Your Discount";
          case 4:
            return "Condition Assessment";
          case 5:
            return "Schedule Cleaning";
          case 6:
            return "Special Instructions";
          case 7:
            return "Submit Request";
          default:
            return "Request a Quote";
        }
      }`;

const getStepTitleReplace = `      } else {
        switch (currentStep) {
          case 1: return "Your Details";
          case 2: return "Customise Cleaning";
          case 3: return "Schedule Cleaning";
          case 4: return "Special Instructions";
          case 5: return "Submit Request";
          default: return "Request a Quote";
        }
      }`;

if (content.includes(getStepTitleSearch)) {
  content = content.replace(getStepTitleSearch, getStepTitleReplace);
  console.log("Replaced getStepTitle");
} else {
  console.log("Could not find getStepTitle block");
}

fs.writeFileSync(filePath, content, 'utf-8');
