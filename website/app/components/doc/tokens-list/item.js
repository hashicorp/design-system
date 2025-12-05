/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DocTokensListComponent extends Component {
  @tracked isExpanded = false;

  get token() {
    let { token } = this.args;
    return {
      name: token.name,
      // note: we prefix `type` and `value` with `$` because we're using the DTCG format
      $type: token.$type,
      $value: token.$value,
      aliases: token.aliases,
      category: token.attributes.category,
      // note: also the original value is prefixed with `$`
      original_value: token.original.$value,
      deprecated: token.deprecated,
      comment: token?.documentation?.comment ?? token?.comment ?? undefined,
    };
  }

  get isAlias() {
    return (
      this.token.original_value !== this.token.$value &&
      this.token.original_value.includes('{')
    );
  }

  get isDeprecated() {
    return this.token.deprecated;
  }

  @action
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
