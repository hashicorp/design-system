/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import { HdsButton } from '@hashicorp/design-system-components/components';

export interface CodeFragmentWithLoadingStateSignature {
  Element: HTMLDivElement;
}

export default class CodeFragmentWithLoadingState extends Component<CodeFragmentWithLoadingStateSignature> {
  @tracked isLoading = false;
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

  toggleIsLoading = () => {
    this.isLoading = !this.isLoading;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    // make it go back to the idle state
    this.timer = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  };

  <template>
    <HdsButton
      @text={{if this.isLoading "Loading" "Save"}}
      @icon={{if this.isLoading "loading"}}
      @isFullWidth={{true}}
      {{on "click" this.toggleIsLoading}}
    />
  </template>
}
