/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const htmlItemContentTitle = ({ html, title }) => html`
  <div class="aa-ItemContentTitle">${title}</div>
`;

const htmlItemContentDescription = ({ html, description }) => html`
  <div class="aa-ItemContentDescription">${description}</div>
`;

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
      title = item.pageTitle;
      description = components.Snippet({
        hit: item,
        attribute: 'content',
      });
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
