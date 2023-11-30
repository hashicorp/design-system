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
  const splitted = text.split(' ');
  const reduced = splitted.slice(-5);
  if (splitted.length === reduced.length) {
    return text;
  } else {
    return `… ${reduced.join(' ')}`;
  }
};

// inspired by https://github.com/segmentio/segment-docs/blob/7b1f937854249bb6fbdfb0d24b20ddd443845749/js/algolia/highlight.js#L12-L18 + https://github.com/knocklabs/docs/blob/51d0876db2dce44d8b87c27cb06e44fe275b7ae5/components/Autocomplete.tsx#L38-L51
function concatPartsAsHtml({ html, parts }) {
  return html`
    ${parts.map((part) => {
      if (part.isHighlighted) {
        return html`<mark>${part.value}</mark>`;
      } else {
        return part.value;
      }
    })}
  `;
}

export const htmlTemplatesItemBody = ({ item, html, components }) => {
  let title;
  let description;
  switch (item.type) {
    case 'icon':
      title = components.Highlight({
        hit: item,
        attribute: 'icon-name',
      });
      break;
    case 'token':
      title = components.Highlight({
        hit: item,
        attribute: 'token-name',
      });
      break;
    default:
      // title (full)
      title = components.Highlight({
        hit: item,
        attribute: 'pageTitle',
      });
      // description (snippeted)
      if (item.content) {
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
          description = components.Snippet({
            hit: item,
            attribute: ['content'],
          });
        }
      } else if (item.pageCaption) {
        description = item.pageCaption;
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
