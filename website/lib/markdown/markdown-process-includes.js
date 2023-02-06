/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// RELEVANT LINKS
// - https://gist.github.com/machty/0360f5ef2a257dace0ddb5c1d153c963 (inspiration for this approach)
// - https://github.com/broccolijs/broccoli-multifilter
// - https://cs.github.com/?scopeName=All+repos&scope=&q=%22broccoli-multifilter%22
// - https://github.com/givanse/shadow-dom-v1-broccoli-example/blob/8e56e0aaeddfe77a6074f1b2d97e2ba0d35dad58/broccoli-register-elements.js

/* eslint-env node */

const Multifilter = require('broccoli-multifilter');
const Funnel = require('broccoli-funnel');
const fs = require('fs-extra');
const path = require('path');
const walkSync = require('walk-sync');

// https://regex101.com/r/tesSl8/1
const includeRegex = new RegExp(/^\s*@include "(.*\.md)"\s*$/, 'gm');

const getFileContent = (folderPath, filePath) => {
  if (filePath.startsWith('.')) {
    return `[ERROR INCLUDING FILE ${filePath}: the file path must be relative (no '../' or './' are allowed)]`;
  }
  const fullFilePath = path.join(folderPath, filePath);
  if (fs.existsSync(fullFilePath)) {
    const fileContent = fs.readFileSync(fullFilePath, 'utf-8');
    return `\n<!-- file included: ${filePath} -->\n\n${fileContent}\n\n`;
  } else {
    return `[ERROR INCLUDING FILE ${fullFilePath}: the file path does not exist (no file found)]`;
  }
};

class MarkdownProcessIncludes extends Multifilter {
  build() {
    const inputFolder = this.inputPaths[0];
    const inputFiles = walkSync(inputFolder, {
      globs: ['**/*.md'],
      // we exclude from the generated tree (passed down the pipeline)
      // all the "partials" files (they're used only to be included in a parent markdown file)
      ignore: ['**/partials/**/*.md'],
    });

    return this.buildAndCache(inputFiles, (inputFile, outputFolder) => {
      const fullInputPath = path.join(inputFolder, inputFile);
      const fullParentFolder = path.dirname(fullInputPath);
      const fullOutputPath = path.join(outputFolder, inputFile);
      const fullOutputFolder = path.dirname(fullOutputPath);

      const markdownFileContent = fs.readFileSync(fullInputPath, 'utf8');

      // PROCESS MARKDOWN
      // we replace the `@include` directive with the actual content of the included file
      //
      const includedFiles = [];
      let newMarkdownFileContent;
      if (markdownFileContent.match(includeRegex)) {
        newMarkdownFileContent = markdownFileContent.replace(
          includeRegex,
          (_match, capture1) => {
            includedFiles.push(path.join(fullParentFolder, capture1));
            return getFileContent(fullParentFolder, capture1);
          }
        );
      } else {
        newMarkdownFileContent = markdownFileContent;
      }

      if (fs.existsSync(outputFolder)) {
        if (fs.existsSync(fullOutputPath)) {
          console.error(
            'Error: destination file (`fullOutputPath`) already exists',
            fullOutputPath
          );
        } else {
          // IMPORTANT: we have to make sure the parent folders of the file exist, before writing!
          fs.ensureDirSync(fullOutputFolder);
          fs.writeFileSync(fullOutputPath, newMarkdownFileContent);
        }
      } else {
        console.error(
          'Error: destination folder (`outputFolder`) does not exist',
          outputFolder
        );
      }

      return {
        // "dependencies" = list of files that will trigger a rebuild when changed
        // see: https://github.com/broccolijs/broccoli-multifilter#reference
        dependencies: [fullInputPath, ...includedFiles],
      };
    });
  }
}

module.exports = function (folder) {
  const sourceMarkdownFunnel = new Funnel(folder, {
    include: ['**/*.md'],
    // TODO! when you're sure everything works, delete this commented line (if uncommented, creates a "docs" sub-subfolder: `docs/docs/***` )
    // destDir: folder,
  });

  const processedTree = new MarkdownProcessIncludes([sourceMarkdownFunnel]);

  // return new MergeTrees([processedTree], {
  //   overwrite: true,
  // });
  return processedTree;
};
