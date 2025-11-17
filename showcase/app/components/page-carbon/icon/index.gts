/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import AddIcon from '@carbon/icons/es/add/24';
import AddAltIcon from '@carbon/icons/es/add--alt/24';
import AddFilledIcon from '@carbon/icons/es/add--filled/24';
import AppsIcon from '@carbon/icons/es/apps/24';

import { CarbonIcon } from '@hashicorp/design-system-components/components';

import ShwTextH1 from 'showcase/components/shw/text/h1';

const icons = [AddIcon, AddAltIcon, AddFilledIcon, AppsIcon];

const IconIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Icon"}}

  <ShwTextH1>Icon</ShwTextH1>

  <section data-test-percy>
    {{#each icons as |icon|}}
      <CarbonIcon @icon={{icon}} />
    {{/each}}
  </section>
</template>;

export default IconIndex;
