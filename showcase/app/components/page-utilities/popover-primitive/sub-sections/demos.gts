/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import CodeFragmentWithFocusOut from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-focus-out';
import CodeFragmentWithExternalControl from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-external-control';
import CodeFragmentWithReturnFocus from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-return-focus';

const SubSectionBase: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>
  <ShwFlex as |SF|>
    <SF.Item @label="With @onFocusOut">
      <CodeFragmentWithFocusOut />
    </SF.Item>
    <SF.Item @label="With @forceState">
      <CodeFragmentWithExternalControl />
    </SF.Item>
    <SF.Item @label="With @returnFocusTo">
      <CodeFragmentWithReturnFocus />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionBase;
