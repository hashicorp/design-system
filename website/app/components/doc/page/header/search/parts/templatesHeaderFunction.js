/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const templatesHeaderFunction = ({ group }) => {
  let title;
  switch (group) {
    case 'generic':
      title = 'Generic content:';
      break;
    case 'tokens':
      title = 'Tokens:';
      break;
    case 'icons':
      title = 'Icons:';
      break;
    case 'suggestions':
      title = 'Suggestions:';
      break;
    default:
      break;
  }
  // we need to return a function
  return () => title;
};
