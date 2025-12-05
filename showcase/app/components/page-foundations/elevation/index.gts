/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionElevation from 'showcase/components/page-foundations/elevation/sub-sections/elevation';
import SubSectionSurface from 'showcase/components/page-foundations/elevation/sub-sections/surface';

const ElevationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Elevation"}}

  <ShwTextH1>Elevation</ShwTextH1>

  <section data-test-percy>
    <SubSectionElevation />
    <SubSectionSurface />
  </section>
</template>;

export default ElevationIndex;
