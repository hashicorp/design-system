/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { on } from '@ember/modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state/index';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';
import CodeFragmentWithMediaEmptyState from '../code-fragments/with-media-empty-state';
import CodeFragmentWithMediaError from '../code-fragments/with-media-error';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface SubSectionWithMediaSignature {
  Args: {
    showHighlight: boolean;
    toggleHighlight: () => void;
  };
}

const SubSectionWithMedia: TemplateOnlyComponent<SubSectionWithMediaSignature> =
  <template>
    <ShwTextH2>With media</ShwTextH2>

    <button
      type="button"
      class="shw-component-application-state-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="row" @gap="4rem" as |SF|>
      {{#each ALIGNS as |align|}}
        <SF.Item @label="With image / {{align}} aligned">
          <HdsApplicationState @align={{align}} as |A|>
            <A.Media>
              <img
                src="/assets/images/avatar.png"
                alt="portrait of a cat wearing old-fashioned formal wear"
                class="shw-component-application-state-avatar"
              />
            </A.Media>
            <A.Header
              @title="An error has occurred"
              @icon="alert-circle"
              @errorCode="404"
            />
            <A.Body
              @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
            />
            <A.Footer as |F|>
              <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
              <F.LinkStandalone
                @icon="help"
                @text="Need Help"
                @href="/components/alert"
                @iconPosition="trailing"
              />
              <F.LinkStandalone
                @icon="docs-link"
                @text="Learn more"
                @iconPosition="trailing"
                @href="#"
              />
            </A.Footer>
          </HdsApplicationState>
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="With icon / {{align}} aligned">
          <CodeFragmentWithMediaEmptyState @align={{align}} />
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="With IconTile / {{align}} aligned">
          <CodeFragmentWithMediaEmptyState @align={{align}} />
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="With generic content / {{align}} aligned">
          <CodeFragmentWithMediaEmptyState @align={{align}} />
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwDivider />

    <ShwTextH4 @tag="h3">With wide media (banner-like)</ShwTextH4>

    <button
      type="button"
      class="shw-component-application-state-button-highlight"
      {{on "click" @toggleHighlight}}
    >
      {{if @showHighlight "Hide" "Show"}}
      layout highlight
    </button>

    <ShwFlex @direction="column" @gap="4rem" as |SF|>
      {{#each ALIGNS as |align|}}
        <SF.Item @label="{{align}} aligned">
          <CodeFragmentWithMediaError @align={{align}} />
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionWithMedia;
