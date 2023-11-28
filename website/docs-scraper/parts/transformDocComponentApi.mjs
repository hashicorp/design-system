/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const transformDocComponentApi = (markdownContent) =>
  // eg. <Doc::ComponentApi as |C|>\n<C.Property @name="..." @type="...">
  markdownContent
    .replace(/<Doc::ComponentApi as \|C\|>/gim, '<div doc-component-api>')
    .replace(/<\/Doc::ComponentApi>/gim, '</div>')
    .replace(/<C\.Property /gim, '<div doc-component-api-property ')
    .replace(/<\/C.Property>/gim, '</div>');
