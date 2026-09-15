import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

import ts from "typescript";

import { maskEmbeddedTemplates, templateRanges } from "./backing-values.js";

const HDS_COMPONENTS_MODULE = "@hashicorp/design-system-components/components";
const HDS_CATALOG_MODULE =
  "@hashicorp/design-system-components/component-catalog.json";
const exportCache = new Map();

function containedFile(workingDir, filePath) {
  if (
    typeof filePath !== "string" ||
    ![".gts", ".gjs"].includes(path.extname(filePath))
  ) {
    return undefined;
  }

  const root = path.resolve(workingDir);
  const candidate = path.isAbsolute(filePath)
    ? path.resolve(filePath)
    : path.resolve(root, filePath);
  const relative = path.relative(root, candidate);
  if (
    relative === "" ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    return undefined;
  }

  try {
    const realPath = fs.realpathSync(candidate);
    const realRelative = path.relative(root, realPath);
    return realRelative !== ".." &&
      !realRelative.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(realRelative)
      ? realPath
      : undefined;
  } catch {
    return undefined;
  }
}

function exportedComponentModules(workingDir) {
  let packageRoot;
  try {
    const requireFromConsumer = createRequire(
      path.join(path.resolve(workingDir), "package.json"),
    );
    packageRoot = path.dirname(requireFromConsumer.resolve(HDS_CATALOG_MODULE));
  } catch {
    return new Map();
  }

  const declarationPath = path.join(
    packageRoot,
    "declarations",
    "components.d.ts",
  );
  if (exportCache.has(declarationPath)) {
    return exportCache.get(declarationPath);
  }

  let source;
  try {
    source = fs.readFileSync(declarationPath, "utf8");
  } catch {
    return new Map();
  }

  const sourceFile = ts.createSourceFile(
    declarationPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  if (sourceFile.parseDiagnostics.length > 0) {
    return new Map();
  }

  const exports = new Map();
  for (const statement of sourceFile.statements) {
    if (
      !ts.isExportDeclaration(statement) ||
      !statement.moduleSpecifier ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !statement.moduleSpecifier.text.startsWith("./components/hds/") ||
      !statement.exportClause ||
      !ts.isNamedExports(statement.exportClause)
    ) {
      continue;
    }

    for (const element of statement.exportClause.elements) {
      if (
        element.propertyName?.text === "default" &&
        element.name.text.startsWith("Hds")
      ) {
        exports.set(
          element.name.text,
          statement.moduleSpecifier.text
            .slice("./components/".length)
            .replace(/(?:\/index)?(?:\.g?[jt]s)?$/, ""),
        );
      }
    }
  }
  exportCache.set(declarationPath, exports);
  return exports;
}

function classicNameForModule(modulePath) {
  return modulePath
    .split("/")
    .map((segment, index) =>
      index === 0
        ? "Hds"
        : segment
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(""),
    )
    .join("::");
}

function exportComponents(workingDir, components) {
  const byModule = new Map(
    components
      .filter((component) => typeof component.modulePath === "string")
      .map((component) => [component.modulePath, component]),
  );
  const byName = new Map(
    components.map((component) => [component.name, component]),
  );
  const resolved = new Map();
  for (const [exportName, modulePath] of exportedComponentModules(workingDir)) {
    const component =
      byModule.get(modulePath) ?? byName.get(classicNameForModule(modulePath));
    if (component) {
      resolved.set(exportName, component);
    }
  }
  return resolved;
}

export function importedHdsComponents(
  workingDir,
  filePath,
  lintedTemplateSource,
  components,
) {
  const resolvedFile = containedFile(workingDir, filePath);
  if (!resolvedFile) {
    return new Map();
  }

  let source;
  try {
    source = fs.readFileSync(resolvedFile, "utf8");
  } catch {
    return new Map();
  }
  const ranges = templateRanges(source);
  if (
    !ranges?.some(
      ([start, end]) =>
        source.slice(start + 10, end - 11) === lintedTemplateSource,
    )
  ) {
    return new Map();
  }

  const masked = maskEmbeddedTemplates(source);
  if (masked === undefined) {
    return new Map();
  }
  const sourceFile = ts.createSourceFile(
    resolvedFile,
    masked,
    ts.ScriptTarget.Latest,
    true,
    resolvedFile.endsWith(".gjs") ? ts.ScriptKind.JS : ts.ScriptKind.TS,
  );

  const exported = exportComponents(workingDir, components);
  const imports = new Map();
  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.moduleSpecifier.text !== HDS_COMPONENTS_MODULE ||
      statement.importClause?.isTypeOnly ||
      !statement.importClause?.namedBindings ||
      !ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      continue;
    }

    for (const element of statement.importClause.namedBindings.elements) {
      if (element.isTypeOnly) {
        continue;
      }
      const component = exported.get(
        element.propertyName?.text ?? element.name.text,
      );
      if (component) {
        imports.set(element.name.text, component);
      }
    }
  }
  return imports;
}
