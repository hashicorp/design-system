import Component from '@glimmer/component';
import { on } from '@ember/modifier';
import { tracked } from '@glimmer/tracking';
import style from 'ember-style-modifier';
import { eq } from 'ember-truth-helpers';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';
import type { HdsPopoverPrimitiveForceStates } from '@hashicorp/design-system-components/components/hds/popover-primitive/types';

export default class CodeFragmentWithExternalControl extends Component {
  @tracked state: HdsPopoverPrimitiveForceStates = 'close';

  onToggle = () => {
    this.state = this.state === 'open' ? 'close' : 'open';
  };

  onOpen = () => {
    this.state = 'open';
  };

  onClose = () => {
    this.state = 'close';
  };

  <template>
    <button type="button" {{on "click" this.onToggle}}>
      {{if (eq this.state "open") "Close popover" "Open popover"}}
    </button>
    <HdsPopoverPrimitive
      @enableClickEvents={{true}}
      @forceState={{this.state}}
      @onOpen={{this.onOpen}}
      @onClose={{this.onClose}}
      as |PP|
    >
      <div
        class="shw-utilities-popover-primitive-fake-container"
        {{PP.setupPrimitiveContainer}}
      >
        <button
          type="button"
          class="shw-utilities-popover-primitive-fake-toggle"
          {{style marginBottom="150px"}}
          {{PP.setupPrimitiveToggle}}
        >Toggle</button>
        <div
          class="shw-utilities-popover-primitive-fake-popover"
          {{PP.setupPrimitivePopover}}
        >
          <ShwPlaceholder @text="Content" @width="200" @height="40" />
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
