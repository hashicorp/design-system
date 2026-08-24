/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// reads the yaml block at the head of a page, and the handful of fields the catalog keeps

import { readFileSync } from "node:fs";
import { parse as parseYaml } from "yaml";
import { fail, relativeToDocs } from "./paths.mjs";

const FRONTMATTER = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

export function readFrontmatter(file) {
  const source = readFileSync(file, "utf8");
  const where = relativeToDocs(file);

  const match = FRONTMATTER.exec(source);

  if (match === null) {
    fail(`${where} has no frontmatter block`);
  }

  try {
    return {
      data: parseYaml(match[1]) ?? {},
      body: source.slice(match[0].length),
    };
  } catch (error) {
    return fail(`${where} has invalid frontmatter — ${error.message}`);
  }
}

export function readText(value) {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}

export function readStringList(value) {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const items = value.map(String).filter((item) => item.trim() !== "");

  return items.length === 0 ? undefined : items;
}

export function readSubMap(source, keys) {
  const result = {};

  for (const key of keys) {
    const value = source?.[key];

    if (value === undefined || value === null) {
      continue;
    }

    const text = String(value).trim();

    if (text !== "") {
      result[key] = text;
    }
  }

  return Object.keys(result).length === 0 ? undefined : result;
}
