import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import matter from 'gray-matter';

import { repoRoot } from './paths.ts';

import type { CatalogDesign } from './types.ts';

const docsRoot = resolve(repoRoot, 'website/docs/components');

const normalizeNodeId = (nodeId: string): string => {
  return nodeId.replaceAll(':', '-');
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

/**
 * Narrow shape we expect from a docs page's YAML frontmatter. We only read
 * `links.figma`, so we intentionally keep the type to that subset and treat
 * everything else as opaque.
 */
interface DocFrontmatter {
  links?: {
    figma?: unknown;
  };
}

const extractFigmaUrl = (frontmatter: DocFrontmatter): string | undefined => {
  const figmaValue = frontmatter.links?.figma;

  if (typeof figmaValue !== 'string') {
    return undefined;
  }

  const trimmed = figmaValue.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const getFigmaUrlFromDoc = (componentPath: string): string | undefined => {
  const docPath = resolve(docsRoot, componentPath, 'index.md');

  if (existsSync(docPath) === false) {
    return undefined;
  }

  const source = readFileSync(docPath, 'utf8');

  let parsed;
  try {
    parsed = matter(source);
  } catch {
    // Malformed frontmatter: skip rather than fail the whole manifest build.
    return undefined;
  }

  return extractFigmaUrl(parsed.data as DocFrontmatter);
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
