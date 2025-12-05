/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsIconSignature } from '../icon';

export interface HdsSideNavToggleButtonSignature {
  Args: {
    icon: HdsIconSignature['Args']['name'];
  };
  Element: HTMLButtonElement;
}

const HdsSideNavToggleButton =
  TemplateOnlyComponent<HdsSideNavToggleButtonSignature>();

export default HdsSideNavToggleButton;
