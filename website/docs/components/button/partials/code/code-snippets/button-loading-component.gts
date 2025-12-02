import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import { HdsButton } from '@hashicorp/design-system-components/components';
import type { HdsButtonSignature } from '@hashicorp/design-system-components/components/hds/button/index';

interface ButtonLoadingSignature {
  Element: HdsButtonSignature['Element'];
}

export default class ButtonLoading extends Component<ButtonLoadingSignature> {
  @tracked isLoading = false;
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

  toggleIsLoading = () => {
    this.isLoading = !this.isLoading;

    clearTimeout(this.timer);
    // make it go back to the idle state
    this.timer = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  };

  <template>
    <HdsButton
      {{style width="7.5rem"}}
      @icon={{if this.isLoading "loading"}}
      @text={{if this.isLoading "Loading" "Save"}}
      {{on "click" this.toggleIsLoading}}
      ...attributes
    />
  </template>
}
