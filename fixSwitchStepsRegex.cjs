const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Use regex to match the residential else block in renderContent
const renderContentRegex = /      \} else \{\s*switch \(currentStep\) \{\s*case 1: return renderResStepDiscount\(\);\s*case 2: return renderStep1\(\);\s*case 3: return renderConditionAssessmentStep\(\);\s*case 4: return renderResStep2\(\);\s*case 5: return renderResStep3\(\);\s*case 6: return renderResStep4\(\);\s*case 7: return renderResStep5\(\);\s*default: return null;\s*\}\s*\}/g;

const renderContentReplace = `      } else {
        switch (currentStep) {
          case 1: return renderResStepDiscount();
          case 2: return renderResStep2();
          case 3: return renderResStep3();
          case 4: return renderResStep4();
          case 5: return renderResStep5();
          default: return null;
        }
      }`;

content = content.replace(renderContentRegex, renderContentReplace);

// isStepValid
const isStepValidRegex = /      \} else \{\s*switch \(currentStep\) \{\s*case 1:([\s\S]*?case 2: return !!formData\.cleaningType;\s*case 3: return \['Standard', 'Deep', 'Vacate'\]\.includes\(formData\.cleaningType\) && !!formData\.condition;\s*case 4:[\s\S]*?case 5: return !!formData\.frequency && !!formData\.selectedDate && !!formData\.selectedTime;\s*case 6: return !!formData\.instructions\.entry && !!formData\.instructions\.parking && !!formData\.instructions\.pets && !!formData\.instructions\.chemicals;\s*case 7: return formData\.contact\.address\.trim\(\)\.length >= 10;\s*default: return true;\s*\}\s*\}/g;

const isStepValidReplace = `      } else {
        switch (currentStep) {
          case 1:$1case 2: 
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
      }`;

content = content.replace(isStepValidRegex, isStepValidReplace);

// getStepTitle
const getStepTitleRegex = /      \} else \{\s*switch \(currentStep\) \{\s*case 1:\s*return "Your Details";\s*case 2:\s*return "Property Details";\s*case 3:\s*return "Claim Your Discount";\s*case 4:\s*return "Condition Assessment";\s*case 5:\s*return "Schedule Cleaning";\s*case 6:\s*return "Special Instructions";\s*case 7:\s*return "Submit Request";\s*default:\s*return "Request a Quote";\s*\}\s*\}/g;

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

content = content.replace(getStepTitleRegex, getStepTitleReplace);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Done");
