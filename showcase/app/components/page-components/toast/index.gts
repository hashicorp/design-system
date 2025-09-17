/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionColor from 'showcase/components/page-components/toast/sub-sections/color';
import SubSectionIcon from 'showcase/components/page-components/toast/sub-sections/icon';
import SubSectionContent from 'showcase/components/page-components/toast/sub-sections/content';
import SubSectionActions from 'showcase/components/page-components/toast/sub-sections/actions';

const ToastIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Toast Component"}}

  <ShwTextH1>Toast</ShwTextH1>

  <section data-test-percy>
    <SubSectionColor />
    <SubSectionIcon />
    <SubSectionContent />
    <SubSectionActions />
  </section>
</template>;

export default ToastIndex;
