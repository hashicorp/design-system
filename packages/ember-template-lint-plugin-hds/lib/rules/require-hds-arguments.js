import path from "node:path";

import CatalogRule from "../catalog-rule.js";

export default class RequireHdsArguments extends CatalogRule {
  visitor() {
    const extension = path.extname(this.filePath ?? "");
    if (extension !== ".hbs" && extension !== ".gjs") {
      return {};
    }

    return {
      ElementNode(node) {
        const isClassicInvocation =
          typeof node.tag === "string" && node.tag.startsWith("Hds::");
        if (
          (extension === ".hbs" && !isClassicInvocation) ||
          (extension === ".gjs" && isClassicInvocation)
        ) {
          return;
        }

        const component = this.hdsComponent(node);
        if (!component) {
          return;
        }

        const providedArguments = new Set(
          node.attributes
            .filter((attribute) => attribute.name.startsWith("@"))
            .map((attribute) => attribute.name.slice(1)),
        );
        const missingArguments = component.args
          .filter(
            (argument) =>
              argument.required === true &&
              !providedArguments.has(argument.name),
          )
          .map((argument) => `@${argument.name}`)
          .sort();

        if (missingArguments.length === 0) {
          return;
        }

        const noun = missingArguments.length === 1 ? "argument" : "arguments";
        this.log({
          message: `Missing required ${noun} ${missingArguments.join(", ")} on <${component.name}>.`,
          node,
        });
      },
    };
  }
}
