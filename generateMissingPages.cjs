const fs = require('fs');
const path = require('path');

const regions = [
    { name: "Melbourne CBD", slug: "melbourne-cbd", path: "/apartment-cleaning-melbourne-cbd" },
    { name: "North Melbourne", slug: "north-melbourne" },
    { name: "Richmond", slug: "richmond" },
    { name: "South Yarra", slug: "south-yarra" },
    { name: "Windsor", slug: "windsor" },
    { name: "Albert Park", slug: "albert-park" },
    { name: "Armadale", slug: "armadale" },
    { name: "Bentleigh East", slug: "bentleigh-east" },
    { name: "Brighton", slug: "brighton" },
    { name: "Carnegie", slug: "carnegie" },
    { name: "Cheltenham", slug: "cheltenham" },
    { name: "Glen Iris", slug: "glen-iris" },
    { name: "Hampton", slug: "hampton" },
    { name: "Hawthorn", slug: "hawthorn" },
    { name: "Kew", slug: "kew" },
    { name: "Malvern", slug: "malvern" },
    { name: "Oakleigh", slug: "oakleigh" },
    { name: "Sandringham", slug: "sandringham" },
    { name: "Toorak", slug: "toorak" },
    { name: "Brunswick", slug: "brunswick" },
    { name: "Bundoora", slug: "bundoora" },
    { name: "Coburg", slug: "coburg" },
    { name: "Craigieburn", slug: "craigieburn" },
    { name: "Greensborough", slug: "greensborough" },
    { name: "Ivanhoe", slug: "ivanhoe" },
    { name: "Mernda", slug: "mernda" },
    { name: "Preston", slug: "preston" },
    { name: "Reservoir", slug: "reservoir" },
    { name: "Balwyn North", slug: "balwyn-north" },
    { name: "Box Hill", slug: "box-hill" },
    { name: "Camberwell", slug: "camberwell" },
    { name: "Chelsea", slug: "chelsea" },
    { name: "Croydon", slug: "croydon" },
    { name: "Doncaster", slug: "doncaster" },
    { name: "Doncaster East", slug: "doncaster-east" },
    { name: "Glen Waverley", slug: "glen-waverley" },
    { name: "Mount Waverley", slug: "mount-waverley" },
    { name: "Ringwood", slug: "ringwood" },
    { name: "Templestowe", slug: "templestowe" },
    { name: "Brooklyn", slug: "brooklyn" },
    { name: "Caroline Springs", slug: "caroline-springs" },
    { name: "Essendon", slug: "essendon" },
    { name: "Footscray", slug: "footscray" },
    { name: "Maribyrnong", slug: "maribyrnong" },
    { name: "Moonee Ponds", slug: "moonee-ponds" },
    { name: "Point Cook", slug: "point-cook" },
    { name: "St Albans", slug: "st-albans" },
    { name: "Strathmore", slug: "strathmore" },
    { name: "Werribee", slug: "werribee" },
    { name: "Yarraville", slug: "yarraville" }
];

const templatePagePath = path.join(__dirname, 'src/app/house-cleaning-brunswick/page.tsx');
const templateClientPath = path.join(__dirname, 'src/components/lp/BrunswickClient.tsx');

const templatePageContent = fs.readFileSync(templatePagePath, 'utf8');
const templateClientContent = fs.readFileSync(templateClientPath, 'utf8');

function toPascalCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return word.toUpperCase();
    }).replace(/\s+/g, '');
}

for (const sub of regions) {
    // Determine target dir
    let targetPath = sub.path ? sub.path.substring(1) : `house-cleaning-${sub.slug}`;
    const pageDir = path.join(__dirname, 'src/app', targetPath);
    
    // Check if it already exists
    if (!fs.existsSync(pageDir)) {
        console.log(`Generating ${sub.name}...`);
        fs.mkdirSync(pageDir, { recursive: true });
        
        const componentName = toPascalCase(sub.name); // e.g. "DoncasterEast"
        
        let newPageContent = templatePageContent
            .replace(/Brunswick/g, componentName) // For component names and static text
            .replace(/brunswick/g, sub.slug)
            .replace(/House Cleaning Brunswick/g, `House Cleaning ${sub.name}`)
            .replace(/House cleaning in Brunswick\./g, `House cleaning in ${sub.name}.`)
            .replace(/\{ "@type": "City", "name": "Brunswick" \}/g, `{ "@type": "City", "name": "${sub.name}" }`);
            
        // Because of the global replace above, the first one `import BrunswickClient` becomes `import DoncasterEastClient`
        // We need to fix the import name and component name to have "Client"
        
        // Wait, templatePageContent has `import BrunswickClient` and `<BrunswickClient />` and `export default function BrunswickPage()`
        // Replace "Brunswick" with `componentName` -> `import DoncasterEastClient`, `<DoncasterEastClient />`, `export default function DoncasterEastPage()`
        // But what about description text "House Cleaning Brunswick" -> "House Cleaning DoncasterEast"?
        // It's better to do targeted replacements.
        let safePage = templatePageContent;
        safePage = safePage.replace(/BrunswickClient/g, `${componentName}Client`);
        safePage = safePage.replace(/BrunswickPage/g, `${componentName}Page`);
        safePage = safePage.replace(/house-cleaning-brunswick/g, targetPath); // URL path
        safePage = safePage.replace(/House Cleaning Brunswick/g, `House Cleaning ${sub.name}`);
        safePage = safePage.replace(/House cleaning in Brunswick/g, `House cleaning in ${sub.name}`);
        safePage = safePage.replace(/"name": "Brunswick"/g, `"name": "${sub.name}"`);
        
        const newPagePath = path.join(pageDir, 'page.tsx');
        fs.writeFileSync(newPagePath, safePage);
        
        let safeClient = templateClientContent;
        safeClient = safeClient.replace(/BrunswickClient/g, `${componentName}Client`);
        safeClient = safeClient.replace(/Brunswick/g, sub.name);
        // Sometimes the slug might be used in the client component? Probably not, but just in case:
        
        const newClientPath = path.join(__dirname, 'src/components/lp', `${componentName}Client.tsx`);
        fs.writeFileSync(newClientPath, safeClient);
    }
}
console.log("Done.");
