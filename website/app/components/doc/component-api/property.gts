/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { or, eq } from 'ember-truth-helpers';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';

import DocBadge from 'website/components/doc/badge';
import DocBanner from 'website/components/doc/banner';

export interface DocComponentApiPropertySignature {
  Args: {
    name?: string;
    type?: string;
    required?: boolean;
    deprecated?: boolean;
    values?: string[];
    default?: string;
    valueNote?: string;
  };
  Blocks: {
    default: [
      {
        Banner: WithBoundArgs<typeof DocBanner, 'type'>;
      },
    ];
  };
  Element: HTMLDivElement;
}

const DocComponentApiProperty: TemplateOnlyComponent<DocComponentApiPropertySignature> =
  <template>
    <div class="doc-component-api__property">
      {{#if @name}}
        <div class="doc-component-api__property-info">
          <code class="doc-component-api__property-name">{{@name}}</code>
          {{#if @type}}
            <code class="doc-component-api__property-type">{{@type}}</code>
          {{/if}}
          {{#if @required}}
            <DocBadge @type="critical-inverted">Required</DocBadge>
          {{/if}}
          {{#if @deprecated}}
            <DocBadge @type="warning">Deprecated</DocBadge>
          {{/if}}
        </div>
      {{/if}}
      {{#if (or @values @valueNote)}}
        {{#if @values}}
          <ul class="doc-component-api__property-values" role="list">
            {{#each @values as |value|}}
              <li
                class="doc-component-api__property-value
                  {{if
                    (eq @default value)
                    'doc-component-api__property-value--default'
                  }}"
              >
                {{value}}{{#if (eq @default value)}}
                  <span class="doc-sr-only">(default)</span>{{/if}}
              </li>
            {{/each}}
          </ul>
        {{else if @valueNote}}
          <div class="doc-component-api__property-values">
            {{@valueNote}}
          </div>
        {{/if}}
      {{else if @default}}
        <ul class="doc-component-api__property-values" role="list">
          <li
            class="doc-component-api__property-value doc-component-api__property-value--default"
          >
            {{@default}}
            <span class="doc-sr-only">(default)</span>
          </li>
        </ul>
      {{/if}}
      {{#if (has-block)}}
        <div class="doc-component-api__property-description">
          {{yield (hash Banner=(component DocBanner type="warning"))}}
        </div>
      {{/if}}
    </div>
  </template>;

export default DocComponentApiProperty;
