/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
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
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateComponent =
  TemplateOnlyComponent<HdsApplicationStateSignature>();

export default HdsApplicationStateComponent;
