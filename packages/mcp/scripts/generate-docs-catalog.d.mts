/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

export interface DocsCatalog {
  version: 1;
  pages: DocsPage[];
}

export interface DocsSection {
  id: string;
  heading: string;
  anchor: string;
  tab?: string;
  markdown: string;
}

export interface DocsPage {
  id: string;
  url: string;
  title: string;
  description?: string;
  caption?: string;
  keywords: string[];
  scope: string;
  sections: DocsSection[];
}

export declare function buildDocsCatalog(
  inputDirectory: string,
): Promise<DocsCatalog>;

export declare function generateDocsCatalog(options?: {
  inputDirectory?: string;
  outputPath?: string;
}): Promise<DocsCatalog>;
