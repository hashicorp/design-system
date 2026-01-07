/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

/* eslint-env node */

const Multifilter = require('broccoli-multifilter');
const Funnel = require('broccoli-funnel');
const fs = require('fs-extra');
const path = require('path');
const walkSync = require('walk-sync');

const demoBlockRegex =
  /\[\[demo:\s*([^\]\s]+)(?:\s+execute=(true|false))?(?:\s+includeBackingClass=(true|false))?(?:\s+expanded=(true|false))?\s*\]\]/g;

/*
 * NOTE: if need to add a code snippet to another section of the site, you need to update this regex
 * The reason we need to have the first directory explicitly listed is that there are a bunch of other folders that are included in the inputPath
 * Example input path: "var/folders/68/g3fv_h7538xcqf6nd48jm8m40000gn/T/broccoli-59163KsQiVU7Es4GZ/out-158-funnel/components/accordion/partials/code/code-snippets/accordion-expand-all.classic"
 */
const fileNameRegex =
  /((?:components|utilities|layout|getting-started|patterns|foundations).*?)\.(?:hbs|js|gts)/;

// files that will need to support: scss, bash, yaml
const SUPPORTED_FILE_EXTENSIONS = [
  '.classic.hbs',
  '.classic.js',
  '.gts',
  '.scss',
  '.yaml',
  '.bash',
  '.ts',
];

// Helper to escape code for attribute usage
function escapeCode(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{\{/g, '&#123;&#123;')
    .replace(/\}\}/g, '&#125;&#125;')
    .replace(/\n/g, '\\n')
    .replace(/\\n$/, ''); // Remove trailing escaped newline
}

function getCompactGtsSnippet(code) {
  // find the content within the <template> tags
  const templateRegex = /<template>([\s\S]*?)<\/template>/;
  const match = code.match(templateRegex);

  if (!match?.[1]) {
    return '';
  }

  let snippet = match[1];

  // Remove leading and trailing blank lines
  snippet = snippet.replace(/^\s*\n/, '').replace(/\n\s*$/, '');

  // Find the minimum indentation level (excluding empty lines)
  const lines = snippet.split('\n');
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

  if (nonEmptyLines.length === 0) {
    return '';
  }

  const minIndent = Math.min(
    ...nonEmptyLines.map((line) => {
      const match = line.match(/^(\s*)/);
      return match?.[1]?.length ?? 0;
    }),
  );

  // Remove the minimum indentation from all lines
  const dedentedLines = lines.map((line) => {
    if (line.trim().length === 0) {
      return ''; // Keep empty lines empty
    }
    return line.slice(minIndent);
  });

  return dedentedLines.join('\n');
}

class MarkdownReplaceDemoBlocks extends Multifilter {
  build() {
    const inputFolder = this.inputPaths[0];
    const inputFiles = walkSync(inputFolder, {
      globs: ['**/*.md'],
    });

    return this.buildAndCache(inputFiles, (inputFile, outputFolder) => {
      const fullInputPath = path.join(inputFolder, inputFile);
      const fullParentFolder = path.dirname(fullInputPath);
      const fullOutputPath = path.join(outputFolder, inputFile);
      const fullOutputFolder = path.dirname(fullOutputPath);

      let markdownFileContent = fs.readFileSync(fullInputPath, 'utf8');

      // Replace all demo blocks
      let dependencies = [fullInputPath];
      markdownFileContent = markdownFileContent.replace(
        demoBlockRegex,
        (
          _match,
          fileName,
          shouldExecute,
          shouldIncludeBackingClass,
          isExpanded,
        ) => {
          const shouldHidePreview = shouldExecute === 'false' ? true : false;

          const codeSnippets = {
            hbs: '',
            js: '',
            gts: '',
            compactGts: '',
            custom: '',
            customLang: '',
          };

          let fileNameToForward = '';

          SUPPORTED_FILE_EXTENSIONS.forEach((ext) => {
            const fileToCheck = `${fileName.trim()}${ext}`;
            const filePath = path.join(fullParentFolder, fileToCheck);

            if (fs.existsSync(filePath)) {
              const code = fs.readFileSync(filePath, 'utf8');
              dependencies.push(filePath);

              if (ext === '.classic.hbs') {
                codeSnippets.hbs = escapeCode(code);

                // need to use the classic.hbs file path for forwarding because the DynamicTemplate relies on the hbs/js files to render the preview - so the fileName must include the .classic extension
                fileNameToForward = filePath.match(fileNameRegex)?.[1];
              }

              if (
                ext === '.classic.js' &&
                shouldIncludeBackingClass !== 'false'
              ) {
                codeSnippets.js = escapeCode(code);
              }

              if (ext === '.gts') {
                codeSnippets.gts = escapeCode(code);
                codeSnippets.compactGts = escapeCode(
                  getCompactGtsSnippet(code),
                );
              }

              if (
                ext === '.scss' ||
                ext === '.yaml' ||
                ext === '.bash' ||
                ext === '.ts'
              ) {
                codeSnippets.custom = escapeCode(code);
                codeSnippets.customLang = ext.substring(1); // remove the dot from the extension
              }
            }
          });

          // NOTE: if change this, also need to change the regex in content-blocks.js
          return `\n<?php start="demo-block" filename="${fileNameToForward}" hbs="${codeSnippets.hbs}" js="${codeSnippets.js}" gts="${codeSnippets.gts}" compactGts="${codeSnippets.compactGts}" custom="${codeSnippets.custom}" customLang="${codeSnippets.customLang}" hidePreview="${shouldHidePreview}" expanded="${isExpanded}" ?><?php end="demo-block" ?>\n`;
        },
      );

      // Write the processed file
      if (fs.existsSync(outputFolder)) {
        fs.ensureDirSync(fullOutputFolder);
        fs.writeFileSync(fullOutputPath, markdownFileContent);
      } else {
        console.error(
          'Error: destination folder (`outputFolder`) does not exist',
          outputFolder,
        );
      }

      return {
        dependencies,
      };
    });
  }
}

module.exports = function (folder) {
  const sourceMarkdownFunnel = new Funnel(folder, {
    include: [
      '**/*.md',
      '**/*.hbs',
      '**/*.js',
      '**/*.gts',
      '**/*.scss',
      '**/*.yaml',
      '**/*.bash',
      '**/*.ts',
    ],
  });

  const processedTree = new MarkdownReplaceDemoBlocks([sourceMarkdownFunnel]);

  return processedTree;
};
