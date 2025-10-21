/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBaseElements from 'showcase/components/page-components/rich-tooltip/sub-sections/base-elements';
import SubSectionDemo from 'showcase/components/page-components/rich-tooltip/sub-sections/demo';
import SubSectionInheritance from 'showcase/components/page-components/rich-tooltip/sub-sections/inheritance';
import SubSectionOptions from 'showcase/components/page-components/rich-tooltip/sub-sections/options';
import SubSectionStates from 'showcase/components/page-components/rich-tooltip/sub-sections/states';
import SubSectionToggle from 'showcase/components/page-components/rich-tooltip/sub-sections/toggle';

const RichTooltipIndex: TemplateOnlyComponent = <template>
  {{pageTitle "RichTooltip Component"}}

  <ShwTextH1>RichTooltip</ShwTextH1>

  <section data-test-percy>
    <SubSectionToggle />
    <SubSectionOptions />
    <SubSectionInheritance />
    <SubSectionStates />
    <SubSectionDemo />
    <SubSectionBaseElements />
  </section>
</template>;

export default RichTooltipIndex;
