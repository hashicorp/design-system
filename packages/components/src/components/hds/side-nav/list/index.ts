/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';

import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield';
import type { HdsSideNavListItemSignature } from './item';
import type { HdsSideNavListBackLinkSignature } from './back-link';
import type { HdsSideNavListTitleSignature } from './title';
import type { HdsSideNavListLinkSignature } from './link';

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

const HdsSideNavListComponent =
  TemplateOnlyComponent<HdsSideNavListSignature>();

export default HdsSideNavListComponent;
