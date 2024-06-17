/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

interface HdsSideNavToggleButtonSignature {
  Args: {
    icon: string;
  };
  Element: HTMLButtonElement;
}

const HdsSideNavToggleButtonComponent =
  TemplateOnlyComponent<HdsSideNavToggleButtonSignature>();

export default HdsSideNavToggleButtonComponent;
