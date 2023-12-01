/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const transformDocComponentApi = (markdownContent) =>
  // eg. <Doc::ComponentApi as |C|>\n<C.Property @name="..." @type="...">
  markdownContent
    .replace(/<Doc::ComponentApi as \|C\|>/gim, '<doc-component-api>')
    .replace(/<\/Doc::ComponentApi>/gim, '</doc-component-api>')
    .replace(/<C\.Property /gim, '<doc-component-api-property ')
    .replace(/<\/C.Property>/gim, '</doc-component-api-property>');
