/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsRichTooltip } from '@hashicorp/design-system-components/components';

export default class CodeFragmentWithExternalControl extends Component {
  @tracked isOpen = true;

  get buttonLabel(): string {
    return this.isOpen ? 'Close rich tooltip' : 'Open rich tooltip';
  }

  onToggle = () => {
    this.isOpen = !this.isOpen;
  };

  // callbacks needed to keep tracked state in sync with internal state
  onOpen = () => {
    this.isOpen = true;
  };

  onClose = () => {
    this.isOpen = false;
  };

  <template>
    <div {{style marginBottom="1rem"}}>
      <button
        type="button"
        {{on "click" this.onToggle}}
      >{{this.buttonLabel}}</button>
      <p>isOpen: {{this.isOpen}}</p>
    </div>

    <HdsRichTooltip
      @enableClickEvents={{true}}
      @isOpen={{this.isOpen}}
      @onOpen={{this.onOpen}}
      @onClose={{this.onClose}}
      as |RT|
    >
      <RT.Toggle @text="Rich tooltip" @icon="info" />
      <RT.Bubble>
        <ShwPlaceholder @text="generic content" @height="40" />
      </RT.Bubble>
    </HdsRichTooltip>
  </template>
}
