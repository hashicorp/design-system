/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "@babel/parser";
import { Preprocessor } from "content-tag";

import { getDirectoryPaths, getFilesOfType } from "./utils.mjs";

const contentTag = new Preprocessor();

const { defaultInput, defaultOutput } = getDirectoryPaths({
  defaultInput: "showcase/app/components",
  defaultOutput: "src/catalogs/code-examples/catalog.json",
});

const SHOWCASE_MODULE_PATTERNS = [/^showcase\//, /^\.\.?\//];
const HDS_COMPONENTS_MODULE = "@hashicorp/design-system-components/components";

/**
 * Derive the component area from the path segments between the page category
 * and "code-fragments". Preserves nested component paths.
 *
 * Examples:
 *   page-components/accordion/code-fragments/... -> accordion
 *   page-components/form/select/code-fragments/... -> form/select
 */
export const deriveComponent = (relativePath) => {
  const parts = relativePath.split("/");
  const codeFragmentIndex = parts.indexOf("code-fragments");

  if (codeFragmentIndex < 1) {
    return "unknown";
  }

  const componentStartIndex = codeFragmentIndex === 1 ? 0 : 1;

  return parts.slice(componentStartIndex, codeFragmentIndex).join("/");
};

export const deriveTitle = (filename) => {
  const base = filename.replace(/\.gts$/, "");

  return base.charAt(0).toUpperCase() + base.slice(1).replaceAll("-", " ");
};

export const parseImports = (source, filename) => {
  const { code } = contentTag.process(source, { filename });

  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript", "decorators-legacy"],
  });

  const importedHdsComponents = new Set();
  const localDependencies = new Set();

  for (const node of ast.program.body) {
    if (node.type !== "ImportDeclaration") {
      continue;
    }

    const modulePath = node.source.value;

    if (SHOWCASE_MODULE_PATTERNS.some((pattern) => pattern.test(modulePath))) {
      localDependencies.add(modulePath);
    }

    const isTypeOnlyDeclaration = node.importKind === "type";

    if (isTypeOnlyDeclaration || modulePath !== HDS_COMPONENTS_MODULE) {
      continue;
    }

    for (const specifier of node.specifiers) {
      if (
        specifier.type === "ImportSpecifier" &&
        specifier.importKind === "type"
      ) {
        continue;
      }

      const importedName =
        specifier.imported.type === "Identifier"
          ? specifier.imported.name
          : specifier.imported.value;

      if (importedName.startsWith("Hds")) {
        importedHdsComponents.add(importedName);
      }
    }
  }

  return {
    importedHdsComponents: [...importedHdsComponents].sort(),
    localDependencies: [...localDependencies].sort(),
  };
};

export const buildCodeExamplesCatalog = async (inputDirectory) => {
  const allFiles = await getFilesOfType(inputDirectory, ".gts");

  // only include files under code-fragments directories
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
    const { importedHdsComponents, localDependencies } = parseImports(
      source,
      filename,
    );
    const isStandalone = localDependencies.length === 0;

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
  inputDirectory = defaultInput,
  outputPath = defaultOutput,
} = {}) => {
  const catalog = await buildCodeExamplesCatalog(inputDirectory);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);

  return catalog;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const catalog = await generateCodeExamplesCatalog();

  console.log(
    `Generated code examples catalog with ${catalog.examples.length} examples`,
  );
}
