/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../yield';
import type { HdsSideNavListItemSignature } from './list/item';
import type { HdsSideNavListBackLinkSignature } from './list/back-link';
import type { HdsSideNavListTitleSignature } from './list/title';
import type { HdsSideNavListLinkSignature } from './list/link';

export interface HdsSideNavListSignature {
  Blocks: {
    default: [
      {
        ExtraBefore?: ComponentLike<HdsYieldSignature>;
        Item?: ComponentLike<HdsSideNavListItemSignature>;
        BackLink?: ComponentLike<HdsSideNavListBackLinkSignature>;
        Title?: ComponentLike<HdsSideNavListTitleSignature>;
        Link?: ComponentLike<HdsSideNavListLinkSignature>;
        ExtraAfter?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

const HdsSideNavList = TemplateOnlyComponent<HdsSideNavListSignature>();

export default HdsSideNavList;
