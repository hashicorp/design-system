import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { InterfaceDeclaration, Project } from 'ts-morph';

import { componentsSrcRoot, repoRoot } from './paths.ts';

const project = new Project();
project.addSourceFilesAtPaths(resolve(componentsSrcRoot, '**/*.ts'));
project.addSourceFilesAtPaths(
  resolve(repoRoot, 'packages/components/declarations/**/*.d.ts')
);

const signatureSourceCache = new Map<string, InterfaceDeclaration | null>();

function getInterfaceNameFromComponentClassName(
  componentClassName: string
): string | undefined {
  if (componentClassName.startsWith('Hds') === false) {
    return undefined;
  }

  return `${componentClassName}Signature`;
}

function getDeclarationPathCandidates(
  parentComponentPath: string,
  importSpecifier: string
): string[] {
  const normalizedImport = importSpecifier.replace(/\.(gts|ts)$/u, '');

  if (normalizedImport.startsWith('.')) {
    return [
      resolve(
        repoRoot,
        'packages/components/declarations/components/hds',
        parentComponentPath,
        `${normalizedImport}.d.ts`
      ),
      resolve(
        repoRoot,
        'packages/components/declarations/components/hds',
        parentComponentPath,
        normalizedImport,
        'index.d.ts'
      ),
    ];
  }

  return [
    resolve(
      repoRoot,
      'packages/components/declarations/components/hds',
      `${normalizedImport}.d.ts`
    ),
    resolve(
      repoRoot,
      'packages/components/declarations/components/hds',
      normalizedImport,
      'index.d.ts'
    ),
  ];
}

function getSourcePathCandidates(
  parentComponentPath: string,
  importSpecifier: string
): string[] {
  const normalizedImport = importSpecifier.replace(/\.(gts|ts)$/u, '');

  if (normalizedImport.startsWith('.')) {
    return [
      resolve(
        componentsSrcRoot,
        'components/hds',
        parentComponentPath,
        `${normalizedImport}.gts`
      ),
      resolve(
        componentsSrcRoot,
        'components/hds',
        parentComponentPath,
        normalizedImport,
        'index.gts'
      ),
    ];
  }

  return [
    resolve(
      componentsSrcRoot,
      'components/hds',
      `${normalizedImport}.gts`
    ),
    resolve(
      componentsSrcRoot,
      'components/hds',
      normalizedImport,
      'index.gts'
    ),
  ];
}

function getInterfaceFromGtsSource(
  sourcePath: string,
  interfaceName: string
): InterfaceDeclaration | undefined {
  if (existsSync(sourcePath) === false) {
    return undefined;
  }

  const sourceText = readFileSync(sourcePath, 'utf8');
  const classIndex = sourceText.indexOf('export default class');

  if (classIndex < 0) {
    return undefined;
  }

  const parseableSourceText = sourceText.slice(0, classIndex);
  const tsVirtualPath = sourcePath.replace(/\.gts$/u, '.generated.ts');

  const existingVirtualFile = project.getSourceFile(tsVirtualPath);
  if (existingVirtualFile) {
    existingVirtualFile.delete();
  }

  project.createSourceFile(tsVirtualPath, parseableSourceText, {
    overwrite: true,
  });

  const sourceFile = project.getSourceFile(tsVirtualPath);
  if (sourceFile === undefined) {
    return undefined;
  }

  return sourceFile.getInterface(interfaceName);
}

export function getInterfaceForYieldedComponent(
  parentComponentPath: string,
  importSpecifier: string,
  componentClassName: string
): InterfaceDeclaration | undefined {
  const interfaceName = getInterfaceNameFromComponentClassName(componentClassName);

  if (interfaceName === undefined) {
    return undefined;
  }

  const sourcePathCandidates = getSourcePathCandidates(
    parentComponentPath,
    importSpecifier
  );

  for (const sourcePath of sourcePathCandidates) {
    const sourceSignature = getInterfaceFromGtsSource(sourcePath, interfaceName);

    if (sourceSignature !== undefined) {
      return sourceSignature;
    }
  }

  const declarationCandidates = getDeclarationPathCandidates(
    parentComponentPath,
    importSpecifier
  );

  for (const declarationSourcePath of declarationCandidates) {
    const declarationSource = project.getSourceFile(declarationSourcePath);
    if (declarationSource === undefined) {
      continue;
    }

    const declarationSignature = declarationSource.getInterface(interfaceName);

    if (declarationSignature !== undefined) {
      return declarationSignature;
    }
  }

  return undefined;
}

export function getInterfaceForComponent(
  exportName: string,
  componentPath: string
): InterfaceDeclaration | undefined {
  const cacheKey = `${exportName}:${componentPath}`;
  const cached = signatureSourceCache.get(cacheKey);

  if (cached !== undefined) {
    if (cached === null) {
      return undefined;
    }

    return cached;
  }

  const interfaceName = `${exportName}Signature`;
  const declarationSourcePath = resolve(
    repoRoot,
    'packages/components/declarations/components/hds',
    componentPath,
    'index.d.ts'
  );

  const declarationSource = project.getSourceFile(declarationSourcePath);
  if (declarationSource !== undefined) {
    const declarationSignature = declarationSource.getInterface(interfaceName);
    signatureSourceCache.set(cacheKey, declarationSignature ?? null);

    if (declarationSignature !== undefined) {
      return declarationSignature;
    }
  }

  const gtsSourcePath = resolve(
    componentsSrcRoot,
    'components/hds',
    componentPath,
    'index.gts'
  );
  const tsVirtualPath = gtsSourcePath.replace(/\.gts$/u, '.generated.ts');
  const sourceText = readFileSync(gtsSourcePath, 'utf8');
  const classIndex = sourceText.indexOf('export default class');

  if (classIndex < 0) {
    signatureSourceCache.set(cacheKey, null);
    return undefined;
  }

  const parseableSourceText = sourceText.slice(0, classIndex);

  const existingVirtualFile = project.getSourceFile(tsVirtualPath);
  if (existingVirtualFile) {
    existingVirtualFile.delete();
  }

  project.createSourceFile(tsVirtualPath, parseableSourceText, {
    overwrite: true,
  });

  const sourceFile = project.getSourceFile(tsVirtualPath);
  if (sourceFile === undefined) {
    signatureSourceCache.set(cacheKey, null);
    return undefined;
  }

  const signature = sourceFile.getInterface(interfaceName);
  signatureSourceCache.set(cacheKey, signature ?? null);
  if (signature === undefined) {
    return undefined;
  }

  return signature;
}
