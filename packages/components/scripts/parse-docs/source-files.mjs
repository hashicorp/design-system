/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { dirname, resolve } from 'node:path';

export function createSourceFileResolver({ project, entryFile }) {
  const componentsDirectoryPath = resolve(entryFile.getDirectoryPath(), 'components');

  function resolveComponentSourceFile(moduleSpecifier) {
    return resolveImportSourceFile(entryFile, moduleSpecifier);
  }

  function resolveFamilyTypesSourceFiles(moduleSpecifier) {
    const componentSourceFile = resolveComponentSourceFile(moduleSpecifier);

    if (!componentSourceFile) {
      return [];
    }

    const familyTypesFiles = [];
    let currentDirectory = dirname(componentSourceFile.getFilePath());

    while (currentDirectory.startsWith(componentsDirectoryPath)) {
      const typesFilePath = resolve(currentDirectory, 'types.ts');
      const typesFile = project.addSourceFileAtPathIfExists(typesFilePath);

      if (typesFile) {
        familyTypesFiles.push(typesFile);
      }

      if (currentDirectory === componentsDirectoryPath) {
        break;
      }

      currentDirectory = dirname(currentDirectory);
    }

    return familyTypesFiles;
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

    if (!moduleSpecifier.startsWith('.')) {
      // non-relative imports are intentionally skipped to avoid crawling external packages
      return null;
    }

    const fromDir = dirname(fromSourceFile.getFilePath());
    const basePath = resolve(fromDir, moduleSpecifier);
    const candidates = [
      basePath,
      `${basePath}.ts`,
      `${basePath}.gts`,
      `${basePath}.d.ts`,
      resolve(basePath, 'index.ts'),
      resolve(basePath, 'index.gts'),
      resolve(basePath, 'index.d.ts'),
    ];

    for (const candidatePath of candidates) {
      const sourceFile = project.addSourceFileAtPathIfExists(candidatePath);

      if (sourceFile) {
        return sourceFile;
      }
    }

    return null;
  }

  return {
    resolveComponentSourceFile,
    resolveFamilyTypesSourceFiles,
    resolveImportSourceFile,
  };
}
