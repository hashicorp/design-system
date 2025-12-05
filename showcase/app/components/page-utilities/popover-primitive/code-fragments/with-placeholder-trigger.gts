/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';

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
  get anchoredPositionOptions() {
    const {
      hasArrow,
      offset,
      arrowPadding,
      placement = 'bottom',
      arrowId,
    } = this.args;

    const options: HdsAnchoredPositionOptions = {
      enableCollisionDetection: false,
      placement,
      arrowPadding,
      arrowSelector: hasArrow ? `#${arrowId}` : undefined,
      offsetOptions: hasArrow ? 16 : undefined,
    };

    // override default offsetOptions if provided
    if (offset) {
      options['offsetOptions'] = offset;
    }

    return options;
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
              id={{@arrowId}}
              class="shw-utilities-popover-primitive-fake-arrow"
            />
          {{/if}}
          <ShwPlaceholder
            @text={{if (eq @placement undefined) "content" @placement}}
            @width="90"
            @height="40"
          />
        </div>
      </div>
    </HdsPopoverPrimitive>
  </template>
}
