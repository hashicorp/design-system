import { dirname, resolve } from 'node:path';

export function createSourceFileResolver({ project, entryFile }) {
  function resolveTypesSourceFile(moduleSpecifier) {
    const candidates = [];

    if (moduleSpecifier.endsWith('.types.ts')) {
      candidates.push(moduleSpecifier);
    } else if (moduleSpecifier.endsWith('.gts')) {
      candidates.push(moduleSpecifier.replace(/\.gts$/, '.types.ts'));
    } else if (moduleSpecifier.endsWith('.ts')) {
      candidates.push(moduleSpecifier.replace(/\.ts$/, '.types.ts'));
    }

    const dedupedCandidates = [...new Set(candidates)];

    for (const candidate of dedupedCandidates) {
      const candidatePath = resolve(entryFile.getDirectoryPath(), candidate);
      const candidateFile = project.addSourceFileAtPathIfExists(candidatePath);

      if (candidateFile) {
        return candidateFile;
      }
    }

    return null;
  }

  function resolveImportSourceFile(fromSourceFile, moduleSpecifier) {
    const resolvedByTs = fromSourceFile
      .getImportDeclarations()
      .find((importDecl) => importDecl.getModuleSpecifierValue() === moduleSpecifier)
      ?.getModuleSpecifierSourceFile();

    if (resolvedByTs) {
      return resolvedByTs;
    }

    if (!moduleSpecifier.startsWith('.')) {
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
    resolveTypesSourceFile,
    resolveImportSourceFile,
  };
}
