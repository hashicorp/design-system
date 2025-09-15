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

enum CodeFragmentWithMediaVariantsMediaValues {
  Icon = 'icon',
  IconTile = 'icon-tile',
  Generic = 'generic',
}

type CodeFragmentWithMediaVariantsMedia =
  `${CodeFragmentWithMediaVariantsMediaValues}`;

interface CodeFragmentWithMediaVariantsSignature {
  Args: {
    align?: HdsApplicationStateSignature['Args']['align'];
    media?: CodeFragmentWithMediaVariantsMedia;
  };
  Element: HdsApplicationStateSignature['Element'];
}

export default class CodeFragmentWithMediaVariants extends Component<CodeFragmentWithMediaVariantsSignature> {
  get media() {
    return this.args.media ?? CodeFragmentWithMediaVariantsMediaValues.Generic;
  }

  <template>
    <HdsApplicationState @align={{@align}} as |A|>
      <A.Media>
        {{#if (eq this.media "icon")}}
          <HdsIcon @name="channel" @size="24" />
        {{else if (eq this.media "icon-tile")}}
          <HdsIconTile @logo="terraform" @size="large" />
        {{else}}
          {{! generic }}
          <ShwPlaceholder @text="media" @width="80" @height="80" />
        {{/if}}
      </A.Media>
      <A.Header @title="Empty state title" />
      <A.Body
        @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
      />
      <A.Footer as |F|>
        <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
      </A.Footer>
    </HdsApplicationState>
  </template>
}
