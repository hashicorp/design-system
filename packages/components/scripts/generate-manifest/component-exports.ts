import { Project } from 'ts-morph';
import { componentsExportsPath } from './paths.ts';

import type { ComponentExport } from './types.ts';

export function getComponentExports(): ComponentExport[] {
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
