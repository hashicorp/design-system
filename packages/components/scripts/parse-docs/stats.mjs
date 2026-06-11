/** Copyright IBM Corp. 2021, 2026 SPDX-License-Identifier: MPL-2.0 */

const STAT_DEFINITIONS = [
  { key: 'exportsVisited', label: 'Exports visited' },
  { key: 'componentsGenerated', label: 'Components generated' },
  {
    key: 'skippedWithoutModuleSpecifier',
    label: 'Skipped (no module specifier)',
  },
  { key: 'skippedMissingTypesFile', label: 'Skipped (missing types file)' },
  { key: 'skippedDuplicateComponent', label: 'Skipped (duplicate component)' },
  {
    key: 'skippedMissingArgDeclaration',
    label: 'Skipped (missing arg declaration)',
  },
  {
    key: 'skippedMissingBlockDeclaration',
    label: 'Skipped (missing block declaration)',
  },
  {
    key: 'skippedMissingYieldDeclaration',
    label: 'Skipped (missing yield declaration)',
  },
  {
    key: 'typeResolvedViaAst',
    label: 'Types resolved via AST tracing',
  },
  { key: 'typeResolutionFallbacks', label: 'Type resolution fallbacks' },
  {
    key: 'typeResolutionCapped',
    label: 'Type resolution capped by limits',
  },
];

export function createStats() {
  return Object.fromEntries(
    STAT_DEFINITIONS.map((definition) => [definition.key, 0])
  );
}

export function printStatsSummary(stats) {
  console.log('\n📊 Docs parse summary:');
  STAT_DEFINITIONS.forEach(({ key, label }) => {
    console.log(`  ${label}: ${stats[key]}`);
  });
}
