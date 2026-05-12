import { Node, type InterfaceDeclaration, type Symbol as MorphSymbol } from 'ts-morph';

import { argsToApiProperties, getSplattributesApiProperty } from './build-api.ts';
import { getDocLinks, getDocNotes, getDocTag, parseValuesTag } from './doc-tags.ts';
import {
  getInterfaceForYieldedComponent,
  hasSplattributesForYieldedComponent,
} from './signature-source.ts';
import { parseType } from './types-parser.ts';
import { getFirstTupleElementType, getPropertySignatureFromSymbol } from './ts-morph-helpers.ts';
import { normalizeDefaultValue } from './utils.ts';
import { normalizeApiText } from './api-text.ts';
import { parseArgs } from './parse-args.ts';
import { parseBlocks } from './parse-blocks.ts';

import type { CatalogApiProperty } from './types.ts';

function isIconNameType(typeText: string): boolean {
  const iconNameTypePatterns = [
    /HdsIconSignature\[['"]Args['"]\]\[['"]name['"]\]/u,
    /\[['"]Args['"]\]\[['"]icon['"]\]/u,
    /(^|[^A-Za-z0-9_])IconName($|[^A-Za-z0-9_])/u,
  ];

  return iconNameTypePatterns.some((pattern) => pattern.test(typeText));
}

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

function getImportSpecifierForIdentifier(
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
      .find((namedSpecifier) => namedSpecifier.getName() === identifierName);

    if (namedImport !== undefined) {
      return importDeclaration.getModuleSpecifierValue();
    }
  }

  return undefined;
}

function parseYieldedSourceText(typeText: string): {
  className: string;
  boundArgs: Set<string>;
} | undefined {
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

function getBlockAlias(blockName: string): string {
  const first = blockName.trim().charAt(0).toUpperCase();
  return first.length > 0 ? first : 'B';
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function normalizeNamedBlockDescription(
  blockName: string,
  description: string
): string {
  const escapedBlockName = escapeRegExp(blockName);
  const yieldSentencePattern = new RegExp(
    `\\s*Elements passed as children are yielded as inner content of the ["“]${escapedBlockName}["”] block\\.?`,
    'u'
  );

  return description.replace(yieldSentencePattern, '').trim();
}

function parseYieldedNamedBlockProperties(
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

    const blockDescription = blockSignature.getJsDocs()[0]?.getDescription().trim();
    if (blockDescription !== undefined && blockDescription.length > 0) {
      const normalizedDescription = normalizeNamedBlockDescription(
        blockName,
        blockDescription
      );

      if (normalizedDescription.length > 0) {
        namedBlockProperty.description = normalizeApiText(normalizedDescription);
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
        const parsedType =
          isIconNameType(typeTextForIconCheck) === true
            ? {
                typeName: 'enum',
                values: ['__icons__'],
              }
            : parseType(contextType);

        const contextualProperty: CatalogApiProperty = {
          name: `[${blockAlias}].${contextSymbol.getName()}`,
          type: parsedType.typeName,
        };

        if (parsedType.values !== undefined && parsedType.values.length > 0) {
          contextualProperty.values = parsedType.values;
        }

        if (contextSignature !== undefined) {
          const contextDescription = contextSignature
            .getJsDocs()[0]
            ?.getDescription()
            .trim();
          const contextDefaultValue = getDocTag(contextSignature, 'default');
          const contextTypeOverride = getDocTag(contextSignature, 'type');
          const contextValuesOverride = getDocTag(contextSignature, 'values');
          const contextNotes = getDocNotes(contextSignature);
          const contextLinks = getDocLinks(contextSignature);

          if (contextDescription !== undefined && contextDescription.length > 0) {
            contextualProperty.description = normalizeApiText(contextDescription);
          }

          if (
            contextDefaultValue !== undefined &&
            contextDefaultValue.length > 0
          ) {
            contextualProperty.default = normalizeDefaultValue(contextDefaultValue);
          }

          if (contextTypeOverride !== undefined && contextTypeOverride.length > 0) {
            contextualProperty.type = contextTypeOverride;
            contextualProperty.values = undefined;
          }

          if (
            contextValuesOverride !== undefined &&
            contextValuesOverride.length > 0
          ) {
            contextualProperty.values = parseValuesTag(contextValuesOverride);
          }

          if (contextNotes.length > 0) {
            contextualProperty.notes = contextNotes;
          }

          if (contextLinks.length > 0) {
            contextualProperty.links = contextLinks;
          }
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
    (hasSplattributes === undefined && yieldedInterface.getProperty('Element') !== undefined)
  ) {
    yieldedProperties.push(getSplattributesApiProperty());
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

  const defaultBlockSignature = getPropertySignatureFromSymbol(defaultBlockSymbol);
  if (defaultBlockSignature === undefined) {
    return [];
  }

  const defaultBlockType = defaultBlockSymbol.getTypeAtLocation(defaultBlockSignature);
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
      const description = contextDeclaration.getJsDocs()[0]?.getDescription().trim();

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
