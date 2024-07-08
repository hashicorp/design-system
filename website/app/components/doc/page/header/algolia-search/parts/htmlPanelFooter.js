/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

export const htmlPanelFooter = ({ html }) =>
  html`<div class="aa-PanelFooter">
    <ul class="aa-PanelFooter__keyboard-hints">
      <li
        class="aa-PanelFooter__keyboard-hint"
        aria-label="Use Tab or Press up and down arrows to navigate search results"
      >
        <kbd class="tab">Tab</kbd>
        <span>/</span>
        <kbd class="arrow-down">↓</kbd>
        <kbd class="arrow-up">↑</kbd>
        <span>to navigate</span>
      </li>
      <li
        class="aa-PanelFooter__keyboard-hint"
        aria-label="Press Enter to select the focused search result"
      >
        <kbd class="enter">↵</kbd>
        <span>to select</span>
      </li>
      <li
        class="aa-PanelFooter__keyboard-hint"
        aria-label="Press Escape to close the search"
      >
        <kbd class="esc">Esc</kbd>
        <span>to close</span>
      </li>
    </ul>
    <p class="aa-PanelFooter__algolia">
      <a
        href="https://www.algolia.com/"
        rel="noopener noreferrer"
        target="_blank"
        class="aa-PanelFooter__algolia-link"
      >
        <span class="aa-PanelFooter__algolia-text">Search by</span>
        <img
          class="aa-PanelFooter__algolia-logo"
          src="/assets/logos/algolia.svg"
          alt="Algolia"
        />
      </a>
    </p>
  </div>`;
