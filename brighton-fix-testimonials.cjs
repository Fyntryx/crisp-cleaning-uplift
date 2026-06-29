const fs = require('fs');
let c = fs.readFileSync('src/components/lp/BrightonClient.tsx', 'utf8');

c = c.replace(/const testimonials = \[[\s\S]*?\];/, `const testimonials = [
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
];`);

fs.writeFileSync('src/components/lp/BrightonClient.tsx', c);
