/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsFormHeaderTitleComponent from '../header/title.ts';
import type { HdsFormHeaderDescriptionSignature } from '../header/description.ts';

export interface HdsFormSectionHeaderSignature {
  Blocks: {
    default: [
      {
        Title?: WithBoundArgs<typeof HdsFormHeaderTitleComponent, 'size'>;
        Description?: ComponentLike<HdsFormHeaderDescriptionSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}
const HdsFormSectionHeader =
  TemplateOnlyComponent<HdsFormSectionHeaderSignature>();

export default HdsFormSectionHeader;
