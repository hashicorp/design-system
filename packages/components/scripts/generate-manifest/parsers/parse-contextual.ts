import {
  Node,
  type InterfaceDeclaration,
  type Symbol as MorphSymbol,
} from 'ts-morph';

import {
  SPLATTRIBUTES_API_PROPERTY,
  argsToApiProperties,
} from '../build-api.ts';
import { getDocLinks, getDocNotes } from '../metadata/doc-tags.ts';
import {
  getInterfaceForYieldedComponent,
  hasSplattributesForYieldedComponent,
} from '../signature-source.ts';
import { parseType } from './parse-types.ts';
import {
  getFirstTupleElementType,
  getPropertySignatureFromSymbol,
} from '../shared/ts-morph-helpers.ts';
import { normalizeApiText } from '../normalize-api-text.ts';
import { applyPropertyDocMetadata } from '../metadata/apply-property-doc-metadata.ts';
import { ICON_ENUM_PARSED_TYPE, isIconNameType } from '../metadata/type-overrides.ts';
import {
  getImportSpecifierForIdentifier,
  parseYieldedSourceText,
} from '../shared/contextual-helpers.ts';
import { parseArgs } from './parse-args.ts';
import { parseBlocks } from './parse-blocks.ts';

import type { CatalogApiProperty } from '../types.ts';

function getContextualTypeLabel(
  propertyName: string,
  typeText: string,
  hasCallSignatures: boolean
): string {
  if (hasCallSignatures === true) {
    return 'yielded function';
  }

  if (
    propertyName.length > 0 &&
    propertyName.charAt(0) === propertyName.charAt(0).toUpperCase()
  ) {
    return 'yielded component';
  }

  if (typeText.includes('WithBoundArgs<')) {
    return 'yielded component';
  }

  if (typeText.startsWith('typeof ')) {
    return 'yielded component';
  }

  return 'yielded tracked property';
}

function getRawContextTypeText(
  contextDeclaration: ReturnType<MorphSymbol['getValueDeclaration']>,
  fallbackTypeText: string
): string {
  if (
    contextDeclaration !== undefined &&
    Node.isPropertySignature(contextDeclaration)
  ) {
    const declarationTypeText = contextDeclaration.getTypeNode()?.getText();

    if (declarationTypeText !== undefined && declarationTypeText.length > 0) {
      return declarationTypeText;
    }
  }

  return fallbackTypeText;
}

function getBlockAlias(blockName: string): string {
  const first = blockName.trim().charAt(0).toUpperCase();
  return first.length > 0 ? first : 'B';
}

const NAMED_BLOCK_YIELD_SENTENCE_PREFIX =
  'Elements passed as children are yielded as inner content of the ';
const NAMED_BLOCK_YIELD_SENTENCE_SUFFIX = ' block';

// Open/close quote pairs we expect around the block name in authored docs:
// straight ASCII double quotes and Unicode "smart" curly quotes.
const NAMED_BLOCK_QUOTE_PAIRS: ReadonlyArray<[string, string]> = [
  ['"', '"'],
  ['\u201C', '\u201D'],
];

function isWhitespaceChar(value: string): boolean {
  return value === ' ' || value === '\t' || value === '\n' || value === '\r';
}

/**
 * Remove the boilerplate "Elements passed as children are yielded as inner
 * content of the \"<blockName>\" block." sentence from a block description
 * if present, returning the remaining trimmed text.
 *
 * Uses plain string scanning rather than a dynamically constructed regex so
 * the block name (which is untrusted authoring input) cannot influence
 * pattern semantics.
 */
function normalizeNamedBlockDescription(
  blockName: string,
  description: string
): string {
  for (const [openQuote, closeQuote] of NAMED_BLOCK_QUOTE_PAIRS) {
    const sentenceCore =
      NAMED_BLOCK_YIELD_SENTENCE_PREFIX +
      openQuote +
      blockName +
      closeQuote +
      NAMED_BLOCK_YIELD_SENTENCE_SUFFIX;

    for (const terminator of ['.', '']) {
      const sentence = sentenceCore + terminator;
      const index = description.indexOf(sentence);

      if (index === -1) {
        continue;
      }

      // Guard against matching a substring embedded in a larger word: ensure
      // the match is bounded by start/end-of-string, whitespace, or (for the
      // trailing edge) a sentence-ending period.
      const charBefore = index === 0 ? '' : description.charAt(index - 1);
      const charAfter = description.charAt(index + sentence.length);
      const boundedBefore = charBefore === '' || isWhitespaceChar(charBefore);
      const boundedAfter =
        charAfter === '' || isWhitespaceChar(charAfter) || charAfter === '.';

      if (boundedBefore === false || boundedAfter === false) {
        continue;
      }

      const before = description.slice(0, index);
      const after = description.slice(index + sentence.length);

      // Trim trailing whitespace from `before` without a regex.
      let beforeEnd = before.length;
      while (beforeEnd > 0 && isWhitespaceChar(before.charAt(beforeEnd - 1))) {
        beforeEnd -= 1;
      }

      return (before.slice(0, beforeEnd) + after).trim();
    }
  }

  return description.trim();
}

export function parseYieldedNamedBlockProperties(
  yieldedInterface: InterfaceDeclaration
): CatalogApiProperty[] {
  const blocksProperty = yieldedInterface.getProperty('Blocks');

  if (blocksProperty === undefined) {
    return [];
  }

  const namedBlockProperties: CatalogApiProperty[] = [];
  const blocksType = blocksProperty.getType();
  const blockSymbols = blocksType.getProperties();

  blockSymbols.forEach((blockSymbol) => {
    const blockName = blockSymbol.getName();

    if (blockName === 'default') {
      return;
    }

    const blockSignature = getPropertySignatureFromSymbol(blockSymbol);
    if (blockSignature === undefined) {
      return;
    }

    const namedBlockProperty: CatalogApiProperty = {
      name: `<:${blockName}>`,
      type: 'named block',
      properties: [
        {
          name: 'yield',
          description: `Elements passed as children are yielded as inner content of the "${blockName}" block.`,
        },
      ],
    };

    const blockDescription = blockSignature
      .getJsDocs()[0]
      ?.getDescription()
      .trim();
    if (blockDescription !== undefined && blockDescription.length > 0) {
      const normalizedDescription = normalizeNamedBlockDescription(
        blockName,
        blockDescription
      );

      if (normalizedDescription.length > 0) {
        namedBlockProperty.description = normalizeApiText(
          normalizedDescription
        );
      }
    }

    const blockType = blockSymbol.getTypeAtLocation(blockSignature);
    const contextualElementType = getFirstTupleElementType(blockType);
    const blockAlias = getBlockAlias(blockName);

    if (contextualElementType !== undefined) {
      contextualElementType.getProperties().forEach((contextSymbol) => {
        const contextDeclaration = contextSymbol.getValueDeclaration();
        const contextType =
          contextDeclaration === undefined
            ? contextSymbol.getTypeAtLocation(blockSignature)
            : contextSymbol.getTypeAtLocation(contextDeclaration);

        const contextSignature = getPropertySignatureFromSymbol(contextSymbol);
        const rawTypeText = contextSignature?.getTypeNode()?.getText();
        const typeTextForIconCheck = rawTypeText ?? contextType.getText();
        const parsedType = isIconNameType(typeTextForIconCheck)
          ? ICON_ENUM_PARSED_TYPE
          : parseType(contextType);

        const contextualProperty: CatalogApiProperty = {
          name: `[${blockAlias}].${contextSymbol.getName()}`,
          type: parsedType.typeName,
        };

        // Seed inferred enum values first so doc overrides applied by
        // `applyPropertyDocMetadata` can intentionally win as the final
        // authority on `type` and `values`.
        if (parsedType.values !== undefined && parsedType.values.length > 0) {
          contextualProperty.values = [...parsedType.values];
        }

        if (contextSignature !== undefined) {
          applyPropertyDocMetadata(contextSignature, contextualProperty);
        }

        namedBlockProperty.properties?.push(contextualProperty);
      });
    }

    namedBlockProperties.push(namedBlockProperty);
  });

  return namedBlockProperties;
}

function parseYieldedComponentProperties(
  interfaceDecl: InterfaceDeclaration,
  parentComponentPath: string,
  contextualTypeText: string
): CatalogApiProperty[] {
  const yieldedSource = parseYieldedSourceText(contextualTypeText);

  if (yieldedSource === undefined) {
    return [];
  }

  const importSpecifier = getImportSpecifierForIdentifier(
    interfaceDecl,
    yieldedSource.className
  );

  if (importSpecifier === undefined) {
    return [];
  }

  const yieldedInterface = getInterfaceForYieldedComponent(
    parentComponentPath,
    importSpecifier,
    yieldedSource.className
  );

  if (yieldedInterface === undefined) {
    return [];
  }

  const yieldedArgs = parseArgs(yieldedInterface).filter((arg) => {
    return yieldedSource.boundArgs.has(arg.name) === false;
  });

  const yieldedProperties = [
    ...parseYieldedNamedBlockProperties(yieldedInterface),
    ...argsToApiProperties(yieldedArgs),
  ];

  const yieldedBlocks = parseBlocks(yieldedInterface);
  if (yieldedBlocks.some((block) => block.name === 'default')) {
    yieldedProperties.push({
      name: 'yield',
      description: normalizeApiText(
        'It is possible to yield generic content through the default block when needed.'
      ),
    });
  }

  const hasSplattributes = hasSplattributesForYieldedComponent(
    parentComponentPath,
    importSpecifier
  );

  if (
    hasSplattributes === true ||
    (hasSplattributes === undefined &&
      yieldedInterface.getProperty('Element') !== undefined)
  ) {
    yieldedProperties.push(SPLATTRIBUTES_API_PROPERTY);
  }

  return yieldedProperties;
}

export function parseContextualProperties(
  interfaceDecl: InterfaceDeclaration,
  componentAlias: string,
  componentPath: string
): CatalogApiProperty[] {
  const blocksProperty = interfaceDecl.getProperty('Blocks');

  if (blocksProperty === undefined) {
    return [];
  }

  const defaultBlockSymbol = blocksProperty
    .getType()
    .getProperties()
    .find((symbol) => symbol.getName() === 'default');

  if (defaultBlockSymbol === undefined) {
    return [];
  }

  const defaultBlockSignature =
    getPropertySignatureFromSymbol(defaultBlockSymbol);

  if (defaultBlockSignature === undefined) {
    return [];
  }

  const defaultBlockType = defaultBlockSymbol.getTypeAtLocation(
    defaultBlockSignature
  );
  const contextualElementType = getFirstTupleElementType(defaultBlockType);

  if (contextualElementType === undefined) {
    return [];
  }

  const contextualProperties: CatalogApiProperty[] = [];

  contextualElementType.getProperties().forEach((contextSymbol) => {
    const contextDeclaration = contextSymbol.getValueDeclaration();
    const contextType =
      contextDeclaration === undefined
        ? contextSymbol.getTypeAtLocation(defaultBlockSignature)
        : contextSymbol.getTypeAtLocation(contextDeclaration);
    const typeText = contextType.getText();
    const rawTypeText = getRawContextTypeText(contextDeclaration, typeText);
    const typeLabel = getContextualTypeLabel(
      contextSymbol.getName(),
      rawTypeText,
      contextType.getCallSignatures().length > 0
    );

    const contextualProperty: CatalogApiProperty = {
      name: `[${componentAlias}].${contextSymbol.getName()}`,
      type: typeLabel,
    };

    if (typeLabel === 'yielded component') {
      const yieldedProperties = parseYieldedComponentProperties(
        interfaceDecl,
        componentPath,
        rawTypeText
      );

      if (yieldedProperties.length > 0) {
        contextualProperty.properties = yieldedProperties;
      }
    }

    if (
      contextDeclaration !== undefined &&
      Node.isPropertySignature(contextDeclaration)
    ) {
      const description = contextDeclaration
        .getJsDocs()[0]
        ?.getDescription()
        .trim();

      if (description !== undefined && description.length > 0) {
        contextualProperty.description = normalizeApiText(description);
      }

      const notes = getDocNotes(contextDeclaration);

      if (notes.length > 0) {
        contextualProperty.notes = notes;
      }

      const links = getDocLinks(contextDeclaration);

      if (links.length > 0) {
        contextualProperty.links = links;
      }
    }

    contextualProperties.push(contextualProperty);
  });

  return contextualProperties;
}
