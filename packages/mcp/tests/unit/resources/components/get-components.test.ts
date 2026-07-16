/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";
import { createGetComponentsResource } from "../../../../src/resources/components/get-components.js";
import { createComponentCatalogStore } from "../../../../src/resources/components/store/index.js";
import { buildComponentCatalog } from "../../../support/component-catalog.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";

describe("createGetComponentsResource", () => {
  it("reads from the injected store provider", async () => {
    const store = createComponentCatalogStore(buildComponentCatalog());
    const getStore = vi.fn(() => store);
    const resource = createGetComponentsResource(getStore);

    if (!("uri" in resource)) {
      throw new Error("Expected a static component resource");
    }

    const result = await resource.readCallback(
      new URL(resource.uri),
      buildRequestHandlerExtra(),
    );
    const content = result.contents[0];

    if (content === undefined) {
      throw new Error("Expected resource content");
    }

    expect(getStore).toHaveBeenCalledOnce();
    expect(parseResourceJson(getTextContent(content))).toMatchObject({
      totalComponentCount: 1,
    });
  });
});
