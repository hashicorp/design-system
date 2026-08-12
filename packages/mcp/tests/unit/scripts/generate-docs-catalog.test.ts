/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { buildDocsCatalog } from "../../../scripts/generate-docs-catalog.mjs";

const temporaryDirectories: string[] = [];

const writePage = async (
  root: string,
  path: string,
  attributes: Record<string, unknown>,
): Promise<void> => {
  const filePath = resolve(root, path);

  await mkdir(resolve(filePath, ".."), { recursive: true });
  await writeFile(
    filePath,
    JSON.stringify({
      data: { id: path.replace(/\.json$/, ""), attributes },
    }),
  );
};

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { force: true, recursive: true }),
    ),
  );
});

describe("documentation catalog generator", () => {
  it("maps website categories and creates unique section IDs", async () => {
    const inputDirectory = await mkdtemp(resolve(tmpdir(), "hds-docs-"));
    temporaryDirectories.push(inputDirectory);

    await writePage(inputDirectory, "utilities/interactive/index.json", {
      title: "Interactive",
      content:
        '<section data-tab="Code">## API\n\nFirst.\n\n## API\n\nSecond.</section>',
    });

    const catalog = await buildDocsCatalog(inputDirectory);

    expect(catalog.pages[0]).toMatchObject({
      id: "utilities/interactive/index",
      scope: "components",
      url: "/utilities/interactive",
    });
    expect(catalog.pages[0]?.sections.map((section) => section.id)).toEqual([
      "code--api",
      "code--api--2",
    ]);
  });

  it("excludes hidden pages and separately modeled catalogs", async () => {
    const inputDirectory = await mkdtemp(resolve(tmpdir(), "hds-docs-"));
    temporaryDirectories.push(inputDirectory);

    await Promise.all([
      writePage(inputDirectory, "components/hidden.json", {
        title: "Hidden",
        navigation: { hidden: true },
      }),
      writePage(inputDirectory, "foundations/tokens/index.json", {
        title: "Tokens",
      }),
      writePage(inputDirectory, "icons/library/index.json", {
        title: "Icons",
      }),
      writePage(inputDirectory, "testing/example.json", {
        title: "Testing",
      }),
    ]);

    await expect(buildDocsCatalog(inputDirectory)).resolves.toEqual({
      version: 1,
      pages: [],
    });
  });
});
