import fs from 'fs';
import { globSync } from 'glob';

// 1. Pages
const pages = globSync('src/app/house-cleaning-*/page.tsx');
pages.forEach(file => {
  let text = fs.readFileSync(file, 'utf8');

  // Convert to async
  text = text.replace(/export default function ([A-Za-z0-9]+)\(/, 'export default async function $1(');

  // Add import if missing
  if (!text.includes('sanityFetch')) {
    text = text.replace('import { client }', 'import { sanityFetch } from "@/sanity/lib/live";\nimport { client }');
  }

  // Inject fetch
  if (!text.includes('siteSettings')) {
    text = text.replace(/return\s*\(\s*<main/, `
  const { data: siteSettings } = await sanityFetch({
    query: \`*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }\`,
  });
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;
  const googleReviewCount = siteSettings?.googleReviewCount || 14;

  return (
    <main`);
  } else if (!text.includes('googleReviewCount =')) {
    text = text.replace(/(const googleRatingValue =.*?;)/, '$1\n  const googleReviewCount = siteSettings?.googleReviewCount || 14;');
  }

  // Replace text
  text = text.replace(/>\s*4\.9 Google Rating\s*</g, '>{googleRatingValue} Google Rating<');

  // Add props to Client component right after the tag name
  text = text.replace(/<([A-Z][A-Za-z]+Client)(\s)/g, (match, tag, space) => {
    if (text.includes(`${tag} googleRatingValue`)) return match;
    return `<${tag} googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount}${space}`;
  });

  // Add props to Testimonials right after the tag name
  text = text.replace(/<Testimonials(\s)/g, (match, space) => {
    if (text.includes(`Testimonials googleRatingValue`)) return match;
    return `<Testimonials googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount}${space}`;
  });

  fs.writeFileSync(file, text);
});

// 2. Clients
const clients = globSync('src/components/lp/*Client.tsx');
clients.forEach(file => {
  let text = fs.readFileSync(file, 'utf8');

  // Safely inject params
  if (!text.includes('googleRatingValue')) {
    text = text.replace(/export default function ([A-Za-z]+Client)\(\)\s*\{/, 'export default function $1({ googleRatingValue = 5.0, googleReviewCount = 14 }: { googleRatingValue?: number, googleReviewCount?: number }) {');
  } else {
    // If it has them, just normalize
    text = text.replace(/googleRatingValue = 4\.9,\s*googleReviewCount = 47/, 'googleRatingValue = 5.0, googleReviewCount = 14');
    
    if (!text.includes('googleReviewCount =')) {
      text = text.replace('googleRatingValue = 5.0,', 'googleRatingValue = 5.0, googleReviewCount = 14,');
      text = text.replace('googleRatingValue?: number;', 'googleRatingValue?: number;\n  googleReviewCount?: number;');
    }
  }

  // Now replace all the literals
  text = text.replace(/['"]4\.9\s?★ Google['"]/g, '`${googleRatingValue} ★ Google`');
  text = text.replace(/['"]⭐ 4\.9 on Google['"]/g, '`⭐ ${googleRatingValue} on Google`');
  text = text.replace(/value:\s?["']4\.9\s?★["']/g, 'value: `${googleRatingValue} ★`');
  text = text.replace(/stat:\s?["']4\.9★["']/g, 'stat: `${googleRatingValue}★`');
  text = text.replace(/num:\s?["']4\.9["']/g, 'num: `${googleRatingValue}`');

  text = text.replace(/>\s*4\.9\s?★\s*</g, '>{googleRatingValue} ★<');
  text = text.replace(/>\s*4\.9★\s*</g, '>{googleRatingValue}★<');
  text = text.replace(/Rated 4\.9 on Google/g, 'Rated {googleRatingValue} on Google');
  text = text.replace(/4\.9\/5/g, '{googleRatingValue}/5');

  text = text.replace(/47 verified reviews/g, '{googleReviewCount} verified reviews');
  text = text.replace(/14\+ verified reviews/g, '{googleReviewCount}+ verified reviews');
  text = text.replace(/14 verified reviews/g, '{googleReviewCount} verified reviews');

  // Inject props into internal components
  text = text.replace(/<Testimonials(\s)/g, (match, space) => {
    return `<Testimonials googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount}${space}`;
  });

  text = text.replace(/<Stats(\s)/g, (match, space) => {
    return `<Stats googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount}${space}`;
  });

  fs.writeFileSync(file, text);
});
console.log('Safe fix completed');
