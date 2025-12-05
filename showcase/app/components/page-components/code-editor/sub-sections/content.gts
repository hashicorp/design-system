/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const DEMO_CODE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="No content">
      <HdsCodeEditor @ariaLabel="No content" />
    </SF.Item>
    <SF.Item @label="With initial content">
      <HdsCodeEditor @ariaLabel="With initial content" @value={{DEMO_CODE}} />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
