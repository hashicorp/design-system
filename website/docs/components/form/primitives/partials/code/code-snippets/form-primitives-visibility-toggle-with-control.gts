import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import {
  HdsFormVisibilityToggle,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

export default class LocalComponent extends Component {
  @tracked isContentMasked = true;

  toggleVisibility = () => {
    this.isContentMasked = !this.isContentMasked;
  };

  <template>
    <label for="input-with-visibility-toggle">This is the label</label>
    <HdsLayoutFlex @gap="4" @align="center" as |LF|>
      <LF.Item>
        <input
          id="input-with-visibility-toggle"
          type={{if this.isContentMasked "password" "text"}}
          value="example-content"
        />
      </LF.Item>
      <LF.Item>
        <HdsFormVisibilityToggle
          @isVisible={{this.isContentMasked}}
          @ariaLabel="Toggle content visibility"
          @ariaMessageText="Content is hidden"
          @ariaMessageTextWhenVisible="Content is visible"
          aria-controls="input-with-visibility-toggle"
          {{on "click" this.toggleVisibility}}
        />
      </LF.Item>
    </HdsLayoutFlex>
  </template>
}
