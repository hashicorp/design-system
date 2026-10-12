/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentCatalogEntry } from "../../src/stores/components/schema.js";

export const buildComponentCatalogEntry = (
  overrides: Partial<ComponentCatalogEntry> = {},
): ComponentCatalogEntry => ({
  name: "Hds::Button",
  modulePath: "hds/button",
  docsPath: "components/button",
  element: "HTMLAnchorElement | HTMLButtonElement",
  args: [
    {
      name: "size",
      type: '"small" | "medium" | "large"',
      required: false,
      values: ["small", "medium", "large"],
      inheritedFrom: "hds/interactive",
    },
  ],
  blocks: [
    {
      name: "default",
      yields: [],
    },
  ],
  ...overrides,
});
