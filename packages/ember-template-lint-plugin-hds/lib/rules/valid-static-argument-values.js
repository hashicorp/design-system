import CatalogRule from "../catalog-rule.js";
import { valueAliases } from "../policies.js";
import {
  closestUniqueMatch,
  staticStringValue,
  uniqueCaseInsensitiveMatch,
} from "../utils.js";

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
          const staticValue = staticStringValue(attribute);
          if (!argument || !staticValue) {
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

          if (allowedValues.includes(staticValue.value)) {
            continue;
          }

          const aliases = valueAliases.find(
            (policy) =>
              policy.component === component.name &&
              policy.argument === argument.name,
          )?.aliases;
          const alias =
            aliases && Object.hasOwn(aliases, staticValue.value)
              ? aliases[staticValue.value]
              : undefined;
          const suggestion =
            alias ??
            uniqueCaseInsensitiveMatch(staticValue.value, allowedValues) ??
            closestUniqueMatch(staticValue.value, allowedValues);
          const suggestionMessage = suggestion
            ? ` Did you mean "${suggestion}"?`
            : "";

          if (this.mode === "fix" && suggestion) {
            staticValue.replace(suggestion);
          } else {
            this.log({
              message: `Invalid value "${staticValue.value}" for <${node.tag}> @${argument.name}. Allowed values: ${allowedValues.join(", ")}.${suggestionMessage}`,
              node: attribute,
              isFixable: Boolean(suggestion),
            });
          }
        }
      },
    };
  }
}
