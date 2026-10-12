/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { realpathSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  createProjectFixture,
  runCatalogCascade,
} from "../../support/catalog-fixtures.js";

import type { CatalogAnchor } from "../../../src/catalog/loader.js";
import type {
  InstalledPackage,
  ProjectFixture,
} from "../../support/catalog-fixtures.js";

const SPECIFIER = "@hds-fixture/catalog-pkg/catalog.json";
const COMPONENTS_NAME = "@hashicorp/design-system-components";
const FULL_CASCADE: CatalogAnchor[] = ["project-root", "components", "default"];

const buildCatalogPackage = (version: string): InstalledPackage => ({
  name: "@hds-fixture/catalog-pkg",
  version,
  files: { "catalog.json": JSON.stringify({ assets: [] }) },
});

// the components package a consumer installed, carrying its own transitive catalog copy
const buildComponentsPackage = (
  catalogVersion: string | null,
): InstalledPackage => ({
  name: COMPONENTS_NAME,
  version: "6.4.0",
  files: {
    "package.json": JSON.stringify({
      name: COMPONENTS_NAME,
      version: "6.4.0",
      exports: {
        "./*": { types: "./declarations/*.d.ts", default: "./dist/*" },
        "./addon-main.js": "./addon-main.cjs",
      },
    }),
    "addon-main.cjs": "",
  },
  ...(catalogVersion === null
    ? {}
    : { dependencies: [buildCatalogPackage(catalogVersion)] }),
});

let fixture: ProjectFixture | null = null;

afterEach(() => {
  fixture?.cleanup();
  fixture = null;
});

describe("catalog resolution cascade", () => {
  it("prefers the copy the consumer installed at the project root", () => {
    fixture = createProjectFixture([
      buildCatalogPackage("99.0.0"),
      buildComponentsPackage("8.8.8"),
    ]);

    const result = runCatalogCascade({
      specifier: SPECIFIER,
      anchors: FULL_CASCADE,
      projectRoot: fixture.root,
      installed: [
        buildComponentsPackage("7.7.7"),
        buildCatalogPackage("1.0.0"),
      ],
    });

    expect(result).toStrictEqual({
      ok: true,
      source: { version: "99.0.0", resolvedVia: "project-root" },
    });
  });

  it.each([false, true])(
    "uses the consumer's components catalog when MCP components are installed: %s",
    (mcpComponentsInstalled) => {
      fixture = createProjectFixture([buildComponentsPackage("8.8.8")]);

      const result = runCatalogCascade({
        specifier: SPECIFIER,
        anchors: FULL_CASCADE,
        projectRoot: fixture.root,
        installed: [
          ...(mcpComponentsInstalled ? [buildComponentsPackage("7.7.7")] : []),
          buildCatalogPackage("1.0.0"),
        ],
      });

      expect(result).toStrictEqual({
        ok: true,
        source: { version: "8.8.8", resolvedVia: "components" },
      });
    },
  );

  it("falls back to its own copy when the consumer installed neither", () => {
    fixture = createProjectFixture();

    const result = runCatalogCascade({
      specifier: SPECIFIER,
      anchors: FULL_CASCADE,
      projectRoot: fixture.root,
      installed: [
        buildComponentsPackage("7.7.7"),
        buildCatalogPackage("1.0.0"),
      ],
    });

    expect(result).toStrictEqual({
      ok: true,
      source: { version: "1.0.0", resolvedVia: "default" },
    });
  });

  it("falls back to its own copy when the consumer's components have no catalog", () => {
    fixture = createProjectFixture([buildComponentsPackage(null)]);

    const result = runCatalogCascade({
      specifier: SPECIFIER,
      anchors: FULL_CASCADE,
      projectRoot: fixture.root,
      installed: [
        buildComponentsPackage("7.7.7"),
        buildCatalogPackage("1.0.0"),
      ],
    });

    expect(result).toStrictEqual({
      ok: true,
      source: { version: "1.0.0", resolvedVia: "default" },
    });
  });

  it("skips the components anchor when a catalog does not declare it", () => {
    // the same install resolves through components above, so landing on the
    // default anchor proves the undeclared one was never attempted
    fixture = createProjectFixture([buildComponentsPackage("8.8.8")]);

    const result = runCatalogCascade({
      specifier: SPECIFIER,
      anchors: ["project-root", "default"],
      projectRoot: fixture.root,
      installed: [
        buildComponentsPackage("8.8.8"),
        buildCatalogPackage("1.0.0"),
      ],
    });

    expect(result).toStrictEqual({
      ok: true,
      source: { version: "1.0.0", resolvedVia: "default" },
    });
  });

  it("names the specifier and every attempted path when no anchor resolves", () => {
    fixture = createProjectFixture([buildComponentsPackage(null)]);

    const result = runCatalogCascade({
      specifier: SPECIFIER,
      anchors: FULL_CASCADE,
      projectRoot: fixture.root,
      installed: [buildComponentsPackage("7.7.7")],
    });

    expect(result.ok).toBe(false);

    const message = result.ok ? "" : result.message;

    expect(message).toContain(SPECIFIER);
    expect(message).toContain(`project-root -> ${fixture.root}`);
    expect(message).toContain(
      `components -> ${realpathSync(join(fixture.root, "node_modules", COMPONENTS_NAME))}`,
    );
    expect(message).toContain(`default -> `);
  });

  it("reports the components anchor as unavailable when only MCP components are installed", () => {
    fixture = createProjectFixture();

    const result = runCatalogCascade({
      specifier: SPECIFIER,
      anchors: FULL_CASCADE,
      projectRoot: fixture.root,
      installed: [buildComponentsPackage("7.7.7")],
    });

    expect(result.ok).toBe(false);
    expect(result.ok ? "" : result.message).toContain(
      "components (anchor unavailable)",
    );
  });

  it("reports only the anchors a catalog declares", () => {
    fixture = createProjectFixture();

    const result = runCatalogCascade({
      specifier: SPECIFIER,
      anchors: ["project-root"],
      projectRoot: fixture.root,
    });

    const message = result.ok ? "" : result.message;

    expect(message).toContain(`project-root -> ${fixture.root}`);
    expect(message).not.toContain("components");
    expect(message).not.toContain("default");
  });
});
