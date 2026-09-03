/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';

import DocCopyButton from 'website/components/doc/copy-button';

interface DocMetaRowSignature {
  Args: {
    label: string;
    valueToShow?: string;
    valueToCopy?: string;
    multipleValuesToShow?: string[];
    copyable?: boolean;
    isClipped?: boolean;
    compact?: boolean;
  };
  Blocks: {
    extra?: [];
  };
  Element: HTMLDivElement;
}

export default class DocMetaRow extends Component<DocMetaRowSignature> {
  get classNames() {
    const classes = ['doc-meta-row'];

    // add a class based on the @size argument
    if (this.args.compact) {
      classes.push('doc-meta-row--compact');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      <div class="doc-meta-row__label">{{@label}}</div>
      <div class="doc-meta-row__value">
        {{! when we pass a single value, we have two different use cases to support }}
        {{#if @copyable}}
          <DocCopyButton
            @type="code"
            {{! @glint-expect-error }}
            @textToCopy={{@valueToCopy}}
            @textToShow={{(or @valueToShow @valueToCopy)}}
          />
        {{/if}}
        {{#if @valueToShow}}
          <code
            class="doc-meta-row__value-not-copyable
              {{if @isClipped 'doc-meta-row__value-not-copyable--is-clipped'}}"
          >{{@valueToShow}}</code>
        {{/if}}
        {{! instead when we pass an array, we just show the list }}
        {{#if @multipleValuesToShow}}
          <div class="doc-meta-row__values-list">
            {{#each @multipleValuesToShow as |value|}}
              <code class="doc-meta-row__value-not-copyable">
                {{value}}
              </code>
            {{/each}}
          </div>
        {{/if}}
      </div>
      {{yield to="extra"}}
    </div>
  </template>
}
