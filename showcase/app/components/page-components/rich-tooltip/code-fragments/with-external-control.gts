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
import type { HdsRichTooltipForceStates } from '@hashicorp/design-system-components/components/hds/rich-tooltip/types';

export default class CodeFragmentWithExternalControl extends Component {
  @tracked state: HdsRichTooltipForceStates = 'close';

  get buttonLabel(): string {
    return this.state === 'open' ? 'Close rich tooltip' : 'Open rich tooltip';
  }

  onToggle = () => {
    this.state = this.state === 'open' ? 'close' : 'open';
  };

  // use callbacks to keep consumer tracked state in sync with internal component state
  onOpen = () => {
    this.state = 'open';
  };

  onClose = () => {
    this.state = 'close';
  };

  <template>
    <button
      type="button"
      {{style padding=".25rem" marginBottom="1rem"}}
      {{on "click" this.onToggle}}
    >
      {{this.buttonLabel}}
    </button>
    <HdsRichTooltip
      @enableClickEvents={{true}}
      @forceState={{this.state}}
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
