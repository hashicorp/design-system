import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));

export const repoRoot = resolve(scriptDir, '../../../..');
export const componentsSrcRoot = resolve(repoRoot, 'packages/components/src');
export const componentsExportsPath = resolve(componentsSrcRoot, 'components.ts');
export const manifestPath = resolve(scriptDir, '../../dist/manifest/components.json');
