/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentWithSimpleActions from 'showcase/components/page-components/dropdown/code-fragments/with-simple-actions';

const SubSectionDisplay: TemplateOnlyComponent = <template>
  <ShwTextH2>Display</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="Block">
      <div class="shw-component-dropdown-display-sample">
        <CodeFragmentWithSimpleActions @listPosition="bottom-left" />
      </div>
    </SF.Item>
    <SF.Item @label="Inline">
      <div class="shw-component-dropdown-display-sample">
        <CodeFragmentWithSimpleActions
          @listPosition="bottom-left"
          @isInline={{true}}
        />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionDisplay;
