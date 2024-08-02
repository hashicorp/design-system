/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsLinkStandaloneSignature } from '../link/standalone';
import type { HdsButtonSignature } from '../button';
import type { HdsDropdownSignature } from 'src/components/hds/dropdown';

export interface HdsApplicationStateFooterSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default?: [
      {
        Button?: ComponentLike<HdsButtonSignature>;
        Dropdown?: ComponentLike<HdsDropdownSignature>;
        LinkStandalone?: ComponentLike<HdsLinkStandaloneSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateFooterComponent =
  TemplateOnlyComponent<HdsApplicationStateFooterSignature>();

export default HdsApplicationStateFooterComponent;
