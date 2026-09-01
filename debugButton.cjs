const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'RequestQuoteFlow.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace the Inner Step Controls wrapper
const searchStr = \`              {/* Inner Step Controls (Hidden on Mobile) */}
              {currentStep < totalSteps && (
                <div className={\\\`hidden min-[880px]:flex \${currentStep === 1 && !isCommercial
                  ? "w-full flex-col items-center"
                  : "mt-10 items-center justify-center gap-6"
                  }\\\`}>\`;

const replaceStr = \`              {/* Inner Step Controls (Hidden on Mobile) */}
              {currentStep < totalSteps && (
                <div className={\\\`flex w-full mt-10 items-center justify-center gap-6 p-4 border-2 border-red-500\\\`}>\`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log("Successfully updated Inner Step Controls to be visible always with red border.");
} else {
  console.log("Could not find the target string. Here is what is there instead:");
  const innerControlsIndex = content.indexOf('{/* Inner Step Controls');
  if (innerControlsIndex !== -1) {
    console.log(content.substring(innerControlsIndex, innerControlsIndex + 300));
  }
}
