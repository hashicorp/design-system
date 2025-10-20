/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsFlyout } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/flyout/index';

const SubSectionSize: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item
        @label={{capitalize size}}
        class="shw-component-flyout-sample-item"
      >
        <HdsFlyout open @size={{size}} id="flyout-example-{{size}}" as |F|>
          <F.Header>
            {{capitalize size}}
          </F.Header>
          <F.Body>
            <p class="hds-typography-body-300 hds-foreground-primary">
              Flyout content
            </p>
          </F.Body>
        </HdsFlyout>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionSize;
