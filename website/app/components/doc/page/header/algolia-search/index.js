/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

import { autocomplete } from '@algolia/autocomplete-js';

import { getItemsFunction } from './parts/getItemsFunction';
import { templatesHeaderFunction } from './parts/templatesHeaderFunction';
// import { templatesFooterFunction } from './parts/templatesFooterFunction';
import { templatesItemFunction } from './parts/templatesItemFunction';
import { htmlPanelFooter } from './parts/htmlPanelFooter';
import { htmlPanelNoResults } from './parts/htmlPanelNoResults';

export default class DocAlgoliaSearchComponent extends Component {
  @tracked isModalOpen = false;

  @service router;

  @action
  didInsertSearchContainer(element) {
    // define the function to execute to transition to a search result `itemUrl` value
    const emberRouterTransitionTo = (itemUrl) => {
      itemUrl = itemUrl.replace(/#.*/, '');
      const parts = itemUrl.split('?');
      const model = parts[0].replace(/^\//, '');
      const queryParams = {};
      if (parts[1]) {
        parts[1].split('&').forEach((keyvalue) => {
          const [key, value] = decodeURIComponent(keyvalue).split('=');
          if (key && value) {
            queryParams[key] = value;
          }
        });
      }
      this.router.transitionTo('show', model, { queryParams });
    };

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
      onStateChange: ({ state, prevState }) => {
        // used to reset the query to an empty state/string when the modal is closed (via "click" or "esc" key)
        if (!state.isOpen && prevState.isOpen) {
          autocompleteInstance.setQuery('');
        }
      },
      onSubmit: ({ state, setQuery, setIsOpen, refresh }) => {
        // hacky way to prevent the modal to close on enter
        // see: https://github.com/algolia/autocomplete/issues/636#issuecomment-885889380
        setIsOpen(true);
        refresh();
        setTimeout(() => {
          setQuery(`${state.query}`);
          refresh();
        }, 10);
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
                  attributesToHighlight: ['pageTitle', 'content'],
                  attributesToSnippet: ['content:20'],
                  distinct: true,
                  // attributeForDistinct: 'pageBaseURL', // this doesn't work, for some reason; it needs to be set at Algolia dashboard level under "Deduplication and Grouping" configuration
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
                  attributesToHighlight: ['icon-name'],
                  typoTolerance: false,
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
                  attributesToHighlight: ['token-name'],
                  typoTolerance: false,
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
                    pageTitle: 'What’s new: Release notes',
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
        const { suggestions, content, icons, tokens } = elements;

        render(
          html`
            <div class="aa-PanelLayout">
              <div class="aa-PanelSources">
                <!-- SUGGESTIONS -->
                ${suggestions}
                <!-- CONTENT ("GENERIC") -->
                ${content}
                <!-- ICONS -->
                ${icons}
                <!-- TOKENS -->
                ${tokens}
              </div>
            </div>
            ${htmlPanelFooter({ html })}
          `,
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
      navigator: {
        // see: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation/
        navigate({ itemUrl }) {
          emberRouterTransitionTo(itemUrl);
        },
      },
    });

    const alternativeTriggers = document.querySelectorAll(
      'button[data-doc-algolia-search-autocomplete-secondary-trigger]'
    );
    if (alternativeTriggers) {
      alternativeTriggers.forEach((alternativeTrigger) => {
        alternativeTrigger.addEventListener('click', () => {
          autocompleteInstance.setIsOpen(true);
        });
      });
    }

    // add event listener to open/close the modal via `command-K` hot-key
    document.addEventListener('keydown', (event) => {
      if (event.metaKey && event.key === 'k') {
        autocompleteInstance.setIsOpen(!this.isModalOpen);
        this.isModalOpen = !this.isModalOpen;
      }
    });

    // add event listener to prevent `aa-ItemLinkWrapper` links from re-loading the page
    document.addEventListener(
      'click',
      (event) => {
        const parentItemLink = event.target.closest('.aa-ItemLinkWrapper');
        if (parentItemLink) {
          event.preventDefault();
          const itemUrl = parentItemLink.getAttribute('href');
          emberRouterTransitionTo(itemUrl);
        }
      },
      true
    );
  }
}
