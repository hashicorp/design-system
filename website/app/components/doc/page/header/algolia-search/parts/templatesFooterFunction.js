/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const templatesFooterFunction = ({ text, link }) => {
  // we need to return a function
  return ({ html }) =>
    html`<a class="aa-SourceFooterLink" href="${link}">${text}</a>`;
};
