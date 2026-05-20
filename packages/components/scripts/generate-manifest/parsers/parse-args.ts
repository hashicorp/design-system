import type { InterfaceDeclaration } from 'ts-morph';

import { parseType } from './parse-types.ts';
import { applyPropertyDocMetadata } from '../metadata/apply-property-doc-metadata.ts';
import { ICON_ENUM_PARSED_TYPE, isIconNameType } from '../metadata/type-overrides.ts';
import { getPropertySignatureFromSymbol } from '../shared/ts-morph-helpers.ts';

import type { CatalogArg } from '../types.ts';

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

    const parsedType = isIconNameType(typeTextForIconCheck)
      ? ICON_ENUM_PARSED_TYPE
      : parseType(symbolType);

    const arg: CatalogArg = {
      name: symbol.getName(),
      type: parsedType.typeName,
      required: property?.hasQuestionToken() === false,
    };

    // Seed inferred enum values from TS first, so doc overrides applied by
    // `applyPropertyDocMetadata` can intentionally win as the final authority
    // on `type` and `values`.
    if (parsedType.values !== undefined && parsedType.values.length > 0) {
      arg.values = [...parsedType.values];
    }

    if (property !== undefined) {
      applyPropertyDocMetadata(property, arg);
    }

    args.push(arg);
  }

  return args;
}
