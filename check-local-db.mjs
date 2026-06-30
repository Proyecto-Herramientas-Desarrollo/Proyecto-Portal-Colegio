import { SAN_ALFONSO_DB } from './src/app/shared/data/db.js';

console.log('Keys in SAN_ALFONSO_DB:', Object.keys(SAN_ALFONSO_DB));
console.log('Number of items in each key:');
for (const key of Object.keys(SAN_ALFONSO_DB)) {
  console.log(`- ${key}: ${SAN_ALFONSO_DB[key].length}`);
}
