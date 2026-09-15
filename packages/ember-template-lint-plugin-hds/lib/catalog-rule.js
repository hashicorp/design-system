import { Rule } from "ember-template-lint";

import {
  backingMemberForAttribute,
  resolveBackingValues,
} from "./backing-values.js";
import { loadCatalog } from "./catalog.js";
import { staticStringValue } from "./utils.js";

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
    this.backingValues = undefined;
  }

  hdsComponent(node) {
    if (typeof node.tag !== "string" || !node.tag.startsWith("Hds::")) {
      return undefined;
    }
    return this.components.get(node.tag);
  }

  resolvedArgumentValue(attribute) {
    const inlineValue = staticStringValue(attribute);
    if (inlineValue) {
      return { ...inlineValue, source: "inline" };
    }

    const member = backingMemberForAttribute(attribute);
    if (!member) {
      return undefined;
    }
    this.backingValues ??= resolveBackingValues(
      this.workingDir,
      this.filePath,
      this.source.join(""),
    );
    const value = this.backingValues.get(member);
    return value === undefined
      ? undefined
      : { value, source: "backing", member };
  }
}
