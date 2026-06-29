import fs from 'fs';

// 1. Missing sanityFetch
const missingFetch = [
  'src/app/house-cleaning-brunswick/page.tsx',
  'src/app/house-cleaning-cheltenham/page.tsx',
  'src/app/house-cleaning-malvern/page.tsx',
  'src/app/house-cleaning-maribyrnong/page.tsx',
  'src/app/house-cleaning-south-yarra/page.tsx',
  'src/app/house-cleaning-toorak/page.tsx',
  'src/app/house-cleaning-bundoora/page.tsx',
  'src/app/house-cleaning-north-melbourne/page.tsx',
  'src/app/house-cleaning-point-cook/page.tsx',
  'src/app/house-cleaning-preston/page.tsx'
];

missingFetch.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('sanityFetch')) {
    content = `import { sanityFetch } from "@/sanity/lib/live";\n` + content;
    fs.writeFileSync(f, content);
  }
});

// 2. Missing googleRatingValue in bundoora, north-melbourne, point-cook, preston
const missingPropsPages = [
  'src/app/house-cleaning-bundoora/page.tsx',
  'src/app/house-cleaning-north-melbourne/page.tsx',
  'src/app/house-cleaning-point-cook/page.tsx',
  'src/app/house-cleaning-preston/page.tsx'
];

missingPropsPages.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  if (!content.includes('siteSettings')) {
    content = content.replace(/return\s*\(\s*<main/, `
  const { data: siteSettings } = await sanityFetch({
    query: \`*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }\`,
  });
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;
  const googleReviewCount = siteSettings?.googleReviewCount || 14;

  return (
    <main`);
  }
  
  // Add props to Client component right after the tag name
  content = content.replace(/<([A-Z][A-Za-z]+Client)(\s)/g, (match, tag, space) => {
    if (content.includes(`${tag} googleRatingValue`)) return match;
    return `<${tag} googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount}${space}`;
  });

  // Add props to Testimonials right after the tag name
  content = content.replace(/<Testimonials(\s)/g, (match, space) => {
    if (content.includes(`Testimonials googleRatingValue`)) return match;
    return `<Testimonials googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount}${space}`;
  });

  // Also fix async!
  if (!content.includes('async function')) {
    content = content.replace(/export default function/, 'export default async function');
  }

  fs.writeFileSync(f, content);
});

// 3. MelbourneCBD double props
let melb = fs.readFileSync('src/app/house-cleaning-melbourne/page.tsx', 'utf8');
melb = melb.replace(/<MelbourneCBDClient googleRatingValue=\{googleRatingValue\} googleReviewCount=\{googleReviewCount\}/, '<MelbourneCBDClient ');
fs.writeFileSync('src/app/house-cleaning-melbourne/page.tsx', melb);

// 4. BrightonClient missing rating value
let brighton = fs.readFileSync('src/components/lp/BrightonClient.tsx', 'utf8');
if (!brighton.includes('googleRatingValue =')) {
  brighton = brighton.replace('googleReviewCount = 14', 'googleRatingValue = 5.0, googleReviewCount = 14');
  brighton = brighton.replace('googleReviewCount?: number;', 'googleRatingValue?: number;\n  googleReviewCount?: number;');
}
fs.writeFileSync('src/components/lp/BrightonClient.tsx', brighton);
