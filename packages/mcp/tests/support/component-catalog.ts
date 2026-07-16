/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type {
  ComponentCatalog,
  ComponentCatalogComponent,
} from "../../src/catalogs/components/schema.js";

export const buildComponentCatalogComponent = (
  overrides: Partial<ComponentCatalogComponent> = {},
): ComponentCatalogComponent => ({
  name: "HdsButton",
  description: "A button component.",
  args: [
    {
      name: "text",
      type: "string",
      required: true,
      description: "The button text.",
    },
  ],
  ...overrides,
});

export const buildComponentCatalog = (
  overrides: Partial<ComponentCatalog> = {},
): ComponentCatalog => ({
  updatedAt: "2026-07-01T20:25:05.109Z",
  components: [buildComponentCatalogComponent()],
  ...overrides,
});
