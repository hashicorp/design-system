/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const SubSectionStandalone: TemplateOnlyComponent = <template>
  <ShwTextH2>Standalone</ShwTextH2>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Standalone editor (default)">
      <HdsCodeEditor @ariaLabel="Standalone editor (default)" />
    </SF.Item>
    <SF.Item @label="Not standalone editor">
      <HdsCodeEditor
        @ariaLabel="Not standalone editor"
        @isStandalone={{false}}
      />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionStandalone;
