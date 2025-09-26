/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

import type { ModifierLike } from '@glint/template';
import type { HdsSideNavListRegisterTitleIdModifierSignature } from './index.ts';

export interface HdsSideNavListTitleSignature {
  Args: {
    registerTitleId?: ModifierLike<HdsSideNavListRegisterTitleIdModifierSignature>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsSideNavListTitle extends Component<HdsSideNavListTitleSignature> {
  /*  Generate a unique ID for each Title */
  titleId = 'title-' + guidFor(this);
}
