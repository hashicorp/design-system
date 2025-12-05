/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

import SubSectionSize from 'showcase/components/page-components/icon-tile/sub-sections/size';
import SubSectionIconColor from 'showcase/components/page-components/icon-tile/sub-sections/icon-color';
import SubSectionLogo from 'showcase/components/page-components/icon-tile/sub-sections/logo';

const IconTileIndex: TemplateOnlyComponent = <template>
  {{pageTitle "IconTile Component"}}

  <ShwTextH1>IconTile</ShwTextH1>

  <section data-test-percy>
    <SubSectionSize />
    <SubSectionLogo />
    <SubSectionIconColor />
  </section>
</template>;

export default IconTileIndex;
