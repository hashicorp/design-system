import _ from 'lodash';

import * as TOC from '../docs4/toc-simple.json'; // or "toc-full"

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

// console.log(
//   'TOC',
//   JSON.stringify(TOC, null, 2)
// );

const sortedFlatTOC = TOC.flat.sort(sortPages);

console.log(
  'sortedFlatTOC',
  JSON.stringify(
    sortedFlatTOC.map((item) => item.filePath),
    null,
    2
  )
);

// const structuredPageTree = getStructuredPageTree(TOC.flat);

// console.log(
//   'getStructuredPageTree',
//   JSON.stringify(structuredPageTree, null, 2)
// );

// ################################################
// ################################################
// ################################################

function sortPages(s1, s2) {
  // console.log(`s1-s2 (${s1.filePath} vs ${s2.filePath})`, s1, s2);
  // if (s1.filePath === 'components/form/checkbox/index' && s2.filePath === 'components/badge/index') {
  //   console.log('s1-s2 (form/checkbox vs badge)', s1, s2);
  // }
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
    // we try to use the top-level category
    const c1 = CATEGORIES.indexOf(s1.pageParents[0].toLowerCase());
    const c2 = CATEGORIES.indexOf(s2.pageParents[0].toLowerCase());
    if (c1 < c2) {
      return -1;
    } else if (c1 > c2) {
      return 1;
    } else {
      console.log(`s1-s2 (${s1.filePath} vs ${s2.filePath})`, s1, s2);
      // or we fallback to sort based on the parent's "path"
      const p1 = s1.pageParents.join('/');
      const p2 = s2.pageParents.join('/');
      console.log(`p1-p2 (${s1.filePath} vs ${s2.filePath})`, p1, p2);
      if (p1 < p2) {
        console.log('p1<p2');
        return -1;
      } else if (p1 > p2) {
        console.log('p1>p2');
        return 1;
      } else {
        console.log('p1=p2');
        return 0;
      }
    }
  }
}

function getStructuredPageTree(pageList: Record<string, unknown>[]) {
  const tree: Record<string, unknown> = {};

  pageList.forEach((page) => {
    // we have to rebuild the full structure here
    _.set(tree, [...page.pageParents, page.pageName], page);
  });

  return tree;
}
