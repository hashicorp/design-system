import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

const jsonSourceFolder = path.resolve(__dirname, '../docs3');

const files: string[] = [
  // 'components/form/checkbox/index',
  'overview/hds-principles',
  // 'components/alert/index',
  'overview/about',
  // 'overview/xxx',
];

const flatPageList = getFlatPageList(files);

console.log(
  'getFlatPageList',
  JSON.stringify(flatPageList, null, 2)
);

const structuredPageTree = getStructuredPageTree(flatPageList);

console.log(
  'getStructuredPageTree',
  JSON.stringify(structuredPageTree, null, 2)
);

// write the files in output
// fs.writeJsonSync(
//   `${jsonSourceFolder}/toc.json`,
//   { flat: flatPageList, tree: structuredPageTree}
// );


// ################################################
// ################################################
// ################################################

function getFlatPageList(files: string[]) {
  if (!files.length) return;

  const list: Record<string, unknown>[] = [];

  files.forEach((filePath) => {
    // get the "page" information

    // strip away the "index" from the file path (and remove any trailing `/`)
    const pageURL = filePath.replace(/(\/index)?\/?$/, '');

    // get the "parent" folders in an array (will be used later to build a page tree)
    const parts = pageURL.split('/');
    const pageName = parts.pop(); // extract the file from the path (notice: this modifies the original array, so we are left with only the "parent" folders)
    const pageParents = parts;

    // get "frontmatter" attributes
    let pageAttributes;
    const fullFilePath = `${jsonSourceFolder}/${filePath}.json`;
    if (fs.existsSync(fullFilePath)) {
      const jsonData = fs.readJSONSync(fullFilePath);
      // notice: the page attributes are quite verbose, so we select only a subset (what we really need for the TOC generation)
      pageAttributes = _.pick(jsonData.data.attributes, ['title']);
    } else {
      console.log('File NOT found!', fullFilePath);
      pageAttributes = {};
    }

    // assign a "weight" using the frontmatter value (or a default)
    // notice: it's used for sorting criteria in the navigation
    pageAttributes.weight = pageAttributes.weight ?? 100;

    list.push({ filePath, pageURL, pageName, pageParents, pageAttributes });
  });

  // notice: we pre-sort the list so we don't need to do it in the structured tree (much harder!)
  return list.sort(sortPages);
}


const CATEGORIES = ['about', 'overview', 'getting-started', 'updates','foundations','components', 'overrides', 'utilities','patterns','testing'];

function sortPagesXXX(s1, s2) {
  // if they belong to different first-level categories
  const c1 = CATEGORIES.indexOf(s1.pageParents[0].toLowerCase());
  const c2 = CATEGORIES.indexOf(s2.pageParents[0].toLowerCase());
  if (c1 < c2) {
    return 1;
  } else if (c1 > c2) {
    return -1;
  } else {
    // if they both are "leaf" pages we use the weight
    if (s1.pageURL && s2.pageURL) {
      if (s1.pageAttributes.weight < s2.pageAttributes.weight) {
        return 1;
      } else if (s1.pageAttributes.weight > s2.pageAttributes.weight) {
        return -1;
      } else {
        // if the "pages" have the same weight, we sort alphabethically
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
      // we have a "leaf" page and a "subcategory" object, we can sort them only alphabetically
      // const x1 = s1.pageURL ? s1.pageName.toLowerCase :
      return 0;
    }
  }
}

function sortPages(s1, s2) {
  debugger;
  // if they are siblings...
  if (_.isEqual(s1.pageParents, s2.pageParents)) {
    //  we use the weight first...
    if (s1.pageAttributes.weight < s2.pageAttributes.weight) {
      return 1;
    } else if (s1.pageAttributes.weight > s2.pageAttributes.weight) {
      return -1;
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
    // TODO!
    return 0;
  }
  // const c1 = CATEGORIES.indexOf(s1.pageParents[0].toLowerCase());
  // const c2 = CATEGORIES.indexOf(s2.pageParents[0].toLowerCase());
  // if (c1 < c2) {
  //   return 1;
  // } else if (c1 > c2) {
  //   return -1;
  // } else {
  //   return 0;
  // }
}

function getStructuredPageTree(pageList: Record<string, unknown>[]) {
  const tree: Record<string, unknown> = {};

  pageList.forEach((page) => {
    // we have to rebuild the full structure here
    _.set(tree, [...page.pageParents, page.pageName], page);
  });

  return tree;
}