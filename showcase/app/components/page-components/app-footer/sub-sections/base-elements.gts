/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import {
  HdsAppFooterItem,
  HdsAppFooterLink,
  HdsAppFooterStatusLink,
  HdsAppFooterLegalLinks,
  HdsAppFooterCopyright,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import { concat } from '@ember/helper';

import { STATUSES as STATUS_LINK_STATUSES } from '@hashicorp/design-system-components/components/hds/app-footer/status-link';

export interface SubSectionBaseElementsSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const LINK_STATES = ['default', 'hover', 'active', 'focus'];
const THEMES = ['light', 'dark'];

const SubSectionBaseElements: TemplateOnlyComponent<SubSectionBaseElementsSignature> =
  <template>
    <ShwTextH2>Base components & child components</ShwTextH2>

    <button type="button" {{on "click" @toggleHighlight}}>
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwTextH3>AppFooterItem</ShwTextH3>

    <ul class="hds-app-footer__list">
      <HdsAppFooterItem><HdsTextBody
          @tag="span"
          @size="100"
          @color="primary"
        >Item</HdsTextBody></HdsAppFooterItem>
    </ul>

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppFooterLink</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    {{#each THEMES as |theme|}}
      <ShwTextBody><strong>{{theme}} theme</strong></ShwTextBody>

      <ShwFlex @gap="2rem" {{style justifyContent="space-between"}} as |SF|>
        {{#each LINK_STATES as |state|}}
          <SF.Item @label={{state}}>
            <ul
              class={{concat
                "hds-app-footer__list hds-app-footer--theme-"
                theme
              }}
            >
              <HdsAppFooterLink
                @href="#"
                mock-state-value={{state}}
              >Link</HdsAppFooterLink>
            </ul>
          </SF.Item>
        {{/each}}
      </ShwFlex>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppFooterStatusLink</ShwTextH3>

    <ShwTextH4>Status variants</ShwTextH4>

    {{#each THEMES as |theme|}}
      <ShwTextBody><strong>{{theme}} theme</strong></ShwTextBody>

      <ShwFlex @gap="2rem" {{style justifyContent="space-between"}} as |SF|>
        {{#each-in STATUS_LINK_STATUSES as |status|}}
          <SF.Item @label={{status}}>
            <ul
              class={{concat
                "hds-app-footer__list hds-app-footer--theme-"
                theme
              }}
            >
              <HdsAppFooterStatusLink @status={{status}} />
            </ul>
          </SF.Item>
        {{/each-in}}
      </ShwFlex>
    {{/each}}

    <ShwTextH4>With custom values</ShwTextH4>

    <ShwTextBody><strong>Custom values combined with a standard status</strong></ShwTextBody>

    <ShwFlex @gap="2rem" as |SF|>
      <SF.Item @label="with custom text">
        <ul class="hds-app-footer__list hds-app-footer--theme-light">
          <HdsAppFooterStatusLink @status="operational" @text="Operativo" />
        </ul>
      </SF.Item>

      <SF.Item @label="with custom icon color">
        <ul class="hds-app-footer__list hds-app-footer--theme-light">
          <HdsAppFooterStatusLink
            @status="operational"
            @statusIconColor="purple"
          />
        </ul>
      </SF.Item>

      <SF.Item @label="with custom icon">
        <ul class="hds-app-footer__list hds-app-footer--theme-light">
          <HdsAppFooterStatusLink
            @status="operational"
            @statusIcon="cloud-check"
          />
        </ul>
      </SF.Item>
    </ShwFlex>

    <ShwTextBody><strong>Custom values with no status</strong></ShwTextBody>
    <ShwFlex @gap="2rem" as |SF|>
      <SF.Item @label="with custom icon and text">
        <ul class="hds-app-footer__list hds-app-footer--theme-light">
          <HdsAppFooterStatusLink
            @statusIcon="hexagon-fill"
            @text="Lorem ipsum"
          />
        </ul>
      </SF.Item>

      <SF.Item @label="with custom icon, icon color, text, & href">
        <ul class="hds-app-footer__list hds-app-footer--theme-light">
          <HdsAppFooterStatusLink
            @statusIcon="waypoint"
            @statusIconColor="var(--token-color-waypoint-brand)"
            @href="https://www.hashicorp.com/products/waypoint"
            @text="Waypoint"
          />
        </ul>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppFooterLegalLinks</ShwTextH3>

    <ShwFlex @direction="column" @gap="2rem" as |SF|>
      <SF.Item @label="with default url for “Terms” link">
        <ul class="hds-app-footer__list hds-app-footer--theme-light">
          <HdsAppFooterLegalLinks />
        </ul>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppFooterCopyright</ShwTextH3>

    <ShwFlex @gap="2rem" as |SF|>
      <SF.Item @label="with default (current) year">
        <HdsAppFooterCopyright />
      </SF.Item>

      <SF.Item @label="with custom year">
        <HdsAppFooterCopyright @year="1984" />
      </SF.Item>
    </ShwFlex>
  </template>;

export default SubSectionBaseElements;
