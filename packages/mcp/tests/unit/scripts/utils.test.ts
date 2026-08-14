/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, extname, resolve } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  getDirectoryPaths,
  getFilesOfType,
} from "../../../scripts/mcp/utils.mjs";

let root: string;

const touchFile = async (path: string): Promise<void> => {
  const filePath = resolve(root, path);
  await mkdir(resolve(filePath, ".."), { recursive: true });
  await writeFile(filePath, "");
};

beforeEach(async () => {
  root = await mkdtemp(resolve(tmpdir(), "hds-utils-"));
});

afterEach(async () => {
  await rm(root, { force: true, recursive: true });
});

describe("getFilesOfType", () => {
  it("returns files matching the given extension in a flat directory", async () => {
    await touchFile("a.gts");
    await touchFile("b.gts");

    const files = await getFilesOfType(root, ".gts");

    expect(files.map((f) => basename(f))).toEqual(
      expect.arrayContaining(["a.gts", "b.gts"]),
    );
    expect(files).toHaveLength(2);
  });

  it("excludes files with a different extension", async () => {
    await touchFile("a.gts");
    await touchFile("b.ts");
    await touchFile("c.json");

    const files = await getFilesOfType(root, ".gts");

    expect(files.map((f) => basename(f))).toEqual(["a.gts"]);
  });

  it("recurses into sub-directories", async () => {
    await touchFile("sub/a.gts");
    await touchFile("sub/nested/b.gts");

    const files = await getFilesOfType(root, ".gts");

    expect(files.map((f) => basename(f))).toEqual(
      expect.arrayContaining(["a.gts", "b.gts"]),
    );
    expect(files).toHaveLength(2);
  });

  it("returns files from multiple sibling directories", async () => {
    await touchFile("components/accordion/index.gts");
    await touchFile("components/button/index.gts");

    const files = await getFilesOfType(root, ".gts");

    expect(files).toHaveLength(2);
    expect(files.every((f: string) => extname(f) === ".gts")).toBe(true);
  });

  it("returns an empty array when no files match the extension", async () => {
    await touchFile("readme.md");
    await touchFile("data.json");

    const files = await getFilesOfType(root, ".gts");

    expect(files).toEqual([]);
  });

  it("returns an empty array for an empty directory", async () => {
    const files = await getFilesOfType(root, ".gts");

    expect(files).toEqual([]);
  });

  it("returns absolute paths", async () => {
    await touchFile("a.gts");

    const files = await getFilesOfType(root, ".gts");

    expect(files[0]).toBe(resolve(root, "a.gts"));
  });
});

describe("getDirectoryPaths", () => {
  it("returns an object with all expected path keys", () => {
    const paths = getDirectoryPaths({
      defaultInput: "showcase/app/components",
      defaultOutput: "src/catalogs",
    });

    expect(paths).toHaveProperty("current");
    expect(paths).toHaveProperty("packageRoot");
    expect(paths).toHaveProperty("workspaceRoot");
    expect(paths).toHaveProperty("defaultInput");
    expect(paths).toHaveProperty("defaultOutput");
  });

  it("packageRoot is two levels up from current", () => {
    const paths = getDirectoryPaths({
      defaultInput: "showcase/app/components",
      defaultOutput: "src/catalogs",
    });

    expect(paths.packageRoot).toBe(resolve(paths.current, "../.."));
  });

  it("workspaceRoot is two levels up from packageRoot", () => {
    const paths = getDirectoryPaths({
      defaultInput: "showcase/app/components",
      defaultOutput: "src/catalogs",
    });

    expect(paths.workspaceRoot).toBe(resolve(paths.packageRoot, "../.."));
  });

  it("defaultInput resolves relative to workspaceRoot", () => {
    const inputPath = "showcase/app/components";
    const paths = getDirectoryPaths({
      defaultInput: inputPath,
      defaultOutput: "src/catalogs",
    });

    expect(paths.defaultInput).toBe(resolve(paths.workspaceRoot, inputPath));
  });

  it("defaultOutput resolves relative to packageRoot", () => {
    const outputPath = "src/catalogs";
    const paths = getDirectoryPaths({
      defaultInput: "showcase/app/components",
      defaultOutput: outputPath,
    });

    expect(paths.defaultOutput).toBe(resolve(paths.packageRoot, outputPath));
  });
});
