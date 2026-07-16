const fs = require('fs');
const glob = require('glob');

let count = 0;
const files = glob.sync('src/app/house-cleaning-*/page.tsx');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    const regex = /\{heroImageSrc \? \([\s\S]*?<Image[\s\S]*?\/>[\s\S]*?\) : \(/;
    
    if (regex.test(content) && !content.includes('bg-gradient-to-t from-black/80')) {
        const replacement = `{heroImageSrc ? (
                  <>
                    <Image
                      src={heroImageSrc}
                      alt={\`House cleaning in \${SUBURB_NAME}, Melbourne\`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20 pointer-events-none">
                      <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-lg border border-white/20">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <span className="text-[#FB8C42] text-[11px] font-bold tracking-widest uppercase mb-3 drop-shadow-md">Dedicated Service Area</span>
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight leading-none drop-shadow-lg">{SUBURB_NAME}</h3>
                      <p className="text-gray-100 max-w-[280px] text-sm leading-relaxed font-medium drop-shadow-md">{fallbackText}</p>
                    </div>
                  </>
                ) : (`;
        
        content = content.replace(regex, replacement);
        fs.writeFileSync(file, content);
        count++;
    }
});
console.log('Updated ' + count + ' files');
