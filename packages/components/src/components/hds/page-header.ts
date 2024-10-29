/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import TemplateOnlyComponent from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsIconTileSignature } from './icon-tile';
import type { HdsYieldSignature } from './yield';
import type { HdsPageHeaderActionsSignature } from './page-header/actions';
import type { HdsPageHeaderBadgesSignature } from './page-header/badges';
import type { HdsPageHeaderDescriptionSignature } from './page-header/description';
import type { HdsPageHeaderTitleSignature } from './page-header/title';
import type { HdsPageHeaderSubtitleSignature } from './page-header/subtitle';

export interface HdsPageHeaderSignature {
  Blocks: {
    default: [
      {
        Actions?: ComponentLike<HdsPageHeaderActionsSignature>;
        Badges?: ComponentLike<HdsPageHeaderBadgesSignature>;
        Breadcrumb?: ComponentLike<HdsYieldSignature>;
        Description?: ComponentLike<HdsPageHeaderDescriptionSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
        IconTile?: ComponentLike<HdsIconTileSignature>;
        Subtitle?: ComponentLike<HdsPageHeaderSubtitleSignature>;
        Title?: ComponentLike<HdsPageHeaderTitleSignature>;
      },
    ];
  };
  Element: HTMLElement;
}

const HdsPageHeader = TemplateOnlyComponent<HdsPageHeaderSignature>();

export default HdsPageHeader;
