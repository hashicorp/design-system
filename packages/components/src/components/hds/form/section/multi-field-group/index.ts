/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsFormSectionMultiFieldGroupItemSignature } from './item.ts';

export interface HdsFormSectionMultiFieldGroupSignature {
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsFormSectionMultiFieldGroupItemSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsFormSectionMultiFieldGroup =
  TemplateOnlyComponent<HdsFormSectionMultiFieldGroupSignature>();

export default HdsFormSectionMultiFieldGroup;
