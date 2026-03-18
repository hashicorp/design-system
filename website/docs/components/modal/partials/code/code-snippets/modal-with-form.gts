import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';

import {
  HdsModal,
  HdsButton,
  HdsButtonSet,
  HdsForm,
  HdsFormSelectField,
  HdsFormTextareaField,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked isOpen = false;

  activateModal = () => {
    this.isOpen = true;
  };

  deactivateModal = () => {
    this.isOpen = false;
  };

  submitForm = () => {
    this.isOpen = false;
  };

  <template>
    <HdsButton
      @text="Open form modal"
      @color="secondary"
      {{on "click" this.activateModal}}
    />

    {{#if this.isOpen}}
      <HdsModal id="form-modal" @onClose={{this.deactivateModal}} as |M|>
        <M.Header>
          Why do you want to leave the beta?
        </M.Header>
        <M.Body>
          <HdsForm
            id="leaving-beta-form"
            {{on "submit" this.submitForm}}
            as |FORM|
          >
            <FORM.Section>
              <HdsFormSelectField @width="100%" as |F|>
                <F.Label>Select the primary reason</F.Label>
                <F.Options>
                  <option></option>
                </F.Options>
              </HdsFormSelectField>
              <HdsFormTextareaField @isOptional={{true}} as |F|>
                <F.Label>Your feedback</F.Label>
              </HdsFormTextareaField>
            </FORM.Section>
          </HdsForm>
        </M.Body>
        <M.Footer as |F|>
          <HdsButtonSet>
            <HdsButton
              type="submit"
              form="leaving-beta-form"
              @text="Leave Beta"
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
