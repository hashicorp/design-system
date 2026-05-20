/**
 * Internal helpers for resolving yielded-component metadata referenced
 * from a parent component's `Blocks.default` tuple element.
 *
 * Kept separate from `parse-contextual.ts` so the orchestrator there can
 * stay focused on traversal while these small, easily testable units
 * (import alias resolution, yielded source-text parsing) live alongside
 * dedicated tests.
 */

import type { InterfaceDeclaration } from 'ts-morph';

export interface ParsedYieldedSource {
  className: string;
  boundArgs: Set<string>;
}

/**
 * Resolve the module specifier (e.g. `'./foo'`) for a local identifier
 * (e.g. `HdsFoo` or `Bar` from `import { Foo as Bar }`) by scanning the
 * containing source file's import declarations.
 *
 * Matches against both default imports and named imports, and for named
 * imports matches both the original imported name and the local alias so
 * lookups by the in-source identifier always work.
 */
export function getImportSpecifierForIdentifier(
  interfaceDecl: InterfaceDeclaration,
  identifierName: string
): string | undefined {
  const sourceFile = interfaceDecl.getSourceFile();

  for (const importDeclaration of sourceFile.getImportDeclarations()) {
    const defaultImport = importDeclaration.getDefaultImport();

    if (
      defaultImport !== undefined &&
      defaultImport.getText() === identifierName
    ) {
      return importDeclaration.getModuleSpecifierValue();
    }

    const namedImport = importDeclaration
      .getNamedImports()
      .find((namedSpecifier) => {
        // Match against both the original imported name and the local alias
        // (e.g. `import { Foo as Bar }` should match identifier `Bar`).
        const aliasName = namedSpecifier.getAliasNode()?.getText();
        return (
          namedSpecifier.getName() === identifierName ||
          aliasName === identifierName
        );
      });

    if (namedImport !== undefined) {
      return importDeclaration.getModuleSpecifierValue();
    }
  }

  return undefined;
}

/**
 * Parse the raw source text of a contextual yielded value to extract the
 * yielded component class name and any args that have been bound via
 * `WithBoundArgs<typeof Component, "argA" | "argB">`.
 *
 * Returns `undefined` when the text does not describe a yielded component
 * reference (e.g. plain primitive types, tracked properties, functions).
 */
export function parseYieldedSourceText(
  typeText: string
): ParsedYieldedSource | undefined {
  const withBoundMatch = typeText.match(
    /WithBoundArgs<\s*typeof\s+([A-Za-z0-9_]+)\s*,\s*([^>]+)>/u
  );

  if (withBoundMatch !== null) {
    const className = withBoundMatch[1];
    const rawUnion = withBoundMatch[2];

    if (className !== undefined && rawUnion !== undefined) {
      const values = rawUnion
        .split('|')
        .map((part) => part.trim())
        .map((part) => part.replace(/^['"`]|['"`]$/gu, ''))
        .filter((part) => part.length > 0 && part !== 'never');

      return {
        className,
        boundArgs: new Set(values),
      };
    }
  }

  const typeofMatch = typeText.match(/^typeof\s+([A-Za-z0-9_]+)/u);
  if (typeofMatch !== null && typeofMatch[1] !== undefined) {
    return {
      className: typeofMatch[1],
      boundArgs: new Set<string>(),
    };
  }

  return undefined;
}
