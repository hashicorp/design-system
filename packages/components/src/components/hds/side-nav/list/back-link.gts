/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsSideNavListItem from './item.gts';
import HdsInteractive from '../../interactive/index.gts';
import HdsIcon from '../../icon/index.gts';
import hdsLinkToModels from '../../../../helpers/hds-link-to-models.ts';
import hdsLinkToQuery from '../../../../helpers/hds-link-to-query.ts';

import type { TOC } from '@ember/component/template-only';
import type { HdsInteractiveSignature } from '../../interactive/index.gts';

export interface HdsSideNavListBackLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    text: string;
  };
  Element: HdsInteractiveSignature['Element'];
}

const HdsSideNavListBackLink: TOC<HdsSideNavListBackLinkSignature> = <template>
  <HdsSideNavListItem>
    <HdsInteractive
      class="hds-side-nav__list-item-link hds-side-nav__list-item-link--back-link"
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
      <HdsIcon
        class="hds-side-nav__list-item-icon-leading"
        @name="chevron-left"
      />
      <span
        class="hds-side-nav__list-item-text hds-typography-body-200 hds-font-weight-medium"
      >
        {{@text}}
      </span>
    </HdsInteractive>
  </HdsSideNavListItem>
</template>;

export default HdsSideNavListBackLink;
