import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const CATALOG_SPECIFIER =
  "@hashicorp/design-system-components/component-catalog.json";
const cache = new Map();

function assertCatalog(catalog, catalogPath) {
  if (
    catalog === null ||
    typeof catalog !== "object" ||
    Array.isArray(catalog) ||
    !Array.isArray(catalog.components) ||
    catalog.valueSets === null ||
    typeof catalog.valueSets !== "object" ||
    Array.isArray(catalog.valueSets)
  ) {
    throw new Error(
      `Invalid HDS component catalog at "${catalogPath}": expected "components" array and "valueSets" object`,
    );
  }

  for (const component of catalog.components) {
    if (
      component === null ||
      typeof component !== "object" ||
      typeof component.name !== "string" ||
      !Array.isArray(component.args)
    ) {
      throw new Error(
        `Invalid HDS component catalog at "${catalogPath}": every component must have a name and args array`,
      );
    }
  }

  return catalog;
}

function resolveCatalogPath(workingDir, configuredPath) {
  if (configuredPath !== undefined) {
    if (typeof configuredPath !== "string" || configuredPath.length === 0) {
      throw new Error(
        'Invalid HDS lint rule configuration: "catalogPath" must be a non-empty string',
      );
    }
    return path.resolve(workingDir, configuredPath);
  }

  try {
    const requireFromConsumer = createRequire(
      path.join(path.resolve(workingDir), "package.json"),
    );
    return requireFromConsumer.resolve(CATALOG_SPECIFIER);
  } catch (error) {
    throw new Error(
      `Unable to resolve ${CATALOG_SPECIFIER} from "${workingDir}". Install @hashicorp/design-system-components or configure catalogPath.`,
      { cause: error },
    );
  }
}

export function loadCatalog(workingDir, configuredPath) {
  const catalogPath = resolveCatalogPath(workingDir, configuredPath);
  if (cache.has(catalogPath)) {
    return cache.get(catalogPath);
  }

  let source;
  try {
    source = fs.readFileSync(catalogPath, "utf8");
  } catch (error) {
    throw new Error(
      `Unable to read HDS component catalog at "${catalogPath}"`,
      {
        cause: error,
      },
    );
  }

  let catalog;
  try {
    catalog = JSON.parse(source);
  } catch (error) {
    throw new Error(
      `Invalid JSON in HDS component catalog at "${catalogPath}"`,
      { cause: error },
    );
  }

  const validatedCatalog = assertCatalog(catalog, catalogPath);
  cache.set(catalogPath, validatedCatalog);
  return validatedCatalog;
}
