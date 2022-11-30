/* eslint-env node */

'use strict';

const path = require('path');
const resolve = require('resolve');
const walkSync = require('walk-sync');

const MarkdownProcessIncludeDirectives = require('./lib/markdown-process-includes');
const MarkdownToJson = require('./lib/markdown-to-jsonapi');
const TableOfContents = require('./lib/table-of-contents');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  config(env, config) {
    let fastboot = config.fastboot || {};

    if (fastboot.hostWhitelist) {
      fastboot.hostWhitelist.push(/localhost:\d+/);
    } else {
      fastboot.hostWhitelist = [/localhost:\d+/];
    }

    return {
      fastboot,
    };
  },

  // preprocessTree(type, tree) {
  //   console.log('### preprocessTree', type, tree);
  // },

  // preBuild(result) {
  //   console.log('### preBuild result', result);
  // },

  // postBuild(result) {
  //   console.log('### postBuild', result);
  // },

  treeForApp(tree) {
    let backingClasses = new Funnel('docs', {
      destDir: 'components',
      include: ['**/*.js'],
    });
    return new MergeTrees([tree, backingClasses]);
  },

  included(app) {
    this.import('vendor/ember/ember-template-compiler.js');

    if (!app.options['ember-prism']) {
      app.options['ember-prism'] = {
        // theme: 'okaidia',

        components: [
          'apacheconf',
          'bash',
          'css',
          'handlebars',
          'http',
          'javascript',
          'json',
          'markup-templating',
          'ruby',
          'scss',
        ],

        plugins: ['line-numbers', 'normalize-whitespace'],
      };
    }

    this._super.included.apply(this, arguments);
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

    let toc = new TableOfContents(processedDocsJsonFilesTree, {
      subdir: 'docs',
    });

    return new MergeTrees([
      processedDocsJsonFilesTree,
      toc,
      // processedMardownFilesTree
    ]);
  },

  urlsForPrember() {
    // TODO! this should be based on the JSON files, not the markdown!
    // (or even better, use the generated "flat list" of pages)
    const content = walkSync('docs', {
      globs: ['**/*.md'],
    });

    const staticUrls = ['/'];

    const contentUrls = content.map((file) => file.replace(/\.md$/, ''));

    return [...staticUrls, ...contentUrls];
  },
};
