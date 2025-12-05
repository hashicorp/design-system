/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';

import { COLORS } from '@hashicorp/design-system-components/components/hds/text/index';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

const SubSectionColor: TemplateOnlyComponent = <template>
  <ShwTextH2>Color</ShwTextH2>

  <ShwTextH4 @tag="h3">Color inheritance</ShwTextH4>
  <ShwFlex @direction="row" @gap="2rem" as |SF|>
    <SF.Item @label="parent with no specific color">
      <div>
        <HdsTextBody @size="300" @tag="p">Lorem ipsum dolor</HdsTextBody>
      </div>
    </SF.Item>
    <SF.Item @label="parent with #e12568 color">
      <div {{style color="#e12568"}}>
        <HdsTextBody @size="300" @tag="p">Lorem ipsum dolor</HdsTextBody>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4 @tag="h3">Pre-defined colors</ShwTextH4>
  <ShwFlex @direction="row" @gap="2rem" as |SF|>
    {{#each COLORS as |color|}}
      <SF.Item @label={{color}}>
        <div class="shw-component-text-sample-color--{{color}}">
          <HdsTextBody
            @size="300"
            @weight="semibold"
            @tag="p"
            @color={{color}}
          >Lorem ipsum dolor</HdsTextBody>
          <HdsTextBody
            @size="300"
            @weight="medium"
            @tag="p"
            @color={{color}}
          >Lorem ipsum dolor</HdsTextBody>
          <HdsTextBody @size="300" @tag="p" @color={{color}}>Lorem ipsum dolor</HdsTextBody>
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH4 @tag="h3">Custom colors</ShwTextH4>
  <ShwFlex @direction="row" @gap="2rem" as |SF|>
    <SF.Item @label="text with #e91e63 color">
      <HdsTextBody @size="300" @tag="p" @color="#e91e63">Lorem ipsum dolor</HdsTextBody>
    </SF.Item>
    <SF.Item @label="text with '--token-color-palette-purple-400' color">
      <HdsTextBody
        @size="300"
        @tag="p"
        @color="var(--token-color-palette-purple-400)"
      >Lorem ipsum dolor</HdsTextBody>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionColor;
