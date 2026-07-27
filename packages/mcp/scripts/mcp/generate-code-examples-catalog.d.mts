/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export interface CodeExamplesCatalog {
  version: 1;
  examples: CodeExample[];
}

export interface CodeExample {
  id: string;
  component: string;
  title: string;
  sourcePath: string;
  showcaseUrl?: string;
  source: string;
  importedHdsComponents: string[];
  localDependencies: string[];
  isStandalone: boolean;
}

export declare function deriveComponent(relativePath: string): string;

export declare function deriveTitle(filename: string): string;

export interface ParseImportsResult {
  importedHdsComponents: string[];
  localDependencies: string[];
}

export declare function parseImports(
  source: string,
  filename: string,
): ParseImportsResult;

export declare function buildCodeExamplesCatalog(
  inputDirectory: string,
): Promise<CodeExamplesCatalog>;

export declare function generateCodeExamplesCatalog(options?: {
  inputDirectory?: string;
  outputPath?: string;
}): Promise<CodeExamplesCatalog>;