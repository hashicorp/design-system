import type { TemplateOnlyComponent } from '@ember/component/template-only';

import {
  HdsForm,
  HdsButton,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsForm as |FORM|>
    <FORM.Footer as |FF|>
      <FF.ButtonSet>
        <HdsButton @text="Submit" type="submit" />
        <HdsButton @text="Cancel" @color="secondary" />
      </FF.ButtonSet>
    </FORM.Footer>
  </HdsForm>
</template>;

export default LocalComponent;
