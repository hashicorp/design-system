/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { concat, get } from '@ember/helper';
import { and, eq } from 'ember-truth-helpers';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import { HdsThemeContext } from '@hashicorp/design-system-components/components';

import DocMetaRow from 'website/components/doc/meta-row';
import DocTokenPreview from 'website/components/doc/token-preview';
import DocBadge from 'website/components/doc/badge';

type NormalizedTokenMode = {
  mode: string;
  label: string;
  value: string;
  alias_of?: string;
};

type NormalizedToken = {
  name: string;
  type: string;
  value: string;
  modes?: NormalizedTokenMode[];
  alias_of?: string;
  deprecated?: boolean;
  comment?: string;
  comments?: Record<string, string>;
};

export interface DocTokensListItemSignature {
  Args: {
    token: {
      name: string;
      $type: string;
      $value: string | number;
      $modes?: Record<string, string | number>;
      original: {
        $value: string | number;
        // note: unlike the resolved `$modes` above, `original.$modes` is intentionally left un-resolved (raw) so we
        // can still detect and display the underlying alias reference (see the `originalModeValue` handling below);
        // a "property-override" mode entry (eg. `{ $value, unit }`/`{ $value, alpha }`) is therefore still an object here
        $modes?: Record<string, string | number | Record<string, unknown>>;
        comments?: Record<string, string>;
      };
      deprecated?: boolean;
      comment?: string;
    };
  };
  Element: HTMLLIElement;
}

export default class DocTokensListItem extends Component<DocTokensListItemSignature> {
  @tracked isExpanded = false;

  get token(): NormalizedToken {
    const { token } = this.args;
    const normalizedToken: NormalizedToken = {
      name: token.name,
      // note: we prefix `type` and `value` with `$` because we're using the DTCG format
      type: token.$type,
      value: token.$value.toString(),
      deprecated: token.deprecated,
    };
    // standard alias
    if (
      // note: also the original value is prefixed with `$`
      token.original.$value &&
      token.original.$value !== token.$value &&
      token.original.$value.toString().includes('{')
    ) {
      normalizedToken.alias_of = token.original.$value.toString();
    }
    // "modes" values
    if (token.$modes) {
      const modes: NormalizedTokenMode[] = [];
      Object.entries(token.$modes).forEach(([modeName, modeValue]) => {
        const modeObj: NormalizedTokenMode = {
          mode: modeName,
          label: modeName.replace('cds', 'CDS'),
          value: modeValue.toString(),
        };
        const originalModeValue = token.original.$modes?.[modeName];
        if (
          originalModeValue !== undefined &&
          originalModeValue !== modeValue
        ) {
          if (
            typeof originalModeValue === 'string' &&
            originalModeValue.includes('{')
          ) {
            modeObj.alias_of = originalModeValue;
          } else if (
            typeof originalModeValue === 'object' &&
            originalModeValue['$value'] &&
            typeof originalModeValue['$value'] === 'string' &&
            originalModeValue['$value'].includes('{')
          ) {
            modeObj.alias_of = originalModeValue['$value'];
          }
        }
        modes.push(modeObj);
      });
      normalizedToken.modes = modes;
    }
    // comment(s)
    if (token.comment) {
      normalizedToken.comment = token.comment;
    }
    if (token.original?.comments) {
      normalizedToken.comments = token.original.comments;
    }
    return normalizedToken;
  }

  get dump() {
    return JSON.stringify(this.token, null, 2);
  }

  toggle = () => {
    this.isExpanded = !this.isExpanded;
  };

  <template>
    {{! role="listitem" is needed here because the class sets display: contents and some browsers and assistive technologies will ignore the implied role }}
    <li class="doc-tokens-list__item" role="listitem">
      <div class="doc-tokens-list__preview">
        <DocTokenPreview
          @type={{this.token.type}}
          @name={{this.token.name}}
          @value={{this.token.value}}
        />
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
          <DocBadge @type="warning" @size="medium">Deprecated</DocBadge>
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
            @valueToShow={{this.token.value}}
            @isClipped={{true}}
          >
            <:extra>
              {{#if this.token.modes}}
                <DocBadge
                  class="doc-tokens-list__item-row-carbonization-badge"
                  @type="information-inverted"
                  @size="medium"
                >Carbonized</DocBadge>
              {{/if}}
            </:extra>
          </DocMetaRow>
        {{/if}}
        {{#if this.isExpanded}}
          {{#if this.token.type}}
            <DocMetaRow @label="Type" @valueToShow={{this.token.type}} />
          {{/if}}
          {{#if this.token.alias_of}}
            <DocMetaRow
              @label="Alias of"
              @valueToShow={{this.token.alias_of}}
            />
          {{/if}}
          {{#if this.token.comment}}
            <DocMetaRow @label="Comment" @valueToShow={{this.token.comment}} />
          {{/if}}
        {{/if}}
        {{#if (and this.isExpanded this.token.modes)}}
          <div class="doc-tokens-list__content-divider"></div>
          <div class="doc-tokens-list__content-label">Carbonization</div>
          <div class="doc-tokens-list__content-modes">
            {{#each this.token.modes as |mode|}}
              {{#unless (eq mode.mode "default")}}
                <div class="doc-tokens-list__mode">
                  <div class="doc-tokens-list__mode-label">{{mode.label}}</div>
                  <div class="doc-tokens-list__mode-preview">
                    <HdsThemeContext @context={{mode.mode}}>
                      <DocTokenPreview
                        @type={{this.token.type}}
                        @name={{this.token.name}}
                        @value={{mode.value}}
                      />
                    </HdsThemeContext>
                  </div>
                  <div class="doc-tokens-list__mode-content">
                    <DocMetaRow
                      @label="Value"
                      @valueToShow={{mode.value}}
                      @isClipped={{true}}
                      @compact={{true}}
                    />
                    {{#if mode.alias_of}}
                      <DocMetaRow
                        @label="Alias of"
                        @valueToShow={{mode.alias_of}}
                        @compact={{true}}
                      />
                    {{/if}}
                  </div>
                </div>
              {{/unless}}
            {{/each}}
          </div>
          {{#let (get this.token.comments "cds") as |cdsComment|}}
            {{#if cdsComment}}
              <DocMetaRow
                class="doc-tokens-list__modes-comment"
                @label="Comment"
                @valueToShow={{cdsComment}}
                @compact={{true}}
              />
            {{/if}}
          {{/let}}
        {{/if}}
      </div>
    </li>
  </template>
}
