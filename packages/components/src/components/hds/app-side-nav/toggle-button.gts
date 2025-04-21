/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

import HdsIcon from '../icon/index.gts';

import type { HdsIconSignature } from '../icon';

interface HdsAppSideNavToggleButtonSignature {
  Args: {
    icon: HdsIconSignature['Args']['name'];
  };
  Element: HTMLButtonElement;
}

const HdsAppSideNavToggleButton: TOC<HdsAppSideNavToggleButtonSignature> =
  <template>
    <button class="hds-app-side-nav__toggle-button" type="button" ...attributes>
      <HdsIcon @name={{@icon}} />
    </button>
  </template>;

export default HdsAppSideNavToggleButton;
