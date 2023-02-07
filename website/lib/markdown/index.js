/* eslint-disable node/no-extraneous-require */
/* eslint-env node */

'use strict';

const fs = require('fs-extra');
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
  urlsForPrember(distDir) {
    const flatPageListJson = fs.readJsonSync(`${distDir}/toc.json`);
    // TODO is there a way to have this list generated automatically (or exported) from the routes (`website/app/router.js`)?
    const staticURLs = [
      '/',
      'about',
      'foundations',
      'components',
      'patterns',
      'error',
    ];
    const docsURLs = flatPageListJson.flat
      // since this list will used to generate the sitemap.xml file, we need to hide the `hidden` pages from the output
      .filter((page) => !page.pageAttributes?.navigation?.hidden)
      .map((page) => page.pageURL);

    return [...staticURLs, ...docsURLs];
  },
};
