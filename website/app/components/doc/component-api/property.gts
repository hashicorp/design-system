/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { htmlSafe } from '@ember/template';
import { or, eq } from 'ember-truth-helpers';
import type { WithBoundArgs } from '@glint/template';
import { hash } from '@ember/helper';

import DocBadge from 'website/components/doc/badge';
import DocBanner from 'website/components/doc/banner';
import type { DocComponentApiProperty as DocComponentApiPropertyShape } from 'website/shared/component-api-manifest';

export interface DocComponentApiPropertySignature {
  Args: {
    name?: string;
    type?: string;
    required?: boolean;
    deprecated?: boolean;
    values?: string[];
    default?: string | number | boolean;
    valueNote?: string;
    description?: string;
    remarks?: string;
    links?: DocComponentApiPropertyShape['links'];
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

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function markdownToInlineHtml(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gu, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/gu, '<code>$1</code>')
    .replace(/\n/gu, '<br />');
}

export default class DocComponentApiProperty extends Component<DocComponentApiPropertySignature> {
  get descriptionHtml() {
    if (this.args.description === undefined || this.args.description.length === 0) {
      return undefined;
    }

    return htmlSafe(markdownToInlineHtml(this.args.description));
  }

  get remarksHtml() {
    if (this.args.remarks === undefined || this.args.remarks.length === 0) {
      return undefined;
    }

    return htmlSafe(markdownToInlineHtml(this.args.remarks));
  }

  get linksHtml() {
    const links = this.args.links;

    if (Array.isArray(links) === false || links.length === 0) {
      return undefined;
    }

    const renderedLinks = links
      .map((link) => {
        const href = link.href?.trim();

        if (href === undefined || href.length === 0) {
          return undefined;
        }

        const label = link.label?.trim();

        if (label !== undefined && label.length > 0) {
          return `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`;
        }

        return `<a href="${escapeHtml(href)}">${escapeHtml(href)}</a>`;
      })
      .filter((link): link is string => link !== undefined);

    if (renderedLinks.length === 0) {
      return undefined;
    }

    return htmlSafe(`See also: ${renderedLinks.join(', ')}.`);
  }

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

      {{#if (or this.descriptionHtml this.remarksHtml this.linksHtml (has-block))}}
        <div class="doc-component-api__property-description">
          {{#if this.descriptionHtml}}
            {{this.descriptionHtml}}
          {{/if}}

          {{#if this.remarksHtml}}
            {{#if this.descriptionHtml}}
              <br />
              <br />
            {{/if}}

            {{this.remarksHtml}}
          {{/if}}

          {{#if this.linksHtml}}
            {{#if (or this.descriptionHtml this.remarksHtml)}}
              <br />
              <br />
            {{/if}}

            {{this.linksHtml}}
          {{/if}}

          {{yield (hash Banner=(component DocBanner type="warning"))}}
        </div>
      {{/if}}
    </div>
  </template>
}
