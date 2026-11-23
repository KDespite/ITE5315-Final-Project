const fs = require('fs');

const input = 'data/dataset-enriched.json';
const output = 'data/dataset-final.json';

const products = JSON.parse(
    fs.readFileSync(input, 'utf8')
);

const enhanced = products.map(product => ({
    ...product,
    pricing: {
        amount: product.price,
        currency: product.currency
    }
}));

fs.writeFileSync(
    output,
    JSON.stringify(enhanced, null, 2)
);

console.log(`Added nested pricing to ${enhanced.length} products.`);