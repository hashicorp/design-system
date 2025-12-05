/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsTime,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const SubSectionTooltip: TemplateOnlyComponent = <template>
  <ShwTextH2>Has tooltip</ShwTextH2>

  <ShwFlex @gap="2rem" {{style flexWrap="wrap"}} as |SF|>
    <SF.Item @label="With tooltip (default)">
      <HdsTime @date="05 September 2018 14:48" />
    </SF.Item>

    <SF.Item @label="Without tooltip">
      <HdsTime @date="05 September 2018 14:48" @hasTooltip={{false}} />
    </SF.Item>

    <SF.Item @label="Standard body font with tooltip" {{style width="100%"}}>
      <HdsTextBody @tag="p">
        <HdsTime @date="05 September 2018 14:48" />
      </HdsTextBody>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionTooltip;
