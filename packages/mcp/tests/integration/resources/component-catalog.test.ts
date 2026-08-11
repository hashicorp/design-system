/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { describe, expect, it } from "vitest";
import { completeComponentNames } from "../../../src/resources/components/get-component-by-name.js";
import {
  getOrLoadComponentStore,
  loadComponentCatalog,
} from "../../../src/resources/components/store/index.js";

describe("generated component catalog", () => {
  it("loads the package artifact and resolves its public aliases", () => {
    const store = loadComponentCatalog();
    const meta = store.getMeta();

    expect(meta.totalComponentCount).toBeGreaterThan(0);
    expect(store.listComponents()).toHaveLength(meta.totalComponentCount);
    expect(store.getComponentByName("Hds::Button")?.name).toBe("Hds::Button");
    expect(store.getComponentByName("button")?.name).toBe("Hds::Button");
  });

  it("memoizes the store for the process lifetime", () => {
    const first = getOrLoadComponentStore();

    expect(getOrLoadComponentStore()).toBe(first);
    expect(loadComponentCatalog()).not.toBe(first);
  });

  it("completes every component in the catalog for a blank query", () => {
    const components = getOrLoadComponentStore().listComponents();
    const matches = completeComponentNames(components, "", components.length);

    expect(matches).toHaveLength(components.length);
    expect(components.length).toBeGreaterThan(100);
  });
});
