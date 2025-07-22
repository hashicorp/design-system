import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';
import { action } from '@ember/object';

import {
  HdsButton,
  HdsButtonSet,
  HdsModal,
} from '@hashicorp/design-system-components/components';

import CopyButtonGenericContent from 'showcase/components/mock/components/copy/button/copy-button-generic-demo';

export default class CopyButtonInModal extends Component {
  @tracked isModalOpen = false;

  @action
  openModal() {
    this.isModalOpen = true;
  }

  @action
  closeModal() {
    this.isModalOpen = false;
  }

  <template>
    <HdsButton
      @color="secondary"
      @text="Open modal"
      {{on "click" this.openModal}}
    />
    {{#if this.isModalOpen}}
      <HdsModal id="test-copy-button-modal" @onClose={{this.closeModal}} as |M|>
        <M.Header>
          Lorem ipsum dolor
        </M.Header>
        <M.Body>
          <form name="test-copy-button-modal-form">
            <CopyButtonGenericContent />
          </form>
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              @text="OK"
              {{on "click" this.closeModal}}
            />
            <HdsButton
              type="button"
              @text="Cancel"
              @color="secondary"
              {{on "click" F.close}}
            />
          </HdsButtonSet>
        </M.Footer>
      </HdsModal>
    {{/if}}
  </template>
}
