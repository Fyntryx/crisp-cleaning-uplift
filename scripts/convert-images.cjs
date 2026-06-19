const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(process.cwd(), 'public');
const imagesDir = path.join(publicDir, 'images');

const fileMappings = {
  'images/BathTubeAfter.jpg': 'images/bathtube-after-cleaning-melbourne.webp',
  'images/BathtubeBefore.jpg': 'images/bathtube-before-cleaning-melbourne.webp',
  'images/CabinetAfter.png': 'images/cabinet-after-cleaning-melbourne.webp',
  'images/CabinetBefore.jpg': 'images/cabinet-before-cleaning-melbourne.webp',
  'images/ChimneyAfter.jpg': 'images/chimney-after-cleaning-melbourne.webp',
  'images/ChimneyBefore.jpg': 'images/chimney-before-cleaning-melbourne.webp',
  'images/CouchAfter.png': 'images/couch-after-cleaning-melbourne.webp',
  'images/CouchBefore.png': 'images/couch-before-cleaning-melbourne.webp',
  'images/DrawerAfter.jpg': 'images/drawer-after-cleaning-melbourne.webp',
  'images/DrawerBefore.png': 'images/drawer-before-cleaning-melbourne.webp',
  'images/FridgeAfter.jpg': 'images/fridge-after-cleaning-melbourne.webp',
  'images/FridgeBefore.jpg': 'images/fridge-before-cleaning-melbourne.webp',
  'images/GasStoveAfter.png': 'images/gas-stove-after-cleaning-melbourne.webp',
  'images/GasStoveBefore.jpg': 'images/gas-stove-before-cleaning-melbourne.webp',
  'images/KitchenSinkAfter.jpg': 'images/kitchen-sink-after-cleaning-melbourne.webp',
  'images/KitchenSinkBefore.png': 'images/kitchen-sink-before-cleaning-melbourne.webp',
  'images/OurMissionbedroom_2.jpg': 'images/house-cleaning-melbourne-bedroom.webp',
  'images/OurMissionliving_room_4.png': 'images/house-cleaning-melbourne-living-room.webp',
  'images/OurStory.png': 'images/our-story-cleaning-company-melbourne.webp',
  'images/OurStoryliving_room_7.png': 'images/clean-living-room-melbourne.webp',
  'images/StoveTopAfter.jpg': 'images/stove-top-after-cleaning-melbourne.webp',
  'images/StoveTopBefore.jpg': 'images/stove-top-before-cleaning-melbourne.webp',
  'images/ToiletAfter.jpg': 'images/toilet-after-cleaning-melbourne.webp',
  'images/ToiletBefore.jpg': 'images/toilet-before-cleaning-melbourne.webp',
  'images/Untitled design.png': 'images/home-cleaning-design-melbourne.webp',
  'images/WindowAfter.jpg': 'images/window-after-cleaning-melbourne.webp',
  'images/WindowBefore.jpg': 'images/window-before-cleaning-melbourne.webp',
  'images/bathroom-after.jpg': 'images/clean-bathroom-after-service.webp',
  'images/bathroom-before.jpg': 'images/dirty-bathroom-before-service.webp',
  'images/house-popup.png': 'images/crisp-cleaning-house-popup.webp',
  'images/kitchen-after.jpg': 'images/sparkling-clean-kitchen.webp',
  'images/kitchen-before.jpg': 'images/dirty-kitchen-before-cleaning.webp',
  'after.jpg': 'after-house-cleaning-melbourne.webp',
  'before.png': 'before-house-cleaning-melbourne.webp',
  'footer-bg.png': 'crisp-cleaning-footer-background.webp',
  'logo.png': 'crisp-cleaning-logo.webp',
  'workflow.png': 'cleaning-workflow-melbourne.webp',
};

async function run() {
  const replacements = [];
  
  for (const [oldPath, newPath] of Object.entries(fileMappings)) {
    const fullOldPath = path.join(publicDir, oldPath);
    const fullNewPath = path.join(publicDir, newPath);
    
    if (fs.existsSync(fullOldPath)) {
      await sharp(fullOldPath)
        .webp({ quality: 80 })
        .toFile(fullNewPath);
        
      fs.unlinkSync(fullOldPath);
      console.log(`Converted: ${oldPath} -> ${newPath}`);
      
      replacements.push({
        old: '/' + oldPath.replace(/\\/g, '/'),
        new: '/' + newPath.replace(/\\/g, '/')
      });
      replacements.push({
        old: oldPath.replace(/\\/g, '/'),
        new: newPath.replace(/\\/g, '/')
      });
    }
  }

  const srcDir = path.join(process.cwd(), 'src');
  
  function updateFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        updateFiles(fullPath);
      } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css'))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;
        
        for (const {old, new: newPath} of replacements) {
          if (content.includes(old)) {
            // Be careful to replace only complete strings
            content = content.split(old).join(newPath);
            modified = true;
          }
        }
        
        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log(`Updated paths in: ${fullPath}`);
        }
      }
    }
  }
  
  updateFiles(srcDir);
}

run().catch(console.error);
