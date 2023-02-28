/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

const DEBOUNCE_MS = 250;

// get all the aliases of a given token
const getAliases = (token, TOKENS_RAW) => {
  const path = token.path.join('.');
  console.log(path);
  return TOKENS_RAW.filter(
    (item) => item.original.value === `{${path}.value}`
  ).map((alias) => `{${alias.path.join('.')}}`);
};

export default class Index extends Component {
  @service router;

  // query params come from `controllers/show.js` and we access them here because there
  // is no "controller" for individual component documentation routes
  @tracked searchQuery = this.router.currentRoute.queryParams['searchQuery'];

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
      console.log(token.name, aliases);
      if (aliases.length > 0) {
        token.aliases = aliases;
      }
      this.groupedTokens[category].push(token);
    });
  }

  get filteredGroupedTokens() {
    let filteredGroupedTokens = {};
    if (this.searchQuery) {
      Object.keys(this.groupedTokens).forEach((category) => {
        const filteredTokens = this.groupedTokens[category].filter(
          (t) => t.name.indexOf(this.searchQuery) !== -1
        );
        filteredGroupedTokens[category] =
          filteredTokens.length > 0 ? filteredTokens : false;
      });
    } else {
      filteredGroupedTokens = this.groupedTokens;
    }

    return filteredGroupedTokens;
  }

  updateQueryParams() {
    // TODO later when we will have the tabs and sidecar parameters too, we have to preserve them
    const newQueryParams = { queryParams: {} };
    if (this.searchQuery) {
      newQueryParams.queryParams.searchQuery = this.searchQuery;
    } else {
      newQueryParams.queryParams.searchQuery = null;
    }
    this.router.transitionTo(newQueryParams);
  }

  @restartableTask *searchTokens(searchQuery) {
    yield timeout(DEBOUNCE_MS);

    this.searchQuery = searchQuery;
    this.updateQueryParams();
  }
}
