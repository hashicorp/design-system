/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { autocomplete } from '@algolia/autocomplete-js';

import { getItemsFunction } from './parts/getItemsFunction';
import { templatesHeaderFunction } from './parts/templatesHeaderFunction';
// import { templatesFooterFunction } from './parts/templatesFooterFunction';
import { templatesItemFunction } from './parts/templatesItemFunction';
import { htmlPanelFooter } from './parts/htmlPanelFooter';
import { htmlPanelNoResults } from './parts/htmlPanelNoResults';

export default class DocAlgoliaSearchComponent extends Component {
  @tracked isModalOpen = false;

  @action
  didInsertSearchContainer(element) {
    const autocompleteInstance = autocomplete({
      id: 'doc-algolia-search-autocomplete-container', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-id
      container: element, // 'if necessary you can use an ID eg. `#doc-algolia-search-autocomplete-container',` // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-container
      // panelContainer: '...' // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-panelcontainer
      panelPlacement: 'full-width', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-panelplacement
      placeholder: 'Search', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-placeholder
      // classNames: {}, // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-classnames
      // plugins: [algoliaRecentSearchesPlugin], // see: https://www.algolia.com/doc/ui-libraries/autocomplete/guides/adding-recent-searches/
      openOnFocus: true, // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-openonfocus
      // debug: true, // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-debug
      detachedMediaQuery: '', // https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/detached-mode/
      translations: {
        detachedCancelButtonText: 'Close', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-translations
      },

      //
      // GET SOURCES
      // see: https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-getsources
      getSources({ query }) {
        if (query.trim() !== '') {
          return [
            {
              sourceId: 'content',
              getItems: getItemsFunction({
                searchQuery: query,
                searchParams: {
                  hitsPerPage: 5,
                  attributesToSnippet: ['content:20'],
                },
                searchFilters: { facetFilters: ['type:-icon', 'type:-token'] },
              }),
              getItemUrl: ({ item }) => {
                return item.searchResultURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'generic' }),
                // footer: templatesFooterFunction,
                item: templatesItemFunction(),
              },
            },
            {
              sourceId: 'icons',
              getItems: getItemsFunction({
                searchQuery: query,
                searchParams: {
                  hitsPerPage: 5,
                  attributesToSnippet: ['icon-name'],
                  typoTolerance: false, // TODO understand if it's OK in all use cases
                },
                searchFilters: { facetFilters: ['type:icon'] },
              }),
              getItemUrl: ({ item }) => {
                return item.searchResultURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'icons' }),
                // footer: templatesFooterFunction,
                item: templatesItemFunction(),
              },
            },
            {
              sourceId: 'tokens',
              getItems: getItemsFunction({
                searchQuery: query,
                searchParams: {
                  hitsPerPage: 5,
                  attributesToSnippet: ['token-name'],
                  typoTolerance: false, // TODO understand if it's OK in all use cases
                },
                searchFilters: { facetFilters: ['type:token'] },
              }),
              getItemUrl: ({ item }) => {
                return item.searchResultURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'tokens' }),
                // footer: templatesFooterFunction,
                item: templatesItemFunction(),
              },
            },
          ];
        } else {
          return [
            {
              sourceId: 'suggestions',
              getItems() {
                return [
                  {
                    type: 'suggestion',
                    pageTitle: 'Support: How to file an issue',
                    searchResultURL: '/about/support#file-an-issue',
                    previewIcon: 'support',
                  },
                  {
                    type: 'suggestion',
                    pageTitle: 'What‘s new: Release notes',
                    searchResultURL: '/whats-new/release-notes',
                    previewIcon: 'newspaper',
                  },
                  {
                    type: 'suggestion',
                    pageTitle: 'Icons: Library',
                    searchResultURL: '/icons/library',
                    previewIcon: 'search',
                  },
                ];
              },
              getItemUrl({ item }) {
                return item.searchResultURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'suggestions' }),
                // footer: templatesFooterFunction,
                item: templatesItemFunction(),
              },
            },
          ];
        }
      },
      render({ elements, render, html }, root) {
        const { suggestions, content, icons, tokens, recentSearchesPlugin } =
          elements;

        render(
          html`<div class="aa-PanelLayout aa-Panel--scrollable">
              <div class="aa-PanelSections">
                <div class="aa-PanelSection">${suggestions}</div>
                <!--<div class="aa-PanelSection">${recentSearchesPlugin}</div>-->
                <div class="aa-PanelSection">${content}</div>
                <div class="aa-PanelSection">${icons}</div>
                <div class="aa-PanelSection">${tokens}</div>
              </div>
            </div>
            ${htmlPanelFooter({ html })} `,
          root
        );
      },
      renderNoResults({ render, html, state }, root) {
        render(
          html`
            <div class="aa-PanelLayout aa-Panel--scrollable">
              ${htmlPanelNoResults({ html, state })}
            </div>
            ${htmlPanelFooter({ html })}
          `,
          root
        );
      },
    });

    const alternativeTrigger = document.getElementById(
      'doc-algolia-search-autocomplete-secondary-trigger'
    );
    alternativeTrigger.addEventListener('click', () => {
      console.log('THIS SHOULD OPEN THE SEARCH');
      autocompleteInstance.setIsOpen(true);
    });

    // add event listener to open/close the modal via `command-K` hot-key
    document.addEventListener('keydown', (event) => {
      if (event.metaKey && event.key === 'k') {
        autocompleteInstance.setIsOpen(!this.isModalOpen);
        this.isModalOpen = !this.isModalOpen;
      }
    });
  }
}
