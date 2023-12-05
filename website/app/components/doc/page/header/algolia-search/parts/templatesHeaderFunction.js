/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const templatesHeaderFunction = ({ group }) => {
  let title;
  switch (group) {
    case 'generic':
      title = 'Documentation:';
      break;
    case 'tokens':
      title = 'Tokens:';
      break;
    case 'icons':
      title = 'Icons:';
      break;
    case 'suggestions':
      title = 'Suggested pages:';
      break;
    default:
      break;
  }
  // we need to return a function
  return ({ html }) => html`<div class="aa-SourceHeaderTitle">${title}</div>`;
};
