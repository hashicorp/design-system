import CatalogRule from "../catalog-rule.js";

const COMPONENTS_REQUIRING_NAMES = new Set([
  "Hds::CodeBlock",
  "Hds::CodeEditor",
]);
const ACCESSIBLE_NAME_ARGUMENTS = new Set(["@ariaLabel", "@ariaLabelledBy"]);

function hasAccessibleNameArgument(node) {
  return node.attributes.some(
    (attribute) =>
      ACCESSIBLE_NAME_ARGUMENTS.has(attribute.name) &&
      (attribute.value.type !== "TextNode" ||
        attribute.value.chars.trim().length > 0),
  );
}

function hasTitleContent(node) {
  return node.children.some((child) => {
    if (child.type === "TextNode") {
      return child.chars.trim().length > 0;
    }
    if (["CommentStatement", "MustacheCommentStatement"].includes(child.type)) {
      return false;
    }
    if (child.type === "ElementNode") {
      return (
        child.attributes.some(
          (attribute) =>
            ["alt", "aria-label"].includes(attribute.name) &&
            attribute.value.type !== "TextNode",
        ) ||
        child.attributes.some(
          (attribute) =>
            ["alt", "aria-label"].includes(attribute.name) &&
            attribute.value.chars.trim().length > 0,
        ) ||
        hasTitleContent(child)
      );
    }
    return true;
  });
}

export default class RequireAccessibleName extends CatalogRule {
  constructor(options) {
    super(options);
    this.blockParamScopes = [];
    this.targets = new WeakMap();
  }

  contextualTitleTarget(node) {
    const match = /^([^.:]+)\.Title$/.exec(node.tag);
    if (!match) {
      return undefined;
    }

    for (let index = this.blockParamScopes.length - 1; index >= 0; index--) {
      if (this.blockParamScopes[index].has(match[1])) {
        return this.blockParamScopes[index].get(match[1]);
      }
    }
    return undefined;
  }

  visitor() {
    return {
      Block: {
        enter(node) {
          this.blockParamScopes.push(
            new Map((node.blockParams ?? []).map((name) => [name, undefined])),
          );
        },
        exit() {
          this.blockParamScopes.pop();
        },
      },
      ElementNode: {
        enter(node) {
          const titleTarget = this.contextualTitleTarget(node);
          if (titleTarget && hasTitleContent(node)) {
            titleTarget.hasContextualTitle = true;
          }

          const component = this.hdsComponent(node);
          let target;
          if (COMPONENTS_REQUIRING_NAMES.has(component?.name)) {
            target = {
              hasArgument: hasAccessibleNameArgument(node),
              hasContextualTitle: false,
            };
            this.targets.set(node, target);
          }

          const scope = new Map(
            (node.blockParams ?? []).map((name) => [name, undefined]),
          );
          if (target && node.blockParams?.length > 0) {
            scope.set(node.blockParams[0], target);
          }
          this.blockParamScopes.push(scope);
        },
        exit(node) {
          this.blockParamScopes.pop();
          const target = this.targets.get(node);
          if (target && !target.hasArgument && !target.hasContextualTitle) {
            this.log({
              message: `<${node.tag}> requires an accessible name. Provide @ariaLabel, @ariaLabelledBy, or its yielded contextual Title with content.`,
              node,
            });
          }
        },
      },
    };
  }
}
