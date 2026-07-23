/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(currentDirectory, "..");
const workspaceRoot = resolve(packageRoot, "../..");
const defaultInputDirectory = resolve(
  workspaceRoot,
  "showcase/app/components",
);
const defaultOutputPath = resolve(
  packageRoot,
  "src/catalogs/code-examples/catalog.json",
);

// Modules from these sources indicate a non-standalone fragment.
const SHOWCASE_MODULE_PATTERNS = [
  /^showcase\//,
  /^\.\.?\//,
];

const HDS_COMPONENTS_MODULE = "@hashicorp/design-system-components/components";

/** Recursively collect all .gts files under a directory. */
const getGtsFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve(directory, entry.name);
      return entry.isDirectory()
        ? getGtsFiles(entryPath)
        : Promise.resolve(extname(entry.name) === ".gts" ? [entryPath] : []);
    }),
  );
  return files.flat();
};

/**
 * Derive the component area from the path segments between the page category
 * and "code-fragments". Preserves nested component paths.
 *
 * Examples:
 *   page-components/accordion/code-fragments/... -> accordion
 *   page-components/form/select/code-fragments/... -> form/select
 *   page-layouts/grid/code-fragments/... -> grid
 */
const deriveComponent = (relativePath) => {
  const parts = relativePath.split("/");
  // Find "code-fragments" segment
  const cfIndex = parts.indexOf("code-fragments");
  if (cfIndex < 2) return parts[1] ?? "unknown";
  // Component path is everything between the page-category (index 0) and
  // "code-fragments", i.e. from index 1 to cfIndex - 1.
  return parts.slice(1, cfIndex).join("/");
};

/**
 * Derive the example title from the filename. Converts kebab-case to a
 * sentence where only the first letter is uppercased.
 *
 * Example: with-external-control -> With external control
 */
const deriveTitle = (filename) => {
  const base = filename.replace(/\.gts$/, "");
  return base.charAt(0).toUpperCase() + base.slice(1).replaceAll("-", " ");
};

/**
 * Parse static import declarations from GTS source to extract:
 * - imported identifiers from @hashicorp/design-system-components/components
 * - relative imports and showcase module imports (for standalone detection)
 *
 * Uses a lightweight regex strategy that handles both single-line and
 * multi-line named imports.
 */
const parseImports = (source) => {
  const importedHdsComponents = [];
  const localDependencies = [];

  // Match: import ... from '...' or import ... from "..."
  // Handles multiline imports by matching the full import statement.
  // Two patterns: one for `import type { ... }` (type-only, skip for HDS),
  // one for `import { ... }` (value imports).
  const importPattern =
    /^import(\s+type)?\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/gm;

  let match;
  while ((match = importPattern.exec(source)) !== null) {
    const isTypeOnly = match[1] !== undefined;
    const importClause = match[2];
    const modulePath = match[3];

    if (!isTypeOnly && modulePath === HDS_COMPONENTS_MODULE) {
      // Extract named identifiers from the import clause, excluding any
      // per-binding `type` qualifiers (TS 4.5+ inline type imports).
      const names = importClause
        .replace(/[{}]/g, "")
        .split(",")
        .map((token) => {
          // Handle inline `type Foo` or `type Foo as Bar`
          const normalized = token.trim().replace(/^type\s+/, "");
          return normalized.split(/\s+as\s+/)[0]?.trim() ?? "";
        })
        .filter((name) => name.length > 0 && name !== "*" && /^Hds/.test(name));
      importedHdsComponents.push(...names);
    }

    if (SHOWCASE_MODULE_PATTERNS.some((pattern) => pattern.test(modulePath))) {
      localDependencies.push(modulePath);
    }
  }

  return {
    importedHdsComponents: [...new Set(importedHdsComponents)].sort(),
    localDependencies: [...new Set(localDependencies)].sort(),
  };
};

/**
 * An example is standalone when it has no relative imports or showcase-module
 * imports.
 */
const deriveIsStandalone = (localDependencies) =>
  localDependencies.length === 0;

/**
 * Build the code-examples catalog from all code-fragments .gts files under
 * the input directory.
 */
export const buildCodeExamplesCatalog = async (inputDirectory) => {
  const allFiles = await getGtsFiles(inputDirectory);

  // Only include files under code-fragments directories.
  const fragmentFiles = allFiles
    .filter((filePath) => {
      const rel = relative(inputDirectory, filePath).replaceAll("\\", "/");
      return rel.includes("/code-fragments/");
    })
    .sort();

  const examples = [];

  for (const filePath of fragmentFiles) {
    const rel = relative(inputDirectory, filePath).replaceAll("\\", "/");
    // Strip .gts extension for the ID
    const id = rel.replace(/\.gts$/, "");
    const filename = filePath.split("/").pop() ?? "";
    const component = deriveComponent(rel);
    const title = deriveTitle(filename);
    const source = await readFile(filePath, "utf8");
    const { importedHdsComponents, localDependencies } = parseImports(source);
    const isStandalone = deriveIsStandalone(localDependencies);

    examples.push({
      id,
      component,
      title,
      sourcePath: `showcase/app/components/${rel}`,
      source,
      importedHdsComponents,
      localDependencies,
      isStandalone,
    });
  }

  return { version: 1, examples };
};

export const generateCodeExamplesCatalog = async ({
  inputDirectory = defaultInputDirectory,
  outputPath = defaultOutputPath,
} = {}) => {
  const catalog = await buildCodeExamplesCatalog(inputDirectory);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);

  return catalog;
};

if (
  import.meta.url ===
  pathToFileURL(process.argv[1] ?? "").href
) {
  const catalog = await generateCodeExamplesCatalog();

  console.log(
    `Generated code examples catalog with ${catalog.examples.length} examples`,
  );
}
