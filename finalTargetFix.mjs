import fs from 'fs';

// Fix missing sanityFetch
const missingFetch = [
  'src/app/house-cleaning-brunswick/page.tsx',
  'src/app/house-cleaning-cheltenham/page.tsx',
  'src/app/house-cleaning-malvern/page.tsx',
  'src/app/house-cleaning-maribyrnong/page.tsx',
  'src/app/house-cleaning-south-yarra/page.tsx',
  'src/app/house-cleaning-toorak/page.tsx'
];

missingFetch.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('import { sanityFetch }')) {
    content = 'import { sanityFetch } from "@/sanity/lib/live";\n' + content;
    fs.writeFileSync(f, content);
  }
});

// Fix missing properties injected in pages without sanityFetch block yet
const missingPropsPages = [
  'src/app/house-cleaning-bundoora/page.tsx',
  'src/app/house-cleaning-north-melbourne/page.tsx',
  'src/app/house-cleaning-point-cook/page.tsx',
  'src/app/house-cleaning-preston/page.tsx'
];

missingPropsPages.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('const googleRatingValue =')) {
    content = content.replace(/return\s*\(\s*<main/, `
  const { data: siteSettings } = await sanityFetch({
    query: \`*[_type == "siteSettings"][0]{ googleReviewCount, googleRatingValue }\`,
  });
  const googleRatingValue = siteSettings?.googleRatingValue || 5.0;
  const googleReviewCount = siteSettings?.googleReviewCount || 14;

  return (
    <main`);
  }
  fs.writeFileSync(f, content);
});

// Fix Melbourne double prop
let melb = fs.readFileSync('src/app/house-cleaning-melbourne/page.tsx', 'utf8');
melb = melb.replace(/<MelbourneCBDClient googleRatingValue=\{googleRatingValue\} googleReviewCount=\{googleReviewCount\}[\s\S]*?googleRatingValue=\{googleRatingValue\} googleReviewCount=\{googleReviewCount\}/, '<MelbourneCBDClient googleRatingValue={googleRatingValue} googleReviewCount={googleReviewCount} ');
fs.writeFileSync('src/app/house-cleaning-melbourne/page.tsx', melb);

// Fix Brighton client missing var
let brighton = fs.readFileSync('src/components/lp/BrightonClient.tsx', 'utf8');
if (!brighton.includes('googleRatingValue =')) {
  brighton = brighton.replace('googleReviewCount = 14', 'googleRatingValue = 5.0, googleReviewCount = 14');
  brighton = brighton.replace('googleReviewCount?: number;', 'googleRatingValue?: number;\n  googleReviewCount?: number;');
}
fs.writeFileSync('src/components/lp/BrightonClient.tsx', brighton);
