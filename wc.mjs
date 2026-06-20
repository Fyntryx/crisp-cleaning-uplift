import { JSDOM } from 'jsdom';

async function getWordCount(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const text = dom.window.document.body.textContent || "";
    // Replace multiple whitespaces and newlines with a single space
    const cleanText = text.replace(/\s+/g, ' ').trim();
    return cleanText.split(' ').length;
  } catch (err) {
    console.error(`Error fetching ${url}:`, err.message);
    return 0;
  }
}

async function run() {
  const pages = [
    { name: 'Homepage', url: 'http://localhost:3000/' },
    { name: 'House Cleaning', url: 'http://localhost:3000/house-cleaning-melbourne' },
    { name: 'Deep Cleaning', url: 'http://localhost:3000/deep-cleaning-melbourne' },
    { name: 'End of Lease Cleaning', url: 'http://localhost:3000/end-of-lease-cleaning-melbourne' },
  ];

  for (const page of pages) {
    const wc = await getWordCount(page.url);
    console.log(`${page.name}: ${wc} words`);
  }
}

run();
