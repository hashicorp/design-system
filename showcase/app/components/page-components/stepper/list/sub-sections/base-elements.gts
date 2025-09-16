/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsStepperList } from '@hashicorp/design-system-components/components';

import { STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>ListStep</ShwTextH3>

  <ShwTextH4>Status</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each STATUSES as |status|}}
      <SG.Item @label="{{capitalize status}}">
        <HdsStepperList @ariaLabel="Label" as |S|>
          <S.Step @status={{status}}>
            <:title>Title</:title>
            <:description>Description</:description>
            <:content>
              <ShwPlaceholder @text="Generic content" @height="20" />
            </:content>
          </S.Step>
        </HdsStepperList>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionBaseElements;
