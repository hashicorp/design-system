import CatalogRule from "../catalog-rule.js";
import { valueAliases } from "../policies.js";
import { closestUniqueMatch, uniqueCaseInsensitiveMatch } from "../utils.js";

export default class ValidStaticArgumentValues extends CatalogRule {
  visitor() {
    return {
      ElementNode(node) {
        const component = this.hdsComponent(node);
        if (!component) {
          return;
        }

        const argumentsByName = new Map(
          component.args.map((argument) => [argument.name, argument]),
        );

        for (const attribute of node.attributes) {
          const argument = argumentsByName.get(attribute.name.slice(1));
          const resolvedValue = this.resolvedArgumentValue(attribute);
          if (!argument || !resolvedValue) {
            continue;
          }

          const allowedValues =
            argument.values ??
            (argument.valuesRef
              ? this.catalog.valueSets[argument.valuesRef]
              : undefined);
          if (!Array.isArray(allowedValues)) {
            if (argument.valuesRef) {
              throw new Error(
                `Invalid HDS component catalog: unresolved valuesRef "${argument.valuesRef}" for ${component.name} @${argument.name}`,
              );
            }
            continue;
          }

          if (allowedValues.includes(resolvedValue.value)) {
            continue;
          }

          const aliases = valueAliases.find(
            (policy) =>
              policy.component === component.name &&
              policy.argument === argument.name,
          )?.aliases;
          const alias =
            aliases && Object.hasOwn(aliases, resolvedValue.value)
              ? aliases[resolvedValue.value]
              : undefined;
          const suggestion =
            alias ??
            uniqueCaseInsensitiveMatch(resolvedValue.value, allowedValues) ??
            closestUniqueMatch(resolvedValue.value, allowedValues);
          const suggestionMessage = suggestion
            ? ` Did you mean "${suggestion}"?`
            : "";
          const backingMessage =
            resolvedValue.source === "backing"
              ? ` Resolved backing member this.${resolvedValue.member} to "${resolvedValue.value}".`
              : "";
          const canFix =
            resolvedValue.source === "inline" &&
            typeof resolvedValue.replace === "function" &&
            suggestion !== undefined;

          if (this.mode === "fix" && canFix) {
            resolvedValue.replace(suggestion);
          } else {
            this.log({
              message: `Invalid value "${resolvedValue.value}" for <${node.tag}> @${argument.name}.${backingMessage} Allowed values: ${allowedValues.join(", ")}.${suggestionMessage}`,
              node: attribute,
              isFixable: canFix,
            });
          }
        }
      },
    };
  }
}
