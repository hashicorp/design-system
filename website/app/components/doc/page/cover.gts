/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';

import { HdsIcon } from '@hashicorp/design-system-components/components';

import DocBadge from 'website/components/doc/badge';

interface DocPageCoverSignature {
  Args: {
    title: string;
    description?: string;
    status?: {
      label: string;
      type:
        | 'neutral'
        | 'information'
        | 'success'
        | 'warning'
        | 'critical'
        | 'outlined';
    };
    extra?: {
      links?: {
        [service: string]: string;
      };
    };
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class DocPageCover extends Component<DocPageCoverSignature> {
  get links() {
    const { extra } = this.args;

    if (extra?.links) {
      return extra?.links;
    } else {
      return false;
    }
  }

  <template>
    <div class="doc-page-cover" ...attributes>
      <div class="doc-page-cover__title-extra-wrapper">
        <h1 class="doc-page-cover__title">{{@title}}</h1>
        {{#if @status}}
          <DocBadge @type={{@status.type}}>{{@status.label}}</DocBadge>
        {{/if}}
        <div class="doc-page-cover__extra">
          {{#if this.links}}
            {{#each-in this.links as |service url|}}
              {{#if (eq service "figma")}}
                <a
                  class="doc-page-cover__link doc-link-generic"
                  href={{url}}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HdsIcon @name="figma-color" />
                  Figma
                </a>
              {{/if}}
              {{#if (eq service "github")}}
                <a
                  class="doc-page-cover__link doc-link-generic"
                  href={{url}}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <HdsIcon @name="github-color" />
                  GitHub
                </a>
              {{/if}}
            {{/each-in}}
          {{/if}}
        </div>
      </div>
      {{#if @description}}
        <p class="doc-page-cover__description">{{@description}}</p>
      {{/if}}
    </div>
  </template>
}
