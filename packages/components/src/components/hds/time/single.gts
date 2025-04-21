/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';

import hdsFormatDate from '../../../helpers/hds-format-date.ts';
import hdsFormatRelative from '../../../helpers/hds-format-relative.ts';

import type { TOC } from '@ember/component/template-only';
import type { DisplayType } from '../../../services/hds-time-types.ts';

export interface HdsTimeSingleSignature {
  Args: {
    date?: Date;
    display: DisplayType;
    isoUtcString?: string;
    register: () => void;
    unregister: () => void;
  };
  Element: HTMLTimeElement;
}

const HdsTimeSingleComponent: TOC<HdsTimeSingleSignature> = <template>
  {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember causes extra space around the time element - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
  <time
    class="hds-time hds-time--single"
    datetime={{@isoUtcString}}
    ...attributes
    {{didInsert @register}}
    {{willDestroy @unregister}}
  >
    {{~#if @display.options.showFriendly~}}
      {{~#if @display.options.displayFormat~}}
        {{~hdsFormatDate @date @display.options.displayFormat~}}
      {{~else~}}
        {{~@isoUtcString}}
      {{~/if~}}
      {{#if @display.options.showRelative}}
        ({{hdsFormatRelative @display.relative.value @display.relative.unit}})
      {{/if}}
    {{~else~}}
      {{#if @display.options.showRelative}}
        {{~hdsFormatRelative @display.relative.value @display.relative.unit~}}
      {{~/if~}}
    {{~/if~}}
  </time>
</template>;

export default HdsTimeSingleComponent;
