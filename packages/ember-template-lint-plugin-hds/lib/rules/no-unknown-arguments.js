import CatalogRule from "../catalog-rule.js";
import {
  attributeAliases,
  diagnosticOnlyArgumentPolicies,
} from "../policies.js";
import { closestUniqueMatch } from "../utils.js";

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
            const destinations = aliasPolicy.destinations.filter(
              (destination) =>
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
      },
    };
  }
}
