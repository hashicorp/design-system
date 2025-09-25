/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';

const ColorIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Color"}}

  <ShwTextH1>Color</ShwTextH1>

  <section>
    <pre>This page is not used</pre>
  </section>
</template>;

export default ColorIndex;
