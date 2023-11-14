/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { autocomplete } from '@algolia/autocomplete-js';

import { getItemsFunction } from './parts/getItems';
import { templatesHeaderFunction } from './parts/templatesHeaderFunction';
// import { templatesFooterFunction } from './parts/templatesFooterFunction';
// import { templatesNoResultsFunction } from './parts/templatesNoResultsFunction';
import { templatesItemFunction } from './parts/templatesItemFunction';
import { htmlPanelFooter } from './parts/htmlPanelFooter';
import { htmlPanelNoResults } from './parts/htmlPanelNoResults';

export default class DocAlgoliaSearchComponent extends Component {
  @action
  didInsertSearchContainer(element) {
    autocomplete({
      id: 'doc-algolia-search-autocomplete-container', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-id
      container: element, // 'if necessary you can use an ID eg. `#doc-algolia-search-autocomplete-container',` // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-container
      // panelContainer: '...' // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-panelcontainer
      panelPlacement: 'full-width', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-panelplacement
      placeholder: 'Search', // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-placeholder
      // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-classnames
      classNames: {
        // we add `doc-sr-only` so it's available only to screen readers
        // detachedSearchButtonPlaceholder: 'doc-sr-only',
      },
      // plugins: [algoliaRecentSearchesPlugin], // see: https://www.algolia.com/doc/ui-libraries/autocomplete/guides/adding-recent-searches/
      openOnFocus: true, // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-openonfocus
      debug: true, // https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-debug
      detachedMediaQuery: '', // https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/detached-mode/

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
                searchFilters: { facetFilters: ['type:-icon', 'type:-token'] },
              }),
              getItemUrl: ({ item }) => {
                return item.pageURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'generic' }),
                // footer: templatesFooterFunction,
                // noResults: templatesNoResultsFunction(),
                item: templatesItemFunction(),
              },
            },
            {
              sourceId: 'icons',
              getItems: getItemsFunction({
                searchQuery: query,
                searchFilters: { facetFilters: ['type:icon'] },
              }),
              getItemUrl: ({ item }) => {
                return item.pageURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'icons' }),
                // footer: templatesFooterFunction,
                // noResults: templatesNoResultsFunction(),
                item: templatesItemFunction(),
              },
            },
            {
              sourceId: 'tokens',
              getItems: getItemsFunction({
                searchQuery: query,
                searchFilters: { facetFilters: ['type:token'] },
              }),
              getItemUrl: ({ item }) => {
                return item.pageURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'tokens' }),
                // footer: templatesFooterFunction,
                // noResults: templatesNoResultsFunction(),
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
                    title: 'Support: How to file an issue',
                    pageURL: 'about/support#file-an-issue',
                    previewIcon: 'support',
                  },
                  {
                    type: 'suggestion',
                    title: 'What‘s new: Release notes',
                    pageURL: 'whats-new/release-notes',
                    previewIcon: 'newspaper',
                  },
                  {
                    type: 'suggestion',
                    title: 'Icons: Library',
                    pageURL: 'icons/library',
                    previewIcon: 'search',
                  },
                ];
              },
              getItemUrl({ item }) {
                return item.pageURL;
              },
              templates: {
                header: templatesHeaderFunction({ group: 'suggestions' }),
                // footer: templatesFooterFunction,
                // noResults: templatesNoResultsFunction(),
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
  }
}
