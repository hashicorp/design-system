/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { concat } from '@ember/helper';
import { not } from 'ember-truth-helpers';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import DocMetaRow from 'website/components/doc/meta-row';
import DocTokenPreview from 'website/components/doc/token-preview';

type NormalizedToken = {
  name: string;
  $type: string;
  $value: string;
  aliases?: string[];
  category: string;
  original_value: string;
  deprecated?: boolean;
  documentation?: {
    comment?: string;
  };
  comment?: string;
};

export interface DocTokensListItemSignature {
  Args: {
    token: {
      name: string;
      $type: string;
      $value: string;
      aliases?: string[];
      attributes: {
        category: string;
      };
      original: {
        $value: string;
      };
      deprecated?: boolean;
      documentation?: {
        comment?: string;
      };
      comment?: string;
    };
  };
  Element: HTMLLIElement;
}

export default class DocTokensListItem extends Component<DocTokensListItemSignature> {
  @tracked isExpanded = false;

  get token(): NormalizedToken {
    const { token } = this.args;
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

  toggle = () => {
    this.isExpanded = !this.isExpanded;
  };

  <template>
    {{! role="listitem" is needed here because the class sets display: contents and some browsers and assistive technologies will ignore the implied role }}
    <li class="doc-tokens-list__item" role="listitem">
      <div class="doc-tokens-list__preview">
        <DocTokenPreview @token={{this.token}} />
      </div>
      <div class="doc-tokens-list__content">
        <button
          type="button"
          class="doc-tokens-list__toggle"
          {{on "click" this.toggle}}
          aria-label={{(concat this.token.name " information list")}}
          aria-expanded={{if this.isExpanded "true" "false"}}
        >
          <HdsIcon @name={{if this.isExpanded "chevron-up" "chevron-down"}} />
        </button>
        {{#if this.token.deprecated}}
          <DocMetaRow
            @label="Don't use"
            @valueToShow="This token is now deprecated"
          />
          <DocMetaRow
            class="doc-tokens-list__item--is-deprecated"
            @label="CSS var"
            @valueToShow={{this.token.name}}
          />
        {{else}}
          <DocMetaRow
            @label="CSS var"
            @valueToCopy="--{{this.token.name}}"
            @copyable={{true}}
          />
          {{! we don't want developers to use directly HEX values, so we don't add a "copy" button on purpose }}
          <DocMetaRow
            @label="Value"
            @valueToShow={{this.token.$value}}
            @isClipped={{not this.isExpanded}}
          />
        {{/if}}
        {{#if this.isExpanded}}
          {{#if this.token.$type}}
            <DocMetaRow @label="Type" @valueToShow={{this.token.$type}} />
          {{/if}}
          {{#if this.isAlias}}
            <DocMetaRow
              @label="Alias of"
              @valueToShow={{this.token.original_value}}
            />
          {{/if}}
          {{#if this.token.aliases}}
            <DocMetaRow
              @label="Aliased as"
              @multipleValuesToShow={{this.token.aliases}}
            />
          {{/if}}
          {{#if this.token.comment}}
            <DocMetaRow @label="Comment" @valueToShow={{this.token.comment}} />
          {{/if}}
        {{/if}}
      </div>
    </li>
  </template>
}
