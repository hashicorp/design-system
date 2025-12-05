/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import PageComponentsTabsController from 'showcase/controllers/page-components/tabs';

import TabsIndex from 'showcase/components/page-components/tabs';

interface TabsIndexSignature {
  Args: {
    model: unknown;
    controller: PageComponentsTabsController;
  };
}

const PageComponentsTabs: TemplateOnlyComponent<TabsIndexSignature> = <template>
  <TabsIndex @controller={{@controller}} />
</template>;

export default PageComponentsTabs;
