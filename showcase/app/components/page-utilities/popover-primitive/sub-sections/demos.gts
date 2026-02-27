/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import CodeFragmentWithFocusOut from 'showcase/components/page-utilities/popover-primitive/code-fragments/with-focus-out';

const SubSectionBase: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwTextH3>With onFocusOut</ShwTextH3>

  <CodeFragmentWithFocusOut />

  <ShwDivider {{style marginTop="150px"}} />
</template>;

export default SubSectionBase;
