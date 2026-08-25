/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// lazy, memoized loader for the generated catalogs backing each resource domain

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { findPackageDirectory, getProjectRoot } from "./project-root.js";

const require = createRequire(import.meta.url);

// a consumer may hold a direct copy of a catalog, the copy their components package pulled in, or neither
export const CATALOG_ANCHORS = [
  "project-root",
  "components",
  "default",
] as const;

export type CatalogAnchor = (typeof CATALOG_ANCHORS)[number];

export type CatalogSource = {
  version: string | null;
  resolvedVia: CatalogAnchor;
};

export type CatalogLoaderOptions<Store> = {
  specifier: string;
  anchors: readonly CatalogAnchor[];
  create: (value: unknown, source: CatalogSource) => Store;
};

export interface CatalogLoader<Store> {
  load: () => Store;
  getOrLoad: () => Store;
}

// stands in for a store built directly from a catalog value rather than resolved from disk
export const DEFAULT_CATALOG_SOURCE: CatalogSource = {
  version: null,
  resolvedVia: "default",
};

const COMPONENTS_MANIFEST_SPECIFIER =
  "@hashicorp/design-system-components/package.json";

const MCP_PACKAGE_DIRECTORY = dirname(fileURLToPath(import.meta.url));

type ResolvedCatalog = {
  catalogPath: string;
  resolvedVia: CatalogAnchor;
};

const getAnchorDirectory = (anchor: CatalogAnchor): string | null => {
  if (anchor === "project-root") {
    return getProjectRoot();
  }

  if (anchor === "default") {
    return MCP_PACKAGE_DIRECTORY;
  }

  // the only anchor that can be missing outright, since it depends on the consumer's own install
  try {
    return dirname(require.resolve(COMPONENTS_MANIFEST_SPECIFIER));
  } catch {
    return null;
  }
};

const resolveCatalog = (
  specifier: string,
  anchors: readonly CatalogAnchor[],
): ResolvedCatalog => {
  const attempted: string[] = [];

  for (const anchor of anchors) {
    const directory = getAnchorDirectory(anchor);

    if (directory === null) {
      attempted.push(`${anchor} (anchor unavailable)`);

      continue;
    }

    attempted.push(`${anchor} -> ${directory}`);

    try {
      return {
        catalogPath:
          anchor === "default"
            ? require.resolve(specifier)
            : require.resolve(specifier, { paths: [directory] }),
        resolvedVia: anchor,
      };
    } catch {
      continue;
    }
  }

  throw new Error(
    `Unable to resolve catalog "${specifier}" from any anchor. Tried: ${attempted.join("; ")}.`,
  );
};

const readCatalogVersion = (catalogPath: string): string | null => {
  const packageDirectory = findPackageDirectory(dirname(catalogPath));

  if (packageDirectory === null) {
    return null;
  }

  try {
    const manifest = JSON.parse(
      readFileSync(join(packageDirectory, "package.json"), "utf8"),
    ) as { version?: unknown };

    return typeof manifest.version === "string" ? manifest.version : null;
  } catch {
    return null;
  }
};

export const memoizeCatalogLoader = <Store>(
  load: () => Store,
): CatalogLoader<Store> => {
  let store: Store | null = null;

  return {
    load,
    getOrLoad: () => {
      if (store === null) {
        store = load();
      }

      return store;
    },
  };
};

export const createCatalogLoader = <TStore>({
  specifier,
  anchors,
  create,
}: CatalogLoaderOptions<TStore>): CatalogLoader<TStore> => {
  return memoizeCatalogLoader(() => {
    const { catalogPath, resolvedVia } = resolveCatalog(specifier, anchors);
    const rawCatalog = readFileSync(catalogPath, "utf8");

    return create(JSON.parse(rawCatalog) as unknown, {
      version: readCatalogVersion(catalogPath),
      resolvedVia,
    });
  });
};
