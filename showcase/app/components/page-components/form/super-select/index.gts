/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import BasicDropdownWormhole from 'ember-basic-dropdown/components/basic-dropdown-wormhole';

import SubSectionAfterOptions from 'showcase/components/page-components/form/super-select/sub-sections/after-options';
import SubSectionBaseElements from 'showcase/components/page-components/form/super-select/sub-sections/base-elements';
import SubSectionMultipleBaseElement from 'showcase/components/page-components/form/super-select/sub-sections/multiple-base-element';
import SubSectionMultipleFieldElement from 'showcase/components/page-components/form/super-select/sub-sections/multiple-field-element';
import SubSectionOptionGroup from 'showcase/components/page-components/form/super-select/sub-sections/option-group';
import SubSectionSingleBaseElement from 'showcase/components/page-components/form/super-select/sub-sections/single-base-element';
import SubSectionSingleFieldElement from 'showcase/components/page-components/form/super-select/sub-sections/single-field-element';

const FormSuperSelectIndex: TemplateOnlyComponent = <template>
  {{pageTitle "SuperSelect Component"}}

  <BasicDropdownWormhole />

  <ShwTextH1>SuperSelect</ShwTextH1>

  <section data-test-percy>
    <SubSectionSingleBaseElement />
    <SubSectionSingleFieldElement />
    <SubSectionMultipleBaseElement />
    <SubSectionMultipleFieldElement />
    <SubSectionBaseElements />
    <SubSectionOptionGroup />
    <SubSectionAfterOptions />
  </section>
</template>;

export default FormSuperSelectIndex;
