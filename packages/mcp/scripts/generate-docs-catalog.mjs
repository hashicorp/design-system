/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { validateDocsCatalog } from "./validate-docs-catalog.mjs";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(currentDirectory, "..");
const workspaceRoot = resolve(packageRoot, "../..");
const defaultInputDirectory = resolve(workspaceRoot, "website/dist/docs");
const defaultOutputPath = resolve(
  packageRoot,
  "src/catalogs/docs/catalog.json",
);

const excludedPaths = ["icons/", "testing/", "foundations/tokens/"];
const scopeByCategory = {
  about: "about",
  "getting-started": "about",
  "whats-new": "about",
  components: "components",
  layouts: "components",
  overrides: "components",
  utilities: "components",
  content: "content",
  foundations: "foundations",
  patterns: "patterns",
};

const getJsonFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve(directory, entry.name);

      return entry.isDirectory()
        ? getJsonFiles(entryPath)
        : Promise.resolve(extname(entry.name) === ".json" ? [entryPath] : []);
    }),
  );

  return files.flat();
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const splitSections = (markdown, pageTitle, tab) => {
  const content = markdown.replace(/<!-- file included: .*? -->/g, "").trim();
  const headingPattern = /^(#{2,6})\s+(.+)$/gm;
  const headings = [...content.matchAll(headingPattern)];

  if (headings.length === 0) {
    return content === ""
      ? []
      : [
          {
            heading: tab ?? pageTitle,
            anchor: "",
            level: 1,
            ...(tab === undefined ? {} : { tab }),
            markdown: content,
          },
        ];
  }

  const sections = [];
  const introduction = content.slice(0, headings[0].index).trim();

  if (introduction !== "") {
    sections.push({
      heading: tab ?? pageTitle,
      anchor: "",
      level: 1,
      ...(tab === undefined ? {} : { tab }),
      markdown: introduction,
    });
  }

  headings.forEach((match, index) => {
    const start = match.index;
    const end = headings[index + 1]?.index ?? content.length;
    const heading = match[2].trim();
    const sectionMarkdown = content.slice(start, end).trim();

    sections.push({
      heading,
      anchor: slugify(heading),
      level: match[1].length,
      ...(tab === undefined ? {} : { tab }),
      markdown: sectionMarkdown,
    });
  });

  return sections;
};

const addSectionIds = (sections) => {
  const occurrences = new Map();

  return sections.map((section) => {
    const baseId = [
      slugify(section.tab ?? "page"),
      section.anchor || "overview",
    ]
      .filter(Boolean)
      .join("--");
    const occurrence = (occurrences.get(baseId) ?? 0) + 1;
    occurrences.set(baseId, occurrence);

    return {
      id: occurrence === 1 ? baseId : `${baseId}--${occurrence}`,
      heading: section.heading,
      anchor: section.anchor,
      ...(section.tab === undefined ? {} : { tab: section.tab }),
      markdown: section.markdown,
    };
  });
};

const splitTabs = (content) => {
  const matches = [
    ...content.matchAll(/<section data-tab="([^"]+)">([\s\S]*?)<\/section>/g),
  ];

  return matches.length === 0
    ? [{ content }]
    : matches.map((match) => ({ tab: match[1], content: match[2] }));
};

export const buildDocsCatalog = async (inputDirectory) => {
  const files = await getJsonFiles(inputDirectory);
  const pages = [];

  for (const filePath of files.sort()) {
    const sourcePath = relative(inputDirectory, filePath).replaceAll("\\", "/");
    const pagePath = sourcePath.replace(/\.json$/, "");

    if (excludedPaths.some((prefix) => pagePath.startsWith(prefix))) {
      continue;
    }

    const pageJson = JSON.parse(await readFile(filePath, "utf8"));
    const attributes = pageJson.data?.attributes;
    const category = pagePath.split("/")[0];
    const scope = scopeByCategory[category];

    if (
      typeof pageJson.data?.id !== "string" ||
      typeof attributes?.title !== "string" ||
      attributes.navigation?.hidden === true ||
      scope === undefined
    ) {
      continue;
    }

    const url = `/${pagePath.replace(/\/index$/, "")}`;
    const sections = addSectionIds(
      splitTabs(attributes.content ?? "").flatMap(({ tab, content }) =>
        splitSections(content, attributes.title, tab),
      ),
    );

    pages.push({
      id: pageJson.data.id,
      url,
      title: attributes.title,
      ...(typeof attributes.description === "string"
        ? { description: attributes.description }
        : {}),
      ...(typeof attributes.caption === "string"
        ? { caption: attributes.caption }
        : {}),
      keywords: Array.isArray(attributes.navigation?.keywords)
        ? attributes.navigation.keywords
        : [],
      scope,
      sections,
    });
  }

  return { version: 1, pages };
};

export const generateDocsCatalog = async ({
  inputDirectory = defaultInputDirectory,
  outputPath = defaultOutputPath,
} = {}) => {
  const catalog = await buildDocsCatalog(inputDirectory);
  validateDocsCatalog(catalog);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`);

  return catalog;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const catalog = await generateDocsCatalog();

  console.log(
    `Generated documentation catalog with ${catalog.pages.length} pages`,
  );
}
