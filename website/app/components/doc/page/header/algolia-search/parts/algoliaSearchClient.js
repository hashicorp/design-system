/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import ENV from 'website/config/environment';

import algoliasearch from 'algoliasearch/lite';

export const algoliaSearchClient = algoliasearch(
  ENV.APP.ALGOLIA_APPLICATION_ID,
  ENV.APP.ALGOLIA_API_KEY_SEARCH
);
