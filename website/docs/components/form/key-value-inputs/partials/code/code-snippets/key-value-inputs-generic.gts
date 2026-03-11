import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';

import {
  HdsFormKeyValueInputs,
  HdsButton,
  HdsFormToggleField,
} from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  <!--  Note: this is a non-interactive example -->

  <HdsFormKeyValueInputs
    @data={{array
      (hash email="j.maxene@randatmail.com" hasOrgRole=true)
      (hash email="e.aishah@randatmail.com" hasOrgRole=false)
    }}
  >
    <:header as |H|>
      <H.Legend>Grant access to HCP resources for your team members</H.Legend>
      <H.HelperText>
        Users without an organization role cannot view or edit anything inside
        their organization until a project-level or workspace-level role is
        assigned to them after they accept their invitation.
      </H.HelperText>
      <H.Generic>
        <HdsButton
          @color="tertiary"
          @text="What can each role do?"
          @icon="help"
        />
      </H.Generic>
    </:header>
    <:row as |R|>
      <R.Field as |F|>
        <F.Label>
          Email address for invitee
        </F.Label>
        <F.TextInput @value={{R.rowData.email}} />
      </R.Field>
      <R.Generic>
        <HdsFormToggleField checked={{R.rowData.hasOrgRole}} as |T|>
          <T.Label>Assign this user an organization role</T.Label>
        </HdsFormToggleField>
      </R.Generic>
      <R.DeleteRowButton />
    </:row>
    <:footer as |F|>
      <F.AddRowButton @text="Add user" />
    </:footer>
  </HdsFormKeyValueInputs>
</template>;

export default LocalComponent;
