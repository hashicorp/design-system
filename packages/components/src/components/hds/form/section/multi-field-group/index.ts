/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsLayoutFlexItemSignature } from '../../../layout/flex/item.ts';
import type { AvailableElements } from '../../../layout/flex/types.ts';

export interface HdsFormSectionMultiFieldGroupSignature {
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsLayoutFlexItemSignature>;
      },
    ];
  };
  Element: AvailableElements;
}

const HdsFormSectionMultiFieldGroup =
  TemplateOnlyComponent<HdsFormSectionMultiFieldGroupSignature>();

export default HdsFormSectionMultiFieldGroup;
