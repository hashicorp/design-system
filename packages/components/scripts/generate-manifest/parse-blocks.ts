import type { InterfaceDeclaration } from 'ts-morph';

import { normalizeApiText } from './api-text.ts';
import { getPropertySignatureFromSymbol } from './ts-morph-helpers.ts';

import type { CatalogBlock } from './types.ts';

export function parseBlocks(interfaceDecl: InterfaceDeclaration): CatalogBlock[] {
  const blocksProperty = interfaceDecl.getProperty('Blocks');

  if (blocksProperty === undefined) {
    return [];
  }

  const blocks: CatalogBlock[] = [];

  const blocksType = blocksProperty.getType();
  const symbols = blocksType.getProperties();
  const blockSymbols =
    symbols.length > 0 ? symbols : blocksType.getApparentProperties();

  for (const symbol of blockSymbols) {
    const property = getPropertySignatureFromSymbol(symbol);

    const block: CatalogBlock = {
      name: symbol.getName(),
    };

    if (property !== undefined) {
      const description = property.getJsDocs()[0]?.getDescription().trim();

      if (description !== undefined && description.length > 0) {
        block.description = normalizeApiText(description);
      }
    }

    blocks.push(block);
  }

  return blocks;
}
