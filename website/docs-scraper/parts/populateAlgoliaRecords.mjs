// import { pick } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

import { parseMarkdown } from './extract-content-from-markdown.mjs';

export async function populateAlgoliaRecords({ record, content }) {
  const { headings, paragraphs, tables, componentApis, wcagLists } =
    await parseMarkdown(content);

  // DEBUG
  // console.log('HEADINGS', headings);
  // console.log('PARAGRAPHS', paragraphs);
  // console.log('TABLES', tables);
  // console.log('COMPONENT APIs', JSON.stringify(componentApis, null, 2));
  // console.log('WCAG LISTS', JSON.stringify(wcagLists, null, 2));

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
    // remove empty content
    // TODO understand why `remarkSqueezeParagraphs` doesn't work
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

  componentApis.forEach((componentApi) => {
    if (
      componentApi &&
      componentApi.properties &&
      componentApi.properties.length > 0
    ) {
      const hierarchy = componentApi?.hierarchy ?? [];
      componentApi.properties.forEach((property) => {
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
    }
  });

  // -- wcagLists --

  wcagLists.forEach((wcagList) => {
    if (wcagList && wcagList.criteria && wcagList.criteria.length > 0) {
      const hierarchy = wcagList?.hierarchy ?? [];
      wcagList.criteria.forEach((criterion) => {
        const algoliaRecord = _.merge({}, record, {
          type: 'wcag-list-criteria',
          name: `WCAG ${criterion.number} - ${criterion.title}`,
          content: `wcag ${criterion.number} ${criterion.title} ${criterion.description}`,
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
