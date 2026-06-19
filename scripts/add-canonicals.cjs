const fs = require('fs');
const path = require('path');

const appDir = path.join(process.cwd(), 'src', 'app');

function findPages(dir, basePath = '') {
  let pages = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(') || entry.name.startsWith('_') || entry.name === 'api' || entry.name === 'studio') {
        continue;
      }
      const newBasePath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`;
      const pagePath = path.join(dir, entry.name, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        pages.push({ path: pagePath, route: newBasePath });
      }
      pages = [...pages, ...findPages(path.join(dir, entry.name), newBasePath)];
    }
  }
  return pages;
}

const pages = findPages(appDir);
const rootPage = path.join(appDir, 'page.tsx');
if (fs.existsSync(rootPage)) {
  pages.push({ path: rootPage, route: '/' });
}

pages.forEach(({ path: pagePath, route }) => {
  let content = fs.readFileSync(pagePath, 'utf8');
  
  if (content.includes('export const metadata')) {
    // Inject alternates: { canonical: 'route' } inside metadata
    if (!content.includes('canonical:')) {
      content = content.replace(/(export const metadata[^=]*=\s*\{)/, `$1\n  alternates: {\n    canonical: '${route}',\n  },`);
      fs.writeFileSync(pagePath, content);
      console.log(`Updated metadata for ${route}`);
    } else {
      console.log(`Canonical already exists for ${route}`);
    }
  } else {
    // Add Metadata import if not exists
    if (!content.includes("from 'next'") && !content.includes('from "next"')) {
      content = `import { Metadata } from "next";\n` + content;
    } else if (content.includes("from 'next'") && !content.includes('Metadata')) {
      content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]next['"]/, 'import { Metadata, $1 } from "next"');
    } else if (content.includes('from "next"') && !content.includes('Metadata')) {
      content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]next['"]/, 'import { Metadata, $1 } from "next"');
    }
    
    // Add metadata block
    const metadataBlock = `\nexport const metadata: Metadata = {\n  alternates: {\n    canonical: '${route}',\n  },\n};\n`;
    
    // Find the last import and insert after it
    const importMatches = [...content.matchAll(/^import.*$/gm)];
    if (importMatches.length > 0) {
      const lastImport = importMatches[importMatches.length - 1];
      const insertIndex = lastImport.index + lastImport[0].length;
      content = content.slice(0, insertIndex) + '\n' + metadataBlock + content.slice(insertIndex);
    } else {
      content = metadataBlock + '\n' + content;
    }
    
    fs.writeFileSync(pagePath, content);
    console.log(`Added metadata block to ${route}`);
  }
});
