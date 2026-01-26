import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import {
  HdsButton,
  HdsButtonSet,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <HdsButtonSet {{style maxWidth="15rem"}}>
    <HdsButton @text="Save" @isFullWidth={{true}} />
    <HdsButton
      @text="Cancel"
      @color="secondary"
      @href="https://hashicorp.com"
      @isFullWidth={{true}}
    />
  </HdsButtonSet>
</template>;

export default LocalComponent;
