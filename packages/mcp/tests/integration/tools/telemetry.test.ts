/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// what each tool adds to its `tool_called` event, through the same registration path a real
// server uses, and what it must never send

import { describe, expect, it } from "vitest";
import { createComponentCatalogStore } from "../../../src/stores/components/index.js";
import { createDocsCatalogStore } from "../../../src/stores/docs/index.js";
import {
  createIconCatalogStore,
  parseIconCatalog,
} from "../../../src/stores/hds-icons/index.js";
import { createTokenCatalogStore } from "../../../src/stores/tokens/index.js";
import { createGetComponentTool } from "../../../src/tools/components/get-component.js";
import { createSearchComponentsTool } from "../../../src/tools/components/search-components.js";
import { createReadDocTool } from "../../../src/tools/docs/read-doc.js";
import { createSearchDocsTool } from "../../../src/tools/docs/search-docs.js";
import { createSearchIconsTool } from "../../../src/tools/hds-icons/search-icons.js";
import { createSearchTokensTool } from "../../../src/tools/tokens/search-tokens.js";
import { buildComponentCatalogEntry } from "../../support/component-catalog.js";
import {
  BUTTON_FULL_WIDTH_CHUNK_ID,
  BUTTON_ROUTE,
  buildDocsCatalog,
} from "../../support/docs-catalog.js";
import { buildIconAsset } from "../../support/hds-icon-catalog.js";
import {
  createRecordingTelemetry,
  getSentValues,
} from "../../support/recording-telemetry.js";
import { buildRequestHandlerExtra } from "../../support/request-handler.js";
import { buildTokenCatalogRow } from "../../support/token-catalog.js";
import { captureToolRegistrations } from "../../support/tool-registration.js";

import type { ToolRegistration } from "../../../src/tools/define-tool.js";
import type { TelemetryProperties } from "../../../src/telemetry/types.js";

// free text a caller could plausibly send that names something private
const PRIVATE_TEXT = "Acme";

const componentStore = createComponentCatalogStore({
  components: [
    buildComponentCatalogEntry({
      name: "Hds::Button",
      modulePath: "hds/button",
      docsPath: "components/button",
      args: [
        {
          name: "icon",
          type: "string",
          required: false,
          values: Array.from({ length: 40 }, (_value, index) => `i-${index}`),
        },
      ],
    }),
    buildComponentCatalogEntry({
      name: "Hds::ButtonSet",
      modulePath: "hds/button-set",
      docsPath: "components/button-set",
      args: [],
    }),
  ],
});
const docsStore = createDocsCatalogStore(buildDocsCatalog());
const iconStore = createIconCatalogStore(
  parseIconCatalog({ assets: [buildIconAsset()] }),
);
const tokenStore = createTokenCatalogStore([
  buildTokenCatalogRow(),
  buildTokenCatalogRow({
    key: "{color.foreground.action}",
    $type: "color",
    $value: "#1060ff",
    name: "token-color-foreground-action",
    attributes: { category: "color" },
    path: ["color", "foreground", "action"],
  }),
]);

const callTool = async (
  tool: ToolRegistration,
  args: Record<string, unknown>,
): Promise<TelemetryProperties> => {
  const { telemetry, events } = createRecordingTelemetry();
  const [{ callback }] = captureToolRegistrations((server) =>
    tool.register(server, telemetry),
  );

  await callback(args, buildRequestHandlerExtra());

  expect(events).toHaveLength(1);

  return events[0].properties;
};

const expectNeverSent = (properties: TelemetryProperties, text: string) => {
  const sent = JSON.stringify(getSentValues([{ event: "", properties }]));

  expect(sent).not.toContain(text);
};

describe("get_hds_component telemetry", () => {
  const tool = createGetComponentTool(() => componentStore);

  it("reports the catalog name a hit resolved to and its capped arguments", async () => {
    const properties = await callTool(tool, { name: "hds/button" });

    expect(properties).toMatchObject({
      outcome: "ok",
      requestedNameForm: "module",
      component: "Hds::Button",
      truncatedArgCount: 1,
    });
  });

  it("reports a missed hds name in its invocation form, with the top suggestion", async () => {
    const properties = await callTool(tool, { name: "hds::buton" });

    expect(properties).toMatchObject({
      outcome: "miss",
      requestedNameForm: "invocation",
      requestedName: "Hds::Buton",
      suggestionCount: expect.any(Number),
      topSuggestion: "Hds::Button",
    });
  });

  it("never sends a missed name that is not shaped like an hds name", async () => {
    const properties = await callTool(tool, {
      name: `${PRIVATE_TEXT}BillingTable`,
    });

    expect(properties).toMatchObject({
      outcome: "miss",
      requestedNameForm: "other",
    });
    expect(properties).not.toHaveProperty("requestedName");
    expectNeverSent(properties, PRIVATE_TEXT);
  });
});

describe("search_hds_components telemetry", () => {
  it("reports the query's shape and the top result, never the query", async () => {
    const properties = await callTool(
      createSearchComponentsTool(() => componentStore),
      { query: `button for ${PRIVATE_TEXT}`, limit: 5 },
    );

    expect(properties).toMatchObject({
      queryLength: 15,
      queryWordCount: 3,
      limit: 5,
    });
    expectNeverSent(properties, PRIVATE_TEXT);
  });
});

describe("search_hds_docs telemetry", () => {
  const tool = createSearchDocsTool(() => docsStore);

  it("reports term counts and the top passage, never the terms", async () => {
    const properties = await callTool(tool, {
      query: `full width button ${PRIVATE_TEXT}`,
      limit: 3,
    });

    expect(properties).toMatchObject({
      queryWordCount: 4,
      matchedTermCount: expect.any(Number),
      unmatchedTermCount: 1,
      anchoredResultCount: expect.any(Number),
      limit: 3,
      topDocsPath: BUTTON_ROUTE,
      topScore: expect.any(Number),
      topPageAnchored: expect.any(Boolean),
    });
    expectNeverSent(properties, PRIVATE_TEXT);
  });

  it("reports which filter kinds missed, never the values that missed", async () => {
    const properties = await callTool(tool, {
      query: "button",
      limit: 3,
      tab: "Code",
      section: `${PRIVATE_TEXT}-internal`,
    });

    expect(properties).toMatchObject({
      unknownFilterKinds: "section",
      filterTab: "code",
    });
    expect(properties).not.toHaveProperty("filterSection");
    expectNeverSent(properties, PRIVATE_TEXT);
  });
});

describe("read_hds_docs telemetry", () => {
  const tool = createReadDocTool(() => docsStore);

  it("reports the page read, the byte budget and how much of it was used", async () => {
    const properties = await callTool(tool, {
      id: BUTTON_FULL_WIDTH_CHUNK_ID,
      includeChildren: false,
      maxBytes: 16000,
    });

    expect(properties).toMatchObject({
      outcome: "ok",
      docsPath: BUTTON_ROUTE,
      maxBytes: 16000,
      includeChildren: false,
      contentBytes: expect.any(Number),
      childChunkCount: expect.any(Number),
      omittedChunkCount: 0,
      truncated: false,
    });
  });

  it("reports the real page behind a stale heading anchor", async () => {
    const properties = await callTool(tool, {
      id: `${BUTTON_ROUTE}#${PRIVATE_TEXT}-notes`,
      includeChildren: false,
      maxBytes: 16000,
    });

    expect(properties).toMatchObject({
      outcome: "miss",
      knownPage: true,
      requestedDocsPath: BUTTON_ROUTE,
      topSuggestion: expect.stringContaining(BUTTON_ROUTE),
    });
    expectNeverSent(properties, PRIVATE_TEXT);
  });

  it("never sends an id that names no page", async () => {
    const properties = await callTool(tool, {
      id: `${PRIVATE_TEXT}/billing#overview`,
      includeChildren: true,
      maxBytes: 500,
    });

    expect(properties).toMatchObject({
      outcome: "miss",
      knownPage: false,
      includeChildren: true,
      maxBytes: 500,
    });
    expect(properties).not.toHaveProperty("requestedDocsPath");
    expectNeverSent(properties, PRIVATE_TEXT);
  });
});

describe("search_hds_icons telemetry", () => {
  const tool = createSearchIconsTool(() => iconStore);

  it("reports the top icon and the filters that resolved", async () => {
    const properties = await callTool(tool, {
      query: "alert",
      limit: 10,
      category: "Alerts",
      size: "16",
      hasMapping: false,
    });

    expect(properties).toMatchObject({
      topResult: "alert-triangle",
      filterCategory: "Alerts",
      filterSize: "16",
      filterHasMapping: false,
    });
    expect(properties).not.toHaveProperty("unknownFilterKinds");
  });

  it("never sends a filter value the catalog does not know", async () => {
    const properties = await callTool(tool, {
      query: "alert",
      limit: 10,
      category: PRIVATE_TEXT,
    });

    expect(properties).toMatchObject({ unknownFilterKinds: "category" });
    expect(properties).not.toHaveProperty("filterCategory");
    expectNeverSent(properties, PRIVATE_TEXT);
  });
});

describe("search_hds_tokens telemetry", () => {
  const tool = createSearchTokensTool(() => tokenStore);

  it("flags a search by color value and reports the token it found", async () => {
    const properties = await callTool(tool, { query: "#1060ff", limit: 10 });

    expect(properties).toMatchObject({
      queryIsHexColor: true,
      topResult: "{color.foreground.action}",
    });
  });

  it("reports the closed type filter but never an unknown category", async () => {
    const properties = await callTool(tool, {
      query: "radius",
      limit: 10,
      type: "dimension",
      category: PRIVATE_TEXT,
    });

    expect(properties).toMatchObject({
      queryIsHexColor: false,
      filterType: "dimension",
      unknownFilterKinds: "category",
    });
    expect(properties).not.toHaveProperty("filterCategory");
    expectNeverSent(properties, PRIVATE_TEXT);
  });
});
