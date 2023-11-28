/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

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
    // remove empty paragraphs
    // notice: no need to do it at remark level, is more efficient here (eg. it may contain just an image)
    if (paragraph.content.trim() === '') {
      return;
    }
    // remove banner delimiters
    if (paragraph.content.match(/^!!!/)) {
      return;
    }
    if (paragraph.content.match(/!!!$/)) {
      return;
    }
    // remove <doc- delimiters
    if (paragraph.content.match(/^<doc-/)) {
      return;
    }
    // remove ![*](*** =770x*) images
    // TODO find a way to interpret these correctly as images
    if (paragraph.content.match(/^!\[/)) {
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

  // TODO! remove debugging
  await fs.writeJSON(
    '/Users/cristianorastelli/src/hashicorp/design-system/website/OUTPUT.json',
    algoliaRecords,
    { spaces: 2, replacer: null }
  );

  return algoliaRecords;
}
