const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.js')) {
      results.push(file);
    }
  });
  return results;
}
const files = [].concat(walk('app'), walk('pages'));
let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let newContent = content.replace(/href=[\"']\/booking[\"']/g, 'href="/book"');
  newContent = newContent.replace(/href=\{\"\/booking\"\}/g, 'href={"/book"}');
  newContent = newContent.replace(/href=\{\'\/booking\'\}/g, "href={'/book'}");
  if (content !== newContent) {
    fs.writeFileSync(f, newContent);
    count++;
    console.log('Updated', f);
  }
});
console.log('Updated ' + count + ' files.');
