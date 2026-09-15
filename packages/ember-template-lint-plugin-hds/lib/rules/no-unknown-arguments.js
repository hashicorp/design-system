import { recast } from "ember-template-lint";

import CatalogRule from "../catalog-rule.js";
import {
  attributeAliases,
  diagnosticOnlyArgumentPolicies,
} from "../policies.js";
import { closestUniqueMatch } from "../utils.js";

const DIRECT_DROPDOWN_INTERACTIVE = "Hds::Dropdown::ListItem::Interactive";
const DROPDOWN_TEXT_MESSAGE =
  "@text was removed from Hds::Dropdown::ListItem::Interactive in @hashicorp/design-system-components 5.0.0; pass its value as block content instead.";
const DROPDOWN_CODEMOD_MESSAGE =
  " This syntax cannot be safely autofixed; run @hashicorp/design-system-codemods v4/dropdown-list-item-interactive.";
const { builders } = recast;

function conditionMatches(condition, providedArguments) {
  return (
    (condition?.present ?? []).every((name) => providedArguments.has(name)) &&
    (condition?.absent ?? []).every((name) => !providedArguments.has(name))
  );
}

function isDiagnosticOnly(component, argument) {
  return diagnosticOnlyArgumentPolicies.some(
    (policy) =>
      (policy.components === undefined ||
        policy.components.includes(component)) &&
      (policy.componentPrefixes === undefined ||
        policy.componentPrefixes.some((prefix) =>
          component.startsWith(prefix),
        )) &&
      (policy.arguments === undefined || policy.arguments.includes(argument)),
  );
}

export default class NoUnknownArguments extends CatalogRule {
  constructor(options) {
    super(options);
    this.blockParamScopes = [];
  }

  pushElementScope(node) {
    const blockParams = node.blockParams ?? [];
    const bindings = new Map(
      blockParams.map((blockParam) => [blockParam, "other"]),
    );
    if (node.tag === "Hds::Dropdown" && blockParams.length > 0) {
      bindings.set(blockParams[0], "dropdown");
    }
    this.blockParamScopes.push(bindings);
  }

  pushBlockScope(node) {
    this.blockParamScopes.push(
      new Map(
        (node.program?.blockParams ?? []).map((blockParam) => [
          blockParam,
          "other",
        ]),
      ),
    );
  }

  isDropdownInteractive(node) {
    if (node.tag === DIRECT_DROPDOWN_INTERACTIVE) {
      return true;
    }

    const match = /^([^.:]+)\.Interactive$/.exec(node.tag);
    if (!match) {
      return false;
    }

    for (let index = this.blockParamScopes.length - 1; index >= 0; index--) {
      const binding = this.blockParamScopes[index].get(match[1]);
      if (binding !== undefined) {
        return binding === "dropdown";
      }
    }
    return false;
  }

  hasSubstantiveContent(node) {
    return node.children.some((child) => {
      if (child.type === "TextNode") {
        return child.chars.trim().length > 0;
      }
      return !["CommentStatement", "MustacheCommentStatement"].includes(
        child.type,
      );
    });
  }

  childrenForTextValue(value) {
    if (value.type === "TextNode") {
      return [value];
    }
    if (value.type === "ConcatStatement") {
      return [...value.parts];
    }
    if (value.type === "MustacheStatement") {
      return [value];
    }
    if (value.type === "StringLiteral") {
      return [builders.mustache(builders.string(value.value))];
    }
    if (value.type === "NumberLiteral") {
      return [builders.mustache(builders.number(value.value))];
    }
    return undefined;
  }

  handleRemovedDropdownText(node) {
    if (!this.isDropdownInteractive(node)) {
      return false;
    }

    const textAttributes = node.attributes.filter(
      (attribute) => attribute.name === "@text",
    );
    if (textAttributes.length === 0) {
      return false;
    }

    const hasContent = this.hasSubstantiveContent(node);
    const replacementChildren =
      textAttributes.length === 1
        ? this.childrenForTextValue(textAttributes[0].value)
        : undefined;
    const canFix = hasContent || replacementChildren !== undefined;

    if (this.mode === "fix" && canFix) {
      const children = hasContent
        ? node.children
        : [...node.children, ...replacementChildren];
      const replacement = builders.element(
        { name: node.tag, selfClosing: false },
        {
          attrs: node.attributes.filter(
            (attribute) => attribute.name !== "@text",
          ),
          blockParams: node.blockParams,
          children,
          modifiers: node.modifiers,
        },
      );
      return { handled: true, replacement };
    } else {
      this.log({
        message: `${DROPDOWN_TEXT_MESSAGE}${canFix ? "" : DROPDOWN_CODEMOD_MESSAGE}`,
        node: textAttributes[0],
        isFixable: canFix,
      });
    }
    return { handled: true };
  }

  visitor() {
    return {
      BlockStatement: {
        enter(node) {
          this.pushBlockScope(node);
        },
        exit() {
          this.blockParamScopes.pop();
        },
      },
      ElementNode: {
        enter(node) {
          const migration = this.handleRemovedDropdownText(node);
          if (!migration) {
            const component = this.hdsComponent(node);
            if (component) {
              this.checkUnknownArguments(node, component);
            }
          }
          this.pushElementScope(node);
          return migration?.replacement;
        },
        exit() {
          this.blockParamScopes.pop();
        },
      },
    };
  }

  checkUnknownArguments(node, component) {
    const validArguments = component.args.map((argument) => argument.name);
    const providedArguments = new Set(
      node.attributes
        .filter((attribute) => attribute.name.startsWith("@"))
        .map((attribute) => attribute.name.slice(1)),
    );
    const providedAttributes = new Set(
      node.attributes.map((attribute) => attribute.name),
    );
    for (const attribute of node.attributes) {
      if (!attribute.name.startsWith("@")) {
        continue;
      }

      const argumentName = attribute.name.slice(1);
      if (validArguments.includes(argumentName)) {
        continue;
      }

      const aliasPolicy = attributeAliases.find(
        (policy) =>
          policy.components.includes(component.name) &&
          policy.from === argumentName,
      );
      if (aliasPolicy) {
        const destinations = aliasPolicy.destinations.filter((destination) =>
          conditionMatches(destination.when, providedArguments),
        );
        const destination =
          destinations.length === 1 ? destinations[0].to : undefined;
        const duplicate =
          destination !== undefined && providedAttributes.has(destination);
        const replacementMessage = destination
          ? ` Replace ${attribute.name} with ${destination}.`
          : ` ${aliasPolicy.diagnostic}`;
        const duplicateMessage = duplicate
          ? ` Autofix skipped because ${destination} is already present.`
          : "";
        const canFix = destination !== undefined && !duplicate;

        if (this.mode === "fix" && canFix) {
          attribute.name = destination;
          providedAttributes.add(destination);
        } else {
          this.log({
            message: `Unknown argument ${attribute.name} on <${node.tag}>.${replacementMessage}${duplicateMessage}`,
            node: attribute,
            isFixable: canFix,
          });
        }
        continue;
      }

      const suggestion = isDiagnosticOnly(component.name, argumentName)
        ? undefined
        : closestUniqueMatch(argumentName, validArguments);
      const canFix =
        suggestion !== undefined && !providedArguments.has(suggestion);
      const suggestionMessage = suggestion
        ? ` Did you mean @${suggestion}?`
        : "";

      if (this.mode === "fix" && canFix) {
        attribute.name = `@${suggestion}`;
      } else {
        this.log({
          message: `Unknown argument @${argumentName} on <${node.tag}>.${suggestionMessage}`,
          node: attribute,
          isFixable: canFix,
        });
      }
    }
  }
}
