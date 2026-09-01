import re

path = r"c:\Users\hp\Downloads\fyntryx\Projects\crisp-cleaning-uplift\src\components\RequestQuoteFlow.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "Step 1" in line or "Step 2" in line or "Step 3" in line or "Step 4" in line or "Step 5" in line or "Step 6" in line or "Step 7" in line:
        print(f"Line {i+1}: {line.strip()}")
    if "currentStep ===" in line or "currentStep == " in line:
        print(f"Line {i+1}: {line.strip()}")
