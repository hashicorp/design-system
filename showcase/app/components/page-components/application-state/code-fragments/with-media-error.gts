/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import type { HdsApplicationStateSignature } from '@hashicorp/design-system-components/components/hds/application-state/index';

interface CodeFragmentWithMediaErrorSignature {
  Args: {
    align?: HdsApplicationStateSignature['Args']['align'];
  };
  Element: HdsApplicationStateSignature['Element'];
}

export default class CodeFragmentWithMediaError extends Component<CodeFragmentWithMediaErrorSignature> {
  <template>
    <HdsApplicationState @align={{@align}} as |A|>
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
  </template>
}
