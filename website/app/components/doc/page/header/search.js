/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import ENV from 'website/config/environment';

import { docsearch as docsearchV2 } from '@docsearch/js@2';
import { docsearch as docsearchV3 } from '@docsearch/js@3';

export default class DocPageHeaderSearchComponent extends Component {
  @action
  didInsert(element) {
    // this should come from this, but we're using two
    // <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"></script>
    docsearchV2({
      container: '#doc-page-header-search-input-v2',
      appId: ENV.APP.ALGOLIA_APPLICATION_ID,
      indexName: ENV.APP.ALGOLIA_INDEX_ID,
      apiKey: ENV.APP.ALGOLIA_API_KEY_SEARCH,
      debug: true,
    });
    docsearchV3({
      // container: element,
      container: '#doc-page-header-search-v3',
      appId: ENV.APP.ALGOLIA_APPLICATION_ID,
      indexName: ENV.APP.ALGOLIA_INDEX_ID,
      apiKey: ENV.APP.ALGOLIA_API_KEY_SEARCH,
    });
  }
}
