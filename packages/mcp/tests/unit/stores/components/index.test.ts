/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import {
  createComponentCatalogStore,
  parseComponentCatalog,
} from "../../../../src/stores/components/index.js";
import { buildComponentCatalogEntry } from "../../../support/component-catalog.js";

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
      },
      {
        name: "Hds::AdvancedTable::Th",
        modulePath: "hds/advanced-table/th",
        docsPath: "components/table/advanced-table",
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

describe("shared value sets", () => {
  const catalog = {
    valueSets: { "hds/icon#name": ["search", "plus", "minus"] },
    components: [
      buildComponentCatalogEntry({
        args: [
          {
            name: "icon",
            type: "string",
            required: true,
            valuesRef: "hds/icon#name",
          },
          {
            name: "missing",
            type: "string",
            required: false,
            valuesRef: "hds/absent#gone",
          },
        ],
      }),
    ],
  };

  it("resolves a referenced set into values and hides the reference", () => {
    const store = createComponentCatalogStore(parseComponentCatalog(catalog));
    const [arg] = store.getComponentByName("Hds::Button")?.args ?? [];

    expect(arg?.values).toEqual(["search", "plus", "minus"]);
    expect(arg).not.toHaveProperty("valuesRef");
  });

  it("drops a reference that names no set rather than emitting an empty one", () => {
    const store = createComponentCatalogStore(parseComponentCatalog(catalog));
    const arg = store
      .getComponentByName("Hds::Button")
      ?.args.find((candidate) => candidate.name === "missing");

    expect(arg).not.toHaveProperty("values");
    expect(arg).not.toHaveProperty("valuesRef");
  });
});

describe("class-name lookup", () => {
  const store = createComponentCatalogStore(
    parseComponentCatalog({
      components: [
        buildComponentCatalogEntry(),
        buildComponentCatalogEntry({
          name: "Hds::AdvancedTable::Th",
          modulePath: "hds/advanced-table/th",
          args: [],
          blocks: [],
        }),
      ],
    }),
  );

  it("resolves the class name a consumer imports, with or without the namespace", () => {
    expect(store.getComponentByName("HdsAdvancedTableTh")?.name).toBe(
      "Hds::AdvancedTable::Th",
    );
    expect(store.getComponentByName("AdvancedTableTh")?.name).toBe(
      "Hds::AdvancedTable::Th",
    );
    expect(store.getComponentByName("hdsbutton")?.name).toBe("Hds::Button");
  });

  it("still resolves the invocation name and the bare name", () => {
    expect(store.getComponentByName("Hds::AdvancedTable::Th")?.name).toBe(
      "Hds::AdvancedTable::Th",
    );
    expect(store.getComponentByName("AdvancedTable::Th")?.name).toBe(
      "Hds::AdvancedTable::Th",
    );
    expect(store.getComponentByName("button")?.name).toBe("Hds::Button");
  });

  it("does not let a flattened alias shadow another component's own name", () => {
    const shadowed = createComponentCatalogStore(
      parseComponentCatalog({
        components: [
          buildComponentCatalogEntry({
            name: "Hds::CopyButton",
            modulePath: "hds/copy-button",
            args: [],
            blocks: [],
          }),
          buildComponentCatalogEntry({
            name: "Hds::Copy::Button",
            modulePath: "hds/copy/button",
            args: [],
            blocks: [],
          }),
        ],
      }),
    );

    expect(shadowed.getComponentByName("Hds::CopyButton")?.name).toBe(
      "Hds::CopyButton",
    );
    expect(shadowed.getComponentByName("Hds::Copy::Button")?.name).toBe(
      "Hds::Copy::Button",
    );
  });
});

describe("named blocks", () => {
  const store = createComponentCatalogStore(
    parseComponentCatalog({
      components: [
        buildComponentCatalogEntry({
          name: "Hds::AdvancedTable",
          modulePath: "hds/advanced-table",
          args: [],
          blocks: [
            {
              name: "body",
              yields: [
                {
                  name: "Td",
                  type: "WithBoundArgs<typeof HdsAdvancedTableTd, 'align'>",
                },
                { name: "data", type: "T" },
                { name: "isOpen", type: "boolean | undefined" },
              ],
            },
            { name: "emptyState", yields: [] },
            {
              name: "actions",
              yields: [
                {
                  name: "Button",
                  type: "WithBoundArgs<typeof HdsButton, 'size'>",
                },
              ],
            },
          ],
        }),
      ],
    }),
  );

  it("keeps every named block, including one that yields nothing", () => {
    const blocks = store.getComponentByName("Hds::AdvancedTable")?.blocks ?? [];

    expect(blocks.map((block) => block.name)).toEqual([
      "body",
      "emptyState",
      "actions",
    ]);
    expect(blocks.find((block) => block.name === "emptyState")?.yields).toEqual(
      [],
    );
  });

  it("preserves each yield's name and type, in the order declared", () => {
    const body = store
      .getComponentByName("Hds::AdvancedTable")
      ?.blocks.find((block) => block.name === "body");

    expect(body?.yields.map((entry) => entry.name)).toEqual([
      "Td",
      "data",
      "isOpen",
    ]);
    expect(body?.yields[0]?.type).toBe(
      "WithBoundArgs<typeof HdsAdvancedTableTd, 'align'>",
    );
    expect(body?.yields[2]?.type).toBe("boolean | undefined");
  });
});
