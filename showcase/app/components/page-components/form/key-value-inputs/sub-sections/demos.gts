/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFrame from 'showcase/components/shw/frame';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import CodeFragmentWithValidationAndLimit from 'showcase/components/page-components/form/key-value-inputs/code-fragments/with-validation-and-limit';
import CodeFragmentWithDynamicInputs from 'showcase/components/page-components/form/key-value-inputs/code-fragments/with-dynamic-inputs';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwTextH3>Example of
    <code>KeyValueInputs</code>
    within a
    <code>Form</code>, with validation and rows limit</ShwTextH3>

  <CodeFragmentWithValidationAndLimit
    class="shw-component-form-key-value-inputs-frame-content"
  />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Example of
    <code>KeyValueInputs</code>
    within a
    <code>Form</code>, with dynamic inputs</ShwTextH3>

  <CodeFragmentWithDynamicInputs
    class="shw-component-form-key-value-inputs-frame-content"
  />

  <ShwDivider @level={{2}} />

  <ShwTextH3>Contextual examples</ShwTextH3>

  <ShwFrame
    @id="demo-key-value-inputs-flows"
    @src="/components/form/key-value-inputs/frameless/demo-flows"
    @height="600"
    @label="Demo in context with different flows"
  />

  <ShwDivider @level={{2}} />

  <ShwFrame
    @id="demo-key-value-inputs-complex-form"
    @src="/components/form/frameless/demo-form-complex"
    @height="550"
    @label="Demo of the component within a rather complex form (non-functional)"
  />

  <ShwDivider />
</template>;

export default SubSectionDemos;
