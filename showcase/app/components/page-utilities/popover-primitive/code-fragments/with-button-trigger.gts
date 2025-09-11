/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';
import type { HdsAnchoredPositionOptions } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';

export interface CodeFragmentWithButtonTriggerSignature {
  Args: {
    isOpen?: boolean;
    placement?: HdsAnchoredPositionOptions['placement'];
    hasArrow?: boolean;
    arrowId?: string;
    strategy?: HdsAnchoredPositionOptions['strategy'];
    enableCollisionDetection?: HdsAnchoredPositionOptions['enableCollisionDetection'];
    enableClickEvents?: boolean;
    enableSoftEvents?: boolean;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithButtonTrigger extends Component<CodeFragmentWithButtonTriggerSignature> {
  get enableClickEvents() {
    return this.args.enableClickEvents ?? true;
  }

  get isOpen() {
    return this.args.isOpen ?? true;
  }

  get placement() {
    return this.args.placement ?? 'bottom';
  }

  get arrowSelector() {
    return this.args.arrowId
      ? `#${this.args.arrowId}`
      : `#arrow-placement-${this.placement}`;
  }

  get arrowId() {
    return this.args.arrowId ?? `arrow-placement-${this.placement}`;
  }

  get anchoredPositionOptions() {
    const { hasArrow, enableCollisionDetection, strategy } = this.args;

    const options: HdsAnchoredPositionOptions = {
      enableCollisionDetection: enableCollisionDetection ?? false,
      placement: this.placement,
      arrowSelector: hasArrow ? this.arrowSelector : undefined,
      offsetOptions: hasArrow ? 16 : undefined,
      strategy,
    };

    return options;
  }

  <template>
    <HdsPopoverPrimitive
      @isOpen={{this.isOpen}}
      @enableClickEvents={{this.enableClickEvents}}
      @enableSoftEvents={{@enableSoftEvents}}
      as |PP|
    >
      <div
        class="shw-utilities-popover-primitive-fake-container"
        {{PP.setupPrimitiveContainer}}
        s
      >
        <button
          type="button"
          class="shw-utilities-popover-primitive-fake-toggle"
          {{PP.setupPrimitiveToggle}}
        >Toggle</button>
        <div
          class="shw-utilities-popover-primitive-fake-popover"
          {{PP.setupPrimitivePopover
            anchoredPositionOptions=this.anchoredPositionOptions
          }}
        >
          {{#if @hasArrow}}
            <div
              id={{this.arrowId}}
              class="shw-utilities-popover-primitive-fake-arrow"
            />
          {{/if}}
          <ShwPlaceholder @text="Content" @width="120" @height="40" />
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
