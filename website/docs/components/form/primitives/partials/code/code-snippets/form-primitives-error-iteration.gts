import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormError } from '@hashicorp/design-system-components/components';

const SAMPLE_ERROR_MESSAGES = ['First error message', 'Second error message'];

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormError @controlId="control-ID" as |Error|>
    {{#each SAMPLE_ERROR_MESSAGES as |message|}}
      <Error.Message>{{message}}</Error.Message>
    {{/each}}
  </HdsFormError>
</template>;

export default LocalComponent;
