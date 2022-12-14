// RELEVANT LINKS
// - https://github.com/empress/field-guide/blob/master/lib/table-of-contents.js (__heavily__ inspired)

/* eslint-env node */

const walkSync = require('walk-sync');
const Plugin = require('broccoli-plugin');
const fs = require('fs-extra');
const { pick, set, isEqual } = require('lodash');

const CATEGORIES = [
  'about',
  'getting-started',
  'updates',
  'foundations',
  'components',
  'overrides',
  'utilities',
  'patterns',
  'testing',
];

const sortPages = (s1, s2) => {
  if (
    s1.filePath === 'components/form/checkbox/index' &&
    s2.filePath === 'components/badge/index'
  ) {
    console.log('s1-s2 (form/checkbox vs badge)', s1, s2);
  }
  // if they are siblings...
  if (isEqual(s1.pageParents, s2.pageParents)) {
    //  we use the weight first...
    if (s1.pageAttributes.weight < s2.pageAttributes.weight) {
      return -1;
    } else if (s1.pageAttributes.weight > s2.pageAttributes.weight) {
      return 1;
    } else {
      // or we fallback to sort alphabethically
      const p1 = s1.pageName.toLowerCase;
      const p2 = s2.pageName.toLowerCase;
      if (p1 < p2) {
        return 1;
      } else if (p1 > p2) {
        return -1;
      } else {
        return 0;
      }
    }
  } else {
    // we try to use the top-level category
    const c1 = CATEGORIES.indexOf(s1.pageParents[0].toLowerCase());
    const c2 = CATEGORIES.indexOf(s2.pageParents[0].toLowerCase());
    if (c1 < c2) {
      return -1;
    } else if (c1 > c2) {
      return 1;
    } else {
      // the natural "file system" order works here
      return 0;
      // or if it doesn't try to tweak this logic
      // const p1 = s1.filePath;
      // const p2 = s2.filePath;
      // if (p1 < p2) {
      //   return -1;
      // } else if (p1 > p2) {
      //   return 1;
      // } else {
      //   return 0;
      // }
    }
  }
};

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
        pageAttributes = pick(jsonData.data.attributes, [
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
    // const flatSortedPageList = [...flatPageList].sort(sortPages); // use this if you want to maintain the
    flatPageList.sort(sortPages);

    flatPageList.forEach((page) => {
      // we have to rebuild the full structure here
      set(structuredPageTree, [...page.pageParents, page.pageName], page);
    });

    const toc = { flat: flatPageList, tree: structuredPageTree };

    // IMPORTANT: we have to make sure the parent folders of the file exist, before writing!
    fs.ensureDirSync(this.outputPath);
    fs.writeJsonSync(`${this.outputPath}/toc.json`, toc);

    return;
  }
}

module.exports = TableOfContents;
