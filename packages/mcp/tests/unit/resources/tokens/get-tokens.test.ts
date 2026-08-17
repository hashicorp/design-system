/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";
import { createGetTokensResource } from "../../../../src/resources/tokens/get-tokens.js";
import { createTokenCatalogStore } from "../../../../src/resources/tokens/store/index.js";
import {
  getTextContent,
  parseResourceJson,
} from "../../../support/resource-content.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";
import { buildTokenCatalogRow } from "../../../support/token-catalog.js";

describe("createGetTokensResource", () => {
  it("reads from the injected store provider", async () => {
    const store = createTokenCatalogStore([buildTokenCatalogRow()]);
    const getStore = vi.fn(() => store);
    const resource = createGetTokensResource(getStore);

    if (!("uri" in resource)) {
      throw new Error("Expected a static token resource");
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
      totalTokenCount: 1,
    });
  });
});
