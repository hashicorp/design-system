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
  /\[\[demo:\s*([^\]\s]+\.(?:hbs|gts|js))(?:\s+execute=(true|false))?(?:\s+includeBackingClass=(true|false))?\s*\]\]/g;
const fileNameRegex = /(components\/.*?)\.(?:hbs|gts|js)$/;

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
    .replace(/\\n$/, ''); // Remove trailing newline
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
          const demoFilePath = path.join(fullParentFolder, fileName.trim());
          const fileNameToForward = demoFilePath.match(fileNameRegex)?.[1];
          const shouldHidePreview = shouldExecute === 'false' ? true : false;

          let code = '';
          if (fs.existsSync(demoFilePath)) {
            code = fs.readFileSync(demoFilePath, 'utf8');
            dependencies.push(demoFilePath);
          } else {
            code = `// Unable to load file: ${fileName}, path: ${demoFilePath}`;
          }
          const escapedCode = escapeCode(code);
          let escapedHbsCode = '';
          let escapedGtsCode = '';
          let escapedJsCode = '';

          const isJsFile = fileName.trim().endsWith('.js');

          if (isJsFile) {
            escapedJsCode = escapedCode;
          } else {
            escapedHbsCode = escapedCode;
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
            escapedGtsCode = escapeCode(gtsCode);

            if (shouldIncludeBackingClass !== 'false') {
              const jsFileName = fileName.trim().replace(/\.hbs$/, '.js');
              const jsFilePath = path.join(fullParentFolder, jsFileName);
              let jsCode = '';
              if (fs.existsSync(jsFilePath)) {
                jsCode = fs.readFileSync(jsFilePath, 'utf8');
                dependencies.push(jsFilePath);
              }
              escapedJsCode = escapeCode(jsCode);
            }
          }

          return `\n<?php start="demo-block" filename="${fileNameToForward}" hbs="${escapedHbsCode}" gts="${escapedGtsCode}" hidePreview="${shouldHidePreview}" js="${escapedJsCode}" ?><?php end="demo-block" ?>\n`;
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
