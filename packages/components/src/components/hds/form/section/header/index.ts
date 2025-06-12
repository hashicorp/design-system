/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsFormSectionHeaderTitleSignature } from './title/index.ts';
import type { HdsFormSectionHeaderDescriptionSignature } from './description/index.ts';

export interface HdsFormSectionHeaderSignature {
  Blocks: {
    default: [
      {
        Title?: ComponentLike<HdsFormSectionHeaderTitleSignature>;
        Description?: ComponentLike<HdsFormSectionHeaderDescriptionSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}
const HdsFormSectionHeader =
  TemplateOnlyComponent<HdsFormSectionHeaderSignature>();

export default HdsFormSectionHeader;
