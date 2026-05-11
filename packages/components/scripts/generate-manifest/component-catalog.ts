import {
  Node,
  type InterfaceDeclaration,
  type PropertySignature,
  type Symbol as MorphSymbol,
  type Type,
} from 'ts-morph';

import { getComponentExports } from './component-exports.ts';
import {
  getInterfaceForComponent,
  getInterfaceForYieldedComponent,
  hasSplattributesForComponent,
  hasSplattributesForYieldedComponent,
} from './signature-source.ts';
import { parseType } from './types-parser.ts';
import { normalizeDefaultValue, toTitleCase } from './utils.ts';

import type {
  Catalog,
  CatalogApiLink,
  CatalogApi,
  CatalogApiNote,
  CatalogApiProperty,
  CatalogApiSection,
  CatalogArg,
  CatalogBlock,
  CatalogComponent,
} from './types.ts';

function getDocTag(
  prop: PropertySignature,
  tagName: string
): string | undefined {
  const docs = prop.getJsDocs()[0];
  if (docs === undefined) {
    return undefined;
  }

  const tag = docs.getTags().find((entry) => entry.getTagName() === tagName);
  const comment = tag?.getCommentText()?.trim();

  if (comment !== undefined && comment.length > 0) {
    return comment;
  }

  return undefined;
}

function parseValuesTag(valuesTag: string): string[] {
  return valuesTag
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

function getDocNotes(prop: PropertySignature): CatalogApiNote[] {
  const docs = prop.getJsDocs()[0];

  if (docs === undefined) {
    return [];
  }

  const tagToKindMap: Record<string, CatalogApiNote['kind']> = {
    note: 'note',
    important: 'important',
    warning: 'warning',
  };

  const notes: CatalogApiNote[] = [];

  docs.getTags().forEach((tag) => {
    const kind = tagToKindMap[tag.getTagName()];

    if (kind === undefined) {
      return;
    }

    const text = tag.getCommentText()?.trim();
    if (text === undefined || text.length === 0) {
      return;
    }

    notes.push({ kind, text });
  });

  return notes;
}

function parseDocLinkTagText(tagText: string): CatalogApiLink | undefined {
  const text = tagText.trim();
  if (text.length === 0) {
    return undefined;
  }

  const parts = text.split(/\s+/u);
  const href = parts[0];

  if (href === undefined || href.length === 0) {
    return undefined;
  }

  const label = text.slice(href.length).trim();

  return {
    href,
    ...(label.length > 0 ? { label } : {}),
  };
}

function getDocLinks(prop: PropertySignature): CatalogApiLink[] {
  const docs = prop.getJsDocs()[0];

  if (docs === undefined) {
    return [];
  }

  const links: CatalogApiLink[] = [];

  docs.getTags().forEach((tag) => {
    if (tag.getTagName() !== 'link') {
      return;
    }

    const link = parseDocLinkTagText(tag.getCommentText() ?? '');
    if (link !== undefined) {
      links.push(link);
    }
  });

  return links;
}

function getInterfaceDocTag(
  taggableNode: InterfaceDeclaration,
  tagName: string
): string | undefined {
  const docs = taggableNode.getJsDocs()[0];

  if (docs === undefined) {
    return undefined;
  }

  const tag = docs.getTags().find((entry) => entry.getTagName() === tagName);
  const comment = tag?.getCommentText()?.trim();

  if (comment !== undefined && comment.length > 0) {
    return comment;
  }

  return undefined;
}

function getPropertySignatureFromSymbol(
  symbol: MorphSymbol
): PropertySignature | undefined {
  const declarations = symbol.getDeclarations();

  for (const declaration of declarations) {
    if (Node.isPropertySignature(declaration)) {
      return declaration;
    }
  }

  const declaration = symbol.getValueDeclaration();
  if (
    declaration !== undefined &&
    Node.isPropertySignature(declaration)
  ) {
    return declaration;
  }

  return undefined;
}

function isIconNameType(typeText: string): boolean {
  const iconNameTypePatterns = [
    /HdsIconSignature\[['"]Args['"]\]\[['"]name['"]\]/u,
    /\[['"]Args['"]\]\[['"]icon['"]\]/u,
    /(^|[^A-Za-z0-9_])IconName($|[^A-Za-z0-9_])/u,
  ];

  return iconNameTypePatterns.some((pattern) => pattern.test(typeText));
}

function argsToApiProperties(args: CatalogArg[]): CatalogApiProperty[] {
  return args.map((arg) => {
    return {
      name: arg.name,
      type: arg.type,
      required: arg.required,
      default: arg.default,
      values: arg.values,
      description: arg.description,
      notes: arg.notes,
      links: arg.links,
    };
  });
}

function argsToApiSection(args: CatalogArg[]): CatalogApiSection {
  return {
    title: 'Arguments',
    properties: argsToApiProperties(args),
  };
}

function getSplattributesApiProperty(): CatalogApiProperty {
  return {
    name: '...attributes',
    description:
      'This component supports use of [`...attributes`](https://guides.emberjs.com/release/in-depth-topics/patterns-for-components/#toc_attribute-ordering).',
  };
}

function blocksToApiSection(blocks: CatalogBlock[]): CatalogApiSection {
  const properties: CatalogApiProperty[] = blocks.map((block) => {
    return {
      name: block.name,
      type: 'block',
      description: block.description,
    };
  });

  return {
    title: 'Blocks',
    properties,
  };
}

function contextualToApiSection(
  contextualProperties: CatalogApiProperty[]
): CatalogApiSection {
  return {
    title: 'Contextual components',
    properties: contextualProperties,
  };
}

function getComponentAlias(componentPath: string): string {
  const tokens = componentPath
    .split(/[/-]/u)
    .filter((token) => token.length > 0);

  const alias = tokens
    .map((token) => token.charAt(0).toUpperCase())
    .join('');

  if (alias.length > 0) {
    return alias;
  }

  return 'C';
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

  const yieldedProperties = argsToApiProperties(yieldedArgs);

  const yieldedBlocks = parseBlocks(yieldedInterface);
  if (yieldedBlocks.some((block) => block.name === 'default')) {
    yieldedProperties.push({
      name: 'yield',
      description:
        'It is possible to yield generic content through the default block when needed.',
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

function parseContextualProperties(
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
  const getContextualElementType = (
    blockType: Type
  ): Type | undefined => {
    const tupleElements = blockType.getTupleElements();
    if (tupleElements[0] !== undefined) {
      return tupleElements[0];
    }

    for (const unionType of blockType.getUnionTypes()) {
      const unionTupleElements = unionType.getTupleElements();
      if (unionTupleElements[0] !== undefined) {
        return unionTupleElements[0];
      }
    }

    return undefined;
  };

  const contextualElementType = getContextualElementType(defaultBlockType);
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
        contextualProperty.description = description;
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

function parseArgs(interfaceDecl: InterfaceDeclaration): CatalogArg[] {
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

    if (property !== undefined) {
      const description = property.getJsDocs()[0]?.getDescription().trim();
      const defaultValue = getDocTag(property, 'default');
      const typeOverride = getDocTag(property, 'type');
      const valuesOverride = getDocTag(property, 'values');
      const notes = getDocNotes(property);
      const links = getDocLinks(property);

      if (description !== undefined && description.length > 0) {
        arg.description = description;
      }

      if (defaultValue !== undefined && defaultValue.length > 0) {
        arg.default = normalizeDefaultValue(defaultValue);
      }

      if (typeOverride !== undefined && typeOverride.length > 0) {
        arg.type = typeOverride;
        arg.values = undefined;
      }

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

    if (parsedType.values !== undefined && parsedType.values.length > 0) {
      arg.values = parsedType.values;
    }

    args.push(arg);
  }

  return args;
}

function parseBlocks(interfaceDecl: InterfaceDeclaration): CatalogBlock[] {
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
        block.description = description;
      }
    }

    blocks.push(block);
  }

  return blocks;
}

function buildApi(
  args: CatalogArg[],
  blocks: CatalogBlock[],
  contextualProperties: CatalogApiProperty[],
  hasSplattributes: boolean
): CatalogApi {
  const sections: CatalogApiSection[] = [];

  if (args.length > 0) {
    const argsSection = argsToApiSection(args);

    if (hasSplattributes === true) {
      argsSection.properties.push(getSplattributesApiProperty());
    }

    sections.push(argsSection);
  }

  if (blocks.length > 0) {
    sections.push(blocksToApiSection(blocks));
  }

  if (contextualProperties.length > 0) {
    sections.push(contextualToApiSection(contextualProperties));
  }

  return {
    sections,
  };
}

function validateCatalogComponent(component: CatalogComponent): void {
  if (component.summary.length === 0) {
    throw new Error(
      `Cannot generate manifest for "${component.slug}" because summary is empty.`
    );
  }

  if (component.api.sections.length === 0) {
    throw new Error(
      `Cannot generate manifest for "${component.slug}" because no API sections were generated.`
    );
  }

  component.api.sections.forEach((section) => {
    if (section.properties.length === 0) {
      throw new Error(
        `Cannot generate manifest for "${component.slug}" because section "${section.title}" has no properties.`
      );
    }
  });
}

function generateCatalogComponent(
  exportName: string,
  componentPath: string
): CatalogComponent {
  const interfaceDecl = getInterfaceForComponent(exportName, componentPath);

  if (interfaceDecl === undefined) {
    throw new Error(
      `Cannot generate manifest for "${componentPath}" because the signature interface was not found.`
    );
  }

  const componentDescription = getInterfaceDocTag(
    interfaceDecl,
    'componentDescription'
  );

  if (componentDescription === undefined) {
    throw new Error(
      `Cannot generate manifest for "${componentPath}" because @componentDescription is missing on ${exportName}Signature.`
    );
  }

  const args = parseArgs(interfaceDecl);
  const blocks = parseBlocks(interfaceDecl);
  const componentAlias = getComponentAlias(componentPath);
  const contextualProperties = parseContextualProperties(
    interfaceDecl,
    componentAlias,
    componentPath
  );
  const hasSplattributes = hasSplattributesForComponent(componentPath);

  const component: CatalogComponent = {
    name: toTitleCase(componentPath.split('/').at(-1) ?? componentPath),
    slug: componentPath,
    summary: componentDescription,
    api: buildApi(args, blocks, contextualProperties, hasSplattributes),
  };

  if (args.length > 0) {
    component.args = args;
  }

  if (blocks.length > 0) {
    component.blocks = blocks;
  }

  validateCatalogComponent(component);

  return component;
}

export function generateCatalog(): Catalog {
  const components = getComponentExports()
    .map(({ exportName, componentPath }) =>
      generateCatalogComponent(exportName, componentPath)
    )
    .sort((left, right) => left.name.localeCompare(right.name));

  return {
    version: '2',
    generatedAt: new Date().toISOString(),
    components,
  };
}
