/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

/**
 * The components resource reports a `docsPath` per component and the docs tool is keyed on the
 * same route string. That is the whole composition guarantee: an agent reads a component, then
 * passes its docsPath straight into search_hds_docs. This test is what keeps the two catalogs
 * from drifting apart in silence.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  getOrLoadComponentStore,
  parseComponentCatalog,
} from "../../../src/resources/components/store/index.js";
import { searchDocs } from "../../../src/tools/docs/search-docs.js";
import { getOrLoadDocsStore } from "../../../src/tools/docs/store/index.js";

// the workspace source of truth, not the copy installed into node_modules
const COMPONENT_CATALOG_PATH = fileURLToPath(
  new URL("../../../../components/component-catalog.json", import.meta.url),
);

const componentCatalog = parseComponentCatalog(
  JSON.parse(readFileSync(COMPONENT_CATALOG_PATH, "utf8")),
);

const docsStore = getOrLoadDocsStore();

const getDocsPaths = (): string[] => {
  return [
    ...new Set(
      componentCatalog.components
        .map((component) => component.docsPath)
        .filter((docsPath): docsPath is string => docsPath !== undefined),
    ),
  ].sort();
};

describe("component catalog to docs catalog join", () => {
  it("has docsPath values to join on, so the test cannot pass vacuously", () => {
    expect(componentCatalog.components.length).toBeGreaterThan(100);
    expect(getDocsPaths().length).toBeGreaterThan(50);
  });

  it("resolves every distinct docsPath to a page in the docs catalog", () => {
    const unresolved = getDocsPaths().filter(
      (docsPath) => docsStore.getPageByRoute(docsPath) === null,
    );

    expect(unresolved).toStrictEqual([]);
  });

  it("resolves the docsPath the components resource itself hands out", () => {
    // the resource may serve a consumer's installed copy, which is the value an agent sees
    const served = [
      ...new Set(
        getOrLoadComponentStore()
          .listComponents()
          .map((component) => component.docsPath)
          .filter((docsPath): docsPath is string => docsPath !== undefined),
      ),
    ];
    const unresolved = served.filter(
      (docsPath) => docsStore.getPageByRoute(docsPath) === null,
    );

    expect(served.length).toBeGreaterThan(50);
    expect(unresolved).toStrictEqual([]);
  });

  it("scopes a docs search by every docsPath without ever coming back empty", () => {
    const emptyScopes = getDocsPaths().filter(
      (docsPath) =>
        searchDocs(docsStore, {
          query: "usage",
          limit: 1,
          docsPath,
        }).unknownFilters.length > 0,
    );

    expect(emptyScopes).toStrictEqual([]);
  });

  it("reports a docs hit's route as the docsPath that reached it", () => {
    const docsPath = "components/button";
    const [top] = searchDocs(docsStore, {
      query: "usage",
      limit: 1,
      docsPath,
    }).results;

    expect(top.docsPath).toBe(docsPath);
    expect(top.route).toBe(docsPath);
    expect(docsStore.getPageByRoute(top.docsPath)).not.toBeNull();
  });
});
