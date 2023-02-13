/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

export default class TokensController extends Controller {
  get groupedTokens() {
    const groupedTokens = {};

    this.model.TOKENS_RAW.forEach((token) => {
      const category = token.attributes.category;
      if (!groupedTokens[category]) {
        groupedTokens[category] = [];
      }

      groupedTokens[category].push(token);
    });

    return groupedTokens;
  }
}
