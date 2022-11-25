/* eslint-disable prettier/prettier */
'use strict';

const path = require('path');
const resolve = require('resolve');
const walkSync = require('walk-sync');

const ProcessMarkdownToJson = require('./lib/broccoli-markdown-to-json');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const TableOfContents = require('./lib/table-of-contents');

module.exports = {
  name: require('./package').name,

  config(env, config) {
    let fastboot = config.fastboot || {};

    if(fastboot.hostWhitelist) {
      fastboot.hostWhitelist.push(/localhost:\d+/);
    } else {
      fastboot.hostWhitelist = [/localhost:\d+/];
    }

    return {
      fastboot,
    }
  },

  treeForApp(tree) {
    let backingClasses = new Funnel(
      'docs',
      {
        destDir: 'components',
        include: ['**/*.js']
      }
    );
    return new MergeTrees([tree, backingClasses]);
  },

  included(app) {
    this.import('vendor/ember/ember-template-compiler.js');

    if(!app.options['ember-prism']) {
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
          'scss'
        ],

        plugins: ['line-numbers', 'normalize-whitespace']
      }
    }

    this._super.included.apply(this, arguments);
  },

  treeForVendor(vendor) {
    let templateCompilerTree = new Funnel(
      path.dirname(resolve.sync('ember-source/package.json'), { basedir: this.project.root }),
      {
        srcDir: 'dist',
        destDir: 'ember'
      }
    );
    return new MergeTrees([
      vendor,
      templateCompilerTree,
    ].filter(Boolean));
  },

  treeForPublic: function() {
    let docs = new ProcessMarkdownToJson('docs', {
      contentFolder: 'docs',
      // collate: false, // at the moment we don't need (and use) the collated file `all.json`
      // NOTICE: no need to export also pre-generated HTML, we're going to use out converter (instead of the one provided by `broccoli-static-site-json`)
      contentTypes: ['content', 'toc'], // before it was: ['content', 'html', 'toc'],
      // IMPORTANT: according to the documentation, the frontmatter attributes that we want to include need to be explicitly declared ¯\_(ツ)_/¯
      // see: https://github.com/empress/broccoli-static-site-json#attributes
      attributes: [ // NOTICE: this list for now needs to be _manually_ aligned with a similar one found in `addons/field-guide/addon/routes/show.js`
        'category',
        'group',
        'component',
        'section',
        'layout',
        'title',
        'description',
        'caption',
        'status',
      ],
    });

    let toc = new TableOfContents(docs, {
      subdir: 'docs',
    });

    return new MergeTrees([
      docs,
      toc,
    ]);
  },

  urlsForPrember() {
    // TODO! this should be based on the JSON files, not the markdown!
    // (or even better, use the generated "flat list" of pages)
    const content = walkSync('docs', {
      globs: ['**/*.md'],
    });

    const staticUrls = ['/'];

    const contentUrls = content.map(file => file.replace(/\.md$/, ''));

    return [...staticUrls, ...contentUrls];
  },
};
