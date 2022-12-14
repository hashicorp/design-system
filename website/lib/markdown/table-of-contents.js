// RELEVANT LINKS
// - https://github.com/empress/field-guide/blob/master/lib/table-of-contents.js (__heavily__ inspired)

/* eslint-env node */

const walkSync = require('walk-sync');
const Plugin = require('broccoli-plugin');
const fs = require('fs-extra');
const _ = require('lodash');

// const CATEGORIES = [
//   'about',
//   'overview',
//   'getting-started',
//   'updates',
//   'foundations',
//   'components',
//   'overrides',
//   'utilities',
//   'patterns',
//   'testing',
// ];

class TableOfContents extends Plugin {
  constructor(inputNodes, folder) {
    super([inputNodes]);
    this.folder = folder;
  }

  build() {
    const inputFolder = this.inputPaths[0];
    // const inputDir = `${dir}/${this.folder}`;

    const inputFiles = walkSync(inputFolder, {
      globs: ['**/*.json'],
    }).map((path) => path.replace(/\.json$/, ''));

    const flatPageList = [];
    const structuredPageTree = {};

    inputFiles.forEach((filePath) => {
      // store the full file path (used to read the JSON file)
      const fullFilePath = `${inputFolder}/${filePath}.json`;

      // strip away the "docs" folder from the file path
      filePath = filePath.replace(/^docs\//, '');

      // strip away the "index" from the file path (and remove any trailing `/`)
      const pageURL = filePath.replace(/(\/index)?\/?$/, '');

      // get the "parent" folders in an array (will be used later to build a page tree)
      const parts = pageURL.split('/');
      const pageName = parts.pop(); // extract the file from the path (notice: this modifies the original array, so we are left with only the "parent" folders)
      const pageParents = parts;

      // get "frontmatter" attributes
      let pageAttributes;
      if (fs.existsSync(fullFilePath)) {
        const jsonData = fs.readJSONSync(fullFilePath);
        // notice: the page attributes are quite verbose, so we select only a subset (what we really need for the TOC generation)
        pageAttributes = _.pick(jsonData.data.attributes, [
          'title',
          'caption',
          'weight',
          'hidden',
        ]);
      } else {
        console.log('File NOT found!', fullFilePath);
        pageAttributes = {};
      }

      // assign a "weight" using the frontmatter value (or a default)
      // notice: it's used for sorting criteria in the navigation
      pageAttributes.weight = pageAttributes.weight ?? 100;

      if (!pageAttributes.hidden) {
        flatPageList.push({
          filePath,
          pageURL,
          pageName,
          pageParents,
          pageAttributes,
        });
      }
    });

    // notice: we pre-sort the list so we don't need to do it in the structured tree (much harder!)
    // flatPageList = flatPageList.sort(sortPages);

    flatPageList.forEach((page) => {
      // we have to rebuild the full structure here
      _.set(structuredPageTree, [...page.pageParents, page.pageName], page);
    });

    const toc = { flat: flatPageList, tree: structuredPageTree };

    // IMPORTANT: we have to make sure the parent folders of the file exist, before writing!
    fs.ensureDirSync(this.outputPath);
    fs.writeJsonSync(`${this.outputPath}/toc.json`, toc);

    return;
  }
}

module.exports = TableOfContents;
