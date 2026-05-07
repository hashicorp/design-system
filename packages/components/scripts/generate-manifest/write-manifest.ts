import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import { manifestPath } from './paths.ts';

import type { Catalog } from './types.ts';

export function writeManifest(catalog: Catalog): string {
  mkdirSync(dirname(manifestPath), { recursive: true });

  writeFileSync(
    manifestPath,
    `${JSON.stringify(catalog, null, 2)}\n`,
    'utf8'
  );
  return manifestPath;
}
