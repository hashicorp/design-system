/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import { HdsApplicationStateTitleTagValues } from './types.ts';
import HdsTextBody from '../text/body.gts';
import HdsTextDisplay from '../text/display.gts';
import HdsIcon from '../icon/index.gts';
import hdsT from '../../../helpers/hds-t.ts';

import type { HdsIconSignature } from '../icon/index.gts';
import type { HdsApplicationStateTitleTags } from './types.ts';

export interface HdsApplicationStateHeaderSignature {
  Args: {
    title?: string;
    titleTag?: HdsApplicationStateTitleTags;
    errorCode?: string;
    icon?: HdsIconSignature['Args']['name'];
  };
  Element: HTMLDivElement;
}

export default class HdsApplicationStateHeader extends Component<HdsApplicationStateHeaderSignature> {
  get titleTag(): HdsApplicationStateTitleTags {
    return this.args.titleTag ?? HdsApplicationStateTitleTagValues.Div;
  }

  <template>
    <div class="hds-application-state__header" ...attributes>
      {{#if @errorCode}}
        <HdsTextBody
          class="hds-application-state__error-code"
          @tag="div"
          @size="100"
          @weight="medium"
          @color="faint"
        >
          {{hdsT "hds.application-state.header.error" default="ERROR"}}
          {{@errorCode}}
        </HdsTextBody>
      {{/if}}
      {{#if @icon}}
        <div class="hds-application-state__icon">
          <HdsIcon
            @color="var(--token-color-foreground-strong)"
            @name={{@icon}}
            @size="24"
            @isInline={{true}}
          />
        </div>
      {{/if}}
      <HdsTextDisplay
        class="hds-application-state__title"
        @tag={{this.titleTag}}
        @size="300"
        @weight="semibold"
        @color="strong"
      >
        {{@title}}
      </HdsTextDisplay>
    </div>
  </template>
}
