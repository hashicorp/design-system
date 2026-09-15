import CatalogRule from "../catalog-rule.js";

const TEXT_COMPONENTS = new Set([
  "Hds::Text::Body",
  "Hds::Text::Code",
  "Hds::Text::Display",
]);

export default class RequireTextTag extends CatalogRule {
  visitor() {
    return {
      ElementNode(node) {
        const component = this.hdsComponent(node);
        if (
          TEXT_COMPONENTS.has(component?.name) &&
          !node.attributes.some((attribute) => attribute.name === "@tag")
        ) {
          this.log({
            message: `<${node.tag}> requires an explicit semantic @tag.`,
            node,
          });
        }
      },
    };
  }
}
