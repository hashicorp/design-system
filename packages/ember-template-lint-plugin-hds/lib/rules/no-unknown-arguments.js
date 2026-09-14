import CatalogRule from "../catalog-rule.js";
import { closestUniqueMatch } from "../utils.js";

export default class NoUnknownArguments extends CatalogRule {
  visitor() {
    return {
      ElementNode(node) {
        const component = this.hdsComponent(node);
        if (!component) {
          return;
        }

        const validArguments = component.args.map((argument) => argument.name);
        const providedArguments = new Set(
          node.attributes
            .filter((attribute) => attribute.name.startsWith("@"))
            .map((attribute) => attribute.name.slice(1)),
        );
        for (const attribute of node.attributes) {
          if (!attribute.name.startsWith("@")) {
            continue;
          }

          const argumentName = attribute.name.slice(1);
          if (validArguments.includes(argumentName)) {
            continue;
          }

          const suggestion = closestUniqueMatch(argumentName, validArguments);
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
      },
    };
  }
}
