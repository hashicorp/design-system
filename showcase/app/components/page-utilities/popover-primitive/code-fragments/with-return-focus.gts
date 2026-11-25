import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import { HdsPopoverPrimitive } from '@hashicorp/design-system-components/components';

<template>
  <button type="button" id="return-focus-button">
    Return focus here
  </button>
  <HdsPopoverPrimitive
    @enableClickEvents={{true}}
    @returnFocusTo="return-focus-button"
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
        <button type="button" {{on "click" PP.hidePopover}}>Close</button>
      </div>
    </div>
  </HdsPopoverPrimitive>
</template>
