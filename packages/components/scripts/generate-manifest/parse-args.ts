import type { InterfaceDeclaration } from 'ts-morph';

import { getDocLinks, getDocNotes, getDocTag, parseValuesTag } from './doc-tags.ts';
import { parseType } from './types-parser.ts';
import { getPropertySignatureFromSymbol } from './ts-morph-helpers.ts';
import { normalizeDefaultValue } from './utils.ts';
import { normalizeApiText } from './api-text.ts';

import type { CatalogArg } from './types.ts';

function isIconNameType(typeText: string): boolean {
  const iconNameTypePatterns = [
    /HdsIconSignature\[['"]Args['"]\]\[['"]name['"]\]/u,
    /\[['"]Args['"]\]\[['"]icon['"]\]/u,
    /(^|[^A-Za-z0-9_])IconName($|[^A-Za-z0-9_])/u,
  ];

  return iconNameTypePatterns.some((pattern) => pattern.test(typeText));
}

export function parseArgs(interfaceDecl: InterfaceDeclaration): CatalogArg[] {
  const argsProperty = interfaceDecl.getProperty('Args');

  if (argsProperty === undefined) {
    return [];
  }

  const args: CatalogArg[] = [];

  const argsType = argsProperty.getType();
  const symbols = argsType.getProperties();
  const argSymbols =
    symbols.length > 0 ? symbols : argsType.getApparentProperties();

  for (const symbol of argSymbols) {
    const property = getPropertySignatureFromSymbol(symbol);
    const typeNode = property ?? argsProperty;
    const symbolType = symbol.getTypeAtLocation(typeNode);
    const resolvedTypeText = symbolType.getText();
    const rawTypeText = property?.getTypeNode()?.getText();
    const typeTextForIconCheck = rawTypeText ?? resolvedTypeText;

    const parsedType =
      isIconNameType(typeTextForIconCheck) === true
        ? {
            typeName: 'enum',
            values: ['__icons__'],
          }
        : parseType(symbolType);

    const arg: CatalogArg = {
      name: symbol.getName(),
      type: parsedType.typeName,
      required: property?.hasQuestionToken() === false,
    };

    // Seed inferred enum values from TS first, so doc overrides below can
    // intentionally win as the final authority on `type` and `values`.
    if (parsedType.values !== undefined && parsedType.values.length > 0) {
      arg.values = parsedType.values;
    }

    if (property !== undefined) {
      const description = property.getJsDocs()[0]?.getDescription().trim();
      const defaultValue = getDocTag(property, 'default');
      const typeOverride = getDocTag(property, 'type');
      const valuesOverride = getDocTag(property, 'values');
      const notes = getDocNotes(property);
      const links = getDocLinks(property);

      if (description !== undefined && description.length > 0) {
        arg.description = normalizeApiText(description);
      }

      if (defaultValue !== undefined && defaultValue.length > 0) {
        arg.default = normalizeDefaultValue(defaultValue);
      }

      // Precedence policy: @type overrides inferred type label and clears any
      // previously inferred `values` so a stale enum list cannot leak through.
      if (typeOverride !== undefined && typeOverride.length > 0) {
        arg.type = typeOverride;
        arg.values = undefined;
      }

      // Precedence policy: @values is the final authority for the values list,
      // so it must be applied last and not be overwritten by inferred values.
      if (valuesOverride !== undefined && valuesOverride.length > 0) {
        arg.values = parseValuesTag(valuesOverride);
      }

      if (notes.length > 0) {
        arg.notes = notes;
      }

      if (links.length > 0) {
        arg.links = links;
      }
    }

    args.push(arg);
  }

  return args;
}
