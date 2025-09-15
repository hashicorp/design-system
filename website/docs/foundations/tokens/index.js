/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { restartableTask, timeout } from 'ember-concurrency';
import { service } from '@ember/service';

import TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

const DEBOUNCE_MS = 250;

// get all the aliases of a given token
const getAliases = (token, TOKENS_RAW) => {
  const path = token.path.join('.');
  return TOKENS_RAW.filter(
    // note: also the original value is prefixed with `$`
    (item) => item.original.$value === `{${path}.value}`
  ).map((alias) => `{${alias.path.join('.')}}`);
};

export default class Index extends Component {
  @service router;

  constructor() {
    super(...arguments);
    this.groupedTokens = {};
    // prepare the tokens grouped by category
    TOKENS_RAW.forEach((token) => {
      const category = token.attributes.category;
      if (!this.groupedTokens[category]) {
        this.groupedTokens[category] = [];
      }
      // add an extra "aliases" attribute if other tokens are alias of it
      const aliases = getAliases(token, TOKENS_RAW);
      if (aliases.length > 0) {
        token.aliases = aliases;
      }
      this.groupedTokens[category].push(token);
    });
  }

  get searchQuery() {
    return this.router.currentRoute.queryParams['searchQuery'];
  }

  get filteredGroupedTokens() {
    let filteredGroupedTokens = {};
    if (this.searchQuery) {
      Object.keys(this.groupedTokens).forEach((category) => {
        const filteredTokens = this.groupedTokens[category].filter(
          (t) =>
            t.name.indexOf(this.searchQuery) !== -1 ||
<<<<<<< HEAD
            // note: we prefix `value` with `$` because we're using the DTCG format
            // we also convert it to string, because in some cases it's a number
            String(t.$value).indexOf(this.searchQuery) !== -1
=======
            t.value.indexOf(this.searchQuery) !== -1,
>>>>>>> e233399e2 (replace instances of  with)
        );

        if (filteredTokens.length > 0) {
          filteredGroupedTokens[category] = filteredTokens;
        } else {
          delete filteredGroupedTokens[category];
        }
      });
    } else {
      filteredGroupedTokens = this.groupedTokens;
    }

    return filteredGroupedTokens;
  }

  @restartableTask *searchTokens(searchQuery) {
    yield timeout(DEBOUNCE_MS);

    // TODO later when we will have the tabs and sidecar parameters too, we have to preserve them
    this.router.transitionTo({
      queryParams: {
        searchQuery: searchQuery !== '' ? searchQuery : null,
      },
    });
  }
}
