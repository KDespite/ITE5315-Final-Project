/**
 * ITE5315 dataset enrichment: geocode real place names using OpenStreetMap Nominatim.
 * Usage: node add-geolocation.js input.json output.json cityField [countryField]
 * Example: node add-geolocation.js data/restaurants.json data/restaurants-geo.json city country
 * Requires Node.js >=18 and Internet. Respect Nominatim usage policy: 1 request / second,
 * identifiable User-Agent, caching; do not use for bulk or high-volume geocoding.
 * Set GEOCODE_CONTACT to your real contact email to identify your requests.
 * Records without a location are left with null coordinates; do NOT fabricate locations.
 */
const fs = require('node:fs');
const path = require('node:path');
const [input, output, cityField, countryField = 'country'] = process.argv.slice(2);
const contact = process.env.GEOCODE_CONTACT;
if (!input || !output || !cityField || !contact || path.resolve(input) === path.resolve(output)) {
  console.error('Usage: set GEOCODE_CONTACT=your.email@example.com (PowerShell: $env:GEOCODE_CONTACT="...")');
  console.error('       node add-geolocation.js input.json output.json cityField [countryField]');
  process.exit(1);
}
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) throw new Error('GEOCODE_CONTACT must be a valid contact email.');
const doc = JSON.parse(fs.readFileSync(input, 'utf8'));
const key = Array.isArray(doc) ? null : ['records','items','data'].find(k => Array.isArray(doc?.[k]));
const rows = key ? doc[key] : doc;
if (!Array.isArray(rows)) throw new Error('Expected a JSON array or an object containing records/items/data array.');
const cachePath = path.resolve(path.dirname(output), '.geocode-cache.json');
let cache = fs.existsSync(cachePath) ? JSON.parse(fs.readFileSync(cachePath, 'utf8')) : {};
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
let lastRequest = 0;
async function lookup(query) {
  if (Object.prototype.hasOwnProperty.call(cache, query)) return cache[query];
  await wait(Math.max(0, 1200 - (Date.now() - lastRequest)));
  lastRequest = Date.now();
  const url = 'https://nominatim.openstreetmap.org/search?' + new URLSearchParams({ q: query, format: 'jsonv2', limit: '1' });
  const response = await fetch(url, { headers: { 'User-Agent': `ITE5315-student-geocoder/1.0 (${contact})`, Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Geocoder HTTP ${response.status}; stop and retry later.`);
  const matches = await response.json();
  const top = matches[0];
  cache[query] = top ? { latitude: Number(top.lat), longitude: Number(top.lon), displayName: top.display_name } : null;
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
  return cache[query];
}
async function main() {
  const outputRows = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || typeof row !== 'object' || Array.isArray(row)) throw new Error(`Invalid record at index ${i}`);
    const city = String(row[cityField] ?? '').trim();
    const country = String(row[countryField] ?? '').trim();
    const place = [city,country].filter(Boolean).join(', ');
    const geo = city ? await lookup(place) : null;
    outputRows.push({ ...row, geoLocation: geo ? { type: 'Point', coordinates: [geo.longitude, geo.latitude], label: geo.displayName, accuracy: 'place-centroid', source: 'OpenStreetMap Nominatim' } : null });
    console.log(`${i + 1}/${rows.length}: ${place || '(no city)'} => ${geo ? 'found' : 'not found'}`);
  }
  fs.mkdirSync(path.dirname(path.resolve(output)), {recursive:true});
  const result = key ? { ...doc, [key]: outputRows } : outputRows;
  fs.writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
  console.log(`Done. Output: ${output}. Geolocation is an approximate place centroid, NOT an exact business address.`);
}
main().catch(err => { console.error(err.message); process.exitCode = 1; });
