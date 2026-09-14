import { Rule } from "ember-template-lint";

import { loadCatalog } from "./catalog.js";

export default class CatalogRule extends Rule {
  constructor(options) {
    super(options);

    const config =
      this.config === true || this.config === undefined ? {} : this.config;
    if (
      config === null ||
      typeof config !== "object" ||
      Array.isArray(config)
    ) {
      throw new Error(
        `${this.ruleName} expects true or an object containing catalogPath`,
      );
    }

    const unknownOptions = Object.keys(config).filter(
      (option) => option !== "catalogPath",
    );
    if (unknownOptions.length > 0) {
      throw new Error(
        `${this.ruleName} received unknown option(s): ${unknownOptions.join(", ")}`,
      );
    }

    this.catalog = loadCatalog(this.workingDir, config.catalogPath);
    this.components = new Map(
      this.catalog.components.map((component) => [component.name, component]),
    );
  }

  hdsComponent(node) {
    if (typeof node.tag !== "string" || !node.tag.startsWith("Hds::")) {
      return undefined;
    }
    return this.components.get(node.tag);
  }
}
