import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { InterfaceDeclaration, Project } from 'ts-morph';

import { componentsSrcRoot, repoRoot } from './paths.ts';

const project = new Project();
project.addSourceFilesAtPaths(resolve(componentsSrcRoot, '**/*.ts'));
project.addSourceFilesAtPaths(
  resolve(repoRoot, 'packages/components/declarations/**/*.d.ts')
);

const signatureSourceCache = new Map<string, InterfaceDeclaration | null>();

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
