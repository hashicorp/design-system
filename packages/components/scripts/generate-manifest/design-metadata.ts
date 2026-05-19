import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { repoRoot } from './paths.ts';

import type { CatalogDesign } from './types.ts';

const docsRoot = resolve(repoRoot, 'website/docs/components');

const normalizeNodeId = (nodeId: string): string => {
  return nodeId.replace(/:/gu, '-');
};

const parseFigmaMetadata = (figmaUrl: string): CatalogDesign => {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(figmaUrl);
  } catch {
    return { figmaUrl };
  }

  const nodeId = parsedUrl.searchParams.get('node-id');
  const pathnameTokens = parsedUrl.pathname
    .split('/')
    .filter((token) => token.length > 0);
  const designTokenIndex = pathnameTokens.findIndex(
    (token) => token === 'design'
  );
  const fileKey =
    designTokenIndex >= 0 && pathnameTokens[designTokenIndex + 1] !== undefined
      ? pathnameTokens[designTokenIndex + 1]
      : undefined;

  return {
    figmaUrl,
    ...(nodeId !== null ? { nodeId: normalizeNodeId(nodeId) } : {}),
    ...(fileKey !== undefined ? { fileKey } : {}),
  };
};

const getFigmaUrlFromDoc = (componentPath: string): string | undefined => {
  const docPath = resolve(docsRoot, componentPath, 'index.md');

  if (existsSync(docPath) === false) {
    return undefined;
  }

  const source = readFileSync(docPath, 'utf8');
  const figmaMatch = source.match(
    /\n\s*figma:\s*>-\s*\n\s*(https:\/\/www\.figma\.com\/[^\s]+)/u
  );

  if (figmaMatch === null) {
    return undefined;
  }

  return figmaMatch[1]?.trim();
};

export const getComponentDesignMetadata = (
  componentPath: string
): CatalogDesign | undefined => {
  const figmaUrl = getFigmaUrlFromDoc(componentPath);

  if (figmaUrl === undefined) {
    return undefined;
  }

  return parseFigmaMetadata(figmaUrl);
};
