import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

const jsonSourceFolder = path.resolve(__dirname, '../docs3');

const files: string[] = [
  // 'components/form/checkbox/index',
  'overview/hds-principles',
  // 'components/alert/index',
  'overview/about',
];

const flatPageList = getFlatPageList(files);

// console.log(
//   'getFlatPageList',
//   JSON.stringify(flatPageList, null, 2)
// );

const sortedDirectoryTree = getSortedDirectoryTree(flatPageList);

console.log(
  'getSortedDirectoryTree',
  JSON.stringify(sortedDirectoryTree, null, 2)
);

// const populatedDirectoryTree = getPopulatedDirectoryTree(structuredDirectoryTree);

// write the files in outpur
// saveJsonFiles(flatPageList, sortedDirectoryTree);

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
    parts.pop(); // remove the file from the path, so we have only the "parent" folders
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
    pageAttributes.weight = pageAttributes.weight ?? 1000;

    list.push({ filePath, pageURL, pageParents, pageAttributes });
  });

  return list;
}

function getSortedDirectoryTree(pageList: Record<string, unknown>[]) {
  const tree: Record<string, unknown> = {};

  // console.log('AAA', pageList);

  pageList.forEach((page) => {
    console.log('\n\n\nBBB1 page', page.filePath);
    console.log('BBB2 page.pageParents', page.pageParents);
    console.log('BBB3 _.has(tree, page.pageParents)', _.has(tree, page.pageParents));
    console.log('BBB4 _.get(tree, page.pageParents)', _.get(tree, page.pageParents), typeof _.get(tree, page.pageParents), _.isArray(_.get(tree, page.pageParents)), _.get(tree, page.pageParents)?.length);
    if (_.has(tree, page.pageParents)) {
      _.get(tree, page.pageParents).push(page);
    } else {
      _.set(tree, page.pageParents, [page]);
    }
    console.log('BBB5 _.get(tree, page.pageParents)', _.get(tree, page.pageParents), typeof _.get(tree, page.pageParents), _.isArray(_.get(tree, page.pageParents)), _.get(tree, page.pageParents)?.length);
  });

  // sortTree(tree);

  return tree;
}

function sortTree(pageTree: Record<string, unknown>) {
  _.forIn(pageTree, function (subTree, key) {
    if (_.isArray(subTree)) {
      console.log('key', key)
      // do something
      // pageTree[key] = ['AAA!']
    } else {
      sortTree(subTree);
    }
  });

  return pageTree;
}

// function getSortedDirectoryTree(
//   srcTree: Record<string, unknown>,
//   path?: string
// ) {
//   const tree: Record<string, unknown> = {};

//   _.forIn(srcTree, function (subTree, key) {
//     const currPath = path ? `${path}/${key}` : key;
//     if (Array.isArray(subTree)) {
//       if (subTree.includes('index')) {
//         tree[key] = {
//           pages: [
//             {
//               fileName: 'index',
//               parentPath: currPath,
//               siblings: _.pull(subTree, 'index').map((page) => {
//                 return {
//                   fileName: page,
//                   parentPath: currPath,
//                 };
//               }),
//             },
//           ],
//         };
//       } else {
//         tree[key] = {
//           pages: subTree.map((page) => {
//             return {
//               fileName: page,
//               parentPath: currPath,
//             };
//           }),
//         };
//       }
//     } else {
//       tree[key] = getStructuredDirectoryTree(subTree, currPath);
//     }
//   });

//   return tree;
// }

function saveJsonFiles(populatedDirectoryTree, flatPageList) {
  // TODO tbd where this file is stored (plus, needs to be much richer in meta-information)
  fs.writeFileSync(
    `${jsonSourceFolder}/tocs/flat-page-list.json`,
    JSON.stringify(flatPageList)
  );

  flatPageList.forEach((page: Record<string, unknown>) => {
    if (page.fileName === 'index') {
      // const path
      const pathData = _.get(
        populatedDirectoryTree,
        page.parentPath.split('/')
      );
      // we're making an assumption here, based on the fact that this is what we're building in other parts of the code above
      const indexData = pathData.pages[0];
      // console.log('indexData', page.parentPath, indexData);
      fs.writeFileSync(
        `${jsonSourceFolder}/${page.parentPath}/index.json`,
        JSON.stringify(indexData)
      );
    }
  });
}
