/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createComponentCatalogStore,
  parseComponentCatalog,
} from "../../../../../src/resources/components/store/index.js";
import { buildComponentCatalogEntry } from "../../../../support/component-catalog.js";

describe("parseComponentCatalog", () => {
  it("accepts entries with and without the optional keys", () => {
    const catalog = parseComponentCatalog({
      components: [
        buildComponentCatalogEntry(),
        buildComponentCatalogEntry({
          name: "Hds::AdvancedTable::Th",
          modulePath: "hds/advanced-table/th",
          docsPath: undefined,
          element: undefined,
          args: [],
          blocks: [],
        }),
      ],
    });

    expect(catalog.components).toHaveLength(2);
  });

  it("rejects an invalid catalog entry", () => {
    expect(() =>
      parseComponentCatalog({ components: [{ name: "Hds::Button" }] }),
    ).toThrow();
  });

  it("rejects a catalog without a components array", () => {
    expect(() => parseComponentCatalog({})).toThrow();
  });
});

describe("createComponentCatalogStore", () => {
  const catalog = {
    components: [
      buildComponentCatalogEntry(),
      buildComponentCatalogEntry({
        name: "Hds::AdvancedTable::Th",
        modulePath: "hds/advanced-table/th",
        docsPath: "components/table/advanced-table",
        element: "HTMLTableCellElement",
        args: [],
        blocks: [{ name: "default", yields: [] }],
      }),
    ],
  };

  it("resolves a component by name, case-insensitively and without the namespace", () => {
    const store = createComponentCatalogStore(catalog);

    expect(store.getComponentByName("Hds::Button")?.name).toBe("Hds::Button");
    expect(store.getComponentByName("  hds::BUTTON  ")?.name).toBe(
      "Hds::Button",
    );
    expect(store.getComponentByName("button")?.name).toBe("Hds::Button");
    expect(store.getComponentByName("AdvancedTable::Th")?.name).toBe(
      "Hds::AdvancedTable::Th",
    );
    expect(store.getComponentByName("not-a-component")).toBeNull();
  });

  it("returns thin summaries without args, blocks, or element", () => {
    const store = createComponentCatalogStore(catalog);

    expect(store.getMeta().totalComponentCount).toBe(2);
    expect(store.listComponents()).toStrictEqual([
      {
        name: "Hds::Button",
        modulePath: "hds/button",
        docsPath: "components/button",
        argCount: 1,
        blockCount: 1,
      },
      {
        name: "Hds::AdvancedTable::Th",
        modulePath: "hds/advanced-table/th",
        docsPath: "components/table/advanced-table",
        argCount: 0,
        blockCount: 1,
      },
    ]);
  });

  it("returns the full record from the detail lookup", () => {
    const store = createComponentCatalogStore(catalog);
    const component = store.getComponentByName("Hds::Button");

    expect(component?.element).toBe("HTMLAnchorElement | HTMLButtonElement");
    expect(component?.args).toHaveLength(1);
    expect(component?.blocks).toHaveLength(1);
  });
});
