/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

import { Hds<%= columnizedModuleName %> } from '@hashicorp/design-system-components/components'

import ShwTextH1 from 'showcase/components/shw/text/h1';

const <%= classifiedModuleName %>Index: TemplateOnlyComponent = <template>
  {{pageTitle "<%= columnizedModuleName %> Component"}}

  <ShwTextH1><%= columnizedModuleName %></ShwTextH1>

  <section data-test-percy>
    {{!-- sub sections go here --}}

    {{! This below is just an example of invocation, to get started }}
    <Hds<%= columnizedModuleName %>>This is the Hds::<%= columnizedModuleName %> component </Hds<%= columnizedModuleName %>>
  </section>
</template>;

export default <%= classifiedModuleName %>Index;
