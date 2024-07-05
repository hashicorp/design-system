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
  'layouts',
  'overrides',
  'utilities',
  'patterns',
  'testing',
];

const sortPages = (s1, s2) => {
  // if they are siblings...
  if (isEqual(s1.pageParents, s2.pageParents)) {
    // we use the order first... (notice: we know it's _always_ defined in the TOC items)
    const o1 = s1.pageAttributes.navigation.order;
    const o2 = s2.pageAttributes.navigation.order;
    if (o1 < o2) {
      return -1;
    } else if (o1 > o2) {
      return 1;
    } else {
      // or we fallback to sort alphabetically
      return s1.pageName.localeCompare(s2.pageName);
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
          'navigation',
          'previewImage',
          'status',
        ]);
      } else {
        console.log('File NOT found!', fullFilePath);
        pageAttributes = {};
      }

      // assign a default "order" value if not explicitly set
      // notice: it's used for sorting criteria in the navigation
      if (!pageAttributes?.navigation?.order) {
        // IMPORTANT: this automatically ensures that `pageAttributes.navigation` is always defined! (no need to check that exists in other parts of the codebase)
        set(pageAttributes, 'navigation.order', 100);
      }

      flatPageList.push({
        filePath,
        pageURL,
        pageName,
        pageParents,
        pageAttributes,
      });
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
