/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

// turns a page's markdown into the whole document a reader sees

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { CODE_FENCE } from "./markdown.mjs";
import { fail, relativeToDocs } from "./paths.mjs";

const INCLUDE_DIRECTIVE = /^[ \t]*@include "(.*\.md)"[ \t]*$/gm;
export const DEMO_BLOCK =
  /\[\[(code-snippets\/[^\]\s]+)(?:\s+execute=(?:true|false))?(?:\s+expanded=(?:true|false))?\s*\]\]/g;

const SNIPPET_SLOTS = [
  [{ extension: ".gts", language: "gts", title: "Modern Ember (.gts)" }],
  [
    {
      extension: ".classic.hbs",
      language: "handlebars",
      title: "Classic Ember (.hbs)",
    },
  ],
  [
    {
      extension: ".classic.js",
      language: "javascript",
      title: "Classic Ember backing class (.js)",
    },
    { extension: ".js", language: "javascript" },
  ],
  [
    { extension: ".scss", language: "scss" },
    { extension: ".html", language: "html" },
    { extension: ".jsx", language: "jsx" },
    { extension: ".bash", language: "bash" },
    { extension: ".yaml", language: "yaml" },
  ],
];

const SNIPPET_PRAGMAS = [
  /^[ \t]*\{\{!\s*template-lint-(?:disable|enable)\b[^\n\r]*\}\}[ \t]*(?:\r?\n)?/gm,
  /^[ \t]*\{\{!\s*@glint-expect-error\b[^\n\r]*\}\}[ \t]*(?:\r?\n)?/gm,
  /^[ \t]*\/\*\s*eslint-(?:disable|enable)\b[^\n\r]*\*\/[ \t]*(?:\r?\n)?/gm,
  /^[ \t]*\/\/\s*@ts-expect-error\b[^\n\r]*(?:\r?\n)?/gm,
];

const COMMENT_BLOCK =
  /^[ \t]*<!--(?![ \t]*algolia-ignore-)[\s\S]*?-->[ \t]*(?:\r?\n(?:[ \t]*\r?\n)*)?/gm;
const COMMENT_INLINE = /<!--(?![ \t]*algolia-ignore-)[\s\S]*?-->/g;

function readSnippet(file) {
  let code = readFileSync(file, "utf8");

  for (const pragma of SNIPPET_PRAGMAS) {
    code = code.replace(pragma, "");
  }

  return code.trimEnd();
}

function toFencedBlock(language, title, body) {
  const info = title === undefined ? language : `${language} title="${title}"`;

  return `\`\`\`${info}\n${body}\n\`\`\``;
}

function expandDemoBlocks(source, directory) {
  return source.replace(DEMO_BLOCK, (match, reference) => {
    const base = path.join(directory, reference.trim());
    const blocks = [];

    SNIPPET_SLOTS.forEach((slot) => {
      for (const { extension, language, title } of slot) {
        const file = `${base}${extension}`;

        if (!existsSync(file)) {
          continue;
        }

        const body = readSnippet(file);

        if (body !== "") {
          blocks.push(toFencedBlock(language, title, body));
        }

        break;
      }
    });

    if (blocks.length === 0) {
      fail(`the code snippet '${relativeToDocs(base)}' resolves to no file`);
    }

    return `\n${blocks.join("\n\n")}\n`;
  });
}

function resolveIncludes(source, directory) {
  return source.replace(INCLUDE_DIRECTIVE, (match, reference) => {
    const file = path.join(directory, reference);
    const where = relativeToDocs(directory);

    if (!existsSync(file)) {
      fail(`unresolved @include "${reference}" in ${where}`);
    }

    const partial = readFileSync(file, "utf8");

    // resolution is a single pass, so a partial that includes another would ship the directive
    if (/^[ \t]*@include /m.test(partial)) {
      fail(`the partial "${reference}" in ${where} contains a nested @include`);
    }

    return `\n\n${expandDemoBlocks(partial, path.dirname(file)).trim()}\n\n`;
  });
}

function stripComments(content) {
  const output = [];

  let prose = [];
  let fenced = false;

  const flushProse = () => {
    if (prose.length === 0) {
      return;
    }

    const stripped = prose
      .join("\n")
      .replace(COMMENT_BLOCK, "")
      .replace(COMMENT_INLINE, "");

    output.push(...stripped.split("\n"));

    prose = [];
  };

  for (const line of content.split("\n")) {
    if (CODE_FENCE.test(line)) {
      if (!fenced) {
        flushProse();
      }

      fenced = !fenced;

      output.push(line);

      continue;
    }

    if (fenced) {
      output.push(line);
    } else {
      prose.push(line);
    }
  }

  flushProse();

  return output.join("\n");
}

export function assemblePage(file, body) {
  const directory = path.dirname(file);

  return stripComments(
    resolveIncludes(expandDemoBlocks(body, directory), directory),
  );
}
