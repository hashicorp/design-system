/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import <%= classifiedModuleName %>Index from 'showcase/components/page-components/<%= kebabizedModuleName %>';

const PageComponents<%= classifiedModuleName %>: TemplateOnlyComponent = <template>
  <<%= classifiedModuleName %>Index />
</template>;

export default PageComponents<%= classifiedModuleName %>;
