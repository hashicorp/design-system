/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import { on } from '@ember/modifier';
import style from 'ember-style-modifier';

import { HdsDropdown } from '@hashicorp/design-system-components/components';

<template>
  <button
    type="button"
    id="return-focus-button"
    {{style padding=".25rem" marginBottom="1rem"}}
  >
    Return focus here
  </button>
  <HdsDropdown @returnFocusTo="return-focus-button" as |D|>
    <D.ToggleButton @color="secondary" @text="Menu" />
    <D.Interactive {{on "click" D.close}}>Close</D.Interactive>
  </HdsDropdown>
</template>
