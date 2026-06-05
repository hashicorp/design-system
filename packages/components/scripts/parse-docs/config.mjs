import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
export const ENTRY_FILE_PATH = resolve(SCRIPT_DIR, '../../src/components.ts');
export const OUTPUT_FILE_PATH = resolve(
  SCRIPT_DIR,
  '../../dist/manifest/component.json'
);
export const TSCONFIG_PATH = resolve(SCRIPT_DIR, '../../tsconfig.json');

/**
 * Keep tracing bounded so a single highly-expanded type from local or external
 * declarations cannot explode parse time or output size
 */
export const TYPE_TRACE_LIMITS = {
  maxDepth: 24,
  maxUnionMembers: 80,
  maxTemplateExpansions: 120,
};
