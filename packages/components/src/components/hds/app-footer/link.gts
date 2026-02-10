/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import { hdsLinkToModels } from '../../../helpers/hds-link-to-models.ts';
import { hdsLinkToQuery } from '../../../helpers/hds-link-to-query.ts';
import HdsAppFooterItem from './item.gts';
import HdsLinkInline from '../link/inline.gts';
import HdsTextBody from '../text/body.gts';

import type { HdsInteractiveSignature } from '../interactive/index.gts';
import type { HdsLinkColors, HdsLinkIconPositions } from '../link/types.ts';
import type { HdsLinkInlineSignature } from '../link/inline.gts';
import type { HdsIconSignature } from '../icon/index.gts';

export interface HdsAppFooterLinkSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsLinkColors;
    icon?: HdsIconSignature['Args']['name'];
    iconPosition?: HdsLinkIconPositions;
  };
  Blocks: {
    default: [];
  };
  Element: HdsLinkInlineSignature['Element'];
}

const HdsAppFooterLink: TemplateOnlyComponent<HdsAppFooterLinkSignature> =
  <template>
    <HdsAppFooterItem>
      <HdsLinkInline
        class="hds-app-footer__link"
        @color="secondary"
        @current-when={{@current-when}}
        @models={{hdsLinkToModels (array @model @models)}}
        @query={{hdsLinkToQuery (array @query)}}
        @replace={{@replace}}
        @route={{@route}}
        @isRouteExternal={{@isRouteExternal}}
        @href={{@href}}
        @isHrefExternal={{@isHrefExternal}}
        @icon={{@icon}}
        @iconPosition={{@iconPosition}}
        ...attributes
      >
        <HdsTextBody @tag="span" @size="100">
          {{yield}}
        </HdsTextBody>
      </HdsLinkInline>
    </HdsAppFooterItem>
  </template>;

export default HdsAppFooterLink;
