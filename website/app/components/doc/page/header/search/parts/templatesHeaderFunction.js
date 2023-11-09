/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const templatesHeaderFunction = ({ searchType }) => {
  let title;
  switch (searchType) {
    case 'generic':
      title = 'Content:';
      break;
    case 'token':
      title = 'Tokens:';
      break;
    case 'icon':
      title = 'Icons:';
      break;
    default:
      break;
  }
  // we need to return a function
  return () => title;
};
