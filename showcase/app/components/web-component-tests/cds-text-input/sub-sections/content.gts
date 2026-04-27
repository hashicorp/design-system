/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCdsTextInput } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Label only">
      <HdsCdsTextInput
        @label="Project name"
        @name="project-name-label-only"
        @value="atlas"
      />
    </SG.Item>

    <SG.Item @label="Label + helper text">
      <HdsCdsTextInput
        @label="Project name"
        @helperText="Use lowercase letters, numbers, and dashes."
        @name="project-name-with-helper"
        @value="atlas"
      />
    </SG.Item>

    <SG.Item @label="Label + invalid text">
      <HdsCdsTextInput
        @label="Project name"
        @invalid={{true}}
        @invalidText="Project name must be at least 3 characters."
        @name="project-name-invalid"
        @value="at"
      />
    </SG.Item>

    <SG.Item @label="Label + warning text">
      <HdsCdsTextInput
        @label="Project name"
        @warn={{true}}
        @warnText="Using uppercase can create API inconsistencies."
        @name="project-name-warning"
        @value="Atlas"
      />
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionContent;
