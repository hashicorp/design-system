/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const htmlPanelNoResults = ({ html, state }) =>
  html`<div class="aa-PanelNoResults">No results for "${state.query}".</div>`;
