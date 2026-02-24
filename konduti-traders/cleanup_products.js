const fs = require('fs');
const path = 'd:/konduti Traders - Demo - VGS/konduti-traders/src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

// Fix spacing in IDs, Slugs, Categories, Image Paths
content = content.replace(/id:\s*'([a-z]{2}-\s*\d+)'/g, (m, p1) => `id: '${p1.replace(/\s+/g, '')}'`);
content = content.replace(/slug:\s*'([^']+)'/g, (m, p1) => `slug: '${p1.replace(/\s+/g, '')}'`);
content = content.replace(/category:\s*'([^']+)'/g, (m, p1) => `category: '${p1.replace(/\s+/g, '')}'`);
content = content.replace(/image:\s*'([^']+)'/g, (m, p1) => `image: '${p1.replace(/\s+/g, '')}'`);

// Fix apostrophes in descriptions (escape them)
content = content.replace(/description:\s*'([^']+)'/g, (m, p1) => {
    // If it contains an apostrophe, use double quotes or escape it
    if (p1.includes("'")) {
        return `description: "${p1.replace(/"/g, '\\"')}"`;
    }
    return m;
});

// Fix tags with spaces if they look like IDs or Slugs
content = content.replace(/tags:\s*\[([^\]]+)\]/g, (m, p1) => {
    const tags = p1.split(',').map(tag => {
        let t = tag.trim();
        if (t.startsWith("'") && t.endsWith("'")) {
            // Decided not to strip spaces from tags as they might be intentional (e.g., 'High curcumin')
            // But let's fix apostrophes if any
            let inner = t.slice(1, -1);
            if (inner.includes("'")) {
                return `"${inner.replace(/"/g, '\\"')}"`;
            }
        }
        return tag;
    });
    return `tags: [${tags.join(', ')}]`;
});

fs.writeFileSync(path, content);
console.log('Advanced cleanup complete');
