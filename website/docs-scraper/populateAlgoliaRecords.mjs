/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// import { pick } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

import { parseMarkdown } from './extract-content-from-markdown.mjs';

export async function populateAlgoliaRecords({ record, content }) {
  const { headings, paragraphs, tables, componentApis, wcagLists } =
    await parseMarkdown(content);

  // RECORDS
  let algoliaRecords = [];

  // prepare different records for Algolia, depending on the type of contents

  // -- headings --

  headings.forEach((heading) => {
    const algoliaRecord = _.merge({}, record, {
      type: 'heading',
      level: heading.level,
      content: heading.content,
      hierarchy: heading.hierarchy,
      source: 'heading',
    });
    algoliaRecords.push(algoliaRecord);
  });

  // -- paragraphs --

  paragraphs.forEach((paragraph) => {
    // remove leftover empty paragraphs
    if (paragraph.content.trim() === '') {
      return;
    }

    const algoliaRecord = _.merge({}, record, {
      type: 'text',
      content: paragraph.content,
      hierarchy: paragraph.hierarchy,
      level: 9,
      source: 'paragraph',
    });
    algoliaRecords.push(algoliaRecord);
  });

  // -- tables --

  tables.forEach((table) => {
    const algoliaRecord = _.merge({}, record, {
      type: 'text',
      content: table.content,
      hierarchy: table.hierarchy,
      source: 'table',
    });
    algoliaRecords.push(algoliaRecord);
  });

  // -- componentApis --

  componentApis.forEach((property) => {
    const hierarchy = property?.hierarchy ?? [];
    const algoliaRecord = _.merge({}, record, {
      type: 'component-api-property',
      name: property.name,
      content: `${property.name} ${property.value}`,
      hierarchy: hierarchy,
      level: 9,
      source: 'component-api',
      // EXTRA
      'property-name': property.name,
      'property-value': property.value,
    });
    algoliaRecords.push(algoliaRecord);
  });

  // -- wcagLists --

  wcagLists.forEach((wcagList) => {
    if (wcagList && wcagList.criteria && wcagList.criteria.length > 0) {
      const hierarchy = wcagList?.hierarchy ?? [];
      wcagList.criteria.forEach((criterion) => {
        const algoliaRecord = _.merge({}, record, {
          type: 'wcag-list-criteria',
          name: `WCAG ${criterion.number} - ${criterion.title}`,
          content: `WCAG ${criterion.number} ${criterion.title} ${criterion.description}`,
          hierarchy: hierarchy,
          level: 9,
          source: 'wcag-list',
          // EXTRA
          'criterion-number': criterion.number,
          'criterion-title': criterion.title,
          'criterion-description': criterion.description,
        });
        algoliaRecords.push(algoliaRecord);
      });
    }
  });

  return algoliaRecords;
}
