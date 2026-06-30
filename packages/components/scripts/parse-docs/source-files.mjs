/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { dirname, resolve } from 'node:path';

export function createSourceFileResolver({ project, entryFile }) {
  const componentsDirectoryPath = resolve(
    entryFile.getDirectoryPath(),
    'components'
  );

  function resolveComponentSourceFile(moduleSpecifier) {
    if (!moduleSpecifier.endsWith('.gts')) {
      return null;
    }

    const componentFilePath = resolve(
      entryFile.getDirectoryPath(),
      moduleSpecifier
    );

    return project.addSourceFileAtPathIfExists(componentFilePath);
  }

  function resolveFamilyTypesSourceFile(moduleSpecifier) {
    const componentSourceFile = resolveComponentSourceFile(moduleSpecifier);

    if (!componentSourceFile) {
      return null;
    }

    let currentDirectory = dirname(componentSourceFile.getFilePath());

    while (currentDirectory.startsWith(componentsDirectoryPath)) {
      const typesFilePath = resolve(currentDirectory, 'types.ts');
      const typesFile = project.addSourceFileAtPathIfExists(typesFilePath);

      if (typesFile) {
        return typesFile;
      }

      if (currentDirectory === componentsDirectoryPath) {
        break;
      }

      currentDirectory = dirname(currentDirectory);
    }

    return null;
  }

  function resolveImportSourceFile(fromSourceFile, moduleSpecifier) {
    const resolvedByTs = fromSourceFile
      .getImportDeclarations()
      .find(
        (importDecl) => importDecl.getModuleSpecifierValue() === moduleSpecifier
      )
      ?.getModuleSpecifierSourceFile();

    if (resolvedByTs) {
      return resolvedByTs;
    }

    return null;
  }

  return {
    resolveComponentSourceFile,
    resolveFamilyTypesSourceFile,
    resolveImportSourceFile,
  };
}
