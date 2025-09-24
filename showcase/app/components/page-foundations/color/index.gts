/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionCarbonization from 'showcase/components/page-foundations/color/sub-sections/carbonization';

const ColorIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Color"}}

  <ShwTextH1>Color - Carbonization</ShwTextH1>

  <section>
    <SubSectionCarbonization />
  </section>
</template>;

export default ColorIndex;
