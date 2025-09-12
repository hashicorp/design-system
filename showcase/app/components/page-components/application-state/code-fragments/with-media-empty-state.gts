/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import type { HdsApplicationStateSignature } from '@hashicorp/design-system-components/components/hds/application-state/index';

interface CodeFragmentWithMediaEmptyStateSignature {
  Args: {
    align?: HdsApplicationStateSignature['Args']['align'];
  };
  Element: HdsApplicationStateSignature['Element'];
}

export default class CodeFragmentWithMediaEmptyState extends Component<CodeFragmentWithMediaEmptyStateSignature> {
  <template>
    <HdsApplicationState @align={{@align}} as |A|>
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
  </template>
}
