/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import NOOP from 'showcase/utils/noop';

import { HdsToast } from '@hashicorp/design-system-components/components';

// the "Toast" is built on top of the "Alert" so it shares the same colors
import { COLORS } from '@hashicorp/design-system-components/components/hds/alert/index';

const SubSectionColor: TemplateOnlyComponent = <template>
  <ShwTextH2>Color</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each COLORS as |color|}}
      <SF.Item @label={{capitalize color}}>
        <HdsToast @color={{color}} @onDismiss={{NOOP}} as |T|>
          <T.Title>Lorem ipsum dolor</T.Title>
          <T.Description>This is the toast with
            <em>{{color}}</em>
            color.</T.Description>
        </HdsToast>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionColor;
