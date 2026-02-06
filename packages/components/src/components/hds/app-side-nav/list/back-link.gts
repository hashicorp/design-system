/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsAppSideNavListItem from './item.gts';
import HdsInteractive from '../../interactive/index.gts';
import HdsIcon from '../../icon/index.gts';
import { hdsLinkToModels } from '../../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../../helpers/hds-link-to-query.ts';
import type { HdsInteractiveSignature } from '../../interactive/index.gts';

export interface HdsAppSideNavListBackLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsAppSideNavListBackLink: TemplateOnlyComponent<HdsAppSideNavListBackLinkSignature> = <template>
  <HdsAppSideNavListItem>
    <HdsInteractive
      class="hds-app-side-nav__list-item-link hds-app-side-nav__list-item-link--back-link"
      @current-when={{@current-when}}
      @models={{hdsLinkToModels @model @models}}
      @query={{hdsLinkToQuery @query}}
      @replace={{@replace}}
      @route={{@route}}
      @isRouteExternal={{@isRouteExternal}}
      @href={{@href}}
      @isHrefExternal={{@isHrefExternal}}
      ...attributes
    >
      <HdsIcon class="hds-app-side-nav__list-item-icon-leading" @name="chevron-left" />
      <span class="hds-app-side-nav__list-item-text hds-typography-body-200 hds-font-weight-medium">
        {{@text}}
      </span>
    </HdsInteractive>
  </HdsAppSideNavListItem>
</template>;

export default HdsAppSideNavListBackLink;
