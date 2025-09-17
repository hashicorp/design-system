/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';

import {
  HdsApplicationState,
  HdsIcon,
  HdsIconTile,
} from '@hashicorp/design-system-components/components';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import type { HdsApplicationStateSignature } from '@hashicorp/design-system-components/components/hds/application-state/index';
import type { HdsApplicationStateHeaderSignature } from '@hashicorp/design-system-components/components/hds/application-state/header';

enum CodeFragmentWithErrorContentActionsValues {
  Primary = 'primary',
  Secondary = 'secondary',
  StandaloneLink = 'standaloneLink',
}

type CodeFragmentWithErrorContentActions =
  `${CodeFragmentWithErrorContentActionsValues}`;

enum CodeFragmentWithErrorContentMediaValues {
  Icon = 'icon',
  IconTile = 'icon-tile',
  Image = 'image',
  Generic = 'generic',
}

type CodeFragmentWithErrorContentMedia =
  `${CodeFragmentWithErrorContentMediaValues}`;

interface CodeFragmentWithErrorContentSignature {
  Args: {
    actions?: Array<CodeFragmentWithErrorContentActions>;
    align?: HdsApplicationStateSignature['Args']['align'];
    bodyText?: string;
    hasErrorCode?: boolean;
    media?: CodeFragmentWithErrorContentMedia;
    icon?: HdsApplicationStateHeaderSignature['Args']['icon'];
    titleTag?: HdsApplicationStateHeaderSignature['Args']['titleTag'];
    titleText?: string;
  };
  Element: HdsApplicationStateSignature['Element'];
}

export default class CodeFragmentWithErrorContent extends Component<CodeFragmentWithErrorContentSignature> {
  get titleText() {
    return this.args.titleText ?? 'An error has occurred';
  }

  get bodyText() {
    return (
      this.args.bodyText ??
      'Sorry, an unexpected error has occurred. Please try again later or contact support for assistance.'
    );
  }

  includesAction = (action: CodeFragmentWithErrorContentActions) => {
    return this.args.actions?.includes(action);
  };

  <template>
    <HdsApplicationState @align={{@align}} as |A|>
      {{#if @media}}
        <A.Media>
          {{#if (eq @media CodeFragmentWithErrorContentMediaValues.Icon)}}
            <HdsIcon @name="channel" @size="24" />
          {{else if
            (eq @media CodeFragmentWithErrorContentMediaValues.IconTile)
          }}
            <HdsIconTile @logo="terraform" @size="large" />
          {{else if (eq @media CodeFragmentWithErrorContentMediaValues.Image)}}
            <img
              src="/assets/images/cat-banner.png"
              alt="3 cats wearing old-fashioned formal wear"
              class="shw-component-application-state-banner"
            />
          {{else if
            (eq @media CodeFragmentWithErrorContentMediaValues.Generic)
          }}
            <ShwPlaceholder @text="media" @width="80" @height="80" />
          {{/if}}
        </A.Media>
      {{/if}}
      <A.Header
        @title={{this.titleText}}
        @titleTag={{@titleTag}}
        @icon={{@icon}}
        @errorCode={{if @hasErrorCode "404"}}
      />
      <A.Body @text={{this.bodyText}} />
      <A.Footer as |F|>
        {{#if (this.includesAction "primary")}}
          <F.Button @color="primary" @text="Primary action" />
        {{/if}}
        {{#if (this.includesAction "secondary")}}
          <F.Button @color="secondary" @text="Secondary action" />
        {{/if}}
        {{#if (this.includesAction "standaloneLink")}}
          <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
        {{/if}}
      </A.Footer>
    </HdsApplicationState>
  </template>
}
