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
  /\[\[demo:\s*([^\]\s]+)(?:\s+execute=(true|false))?(?:\s+includeBackingClass=(true|false))?\s*\]\]/g;

const fileNameRegex = /(components\/.*?)\.(?:hbs|gts|js)$/;

const SUPPORTED_FILE_EXTENSIONS = ['.classic.hbs', '.gts', '.classic.js'];

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
        (_match, fileName, shouldExecute, shouldIncludeBackingClass) => {
          const shouldHidePreview = shouldExecute === 'false' ? true : false;

          const codeSnippets = {
            hbs: '',
            gts: '',
            js: '',
            compactGts: '',
          };

          let fileNameToForward = '';

          SUPPORTED_FILE_EXTENSIONS.forEach((ext) => {
            const fileToCheck = `${fileName.trim()}${ext}`;
            const filePath = path.join(fullParentFolder, fileToCheck);

            fileNameToForward = filePath.match(fileNameRegex)?.[1];

            const shouldIgnoreFile =
              shouldIncludeBackingClass === 'false' && ext === '.classic.js';

            if (!shouldIgnoreFile && fs.existsSync(filePath)) {
              const code = fs.readFileSync(filePath, 'utf8');
              dependencies.push(filePath);

              if (ext === '.classic.hbs') {
                codeSnippets.hbs = escapeCode(code);
              }
              if (ext === '.gts') {
                codeSnippets.gts = escapeCode(code);
                codeSnippets.compactGts = escapeCode(
                  getCompactGtsSnippet(code),
                );
              }
              if (ext === '.classic.js') {
                codeSnippets.js = escapeCode(code);
              }
            }
          });

          return `\n<?php start="demo-block" filename="${fileNameToForward}" hbs="${codeSnippets.hbs}" gts="${codeSnippets.gts}" compactGts="${codeSnippets.compactGts}" hidePreview="${shouldHidePreview}" js="${codeSnippets.js}" ?><?php end="demo-block" ?>\n`;
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
    include: ['**/*.md', '**/*.hbs', '**/*.gts', '**/*.js'],
  });

  const processedTree = new MarkdownReplaceDemoBlocks([sourceMarkdownFunnel]);

  return processedTree;
};
