/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { autocomplete } from '@algolia/autocomplete-js';

import { getItemsFunction } from './parts/getItems';
import { templatesHeaderFunction } from './parts/templatesHeaderFunction';
import { templatesFooterFunction } from './parts/templatesFooterFunction';
import { templatesNoResultsFunction } from './parts/templatesNoResultsFunction';
import { templatesItemFunction } from './parts/templatesItemFunction';

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
        let searchQuery = query;
        let searchFilters = {};
        let searchType = 'generic';
        if (query?.match(/^token:/)) {
          searchQuery = query.replace(/^token:/, '');
          searchFilters = { filters: 'type:token' };
          searchType = 'token';
        } else if (query?.match(/^icon:/)) {
          searchQuery = query.replace(/^icon:/, '');
          searchFilters = { filters: 'type:icon' };
          searchType = 'icon';
        }
        return [
          {
            sourceId: 'content',
            getItems: getItemsFunction({ searchQuery, searchFilters }),
            getItemUrl: ({ item }) => {
              return item.pageURL;
            },
            templates: {
              header: templatesHeaderFunction,
              footer: templatesFooterFunction,
              noResults: templatesNoResultsFunction({ searchType }),
              item: templatesItemFunction({ searchType }),
            },
          },
        ];
      },
    });
  }
}
