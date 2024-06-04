/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';

export interface HdsApplicationStateHeaderSignature {
  Args: {
    title?: string;
    errorCode?: string;
    icon?: FlightIconSignature['Args']['name'];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateHeaderComponent =
  TemplateOnlyComponent<HdsApplicationStateHeaderSignature>();

export default HdsApplicationStateHeaderComponent;
