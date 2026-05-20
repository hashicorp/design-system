/**
 * Shared utilities for detecting type-shape overrides that the manifest
 * generator treats specially.
 *
 * Currently this is limited to icon-name typed properties, which the
 * generator surfaces as `type: 'enum'` with a sentinel `['__icons__']`
 * values list so downstream consumers know to expand the available icon
 * set at render time.
 */

const ICON_NAME_TYPE_PATTERNS: readonly RegExp[] = [
  /HdsIconSignature\[['"]Args['"]\]\[['"]name['"]\]/u,
  /\[['"]Args['"]\]\[['"]icon['"]\]/u,
  /(^|[^A-Za-z0-9_])IconName($|[^A-Za-z0-9_])/u,
];

export function isIconNameType(typeText: string): boolean {
  return ICON_NAME_TYPE_PATTERNS.some((pattern) => pattern.test(typeText));
}

export const ICON_ENUM_PARSED_TYPE = {
  typeName: 'enum',
  values: ['__icons__'],
} as const;
