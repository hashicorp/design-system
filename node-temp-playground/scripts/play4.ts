import fs from 'fs-extra';
import path from 'path';
import _ from 'lodash';

import * as TOC from '../docs4/toc-simple.json'; // or "toc-full"

console.log(
  'TOC',
  JSON.stringify(TOC, null, 2)
);

const structuredPageTree = getStructuredPageTree(TOC.flat);

console.log(
  'getStructuredPageTree',
  JSON.stringify(structuredPageTree, null, 2)
);


// ################################################
// ################################################
// ################################################

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