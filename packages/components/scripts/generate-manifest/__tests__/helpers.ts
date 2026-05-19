import { Project, type InterfaceDeclaration, type SourceFile } from 'ts-morph';

/**
 * Build an in-memory ts-morph project for fixture-driven parser tests.
 *
 * Tests intentionally bypass the module-level project in
 * `signature-source.ts` so each case is isolated, fast, and free of
 * filesystem dependencies on the real component library.
 */
export function createFixtureProject(): Project {
  return new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      strict: true,
      noEmit: true,
    },
  });
}

export function addFixtureSource(
  project: Project,
  filePath: string,
  source: string
): SourceFile {
  return project.createSourceFile(filePath, source, { overwrite: true });
}

export function getSignatureInterface(
  sourceFile: SourceFile,
  interfaceName: string
): InterfaceDeclaration {
  const decl = sourceFile.getInterface(interfaceName);

  if (decl === undefined) {
    throw new Error(
      `Fixture is missing interface "${interfaceName}" in ${sourceFile.getFilePath()}`
    );
  }

  return decl;
}
