/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';

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
  get anchoredPositionOptions() {
    const {
      hasArrow,
      enableCollisionDetection,
      strategy,
      placement = 'bottom',
      arrowId,
    } = this.args;

    const options: HdsAnchoredPositionOptions = {
      enableCollisionDetection: enableCollisionDetection ?? false,
      placement,
      arrowSelector: hasArrow ? `#${arrowId}` : undefined,
      offsetOptions: hasArrow ? 16 : undefined,
      strategy,
    };

    return options;
  }

  <template>
    <HdsPopoverPrimitive
      @isOpen={{if (eq @isOpen undefined) true @isOpen}}
      @enableClickEvents={{if
        (eq @enableClickEvents undefined)
        true
        @enableClickEvents
      }}
      @enableSoftEvents={{@enableSoftEvents}}
      as |PP|
    >
      <div
        class="shw-utilities-popover-primitive-fake-container"
        {{PP.setupPrimitiveContainer}}
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
              id={{@arrowId}}
              class="shw-utilities-popover-primitive-fake-arrow"
            />
          {{/if}}
          <ShwPlaceholder @text="Content" @width="120" @height="40" />
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
