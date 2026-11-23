/**
 * ITE5315 dataset enrichment: add deterministic placeholder images.
 * Usage: node add-random-images.js input.json output.json [titleField] [idField]
 * Supports a JSON array or an object with a top-level `records`, `items`, or `data` array.
 * Picsum images are RANDOM PLACEHOLDERS, not factual photographs of the records.
 */
const fs = require('node:fs');
const path = require('node:path');
const [input, output, titleField = 'name', idField = 'id'] = process.argv.slice(2);
if (!input || !output || path.resolve(input) === path.resolve(output)) {
  console.error('Usage: node add-random-images.js input.json output.json [titleField] [idField] (different input/output paths)');
  process.exit(1);
}
const doc = JSON.parse(fs.readFileSync(input, 'utf8'));
const key = Array.isArray(doc) ? null : ['records','items','data'].find(k => Array.isArray(doc?.[k]));
const rows = key ? doc[key] : doc;
if (!Array.isArray(rows)) throw new Error('Expected a JSON array or an object containing records/items/data array.');
function slug(s) { return String(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,80) || 'item'; }
const enhanced = rows.map((row, index) => {
  if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error(`Invalid record at index ${index}`);
  const title = row[titleField] ?? row.title ?? row.name ?? `Record ${index + 1}`;
  const stableId = row[idField] ?? index + 1;
  const seed = slug(`${stableId}-${title}`);
  return { ...row, imageUrl: `https://picsum.photos/seed/${seed}/600/400`, imageAlt: `Illustrative placeholder for ${title}`, imageSource: 'Lorem Picsum – placeholder, not record-specific', imageCreditUrl: 'https://picsum.photos/' };
});
const result = key ? { ...doc, [key]: enhanced } : enhanced;
fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
console.log(`Added placeholder image metadata to ${enhanced.length} records. Output: ${output}`);
