import { generateCatalog } from './component-catalog.ts';
import { writeManifest } from './write-manifest.ts';

const catalog = generateCatalog();
const outputPath = writeManifest(catalog);

console.log(`Generated ${catalog.components.length} components in ${outputPath}`);
