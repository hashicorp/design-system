import CatalogRule from "../catalog-rule.js";
import policies from "../policies.js";

export default class ValidArgumentCombinations extends CatalogRule {
  visitor() {
    return {
      ElementNode(node) {
        if (!this.hdsComponent(node)) {
          return;
        }

        const attributes = new Map(
          node.attributes
            .filter((attribute) => attribute.name.startsWith("@"))
            .map((attribute) => [attribute.name.slice(1), attribute]),
        );

        for (const policy of policies) {
          if (policy.component !== node.tag) {
            continue;
          }

          const trigger = attributes.get(policy.when.argument);
          const resolvedValue = this.resolvedArgumentValue(trigger);
          if (resolvedValue?.value !== policy.when.equals) {
            continue;
          }

          const missing = policy.requires.filter(
            (argument) => !attributes.has(argument),
          );
          if (missing.length > 0) {
            const backingMessage =
              resolvedValue.source === "backing"
                ? ` Resolved backing member this.${resolvedValue.member} to "${resolvedValue.value}".`
                : "";
            this.log({
              message: `${policy.message}${backingMessage} Missing: ${missing.map((argument) => `@${argument}`).join(", ")}`,
              node: trigger,
            });
          }
        }
      },
    };
  }
}
