// import { pick } from 'lodash'; // not sure why this doesn't work in a `.mjs` module
import _ from 'lodash';

import { parseMarkdown } from './extract-content-from-markdown.mjs';

export async function populateAlgoliaRecords({ record, content }) {
  const { headings, paragraphs, tables, componentApis } = await parseMarkdown(
    content
  );

  // DEBUG
  // console.log('HEADINGS', headings);
  // console.log('PARAGRAPHS', paragraphs);
  // console.log('TABLES', tables);
  // console.log('COMPONENT APIs', JSON.stringify(componentApis, null, 2));

  // RECORDS
  let algoliaRecords = [];

  // prepare different records for Algolia, depending on the type of contents

  // -- headings --

  headings.forEach((heading) => {
    // shape: { content: 'Header 1', level: 1 }
    const algoliaRecord = _.merge({}, record, {
      type: 'heading',
      level: heading.level,
      content: heading.content,
      source: 'heading',
    });
    algoliaRecords.push(algoliaRecord);
  });

  // -- paragraphs --

  paragraphs.forEach((paragraph) => {
    // shape: { content: 'Lorem ipsum \n dolor' }

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
      level: 9,
      source: 'paragraph',
    });
    algoliaRecords.push(algoliaRecord);
  });

  // -- tables --

  if (tables.cells && tables.cells.length > 0) {
    // shape: { cells: [ { content: 'Lorem' }, { content: 'Ipsum' }, { content: 'Dolor' }] }
    const algoliaRecord = _.merge({}, record, {
      type: 'text',
      content: tables.cells.reduce((acc, cell) => acc + ' ' + cell.content, ''),
      source: 'table',
    });
    algoliaRecords.push(algoliaRecord);
  }

  // -- componentApis --

  componentApis.forEach((componentApi) => {
    // shape: [ { doc-component-api: { "properties": [ { "name": "color", "value": "Lorem" }, { "name": "size", "value": "Ipsum" }, ... }]
    if (
      componentApi['doc-component-api'] &&
      componentApi['doc-component-api'].properties &&
      componentApi['doc-component-api'].properties.length > 0
    ) {
      componentApi['doc-component-api'].properties.forEach((property) => {
        const algoliaRecord = _.merge({}, record, {
          type: 'component-api-property',
          name: property.name,
          content: `${property.name} ${property.value}`,
          level: 9,
          source: 'component-api',
        });
        algoliaRecords.push(algoliaRecord);
      });
    }
  });

  return algoliaRecords;
}
