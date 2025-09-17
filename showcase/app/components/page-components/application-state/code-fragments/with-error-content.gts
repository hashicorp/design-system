/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import type { HdsApplicationStateSignature } from '@hashicorp/design-system-components/components/hds/application-state/index';
import type { HdsApplicationStateHeaderSignature } from '@hashicorp/design-system-components/components/hds/application-state/header';

interface CodeFragmentWithErrorContentSignature {
  Args: {
    bodyText?: string;
    hasErrorCode?: boolean;
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

  <template>
    <HdsApplicationState as |A|>
      <A.Header
        @title={{this.titleText}}
        @titleTag={{@titleTag}}
        @icon={{@icon}}
        @errorCode={{if @hasErrorCode "404"}}
      />
      <A.Body @text={{this.bodyText}} />
      <A.Footer as |F|>
        <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
      </A.Footer>
    </HdsApplicationState>
  </template>
}
