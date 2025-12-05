/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwOutliner from 'showcase/components/shw/outliner';

import { HdsFormError } from '@hashicorp/design-system-components/components';

const SubSectionError: TemplateOnlyComponent = <template>
  <ShwTextH2>Error</ShwTextH2>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="With simple text">
      <HdsFormError>This is a simple error message</HdsFormError>
    </SF.Item>
    <SF.Item @label="With text that spans multiple lines">
      <ShwOutliner {{style width="250px"}}>
        <HdsFormError>This is a very long error message that should span on
          multiple lines</HdsFormError>
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="With multiple error messages">
      <HdsFormError as |Error|>
        <Error.Message>First error message</Error.Message>
        <Error.Message>Second error message</Error.Message>
      </HdsFormError>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionError;
