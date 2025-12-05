/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextBody from 'showcase/components/shw/text/body';

import SubSectionType from 'showcase/components/page-components/alert/sub-sections/type';
import SubSectionColor from 'showcase/components/page-components/alert/sub-sections/color';
import SubSectionIcon from 'showcase/components/page-components/alert/sub-sections/icon';
import SubSectionContent from 'showcase/components/page-components/alert/sub-sections/content';
import SubSectionActions from 'showcase/components/page-components/alert/sub-sections/actions';
import SubSectionDismiss from 'showcase/components/page-components/alert/sub-sections/dismiss';

const AlertIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Alert Component"}}

  <ShwTextH1>Alert</ShwTextH1>

  <ShwTextBody>
    👀 Note: the compact alert is borderless, but shown with a dotted border
    throughout the “Showcase” for clarity.
  </ShwTextBody>

  <section data-test-percy>
    <SubSectionType />
    <SubSectionColor />
    <SubSectionIcon />
    <SubSectionContent />
    <SubSectionActions />
    <SubSectionDismiss />
  </section>
</template>;

export default AlertIndex;
