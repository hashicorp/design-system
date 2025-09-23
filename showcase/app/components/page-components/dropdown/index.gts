/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwDivider from 'showcase/components/shw/divider';
import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionPositions from 'showcase/components/page-components/dropdown/sub-sections/positions';
import SubSectionWidth from 'showcase/components/page-components/dropdown/sub-sections/width';
import SubSectionDisplay from 'showcase/components/page-components/dropdown/sub-sections/display';
import SubSectionCollisionDetection from 'showcase/components/page-components/dropdown/sub-sections/collision-detection';
import SubSectionToggles from 'showcase/components/page-components/dropdown/sub-sections/toggles';
import SubSectionListItems from 'showcase/components/page-components/dropdown/sub-sections/list-items';
import SubSectionDemo from 'showcase/components/page-components/dropdown/sub-sections/demo';
import SubSectionHeaderAndFooter from 'showcase/components/page-components/dropdown/sub-sections/header-and-footer';

const DropdownIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Dropdown Component"}}

  <ShwTextH1>Dropdown</ShwTextH1>

  <section data-test-percy>
    <SubSectionPositions />
    <SubSectionWidth />
    <SubSectionDisplay />
    <SubSectionCollisionDetection />
    <SubSectionToggles />
    <SubSectionListItems />
    <SubSectionHeaderAndFooter />
  </section>

  <ShwDivider />

  <section>
    <SubSectionDemo />
  </section>
</template>;

export default DropdownIndex;
