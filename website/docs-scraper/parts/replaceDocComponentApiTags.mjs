/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const replaceDocComponentApiTags = (markdownContent) =>
  markdownContent
    .replaceAll('<Doc::ComponentApi as |C|>', '<doc-component-api>')
    .replaceAll('</Doc::ComponentApi>', '</doc-component-api>')
    .replace(/(<\/?)C\.Property/gim, (_match, p1) => {
      const tag = p1 + 'doc-component-api-property';
      return tag;
    });
