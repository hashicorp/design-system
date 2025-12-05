/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';

import CodeFragmentWithGenericContent from 'showcase/components/page-components/app-header/code-fragments/with-generic-content';

const SubSectionOptions: TemplateOnlyComponent = <template>
  <ShwTextH2>Options</ShwTextH2>

  <ShwGrid @columns={{1}} {{style gap="3rem"}} as |SF|>
    <SF.Item
      @label="With custom breakpoint (menu button is visible at wide screen width)"
    >
      <CodeFragmentWithGenericContent
        @hasHelpMenu={{true}}
        @hasUserMenu={{true}}
        @breakpoint="20000px"
      />
    </SF.Item>
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionOptions;
