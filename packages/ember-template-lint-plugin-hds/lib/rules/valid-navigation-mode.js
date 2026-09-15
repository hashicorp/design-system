import CatalogRule from "../catalog-rule.js";

const NAVIGATION_COMPONENTS = new Set([
  "Hds::Button",
  "Hds::Dropdown::ListItem::Interactive",
  "Hds::Interactive",
  "Hds::Link::Inline",
  "Hds::Link::Standalone",
]);

const LINK_COMPONENTS = new Set(["Hds::Link::Inline", "Hds::Link::Standalone"]);

export default class ValidNavigationMode extends CatalogRule {
  visitor() {
    return {
      ElementNode(node) {
        const component = this.hdsComponent(node);
        if (!component || !NAVIGATION_COMPONENTS.has(component.name)) {
          return;
        }

        const attributes = new Map(
          node.attributes
            .filter((attribute) => attribute.name.startsWith("@"))
            .map((attribute) => [attribute.name.slice(1), attribute]),
        );
        const href = attributes.get("href");
        const route = attributes.get("route");

        if (href && route) {
          this.log({
            message: `${component.name} cannot receive both @href and @route; provide only one navigation target.`,
            node: route,
          });
        }

        const isHrefExternal = attributes.get("isHrefExternal");
        if (isHrefExternal && !href) {
          this.log({
            message: `${component.name} cannot receive @isHrefExternal without @href.`,
            node: isHrefExternal,
          });
        }

        const isRouteExternal = attributes.get("isRouteExternal");
        if (isRouteExternal && !route) {
          this.log({
            message: `${component.name} cannot receive @isRouteExternal without @route.`,
            node: isRouteExternal,
          });
        }

        if (LINK_COMPONENTS.has(component.name) && !href && !route) {
          this.log({
            message: `${component.name} requires either @href or @route.`,
            node,
          });
        }
      },
    };
  }
}
