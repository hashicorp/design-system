/* eslint-disable node/no-extraneous-require */
/* eslint-env node */

'use strict';
const path = require('path');
const resolve = require('resolve');

const MarkdownProcessIncludeDirectives = require('./markdown-process-includes');
const MarkdownToJson = require('./markdown-to-jsonapi');
const TableOfContents = require('./table-of-contents');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'markdown',
  isDevelopingAddon() {
    return true;
  },

  included() {
    this.import('vendor/ember/ember-template-compiler.js');

    this._super.included.apply(this, arguments);
  },

  treeForApp() {
    let backingClasses = new Funnel('docs', {
      destDir: 'components',
      include: ['**/*.js'],
    });
    return new MergeTrees([backingClasses]);
  },

  treeForVendor(vendor) {
    let templateCompilerTree = new Funnel(
      path.dirname(resolve.sync('ember-source/package.json'), {
        basedir: this.project.root,
      }),
      {
        srcDir: 'dist',
        destDir: 'ember',
      }
    );
    return new MergeTrees([vendor, templateCompilerTree].filter(Boolean));
  },

  treeForPublic: function () {
    let processedDocsMardownFilesTree = new MarkdownProcessIncludeDirectives(
      'docs'
    );
    let processedDocsJsonFilesTree = new MarkdownToJson(
      processedDocsMardownFilesTree,
      'docs'
    );

    let processedTocFiles = new TableOfContents(
      processedDocsJsonFilesTree,
      'docs'
    );

    return new MergeTrees([processedDocsJsonFilesTree, processedTocFiles]);
  },
};
