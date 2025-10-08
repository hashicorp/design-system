/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwDivider from 'showcase/components/shw/divider';

import SubSectionContent from 'showcase/components/page-components/app-header/sub-sections/content';
import SubSectionOptions from 'showcase/components/page-components/app-header/sub-sections/options';
import SubSectionFrames from 'showcase/components/page-components/app-header/sub-sections/frames';
import SubSectionBaseElements from 'showcase/components/page-components/app-header/sub-sections/base-elements';

const AppHeaderIndex: TemplateOnlyComponent = <template>
  {{pageTitle "AppHeader Component"}}

  <ShwTextH1>AppHeader</ShwTextH1>

  <section data-test-percy>
    <SubSectionContent />
    <SubSectionOptions />
  </section>

  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
  <section>
    <SubSectionFrames />
  </section>

  <ShwDivider />

  <section data-test-percy>
    <SubSectionBaseElements />
  </section>
</template>;

export default AppHeaderIndex;
