/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { SIZES as DISPLAY_AVAILABLE_SIZES } from '@hashicorp/design-system-components/components/hds/text/display';
import { DEFAULT_SIZE as FORM_HEADER_TITLE_DEFAULT_SIZE } from '@hashicorp/design-system-components/components/hds/form/header/title';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsFormLayoutModel =
  ModelFrom<PageComponentsFormLayoutRoute>;

export default class PageComponentsFormLayoutRoute extends Route {
  model() {
    const RADIOCARDS_GENERIC = [
      {
        value: '1',
        label: 'Radio card label 1',
        badge: 'Badge',
        checked: true,
        description: 'Radio card description 1',
      },
      {
        value: '2',
        label: 'Radio card label 2',
        badge: 'Badge',
        description: 'Radio card description 2',
      },
      {
        value: '3',
        label: 'Radio card label 3',
        badge: 'Badge',
        description: 'Radio card description 3',
      },
    ];
    const RADIOCARDS_PRODUCTS = [
      {
        value: '1',
        icon: 'terraform',
        label: 'Terraform policy',
        badge: 'New',
        checked: true,
        description:
          'Write policies in HCL that directly reference Terraform resources to enforce your compliance and security requirements.',
      },
      {
        value: '2',
        icon: 'hashicorp',
        label: 'Sentinel',
        description:
          'Write policies imperatively for attribute-based access control to enforce compliance and security requirements.',
      },
      {
        value: '3',
        icon: 'opa',
        label: 'Open Policy Agent (OPA)',
        description:
          'Open-source, general-purpose policy engine that allows you to enforce fine-grained access control and decision-making across cloud-native environments.',
      },
    ];
    return {
      RADIOCARDS_GENERIC,
      RADIOCARDS_PRODUCTS,
      DISPLAY_AVAILABLE_SIZES,
      FORM_HEADER_TITLE_DEFAULT_SIZE,
    };
  }
}
