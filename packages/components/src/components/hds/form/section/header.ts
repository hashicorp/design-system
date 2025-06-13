/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsFormHeaderTitleSignature } from '../header/title.ts';
import type { HdsFormHeaderDescriptionSignature } from '../header/description.ts';

export interface HdsFormSectionHeaderSignature {
  Blocks: {
    default: [
      {
        Title?: ComponentLike<HdsFormHeaderTitleSignature>;
        Description?: ComponentLike<HdsFormHeaderDescriptionSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}
const HdsFormSectionHeader =
  TemplateOnlyComponent<HdsFormSectionHeaderSignature>();

export default HdsFormSectionHeader;
