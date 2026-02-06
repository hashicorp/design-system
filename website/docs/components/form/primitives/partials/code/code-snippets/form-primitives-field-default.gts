import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsFormField } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsFormField @layout="vertical" @isRequired={{true}} as |F|>
    <F.Label>This is the label</F.Label>
    <F.HelperText>This is the helper text</F.HelperText>
    <F.Control>
      <!-- add your control here -->
      <input
        type="email"
        id={{F.id}}
        value="jane.doe@email.com"
        class="my-custom-class"
        aria-describedby={{F.ariaDescribedBy}}
      />
    </F.Control>
    <F.Error>This is the error</F.Error>
  </HdsFormField>
</template>;

export default LocalComponent;
