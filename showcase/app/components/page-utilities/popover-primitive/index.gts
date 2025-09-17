/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionBase from 'showcase/components/page-utilities/popover-primitive/sub-sections/base';
import SubSectionInteraction from 'showcase/components/page-utilities/popover-primitive/sub-sections/interaction';
import SubSectionOptions from 'showcase/components/page-utilities/popover-primitive/sub-sections/options';

const PopoverPrimitiveIndex: TemplateOnlyComponent = <template>
  {{pageTitle "PopoverPrimitive Component"}}

  <ShwTextH1>PopoverPrimitive</ShwTextH1>

  <section data-test-percy>
    <SubSectionBase />
    <SubSectionOptions />
    <SubSectionInteraction />
  </section>
</template>;

export default PopoverPrimitiveIndex;
