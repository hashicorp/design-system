import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import { HdsFormKeyValueInputs } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <!--  Note: this is a non-interactive example -->

  <HdsFormKeyValueInputs
    @data={{array (hash email="j.maxene@randatmail.com" name="")}}
  >
    <:header as |H|>
      <H.Legend>Invite multiple users to your organization</H.Legend>
    </:header>
    <:row as |R|>
      <R.Field @isRequired={{true}} as |F|>
        <F.Label>
          Email address for invitee
        </F.Label>
        <F.TextInput @value={{R.rowData.email}} />
      </R.Field>
      <R.Field @isOptional={{true}} as |F|>
        <F.Label>
          Name of invitee
        </F.Label>
        <F.TextInput @value={{R.rowData.name}} />
      </R.Field>
      <R.DeleteRowButton />
    </:row>
  </HdsFormKeyValueInputs>
</template>;

export default LocalComponent;
