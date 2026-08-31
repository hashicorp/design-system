/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  PROJECT_ROOT_ENV_VAR,
  findPackageDirectory,
  resolveProjectRoot,
} from "../../../src/shared/project-root.js";
import { createProjectFixture } from "../../support/catalog-fixtures.js";

import type { ProjectFixture } from "../../support/catalog-fixtures.js";

const UNREACHABLE_DIRECTORY = "/hds-mcp-nonexistent-root/nested";

let fixture: ProjectFixture | null = null;

afterEach(() => {
  fixture?.cleanup();
  fixture = null;
});

describe("resolveProjectRoot", () => {
  it("uses a non-empty environment override verbatim", () => {
    const root = resolveProjectRoot({
      cwd: "/somewhere/else",
      env: { [PROJECT_ROOT_ENV_VAR]: "/opt/consumer-project" },
    });

    expect(root).toBe("/opt/consumer-project");
  });

  it("ignores a blank environment override", () => {
    fixture = createProjectFixture();

    const root = resolveProjectRoot({
      cwd: fixture.root,
      env: { [PROJECT_ROOT_ENV_VAR]: "   " },
    });

    expect(root).toBe(fixture.root);
  });

  it("walks up to the nearest directory holding a package.json", () => {
    fixture = createProjectFixture();

    const nested = join(fixture.root, "packages", "app", "src");

    mkdirSync(nested, { recursive: true });

    expect(resolveProjectRoot({ cwd: nested, env: {} })).toBe(fixture.root);
  });

  it("falls back to the cwd when no package.json is found", () => {
    expect(resolveProjectRoot({ cwd: UNREACHABLE_DIRECTORY, env: {} })).toBe(
      UNREACHABLE_DIRECTORY,
    );
  });
});

describe("findPackageDirectory", () => {
  it("returns the starting directory when it holds a package.json", () => {
    fixture = createProjectFixture();

    expect(findPackageDirectory(fixture.root)).toBe(fixture.root);
  });

  it("returns null when no ancestor holds a package.json", () => {
    expect(findPackageDirectory(UNREACHABLE_DIRECTORY)).toBeNull();
  });
});
