/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsIcon } from '@hashicorp/design-system-components/components';

const SubSectionSize: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwTextBody>Base sizes</ShwTextBody>

  <ShwFlex as |SF|>
    <SF.Item @label="16px (default)">
      <HdsIcon @name="bug" />
    </SF.Item>
    <SF.Item @label="24px">
      <HdsIcon @name="bug" @size="24" />
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Custom sizes</ShwTextBody>

  <ShwFlex as |SF|>
    <SF.Item @label="12px (stretched)">
      <div {{style width="12px" height="12px"}}>
        <HdsIcon @name="bug" @size="16" @stretched={{true}} />
      </div>
    </SF.Item>
    <SF.Item @label="32px (stretched)">
      <div {{style width="32px" height="32px"}}>
        <HdsIcon @name="bug" @size="24" @stretched={{true}} />
      </div>
    </SF.Item>
    <SF.Item @label="32px (stretched + inline)">
      <div {{style width="32px" height="32px"}}>
        <HdsIcon
          @name="bug"
          @size="24"
          @stretched={{true}}
          @isInline={{true}}
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionSize;
