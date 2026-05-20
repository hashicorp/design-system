import type { InterfaceDeclaration } from 'ts-morph';

import { normalizeApiText } from './normalize-api-text.ts';
import { buildApi } from './build-api.ts';
import { getComponentDesignMetadata } from './design-metadata.ts';
import { getComponentExports } from './component-exports.ts';
import { getInterfaceDocTag } from './metadata/doc-tags.ts';
import { parseArgs } from './parsers/parse-args.ts';
import { parseBlocks } from './parsers/parse-blocks.ts';
import { parseContextualProperties } from './parsers/parse-contextual.ts';
import {
  getInterfaceForComponent,
  hasSplattributesForComponent,
} from './signature-source.ts';
import { toTitleCase } from './shared/string-utils.ts';
import { validateCatalogComponent } from './validate-catalog-component.ts';

import type { Catalog, CatalogComponent } from './types.ts';

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

function generateCatalogComponent(
  exportName: string,
  componentPath: string
): CatalogComponent {
  const interfaceDecl: InterfaceDeclaration | undefined = getInterfaceForComponent(
    exportName,
    componentPath
  );

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
    summary: normalizeApiText(componentDescription),
    design: getComponentDesignMetadata(componentPath),
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
    generatedAt: new Date().toISOString(),
    components,
  };
}
