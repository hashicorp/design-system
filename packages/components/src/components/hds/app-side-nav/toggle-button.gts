/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import templateOnlyComponent from '@ember/component/template-only';

import HdsIcon from '../icon/index.ts';
import type { HdsIconSignature } from '../icon';

interface HdsAppSideNavToggleButtonSignature {
  Args: {
    icon: HdsIconSignature['Args']['name'];
  };
  Element: HTMLButtonElement;
}

const HdsAppSideNavToggleButton =
  templateOnlyComponent<HdsAppSideNavToggleButtonSignature>();

export default HdsAppSideNavToggleButton;

<template>
  <button class="hds-app-side-nav__toggle-button" type="button" ...attributes>
    <HdsIcon @name={{@icon}} />
  </button>
</template>