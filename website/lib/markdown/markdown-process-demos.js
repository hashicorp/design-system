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

// Regex to match [[demo: filename.hbs]]
const demoBlockRegex = /\[\[demo:\s*([^\]]+\.hbs)\s*\]\]/g;

// Helper to escape code for attribute usage
function escapeCode(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '\\n');
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
        (_match, fileName, _content) => {
          const demoFilePath = path.join(fullParentFolder, fileName.trim());
          let code = '';
          if (fs.existsSync(demoFilePath)) {
            code = fs.readFileSync(demoFilePath, 'utf8');
            dependencies.push(demoFilePath);
          } else {
            code = `// Unable to load file: ${fileName}, path: ${demoFilePath}`;
          }
          const escapedCode = escapeCode(code);

          const gtsFileName = fileName
            .trim()
            .replace(/\.hbs$/, '-component.gts');
          const gtsFilePath = path.join(fullParentFolder, gtsFileName);
          let gtsCode = '';
          if (fs.existsSync(gtsFilePath)) {
            gtsCode = fs.readFileSync(gtsFilePath, 'utf8');
            dependencies.push(gtsFilePath);
          } else {
            gtsCode = `// Unable to load file: ${gtsFileName}, path: ${gtsFilePath}`;
          }
          const escapedGtsCode = escapeCode(gtsCode);

          return `\n<?php start="demo-block" filename="${fileName.trim()}" hbs="${escapedCode}" gts="${escapedGtsCode}" ?><?php end="demo-block" ?>\n`;
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
    include: ['**/*.md', '**/*.hbs', '**/*.gts'],
  });

  const processedTree = new MarkdownReplaceDemoBlocks([sourceMarkdownFunnel]);

  return processedTree;
};
