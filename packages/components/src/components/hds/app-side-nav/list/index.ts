/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield';
import type { HdsAppSideNavListItemSignature } from './item';
import type { HdsAppSideNavListBackLinkSignature } from './back-link';
import type { HdsAppSideNavListTitleSignature } from './title';
import type { HdsAppSideNavListLinkSignature } from './link';

export interface HdsAppSideNavListSignature {
  Blocks: {
    default: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        Item?: ComponentLike<HdsAppSideNavListItemSignature>;
        BackLink?: ComponentLike<HdsAppSideNavListBackLinkSignature>;
        Title?: ComponentLike<HdsAppSideNavListTitleSignature>;
        Link?: ComponentLike<HdsAppSideNavListLinkSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

const HdsAppSideNavListComponent =
  TemplateOnlyComponent<HdsAppSideNavListSignature>();

export default HdsAppSideNavListComponent;
