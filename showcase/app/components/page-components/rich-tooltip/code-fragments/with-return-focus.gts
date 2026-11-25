/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import { on } from '@ember/modifier';

import {
  HdsButton,
  HdsRichTooltip,
} from '@hashicorp/design-system-components/components';
import style from 'ember-style-modifier';

<template>
  <button
    type="button"
    id="return-focus-button"
    {{style padding=".25rem" marginBottom="1rem"}}
  >
    Return focus here
  </button>
  <HdsRichTooltip
    @enableClickEvents={{true}}
    @returnFocusTo="return-focus-button"
    as |RT|
  >
    <RT.Toggle @text="Rich tooltip" @icon="info" />
    <RT.Bubble>
      <HdsButton @text="Close" @size="small" {{on "click" RT.close}} />
    </RT.Bubble>
  </HdsRichTooltip>
</template>
