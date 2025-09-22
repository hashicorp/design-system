/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsButton } from '@hashicorp/design-system-components/components';
import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/button/index';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Sizes</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsButton @icon="plus" @text="Lorem ipsum" @size={{size}} />
        <br />
        <HdsButton
          @icon="plus"
          @text="Lorem ipsum"
          @isIconOnly={{true}}
          @size={{size}}
        />
      </SF.Item>
    {{/each}}
    <SF.Item @label="Full width">
      <ShwOutliner {{style width="300px"}}>
        <HdsButton @icon="plus" @text="Lorem ipsum" @isFullWidth={{true}} />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwTextH2>Colors</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each COLORS as |color|}}
      <SF.Item @label={{capitalize color}}>
        <HdsButton @icon="plus" @text="Lorem ipsum" @color={{color}} />
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionVariants;
