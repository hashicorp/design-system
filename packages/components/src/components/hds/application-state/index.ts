/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsApplicationStateHeaderSignature } from './header';
import type { HdsApplicationStateBodySignature } from './body';
import type { HdsApplicationStateFooterSignature } from './footer';

export interface HdsApplicationStateSignature {
  Blocks: {
    default: [
      {
        Header?: ComponentLike<HdsApplicationStateHeaderSignature>;
        Body?: ComponentLike<HdsApplicationStateBodySignature>;
        Footer?: ComponentLike<HdsApplicationStateFooterSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateComponent extends Component<HdsApplicationStateSignature> {}
