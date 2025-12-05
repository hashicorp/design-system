/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionElevation from 'showcase/components/page-components/card/sub-sections/elevation';
import SubSectionBorder from 'showcase/components/page-components/card/sub-sections/border';
import SubSectionBackground from 'showcase/components/page-components/card/sub-sections/background';
import SubSectionOverflow from 'showcase/components/page-components/card/sub-sections/overflow';
import SubSectionTag from 'showcase/components/page-components/card/sub-sections/tag';

const CardIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Card Component"}}

  <ShwTextH1>Card</ShwTextH1>

  <section data-test-percy>
    <SubSectionElevation />
    <SubSectionBorder />
    <SubSectionBackground />
    <SubSectionOverflow />
    <SubSectionTag />
  </section>
</template>;

export default CardIndex;
