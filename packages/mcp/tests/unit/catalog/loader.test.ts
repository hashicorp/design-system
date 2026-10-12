/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createCatalogLoader } from "../../../src/catalog/loader.js";

import type { CatalogAnchor } from "../../../src/catalog/loader.js";

vi.mock("node:fs", () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(() => false),
}));

// resolvable from the package, so only the file read itself is mocked
const SPECIFIER = "@hashicorp/flight-icons/catalog.json";
const ANCHORS: CatalogAnchor[] = ["project-root", "components", "default"];

const readFileSyncMock = vi.mocked(readFileSync);

describe("createCatalogLoader", () => {
  beforeEach(() => {
    readFileSyncMock.mockReset();
    readFileSyncMock.mockReturnValue('{ "assets": [] }');
  });

  it("reads nothing until the loader is called", () => {
    const create = vi.fn(() => ({ loaded: true }));

    createCatalogLoader({ specifier: SPECIFIER, anchors: ANCHORS, create });

    expect(readFileSyncMock).not.toHaveBeenCalled();
    expect(create).not.toHaveBeenCalled();
  });

  it("resolves the specifier and passes the parsed JSON to create", () => {
    const create = vi.fn((value: unknown) => ({ value }));
    const loader = createCatalogLoader({
      specifier: SPECIFIER,
      anchors: ANCHORS,
      create,
    });
    const store = loader.getOrLoad();
    const call = readFileSyncMock.mock.calls[0];

    expect(call).toBeDefined();
    expect(String(call?.[0]).endsWith("/catalog.json")).toBe(true);
    expect(call?.[1]).toBe("utf8");
    expect(create).toHaveBeenCalledOnce();
    expect(create).toHaveBeenCalledWith(
      { assets: [] },
      { version: null, resolvedVia: "project-root" },
    );
    expect(store).toStrictEqual({ value: { assets: [] } });
  });

  it("memoizes the store for the process lifetime", () => {
    const create = vi.fn(() => ({ loaded: true }));
    const loader = createCatalogLoader({
      specifier: SPECIFIER,
      anchors: ANCHORS,
      create,
    });
    const first = loader.getOrLoad();

    expect(loader.getOrLoad()).toBe(first);
    expect(loader.getOrLoad()).toBe(first);
    expect(readFileSyncMock).toHaveBeenCalledOnce();
    expect(create).toHaveBeenCalledOnce();
  });

  it("builds a fresh store on every explicit load without replacing the memo", () => {
    const create = vi.fn(() => ({ loaded: true }));
    const loader = createCatalogLoader({
      specifier: SPECIFIER,
      anchors: ANCHORS,
      create,
    });
    const memoized = loader.getOrLoad();
    const fresh = loader.load();

    expect(fresh).not.toBe(memoized);
    expect(fresh).toStrictEqual(memoized);
    expect(loader.getOrLoad()).toBe(memoized);
    expect(create).toHaveBeenCalledTimes(2);
  });

  it("does not memoize a failed load, so a later fix self-heals", () => {
    let attempts = 0;
    const loader = createCatalogLoader({
      specifier: SPECIFIER,
      anchors: ANCHORS,
      create: () => {
        attempts += 1;

        if (attempts === 1) {
          throw new Error("Catalog is broken");
        }

        return { attempts };
      },
    });

    expect(() => loader.getOrLoad()).toThrow("Catalog is broken");

    const healed = loader.getOrLoad();

    expect(healed).toStrictEqual({ attempts: 2 });
    expect(loader.getOrLoad()).toBe(healed);
  });

  it("propagates unresolvable specifiers only when the loader runs", () => {
    const loader = createCatalogLoader({
      specifier: "@hashicorp/not-a-real-package/catalog.json",
      anchors: ANCHORS,
      create: () => ({ loaded: true }),
    });

    expect(() => loader.getOrLoad()).toThrow();
    expect(readFileSyncMock).not.toHaveBeenCalled();
  });
});
