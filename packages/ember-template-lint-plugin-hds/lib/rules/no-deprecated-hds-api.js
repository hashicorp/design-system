import fs from "node:fs";
import path from "node:path";

import { Rule } from "ember-template-lint";
import ts from "typescript";

import { maskEmbeddedTemplates, templateRanges } from "../backing-values.js";
import { deprecatedApiPolicyManifest } from "../deprecated-api-policies.js";

const COMPONENTS_MODULE = "@hashicorp/design-system-components/components";
const HDS_PACKAGE = "@hashicorp/design-system-components";

function containedEmbeddedSource(workingDir, filePath, templateSource) {
  if (
    typeof filePath !== "string" ||
    ![".gts", ".gjs"].includes(path.extname(filePath))
  ) {
    return undefined;
  }

  const root = fs.realpathSync(path.resolve(workingDir));
  const candidate = path.isAbsolute(filePath)
    ? path.resolve(filePath)
    : path.resolve(root, filePath);
  let resolved;
  try {
    resolved = fs.realpathSync(candidate);
  } catch {
    return undefined;
  }
  const relative = path.relative(root, resolved);
  if (
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    return undefined;
  }

  const source = fs.readFileSync(resolved, "utf8");
  const ranges = templateRanges(source);
  if (
    !ranges?.some(
      ([start, end]) => source.slice(start + 10, end - 11) === templateSource,
    )
  ) {
    return undefined;
  }
  return { path: resolved, source };
}

function importedComponents(workingDir, filePath, templateSource, policies) {
  const embedded = containedEmbeddedSource(
    workingDir,
    filePath,
    templateSource,
  );
  if (!embedded) {
    return new Map();
  }
  const masked = maskEmbeddedTemplates(embedded.source);
  if (masked === undefined) {
    return new Map();
  }

  const sourceFile = ts.createSourceFile(
    embedded.path,
    masked,
    ts.ScriptTarget.Latest,
    true,
    embedded.path.endsWith(".gjs") ? ts.ScriptKind.JS : ts.ScriptKind.TS,
  );
  if (sourceFile.parseDiagnostics.length > 0) {
    return new Map();
  }

  const namedExports = new Map();
  const defaultModules = new Map();
  for (const policy of policies) {
    for (const exportName of policy.imports?.namedExports ?? []) {
      namedExports.set(exportName, policy.component);
    }
    for (const moduleName of policy.imports?.defaultModules ?? []) {
      defaultModules.set(moduleName, policy.component);
    }
    for (const exportName of policy.contextualParent?.namedExports ?? []) {
      namedExports.set(exportName, policy.contextualParent.component);
    }
  }

  const imports = new Map();
  for (const statement of sourceFile.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.importClause?.isTypeOnly
    ) {
      continue;
    }
    const moduleName = statement.moduleSpecifier.text;
    if (
      moduleName === COMPONENTS_MODULE &&
      statement.importClause?.namedBindings &&
      ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      for (const element of statement.importClause.namedBindings.elements) {
        if (element.isTypeOnly) {
          continue;
        }
        const component = namedExports.get(
          element.propertyName?.text ?? element.name.text,
        );
        if (component) {
          imports.set(element.name.text, component);
        }
      }
    }

    const defaultComponent = defaultModules.get(moduleName);
    if (defaultComponent && statement.importClause?.name) {
      imports.set(statement.importClause.name.text, defaultComponent);
    }
  }
  return imports;
}

export default class NoDeprecatedHdsApi extends Rule {
  constructor(options) {
    super(options);
    this.policies = deprecatedApiPolicyManifest.policies;
    this.policiesByComponent = new Map(
      this.policies.map((policy) => [policy.component, policy]),
    );
    this.imports = undefined;
    this.scopes = [];
  }

  componentForTag(tag) {
    if (this.policiesByComponent.has(tag) || tag === "Hds::AdvancedTable") {
      return tag;
    }
    this.imports ??= importedComponents(
      this.workingDir,
      this.filePath,
      this.source.join(""),
      this.policies,
    );
    const imported = this.imports.get(tag);
    if (imported) {
      return imported;
    }

    const contextual = /^([^.:]+)\.([^.:]+)$/.exec(tag);
    if (!contextual) {
      return undefined;
    }
    for (let index = this.scopes.length - 1; index >= 0; index--) {
      const parent = this.scopes[index].get(contextual[1]);
      if (parent !== undefined) {
        const policy = this.policies.find(
          (candidate) =>
            candidate.contextualParent?.component === parent &&
            candidate.contextualParent.member === contextual[2],
        );
        return policy?.component;
      }
    }
    return undefined;
  }

  pushScope(node, component) {
    const bindings = new Map(
      (node.blockParams ?? []).map((name) => [name, "other"]),
    );
    const contextualParent = this.policies.find(
      (policy) => policy.contextualParent?.component === component,
    )?.contextualParent;
    if (contextualParent && node.blockParams?.[0]) {
      bindings.set(node.blockParams[0], contextualParent.component);
    }
    this.scopes.push(bindings);
  }

  message(policy) {
    return `${policy.component}${policy.argument ? ` @${policy.argument}` : ""} was removed in ${HDS_PACKAGE} ${policy.removedIn}. ${policy.guidance} See ${policy.docs} (sources: ${policy.source.versionHistory}; ${policy.source.implementation}).`;
  }

  visitor() {
    return {
      Block: {
        enter(node) {
          this.scopes.push(
            new Map((node.blockParams ?? []).map((name) => [name, "other"])),
          );
        },
        exit() {
          this.scopes.pop();
        },
      },
      ElementNode: {
        enter(node) {
          const component = this.componentForTag(node.tag);
          const policy = this.policiesByComponent.get(component);
          if (policy?.kind === "component") {
            const canFix =
              node.tag === policy.component &&
              policy.safeFix?.kind === "rename-direct-component";
            if (this.mode === "fix" && canFix) {
              node.tag = policy.safeFix.replacement;
            } else {
              this.log({
                message: this.message(policy),
                node,
                isFixable: canFix,
              });
            }
          } else if (policy?.kind === "argument") {
            const attribute = node.attributes.find(
              (candidate) => candidate.name === `@${policy.argument}`,
            );
            if (attribute) {
              this.log({
                message: this.message(policy),
                node: attribute,
                isFixable: false,
              });
            }
          }
          this.pushScope(node, component);
        },
        exit() {
          this.scopes.pop();
        },
      },
    };
  }
}
