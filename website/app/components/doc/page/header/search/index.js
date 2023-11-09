/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import ENV from 'website/config/environment';

import algoliasearch from 'algoliasearch/lite';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
// import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';

const searchClient = algoliasearch(
  ENV.APP.ALGOLIA_APPLICATION_ID,
  ENV.APP.ALGOLIA_API_KEY_SEARCH
);

// const algoliaRecentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
//   key: 'RECENT_SEARCH',
//   limit: 5,
// });

export default class DocAlgoliaSearchComponent extends Component {
  @action
  didInsertSearchContainer(element) {
    autocomplete({
      id: 'doc-algolia-search-autocomplete-container', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-id
      container: element, // 'if necessary you can use an ID eg. `#doc-algolia-search-autocomplete-container',` // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-container
      // panelContainer: '...' // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-panelcontainer
      panelPlacement: 'full-width', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-panelplacement
      placeholder: 'Search for content, tokens, icons', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-placeholder
      // classNames: 'TODO', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-classnames
      // plugins: [algoliaRecentSearchesPlugin], // see: https://www.algolia.com/doc/ui-libraries/autocomplete/guides/adding-recent-searches/
      openOnFocus: true, // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-openonfocus
      debug: true, // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-debug
      detachedMediaQuery: '', // https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/detached-mode/

      //
      // GET SOURCES
      // see: https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-getsources
      getSources({ query }) {
        return [
          {
            sourceId: 'content',
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: ENV.APP.ALGOLIA_INDEX_ID,
                    query,
                    params: {
                      hitsPerPage: 5,
                      attributesToSnippet: ['title:10', 'caption:35'],
                      snippetEllipsisText: '…',
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return item.pageURL;
            },
            templates: {
              header() {
                return 'Suggestions';
              },
              footer() {
                return 'Footer';
              },
              noResults() {
                return 'No results.';
              },
              item({ item, components, html }) {
                return html`<div class="aa-ItemWrapper">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemIcon aa-ItemIcon--alignTop">
                      <img
                        src="${item.image}"
                        alt="${item.name}"
                        width="40"
                        height="40"
                      />
                    </div>
                    <div class="aa-ItemContentBody">
                      <div class="aa-ItemContentTitle">
                        ${components.Highlight({
                          hit: item,
                          attribute: 'title',
                        })}
                      </div>
                      <div class="aa-ItemContentDescription">
                        ${components.Snippet({
                          hit: item,
                          attribute: 'description',
                        })}
                      </div>
                    </div>
                    <div class="aa-ItemActions">
                      <button
                        class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                        type="button"
                        title="Select"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="currentColor"
                        >
                          <path
                            d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>`;
              },
            },
          },
        ];
      },
    });
  }
}
