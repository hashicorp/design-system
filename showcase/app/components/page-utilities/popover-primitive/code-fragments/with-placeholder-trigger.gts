/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import ShwPlaceholder from 'showcase/components/shw/placeholder';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';
import type { HdsAnchoredPositionOptions } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';

export interface CodeFragmentWithPlaceholderTriggerSignature {
  Args: {
    placement?: HdsAnchoredPositionOptions['placement'];
    hasArrow?: boolean;
    arrowId?: string;
    offset?: HdsAnchoredPositionOptions['offsetOptions'];
    arrowPadding?: number;
  };
  Element: HTMLDivElement;
}

export default class CodeFragmentWithPlaceholderTrigger extends Component<CodeFragmentWithPlaceholderTriggerSignature> {
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
    const { hasArrow, offset, arrowPadding } = this.args;

    const options: HdsAnchoredPositionOptions = {
      enableCollisionDetection: false,
      placement: this.placement,
      arrowPadding,
      arrowSelector: hasArrow ? this.arrowSelector : undefined,
      offsetOptions: hasArrow ? 16 : undefined,
    };

    if (offset) {
      // override default offsetOptions if provided
      options['offsetOptions'] = offset;
    }

    return options;
  }

  get popoverText() {
    return this.args.placement ?? 'content';
  }

  <template>
    <HdsPopoverPrimitive @isOpen={{true}} @enableClickEvents={{true}} as |PP|>
      <div
        class="shw-utilities-popover-primitive-fake-container"
        {{PP.setupPrimitiveContainer}}
      >
        <button
          type="button"
          aria-label="target of the popover"
          class="shw-utilities-popover-primitive-fake-toggle shw-utilities-popover-primitive-fake-toggle--square"
          {{PP.setupPrimitiveToggle}}
        />
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
          <ShwPlaceholder @text={{this.popoverText}} @width="90" @height="40" />
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
