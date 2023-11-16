/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { parseAlgoliaHitHighlight } from '@algolia/autocomplete-preset-algolia';

const htmlItemContentTitle = ({ html, title }) => html`
  <div class="aa-ItemContentTitle">${title}</div>
`;

const htmlItemContentDescription = ({ html, description }) => html`
  <div class="aa-ItemContentDescription">${description}</div>
`;

const snippetInitialText = (text) => {
  var splitted = text.split(' ');
  var reduced = splitted.slice(-5);
  if (splitted.length === reduced.length) {
    return text;
  } else {
    return `… ${reduced.join(' ')}`;
  }
};

// inspired by https://github.com/segmentio/segment-docs/blob/7b1f937854249bb6fbdfb0d24b20ddd443845749/js/algolia/highlight.js#L12-L18
function concatPartsAsHtml({ html, parts }) {
  return parts.reduce((acc, current) => {
    // IMPORTANT! don't add a space between the accumulator and the appended content and before/after the returned HTML
    if (current.isHighlighted) {
      return html`${acc}<mark>${current.value}</mark>`;
    } else {
      return html`${acc}${current.value}`;
    }
  }, []);
}

export const htmlTemplatesItemBody = ({ item, html, components }) => {
  let title;
  let description;
  switch (item.type) {
    case 'icon':
      title = components.Snippet({
        hit: item,
        attribute: 'icon-name',
      });
      break;
    case 'token':
      title = components.Snippet({
        hit: item,
        attribute: 'token-name',
      });
      break;
    default:
      // title (full)
      title = item.pageTitle;
      // description (snippeted)
      var snippetedParts = parseAlgoliaHitHighlight({
        hit: item,
        attribute: ['content'],
      });
      // overwrite the initial text part (if it's not highlighted) with a shorter version (if needed)
      if (snippetedParts.length > 0 && !snippetedParts[0].isHighlighted) {
        snippetedParts[0].value = snippetInitialText(snippetedParts[0].value);
        description = concatPartsAsHtml({ html, parts: snippetedParts });
      } else {
        // we fallback to the normal highlighting/snippeting, that may not always make the highlighted word(s) visible in the description, because of the elliptization via CSS
        description = components.Snippet({ hit: item, attribute: ['content'] });
      }
  }

  return html`
    <div class="aa-ItemContentBody">
      <!-- content title -->
      ${title ? htmlItemContentTitle({ html, title }) : ''}
      <!-- content description -->
      ${description ? htmlItemContentDescription({ html, description }) : ''}
    </div>
  `;
};
