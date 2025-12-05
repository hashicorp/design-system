/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionContainers from 'showcase/components/page-components/form/key-value-inputs/sub-sections/containers';
import SubSectionContent from 'showcase/components/page-components/form/key-value-inputs/sub-sections/content';
import SubSectionDemos from 'showcase/components/page-components/form/key-value-inputs/sub-sections/demos';
import SubSectionField from 'showcase/components/page-components/form/key-value-inputs/sub-sections/field';
import SubSectionFooter from 'showcase/components/page-components/form/key-value-inputs/sub-sections/footer';
import SubSectionHeader from 'showcase/components/page-components/form/key-value-inputs/sub-sections/header';
import SubSectionResponsiveness from 'showcase/components/page-components/form/key-value-inputs/sub-sections/responsiveness';

const FormKeyValueInputsIndex: TemplateOnlyComponent = <template>
  {{pageTitle "KeyValueInputs Component"}}

  <ShwTextH1>KeyValueInputs</ShwTextH1>

  <section data-test-percy>
    <SubSectionContainers />
    <SubSectionContent />
  </section>

  <section data-test-percy>
    <SubSectionHeader />
    <SubSectionField />
    <SubSectionFooter />
  </section>

  <section data-test-percy>
    <SubSectionDemos />
  </section>

  {{! For some reason, Ember tests don't play well with iframes (URL not found) so we can't take snapshots of these examples in Percy }}
  <section>
    <SubSectionResponsiveness />
  </section>
</template>;

export default FormKeyValueInputsIndex;
