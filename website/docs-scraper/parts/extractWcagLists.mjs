/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import _ from 'lodash';

import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { WCAG_CRITERIA } from './getWcagCriteria.mjs';

// ========================================================================

export async function extractWcagLists(tree) {
  const wcagLists = [];

  const wcagListMapper = () => (tree) => {
    // the `<Doc::WcagList @criteriaList={{array "1.1.1" "2.2.2" />`
    // has been transformed to a `<doc-wcag-list />` HTML-like node
    visit(
      tree,
      (node) => node.tagName === 'doc-wcag-list',
      (node) => {
        const criteriaAttribute = node.properties['criterialist'];
        const criteriaList = criteriaAttribute
          ? criteriaAttribute.split(' ')
          : [];
        if (criteriaList.length > 0) {
          const validCriteria = criteriaList.filter((criterion) =>
            Object.keys(WCAG_CRITERIA).includes(criterion)
          );
          if (validCriteria.length > 0) {
            wcagLists.push({
              criteria: validCriteria.map((criterion) =>
                _.pick(WCAG_CRITERIA[criterion], [
                  'number',
                  'title',
                  'description',
                ])
              ),
              hierarchy: node.hierarchy,
            });
          }
        }
      }
    );
  };

  await unified().use(wcagListMapper).run(tree);

  // DEBUG - leave for debugging
  // console.log('WCAG LISTS', JSON.stringify(wcagLists, null, 2));

  return wcagLists;
}
