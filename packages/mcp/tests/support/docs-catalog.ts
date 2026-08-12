/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { DocsCatalog } from "../../src/tools/docs/store/schema.js";

export const buildDocsCatalog = (): DocsCatalog => ({
  version: 1,
  pages: [
    {
      id: "components/button/index",
      url: "/components/button",
      title: "Button",
      keywords: ["action"],
      scope: "components",
      sections: [
        {
          id: "guidelines--usage",
          heading: "Usage",
          anchor: "usage",
          tab: "Guidelines",
          markdown: "## Usage\n\nUse buttons to trigger actions.",
        },
        {
          id: "code--component-api",
          heading: "Component API",
          anchor: "component-api",
          tab: "Code",
          markdown: "## Component API\n\nThe `@text` argument is required.",
        },
      ],
    },
    {
      id: "patterns/forms/index",
      url: "/patterns/forms",
      title: "Forms",
      keywords: [],
      scope: "patterns",
      sections: [
        {
          id: "page--actions",
          heading: "Actions",
          anchor: "actions",
          markdown: "## Actions\n\nForms contain actions.",
        },
      ],
    },
  ],
});
