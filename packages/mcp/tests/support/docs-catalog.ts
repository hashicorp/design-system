/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// a hand-built docs catalog small enough to assert whole, shaped exactly like the generated one

import type {
  DocsCatalog,
  DocsChunk,
  DocsPage,
} from "../../src/stores/docs/schema.js";

export const BUNDLED_AT = "2026-08-20T01:49:55.082Z";
export const SITE_BASE_URL = "https://helios.hashicorp.design/";

export const BUTTON_ROUTE = "components/button";
export const BUTTON_GUIDELINES_CHUNK_ID = `${BUTTON_ROUTE}#guidelines/usage/when-to-use`;
export const BUTTON_HOW_TO_CHUNK_ID = `${BUTTON_ROUTE}#code/how-to-use-this-component`;
export const BUTTON_FULL_WIDTH_CHUNK_ID = `${BUTTON_HOW_TO_CHUNK_ID}/full-width`;
export const BUTTON_ACCESSIBILITY_CHUNK_ID = `${BUTTON_ROUTE}#accessibility`;
export const BUTTON_VERSION_CHUNK_ID = `${BUTTON_ROUTE}#version-history/2-1-0`;
export const BADGE_CHUNK_ID = "components/badge#guidelines";
export const COLORS_CHUNK_ID =
  "foundations/colors#guidelines/accessible-color-combinations";
export const COPY_CHUNK_ID = "components/copy";
export const COPY_BUTTON_CHUNK_ID = "components/copy/button#code";

export const buildDocsChunk = (
  overrides: Partial<DocsChunk> = {},
): DocsChunk => ({
  id: BUTTON_FULL_WIDTH_CHUNK_ID,
  url: `${SITE_BASE_URL}${BUTTON_ROUTE}?tab=code#full-width`,
  content: [
    "### Full-width",
    "",
    "This indicates that the Button should take up the full-width of the parent container.",
    "",
    "```handlebars",
    '<Hds::Button @text="Full width button" @isFullWidth={{true}} />',
    "```",
  ].join("\n"),
  text: "Full-width This indicates that the Button should take up the full-width of the parent container.",
  tab: "Code",
  headingTrail: ["How to use this component", "Full-width"],
  level: 3,
  symbols: ["@isFullWidth", "@text", "Hds::Button"],
  ...overrides,
});

export const buildDocsPage = (overrides: Partial<DocsPage> = {}): DocsPage => ({
  route: BUTTON_ROUTE,
  section: "components",
  title: "Button",
  url: `${SITE_BASE_URL}${BUTTON_ROUTE}`,
  caption: "An interactive element that initiates an action.",
  description:
    "An interactive element that initiates an action or event, such as a form submission.",
  keywords: ["action", "cta"],
  related: ["components/button-set"],
  links: {
    github: "https://github.com/hashicorp/design-system/tree/main/button",
    figma: "https://www.figma.com/design/hds-components",
  },
  status: { updated: "2.1.0" },
  chunks: [buildDocsChunk()],
  ...overrides,
});

const buildButtonPage = (): DocsPage =>
  buildDocsPage({
    chunks: [
      buildDocsChunk({
        id: BUTTON_GUIDELINES_CHUNK_ID,
        url: `${SITE_BASE_URL}${BUTTON_ROUTE}#when-to-use`,
        content:
          "### When to use\n\nUse a Button to trigger an action such as submitting a form.",
        text: "When to use Use a Button to trigger an action such as submitting a form.",
        tab: "Guidelines",
        headingTrail: ["Usage", "When to use"],
        level: 3,
        symbols: [],
      }),
      buildDocsChunk({
        id: BUTTON_HOW_TO_CHUNK_ID,
        url: `${SITE_BASE_URL}${BUTTON_ROUTE}?tab=code#how-to-use-this-component`,
        content:
          "## How to use this component\n\nThe Button renders a button element by default.",
        text: "How to use this component The Button renders a button element by default.",
        tab: "Code",
        headingTrail: ["How to use this component"],
        level: 2,
        symbols: [],
      }),
      buildDocsChunk(),
      buildDocsChunk({
        id: BUTTON_ACCESSIBILITY_CHUNK_ID,
        url: `${SITE_BASE_URL}${BUTTON_ROUTE}?tab=accessibility`,
        content:
          "Ensure the accessible name of a Button describes its outcome.",
        text: "Ensure the accessible name of a Button describes its outcome.",
        tab: "Accessibility",
        headingTrail: undefined,
        level: undefined,
        symbols: [],
      }),
      buildDocsChunk({
        id: BUTTON_VERSION_CHUNK_ID,
        url: `${SITE_BASE_URL}${BUTTON_ROUTE}?tab=version%20history#210`,
        content: "## 2.1.0\n\nAdded the isFullWidth argument.",
        text: "2.1.0 Added the isFullWidth argument.",
        tab: "Version history",
        headingTrail: ["2.1.0"],
        level: 2,
        symbols: [],
      }),
    ],
  });

const buildBadgePage = (): DocsPage =>
  buildDocsPage({
    route: "components/badge",
    title: "Badge",
    url: `${SITE_BASE_URL}components/badge`,
    caption: "A short label.",
    description: "A short, non-interactive label describing a status.",
    // the cross-vocabulary synonyms that only ever appear in page metadata
    keywords: ["chip", "pill"],
    related: [],
    links: undefined,
    status: undefined,
    chunks: [
      buildDocsChunk({
        id: BADGE_CHUNK_ID,
        url: `${SITE_BASE_URL}components/badge`,
        content: "A Badge highlights the status of an item.",
        text: "A Badge highlights the status of an item.",
        tab: "Guidelines",
        headingTrail: undefined,
        level: undefined,
        symbols: [],
      }),
    ],
  });

const buildColorsPage = (): DocsPage =>
  buildDocsPage({
    route: "foundations/colors",
    section: "foundations",
    title: "Colors",
    url: `${SITE_BASE_URL}foundations/colors`,
    caption: "The Helios color palette.",
    description: "The color palette and how to combine its values accessibly.",
    keywords: ["palette"],
    related: [],
    links: undefined,
    status: undefined,
    chunks: [
      buildDocsChunk({
        id: COLORS_CHUNK_ID,
        url: `${SITE_BASE_URL}foundations/colors#accessible-color-combinations`,
        content:
          "### Accessible color combinations\n\nCheck the contrast ratio of every color combination.",
        text: "Accessible color combinations Check the contrast ratio of every color combination.",
        tab: "Guidelines",
        headingTrail: ["Accessible color combinations"],
        level: 3,
        symbols: [],
      }),
    ],
  });

// a route that prefixes another route, which is what makes child lookup by id alone unsafe
const buildCopyPages = (): DocsPage[] => [
  buildDocsPage({
    route: "components/copy",
    title: "Copy",
    url: `${SITE_BASE_URL}components/copy`,
    caption: undefined,
    description: "Components for copying a value to the clipboard.",
    keywords: [],
    related: [],
    links: undefined,
    status: undefined,
    chunks: [
      buildDocsChunk({
        id: COPY_CHUNK_ID,
        url: `${SITE_BASE_URL}components/copy`,
        content: "Copy components put a value on the clipboard.",
        text: "Copy components put a value on the clipboard.",
        tab: undefined,
        headingTrail: undefined,
        level: undefined,
        symbols: [],
      }),
    ],
  }),
  buildDocsPage({
    route: "components/copy/button",
    title: "Copy::Button",
    url: `${SITE_BASE_URL}components/copy/button`,
    caption: undefined,
    description: "A button that copies a value to the clipboard.",
    keywords: [],
    related: [],
    links: undefined,
    status: undefined,
    chunks: [
      buildDocsChunk({
        id: COPY_BUTTON_CHUNK_ID,
        url: `${SITE_BASE_URL}components/copy/button?tab=code`,
        content: "The Copy Button copies its value on click.",
        text: "The Copy Button copies its value on click.",
        tab: "Code",
        headingTrail: undefined,
        level: undefined,
        symbols: [],
      }),
    ],
  }),
];

export const buildDocsCatalog = (
  overrides: Partial<DocsCatalog> = {},
): DocsCatalog => {
  const pages = [
    buildButtonPage(),
    buildBadgePage(),
    buildColorsPage(),
    ...buildCopyPages(),
  ];

  return {
    bundledAt: BUNDLED_AT,
    siteBaseUrl: SITE_BASE_URL,
    pages: Object.fromEntries(pages.map((page) => [page.route, page])),
    ...overrides,
  };
};
