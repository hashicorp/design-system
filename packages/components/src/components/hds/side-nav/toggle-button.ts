/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

interface HdsSideNavToggleButtonSignature {
  Args: {
    icon: FlightIconSignature['Args']['name'];
  };
  Element: HTMLButtonElement;
}

const HdsSideNavToggleButtonComponent =
  TemplateOnlyComponent<HdsSideNavToggleButtonSignature>();

export default HdsSideNavToggleButtonComponent;
