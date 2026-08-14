/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { CodeExamplesCatalog } from "../../src/tools/code-examples/store/schema.js";

export const buildCodeExamplesCatalog = (): CodeExamplesCatalog => ({
  version: 1,
  examples: [
    {
      id: "page-components/accordion/code-fragments/with-external-control",
      component: "accordion",
      title: "With external control",
      sourcePath:
        "showcase/app/components/page-components/accordion/code-fragments/with-external-control.gts",
      source: `import { HdsAccordion } from '@hashicorp/design-system-components/components';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
export default class CodeFragmentWithExternalControl extends Component {
  <template>
    <HdsAccordion as |A|>
      <A.Item><:toggle>Item one</:toggle></A.Item>
    </HdsAccordion>
  </template>
}`,
      importedHdsComponents: ["HdsAccordion"],
      localDependencies: ["showcase/components/shw/placeholder"],
      isStandalone: false,
    },
    {
      id: "page-components/button/code-fragments/with-loading-state",
      component: "button",
      title: "With loading state",
      sourcePath:
        "showcase/app/components/page-components/button/code-fragments/with-loading-state.gts",
      source: `import { HdsButton } from '@hashicorp/design-system-components/components';
export default class CodeFragmentWithLoadingState extends Component {
  <template>
    <HdsButton @text="Submit" @isLoading={{true}} />
  </template>
}`,
      importedHdsComponents: ["HdsButton"],
      localDependencies: [],
      isStandalone: true,
    },
    {
      id: "page-components/form/super-select/code-fragments/with-single-field-element",
      component: "form/super-select",
      title: "With single field element",
      sourcePath:
        "showcase/app/components/page-components/form/super-select/code-fragments/with-single-field-element.gts",
      source: `import { HdsSuperSelect } from '@hashicorp/design-system-components/components';
import COUNTRIES from 'showcase/mocks/country-data';
export default class CodeFragmentWithSingleFieldElement extends Component {
  <template>
    <HdsSuperSelect @options={{COUNTRIES}} />
  </template>
}`,
      importedHdsComponents: ["HdsSuperSelect"],
      localDependencies: ["showcase/mocks/country-data"],
      isStandalone: false,
    },
    {
      id: "page-components/table/code-fragments/with-multi-select/deletion",
      component: "table",
      title: "Deletion",
      sourcePath:
        "showcase/app/components/page-components/table/code-fragments/with-multi-select/deletion.gts",
      source: `import { HdsButton, HdsPaginationNumbered } from '@hashicorp/design-system-components/components';
import CodeFragmentWithMultiSelectTopbar from './topbar';
import USERS from 'showcase/mocks/user-data';
export default class CodeFragmentWithMultiSelectDeletion extends Component {
  <template>
    <HdsButton @text="Delete" />
  </template>
}`,
      importedHdsComponents: ["HdsButton", "HdsPaginationNumbered"],
      localDependencies: ["./topbar", "showcase/mocks/user-data"],
      isStandalone: false,
    },
  ],
});
