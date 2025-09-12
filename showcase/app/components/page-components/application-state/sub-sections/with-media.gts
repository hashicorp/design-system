/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { on } from '@ember/modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state/index';
import {
  HdsIcon,
  HdsIconTile,
} from '@hashicorp/design-system-components/components';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

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
          <HdsApplicationState @align={{align}} as |A|>
            <A.Media>
              <HdsIcon @name="channel" @size="24" />
            </A.Media>
            <A.Header @title="Empty state title" />
            <A.Body
              @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
            />
            <A.Footer as |F|>
              <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
            </A.Footer>
          </HdsApplicationState>
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="With IconTile / {{align}} aligned">
          <HdsApplicationState @align={{align}} as |A|>
            <A.Media>
              <HdsIconTile @logo="terraform" @size="large" />
            </A.Media>
            <A.Header @title="Empty state title" />
            <A.Body
              @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
            />
            <A.Footer as |F|>
              <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
            </A.Footer>
          </HdsApplicationState>
        </SF.Item>
      {{/each}}
      {{#each ALIGNS as |align|}}
        <SF.Item @label="With generic content / {{align}} aligned">
          <HdsApplicationState @align={{align}} as |A|>
            <A.Media>
              <ShwPlaceholder @text="media" @width="80" @height="80" />
            </A.Media>
            <A.Header @title="Empty state title" />
            <A.Body
              @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
            />
            <A.Footer as |F|>
              <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
            </A.Footer>
          </HdsApplicationState>
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwDivider />

    <ShwTextH4 @tag="h3">With wide media (banner-like)</ShwTextH4>

    <ShwFlex @direction="column" @gap="4rem" as |SF|>
      {{#each ALIGNS as |align|}}
        <SF.Item @label="{{align}} aligned">
          <HdsApplicationState @align={{align}} as |A|>
            <A.Media>
              <img
                src="/assets/images/cat-banner.png"
                alt="3 cats wearing old-fashioned formal wear"
                class="shw-component-application-state-banner"
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
              <F.Button @color="primary" @text="Primary action" />
              <F.Button @color="secondary" @text="Secondary action" />
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
    </ShwFlex>

    <ShwDivider />
  </template>;

export default SubSectionWithMedia;
