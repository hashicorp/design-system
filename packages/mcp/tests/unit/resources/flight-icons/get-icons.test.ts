/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it, vi } from "vitest";
import { createGetIconsResource } from "../../../../src/resources/flight-icons/get-icons.js";
import { createIconCatalogStore } from "../../../../src/resources/flight-icons/store/index.js";
import { buildIconAsset } from "../../../support/flight-icon-catalog.js";
import { buildRequestHandlerExtra } from "../../../support/request-handler.js";

describe("createGetIconsResource", () => {
  it("loads the injected store when the resource is read", async () => {
    const store = createIconCatalogStore({ assets: [buildIconAsset()] });
    const getStore = vi.fn(() => store);
    const resource = createGetIconsResource(getStore);

    if (!("uri" in resource)) {
      throw new Error("Expected a static icons resource");
    }

    expect(getStore).not.toHaveBeenCalled();
    await resource.readCallback(
      new URL("hds://icons"),
      buildRequestHandlerExtra(),
    );
    expect(getStore).toHaveBeenCalledOnce();
  });
});
