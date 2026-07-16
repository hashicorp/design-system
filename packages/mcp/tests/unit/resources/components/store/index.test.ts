/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createComponentCatalogStore,
  parseComponentCatalog,
} from "../../../../../src/resources/components/store/index.js";
import {
  buildComponentCatalog,
  buildComponentCatalogComponent,
} from "../../../../support/component-catalog.js";

describe("parseComponentCatalog", () => {
  it("accepts a valid component catalog", () => {
    expect(parseComponentCatalog(buildComponentCatalog())).toStrictEqual(
      buildComponentCatalog(),
    );
  });

  it("rejects an invalid component catalog", () => {
    expect(() =>
      parseComponentCatalog({ updatedAt: "not-a-date", components: [] }),
    ).toThrow();
  });
});

describe("createComponentCatalogStore", () => {
  const catalog = buildComponentCatalog({
    components: [
      buildComponentCatalogComponent(),
      buildComponentCatalogComponent({
        name: "HdsAccordion",
        description: "An accordion component.",
      }),
    ],
  });

  it("returns catalog metadata and component summaries", () => {
    const store = createComponentCatalogStore(catalog);

    expect(store.getMeta()).toStrictEqual({
      updatedAt: catalog.updatedAt,
      totalComponentCount: 2,
    });
    expect(store.listComponents()).toStrictEqual([
      { name: "HdsButton", description: "A button component." },
      { name: "HdsAccordion", description: "An accordion component." },
    ]);
  });

  it("resolves normalized component names", () => {
    const store = createComponentCatalogStore(catalog);

    expect(store.getComponentByName("HDSBUTTON")?.name).toBe("HdsButton");
    expect(store.getComponentByName(" button ")?.name).toBe("HdsButton");
    expect(store.getComponentByName("hds:accordion")?.name).toBe(
      "HdsAccordion",
    );
    expect(store.getComponentByName("missing")).toBeNull();
  });
});
