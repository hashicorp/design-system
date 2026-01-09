/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
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
  };
  Element: HTMLDivElement;
}

const DocMetaRow: TemplateOnlyComponent<DocMetaRowSignature> = <template>
  <div class="doc-meta-row" ...attributes>
    <div class="doc-meta-row__label">{{@label}}</div>
    <div class="doc-meta-row__value">
      {{! when we pass a single value, we have two different use cases to support }}
      {{#if @copyable}}
        <DocCopyButton
          {{! @glint-expect-error }}
          @textToCopy={{@valueToCopy}}
          @textToShow={{(or @valueToShow @valueToCopy)}}
          @type="ghost"
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
  </div>
</template>;

export default DocMetaRow;
