/* eslint-disable prettier/prettier */
/* eslint-env node */

const walkSync = require('walk-sync');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const Plugin = require('broccoli-plugin');

const { join } = require('path');
const { existsSync, writeFileSync } = require('fs');

function addPages(pages, path) {
  if(!pages.length) return;

  let outputPages = [];

  let groups = _.groupBy(pages, item => item[0]);

  // remove the grouped key
  _.forEach(groups, (value) => {
    value.forEach((arr) => arr.shift());
  });

  _.forEach(groups, (value, key) => {
    let subPages = value.filter((arr) => arr.length === 1);
    let subSections = value.filter((arr) => arr.length > 1);


    let newPage = {
      id: `${path ? path + '/': ''}${key}`,
      title: key,
      pages: subPages.map((page) => {
        return {
          id: `${path ? path + '/': ''}${key}/${page}`,
          title: page[0],
          // pages: addPages(subSections, key)
        }
      })
    };

    if(subSections.length) {
      newPage.pages = newPage.pages.concat(addPages(subSections, key));
    }

    outputPages.push(newPage);
  })

  return outputPages;
}

class TableOfContents extends Plugin {
  constructor(inputNodes, options = {}) {
    super([inputNodes], options)

    this.options = options;
  }

  build() {
    this.inputPaths.forEach((dir) => {
      const inputDir = this.options.subdir ? join(dir, this.options.subdir) : dir;

      const pages = walkSync(inputDir)
          .filter(path => path.endsWith('.json'))
          .filter(path => path != 'all.json')
          .map(path => path.replace(/\.json$/, ''))
          .map(path => path.split('/'));

      let toc = addPages(pages);

      let outputFolder = this.options.outputDir ? join(this.outputPath, this.options.outputDir) : this.outputPath;

      if (!existsSync(outputFolder)) {
        mkdirp.sync(outputFolder);
      }

      writeFileSync(join(outputFolder, 'toc.json'), JSON.stringify(toc));

      return;
    })
  }
}

module.exports = TableOfContents;
