/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { get } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import {
  SIZES as DISPLAY_SIZES,
  WEIGHTS_PER_SIZE as DISPLAY_WEIGHTS_PER_SIZE,
} from '@hashicorp/design-system-components/components/hds/text/display';
import {
  SIZES as BODY_SIZES,
  WEIGHTS_PER_SIZE as BODY_WEIGHTS_PER_SIZE,
} from '@hashicorp/design-system-components/components/hds/text/body';
import {
  SIZES as CODE_SIZES,
  WEIGHTS_PER_SIZE as CODE_WEIGHTS_PER_SIZE,
} from '@hashicorp/design-system-components/components/hds/text/code';

import {
  HdsTextBody,
  HdsTextCode,
  HdsTextDisplay,
} from '@hashicorp/design-system-components/components';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Variants</ShwTextH2>
  <ShwTextBody><em>Notice: we are showing only the combinations of
      <code>font-size</code>
      ("style") and
      <code>font-weight</code>
      that the design system
      <strong>suggests</strong>
      to use.</em></ShwTextBody>

  <ShwTextH4 @tag="h3">TextDisplay</ShwTextH4>
  <ShwFlex @direction="column" as |SF|>
    {{#each DISPLAY_SIZES as |size|}}
      <SF.Item @label="size={{size}}">
        {{#let (get DISPLAY_WEIGHTS_PER_SIZE size) as |weights|}}
          {{#each weights as |weight|}}
            <HdsTextDisplay @size={{size}} @tag="p" @weight={{weight}}>The fox
              jumped over the lazy dog ({{weight}})</HdsTextDisplay>
          {{/each}}
        {{/let}}
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH4 @tag="h3">TextBody</ShwTextH4>
  <ShwFlex @direction="column" as |SF|>
    {{#each BODY_SIZES as |size|}}
      <SF.Item @label="size={{size}}">
        {{#let (get BODY_WEIGHTS_PER_SIZE size) as |weights|}}
          {{#each weights as |weight|}}
            <HdsTextBody @size={{size}} @tag="p" @weight={{weight}}>The fox
              jumped over the lazy dog ({{weight}})</HdsTextBody>
          {{/each}}
        {{/let}}
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH4 @tag="h3">TextCode</ShwTextH4>
  <ShwFlex @direction="column" as |SF|>
    {{#each CODE_SIZES as |size|}}
      <SF.Item @label="size={{size}}">
        {{#let (get CODE_WEIGHTS_PER_SIZE size) as |weights|}}
          {{#each weights as |weight|}}
            <HdsTextCode @size={{size}} @tag="p" @weight={{weight}}>The fox
              jumped over the lazy dog ({{weight}})</HdsTextCode>
          {{/each}}
        {{/let}}
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionVariants;
