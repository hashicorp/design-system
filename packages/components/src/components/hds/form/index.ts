/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsFormTagValues } from './types.ts';

import type { HdsFormTags } from './types.ts';
import type Owner from '@ember/owner';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../yield/index.ts';
import type { HdsFormHeaderSignature } from './header/index.ts';
import type { HdsFormHeaderTitleSignature } from './/header/title/index.ts';
import type { HdsFormHeaderDescriptionSignature } from './header/description/index.ts';
import type { HdsFormSectionSignature } from './section/index.ts';
import type { HdsFormSectionHeaderSignature } from './section/header/index.ts';
import type { HdsFormSectionHeaderTitleSignature } from './section/header/title/index.ts';
import type { HdsFormSectionHeaderDescriptionSignature } from './section/header/description/index.ts';
import type { HdsFormSectionFieldGroupSignature } from './section/field-group/index.ts';
import type { HdsFormSeparatorSignature } from './separator/index.ts';

export const DEFAULT_TAG = HdsFormTagValues.Form;

export const AVAILABLE_TAGS: string[] = Object.values(HdsFormTagValues);

export interface HdsFormSignature {
  Args: {
    tag?: HdsFormTags;
  };
  Blocks: {
    default: [
      {
        Generic?: ComponentLike<HdsYieldSignature>;
        Header?: ComponentLike<HdsFormHeaderSignature>;
        HeaderTitle?: ComponentLike<HdsFormHeaderTitleSignature>;
        HeaderDescription?: ComponentLike<HdsFormHeaderDescriptionSignature>;
        Section?: ComponentLike<HdsFormSectionSignature>;
        SectionHeader?: ComponentLike<HdsFormSectionHeaderSignature>;
        SectionHeaderTitle?: ComponentLike<HdsFormSectionHeaderTitleSignature>;
        SectionHeaderDescription?: ComponentLike<HdsFormSectionHeaderDescriptionSignature>;
        SectionFieldGroup?: ComponentLike<HdsFormSectionFieldGroupSignature>;
        Separator?: ComponentLike<HdsFormSeparatorSignature>;
      },
    ];
  };
  Element: HTMLFormElement | HTMLDivElement;
}

export default class HdsForm extends Component<HdsFormSignature> {
  tag: HdsFormTags;

  constructor(owner: Owner, args: HdsFormSignature['Args']) {
    super(owner, args);
    this.tag = args.tag ?? DEFAULT_TAG;

    assert(
      `@tag for "Hds::Form" must be one of the following: ${AVAILABLE_TAGS.join(', ')}; received: ${this.tag}`,
      AVAILABLE_TAGS.includes(this.tag)
    );
  }
}
