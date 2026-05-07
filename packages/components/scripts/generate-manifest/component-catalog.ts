import {
  Node,
  type InterfaceDeclaration,
  type PropertySignature,
  type Symbol as MorphSymbol,
} from 'ts-morph';

import { getComponentExports } from './component-exports.ts';
import { getInterfaceForComponent } from './signature-source.ts';
import { parseType } from './types-parser.ts';
import { normalizeDefaultValue, toTitleCase } from './utils.ts';

import type {
  Catalog,
  CatalogApi,
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

function argsToApiSection(args: CatalogArg[]): CatalogApiSection {
  const properties: CatalogApiProperty[] = args.map((arg) => {
    return {
      name: arg.name,
      type: arg.type,
      required: arg.required,
      default: arg.default,
      values: arg.values,
      description: arg.description,
    };
  });

  return {
    title: 'Arguments',
    properties,
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

function parseArgs(interfaceDecl: InterfaceDeclaration): CatalogArg[] {
  const argsProperty = interfaceDecl.getProperty('Args');

  if (argsProperty === undefined) {
    return [];
  }

  const args: CatalogArg[] = [];

  const argsType = argsProperty.getType();
  const symbols = argsType.getProperties();
  const argSymbols = symbols.length > 0 ? symbols : argsType.getApparentProperties();

  for (const symbol of argSymbols) {
    const property = getPropertySignatureFromSymbol(symbol);
    const typeNode = property ?? argsProperty;
    const parsedType = parseType(symbol.getTypeAtLocation(typeNode));

    const arg: CatalogArg = {
      name: symbol.getName(),
      type: parsedType.typeName,
      required: property?.hasQuestionToken() === false,
    };

    if (property !== undefined) {
      const description = property.getJsDocs()[0]?.getDescription().trim();
      const defaultValue = getDocTag(property, 'default');

      if (description !== undefined && description.length > 0) {
        arg.description = description;
      }

      if (defaultValue !== undefined && defaultValue.length > 0) {
        arg.default = normalizeDefaultValue(defaultValue);
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
  blocks: CatalogBlock[]
): CatalogApi {
  const sections: CatalogApiSection[] = [];

  if (args.length > 0) {
    sections.push(argsToApiSection(args));
  }

  if (blocks.length > 0) {
    sections.push(blocksToApiSection(blocks));
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

  const component: CatalogComponent = {
    name: toTitleCase(componentPath.split('/').at(-1) ?? componentPath),
    slug: componentPath,
    summary: componentDescription,
    api: buildApi(args, blocks),
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
