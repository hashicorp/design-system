export function createStats() {
  return {
    exportsVisited: 0,
    componentsGenerated: 0,
    skippedWithoutModuleSpecifier: 0,
    skippedMissingTypesFile: 0,
    skippedDuplicateComponent: 0,
    skippedMissingArgDeclaration: 0,
    skippedMissingBlockDeclaration: 0,
    skippedMissingYieldDeclaration: 0,
    typeResolvedViaAst: 0,
    typeResolutionFallbacks: 0,
    typeResolutionCapped: 0,
  };
}

export function printStatsSummary(stats) {
  console.log('\n📊 Docs parse summary:');
  console.log(`  Exports visited: ${stats.exportsVisited}`);
  console.log(`  Components generated: ${stats.componentsGenerated}`);
  console.log(
    `  Skipped (no module specifier): ${stats.skippedWithoutModuleSpecifier}`
  );
  console.log(`  Skipped (missing types file): ${stats.skippedMissingTypesFile}`);
  console.log(
    `  Skipped (duplicate component): ${stats.skippedDuplicateComponent}`
  );
  console.log(
    `  Skipped (missing arg declaration): ${stats.skippedMissingArgDeclaration}`
  );
  console.log(
    `  Skipped (missing block declaration): ${stats.skippedMissingBlockDeclaration}`
  );
  console.log(
    `  Skipped (missing yield declaration): ${stats.skippedMissingYieldDeclaration}`
  );
  console.log(`  Types resolved via AST tracing: ${stats.typeResolvedViaAst}`);
  console.log(`  Type resolution fallbacks: ${stats.typeResolutionFallbacks}`);
  console.log(`  Type resolution capped by limits: ${stats.typeResolutionCapped}`);
}
