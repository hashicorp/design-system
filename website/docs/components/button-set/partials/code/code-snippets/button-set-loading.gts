import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import {
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked isLoading = false;
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

  toggleIsLoading = () => {
    this.isLoading = !this.isLoading;

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  };

  cancelLoading = () => {
    this.isLoading = false;
  };

  <template>
    <HdsButtonSet {{style width="15rem"}}>
      <HdsButton
        @icon={{if this.isLoading "loading"}}
        @text={{if this.isLoading "Loading" "Save"}}
        @isFullWidth={{true}}
        {{on "click" this.toggleIsLoading}}
      />
      <HdsButton
        @text="Cancel"
        @color="secondary"
        @isFullWidth={{true}}
        {{on "click" this.cancelLoading}}
      />
    </HdsButtonSet>
  </template>
}
