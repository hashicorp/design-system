import { Project } from 'ts-morph';

import { componentsExportsPath } from './paths.ts';

import type { ComponentExport } from './types.ts';

const DEFAULT_COMPONENT_SCOPE = ['accordion', 'button'];

const componentScope = process.env['HDS_MANIFEST_COMPONENTS'];

function isIncludedInScope(componentPath: string): boolean {
  const selectedComponents =
    componentScope === undefined || componentScope.trim().length === 0
      ? DEFAULT_COMPONENT_SCOPE
      : componentScope
          .split(',')
          .map((value) => value.trim())
          .filter((value) => value.length > 0);

  return selectedComponents.includes(componentPath);
}

export function getComponentExports(): ComponentExport[] {
  // Read the public component surface from components.ts rather than scanning
  // directories. This ensures we only include components intentionally exported
  // by the package.
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(componentsExportsPath);
  const exports: ComponentExport[] = [];

  for (const declaration of sourceFile.getExportDeclarations()) {
    const moduleSpecifier = declaration.getModuleSpecifierValue();
    if (moduleSpecifier === undefined) {
      continue;
    }

    if (moduleSpecifier.startsWith('./components/hds/') === false) {
      continue;
    }

    if (moduleSpecifier.endsWith('/index.gts') === false) {
      continue;
    }

    const componentPath = moduleSpecifier
      .replace('./components/hds/', '')
      .replace('/index.gts', '');

    if (isIncludedInScope(componentPath) === false) {
      continue;
    }

    for (const namedExport of declaration.getNamedExports()) {
      const localName = namedExport.getName();
      const exportName = namedExport.getAliasNode()?.getText();

      if (localName !== 'default') {
        continue;
      }

      if (exportName === undefined) {
        continue;
      }

      if (exportName.startsWith('Hds') === false) {
        continue;
      }

      exports.push({ exportName, componentPath });
    }
  }

  return exports;
}
