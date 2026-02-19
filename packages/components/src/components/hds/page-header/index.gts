/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import HdsPageHeaderActions from './actions.gts';
import HdsPageHeaderBadges from './badges.gts';
import HdsPageHeaderDescription from './description.gts';
import HdsPageHeaderSubtitle from './subtitle.gts';
import HdsPageHeaderTitle from './title.gts';
import HdsYield from '../yield/index.gts';
import HdsIconTile from '../icon-tile/index.gts';

export interface HdsPageHeaderSignature {
  Blocks: {
    default: [
      {
        Actions?: typeof HdsPageHeaderActions;
        Badges?: typeof HdsPageHeaderBadges;
        Breadcrumb?: typeof HdsYield;
        Description?: typeof HdsPageHeaderDescription;
        Generic?: typeof HdsYield;
        IconTile?: WithBoundArgs<typeof HdsIconTile, 'size'>;
        Subtitle?: typeof HdsPageHeaderSubtitle;
        Title?: typeof HdsPageHeaderTitle;
      },
    ];
  };
  Element: HTMLElement;
}

const HdsPageHeader: TemplateOnlyComponent<HdsPageHeaderSignature> = <template>
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
