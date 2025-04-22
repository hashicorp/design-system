/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsYield from '../yield/index.gts';
import HdsIconTile from '../icon-tile/index.gts';
import HdsPageHeaderTitle from './title.gts';
import HdsPageHeaderBadges from './badges.gts';
import HdsPageHeaderSubtitle from './subtitle.gts';
import HdsPageHeaderDescription from './description.gts';
import HdsPageHeaderActions from './actions.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsIconTileSignature } from '../icon-tile/index.gts';
import type { HdsYieldSignature } from '../yield/index.gts';
import type { HdsPageHeaderActionsSignature } from './actions.gts';
import type { HdsPageHeaderBadgesSignature } from './badges.gts';
import type { HdsPageHeaderDescriptionSignature } from './description.gts';
import type { HdsPageHeaderTitleSignature } from './title.gts';
import type { HdsPageHeaderSubtitleSignature } from './subtitle.gts';

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

const HdsPageHeader: TOC<HdsPageHeaderSignature> = <template>
  <header class="hds-page-header" ...attributes>
    {{yield (hash Breadcrumb=HdsYield)}}
    <div class="hds-page-header__body">
      {{yield (hash IconTile=(component HdsIconTile size="medium"))}}
      <div class="hds-page-header__main">
        <div class="hds-page-header__content">
          <div class="hds-page-header__title-wrapper">
            {{yield (hash Title=HdsPageHeaderTitle)}}
            {{yield (hash Badges=HdsPageHeaderBadges)}}
          </div>
          <div class="hds-page-header__metadata">
            {{yield
              (hash
                Subtitle=HdsPageHeaderSubtitle
                Description=HdsPageHeaderDescription
                Generic=HdsYield
              )
            }}
          </div>
        </div>
        {{yield (hash Actions=HdsPageHeaderActions)}}
      </div>
    </div>
  </header>
</template>;

export default HdsPageHeader;
