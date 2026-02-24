const fs = require('fs');
const path = 'd:/konduti Traders - Demo - VGS/konduti-traders/src/data/products.ts';
let content = fs.readFileSync(path, 'utf8');

// Fix 'year - round' to 'year-round'
content = content.replace(/'year - round'/g, "'year-round'");

fs.writeFileSync(path, content);
console.log('Fixed year-round spacings.');
