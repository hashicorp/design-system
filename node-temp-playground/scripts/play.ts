// import { glob } from 'glob';
import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';
import { parentPort } from 'worker_threads';

const jsonSourceFolder = path.resolve(__dirname, '../../website/dist/docs');

const files: string[] = [
  'components/alert/01--overview',
  'components/alert/02--component-api',
  'components/alert/03--how-to-use',
  'components/alert/04--design-guidelines',
  'components/alert/05--accessibility',
  'components/alert/06--showcase',
  'components/alert/index',
  'components/form/checkbox/01--overview',
  'components/form/checkbox/02--component-api',
  'components/form/checkbox/03--how-to-use',
  'components/form/checkbox/04--design-guidelines',
  'components/form/checkbox/05--accessibility',
  'components/form/checkbox/06--showcase',
  'components/form/checkbox/index',
  'overview/01--about',
  'overview/02--hds-principles',
];

// console.log(JSON.stringify({files}, null, 2));

const basicDirectoryTree = getBasicDirectoryTree(files);

const structuredDirectoryTree = getStructuredDirectoryTree(basicDirectoryTree);
const populatedDirectoryTree = getPopulatedDirectoryTree(structuredDirectoryTree);
// console.log(
//   'populatedDirectoryTree',
//   JSON.stringify(populatedDirectoryTree, null, 2)
// );
// this is an MVP for the routing
const flatPageList = getFlatPageList(populatedDirectoryTree);
console.log(
  'getFlatPageList',
  JSON.stringify(flatPageList, null, 2)
);

// ################################################
// ################################################
// ################################################

function getBasicDirectoryTree(files: string[]) {
  if (!files.length) return;

  const tree: Record<string, unknown> = {};

  files.forEach((file) => {
    const parts = file.split('/');
    const filename = parts.pop();
    if (_.has(tree, parts)) {
      _.get(tree, parts).push(filename);
    } else {
      _.set(tree, parts, [filename]);
    }
  });

  return tree;
}

function getStructuredDirectoryTree(
  srcTree: Record<string, unknown>,
  path?: string
) {
  const tree: Record<string, unknown> = {};

  _.forIn(srcTree, function (subTree, key) {
    const currPath = path ? `${path}/${key}` : key;
    if (Array.isArray(subTree)) {
      if (subTree.includes('index')) {
        tree[key] = {
          pages: [
            {
              fileName: 'index',
              parentPath: currPath,
              siblings: _.pull(subTree, 'index').map((page) => {
                return {
                  fileName: page,
                  parentPath: currPath,
                };
              }),
            },
          ],
        };
      } else {
        tree[key] = {
          pages: subTree.map((page) => {
            return {
              fileName: page,
              parentPath: currPath,
            };
          }),
        };
      }
    } else {
      tree[key] = getStructuredDirectoryTree(subTree, currPath);
    }
  });

  return tree;
}

function getPopulatedDirectoryTree(srcTree: Record<string, unknown>) {
  const tree: Record<string, unknown> = {};

  _.forIn(srcTree, function (subTree: any) {
    if (_.has(subTree, 'pages') && Array.isArray(subTree?.pages)) {
      subTree.pages.forEach((page: Record<string, unknown>) => {
        addAttributesDataFromJsonFile(page);
        if (page.siblings) {
          const pageSections: string[] = [] as const;
          page.siblings.forEach((sibling: Record<string, unknown>) => {
            addAttributesDataFromJsonFile(sibling);
            if (sibling.attributes && sibling.attributes.section) {
              pageSections.push(sibling.attributes.section);
            }
          });
          page.attributes.sections = _.uniq(pageSections);
        }
      });
    } else {
      getPopulatedDirectoryTree(subTree);
    }
  });

  return srcTree;
}

function addAttributesDataFromJsonFile(page: Record<string, unknown>) {
  const fullFilePath = `${jsonSourceFolder}/${page.parentPath}/${page.fileName}.json`;
  if (fs.existsSync(fullFilePath)) {
    const jsonData = fs.readJSONSync(fullFilePath);
    if (page.fileName === 'index') {
      // we want only certain fields for the index pages
      page.attributes = _.pick(jsonData.data.attributes, ['title']);
    } else {
      page.attributes = jsonData.data.attributes;
    }
  } else {
    console.log('NOT found page', page, fullFilePath);
  }
}


function getFlatPageList(srcTree: Record<string, unknown>) {
  const list: Record<string, unknown>[] = [];

  _.forIn(srcTree, function (subTree) {
    if (_.has(subTree, 'pages')) {
      subTree.pages.forEach(page => {
        const pageDetails = _.pick(page, ['fileName', 'parentPath', 'attributes.title']);
        list.push(pageDetails);
      });
    } else {
      list.push(...getFlatPageList(subTree));
    }
  });

  return list;
}



function clusterPages(pages: string[][], path?: string) {
  if (!pages.length) return;

  const outputPages = [];

  const groups = _.groupBy(pages, (item) => item[0]);
  console.log('clusterPages groups - 1', groups);

  // remove the grouped key
  _.forEach(groups, (value) => {
    value.forEach((arr) => arr.shift());
  });
  console.log('clusterPages groups - 2', groups);

  _.forEach(groups, (value, key) => {
    const subPages = value.filter((arr) => arr.length === 1);
    const subSections = value.filter((arr) => arr.length > 1);

    const newPage = {
      id: `${path ? path + '/' : ''}${key}`,
      title: key,
      pages: subPages.map((page) => {
        return {
          id: `${path ? path + '/' : ''}${key}/${page}`,
          title: page[0],
          // pages: addPages(subSections, key)
        };
      }),
    };

    if (subSections.length) {
      newPage.pages = newPage.pages.concat(clusterPages(subSections, key));
    }

    outputPages.push(newPage);
  });

  return outputPages;
}
