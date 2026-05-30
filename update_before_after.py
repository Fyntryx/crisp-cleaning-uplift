import os

files = [
    r"c:\Users\hp\Downloads\fyntryx\Projects\crisp-cleaning-uplift\src\app\services\standard-house-clean\BeforeAfter.tsx",
    r"c:\Users\hp\Downloads\fyntryx\Projects\crisp-cleaning-uplift\src\app\services\deep-clean\BeforeAfter.tsx",
    r"c:\Users\hp\Downloads\fyntryx\Projects\crisp-cleaning-uplift\src\app\services\vacate-clean\BeforeAfter.tsx"
]

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # 1. Add imports
    if "import useEmblaCarousel" not in content:
        content = content.replace(
            'import React, { useState } from "react";',
            'import React, { useState, useEffect } from "react";\nimport useEmblaCarousel from "embla-carousel-react";'
        )

    # 2. Add Embla hooks inside the component
    if "const [beforeAfterRef" not in content:
        hook_code = """  const [beforeAfterRef, beforeAfterApi] = useEmblaCarousel({ 
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    watchDrag: false,
    breakpoints: {
      '(min-width: 768px)': { active: false }
    }
  });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!beforeAfterApi || isInteracting) return;
    const interval = setInterval(() => {
      // Only scroll automatically if viewport is mobile (embla is active)
      if (window.innerWidth < 768) {
        beforeAfterApi.scrollNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [beforeAfterApi, isInteracting]);
"""
        content = content.replace(
            "const comparisons =",
            hook_code + "\n  const comparisons ="
        )

    # 3. Modify the grid wrapper
    old_wrapper = """        {/* Comparisons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {comparisons.map((comp, index) => (
            <ComparisonCard
              key={index}
              beforeImage={comp.beforeImage}
              afterImage={comp.afterImage}
              label={comp.label}
            />
          ))}
        </div>"""
    
    new_wrapper = """        {/* Comparisons Grid */}
        <div 
          className="-mx-6 px-6 md:mx-0 md:px-0 overflow-hidden mb-8 md:mb-12" 
          ref={beforeAfterRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
        >
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 touch-pan-y">
            {comparisons.map((comp, index) => (
              <div key={index} className={`flex-[0_0_85%] md:flex-none min-w-0 ${index === comparisons.length - 1 ? "pr-6 md:pr-0" : ""}`}>
                <ComparisonCard
                  beforeImage={comp.beforeImage}
                  afterImage={comp.afterImage}
                  label={comp.label}
                />
              </div>
            ))}
          </div>
        </div>"""
    
    content = content.replace(old_wrapper, new_wrapper)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Updated BeforeAfter components.")
