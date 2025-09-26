/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

import type { ModifierLike } from '@glint/template';
import type { HdsAppSideNavListRegisterTitleIdModifierSignature } from './index.ts';

export interface HdsAppSideNavListTitleSignature {
  Args: {
    registerTitleId?: ModifierLike<HdsAppSideNavListRegisterTitleIdModifierSignature>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAppSideNavListTitle extends Component<HdsAppSideNavListTitleSignature> {
  /*  Generate a unique ID for each Title */
  private _titleId = 'title-' + guidFor(this);
}
