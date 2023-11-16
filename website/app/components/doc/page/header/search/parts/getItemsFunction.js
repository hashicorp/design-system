/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ENV from 'website/config/environment';

import { getAlgoliaResults } from '@algolia/autocomplete-js';

import { algoliaSearchClient } from './algoliaSearchClient';

export const getItemsFunction = ({
  searchQuery,
  searchParams,
  searchFilters,
}) => {
  return () => {
    // GET ALGOLIA RESULTS
    // see: https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/getAlgoliaResults/
    return getAlgoliaResults({
      searchClient: algoliaSearchClient,
      queries: [
        {
          indexName: ENV.APP.ALGOLIA_INDEX_ID,
          query: searchQuery,
          params: {
            ...searchParams,
            ...searchFilters,
          },
        },
      ],
    });
  };
};
