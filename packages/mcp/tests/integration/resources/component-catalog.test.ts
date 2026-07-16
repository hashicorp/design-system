/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { loadComponentCatalog } from "../../../src/resources/components/store/index.js";

describe("component catalog", () => {
  it("loads the source catalog and resolves public names", () => {
    const store = loadComponentCatalog();
    const meta = store.getMeta();

    expect(meta.totalComponentCount).toBeGreaterThan(0);
    expect(store.listComponents()).toHaveLength(meta.totalComponentCount);
    expect(store.getComponentByName("HdsAccordion")?.name).toBe(
      "HdsAccordion",
    );
    expect(store.getComponentByName("accordion")?.name).toBe("HdsAccordion");
    expect(store.getComponentByName("HDS-ACCORDION")?.name).toBe(
      "HdsAccordion",
    );
  });
});
