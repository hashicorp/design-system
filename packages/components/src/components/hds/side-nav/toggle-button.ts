/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { HdsIconSignature } from '../icon';

interface HdsSideNavToggleButtonSignature {
  Args: {
    icon: HdsIconSignature['Args']['name'];
  };
  Element: HTMLButtonElement;
}

const HdsSideNavToggleButton =
  TemplateOnlyComponent<HdsSideNavToggleButtonSignature>();

export default HdsSideNavToggleButton;
