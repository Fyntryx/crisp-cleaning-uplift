const fs = require('fs');
let c = fs.readFileSync('src/components/lp/BrightonClient.tsx', 'utf8');

c = c.replace(
  'className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[480px]"', 
  'className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-[480px] text-justify"'
);

c = c.replace(
  'className="w-full max-w-[280px] flex flex-col gap-2.5 -mt-24 relative z-10 lg:ml-[-10%]"', 
  'className="w-full max-w-[400px] flex flex-col gap-2.5 -mt-24 relative z-10 items-start"'
);

c = c.replace(
  'border-l-[#FB8C42] rounded-[14px] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center gap-3"', 
  'border-l-[#FB8C42] rounded-[14px] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 w-[280px]"'
);

const oldTestimonials = `const testimonials = [
  {
    stars: 5,
    quote:
      "We've been with Crisp for over two years. The fact that the same person comes every fortnight makes such a difference — she knows the house and doesn't need to be told anything.",
    name: "Sarah G.",
    suburb: "Dendy Street, Brighton",
  },
  {
    stars: 5,
    quote:
      "I finally found a cleaner who knows not to use steam on the floorboards. Heritage home owners will understand — this matters more than it sounds.",
    name: "James M.",
    suburb: "The Esplanade, Brighton",
  },
  {
    stars: 5,
    quote:
      "Transparent pricing was the first thing that got me — Efficient getting hourly quotes for a 5-bedroom home and dreading the final number. Fixed price, done.",
    name: "Rachel D.",
    suburb: "Church Street, Brighton",
  },
  {
    stars: 5,
    quote:
      "Used the 72hr guarantee after my first clean and had them back the next day, no questions. That's when I signed up for fortnightly.",
    name: "Olivia T.",
    suburb: "New Street, Brighton",
  },
  {
    stars: 5,
    quote:
      "They actually clean the skirting boards and tracks. Most cleaners skip them after the first few visits, but we're on month six and the standard hasn't dropped.",
    name: "Andrew K.",
    suburb: "Bay Street, Brighton",
  },
];`;

const newTestimonials = `const testimonials = [
  {
    stars: 5,
    quote: "Honestly felt like a brand new home.",
    name: "Andre B",
    suburb: "Verified Customer",
  },
  {
    stars: 5,
    quote: "Team took great care, really appreciated the communication - the small details dont go unnoticed! keep it up crisp",
    name: "Natch L",
    suburb: "Verified Customer",
  },
  {
    stars: 5,
    quote: "Really impressed with the detail, even the little things like skirting boards were spotless. It's clear the team takes pride in their work.",
    name: "Kaan S",
    suburb: "Verified Customer",
  }
];`;

if(c.includes(oldTestimonials)) {
    c = c.replace(oldTestimonials, newTestimonials);
} else {
    console.log("Could not find testimonials array to replace");
}

fs.writeFileSync('src/components/lp/BrightonClient.tsx', c);
