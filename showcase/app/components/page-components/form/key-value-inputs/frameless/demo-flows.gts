/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';

import MockApp from 'showcase/components/mock/app';
import CodeFragmentWithDynamicInputs from 'showcase/components/page-components/form/key-value-inputs/code-fragments/with-dynamic-inputs';
import CodeFragmentWithValidationAndLimit from 'showcase/components/page-components/form/key-value-inputs/code-fragments/with-validation-and-limit';

import {
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsPageHeader,
  HdsTabs,
} from '@hashicorp/design-system-components/components';

const FramelessDemoFlows: TemplateOnlyComponent = <template>
  {{pageTitle "KeyValueInputs demo flows - Frameless"}}

  <MockApp>
    <:main>
      <HdsPageHeader {{style margin-bottom="24px"}} as |PH|>
        <PH.Title>KeyValueInputs demo flows</PH.Title>
        <PH.Breadcrumb>
          <HdsBreadcrumb>
            <HdsBreadcrumbItem @text="Lorem" />
            <HdsBreadcrumbItem @text="Ipsum" />
            <HdsBreadcrumbItem @text="Dolor" />
            <HdsBreadcrumbItem @text="Sit amet" />
          </HdsBreadcrumb>
        </PH.Breadcrumb>
        <PH.IconTile @logo="vault" />
      </HdsPageHeader>

      <HdsTabs as |T|>
        <T.Tab>With validation and limit</T.Tab>
        <T.Tab>With dynamic inputs</T.Tab>
        <T.Panel>
          <CodeFragmentWithValidationAndLimit @collapseInstructions={{true}} />
        </T.Panel>
        <T.Panel>
          <CodeFragmentWithDynamicInputs @collapseInstructions={{true}} />
        </T.Panel>
      </HdsTabs>

    </:main>
  </MockApp>
</template>;

export default FramelessDemoFlows;
