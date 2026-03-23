import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import {
  HdsModal,
  HdsButton,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked isOpen = false;

  activateModal = () => {
    this.isOpen = true;
  };

  deactivateModal = () => {
    this.isOpen = false;
  };

  <template>
    <HdsButton
      @text="Open basic modal"
      @color="secondary"
      {{on "click" this.activateModal}}
    />

    {{#if this.isOpen}}
      <HdsModal id="basic-modal" @onClose={{this.deactivateModal}} as |M|>
        <M.Header>
          Modal title
        </M.Header>
        <M.Body>
          <p class="hds-typography-body-300 hds-foreground-primary">Modal
            content</p>
        </M.Body>
        <M.Footer as |F|>
          <HdsButton type="button" @text="Confirm" {{on "click" F.close}} />
        </M.Footer>
      </HdsModal>
    {{/if}}
  </template>
}
