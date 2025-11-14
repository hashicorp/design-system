/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import { CarbonIcons4K16 } from '@hashicorp/design-system-components/components';

import ShwTextH1 from 'showcase/components/shw/text/h1';

const IconIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Icon"}}

  <ShwTextH1>Icon</ShwTextH1>

  <section data-test-percy>
    <CarbonIcons4K16 class="my-search-icon" />
  </section>
</template>;

export default IconIndex;
