const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/lp/SouthYarraClient.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// The new section content
const newSection = `      {/* MERGED SECTION 2 & 3 — PAGE INTRO & PROPERTY TYPES */}
      <section className="bg-[#ffffff] py-[80px]">
        <div className="max-w-[1100px] mx-auto px-[24px] md:px-[48px] pb-[56px]">
          <div className="text-[11px] font-[600] text-[#d97706] tracking-[0.2em] uppercase mb-[16px]">
            South Yarra's Housing Stock
          </div>
          <h2 className="text-[32px] md:text-[36px] font-[700] text-[#1a1a1a] mb-[32px] leading-[1.2]">
            Cleaning Every Property Type in South Yarra
          </h2>
          <p className="text-[17px] text-[#374151] leading-[1.9] max-w-[720px]">
            South Yarra's residential profile is defined by two overlapping realities: an exceptionally dense apartment stock near Chapel Street and Toorak Road, and a pocket of period heritage homes on the suburb's quieter streets closer to the Yarra River. The apartment density is significant - many buildings have concierge access, visitor registration requirements, and lift booking windows that need coordinating before a cleaning visit. The heritage homes near Como House have surface requirements entirely different to the modern apartment stock. Crisp services both property types across South Yarra with fixed, scope-based pricing, pre-coordinated building access, and the same cleaner returning every visit.
          </p>
          <div className="w-[40px] h-[2px] bg-[#d97706] mt-[28px]" />
        </div>

        <div className="property-grid grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-[16px] max-w-[1100px] mx-auto px-[24px] md:px-[48px] mt-[48px]">
          
          {/* Card 1 — Chapel Street (LARGE) */}
          <div className="property-card property-card-dark bg-[#111111] rounded-[20px] p-[32px] md:p-[44px] relative overflow-hidden flex flex-col group transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(217,119,6,0.15)]">
            <div className="absolute bottom-[-20px] right-[-10px] text-[180px] font-[900] text-[rgba(255,255,255,0.03)] leading-none pointer-events-none select-none">
              01
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-[16px]">
                <div className="bg-[rgba(217,119,6,0.15)] border border-[rgba(217,119,6,0.3)] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] inline-block">
                  Chapel Street · High-Rise
                </div>
                <Building2 className="text-[#d97706] w-[24px] h-[24px]" />
              </div>
              
              <h3 className="text-[22px] font-[700] text-[#ffffff] mb-[12px] leading-[1.3]">
                High-Rise and Mid-Rise Apartments Near Chapel Street
              </h3>
              
              <p className="text-[14px] text-[rgba(255,255,255,0.6)] leading-[1.75]">
                The apartment towers along and around Chapel Street and Toorak Road form the dominant residential form in central South Yarra - buildings of 15 to 30-plus storeys with concierge desks, managed access systems, and visitor registration requirements. We coordinate building access details at the initial booking and manage the process for every subsequent visit, so the resident isn't handling access logistics before each clean.
              </p>
              
              <div className="mt-[20px] flex flex-wrap gap-[8px]">
                {['Concierge managed', 'Fob & intercom', 'Lift bookings', 'Same process every visit'].map(tag => (
                  <span key={tag} className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.1)] rounded-[99px] px-[12px] py-[5px] text-[12px] text-[rgba(255,255,255,0.55)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 — Heritage Homes (small) */}
          <div className="property-card bg-[#fafafa] border border-[#e5e7eb] rounded-[20px] p-[24px] md:p-[32px] relative overflow-hidden flex flex-col group transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute bottom-[-10px] right-[-8px] text-[120px] font-[900] text-[rgba(0,0,0,0.03)] leading-none pointer-events-none select-none">
              02
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-[14px]">
                <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] inline-block">
                  Domain Road · Yarra River
                </div>
                <Home className="text-[#d97706] w-[20px] h-[20px]" />
              </div>
              
              <h3 className="text-[17px] font-[700] text-[#1a1a1a] mb-[10px] leading-[1.35]">
                Period Terraces and Heritage Homes Near the Yarra River Corridor
              </h3>
              
              <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                The streets between Domain Road and the Yarra River - including properties near Como House on the suburb's southern edge - contain period terraces, Victorian homes, and established townhouses representing a residential character entirely distinct from the Chapel Street high-rise density. These heritage properties have original surfaces, period fittings, and established gardens that reflect long-tenure ownership rather than high-turnover apartment living.
              </p>
              
              <div className="mt-[20px] flex flex-wrap gap-[8px]">
                {['Period terraces', 'Victorian homes', 'Original surfaces', 'Low-moisture products'].map(tag => (
                  <span key={tag} className="bg-[#fff7ed] border border-[#fed7aa] text-[#92400e] rounded-[99px] px-[10px] py-[4px] text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3 — Prahran (small) */}
          <div className="property-card bg-[#fafafa] border border-[#e5e7eb] rounded-[20px] p-[24px] md:p-[32px] relative overflow-hidden flex flex-col group transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="absolute bottom-[-10px] right-[-8px] text-[120px] font-[900] text-[rgba(0,0,0,0.03)] leading-none pointer-events-none select-none">
              03
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-[14px]">
                <div className="bg-[#fff7ed] border border-[#fed7aa] text-[#d97706] rounded-[99px] px-[12px] py-[4px] text-[11px] font-[600] inline-block">
                  Commercial Road · Prahran
                </div>
                <MapPin className="text-[#d97706] w-[20px] h-[20px]" />
              </div>
              
              <h3 className="text-[17px] font-[700] text-[#1a1a1a] mb-[10px] leading-[1.35]">
                Properties Near the Prahran Market on Commercial Road
              </h3>
              
              <p className="text-[13px] text-[#6b7280] leading-[1.7] flex-grow">
                The Prahran Market on Commercial Road sits within South Yarra's suburb boundary - a local landmark that anchors the properties on the suburb's western edge near the Prahran and Windsor residential streets. The mix of apartments and period properties in this precinct reflects South Yarra's broader housing diversity, serviced within the same fixed-scope framework as the rest of the suburb.
              </p>
              
              <div className="mt-[20px] flex flex-wrap gap-[8px]">
                {['Apartments', 'Period properties', 'Fixed-scope framework', 'Mixed precinct'].map(tag => (
                  <span key={tag} className="bg-[#fff7ed] border border-[#fed7aa] text-[#92400e] rounded-[99px] px-[10px] py-[4px] text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>`;

// Regex to match section 2 and 3 and replace them
// We match from {/* SECTION 2 — PAGE INTRO */} up to the closing section of SECTION 3
const sectionStartStr = "{/* SECTION 2 — PAGE INTRO */}";
const sectionEndStr = "      {/* SECTION 4 — WHAT'S INCLUDED */}";

const startIndex = content.indexOf(sectionStartStr);
const endIndex = content.indexOf(sectionEndStr);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newSection + "\n\n" + content.substring(endIndex);
  
  // Clean up unused hooks
  content = content.replace(/const \[activePropertyState, setActivePropertyState\] = useState\(1\);\n/g, "");
  content = content.replace(/\/\/ Intersection Observer for Sticky Left Panel[\s\S]*?\}, \[\]\);\n/g, "");
  content = content.replace(/const getLeftPanelBackground = \(\) => \{[\s\S]*?\};\n/g, "");
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log("Replaced Sections 2 and 3 in SouthYarraClient.tsx");
} else {
  console.log("Could not find boundaries.");
}
