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

/**
 * Strip a trailing `.gts` or `.ts` extension from an import specifier or
 * filesystem path. Plain string compare avoids the indirection of a regex
 * and makes the supported extension set obvious at the call site.
 */
function stripModuleExtension(value: string): string {
  if (value.endsWith('.gts')) {
    return value.slice(0, -'.gts'.length);
  }

  if (value.endsWith('.ts')) {
    return value.slice(0, -'.ts'.length);
  }

  return value;
}

/**
 * Replace a `.gts` suffix with `.generated.ts`. Used to build virtual file
 * paths for template-stripped TS sources we feed to ts-morph.
 */
function toGeneratedTsPath(gtsPath: string): string {
  if (gtsPath.endsWith('.gts') === false) {
    return gtsPath;
  }

  return gtsPath.slice(0, -'.gts'.length) + '.generated.ts';
}

function templateHasSplattributes(sourceText: string): boolean {
  const templateIndex = sourceText.indexOf('<template>');

  if (templateIndex < 0) {
    return false;
  }

  return sourceText.slice(templateIndex).includes('...attributes');
}

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
  const normalizedImport = stripModuleExtension(importSpecifier);

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
  const normalizedImport = stripModuleExtension(importSpecifier);

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

function getExistingSourcePath(candidates: string[]): string | undefined {
  return candidates.find((candidatePath) => existsSync(candidatePath) === true);
}

export function hasSplattributesForComponent(componentPath: string): boolean {
  const gtsSourcePath = resolve(
    componentsSrcRoot,
    'components/hds',
    componentPath,
    'index.gts'
  );

  if (existsSync(gtsSourcePath) === false) {
    return false;
  }

  return templateHasSplattributes(readFileSync(gtsSourcePath, 'utf8'));
}

export function hasSplattributesForYieldedComponent(
  parentComponentPath: string,
  importSpecifier: string
): boolean | undefined {
  const sourcePathCandidates = getSourcePathCandidates(
    parentComponentPath,
    importSpecifier
  );
  const sourcePath = getExistingSourcePath(sourcePathCandidates);

  if (sourcePath === undefined) {
    return undefined;
  }

  return templateHasSplattributes(readFileSync(sourcePath, 'utf8'));
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
  const tsVirtualPath = toGeneratedTsPath(sourcePath);

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
  const tsVirtualPath = toGeneratedTsPath(gtsSourcePath);
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
