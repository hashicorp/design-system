import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import {
  HdsFlyout,
  HdsButton,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked isActive = false;

  activateFlyout = () => {
    this.isActive = true;
  };

  deactivateFlyout = () => {
    this.isActive = false;
  };

  <template>
    <HdsButton
      @text="Open Flyout"
      @color="secondary"
      {{on "click" this.activateFlyout}}
    />

    {{#if this.isActive}}
      <HdsFlyout id="basic-flyout" @onClose={{this.deactivateFlyout}} as |M|>
        <M.Header @tagline="Main page context" @icon="info">
          Additional information
        </M.Header>
        <M.Description>
          Lorem ipsum dolor sit amet consectetur. Ut ultrices id venenatis in
          felis auctor ante.
        </M.Description>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">
            Aliquam ac enim iaculis, faucibus enim id, dapibus quam. Nunc nibh
            mi, vehicula sed enim eget, lacinia venenatis tortor. Quisque vitae
            accumsan est, eu vehicula arcu.
          </p>
        </M.Body>
      </HdsFlyout>
    {{/if}}
  </template>
}
